import { Controller, Post, Delete, Get } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  @Get('user')
  getUser() {}

  @Post('login')
  postLogin() {}

  @Post('register')
  postRegister() {}

  @Delete('logout')
  deleteLogout() {}
}
