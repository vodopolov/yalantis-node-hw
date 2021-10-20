import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { configService } from './shared/config.service'
import { UserModule } from './user/user.module'
import { VideoHostingModule } from './videohosting/VideoHosingModule'

@Module({
    imports: [UserModule, VideoHostingModule, TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
