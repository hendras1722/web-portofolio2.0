import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([{ name: 'i18n_redirected', value: 'id', url: baseURL ?? 'http://localhost:3000/' }])
})

test('home introduces the developer and links to tools and profiles', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Muh Syahendra Anindyantoro')
  await expect(page.getByText('INA Digital Health')).toBeVisible()
  await expect(page.getByText('Nuxt · Next.js · React · Vue')).toBeVisible()
  await expect(page.getByRole('main').getByRole('heading', { name: 'Proyek' })).toHaveCount(0)
  await expect(page.getByRole('main').getByRole('heading', { name: 'Pengalaman' })).toHaveCount(0)

  for (const [label, href] of [
    ['use-react-utilities', 'https://www.npmjs.com/package/use-react-utilities'],
    ['react-hook-form-easy-access', 'https://www.npmjs.com/package/react-hook-form-easy-access'],
    ['msa-cli', 'https://www.npmjs.com/package/msa-cli'],
    ['GitHub', 'https://github.com/hendras1722'],
    ['LinkedIn', 'https://www.linkedin.com/in/muhsyahendraa/'],
  ]) {
    await expect(page.getByRole('main').getByRole('link', { name: label })).toHaveAttribute('href', href)
  }
})

test('navigation opens dedicated project and experience pages and preserves locale', async ({ page }) => {
  await page.goto('/')
  const navigation = page.getByRole('navigation', { name: 'Navigasi utama' })

  await navigation.getByRole('link', { name: 'Proyek' }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Proyek' })).toBeVisible()
  await expect(page.getByRole('link', { name: /POSAPP Cashier/ })).toBeVisible()

  await page.getByRole('navigation', { name: 'Pilih bahasa' }).getByRole('link', { name: 'EN' }).click()
  await expect(page).toHaveURL(/\/en\/projects$/)
  await expect(page).toHaveTitle(/Projects/)

  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Experience' }).click()
  await expect(page).toHaveURL(/\/en\/experience$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Experience' })).toBeVisible()
  await expect(page.getByText('Privy', { exact: false })).toBeVisible()
})

test('navigation spans the viewport without horizontal overflow on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')

  const header = page.locator('.navigation')
  await expect(header).toBeVisible()
  expect(await header.evaluate(element => element.getBoundingClientRect().width)).toBe(375)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375)
  await expect(page.getByRole('navigation', { name: 'Navigasi utama' }).getByRole('link', { name: 'Pengalaman' })).toBeVisible()
})

test('theme switch persists across portfolio and article routes', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(5, 5, 5)')

  await page.getByRole('button', { name: 'Ganti ke mode terang' }).click()
  await expect(page.locator('html')).toHaveClass(/light/)
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(248, 250, 248)')
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#f8faf8')

  await page.getByRole('navigation', { name: 'Navigasi utama' }).getByRole('link', { name: 'Proyek' }).click()
  await expect(page).toHaveURL(/\/projects$/)
  await page.reload()
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(248, 250, 248)')

  await page.getByRole('navigation', { name: 'Navigasi utama' }).getByRole('link', { name: 'Pengalaman' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Pengalaman' })).toBeVisible()
  await page.getByRole('navigation', { name: 'Navigasi utama' }).getByRole('link', { name: 'Artikel terbaru' }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'Catatan teknis' })).toBeVisible()
  await page.locator('.archive__list a').first().click()
  await expect(page.locator('.reading-article')).toBeVisible()
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(248, 250, 248)')

  await page.getByRole('button', { name: 'Ganti ke mode gelap' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(5, 5, 5)')
  await page.goto('/')
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(5, 5, 5)')
})

test('articles keep the portfolio navigation and English locale across archive and detail', async ({ page }) => {
  await page.goto('/en/blog')
  const navigation = page.getByRole('navigation', { name: 'Main navigation' })
  const articles = navigation.getByRole('link', { name: 'Latest articles' })

  await expect(articles).toHaveAttribute('aria-current', 'page')
  await page.locator('.archive__list a').first().click()
  await expect(page).toHaveURL(/\/en\/blog\/[^/]+$/)
  await expect(page.locator('.reading-article')).toBeVisible()
  await expect(articles).toHaveAttribute('aria-current', 'page')
  await expect(page.getByRole('main').getByRole('link', { name: /Back to all articles/ }).first()).toHaveAttribute('href', '/en/blog')

  await navigation.getByRole('link', { name: 'Projects' }).click()
  await expect(page).toHaveURL(/\/en\/projects$/)
  await articles.click()
  await expect(page).toHaveURL(/\/en\/blog$/)

  await page.setViewportSize({ width: 375, height: 812 })
  await expect(navigation.getByRole('link', { name: 'Experience' })).toBeVisible()
  await page.locator('.archive__list a').first().click()
  await expect(page).toHaveURL(/\/en\/blog\/[^/]+$/)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375)
})

test('home has no accessibility violations', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  const scan = await new AxeBuilder({ page }).analyze()
  expect(scan.violations).toEqual([])
})
