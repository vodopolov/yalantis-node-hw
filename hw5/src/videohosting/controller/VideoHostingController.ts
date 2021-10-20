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

    @Get('/mostPopularVideos/')
    getMostPopularVideos() {
        return this._videoHostingService.getMostPopularVideos()
    }

    @Get('/userSubscriptionVideos/')
    getUserSubscriptionVideos() {
        return this._videoHostingService.getVideosFromUserSubscriptions('Stephanie Bulger')
    }

    @Get('/getChannelInfo/')
    getChannelInfo() {
        return this._videoHostingService.getChannelInfo('79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76')
    }

    @Get('/getUserSubscriptions/')
    getUserSubscriptions() {
        return this._videoHostingService.getUserSubscriptions('Ennis Haestier')
    }
}
