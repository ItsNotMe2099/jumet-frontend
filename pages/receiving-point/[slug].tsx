import { useState } from 'react'

interface Props {

}

export default function ReceivingPoint(props: Props) {

  const [showChat, setShowChat] = useState<boolean>(false)

  return null
  /*
  return (
    <Layout>
      <div className={styles.root}>
        {!showChat ? <div className={styles.content}>
          <ContactsCard cardLayoutTitleClass={classNames(styles.layoutTitle, styles.mobileCardTitle)} item={props.item} />
          <AddressCard cardLayoutTitleClass={styles.layoutTitle} item={props.item} />
          <CostCard cardLayoutTitleClass={styles.layoutTitle} item={props.item} />
          <DeliveryZonesCard cardLayoutTitleClass={styles.layoutTitle} item={props.item} />
          <ReviewsCard cardLayoutTitleClass={styles.layoutTitle} item={props.item} />
          <WorkingHoursCard cardLayoutTitleClass={styles.layoutTitle} item={props.item} />
          <RequisitesCard cardLayoutTitleClass={styles.layoutTitle} item={props.item} />
        </div>
          :
          <div className={styles.chatLayout}>
            <div className={styles.header}>
              <div className={styles.back} onClick={() => setShowChat(false)}>
                <ChevronLeftSvg color={colors.grey500} />
                <div className={styles.text}>Назад</div>
              </div>
            </div>
            <Chat address={props.item.address} className={styles.chatMobile} messageClass={styles.message} />
          </div>
        }
        <Chat className={styles.chat} messageClass={styles.message} />
      </div>
      {!showChat && <TabBar onClick={() => setShowChat(true)} isSticky />}
    </Layout>
  )

   */
}
