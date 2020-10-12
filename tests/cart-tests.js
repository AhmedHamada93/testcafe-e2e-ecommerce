import * as constants from "../resources/constants";
import HomePage from "../pages/home-page";

const homePage = new HomePage();

fixture('Cart')
    .page(constants.getEnvironmentURL())
    .meta({feature: 'Cart', severity: 'Critical'});


test(`should add item to the cart`, async t => {
    await t.maximizeWindow();
    await homePage.navigateToCategory('women');
    // select random sub category
    await homePage.navigateToRandomSubCategory();
    const productName = await homePage.getRandomProductName();
    await homePage.addProductToCart(productName);
    await t.expect(homePage.addToCartSuccessMsg.exists).ok('Failed to add product to the card')
});

test(`should remove item from the cart`, async t => {
    const currentProductName = await homePage.addRandomProductToCart();
    await t.click(homePage.cart);
    await t.click(homePage.removeFromCart);
    await t.expect(homePage.emptyCartWarning.exists).ok('Failed to remove product from the card')
})