'use client'
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"
import { TransactionList } from "./sections/TransactionsList";
import { Analytics } from "./sections/Analytics";
import { Navbar } from "./elements/Navbar";
import { transactionData } from "./interface";
import { Flow } from "@/components/Elements/Template/Flow";

export const UserTransactionsContext = createContext<{
    transactionList: transactionData[] | null,
    tempFilter: transactionData[] | null,
    setTempFilter: Dispatch<SetStateAction<transactionData[] | null>>
    isLoading: boolean,

} | null>(null);

export const MainMenuModule: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [transactionList, setTransactionList] = useState<transactionData[] | null>(null);
    const [tempFilter, setTempFilter] = useState<transactionData[] | null>(null);

    useEffect(() => {
        if (typeof window != 'undefined') {
            if (
                !localStorage.getItem('sessionToken')
            ) {
                router.push('/authentication')
            }
        }

        setIsLoading(true);
        fetch(`/api/transactions/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('sessionToken')}`
              }
        }).then(res => {
            return res.json();
        }).then(data => {
            setIsLoading(false)
            setTransactionList(data.transactions.reverse());
            setTempFilter(data.transactions.reverse());
        }).catch(e => {
            console.log(e)
        })
    }, [])

    return (
        <UserTransactionsContext.Provider value={{isLoading, transactionList, tempFilter, setTempFilter}}>
            <main className="px-5  py-10 lg:py-20 lg:pt-10 lg:px-20 w-full flex flex-col gap-5 ">
                <Navbar />
                <div className="w-full flex flex-col lg:flex-row gap-5">
                    <div className="flex-grow-0 lg:flex-grow flex flex-col gap-5">
                        <div className="flex-grow-0 lg:flex-grow flex flex-col sm:flex-row lg:flex-col gap-5">
                            <Flow type="EXPENSE"/>
                            <Flow type="INCOME"/>
                        </div>
                        <Analytics />
                    </div>
                    <TransactionList />
                </div>
            </main>
        </UserTransactionsContext.Provider>
    )
}