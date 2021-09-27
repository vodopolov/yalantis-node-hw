import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import UserService from '../user/service/user.service'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    validateUser(payload: IdParamHolder) {
        console.log('validate')
        return this.userService.get(payload.userId)
    }

    async createToken(userId: string) {
        const id = Number.parseInt(userId)
        const user = await this.userService.get(id)
        return jwt.sign({ userId: user.getId() }, '123')
    }
}

interface IdParamHolder {
    userId: number
}