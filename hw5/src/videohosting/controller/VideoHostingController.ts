import { Controller, Get } from '@nestjs/common'
import VideoHostingService from '../service/VideoHostingService'

@Controller('videoHosting')
export class VideoHostingController {
    private readonly _videoHostingService: VideoHostingService

    constructor(vhServiceervice: VideoHostingService) {
        this._videoHostingService = vhServiceervice
    }

    @Get('/usersWithChannel/')
    getUsersWithChannel() {
        return this._videoHostingService.getUsersWithChannels()
    }

    @Get('/mostLikedVideos/')
    getMostLikedVideos() {
        return this._videoHostingService.getMostLikedVideos()
    }
}
