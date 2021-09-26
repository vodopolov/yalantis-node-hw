import { IsNotEmpty } from "class-validator"

export default class UserCreateDto {
    @IsNotEmpty()
    name: string

    constructor(name: string) {
        this.name = name
    }
}
