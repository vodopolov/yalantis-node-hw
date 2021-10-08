import { Connection, getConnection, QueryRunner } from 'typeorm'

export default class VideoHostingRepository {
    private _connection: Connection
    private _queryRunner: QueryRunner

    public async getUsersWithChannels() {
        const runner = await this.getQueryRunner()
        return runner.query('SELECT channels.user_id, users.name, users.avatar_url, channels.description, channels.photo_url, channels.created_at ' +
            'FROM channels LEFT JOIN users ON channels.user_id = users.id ORDER BY channels.created_at DESC')
    }

    public async getMostLikedVideos() {
        const runner = await this.getQueryRunner()
        return runner.query('SELECT * FROM videos WHERE id in (SELECT video_id FROM likes WHERE likes.positive = true GROUP BY video_id ORDER BY COUNT(*) DESC LIMIT 5)')
    }

    private async getConnection() {
        if (!this._connection) {
            this._connection = await getConnection()
        }
        return this._connection
    }

    private async getQueryRunner() {
        const conn = await this.getConnection()
        const runner = conn.createQueryRunner()
        return runner
    }
}
