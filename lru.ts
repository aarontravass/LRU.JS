export class LRUCache<K, V> {
  #map: Map<K, V>
  #list: K[]
  readonly #maxQueueSize: number

  constructor() {
    this.#map = new Map()
    this.#list = []
    this.#maxQueueSize = 5
  }

  put(keyName: K, value: V) {
    if (this.#map.has(keyName)) {
      this.#list = this.#list.filter((key) => key != keyName)
      this.#map.delete(keyName)
    }
    this.#map.set(keyName, value)
    this.#list.push(keyName)
    if (this.#list.length > this.#maxQueueSize) {
      const lastUsedKey = this.#list.shift()
      this.#map.delete(lastUsedKey)
    }
  }

  get(keyName: K) {
    const value = this.#map.get(keyName)
    if (value) {
      this.#list = this.#list.filter((key) => key != keyName)
      this.#list.push(keyName)
    }
    return value
  }

  has(keyName: K) {
    return this.#map.has(keyName)
  }
}
