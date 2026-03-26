import{test,expect} from'@playwright/test'

import fs from'fs'

import * as XlSX from'xlsx'

// reading data from the file

// file - workbbok - sheets - rows and columns

const excelpathfile='testdata/data1.xlsx'

const workbook=XlSX.readFile(excelpathfile)

const sheetNames=workbook.SheetNames[0]

const worksheet=workbook.Sheets[sheetNames]

// convert sheet into JSON

const logindata:any=XlSX.utils.sheet_to_json(worksheet)
console.log(logindata)

test.describe("login data driven test",async()=>
{
    for(const{email,password,validity} of logindata)
    {
        test(`login email and password ${email} ${password}`,async({page})=>
        {
            await page.goto('https://demowebshop.tricentis.com/login')
            await page.locator("//input[@name='Email']").fill(email);
            await page.locator("//input[@name='Password']").fill(password);
            await page.locator("//input[@value='Log in']").click();


            if(validity.toLowerCase()==="valid")
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

