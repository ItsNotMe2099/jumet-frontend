import Layout from '@/components/layout/Layout'
import { useState} from 'react'
import {LoginType} from '@/types/enums'
import CenterLayout from '@/components/for_pages/Common/CenterLayout'
import Heading from '@/components/ui/Heading'
import SwitchFilter from '@/components/ui/SwitchFilter'
import LoginForm from '@/components/for_pages/login/Form'
import styles from './index.module.scss'


export default function SignIn() {

  const [type, setType] = useState<LoginType>(LoginType.Seller)
  return (
    <Layout>
    <CenterLayout>
      <Heading>Вход на сайт</Heading>
      <SwitchFilter<LoginType>
        active={type}
        onClick={(type) => setType(type)}
        items={[
          {label: 'Продавец лома', value: LoginType.Seller},
          {label: 'Ломазаготовитель', value: LoginType.Buyer},
        ]}
      />
      <div className={styles.form}>
      <LoginForm mode={type}/>
      </div>
    </CenterLayout>
    </Layout>
  )
}
