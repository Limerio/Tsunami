export type TAuthLoginData = {
  user: {
    username: string
    password: string
  }
}

export type TAuthRegisterData = {
  user: {
    username: string
    password: string
    confirmPassword: string
  }
}
