let db = require('../database/models');
const { uuid } = require('uuidv4');
const path = require('path');
const {Canciones, Artistas, Generos, Albumes} = require('../model');



let cancionesController = {

    

 crear: async (req, res) => {
    let listaAlbumes = await Albumes.TodosAlbumes();    
    let listaCanciones = await Canciones.getAllCanciones();                   
    let listaArtistas = await Artistas.TodosArtistas();                     
    let listaGeneros = await Generos.TodosGeneros();                       
    res.render('crear', {
        album: listaAlbumes,
        artista: listaArtistas, genero:listaGeneros, 
        cancion: listaCanciones });
},

store1: async (req, res) => {
try {
    const { titulo, duracion, genero_id, album_id, artista_id } = req.body;
    let crearCancion = {
        titulo: titulo,
        duracion: duracion,
        created_at: new Date(),
        genero_id: genero_id,
        album_id: album_id,
        artista_id: artista_id
    }
    let nuevaCancion = await Canciones.crearCan(crearCancion);              
    res.redirect('/canciones/' + nuevaCancion.id);
} catch (error) {
    next(error)
}    
},

//  store1 : (req, res, next) => {
//     try {
//        db.Canciones.create({
//             id: canciones.id ? canciones.id + 1 : 1,
//             titulo: req.body.titulo,
//             duracion: req.body.duracion,
//             created_at: new Date(),
//             genero_id: req.body.genero_id,
//             album_id: req.body.album_id,
//             artista_id: req.body.artista_id
//             });

//             res.redirect('/canciones');
//     } catch (error) {
//         next(error)
//     }
// },

 getCanciones : async(req, res, next) => {
     try {
        await db.Canciones.findAll()
        .then(function(canciones){
            res.render('canciones', {canciones:canciones})
        })
     } catch (error) {
         next(error)
     }

},


 getDetalleCanciones : async(req, res, next) => {

    try {
        await Canciones.getUnaCancion(req.params.id, {
            include: [{association: "genero"}, {association: "album"}, {association: "artista"}]
        })
            .then(function(canciones){
                res.render(
                    "detalleCancion1", {cancion:canciones}
                )
            })
    } catch (error) {
        next(error);
    }

},

 getEditarCancion : (req, res, next) => {
    let pedidoCancion = db.Canciones.findByPk(req.params.id)
    let pedidoGeneros = db.Generos.findAll();
    let pedidoAlbumes = db.Albumes.findAll();
    let pedidoArtistas = db.Artistas.findAll();
    Promise.all([pedidoCancion, pedidoGeneros, pedidoAlbumes, pedidoArtistas])
        .then(function([cancion, genero, album, artista]){
            res.render("editarCancion", {cancion:cancion, album: album, artista: artista, genero: genero});
        })
},

 getActualizarCancion : (req, res, next) => {
    try {
       db.Canciones.update({
            // id: uuid(),
            titulo: req.body.titulo,
            duracion: req.body.duracion,
            updated_at: new Date(),
            genero_id: req.body.genero_id,
            album_id: req.body.album_id,
            artista_id: req.body.artista_id
            }, {
                where: {
                    id: req.params.id,
                }
            });

            res.redirect('/canciones/' + req.params.id);
    } catch (error) {
        next(error)
    }
},
 getBorrar : (req, res, next) => {
    try {
        db.Canciones.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/canciones");

    } catch (error) {
        next(error)
    }
},
 getCancionesJSON : async(req, res, next) => {
    try { 
    const respuesta = await Canciones.getAllCanciones()
        res.status(200).send({data: respuesta, state:'ok', mensaje: 'La informacion se renderizo correctamente'})
    }
    catch (error)
    {
    next(error)
    }
},
getDetalleCancionJSON : async(req, res, next) => {
    try { 
    const respuesta = await Canciones.getUnaCancion(req.params.id)
        res.status(200).send({data: respuesta, state:'ok', mensaje: 'La informacion se renderizo correctamente'})
    } 
    catch (error) 
    {
    next(error)
    }
},
getGenerosJSON : async(req, res, next) => {

    try { 
    const respuesta = await Canciones.getAllGeneros()
        res.status(200).send({data: respuesta, state:'ok', mensaje: 'La informacion se renderizo correctamente'})
    } 
    catch (error) 
    {
    next(error)
    }
},



}

module.exports = cancionesController