export class UserSavedResponse {
    public readonly id: number
    public readonly token: string
    constructor(id: number, token: string) {
        this.id = id
        this.token = token
    }
}
