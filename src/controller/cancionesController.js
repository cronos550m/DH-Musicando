let db = require('../database/models');
const { model } = require('../model')
const fs = require('fs');
const path = require("path");
const { uuid } = require('uuidv4');

let cancionesController = {

    // ------------- Canciones --------------//

 getCanciones : async(req, res, next) => {
    await db.Canciones.findAll()
    .then(function(canciones){
        res.render('canciones', {canciones:canciones})
    })
},
 getDetalleCanciones : async(req, res, next) => {
    await db.Canciones.findByPk(req.params.id, {
        include: [{association: "genero"}, {association: "album"}, {association: "artista"}]
    })
        .then(function(cancion){
            res.render("detalleCancion", {cancion:cancion})
        })
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

//  regCancion : async (req, res, next) => {
//     try {
//         let generos = await db.Generos.findAll();                          // Para desplegable de categorías disponibles.
//         let artistas = await db.Artistas.findAll();   
//         let albumes = await db.Albumes.findAll();                         // Para desplegable de campañas disponibles.
//         res.render('regCancion', {generos,
//             artistas, albumes});
//     } catch (error) {
//         next(error)
//     }
// },

regCancion: function (req, res, next) {
    db.Canciones.findAll()
        .then(function(canciones){
            return res.render("/canciones/regCancion", {canciones:canciones})
        })
},

 regCancionGuardada : (req, res, next) => {
    try {
       db.Canciones.create({
            // id: uuid(),
            titulo: req.body.titulo,
            duracion: req.body.duracion,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
            genero_id: req.body.genero_id,
            album_id: req.body.album_id,
            artista_id: req.body.artista_id
            });

            res.redirect('/canciones');
    } catch (error) {
        next(error)
    }
},
 getActualizarCancion : (req, res, next) => {
    try {
       db.Canciones.update({
            // id: uuid(),
            titulo: req.body.titulo,
            duracion: req.body.duracion,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
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
    const respuesta = await model.getAllCanciones()
        res.status(200).send({data: respuesta, state:'ok', mensaje: 'La informacion se renderizo correctamente'})
    } 
    catch (error) 
    {
    next(error)
    }
},
getDetalleCancionJSON : async(req, res, next) => {

    try { 
    const respuesta = await model.getUnaCancion()
        res.status(200).send({data: respuesta, state:'ok', mensaje: 'La informacion se renderizo correctamente'})
    } 
    catch (error) 
    {
    next(error)
    }
},
getGenerosJSON : async(req, res, next) => {

    try { 
    const respuesta = await model.getAllGeneros()
        res.status(200).send({data: respuesta, state:'ok', mensaje: 'La informacion se renderizo correctamente'})
    } 
    catch (error) 
    {
    next(error)
    }
},

}

module.exports = cancionesController
// ------------- Canciones --------------//





// const regCancion = async (req, res, next) => {
//     db.Generos.findAll()
//     db.Artistas.findAll()
//    await db.Albumes.findAll()
//         .then(function( albumes){
//             return res.render("regCancion", {albumes: albumes})
//         })
// }




    // const { titulo, duracion , created_at, updated_at, genero_id, album_id, artista_id } = req.body;

    // const cancion = {
    //     id: uuid(),
    //     titulo: titulo,
    //     duracion: duracion,
    //     created_at: created_at,
    //     updated_at: updated_at,
    //     genero_id: genero_id,
    //     album_id: album_id,
    //     artista_id: artista_id
    // };
    

    // res.render('regCancion', { musicando: db });





// APIS






// const getEditCancion =  (req, res) => {
//     const id = req.params.id;
//     const cancion = db.find((item) => item.id === id);
//     res.render("editCancion", { cancion: cancion });
// };

// const editCancion = (req, res) => {
//     const id = req.params.id;
//     // const archivo = req.file;
//     const { titulo, created_at, updated_at, genero_id, album_id, artista_id, duracion } = req.body;
//     const indexCancion = db.findIndex((item) => item.id === id);
//     db[indexCancion] = {
//         id: id,
//         titulo: titulo,
//         created_at: created_at,
//         updated_at: updated_at,
//         genero_id: genero_id,
//         album_id: album_id,
//         artista_id: artista_id,
//         duracion: duracion,
        
//     };
//     fs.writeFileSync(
//         path.join(__dirname, "../database/models/index"),
//         JSON.stringify(db, null, 4),
//         {
//             encoding: "utf8",
//         }
//     );

//     res.render('canciones', { musicando: db });
// };

// const putCancion = (req, res) => {
//     res.render('canciones');
// };

//module.exports = {getGenerosJSON, getDetalleCancionJSON, getBorrar, getActualizarCancion, getEditarCancion, getDetalleCanciones, regCancionGuardada, regCancion ,  getCancionesJSON,   getCanciones};