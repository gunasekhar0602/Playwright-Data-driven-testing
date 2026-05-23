// JSON  Data Driven Testing

import{test,expect}from'@playwright/test'

// npm install fs
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
            // Navigate to the page
            await page.goto('https://demowebshop.tricentis.com/login');

            // Entering the Email
            await page.locator("//input[@name='Email']").fill(email);

            // Entering password
            await page.locator("//input[@name='Password']").fill(password);

            // Clicking on login button
            await page.locator("//input[@value='Log in']").click();

            // Write a conditional statement
            // if it is valid crendentials we should able to see the log out
            if(validaity.toLowerCase()==="valid")
            {
                const logout= page.locator("//a[text()='Log out']");
                await expect(logout).toBeVisible();
            }
            // if it is invalid credentials we should able to see the error message
            else
            {
                const errormessage=page.locator(".validation-summary-errors")
                await expect(errormessage).toBeVisible()

                // if it is invalid the url should not change
                await expect(page).toHaveURL("https://demowebshop.tricentis.com/login")

            }
        })
    }
})
