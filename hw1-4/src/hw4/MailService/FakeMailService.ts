import nodemailer from 'nodemailer'
import IMailService from './IMailService'

export default class FakeMailService implements IMailService {
    private readonly _transporter: nodemailer.Transporter

    constructor() {
        this._transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'lavon.marvin10@ethereal.email',
                pass: 'QDRhQhMJJSdT6c9jFh'
                // This data can be used to check how messages are sent at https://ethereal.email/messages
            }
        })
    }

    async sendMail(from: string, to: string, subject: string, content: string) {
        await this._transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: content
        }).then(() => {
            console.log('Message was sent')
        }).catch(e => {
            console.log('Something went wrong. Reason: ' + JSON.stringify(e))
        })
    }
}
