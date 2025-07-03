export  interface IUser {
  id?: any | null,
  username?: string | null,
  email?: string,
  password?: string,
  roles?: Array<string>
}



export interface Login {
  email: string;
  password: string;
}