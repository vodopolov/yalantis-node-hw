import ChannelDto from '../../model/channel/ChannelDTO'
import ChannelEntity from './ChannelEntity'

export default class ChannelMapper {
    public static toDto(entity: ChannelEntity) {
        return new ChannelDto(
            entity.id,
            entity.userId,
            entity.description,
            entity.photoUrl,
            entity.createdAt,
            entity.subscriptions ? entity.subscriptions.length : 0
        )
    }
}
