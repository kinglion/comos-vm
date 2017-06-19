/*!
 * cosmos-vm.js v1.0.0
 * (c) 2014-2017 King Lion
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.comcosVM = factory());
}(this, (function () { 'use strict';

/*  */

/**
 * Convert an Array-like object to a real Array.
 */

/*  */

function initEvents (vm) {
    vm._events = Object.create(null);
}

/*  */

function initMixin (cosmosVM) {
    cosmosVM.prototype._init = function (options) {
        var vm = this;

        // 设置vm.$options
        vm.$options = options;

        initEvents(vm);

        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    };
}

function cosmosVM$1 (options) {
    if ("development" !== 'production' &&
    !(this instanceof cosmosVM$1)) {
        console.log('cosmos is a constructor and should be called with the `new` keyword');
    }

    this._init(options);
}

initMixin(cosmosVM$1);

/*  */

return cosmosVM$1;

})));
