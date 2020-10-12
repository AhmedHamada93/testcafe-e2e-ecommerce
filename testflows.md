# Test Flows Document
#### Main automated features are:
  - [Registration.](#registration)
  - [Login.](#login)
  - [Search.](#search)
  - [Adding/removing to/from cart.](#cart)
  - [Checkout.](#checkout)

## Registration
##### Registration tests scenarios: [find registration test data files here](https://git.toptal.com/screening/ahmed-hamada/blob/master/1_E2E_Tests/data/registration)
    1. Register with invalid email format.
    2. Register with already used email.
    3. Register with all mandatory fields.
    4. Register without each of the mandatory fields.
     
##### Steps:
    1. User navigates to login page.
    2. User clicks on create account.
    3. User fill registration form.
    
## Login
##### Login tests scenarios: [find login test data file here](https://git.toptal.com/screening/ahmed-hamada/blob/master/1_E2E_Tests/data/loginData.json)
    1. Login with a valid username and password.
    2. Login with a valid username and an invalid password.
    3. Login with a valid password and an invalid username.
     
##### Steps:
    1. User navigates to login page.
    2. User enters username.
    3. User enters password.
     
## Search
##### Search tests sub categories: [find search test data file here](https://git.toptal.com/screening/ahmed-hamada/blob/master/1_E2E_Tests/data/search)
    1. Categories.
    2. Size.
    3. Color.
    4. Compositions.
    5. Styles.
    6. Properties
       
##### Steps:
    1. User navigates to Women Category.
    2. User select sub category to filter by.
    3. Asserts that results are displayed according to applied filters.
    
## Cart
Cart scenarios:
1. Add to cart.
2. Remove from cart.

##### Steps:
    1. User navigates to Women Category.
    2. User add/remove random product to/from cart.
    3. Asserts that product added/removed to/from cart.

## Checkout
##### Checkout scenarios:
    1. Full checkout happy scenario.
    2. Checkout without accepting ToS.
    3. Checkout with pre-logged in user.

##### Steps:
    1. User navigates to Women Category.
    2. User add random product to cart.
    3. User navigates to cart page.
    4. User clicks on 'Proceed to checkout'.
    5. User logs in if he isn't.
    6. User fills in address info.
    7. User accepts ToS.
    8. User selects payments method.
    9. User confirms the order.
