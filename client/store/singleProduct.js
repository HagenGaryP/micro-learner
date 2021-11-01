import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'


const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product})

export const fetchSingleProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(getSingleProduct(data))
  } catch (err) {
    console.error(err)
  }
}

const defaultSingleProduct = {}

export default function(state = defaultSingleProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
