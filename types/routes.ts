
export class Routes {
  static login(redirect?: string) {
    return `/auth/login${redirect ? `?redirect=${redirect}` : ''}`
  }

  static get registration() {
    return '/auth/registration'
  }

  static get passwordForgot() {
    return '/auth/password-forgot'
  }
  static passwordReset(data: {login: string, code?: string}) {
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

  static get sales() {
    return '/sales'
  }



  static get lk() {
    return '/lk'
  }
  static get lkProfileSettings() {
    return '/lk/profile-settings'
  }
  static get lkMyRepresentatives() {
    return '/lk/representatives'
  }
  static get lkSalesApplications() {
    return '/lk/sales-applications'
  }
  static get lkSalesCreate () {
    return '/lk/sales-applications/create'
  }

  static get lkEmployees() {
    return '/lk/sales-applications'
  }
  static get lkReceivingPoints() {
    return '/lk/receiving-points'
  }

  static lkReceivingPoint(id: string | number) {
    return `/lk/receiving-points/${id}`
  }
  static  lkReceivingPointInfo(id: string | number) {
    return `${this.lkReceivingPoint(id)}/info`
  }
  static  lkReceivingPointEmployees(id: string | number) {
    return `${this.lkReceivingPoint(id)}/employees`
  }
  static  lkReceivingPointReviews(id: string | number) {
    return `${this.lkReceivingPoint(id)}/reviews`
  }
  static  lkReceivingPointStat(id: string | number) {
    return `${this.lkReceivingPoint(id)}/stat`
  }

  static get lkPayment() {
    return '/lk/payment'
  }

  static get lkDeals() {
    return '/lk/deals'
  }

}
