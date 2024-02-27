import { TransactionCard } from "../elements/TransactionCard"
import { useEffect, useState } from "react"
import { transactionData } from "../interface"
import { Modal } from "@/components/Elements/Loader/LoadingSpin";
import { SearchBar } from "../elements/SearchBar";
import { Filter } from "../elements/Filter";

export const TransactionList: React.FC = () => {
    const [transactionList, setTransactionList] = useState<transactionData[] | null>(null);
    const [tempFilter, setTempFilter] = useState<transactionData[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [filterTypeIndex, setFilterTypeIndex] = useState(0);


    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/transactions`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            setIsLoading(false)
            setTransactionList(data.transactions.reverse());
            setTempFilter(data.transactions.reverse());
        })
    }, [])

    useEffect(() => {
        if (transactionList === null) {
            
        }

        else if (filterTypeIndex === 0) {
            const sorted = transactionList.slice().sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();

                return dateB - dateA;
            })
            setTempFilter(
                sorted
            );

        }

        else if (filterTypeIndex === 1) {
            const sorted = transactionList.slice().sort((a, b) => {
                const keyA = a.category;
                const keyB = b.category;

                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0
            })
            setTempFilter(sorted);
        }

        else if (filterTypeIndex === 2) {
            const sorted  = [...transactionList].sort((a, b) => a.amount - b.amount);
            setTempFilter(sorted.reverse());
        }

        else if (filterTypeIndex === 3) {
            const itemDate = new Date()
            const todayDate = new Date();
            setTempFilter(
                transactionList.filter(item => new Date(item.date).toDateString() === todayDate.toDateString())
            );
        }
    }, [filterTypeIndex])

    return (
        <section className="bg-white w-full lg:w-[70%] mb-20 shadow-sectionShadow rounded-sectionCorner p-8 font-Manrope text-section-title font-bold flex flex-col gap-3">
            <h3>Transactions History</h3>
            <SearchBar setState={setTempFilter} state={transactionList} />
            <Filter setState={setFilterTypeIndex} state={filterTypeIndex}/>
            <div className="overflow-y-scroll overflow-x-hidden box-border max-h-[27rem] flex flex-col gap-3 items-center">
                {
                    transactionList ? 
                    tempFilter?.map((item) => {
                        return (
                            <TransactionCard item={item} key={item.id}/>
                        )
                    })
                    :
                    <LoadingSpin size="24" fill="#576BEA"/>
                }
            </div>
        </section>
    )
}