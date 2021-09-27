import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common"
import { Response } from 'express'
import { RightsGuard } from "../../auth/simple.guard"
import UserCreateDto from "../model/UserCreateDto"
import UserProfile from "../model/UserProfile"
import UserService from "../service/user.service"

@Controller('users')
export class UserController {

    constructor(private readonly _userService: UserService) { }

    @Post()
    create(@Body() user: UserCreateDto) {
        const realUser = new UserProfile(user.name)
        return this._userService.save(realUser)
    }

    @Get()
    getAll() {
        return this._userService.getAll()
    }

    @Get(':id')
    @UseGuards(new RightsGuard())
    async getById(@Param() params: IdParamHolder, @Res() res: Response) {
        const id = Number.parseInt(params.id)
        const result = await this._userService.get(id)
            .catch((e: Error) => {
                return res.status(HttpStatus.OK).json(e.message)
            })
        return res.status(HttpStatus.OK).json(result)
    }
}

interface IdParamHolder {
    id: string
}