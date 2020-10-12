import {Selector} from "testcafe";

export default class CheckoutPage {
    constructor() {
        this.checkoutButton = Selector('.standard-checkout');
        this.addressCheckoutButton = Selector('button').withAttribute('name', 'processAddress')
        this.currentCheckoutStep = Selector('.step_current');
        this.addressDrpDwn = Selector('#id_address_delivery');
        this.myAdressDrpDwnOption = this.addressDrpDwn.find('option').withText('My address');
        this.termsOfServicesChkBx = Selector('#cgv');
        this.bankWirePayment = Selector('.bankwire');
        this.chequePayment = Selector('.cheque');
        this.orderConfirmBtn = Selector('button').withText('I confirm my order');
        this.orderCompleteMsg = Selector('.dark').withText('Your order on My Store is complete');
        this.termsOfServiceErrorMsg = Selector('.fancybox-error').withText('You must agree to the terms of service before continuing');
    }

}