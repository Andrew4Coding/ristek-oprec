'use client'
import { Chart as ChartJS, registerables } from "chart.js"
import { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2"
import { UserTransactionsContext } from "..";
import { transactionData } from "../interface";
import { categories } from "../constant";
import { Section } from "@/components/Elements/Template/Section";

ChartJS.register(...registerables);

export const Analytics: React.FC = () => {
    const context = useContext(UserTransactionsContext);
    const [data, setData] = useState<transactionData[] | null>(null);

    useEffect(() => {
        if (context?.transactionList) {
            setData(context.transactionList);
        }
    })

    const checkSumCategory = (type: "INCOME" | "EXPENSE", category: string) => {
        const toReturn = context?.transactionList?.filter(
            item => item.category === category && item.type === type
        ).map(item => item.amount);

        const sum = toReturn?.reduce((acc, current) => acc + current, 0)

        return sum;
    }



    return (
        <Section className="flex items-center justify-center">
            <h2 className="text-left w-full">Financial Analysis</h2>
            {
                (data && data.length > 0) ?
                    <Doughnut
                        className="w-full h-full max-w-[20rem]"
                        title="Categories"
                        data={{
                            labels: categories,
                            datasets: [
                                {
                                    label: "Expense",
                                    data: categories.map(item => checkSumCategory("EXPENSE", item.toUpperCase()))
                                },
                                {
                                    label: "Income",
                                    data: categories.map(item => checkSumCategory("INCOME", item.toUpperCase()))
                                }
                            ]
                        }}
                    />
                    :
                    <p className="text-mainGray font-medium text-section-content">No charts to shows</p>
            }
        </Section>
    )
}