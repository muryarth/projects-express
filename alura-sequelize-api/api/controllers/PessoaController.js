const database = require('../models'); // por padrão o javascript puxa o arquivo index.js

class PessoaController {

    //get all
    static async consultarPessoas(req, res) {
        try {
            const pessoas = await database.Pessoas.findAll();
            return res.status(200).json(pessoas);
        }
        catch (err) {
            return res.status(500).json(err.message);
        }
    }

    //get por id
    static async consultarPessoaPorId(req, res) {
        const { id } = req.params;

        console.log(id);

        try {
            const pessoa = await database.Pessoas.findOne(
                { where: { id: Number(id) } }
            );
            return res.status(200).json(pessoa);
        }
        catch (err) {
            return res.status(500).json(err.message);
        }
    }

    //create
    static async cadastrarPessoa(req, res) {
        const novaPessoa = req.body;

        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);

            return res.status(200).json({
                status: 200,
                message: "Pessoa criada com sucesso.",
                results: novaPessoaCriada
            });
        }
        catch (err) {
            return res.status(500).json(err.message);
        }
    }

    //update pessoas
    static async atualizarPessoa(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;

        try {
            await database.Pessoas.update(
                novasInfos,
                { where: { id: Number(id) } }
            );

            const pessoaAtualizada = await database.Pessoas.findOne(
                { where: { id: Number(id) } }
            );

            return res.status(200).json({
                status: 200,
                message: "Pessoa atualizada com sucesso.",
                results: pessoaAtualizada
            });
        }
        catch (err) {
            return res.status(500).json(err.message);
        }
    }

    //delete pessoas
    static async deletarPessoa(req, res) {
        const { id } = req.params;

        try {
            await database.Pessoas.destroy(
                { where: { id: Number(id) } }
            );

            return res.status(200).json({
                status: 200,
                message: `Pessoa de ID ${id} removida com sucesso.`,
                results: ""
            });
        }
        catch (err) {
            return res.status(500).json(err.message);
        }
    }

    //get todas as matrículas
    static async consultarTodasMatriculas(req, res) {
        try {
            const matriculas = await database.Matriculas.findAll();

            return res.status(200).json({
                status: 200,
                message: "Sucesso.",
                results: matriculas
            });
        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    //get matrícula por id
    static async consultarMatriculaPorId(req, res) {
        const { estudanteId, matriculaId } = req.params;

        console.log(req.params);

        try {
            const matricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });

            return res.status(200).json({
                status: 200,
                message: "Sucesso.",
                results: matricula
            });
        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    //post matrícula
    static async cadastrarMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };

        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(200).json(novaMatriculaCriada);
        }
        catch (err) {
            return res.status(500).json(err.message);
        }

    }

    //update matrícula
    static async atualizarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const novaInfo = { ...req.body, estudante_id: Number(estudanteId) };

        try {
            await database.Matriculas.update(novaInfo,
                {
                    where: {
                        id: matriculaId,
                        estudante_id: estudanteId
                    }
                }
            );

            const result = await database.Matriculas.findOne(
                {
                    where: {
                        id: matriculaId,
                        estudante_id: estudanteId
                    }
                }
            );

            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(500).json(err.message);
        }

    }

    //delete matrícula
    static async deletarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params

        try {
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json({
                status: 200,
                message: `Matrícula de ID ${matriculaId} removida com sucesso.`,
                results: ""
            });
        }
        catch (err) {
            return res.status(500).json(err.message);
        }

    }
}

module.exports = PessoaController;