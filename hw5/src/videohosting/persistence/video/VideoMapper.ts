import PopularVideoDto from '../../model/video/PopularVideoDto'
import PopularVideoRaw from './PopularVideoRaw'

export default class VideoMapper {
    public static toDto(rawResult: PopularVideoRaw): PopularVideoDto {
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
