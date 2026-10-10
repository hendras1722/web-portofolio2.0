<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="introduction" aria-labelledby="intro-title">
    <h1 id="intro-title">{{ t('portfolio.greeting') }} <span>Muh Syahendra Anindyantoro</span></h1>
    <p class="introduction__lead">{{ t('portfolio.about_lead') }}</p>
    <div class="introduction__details">
      <p>{{ t('portfolio.current_role') }} <strong>INA Digital Health</strong></p>
      <p>{{ t('portfolio.main_stack') }} <strong>Nuxt · Next.js · React · Vue</strong></p>
    </div>
    <div class="introduction__story">
      <p>{{ t('portfolio.about_ideas') }}</p>
      <p>
        {{ t('portfolio.about_tools') }}
        <a href="https://www.npmjs.com/package/use-react-utilities" target="_blank"
          rel="noopener noreferrer">use-react-utilities</a>,
        <a href="https://www.npmjs.com/package/react-hook-form-easy-access" target="_blank"
          rel="noopener noreferrer">react-hook-form-easy-access</a>,
        {{ t('portfolio.and') }}
        <a href="https://www.npmjs.com/package/msa-cli" target="_blank" rel="noopener noreferrer">msa-cli</a>.
      </p>
      <p>{{ t('portfolio.about_learning') }}</p>
      <p>
        {{ t('portfolio.about_connect_before') }}
        <a href="https://github.com/hendras1722" target="_blank" rel="noopener noreferrer">GitHub</a>,
        {{ t('portfolio.about_connect_middle') }}
        <a href="https://www.linkedin.com/in/muhsyahendraa/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
        {{ t('portfolio.about_connect_after') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.introduction {
  padding: clamp(4.5rem, 12vw, 8rem) 0 clamp(4.5rem, 10vw, 7rem);
}

h1 {
  margin: 0;
  color: var(--text);
  font-size: clamp(2.7rem, 8vw, 4.8rem);
  font-weight: 600;
  letter-spacing: -0.075em;
  line-height: 1.08;
}

h1 span {
  color: var(--accent-soft);
}

.introduction__lead {
  margin: 1.75rem 0 2rem;
  color: var(--text);
  font-size: clamp(1.1rem, 2.5vw, 1.25rem);
  line-height: 1.7;
}

.introduction__details {
  margin: 0 0 3rem;
  padding: 1.1rem 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.introduction__details p {
  margin: 0.3rem 0;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.8;
}

strong {
  color: var(--text);
  font-weight: 600;
}

.introduction__story p {
  margin: 0 0 1.6rem;
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.85;
}

.introduction__story p:last-child {
  margin-bottom: 0;
}

a {
  color: var(--accent);
  text-decoration: underline;
  text-decoration-color: var(--accent-soft);
  text-underline-offset: 0.2rem;
  overflow-wrap: anywhere;
}

a:hover {
  color: var(--accent-hover);
}

a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}
</style>
