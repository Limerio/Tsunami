/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    description: 'Request for checking if the server is up or down',
  })
  getHello() {
    return 'Hello world !'
  }
}
