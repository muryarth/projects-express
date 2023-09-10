import { editoras } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class EditorasController {
  //get
  static listarEditoras = async (req, res, next) => {
    try {
      const buscaEditoras = editoras.find();

      req.resultado = buscaEditoras;

      next();
    }
    catch (err) {
      next(err);
    }
  };

  //get por id
  static listarEditoraPorId = async (req, res, next) => {
    const id = req.params.id;

    try {
      const resultado = await editoras.findById(id);

      if (resultado !== null) {
        res.status(200).json(resultado);
      } else {
        next(new NaoEncontrado("ID da Editora não localizado."));
      }
    }
    catch (err) {
      next(err);
    }
  };

  //post
  static cadastrarEditora = async (req, res, next) => {
    let editora = new editoras(req.body);

    try {
      const resultado = await editora.save();
      res.status(201).send({ message: "Editora cadastrada com sucesso.", results: resultado.toJSON() });
    }
    catch (err) {
      next(err);
    }
  };

  //put
  static atualizaEditora = async (req, res, next) => {
    const id = req.params.id;

    try {
      const resultado = await editoras.findByIdAndUpdate(id, { $set: req.body });
      res.status(201).send({ message: "Editora atualizada com sucesso.", results: resultado });
    }
    catch (err) {
      next(new NaoEncontrado("ID da Editora não localizado"));
    }
  };

  //delete
  static excluirEditora = async (req, res, next) => {
    const id = req.params.id;

    try {
      await editoras.findByIdAndDelete(id);
      res.status(201).send({ message: "Editora excluída com sucesso." });
    }
    catch (err) {
      next(new NaoEncontrado("ID da editoras não localizado"));
    }
  };
}

export default EditorasController;