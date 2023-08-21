import Formatter from '@/utils/formatter'
export enum UnitWeight{
  Kg = 'kg',
  Ton = 'ton'

}
export default class WeightUtils {

  static getUnitByValue(value: number | null): UnitWeight {
    if (!value) {
      return UnitWeight.Ton
    }
    return value >= 1000 && value % 1000 === 0 ? UnitWeight.Ton : UnitWeight.Kg
  }

  static formatWeight(weight: number): string {
    const unit = this.getUnitByValue(weight)
    return `${unit === UnitWeight.Ton ? weight / 1000: weight} ${unit === UnitWeight.Ton ? Formatter.pluralize(weight / 1000, 'тонны', 'тонн', 'тонн') : Formatter.pluralize(weight, 'кг', 'кг', 'кг')}`
  }
  static formatWeightWithoutSuffix(weight: number): string {
    const unit = this.getUnitByValue(weight)
    return `${unit === UnitWeight.Ton ? weight / 1000: weight}`
  }
  static formatWeightInTons(weight: number): number {
    return parseFloat((weight / 1000).toFixed(3))
  }
}
