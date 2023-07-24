import { FileUploadAcceptType } from 'types/enums'
import { GeoObject } from 'data/interfaces/IYandexGeocoder'

export default class Converter {

  static convertLibphonenumberToMask = (value: string): string => value
    .replace('x', '+')
    .replaceAll('x', '0')

  static getFileUploadAccept(type: FileUploadAcceptType): string[] {
    const images = ['.png', '.jpg', '.jpeg']
    const videos = ['.mp4', '.mov', '.avi']
    const scans = ['.pdf']
    const docs =
      ['.xls', '.xlsx', '.docx', '.doc', '.csv', '.txt', '.odt']
    const archives = ['.rar', '.7-zip', '.zip']
    switch (type) {
      case FileUploadAcceptType.Image:
        return images
      case FileUploadAcceptType.Scan:
        return [...images, ...scans]
      case FileUploadAcceptType.Document:
        return [...scans, ...docs]
      case FileUploadAcceptType.Media:
        return [...images, ...videos]
      case FileUploadAcceptType.Archives:
        return archives
      default:
        return []
    }

  }

  static convertGeoObjectToString(geoObject: GeoObject): string | null {
    return geoObject.name
  }
}
