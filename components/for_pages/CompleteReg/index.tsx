import { useAppContext } from '@/context/state'
//import styles from './index.module.scss'
import FinishForm from './FinishForm'
import CenterLayout from '@/components/for_pages/Common/CenterLayout'
import Heading from '@/components/ui/Heading'


interface Props {

}

export default function CompleteReg(props: Props) {
  const appContext = useAppContext()
  return (
      <CenterLayout>
        <Heading>Завершите регистрацию</Heading>
        <FinishForm/>
      </CenterLayout>
  )
}
