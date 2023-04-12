interface Props {
  className?: string
  color: string
}

export default function BookmarkSvg(props: Props) {
  return (
    <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7381 6.15368C19.7381 3.40281 17.8574 2.30005 15.1496 2.30005H8.7907C6.16614 2.30005 4.19922 3.32762 4.19922 5.97022V20.694C4.19922 21.4198 4.98017 21.877 5.61275 21.5221L11.9947 17.9422L18.3215 21.5161C18.9551 21.873 19.7381 21.4158 19.7381 20.689V6.15368Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8.26953 9.02811H15.5878" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

