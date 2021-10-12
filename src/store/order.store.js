import { makeAutoObservable, observable } from 'mobx'
// eslint-disable-next-line no-unused-vars
import { CartItem } from './cart.store'
// eslint-disable-next-line no-unused-vars
import { RootStore } from './root'
import roundTwoDecimal from '../utils/roundTwoDecimal'
import generateUUID from '../utils/generateUUID'
import { getDistance } from 'geolib'

export class OrderItem {
    _id = ''
    /**
     * @type {Date}
     */
    createdAt = null

    /**
     * @type {Date}
     */
    estimated = null
    /**
     * @type {('preparing'|'shipped'|'delivered'|'received'|'cancelled')}
     */
    state = 'preparing'

    /**
     * @type {Map.<string,CartItem>}
     */
    cart = new observable.map()
    /**
     * @type {RootStore}
     */
    root = null
    distance = 0
    lat = 0
    lng = 0
    name = ''
    address = ''
    phone = ''
    /**
     *
     * @param {string} _id
     * @param {{lat:number,lng:number,name:string}} place
     * @param {RootStore} root
     */
    constructor(_id, place, name, address, phone, root) {
        makeAutoObservable(this)
        this.address = address
        this.name = name
        this.phone = phone
        this._id = _id
        this.root = root
        this.lat = place.lat
        this.lng = place.lng
        this.createdAt = new Date()
        this.distance = getDistance(
            { latitude: this.root.palefire.lat, longitude: this.root.palefire.lng },
            { latitude: this.lat, longitude: this.lng },
        )
        this.estimated = new Date(this.createdAt.getTime() + (5 + Math.round(this.distance / 100)) * 60 * 1000)
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

export class OrderStore {
    /**
     * @type {Map.<string,OrderItem>}
     */
    orders = new observable.map()

    /**
     * @type {RootStore}
     */
    root = null

    constructor(root) {
        makeAutoObservable(this)
        this.root = root
    }

    /**
     *
     * @param {{list:Array.<CartItem>,place:{lat:number,lng:number},address:string,name:string,phone:number}} data
     */
    add = (data) => {
        const id = generateUUID()
        const order = new OrderItem(id, data.place, data.name, data.address, data.phone, this.root)

        data.list.forEach((x) => {
            order.cart.set(x._id, x)
        })
        this.root.uiStore.mainScreen = 'track'
        this.root.uiStore.checkout = false
        this.orders.set(id, order)
        this.root.uiStore.selectedOrderId = id
    }

    remove = (id) => {
        this.orders.delete(id)
    }

    get array() {
        return Array.from(this.orders.values()).sort((a, b) => b.createdAt - a.createdAt)
    }
}
