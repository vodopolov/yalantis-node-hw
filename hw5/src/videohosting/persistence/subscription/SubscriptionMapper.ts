import UserSubscriptionDto from '../../model/subscription/UserSubscriptionDto'
import UserSubscriptionRaw from './UserSubscriptionRaw'

export default class SubscriptionMapper {
    public static toDto(raw: UserSubscriptionRaw) {
        return new UserSubscriptionDto(
            raw.user_name,
            raw.avatar_url,
            raw.photo_url,
            raw.channel_description,
            raw.sub_level,
            raw.subscribed_at
        )
    }
}
