export default interface IRaffleGenerator {
    generate(min: number, max: number, numbersToGenerate: number): number[]
}
