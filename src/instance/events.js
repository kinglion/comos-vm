/* @flow */

import { toArray } from 'util/index'

export function initEvents (vm: Component) {
    vm._events = Object.create(null)
}

export function eventsMixin (cosmosVM: Class<Component>) {
    cosmosVM.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
        const vm: Component = this

        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i ++) {
                this.$on(event[i], fn)
            }
        } else {
            (vm._events[event] || (vm._events[event] = [])).push(fn)
        }

        return vm 
    }

    cosmosVM.prototype.$once = function (event: string, fn:Function): Component {
        const vm: Component = this

        function on () {
            vm.$off(event, on)
            fn.apply(vm, arguments)
        }
        on.fn = fn
        vm.$on(event, on)
        return vm
    }

    cosmosVM.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
        const vm: Component = this

        // all
        if (!arguments.length) {
            vm._events = Object.create(null)
            return vm
        }

        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l; i ++) {
                this.$off(event[i], fn)
            }
            return vm
        }

        const cbs = vm._events[event]

        if (!cbs) {
            return vm
        }

        if (arguments.length == 1) {
            vm._events[event] = null
            return vm
        }

        let cb
        let i = cbs.length
        while (i--) {
            cb = cbs[i]
            if (cb == fn || cb.fn === fn) {
                cbs.splice(i, 1)
                break
            }
        }
        return vm
    }

    cosmosVM.prototype.$emit = function (event: string): Component {
        const vm: Component = this

        let cbs = vm._events[event]
        if (cbs) {
            cbs = cbs.length > 1 ? toArray(cbs) : cbs
            const args = toArray(arguments, 1)
            for (let i = 0, l = cbs.length; i < l; i ++) {
                cbs[i].apply(vm, args)
            }
        }
        return vm
    }
}