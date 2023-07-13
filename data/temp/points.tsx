import { Gender } from "../enum/Gender";
import { UserRole } from "../enum/UserRole";

export const points = {
  data: [
    {
      title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 31',
      isDelivery: true, haveLoading: true, opens: '9', closes: '23', rating: '4.8', id: 1, phone: '+ 7 (495) 256-34-34',
      inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
      license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 0,
      zones: [{ id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }, { id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }],
      photos: ['/img/photo1.png', '/img/photo2.png', '/img/photo3.png'], reviews: [
        {
          phone: '+ 7 (495) 256-16-16', rating: 5, date: '22.01.2022г.',
          answer: 'Спасибо за добрые слова',
          comment: 'В целом, неплохой пункт приема. Взвешивают честно – проверял лично на независимых весах. Деньги выдают на кассе сразу после приемки. Из недостатков довольно высокий озвученный процент засора, который не соглашаются уменьшить даже на качественном металле, аргументируя тем, что работают с заводом официально и такой засор устанавливает им завод.'
        },
        {
          phone: '+ 7 (495) 256-16-17', rating: 3, date: '22.01.2022г.',
          answer: '',
          comment: 'Хорошая точка для сдачи лома. Есть доставка и погрузка. Цены одни из высоких в городе. '
        }
      ],
      employees: [
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
      ]
    },
    {
      title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
      isDelivery: false, haveLoading: false, rating: '4.8', alwaysOpen: true, id: 2, phone: '+ 7 (495) 256-34-34',
      inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
      license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 5,
      zones: [{ id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }, { id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }],
      photos: [], reviews: [],
      employees: [
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
      ]
    },
    {
      title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
      isDelivery: true, haveLoading: false, opens: '9', closes: '13', rating: '4.8', id: 3, phone: '+ 7 (495) 256-34-34',
      inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
      license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 0,
      zones: [{ id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }, { id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }],
      photos: [], reviews: [],
      employees: [
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
      ]
    },
    {
      title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
      isDelivery: false, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 4, phone: '+ 7 (495) 256-34-34',
      inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
      license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 0,
      zones: [{ id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }, { id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }],
      photos: [], reviews: [],
      employees: [
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
      ]
    },
    {
      title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
      isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 5, phone: '+ 7 (495) 256-34-34',
      inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
      license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 0,
      zones: [{ id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }, { id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }],
      photos: [], reviews: [],
      employees: [
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
      ]
    },
    {
      title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
      isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 6, phone: '+ 7 (495) 256-34-34',
      inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
      license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 5,
      zones: [{ id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }, { id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }],
      photos: [], reviews: [],
      employees: [
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
      ]
    },
    {
      title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
      isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 7, phone: '+ 7 (495) 256-34-34',
      inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
      license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 10,
      zones: [{ id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }, { id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }],
      photos: [], reviews: [],
      employees: [
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
      ]
    },
    {
      title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
      isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 8, phone: '+ 7 (495) 256-34-34',
      inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
      license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 10,
      zones: [{ id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }, { id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }],
      photos: [], reviews: [],
      employees: [
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
      ]
    },
    {
      title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
      isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 9, phone: '+ 7 (495) 256-34-34',
      inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
      license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 10,
      zones: [{ id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }, { id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }],
      photos: [], reviews: [],
      employees: [
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
      ]
    },
    {
      title: 'МеталлВторЧермет', price: '23000', address: 'г. Сергиев Посад, ул. Зои Космодемьянской, 32',
      isDelivery: true, haveLoading: true, opens: '9', closes: '13', rating: '4.8', id: 10, phone: '+ 7 (495) 256-34-34',
      inn: '7714886683', entity: 'ООО «Лебедев и Партнеры»', ogrn: '1127747034040', legalAddress: '123290, город Москва, тупик Магистральный 1-й, дом 5А, оф. D504, к.8',
      license: 'http://ncz.tj/system/files/Legislation/2_ru.pdf', dealsPerMonth: 10,
      zones: [{ id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }, { id: 1, distance: 'От 1 до 20 км', price: '1 000 ₽/т' }],
      photos: [], reviews: [],
      employees: [
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
        {
          id: '1',
          role: UserRole.Buyer,
          phone: '',
          login: '',
          name: 'Валерий Федоров',
          companyName: '«МеталлВторЧермет»',
          isRegistered: true,
          email: 'v.fedor@gmail.com',
          gender: Gender.male,
          password: '',
          readedNotifications: []
        },
      ]
    },
  ],
  total: 100,
  page: 1
}