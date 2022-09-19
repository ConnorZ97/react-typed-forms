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
  Error = 32,
  All = Value | Valid | Touched | Disabled | Error | Dirty,
  Validate = 64,
}

export type ChangeListener<V, S> = [
  ControlChange,
  (control: FormControl<V, S>, cb: ControlChange) => void
];

let controlCount = 0;

export interface BaseControlMetadata {
  element?: HTMLElement | null;
}

type FormControlFields<V> = V extends object
  ? { [K in keyof V]-?: FormControl<V[K]> }
  : never;

type FormControlElems<V, M> = V extends Array<infer E>
  ? FormControl<E, M>[]
  : never;

export type ControlValueTypeOut<C> = C extends FormControl<infer V> ? V : never;
export type ValueTypeForControl<C> = C extends FormControl<infer V> ? V : never;
export type Control<V> = FormControl<V>;

export type GroupControl<C> = FormControl<{
  [K in keyof C]: ControlValueTypeOut<C[K]>;
}>;

export type ArrayControl<C> = FormControl<ControlValueTypeOut<C>>;

export interface FormControl<V, M = BaseControlMetadata> {
  readonly uniqueId: number;
  readonly stateVersion: number;
  setTouched(showValidation: boolean): void;
  markAsClean(): void;
  readonly value: V;
  readonly error?: string;
  readonly valid: boolean;
  readonly dirty: boolean;
  readonly disabled: boolean;
  readonly touched: boolean;
  setValue(v: V, initial?: boolean): FormControl<V, M>;
  groupedChanges(run: () => void): FormControl<V, M>;
  unfreeze(notify?: boolean): void;
  freeze(notify?: boolean): void;
  addChangeListener(
    listener: (control: FormControl<V, M>, change: ControlChange) => void,
    mask?: ControlChange
  ): void;
  removeChangeListener(
    listener: (control: FormControl<V, M>, change: ControlChange) => void
  ): void;
  element: M extends BaseControlMetadata ? M["element"] : never;
  setError(error?: string | null): FormControl<V, M>;
  validate(): FormControl<V, M>;
  readonly fields: undefined extends V
    ? FormControlFields<V> | undefined
    : FormControlFields<V>;
  toObject(): V;
  setDisabled(disabled: boolean): FormControl<V, M>;
  readonly initialValue: V;

  // array
  readonly elems: undefined extends V
    ? FormControlElems<V, M> | undefined
    : FormControlElems<V, M>;
  update(f: (orig: FormControlElems<V, M>) => FormControlElems<V, M>): void;
  remove(
    child: V extends Array<infer A> ? number | FormControl<A, M> : never
  ): void;
  add(child: V extends Array<infer A> ? A : never, index?: number): void;
}

interface ChildBuilder<V, S> {}

export class ControlImpl<V, M> implements FormControl<V, M> {
  uniqueId = ++controlCount;
  valueSynced = true;
  initialValue: V;
  private _fieldsProxy?: V extends object
    ? { [K in keyof V]-?: FormControl<V[K]> }
    : never;

  constructor(
    private _value: V,
    public error: string | undefined,
    protected meta: M,
    protected flags: ControlFlags,
    protected listeners: ChangeListener<V, M>[],
    private _children?:
      | { [k: string | symbol]: FormControl<any, M> }
      | FormControl<any, M>[],
    private _childListener?: ChangeListener<any, M>,
    private _makeChild?: (
      key: string | symbol | undefined,
      value: any
    ) => FormControl<any, M>
  ) {
    this.initialValue = _value;
    if (_children) {
      (Array.isArray(_children) ? _children : Object.values(_children)).forEach(
        (fc) => {
          const cl = this.childListener;
          fc.addChangeListener(cl[1], cl[0]);
        }
      );
    }
  }

  stateVersion: number = 0;
  /**
   * @internal
   */
  freezeCount: number = 0;
  /**
   * @internal
   */
  frozenChanges: ControlChange = 0;

  /**
   * @internal
   */
  updateError(error?: string | null): ControlChange {
    if (this.error !== error) {
      this.error = error ? error : undefined;
      return ControlChange.Error | this.updateValid(!Boolean(error));
    }
    return this.updateValid(!Boolean(error));
  }

