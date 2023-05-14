export const mapSortCategoryParam = (order, sort) => {
  if (order && sort) {
    const orderParam = order.split(',')
    const sortParam = sort.split(',')
    return sortParam.map((sort, index) => {
      return [sort, orderParam[index]]
    })
  }
  return { createdAt: -1 }
}
