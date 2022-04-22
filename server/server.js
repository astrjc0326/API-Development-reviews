const express = require('express');
const routes = require('./routes');

module.exports = {
  createServer: () => {
    const app = express();

    app.use(express.static('client/dist'));
    app.use(express.json());
    app.use('/', routes);
    return app;
  },
};
