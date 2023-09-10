const database = require("../models"); // por padrão o javascript puxa o arquivo index.js

class NivelController {

    //get all
    static async consultarNiveis(req, res) {
        try {
            const niveis = await database.Niveis.findAll();

            return res.status(200).json({
                status: 200,
                message: "",
                results: niveis
            });
        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message
            });
        }
    }

    //get por id
    static async consultarNivelPorId(req, res) {
        const id = req.params.id;

        try {
            const nivel = await database.Niveis.findOne(
                { where: { id: Number(id) } }
            );

            return res.status(200).json({
                status: 200,
                message: "",
                results: nivel
            });
        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message
            });
        }
    }

    //post
    static async cadastrarNivel(req, res) {
        const novoNivel = req.body;

        try {
            const nivel = await database.Niveis.create(novoNivel);

            return res.status(200).json({
                status: 200,
                message: "Nível criado com sucesso.",
                results: nivel
            });
        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message
            });
        }
    }

    // update
    static async atualizarNivel(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;

        try {
            await database.Niveis.update(
                novasInfos,
                { where: { id: Number(id) } }
            );

            const novoNivel = await database.Niveis.findOne(
                { where: { id: Number(id) } }
            );

            return res.status(200).json({
                status: 200,
                message: "Nível criado com sucesso.",
                results: novoNivel
            });
        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message
            });
        }
    }

    // delete
    static async deletarNivel(req, res) {
        const { id } = req.params;

        try {
            await database.Niveis.destroy(
                { where: { id: Number(id) } }
            );

            return res.status(200).json({
                status: 500,
                message: `Nível de id ${id} removido com sucesso.`,
                results: ""
            })
        }
        catch (err) {
            return res.status(500).json({
                status: 500,
                message: err.message
            });
        }
    }
}

module.exports = NivelController;