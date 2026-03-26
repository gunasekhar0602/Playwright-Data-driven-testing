import{test,expect}from'@playwright/test'

/* test("Parameter data testing",async({page})=>
{
   await page.goto('https://demowebshop.tricentis.com/');
   await page.locator("//input[@id='small-searchterms']").fill("laptop")
   await page.locator("//input[@value='Search']").click()

   await expect.soft(page.locator('h2 a').nth(0)).toContainText("laptop",{ignoreCase:true})
}) */




const searchitems:string[]=["laptop","Gift card","smartphone","monitor"];

for(const item of searchitems)
{
    test(`Parameter data testing ${item}`,async({page})=>
{
   await page.goto('https://demowebshop.tricentis.com/');
   await page.locator("//input[@id='small-searchterms']").fill(item)
   await page.locator("//input[@value='Search']").click()

   await expect.soft(page.locator('h2 a').nth(0)).toContainText(item,{ignoreCase:true})
   await page.waitForTimeout(1000)
})
}

   