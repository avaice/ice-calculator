// 式の整形（スペースを消すなど）
export const trim = (value: string): string => {
  // 全件一致させるために正規表現を使う
  return value.replace(/ /g, "")
}

// isNaN判定
export const checkIsNaN = (
  expression: { left: string; right: string },
  value: number
) => {
  if (isNaN(value)) {
    throw new Error(
      `左辺または右辺が数値ではない\n${expression.left} * ${expression.right}`
    )
  }
}
