import { makeAutoObservable, observable } from 'mobx'
// eslint-disable-next-line no-unused-vars
import { RootStore } from './root'

export class UIStore {
    /**
     * @type {RootStore}
     */
    root = null

    selectedId = 'can1'
    selectedOrderId = ''

    /**
     * @type {('menu'|'track')}
     */
    mainScreen = 'menu'
    checkout = false

    get selected() {
        return this.root.inventoryStore.inventory.get(this.selectedId)
    }

    constructor(root) {
        makeAutoObservable(this)
        this.root = root
    }

    get selectedOrder() {
        return this.root.orderStore.orders.get(this.selectedOrderId)
    }

    get scrollCSS() {
        return {
            '&::-webkit-scrollbar': {
                width: '4px',
            },
            '&::-webkit-scrollbar-track': {
                width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#4d4d4d',
                borderRadius: '24px',
            },
        }
    }
}
