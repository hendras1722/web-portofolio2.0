<template>
  <div>
    <AppHeader />
    <div v-if="pending">Loading content...</div>
    <div v-else-if="error">Error loading content: {{ error.message }}</div>
    <div v-else>
      <div id="print-content">
        <HeroSection :profile="profile" />

        <!-- About Me Section with enhanced contact details -->
        <section class="about-me-section container mx-auto px-4 py-16" v-if="profile">
          <h2 class="text-4xl font-bold text-center mb-8" v-motion-slide-visible-once-bottom>{{ $t('about_me') }}</h2>
          <div class="flex flex-col items-center">
            <UAvatar :src="profile?.image || '/me.png'" alt="Avatar" size="3xl" class="mb-8" />
            <p class="text-lg text-center max-w-3xl leading-relaxed" v-motion-slide-visible-once-bottom>
              {{ profile?.bio }}
            </p>
            <!-- Detailed Contact Info from CV -->
            <div class="mt-6 text-lg text-center text-gray-700 flex flex-col space-y-2">
              <p v-if="profile.email">
                <a :href="'mailto:' + profile.email" class="hover:underline flex items-center justify-center space-x-2">
                  <i class="fas fa-envelope"></i>
                  <span>{{ profile.email }}</span>
                </a>
              </p>
              <p v-if="profile.phone">
                <a :href="'tel:' + profile.phone" class="hover:underline flex items-center justify-center space-x-2">
                  <i class="fas fa-phone"></i>
                  <span>{{ profile.phone }}</span>
                </a>
              </p>
              <p v-if="profile.location" class="flex items-center justify-center space-x-2">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ profile.location }}</span>
              </p>
              <p v-if="profile.linkedin">
                <a :href="profile.linkedin" target="_blank"
                  class="hover:underline flex items-center justify-center space-x-2">
                  <i class="fab fa-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
              </p>
              <p v-if="profile.github">
                <a :href="profile.github" target="_blank"
                  class="hover:underline flex items-center justify-center space-x-2">
                  <i class="fab fa-github"></i>
                  <span>GitHub</span>
                </a>
              </p>
            </div>
          </div>
        </section>

        <SkillsSection :skills="skills.body" />
        <ExperienceSection :experiences="experience" />
        <ProjectsSection :projects="projects" />

        <!-- New Education Section -->
        <section v-if="educationData && educationData.length > 0"
          class="education-section container mx-auto px-4 py-16">
          <h2 class="text-4xl font-bold text-center mb-8" v-motion-slide-visible-once-bottom>{{ $t('educationTitle') }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="(edu, idx) in educationData" :key="idx" class="p-6 bg-white rounded-lg shadow-md">
              <h3 class="text-2xl font-bold mb-2">{{ edu.institution }}</h3>
              <p class="text-gray-600 mb-1">{{ edu.period }}</p>
              <p class="text-lg text-gray-800">{{ $t(edu.degree) }}</p>
            </div>
          </div>
        </section>

        <ContactSection />
      </div>
      <PdfDownloadButton />
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue';
import HeroSection from '~/components/HeroSection.vue';
// AboutMeSection component is not directly used for rendering contact details anymore, as they are now in the page.
// If AboutMeSection has other responsibilities, it can remain imported or be refactored.
// For now, I'll keep it imported as it might be used by HeroSection or other parts.
import AboutMeSection from '~/components/AboutMeSection.vue';
import SkillsSection from '~/components/SkillsSection.vue';
import ExperienceSection from '~/components/ExperienceSection.vue';
import ProjectsSection from '~/components/ProjectsSection.vue';
import ContactSection from '~/components/ContactSection.vue';
import AppFooter from '~/components/AppFooter.vue';
import PdfDownloadButton from '~/components/PdfDownloadButton.vue'; // Import the new component
import { useI18n } from 'vue-i18n';

const { t: $t, locale } = useI18n();

const { data, pending, error } = await useAsyncData('portfolio-content', async () => {
  const profile = await queryContent(locale.value, 'profile').findOne();
  const skills = await queryContent(locale.value, 'skills').findOne();
  const experience = await queryContent(locale.value, 'experience').find(); // Use find() for multiple entries
  const projects = await queryContent(locale.value, 'projects').find(); // Use find() for multiple entries

  return { profile, skills, experience, projects };
});

const profile = computed(() => data.value?.profile);
const skills = computed(() => data.value?.skills);
const experience = computed(() => data.value?.experience);
const projects = computed(() => data.value?.projects);

// Education data structure based on CV page, hardcoded as it wasn't in content/
// Added keys for i18n lookup for degrees.
const educationData = ref([
  { institution: 'Pijar Camp (ex Arkademy)', period: '2020 - 2021', degree: 'education.pijar' },
  { institution: 'Institut Teknologi Bandung', period: '2019 - 2019', degree: 'education.itb' },
  { institution: 'Muhammadiyah University of Surakarta', period: '2014 - 2018', degree: 'education.ums' },
]);

// --- Internationalization (i18n) Keys Reference ---
// Ensure these keys are defined in your language files (e.g., public/locales/en.json and public/locales/id.json).
//
// Example: For English (en.json)
// {
//   "about_me": "About Me",
//   "home": "Home",
//   "home_description": "Welcome to my portfolio",
//   "educationTitle": "Education",
//   "education": {
//     "pijar": "Full-Stack Developer, Information Technology",
//     "itb": "Digital Talent Scholarship - Internet of Things",
//     "ums": "Bachelor's degree, Electrical Engineering"
//   },
//   // Add translations for other text elements like 'location', 'email', 'phone', 'linkedin', 'github' labels if they are not static.
//   // For example, if you wanted to translate "LinkedIn":
//   // "linkedin_label": "LinkedIn",
//   // and then use $t('linkedin_label') in the template.
// }
//
// Example: For Indonesian (id.json)
// {
//   "about_me": "Tentang Saya",
//   "home": "Beranda",
//   "home_description": "Selamat datang di portofolio saya",
//   "educationTitle": "Pendidikan",
//   "education": {
//     "pijar": "Full-Stack Developer, Teknologi Informasi",
//     "itb": "Digital Talent Scholarship - Internet of Things",
//     "ums": "Gelar Sarjana, Teknik Elektro"
//   },
//   // Add translations for other text elements if needed.
// }
// --- End of Internationalization (i18n) Keys Reference ---


useHead({
  title: computed(() => ($t('home') + ' - ' + (profile.value?.name || ''))),
  meta: [
    { name: 'description', content: computed(() => ($t('home_description') + ' ' + (profile.value?.name || ''))) }
  ]
})
</script>

<style scoped>
/* Scoped styles for the page */
.about-me-section {
  /* Specific styles if needed, otherwise rely on global/tailwind */
}

.education-section {
  /* Specific styles if needed */
}

/* Add styles for the new contact info links */
.about-me-section p a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  /* space between icon and text */
}
</style>