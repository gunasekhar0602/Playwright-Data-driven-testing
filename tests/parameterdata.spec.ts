import{test,expect}from'@playwright/test'

test("Parameter data testing",async({page})=>
{
   await page.goto('https://demowebshop.tricentis.com/');
   await page.locator("//input[@id='small-searchterms']").fill("laptop")
   await page.locator("//input[@value='Search']").click()
   await expect.soft(page.locator('h2 a').nth(0)).toContainText("laptop",{ignoreCase:true})
})

// create an array and privide the items (test data )that which we need to verify
const searchitems:string[]=["laptop","Gift card","smartphone","monitor"];

// write a for loop searchitems so that we can verify each item
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
   
