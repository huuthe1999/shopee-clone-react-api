import slugify from 'slugify'

import CategoryModel from '../src/models/category.model.js'
import ProductModel from '../src/models/product.model.js'
import ProvinceModel from '../src/models/province.model.js'

const seedCate = Array(40)
  .fill(null)
  .map((item, index) => ({
    name: `Quần áo ${index + 1}`,
    active: index % 2 === 0,
    user: '6453edaf86876e4dd8d760f8'
  }))

const seedProduct = Array(80)
  .fill(null)
  .map((item, index) => ({
    name: `Quần áo ${index + 1}`,
    active: index % 2 === 0,
    price: (index + 1) * 1000,
    rating: +((index + 1) / 5).toFixed(2),
    quantity: index + 1,
    discount: Math.floor(Math.random() * 50),
    sold: Math.floor(Math.random() * index) + 1,
    viewed: Math.floor(Math.random() * 500) + 1
  }))

const randomCate = async () => {
  try {
    const result = await CategoryModel.insertMany(seedCate)

    console.log('🚀 ~ randomCate ~ result:', result)
  } catch (error) {
    console.log('🚀 ~ CategoryModel.insertMany ~ err:', error)
  }
}

// const randomCate = async () => {
//   try {
//     const result = await CategoryModel.deleteMany()

//     console.log('🚀 ~ randomCate ~ result:', result)
//   } catch (error) {
//     console.log('🚀 ~ CategoryModel.insertMany ~ err:', error)
//   }
// }

const randomProduct = async () => {
  try {
    const categoryPromises = seedProduct.map(async item => {
      const random = Math.floor(Math.random() * 40)
      const category = await CategoryModel.findOne().skip(random).exec()
      const slug = slugify(item.name, {
        strict: true,
        locale: 'vi'
      })
      return {
        ...item,
        slug,
        category: category._id
      }
    })

    const result = await ProductModel.insertMany(await Promise.all(categoryPromises))

    // const result = await ProductModel.deleteMany()
    console.log('🚀 ~ randomCate ~ result:', result)
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

export { randomCate, randomProduct, generateProvinces, removeRegexProvinces }
