import { initMixin } from './init'
import { eventsMixin } from './'
import { lifecycleMixin } from './lifecycle'

function cosmosVM (options) {
    if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof cosmosVM)) {
        console.log('cosmos is a constructor and should be called with the `new` keyword')
    }

    this._init(options)
}

initMixin(cosmosVM)
lifecycleMixin(cosmosVM)


export default cosmosVM