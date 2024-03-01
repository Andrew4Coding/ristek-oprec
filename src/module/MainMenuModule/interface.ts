export interface transactionData {
    id?: number,
    name: string,
    date: Date,
    type: "INCOME" | "EXPENSE",
    description: string,
    category: transactionCategoriesEnum
    amount: number,
}

export interface transactionItem {
    item: transactionData
}

export enum transactionCategoriesEnum {
    Food = "FOOD",
    Bills = "BILLS",
    Laundry = "LAUNDRY",
    Transportation = "TRANSPORTATION",
    Recreational = "RECREATIONAL",
    Health = "HEALTH",
    Technology = "TECHNOLOGY",
    Other = "OTHER",
}
