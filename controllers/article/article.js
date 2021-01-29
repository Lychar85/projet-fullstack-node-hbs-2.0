const mission = require('../article/article');

module.exports = (req, res) => {
    console.log(req);
    mission.create(
        req.body, (err, docs) => {
            res.redirect('/')
        })
}