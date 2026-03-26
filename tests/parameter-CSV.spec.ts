import{test,expect}from'@playwright/test'

import fs from 'fs'

// install - npm install csv-parse

import {parse}from'csv-parse/sync'

//reading data from the file

const csvfilepath='testdata/data.csv'


// here file content is noting but the whole content from the csv file.
// from the whole content we need to grab each and every line in the form of record
const filecontent=fs.readFileSync(csvfilepath,'utf-8')

const records:any=parse(filecontent,{columns:true,skip_empty_lines:true})


test.describe("datadrive by CSV",async()=>
{
    for(const data of records)
        {
        test(`login by CSV data ${data.email} ${data.password}`,async({page})=>
        {
            await page.goto('https://demowebshop.tricentis.com/login')
            await page.locator("//input[@name='Email']").fill(data.email);
            await page.locator("//input[@name='Password']").fill(data.password);
            await page.locator("//input[@value='Log in']").click();


            if(data.validity.toLowerCase()==="valid")
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