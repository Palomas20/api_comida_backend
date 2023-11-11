const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jjavier#2202",
  database: "examen2",
});

//? METODO POST

app.post("/crear", (req, res) => {
  const nombre = req.body.nombre;
  const region = req.body.region;
  const ciudad = req.body.ciudad;

  db.query(
    "INSERT INTO comida(nombre, region, ciudad) values(?,?,?)",
    [nombre, region, ciudad],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//? METODO GET

app.get("/mostrar", (req, res) => {
  db.query("SELECT * FROM comida", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//? METODO PUT

app.put("/editar", (req, res) => {
  const id_comida = req.body.id_comida;
  const nombre = req.body.nombre;
  const region = req.body.region;
  const ciudad = req.body.ciudad;

  db.query(
    "UPDATE comida SET nombre = ?, region = ?, ciudad = ? WHERE id_comida = ?",
    [nombre, region, ciudad, id_comida],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//! METODO DELETE

app.delete("/eliminar/:id_comida", (req, res) => {
  const id_comida = req.params.id_comida;

  db.query(
    "DELETE FROM comida WHERE id_comida = ?",
    id_comida,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
