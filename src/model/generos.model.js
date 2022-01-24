const db = require('../database/models')

const Generos = {
    TodosGeneros: async function () {
        return await db.Generos.findAll();
    }
}


module.exports = Generos;