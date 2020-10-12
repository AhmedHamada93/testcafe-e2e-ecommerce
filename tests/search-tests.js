import * as constants from "../resources/constants";
import HomePage from "../pages/home-page";

const homePage = new HomePage();
const searchData = require('../data/search/searchData.json');
const multipleCategoriesSearchData = require('../data/search/multipleCategoriesSearchData.json');

fixture('Search')
    .page(constants.getEnvironmentURL())
    .meta({feature: 'Search', severity: 'Critical'});

Object.keys(searchData).forEach(mainFilter =>
    Object.keys(searchData[mainFilter]).forEach(subFilter => {
        test(`search for ${mainFilter} > ${subFilter} should get ${searchData[mainFilter][subFilter]} products`, async t => {
            await t.maximizeWindow();
            await homePage.navigateToCategory('women');
            await t.click(homePage.subFilter.withText(subFilter));
            await t.expect(homePage.loadingIcon.exists).notOk(`Search Results are not Returned for ${mainFilter} > ${subFilter}`)
            const resultsCount = await homePage.productName.count;
            await t.expect(resultsCount).eql(searchData[mainFilter][subFilter]);
        });
    })
);

multipleCategoriesSearchData.forEach(searchData => {
    test(`filter with ${searchData.appliedFilters.join(' - ')} should get ${searchData.expectedNumberOfProducts} products`, async t => {
        await t.maximizeWindow();
        await homePage.navigateToCategory('women');
        for (const appliedFilter of searchData.appliedFilters) {
            await t.click(homePage.subFilter.withText(appliedFilter));
        }
        await t.expect(homePage.loadingIcon.exists).notOk(`Search Results are not Returned for ${searchData.appliedFilters.join(' - ')}`)
        const resultsCount = await homePage.productName.count;
        await t.expect(resultsCount).eql(searchData.expectedNumberOfProducts);
    })
})