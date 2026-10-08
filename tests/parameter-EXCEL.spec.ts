// Excel Data Driven Testing

import{test,expect} from'@playwright/test'

import fs from'fs'

// we need to import all the modules from XLSX
import * as XlSX from'xlsx'

// reading data from the file
// file - workbook - sheets - rows and columns

// Defining Excel file path --------------------------------------------------------------------------------------------
// create a variable called csvfilepath and define the csv file path as value which contains test data
// File
const excelpath='testdata/data1.xlsx'

// Read and parse the target excel file and load content into workbook object
// To read the excel file we need to use XLSX module
// workbook
const workbook=XlSX.readFile(excelpath);

// From workbook we need to grab all the sheetnames and store it in a variable sheetnames
// workbook.SheetNames[0] - returns all the sheet names of the workboook
const sheetnames=workbook.SheetNames[0]

// returns sheetnames - sheet 1
console.log(sheetnames)

// Returning the worksheet
// we need to provide all the sheetnames that we grabed OR returned
const worksheet=workbook.Sheets[sheetnames]


// convert Excelsheet into JSON object
// in XLSX we are having a method called utils
// inside utils we have a method called sheet_to_json and inside it pass worksheet
const logindata:any=XlSX.utils.sheet_to_json(worksheet);

// Print the login data (Data will be printed in the JSON format)
console.log(logindata);



// Defining test suite block --------------------------------
test.describe("login data driven test",async()=>
{
    // Iterating the test data by using for of loop -----------
    for(const{email,password,validity} of logindata)
    {
        // Create dynamic test ------------------------------------------------------------------------------------
        // create a test name in backtick operator so that we can pass test data value
        test(`login email and password ${email} ${password}`,async({page})=>
        {
            // Navigate to the page
            await page.goto('https://demowebshop.tricentis.com/login');

            // Enter Email: Locates the email field and fill it with email  
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
                    const logout= page.locator("//a[text()='Log out']");

                     // mention assertion that logout link should visisble (if we login suucessfully
                    await expect(logout).toBeVisible();
                }

                // if it is invalid credentials we should able to see the error message
                else
                {
                    // capture the error message location
                    const errormessage=page.locator(".validation-summary-errors");

                    // mention assertion that error message location should visisble (if we are not login sucessfully)
                    await expect(errormessage).toBeVisible();

                    // mention assertion that we should be present in the login page
                    await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");

            }
        })
    }
})

