import {useEffect, useState} from 'react'
import {getAuthServerSideProps} from '@/utils/auth'
import {UserRole} from '@/data/enum/UserRole'
import {LkReceivingPageLayout} from '@/pages/lk'
import EmployeeCard from '@/components/for_pages/LkPage/Cards/EmployeeCard'
import {useReceivingPointOwnerContext} from '@/context/receiving_point_owner_state'
import ContentLoader from '@/components/ui/ContentLoader'
import {EmployeeListOwnerWrapper, useEmployeeListOwnerContext} from '@/context/employee_list_owner_state'
import {DeepPartial} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {LkLayoutActionsData} from '@/context/lk_layout_content'
import InfiniteScroll from 'react-infinite-scroll-component'
import CardLayoutList from '@/components/for_pages/Common/CardLayoutList'
import CreateButton from '@/components/ui/Buttons/CreateButton'
import {useAppContext} from '@/context/state'
import FormFooter from '@/components/ui/FormFooter'
import ReceivingPointUsersForm from '@/components/for_pages/LkPage/ReceivingPoint/Forms/ReceivingPointUsersForm'
import CardLayout from '@/components/for_pages/Common/CardLayout'

interface Props {

}

const ReceivingPointEmployeesPageInner = (props: Props) => {
  const appContext = useAppContext()
  const receivingPointContext = useReceivingPointOwnerContext()
  const userListOwnerContext = useEmployeeListOwnerContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const handleSubmit = async (data: DeepPartial<IReceivingPoint>) => {
    setLoading(true)
    await receivingPointContext.editRequest(data)
    await userListOwnerContext.reFetch()
    setIsEdit(false)
    setLoading(false)
  }

  useEffect(() => {
    userListOwnerContext.reFetch()
  }, [])
  const handleScrollNext = () => {
    userListOwnerContext.fetchMore()
  }
  return (<div>
      <LkLayoutActionsData actions={[ <CreateButton fluid={appContext.isMobile} onClick={() => setIsEdit(true)}>
        Добавить сотрудника
      </CreateButton>
      ]}/>
      {userListOwnerContext.isLoading && <ContentLoader style={'block'}/>}
      {isEdit && <CardLayout><ReceivingPointUsersForm footer={<FormFooter hasBack onBack={() => setIsEdit(false)} spinner={loading} />} receivingPoint={receivingPointContext.receivingPoint}  onSubmit={handleSubmit}/></CardLayout>}
    {!isEdit && <InfiniteScroll
        dataLength={userListOwnerContext.data.data.length}
        next={handleScrollNext}
        style={{overflow: 'inherit'}}
        loader={userListOwnerContext.data.total > 0 ?
          <ContentLoader style={'infiniteScroll'} isOpen={true}/> : null}
        hasMore={userListOwnerContext.data.total > userListOwnerContext.data.data.length}
        scrollThreshold={0.6}>
        <CardLayoutList>
          {userListOwnerContext.data.data.map((i, index) =>
            <CardLayout key={i.id}>
            <EmployeeCard isLargeName employee={i} key={i.id} receivingPoint={receivingPointContext.receivingPoint}/>
            </CardLayout>
          )}
        </CardLayoutList>
      </InfiniteScroll>}

    </div>

  )
}


const ReceivingPointEmployeesPage = (props: Props) => {
  const receivingPointContext = useReceivingPointOwnerContext()
  return (<EmployeeListOwnerWrapper receivingPointId={receivingPointContext.receivingPointId}>
    <ReceivingPointEmployeesPageInner/>
  </EmployeeListOwnerWrapper>)
}


ReceivingPointEmployeesPage.getLayout = LkReceivingPageLayout
export default ReceivingPointEmployeesPage
export const getServerSideProps = getAuthServerSideProps(UserRole.Buyer)
