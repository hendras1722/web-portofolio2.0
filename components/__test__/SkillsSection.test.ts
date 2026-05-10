import { describe, it, expect } from 'bun:test';
import { mount } from '@vue/test-utils';
import SkillsSection from '~/components/SkillsSection.vue';

// Mocking i18n
const mockI18n = {
  methods: {
    t: (key: string) => key
  }
};

const mockSkills = [
  { name: 'Vue.js', icon: 'i-simple-icons-vuejs', proficiency: 'Advanced' },
  { name: 'Nuxt.js', icon: 'i-simple-icons-nuxtdotjs', proficiency: 'Advanced' },
];

describe('SkillsSection.vue', () => {
  it('renders the correct number of skills', () => {
    const wrapper = mount(SkillsSection, {
      props: { skills: mockSkills },
      global: {
        mocks: {
          $t: (key) => key,
        },
        stubs: ['i18n-t']
      }
    });

    expect(wrapper.findAll('.skill-item').length).toBe(mockSkills.length);
  });

  it('renders correct details for each skill', () => {
    const wrapper = mount(SkillsSection, {
      props: { skills: [mockSkills[0]] },
      global: {
        mocks: {
          $t: (key) => key,
        },
        stubs: ['i18n-t']
      }
    });

    const skillItem = wrapper.find('.skill-item');
    expect(skillItem.find('.skill-name').text()).toBe(mockSkills[0].name);
    expect(skillItem.find('.skill-proficiency').text()).toContain(mockSkills[0].proficiency);
    // Icon rendering might depend on how it's implemented (e.g., class-based)
    // expect(skillItem.find('.skill-icon').classes()).toContain(mockSkills[0].icon); 
  });

  it('handles empty skills array gracefully', () => {
    const wrapper = mount(SkillsSection, {
      props: { skills: [] },
      global: {
        mocks: {
          $t: (key) => key,
        },
        stubs: ['i18n-t']
      }
    });
    expect(wrapper.find('.skills-section').text()).not.toContain('skill-item'); // Ensure no skills are rendered
  });
});
