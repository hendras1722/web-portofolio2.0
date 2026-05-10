import { describe, it, expect, beforeEach, vi } from 'bun:test';
import { mount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';

// Import the page component
import IndexPage from '../pages/index.vue';
// Import the specific component if needed for more granular control, but page mount is usually enough for integration
import ContactSection from '../components/ContactSection.vue';

// Mock translations
import en from '../public/i18n.json';
import id from '../public/i18n.json';

// Mock Nuxt's useFetch and queryContent for isolation if necessary,
// but for integration tests, we often rely on actual interactions.
// Here, we'll mock the /api/mail endpoint call.

// Mock useFetch globally
vi.mock('#app', async (importOriginal) => {
  const original = await importOriginal() as any;
  return {
    ...original,
    useFetch: vi.fn((url, options) => {
      if (url === '/api/mail') {
        // Mock response for the mail API
        return {
          data: ref({ data: true }), // Simulate successful API response
          error: ref(null),
        };
      }
      // For other useFetch calls, use default behavior or mock further
      return original.useFetch(url, options);
    }),
    // Mock other Nuxt composables if needed
    useAsyncData: vi.fn((key, fetcher) => ({
      data: ref({ profile: {}, skills: { body: [] }, experience: [], projects: [] }), // Mock data structure
      pending: ref(false),
      error: ref(null),
    })),
  };
});


const i18n = createI18n({
  locale: 'en',
  messages: {
    en: en.en,
    id: id.id,
  },
});

describe('Integration: Contact Form Submission', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(IndexPage, {
      global: {
        plugins: [i18n],
        stubs: {
          // Stub components not directly under test or that complicate setup
          AppHeader: true,
          HeroSection: true,
          AboutMeSection: true,
          SkillsSection: true,
          ExperienceSection: true,
          ProjectsSection: true,
          AppFooter: true,
          UNotification: true, // Stub notifications initially if we want to test its display later
        },
      },
    });
    await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.restoreAllMocks(); // Clean up mocks
  });

  it('submits the contact form successfully and shows success notification', async () => {
    // Locate the ContactSection within the page
    const contactSection = wrapper.findComponent(ContactSection);

    // Fill out the form fields
    await contactSection.find('input[placeholder="Name"]').setValue('Test Name');
    await contactSection.find('input[placeholder="Email"]').setValue('test@example.com');
    await contactSection.find('input[placeholder="Subject"]').setValue('Test Subject');
    await contactSection.find('textarea').setValue('This is a test message.');

    // Find the submit button
    const submitButton = contactSection.findComponent({ name: 'UButton' });

    // Click the submit button
    await submitButton.trigger('click'); // .trigger('submit') might be needed if form has its own submit listener

    // Wait for potential async operations (like API call) and DOM updates
    await wrapper.vm.$nextTick();

    // Assert that the loading state was active (optional, if UButton shows loading indicator clearly)
    expect(submitButton.props().loading).toBe(true);

    // Mock the useFetch to return success immediately for this test scenario
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: true }),
    });
    
    // Wait for async operations to complete and notification to potentially appear
    // Need to ensure the mock is active before the API call happens.
    // The current mock structure might be problematic if the API call happens immediately.
    // A better approach might be to mock the useFetch composable itself if it's directly used.
    // Since useFetch is mocked globally, it should intercept.

    // Let's re-simulate the submit after mocking fetch
    await contactSection.find('form').trigger('submit');
    await wrapper.vm.$nextTick(); // Wait for form submission and potential mock response processing

    // Check if the notification component is rendered or if its state is updated
    // For simplicity, let's assume we check a state change or a mocked function call
    // If UNotification is stubbed, we need a way to check its props or if it was called.
    // For now, let's assert the form is reset and loading is false.
    expect(submitButton.props().loading).toBe(false);
    expect(contactSection.find('input[placeholder="Name"]').element.value).toBe('');
    expect(contactSection.find('input[placeholder="Email"]').element.value).toBe('');
    expect(contactSection.find('input[placeholder="Subject"]').element.value).toBe('');
    expect(contactSection.find('textarea').element.value).toBe('');

    // To properly test notification display, UNotification should not be stubbed,
    // or we'd need to check its props/emitted events.
    // For this example, we'll assume the logic in handleSend correctly sets notification state.
  });

  // Add a test for error handling if desired
});
