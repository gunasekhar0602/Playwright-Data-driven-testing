// CSV Data Driven Testing

import{test,expect}from'@playwright/test'

import fs from 'fs'

// install - npm install csv-parse
import {parse}from'csv-parse/sync'

//reading data from the file
const csvfilepath='testdata/data.csv'


// here file content is noting but the whole content from the csv file.
const filecontent=fs.readFileSync(csvfilepath,'utf-8')

// from the whole content we need to grab each and every line in the form of record
const records:any=parse(filecontent,{columns:true,skip_empty_lines:true})

// main test
test.describe("datadrive by CSV",async()=>
{
    // write a for loop for the records
    for(const data of records)
        {
            // Mention test name in backtick operator so that we can pass data value
            test(`login by CSV data ${data.email} ${data.password}`,async({page})=>
            {
                // Navigate to the page
                await page.goto('https://demowebshop.tricentis.com/login')

                // Entering email
                await page.locator("//input[@name='Email']").fill(data.email);

                // Entering password
                await page.locator("//input[@name='Password']").fill(data.password);

                // Clicking on Login button
                await page.locator("//input[@value='Log in']").click();

                // Write a conditional statement
                // if it is valid crendentials we should able to see the log out
                if(data.validity.toLowerCase()==="valid")
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

