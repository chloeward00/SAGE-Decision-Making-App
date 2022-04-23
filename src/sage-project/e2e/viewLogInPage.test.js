import puppeteer from 'puppeteer'

const baseURL = 'http://localhost:3000/login'
const userName = 'testuser@gmail.com'
const password = '123456'

test("viewing sign up page and filling in fields", async () => {
    
    puppeteer.launch({
        headless: false, 
        slowMo: 120
    }).then(async browser => {
        
        const page = await browser.newPage()
    
        await page.goto(baseURL)
        
        await page.click('#loginEmail')
        await page.type('#loginEmail', userName)
        
        await page.click('#password')
        await page.type('#password', password)
        await page.click('#loginSubmit')
    
        await page.$eval('#dashboard-container', (input) => input)
    
        await page.close();
    })
})