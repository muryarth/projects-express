const { Router } = require("express");
const NivelController = require("../controllers/NivelController.js")

const router = Router();

router
    .get("/niveis", NivelController.consultarNiveis)
    .get("/niveis/:id", NivelController.consultarNivelPorId)
    .post("/niveis", NivelController.cadastrarNivel)
    .put("/niveis/:id", NivelController.atualizarNivel)
    .delete("/niveis/:id", NivelController.deletarNivel);

module.exports = router;