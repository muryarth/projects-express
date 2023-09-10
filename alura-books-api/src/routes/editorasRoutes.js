import express from "express";
import EditoraController from "../controllers/editorasController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/editoras", EditoraController.listarEditoras, paginar)
  .get("/editoras/:id", EditoraController.listarEditoraPorId)
  .post("/editoras", EditoraController.cadastrarEditora)
  .put("/editoras/:id", EditoraController.atualizaEditora)
  .delete("/editoras/:id", EditoraController.excluirEditora);

export default router;