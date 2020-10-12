import * as constants from "../resources/constants";
import HomePage from "../pages/home-page";
import LoginPage from "../pages/login";
import CheckoutPage from "../pages/checkout-page";

const homePage = new HomePage();
const loginPage = new LoginPage();
const checkoutPage = new CheckoutPage();


fixture('Checkout')
    .page(constants.getEnvironmentURL())
    .meta({feature: 'Checkout', severity: 'Critical'});

const checkoutData = [
    {
        acceptToS: true,
        alreadyLoggedIn: false,
        testName: 'checkout full scenario',
    },
    {
        acceptToS: false,
        alreadyLoggedIn: false,
        testName: 'should not proceed checkout if ToS are not accepted'
    },
    {
        acceptToS: true,
        alreadyLoggedIn: true,
        testName: 'should skip login step if user already logged in'
    }
]

checkoutData.forEach(testData => {
    test(`${testData.testName}`, async t => {
        if (testData.alreadyLoggedIn) {
           await t.navigateTo(constants.getLoginPageUrl());
           await loginPage.login();
        }
        await homePage.addRandomProductToCart();
        await t.click(homePage.cart);
        await t.expect(checkoutPage.currentCheckoutStep.innerText).contains('Summary');
        await t.click(checkoutPage.checkoutButton);
        if (!testData.alreadyLoggedIn) {
            await t.expect(checkoutPage.currentCheckoutStep.innerText).contains('Sign in');
            await loginPage.login();
        }
        await t.expect(checkoutPage.currentCheckoutStep.innerText).contains('Address');
        await t.click(checkoutPage.addressDrpDwn);
        await t.click(checkoutPage.myAdressDrpDwnOption);
        await t.click(checkoutPage.addressCheckoutButton);
        await t.expect(checkoutPage.currentCheckoutStep.innerText).contains('Shipping');
        if (testData.acceptToS) {
            await t.click(checkoutPage.termsOfServicesChkBx);
            await t.click(checkoutPage.checkoutButton);
            await t.expect(checkoutPage.currentCheckoutStep.innerText).contains('Payment');
            await t.click(checkoutPage.bankWirePayment);
            await t.click(checkoutPage.orderConfirmBtn);
            await t.expect(checkoutPage.orderCompleteMsg.exists).ok('Order confirmation Failed...');
        } else {
            await t.click(checkoutPage.checkoutButton);
            await t.expect(checkoutPage.termsOfServiceErrorMsg.exists).ok('Checkout completed without accepting ToS...')
        }
    });
})