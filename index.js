const express = require('express');

const server = express();

const cohortsRouter = require('./routers/cohortsRouter.js');

// const studentsRouter = require('./routers/studentsRouter.js');

const port = process.env.PORT || 5000;

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(express.json());

server.use('/api/cohorts', cohortsRouter);

// server.use('/students', studentsRouter);

server.listen(port, () => console.log(`\nchillin on ${port}\n`));