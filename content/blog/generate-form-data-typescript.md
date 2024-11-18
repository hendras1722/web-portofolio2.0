---
title: 'Generate form data typescript'
description: 'Vue'
date: '2024-03-15'
---

```ts
export const generateFormData = <T = Record<string, unknown | unknown[]>>(
  forms: T
): FormData => {
  const formData = new FormData()
 
  for (const name in forms) {
    if (Array.isArray(forms[name as keyof T])) {
      ;(forms[name as keyof T] as unknown[]).forEach((value) => {
        formData.append(name, value as string | File)
      })
    } else {
      formData.append(name, forms[name as keyof T] as string | File)
    }
  }

  return formData
}

//created

  const create = async (
    payload: InferType<typeof ApplicationFormSchema>,
    form: SubmissionContext
  ): Promise<void> => {
    const { data, error } = await useHttp<CreateApplicationResponse>(
      API_ENDPOINT.APP.ADMIN_APPLICATION,
      {
        method: 'POST',
        body: generateFormData<typeof payload>(payload),
      }
    )

    if (error.value) {
      const errorMessage = error.value.data?.message

      if (errorMessage === 'fn(tx): app already exists') {
        form.setFieldError('name', 'Application already registered')
      }

      throw new Error(error.value.message)
    }

    if (data.value) {
      setTimeout(async () => {
        await navigateTo(
          `/dashboard/applications/detail/${data.value?.data.id}`,
          {
            replace: true,
          }
        )
      }, 2000)
    }
  }

```