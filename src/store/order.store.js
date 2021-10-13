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
    /**
     * @type {{lat: number, lng: number}}
     */
    drone = {}
    /**
     * @type {('flying'|'landing'|'take-off'|'stop')}
     */
    droneStatus = 'stop'
    name = ''
    address = ''
    phone = ''
    /**
     *
     * @param {string} _id
     * @param {{lat:number,lng:number,name:string}} place
     * @param {RootStore} root
     */
    constructor(root, cached, _id, place, name, address, phone) {
        makeAutoObservable(this)
        this.root = root
        if (!cached) {
            this.address = address
            this.name = name
            this.phone = phone
            this._id = _id
            this.lat = place.lat
            this.lng = place.lng
            this.drone = { lat: this.root.palefire.lat, lng: this.root.palefire.lng }
            this.createdAt = new Date()
            this.distance = getDistance(
                { latitude: this.root.palefire.lat, longitude: this.root.palefire.lng },
                { latitude: this.lat, longitude: this.lng },
            )
            this.estimated = new Date(this.createdAt.getTime() + (5 + Math.round(this.distance / 100)) * 60 * 1000)
        }
    }

    saveToStorage = () => {
        let data = {}
        const orderPayload = {
            address: this.address,
            name: this.name,
            phone: this.phone,
            _id: this._id,
            lat: this.lat,
            lng: this.lng,
            drone: this.drone,
            createdAt: this.createdAt,
            distance: this.distance,
            estimated: this.estimated,
            droneStatus: this.droneStatus,
            state: this.state,
            cart: Array.from(this.cart.values()).map((x) => {
                return { _id: x._id, count: x.count }
            }),
        }
        const json = localStorage.getItem('bl.orders')
        if (json) {
            data = JSON.parse(json)
        }
        data[this._id] = orderPayload
        localStorage.setItem('bl.orders', JSON.stringify(data))
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
        const json = localStorage.getItem('bl.orders')
        if (json) {
            const data = JSON.parse(json)
            Object.values(data).forEach((x) => {
                /**@type {OrderItem} */
                const item = x
                const orderItem = new OrderItem(this.root, true)
                orderItem.address = item.addres
                orderItem.name = item.name
                orderItem.phone = item.phone
                orderItem._id = item._id
                orderItem.root = item.root
                orderItem.lat = item.lat
                orderItem.lng = item.lng
                orderItem.state = item.state
                orderItem.drone = item.drone
                orderItem.droneStatus = item.droneStatus
                orderItem.createdAt = new Date(item.createdAt)
                orderItem.distance = item.distance
                orderItem.estimated = new Date(item.estimated)
                item.cart.forEach((x) => {
                    orderItem.cart.set(x._id, new CartItem(x._id, this.root, x.count))
                })
                this.orders.set(orderItem._id, orderItem)
            })
        }
    }

    /**
     *
     * @param {{list:Array.<CartItem>,place:{lat:number,lng:number},address:string,name:string,phone:number}} data
     */
    add = (data) => {
        const id = generateUUID()
        const order = new OrderItem(this.root, false, id, data.place, data.name, data.address, data.phone)

        data.list.forEach((x) => {
            order.cart.set(x._id, x)
        })
        order.saveToStorage()
        this.root.uiStore.mainScreen = 'track'
        this.root.uiStore.checkout = false
        this.orders.set(id, order)
        this.root.uiStore.selectedOrderId = id
        this.root.HTTP('order/place', { ...data.place, id: this.root.id, orderId: id })
    }

    remove = (id) => {
        this.orders.delete(id)
    }

    get array() {
        return Array.from(this.orders.values()).sort((a, b) => b.createdAt - a.createdAt)
    }
}
