import { Dispatch, SetStateAction, useState } from "react"
import { transactionItem } from "../../interface"
import { thousandSeparator } from "@/components/util/thousandSeparator";

interface editModalInterface extends transactionItem {
    setOpenDetailModal: Dispatch<SetStateAction<boolean>>,
    setOpenDeleteModal: Dispatch<SetStateAction<boolean>>,
    setOpenEditModal: Dispatch<SetStateAction<boolean>>
}
export const DetailModal: React.FC<editModalInterface> = ({
    item,
    setOpenDetailModal,
    setOpenDeleteModal,
    setOpenEditModal,
}) => {
    const date = new Date(item.date);
    return (
        <>
            <article className="p-8 flex flex-col gap-3 bg-white h-fit min-w-[20rem] border-[#CCC] border-2 rounded-3xl">
                <div className="w-full flex gap-5 items-center justify-between">
                    <h1 className="font-bold text-section-title">{item.name}</h1>
                </div>
                <h2 className="text-price-title font-bold text-[#FB7373]">Rp{
                    thousandSeparator(item.amount.toString())
                }</h2>
                <h2 className="text-sm text-mainGray">{date.toDateString()}</h2>
                <h2 className="text-sm font-medium text-mainGray flex gap-2">Category:
                    <span className="font-extrabold text-mainBlue">{item.category}</span>
                </h2>
                <p className="text-sm font-semibold text-[#95979D]">
                    {item.description}
                </p>
                <div className="w-full flex gap-3">
                    <button
                        onClick={() => {
                            setOpenEditModal(true);
                            setOpenDetailModal(false);
                        }}
                        className="bg-mainBlue px-5 py-3 w-full rounded-xl text-white font-bold text-section-content duration-300 hover:scale-105">
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            setOpenDeleteModal(true);
                            setOpenDetailModal(false);
                        }}
                        className="border-[1px] border-mainGray px-5 py-3 w-full rounded-xl text-[#576BEA] font-bold text-section-content duration-300 hover:scale-105">
                        Delete
                    </button>
                </div>
            </article>
        </>
    )
}