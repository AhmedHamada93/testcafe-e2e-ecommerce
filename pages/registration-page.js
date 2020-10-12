import {Selector, t} from "testcafe";
import * as constants from "../resources/constants";
import faker from "faker";

export default class RegistrationPage {
    constructor() {
        this.createAccountBtn = Selector('#SubmitCreate');
        this.newEmailField = Selector('#email_create');
        this.registrationPageHeader = Selector('.page-heading').withText('CREATE AN ACCOUNT');
        this.newEmailError = Selector('#create_account_error');
        this.firstNameField = Selector('#customer_firstname');
        this.lastNameField = Selector('#customer_lastname');
        this.emailField = Selector('#email');
        this.passwordField = Selector('#passwd');
        this.addressField = Selector('#address1');
        this.stateDrpDwn = Selector('#id_state');
        this.postalCodeField = Selector('#postcode');
        this.mobileField = Selector('#phone_mobile');
        this.cityField = Selector('#city');
        this.registerBtn = Selector('#submitAccount');
        this.registrationFormError = Selector('.alert.alert-danger');
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
    }

    getRegistrationEmail(emailStatus) {
        switch (emailStatus) {
            case 'valid':
                return `${this.firstName.toLowerCase()}${this.lastName.toLowerCase()}${Date.now()}@${faker.lorem.word()}.${faker.internet.domainSuffix()}`
            case 'invalid':
                return `${faker.name.firstName().toLowerCase()}${faker.name.lastName().toLowerCase()}`
            case 'alreadyUsed':
                return `${constants.getUserName()}`
        }
    }

    async fillRegistrationForm(excludedFields = []) {
        let firstName, lastName, password;
        if (!excludedFields.includes('firstNameField')) {
            firstName = faker.name.firstName();
            await t.typeText(this.firstNameField, firstName);
        }

        if (!excludedFields.includes('lastNameField')) {
            lastName = faker.name.lastName(0);
            await t.typeText(this.lastNameField, lastName)
        }

        if (!excludedFields.includes('passwordField')) {
            password = faker.internet.password();
            await t.typeText(this.passwordField, password)
        }

        if (!excludedFields.includes('addressField'))
            await t.typeText(this.addressField, faker.address.streetAddress(true))

        if (!excludedFields.includes('postalCodeField'))
            await t.typeText(this.postalCodeField, faker.address.zipCode('00000'))

        if (!excludedFields.includes('mobileField'))
            await t.typeText(this.mobileField, faker.phone.phoneNumber('01#########'))


        if (!excludedFields.includes('cityField'))
            await t.typeText(this.cityField, faker.address.city())

        if (!excludedFields.includes('stateDrpDwn')) {
            await t.click(this.stateDrpDwn);
            await t.click(this.stateDrpDwn.find('option').withText(faker.address.state()))
        }

        return {
            firstName,
            lastName,
            password
        }
    }

}