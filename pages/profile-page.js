import {Selector, t} from 'testcafe';

export default class ProfilePage {
    constructor() {
        this.myAccountHeader = Selector('.page-heading').withText('MY ACCOUNT');
    }

}

