import ActionTypes from './cart.types';

export const isHidden = () => ({
  type: ActionTypes.IS_HIDDEN
});
export const isHiddenCurr = () => ({
  type: ActionTypes.IS_HIDDEN_CURRENCY
});

export const addProduct = productItem => ({
  type: ActionTypes.ADD_PRODUCT_ITEM,
  payload: productItem
})

export const removeProduct = productItem => ({
  type: ActionTypes.REMOVE_PRODUCT_ITEM,
  payload: productItem
})

export const clearProduct = productItem => ({
  type: ActionTypes.CLEAR_PRODUCT,
  payload: productItem
})

export const changeCurrency = curr => ({
  type: ActionTypes.CHANGE_CURRENCY,
  payload: curr
})