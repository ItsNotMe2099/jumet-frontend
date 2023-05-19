import {useState} from 'react'
import LoginForm from './Form'
import SwitchFilter from '@/components/ui/SwitchFilter'
import {LoginType} from '@/types/enums'
import Heading from '@/components/ui/Heading'
import CenterLayout from '@/components/for_pages/Common/CenterLayout'

interface Props {

}


export default function LoginPage(props: Props) {

    const [type, setType] = useState<LoginType>(LoginType.Seller)

    return (
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
            <LoginForm mode={type}/>
        </CenterLayout>
    )
}
