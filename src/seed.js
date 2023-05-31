/* eslint-disable import/order */
import slugify from 'slugify'

import CategoryModel from '../src/models/category.model.js'
import ProductModel from '../src/models/product.model.js'
import ProvinceModel from '../src/models/province.model.js'

import { fakeData } from './fakeData.js'
import { splitNumberOnString } from './utils/splitNumberOnString.util.js'

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

const test = async (shopid, itemid) => {
  var myHeaders = new Headers()
  myHeaders.append('sec-ch-ua', '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"')
  myHeaders.append('sec-ch-ua-mobile', '?0')
  myHeaders.append('sec-ch-ua-platform', '"Windows"')
  myHeaders.append('Upgrade-Insecure-Requests', '1')
  myHeaders.append(
    'User-Agent',
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
  )
  myHeaders.append(
    'Accept',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
  )
  myHeaders.append('Sec-Fetch-Site', 'none')
  myHeaders.append('Sec-Fetch-Mode', 'navigate')
  myHeaders.append('Sec-Fetch-User', '?1')
  myHeaders.append('Sec-Fetch-Dest', 'document')
  myHeaders.append('host', 'shopee.vn')
  myHeaders.append(
    'Cookie',
    'REC_T_ID=7a0d3fa7-fdd2-11ed-a537-ceb7aabb1607; SPC_F=SGTphtB11POYjoliB15lcuyiZbo3BbxS; SPC_R_T_ID=kLJvQ7Eb7+EI/wvS//jyiN5+Sh8Yr/Idg175H9hEWzg6Qxr5ByKNC9mVBnZpmvBdOcny5lK7EzkwkV7cUklc3meKhGdQN2i6zCP7T5nMCNYQc62RIQpsp7c0fkd0hfvvdWicZdyv9tH9tqc+Ne/9nAoV8to9cd+U9Ia7j0Y0Wiw=; SPC_R_T_IV=MVNOUThKY2ZtbnBHUW9jaw==; SPC_SI=aWFsZAAAAAA3YzY3M2o0RiFtbQAAAAAANmJRUEVQU3U=; SPC_T_ID=kLJvQ7Eb7+EI/wvS//jyiN5+Sh8Yr/Idg175H9hEWzg6Qxr5ByKNC9mVBnZpmvBdOcny5lK7EzkwkV7cUklc3meKhGdQN2i6zCP7T5nMCNYQc62RIQpsp7c0fkd0hfvvdWicZdyv9tH9tqc+Ne/9nAoV8to9cd+U9Ia7j0Y0Wiw=; SPC_T_IV=MVNOUThKY2ZtbnBHUW9jaw=='
  )

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }

  return fetch(
    `https://shopee.vn/api/v4/item/get?shopid=${shopid}&itemid=${itemid}`,
    requestOptions
  )
    .then(response => response.json())
    .then(result => {
      return result.data.description
    })
    .catch(error => console.log('error', error))
}

const randomProduct = async (categorySlug, subCategory) => {
  try {
    const normalizeData = fakeData.map(async ({ item_basic, shopid, itemid }, index) => {
      const random = Math.floor(Math.random() * 63)
      let randomShippingIndex = []
      if (index % 7 === 0) {
        randomShippingIndex.push(0)
        if (index % 2 === 0) {
          randomShippingIndex.push(2)
        }
      }
      if (index % 8 === 0) {
        randomShippingIndex.push(1)
        if (index % 3 === 0) {
          randomShippingIndex.push(1)
        }
      }
      if (index % 9 === 0) {
        randomShippingIndex.push(2)
        if (index % 4 === 0) {
          randomShippingIndex.push(0)
        }
      }

      if (randomShippingIndex.length === 0) {
        randomShippingIndex.push(0)
      }

      const randomShopTypeIndex = Math.floor(Math.random() * 3)
      const randomStatusIndex = Math.floor(Math.random() * 2)
      const province = await ProvinceModel.findOne().skip(random).exec()

      const slug = slugify(item_basic.name, {
        strict: true,
        locale: 'vi'
      })
      let vouchers
      const voucher_info = item_basic.voucher_info
      if (voucher_info) {
        vouchers = splitNumberOnString(voucher_info.label)
        vouchers = vouchers?.map(voucher => {
          const number = voucher.replace(/\D/g, '')
          if (/k/i.test(voucher)) {
            return {
              type: 1,
              discount: {
                price: number * 1000
              }
            }
          }
          return {
            type: 0,
            discount: {
              percent: number
            }
          }
        })
      }

      const description = await test(shopid, itemid)
      return {
        name: item_basic.name,
        image: `https://cf.shopee.vn/file/${item_basic.images[0]}_tn`,
        images: item_basic.images.map((image, i) => ({
          uid: image,
          url: `https://cf.shopee.vn/file/${image}_tn`,
          name: item_basic.name + `-${i}`
        })),
        description,
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
        vouchers,
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

    await ProductModel.insertMany(await Promise.all(normalizeData))

    console.log('🚀 ~ randomCate ~ result:')
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
  deleteAllProductBySubCate,
  test
}
