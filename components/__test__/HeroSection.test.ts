import { describe, it, expect } from 'bun:test';
import { mount } from '@vue/test-utils'; // Assuming @vue/test-utils or similar is available for Vue testing with Bun

// Import the component to be tested
import HeroSection from '../HeroSection.vue';

// Mock data for the profile prop
const mockProfile = {
  name: 'Test User',
  title: 'Software Engineer',
  bio: 'This is a test bio.',
  image: '/test-avatar.png', // Mock image path
};

// Mock UAvatar component to avoid potential rendering issues if not globally available in test env
const UAvatar = {
  template: '<img :src="src" :alt="alt" :class="size">',
  props: ['src', 'alt', 'size'],
};

// Mocking v-motion directives if they cause issues in testing
// For now, assuming they don't interfere with basic assertions.

describe('HeroSection.vue', () => {
  it('renders hero section with provided profile data', () => {
    const wrapper = mount(HeroSection, {
      props: {
        profile: mockProfile,
      },
      // If components like UAvatar or directives are not automatically available, they might need to be registered here.
      // For this example, we assume mount handles basic Vue SFCs or has necessary mocks.
      global: {
        components: {
          UAvatar: UAvatar, // Mock UAvatar
        },
        stubs: ['v-motion-slide-visible-once-bottom'] // Stub motion if it causes issues
      }
    });

    // Assertions
    expect(wrapper.find('h1').text()).toContain('Test User');
    expect(wrapper.find('h2').text()).toContain('Software Engineer');
    expect(wrapper.find('p').text()).toContain('This is a test bio.');
    // Check if the UAvatar component is rendered with the correct src prop
    expect(wrapper.findComponent(UAvatar).props().src).toBe('/test-avatar.png');
  });

  it('renders default avatar if image prop is not provided', () => {
    const mockProfileNoImage = {
      name: 'Test User',
      title: 'Software Engineer',
      bio: 'This is a test bio.',
      // No image property provided
    };
    const wrapper = mount(HeroSection, {
      props: {
        profile: mockProfileNoImage,
      },
      global: {
        components: {
          UAvatar: UAvatar,
        },
        stubs: ['v-motion-slide-visible-once-bottom']
      }
    });
    // Check if the UAvatar defaults to '/me.png'
    expect(wrapper.findComponent(UAvatar).props().src).toBe('/me.png');
  });

  // Add more tests here if needed, e.g., for different animations or edge cases.
});
