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

export const extractSearchParam = searchParams => {
  console.log('🚀 ~ extractSearchParam ~ searchParams:', searchParams)

  const likeParams = {}
  // searchParams.forEach((param)=>)
  return searchParams
}
