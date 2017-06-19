/* @flow */

export default class Watcher {
    vm: Component;
    cb: Function;

    constructor (
        vm: Component,
        expOrFn: string | Function,
        cb: Function,
        options?: Object
    ) {
        this.vm = vm
        this.cb = cb
        vm._watchers.push(this)
    }
}