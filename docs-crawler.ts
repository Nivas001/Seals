import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const ASSETS_DIR = path.join(process.cwd(), 'docs', 'assets');
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const PUBLIC_ROUTES = [
  { url: '/', name: 'home' },
  { url: '/about', name: 'about' },
  { url: '/catalog', name: 'catalog' },
  { url: '/contact', name: 'contact' },
  { url: '/industries', name: 'industries' },
  { url: '/products', name: 'products' },
  { url: '/git-blame', name: 'git-blame' },
  { url: '/intelligence-check', name: 'intelligence-check' },
  { url: '/matrix', name: 'matrix' },
  { url: '/rogue-ai', name: 'rogue-ai' },
  { url: '/seal-defender', name: 'seal-defender' },
  { url: '/stress-test', name: 'stress-test' },
  { url: '/system-breach', name: 'system-breach' },
  { url: '/whack-a-leak', name: 'whack-a-leak' },
  { url: '/wizard', name: 'wizard' },
];

const ADMIN_ROUTES = [
  { url: '/admin/dashboard', name: 'admin-dashboard' },
  { url: '/admin/analytics', name: 'admin-analytics' },
  { url: '/admin/categories', name: 'admin-categories' },
  { url: '/admin/contact', name: 'admin-contact' },
  { url: '/admin/hero', name: 'admin-hero' },
  { url: '/admin/inquiries', name: 'admin-inquiries' },
  { url: '/admin/products', name: 'admin-products' },
  { url: '/admin/subscribers', name: 'admin-subscribers' },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const BASE_URL = 'http://localhost:5173';

  console.log('Crawling public routes...');
  for (const route of PUBLIC_ROUTES) {
    console.log(`Navigating to ${route.url}...`);
    try {
      await page.goto(`${BASE_URL}${route.url}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000); // Wait for animations
      await page.screenshot({ path: path.join(ASSETS_DIR, `${route.name}.png`), fullPage: true });
      console.log(`Saved screenshot for ${route.name}`);
    } catch (e) {
      console.error(`Failed to screenshot ${route.name}`, e);
    }
  }

  console.log('Authenticating for Admin routes...');
  try {
    await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    // Fill credentials (assuming there's a login form on /admin if not authenticated)
    // Looking at common auth implementations, we'll try to find input[type="email"] and input[type="password"]
    await page.fill('input[type="email"]', 'aarrkkaainternational@gmail.com').catch(() => {});
    await page.fill('input[type="password"]', 'KumaresaN@#1994').catch(() => {});
    await page.click('button[type="submit"]').catch(() => {});
    await page.waitForTimeout(3000); // wait for login redirect
    await page.screenshot({ path: path.join(ASSETS_DIR, 'admin-login-flow.png'), fullPage: true });
  } catch (e) {
    console.error('Login failed or not needed', e);
  }

  console.log('Crawling admin routes...');
  for (const route of ADMIN_ROUTES) {
    console.log(`Navigating to ${route.url}...`);
    try {
      await page.goto(`${BASE_URL}${route.url}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000); // Wait for admin data to load
      await page.screenshot({ path: path.join(ASSETS_DIR, `${route.name}.png`), fullPage: true });
      console.log(`Saved screenshot for ${route.name}`);
    } catch (e) {
      console.error(`Failed to screenshot ${route.name}`, e);
    }
  }

  await browser.close();
  console.log('Crawling complete!');
}

run().catch(console.error);
