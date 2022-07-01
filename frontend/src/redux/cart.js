import Axios from "axios"

const DEFAULT_STATE = {
    UserCart: []
}

export const cart = {
    state: DEFAULT_STATE,
    reducers: {
        SET_CART_USER(state, payload) {
            return { ...state, UserCart: payload }
        }
    },
    effects: (dispatch) => ({
        async fetchGetUserCart(payload) {
            Axios.get('http://127.0.0.1:8000/carts/',
                {
                    headers: {
                        Authorization: `Bearer ${payload.useraccess}`
                    }
                }
            ).then(function (response) {
                dispatch.cart.SET_CART_USER(response.data.data)
            }).catch(function (response) {
                console.log('err')
            })
        }
        ,
        async fetchPutUserCart(payload) {
            console.log(payload)
            Axios.put(`http://127.0.0.1:8000/cart/${payload.id}/`,
                { 'quantity': payload.value },
                {
                    headers: {
                        Authorization: `Bearer ${payload.useraccess}`
                    }
                }
            ).then(function (response) {
                dispatch.fetchGetUserCart(payload.useraccess)
            }).catch(function (response) {
                console.log('catch : ',response)
            })
        }
    })
}