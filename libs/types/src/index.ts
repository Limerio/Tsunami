export type TUser = {
  username: string
  updateAt: Date
  createdAt: Date
  scans: TScan[]
}

export type TScan = {
  id: string
  ip: string
  user: TUser
  ports: TPortScan[]
  createdAt: Date
}

export type TPortScan = {
  port: string
  open: boolean
  type: TSystems
}

export type TSystems =
  | 'http'
  | 'mongodb'
  | 'redis'
  | 'https'
  | 'rabbitmq'
  | 'ssh'
  | 'docker'
  | 'unknown'
