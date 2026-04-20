<template>
  <div class="contact-section container mx-auto px-4 py-16">
    <h2 class="text-4xl font-bold text-center mb-8" v-motion-slide-visible-once-bottom>{{ $t('contact') }}</h2>
    <div class="max-w-2xl mx-auto">
      <UCard>
        <form @submit.prevent="handleSend">
          <div class="mb-4">
            <UInput v-model="form.name" :placeholder="$t('name')" size="lg" required />
          </div>
          <div class="mb-4">
            <UInput v-model="form.email" type="email" :placeholder="$t('email')" size="lg" required />
          </div>
          <div class="mb-4">
            <UInput v-model="form.subject" :placeholder="$t('subject')" size="lg" required />
          </div>
          <div class="mb-4">
            <UTextarea v-model="form.message" :placeholder="$t('message')" rows="5" size="lg" required />
          </div>
          <UButton type="submit" color="primary" block :loading="loading">
            {{ $t('send_message') }}
          </UButton>
        </form>
      </UCard>
      <UNotification v-if="showNotification" :title="notification.title" :description="notification.description" :icon="notification.icon" class="mt-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFetch } from '#app';
import { UInput, UTextarea, UButton, UCard, UNotification } from '#components';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const loading = ref(false);
const showNotification = ref(false);
const notification = ref({
  title: '',
  description: '',
  icon: ''
});

async function handleSend() {
  loading.value = true;
  showNotification.value = false;

  try {
    const { data, error } = await useFetch('/api/mail', {
      method: 'POST',
      body: form.value,
    });

    if (error.value) {
      throw error.value;
    }

    if (data.value?.data) {
      notification.value = {
        title: $t('success_message_title'), // Assuming these will be added to i18n.json
        description: $t('success_message'),
        icon: 'i-heroicons-check-circle-20-solid'
      };
      // Reset form
      form.value = { name: '', email: '', subject: '', message: '' };
    } else {
      notification.value = {
        title: $t('error_message_title'), // Assuming these will be added to i18n.json
        description: $t('error_message'),
        icon: 'i-heroicons-exclamation-circle-20-solid'
      };
    }
  } catch (err: any) {
    notification.value = {
      title: $t('error_message_title'), // Assuming these will be added to i18n.json
      description: err.message || $t('error_message'),
      icon: 'i-heroicons-exclamation-circle-20-solid'
    };
  } finally {
    showNotification.value = true;
    loading.value = false;
    setTimeout(() => {
      showNotification.value = false;
    }, 5000); // Hide notification after 5 seconds
  }
}
</script>

<style scoped>
/* Scoped styles for the contact section */
</style>