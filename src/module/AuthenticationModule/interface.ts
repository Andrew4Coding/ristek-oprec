import { Dispatch, SetStateAction } from "react";

export interface authModalInterface {
    setState: Dispatch<SetStateAction<boolean>>
}


export interface authModalSignInterface {
    email: string,
    password: string,
}

export interface signUpInterface extends authModalSignInterface {
    name: string
}