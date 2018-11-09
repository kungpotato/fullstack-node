const express = require('express')
const bookRouter = express.Router()
const sql = require("msnodesqlv8");
const debug = require('debug')('app:bookRouter')
const connectionString = "server=localhost\\SQLEXPRESS;Database=PSLibrary;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}"

function router(nav){
	bookRouter.route('/')
		.get(async (req, res)=>{
			const query = 'select * from books'
			await sql.query(connectionString, query, (err, data) => {
				// debug(data)
				res.render('booksListView', {
					nav,
					title: 'Library',
					books: data
				})
			})
		})
	bookRouter.route('/:id')
		.all(async (req, res, next)=>{

			const {id} = req.params  //es6
			// const id = res.params.id
			const query = 'select * from books where id = '+ id
			await sql.query(connectionString, query, (err, data) => {
				[req.book] = data
				//req.book = data[0]
				next()
			})
		})
		.get(async (req, res)=>{
			res.render('bookView', {
				nav,
				title: 'Library',
				//book: data[0],
				book: req.book,
			})
			// new Promise((resolve, reject)=>{
			// 	const query = 'select * from books'
			// 	sql.query(connectionString, query, (err, rows) => {
			// 		resolve(rows)
			// 	})
			// }).then((value)=>{
			// 	const {id} = req.params  //es6
			// 	res.render('bookView', {
			// 		nav,
			// 		title: 'Library',
			// 		book: value[id],
			// 	})
			// })
		})
	return bookRouter
}
module.exports = router