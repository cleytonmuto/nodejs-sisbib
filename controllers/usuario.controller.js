'use strict';

const db = require('../models');
const Usuario = db.usuario;

// Criar e salvar um novo usuario
const create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio.'
        });
        return;
    }

    // Cria um usuario
    const usuario = {
        inscription: req.body.inscription,
        name: req.body.name,
        department: req.body.department,
        cpf: req.body.cpf,
        workload: req.body.workload,
        password: req.body.password
    };

    // Salva o usuario na base
    Usuario.create(usuario)
        .then((data) => {
            res.status(200).send({
                data: data,
                message: 'Usuário cadastrada com sucesso.'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Erro ao inserir usuário.'
            });
        });
};

const allAccess = (req, res) => {
    res.status(200).send(
        '<h1 class="container" style="font-family:Arial;">Página Inicial do Usuário Visitante</h1>'
    );
};

const pageNotFound = (req, res) => {
    res.status(200).send('Página não encontrada.');
};

const findAll = (req, res) => {
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit;
    Usuario.findAll({
        limit: limit,
        offset: offset,
        order: [
            ['name', 'ASC']
        ]
    })
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || 'Erro ao consultar obra.'
        });
    });
};

// encontra um unico usuario na base
const findOne = (req, res) => {
    const id = req.params.id;
    Usuario.findByPk(id)
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: `Erro ao consultar usuário com ID = ${id}`
        });
    });
};

// atualiza um usuário
const update = (req, res) => {
    const id = req.params.id;
    Usuario.update(req.body, {
        where: { id: id }
    })
    .then((num) => {
        if (num === 1) {
            res.send({
                message: 'Usuário atualizado com sucesso.'
            });
        } else {
            res.send({
                message: `Não foi possível atualizar o usuário ID = ${id}`
            });
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: `Erro ao atualizar o usuário ID = ${id}`
        });
    });
};

// exclui um usuário
const exclude = (req, res) => {
    const id = req.params.id;
    Usuario.destroy({
        where: { id: id }
    })
    .then(() => {
        res.status(200).send('Usuário excluído com sucesso.');
    })
    .catch((err) => {
        res.status(500).send({
            message: `Não foi possível excluir o usuário com ID=${id}`
        });
    });
};

module.exports = { create, allAccess, pageNotFound, findAll, findOne, update,
    exclude };
