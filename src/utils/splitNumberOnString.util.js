export const splitNumberOnString = str => {
  const regex = /\d+(k|%)/gi
  return Array.from(str.matchAll(regex), match => match[0])
}
