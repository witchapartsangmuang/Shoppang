import Axios from "axios"

const DEFAULT_STATE = {
    LoginUser: []
}

export const auth = {
    state: DEFAULT_STATE,
    reducers: {
        SET_USER_LOGIN(state, payload) {
            return { ...state, LoginUser:payload }
        }
    },
    effects: (dispatch) => ({
        async fetchLoginUser(payload) {
            Axios.post('http://127.0.0.1:8000/token/',{
                username: payload.username,
                password: payload.password
            }).then(function (response) {
                dispatch.auth.SET_USER_LOGIN(response.data)
                window.location.href = '/'
            })
            .catch(function (response) {
                alert(response.response.data.msg)
            })
        }
    })
}
