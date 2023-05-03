import React, { useCallback, useMemo } from 'react'
import { useField } from 'formik'
import Dropzone from 'react-dropzone'
import { FileUploadAcceptType } from '@/types/enums'
import { IField } from '@/types/types'
import styles from './index.module.scss'
import AddImageSvg from '@/components/svg/AddImageSvg'
import { colors } from '@/styles/variables'
import Converter from '@/utils/converter'

export interface FileFieldProps<T> extends IField<T> {
  accept?: FileUploadAcceptType[]
  multiple?: boolean,
  label?: string
  maxFiles: number
  text: React.ReactNode
}

const FileField = (props: any & FileFieldProps<string | string[]>) => {

  const [field, meta, helpers] = useField(props)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      helpers.setValue(acceptedFiles)
    },
    [helpers]
  )

  const { accept, multiple = false, maxFiles = 1 } = props

  let arr: string[] = []

  return (
    <div className={styles.root}>
      {props.label ? <div className={styles.label}>
        {props.label}
      </div> : null}
      <Dropzone onDrop={onDrop} accept={useMemo(() => {
        (accept)?.forEach((i: FileUploadAcceptType) => { arr = [...arr, ...Converter.getFileUploadAccept(i)] })
        return { '': arr }
      }, [accept])} multiple={multiple} maxFiles={maxFiles}>
        {({ getRootProps, getInputProps }) => (
          <section className={styles.section}>
            <div className={styles.content} {...getRootProps()}>
              <input {...getInputProps()} />
              <AddImageSvg color={colors.grey500} />
              <div className={styles.text}>
                {props.text}
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      {field.value && (
        <div>
          {Array.isArray(field.value)
            ? field.value.map((file) => (
              <div key={file.name}>
                <p>
                  {file.name} - {file.size} bytes
                </p>
                <img src={URL.createObjectURL(file)} alt={file.name} />
              </div>
            ))
            : (
              <div>
                <img src={URL.createObjectURL(field.value)} alt={field.value.name} />
              </div>
            )}
        </div>
      )}
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  )
}

export default FileField
