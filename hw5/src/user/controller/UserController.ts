import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { RightsGuard } from '../../auth/RightsGuard'
import UserCreateDto from '../model/UserCreateDto'
import UserProfile from '../model/UserProfile'
import UserReplaceDto from '../model/UserReplaceDto'
import UserService from '../service/user.service'

interface IdParamHolder {
    id: string
}

@Controller('users')
export class UserController {
    private readonly _userService: UserService

    constructor(userService: UserService) {
        this._userService = userService
    }

    @Post()
    create(@Body() user: UserCreateDto) {
        const realUser = new UserProfile(user.name)
        return this._userService.save(realUser)
    }

    @Get('/all/')
    getAll() {
        return this._userService.getAll()
    }

    @Get('/:id')
    async getById(@Param() params: IdParamHolder, @Res() res: Response) {
        const id = Number.parseInt(params.id)
        const result = await this._userService.get(id)
            .catch((e: Error) => {
                return res.status(HttpStatus.OK).json(e.message)
            })
        return res.status(HttpStatus.OK).json({ result: result })
    }

    @Put()
    @UseGuards(new RightsGuard())
    async updateUser(@Body() user: UserReplaceDto, @Res() res: Response) {
        console.log(JSON.stringify(user))
        const realUser = new UserProfile(user.name)
        realUser.setId(user.id)
        const result = await this._userService.update(realUser)
        return res.status(HttpStatus.OK).json({ result: result ? `User ${user.id} was saved` : `User ${user.id} wasn't saved` })
    }
}
