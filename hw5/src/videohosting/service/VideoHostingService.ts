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
}
