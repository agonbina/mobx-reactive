declare module 'mobx-reactive-atom/index' {
	 abstract class Base<T> {
	    abstract onObserve(): void;
	    abstract onUnobserve(): void;
	    private _loading;
	    private _error?;
	    private _current;
	    private atom;
	    constructor();
	    getCurrent(): T;
	    setCurrent: (value: T, loading?: boolean) => void;
	    setLoading: (loading: boolean) => void;
	    setError: (error: any) => void;
	    loading(): boolean;
	    hasError(): boolean;
	    error(): Error | undefined;
	    current(): T;
	}
	export default Base;

}
declare module 'mobx-reactive-atom' {
	import main = require('mobx-reactive-atom/index');
	export = main;
}
