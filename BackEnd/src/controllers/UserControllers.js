const connection = require('../config/db')

exports.Teste = (req, res) => {
    res.send('Hello World')
}

exports.createRegister = async (req, res) => {
    const { email, password} = req.body

    const cpf = req.body.cpf.replace(/\D/g, "")

    // Verifica se todos os campos estão preenchidos
    if (!email || !password || !cpf) {
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
        })
        
    }

    // Verifica se o usuário já existe
    connection.query('SELECT * FROM User WHERE email = ? AND password = ? ', [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao se conectar com o Servidor",
            })
            
        }

        if (result.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Esse usuário já foi cadastrado, vá para a área de login.",
                data: result,
            })
            
        }

        connection.query('INSERT INTO User(email, password, cpf) VALUES(?, ?, ?)', [email, password, cpf], (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao se conectar com o Servidor",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Usuário cadastrado com sucesso",
                data: result,
            });
        });
    })
    
}



exports.createLogin = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password){
        return res.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro",
            
        })
    }

    connection.query('SELECT idUser FROM User WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if(err){
            return res.status(500).json({
                success: false,
                message: "Erro se conectar com o Servidor"
            })
        }
        
 
            return res.status(200).json({
                success: true,
                message: "Login efetuado com sucesso",
                data: result
            })
        
        
    }
    )
} 
