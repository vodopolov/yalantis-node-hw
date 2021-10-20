export default class UserSubscriptionDto {
    // eslint-disable-next-line no-useless-constructor
    public constructor(
        public readonly userName: string,
        public readonly avatarUrl: string,
        public readonly channelPhotoUrl: string,
        public readonly channelDescription: string,
        public readonly subscriptionLevel: string,
        public readonly subscribedAt: Date
    ) { }
}
