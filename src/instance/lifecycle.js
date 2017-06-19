/* @flow */

import { handleError } from '../util/index'

export function lifecycleMixin (cosmosVM: Class<Component>) {
    cosmosVM.prototype._update = function () {

    }

    cosmosVM.prototype.$forceUpdate = function () {
        const vm:Component = this

        if (vm._watcher) {
            vm._watcher.update();
        }
    }

    cosmosVM.prototype.$destroy = function () {
        const vm:Component = this

        
    }
}

export function callHook (vm: Component, hook: string) {
    const handlers = vm.$options[hook]
    if (handlers) {
        for (let i = 0, j = handlers.length; i < j; i ++) {
            try {
                handlers[i].call(vm)
            } catch (e) {
                handleError(e, vm, `${hook} hook`)
            }
        }
    }
}