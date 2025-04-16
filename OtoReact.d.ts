type booly = boolean | string | number | object | null | void;
type falsy = false | '' | 0 | null | undefined;
type ParentNode = HTMLElement | DocumentFragment;
type Settings = Partial<{
    bTiming: boolean;
    bAbortOnError: boolean;
    bShowErrors: boolean;
    basePattern: string;
    bAutoPointer: boolean;
    bAutoReroute: boolean;
    bDollarRequired: boolean;
    bKeepWhiteSpace: boolean;
    bKeepComments: boolean;
    preformatted: string[];
    storePrefix: string;
    version: number;
    headers: HeadersInit;
    locale: string;
    currency: string;
    useGrouping: boolean;
    bSubf: boolean | 2;
    dN: {
        [f: string]: Intl.NumberFormat;
    };
}>;
type Environment = [Environment?, ...unknown[]] & {
    cl?: string[];
};
type Area<RT extends object = {}, T extends true = true> = {
    r?: Range & RT | T;
    PN: ParentNode;
    bfor?: ChildNode;
    srcN?: ChildNode;
    PR?: Range;
    pR?: Range;
};
declare class Range<NodeType extends ChildNode = ChildNode> {
    text?: string;
    n: NodeType;
    cR: Range;
    nx: Range;
    PR?: Range;
    PN?: false | ParentNode;
    constructor(ar: Area, n: NodeType, text?: string);
    toString(): string;
    get Fst(): ChildNode;
    get Nxt(): ChildNode;
    get FstOrNxt(): ChildNode;
    Nodes(): Generator<ChildNode>;
    bD?: () => void;
    aD?: () => void;
    rvars?: Set<RV>;
    erase(par: falsy | Node): void;
    uInfo?: {
        b: DOMBuilder;
        env: Environment;
        oes: OES;
        PN: ParentNode;
        bR: boolean;
    };
    update(): booly | Promise<booly>;
}
export interface Store {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
}
export declare class RV<T = unknown> {
    $name?: string;
    $V: T;
    private $C;
    private $up;
    constructor(n: string, t?: T | Promise<T> | (() => T | Promise<T>));
    private $imm;
    $subs: Set<Subscriber<T>>;
    $subr: Set<Range<ChildNode>>;
    $upd: () => void;
    get V(): T;
    set V(v: T);
    Subscribe(s: Subscriber<T>, bImm?: boolean, cr?: boolean): this;
    Unsubscribe(s: Subscriber<T>): void;
    $SR({ PN }: Area, b: DOMBuilder, r: Range, bR?: boolean): void;
    $UR(r: Range): void;
    readonly Set: (t: T | Promise<T>) => void;
    get Clear(): () => void;
    get U(): T;
    set U(t: T);
    SetDirty(prev?: T): void;
    private ex;
    valueOf(): Object;
    toString(): string;
}
export type RVAR<T = any> = T extends [any] ? RV<T> & T : RV<T> & T;
export declare function RVAR<T>(nm?: string, val?: T | Promise<T> | (() => T | Promise<T>), store?: Store, imm?: Subscriber<T>, storeNm?: string, updTo?: RV): RVAR<T>;
type Subscriber<T = unknown> = ((t?: T, prev?: T) => unknown);
type OES = {
    e: EventListener;
    s: EventListener;
    t: Settings;
};
type DOMBuilder<RT = void | booly> = ((a: Area, bR?: boolean) => (RT | Promise<RT>)) & {
    auto?: string;
    nm?: string;
};
export declare function range(from: number, count?: number, step?: number): Generator<number, void, unknown>;
export declare function RFetch(req: RequestInfo, init?: RequestInit): Promise<Response>;
type Format<T = any> = string | ((x: T) => string) | {
    format: (x: T) => string;
};
export declare function RFormat<T = any>(x: T, f: Format<T>): any;
declare class DL extends RV<URL> {
    query: {
        [fld: string]: string;
    };
    constructor();
    basepath: string;
    get subpath(): string;
    set subpath(s: string);
    get SP(): URLSearchParams;
    search(key: string, val: string): string;
    RVAR(key: string, df?: string, nm?: string): RV<string> & string;
}
export declare const docLocation: DL & URL, viewport: RV<VisualViewport> & VisualViewport, reroute: (h: MouseEvent | string) => void;
export declare function RCompile(srcN: HTMLElement & {
    b?: booly;
}, setts?: string | Settings): Promise<void>;
export declare function DoUpdate(): Promise<void>;
export {};
