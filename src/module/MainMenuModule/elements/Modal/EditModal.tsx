import MyDatePicker from "@/components/Elements/Calendar/Calendar"; 

import { Dispatch, SetStateAction, useState } from "react"
import { useRouter } from "next/navigation";
import { LoadingSpin } from "@/components/Elements/Loader/LoadingSpin";

interface editTransaction {
    id: number,
    name: string,
    amount: number,
    description: string,
    category: string,
    date: Date | null,
    type: "EXPENSE" | "INCOME"
}

export const EditModal: React.FC<{
    item: editTransaction, setOpenModal: Dispatch<SetStateAction<boolean>>
}> = ({item, setOpenModal}) => {
    // Router
    const router = useRouter();

    // State management
    const [transactionType, setTransactionType] = useState(item.type);
    const [selectedDate, setSelectedDate] = useState<Date | null>(item.date);
    const [EditTransaction, setEditTransaction] = useState<editTransaction>({
        id: item.id,
        name: item.name,
        amount: item.amount,
        description: item.description,
        date: item.date,
        category: item.category,
        type: item.type
    })

    // IsLoading State
    const [isLoading, setIsLoading] = useState(false);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setEditTransaction(
            {
                ... EditTransaction,
                date: date
            }
        )
    }

    function editTransaction() {
        let userId = '1';
        if (typeof window !== 'undefined'){
            let userId = localStorage.getItem('userId');
        }   

        setIsLoading(true)

        fetch(`/api/transactions`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                ...EditTransaction,
                type: transactionType,
                id: item.id
            })
        }).then(res => {
            return res.json();
        }).then(data => {   
            if (data.status === 'ok') {
                setDoneEdit("ok");
                setOpenModal(false);   
            }
            else {
                setDoneEdit("error")
            }
            setIsLoading(false)

        }).catch(e => {
            console.log(e)
        })
    }

    const [isDoneEdit, setDoneEdit] = useState('');


    return (
        <article className="p-8 flex flex-col gap-3 bg-white h-fit w-fit border-[#CCC] border-2 rounded-3xl">
            <h1 className="font-bold text-xl">Edit Transaction</h1>
            <div className="flex justify-between gap-5">
                <button
                    onClick={() => { setTransactionType('EXPENSE') }}
                    className={`w-full px-5 py-2 font-bold rounded-md text-sm ${transactionType == 'EXPENSE' ? 'bg-mainRed text-white' : 'text-[#C5C9D3]'}`}>
                    Expense
                </button>
                <button
                    onClick={() => { setTransactionType('INCOME') }}
                    className={`w-full px-5 py-2 font-bold rounded-md text-sm ${transactionType == 'INCOME' ? 'bg-mainGreen text-white' : 'text-[#C5C9D3]'}`}>
                    Income
                </button>
            </div>

            <form action="" className="flex flex-col gap-3">
                <input type="text" className="w-full rounded-md text-sm outline-none  bg-[#F6F6F6] py-3 px-5 font-medium " placeholder="Title"
                    onChange={(e) => {
                        setEditTransaction({
                            ...EditTransaction,
                            name: e.target.value
                        })
                    }}
                    value={EditTransaction.name}
                />
                <input type="text" className="w-full rounded-md text-sm outline-none  bg-[#F6F6F6] py-3 px-5 font-medium " placeholder="Nominal"
                    onChange={(e) => {
                        setEditTransaction({
                            ...EditTransaction,
                            amount: parseInt(e.target.value)
                        })
                    }}
                    value={Number.isNaN(EditTransaction.amount) ? '' : EditTransaction.amount}
                />
                <textarea
                onChange={(e) => {
                    setEditTransaction({
                        ...EditTransaction,
                        description: e.target.value
                    })
                }}

                value={EditTransaction.description}

                placeholder="Description"
                name="" id="" cols={30} rows={3} 
                className="w-full rounded-md text-sm outline-none  bg-[#F6F6F6] py-3 px-5 font-medium "
                ></textarea>
            </form>

            <MyDatePicker selectedDate={selectedDate} onChange={handleDateChange}/>
            
            <div className="flex gap-3 items-center font-semibold">
                <p className="text-section-content">Category</p>
                <select className="p-2 outline-none text-[#576BEA]  text-sm" onChange={(e) => {
                    setEditTransaction({
                        ...EditTransaction,
                        category: e.target.value.toUpperCase()
                    })
                }}
                value={EditTransaction.category}
                >
                    {
                        ["Food", "Bills", "Laundry", "Education", "Transportation", "Recreational", "Health", "Technology", "Other"].map(item => {
                            return (
                                <option value={item.toUpperCase()} className="font-semibold text-black" key={item}>
                                    {item}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            {
                isLoading && 
                <LoadingSpin size="20" fill="#A5DD9B" className=""/>
            }
            {
                isDoneEdit != '' &&
                <p className="text-xs text-center text-mainGreen font-bold">{
                    isDoneEdit === 'ok' ? "Edit Transaction Succeed!" : 'Edit Transaction Failed!'
                }</p>
            }

            <button
            onClick={() => {
                editTransaction();
            }}
            className="w-full px-5 py-3 text-white text-section-content font-bold bg-[#576BEA] rounded-xl duration-200 hover:scale-105">
                Edit
            </button>
        </article>
    )
}