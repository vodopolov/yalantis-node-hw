import * as jwt from 'jsonwebtoken'
import UserProfile from '../model/UserProfile'
import { UserSavedResponse } from '../model/UserSavedResponse'
import { IUserProfileRepository } from './IUserRepository'

const fs = require('fs')

export class UserProfileFileRepository implements IUserProfileRepository {
    private readonly path = require('path');
    private readonly filename: string = 'users.json';
    private readonly folder: string = 'storage';
    private readonly fullFilePath = this.path.join(this.folder, this.filename)

    private maxId: number = -1;

    getOne(id: number): Promise<UserProfile> {
        this.checkAndCreateFolder()
        return new Promise((resolve, reject) => {
            const jsonData = JSON.parse(fs.readFileSync(this.fullFilePath))
            for (const item of jsonData) {
                const numId = Number.parseInt(item._id)
                if (numId === id) {
                    const parsedItem = new UserProfile(item.name)
                    parsedItem.setId(numId)
                    return resolve(parsedItem)
                }
            }
            return reject(new Error(`User not found. Id: ${id}`))
        })
    }

    delete(id: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getAll().then((users: UserProfile[]) => {
                const filteredUsers = users.filter(user => user.getId() !== id)
                if (users.length === filteredUsers.length) {
                    return resolve(false)
                }
                this.saveUserData(filteredUsers)
                return resolve(true)
            }).catch((reason) => {
                return reject(reason)
            })
        })
    }

    save(user: UserProfile): Promise<UserSavedResponse> {
        this.checkAndCreateFolder()
        return new Promise((resolve, reject) => {
            this.getAll().then((users: UserProfile[]) => {
                for (const item of users) {
                    this.maxId = Math.max(this.maxId, item.getId())
                }
                user.setId(++this.maxId)
                users.push(user)
                this.saveUserData(users)
                const token = jwt.sign({ id: user.getId() }, '123')
                return resolve(new UserSavedResponse(this.maxId, token))
            }).catch((reason) => {
                return reject(reason)
            })
        })
    }

    async update(newUser: UserProfile): Promise<boolean> {
        try {
            const userToReplace = await this.getOne(newUser.getId())
            await this.delete(userToReplace.getId())
            return this.getAll().then((users: UserProfile[]) => {
                users.push(newUser)
                this.saveUserData(users)
                return true
            }).catch(reason => {
                return false
            })
        } catch (e) {
            return Promise.resolve(false)
        }
    }

    getAll(): Promise<UserProfile[]> {
        this.checkAndCreateFolder()
        return new Promise((resolve) => {
            const jsonData = JSON.parse(fs.readFileSync(this.fullFilePath))
            const result: UserProfile[] = []
            for (const item of jsonData) {
                const parsedItem = new UserProfile(item.name)
                parsedItem.setId(Number.parseInt(item._id))
                result.push(parsedItem)
            }
            return resolve(result)
        })
    }

    private saveUserData(data: UserProfile[]) {
        const stringifyData = JSON.stringify(data)
        fs.writeFileSync(this.fullFilePath, stringifyData)
    }

    private checkAndCreateFolder() {
        if (!fs.existsSync(this.folder)) {
            fs.mkdirSync(this.folder)
        }
        if (!fs.existsSync(this.fullFilePath)) {
            this.saveUserData([])
        }
    }
}
