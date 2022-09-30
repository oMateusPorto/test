import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface IUser {
    id: string,
    login: string,
    password?: string,
    CreatedAt: string
}

export const initialUser = {
    id: uuidv4(),
    login: '',
    password: '',
    CreatedAt: Date()
}

export type UserContextType = {
    user: IUser,
    updateUser: (user: IUser) => void
}

export const UserContext = createContext<UserContextType | null>(null)

const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [user, setUser] = useState<IUser>(initialUser)

    const updateUser = (input: IUser) => {
        setUser(input)
        localStorage.setItem("user", JSON.stringify(input));
    }

    useEffect(() => {
        const userStorage = localStorage.getItem("user")
        if (userStorage) {
            setUser(JSON.parse(userStorage))
        } else {
            setUser(user)
        }
    },[])


    return (
        <UserContext.Provider value={{
            user,
            updateUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
