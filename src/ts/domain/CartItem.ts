import Buyable from "./Buyable";

export default interface CartItem {
    item: Buyable;
    count: number
}