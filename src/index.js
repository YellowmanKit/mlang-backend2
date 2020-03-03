import 'regenerator-runtime/runtime'
const app = require('express')()

import bodyParser from 'body-parser'
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
import cors from 'cors'
app.use(cors({ exposeHeaders: '*' }))

import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/mlang2', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

import * as main from './router/control/main'
import * as user from './router/data/user'

main.router(app)
user.router(app)

import http from 'http'
app.server = http.createServer(app)
app.server.listen(80, ()=>{ console.log('mlang is running at port ' + app.server.address().port) })
export default app
