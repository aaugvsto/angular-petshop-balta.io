export class CartItem {
    constructor(
        public id: String,
        public product: string,
        public quantity: number,
        public price: number,
        public image: string[]
    )
    { }
}