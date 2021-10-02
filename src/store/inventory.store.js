import { makeAutoObservable, observable } from 'mobx'
import { dummyData } from './fakeData'
// eslint-disable-next-line no-unused-vars
import { RootStore } from './root'

export class InventoryItem {
    _id = ''
    name = ''
    tagline = ''
    description1 = ''
    description2 = ''
    isNew = false
    alcohol = ''
    _size = 0
    offset = ''
    _cost = 5
    primaryColor = 'blue'
    secondaryColor = 'orange'
    /**
     * @type {RootStore}
     */
    root = null

    constructor(data, root) {
        makeAutoObservable(this)
        this._id = data._id
        this.offset = data.offset
        this._cost = data.cost
        this.name = data.name
        this.tagline = data.tagline
        this.description1 = data.description1
        this.description2 = data.description2
        this.isNew = data.isNew
        this.alcohol = data.alcohol
        this._size = data.size
        this._cost = data.cost
        this.primaryColor = data.primaryColor
        this.secondaryColor = data.secondaryColor
        this.root = root
    }

    get cost() {
        return '$' + this._cost
    }
    get size() {
        return this._size + 'ML'
    }
}

export class InventoryStore {
    /**
     * @type {Map.<string,InventoryItem>}
     */
    inventory = new observable.map()

    /**
     * @type {RootStore}
     */
    root = null

    constructor(root) {
        makeAutoObservable(this)
        this.root = root
        dummyData.forEach((x) => {
            this.inventory.set(x._id, new InventoryItem(x, root))
        })
    }
}
