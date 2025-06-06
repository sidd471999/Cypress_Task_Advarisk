import { NavigationPage } from "../../support/pageObjects/navigationPage"
import { homepage } from "../../support/pageObjects/Homepage"
import { cartpage } from "../../support/pageObjects/CartPage"
import { checkout_page } from "../../support/pageObjects/CheckoutPage"
import { Datacells } from "../../support/interface"
import { Common_Locators } from "../../support/Locators/Common_Locators"

let User
let Bike_light, First_Name, Last_Name, Zip_Code, Price;
let checkout_Info_Parameter
describe("01_verify_complete_successful_purchase_of_single_item", function () {

    beforeEach(function () {
        cy.fixture("Checkout/01_purchase_of_single_product.json").then((data) => {
            this.data = data
            User = this.data.User
            Bike_light = this.data.Bike_light
            Price = this.data.Price
            checkout_Info_Parameter = {
                [Common_Locators.Checkout_page_locators.firstname]: this.data.First_Name,
                [Common_Locators.Checkout_page_locators.lastname]: this.data.Last_Name,
                [Common_Locators.Checkout_page_locators.zip]: this.data.Zip_Code,
            }


        }).then(() => {
            cy.clearCookies()
            cy.clearLocalStorage()
            //navigate to the url
            NavigationPage.navigateToUrl()
            //login with valid user
            NavigationPage.loginWithCredentials(User)
            //verify the home is visble 
            homepage.verifyHomepage()
        })
    })

    it("01_verify_complete_successful_purchase_of_single_item", function () {

        //verify the  no item count added to cart 
        homepage.verifyCartIconQuantity(0)
        //add Sauce Labs Bike Light in the cart
        homepage.AddingItemtoCart(Bike_light)
        //click on the cart icon 
        homepage.ClickonCartBtn()
        //verify the product is added in to the cart 
        cartpage.verifytheCartpageOpened()
        //verify the item is added to the cart 
        cartpage.VerifyAddedItemtoCart(Bike_light)
        //verify the item count added to cart 
        homepage.verifyCartIconQuantity(1)
        //click on checkout button
        cartpage.clickOnCheckoutButton()
        //verify checkout page open
        checkout_page.verifytheCheckoutpageOpened()
        //enter your information for checkout
        checkout_page.enterDetailsforCheckout(checkout_Info_Parameter)
        //verify the item count added to cart 
        homepage.verifyCartIconQuantity(1)
        //click on Continue button
        checkout_page.clickOnContinueButton()
        //verify the item is added to the cart 
        checkout_page.VerifyProductNameAndPriceInFinalStep(Bike_light, Price)
        //verify total Price to pay after tax
        checkout_page.verifyTotalPriceToPay()
        //click on Finish Button
        checkout_page.clickOnFinishButton()
        //verify Purchase was successful
        checkout_page.VerifyPurchase_Success()
        //verify the item count added to cart 
        homepage.verifyCartIconQuantity(0)


    })

    afterEach(() => {
        homepage.logout()
    })
})
