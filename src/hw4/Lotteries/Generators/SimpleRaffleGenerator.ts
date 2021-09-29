import IRaffleGenerator from './IRaffleGenerator'

export default class SimpleRaffleGenerator implements IRaffleGenerator {
    generate(min: number, max: number, numbersToGenerate: number): number[] {
        const set = new Set<number>()
        while (set.size < numbersToGenerate) {
            set.add(this.generateNuber(min, max))
        }
        return Array.from(set)
    }

    private generateNuber(min: number, max: number) {
        // (max + 1) is needed to include max number to possible options
        return Math.floor(Math.random() * ((max + 1) - min) + min)
    }
}
