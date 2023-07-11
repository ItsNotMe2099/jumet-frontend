import Layout from '@/components/layout/Layout'
//import styles from './index.module.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import LkLayout from '@/components/for_pages/LkPage/layout'
import ReceivingPointCard from '@/components/for_pages/LkPage/Cards/ReceivingPointCard'

interface Props {

}

export default function ReceivingPointsPage(props: Props) {

  const router = useRouter()

  const token = Cookies.get('accessToken')

  console.log('ROUTER', router.asPath)

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [])

  const data = {
    data: [
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '23', rating: '4.8', id: 1, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 0
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: false, haveLoading: false, rating: '4.8', alwaysOpen: true, id: 2, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 5
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: false, opens: '9', closes: '13', rating: '4.8', id: 3, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 5
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: false, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 4, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 5
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 5, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 5
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 6, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 5
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 7, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 5
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 8, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 0
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 9, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 0
      },
      {
        title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
        isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 10, phone: '+ 7 (495) 256-34-34',
        inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
        license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 5
      },
    ],
    total: 100,
    page: 1
  }

  return (
    <Layout>
      <LkLayout>
        {data.data.map((i, index) =>
          <ReceivingPointCard point={i} key={i.id} />
        )}
      </LkLayout>
    </Layout>
  )
}

