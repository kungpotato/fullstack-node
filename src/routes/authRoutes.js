const express = require('express')
const authRouter = express.Router()
const debug = require('debug')('app:authRouter')

function router(){
	authRouter.route('/signUp')
		.post((req, res)=>{
			// debug(req.body)
			req.login(req.body, ()=>{
				res.redirect('/auth/profile')
			})
			// res.json(req.body)
		});
	authRouter.route('/profile')
		.get((req, res)=>{
			debug(req.user)
			res.json(req.user)
		})
	return authRouter
}
module.exports = router