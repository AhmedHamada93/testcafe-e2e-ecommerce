import * as constants from "../resources/constants";
import RegistrationPage from "../pages/registration-page";
import HomePage from "../pages/home-page";

const registrationPage = new RegistrationPage();
const homePage = new HomePage()

fixture('Registration')
    .page(constants.getLoginPageUrl())
    .meta({feature: 'Registration', severity: 'Critical'});

test(`Resitration full scenario`, async t => {
    await t.navigateTo(constants.getLoginPageUrl());
    await t.typeText(registrationPage.newEmailField, registrationPage.getRegistrationEmail('valid'));
    await t.click(registrationPage.createAccountBtn);
    const registrationData = await registrationPage.fillRegistrationForm();
    await t.click(registrationPage.registerBtn);
    await t.expect(homePage.accountData.withText(`${registrationData.firstName} ${registrationData.lastName}`).exists).ok('Registration Failed.')
})

const registrationEmailData = require('../data/registration/registrationEmailData.json');
registrationEmailData.forEach(data => {
    test(`${data.testName}`, async t => {
        await t.navigateTo(constants.getLoginPageUrl());
        await t.typeText(registrationPage.newEmailField, registrationPage.getRegistrationEmail(data.emailStatus));
        await t.click(registrationPage.createAccountBtn);
        if (data.valid) {
            await t.expect(registrationPage.registrationPageHeader.exists).ok('Registration failed with valid email.');
        } else {
            await t.expect(registrationPage.newEmailError.withText(data.errorMsg).exists).ok('Registration succeed with invalid email.');
        }
    });
});

const registrationFormData = require('../data/registration/registrationFormData.json');
registrationFormData.forEach(data => {
    test(`Fill registration form without ${data.excludedFields}`, async t => {
        await t.navigateTo(constants.getLoginPageUrl());
        await t.typeText(registrationPage.newEmailField, registrationPage.getRegistrationEmail('valid'));
        await t.click(registrationPage.createAccountBtn);
        await registrationPage.fillRegistrationForm(data.excludedFields);
        await t.click(registrationPage.registerBtn);
        await t.expect(registrationPage.registrationFormError.withText(data.errorMsg).exists).ok(`Registration succeed without ${data.excludedFields}`)
    });
});