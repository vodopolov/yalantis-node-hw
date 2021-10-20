/* eslint-disable no-useless-constructor */
export default class ChannelDto {
    public constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly description: string,
        public readonly photoUrl: string,
        public readonly createdAt: Date,
        public readonly subscribers: number
    ) { }
}
