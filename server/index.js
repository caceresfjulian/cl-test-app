//npm install express nodemon cors mysql
const express = require('express'); 

const app = express();

const PORT =  process.env.port || 4000;

const cors = require('cors'); //npm install cors 

require("dotenv").config({ path: "./.env" }); // npm install dotenv

const cookieParser = require("cookie-parser");

const database = require('./database/database');

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

app.use(express.json({ limit: "5mb" }));

app.use(cookieParser());

app.use("/images/", require('./routes/images'));
app.use("/users/", require('./routes/users'));

app.listen(PORT, () => {
    console.log('Escuchando por el puerto', PORT);
});