import { TransactionCard } from "../elements/TransactionCard"
import { useContext, useEffect, useState } from "react"
import { transactionData } from "../interface"
import { LoadingSpin } from "@/components/Elements/Loader/LoadingSpin";
import { SearchBar } from "../elements/SearchBar";
import { Filter } from "../elements/Filter";
import { UserTransactionsContext } from "..";

export const TransactionList: React.FC = () => {
    const [tempFilter, setTempFilter] = useState<transactionData[] | null>(null);
    const [searchFilter, setSearchFilter] = useState<transactionData[] | null>(null)
    const [filterTypeIndex, setFilterTypeIndex] = useState(0);

    const context = useContext(UserTransactionsContext);
    const transactionList = context?.transactionList;

    useEffect(() => {
        if (transactionList && tempFilter == null){
            const sorted = transactionList?.slice().sort((a, b) => {
                const keyA = a.category;
                const keyB = b.category;
    
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0
            })
            if (sorted){
                setTempFilter(sorted);
                setSearchFilter(sorted);
            }
        }
    })

    useEffect(() => {
        if (transactionList === null || transactionList == undefined) {
            
        }

        let sorted;
        switch (filterTypeIndex) {
            case 0:
                sorted = transactionList?.slice().sort((a, b) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
    
                    return dateB - dateA;
                })
                if (sorted && searchFilter) {
                    setTempFilter(
                        sorted
                    );
                    setSearchFilter(sorted)
                }
                break;
            
            case 1:
                sorted = transactionList?.slice().sort((a, b) => {
                    const keyA = a.category;
                    const keyB = b.category;
    
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0
                })
                if (sorted && searchFilter) {
                    setTempFilter(
                        sorted
                    );
                    setSearchFilter(sorted)
                }
                break;

            case 2:
                sorted  = transactionList?.slice().sort((a, b) => a.amount - b.amount).reverse();
                if (sorted && searchFilter) {
                    setTempFilter(
                        sorted
                    );
                    setSearchFilter(sorted)
                }
                break;

            case 3:
                const todayDate = new Date();
                sorted = transactionList?.filter(item => new Date(item.date).toDateString() === todayDate.toDateString());

                if (sorted) {
                    setTempFilter(
                        sorted
                    );
                    setSearchFilter(sorted)
                }
            default:
                break;
        }
    }, [filterTypeIndex])

    return (
        <section className="bg-white w-full lg:w-[70%] mb-20 shadow-sectionShadow rounded-sectionCorner p-8 font-Manrope text-section-title font-bold flex flex-col gap-3">
            <h3>Transactions History</h3>
            {
                transactionList !== undefined &&
                <SearchBar setState={setSearchFilter} state={tempFilter} />
            }
            <Filter setState={setFilterTypeIndex} state={filterTypeIndex}/>
            <div className="overflow-y-scroll overflow-x-hidden box-border max-h-[27rem] flex flex-col gap-3 items-center">
                {
                    searchFilter ? 
                    searchFilter.map((item) => {
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