import{test,expect}from'@playwright/test'

import fs from"fs"


// Reading the data from the JSON file

const jsonpath="testdata/data.json"

// we need to parse the method to JSON and take fs with readfilesync and provide the file path and mention the utf
// UTF means Unicode Transformation formate
//when we are dealing with JSON and CSV files utf 8 is required.

// JSON is predeifned class, inside that we are calling parse method.
// it will read the data in array formate.
const loginData:any=JSON.parse(fs.readFileSync(jsonpath,'utf-8'))



test.describe("login data driven test",async()=>
{
    for(const{email,password,validaity} of loginData)
    {
        test(`login email and password ${email} ${password}`,async({page})=>
        {
            await page.goto('https://demowebshop.tricentis.com/login')
            await page.locator("//input[@name='Email']").fill(email);
            await page.locator("//input[@name='Password']").fill(password);
            await page.locator("//input[@value='Log in']").click();


            if(validaity.toLowerCase()==="valid")
            {
                const logout= page.locator("//a[text()='Log out']");
                await expect(logout).toBeVisible();
            }
            else
            {
                const errormessage=page.locator(".validation-summary-errors")
                await expect(errormessage).toBeVisible()

                await expect(page).toHaveURL("https://demowebshop.tricentis.com/login")

            }
        })
    }
})