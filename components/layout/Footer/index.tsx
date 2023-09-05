import ContactPhoneSvg from '@/components/svg/ContactPhoneSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import Link from 'next/link'
import { CONTACTS, LINKS } from '@/types/constants'
import Button from '@/components/ui/Button'
import { format } from 'date-fns'
import VKSvg from '@/components/svg/VKSvg'
import {Routes} from '@/types/routes'
import LogoSvg from '@/components/svg/LogoSvg'

interface Props {

}

export default function Footer(props: Props) {

  const options = [
    { label: 'Пункты приема лома', link: '#' },
    { label: 'Создание заявки на продажу', link: '#' },
    { label: 'Преимущества для продавцов', link: '#' },
    { label: 'Регистрация продавца', link: '#' },
    { label: 'Заявки на продажу лома', link: '#' },
    { label: 'Преимущества  для покупателей', link: '#' },
    { label: 'Регистрация ломозаготовителя', link: '#' },
    { label: 'Как это работает?', link: '#' },
    { label: 'Политика конфиденциальности', link: '#' },
    { label: 'Связь с администрацией', link: '#' },
  ]

  return (
    <div className={styles.root} id={'footer'}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.right}>
            <div className={styles.top}>
              <Link href={'/'}>
                <LogoSvg className={styles.logo} colorFirst={colors.yellow500} colorSecond={colors.white}/>
              </Link>

              <div className={styles.info}>
                Онлайн-сервис продажи<br /> и покупки лома
              </div>
            </div>
            <div className={styles.middle}>
              <div className={styles.tel}>Телефон в Москве</div>
              <div className={styles.phone}>
                <ContactPhoneSvg color={colors.white} />
                <Link href={CONTACTS.tel}>{CONTACTS.tel}</Link>
              </div>
            </div>
            <Button className={styles.btn} styleType='large' color='white' href={Routes.lkSaleRequestCreate}>
              Продать лом
            </Button>
          </div>
          <div className={styles.menus}>
            <div className={styles.menu}>
              <div className={styles.title}>
                Продавцам лома
              </div>
              <div className={styles.options}>
                {options.slice(0, 4).map((i, index) =>
                  <Link className={styles.option} key={index} href={i.link}>
                    {i.label}
                  </Link>
                )}
              </div>
            </div>
            <div className={styles.menu}>
              <div className={styles.title}>
                Ломозаготовителям
              </div>
              <div className={styles.options}>
                {options.slice(4, 7).map((i, index) =>
                  <Link className={styles.option} key={index} href={i.link}>
                    {i.label}
                  </Link>
                )}
              </div>
            </div>
            <div className={styles.menu}>
              <div className={styles.title}>
                О сервисе
              </div>
              <div className={styles.options}>
                {options.slice(7).map((i, index) =>
                  <Link className={styles.option} key={index} href={i.link}>
                    {i.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.separator}>

        </div>
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {format(new Date(), 'yyyy')} г. Все права защищены
          </div>
          <Link href={LINKS.vk} className={styles.join}>
            <div>Присоединяйтесь к нашему сообществу</div>
            <VKSvg />
          </Link>
        </div>
      </div>
    </div>
  )
}
