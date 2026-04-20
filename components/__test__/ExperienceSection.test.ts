import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ExperienceSection from '~/components/ExperienceSection.vue';

// Mocking i18n for the test
const mockI18n = {
  methods: {
    t: (key) => key // Return the key itself as translation
  }
};

const mockExperiences = [
  { company: 'Tech Solutions Inc.', title: 'Senior Web Developer', dates: 'Jan 2022 - Present', description: 'Led development of scalable web applications.', stackUsed: ['Vue.js', 'Nuxt.js'], type: 'Full-time', location: 'Mock Location' },
  { company: 'Web Innovators', title: 'Junior Frontend Developer', dates: 'July 2019 - Dec 2021', description: 'Developed and maintained responsive user interfaces.', stackUsed: ['Vue.js'], type: 'Contract', location: 'Mock Location 2' },
];

describe('ExperienceSection.vue', () => {
  it('renders the correct number of experience entries', () => {
    const wrapper = mount(ExperienceSection, {
      props: { experiences: mockExperiences },
      global: {
        mocks: {
          $t: (key) => key, // Mock $t for translations
        },
        stubs: ['i18n-t'] // Stub i18n-t if used internally
      }
    });

    // Expecting each experience entry to render a block
    expect(wrapper.findAll('.experience-entry').length).toBe(mockExperiences.length);
  });

  it('renders correct details for each experience entry', () => {
    const wrapper = mount(ExperienceSection, {
      props: { experiences: [mockExperiences[0]] },
      global: {
        mocks: {
          $t: (key) => key,
        },
        stubs: ['i18n-t']
      }
    });

    const entry = wrapper.find('.experience-entry');
    expect(entry.find('.company-title').text()).toContain(mockExperiences[0].company);
    expect(entry.find('.role-title').text()).toContain(mockExperiences[0].title);
    expect(entry.find('.dates').text()).toContain(mockExperiences[0].dates);
    expect(entry.find('.description').text()).toContain(mockExperiences[0].description);
    expect(entry.find('.stack-used').text()).toContain('Stack used:');
    expect(entry.find('.stack-used').text()).toContain(mockExperiences[0].stackUsed.join(' '));
  });

  it('handles empty experiences array gracefully', () => {
    const wrapper = mount(ExperienceSection, {
      props: { experiences: [] },
      global: {
        mocks: {
          $t: (key) => key,
        },
        stubs: ['i18n-t']
      }
    });
    expect(wrapper.find('.experience-section').text()).not.toContain('company-title'); // Ensure no entries are rendered
  });
});
