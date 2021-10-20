export default class PopularVideoDto {
    // eslint-disable-next-line no-useless-constructor
    public constructor(
        public readonly id: string,
        public readonly channelId: string,
        public readonly title: string,
        public readonly description: string,
        public readonly previewUrl: string,
        public readonly fileUrl: string,
        public readonly duration: string,
        public readonly publishedAt: Date,
        public readonly likes: number,
        public readonly reactions: number
    ) { }
}
