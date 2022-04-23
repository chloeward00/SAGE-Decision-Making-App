import puppeteer from 'puppeteer'

const baseURL = 'http://localhost:3000/resetpassword'
const email = 'testuser@gmail.com'

test("viewing forgot password page", async () => {
    
    puppeteer.launch({
        headless: false, 
        slowMo: 120
    }).then(async browser => {
        
        const page = await browser.newPage()
    
        await page.goto(baseURL)

        expect(baseURL).toBeEqual()
    
        await page.click('#email')
        await page.type('#email', email)

        await page.click('#forgotSubmit')
    
        await page.$eval('#loginPage', (input) => input)

        await page.close();
    })
})
