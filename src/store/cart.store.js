import { makeAutoObservable, observable } from 'mobx'
// eslint-disable-next-line no-unused-vars
import { InventoryItem } from './inventory.store'
// eslint-disable-next-line no-unused-vars
import { RootStore } from './root'
import roundTwoDecimal from '../utils/roundTwoDecimal'

export class CartItem {
    _id = ''
    count = 0
    /**
     * @type {RootStore}
     */
    root = null

    constructor(_id, root, count = 1) {
        makeAutoObservable(this)
        this._id = _id
        this.count = count
        this.root = root
    }
    /**
     * @return {InventoryItem}
     */
    get inventory() {
        return this.root.inventoryStore.inventory.get(this._id)
    }
}

export class CartStore {
    /**
     * @type {Map.<string,CartItem>}
     */
    cart = new observable.map()

    /**
     * @type {RootStore}
     */
    root = null

    constructor(root) {
        makeAutoObservable(this)
        this.root = root
    }

    add = (id) => {
        const cartItem = this.cart.get(id)
        if (cartItem) {
            cartItem.count++
        } else {
            this.cart.set(id, new CartItem(id, this.root))
        }
    }

    remove = (id) => {
        const cartItem = this.cart.get(id)
        if (cartItem) {
            cartItem.count--
            if (cartItem.count === 0) {
                this.cart.delete(id)
            }
        }
    }

    get array() {
        return Array.from(this.cart.values())
    }

    get totalCost() {
        let total = 0
        this.array.forEach((x) => {
            total += x.count * x.inventory._cost
        })
        return roundTwoDecimal(total)
    }
}
