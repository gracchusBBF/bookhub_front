export interface Loan {
    id: number
    startDate: number
    returnDate: Date | null
    deadline: Date
    userEmail: string
    bookId: number
    bookTitle: string
}
