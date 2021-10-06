import { IsNotEmpty } from 'class-validator'

export default class UserProfile {
    private _id: number = -1

    @IsNotEmpty()
    name: string

    constructor(name: string) {
        this.name = name
    }

    getId(): number {
        return this._id
    }

    setId(id: number) {
        this._id = id
    }
}
