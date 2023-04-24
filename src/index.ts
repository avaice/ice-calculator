import { calculate } from "./calculate/calculate"
import { parse } from "./parser/parser"

const exp = process.argv[2]
if (!exp) {
  console.error("式を指定してください")
} else {
  const parsedexpression = parse(exp)
  const calculated = calculate(parsedexpression)
  console.log(calculated)
}
