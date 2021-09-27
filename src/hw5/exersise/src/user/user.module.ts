import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { AuthService } from '../auth/auth.service'
import { JwtStrategy } from '../auth/jwt.strategy'
import { UserController } from "./controller/UserController"
import UserService from "./service/user.service"

@Module({
    controllers: [UserController],
    providers: [AuthService, JwtStrategy, UserService],
    imports: [
        PassportModule.register({ defaultStrategy: 'custom' }),
        JwtModule.register({ secretOrPrivateKey: '123' })
    ],
    exports: [JwtStrategy]
})
export class UserModule { }
