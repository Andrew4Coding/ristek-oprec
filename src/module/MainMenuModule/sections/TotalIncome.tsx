import { useContext, useEffect, useState } from "react"
import { UserTransactionsContext } from ".."
import { thousandSeparator } from "@/components/util/thousandSeparator";

export const TotalIncome: React.FC = () => {
    const context = useContext(UserTransactionsContext);
    const [nominal, setNominal] = useState(0);

    useEffect(() => {
        if (context?.transactionList) {
            const incomeList = context?.tempFilter?.filter(item => item.type === "INCOME").map(item => item.amount);
            const sum = incomeList?.reduce((acc, current) => acc + current, 0)

            if (sum) {
                setNominal(sum);
            }

        }
    })
    return (
        <section className="bg-white w-full h-fit shadow-sectionShadow rounded-sectionCorner p-5 font-Manrope text-section-title font-bold flex flex-col gap-2">
            <h1 className="text-section-title">Total Income</h1>
            <div className="flex items-center gap-5">
                <h3 className="text-section-title text-mainGray">RP</h3>
                <h1 className="text-price-title font-extrabold text-mainGreen">{
                   thousandSeparator(nominal.toString())
                }</h1>
            </div>
        </section>
    )
}