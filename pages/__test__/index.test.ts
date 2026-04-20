import { describe, it, expect, vi } from 'vitest';
import { mountSuspense } from '@nuxt/test-utils/runtime';
import IndexPage from '~/pages/index.vue';

// Mocking necessary modules and components
vi.mock('~/components/AppHeader.vue', () => ({
  default: {
    template: '<div>Mock AppHeader</div>'
  }
}));
vi.mock('~/components/HeroSection.vue', () => ({
  default: {
    template: '<div>Mock HeroSection</div>',
    props: ['profile']
  }
}));
vi.mock('~/components/AboutMeSection.vue', () => ({
  default: {
    template: '<div>Mock AboutMeSection</div>',
    props: ['profile']
  }
}));
vi.mock('~/components/SkillsSection.vue', () => ({
  default: {
    template: '<div>Mock SkillsSection</div>',
    props: ['skills']
  }
}));
vi.mock('~/components/ExperienceSection.vue', () => ({
  default: {
    template: '<div>Mock ExperienceSection</div>',
    props: ['experiences']
  }
}));
vi.mock('~/components/ProjectsSection.vue', () => ({
  default: {
    template: '<div>Mock ProjectsSection</div>',
    props: ['projects']
  }
}));
vi.mock('~/components/ContactSection.vue', () => ({
  default: {
    template: '<div>Mock ContactSection</div>'
  }
}));
vi.mock('~/components/AppFooter.vue', () => ({
  default: {
    template: '<div>Mock AppFooter</div>'
  }
}));
vi.mock('~/components/PdfDownloadButton.vue', () => ({
  default: {
    template: '<div>Mock PdfDownloadButton</div>'
  }
}));

// Mock useAsyncData to return mock data
vi.mock('#app', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    useAsyncData: vi.fn().mockImplementation(() => ({
      data: {
        value: {
          profile: {
            name: 'Mock Name',
            title: 'Software Engineer',
            bio: 'Mock bio text.',
            email: 'mock@example.com',
            phone: '+1234567890',
            location: 'Mock Location',
            linkedin: 'http://mock.linkedin.com',
            github: 'http://mock.github.com',
            image: '/mock-avatar.png'
          },
          skills: { body: [{ name: 'Vue', proficiency: 'Advanced' }] },
          experience: [{ company: 'Mock Company', title: 'Developer', dates: '2023-2024', description: 'Mock experience.' }],
          projects: [{ title: 'Mock Project', description: 'Mock description', technologies: ['Vue'], link: '#' }]
        }
      },
      pending: { value: false },
      error: { value: null }
    }))
  };
});

// Mock useI18n for translations
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key) => key, // Return the key itself as translation
    locale: { value: 'en' }
  })
}));

// Mock useHead for title/meta tags
vi.mock('#head', () => ({
  useHead: vi.fn()
}));

describe('pages/index.vue', () => {
  it('renders the page with all sections', async () => {
    const wrapper = await mountSuspense(IndexPage);

    // Check for core components
    expect(wrapper.findComponent({ name: 'AppHeader' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'HeroSection' }).exists()).toBe(true);
    
    // Check for the About Me section with contact details
    expect(wrapper.find('.about-me-section').exists()).toBe(true);
    expect(wrapper.find('p a[href^="mailto:"]').exists()).toBe(true); // Email link
    expect(wrapper.find('p a[href^="tel:"]').exists()).toBe(true); // Phone link
    expect(wrapper.find('.about-me-section p:has(i.fa-map-marker-alt)').exists()).toBe(true); // Location
    expect(wrapper.find('.about-me-section p:has(i.fa-linkedin)').exists()).toBe(true); // LinkedIn
    expect(wrapper.find('.about-me-section p:has(i.fa-github)').exists()).toBe(true); // GitHub

    // Check for Skills, Experience, Projects sections
    expect(wrapper.findComponent({ name: 'SkillsSection' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'ExperienceSection' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'ProjectsSection' }).exists()).toBe(true);

    // Check for the new Education section
    expect(wrapper.find('.education-section').exists()).toBe(true);
    expect(wrapper.find('.education-section h2').text()).toContain('educationTitle'); // Checking for the i18n key placeholder
    expect(wrapper.find('.education-section .grid').exists()).toBe(true);

    // Check for ContactSection and PdfDownloadButton
    expect(wrapper.findComponent({ name: 'ContactSection' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'PdfDownloadButton' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'AppFooter' }).exists()).toBe(true);
  });

  // Add more tests as needed for specific interactions or data rendering
});
