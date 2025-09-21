class HomePage {
  constructor(page) {
    this.page = page;
    this.acceptCookiesButton = page.locator('#cookiebotDialogOkButton, #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAllFull').first();
    this.firstProduct = page.locator('article.es-product').first();
  }

  async goto() {
    await this.page.goto('https://www.reserved.com/pl/pl/mezczyzna/t-shirty');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async acceptCookies() {
    if (await this.acceptCookiesButton.isVisible({ timeout: 5000 })) {
      await this.acceptCookiesButton.click();
      console.log('Cookies accepted successfully!');
    }
  }

  async getFirstProductDetails() {
    await this.firstProduct.waitFor({ state: 'visible', timeout: 15000 });
    const name = (await this.firstProduct.locator('.es-product-name a').innerText()).trim();
    const price = (await this.firstProduct.locator('.es-product-price span').innerText()).trim();
    return { name, price };
  }

  async goToFirstProduct() {
    await this.firstProduct.locator('.es-product-name a').click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = HomePage;
