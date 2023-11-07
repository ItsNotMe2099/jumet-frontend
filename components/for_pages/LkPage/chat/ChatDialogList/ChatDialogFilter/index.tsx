import styles from './index.module.scss'
import React, {useState} from 'react'
import InputField, {InputValueType} from '@/components/fields/InputField'
import {Form, FormikProvider, useFormik} from 'formik'
import IconButton from '@/components/ui/IconButton'
import FilterSvg from '@/components/svg/FilterSvg'
import {colors} from '@/styles/variables'
import DealField from '@/components/fields/DealField'
import UserField from '@/components/fields/UserField'
import {useChatContext} from '@/context/chat_state'
import {debounce} from 'debounce'
import ReceivingPointField from '@/components/fields/ReceivingPointField'
import Collapsible from 'react-collapsible'
import {useAppContext} from '@/context/state'
import {UserRole} from '@/data/enum/UserRole'

interface Props {
}

export default function ChatDialogFilter(props: Props) {
  const chatContext = useChatContext()
  const [showFilter, setShowFilter] = useState(false)
  const appContext = useAppContext()

  const handleSubmit = () => {

  }
  const debouncedSearchChange = debounce(async (search: InputValueType<string>) => {
    chatContext.setFilter({...chatContext.filter, search})
  }, 300)
  const initialValues = {
    search: null,
    receivingPointId: null,
    dealId: null,
    userId: null,
  }
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit
  })
const handleFilterClick = () => {
    setShowFilter(!showFilter)
}
  return (
    <FormikProvider value={formik}>
      <Form className={styles.root}>
        {appContext.aboutMe?.role === UserRole.Buyer && <div className={styles.top}>
          <ReceivingPointField name={'receivingPointId'} resettable onChange={(id) => chatContext.setFilter({...chatContext.filter, receivingPointId: id})}/>
        </div>}
          <div className={styles.center}>
            <InputField<string> className={styles.searchField} resettable name={'search'} placeholder={'Поиск'} suffix={'search'} onChange={(val) => debouncedSearchChange(val)}/>
            {appContext.aboutMe?.role === UserRole.Buyer && <IconButton bgColor={'grey300'} size={'large'} onClick={handleFilterClick}><FilterSvg color={colors.blue500}/></IconButton>}
          </div>

          <Collapsible trigger={<></>} open={showFilter}>
            <div className={styles.bottom}>
              <DealField name={'dealId'} resettable onChange={(id) => chatContext.setFilter({...chatContext.filter, dealId: id})}/>
              <UserField name={'userId'} resettable  onChange={(id) => chatContext.setFilter({...chatContext.filter, userId: id})}/>
            </div>
          </Collapsible>

             </Form>
    </FormikProvider>
  )

}
