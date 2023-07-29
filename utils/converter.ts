import { FileUploadAcceptType } from 'types/enums'
import { GeoObject } from 'data/interfaces/IYandexGeocoder'

export default class Converter {

  static convertLibphonenumberToMask = (value: string): string => value
    .replace('x', '+')
    .replaceAll('x', '0')

  static getFileUploadAccept(type: FileUploadAcceptType): {[key: string]: string[]} {
    const images = {'image/png': ['.png'], 'image/jpeg': ['jpeg']}
    const videos = {'video/mp4': ['.mp4'], 'video/mpeg': ['.mpeg'], 'video/x-msvideo': ['.avi']}
    const scans = {'application/pdf': ['.pdd']}
    const docs = {
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.oasis.opendocument.text': ['.odt'],
      'text/csv': ['.csv'],
      'text/plain': ['.txt'],
      'application/rtf': ['.rtf']
    }

    const archives = {'application/vnd.rar': ['.rar'], 'application/x-7z-compressed': ['.7z'], 'application/zip': ['.zip']}
    switch (type) {
      case FileUploadAcceptType.Image:
        return images
      case FileUploadAcceptType.Scan:
        return {...images, ...scans}
      case FileUploadAcceptType.Document:
        return {...scans, ...docs}
      case FileUploadAcceptType.Media:
        return {...images, ...videos}
      case FileUploadAcceptType.Archives:
        return archives
      default:
        return {}
    }

  }

  static convertGeoObjectToString(geoObject: GeoObject): string | null {
    return geoObject.name
  }
}
