/* eslint-disable */
const express = require('express')
const chalk = require('chalk')
const debug = require('debug')('app')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
// const sql = require('mssql')

const app = express()
const port = process.env.PORT || 3000

// for Azuler
// const config = {
//     // user: 'DESKTOP-TJF6HB7/kung',
//     // password: '...',
//     server: 'localhost\\SQLEXPRESS',
//     database: 'PSLibrary',
//     options: {
//         encrypt: false // if use Azure change to true
//     }
// }
// const connectionString = "server=localhost\\SQLEXPRESS;Database=PSLibrary;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}"

// sql.connect(config).catch(err=>{
// 	debug(err)
// })

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({secret: 'library'}))

require('./src/config/passport.js')(app)
app.use(express.static(path.join(__dirname, '/public/')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.set('views', './src/views')
app.set('view engine', 'ejs')

const nav = [
	{link:"/books", title: 'Book'},
	{link: "/authors", title: 'Author'}
]

const bookRouter = require('./src/routes/bookRoutes')(nav)
const adminRouter = require('./src/routes/adminRoutes')(nav)
const authRouter = require('./src/routes/authRoutes')(nav)

app.use('/books', bookRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter)

app.get('/', function(req, res){
	// res.sendFile(path.join(__dirname,'/views/index.html'))
	res.render('index', {
		nav: [
			{link:"/books", title: 'Book'},
			{link: "/authors", title: 'Authors'}
		],
		title: 'Library'
	})
})

app.listen(port, function(){
	debug(`listening on port ${chalk.green('4000')}`)
})