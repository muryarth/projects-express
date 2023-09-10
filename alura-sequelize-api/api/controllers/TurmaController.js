const database = require("../models")

class TurmaController {

    //get
    static async consultarTurmas(req, res) {
        try {
            const turmas = await database.Turmas.findAll();

            return res.status(200).json({
                status: 200,
                message: "Sucesso.",
                results: turmas
            });
        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    //get por id
    static async consultarTurmaPorId(req, res) {
        const { id } = req.params;

        try {
            const turma = await database.Turmas.findOne(
                { where: { id: Number(id) } }
            );

            return res.status(200).json({
                status: 200,
                message: "Sucesso.",
                results: turma
            });

        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    //post
    static async cadastrarTurma(req, res) {
        const novaTurma = req.body; // corpo da requisição

        try {
            const turma = await database.Turmas.create(novaTurma);

            return res.status(200).json({
                status: 200,
                message: "Sucesso.",
                results: turma
            });

        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    //update
    static async atualizarTurma(req, res) {
        const { id } = req.params;
        const novaTurma = req.body; // corpo da requisição

        try {
            await database.Turmas.update(
                novaTurma,
                { where: { id: Number(id) } }
            );

            const turma = await database.Turmas.findOne(
                { where: { id: Number(id) } }
            );

            return res.status(200).json({
                status: 200,
                message: "Sucesso.",
                results: turma
            });

        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }

    //delete
    static async deletarTurma(req, res) {
        const { id } = req.params;

        try {
            await database.Turmas.destroy(
                { where: { id: Number(id) } }
            );

            return res.status(200).json({
                status: 200,
                message: `Sucesso. Turma de id ${id} removido.`,
                results: ""
            });

        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message
            })
        }
    }
}

module.exports = TurmaController;