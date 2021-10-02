import { createContext, useContext } from 'react'
import { configure, makeAutoObservable, observable } from 'mobx'
import { InventoryStore } from './inventory.store'
import { UIStore } from './ui.store'
import { CartStore } from './cart.store'

configure({
    enforceActions: 'never',
})

export class RootStore {
    /**
     * @type {InventoryStore}
     */
    inventoryStore = null

    /**
     * @type {UIStore}
     */
    uiStore = null

    /**
     * @type {CartStore}
     */
    cartStore = null

    constructor() {
        makeAutoObservable(this)
        this.inventoryStore = new InventoryStore(this)
        this.uiStore = new UIStore(this)
        this.cartStore = new CartStore(this)
    }
}

export const RootStoreInstance = new RootStore()

const RootStoreContext = createContext(RootStoreInstance)

export const useStores = () => useContext(RootStoreContext)
