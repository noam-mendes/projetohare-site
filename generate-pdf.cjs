const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();

    await page.setViewport({
        width: 1440,
        height: 1000,
        deviceScaleFactor: 1
    });

    const filePath = path.resolve(__dirname, "press-pdf.html");
    const fileUrl = `file:///${filePath.replace(/\\/g, "/")}`;

    await page.goto(fileUrl, {
        waitUntil: "networkidle0"
    });

    await page.emulateMediaType("print");

    await page.pdf({
        path: path.resolve(
            __dirname,
            "assets/press/release-projeto-hare-saocristovao.pdf"
        ),
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
            top: "0",
            right: "0",
            bottom: "0",
            left: "0"
        }
    });

    await browser.close();

    console.log("PDF gerado com sucesso.");
})();