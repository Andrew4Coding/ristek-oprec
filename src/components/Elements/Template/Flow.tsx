'use client'
import { useContext, useEffect, useState } from "react";
import { UserTransactionsContext } from "@/module/MainMenuModule";
import { CountUp } from "@/components/util/countup";
import { Section } from "./Section";

export const Flow: React.FC<{
    type: "INCOME" | "EXPENSE",
}> = ({ type }) => {
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
        <Section className="num w-full">
            <h1 className="text-section-title">Total {type === "INCOME" ? "Income" : "Expense"}</h1>
            <div className="flex items-center gap-5">
                <h3 className="text-section-title text-mainGray">RP</h3>
                <h2 className={`text-price-title font-extrabold ${type === "INCOME" ? "text-mainGreen" : "text-mainRed"}`}>{
                    type === "INCOME" ? "+" : "-"
                }</h2>
                <CountUp digit={nominal} className={`text-price-title font-extrabold max-w-full line-clamp-1 overflow-x-scroll sm:overflow-hidden ${type === "INCOME" ? "text-mainGreen" : "text-mainRed"}`} />
            </div>
        </Section>
    )
}