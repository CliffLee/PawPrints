import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// api routes
app.use('/api/lost', require('./routes/api/lost').default);
//app.use('/api/found', require('./routes/api/found'));

// export
export default app;
