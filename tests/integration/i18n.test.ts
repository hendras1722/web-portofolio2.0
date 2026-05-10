import { describe, it, expect } from 'bun:test';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia'; // Assuming Pinia is used for state management or other global setup
import { createI18n } from 'vue-i18n'; // To mock vue-i18n

// Import the page that includes the header and thus the switcher
import IndexPage from '../pages/index.vue';
import AppHeader from '../components/AppHeader.vue'; // Explicitly import AppHeader if needed, or rely on page mounting
import en from '../public/i18n.json'; // English translations
import id from '../public/i18n.json'; // Indonesian translations

// Mock necessary Nuxt/Vue features for testing
const i18n = createI18n({
  locale: 'en', // Default locale for the test
  messages: {
    en: en.en,
    id: id.id,
  },
});

// Mock useAsyncData and queryContent if they are critical for rendering localized text
// For this test, we assume that the $t function works and that the page will eventually render localized text.
// A more comprehensive test would involve mocking queryContent as well.

describe('Integration: Language Switcher', () => {
  let wrapper;

  beforeAll(() => {
    // Setup Pinia if needed, though not strictly required for this specific test
    // setActivePinia(createPinia());
  });

  beforeEach(async () => {
    // Mount the page component which includes the header with the switcher
    wrapper = mount(IndexPage, {
      global: {
        plugins: [i18n], // Provide vue-i18n plugin
        stubs: {
          // Stub potentially complex components if not directly testing them
          HeroSection: true,
          AboutMeSection: true,
          SkillsSection: true,
          ExperienceSection: true,
          ProjectsSection: true,
          ContactSection: true,
          AppFooter: true,
        },
      },
      // Mock useAsyncData to provide initial data if needed for rendering
      // For simplicity, this test focuses on the UI interaction of the switcher itself.
    });

    // Ensure the component is fully mounted and reactive updates are processed
    await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('changes locale when language switcher is interacted with', async () => {
    // Get the AppHeader component within the mounted page
    const appHeader = wrapper.findComponent(AppHeader);

    // Initial locale should be 'en' if set by the mock, or default from nuxt.config
    // We need to explicitly set it for predictable testing if nuxt.config default is not guaranteed
    i18n.global.locale.value = 'en';
    await wrapper.vm.$nextTick();
    expect(i18n.global.locale.value).toBe('en');

    // Find the USelect component for language switching
    // Note: You might need to adjust the selector based on how USelect is rendered and its attributes.
    // Assuming USelect has a data-testid or similar, or can be found by its component name.
    const languageSelect = appHeader.findComponent({ name: 'USelect' });

    // Simulate changing the locale to Indonesian ('id')
    // The USelect component likely uses v-model with `selectedLocale`
    await languageSelect.setValue('id'); // This might need adjustment based on USelect's internal handling

    // Await for potential DOM updates after locale change
    await wrapper.vm.$nextTick();

    // Assert that the locale has changed
    expect(i18n.global.locale.value).toBe('id');

    // Further assertions could check if translated text is displayed correctly
    // e.g., expect(appHeader.find('a[to="/"]').text()).toContain('Beranda'); // If home link text is internationalized
  });
});
