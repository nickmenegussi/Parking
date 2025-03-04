const express = require('express')
const {VisualizarCar,CreateCar, updateCar, deleteCar} = require('../controllers/CarrosControllers')
const router = express.Router()

router.get('/carros', VisualizarCar)
router.post('/carros/create', CreateCar)

router.put('/carros/update/:idCarro', updateCar)
router.delete('/carros/delete/:idCarro', deleteCar)

module.exports = router