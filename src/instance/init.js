/* @flow */

import { initEvents } from './events'

export function initMixin (cosmosVM: Class<Component>) {
    cosmosVM.prototype._init = function (options?: Object) {
        const vm: Component = this;

        // 设置vm.$options
        vm.$options = options;

        initEvents(vm);
        initRender(vm);

        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
}