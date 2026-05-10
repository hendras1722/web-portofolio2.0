import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectsSection from '~/components/ProjectsSection.vue';

// Mocking i18n
const mockI18n = {
  methods: {
    t: (key) => key
  }
};

const mockProjects = [
  { title: "E-commerce Platform", description: "Developed a full-stack e-commerce platform.", technologies: ["Nuxt.js", "Node.js"], link: "https://example.com/ecommerce", image: "/images/project-ecommerce.png" },
  { title: "Portfolio Website 1.0", description: "Personal portfolio showcasing skills.", technologies: ["Vue.js"], link: "https://example.com/old-portfolio", image: "/images/project-portfolio.png" },
];

describe('ProjectsSection.vue', () => {
  it('renders the correct number of projects', () => {
    const wrapper = mount(ProjectsSection, {
      props: { projects: mockProjects },
      global: {
        mocks: {
          $t: (key) => key,
        },
        stubs: ['i18n-t']
      }
    });

    expect(wrapper.findAll('.project-item').length).toBe(mockProjects.length);
  });

  it('renders correct details for each project', () => {
    const wrapper = mount(ProjectsSection, {
      props: { projects: [mockProjects[0]] },
      global: {
        mocks: {
          $t: (key) => key,
        },
        stubs: ['i18n-t']
      }
    });

    const projectItem = wrapper.find('.project-item');
    expect(projectItem.find('.project-title').text()).toBe(mockProjects[0].title);
    expect(projectItem.find('.project-description').text()).toBe(mockProjects[0].description);
    expect(projectItem.find('.project-technologies').text()).toContain(mockProjects[0].technologies.join(' '));
    expect(projectItem.find('a[target="_blank"]').attributes('href')).toBe(mockProjects[0].link);
  });

  it('handles empty projects array gracefully', () => {
    const wrapper = mount(ProjectsSection, {
      props: { projects: [] },
      global: {
        mocks: {
          $t: (key) => key,
        },
        stubs: ['i18n-t']
      }
    });
    expect(wrapper.find('.projects-section').text()).not.toContain('project-item'); // Ensure no projects are rendered
  });
});
