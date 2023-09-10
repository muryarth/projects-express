const { Router } = require("express");
const TurmaController = require("../controllers/TurmaController.js");

const router = Router();

router
    .get("/turmas", TurmaController.consultarTurmas)
    .get("/turmas/:id", TurmaController.consultarTurmaPorId)
    .post("/turmas", TurmaController.cadastrarTurma)
    .put("/turmas/:id", TurmaController.atualizarTurma)
    .delete("/turmas/:id", TurmaController.deletarTurma);

module.exports = router;