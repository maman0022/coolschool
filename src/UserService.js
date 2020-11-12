import TokenService from "./TokenService"

const UserService = {
  getUser() {
    const payload = TokenService.getTokenPayload()
    return {
      id:payload.id,
      first_name:payload.first_name,
      last_name:payload.last_name,
      email:payload.email
    }
  }
}

export default UserService