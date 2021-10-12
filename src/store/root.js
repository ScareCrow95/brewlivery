import { createContext, useContext } from 'react'
import { configure, makeAutoObservable, observable } from 'mobx'
import { InventoryStore } from './inventory.store'
import { UIStore } from './ui.store'
import { CartStore } from './cart.store'
import { OrderStore } from './order.store'

configure({
    enforceActions: 'never',
})

export class RootStore {
    /**
     * @type {InventoryStore}
     */
    inventoryStore = null
    palefire = { lat: 38.4481179, lng: -78.8721451 }
    maxDistance = 2000

    /**
     * @type {UIStore}
     */
    uiStore = null

    /**
     * @type {OrderStore}
     */
    orderStore = null

    /**
     * @type {CartStore}
     */
    cartStore = null

    constructor() {
        makeAutoObservable(this)
        this.inventoryStore = new InventoryStore(this)
        this.uiStore = new UIStore(this)
        this.cartStore = new CartStore(this)
        this.orderStore = new OrderStore(this)
    }
}

export const RootStoreInstance = new RootStore()

const RootStoreContext = createContext(RootStoreInstance)

export const useStores = () => useContext(RootStoreContext)
