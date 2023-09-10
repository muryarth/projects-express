import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    //ordenando do mais recente para o mais antigo
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
    let [campoOrdenacao, ordem] = ordenacao.split(":");

    // console.log(req.query);

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    // todo middleware tem acesso ao objeto de requisição
    const resultado = req.resultado; //recebe a query da requisição que está sendo feita ao moongose

    // console.log(resultado);

    if (limite > 0 && pagina > 0) {
      let resultadoPaginado;

      if (resultado.mongooseCollection.modelName == "livros") {
        resultadoPaginado = await resultado.find()
          // [variável] -> sintaxe para passar o valor de uma variável para a chave de um objeto
          .sort({ [campoOrdenacao]: ordem }) // ordena 1 e -1 define se é crescente ou decrescente
          .skip((pagina - 1) * limite) //pula itens
          .limit(limite) //define quantos itens serão trazidos na requisição
          .populate("autor") //popula o campo externo para autor
          .populate("editora") //popula o campo externo para editora
          .exec();
      } else {
        resultadoPaginado = await resultado.find()
          // [variável] -> sintaxe para passar o valor de uma variável para a chave de um objeto
          .sort({ [campoOrdenacao]: ordem }) // ordena 1 e -1 define se é crescente ou decrescente
          .skip((pagina - 1) * limite) //pula itens
          .limit(limite) //define quantos itens serão trazidos na requisição
          .exec();
      }

      res.status(200).json({
        reqParams: { limit: limite, page: pagina, field: campoOrdenacao, order: ordem },
        status: 200,
        results: resultadoPaginado
      });
    } else {
      next(new RequisicaoIncorreta());
    }
  }
  catch (err) {
    next(err);
  }
}

export default paginar;