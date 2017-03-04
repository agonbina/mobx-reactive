import firebase from 'firebase'
import { default as ReactiveAtom } from 'mobx-reactive-atom'

type Snapshot = firebase.database.DataSnapshot

function createRecord (snapshot: Snapshot) {
  let value = snapshot.val()
  value['.key'] = snapshot.key
  return value
}

function indexForKey (array: Array<any>, key: string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i]['.key'] === key) {
      return i
    }
  }
  return -1
}

export class FirebaseList<T> extends ReactiveAtom<Array<T>> {

  constructor (private ref: firebase.database.Reference) {
    super()
  }

  onAdd = (snapshot, prevKey) => {
    const list = this.getCurrent()
    const index = prevKey ? indexForKey(list, prevKey) + 1 : 0
    list.splice(index, 0, createRecord(snapshot))
    this.setCurrent(list)
  }

  onRemove = (snapshot) => {
    const list = this.getCurrent()
    const index = indexForKey(list, snapshot.key)
    list.splice(index, 1)
    this.setCurrent(list)
  }

  onChange = snapshot => {
    const list = this.getCurrent()
    const index = indexForKey(list, snapshot.key)
    list.splice(index, 1, createRecord(snapshot))
    this.setCurrent(list)
  }

  onMove = (snapshot, prevKey) => {
    const list = this.getCurrent()
    const index = indexForKey(list, snapshot.key)
    const record = list.splice(index, 1)[0]
    const newIndex = prevKey ? indexForKey(list, prevKey) + 1 : 0
    list.splice(newIndex, 0, record)
    this.setCurrent(list)
  }

  async onObserve () {
    this.setCurrent([], true)
    try {
      await this.ref.limitToFirst(1).once('value')
      this.ref.on('child_added', this.onAdd, this.onError)
      this.ref.on('child_removed', this.onRemove, this.onError)
      this.ref.on('child_changed', this.onChange, this.onError)
      this.ref.on('child_moved', this.onMove, this.onError)
      this.setLoading(false)
    } catch (error) {
      this.setError(error)
    }
  }

  onUnobserve () {
    this.ref.off('child_added', this.onAdd)
    this.ref.off('child_removed', this.onRemove)
    this.ref.off('child_changed', this.onChange)
    this.ref.off('child_moved', this.onMove)
    this.setLoading(false)
  }

  onError = (error) => {
    this.setError(error)
  }

}

export const asList = <T>(ref: firebase.database.Reference) => {
  return new FirebaseList<T>(ref)
}
