const db = require('../database/models')

const Artistas = {
    TodosArtistas: async function () {
        return await db.Artistas.findAll();
    }
}


module.exports = Artistas;