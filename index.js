const express = require("express");
const getClasses = require("./services/notion");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static("public"));

app.get("/classes", async (req, res) => {
  const classes = await getClasses();
  res.json(classes);
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
