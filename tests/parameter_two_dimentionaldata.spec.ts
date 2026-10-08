// parameter data driven - two dimentionaldata

import {test, expect,Locator} from '@playwright/test'

// create test data
// create array
const logintestdata:string[][]=
[
    ["laura.taylor1234@example.com","test123","valid"],
    ["invaliduser@example.com","test123","invalid"],
    ["validuser@example.com","test12345","invalid"],
    [" "," ","invalid"]
];

// Iterating the test data by using for of loop ---------------------------------------- 
for (const[email,password,validity] of logintestdata)
{
    // Create dynamic test -------------------------------------------------------------
    // create a test name in backtick operator so that we can pass test data value
    test(`Login test for ${email} and ${password}`,async({page})=>
    {
        // Navigate to page
        await page.goto("https://demowebshop.tricentis.com/login");

        // Enter Email: Locates the email field and fill it with email 
        await page.locator("//input[@class='email']").fill(email);

        // Enter Password: Locates the password field and fill it with password 
        await page.locator("#Password").fill(password);

        // Click Login: Locates login button and click on login button
        await page.locator("//input[@value='Log in']").click();

        // Evaluating Test Outcomes via condition statements -----------------------------------
        // If it is valid crendentials we should able to see the log out
        if(validity.toLowerCase()==='valid')
        {
            // locate the logout link and store it in varaible called logoutlink
            const logoutlink=page.locator(".ico-logout");
            
            // mention assertion that logout link should visisble (if we login suucessfully)
            await expect (logoutlink).toBeVisible({timeout:5000});

        }
        // if validity is not valid (if we are not login successfully)
        else
        {
            // capture the error message location
            const errormessage=page.locator(".validation-summary-errors");

            // mention assertion that error message location should visisble (if we are not login sucessfully)
            await expect (errormessage).toBeVisible({timeout:5000});

            // mention assertion that we should be present in the login page
            await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
        }
    })
}