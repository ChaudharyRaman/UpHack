const fs = require('fs');
const puppeteer = require('puppeteer');

function extractItems() {
    /*  For extractedElements, you are selecting the tag and class,
        that holds your desired information,
        then choosing the desired child element you would like to scrape from.
        in this case, you are selecting the
        "<div class=blog-post />" from "<div class=container />" See below: */
    //   const extractedElements = document.querySelectorAll('#container > div.blog-post');
    const extractedElements = document.querySelectorAll('.sc-jIAOiI');
    const items = [];
    for (let element of extractedElements) {
        items.push({
            name:element.querySelector(".sc-dkzDqf").textContent,
            date:element.querySelectorAll(".sc-dkzDqf.cqgLqK")[2].textContent,
            link:element.querySelector(".sc-jOhDuK").href,
            theme:element.querySelectorAll(".sc-dkzDqf.krulKR")[1].textContent
        })
    }
    return items;
}

async function scrapeItems(
    page,
    extractItems,
    itemCount,
    scrollDelay = 800,
) {
    let items = [];
    try {
        let previousHeight;
        while (items.length < itemCount) {
            items = await page.evaluate(extractItems);
            previousHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
            await page.waitForTimeout(scrollDelay);
        }
    } catch (e) { }
    return items;
}

(async () => {
    // Set up Chromium browser and page.
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 926 });

    // Navigate to the example page.
    //   await page.goto('https://mmeurer00.github.io/infinite-scroll-example/');
    await page.goto('https://devfolio.co/hackathons/open');

    // Auto-scroll and extract desired items from the page. Currently set to extract ten items.
    const items = await scrapeItems(page, extractItems, 35);

    // Save extracted items to a new file.
    // fs.writeFileSync('./items.txt', items.join('\n') + '\n');
    fs.writeFileSync('./src/data/devfolioData.json',JSON.stringify(items,null,2),'utf-8');

    // Close the browser.
    await browser.close();
})();
