'use client'
import Image from "next/image"
import { Dispatch, SetStateAction } from "react";

export interface filterInterface {
    state: number,
    setState: Dispatch<SetStateAction<number>>
}

export const Filter: React.FC<filterInterface> = function ({ state, setState }) {
    return (
        <div className="w-full px-8 flex gap-5 items-center">
            <Image src={'/filter.svg'} alt="" width={24} height={24} />
            <p className="text-[#95979D] font-medium text-xs lg:text-sm">
                Filter by
            </p>
            <div className="hidden xl:flex gap-5 overflow-x-auto pb-2 lg:pb-0">
                {["Recent", "Category", "Price", "This Day", "This Week"].map((item, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => {
                                setState(index);
                            } }
                            className={`rounded-md duration-200 px-5 py-3 text-xs ${state === index ? 'bg-[#576BEA] text-white font-bold' : 'text-[#C5C9D3] font-semibold'}`}>
                            <span className="">{item}</span>
                        </button>
                    );
                })}
            </div>

            <select
            onChange={(e) => {
                setState(parseInt(e.target.value));
            }}
            className="p-2 outline-none text-[#576BEA]  text-sm xl:hidden"
            >
                {["Recent", "Category", "Price", "This Day", "This Week"].map((item, index) => {
                        return (
                            <option
                                value={index}
                                key={index}
                                className={`rounded-md duration-200 px-5 py-3 text-sm font-semibold`}>
                                <span className="">{item}</span>
                            </option>
                        );
                    })}
            </select>
        </div>
    );
}