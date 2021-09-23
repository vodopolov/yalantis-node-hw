import AbstractLottery from './Lotteries/AbstractLottery'
import IMailService from './MailService/IMailService'
import AbstractRaffleResultTemplate from './Templates/AbstractRaffleResultTemplate'
import BasicRaffleResultTemplate from './Templates/BasicRaffleResultTemplate'
import JackpotWinnerRaffleResultTemplate from './Templates/JackpotWinnerRaffleResultTemplate'

export default class LotteryResultSender {
    private readonly _mailService: IMailService
    private readonly _lottery: AbstractLottery

    constructor(mailService: IMailService, lottery: AbstractLottery) {
        this._mailService = mailService
        this._lottery = lottery
    }

    sendRegularLetter(from: string, to: string) {
        const template: AbstractRaffleResultTemplate = new BasicRaffleResultTemplate(this._lottery.lastWinningCombination)
        this._mailService.sendMail(from, to, template.getSubject(), template.getContent())
    }

    sendJackpotWinnerLetter(from: string, to: string) {
        const template: AbstractRaffleResultTemplate = new JackpotWinnerRaffleResultTemplate(this._lottery.lastWinningCombination)
        this._mailService.sendMail(from, to, template.getSubject(), template.getContent())
    }
}
