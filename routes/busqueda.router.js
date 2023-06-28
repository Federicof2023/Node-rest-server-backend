const { Router } = require('express')
const { busqueda } = require('../controllers/busqueda.controllers')

const router = Router()


router.get('/:coleccion/:palabra', busqueda)








module.exports = router