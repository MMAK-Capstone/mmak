import axios from 'axios'

const GET_CATEGORIES = 'GET_CATEGORIES'

const categories = []

const getCategories = category => ({type: GET_CATEGORIES, category})

export const fetchCategory = categoryName => async dispatch => {
  try {
    const res = await axios.get(`/api/categories/${categoryName}`)
    dispatch(getCategories(res.data || categories))
  } catch (err) {
    console.error('hey there is an error with fetchCategory', err)
  }
}

export default function(state = categories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.category
    default:
      return state
  }
}
