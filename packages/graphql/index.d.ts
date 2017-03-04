declare module 'mobx-graphql/query' {
	import { ObservableQuery } from 'apollo-client';
	import { default as ReactiveAtom } from 'mobx-reactive-atom';
	export class ApolloQuery<T> extends ReactiveAtom<T> {
	    private query;
	    private _canStart;
	    private subscription;
	    constructor(query: ObservableQuery<T>, _canStart?: Boolean);
	    onObserve(): void;
	    onUnobserve(): void;
	    start(variables?: {
	        [key: string]: any;
	    }): void;
	}
	export const createQuery: <T>(query: any) => ApolloQuery<T>;

}
declare module 'mobx-graphql/index' {
	export { ApolloQuery, createQuery } from 'mobx-graphql/query';

}
declare module 'mobx-graphql' {
	import main = require('mobx-graphql/index');
	export = main;
}
