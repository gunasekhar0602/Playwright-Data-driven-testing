// JSON  Data Driven Testing

import{test,expect}from'@playwright/test'

// npm install fs
// fs - file system
import fs from"fs"

// Defining JSON file path --------------------------------------------------------------------------------------------
// create a variable called jsonpath and define the JSON file path as value which contains test data
const jsonpath="testdata/data.json"

// JSON is predeifned class, inside that we are calling parse method.
// it will read the data in array formate.

// Reading and parsing the JSON Data --------------------------------------------------------------------------------------
// fs.readFilesync(jsonpath,'utf-8') - Reads JSON file synchronously
// jsonpath - storing the relative path of JSON file which contains test data
// UTF-8 - Unicode Transformation Format - it is required when dealing with 
                              // JSON and CSV files to ensure standard text encoding

// JSON.parse() - which converts the raw UTF-8 string into JavaScript array/object format(logindata)
// parse method will take - fs.readFileSync(jsonpath,'utf-8') as parameter
// create a varible login data 
const loginData:any=JSON.parse(fs.readFileSync(jsonpath,'utf-8'))


// Defining test suite block --------------------------------------------------------------------------------------------
test.describe("login data driven test",async()=>
{
    // Iterating the test data by using for of loop ---------------------------------------------------------------
    for(const{email,password,validity} of loginData)
    {
        // Create dynamic test ------------------------------------------------------------------------------------
        // create a test name in backtick operator so that we can pass test data value
        test(`login email and password ${email} ${password}`,async({page})=>
        {
            // Navigate to the page
            await page.goto('https://demowebshop.tricentis.com/login');

            // Enter Emai: Locates the email field and fill it with email  
            await page.locator("//input[@name='Email']").fill(email);

            // Enter Password: Locates the password field and fill it with password 
            await page.locator("//input[@name='Password']").fill(password);

            // Click Login: Locates login button and click on login button
            await page.locator("//input[@value='Log in']").click();

          
            // Evaluating Test Outcomes via condition statements ------------------------------------------------------------
            // If it is valid crendentials we should able to see the log out
            if(validity.toLowerCase()==="valid")
            {
                // locate the logout link and store it in varaible called logoutlink
                const logoutlink= page.locator("//a[text()='Log out']");

                // mention assertion that logout link should visisble (if we login suucessfully)
                await expect(logoutlink).toBeVisible();
            }
            
            // if it is invalid credentials we should able to see the error message
            else
            {
                // capture the error message location
                const errormessage=page.locator(".validation-summary-errors")

                // mention assertion that error message location should visisble (if we are not login sucessfully)
                await expect(errormessage).toBeVisible({timeout:5000})

                // mention assertion that we should be present in the login page
                await expect(page).toHaveURL("https://demowebshop.tricentis.com/login")

            }
        })
    }
})
