export default class UserController {
  constructor(userService) {
    this.userService = userService
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await this.userService.getAllUsers()
      res.json(users)
    } catch (error) {
      next(error)
    }
  }
}
