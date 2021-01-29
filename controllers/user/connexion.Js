const user = require('../../models/userModel'),
    bcrypt = require('bcrypt')


module.exports = (req, res) => {
    const {email, password } = req.body;
console.log(email);
    user.findOne({ email }, (err, user) => {
        if (user) {

            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {

                    req.session.userId = user._id

                    res.redirect('/')
                } else {
                    res.redirect('/connexion')
                }
            })
        } else {
            return res.redirect('/connexion')
        }
    })

}