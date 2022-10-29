import { useUserContext } from '@web/contexts/user'
import { useRouter } from 'next/router'

export default function ScanView() {
  const router = useRouter()

  const { user } = useUserContext()

  const scan = user.scans.find(scan => scan.id === router.query.scanId)

  return (

  )
}
