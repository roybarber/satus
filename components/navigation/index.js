import cn from 'clsx'
import { useLayoutEffect } from 'hooks/use-isomorphic-layout-effect'
import { useStore } from 'lib/store'
import Link from 'next/link'
import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'
import s from './navigation.module.scss'

export const Navigation = () => {
  const [navIsOpen, setNavIsOpen] = useStore(
    (state) => [state.navIsOpen, state.setNavIsOpen],
    shallow
  )

  const router = useRouter()

  useLayoutEffect(() => {
    const onRouteChange = () => {
      setNavIsOpen(false)
    }

    router.events.on('routeChangeStart', onRouteChange)

    return () => {
      router.events.off('routeChangeStart', onRouteChange)
    }
  }, [])

  return (
    <div className={cn(s.navigation, !navIsOpen && s['navigation--closed'])}>
      <Link href="/">
        <a>home</a>
      </Link>
      <Link href="/contact">
        <a>contact</a>
      </Link>
    </div>
  )
}
