export default class MyEventEmitter {
    private _map: Map<string, Array<() => void>> = new Map();

    public registerHandler(eventType: string, callback: () => void) {
        let callbackArray: Array<() => void> | undefined
        callbackArray = this._map.get(eventType)
        if (!callbackArray) {
            callbackArray = []
            this._map.set(eventType, callbackArray)
        }
        callbackArray.push(callback)
    }

    public emitEvent(eventType: string) {
        if (this._map.has(eventType)) {
            const callbackArray = this._map.get(eventType)
            callbackArray?.forEach(callback => {
                callback()
            })
        } else {
            console.log(`No registered callbacks of type: ${eventType}`)
        }
    }
}
