import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import errorHandler from 'errorhandler';
import fs from 'fs';
import bodyParser from 'body-parser';
import webpackConfig from '../../webpack.config';
import renderHTMLpage from './renderHTMLpage';

export default (app) => {
    if(process.env.NODE_ENV !== 'production'){
        // for dev ENV, build HMR and error handler
        const compiler = webpack(webpackConfig);

        app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
        app.use(webpackHotMiddleware(compiler));

        // error handler for dev env
        app.use(errorHandler());
    } else {
        app.use('/static', express.static(__dirname + '/../../dist'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        const initialState = req.body.data;
        const translation = req.body.translation;

        const renderHTML = renderHTMLpage(initialState, translation);

        if (process.env.NODE_ENV === 'development') {
            // for dev env we don't need the code
            res.status(200).end(JSON.stringify({staticHTML: renderHTML, code: ''}));

        } else {
            // for production env we need the code

            const getFileBundle = new Promise((resolve, reject) => {
                fs.readFile(__dirname + '/../../dist/bundle.js', 'utf8', (err, code) => {
                  if (err) {
                    return reject(err);
                  }

                  return resolve(code);
                });
            });

            getFileBundle.then((code) => {
                res.status(200).end(JSON.stringify({staticHTML: renderHTML, code: code}));
            })
        }
    });
}