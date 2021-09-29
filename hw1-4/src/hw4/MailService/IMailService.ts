export default interface IMailService {
    sendMail(from: string, to: string, subject: string, content: string): void
}
