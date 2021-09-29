import sgMail from '@sendgrid/mail'
import { env } from 'process'
import IMailService from './IMailService'

export default class SendGridMailService implements IMailService {
    constructor() {
        if (env.SMTP_API) {
            sgMail.setApiKey(env.SMTP_API)
        } else {
            throw new Error('[SendGridMailService] No SMTP API key')
        }
    }

    async sendMail(from: string, to: string, subject: string, content: string) {
        await sgMail.send({
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
