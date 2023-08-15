
export class Routes {
  static getGlobal(url: string){
    return `${typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : ''}${url}`
  }
  static login(redirect?: string) {
    return `/auth/login${redirect ? `?redirect=${redirect}` : ''}`
  }

  static get registration() {
    return '/auth/registration'
  }

  static get passwordForgot() {
    return '/auth/password-forgot'
  }
  static passwordReset(data: { login: string, code?: string }) {
    return `/auth/password-reset?login=${data.login}${data.code ? `&code=${data.code}` : ''}`
  }

  static get registrationComplete() {
    return '/auth/registration-complete'
  }


  static get index() {
    return '/'
  }

  static get receivingPoints() {
    return '/'
  }

  static receivingPoint(id: number) {
    return `/receiving-point/${id}`
  }

  static get saleRequests() {
    return '/sale-requests'
  }
  static saleRequest(id: string | number) {
    return `/sale-requests/${id}`
  }
  static saleRequestPrivate(id: string | number) {
    return `/sale-requests/private/${id}`
  }

  static get lk() {
    return '/lk'
  }
  static get lkDeals() {
    return '/lk/deals'
  }
  static lkDeal(id: string | number) {
    return `/lk/deals/${id}`
  }
  static lkChat(id?: number | null) {
    return `/lk/chat${id ? `?chatId=${id}` : ''}`
  }
  static get lkProfileSettings() {
    return '/lk/profile-settings'
  }
  static get lkMyRepresentatives() {
    return '/lk/representatives'
  }
  static get lkMyPassportData() {
    return '/lk/passport-data'
  }
  static get lkSaleRequests() {
    return '/lk/sale-requests'
  }
  static lkSaleRequest(id: number | string) {
    return `/lk/sale-requests/${id}`
  }
  static lkSaleRequestEdit(id: number | string) {
    return `/lk/sale-requests/edit/${id}`
  }
  static get lkSaleRequestCreate() {
    return '/lk/sale-requests/create'
  }

  static get lkEmployees() {
    return '/lk/sales-applications'
  }
  static get lkReceivingPoints() {
    return '/lk/receiving-points'
  }

  private static lkReceivingPoint(id: string | number) {
    return `/lk/receiving-points/${id}`
  }
  static lkReceivingPointInfo(id: string | number) {
    return `${this.lkReceivingPoint(id)}/info`
  }
  static lkReceivingPointEmployees(id: string | number) {
    return `${this.lkReceivingPoint(id)}/employees`
  }
  static lkReceivingPointReviews(id: string | number) {
    return `${this.lkReceivingPoint(id)}/reviews`
  }
  static lkReceivingPointStat(id: string | number) {
    return `${this.lkReceivingPoint(id)}/stat`
  }


  static get lkReceivingPointCreate() {
    return '/lk/receiving-points/create'
  }

  static lkReceivingPointEdit(id: string | number) {
    return `/lk/receiving-points/edit/${id}/info`
  }

  static lkReceivingPointEditStep(id: string | number, step: string) {
    return `/lk/receiving-points/edit/${id}/${step}`
  }

  static get lkPayment() {
    return '/lk/payment'
  }

  static get lkDealOffers() {
    return '/lk/deal-offers'
  }

  static get lkFavorites() {
    return '/lk/favorites'
  }

  static get lkCrm() {
    return '/lk/crm'
  }

  static get lkCrmMain() {
    return '/lk/crm/main'
  }

  static get lkCrmDeals() {
    return '/lk/crm/deals'
  }

  static get lkCrmReceivingPoints() {
    return '/lk/crm/receiving-points'
  }

  static get lkCrmClients() {
    return '/lk/crm/clients'
  }
  static get representativeRegistration(){
    return '/representative-registration'
  }
  static get representativeDeleteRegistration(){
    return '/representative-delete-registration'
  }

  static get personalDataPolitics(){
    return '/personal-data-politics'
  }
}
