import MyEventEmitter from './Emitter/MyEventEmitter'

function test() {
    const emitter = new MyEventEmitter()
    emitter.registerHandler('userUpdated', () => console.log('User was updated #1'))
    emitter.registerHandler('userUpdated', () => console.log('User was updated #2'))
    emitter.registerHandler('userUpdated', () => console.log('User was updated #3'))
    emitter.registerHandler('userUpdated', () => console.log('User was updated #4'))
    emitter.registerHandler('userUpdated', () => console.log('User was updated #5'))
    emitter.emitEvent('userUpdated')

    emitter.registerHandler('testEvent', () => console.log('TestEvent callback #1'))
    emitter.emitEvent('usedUpdated')
    emitter.emitEvent('testEvent')
}

test()
