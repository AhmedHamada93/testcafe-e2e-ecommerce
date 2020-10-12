require('dotenv').config();
const CATEGORIES = {
    women: {
        mainCategory: "WOMEN",
        subCategories: {
            Tops: {
                mainCategory: "Tops",
                subCategories: ["T-shirts", "Blouses"]
            },
            Dresses: {
                mainCategory: "Dresses",
                subCategories: ["Casual Dresses", "Evening Dresses", "Summer Dresses"]
            }
        }
    }
};

const BASE_URL='http://automationpractice.com/';
const LOGIN_PAGE_URL='http://automationpractice.com/index.php?controller=authentication&back=my-account'

export function getEnvironmentURL() {
    return BASE_URL;
}

export function getUserName() {
    return process.env.USERNAME;
}

export function getPassword() {
    return process.env.PASSWORD;
}

export function getLoginPageUrl() {
    return LOGIN_PAGE_URL;
}

export function getCategories() {
    return CATEGORIES;
}