
import routes from './routes';
import Router from 'vue-router';

export default () => {
    return new Router({
        mode: 'history',
        routes
    })
}
