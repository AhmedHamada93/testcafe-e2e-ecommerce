require('dotenv').config();
import {Role} from 'testcafe';
import * as constants from "../resources/constants";
import LoginPage from "../pages/login";


const loginPage = new LoginPage();

export const admin = Role(constants.getLoginPageUrl(), async t => {
    await t.maximizeWindow();
    await t.typeText(loginPage.emailField, constants.getUserName());
    await t.typeText(loginPage.passwdField, constants.getPassword());
    await t.click(loginPage.signInBtn);
}, { preserveUrl: true });

export const invalidUserName = Role(constants.getLoginPageUrl(), async t => {
    await t.maximizeWindow();
    await t.typeText(loginPage.emailField, `invalidUserName`);
    await t.typeText(loginPage.passwdField, constants.getPassword());
    await t.click(loginPage.signInBtn);
}, { preserveUrl: true });

export const invalidPassword = Role(constants.getLoginPageUrl(), async t => {
    await t.maximizeWindow();
    await t.typeText(loginPage.emailField, constants.getUserName());
    await t.typeText(loginPage.passwdField, `invalidPassword`);
    await t.click(loginPage.signInBtn);
}, { preserveUrl: true });
