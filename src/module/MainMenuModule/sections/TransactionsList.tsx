"use client";
import { TransactionCard } from "../elements/TransactionCard";
import { useContext, useEffect, useState } from "react";
import { transactionData } from "../interface";
import { LoadingSpin } from "@/components/Elements/Loader/LoadingSpin";
import { SearchBar } from "../elements/SearchBar";
import { Filter } from "../elements/Filter";
import { UserTransactionsContext } from "..";
import handleFilter from "@/components/util/filter";
import { Section } from "@/components/Elements/Template/Section";

export const TransactionList: React.FC = () => {
    const [tempFilter, setTempFilter] = useState<transactionData[] | null>(null);
    const [searchFilter, setSearchFilter] = useState<transactionData[] | null>(
        null,
    );
    const [isAscending, setIsAscending] = useState<boolean>(true)

    const [filterTypeIndex, setFilterTypeIndex] = useState(0);

    const context = useContext(UserTransactionsContext);
    const transactionList = context?.transactionList;

    useEffect(() => {
        if (transactionList && tempFilter == null) {
            const sorted = transactionList?.slice().sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();

                return dateB - dateA;
            });
            if (sorted) {
                setTempFilter(sorted);
                setSearchFilter(sorted);
                setIsAscending(false);
            }
        }
    });

    useEffect(() => {
        if (transactionList) {
            handleFilter({
                transactionList,
                tempFilter,
                setTempFilter,
                searchFilter,
                setSearchFilter,
                filterTypeIndex,
                isAscending
            });
        }
    }, [filterTypeIndex, isAscending]);

    return (
        <Section className="min-h-full w-full lg:w-[70%] gap-3">
            <h3>Transactions History</h3>
            <SearchBar setState={setSearchFilter} state={tempFilter} />
            <Filter setFilterIndex={setFilterTypeIndex} setIsAscending={setIsAscending} />
            <div className="overflow-y-scroll overflow-x-hidden box-border max-h-[33rem] rounded-sectionCorner flex flex-col gap-3 items-center">
                {!transactionList ||
                    (transactionList.length == 0 && (
                        <p className="text-mainGray font-medium text-section-content">
                            No transactions, click + to add transactions
                        </p>
                    ))}
                {transactionList ? (
                    searchFilter?.map((item) => {
                        return <TransactionCard item={item} key={item.id} />;
                    })
                ) : (
                    <LoadingSpin size="24" fill="#576BEA" />
                )}
            </div>
        </Section>
    );
};
