export type AnotherBook = {
  title: string
  author: string
}

const book: AnotherBook = {
  title: 'Cool Book',
  author: 'John Doe',
}

const add = (a: number, b: number) => a + b

console.log(book)

export default add
