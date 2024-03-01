import { useState } from "react";
import { authModalInterface, authModalSignInterface, signUpInterface } from "../interface";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const SignUp: React.FC<authModalInterface> = ({ setState }) => {
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [userSignData, setUserSignData] = useState<signUpInterface>({
        email: '',
        password: '',
        name: ''
    })
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    function SignUp() {
        setIsLoading(true);
        fetch(`api/authentication/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userSignData)
        }).then(res => {
            return res.json();
        }).then(data => {
            setIsLoading(false)
            if (data.message && data.status == "error") {
                setErrorMessage(data.message);
            }
            else {
                setErrorMessage('');
                if (typeof window !== 'undefined'){
                    localStorage.setItem('userName', data.user.name)
                    localStorage.setItem('userEmail', userSignData.email)
                    localStorage.setItem('userID', data.user.id)
                    localStorage.setItem('sessionToken', data.token)
                }
                router.push('/');
            }
        })
    }


    return (
        <article className="bg-white rounded-sectionCorner shadow-sectionShadow p-10 flex flex-col gap-5 w-[25rem]">
            <h2 className="font-bold text-3xl">
                Sign Up
            </h2>
            <input type="text" className="w-full rounded-md text-sm outline-none  bg-[#F6F6F6] p-5 font-medium" placeholder="Username"
                onChange={(e) => {
                    setUserSignData(
                        {
                            ...userSignData,
                            name: e.target.value
                        }
                    )
                }}
            />
            
            <input type="text" className="w-full rounded-md text-sm outline-none  bg-[#F6F6F6] p-5 font-medium" placeholder="Email"
                onChange={(e) => {
                    setUserSignData(
                        {
                            ...userSignData,
                            email: e.target.value
                        }
                    )
                }}
            />

            <div className="w-full rounded-md text-sm bg-[#F6F6F6] p-5 font-medium flex">
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
            <div className="w-full rounded-md text-sm bg-[#F6F6F6] p-5 font-medium flex">
                <input type={
                    isShowPassword ? "password" : "text"
                } className="outline-none bg-[#f6f6f6] w-full" placeholder="Confirm Password"
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
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
            {
                errorMessage != '' &&
                <p className="text-xs font-bold text-mainRed">* {errorMessage}</p>
            }
            <button
                onClick={() => {
                    if (confirmPassword != userSignData.password) {
                        setErrorMessage('Passwords not matched')
                    }
                    else if (userSignData.name == '' || confirmPassword == ''|| userSignData.email == '' || userSignData.password == ''){
                        setErrorMessage('Fields can not be empty')
                    }
                    else if (!userSignData.email.endsWith("@gmail.com")){
                        setErrorMessage('Not a valid email')
                    }
                    else {
                        SignUp();
                    }
                }}
                className="w-full rounded-md text-sm p-5 bg-[#576BEA] text-white font-bold duration-200 hover:scale-105 flex justify-center gap-5">
                {
                    isLoading &&
                        <Image src={'/loading.svg'} alt="" width={20} height={20} className="animate-spin" />
                }
                <span>
                    Create
                </span>
            </button>

            <button
                onClick={() => {
                    setState(true);
                }}
                className="text-xs font-medium text-center underline underline-offset-4 duration-200 hover:scale-105 hover:font-bold">
                Have an Account? Sign in here
            </button>
        </article>
    )
}