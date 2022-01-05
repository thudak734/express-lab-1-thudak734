// require the express module
import express from 'express';
 
// require the cors module
import cors from "cors"

//require the router object (and all the defined routes) to be used in this file
import routes from "./routes/app-routes";
import cartRoutes from "./routes/cart-routes";
import userRoutes from "./routes/user-routes";

// creates an instance of an Express server
const app = express();
 
// enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
app.use(cors())
 
// allow POST and PUT requests to use JSON bodies
app.use(express.json())

//use the router onject (and all the defined routes)
app.use("/", routes);
app.use("/api/cart-items/", cartRoutes);

 
// define the port
const port = 3001;
 
// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));