  get valid() {
    return Boolean(this.flags & ControlFlags.Valid);
  }

  get dirty() {
    return Boolean(this.flags & ControlFlags.Dirty);
  }

  get disabled() {
    return Boolean(this.flags & ControlFlags.Disabled);
  }

  get touched() {
    return Boolean(this.flags & ControlFlags.Touched);
  }

  setFlag(flag: ControlFlags, b: boolean) {
    this.flags = b ? this.flags | flag : this.flags & ~flag;
  }

  /**
   * @internal
   */
  updateValid(valid: boolean): ControlChange {
    if (this.valid !== valid) {
      this.setFlag(ControlFlags.Valid, valid);
      return ControlChange.Valid;
    }
    return 0;
  }

  /**
   * @internal
   */
  updateDisabled(disabled: boolean): ControlChange {
    if (this.disabled !== disabled) {
      this.setFlag(ControlFlags.Disabled, disabled);
      return ControlChange.Disabled;
    }
    return 0;
  }

  /**
   * @internal
   */
  updateDirty(dirty: boolean): ControlChange {
    if (this.dirty !== dirty) {
      this.setFlag(ControlFlags.Dirty, dirty);
      return ControlChange.Dirty;
    }
    return 0;
  }

  /**
   * @internal
   */
  updateTouched(touched: boolean): ControlChange {
    if (this.touched !== touched) {
      this.setFlag(ControlFlags.Touched, touched);
      return ControlChange.Touched;
    }
    return 0;
  }

  get childListener(): ChangeListener<any, M> {
    if (!this._childListener) {
      this._childListener = makeChildListener<V, M>(this);
    }
    return this._childListener;
  }

  /**
   * @internal
   */
  private runListeners(changed: ControlChange) {
    this.frozenChanges = 0;
    this.stateVersion++;
    this.listeners.forEach(([m, cb]) => {
      if ((m & changed) !== 0) cb(this, changed);
    });
  }

  /**
   * @internal
   */
  runChange(changed: ControlChange): FormControl<V, M> {
    if (changed) {
      if (this.freezeCount === 0) {
        this.runListeners(changed);
      } else {
        this.frozenChanges |= changed;
      }
    }
    return this;
  }

  groupedChanges(run: () => void): this {
    this.freeze();
    run();
    this.unfreeze();
    return this;
  }

  unfreeze() {
    this.freezeCount--;
    if (this.freezeCount === 0) {
      this.runListeners(this.frozenChanges);
    }
  }

  freeze() {
    this.freezeCount++;
  }

  addChangeListener(
    listener: (control: FormControl<V, M>, change: ControlChange) => void,
    mask?: ControlChange
  ) {
    this.listeners = [
      ...this.listeners,
      [mask ? mask : ControlChange.All, listener],
    ];
  }

  removeChangeListener(
    listener: (control: FormControl<V, M>, change: ControlChange) => void
  ) {
    this.listeners = this.listeners.filter((cl) => cl[1] !== listener);
  }

  setError(error?: string | null): FormControl<V, M> {
    return this.runChange(this.updateError(error));
  }

  /**
   * Run validation listeners.
   */
  validate(): FormControl<V, M> {
    return this.runChange(ControlChange.Validate);
  }

  get fields(): V extends object
    ? { [K in keyof V]-?: FormControl<V[K]> }
    : never {
    if (!this._fieldsProxy) {
      if (!this._children) {
        this._children = {};
      }
      const t = this;
      const p = new Proxy(this._children!, {
        get(
          target: { [p: string | symbol]: FormControl<any, M> },
          p: string | symbol,
          receiver: any
        ): any {
          if (target[p]) {
            return target[p];
          }
          const c = new ControlImpl(
            (t.value as any)[p],
            undefined,
            {} as any,
            ControlFlags.Valid,
            [
              t.childListener,
              [
                ControlChange.Value | ControlChange.Validate,
                (c) => c.setError(undefined),
              ],
            ]
          );
          target[p] = c;
          return c;
        },
      });
      this._fieldsProxy = p as any;
    }
    return this._fieldsProxy!;
  }

