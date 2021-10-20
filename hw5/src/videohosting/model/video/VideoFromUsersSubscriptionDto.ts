/* eslint-disable no-useless-constructor */
export default class VideoFromUsersSubscriptionDto {
    public constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly previewUrl: string,
        public readonly duration: string,
        public readonly publishedAt: Date
    ) { }
}
