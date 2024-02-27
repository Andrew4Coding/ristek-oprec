import { Dispatch, SetStateAction } from "react"

interface deleteModalInterface {
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const DeleteModal: React.FC<deleteModalInterface> = ({
    setOpenModal
}) => {
    function deleteTransaction() {
        fetch(`/api/authentication`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', // Header yang diperlukan sesuai kebutuhan
            },
            body: JSON.stringify({
                id: 2
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
        })
    }

    return (
        <article className="p-8 flex flex-col gap-3 bg-white h-fit w-fit border-[#CCC] border-2 rounded-3xl">
            <h1 className="font-bold text-xl">Delete Transaction?</h1>
            <div className="w-full flex gap-3">
                <button
                    onClick={() => {
                        deleteTransaction();
                    }}
                    className="w-full bg-mainRed text-white py-3 rounded-xl font-bold duration-300 hover:scale-105">
                    Yes
                </button>
                <button
                    onClick={() => {
                        setOpenModal(false);
                    }}
                    className="w-full border-1 border-mainGray text-mainBlue py-3 rounded-xl font-bold duration-300 hover:scale-105">
                    Cancel
                </button>
            </div>
        </article>
    )
}