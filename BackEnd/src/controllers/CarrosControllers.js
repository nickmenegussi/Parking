const connection = require('../config/db')

exports.VisualizarCar = (req, res) => {
    const userId = req.query.id

    if(!userId){
        return res.status(400).json({
            message: 'Preencha o campo de id',
            success: false
        })
    }

    connection.query('SELECT * FROM Carro WHERE userId = ?', [userId], (err,result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o Servidor.',
                success: false,
                daa: err
            })
        }

        return res.status(200).json({
            message: 'Carros encontrados com sucesso.',
            success: true,
            data: result
        })
    })
}

exports.CreateCar = async (req, res) => {
    const {CarLicensePlate, BrandAndModel, StatusCar, userId} = req.body

    if (!CarLicensePlate || !BrandAndModel || !StatusCar || !userId){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",

        })
    }

    if(StatusCar !== 'Estacionado' && StatusCar !== 'Saiu'){
        return res.status(404).json({
            success: false, 
            message: 'Preencha um campo válido para cadastrar esse tipo de informação.'
        })
    }

    connection.query('SELECT * FROM Carro WHERE CarLicensePlate = ? AND BrandAndModel = ? AND StatusCar = ?' , [CarLicensePlate,BrandAndModel,StatusCar], (err,result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor.',
                success: false,
                body: err
            })
        }

        if(result.length > 0){
            return res.status(400).json({
                message: 'O registro desse carro ja foi criado.',
                success: false
            })
        }

        connection.query('INSERT INTO Carro(CarLicensePlate, BrandAndModel, StatusCar, userId) VALUES(?,?, ?, ?)', [CarLicensePlate, BrandAndModel, StatusCar, userId], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor.',
                    success: false,
                    body: err
                })
            }
    
            return res.status(200).json({
                message: 'Carro criado com sucesso.',
                success: true,
                data: result
            })
        })
        
    })

} 

exports.updateCar = async (req, res) => {
    const idCarro = req.params.idCarro
    const {CarLicensePlate, BrandAndModel, StatusCar, userId} = req.body

    if (!CarLicensePlate || !BrandAndModel || !StatusCar || !userId){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
            
        })
    }

    if(StatusCar !== 'Estacionado' && StatusCar !== 'Saiu'){
        return res.status(400).json({
            success: false, 
            message: 'Preencha um campo válido para cadastrar esse tipo de informação.'
        })
    }

    connection.query('UPDATE Carro SET CarLicensePlate = ?,BrandAndModel= ?, StatusCar = ? WHERE userId = ? AND idCarro = ?', [CarLicensePlate, BrandAndModel, StatusCar, userId, idCarro], (err, result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor.',
                success: false,
                data: err
            })
        }

        return res.status(200).json({
            message: 'Carro alterado com sucesso.',
            success: true,
            data: result
        })
    })

} 

exports.deleteCar = async (req, res) => {
    const idCarro = req.params.idCarro
    const {userId, CarLicensePlate} = req.query

    if (!userId || !idCarro || !CarLicensePlate){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
            
        })
    }

    connection.query('SELECT * FROM Carro WHERE  idCarro = ? and userId = ? and CarLicensePlate = ?', [idCarro, userId, CarLicensePlate], (err, result) => {
        if(err){
            return res.status(500).json({
                message: 'Erro ao se conectar com o servidor.',
                success: false,
                data: err
            })
        }

        if(result.length === 0){
            return res.status(400).json({
                message: 'Carro não encontrado.',
                success: false
            })
        }

        connection.query('DELETE FROM Carro WHERE idCarro = ? and userId = ? and CarLicensePlate = ?', [idCarro, userId, CarLicensePlate], (err, result) => {
            if(err){
                return res.status(500).json({
                    message: 'Erro ao se conectar com o servidor.',
                    success: false,
                    data: err
                })
            }
    
            return res.status(200).json({
                message: 'Carro deletado com sucesso.',
                success: true,
                data: result
            })
        })
    })

} 