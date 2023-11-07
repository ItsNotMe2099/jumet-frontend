import Heading from '@/components/ui/Heading'
import CenterLayout from '@/components/for_pages/Common/CenterLayout'
import PasswordResetForm from '@/components/for_pages/password_reset/Form'
import {useRouter} from 'next/router'

interface Props {

}
export default function PasswordForgot(props: Props) {
   const router = useRouter()
    const code = router.query.code as string
    const login = router.query.login as string
    return (
        <CenterLayout>
                    <Heading>Восстановление пароля</Heading>
                    <PasswordResetForm code={code} login={login}/>
        </CenterLayout>
    )
}
