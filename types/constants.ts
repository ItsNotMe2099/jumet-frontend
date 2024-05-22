
export const CONTACTS = {
  tel: '8 (800) 222-02-58'
}

export const LINKS = {
  vk: '',
  fb: '',
  instagram: '',
  youtube: ''
}

export const SITE_NAME = 'Лом маркет'

export const CookiesLifeTime: {
  accessToken: number,
  sessionId: number,
  bonusFirstDealModal: number,
} = {
  accessToken: 365 * 3 * 60 * 60 * 24 ,
  sessionId: 365 * 3 * 60 * 60 * 24 ,
  bonusFirstDealModal: 7 * 60 * 60 * 24,
}
export const Timers: {
  notificationsRefresh: number,
  dealRefresh: number,
  showBonusSellerModal: number
} = {
  notificationsRefresh: 15 * 1000 ,
  dealRefresh: 30 * 1000,
  showBonusSellerModal: 5 * 1000
}
