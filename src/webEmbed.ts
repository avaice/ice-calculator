import { calculate } from "./calculate/calculate"
import { parse } from "./parser/parser"

const parseAndCalc = (value: string) => {
  return calculate(parse(value))
}

;(window as any).parseAndCalc = parseAndCalc
