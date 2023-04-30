import NodeCache from 'node-cache'
const myCache = new NodeCache()

export default function (duration) {
  return function (req, res, next) {
    const key = req.originalUrl

    if (req.method !== 'GET') {
      // Clear cache on POST, PUT, DELETE of the same route
      if (myCache.has(key)) {
        myCache.del(key)
      }
      return next()
    }

    // Check if key exists on cache

    const cacheResponse = myCache.get(key)

    // If cache exists, send cache result
    if (cacheResponse) {
      res.json(JSON.parse(cacheResponse))
    } else {
      // Send response
      res.sendResponse = res.send
      res.send = body => {
        myCache.set(key, body, duration)
        res.sendResponse(body)
      }
      next()
    }
  }
}
