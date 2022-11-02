export type TAuthLoginData = {
  user: {
    username: string
    password: string
  }
}

export type TAuthDataUpdate = {
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

export type IconProps = {
  color: string
}
