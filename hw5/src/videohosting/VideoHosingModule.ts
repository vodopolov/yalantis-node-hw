import { Module } from '@nestjs/common'
import { VideoHostingController } from './controller/VideoHostingController'
import VideoHostingService from './service/VideoHostingService'

@Module({
    controllers: [VideoHostingController],
    providers: [VideoHostingService]
})
export class VideoHostingModule { }
