
// import Todo from '@/views/todo/todo.vue';
// import Login from '@/views/login/login.vue';

export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        // component: Todo,
        // 异步组件不能再bundle在使用mfs内存写入的情况下使用
        component: () => import(/* webpackChunkName: "todos-view" */ '@/views/todo/todo.vue')
    },
    {
        path: '/login',
        // component: Login,
        component: () => import(/* webpackChunkName: "login-view" */ '@/views/login/login.vue')
    }
]
