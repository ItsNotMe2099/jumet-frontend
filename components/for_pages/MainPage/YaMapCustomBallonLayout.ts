/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
import {AnyObject, YMapsApi,} from '@pbe/react-yandex-maps/typings/util/typing'

const DESCRIPTION_BLOCK_HEIGHT = 20
const PIN_TOP_MARGIN = 4
const PIN_LEFT_MARGIN = 10

const PIN_SIZE = 12
const PIN_EXPANDED_INSET = 3
type Description = {
  isHidden: boolean
}
type PinLayoutGetterParams = {
  onClick: (map: YMapsApi) => void;
};

export interface GeoObjectGeometry extends AnyObject {
  type: 'Point' | 'LineString' | 'Rectangle' | 'Polygon' | 'Circle';
  coordinates: number[] | number[][] | number[][][];
  radius?: number;
}
export type PinLayoutGetter = (
  params: PinLayoutGetterParams
) => GeoObjectGeometry;
type PinTemplateFactoryCreator = (ymaps: YMapsApi) => any;

// eslint-disable-next-line max-lines-per-function
export const createBallonLayoutTemplateFactory: PinTemplateFactoryCreator = (ymaps) => {
  // eslint-disable-next-line max-lines-per-function
  return ({ onClick, description = { title: '' }, isActive, isViewed }) => {
    const layout = ymaps.templateLayoutFactory.createClass(
      `
        <div class="ymap-popover">
          <div class="popover-inner">
          </div>
           $[[options.contentLayout]]

        </div>
      `,
      {
        // Строим экземпляр макета на основе шаблона и добавляем его в родительский HTML-элемент
        build() {
          this.constructor.superclass.build.call(this)
          console.log('El2323', this.getParentElement().querySelectorAll(['.ymap-popover']))
          this._$element = this.getParentElement().querySelectorAll(['.ymap-popover'])
          //this._$element[0].querySelectorAll(['.ymap-popover-close'])[0].onclick = () => {
          // this.onCloseClick()
          // }
          this.applyElementOffset()

        },

        // Удаляем содержимое макета из DOM
        clear() {

          this.constructor.superclass.clear.call(this)
        },

        // Метод будет вызван системой шаблонов API при изменении размеров вложенного макета
        onSublayoutSizeChange() {
          console.log('onSublayoutSizeChange11')
          layout.superclass.onSublayoutSizeChange.apply(this, arguments)

          if (!this._isElement(this._$element)) {
            return
          }

          this.applyElementOffset()

          this.events.fire('shapechange')
        },

        // Сдвигаем балун, чтобы "хвостик" указывал на точку привязки
        applyElementOffset() {
          console.log('applyElementOffset111')
          this._$element[0].style = {... this._$element[0].style,
            left: -(this._$element[0].offsetWidth / 2),

            // По какой-то причине prettier и stylelint считают строку ниже за CSS
            // stylelint-disable
            top: -(
              this._$element[0].offsetHeight
            ),
          }
        },

        // Закрываем балун при клике на крестик, кидая событие "userclose" на макете
        onCloseClick(e) {
          e.preventDefault()
          console.log('OnClose111')
          this.events.fire('userclose')
        },

        // Используется для автопозиционирования (balloonAutoPan)
        getShape() {
          console.log('GetShape111', ymaps.shape.Rectangle, ymaps.geometry.pixel.Rectangle)

          if (!this._isElement(this._$element)) {
            return layout.superclass.getShape.call(this)
          }

          var position ={
            top: this._$element[0].offsetTop,
            left: this._$element[0].offsetLeft,
          }

          return new ymaps.shape.Rectangle(
            new ymaps.geometry.pixel.Rectangle([
              [position.left, position.top],
              [
                position.left + this._$element[0].offsetWidth,
                position.top +
                this._$element[0].offsetHeight
              ],
            ]),
          )
        },

        _isElement(element) {
          return element && element[0] && element[0].querySelectorAll(['.popover-inner'])[0]
        },
      },
    )
    return layout
  }
}
