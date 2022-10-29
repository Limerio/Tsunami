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
}

export type TPortScan = {
  port: string
}
