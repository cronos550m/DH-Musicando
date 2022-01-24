const express = require('express');
const router = express.Router();
const  cancionesController  = require("../controller/cancionesController");


//APIs
router.get('/canciones/APIcanciones', cancionesController.getCancionesJSON)
router.get('/canciones/APIgeneros', cancionesController.getGenerosJSON)
router.get('/canciones/detalleAPI/:id', cancionesController.getDetalleCancionJSON)

//Lectura
router.get('/canciones', cancionesController.getCanciones)

//Detalle
router.get('/canciones/:id', cancionesController.getDetalleCanciones)

//Actualizacion
router.get('/canciones/editarCancion/:id', cancionesController.getEditarCancion)
router.post('/canciones/:id', cancionesController.getActualizarCancion)

//Creacion
// router.get ('/canciones/regCan', cancionesController.regCan)
// router.post ('/canciones/regCan', (req, res) => {
//     res.send('recibido')
// });
// , cancionesController.regCancionGuardada)



router.get ('/canciones/crear', cancionesController.crear)
router.post ('/canciones/crear', cancionesController.store1)
// router.post ('/canciones/crear', (req, res) => {
//      res.send('recibido')
// });


// router.get("/canciones/getCreacion", cancionesController.getCreacion);
// router.post("/canciones/getCreacion", cancionesController.getCreacionGuardada);



//Borrado
router.post("/canciones/borrar/:id", cancionesController.getBorrar) 

module.exports = router;