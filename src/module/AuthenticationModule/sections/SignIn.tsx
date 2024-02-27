import { useState } from "react";
import { authModalInterface, authModalSignInterface } from "../interface";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const SignIn: React.FC<authModalInterface> = ({ setState }) => {
    const [isShowPassword, setIsShowPassword] = useState(true);

    const [userSignData, setUserSignData] = useState<authModalSignInterface>({
        email: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    function SignIn() {
        setIsLoading(true);
        fetch(`/api/authentication/signin`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...userSignData
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            setIsLoading(false);
            if (data.message && data.status == "error") {
                setErrorMessage(data.message);
            }
            else {
                setErrorMessage('');
                if (typeof window !== 'undefined'){
                    localStorage.setItem('userEmail', userSignData.email)
                    localStorage.setItem('userID', data.user.id)
                }
                router.push('/');
            }

        })
    }

    return (
        <article className="bg-white border-2 border-[#CCC] rounded-2xl p-10 flex flex-col gap-5 w-[25rem]">
            <h2 className="font-bold text-3xl">
                Sign In
            </h2>

            <input type="email" className="w-full rounded-md text-sm outline-none  bg-[#F6F6F6] p-5 font-medium border-[1px] border-[#CCC]" placeholder="Email"
                onChange={(e) => {
                    setUserSignData({
                        ...userSignData,
                        email: e.target.value
                    })
                }}
            />

            <div className="w-full rounded-md text-sm bg-[#F6F6F6] p-5 font-medium border-[1px] border-[#CCC] flex">
                <input type={
                    isShowPassword ? "password" : "text"
                } className="outline-none bg-[#f6f6f6] w-full" placeholder="Password"
                    onChange={(e) => {
                        setUserSignData({
                            ...userSignData,
                            password: e.target.value
                        })
                    }}
                />
                <button className="duration-150 hover:scae" onClick={() => {
                    setIsShowPassword(!isShowPassword);
                }}>
                    <span className="underline underline-offset-4 text-xs">
                        {
                            isShowPassword ? "Show" : "Hide"
                        }
                    </span>
                </button>
            </div>
            <button
                onClick={() => {
                    if (userSignData.email != '' && userSignData.email != '') {
                        SignIn();
                    }
                    else {
                        setErrorMessage('Email and Password should not be empty')
                    }
                }}
                className="w-full rounded-md text-sm p-5 bg-[#576BEA] text-white font-bold duration-200 hover:scale-105 flex justify-center gap-5">
                {
                    isLoading ?
                        <Image src={'/loading.svg'} alt="" width={20} height={20} className="animate-spin" />
                        :
                        null
                }
                <span>
                    Continue
                </span>
            </button>
            {
                errorMessage != '' &&
                <p className="text-xs font-bold text-mainRed">* {errorMessage}</p>
            }

            <button
                onClick={() => { setState(false) }}
                className="text-xs font-medium text-center underline underline-offset-4 duration-200 hover:scale-105 hover:font-bold">
                Do not have an account? Sign up now.
            </button>
        </article>
    )
}