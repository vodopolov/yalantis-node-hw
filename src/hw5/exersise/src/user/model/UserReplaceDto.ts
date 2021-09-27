import { IsNotEmpty } from "class-validator"

export default class UserReplaceDto {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    id: number

    constructor(name: string, id: number) {
        this.name = name
        this.id = id
    }
}
