import ActionTypes from './cart.types';
const INIT_STATE = {
    hidden: false,
    hidden_curr: false,
    cartItems: [],
    currency: '$'
}

const cartReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ActionTypes.IS_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case ActionTypes.IS_HIDDEN_CURRENCY:
            return {
                ...state,
                hidden_curr: !state.hidden_curr
            }
        case ActionTypes.ADD_PRODUCT_ITEM:
            let itemExists = state.cartItems.find(item => item.id === action.payload.id)
            let newCartItems = []
            if (itemExists) {
                newCartItems = state.cartItems.map(item => {
                    return item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                })
            } else {
                newCartItems = [...state.cartItems, { ...action.payload, quantity: 1 }]
            }

            return {
                ...state,
                cartItems: newCartItems,

            }

        case ActionTypes.REMOVE_PRODUCT_ITEM:
            let filteredCartItems = state.cartItems.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item).filter(el => el.quantity > 0)
            return {
                ...state,
                cartItems: filteredCartItems,

            }
        case ActionTypes.CLEAR_PRODUCT:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.id),

            }
        case ActionTypes.CHANGE_CURRENCY:
            return {
                ...state,
                currency: action.payload
            }
        default:
            return state
    }
}

export default cartReducer