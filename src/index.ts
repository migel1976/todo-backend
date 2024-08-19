import express from "express";

const app = express();
const port = 5007;
app.get("/", (request, response) => {
  response.send("Hello world!");
});
app.listen(port, () => console.log(`Running on port ${port}`));
