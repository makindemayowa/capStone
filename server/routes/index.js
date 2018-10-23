const axios = require("axios");
var FormData = require('form-data');
var qs = require('qs')

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
          if(newTrend.title.charAt(0) !== '#') {
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
}