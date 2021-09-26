import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common"
import { Response } from 'express'
import UserCreateDto from "../model/UserCreateDto"
import UserProfile from "../model/UserProfile"
import { IUserProfileRepository } from "../repository/IUserRepository"
import { UserProfileFileRepository } from "../repository/UserProfileFileRepository"

@Controller('users')
export class UserController {
    private _userRepository: IUserProfileRepository = new UserProfileFileRepository()

    @Post()
    create(@Body() user: UserCreateDto) {
        const realUser = new UserProfile(user.name)
        return this._userRepository.save(realUser)
    }

    @Get()
    getAll() {
        return this._userRepository.getAll()
    }

    @Get(':id')
    getById(@Param() params: IdParamHolder, @Res() res: Response) {
        const id = params.id
        return this._userRepository.getOne(id)
            .catch((e: Error) => {
                return res.status(HttpStatus.OK).json(e.message)
            })
    }
}

interface IdParamHolder {
    id: number
}