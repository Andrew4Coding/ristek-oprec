'use client'
import Image from "next/image"
import { transactionItem } from "../interface"
import { useState } from "react";
import { DetailModal } from "./Modal/DetailModal";
import { Modal } from "@/components/Elements/Modal/Modal";
import { DeleteModal } from "./Modal/DeleteModal";
import { thousandSeparator } from "@/components/util/thousandSeparator";
import { EditModal } from "./Modal/EditModal";

export const TransactionCard: React.FC<transactionItem> = ({
    item
}) => {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    const date = new Date(item.date);
    const dateString = date.toDateString();
    return (
        <>
            {
                openModal &&
                <Modal setState={setOpenModal}>
                    <DetailModal 
                    setOpenDeleteModal={setOpenDeleteModal} 
                    setOpenDetailModal={setOpenModal}
                    setOpenEditModal={setOpenEditModal}
                    item={item} 
                    />
                </Modal>
            }
            {
                openDeleteModal && <Modal setState={setOpenDeleteModal}>
                    <DeleteModal setOpenModal={setOpenDeleteModal} item={item}/>
                </Modal>
            }
            {
                openEditModal && <Modal setState={setOpenEditModal}>
                    <EditModal item={item} setOpenModal={setOpenEditModal}/>
                </Modal>
            }
            <div
                onClick={() => {
                    setOpenModal(true)
                }}

                className="w-full bg-mainWhiteShade duration-500 hover:scale-[101%] hover:bg-[#F1F1F1] rounded-xl flex items-center p-5 lg:px-8 lg:py-5">

                <div className="w-[3rem] h-[3rem] flex items-center justify-center bg-mainWhite rounded-full mr-[33%]">
                    <Image src={`/${item.category}.svg`} alt="" width={22} height={22} className=""/>
                </div>

                <div className="flex flex-col mr-auto">
                    <h1 className="font-bold text-xs lg:text-sm ">{item.name}</h1>
                    <h3 className="font-semibold text-[#95979D] text-sm ">{dateString}</h3>
                </div>
                <h2 className={`font-bold text-section-subtitle text-right ${item.type == 'EXPENSE' ? 'text-mainRed' : 'text-mainGreen'}`}>
                    {
                        item.type == 'EXPENSE' ? '-' : '+'
                    }
                    Rp {
                        thousandSeparator(item.amount.toString())
                    }
                    
                </h2>
            </div>

        </>
    )
}