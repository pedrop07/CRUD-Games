const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors"); // "Barra" os erros d ba conexão do Front com o Back

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Mopof@2020",
    database: "crudgames",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;

    let SQL = "INSERT INTO games ( name, cost, category ) VALUES (?)";
    let data = [name, cost, category];

    db.query(SQL, [data], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});
console.log(2);

app.get("/getCards", (req, res) => {

    let SQL = "SELECT * from games";

    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
});

app.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;

    let SQL = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";

    db.query(SQL, [name, cost, category, id], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    SQL = "DELETE FROM games WHERE idgames = ?";

    db.query(SQL, [id], (err, result) =>{
        if(err) console.log(err);
        else res.send(result);
    })
});

app.listen(3001, () => {
    console.log("rodando servidor");
});
