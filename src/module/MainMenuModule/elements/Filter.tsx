'use client'
import Image from "next/image"
import { Dispatch, SetStateAction } from "react";
import { filterType } from "../constant";

export interface filterInterface {
    setFilterIndex: Dispatch<SetStateAction<number>>,

    setIsAscending: Dispatch<SetStateAction<boolean>>
}

export const Filter: React.FC<filterInterface> = function ({ setFilterIndex, setIsAscending }) {
    return (
        <div className="w-full px-8 flex gap-5 items-center">
            <Image src={'/filter.svg'} alt="" width={24} height={24} />
            <p className="text-[#95979D] font-medium text-xs lg:text-sm">
                Filter by
            </p>
            {/* <div className="hidden xl:flex gap-5 overflow-x-auto pb-2 lg:pb-0">
                {filterType.map((item, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => {
                                setFilterIndex(index);
                            }}
                            className={`rounded-md duration-200 px-5 py-3 text-xs ${filterIndex === index ? 'bg-[#576BEA] text-white font-bold' : 'text-[#C5C9D3] font-semibold'}`}>
                            <span className="">{item}</span>
                        </button>
                    );
                })}
            </div> */}

            <select
                onChange={(e) => {
                    setFilterIndex(parseInt(e.target.value));
                }}
                className="p-2 outline-none text-[#576BEA] bg-none text-sm "
            >
                {filterType.map((item, index) => {
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

            <select
                onChange={(e) => {
                    if (e.target.value === "Ascending") {
                        setIsAscending(true);
                    }
                    else {
                        setIsAscending(false);
                    }
                }}
                className="p-2 outline-none text-[#576BEA] bg-none text-sm"
            >
                {["Descending", "Ascending"].map((item, index) => {
                    return (
                        <option
                            value={item}
                            key={index}
                            className={`rounded-md duration-200 px-5 py-3 text-sm font-semibold`}>
                            <span className="">{item}</span>
                        </option>
                    );
                })}
            </select>
        </div >
    );
}