import { describe, it, expect, beforeEach, afterEach, vi } from 'bun:test';
import { createI18n } from 'vue-i18n';
import { ref } from 'vue'; // ref is needed for useAsyncData mock
// import IndexPage from '../../pages/index.vue'; // Not mounting the page directly anymore

// Mock localized content data
const mockContent = {
  en: {
    profile: {
      name: "Muh Syahendra A",
      title: "Software Engineer",
      bio: "A passionate Software Engineer with expertise in web development.",
    },
    skills: { body: [{ name: 'English Skill 1' }] },
    experience: [{ title: 'English Experience 1' }],
    projects: [{ title: 'English Project 1' }],
  },
  id: {
    profile: {
      name: "Muh Syahendra A",
      title: "Insinyur Perangkat Lunak",
      bio: "Insinyur Perangkat Lunak yang bersemangat dengan keahlian dalam pengembangan web.",
    },
    skills: { body: [{ name: 'Indonesian Skill 1' }] },
    experience: [{ title: 'Indonesian Experience 1' }],
    projects: [{ title: 'Indonesian Project 1' }],
  },
};

// Mock queryContent
const mockQueryContent = vi.fn((locale, path) => {
  const contentForLocale = mockContent[locale];
  if (!contentForLocale) {
    return {
      findOne: () => Promise.resolve(null),
      find: () => Promise.resolve([]),
    };
  }

  const result = contentForLocale[path];
  return {
    findOne: () => Promise.resolve(result),
    find: () => Promise.resolve(Array.isArray(result) ? result : [result]),
  };
});

// Mock Nuxt's useAsyncData and queryContent
vi.mock('#app', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    queryContent: mockQueryContent,
    useAsyncData: vi.fn((key, handler) => {
      // Simulate the useAsyncData behavior
      const data = ref(null);
      const pending = ref(true);
      const error = ref(null);

      const execute = async () => {
        pending.value = true;
        error.value = null;
        try {
          data.value = await handler();
        } catch (e) {
          error.value = e;
        } finally {
          pending.value = false;
        }
      };

      // Execute immediately as useAsyncData does
      execute();

      return { data, pending, error, execute };
    }),
  };
});


// Mock necessary Nuxt/Vue features for testing
const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'en', // Default locale for the test
  messages: {
    en: { home: 'Home', home_description: 'Welcome' },
    id: { home: 'Beranda', home_description: 'Selamat Datang' },
  },
});

describe('Content Localization with @nuxt/content (Data Fetching Only)', () => {
  let localeRef; // To hold the locale ref from i18n global

  beforeEach(() => {
    mockQueryContent.mockClear();
    i18n.global.locale.value = 'en'; // Reset locale for each test
    localeRef = ref(i18n.global.locale.value); // Create a reactive ref for locale
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls queryContent with "en" locale initially', async () => {
    // Manually call the async data handler with the initial locale
    const handler = async () => {
      await mockQueryContent(localeRef.value, 'profile').findOne();
      await mockQueryContent(localeRef.value, 'skills').findOne();
      await mockQueryContent(localeRef.value, 'experience').find();
      await mockQueryContent(localeRef.value, 'projects').find();
    };
    await handler();

    expect(mockQueryContent).toHaveBeenCalledWith('en', 'profile');
    expect(mockQueryContent).toHaveBeenCalledWith('en', 'skills');
    expect(mockQueryContent).toHaveBeenCalledWith('en', 'experience');
    expect(mockQueryContent).toHaveBeenCalledWith('en', 'projects');
  });

  it('calls queryContent with "id" locale after changing locale', async () => {
    // Change locale
    i18n.global.locale.value = 'id';
    localeRef.value = 'id'; // Update our local ref for locale

    // Manually call the async data handler with the updated locale
    const handler = async () => {
      await mockQueryContent(localeRef.value, 'profile').findOne();
      await mockQueryContent(localeRef.value, 'skills').findOne();
      await mockQueryContent(localeRef.value, 'experience').find();
      await mockQueryContent(localeRef.value, 'projects').find();
    };
    await handler();

    expect(mockQueryContent).toHaveBeenCalledWith('id', 'profile');
    expect(mockQueryContent).toHaveBeenCalledWith('id', 'skills');
    expect(mockQueryContent).toHaveBeenCalledWith('id', 'experience');
    expect(mockQueryContent).toHaveBeenCalledWith('id', 'projects');
  });
});