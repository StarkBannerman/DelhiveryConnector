import express, { json, urlencoded } from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
import logger from 'morgan'
import wixRoutes from './wixRoutes.js'
import testRoutes from './Test/test.js'

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use('/wix', wixRoutes)
app.use('/test',testRoutes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
