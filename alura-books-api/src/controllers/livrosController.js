import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros, autores, editoras } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros; //guarda a query do mongoose e envia pro middleware

      next();
    }
    catch (err) {
      next(err); // usa um middleware para tratamento de erros
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    const id = req.params.id;

    try {
      const resultado = await livros.findById(id)
        .populate("autor", "nome")
        .populate("editora", "nome");

      if (resultado !== null) {
        res.status(200).json(resultado);
      } else {
        next(new NaoEncontrado("ID do Livro não localizado."));
      }

    }
    catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    let livro = new livros(req.body);

    try {
      const resultado = await livro.save();
      res.status(201).send({ message: "Livro cadastrado com sucesso.", results: resultado.toJSON() });
    }
    catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    const id = req.params.id;

    try {
      const resultado = await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso", results: resultado });
    }
    catch (err) {
      next(new NaoEncontrado("ID do Livro não localizado."));
    }
  };

  static excluirLivro = async (req, res, next) => {
    const id = req.params.id;

    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro removido com sucesso" });
    }
    catch (err) {
      next(new NaoEncontrado("ID do Livro não localizado."));
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    // console.log(req.query);

    try {
      const busca = await processaBusca(req);

      if (busca !== null) {

        const resultado = livros
          .find(busca, {})
          .populate("autor")
          .populate("editora");

        req.resultado = resultado; //guarda a query do mongoose e envia pro middleware

        next();
      }
      else {
        res.status(200).send([]);
      }
    }
    catch (err) {
      next(err);
    }
  };
}

// regras de negócio da busca
async function processaBusca(req) {
  const { titulo, minPaginas, maxPaginas, nomeAutor, nomeEditora } = req.query;

  let busca = {};

  //filtra pelo título do livro
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  // filtra pelo número de páginas
  if (minPaginas && maxPaginas) {
    busca.numeroPaginas = { $gte: minPaginas, $lte: maxPaginas }; // se os dois parâmetros forem encontrados na query
  } else {
    if (minPaginas) busca.numeroPaginas = { $gte: minPaginas }; //maior ou igual
    if (maxPaginas) busca.numeroPaginas = { $lte: maxPaginas }; //menor ou igual
  }

  //busca pelo nome do autor
  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  //filtra pelo nome da editora
  if (nomeEditora) {
    const editora = await editoras.findOne({ nome: nomeEditora });

    if (editora !== null) {
      busca.editora = editora._id;
    } else {
      busca = null;
    }
  }

  //outras soluções para o filtro, usando regex

  //solução 1
  // if (titulo) {
  //   // utiliza-se o construtor nativo do javascript "RegExp" para criar um regex
  //   const regex = new RegExp(titulo, "i"); //passa-se uma string, "i" para tirar o case sensitive usando regex
  //   busca.titulo = regex;
  // }
  // if (titulo) busca.titulo = /regex/i;

  //solução 2
  // await editoras.find({ nome: editora })

  return busca;
}

export default LivroController;