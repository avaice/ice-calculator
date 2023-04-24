import { checkIsNaN } from "../tools/tools"

// 計算
export const calculate = (v: string[]): number => {
  const expression = parenthesis(v)
  // この順番で計算する
  ;["*", "/", "+", "-"].forEach((ope) => {
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === ope) {
        const chunkAns = ((): number => {
          switch (ope) {
            case "+":
              return Number(expression[i - 1]) + Number(expression[i + 1])
            case "-":
              return Number(expression[i - 1]) - Number(expression[i + 1])
            case "*":
              return Number(expression[i - 1]) * Number(expression[i + 1])
            case "/":
              return Number(expression[i - 1]) / Number(expression[i + 1])
            default:
              throw new Error(
                "calculateメソッドのforEachで演算子ではない値が指定された（プログラムのエラー）"
              )
          }
        })()
        checkIsNaN(
          { left: expression[i - 1], right: expression[i + 1] },
          chunkAns
        )
        expression.splice(i - 1, 3)
        expression.splice(i - 1, 0, chunkAns.toString())
      }
    }
  })
  if (expression.length !== 1) {
    throw new Error(
      `計算しきれない式が指定された\n渡された式: ${v}\n計算結果: ${expression}`
    )
  }
  const answer = Number(expression[0])
  if (isNaN(answer)) {
    throw new Error(
      `計算結果がNumber型でなかった\n渡された式: ${v}\n計算結果: ${expression}`
    )
  }
  return answer
}

// かっこの演算
export const parenthesis = (v: string[]): string[] => {
  const expression = [...v]
  let startPointer: number | null = null
  let endPointer: number | null = null
  let nestedCount: number | null = null
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "(") {
      if (!nestedCount) {
        nestedCount = 1
        startPointer = i
      } else {
        nestedCount++
      }
    } else if (expression[i] === ")") {
      if (expression[i - 1] === "(") {
        throw new Error("中身のない括弧がある\n" + expression)
      }
      if (nestedCount === null) {
        throw new Error("始め括弧がないのに締め括弧がある\n" + expression)
      }
      nestedCount--
      if (nestedCount === 0) {
        endPointer = i
        if (startPointer === null) {
          throw new Error(
            "始め括弧がないのに締め括弧がある(startPointer未定義。プログラムのエラー)\n" +
              expression
          )
        }
        const nestedExpression = expression.splice(
          startPointer + 1,
          endPointer - startPointer - 1
        )
        expression.splice(startPointer, 2) // 括弧の削除
        expression.splice(
          startPointer,
          0,
          calculate(nestedExpression).toString()
        )
      }
    }
  }
  return expression
}
