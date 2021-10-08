import { Injectable } from '@nestjs/common'
import VideoHostingRepository from '../repository/VideoHostingRepository'

@Injectable()
export default class VideoHostingService {
    private _repository: VideoHostingRepository = new VideoHostingRepository()

    public getUsersWithChannels() {
        return this._repository.getUsersWithChannels()
    }

    public getMostLikedVideos() {
        return this._repository.getMostLikedVideos()
    }

    public getVideosFromUserSubscriptions(name: string) {
        return this._repository.getVideosFromUserSubscriptions(name)
    }

    public getChannelInfo(channelId: string) {
        return this._repository.getChannelInfo(channelId)
    }
}
