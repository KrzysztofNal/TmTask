const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const { timeout } = require('../playwright.config');

test('Go to Reserved.com, accept cookies, add product to cart and verify', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.goto();
  await homePage.acceptCookies();
  await homePage.goToFirstProduct();
  await productPage.selectSizeAndAddToCart();

  const proceedToCheckoutButton = page.locator('[data-selen="order-link"]');
  await proceedToCheckoutButton.waitFor({ state: 'visible', timeout: 10000 });
  await proceedToCheckoutButton.click();
  await page.waitForLoadState('domcontentloaded');
  
  const loginForm = page.locator('[data-active-form="login"]');
  const registerButton = page.locator('[data-selen="register-select"]');
  
  if (await loginForm.isVisible({ timeout: 5000 })) {
  console.log('Login form is displayed. You need to log in to continue.');
}
});
