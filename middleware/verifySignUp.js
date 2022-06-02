'use strict';

const db = require('../models');
const ROLES = db.ROLES;
const Usuario = db.usuario;

const checkDuplicates = (req, res, next) => {
    // Inscription
    Usuario.findOne({
        where: {
            inscription: req.body.inscription
        }
    })
    .then((user) => {
        if (user) {
            res.status(400).send({
                message: 'Erro. Matrícula já cadastrada.'
            });
            return;
        }
        // CPF
        Usuario.findOne({
            where: {
                cpf: req.body.cpf
            }
        })
        .then((user) => {
            if (user) {
                res.status(400).send({
                    message: 'Erro. CPF já cadastrado.'
                });
                return;
            }
            // Name
            User.findOne({
                where: {
                    name: req.body.name
                }
            })
            .then((user) => {
                if (user) {
                    res.status(400).send({ message: 'Erro. Nome já cadastrado.' });
                    return;
                }
                next();
            });
        });
    });
};

const checkRoles = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Erro. Perfil inexistente = ${req.body.roles[i]}`
                });
                return;
            }
        }
    }
    next();
};

module.exports = { checkDuplicates, checkRoles };
