import Layout from '@/components/layout/Layout'
import styles from './index.module.scss'
import ContactsCard from '@/components/for_pages/Common/ReceivingPointComponents/ContactsCard'
import { GetServerSideProps } from 'next'
import IPointData from '@/data/interfaces/IPointData'
import AddressCard from '@/components/for_pages/Common/ReceivingPointComponents/AddressCard'
import RequisitesCard from '@/components/for_pages/Common/ReceivingPointComponents/RequisitesCard'
import WorkingHoursCard from '@/components/for_pages/Common/ReceivingPointComponents/WorkingHoursCard'
import PhotosCard from '@/components/for_pages/Common/ReceivingPointComponents/PhotosCard'
import DeliveryZonesCard from '@/components/for_pages/Common/ReceivingPointComponents/DeliveryZonesCard'
import CostCard from '@/components/for_pages/Common/ReceivingPointComponents/CostCard'

interface Props {
  item: IPointData
}

export default function ReceivingPoint(props: Props) {

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.content}>
          <ContactsCard item={props.item} />
          <AddressCard item={props.item} />
          <CostCard item={props.item} />
          <DeliveryZonesCard item={props.item} />
          <WorkingHoursCard item={props.item} />
          <PhotosCard item={props.item} />
          <RequisitesCard item={props.item} />
        </div>
        <div className={styles.chat}>

        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = context.query.slug as string

  const data = {
    data: [
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '23', rating: '4.8', id: 1, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: false, haveLoading: false, rating: '4.8', alwaysOpen: true, id: 2, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: false, opens: '9', closes: '13', rating: '4.8', id: 3, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: false, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 4, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 5, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 6, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 7, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 8, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 9, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 10, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf'
      },
    ],
    total: 100,
    page: 1
  }

  return {
    props: {
      item: data.data.find(i => i.id === +res)
    } as Props
  }
}
