export enum ControlFlags {
  Valid = 1,
  Touched = 2,
  Dirty = 4,
  Disabled = 8,
}

export enum ControlChange {
  Valid = 1,
  Touched = 2,
  Dirty = 4,
  Disabled = 8,
  Value = 16,
  InitialValue = 32,
  Error = 64,
  All = Value | Valid | Touched | Disabled | Error | Dirty | InitialValue,
  Structure = 128,
  Validate = 256,
}

export type ControlValidator<V> = ((v: V) => string | undefined) | null;
export type ControlValue<C> = C extends Control<infer V> ? V : never;
export type ElemType<V> = NonNullable<V> extends (infer E)[] ? E : never;

export interface Control<V> {
  readonly uniqueId: number;
  readonly stateVersion: number;
  value: V;
  readonly initialValue: V;
  readonly error?: string;
  readonly valid: boolean;
  readonly dirty: boolean;
  readonly disabled: boolean;
  readonly touched: boolean;
  meta: { [key: string]: any };

  addChangeListener(
    listener: ChangeListenerFunc<Control<V>>,
    mask?: ControlChange
  ): void;

  removeChangeListener(listener: ChangeListenerFunc<Control<V>>): void;

  setTouched(showValidation: boolean): void;

  setError(error?: string | null): Control<V>;

  setDisabled(disabled: boolean): Control<V>;

  setValue(v: V, initial?: boolean): Control<V>;

  setInitialValue(v: V): Control<V>;

  setValueAndInitial(v: V, iv: V): Control<V>;

  groupedChanges(run: () => void): Control<V>;

  isValueEqual(v: V): boolean;

  validate(): Control<V>;

  isNonNull(): this is Control<NonNullable<V>>;

  isNull(): boolean;

  markAsClean(): void;

  clearErrors(): void;

  lookupControl(path: (string | number)[]): Control<any> | undefined;

  element: HTMLElement | null;

  as<NV extends V>(): Control<NV>;

  /**
   * @deprecated Use .value
   */
  toValue(): V;

  /**
   * @deprecated Use .value
   */
  toObject(): V;

  /**
   * @deprecated Use .value
   */
  toArray(): V;
}

export interface ControlSetup<V, M = object> {
  meta?: M;
  validator?: ControlValidator<V>;
  equals?: (a: V, b: V) => boolean;
  elems?: ControlSetup<ElemType<V>, M> | (() => ControlSetup<ElemType<V>, M>);
  fields?: {
    [K in keyof V]?: ControlSetup<V[K], M> | (() => ControlSetup<V[K], M>);
  };
  create?: (value: V, initial: V, setup: ControlSetup<V, M>) => Control<V>;
}

export type ChangeListenerFunc<C> = (control: C, cb: ControlChange) => void;
export type ChangeListener<V> = [ControlChange, ChangeListenerFunc<Control<V>>];