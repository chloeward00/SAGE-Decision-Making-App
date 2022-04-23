import puppeteer from 'puppeteer'

const baseURL = 'http://localhost:3000/home/calendar'

test("viewing landing page", async () => {
    
    puppeteer.launch({
        headless: false, 
        slowMo: 120
    }).then(async browser => {
        
        const page = await browser.newPage()
    
        await page.goto(baseURL)

        await page.waitForSelector('#calendar-page', { visible: true })

        await page.close();
    })
})
