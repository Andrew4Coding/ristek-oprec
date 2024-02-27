'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react"

export const Navbar: React.FC = () => {
    const [activeTab, setActiveTab] = useState(1);

    const router = useRouter();

    function SignOut () {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userID');
        }
        
        router.push('/authentication');
    }

    return (
        <section className="w-full">

            <div className="w-full bg-white rounded-3xl flex justify-between lg:px-8 lg:py-5 lg:border-[1px] border-[#CCC]">
                <div className="hidden lg:flex gap-5 items-center">
                    <div className="w-[2rem] h-[2rem] bg-[#F5F5F5] rounded-full"></div>
                    {
                        ["Wrapped up", "Transactions", "Financial Report"].map((item, index) => {
                            return (
                                <button className="duration-500 hover:scale-105" key={index}
                                onClick={() => {
                                    setActiveTab(index);
                                }}
                                >
                                    <span className={`font-bold ${index == activeTab ? 'underline underline-offset-8 text-[#576BEA]' : 'text-[#EFEFEF]'}`}>{item}</span>
                                </button>
                            )
                        })
                    }

                </div>
                
                <button className="lg:hidden">
                    <Image src={'/hamburger.svg'} alt="" width={20} height={20} className="flex"/>
                </button>


                <div className="flex gap-5 justify-end items-center">
                    <div className="flex flex-col items-end">
                        <h2 className="font-bold text-xl">Andrew Devito</h2>
                        <h2 className="font-medium text-sm">{
                            typeof window == 'undefined' ? '' : localStorage.getItem('userEmail')
                        }</h2>
                    </div>
                    <div className="bg-[#f5f5f5] h-[3rem] w-[3rem] rounded-full"></div>
                    <button className="duration-150 hover:scale-105 hidden lg:flex"
                    onClick={() => {
                        SignOut();
                    }}
                    >
                        <Image src={'/signout.svg'} alt="" width={20} height={20} className=""/>
                    </button>
                </div>
            </div>
        </section>
    )
}