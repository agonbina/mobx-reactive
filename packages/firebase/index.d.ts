declare module 'mobx-firebase/value' {
	import firebase from 'firebase';
	import { default as ReactiveAtom } from 'mobx-reactive-atom'; class FirebaseValue<T> extends ReactiveAtom<T> {
	    private ref;
	    constructor(ref: firebase.database.Reference);
	    private onValue;
	    onObserve(): void;
	    onUnobserve(): void;
	}
	export default FirebaseValue;

}
declare module 'mobx-firebase/list' {
	import firebase from 'firebase';
	import { default as ReactiveAtom } from 'mobx-reactive-atom'; class FirebaseList<T> extends ReactiveAtom<Array<T>> {
	    private ref;
	    constructor(ref: firebase.database.Reference);
	    onAdd: (snapshot: any, prevKey: any) => void;
	    onRemove: (snapshot: any) => void;
	    onChange: (snapshot: any) => void;
	    onMove: (snapshot: any, prevKey: any) => void;
	    onObserve(): void;
	    onUnobserve(): void;
	    onError: (error: any) => void;
	}
	export default FirebaseList;

}
declare module 'mobx-firebase/index' {
	import FirebaseValue from 'mobx-firebase/value';
	import FirebaseList from 'mobx-firebase/list';
	export const asValue: <T>(ref: firebase.database.Reference) => FirebaseValue<T>;
	export const asList: <T>(ref: firebase.database.Reference) => FirebaseList<T>;

}
declare module 'mobx-firebase' {
	import main = require('mobx-firebase/index');
	export = main;
}
