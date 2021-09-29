import IRaffleGenerator from './Generators/IRaffleGenerator'
import SimpleRaffleGenerator from './Generators/SimpleRaffleGenerator'

export default abstract class AbstractLottery {
    private _minNumber: number
    private _maxNumber: number
    private _totalNumbersCount: number
    private _generator: IRaffleGenerator
    private _lastWinningCombination: number[] = []

    get lastWinningCombination(): number[] {
        return this._lastWinningCombination
    }

    constructor(minNumber: number, maxNumber: number, totalNumbers: number) {
        this._minNumber = minNumber
        this._maxNumber = maxNumber
        this._totalNumbersCount = totalNumbers
        this._generator = new SimpleRaffleGenerator()
    }

    startRaffle(): number[] {
        this._lastWinningCombination = this._generator.generate(this._minNumber, this._maxNumber, this._totalNumbersCount)
        return this._lastWinningCombination
    }
}
