import AbstractLottery from './Lotteries/AbstractLottery'
import SuperLotto from './Lotteries/SuperLotto'
import LotteryResultSender from './LotteryResultSender'
import FakeMailService from './MailService/FakeMailService'

export default class LotteryService {
    private readonly _superLotto: AbstractLottery
    private readonly _mailingService: LotteryResultSender

    constructor() {
        this._superLotto = new SuperLotto()
        this._mailingService = new LotteryResultSender(new FakeMailService(), this._superLotto)
    }

    public startRaffle() {
        this._superLotto.startRaffle()
        this._mailingService.sendJackpotWinnerLetter('noreply@superlotto.com', 'anton.vodopolov@gmail.com')
    }
}
