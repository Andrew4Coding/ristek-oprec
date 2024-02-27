import { Modal } from "@/components/Elements/Modal/Modal";
import MyDatePicker from "@/components/Elements/Calendar/Calendar"; 

import { useState } from "react"

interface createTransaction {
    name: string,
    amount: number,
    description: string,
    category: string,
    date: Date | null
}

export const CreateTransactionModal: React.FC = () => {
    const [transactionType, setTransactionType] = useState('EXPENSE');

    const [createTransaction, setCreateTransaction] = useState<createTransaction>({
        name: '',
        amount: 0,
        description: '',
        date: new Date(),
        category: 'FOOD'
    })
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setCreateTransaction(
            {
                ... createTransaction,
                date: date
            }
        )
    }

    function CreateTransaction() {
        let userId = '1';
        if (typeof window !== 'undefined'){
            let userId = localStorage.getItem('userId');
        }
        fetch(`/api/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                ...createTransaction,
                type: transactionType,
                userId: parseInt(userId)
            })
        }).then(res => {
            return res.json();
        }).then(data => {       
            console.log(data);     
            if (data.status === 'ok') {
                setDoneCreate("ok");
            }
            else {
                setDoneCreate("error")
            }
        })
    }

    const [isDoneCreate, setDoneCreate] = useState('');


    return (
        <article className="p-8 flex flex-col gap-3 bg-white h-fit w-fit border-[#CCC] border-2 rounded-3xl">
            <h1 className="font-bold text-xl">Create Transaction</h1>
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
                        setCreateTransaction({
                            ...createTransaction,
                            name: e.target.value
                        })
                    }}
                />
                <input type="number" className="w-full rounded-md text-sm outline-none  bg-[#F6F6F6] py-3 px-5 font-medium " placeholder="Nominal"
                    onChange={(e) => {
                        setCreateTransaction({
                            ...createTransaction,
                            amount: parseInt(e.target.value)
                        })
                    }}
                />
                <textarea
                onChange={(e) => {
                    setCreateTransaction({
                        ...createTransaction,
                        description: e.target.value
                    })
                }}

                name="" id="" cols={30} rows={3} className="w-full rounded-md text-sm outline-none  bg-[#F6F6F6] py-3 px-5 font-medium "
                placeholder="Description"
                ></textarea>
            </form>

            <MyDatePicker selectedDate={selectedDate} onChange={handleDateChange}/>
            
            <div className="flex gap-3 items-center font-semibold">
                <p className="text-section-content">Category</p>
                <select className="p-2 outline-none text-[#576BEA]  text-sm" onChange={(e) => {

                    setCreateTransaction({
                        ...createTransaction,
                        category: e.target.value.toUpperCase()
                    })
                }}>
                    {
                        ["Food", "Bills", "Transportation", "Recreational", "Health", "Technology", "Other"].map(item => {
                            return (
                                <option className="font-semibold text-black" key={item}>
                                    {item}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            
            {
                isDoneCreate != '' &&
                <p className="text-xs text-center text-mainGreen font-bold">{
                    isDoneCreate === 'ok' ? "Create trasansaction sucessfull" : 'Create transaction failed'
                }</p>
            }

            <button
            onClick={() => {
                CreateTransaction();
            }}
            className="w-full px-5 py-3 text-white text-section-content font-bold bg-[#576BEA] rounded-xl duration-200 hover:scale-105">
                Create
            </button>
        </article>
    )
}