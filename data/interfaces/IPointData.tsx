import IUser from "./IUser"

interface IZones {
    id: number
    distance: string
    price: string
}

export default interface IPointData {
    id: number
    title: string
    price: string
    address: string
    isDelivery?: boolean
    haveLoading?: boolean
    rating: string
    opens?: string
    closes?: string
    alwaysOpen?: boolean
    phone: string
    inn: string
    entity: string
    ogrn: string
    legalAddress: string
    license: string
    dealsPerMonth?: number
    zones: IZones[]
    employees: IUser[]
}