import express from "express";
import { readFile } from "fs";
import { promisify } from "util";
import path from "path";
import puppeteer from "puppeteer-core";
import multer from "multer";
import yargs from "yargs";

const readFileJson = promisify(readFile);
const jsonInputId = "textarea-json";
const uploadPathId = "textarea-upload";
const startButtonId = "btn-play";
let uploaded = false;
const defaultConfig = {
  browserPath: "/mnt/d/Google/Chrome/Application/chrome.exe",
  outputPath: "./",
  targetUrl: "http://localhost",
  targetPort: 5000,
  headless: true,
  launchWidth: 1280,
  launchHeight: 720,
  timeout: 5000,
};

const openBrowser = async (config) => {
  return await puppeteer.launch({
    executablePath: config.browserPath,
    headless: config.headless,
    ignoreHTTPSErrors: false,
    timeout: config.timeout,
    defaultViewport: {
      width: config.launchWidth,
      height: config.launchHeight,
    },
    args: ["--expose-gc"],
  });
};

const puppeteerRender = async (browser, config) => {
  const page = await browser.newPage();
  const pageUrl = `${config.targetUrl}:${config.targetPort}`;
  await page.goto(pageUrl, { waitUtil: ["networkidle2"] });
  await hackType(page, uploadPathId, "/upload");
  await hackType(page, jsonInputId, config.renderJson);
  await page.click(`#${startButtonId}`);
  await Promise.race([delay(config.timeout), pollForUpload()]);
};

const delay = async (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

// Insert text to input dom
const hackType = (page, id, text) => {
  return page.evaluate(
    (_id, _text) => {
      document.getElementById(_id).innerText = _text;
    },
    id,
    text
  );
};

const pollForUpload = () => {
  return new Promise((resolve) => {
    const intervalTimerId = setInterval(() => {
      if (uploaded) {
        clearInterval(intervalTimerId);
        resolve();
      }
    }, 500);
  });
};

const initFileHostServer = (config) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(undefined, config.outputPath);
    },
    filename: (_, file, cb) => {
      cb(undefined, file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  const app = express();
  const hostUrl = path.join(__dirname, "dist");
  console.log(`hosting path: ${hostUrl}`);
  app.use(express.static(hostUrl));
  return app.listen(config.port, () => {
    app.post("/upload", upload.single("file"), (req, res) => {
      const file = req.file;
      res.send(JSON.stringify({ msg: "Upload done!" }));
      uploaded = true;
    });
  });
};

(async () => {
  try {
    const argv = yargs
      .option("config", {
        alias: "c",
        describe: "path to protocol",
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
