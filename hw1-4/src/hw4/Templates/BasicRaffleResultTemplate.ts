import AbstractRaffleResultTemplate from './AbstractRaffleResultTemplate'

export default class BasicRaffleResultTemplate extends AbstractRaffleResultTemplate {
    public getSubject(): string {
        return 'Lottery Result'
    }

    protected getHeader(): string {
        return '<img src="https://thebankrollers.com/wp-content/uploads/2016/04/Lottery.jpg">>'
    }

    protected getTitle(): string {
        return 'Lottery Result'
    }

    protected getFooter(): string {
        return 'Good luck!'
    }
}
