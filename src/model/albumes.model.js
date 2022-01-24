const db = require('../database/models')

const Albumes = {
    TodosAlbumes: async function () {
        return await db.Albumes.findAll();
    }
}
module.exports = Albumes;