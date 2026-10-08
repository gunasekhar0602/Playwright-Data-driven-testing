// CSV Data Driven Testing

import{test,expect}from'@playwright/test'
import fs from 'fs'

// install - npm install csv-parse
// synchronous parse function  from 'csv-parse/sync'
import {parse} from'csv-parse/sync'

// Defining CSV file path --------------------------------------------------------------------------------------------
// create a variable called csvfilepath and define the csv file path as value which contains test data
const csvfilepath='testdata/data.csv'

// Reading and parsing the CSV Data --------------------------------------------------------------------------------------
// here file content is noting but the whole content from the csv file.
// fs.readFileSync - Reads the CSV file synchronously using utf-8 
// we are storing it in file content
const filecontent=fs.readFileSync(csvfilepath,'utf-8')


// from the whole content (file content) we need to grab each and every line in the form of record
// file content is passed to the parse function with two configuration options
// 1) columns:true (treates the first row as header key)
// 2) skip_empty_lines:true
// The resulting array of row objects is saved to the variable
const records:any=parse(filecontent,{columns:true,skip_empty_lines:true})

// Defining test suite block --------------------------------------------------------------------------------------------
test.describe("datadrive by CSV",async()=>
{
    // Iterating the test data by using for of loop -----------
    // here data is each row object
    for(const data of records)
        {
            // Create dynamic test ------------------------------------------------------------------------------------
            // create a test name in backtick operator so that we can pass test data value
            // here data is each row object, from row object we are extracting the email and password
            test(`login by CSV data ${data.email} ${data.password}`,async({page})=>
            {
                // Navigate to the page
                await page.goto('https://demowebshop.tricentis.com/login')

                // Enter Emai: Locates the email field and fill it with email  
                await page.locator("//input[@name='Email']").fill(data.email);

                // Enter Password: Locates the password field and fill it with password 
                await page.locator("//input[@name='Password']").fill(data.password);

                // Click Login: Locates login button and click on login button
                await page.locator("//input[@value='Log in']").click();

                // Evaluating Test Outcomes via condition statements ------------------------------------------------------------
                // If it is valid crendentials we should able to see the log out
                if(data.validity.toLowerCase()==="valid")
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
                        await expect(errormessage).toBeVisible()

                        // mention assertion that we should be present in the login page
                        await expect(page).toHaveURL("https://demowebshop.tricentis.com/login")

                    }
            })
        }
})

