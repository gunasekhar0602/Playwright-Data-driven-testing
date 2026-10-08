import {test,expect, Locator} from'@playwright/test'

const searchitems:string[]=["laptop","Gift card","smartphone","monitor"];

for(const item of searchitems)
{
    test (`search ${item} in page`,async({page})=>
    {
        await page.goto('https://demowebshop.tricentis.com/');
        const searchbar:Locator= page.locator("//input[@value='Search store']")
        await searchbar.fill(item)

        const searchbutton:Locator=page.locator("//input[@value='Search']");
        await searchbutton.click();

        await expect.soft (page.locator("h2 a").nth(0)).toContainText(item)



    })
}