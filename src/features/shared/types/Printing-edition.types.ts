export interface Book {
    _id?: string,
    title: string,
    description: string,
    coverImage ?: string,
    price: number,
    amountInStorage: number,
    authorIds: [string]
}