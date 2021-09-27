import { Injectable } from "@nestjs/common"
import UserCreateDto from "../model/UserCreateDto"
import UserProfile from "../model/UserProfile"
import { IUserProfileRepository } from "../repository/IUserRepository"
import { UserProfileFileRepository } from "../repository/UserProfileFileRepository"

@Injectable()
export default class UserService {
    private _userRepository: IUserProfileRepository = new UserProfileFileRepository()

    public save(user: UserCreateDto) {
        const realUser = new UserProfile(user.name)
        return this._userRepository.save(realUser)
    }

    public getAll() {
        return this._userRepository.getAll()
    }

    public get(id: number) {
        return this._userRepository.getOne(id)
    }

    public update(user: UserProfile) {
        return this._userRepository.update(user)
    }
}