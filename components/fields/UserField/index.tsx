import React, {useRef} from 'react'
import {IField, IOption, Nullable} from '@/types/types'
import SelectField from '@/components/fields/SelectField'
import UserUtils from '@/utils/UserUtils'
import EmployeeRepository from '@/data/repositories/EmployeeRepository'


interface Props extends IField<string | null> {
  resettable?: boolean
  onChange: (value: Nullable<string>) => void
}

export default function UserField(props: Props) {
  const abortControllerRef = useRef<AbortController | null>(null)

  const loadOptions = async (search: string, loadedOptions: IOption<string | null>[], data: any): Promise<{options: IOption<string | null>[], hasMore: boolean, additional?: any | null}> => {
   const page = data.page
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    const res = await EmployeeRepository.fetch({
      limit: 5,
      page,
    }, {signal: abortControllerRef.current?.signal})
      const hasMore = res.total > res.data.length + loadedOptions.length
      return {
        options: res.data.map(i => ({
          label: UserUtils.getName(i) || i.email,
          value: i.id
        })),
        hasMore: hasMore,
        additional: {
          page: (page ?? 0) + 1
        }
      }
}


  return (
   <SelectField<number | null> {...props as any}  async={true} loadOptions={loadOptions} options={[]} initialAsyncData={{page: 1}}/>
   )
}

