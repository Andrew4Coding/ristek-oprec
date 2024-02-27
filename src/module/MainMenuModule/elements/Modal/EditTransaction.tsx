import { Dispatch, SetStateAction, useState } from "react"
import { transactionItem } from "../../interface"

interface editModalInterface extends transactionItem{
    setOpenEditModal: Dispatch<SetStateAction<boolean>>,
    setOpenDeleteModal: Dispatch<SetStateAction<boolean>>
}
export const  EditDetailModalTransactionModal: React.FC<editModalInterface> = ({
    item,
    setOpenEditModal,
    setOpenDeleteModal
}) => {
    const date = new Date(item.date);
    return (
        <>
            <article className="p-8 flex flex-col gap-3 bg-white h-fit w-fit border-[#CCC] border-2 rounded-3xl">
                <div className="w-full flex gap-5 items-center justify-between">
                    <h1 className="font-bold text-xl">{item.name}</h1>
                </div>
                <h2 className="text-lg font-bold text-[#FB7373]">Rp{item.amount}</h2>
                <h2 className="text-sm">{date.toDateString()}</h2>
                <h2 className="text-sm font-medium text-mainGray flex gap-2">Category: 
                    <span className="font-extrabold text-mainBlue">{item.category}</span>
                </h2>
                <p className="text-sm font-semibold text-[#95979D]">
                    {item.description}
                </p>
                <div className="w-full flex gap-3">
                    <button className="bg-mainBlue px-5 py-3 w-full rounded-xl text-white font-bold text-section-content">
                        Edit
                    </button>
                    <button
                    onClick={() => {
                        setOpenDeleteModal(true);
                        setOpenEditModal(false);
                    }}
                    className="border-1 border-[#CCC] px-5 py-3 w-full rounded-xl text-[#576BEA] font-bold text-section-content">
                        Delete
                    </button>
                </div>
            </article>
        </>
    )
}