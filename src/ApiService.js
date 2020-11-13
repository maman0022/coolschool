import config from './config'
import TokenService from "./TokenService"

const ApiService = {
  login(data) {
    return fetch(config.BASE_API_URL + 'login', { method: 'POST', headers: { 'content-type': 'application/json' }, ...data })
  },
  register(data) {
    return fetch(config.BASE_API_URL + 'register', { method: 'POST', headers: { 'content-type': 'application/json' }, ...data })
  },
  getCourses() {
    return fetch(config.BASE_API_URL + `courses`, { headers: { 'authorization': `bearer ${TokenService.getToken()}` } })
  },
  getCourse(courseId) {
    return fetch(config.BASE_API_URL + `courses/${courseId}`, { headers: { 'authorization': `bearer ${TokenService.getToken()}` } })
  },
  addCourse(title) {
    const body = JSON.stringify({ title })
    const headers = {
      'authorization': `bearer ${TokenService.getToken()}`,
      'content-type': 'application/json'
    }
    return fetch(config.BASE_API_URL + 'courses', { method: 'POST', headers, body })
  },
  deleteCourse(id) {
    const body = JSON.stringify({ id })
    const headers = {
      'authorization': `bearer ${TokenService.getToken()}`,
      'content-type': 'application/json'
    }
    return fetch(config.BASE_API_URL + 'courses', { method: 'DELETE', headers, body })
  },
  getNote(id) {
    return fetch(config.BASE_API_URL + `notes/${id}`, { headers: { 'authorization': `bearer ${TokenService.getToken()}` } })
  }
}

export default ApiService