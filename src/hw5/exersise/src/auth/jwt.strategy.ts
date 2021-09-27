import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'custom') {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '123',
            algorithms: ['HS256']
        })
        console.log('JwtStrategy')
    }

    async validate(payload) {
        console.log('JwtStrategy')
        const user = await this.authService.validateUser(payload)
        if (!user) {
            throw new Error()
        }
        return user
    }
}
