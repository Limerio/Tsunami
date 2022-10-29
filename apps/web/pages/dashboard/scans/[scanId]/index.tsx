import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function IndexScan() {
  const router = useRouter()

  useEffect(() => {
    router.push(router.pathname + '/view')
  }, [router])
}
