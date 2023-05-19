import styles from 'components/fields/Files/AvatarField/index.module.scss'
import { MouseEventHandler, useRef, useState } from 'react'
import classNames from 'classnames'
import useInterval from 'use-interval'
import IFile from 'data/interfaces/IFile'
import FileRepository from 'data/repositories/FileRepository'
import { Preset, SnackbarType } from 'types/enums'
import { FieldConfig, useField } from 'formik'
import LinkButton from 'components/ui/LinkButton'
import AuthRepository from 'data/repositories/AuthRepository'
import { useAppContext } from 'context/state'
import { Circle } from 'rc-progress'
import { colors } from 'styles/variables'
import { RequestError } from 'types/types'
import ImageHelper from 'utils/ImageHelper'
import usePressAndHover from '@/components/hooks/usePressAndHover'

interface Props extends FieldConfig{
  vertical: boolean
}

export default function AvatarField(props: Props) {
  const appContext = useAppContext()
  const fileInputRef = useRef<HTMLInputElement>()
  const [previewPath, setPreviewPath] = useState('')
  const [progress, setProgress] = useState(-1)
  // @ts-ignore
  const [field, meta, helpers] = useField<IFile | null>(props)
  const [avatarRef, press, hover] = usePressAndHover()

  useInterval(() => {
    if (progress > -1 && progress < 100) {
      setProgress(progress + 10)
    }
  }, 150)

  const handleDelete: MouseEventHandler = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (field.value) {
      try {
        await AuthRepository.deleteMyFile(field.value.id)
        helpers.setValue(null)
        appContext.updateAboutMe()
      } catch (err) {
        if (err instanceof RequestError) {
          appContext.showSnackbar(err.message, SnackbarType.error)
        }
      }
    }
  }

  const getText = (): React.ReactNode => {
    if (progress > -1) {
      return <div>Идет загрузка...</div>
    }
    if (field.value) {
      return <div>Можете загрузить новое <LinkButton onClick={handleDelete}>Удалить</LinkButton></div>
    }
    return <div>Загрузите фото профиля</div>
  }

  return (
    <div className={styles.root}>
      <div
        className={classNames({
          [styles.button]: true,
          [styles.vertical]: props.vertical,
        })}
      >
        <div
          ref={avatarRef}
          className={classNames({
            [styles.avatar]: true,
            [styles.vertical]: props.vertical,
          })}
          onClick={() => { fileInputRef.current?.click() }}
        >
          <div className={styles.wrapper}>
            {(previewPath && !field.value) && <img className={styles.preview} src={previewPath} alt="" />}
            {field.value && (
              <img
                className={classNames({
                  [styles.resultImage]: true,
                  [styles.hover]: hover,
                })}
                src={ImageHelper.urlFromFile(field.value, Preset.xsCrop)}
                alt=""
              />
            )}
            {(field.value && hover) && (
              <img className={styles.resultCameraIcon} src="/images/icons/camera.svg" alt="" />
            )}
            {(!previewPath && !field.value) && <img src="/images/icons/add_person.svg" alt=""/>}
            {progress > -1 && (
              <div className={styles.progress}>
                {progress}
              </div>
            )}
          </div>
          {progress > -1 && (
            <Circle percent={progress} className={styles.progressCircle} strokeWidth={4} strokeColor={colors.red500}/>
          )}
        </div>
        <div className={styles.text}>
          {getText()}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef as any}
        onChange={async (e) => {
          if (e.target.files?.length) {
            setPreviewPath(URL.createObjectURL(e.target.files[0]))
            setProgress(0)
            const fileData = await FileRepository.uploadFile(e.target.files[0])
            if (fileData) {
              setProgress(-1)
              setPreviewPath('')
              helpers.setValue(fileData)
            }
          }
        }}
        style={{display: 'none'}}
      />
    </div>
  )
}

