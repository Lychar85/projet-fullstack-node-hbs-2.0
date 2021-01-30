const mission = require('../../models/articleModel');


module.exports = (req, res) => {
    mission.create(
        req.body, (err, user) => {

            if (!err) {
                res.redirect('/')
            } else  return res.redirect('/admin') 
        }
    )
}