  get value(): V {
    if (this.valueSynced) return this._value;

    const newValue = { ...this._value };
    if (this._children) {
      Object.entries(this._children).forEach(([p, c]) => {
        (newValue as any)[p] = c.value;
      });
    }
    console.log("Not sync", this._value, newValue);
    this._value = newValue;
    this.valueSynced = true;
    return this._value;
  }

  markAsClean(): void {}

  get elems(): undefined extends V
    ? FormControlElems<V, M> | undefined
    : FormControlElems<V, M> {
    if (!this._children) {
      this._children = [];
    }
    return this._children as any;
  }

  get element(): M extends BaseControlMetadata ? M["element"] : never {
    return (this.meta as any)["element"];
  }

  set element(e: M extends BaseControlMetadata ? M["element"] : never) {
    (this.meta as any)["element"] = e;
  }

  add(child: V extends Array<infer A> ? A : never, index?: number): void {
    const e = this.elems!;
    this._children = [...e, this._makeChild!(undefined, child)];
  }

  remove(
    child: V extends Array<infer A> ? number | FormControl<A, M> : never
  ): void {}

  setValue(v: V, initial?: boolean): FormControl<V, M> {
    if (this._children) {
      this.groupedChanges(() => {
        if (Array.isArray(this._children)) {
        } else {
          Object.entries(this._children!).forEach(([p, fc]) => {
            fc.setValue((v as any)[p], initial);
          });
        }
        // TODO what about when fields dont have form controls yet?
      });
      return this;
    } else {
      if (this._value === v) {
        return this;
      }
      this._value = v;
      return this.runChange(ControlChange.Value);
    }
  }

  toObject(): V {
    return this.value;
  }

  update(f: (orig: FormControlElems<V, M>) => FormControlElems<V, M>): void {}

  /**
   * @internal
   */
  protected updateAll(change: (c: ControlImpl<any, M>) => ControlChange) {
    this.visitChildren(
      (c) => {
        c.runChange(change(c));
        return true;
      },
      true,
      true
    );
  }

  visitChildren(
    visit: (c: ControlImpl<any, M>) => boolean,
    doSelf?: boolean,
    recurse?: boolean
  ): boolean {
    if (doSelf && !visit(this as unknown as ControlImpl<any, M>)) {
      return false;
    }
    const controls = this.getChildControls();
    for (const c of controls) {
      if (!visit(c)) {
        return false;
      }
      if (
        recurse &&
        !(c as ControlImpl<any, M>).visitChildren(visit, false, true)
      ) {
        return false;
      }
    }
    return true;
  }

  protected getChildControls(): ControlImpl<any, M>[] {
    if (this._children) {
      return Object.values(this._children) as ControlImpl<any, M>[];
    }
    return [];
  }

  /**
   * Set the disabled flag.
   * @param disabled
   */
  setDisabled(disabled: boolean): this {
    this.updateAll((c) => c.updateDisabled(disabled));
    return this;
  }

  /**
   * Set the touched flag.
   * @param touched
   */
  setTouched(touched: boolean): this {
    this.updateAll((c) => c.updateTouched(touched));
    return this;
  }

  isAnyChildDirty(): boolean {
    return !this.visitChildren((c) => !c.dirty);
  }
}

export type ControlCreator<V> = () => FormControl<V>;

export type ControlDefType<T> = T extends () => FormControl<infer V> ? V : T;

export interface FormControlBuilder<V, M> {
  build(): FormControl<V, M>;
}

// export function buildGroup<V>(): (group: any) => () => FormControl<V> {
//   return undefined as any;
// }
//
// export function groupControl<V>(group: V): () => FormControl<V> {
//   return undefined as any;
// }

/**
 * Define a form control containing values of type V
 * @param value Initial value for control
 * @param validator An optional synchronous validator
 * @param equals An optional equality function
 */
