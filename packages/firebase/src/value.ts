import firebase from 'firebase'
import { default as ReactiveAtom } from 'mobx-reactive-atom'

export class FirebaseValue<T> extends ReactiveAtom<T> {

  constructor (private ref: firebase.database.Reference) {
    super()
  }

  private onValue = (snap: firebase.database.DataSnapshot) => {
    let value
    if (snap) {
      value = snap.val()
    }
    this.setCurrent(value)
  }

  onObserve () {
    this.setLoading(true)
    this.ref.on('value', this.onValue, error => this.setError(error))
  }

  onUnobserve () {
    this.ref.off('value', this.onValue)
    this.setLoading(false)
  }

}

export const asValue = <T>(ref: firebase.database.Reference) => {
  return new FirebaseValue<T>(ref)
}

