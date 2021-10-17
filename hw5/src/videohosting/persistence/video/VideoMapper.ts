import PopularVideoDto from '../../model/video/PopularVideoDto'
import TopVideoDto from '../../model/video/TopVideoDto'
import PopularVideoRaw from './PopularVideoRaw'
import VideoEntity from './VideoEntity'

export default class VideoMapper {
    public static toTopDto(video: VideoEntity) {
        return new TopVideoDto(
            video.id,
            video.channelId,
            video.title,
            video.description,
            video.previewUrl,
            video.fileUrl,
            video.duration,
            video.publishedAt
        )
    }

    public static toPopularDto(rawResult: PopularVideoRaw): PopularVideoDto {
        return new PopularVideoDto(rawResult.video_id,
            rawResult.video_channel_id,
            rawResult.video_title,
            rawResult.video_description,
            rawResult.video_preview_url,
            rawResult.video_file_url,
            rawResult.video_duration,
            rawResult.video_published_at,
            rawResult.like_counter,
            rawResult.reactions
        )
    }
}
