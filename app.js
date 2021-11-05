const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("61835dc2f1d3dd8bf30a76db")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
// app.use(authRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//     app.listen(process.env.PORT || 5000);
// });

mongoose
  .connect(
    'mongodb+srv://agarciapaz:DCXOUP3rXYX9f6Pl@cluster0.iiook.mongodb.net/shop?authSource=admin&replicaSet=atlas-bomvy4-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Angie',
          email: 'ag@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    })

    app.listen(3000);
    console.log('connected');
  })
  .catch(err => {
    console.log(err);
  });