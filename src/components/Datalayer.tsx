import { sendGTMEvent } from '@next/third-parties/google'
import { usePathname } from 'next/navigation'
import { useLayoutEffect, useRef } from 'react'

const Datalayer = () => {
  const pathname = usePathname() ?? ''
  const originalLocation = useRef(pathname)
  useLayoutEffect(() => {
    sendGTMEvent({
      event: 'originalLocation',
      virtualUrl: originalLocation.current,
    })
    sendGTMEvent({
      event: 'GAVirtual',
      virtualUrl: pathname,
    })
  }, [pathname])
  return <></>
}

export default Datalayer
