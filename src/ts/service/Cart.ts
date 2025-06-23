import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        this._items.push(item);
    }

    get items(): Buyable[] {
        return [...this._items]; 
    }

    getTotalSumWithoutDiscount(): number {
        return this._items.reduce((acc: number, item: Buyable) => {
            acc += item.price;
            return acc;
        }, 0)
    }

    getTotalSum(discount: number): number {
        const rate = 1 - (discount / 100);
        return this.getTotalSumWithoutDiscount() * rate;
    }

    deleteItem(id: number): void {
        const targetIndex = this._items.findIndex((item: Buyable) => item.id === id);
        this._items.splice(targetIndex, 1);
    }
}