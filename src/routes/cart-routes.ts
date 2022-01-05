import express from "express";
import Carts from "../models/Carts";
const cartRoutes = express.Router();

const carts: Carts[] = [
    { id: 1, product: "Kit-Kat", price: .99, quantity: 0 },
    { id: 2, product: "Snickers", price: 1.15, quantity: 0 },
    { id: 3, product: "Reese's", price: 1.59, quantity: 0 },
    { id: 4, product: "Nerds", price: .25, quantity: 0 },
    { id: 5, product: "Lindt Chocolate", price: 1.99, quantity: 0 },
    { id: 6, product: "Hershey's", price: 1.09, quantity: 0 },
];
let nextId: number = 7;

// cartRoutes.get("/", function(req, res){
// res.json(carts);
// res.status(200);
// });

// maxPrice - if specified, only include products that are at or below this price.
//Query localhost:3001/api/cart-items?maxPriceParam=1.0
cartRoutes.get("/", function (req, res) {
res.status(200).send("OK")

    let maxPriceParam: string = req.query.maxPriceParam as string;
    let prefix: string = req.query.prefix as string;
    let pageSize = parseInt(req.query.pageSize as string);


    if (maxPriceParam) {
        let maxPrice: number = Number.parseFloat(maxPriceParam);
        console.log(maxPrice);
        let filteredCart: Carts[] = carts.filter(cart => cart.price <= maxPrice);
        res.json(filteredCart);

    } else if (prefix) {

        let filteredPrefix: Carts[] = carts.filter((item) =>
        item.product.toLowerCase().startsWith(prefix.toLowerCase())
    );
    res.json(filteredPrefix);
        // let result = [];
        // for (let i = 0; i < carts.length; i++) {
        //     if (carts[i].product.startsWith(search)) {
        //         result.push(carts[i]);
        //     }
        // }
        // res.json(result);

    }else if (pageSize){
        let enteredSize = carts.filter(
            (item, index) => index <= pageSize - 1);
            res.json(enteredSize);
    } else {
        res.json(carts)
    }
});

cartRoutes.get("/:id", function(req, res){
    const candy = carts.find((candy) => candy.id === parseInt(req.params.id));
	candy ? res.json(candy) : res.status(404).send("ID Not Found");
});

cartRoutes.post("/", function (req, res){
    let newCandy: Carts = req.body;
    newCandy.id = nextId;
    nextId += 1;
    carts.push(newCandy);
    res.status(201);
    res.json(newCandy);
});




export default cartRoutes;