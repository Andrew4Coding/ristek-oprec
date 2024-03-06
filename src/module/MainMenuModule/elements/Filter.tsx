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
        <div className="w-full flex px-8 gap-5 items-center">
            <Image src={'/filter.svg'} alt="" width={24} height={24} />
            <p className="text-[#95979D] font-medium text-xs lg:text-sm">
                Filter by
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
                <select
                    onChange={(e) => {
                        setFilterIndex(parseInt(e.target.value));
                    }}
                    className="outline-none text-[#576BEA] bg-none text-sm "
                >
                    {filterType.map((item, index) => {
                        return (
                            <option
                                value={index}
                                key={index}
                                className={`rounded-md duration-200 text-sm font-semibold`}>
                                <span>{item}</span>
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
                    className="outline-none text-[#576BEA] bg-none text-sm"
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
            </div>
        </div >
    );
}