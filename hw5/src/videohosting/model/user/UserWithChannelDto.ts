export default class UserWithChannelDto {
    // eslint-disable-next-line no-useless-constructor
    constructor(
        public readonly userId: string,
        public readonly userName: string,
        public readonly userAvatar: string,
        public readonly channelPhoto: string,
        public readonly channelDesc: string,
        public readonly channelCreationDate: Date
    ) { }
}
