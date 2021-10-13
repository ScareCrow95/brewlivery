import { socketUrl } from '../constants/url'
// eslint-disable-next-line no-unused-vars
import { RootStore } from './root'
import io from 'socket.io-client'

/**
 *
 * @param {RootStore} root
 * @returns
 */
export const initSocket = (root) => {
    root.socket = io(socketUrl)
    root.socket.on('connect', () => {
        console.log('Socket.io connected')
        root.socket.emit('subscribe', { type: 'client', id: root.id })
    })

    root.socket.on('drone.status', (payload) => {
        const order = root.orderStore.orders.get(payload.orderId)
        if (order) {
            order.droneStatus = payload.status
            order.saveToStorage()
        }
    })

    root.socket.on('order.status', (payload) => {
        const order = root.orderStore.orders.get(payload.orderId)
        console.log(payload)
        if (order) {
            order.state = payload.state
            order.saveToStorage()
        }
    })
    root.socket.on('gps', (payload) => {
        const order = root.orderStore.orders.get(payload.orderId)
        if (order && order.state === 'shipped') {
            order.drone = { lat: payload.lat, lng: payload.lng }
        }
    })
}
