export interface Book {
    title: string,
    description: string,
    coverImage ?: string,
    price: number,
    amountInStorage: number,
    authorIds: [string]
}