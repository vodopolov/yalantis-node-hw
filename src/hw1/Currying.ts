export default function add(a: number): Function {
  return function (b: number): Function | number {
    return b == null ? a : add(a + b)
  }
}