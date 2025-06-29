import Buyable from '../domain/Buyable';
import CartItem from '../domain/CartItem';

export default class Cart {
    private _items: CartItem[] = [];

    add(item: Buyable, count: number = 1): void {
        const existingItem = this._items.find(i => i.item.id === item.id);

        if (existingItem) {
            if(existingItem.item.increasable) {
               existingItem.count += count; 
            } else {
                existingItem.count = 1;
                console.log('Этот товар может быть в корзине только в единственном экземпляре');
            }
        } else {
            this._items.push({
                item,
                count: item.increasable ? count : 1});
        }
    }

    increaseCount(id: number): void {
        const targetItem = this._items.find(i => i.item.id === id);
        if (!targetItem) {
            throw new Error (`Товар с ID ${id} не найден в корзине`);
        }

        if (targetItem.item.increasable) {
            targetItem.count += 1;
        } else {
            targetItem.count = 1;
            console.log('Этот товар может быть в корзине только в единственном экземпляре');
        }
    }

    decreaseCount(id: number): void {
        const targetItem = this._items.find(i => i.item.id === id);
        if (!targetItem) {
            throw new Error (`Товар с ID ${id} не найден в корзине`);
        }

        if (targetItem.count <= 1) {
            this.deleteItem(id);
        } else {
            targetItem.count -= 1;
        }
    }

    get items(): CartItem[] {
        return [...this._items]; 
    }

    getTotalSumWithoutDiscount(): number {
        return this._items.reduce((acc: number, i: CartItem) => {
            acc += i.item.price * i.count;
            return acc;
        }, 0);
    }

    getTotalSum(discount: number): number {
        const rate = 1 - (discount / 100);
        return this.getTotalSumWithoutDiscount() * rate;
    }

    deleteItem(id: number): void {
        this._items = this._items.filter(i => i.item.id !== id);
    }
}