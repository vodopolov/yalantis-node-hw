import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { IncomingMessage } from 'http'
import * as jwt from 'jsonwebtoken'

class MessageWithToken extends IncomingMessage {
    body: { id: string }
}

@Injectable()
export class RightsGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean> {
        const message: IncomingMessage = context.getArgs()[0]
        const requestedUserId = this.getRequestedUserId(message as MessageWithToken)
        const token = this.getToken(message)
        return new Promise<boolean>((resolve, reject) => {
            jwt.verify(token, '123', (err, decoded) => {
                if (err) {
                    return reject(err.message)
                }
                return resolve(!!decoded && (decoded.id === requestedUserId))
            })
        })
    }

    private getRequestedUserId(message: MessageWithToken): number {
        if (!message.body) {
            return -1
        }
        return Number.parseInt(message.body.id)
    }

    private getToken(message: IncomingMessage): string {
        if (!message.headers || !message.headers.authorization) {
            return ''
        }
        const auth = message.headers.authorization
        const token = auth.split(' ')[1]
        return token
    }
}
