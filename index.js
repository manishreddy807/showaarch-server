const mongoose = require('mongoose')
const {MongoClient} = require('mongodb')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require("bcrypt")
const express = require('express')
const registerdetail = require('./registeredDetails')
const login = require('./routes')
const register = require('./routes')
const addProducts = require('./routes')

const server= express()
server.use(cors())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(express.json())

const password = encodeURIComponent("manish@123")
mongoose.connect(`mongodb+srv://manishReddy:${password}@cluster0.xnkhp.mongodb.net/?retryWrites=true&w=majority`, {
    useUnifiedtopology: true,
    useNewUrlParser: true
}).then(
    () => console.log('DB connected..')
).catch(err => console.log(err))

server.get("/", async (req, res) => {
    res.send("okay server running")
})

server.use("/user", login)
server.use("/user", register)
server.use("/", addProducts)
server.use('/', addProducts)


server.listen(3002, () => console.log('server s running...'))