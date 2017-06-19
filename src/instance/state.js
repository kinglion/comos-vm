/* @flow */

export function initState (vm: Component) {
    const opts = vm.$options
    
    vm._watchers = []

    if (opts.computed) initComputed(vm, opts.computed)
}

function initComputed (vm: Component, computed: Object) {
    for (const key in computed) {
        const userDef = computed[key]
        let getter = typeof userDef === 'function' ? userDef : userDef.get
        
    }
}