const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

router
    .get('/pessoas/matriculas', PessoaController.consultarTodasMatriculas)
    .get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.consultarMatriculaPorId)
    .get('/pessoas', PessoaController.consultarPessoas)
    .get('/pessoas/:id', PessoaController.consultarPessoaPorId)
    .post('/pessoas', PessoaController.cadastrarPessoa)
    .post('/pessoas/:estudanteId/matriculas', PessoaController.cadastrarMatricula)
    .put('/pessoas/:id', PessoaController.atualizarPessoa)
    .put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizarMatricula)
    .delete('/pessoas/:id', PessoaController.deletarPessoa)
    .delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deletarMatricula)


module.exports = router;