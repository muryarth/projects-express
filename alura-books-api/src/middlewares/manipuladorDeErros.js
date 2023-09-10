import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";

// o middleware, em geral, intercepta uma ação em algum serviço
// este middleware intercepta ações para tratamento de erros

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(err, req, res, next) {
  console.log(err);

  if (err instanceof mongoose.Error.CastError) { // erro de conversão
    new RequisicaoIncorreta().enviarResposta(res); // um ou mais dados fornecidos estão incorretos
  } else if (err instanceof mongoose.Error.ValidationError) { // erro de validação dos campos informados
    new ErroValidacao(err).enviarResposta(res); // os seguintes erros foram encontrados
  } else if (err instanceof ErroBase) { // erro de "não encontrado"
    err.enviarResposta(res); // id não localizado
  } else {
    new ErroBase().enviarResposta(res); // erro interno do servidor
  }
}

export default manipuladorDeErros;