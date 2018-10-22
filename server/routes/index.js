const axios = require("axios");

module.exports = (app) => {
  app.get('/api/randomGiphy',
    (req, res) => {
      axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=bAugSybKD0aQdl01yzWb1hQA535v0c6b&limit=10`)
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
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=bAugSybKD0aQdl01yzWb1hQA535v0c6b&q=${q}&limit=10`)
    .then((resp) => {
      const gifArr = resp.data.data;
      const result = []
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
}