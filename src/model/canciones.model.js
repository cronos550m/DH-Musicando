const db = require('../database/models')

const Canciones = {

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

    getUnaCancion: async(id)=> {
        return await db.Canciones.findByPk(id);
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

    TodasCanciones: async()=> {
        try {
            const response = await db.Canciones.findAll();
            return response;
        } catch (error) {
            console.log(`fallo la consulta a la base de datos con el siguiente error: ${error.message}`);
            return [];
            
        }
    },

    crearCan: async function (crearCancion) {
		try {
			return await db.Canciones.create({ ...crearCancion });			 
		} catch (error) {
			console.log('Error al crear cancion en la base de datos ' + error.message);
			return;
		}
	},
    

}

module.exports = Canciones;