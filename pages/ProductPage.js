class ProductPage {
  constructor(page) {
    this.page = page;
    this.productName = page.locator('[data-testid="product-name"]');
    this.productPrice = page.locator('[data-selen="product-price"]').first();
    this.sizeOptions = page.locator('[data-testid="size"]');
    this.addToCartButton = page.locator('[data-testid="add-to-cart-button"]');
    this.goToCartConfirmation = page.locator('[data-testid="cart-confirmation-go-to-cart"]');
  }

  async getProductDetails() {
    const name = (await this.productName.innerText()).trim();
    const price = (await this.productPrice.innerText()).trim();
    return { name, price };
  }

  async selectSizeAndAddToCart() {
    const availableSize = this.sizeOptions.first();
    await availableSize.waitFor({ state: 'visible', timeout: 10000 });
    const sizeText = await availableSize.innerText();
    await availableSize.click();
    console.log(`Size selected: ${sizeText}`);

    await this.addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addToCartButton.click();
    console.log('Product added to cart!');

    await this.goToCartConfirmation.waitFor({ state: 'visible', timeout: 10000 });
    await this.goToCartConfirmation.click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log('Redirection to cart finished!');
  }
}

module.exports = ProductPage;
