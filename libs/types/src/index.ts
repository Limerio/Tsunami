export type TUser = {
  username: string
  updateAt: Date
  createdAt: Date
}

export type TScan = {
  ip: string
  user: TUser
  ports: TPortScan[]
}

export type TPortScan = {
  port: string
}
