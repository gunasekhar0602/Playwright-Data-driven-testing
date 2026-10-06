// Parameter Data Driven Testing

import{test,expect}from'@playwright/test'

test("Parameter data testing",async({page})=>
{
    // Navigate to the page
   await page.goto('https://demowebshop.tricentis.com/');

   // locater the search bar and fill the item laptop
   await page.locator("//input[@id='small-searchterms']").fill("laptop")

   // After fill the item locate the seach button and clik on it
   await page.locator("//input[@value='Search']").click();

   // assertion for laptop is reflecting OR not after seaching for laptop
   await expect.soft(page.locator('h2 a').nth(0)).toContainText("laptop",{ignoreCase:true})
})

// create an array and privide the items (test data) that which we need to verify
const searchitems:string[]=["laptop","Gift card","smartphone","monitor"];

// write a for of loop searchitems so that we can verify each item
// searchitems are all items
// item is single item from the searchitems
for(const item of searchitems)
{
    // Mention test name in backtick operator so that we can pass item value
    test(`Parameter data testing ${item}`,async({page})=>
{
    // Navigate to page
    await page.goto('https://demowebshop.tricentis.com/');

    // Locate the text box and fill the item
    await page.locator("//input[@id='small-searchterms']").fill(item);

    // Locate the search and click on it
    await page.locator("//input[@value='Search']").click();

    // Assertion whether the item is reflecting or not in the first item place
    await expect.soft(page.locator('h2 a').nth(0)).toContainText(item,{ignoreCase:true});
    await page.waitForTimeout(1000);
})

}
   
