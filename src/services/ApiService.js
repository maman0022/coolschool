import config from '../config'
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
    return fetch(config.BASE_API_URL + `courses/${id}`, { method: 'DELETE', headers: { 'authorization': `bearer ${TokenService.getToken()}` } })
  },
  getNote(id) {
    return fetch(config.BASE_API_URL + `notes/${id}`, { headers: { 'authorization': `bearer ${TokenService.getToken()}` } })
  },
  deleteNote(id) {
    return fetch(config.BASE_API_URL + `notes/${id}`, { method: 'DELETE', headers: { 'authorization': `bearer ${TokenService.getToken()}` } })
  },
  updateNote(id, title, content) {
    const body = JSON.stringify({
      title,
      content
    })
    const headers = {
      'authorization': `bearer ${TokenService.getToken()}`,
      'content-type': 'application/json'
    }
    return fetch(config.BASE_API_URL + `notes/${id}`, { method: 'PATCH', headers, body })
  },
  getEssay(id) {
    return fetch(config.BASE_API_URL + `essays/${id}`, { headers: { 'authorization': `bearer ${TokenService.getToken()}` } })
  },
  deleteEssay(id) {
    return fetch(config.BASE_API_URL + `essays/${id}`, { method: 'DELETE', headers: { 'authorization': `bearer ${TokenService.getToken()}` } })
  },
  updateEssay(id, title, content) {
    const body = JSON.stringify({
      title,
      content
    })
    const headers = {
      'authorization': `bearer ${TokenService.getToken()}`,
      'content-type': 'application/json'
    }
    return fetch(config.BASE_API_URL + `essays/${id}`, { method: 'PATCH', headers, body })
  },
  addNoteOrEssay(title, content, courseId, type) {
    const body = JSON.stringify({
      title,
      content,
      courseId
    })
    const headers = {
      'authorization': `bearer ${TokenService.getToken()}`,
      'content-type': 'application/json'
    }
    return fetch(config.BASE_API_URL + type, { method: 'POST', headers, body })
  },
}

export default ApiService