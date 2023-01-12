import { randomUUID } from 'crypto'

import add, { AnotherBook } from '@src/demo'

type Book = {
  title: string
  author: string
}

const book: Book = {
  title: 'Cool Book',
  author: 'John Doe',
}

const id = randomUUID()

const book2: AnotherBook = {
  title: 'Cool Book2',
  author: 'John Doe2',
}

console.log(book, book2, add(3, 4))

export {}
