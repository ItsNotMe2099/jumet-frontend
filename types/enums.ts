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
  SaleRequestForm = 'saleRequestForm'
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
  /** 250px */
  xsResize,
  /** 250px */
  xsCrop,

  /** 500px */
  smResize,
  /** 500px */
  smCrop,

  /** 800px */
  mdResize,
  /** 800px */
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
