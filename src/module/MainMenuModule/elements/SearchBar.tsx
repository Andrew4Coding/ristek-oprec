'use client'
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"
import { Modal } from "@/components/Elements/Modal/Modal";
import { CreateTransactionModal } from "./Modal/CreateTransaction";
import { filterInterface } from "./Filter";
import { transactionData } from "../interface";

interface searchBar {
    state: transactionData[] | null,
    setState: Dispatch<SetStateAction<transactionData[] | null>>
}


export const SearchBar: React.FC<searchBar> = ({
    state, setState 
}) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <section className="flex gap-5">
            {
                openModal &&
                <Modal setState={setOpenModal}>
                    <CreateTransactionModal />
                </Modal>
            }
            <div className="w-full rounded-md text-sm bg-mainWhiteShade p-8 py-5 gap-5 font-medium flex">
                <button className="duration-150 hover:scae" onClick={() => {
                }}>
                    <Image src={'/search.svg'} alt="" width={24} height={24} />
                </button>

                <input type={
                    "text"
                } className="bg-mainWhiteShade outline-none w-full text-sm" placeholder="Search transaction"
                    onChange={(e) => {
                        if (state) {
                            const sorted = state.filter(item => item.name.toLowerCase().includes(e.target.value));
                            setState(sorted);
                        }
                    }}
                />
            </div>

            <button
                onClick={() => {
                    setOpenModal(true)
                }}
                className="w-[5rem] rounded-sectionCorner flex justify-center items-center bg-[#576BEA] text-white font-bold duration-150 hover:scale-105">  
                <Image src={'/add.svg'} alt="add" width={24} height={24} className=""/>
            </button>
        </section>
    )
}