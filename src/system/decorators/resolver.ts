import { Uri } from 'vscode';

function replacer(key: string, value: any): any {
	if (key === '') return value;

	if (value == null) return value;
	if (value instanceof Error) return String(value);
	if (value instanceof Uri) {
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
		if ('sha' in (value as any) && (value as any).sha) {
			return `${(value as any).sha}:${value.toString()}`;
		}
		return value.toString();
	}

	return value;
}

export function defaultResolver(...args: any[]): string {
	if (args.length === 0) return '';
	if (args.length !== 1) {
		return JSON.stringify(args, replacer);
	}

	const arg0 = args[0];
	if (arg0 == null) return '';
	if (typeof arg0 === 'string') return arg0;
	if (typeof arg0 === 'number' || typeof arg0 === 'boolean' || arg0 instanceof Error) return String(arg0);
	if (arg0 instanceof Uri) {
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
		if ('sha' in (arg0 as any) && (arg0 as any).sha) {
			return `${(arg0 as any).sha}:${arg0.toString()}`;
		}
		return arg0.toString();
	}

	return JSON.stringify(arg0, replacer);
}

export type Resolver<T extends (...arg: any) => any> = (...args: Parameters<T>) => string;

export function resolveProp<T extends (...arg: any) => any>(
	key: string,
	resolver: Resolver<T> | undefined,
	...args: Parameters<T>
) {
	if (args.length === 0) return key;

	let resolved;
	if (resolver != null) {
		try {
			resolved = resolver(...args);
		} catch {
			debugger;
			resolved = defaultResolver(...(args as any));
		}
	} else {
		resolved = defaultResolver(...(args as any));
	}

	return `${key}$${resolved}`;
}
