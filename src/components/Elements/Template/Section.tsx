import { ReactNode } from "react"

export const Section: React.FC<{
    children: ReactNode,
    className?: string,
}> = ({children, className}) => {
    return (
        <section className={"bg-white shadow-sectionShadow rounded-sectionCorner p-8 text-section-title font-bold flex flex-col gap-2" + className}>
            {children}
        </section>
    )
}