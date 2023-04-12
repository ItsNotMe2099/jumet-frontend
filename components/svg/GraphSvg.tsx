interface Props {
  className?: string
  color: string
}

export default function GraphSvg(props: Props) {
  return (
    <svg className={props.className} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5359 15.259C20.371 15.259 21.0718 15.9325 20.9442 16.7385C20.1951 21.4797 16.0421 25 11.0333 25C5.49167 25 1 20.6101 1 15.1954C1 10.7342 4.46776 6.57863 8.37191 5.63903C9.21084 5.4366 10.0706 6.01334 10.0706 6.85745C10.0706 12.5765 10.2673 14.0559 11.3785 14.8605C12.4897 15.6652 13.7963 15.259 19.5359 15.259Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9983 10.4965C25.0648 6.82219 20.4467 0.899444 14.8191 1.0013C14.3814 1.00894 14.031 1.36542 14.0114 1.79193C13.8695 4.81314 14.0609 8.72811 14.1678 10.5029C14.2003 11.0554 14.6445 11.4896 15.2086 11.5214C17.0754 11.6258 21.227 11.7684 24.274 11.3177C24.6883 11.2566 24.9918 10.9052 24.9983 10.4965Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

