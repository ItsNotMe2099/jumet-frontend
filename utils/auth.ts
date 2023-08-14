import nookies from 'nookies'

import { CookiesType } from '../types/enums'
import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next/types'
import IAboutMe from '@/data/interfaces/IAboutMe'
import AuthRepository from '@/data/repositories/AuthRepository'
import {Routes} from '@/types/routes'
import {UserRole} from '@/data/enum/UserRole'
import {GetServerSideProps} from 'next'

export const getToken = (): string | undefined => {
  const cookies = nookies.get(null)
  return cookies[CookiesType.accessToken]
}


export  function getAuthServerSideProps<Props extends { [key: string]: any } = { [key: string]: any }>(userRole?: UserRole, cb?: GetServerSideProps<Props>): GetServerSideProps<Props >{
 return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
   const token = context.req.cookies[CookiesType.accessToken]
   let user: IAboutMe | null = null
   try {
     user = token ? await AuthRepository.fetchAboutMe(token) : null
   } catch (e) {
   }
   if (!token || !user) {
      return {
       redirect: {
         permanent: false,
         destination: Routes.login(context.resolvedUrl),
       },
     }
   }
   if (userRole && user.role !== userRole) {
     return {
       notFound: true
     }
   }

   if(cb){
     return cb(context)
   }
   return {
     props: {} as Props,
   }
 }
}
