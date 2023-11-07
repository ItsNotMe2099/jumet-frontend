export enum ModalType {
  Login = 'login',
  MobileMenu = 'mobileMenu',
  OtpCode = 'otpCode',
  PasswordChange = 'passwordChange',
  MapSelector = 'mapSelector',
  DealOffer = 'dealOffer',
  Confirm = 'confirm',
  SaleRequestOffer = 'saleRequestOffer',
  Success = 'success',
  SaleRequestForm = 'saleRequestForm',
  UserForm = 'userForm',
  Gallery = 'gallery',
  DealTerminateForm = 'dealTerminateForm',
  RepresentativeForm = 'representativeForm',
  RepresentativeSuccess = 'representativeSuccess',
  ChatFileUpload = 'chatFileUpload'
}

export enum ProfileMenuSettings {
  Settings = 'settings',
  ReceivingPoints = 'receiving-points',
  Employees = 'employees',
  Payment = 'payment'
}

export enum SnackbarType {
  error,
  success,
}

export enum InputStyleType {
  Default = 'default',
  Password = 'password'
}

export enum LabelStyleType {
  Placeholder = 'placeholder',
  Static = 'static',
  Cross = 'cross'
}

export enum FileUploadAcceptType {
  Image = 'image',
  Video = 'video',
  Document = 'document',
  Scan = 'scan',
  Media = 'media',
  Archives = 'archives'
}

export enum CookiesType {
  accessToken = 'accessToken',
}

export enum WeekDays {
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
  saturday = 6,
  sunday = 7,
}

export enum DayType {
  working = 'working',
  dayOff = 'dayOff',
}

export enum Preset {
  /** 200px */
  xsResize,
  /** 200px */
  xsCrop,

  /** 600px */
  smResize,
  /** 600px */
  smCrop,

  /** 900px */
  mdResize,
  /** 900px */
  mdCrop,

  /** 1200px */
  lgResize,
  /** 1200px */
  lgCrop,

  /** 1800px */
  xlResize,
  /** 1800px */
  xlCrop,
}

export enum LoginType {
  Seller = 'seller',
  Buyer = 'buyer'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum Goal {
  AuthLogin = 'auth:login',
  AuthLoginWrongPassword = 'auth:login:wrong-password',
  AuthReg = 'auth:reg',
  AuthRegWrongCode = 'auth:reg:wrong-code',
  AuthPasswordReset = 'auth:password-reset',
  AuthPasswordResetWrongCode = 'auth:password-reset:wrong-code',
  AuthPasswordForgot = 'auth:password-forgot',
  AuthEmailConfirm = 'auth:email-confirm',
  AuthEmployeeReg = 'auth:employee:reg',
  AuthLogout = 'auth:logout',
  SaleRequestCreate = 'sale-request:create',
  DealOfferAccept = 'deal-offer:accept',
  DealOfferReject = 'deal-offer:reject',
  SaleRequestEdit = 'sale-request:edit',
  SaleRequestUnPublish = 'sale-request:unpublish',
  SaleRequestPublish = 'sale-request:publish',
  UserProfileEdit = 'user:profile:edit',
  UserPassportCreate = 'user:passport:create',
  RepresentativeCreate = 'representative:create',
  RepresentativeEdit = 'representative:edit',
  RepresentativeDelete = 'representative:delete',
  RepresentativeReg = 'representative:reg',
  RepresentativeRegWrongCode = 'representative:reg:wrong-code',
  RepresentativeRegDelete = 'representative:reg-delete',
  RepresentativeRegDeleteWrongCode = 'representative:reg-delete:wrong-code',
  ReceivingPointSearch = 'receiving-point:search',
  ReceivingPointPhoneClick = 'receiving-point:phone:click',
  ReceivingPointSearchClear = 'receiving-point:search:clear',
  ReceivingPointSearchEmpty = 'receiving-point:search:empty',
  ReceivingPointCreate = 'receiving-point:create',
  ReceivingPointCreateStepData = 'receiving-point:create:step-data',
  ReceivingPointCreateStepDelivery = 'receiving-point:create:step-delivery',
  ReceivingPointCreateStepPricing = 'receiving-point:create:step-pricing',
  ReceivingPointCreateStepWorkTime = 'receiving-point:create:step-worktime',
  ReceivingPointEdit = 'receiving-point:edit',
  ReceivingPointDelete = 'receiving-point:delete',
  ReceivingPointUnPublish = 'receiving-point:unpublish',
  ReceivingPointPublish = 'receiving-point:publish',
  ChatMessageCreate = 'chat:message:create',
  ChatMessageSearch = 'chat:search',
  ChatFilterOpen = 'chat:filter:open',
  ChatFilter = 'chat:filter',
  EmployeeCreate = 'employee:create',
  UserApiTokenCreate = 'user:api-token:create',
  SaleRequestSearch = 'sale-request:search',
  SaleRequestSearchClear = 'sale-request:search:clear',
  SaleRequestSearchEmpty = 'sale-request:search:empty',
  DealSetUp = 'deal:setUp',
  DealWeighing = 'deal:weighing',
  DealWeighingAccept = 'deal:weighing-accept',
  DealTerminateBySeller = 'deal:terminate-by-seller',
  DealTerminateByBuyer = 'deal:terminate-by-buyer',
  DealPay = 'deal:pay',
  DealReviewCreate = 'deal:review:create',
  DealReviewAnswer = 'deal:review:answer',
  DealPassportChange = 'deal:passport-change',
  DealSetupValidation = 'deal:setup:validation',
  DealWeighingValidation = 'deal:weighing:validation',
}
