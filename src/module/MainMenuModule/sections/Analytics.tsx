'use client'
import { Chart as ChartJS, CategoryScale, registerables, plugins } from "chart.js"
import { useContext, useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2"
import { UserTransactionsContext } from "..";
import { transactionData } from "../interface";

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


    const categories = ["Food", "Bills", "Laundry", "Education", "Transportation", "Recreational", "Health", "Technology", "Other"];

    return (
        <section className="bg-white w-full min-h-[20rem] h-full shadow-sectionShadow rounded-sectionCorner p-8 text-section-title font-bold flex flex-col gap-3 items-center">
            <h2 className="text-left w-full">Financial Analysis</h2>
            {
                (data && data.length > 0) ?
                <div className='w-full h-full max-w-[20rem]'>
                    <Doughnut
                        className=""
                        title="Hello"
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
                </div>
                :
                <p className="text-mainGray font-medium text-section-content">No charts to shows</p>
            }

        </section>
    )
}