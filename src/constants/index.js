export const EXPIRES_TOKEN_JWT = 30 * 60 //30 minutes: 30 * 60
export const ADMIN_EXPIRES_TOKEN_JWT = 7 * 24 * 60 * 60 //30 minutes: 30 * 60
export const EXPIRES_REFRESH_TOKEN_JWT = 7 * 24 * 60 * 60 // 7 days: 7 * 24 * 60 * 60
export const ADMIN_EXPIRES_REFRESH_TOKEN_JWT = 30 * 24 * 60 * 60 // 7 days: 7 * 24 * 60 * 60

export const ROLES = {
  User: 'User',
  Admin: 'Admin'
}

export const SEXES = {
  None: -1,
  Male: 0,
  Female: 1,
  Other: 2
}

export const SHIPPINGS = {
  Express: 'Hoả tốc',
  Fast: 'Nhanh',
  Saving: 'Tiết kiệm'
}

export const SHOP_TYPES = {
  Mall: 'Shopee Mall',
  Fav: 'Shop Yêu thích'
}

export const STATUS = {
  New: 'Mới',
  Used: 'Đã sử dụng'
}

//-1:In cart,0:All, 1:Pending, 2:Shipping,3:Shipped,4:Canceled
export const STATUS_ORDER = [-1, 0, 1, 2, 3, 4]
