const db = require('../database/models')

const model = {

    getAllCanciones: async()=> {
        try {
            const response = await db.Canciones.findAll({
                attributes: {exclude: ['genero_id', 'artista_id', 'album_id']},
                include: [
                    {
                        association: "genero"
                    },
                    {
                        association: "artista"
                    },
                    {
                        association: "album"
                    }
            ]
            });
            return response;
        } catch (error) {
            console.log(`fallo la consulta a la base de datos con el siguiente error: ${error.message}`);
            return [];
            
        }
    },

    getUnaCancion: async(req, res,)=> {
        try {
            const response = await db.Canciones.findByPk(req.params.id, {
                attributes: {exclude: ['genero_id', 'artista_id', 'album_id']},
                include: [
                    {
                        association: "genero"
                    },
                    {
                        association: "artista"
                    },
                    {
                        association: "album"
                    }
            ]
            });
            return response;
        } catch (error) {
            console.log(`fallo la consulta a la base de datos con el siguiente error: ${error.message}`);
            return [];
            
        }
    },
    getAllGeneros: async()=> {
        try {
            const response = await db.Generos.findAll();
            return response;
        } catch (error) {
            console.log(`fallo la consulta a la base de datos con el siguiente error: ${error.message}`);
            return [];
            
        }
    },

//     regCanciones: async()=> {

// try {
    
// } catch (error) {
    
// }

//     }

}

module.exports = model;