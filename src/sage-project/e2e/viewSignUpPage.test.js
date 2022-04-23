import puppeteer from 'puppeteer'

const baseURL = 'http://localhost:3000/signup'
const name = 'testuser'
const email = 'testuser@gmail.com'
const password = '123456'

test("viewing sign up page and filling in fields", async () => {
    
    puppeteer.launch({
        headless: false, 
        slowMo: 120
    }).then(async browser => {
        
        const page = await browser.newPage()
    
        await page.goto(baseURL)

        expect(baseURL).toBeEqual()
        
        await page.click('#name')
        await page.type('#name', name)
        
        await page.click('#email')
        await page.type('#email', email)
        
        await page.click('#password')
        await page.type('#password', password)

        await page.click('#signUpSubmit')
    
        await page.$eval('#dashboard-container', (input) => input)

        await page.close();
    })
})
