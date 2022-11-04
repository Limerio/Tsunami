import { TSystems } from '@tsunami-clone/types'

export function checkSystem(port: number): TSystems {
  switch (port) {
    case 80:
      return 'http'

    case 443:
      return 'https'

    case 27017:
      return 'mongodb'

    case 5672:
      return 'rabbitmq'

    case 6379:
      return 'redis'

    case 22:
      return 'ssh'

    case 2376:
      return 'docker'

    default:
      return null
  }
}
