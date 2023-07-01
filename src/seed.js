/* eslint-disable import/order */
import slugify from 'slugify'

import CategoryModel from '../src/models/category.model.js'
import ProductModel from '../src/models/product.model.js'
import ProvinceModel from '../src/models/province.model.js'

import DistrictModel from './models/district.model.js'
import WardModel from './models/ward.model.js'
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

const test1 = id => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://shopee.vn/api/v4/location/get_child_division_list?division_id=${id}&use_case=marketplace.checkout`,
      {
        headers: {
          accept: 'application/json',
          'accept-language': 'vi-VN,vi;q=0.9',
          'af-ac-enc-sz-token':
            'cW8LdWcEyluYjBdRVTxqaw==|Niy5S9LHBIXGjJzX+tT2lp70ms36DtuPLc8KaAoOPJcNW5jaKhwt/dqsWOIaBNCZONpzzyrOTDBsyvgBN/5G8tZO/T8ttOJj6NQ=|U9j1Jt04VxKbUJ0a|06|3',
          'content-type': 'application/json',
          'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-api-source': 'pc',
          'x-csrftoken': 'qtOM55k6mTOL70IipZSD7wDZJPkKvJlT',
          'x-requested-with': 'XMLHttpRequest',
          'x-shopee-language': 'vi',
          cookie:
            '__LOCALE__null=VN; _gcl_au=1.1.1321304207.1685714624; csrftoken=qtOM55k6mTOL70IipZSD7wDZJPkKvJlT; SPC_SI=gsN1ZAAAAAAwRVFmemZ4VbnKRQAAAAAAT1ozTE9CaXk=; SPC_F=sHFfUfIodoh1kdVrYF5o6llXdK0thy6k; REC_T_ID=49806efa-014e-11ee-b677-2a64b4371b1e; _fbp=fb.1.1685714625375.350735208; _gid=GA1.2.1455456712.1685714629; SPC_ST=.R0lORUxWeWNKcHQxU011eTUhC4c4tr9D+zOYOdsWbuK4BQQ4SsWVE8A0TctzLSelCHmtKcKPKQsp30Xp24CZHoYOcb50BLEIh3/OUagG+DyAYXrMXwpqvNfCEgK+ON4mhKfFkSx14Tglg7KEVMPAsWL6sVvz7FB7HBQvttpbj5VE/uaJtzp5egHfyvw0awc0xTaRQMU/CNUKlH3nuM1Sbg==; SPC_CLIENTID=c0hGZlVmSW9kb2gxxzaexiufzbxhkawv; SPC_U=975168868; SPC_IA=1; SPC_R_T_ID=MvedizfHX38mDqtIpKFblFDw5CR8q0Hvl6CE8Sro4cDikVQWr1sOgzQSg5xL3CqXxcsvczxIaRy5jRJ1agX//Y4s9FmWBgNRyu/hAWkW1DxkPXaAmYjY7t2qfLOnbjb6XFMXQAfAGPNoA97eMcZ8OkfVTswjGUJpbbDHWAKZ12w=; SPC_R_T_IV=WThMclgzazBDUWZFSWdCOQ==; SPC_T_ID=MvedizfHX38mDqtIpKFblFDw5CR8q0Hvl6CE8Sro4cDikVQWr1sOgzQSg5xL3CqXxcsvczxIaRy5jRJ1agX//Y4s9FmWBgNRyu/hAWkW1DxkPXaAmYjY7t2qfLOnbjb6XFMXQAfAGPNoA97eMcZ8OkfVTswjGUJpbbDHWAKZ12w=; SPC_T_IV=WThMclgzazBDUWZFSWdCOQ==; _hjSessionUser_868286=eyJpZCI6IjcxMWFlMjE2LTExNDgtNWViYy1hNDg5LTViNjc0NDhlNzZlMCIsImNyZWF0ZWQiOjE2ODU3MTQ2Mjg4MDMsImV4aXN0aW5nIjp0cnVlfQ==; _QPWSDCXHZQA=c4722e62-1e9b-41f4-fdc8-44da72e7e0e6; HAS_BEEN_REDIRECTED=true; _ga=GA1.2.1012493580.1685714629; _ga_M32T05RVZT=GS1.1.1685849769.7.0.1685849769.60.0.0; SPC_EC=ZVpMMWNLZUo0Y0RqTWltZeTwLb7y45Vq5DhzB/f4MAt9DtMoL2DiIj+VTn9euw8y9h/t4gMhKAvFk7Loefku0TEQyUUkCKo4iyuFpVPyDmA0oyKul8rY97MGTwABWng3RtDeoQ0DLc51t9OU2cYckbTyNfdAxRf5NAabH11AR5U=',
          Referer:
            'https://shopee.vn/checkout/?state=H8KLCAAAAAAAAAN1VsK9wo4bNxB%2BwpXDhRbCqcKUw7NKd8O6BcKMAHnChnTCgUFQw6RIw4scwpdcw7NHwpFgwqhKw6EycB3CpDAMFwESw4DCqQLCnMKKFBfDuD3DtCYZwpLDi8OVw6p8Fg7CusOlw4zDrMO8fMOzw41Qb0rDgjbCrlzDvTjCn04Ww5XDncOtwqtRw6lEA8OWw5HCpi1Xw6PDmWLCusKoFsKzw7HDrcKowrTCtW7CtcOhYCxawr%2FCicOHcsKVw74LXsKuFsOLw4nCuMKawo8nw4dRKRw0w4koPAXDpXjCusKcL8KWw5V8NsKewo%2FDikZzwpBROsKew43Cq8OxZFYtw6%2FCqlHDucOaU8OlwoQ7wqB8VFLDjsKJVsKEA8KVJMKYwqJeWMOSScKtX8KTw6DCuVxtwqjCtMKQAsKSwq3DkcK%2Bwo3DhsOKS8KJQmXCvcKhwopBwpdKPsKSw5Zow67CmcKLwqbDpXg2wq0WwovDicO8blHDnS7Cl8OLUEU5KhVtAMKVw5%2FCnx8%2Bw6jCohbDp8OTL03DsUN9PsO9LgrCh07CtmjDgsOBMiNaJ8K0w6otd8Onw5PDm8OCw6LCoyrDmsO6w7zDsEdTw7zDt8Ouw7PCp8Ozw6kDK8OWQ1fDt8Oow6pXdBXCjm9dwoHCpsOvRcOBNcK%2BesO6wrtgw6fDk8K7YMO%2Bw5EVasKLIUfChRPDp8KHf8ObYsO%2Fw7jDgELCiMOfRMOBw6rCqMKXw6hGbcKLWsKfH8O%2BYUXDvcO5U1EnwokzGsK%2FX8O7w4fDt8O4w7jDuMKnwqrCg8Orwr8Kfj59VMObG8OMPmPDgMOBUSFJS8K3QMK8wpFYScOtXGtXL17DtHjDncKEDgPDnMOsw5QLYMO4w7dtw4vDm8Kbw5o1w7LCu8KNw5HDjcOLwqYlwqwGdsKvwr3Du8OmwoLDrMOLw6dxbQ3DssOBY8OjJsOIwobDsMOpRWQNG23CgHBhwpnDtsOKDU0uwq3Cu8OiwogFCcOMAcOvaHBEw6rCssKaKgXCksOAwp5Jb8OFDsKIUBsdacKqwr1BBx3Cl8Kcwr7Ch8OQwrYSw5lqfcKLwrx2wpZsDAAxw6DCvFF2w6DDk8OWwqJtwoXDmsOGd8OHUcOSBUbDmA4NKEdyWE4dDcOBdjgkwpEXwpjDpRPCm8OgZMK6woxlw6lIwp4uw4MSw5FxwrB3OcOhw6MxNsKpw5HDkSY7w7YWCMOTwqLDj29Uw4bCpMO7FHfDmmMzTF%2FDtVfCtAnChMOnwpUMwqczwqXCg8KtwqBrwollGsKgNlTCk8Omah3DqsK4woRow6w2wplLwqBGwpEmNMKxwpNhCQZee2HDkMOHGnrClAQPE8O5asKgwrRtwpPCtVEVasKXw5QhIcKawpxXw7dKw6DDohNRZB8ZKgjDosKdJ8K%2FwoPCiXrCpwltW3nCuMKyw4xtRjDDrMKOwqTCvsOmwp50w645w6wEwrvDsCgfecKHUTpuEEEwwq0RwoHCuMKxwpU4f8OcK8KywpbClMOdwq%2FDtT5Jw5fDvsKAw5llRgw6wp0UOcOGw73CgXXDjwnDsTxfBBocw5YOWUbCjSPDrsOQQsOsJcKTIsK6w6TDgxPDrAZhw4LDvnwKagR9w5tPUMOcwrEBwohrMQZzdMOfw7vCicOPPA9PwqbDj8OwZjgoVsKuwpzDscKQC8ODwr1tw4DDmsKew4bDnTl4wpnDoCjDnMOeTsOuJsKjLMK9FBUidcOCHC5Pwp7DlFthwp1gV2NVVcOjwqfDozrCuMK2wrAADsO7eBtUV0NsYAMmw5AwXEs4wroHEm5AYsKldsKDw6sEw43DusKFf8OBwrTDgcOFacKTSSDCkcKXGyHDpcKwwrtXwrLCjcKkOBjCs8K7a8OLwrTCmhJDGsKqw5Ajwo4Lw7J0fcKhbypgw7hSAglRw7vCmRrCqHVYDBnCv8OLfRkWNMORYRvDoQTDp27Chg3ClsO8w7kWG8OSU8O7OCAaMhlZwp3Dm8OVwoAJMMOjPsKAcMO3OsOtKMKycMK6wphWVcK3wqF7w5DCs8O6w4t1PsKeL8K%2BNMOPw6rCgcObw6fCvF3Cvx1owoEzFHZTTxNsbMOTw53DhcKhdMK9IcK0SXHDgzh4w6sQwohgdxUnw67Dl8Kww6%2FDomYQw5DDt8KaIRsEwq5sagI9wrolwpzClcOpOkxrGFcjB2gub8KmHyHDiMO6QcOlVRgDw4Ulw4TCnzN2wqDDicOMCmBTw74TwqYZesObL8OaODtuwq%2FDiAbCoHMTJBZMWjrCncO0cj1eVXcRP8Opw4XDl8OMwp7Dl8Ovw6gTQcOqb8OfwoDDucOswrbDq8OMw7HDuD%2FCj8OMVcO1TQoAAA%3D%3D',
          'Referrer-Policy': 'strict-origin-when-cross-origin'
        },
        body: null,
        method: 'GET'
      }
    )
      .then(response => response.json())
      .then(result => {
        return resolve(result.data.divisions)
      })
      .catch(error => reject(error))
  })
}

