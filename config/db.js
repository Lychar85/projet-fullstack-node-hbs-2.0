const mongoose = require('mongoose');

mongoose
    .connect("mongodb://localhost:27017/freelance",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('connect to DB'))
    .catch((err) => console.log('failed to connect DB',err))