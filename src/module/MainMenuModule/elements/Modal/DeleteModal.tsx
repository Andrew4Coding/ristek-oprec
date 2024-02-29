import { Dispatch, SetStateAction, useState } from "react"
import { transactionData } from "../../interface"
import { useRouter } from "next/navigation"
import { LoadingSpin } from "@/components/Elements/Loader/LoadingSpin"

interface deleteModalInterface {
    setOpenModal: Dispatch<SetStateAction<boolean>>
    item: transactionData
}

export const DeleteModal: React.FC<deleteModalInterface> = ({
    setOpenModal, item
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const deleteTransaction = async () => {
        setIsLoading(true);
        fetch(`/api/transactions/`, {
            method: 'DELETE',
            body: JSON.stringify({
                id: item.id
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            setIsLoading(false);
            router.refresh();
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <article className="p-8 flex flex-col items-center justify-center gap-3 bg-white h-fit w-fit border-[#CCC] border-2 rounded-sectionCorner">
            <h1 className="font-bold text-section-title">Delete Transaction?</h1>
            {
                isLoading && <LoadingSpin size="20" fill="#FB7373" className=""/>
            }
            <div className="w-full flex gap-3 text-section-content">
                <button
                    onClick={() => {
                        deleteTransaction();
                        setOpenModal(false);
                    }}
                    className="w-full bg-mainRed text-white py-3 rounded-xl font-bold duration-300 hover:scale-105">
                    Yes
                </button>
                <button
                    onClick={() => {
                        setOpenModal(false);
                    }}
                    className="w-full border-[0.5px] border-mainGray text-mainBlue py-3 rounded-xl font-bold duration-300 hover:scale-105">
                    Cancel
                </button>
            </div>
        </article>
    )
}