const SIZE = 8
const PAGE = 1

export const getPagination = (cPage, size) => {
  const limit = isNaN(size) || Number(size) < 1 ? SIZE : Number(size)
  const page = isNaN(cPage) || Number(cPage) < 1 ? PAGE : Number(cPage)
  const offset = (page - 1) * limit

  // const limit = isNaN(size) || Number(size) < PAGE ? SIZE : Number(size)
  // const page = isNaN(cPage) || Number(cPage) < PAGE ? PAGE : Number(cPage)
  // const offset = page * limit

  return { limit, offset, page }
}

export const customLabels = {
  totalDocs: 'totalItems',
  docs: 'items',
  limit: 'perPage',
  page: 'currentPage'
}
