import { trim } from "../tools/tools"

// パース
export const parse = (v: string): string[] => {
  const value = trim(v)
  const parsed: string[] = []
  let buffer = ""
  for (let i = 0; i < value.length; i++) {
    // 数値でなければそのままPush（２桁以上の数値を結合するため）
    if (
      isNaN(Number(value[i])) &&
      value[i] !== "." &&
      !(
        value[i] === "-" &&
        i + 1 !== value.length &&
        !isNaN(Number(value[i + 1]))
      )
    ) {
      parsed.push(value[i])
    } else {
      buffer = buffer + value[i]
      // 現在のポインタは数値だけど次の文字が数値でなければPush
      if (
        i + 1 === value.length ||
        (isNaN(Number(value[i + 1])) && value[i + 1] !== ".")
      ) {
        parsed.push(buffer)
        buffer = ""
      }
    }
  }
  console.log(parsed)
  return parsed
}
