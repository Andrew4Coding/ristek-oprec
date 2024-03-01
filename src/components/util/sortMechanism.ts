import { transactionData } from "@/module/MainMenuModule/interface";
import { Dispatch, SetStateAction } from "react";

interface data {
    transactionList: transactionData[] | null,
    tempFilter: transactionData[] | null,
    setTempFilter: Dispatch<SetStateAction<transactionData[] | null>>

    searchFilter: transactionData[] | null,
    setSearchFilter: Dispatch<SetStateAction<transactionData[] | null>>

    filterTypeIndex: number
}

export default function handleFilter({
    transactionList,
    setTempFilter,
    searchFilter,
    setSearchFilter,
    filterTypeIndex }: data) {

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
            sorted = transactionList?.slice().sort((a, b) => a.amount - b.amount).reverse();
            if (sorted && searchFilter) {
                setTempFilter(
                    sorted
                );
                setSearchFilter(sorted)
            }
            break;

        case 3:
            const todayDate = new Date();

            sorted = transactionList?.filter(item => new Date(item.date).toDateString() == todayDate.toDateString());


            if (sorted && searchFilter) {
                setTempFilter(
                    sorted
                );
                setSearchFilter(sorted)
            }
            break;
        case 4:
            const today = new Date();

            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());

            const endOfWeek = new Date(today);
            endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

            sorted = transactionList?.filter(item => new Date(item.date) >= startOfWeek && new Date(item.date) <= endOfWeek)
                .slice().sort((a, b) => {
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
        default:
            break;
    }
}