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

export const mapFilterByQuery = value => {
  switch (value) {
    case 'facet':
      return 'subCategory'
    case 'locations':
      return 'province._id'
    case 'filters':
      return 'shopType'
    case 'status':
      return 'status'
    case 'shippingOptions':
      return 'shipping'
    case 'ratingFilter':
      return 'rating'
    default:
      return 'viewed'
  }
}
