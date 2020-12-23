import axios from 'axios'

const GET_SINGLE_TOPIC = 'GET_SINGLE_TOPIC'


const getSingleTopic = topic => ({type: GET_SINGLE_TOPIC, topic})

export const fetchSingleTopic = topicId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/topics/${topicId}`)
    dispatch(getSingleTopic(data))
  } catch (err) {
    console.error(err)
  }
}

const defaultSingleTopic = {}

export default function(state = defaultSingleTopic, action) {
  switch (action.type) {
    case GET_SINGLE_TOPIC:
      return action.topic
    default:
      return state
  }
}
