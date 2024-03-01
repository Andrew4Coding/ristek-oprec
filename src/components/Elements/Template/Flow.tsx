'use client'
import { useContext, useEffect, useState } from "react";
import { thousandSeparator } from "@/components/util/thousandSeparator";
import { UserTransactionsContext } from "@/module/MainMenuModule";

export const Flow: React.FC<{
    type: "INCOME" | "EXPENSE",
}> = ({type}) => {
    const context = useContext(UserTransactionsContext);
    const [nominal, setNominal] = useState(0);

    useEffect(() => {
        if (context?.transactionList) {
            const incomeList = context?.tempFilter?.filter(item => item.type === type).map(item => item.amount);
            const sum = incomeList?.reduce((acc, current) => acc + current, 0)

            if (sum) {
                setNominal(sum);
            }

        }
    })

    return (
        <section className="bg-white w-full h-fit shadow-sectionShadow rounded-sectionCorner p-8 text-section-title font-bold flex flex-col gap-2">
            <h1 className="text-section-title">Total {type === "INCOME" ? "Income" : "Expense"}</h1>
            <div className="flex items-center gap-5">
                <h3 className="text-section-title text-mainGray">RP</h3>
                <h1 className={`text-price-title font-extrabold max-w-full line-clamp-1 overflow-x-scroll sm:overflow-hidden ${type === "INCOME" ? "text-mainGreen" : "text-mainRed"}`}>{
                   thousandSeparator(nominal.toString())
                }</h1>
            </div>
        </section>
    )
}