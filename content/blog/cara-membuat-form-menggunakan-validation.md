---
title: 'Cara membuat form menggunakan validation'
description: 'Vue'
date: '2024-12-12'
---

Create component UForm

```vue [UForm.vue]
<template>
  <form @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { provide, ref, onUnmounted, onMounted, computed } from 'vue'
import { useEventBus } from '@vueuse/core'

class FormException extends Error {
  constructor(message: string) {
    super(message)
    this.message = message
    Object.setPrototypeOf(this, FormException.prototype)
  }
}

const props = defineProps({
  schema: {
    type: Object,
    default: undefined,
  },
  state: {
    type: Object,
    required: true,
  },
  validate: {
    type: Function,
    default: () => [],
  },
  validateOn: {
    type: Array,
    default: () => ['blur', 'input', 'change', 'submit'],
  },
})

const emits = defineEmits(['submit', 'error'])

const bus = useEventBus('form-1')
const errors = ref<any[]>([])
const inputs = ref<Record<string, any>>({})

provide('form-errors', errors)
provide('form-events', bus)
provide('form-inputs', inputs)

onMounted(() => {
  bus.on(async (event: any) => {
    if (event.type !== 'submit' && props.validateOn?.includes(event.type)) {
      await performValidation(event.path, { silent: true })
    }
  })
})

onUnmounted(() => {
  bus.reset()
})

async function getErrors() {
  let errs = await props.validate(props.state)
  if (props.schema) {
    if (isZodSchema(props.schema)) {
      errs = errs.concat(await getZodErrors(props.state, props.schema))
    } else if (isYupSchema(props.schema)) {
      errs = errs.concat(await getYupErrors(props.state, props.schema))
    } else if (isJoiSchema(props.schema)) {
      errs = errs.concat(await getJoiErrors(props.state, props.schema))
    } else if (isValibotSchema(props.schema)) {
      errs = errs.concat(await getValibotError(props.state, props.schema))
    } else {
      throw new Error('Form validation failed: Unsupported form schema')
    }
  }
  return errs
}

async function performValidation(
  path?: string | string[],
  opts = { silent: false }
) {
  let paths = path
  if (path && !Array.isArray(path)) {
    paths = [path]
  }

  if (paths) {
    const otherErrors = errors.value.filter(
      (error) => !paths.includes(error.path)
    )
    const pathErrors = (await getErrors()).filter((error: { path: string }) =>
      paths.includes(error.path)
    )
    errors.value = otherErrors.concat(pathErrors)
  } else {
    errors.value = await getErrors()
  }

  if (errors.value.length > 0) {
    if (opts.silent) return false
    throw new FormException(
      `Form validation failed: ${JSON.stringify(errors.value, null, 2)}`
    )
  }

  return props.state
}

const localeData = computed(() => props.state)

async function onSubmit(payload: Event) {
  try {
    if (props.validateOn?.includes('submit')) {
      await performValidation()
    }
    console.log('Submitting form with state:', props.state)
    emits('submit', { ...payload, data: localeData })
  } catch (error) {
    if (error instanceof FormException) {
      emits('error', {
        ...payload,
        errors: errors.value.map((err) => ({
          ...err,
          id: inputs.value[err.path],
        })),
      })
    } else {
      // For other unexpected errors, log or rethrow
      console.error('Unexpected error during form submission:', error)
      throw error // Optional: Decide if the error should propagate
    }
  }
}

function isYupSchema(schema: any): boolean {
  return schema.validate && schema.__isYupSchema__
}

function isYupError(error: any): boolean {
  return error.inner !== undefined
}

async function getYupErrors(state: any, schema: any) {
  try {
    await schema.validate(state, { abortEarly: false })
    return []
  } catch (error: any) {
    if (isYupError(error)) {
      return error.inner.map((issue: any) => ({
        path: issue.path ?? '',
        message: issue.message,
      }))
    } else {
      throw error
    }
  }
}

function isZodSchema(schema: any): boolean {
  return schema.parse !== undefined
}

async function getZodErrors(state: any, schema: any) {
  const result = await schema.safeParseAsync(state)
  if (!result.success) {
    return result.error.issues.map((issue: any) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }))
  }
  return []
}

function isJoiSchema(schema: any): boolean {
  return schema.validateAsync !== undefined && schema.id !== undefined
}

function isJoiError(error: any): boolean {
  return error.isJoi === true
}

async function getJoiErrors(state: any, schema: any) {
  try {
    await schema.validateAsync(state, { abortEarly: false })
    return []
  } catch (error: any) {
    if (isJoiError(error)) {
      return error.details.map((detail: any) => ({
        path: detail.path.join('.'),
        message: detail.message,
      }))
    } else {
      throw error
    }
  }
}

function isValibotSchema(schema: any): boolean {
  return schema._parse !== undefined
}

async function getValibotError(state: any, schema: any) {
  const result = await schema._parse(state)
  if (result.issues) {
    return result.issues.map((issue: any) => ({
      path: issue.path?.map((p: any) => p.key).join('.') || '',
      message: issue.message,
    }))
  }
  return []
}
</script>
```

create UFormGroup

```vue [UFormGroup.vue]
<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <slot :on-blur="handleBlur" :error="error" />
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { inject, computed } from 'vue'

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // Inject form errors and events
    const errors = inject<{ value: { path: string; message: string }[] }>(
      'form-errors'
    )
    const formEvents = inject<{
      emit: (event: { type: string; path: string }) => Promise<void>
    }>('form-events')

    // Compute error for this specific field
    const error = computed(() => {
      if (!errors?.value) return ''
      const fieldError = errors.value.find((err) => err.path === props.name)
      return fieldError ? fieldError.message : ''
    })

    // Handle blur event
    const handleBlur = async () => {
      try {
        if (formEvents) {
          await formEvents.emit({ type: 'blur', path: props.name })
        }
      } catch (e) {
        console.error(e)
      }
    }

    return {
      error,
      handleBlur,
    }
  },
}
</script>
```

create component

```vue [app.vue]
<template>
  <UForm @submit="handleSubmit" :schema="ZOD_NOTES" :state="form">
    <UFormGroup name="name" label="Name">
      <template #default="{ onBlur, error }">
        <Input v-model="form.name" @blur="onBlur" :error="error"> </Input>
      </template>
    </UFormGroup>
  </UForm>
  <button
    type="submit"
    class="bg-blue-700 mt-2 w-full text-white p-2 rounded-lg"
  >
    Submit
  </button>
</template>

<script lang="ts" setup>
const form = ref({ name: '' })

const ZOD_NOTES = z.object({
  name: z.string().min(2).max(20),
})
const handleSubmit = async (event: { data: any }) => {
  console.log(event.data) // for get state when validation true
}
</script>
```
