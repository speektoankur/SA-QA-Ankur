import { Page } from "@playwright/test";

export class InventoryScreen {
    constructor(private page: Page) {}

    readonly burgerMenu = '#react-burger-menu-btn';
    readonly inventorySidebarLink = '#inventory_sidebar_link';
    readonly aboutSidebarLink = '#about_sidebar_link';
    readonly logoutSidebarLink = '#logout_sidebar_link';
    readonly resetSidebarLink = '#reset_sidebar_link';
    readonly shoppingCartContainer = '#shopping_cart_container';
    readonly productSortSelect = '.product_sort_container';
    readonly productItemGeneric = '.inventory_list > .inventory_item';
    readonly productItemPrice = '.inventory_item_price';
    readonly productAddToCartButton = '.btn_inventory';
    readonly productName = '.inventory_item_name';

    async clickMenu() {
        await this.page.click(this.burgerMenu);
    }

    async clickInventory() {
        await this.page.click(this.inventorySidebarLink);
    }

    async clickAbout() {
        await this.page.click(this.aboutSidebarLink);
    }

    async clickLogout() {
        await this.page.click(this.logoutSidebarLink);
    }

    async clickReset() {
        await this.page.click(this.resetSidebarLink);
    }

    async clickShoppingCart() {
        await this.page.click(this.shoppingCartContainer);
    }

    async selectProductSort(sortOption: string) {
      await this.page.selectOption(this.productSortSelect, { label: sortOption });
    }

    async getFirstProductPrice() {
      const firstProduct = await this.page.locator(this.productItemGeneric).first();
      const price = await firstProduct.locator(this.productItemPrice).innerText();
      return price;
    }

    async addFirstProductToCart() {
      const firstProduct = await this.page.locator(this.productItemGeneric).first();
      await firstProduct.locator(this.productAddToCartButton).click();
    }

    async getFirstProductName() {
      const firstProduct = await this.page.locator(this.productItemGeneric).first();
      const name = await firstProduct.locator(this.productName).textContent();
      return name;
    }
}