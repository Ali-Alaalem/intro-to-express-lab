const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];
app.get("/greetings/:userName", (req, res) => {
  res.send(`<h1>hello ${req.params.userName}</h1>`);
});

app.get("/roll/:number", (req, res) => {
  if (isNaN(req.params.number)) {
    res.send(`<h1>Use a number</h1>`);
  } else {
    res.send(`<h1>You rolled a ${req.params.number}</h1>`);
  }
});

app.get("/collectibles/:index", (req, res) => {
  if (collectibles[req.params.index])
    res.send(
      `<h1> ${collectibles[req.params.index].name} the price is ${
        collectibles[req.params.index].price
      }</h1>`
    );
  else {
    res.send(`<h1>This item is not yet in stock. Check back soon! </h1>`);
  }
});

app.get("/shoes", (req, res) => {
  const type = req.query.type;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  let printer = "";
  const filterd = shoes.filter((elm) => {
    return (
      (!type || elm.type === type) &&
      (!minPrice || elm.price >= minPrice) &&
      (!maxPrice || elm.price <= maxPrice)
    );
  });
  for (let index = 0; index < filterd.length; index++) {
    printer += ` <h1> name: ${filterd[index].name} , price:  ${filterd[index].price} , type:  ${filterd[index].type} </h1>`;
  }
  res.send(printer);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
