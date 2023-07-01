import mongoose from 'mongoose'

import CategoryModel from '../../models/category.model.js'
import { mapSortCategoryParam } from '../../utils/category.util.js'
import { createFailedResponse, createSuccessResponse } from '../../utils/format-response.util.js'

const createCategory = async (req, res, next) => {
  let { name, subCategories } = req.body

  if (!name) {
    return res.status(422).json(
      createFailedResponse('Vui lòng kiêm tra thông tin', {
        name: 'Tên danh mục không được rỗng'
      })
    )
  }

  if (subCategories) {
    subCategories = subCategories?.map(subCategory => {
      const _id = new mongoose.Types.ObjectId()
      return {
        _id,
        name: subCategory?.name
      }
    })
  }

  try {
    const result = await CategoryModel.create({
      name,
      ...req.body,
      subCategories,
      user: req.userId
    })

    return res.status(201).json(createSuccessResponse('Tạo category thành công', result))
  } catch (error) {
    console.log('🚀 ~ createCategory ~ error:', error)

    next(error)
  }
}

const updateCategory = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(422).json(
      createFailedResponse('Vui lòng kiêm tra thông tin', {
        name: 'ID danh mục không được rỗng'
      })
    )
  }

  let { subCategories } = req.body

  // if (images) {
  //   images = images.map(image => ({
  //     url:
  //       image?.response?.url ||
  //       'https://res.cloudinary.com/dknvhah81/image/upload/v1683274837/shoppe-default/woocommerce-placeholder_yuatle.png',
  //     uid: image.uid,
  //     name: image?.name
  //   }))
  // }

  if (subCategories) {
    subCategories = subCategories?.map(subCategory => {
      const _id = new mongoose.Types.ObjectId()
      return {
        _id,
        name: subCategory?.name
      }
    })
  }

  try {
    const result = await CategoryModel.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
        subCategories
      },
      {
        new: true
      }
    )

    return res.send(result)
  } catch (error) {
    console.log('🚀 ~ createCategory ~ error:', error)

    next(error)
  }
}

const getOneCategory = async (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(createFailedResponse('Vui lòng truyền id của danh mục'))
  }

  try {
    const result = await CategoryModel.findById(id).lean().exec()
    return res.status(201).send(result)
  } catch (error) {
    console.log('🚀 ~ createCategory ~ error:', error)

    next(error)
  }
}

const getCategories = async (req, res, next) => {
  const { _start = 0, _end = 10, _order, _sort } = req.query

  try {
    const result = await CategoryModel.paginate(
      {},
      {
        select: '-slug -user',
        sort: mapSortCategoryParam(_order, _sort),
        offset: Number(_start),
        limit: Number(_end) - Number(_start)
      }
    )

    res.set('x-total-count', result.totalItems)
    res.set('Access-Control-Expose-Headers', 'x-total-count')

    return res.status(201).send(result.items)
  } catch (error) {
    next(error)
  }
}

const adminCategoryMiddleware = { createCategory, getOneCategory, getCategories, updateCategory }

export default adminCategoryMiddleware
