'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { TransactionList } from "./sections/TransactionsList";
import { TotalIncome } from "./sections/TotalIncome";
import { TotalExpense } from "./sections/TotalExpense";
import { Analytics } from "./sections/Analytics";
import { Navbar } from "./elements/Navbar";
import { prisma } from "../../../prisma/prisma";

export const MainMenuModule: React.FC = () => {
    const router = useRouter();
    useEffect(() => {

        if (typeof window != 'undefined') {
            if (
                !localStorage.getItem('userEmail')
            ) {
                router.push('/authentication')
            }
        }
    })
    return (
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
    )
}