import {useState} from 'react'
import {LoginType} from '@/types/enums'
import CenterLayout from '@/components/for_pages/Common/CenterLayout'
import Heading from '@/components/ui/Heading'
import SwitchFilter from '@/components/ui/SwitchFilter'
import PasswordForgotForm from '@/components/for_pages/password_forgot/Form'
import styles from './index.module.scss'
import Layout from '@/components/layout/Layout'
import {useRouter} from 'next/router'


export default function PasswordForgotPage() {
  const router = useRouter()
  const [type, setType] = useState<LoginType>(router.query.type as LoginType ?? LoginType.Seller)


  return (
    <Layout>
    <CenterLayout>
      <Heading>Восстановление пароля</Heading>
      <SwitchFilter<LoginType>
        active={type}
        onClick={(type) => setType(type)}
        items={[
          {label: 'Продавец лома', value: LoginType.Seller},
          {label: 'Ломозаготовитель', value: LoginType.Buyer},
        ]}
      />
      <div className={styles.form}>
        <PasswordForgotForm mode={type}/>
      </div>
    </CenterLayout>
    </Layout>
  )
}
