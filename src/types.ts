export enum TraceType {
	undef,
	Function,
	Error,
	Event,
	ProxyFunction, // internal special function that throws error
	UnverifiedFunction // internal special function
};

export type TraceItem = {
	type: TraceType,
	info: any, //null | TraceInfoFunction | TraceInfoError | TraceInfoEvent,
	nExpectedChildren: number,
	children: Array<TraceItem>,
	bError: boolean,
	error: null | string
};

export type TraceWealthChange = {
	from: {
		address: string,
		name: string
	},
	to: {
		address: string,
		name: string
	},
	amount: number | string | any,
	token: {
		decimals: number,
		address: string,
		units: string // "" for eth and address contract for other tokens
	}
};

export type APIData = {
	trace: Array<TraceItem>,
	wealthChanges: Array<TraceWealthChange>
};

export type CallInput = {
	type: string,
	name: string,
	value: string | number | boolean
};

export type OutputParam = {
	type: string,
	name: string,
	value: string | number | boolean
};

export interface TLProps {
	item: TraceItem,
	level: number
};

export interface TDProps {
	trace: Array<any>
};

export interface WCProps {
	info: Array<TraceWealthChange>
};

export interface WLProps {
	item: TraceWealthChange
};