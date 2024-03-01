'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Navbar: React.FC = () => {
    const router = useRouter();

    function SignOut () {
        if (typeof window !== 'undefined') {
            localStorage.clear();
        }
        
        router.push('/authentication');
    }

    return (
        <section className="w-full">
            <div className="w-full bg-white rounded-3xl flex justify-end lg:px-8 lg:py-5">                
                <div className="flex gap-5 justify-end items-center">
                    <div className="flex flex-col items-end">
                        <h2 className="font-bold text-section-title">
                            {
                                typeof window == 'undefined' ? '' : localStorage.getItem('userName')
                            }
                        </h2>
                        <h2 className="font-medium text-section-subtitle">{
                            typeof window == 'undefined' ? '' : localStorage.getItem('userEmail')
                        }</h2>
                    </div>
                    <Image 
                        src={'/chipi.jpg'}
                        alt=""
                        width={20}
                        height={20}
                        className="rounded-full w-[3rem] h-[3rem] object-cover"
                    />
                    <button className="duration-150 hover:scale-105"
                    onClick={() => {
                        SignOut();
                    }}
                    >
                        <Image src={'/signout.svg'} alt="" width={20} height={20} className="w-auto h-auto"/>
                    </button>
                </div>
            </div>
        </section>
    )
}