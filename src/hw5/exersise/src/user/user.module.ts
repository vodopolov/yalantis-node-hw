import { Module } from "@nestjs/common"
import { UserController } from "./controller/UserController"

@Module({
    controllers: [UserController]
})
export class UserModule { }
