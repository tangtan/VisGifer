const express = require("express");
const { readFile } = require("fs");
const { promisify } = require("util");
const path = require("path");
const puppeteer = require("puppeteer-core");
const multer = require("multer");
const yargs = require("yargs");

const readFileJson = promisify(readFile);
const jsonInputId = "textarea-json";
const startButtonId = "btn-play";
let uploaded = false;

const initFileHostServer = (config) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(undefined, config.outputPath);
    },
    filename: (_, file, cb) => {
      cb(undefined, file.originalname);
    },
  });
  const app = express();
  const hostUrl = path.join(__dirname, "dist");
  app.use(express.static(hostUrl));
  const upload = multer({ storage: storage });
  return app.listen(config.port, () => {
    console.log(`Listening at ${config.targetUrl}:${config.port}`);
    app.post("/upload", upload.single("file"), (req, res) => {
      const file = req.file;
      console.log(file);
      uploaded = true;
      res.send(JSON.stringify({ msg: "Upload done!" }));
    });
  });
};

// Open browser
const openBrowser = async (config) => {
  return await puppeteer.launch({
    executablePath: config.browserPath,
    headless: false, // FIX: Headless模式下无法打开dist网页
    ignoreHTTPSErrors: false,
    timeout: config.timeout,
    defaultViewport: {
      width: config.launchWidth,
      height: config.launchHeight,
    },
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
};

// Start rendering
const puppeteerRender = async (browser, config) => {
  const page = await browser.newPage();
  const pageUrl = `${config.targetUrl}:${config.port}`;
  await page.goto(pageUrl, { waitUtil: ["networkidle2"] });
  const textareaDom = await page.$(`#${jsonInputId}`);
  const renderText = JSON.stringify(config.renderJson);
  await page.evaluate(
    (dom, _text) => {
      return (dom.innerText = _text);
    },
    textareaDom,
    renderText
  );
  await page.click(`#${startButtonId}`);
  await Promise.race([delay(config.timeout), pollForUpload()]);
};

// Make sure delayed time larger than vis_duration
// Default delay time = 500000 ms
const delay = async (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

// Stop rendering after generating results
const pollForUpload = () => {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (uploaded) {
        clearInterval(intervalId);
        resolve();
        console.log("Job done!");
      } else {
        console.log("Pending...");
      }
    }, 500);
  });
};

(async () => {
  try {
    const argv = yargs
      .option("config", {
        alias: "c",
        describe: "path to visgifer-template.json",
      })
      .demandOption("config").argv;
    const configPath = argv["config"];
    const configJson = await readFileJson(configPath);
    const config = JSON.parse(configJson.toString());
    const server = initFileHostServer(config);
    const browser = await openBrowser(config);
    await Promise.all([puppeteerRender(browser, config)]);
    await browser.close();
    server.close();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
