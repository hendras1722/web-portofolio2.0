import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });

  const projects = [
    { name: 'posapp-cashier', url: 'https://cashier.my.id/' },
    { name: 'insira', url: 'https://insira.id/' },
    { name: 'tpm', url: 'https://tpm-fe.scylla.id/' }
  ];

  for (const project of projects) {
    const page = await context.newPage();
    console.log(`Navigating to ${project.url}...`);
    try {
      await page.goto(project.url, { waitUntil: 'networkidle', timeout: 30000 });
      // wait a little bit just in case there are animations
      await page.waitForTimeout(2000);
      await page.screenshot({ path: `public/images/projects/${project.name}.png` });
      console.log(`Saved screenshot for ${project.name}`);
    } catch (error) {
      console.error(`Failed to screenshot ${project.url}:`, error.message);
    }
    await page.close();
  }

  await browser.close();
})();
