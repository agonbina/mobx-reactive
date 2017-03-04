import { ObservableQuery, Subscription } from 'apollo-client'
import { default as ReactiveAtom } from 'mobx-reactive-atom'

export class ApolloQuery<T> extends ReactiveAtom<T> {

  private subscription: Subscription

  constructor (private query: ObservableQuery<T>, private _canStart: Boolean = false) {
    super()
  }

  onObserve () {
    if (!this._canStart || this.subscription) {
      return
    }
    this.subscription = this.query.subscribe({
      next: ({ data, loading }) => {
        this.setCurrent(data, loading)
      },
      error: (error) => {
        this.setError(error)
      }
    })
  }

  onUnobserve () {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  start (variables: {[key: string]: any} = {}) {
    this._canStart = true
    this.query.options.variables = {
      ...this.query.options.variables,
      ...variables
    }
    this.onObserve()
  }

}

export const createQuery = <T>(query) => {
  return new ApolloQuery<T>(query)
}

