export default abstract class AbstractRaffleResultTemplate {
    protected _raffle: number[]

    constructor(raffle: number[]) {
        this._raffle = raffle
    }

    public getContent(): string {
        return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>${this.getHeader()}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <body style="margin: 0; padding: 0;">
        <table align="center" border="1" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td>
        ${this.getHeader()}
        </td>
        </tr>
        <tr>
        <td>
        <br>
        Winning numbers are: ${this.getFormattedNumbers()}
        <br>
        <br>
        </td>
        </tr>
        <tr>
        <td>
        ${this.getFooter()}
        </td>
        </tr>
        </table>
        </body>
        </head>
        </html>`
    }

    public abstract getSubject(): string
    protected abstract getTitle(): string
    protected abstract getHeader(): string
    protected abstract getFooter(): string

    private getFormattedNumbers(): string {
        this._raffle.sort((a, b) => {
            return a - b
        })
        let result = ''
        this._raffle.forEach(num => {
            result = result + num + ', '
        })
        return result
    }
}
