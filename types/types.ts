import {UrlObject} from 'url'
import {HTMLInputTypeAttribute, MouseEventHandler} from 'react'
import {FieldConfig} from 'formik'
import {DayType, SnackbarType, WeekDays} from 'types/enums'


export class RequestError extends Error{
  message: string
  code: number
  isNotFoundError: boolean

  constructor(message: string, code: number) {
    super(message)
    this.message = message
    this.code = code
    this.isNotFoundError = code === 404
  }
}
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export interface IFormStep<S> {
  name?: string,
  description?: string | null
  key: S
}

export interface IPagination<T>{
  data: T[]
  total: number
}
export interface IPaginationRequest{
  page: number
  limit: number
}

export interface IField<T> extends FieldConfig<T> {
  label?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  error?: string
  description?: string
  disabled?: boolean
}
export interface IOption<T> {
  label: string
  value?: T
  disabled?: boolean
  description?: string
}

export interface SnackbarData {
  text: string
  type: SnackbarType
}
export interface IButton {
  type?: 'submit' | 'reset' | 'button' | undefined
  form?: string
  spinner?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler
  href?: string | UrlObject
  isExternalHref?: boolean // add target blank and no referrer
}

export interface ITimeInterval {
  startTime?: string
  endTime?: string
}

export interface IDayDescription {
  dayType: DayType
  intervals: ITimeInterval[]
}

export type WorkDays = {
  [day in WeekDays]: IDayDescription
}