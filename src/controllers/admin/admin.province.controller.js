import ProvinceModel from '../../models/province.model.js'
import { createFailedResponse } from '../../utils/format-response.util.js'

const getProvinces = async (req, res, next) => {
  try {
    let result = await ProvinceModel.find().exec()

    // Sort in alphabet
    result = result.sort((a, b) => a.name.localeCompare(b.name))

    res.set('x-total-count', result.length)
    res.set('Access-Control-Expose-Headers', 'x-total-count')

    return res.send(result)
  } catch (error) {
    next(error)
  }
}

const getProvince = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của tỉnh thành'))
  }

  try {
    const result = await ProvinceModel.findById(id)

    return res.send(result)
  } catch (error) {
    next(error)
  }
}

const provinceMiddleware = { getProvinces, getProvince }

export default provinceMiddleware
