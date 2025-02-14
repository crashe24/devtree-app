export type UserType = {
    name: string;
    email: string;
    handle: string;
    _id: string;
    description:string;
    image: string;
    links: string;
}

export type UserHandle = Pick<UserType, 'description' | 'handle' | 'image' | 'links' | 'name'>
export type ProfileForm = Pick<UserType, 'handle' | 'description'>

export type RegisterForm = Pick<UserType, 'handle'| 'email'| 'name'> & {
    password: string;
    password_confirmation: string   
}

export type LoginForm = Pick<RegisterForm,'email' | 'password'>

// types para devtreelinks
export type SocialNetworkType = {
    id:number;
    name: string;
    url: string;
    enabled: boolean;
}

export type DevTreeLinkSocial = Pick<SocialNetworkType, 'name' | 'url' | 'enabled'>