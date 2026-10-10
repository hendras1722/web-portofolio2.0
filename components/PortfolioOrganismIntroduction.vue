<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="introduction" aria-labelledby="intro-title">
    <h1 id="intro-title">{{ t('portfolio.greeting') }} <span>Muh Syahendra Anindyantoro</span></h1>
    <p class="introduction__lead">{{ t('portfolio.about_lead') }}</p>
    <div class="introduction__details">
      <p>{{ t('portfolio.current_role') }} <strong>INA Digital Health</strong></p>
      <p class="introduction__stack">
        <span>{{ t('portfolio.main_stack') }}</span>
        <span class="introduction__stack-items">
          <span class="introduction__stack-item">
            <UIcon name="i-simple-icons-nuxt" aria-hidden="true" />Nuxt
          </span>
          <span class="introduction__stack-item">
            <UIcon name="i-simple-icons-nextdotjs" aria-hidden="true" />Next.js
          </span>
          <span class="introduction__stack-item">
            <UIcon name="i-simple-icons-react" aria-hidden="true" />React
          </span>
          <span class="introduction__stack-item">
            <UIcon name="i-simple-icons-vuedotjs" aria-hidden="true" />Vue
          </span>
        </span>
      </p>
    </div>
    <div class="introduction__story">
      <p>
        {{ t('portfolio.about_ideas') }}&nbsp;{{ t('portfolio.about_ideas_projects') }}&nbsp;<NuxtLink
          :to="localePath('/projects')">{{ t('portfolio.project_page') }}</NuxtLink>.
      </p>
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
      <div class="introduction__find-me">
        <h2>{{ t('portfolio.find_me') }}</h2>
        <ul>
          <li>
            <a class="introduction__social-link" href="https://github.com/hendras1722" target="_blank"
              rel="noopener noreferrer" aria-label="GitHub">
              <UIcon name="i-simple-icons-github" class="introduction__social-icon" aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <a class="introduction__social-link" href="https://www.linkedin.com/in/muhsyahendraa/" target="_blank"
              rel="noopener noreferrer" aria-label="LinkedIn">
              <UIcon name="i-simple-icons-linkedin" class="introduction__social-icon" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </li>
          <li class="introduction__email-link">
            <span>{{ t('portfolio.email_me_at') }} </span><a
              href="mailto:muhsyahendraa1722@gmail.com">muhsyahendraa1722@gmail.com</a>
          </li>
        </ul>
      </div>
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

.introduction__stack,
.introduction__stack-items,
.introduction__stack-item {
  display: inline-flex;
  align-items: center;
}

.introduction__stack {
  flex-wrap: wrap;
  gap: 0.5rem;
}

.introduction__stack-items {
  flex-wrap: wrap;
  gap: 0.4rem 0.75rem;
}

.introduction__stack-item {
  gap: 0.3rem;
  color: var(--text);
  font-weight: 600;
}

.introduction__stack-item :deep(.iconify) {
  width: 1rem;
  height: 1rem;
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


.introduction__find-me {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
}

.introduction__find-me h2 {
  margin: 0 0 0.75rem;
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.introduction__find-me ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.introduction__social-link {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  border-radius: 0.5rem;
  color: var(--text);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 160ms ease, background-color 160ms ease;
}

.introduction__social-icon {
  width: 1.35rem;
  height: 1.35rem;
}

.introduction__social-link:hover {
  background-color: var(--line);
  color: var(--accent);
}

.introduction__email-link {
  margin-left: 0.5rem;
  padding-left: 1rem;
  border-left: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.95rem;
}

.introduction__email-link>span {
  margin-right: 0.25rem;
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
