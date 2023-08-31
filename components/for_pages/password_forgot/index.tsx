import {useState} from 'react'
import SwitchFilter from '@/components/ui/SwitchFilter'
import {LoginType} from '@/types/enums'
import Heading from '@/components/ui/Heading'
import PasswordForgotForm from '@/components/for_pages/password_forgot/Form'
import CenterLayout from '@/components/for_pages/Common/CenterLayout'

interface Props {

}
export default function PasswordForgot(props: Props) {
    const [type, setType] = useState<LoginType>(LoginType.Seller)

    return (
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
                    <PasswordForgotForm mode={type}/>
        </CenterLayout>
    )
}
