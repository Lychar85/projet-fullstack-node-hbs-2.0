const user = require('../../models/userModel')


module.exports = (req, res) => {
    user.create(
        req.body, (err, user) => {

            if (!err) {
                res.redirect('/')
            } else  return res.redirect('/inscription') 
        }
    )
}