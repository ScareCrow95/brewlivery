import { createContext, useContext } from 'react'
import { configure, makeAutoObservable, observable } from 'mobx'
import { InventoryStore } from './inventory.store'
import { UIStore } from './ui.store'
import { CartStore } from './cart.store'
import { OrderStore } from './order.store'
import { apiUrl, url } from '../constants/url'
import axios from 'axios'
import { initSocket } from './socketListener'
import generateUUID from '../utils/generateUUID'

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

    socket = null

    id = null

    constructor() {
        makeAutoObservable(this)
        this.inventoryStore = new InventoryStore(this)
        this.uiStore = new UIStore(this)
        this.cartStore = new CartStore(this)
        this.orderStore = new OrderStore(this)
        this.id = localStorage.getItem('id')
        if (!this.id) {
            this.id = generateUUID()
            localStorage.setItem('id', this.id)
        }
        initSocket(this)
    }

    /* #region  HTTP Methods */
    HTTP = async (endpoint, data = {}, post = true) => {
        const config = this._getHeaders()
        if (!config) return
        let response = {}
        try {
            if (post) response = await axios.post(apiUrl + endpoint, data, config)
            else response = await axios.get(apiUrl + endpoint, config)
            return response?.data
        } catch (err) {
            this._handleError(err)
            return null
        }
    }

    _handleError = (err) => {
        if (err.response?.status === 500) {
            console.log(err.response)
            console.error(err.response?.data)
        } else {
            console.error(err)
        }

        this.showToast(this.error.message, null, 'error', 7000, true)
    }

    _getHeaders = () => {
        // if (!this.isLoggedIn) return null
        return {
            headers: {
                // Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
        }
    }
}

export const RootStoreInstance = new RootStore()

const RootStoreContext = createContext(RootStoreInstance)

export const useStores = () => useContext(RootStoreContext)
