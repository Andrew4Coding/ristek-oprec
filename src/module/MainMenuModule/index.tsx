'use client'
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"
import { TransactionList } from "./sections/TransactionsList";
import { TotalIncome } from "./sections/TotalIncome";
import { TotalExpense } from "./sections/TotalExpense";
import { Analytics } from "./sections/Analytics";
import { Navbar } from "./elements/Navbar";
import { transactionData } from "./interface";

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
                !localStorage.getItem('userEmail')
            ) {
                router.push('/authentication')
            }
        }

        setIsLoading(true);
        fetch(`/api/transactions`, {
            method: "GET",
        }).then(res => {
            return res.json();
        }).then(data => {
            setIsLoading(false)
            setTransactionList(data.transactions.reverse());
            setTempFilter(data.transactions.reverse());
        })
    }, [])

    return (
        <UserTransactionsContext.Provider value={{isLoading, transactionList, tempFilter, setTempFilter}}>
            <main className="px-10 py-10 lg:px-20 lg:py-12 w-full flex flex-col gap-8">
                <Navbar />
                <div className="w-full flex gap-8">
                    <div className="flex-grow-0 lg:flex-grow flex flex-col gap-5">
                        <TotalExpense />
                        <TotalIncome />
                        <Analytics />
                    </div>
                    <TransactionList />
                </div>
            </main>
        </UserTransactionsContext.Provider>
    )
}