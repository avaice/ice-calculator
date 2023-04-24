import { calculate } from "./calculate/calculate"
import { parse } from "./parser/parser"

const testValues = [
  { title: "加減の演算", expression: "1+2-3", answer: 0 },
  { title: "乗除の演算", expression: "2/1+2*3", answer: 8 },
  { title: "括弧の演算", expression: "(6+2)*3", answer: 24 },
  { title: "小数の演算", expression: "1+2*3.5", answer: 8 },
  { title: "２桁の数の演算", expression: "16+24", answer: 40 },
  { title: "負の数の演算", expression: "-8*2", answer: -16 },
]

testValues.forEach((v) => {
  test(v.title, () => {
    const ans = calculate(parse(v.expression))
    expect(ans).toBe(v.answer)
  })
})