const getProductsFromShoppe = async (categoryids, match_id) => {
  var myHeaders = new Headers()
  myHeaders.append('sec-ch-ua', '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"')
  myHeaders.append(
    'X-Sap-Access-F',
    '3.2.112.2.0|13|2.9.1-2_5.55.160_0_175|d6a1a92127184ace904e512d0624ab123c03cb47199d44|10900|100'
  )
  myHeaders.append('x-sz-sdk-version', '2.9.1-2@1.2.2')
  myHeaders.append('X-Shopee-Language', 'vi')
  myHeaders.append('X-Requested-With', 'XMLHttpRequest')
  myHeaders.append('X-Sap-Access-T', '1688193445')
  myHeaders.append(
    'af-ac-enc-dat',
    'AAcyLjkuMS0yAAABiQ0uvVUAABByAzAAAAAAAAAAAi465Fe5B2VDPZWXhHnYJVwT9uqAJbAicaPiv8tAN/N1LA2d3MBxLUyf/fWlPGfNa8IyFDDskAlYpKqzlJm+Jf5eioRQl/82EyfDx/bVRcPaaRvYm2MuDZ3xsUw78yzCJgifnmgrD4pvPs51B/rL/UHeJxZakEkzXzlUminZqx7uiyz8f88ax6hK5e5Sb5vbZB6U6/JJ3/Z8rdulugBRFRgWlhno08gAI0JsdW1UqBzoDWWOnZ8JXsnvSVLqPgqy5L4AcyDB/xy2ZlnLL3E1QsSPNPE/A8eyuFPBqO4BAk3FoXPViQP6A8/XipHMIl2f3l/T4hEzdx5dQ81KcfADLzUc6Sk4ypkyW19I8PgFsN+quEWzMxTFA6m2NVJ4wTXnWCWK1bSpJuZz8WAYHawjTp1YO8miicRH2NWpoVVtEedxyq1ZSrmEOQ58+4P3m0t4uWKWwYWX4/OzOXa+YTkZ+COrT0x66E0mFKGZpnE1uUxY4WLjky7yEWcmdZS5LsYDM3Ax8l9FO2PjI/cKzAZP268uvFOGXKo8sCf4Rf8zqP+fZJAzmBDvya3HU5y3CJmISiO6QmgCeKfFE01roJy9CL8HYkCXXKo8sCf4Rf8zqP+fZJAzmBifqFuAxsGc4gQnrcFfv3w3HX9t48LZHNoFHZYErxw1UQJfq3K1AG1EpKO616ktiwbY7P9KHML6aQtF4FlKd6zQgYWkGn8kVBBpG9xNtG95UlwxswzDtyg/Oz5LRY1VugbY7P9KHML6aQtF4FlKd6zLNRI8tQ7SmFFxsHsJtae8l/82EyfDx/bVRcPaaRvYm3501utISPh8Cuboh9w3Xof2sIwPt4Wt5OfZfPkx9RfhLoOdY0OLTxT+VOqfsrbWerGsBO0WPhLEvFPxIncKp3svWMIgJ6OM8uWan2rfy/9D/760ZL0L/JryHncqHBwMjv439vzknrcdleW6J26R8Slb9HH05W5ON4m2XH+qRPOgMshsdrhNk1+BJI24ftEb2kNjbVkUQ3c0ZplE3WR4+lTRHJJ2HKErNOh5euwKv/tW29epMeIAg6F91FIObWlA4SZkDaCkQ4I1LDzDNBDGMPA='
  )
  myHeaders.append('X-Sap-Access-S', 'p4xiAXi2T5Fc_S8ZNG-tYBqjQIC2bS8CmNZ-NrPmc70=')
  myHeaders.append(
    'edffa8dc',
    "5j!!]c%ltEiJA/Zr/FOsTgTG!d;]tLd^7!+;j5^_Hbrt,nV5PJqOK^/UK*fG*%b0;F4DFsOJ0SBbf=i\\'9!sb@UWD?g%-*pko#Vni-Yah70UZS'g`s!/ne,OK(c3qdX+N'.[hXD$9D`.L5KO5\\5)&2+<IsBTP.,5fpjVLR#[p]/uBub*2kEnU=.Akag&dEnCmS5Z%l=5ZQopmf2gFGFmH&\\9[<QfEM;VN=0o?=<h<h,\\P(fSGDeSfWCT.T*K2Q60m<NB`>i?\\D_a6/A\"t<D9_r;@g;SFRCng(+&3a)GfPj]hR$i7/r/&om'Lb_r\\:N-il=L,YD=Zb%W^UAkGTH=&\"BK8iig=tq`-NgjUF[VV?WaPZZMmm*?l_]3mH>NqhWXB0UVK:I"
  )
  myHeaders.append('X-CSRFToken', 'eHmQ4q9ItjiVt2PWvDwZZNQmhNN9GQnd')
  myHeaders.append('sec-ch-ua-platform', '"Windows"')
  myHeaders.append('8f541ba5', "45'uKLE=98g]B#&:uOZrNY0pV")
  myHeaders.append('sec-ch-ua-mobile', '?0')
  myHeaders.append(
    'User-Agent',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
  )
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('X-API-SOURCE', 'pc')
  myHeaders.append('Accept', 'application/json')
  myHeaders.append('x-sap-ri', 'b1c99f64ae01332a235940317fc84d89e995e32c3474da5f')
  myHeaders.append('f49a8c0', "J/h'tWQ#>en^2Y3YC1C8;?*WE")
  myHeaders.append(
    'af-ac-enc-sz-token',
    '9qHRNjPNSVrtIyFcfqQI8Q==|UAzxuScGvDcte8tXuNSksbrrZk3z/N61mTIxUiAdzHFzws3utMs/4BFXd6ybZU8qZRgz6xWeo/pDKgLBTWvshNDr7gcXn9KaCiiv|i0ubbm69CyBJUI8v|06|3'
  )
  myHeaders.append(
    'sz-token',
    '9qHRNjPNSVrtIyFcfqQI8Q==|UAzxuScGvDcte8tXuNSksbrrZk3z/N61mTIxUiAdzHFzws3utMs/4BFXd6ybZU8qZRgz6xWeo/pDKgLBTWvshNDr7gcXn9KaCiiv|i0ubbm69CyBJUI8v|06|3'
  )
  myHeaders.append('Sec-Fetch-Site', 'same-origin')
  myHeaders.append('Sec-Fetch-Mode', 'cors')
  myHeaders.append('Sec-Fetch-Dest', 'empty')
  myHeaders.append('host', 'shopee.vn')
  myHeaders.append(
    'Cookie',
    'REC_T_ID=8186bd47-028d-11ee-8190-2cea7f806765; SPC_CLIENTID=bjd2RWwyVHNQcnNWbuvkdjkaoxqcdowb; SPC_EC=SXBPWEprTllJZXdSWklsa4P3ILqa4rkJTrMCmPXfmgRHdzlVnHqkre9QcSED+LfxYpEhJUvTnhPT/1VZW79iqNsUzaARrRA4suibYXVEXAjdRzDOCY+fXMfow57nsj1BoDP6cCDglIsKYm/0u6fZ69/BZ67oKK1Vr9Sq55hIqPg=; SPC_F=n7vEl2TsPrsVzROvCQ2NbH7vy6KG9pad; SPC_R_T_ID=ng9xZwd0yDP66vddLsXcz6DE5mG9fMc6LRVkyKDQyqKEhFmfSsA07NacFdxsV6Y+jOn3Rzbm62i2/kIMj7QGK8wZSqU956u6rWCL6NzlHVfh2ascp5MxBWzwMHzwYLQwJckPU2g7ogUT9RDNyQPk66cqTKtkoHCMln3tC03gwpc=; SPC_R_T_IV=QTFQdUQ1aHJya09kOVIxWA==; SPC_SI=3K+aZAAAAABuYmNqeEM4WLRmYQAAAAAAYzJEWmpIcEo=; SPC_ST=.TUVsd0V2WlFtamQzaFZQU35WxcBPjazmkzWAjSC7NcvsKgWqmqZLyTJRDQ8lY6Js5xMwQmhUru2hU7auTX7hQjWqCKdX0jBBTRkxNPhpzOpUmJ/a+Q50V+N0hf3G59YplWlPHmh0Orx0O/Cnkmp8HWUu/kAN0LTcZkt1DJr60lJukLu7pwOs+4E6ZaRmCWbX/aCiUMNywxUTHvIxXOXPWw==; SPC_T_ID=ng9xZwd0yDP66vddLsXcz6DE5mG9fMc6LRVkyKDQyqKEhFmfSsA07NacFdxsV6Y+jOn3Rzbm62i2/kIMj7QGK8wZSqU956u6rWCL6NzlHVfh2ascp5MxBWzwMHzwYLQwJckPU2g7ogUT9RDNyQPk66cqTKtkoHCMln3tC03gwpc=; SPC_T_IV=QTFQdUQ1aHJya09kOVIxWA==; SPC_U=33496067'
  )

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }

  try {
    const response = await fetch(
      `https://shopee.vn/api/v4/search/search_items?by=pop&categoryids=${categoryids}&limit=60&match_id=${match_id}&newest=0&order=desc&page_type=search&scenario=PAGE_CATEGORY&version=2&view_session_id=d1928c3b-92a1-49d8-a8e3-acbd95d81b42`,
      requestOptions
    )
    const result_1 = await response.json()
    return result_1
  } catch (error) {
    return error
  }
}

