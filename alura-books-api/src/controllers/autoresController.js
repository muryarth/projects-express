import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const buscaAutores = autores.find();

      req.resultado = buscaAutores;

      next();
    }
    catch (err) {
      next(err);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const resultado = await autores.findById(id);

      if (resultado !== null) {
        res.status(200).json(resultado);
      } else {
        next(new NaoEncontrado("ID do Autor não localizado."));
      }
    }
    catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      const resultado = await autor.save();
      res.status(200).json({ message: "Autor cadastrado com sucesso.", results: resultado });
    }
    catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    const id = req.params.id;

    try {
      const resultado = await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json({ message: "Autor atualizado com sucesso.", results: resultado });
    }
    catch (err) {
      next(new NaoEncontrado("ID do Autor não localizado."));
    }
  };

  static excluirAutor = async (req, res, next) => {
    const id = req.params.id;

    try {
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso" });
    }
    catch (err) {
      next(new NaoEncontrado("Id do Autor não localizado."));
    }
  };
}

export default AutorController;