
const sha1 = require('sha1');
const axios = require('axios');

const className = 'todo';

const request = axios.create({
    baseURL: 'https://d.apicloud.com/mcm/api'
})

const createError = (code, resp) => {
    const err = new Error(resp.message);
    err.code = code;
    return err;
}

const handleRequest = ({status, data, ...rest}) => {
    if (status === 200) {
        return data
    } else {
        throw createError(status, rest)
    }
}

module.exports = (appId, appKey) => {

    const getHeaders = () => {
        const now = Date.now();
        return {
            'X-APICloud-AppId': appId,
            'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
        }
    }

    return {
        async getAllTodos() {
            const res = await request.get(`/${className}`, {       headers: getHeaders(),
            })
            return handleRequest(res)
        },
        async addTodo(todo) {
            const res = await request.post(`/${className}`, todo, {
                headers: getHeaders(),
            })
            return handleRequest(res)
        },
        async updateTodo(id, todo) {
            const res = await request.put(`/${className}/${id}`, todo, { headers: getHeaders() })
            return handleRequest(res)
        },
        async deleteTodo(id) {
            const res = await request.delete(`/${className}/${id}`, { headers: getHeaders() })
            return handleRequest(res)
        },
        async deleteCompleted(ids) {
            const requests = ids.map((id) => ({
                method: 'DELETE',
                path: `/mcm/api/${className}/${id}`
            }))
            const res = await request.post(`/batch`, {
                requests,
            }, {
                headers: getHeaders()
            })

            return handleRequest(res);
        },
    }
}
