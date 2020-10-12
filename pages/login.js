import {Selector, t} from 'testcafe';
import * as constants from '../resources/constants';

export default class LoginPage {
    constructor() {
        this.emailField = Selector('#email');
        this.passwdField = Selector('#passwd');
        this.signInBtn = Selector('#SubmitLogin');
        this.loginErrorMessage = Selector('.alert.alert-danger');
    }

    /**
     * Function to Login with valid credentials.
     * @returns {Promise<void>}
     */
    async login() {
        await t.typeText(this.emailField, constants.getUserName());
        await t.typeText(this.passwdField, constants.getPassword());
        await t.click(this.signInBtn);
    }

}

