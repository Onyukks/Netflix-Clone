require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')

const authroute = require('./routes/auth.routes')
const movieroute = require('./routes/movies.routes')
const tvroute = require('./routes/tv.routes')
const searchroute = require('./routes/search.route')
const { protectedRoute } = require('./middleware/protectedRoute')

const env = process.env


const app = express()
mongoose.connect(env.MONGO_URI)
.then(()=>console.log('Connected to the database successfully'))
.catch(()=>console.log('Error connecting to the database'))

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth',authroute)
app.use('/api/v1/movie',protectedRoute,movieroute)
app.use('/api/v1/tv',protectedRoute,tvroute)
app.use('/api/v1/search',protectedRoute,searchroute)

if(env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/dist', 'index.html'))
    })
}

app.listen(env.PORT,()=>console.log(`Server is up and running on port ${env.PORT}`))