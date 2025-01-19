export type UserType = {
    name: string;
    email: string;
    handle: string;
   
}

export type RegisterForm = Pick<UserType, 'handle'| 'email'| 'name'> & {
    password: string;
    password_confirmation: string   
}

export type LoginForm = Pick<RegisterForm,'email' | 'password'>