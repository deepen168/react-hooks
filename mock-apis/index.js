const express = require('express');
const request = require('request');
const LimitingMiddleware = require('limiting-middleware');
const { randomJoke, randomTen, jokeByType } = require('./handler');
const stories = require('./stories');

const app = express();

app.use(new LimitingMiddleware().limitByIp());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Try /random_joke, /random_ten, /jokes/random, or /jokes/ten');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/random_joke', (req, res) => {
  res.json(randomJoke());
});

app.get('/random_ten', (req, res) => {
  res.json(randomTen());
});

app.get('/jokes/random', (req, res) => {
  res.json(randomJoke());
});

app.get('/jokes/ten', (req, res) => {
  res.json(randomTen());
});

app.get('/jokes/:type/random', (req, res) => {
  res.json(jokeByType(req.params.type, 1));
});

app.get('/jokes/:type/ten', (req, res) => {
  res.json(jokeByType(req.params.type, 10));
});

/* News stories apis */

app.get('/ping', (req, res) => {
  res.send('pong!');
});

app.get('/stories', (req, res) => {
  res.json(stories);
});

app.get('/stories/:title', (req, res) => {
  const { title } = req.params;

  res.json(stories.filter(story => story.title.includes(title)));
});

app.get('/topstories', (req, res, next) => {
  request(
    { url: 'https://hacker-news.firebaseio.com/v0/topstories.json' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return next(new Error('Error requesting top stories'));
      }

      const topStories = JSON.parse(body);
      const limit = 10;

      Promise.all(
        topStories.slice(0, limit).map(story => (
          new Promise((resolve, reject) => {
            request(
              { url: `https://hacker-news.firebaseio.com/v0/item/${story}.json` },
              (error, response, body) => {
                if (error || response.statusCode !== 200) {
                  return reject(new Error('Error requesting story item'));
                }

                resolve(JSON.parse(body));
              }
            )
          })
        ))
      )
      .then(stories => res.json(stories))
      .catch(error => next(error));
    }
  )
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: 'error', message: err.message
  });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
