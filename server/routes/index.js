const axios = require("axios");
const User = require('../models/user');
const auth = require('../auth')

const secret = process.env.JWT_SECRET_KEY;

const jwt = require('jsonwebtoken');

const createToken = (user, expiryTime) => jwt.sign(user, secret, { expiresIn: expiryTime })
// twitter app 
// https://stackoverflow.com/questions/45078952/twitter-api-application-only-authentication
module.exports = (app) => {
  app.get('/api/randomGiphy',
    (req, res) => {
      axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=bAugSybKD0aQdl01yzWb1hQA535v0c6b&limit=20`)
        .then((resp) => {
          const gifArr = resp.data.data;
          const randGifs = []
          gifArr.forEach(gif => {
            const newGif = {
              title: gif.title.split(" ").join(""),
              imgUrl: gif.images.original.url
            }
            randGifs.push(newGif);
          });
          return res.status(200).json({
            message: 'success', randGifs
          });
        })
        .catch((err) => {
          return res.status(400).json({
            message: 'error', err: err.message
          });
        })
    }
  );

  app.get('/api/search',
    (req, res) => {
      const q = req.query.q;
      axios.get(`https://api.giphy.com/v1/gifs/search?api_key=bAugSybKD0aQdl01yzWb1hQA535v0c6b&q=${q}&limit=20`)
        .then((resp) => {
          const gifArr = resp.data.data;
          const result = [];
          gifArr.forEach(gif => {
            const newGif = {
              title: gif.title.split(" ").join(""),
              imgUrl: gif.images.original.url
            }
            result.push(newGif);
          });
          return res.status(200).json({
            message: 'success', result
          });
        })
        .catch((err) => {
          return res.status(400).json({
            message: 'error', err: err.message
          });
        })
    }
  );

  app.get('/api/trends',
    (req, res) => {
      axios.defaults.headers.common.Authorization = `Bearer AAAAAAAAAAAAAAAAAAAAAF7w8gAAAAAAmZWpnq5YUDGyc1k%2FaCH3pN320jM%3DEuUjOjdtjwkw32RaeruZlNLVbHDifmQgAIL2AJSFvbZr4kpf7O`;
      axios.get(`https://api.twitter.com/1.1/trends/place.json?id=1398823`)
        .then((resp) => {
          const trending = resp.data[0].trends;
          const trends = [];
          trending.forEach(trend => {
            const newTrend = {
              title: trend.name.split(" ").join(""),
            }
            if (newTrend.title.charAt(0) !== '#') {
              newTrend.query = newTrend.title.split(/(?=[A-Z])/).join(" ")
              newTrend.title = `#${newTrend.title}`;
            } else {
              newTrend.query = newTrend.title.substr(1).split(/(?=[A-Z])/).join(" ")
            }
            trends.push(newTrend);
          });
          return res.status(200).json({
            message: 'success', trends
          });
        })
        .catch((err) => {
          return res.status(400).json({
            message: 'error', err: err.message
          });
        })
    }
  );

  app.post('/api/signup',
    (req, res) => {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({
          message: 'Email is not rightly formatted'
        });
      }
      User.findOne({
        email: req.body.email
      }).then((existingUser) => {
        if (!existingUser) {
          const user = new User(req.body);
          user.save((err, newUser) => {
            if (err) {
              return res.status(500).send({ err });
            }
            const userDetails = {
              email: newUser.email,
              id: newUser._id,
            };
            const jsonToken = createToken({ userDetails }, '24h');
            return res.status(200).send({ message: 'signup successful', jsonToken });
          });
        } else {
          return res.status(400)
            .send({ message: 'email already exists' });
        }
      });
    }
  );

  app.post('/api/login',
    (req, res) => {
      User.findOne({
        email: req.body.email
      }, (err, user) => {
        if (err) return res.status(500).send({ err });
        if (
          !user ||
          !user.comparePassword(req.body.password)
        ) {
          return res.status(404)
            .send({ message: 'email or password is incorrect' });
        }
        const userDetails = {
          email: user.email,
          id: user._id,
        };
        const jsonToken = createToken({ userDetails }, '24h');
        return res.status(200).send({ message: 'login successful', jsonToken });
      });
    }
  );

  app.post('/api/favorites', auth.checkToken,
    (req, res) => {
      User.findOne({
        _id: req.user._id
      }, (err, user) => {
        if (err) return res.status(500).send({ err });
        if (!user) {
          return res.status(404)
            .send({ message: 'user not found' });
        }
        user.favorites.push(req.body.favorite);
        user.save((err, updatedUser) => {
          if (err) {
            return res.status(500).send({ err });
          }
          return res.status(200).send({ message: 'success', updatedUser });
        });
      });
    }
  );

  app.put('/api/favorites', auth.checkToken,
    (req, res) => {
      User.findOne({
        _id: req.user._id
      }, (err, user) => {
        if (err) return res.status(500).send({ err });
        if (!user) {
          return res.status(404)
            .send({ message: 'user not found' });
        }
        const index = user.favorites.indexOf(req.body.favorite);
        if (index > -1) {
          user.favorites.splice(index, 1);
        }
        user.save((err, updatedUser) => {
          if (err) {
            return res.status(500).send({ err });
          }
          return res.status(200).send({ message: 'success', updatedUser });
        });
      });
    }
  );
}
