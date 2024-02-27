export const TotalIncome: React.FC = () => {
    return (
        <section className="bg-white w-full h-fit shadow-sectionShadow rounded-sectionCorner p-5 font-Manrope text-section-title font-bold flex flex-col gap-2">
            <h1 className="text-section-title">Total Income</h1>
            <div className="flex items-center gap-5">
                <h3 className="text-section-title text-mainGray">RP</h3>
                <h1 className="text-price-title font-extrabold text-mainGreen">500000</h1>
            </div>
        </section>
    )
}