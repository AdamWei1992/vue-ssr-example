import model from 'model';
// import model from '../../client/model/client-model';
import notify from '../../client/components/notification/function';
import bus from '../../client/util/bus';

const handleError = (err) => {
    console.log(err)
    if (err.code === 401) {
        notify({
            content: '你得先登录啊！'
        });
        bus.$emit('auth');
    }
}
export default {
    updateCountAsync(store, num) {
        // console.log('actions', store)
        console.log('actions', store)
        setTimeout(() => {
            this.commit('updateCount', num)
            // store.state.count = num;
        }, 2000)
    },
    fetchTodos({ commit }) {
        commit('startLoading')
        return model.getAllTodos().then(data => {
            commit('fillTodos', data)
            commit('endLoading')
        }).catch(err => {
            commit('endLoading')
            handleError(err)
        })
    },
    addTodo ({ commit }, todo) {
        commit('startLoading')
        model.createTodo(todo) .then(data => {
            commit('addTodo', data)
            commit('endLoading')
            notify({
                content: '你又多了一件事要做'
            })
        }).catch(err => {
            commit('endLoading')
            handleError(err)
        })
    },
    updateTodo ({ commit }, { id, todo }) {
        commit('startLoading')
        model.updateTodo(id, todo).then(data => {
            commit('updateTodo', { id, todo: data })
            commit('endLoading')
        }).catch(err => {
            handleError(err)
            commit('endLoading')
        })
    },
    deleteTodo ({ commit }, id) {
        commit('startLoading')
        model.deleteTodo(id).then(data => {
            commit('deleteTodo', id)
            notify({
                content: '你又少了一件事要做'
            })
            commit('endLoading')
        }).catch(err => {
            handleError(err)
            commit('endLoading')
        })
    },
    deleteAllCompleted ({ commit, state }) {
        commit('startLoading')
        const ids = state.todos.filter(t => t.completed).map(t => t.id)
        model.deleteAllCompleted(ids).then(() => {
            commit('deleteAllCompleted')
            commit('endLoading')
            notify({
                content: '清理一下~~~'
            })
        }).catch(err => {
            handleError(err)
            commit('endLoading')
        })
    },
    login({commit}, {username, password}) {
        return new Promise((resolve, reject) => {
            model.login(username, password).then(data => {
                commit('doLogin', data);
                notify({
                    content: '登陆成功'
                });
                resolve()
            }).catch(err => {
                handleError(err);
                reject(err)
            })
        })
    }
}
