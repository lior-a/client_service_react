import express from 'express';
import config from '../../config';
import routes from './routes';

const app = express();

routes(app);

const server = app.listen(config.port, function () {
    const host = server.address().address; // todo: fix address - doesn't output
    const port = server.address().port;
    console.log('Client Service Listening at http://%s:%s', host, port);
});