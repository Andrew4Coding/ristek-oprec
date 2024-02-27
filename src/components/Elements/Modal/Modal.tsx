import { Dispatch, SetStateAction } from "react"

export const Modal: React.FC<{children?: React.ReactNode, setState: Dispatch<SetStateAction<boolean>>}> = ({children, setState}) => {

    return (
        <section
        onClick={(e) => {
            if (e.target == e.currentTarget) {
                setState(false)
            }
        }}
        className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/20 z-20">
            {children}
        </section>
    )
}