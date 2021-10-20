import UserWithChannelDto from '../../model/user/UserWithChannelDto'
import ChannelEntity from '../channel/ChannelEntity'

export default class UserMapper {
    public static toUserWithChannelDto(channel: ChannelEntity) {
        return new UserWithChannelDto(
            channel.user.id,
            channel.user.name,
            channel.user.avatarUrl,
            channel.photoUrl,
            channel.description,
            channel.createdAt)
    }
}
