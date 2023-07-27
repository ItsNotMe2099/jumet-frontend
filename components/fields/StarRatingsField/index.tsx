import styles from './index.module.scss'
import { useField } from 'formik'
import { IField } from 'types/types'
import FieldError from 'components/fields/FieldError'
import StarRatings from 'react-star-ratings'
import { colors } from '@/styles/variables'

interface Props extends IField<string> {
  label?: string
}

export default function StarRatingsField(props: Props) {
  // @ts-ignore
  const [field, meta, helpers] = useField(props as any)
  const showError = meta.touched && !!meta.error

  const onStarClick = (nextValue: number) => {
    helpers.setValue(nextValue)
  }

  return (
    <div className={styles.root}>
      <div className={styles.label}>
        {props.label}
      </div>
      <StarRatings
        rating={field.value}
        starRatedColor={colors.yellow500}
        starEmptyColor={colors.grey500}
        svgIconPath="M12.5195 17.3183C12.1995 17.1229 11.7971 17.1229 11.4771 17.3183L8.17197 19.3369C7.41288 19.8005 6.47167 19.1167 6.67803 18.2515L7.57658 14.4841C7.66358 14.1194 7.5392 13.7366 7.25442 13.4927L4.3144 10.9742C3.63883 10.3956 3.9984 9.28901 4.88509 9.21798L8.74437 8.90878C9.1182 8.87883 9.44384 8.64224 9.58785 8.29597L11.0749 4.72019C11.4165 3.89885 12.58 3.89885 12.9216 4.72019L14.4087 8.29597C14.5527 8.64224 14.8784 8.87883 15.2522 8.90878L19.1121 9.21797C19.9988 9.28901 20.3584 10.3957 19.6827 10.9743L16.7422 13.4927C16.4574 13.7366 16.333 14.1194 16.42 14.4842L17.3185 18.2515C17.5249 19.1167 16.5837 19.8005 15.8246 19.3369L12.5195 17.3183Z"
        svgIconViewBox="0 0 24 24"
        starDimension="20px"
        starSpacing="0"
        numberOfStars={5}
        changeRating={onStarClick}
      />
      <FieldError showError={showError}>{meta.error}</FieldError>
    </div >
  )
}

StarRatingsField.defaultProps = {

}

