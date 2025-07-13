// Test 1: Login and then Add to Cart

import { test, expect } from '../src/fixtures/base';
import { LoginScreen } from '../src/pageObjects/loginScreen';
import { InventoryScreen } from '../src/pageObjects/inventoryScreen';
import { CheckoutScreen } from '../src/pageObjects/checkoutScreen';

test('Test 1: Login and then Add to Cart', async ({ page, gotoUrl }) => {
  await gotoUrl('https://www.saucedemo.com/');
  const loginScreen = new LoginScreen(page);
  const inventoryScreen = new InventoryScreen(page);

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