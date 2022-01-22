const express = require('express');
const router = express.Router();
const  cancionesController  = require("../controller/cancionesController")

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
router.get ('/canciones/regCancion/', cancionesController.regCancion)
router.post ('/canciones/regCancion/', cancionesController.regCancionGuardada)

//Borrado
router.post("/canciones/borrar/:id", cancionesController.getBorrar) 

module.exports = router;