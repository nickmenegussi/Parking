const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3001
const User = require('./routes/UserRoutes')
const Carros = require('./routes/CarrosRoutes')


app.use(express.json())
app.use(cors())

app.use('/user', User)
app.use('/carros', Carros)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
