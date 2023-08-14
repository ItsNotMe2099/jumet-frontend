import SuccessBlock from '@/components/for_pages/Common/SuccessBlock'
import styles from 'components/for_pages/LkPage/ReceivingPointCreateForm/components/ApproveStep/index.module.scss'
import Button from '@/components/ui/Button'


interface Props {

}

export default function ApproveStep(props: Props) {

  return (
    <div className={styles.root}>
      <SuccessBlock
        title='Вы успешно зарегистрировались!'
        text={<>
          Ваши регистрационные данные на модерации. Проверка занимает до 1 рабочего<br /> дня. Пока она идёт – ваша компания не будет отображаться в каталоге.  Однако вы<br /> можете посмотреть, как будет выглядеть страница вашего пункта приема.
        </>}
        actions={
          <Button  styleType='large' color='blue'>
            Открыть страницу пункта приема
          </Button>
        }
      />
    </div>
  )
}
