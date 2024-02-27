'use client'
import { useState } from "react"
import { SignIn } from "./sections/SignIn"
import { SignUp } from "./sections/SignUp"

export const AuthenticationModule: React.FC = () => {
    const [isOpenSignIn, setIsOpenSignIn] = useState(true);

    return (
        <main className="w-full h-screen flex items-center justify-center bg-[#F1F1F1] p-10">
            {
                isOpenSignIn ? 
                <SignIn setState={setIsOpenSignIn}/> 
                :
                <SignUp setState={setIsOpenSignIn}/>
            }
        </main>
    )
}