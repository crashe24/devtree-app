// node index.js
//console.log('hola mundo')
// npm init
// npm install express
// node index.js
// node  --watch index.js nueva forma de node
// npm install --save-dev (-D) nodemon forma tradicional
// nodemon index.js
// npm kill-port 4000 (matar el puerto 4000)

// crear un servidor
const express = require('express')
// crear una instancia de express
const app = express()

//Routing
app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.listen(4000, () => {
    console.log('servidor en el puerto 4000')
})