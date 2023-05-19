import Button from 'components/ui/Button'
import ErrorPage from 'components/for_pages/error/ErrorPage'
import styles from '@/components/for_pages/login/Form/index.module.scss'

export default function ErrorSystem() {
  return <ErrorPage title={'Произошла ошибка'} >
    <Button href={'/'} type='submit' className={styles.btn} styleType='large' color='blue'>
      На главную
    </Button>
  </ErrorPage>
}
