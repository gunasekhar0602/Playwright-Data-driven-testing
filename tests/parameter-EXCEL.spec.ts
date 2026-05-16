import{test,expect} from'@playwright/test'

import fs from'fs'

// we need to import all the modules from XLSX
import * as XlSX from'xlsx'

// reading data from the file
// file - workbook - sheets - rows and columns

// Capture the location of file and store it in a variable excelfilepath
const excelpath='testdata/data1.xlsx'

// Read the excel file and store in a variable wookbook
// To read the excel file we need to use XLSX module
const workbook=XlSX.readFile(excelpath)

// From workbook we need to grab all the sheets and store it in a variable sheetNames
// SheetNames[0] is a method
const sheetNames=workbook.SheetNames[0]

// Returning the worksheet
const worksheet=workbook.Sheets[sheetNames]

// convert Excelsheet into JSON
// in XLSX we are having a method called utils
// inside utils we have a method called sheet_to_json and inside it pass worksheet
const logindata:any=XlSX.utils.sheet_to_json(worksheet)
console.log(logindata)

test.describe("login data driven test",async()=>
{
    // using for loop
    for(const{email,password,validity} of logindata)
    {
        test(`login email and password ${email} ${password}`,async({page})=>
        {
            // Navigate to the page
            await page.goto('https://demowebshop.tricentis.com/login')

            // Entering email
            await page.locator("//input[@name='Email']").fill(email);

            // Entering password
            await page.locator("//input[@name='Password']").fill(password);

            // Click on the login button
            await page.locator("//input[@value='Log in']").click();

            // Write a conditional statement
            // if it is valid crendentials we should able to see the log out
            if(validity.toLowerCase()==="valid")
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

