const express = require('express')
const adminRouter = express.Router()

function router(nav){
	adminRouter.route('/')
		.get((req, res)=>{
			res.send('insert book')
		})
	return adminRouter
}
module.exports = router