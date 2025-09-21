class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProductName = page.locator('[data-selen="product-url"]');
    this.cartProductPrice = page.locator('[data-selen="cart-final-price"]');
  }

  async getCartProductDetails() {
    const name = (await this.cartProductName.innerText()).trim();
    const price = (await this.cartProductPrice.innerText()).trim();
    return { name, price };
  }

  normalizePrice(price) {
    return price.replace(/\s+/g, ' ').trim();
  }
}

module.exports = CartPage;
