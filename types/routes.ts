
export class Routes {
  static get login() {
    return '/auth/login'
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

  static get createSalesApplication () {
    return '/create-sales-application'
  }
  static get salesIndex() {
    return '/sales'
  }

}
