import {Selector, t} from 'testcafe';
import * as constants from "../resources/constants";
import Utils from "../utils/utils";

const utils = new Utils();

export default class HomePage {
    constructor() {
        this.loginBtn = Selector('.login');
        this.categoryTab = {
            "women": Selector('a').withText("WOMEN"),
            "dresses": Selector('a').withText("DRESSES"),
            "tshirts": Selector('a').withText("T-SHIRTS")
        };
        this.breadCrumb = Selector('.breadcrumb');
        this.subCategory = Selector('.tree a');
        this.productName = Selector('.product-container .product-name');
        this.addToCartBtn = Selector('button').withText('Add to cart');
        this.addToCartSuccessMsg = Selector('h2').withText('Product successfully added to your shopping cart');
        this.closeCartIcon = Selector('.cross');
        this.cart = Selector('.shopping_cart a');
        this.removeFromCart = Selector('.cart_quantity_delete');
        this.emptyCartWarning = Selector('.alert.alert-warning').withText('Your shopping cart is empty.');
        this.loadingIcon = Selector('ul p').withText('Loading...');
        this.subFilter = Selector('label a');
        this.accountData = Selector('.header_user_info .account');
    }

    /**
     * Function to Navigate to Main Categories [WOMEN - DRESSES - T-SHIRTS]
     * Prerequisite: should be called on HomePage
     * @param category
     * @returns {Promise<void>}
     */
    async navigateToCategory(category) {
        await t.click(this.categoryTab[category]);
        await t.expect((await this.breadCrumb.innerText).toLowerCase()).contains(category.toLowerCase())
    }

    /**
     * Function that randomly navigate to last Subcategory
     * Prerequisite: should be called on HomePage
     * Example: Women > Tops > Tshirts or Women > Dresses > Casual Dresses
     * @returns {Promise<void>}
     */
    async navigateToRandomSubCategory() {
        const randomCategory = await utils.getRandomObjectKey(constants.getCategories().women.subCategories);
        const randomSubCategory = await utils.getRandomArrayElement(constants.getCategories().women.subCategories[randomCategory].subCategories)

        await t.click(this.subCategory.withText(randomCategory));
        await t.expect((await this.breadCrumb.innerText).toLowerCase()).contains(randomCategory.toLowerCase());

        await t.click(this.subCategory.withText(randomSubCategory));
        await t.expect((await this.breadCrumb.innerText).toLowerCase()).contains(randomSubCategory.toLowerCase());
    }

    /**
     * Function to get random product name from the list
     * Prerequisite: Products should be displayed
     * @returns {Promise<string>}
     */
    async getRandomProductName() {
        const productsCount = await this.productName.count;
        return this.productName.nth(await utils.getRandomIndex(productsCount)).innerText;
    }

    /**
     * Function to add given product name to the cart.
     * Prerequisite: Given Product name should be displayed.
     * @param productName
     * @returns {Promise<void>}
     */
    async addProductToCart(productName) {
        await t.click(this.productName.withText(productName));
        await t.click(this.addToCartBtn);
    }

    /**
     * Function to add random product to the cart.
     * Prerequisite: Products should be displayed
     * @returns {Promise<string>}
     */
    async addRandomProductToCart() {
        await this.navigateToCategory('women');
        await this.navigateToRandomSubCategory();
        const randomProductName = await this.getRandomProductName()
        await this.addProductToCart(randomProductName);
        await t.expect(this.addToCartSuccessMsg.exists).ok('Failed to add product to the card');
        await t.click(this.closeCartIcon);
        return randomProductName;
    }

}

