import { Injectable } from '@nestjs/common'
import VideoHostingRepository from '../persistence/VideoHostingRepository'

@Injectable()
export default class VideoHostingService {
    private _repository: VideoHostingRepository = new VideoHostingRepository()

    public getUsersWithChannels() {
        return this._repository.getUsersWithChannels()
    }

    public getMostLikedVideos() {
        return this._repository.getMostLikedVideos()
    }

    public getMostPopularVideos() {
        return this._repository.getMostPopularVideos()
    }

    public getVideosFromUserSubscriptions(name: string) {
        return this._repository.getVideosFromUserSubscriptions(name)
    }

    public getChannelInfo(channelId: string) {
        return this._repository.getChannelInfo(channelId)
    }

    public getUserSubscriptions(userName: string) {
        return this._repository.getUserSubscriptions(userName)
    }
}
