import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";
// import mongoose from "mongoose";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
routes(app); // código com todas as rotas e execução de middlewares de controle da api

app.use(manipulador404); // só será executado se houver nenhuma correspondência nas outras rotas

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros); //middleware para tratamento de erros da api


export default app;