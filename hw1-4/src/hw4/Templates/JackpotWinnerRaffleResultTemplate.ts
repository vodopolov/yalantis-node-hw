import AbstractRaffleResultTemplate from './AbstractRaffleResultTemplate'

export default class JackpotWinnerRaffleResultTemplate extends AbstractRaffleResultTemplate {
    public getSubject(): string {
        return 'You\'re Winner!'
    }

    protected getHeader(): string {
        return '<img src="https://img.freepik.com/free-vector/jackpot-banner-casino-label-with-crown-and-red-award-ribbon-casino-jackpot-winner-awards-with-golden-text-and-ribbon-objects-on-separate-layers_172107-724.jpg?size=626&ext=jpg">>'
    }

    protected getTitle(): string {
        return 'You\'re Winner!'
    }

    protected getFooter(): string {
        return '<img src="http://i.imgur.com/IT69cd3.jpg" width="626" height="416">'
    }
}
