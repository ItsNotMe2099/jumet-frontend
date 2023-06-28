export enum ModalType {
  MobileMenu = 'mobileMenu',
  OtpCode = 'otpCode'
}

export enum ProfileMenuSettings {
  Settings = 'settings',
  Places = 'places',
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
  Media = 'media'
}

export enum CookiesType {
  accessToken = 'accessToken',
}

export enum WeekDays {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
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