export function control<V>(
  value: V,
  validator?: ((v: V) => string | undefined) | null,
  equals?: (a: V, b: V) => boolean
): () => FormControl<V> {
  return () => {
    const error = validator?.(value);
    const flags = error ? 0 : ControlFlags.Valid;
    const listeners: ChangeListener<V, BaseControlMetadata>[] =
      validator === null
        ? []
        : [
            [
              ControlChange.Value | ControlChange.Validate,
              (c) => {
                c.setError(validator?.(c.value));
              },
            ],
          ];
    return new ControlImpl<V, BaseControlMetadata>(
      value,
      error,
      { element: null },
      flags,
      listeners
    );
  };
}

export function arrayControl<CHILD>(
  child: CHILD
): () => FormControl<ControlDefType<CHILD>[]> {
  return () => {
    return new ControlImpl<ControlDefType<CHILD>[], BaseControlMetadata>(
      [],
      undefined,
      { element: null },
      ControlFlags.Valid,
      [],
      undefined,
      undefined,
      (key, value) =>
        new ControlImpl<any, BaseControlMetadata>(
          value,
          undefined,
          { element: null },
          ControlFlags.Valid,
          []
        )
    );
  };
}

export function arraySelectionControl<V>(
  child: FormControl<V[]>,
  getKey: (v: V) => any,
  getElemKey: (elem: FormControl<V>) => any,
  defaultValues?: V[]
): () => FormControl<V[]> {
  throw "Not yet arraySelectionControl";
}

/**
 *
 * @param children
 */
export function groupControl<DEF extends { [t: string]: any }>(
  children: DEF
): () => FormControl<{
  [K in keyof DEF]: ControlDefType<DEF[K]>;
}> {
  const defEntries = Object.entries(children);
  const builderProps: [string, Function][] = defEntries.filter(
    ([p, v]) => typeof v === "function"
  );
  return () => {
    let allValid = true;
    const simpleValues: [string, any][] = defEntries.filter(
      ([p, v]) => typeof v !== "function"
    );
    const initialFields: [string, FormControl<any>][] = builderProps.map(
      ([p, v]) => {
        const fc = v() as FormControl<any>;
        allValid &&= fc.valid;
        simpleValues.push([p, fc.value]);
        return [p, fc];
      }
    );
    return new ControlImpl(
      Object.fromEntries(simpleValues),
      undefined,
      {},
      allValid ? ControlFlags.Valid : 0,
      [],
      Object.fromEntries(initialFields)
    ) as any;
  };
}

/**
 * Create a form group function which only accepts
 * valid definitions that will produce values of given type T.
 */
export function buildGroup<T>(): <
  DEF extends { [K in keyof T]: T[K] | (() => FormControl<T[K]>) }
>(
  children: DEF
) => () => FormControl<{
  [K in keyof T]: ControlDefType<T[K]>;
}> {
  return groupControl as any;
}

function makeChildListener<V, M>(
  parent: FormControl<V, M>
): ChangeListener<any, M> {
  const pc = parent as ControlImpl<V, M>;

  return [
    ControlChange.Value |
      ControlChange.Valid |
      ControlChange.Touched |
      ControlChange.Dirty,
    (child, change) => {
      let flags: ControlChange = change & ControlChange.Value;
      pc.valueSynced &&= !Boolean(change & ControlChange.Value);
      if (change & ControlChange.Valid) {
        const valid =
          child.valid && (parent.valid || pc.visitChildren((c) => c.valid));
        flags |= pc.updateValid(valid);
      }
      if (change & ControlChange.Dirty) {
        const dirty = child.dirty || (parent.dirty && pc.isAnyChildDirty());
        flags |= pc.updateDirty(dirty);
      }
      if (change & ControlChange.Touched) {
        flags |= pc.updateTouched(child.touched || parent.touched);
      }
      pc.runChange(flags);
    },
  ];
}

export function groupFromControls<
  M,
  C extends { [k: string]: FormControl<any> }
>(fields: C): FormControl<{ [K in keyof C]: ControlValueTypeOut<C[K]> }> {
  const c = new ControlImpl<{ [K in keyof C]: ControlValueTypeOut<C[K]> }, M>(
    {} as any,
    undefined,
    {} as any,
    ControlFlags.Valid,
    [],
    fields
  );
  c.valueSynced = false;
  return c;
}
