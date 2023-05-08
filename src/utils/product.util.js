export const mapSortByParam = value => {
  switch (value) {
    case 'popular':
      return 'viewed'
    case 'newest':
      return 'createdAt'
    case 'sales':
      return 'sold'
    case 'price':
      return 'price'
    default:
      return 'viewed'
  }
}
