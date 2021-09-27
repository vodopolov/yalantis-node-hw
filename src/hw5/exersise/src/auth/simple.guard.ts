import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { IncomingMessage } from "http"
import * as jwt from 'jsonwebtoken'

@Injectable()
export class RightsGuard implements CanActivate {
    constructor() {
    }

    canActivate(context: ExecutionContext): Promise<boolean> {
        const message: IncomingMessage = context.getArgs()[0]
        const requestedUserId = this.getRequestedUserId(message)
        const token = this.getToken(message)
        return new Promise<boolean>(resolve => {
            jwt.verify(token, '123', (err, decoded) => {
                return resolve(decoded.userId === requestedUserId)
            })
        })
    }

    private getRequestedUserId(message: IncomingMessage): number {
        if (!message["params"]) {
            return -1
        }
        return Number.parseInt(message["params"].id)
    }

    private getToken(message: IncomingMessage): string {
        if (!message["headers"] || !message["headers"].authorization) {
            return ''
        }
        const auth = message["headers"].authorization
        const token = auth.split(' ')[1]
        return token
    }
}