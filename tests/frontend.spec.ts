import { test, expect } from '../src/fixtures/base';
import { LoginScreen } from '../src/pageObjects/loginScreen';
import { InventoryScreen } from '../src/pageObjects/inventoryScreen';
import { CheckoutScreen } from '../src/pageObjects/checkoutScreen';

test('Verify User able to add product to Cart and complete checkout @login @checkout @regression', async ({ page, gotoUrl }) => {
  await gotoUrl('https://www.saucedemo.com/');
  const loginScreen = new LoginScreen(page);
  const inventoryScreen = new InventoryScreen(page);
  
  // Login and Add Costly Product in Cart
  await loginScreen.login('standard_user', 'secret_sauce');
  await inventoryScreen.selectProductSort('Price (high to low)');
  const firstProductName = await inventoryScreen.getFirstProductName();
  await inventoryScreen.addFirstProductToCart();
  await inventoryScreen.clickShoppingCart();
  console.log('Ordered Product : ',firstProductName);

  // User Fills out Checkout Details
  const checkoutScreen = new CheckoutScreen(page);
  await checkoutScreen.clickCheckout();
  await checkoutScreen.fillFirstName('Ankur');
  await checkoutScreen.fillLastName('Ankur');
  await checkoutScreen.fillPostalCode('160020');
  await checkoutScreen.clickContinue();

  // User Lands on OverView Page
  expect(page.getByText('Checkout: Overview')).toBeVisible();
  await checkoutScreen.clickFinish();
  
  // User Lands on Checkout Success Page
  expect(page.getByText('Checkout: Complete!')).toBeVisible();
  expect(page.getByText('Thank you for your order!')).toBeVisible();
  
});

test('Verify User not able to navigate to Home Screen without providing Credentials @login @regression', async ({ page, gotoUrl }) => {
      await gotoUrl('https://www.saucedemo.com/');
      const loginScreen = new LoginScreen(page);
      await page.locator(loginScreen.loginButton).click();
      
      // Verifying alert and Current URL 
      expect(page.getByText(loginScreen.errorMessageNoCreds)).toBeVisible();
      expect(page.url()).toEqual('https://www.saucedemo.com/');
    });

test.afterEach(async ({ page }, testInfo) => {
  if (page) {
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('screenshot', {
      body: screenshot,
      contentType: 'image/png',
    });
  }
});