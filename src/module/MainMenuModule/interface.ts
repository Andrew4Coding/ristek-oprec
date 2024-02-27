export interface transactionData {
    id: number,
    name: string,
    date: Date,
    type: "INCOME" | "EXPENSE",
    description: string,
    category:
    "food" |
    "bills" |
    "laundry" |
    "transporation" |
    "recreational" |
    "health" |
    "technology" |
    "other"
    amount: number,
    userId: number
}

export interface transactionItem {
    item: transactionData
}
