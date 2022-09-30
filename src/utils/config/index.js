import * as local from './env.local';
import * as develop from './env.develop';
import * as staging from './env.staging';
import * as production from './env.production';

let config;

if (process.env.REACT_APP_ENV === 'product' || process.env.REACT_APP_ENV === 'production') {
    config = production;
}

if (process.env.REACT_APP_ENV === 'staging') {
    config = staging;
}

if (process.env.REACT_APP_ENV === 'develop') {
    config = develop;
}

if (process.env.NODE_ENV === 'development') {
    config = local;
}

if (process.env.NODE_ENV === 'test') {
    config = develop;
}

export default config;
