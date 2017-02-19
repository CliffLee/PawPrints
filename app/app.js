import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';

const app = express();

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// api routes
app.use('/api/lost', require('./routes/api/lost').default);
app.use('/api/found', require('./routes/api/found').default);

app.get('/', (req,res) => {
  res.send("Hello World");
});
export default app;
