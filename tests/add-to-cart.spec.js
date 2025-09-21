const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');

test('Go to Reserved.com, accept cookies, add product to cart and verify', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.goto();
  await homePage.acceptCookies();

  const { name: productName, price: productPrice } = await homePage.getFirstProductDetails();
  console.log('First product:', productName, '| price:', productPrice);

  await homePage.goToFirstProduct();
  const { name: productPageName, price: productPagePrice } = await productPage.getProductDetails();
  console.log('PRODUCT PAGE:', productPageName, '|', productPagePrice);

  expect(productPageName).toContain(productName.split(' ')[0]);
  expect(productPagePrice).toBe(productPrice);

  await productPage.selectSizeAndAddToCart();

  const { name: cartProductName, price: cartProductPrice } = await cartPage.getCartProductDetails();
  console.log('CART PRODUCT:', cartProductName, '|', cartProductPrice);

  expect(cartProductName).toContain(productName.split(' ')[0]);
  expect(cartPage.normalizePrice(cartProductPrice)).toBe(cartPage.normalizePrice(productPrice));
});