const crawlProducts = async (categoryids, match_id) => {
  try {
    let result = await getProductsFromShoppe(categoryids, match_id)
    console.log('🚀 ~ crawlProducts ~ result:', result.items.length)
  } catch (error) {
    console.log('🚀 ~ crawlProducts ~ error:', error)
  }
}

const randomProduct = async (categorySlug, subCategory, categoryId, categoryids, match_id) => {
  try {
    const result = await getProductsFromShoppe(categoryids, match_id)

    const normalizeData = result.items.map(async ({ item_basic, shopid, itemid }, index) => {
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
        province: { ...province },
        shipping: randomShippingIndex,
        shopType: randomShopTypeIndex,
        status: randomStatusIndex,
        isActive: true,
        price: item_basic.price / 100000,
        quantity: item_basic.stock,
        sold: item_basic.sold,
        vouchers,
        rating: item_basic.item_rating.rating_star,
        discount: item_basic.show_discount,
        viewed: item_basic.liked_count,
        slug,
        categoryId
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

const generateShopeeProvinces = async () => {
  try {
    let result = await test1(0)
    const rawProvinces = result.map(async province => {
      const newProvince = await ProvinceModel.create({
        name: province.division_name
      })

      const rawDistricts = await test1(province.id)

      const districtPromises = rawDistricts.map(async district => {
        const newDistrict = await DistrictModel.create({
          name: district.division_name,
          provinceId: newProvince._id
        })

        const rawWards = await test1(district.id)

        const wardPromises = rawWards.map(async ward => {
          await WardModel.create({
            name: ward.division_name,
            districtId: newDistrict._id
          })
        })

        await Promise.all(wardPromises)
      })

      await Promise.all(districtPromises)
    })

    await Promise.all(rawProvinces)

    // const data = await ProvinceModel.insertMany(result)
    console.log('🚀 ~ Oke:')
  } catch (error) {
    console.log('🚀 ~ generateProvinces ~ error:', error)
  }
}

const activeProduct = async () => {
  try {
    const data = await ProductModel.updateMany({
      isActive: true
    })

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
  test,
  test1,
  activeProduct,
  crawlProducts,
  generateShopeeProvinces
}
