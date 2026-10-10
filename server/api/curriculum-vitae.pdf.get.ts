import chromium from '@sparticuz/chromium'
import puppeteer, { type Browser } from 'puppeteer-core'

const LOCAL_CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

async function launchBrowser(): Promise<Browser> {
  const isVercel = process.env.VERCEL === '1'
  const executablePath = isVercel
    ? await chromium.executablePath()
    : process.env.PUPPETEER_EXECUTABLE_PATH || LOCAL_CHROME_PATH

  return puppeteer.launch({
    args: isVercel ? chromium.args : [],
    defaultViewport: {
      width: 794,
      height: 1123,
      deviceScaleFactor: 1,
    },
    executablePath,
    headless: isVercel ? 'shell' : true,
  })
}

export default defineEventHandler(async (event) => {
  const requestedLocale = getQuery(event).locale
  const locale = requestedLocale === 'en' ? 'en' : 'id'
  const sourceUrl = getRequestURL(event)
  sourceUrl.pathname = '/curriculum-vitae'
  sourceUrl.search = ''
  sourceUrl.searchParams.set('locale', locale)
  sourceUrl.searchParams.set('print', 'true')

  let browser: Browser | undefined

  try {
    browser = await launchBrowser()
    const page = await browser.newPage()

    await page.goto(sourceUrl.href, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('.cv-container')
    await page.evaluate(() => document.fonts.ready)
    await page.emulateMediaType('print')

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
    })

    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `attachment; filename="CV_Muh-Syahendra-A_${locale}.pdf"`)
    setHeader(event, 'Cache-Control', 'no-store, max-age=0')

    return Buffer.from(pdf)
  } catch (error) {
    console.error('Failed to generate curriculum vitae PDF', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to generate the curriculum vitae PDF',
    })
  } finally {
    await browser?.close()
  }
})
