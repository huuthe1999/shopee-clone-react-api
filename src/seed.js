/* eslint-disable import/order */
import slugify from 'slugify'

import CategoryModel from '../src/models/category.model.js'
import ProductModel from '../src/models/product.model.js'
import ProvinceModel from '../src/models/province.model.js'

import { fakeData } from './fakeData.js'

const seedCate = Array(40)
  .fill(null)
  .map((item, index) => ({
    name: `Quần áo ${index + 1}`,
    isActive: index % 2 === 0,
    user: '6453edaf86876e4dd8d760f8'
  }))

const seedProduct = Array(80)
  .fill(null)
  .map((item, index) => ({
    name: `Quần áo ${index + 1}`,
    isActive: index % 2 === 0,
    price: (index + 1) * 1000,
    rating: +((index + 1) / 5).toFixed(2),
    quantity: index + 1,
    discount: Math.floor(Math.random() * 50),
    sold: Math.floor(Math.random() * index) + 1,
    viewed: Math.floor(Math.random() * 500) + 1
  }))

const randomCate = async () => {
  try {
    let data = await fetch('https://shopee.vn/api/v4/pages/get_homepage_category_list')
    data = await data.json()
    console.log('🚀 ~ randomCate ~ data:', data)
    data = data.data.category_list

    const categoryPromises = data.map(async item => {
      const slug = slugify(item.display_name, {
        strict: true,
        locale: 'vi'
      })

      return {
        ...item,
        name: item.display_name,
        user: '6453edaf86876e4dd8d760f8',
        slug
      }
    })

    const result = await CategoryModel.insertMany(await Promise.all(categoryPromises))

    console.log('🚀 ~ randomCate ~ result:', result)
  } catch (error) {
    console.log('🚀 ~ CategoryModel.insertMany ~ err:', error)
  }
}

const deleteAllCate = async () => {
  try {
    const result = await CategoryModel.deleteMany()

    console.log('🚀 ~ randomCate ~ result:', result)
  } catch (error) {
    console.log('🚀 ~ CategoryModel.insertMany ~ err:', error)
  }
}
const deleteAllProduct = async () => {
  try {
    const result = await ProductModel.deleteMany()

    console.log('🚀 ~ randomCate ~ result:', result)
  } catch (error) {
    console.log('🚀 ~ CategoryModel.insertMany ~ err:', error)
  }
}

const deleteAllProductBySubCate = async subCateId => {
  try {
    const result = await ProductModel.deleteMany({ subCategory: subCateId })

    console.log('🚀 ~ randomCate ~ result:', result)
  } catch (error) {
    console.log('🚀 ~ CategoryModel.insertMany ~ err:', error)
  }
}

const randomProduct = async (categorySlug, subCategory) => {
  try {
    const normalizeData = fakeData.map(async ({ item_basic }, index) => {
      const random = Math.floor(Math.random() * 63)
      let randomShippingIndex = []
      if (index % 3 === 0) {
        randomShippingIndex = [0, 1]
      } else {
        if (index % 5 === 0) {
          randomShippingIndex = [1, 2]
        } else if (index % 7 === 0) {
          randomShippingIndex = [0, 1, 2]
        } else {
          randomShippingIndex = [2]
        }
      }

      const randomShopTypeIndex = Math.floor(Math.random() * 3)
      const randomStatusIndex = Math.floor(Math.random() * 2)
      const province = await ProvinceModel.findOne().skip(random).exec()

      const slug = slugify(item_basic.name, {
        strict: true,
        locale: 'vi'
      })

      return {
        name: item_basic.name,
        images: item_basic.images.map((image, i) => ({
          uid: image,
          url: `https://cf.shopee.vn/file/${image}_tn`,
          name: item_basic.name + `-${i}`
        })),
        categorySlug,
        subCategory,
        province: { idProvince: province.idProvince, name: province.name },
        shipping: randomShippingIndex,
        shopType: randomShopTypeIndex,
        status: randomStatusIndex,
        isActive: index % 3 === 0,
        price: item_basic.price / 100000,
        quantity: item_basic.stock,
        sold: item_basic.sold,
        rating: item_basic.item_rating.rating_star,
        discount: item_basic.show_discount,
        viewed: item_basic.liked_count,
        slug
      }
    })

    // const categoryPromises = seedProduct.map(async item => {
    //   const random = Math.floor(Math.random() * 40)
    //   const category = await CategoryModel.findOne().skip(random).exec()
    //   const slug = slugify(item.name, {
    //     strict: true,
    //     locale: 'vi'
    //   })
    //   return {
    //     ...item,
    //     slug,
    //     category: category._id
    //   }
    // })

    const result = await ProductModel.insertMany(await Promise.all(normalizeData))

    // console.log('🚀 ~ randomCate ~ result:', result)
  } catch (error) {
    console.log('🚀 ~ CategoryModel.insertMany ~ err:', error)
  }
}

const generateProvinces = async () => {
  try {
    let result = await fetch('https://sheltered-anchorage-60344.herokuapp.com/province', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    result = await result.json()

    const data = await ProvinceModel.insertMany(result)
    console.log('🚀 ~ generateProvices ~ result:', data)
  } catch (error) {
    console.log('🚀 ~ generateProvices ~ error:', error)
  }
}

const removeRegexProvinces = async () => {
  try {
    const data = await ProvinceModel.updateMany(
      {
        name: { $regex: '^Tỉnh ' }
      },
      [
        {
          $set: {
            name: {
              $replaceOne: { input: '$name', find: 'Tỉnh ', replacement: '' }
            }
          }
        }
      ]
    )
    console.log('🚀 ~ generateProvices ~ result:', data)
  } catch (error) {
    console.log('🚀 ~ generateProvices ~ error:', error)
  }
}

export {
  randomCate,
  randomProduct,
  generateProvinces,
  removeRegexProvinces,
  deleteAllCate,
  deleteAllProduct,
  deleteAllProductBySubCate
}
