# React typed forms

Yes, another form library for React. **Why?**

To take advantage of Typescript's advanced type system to give you more safety and a nice dev experience within your IDE.

Other reasons to use this library:

- [Zero re-rendering](packages/examples/basic.tsx) of parent components
- Easy validation including [async validators](packages/examples/validation.tsx).
- Standard form/related state (disabled, dirty, show validatons, error message).
- [Arrays](packages/example/arrays.tsx) and nested forms.
- Zero dependencies besides React.
- MUI binding

## Simple example

```tsx
import {
  control,
  useFormState,
  Finput,
  buildGroup,
} from "@react-typed-forms/core";
import { useState } from "react";
import React from "react";

type SimpleForm = {
  firstName: string;
  lastName: string;
};

const FormDef = buildGroup<SimpleForm>()({
  firstName: control(),
  lastName: control((v) => (!v ? "Required field" : undefined)),
});

export function SimpleExample() {
  const formState = useFormState(FormDef, { firstName: "", lastName: "" });
  const { fields } = formState;
  const [formData, setFormData] = useState<SimpleForm>();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setFormData(formState.toObject());
      }}
    >
      <label>First Name</label>
      <Finput type="text" state={fields.firstName} />
      <label>Last Name *</label>
      <Finput type="text" state={fields.lastName} />
      <div>
        <button>Validate and toObject()</button>
      </div>
      {formData && (
        <pre className="my-2">{JSON.stringify(formData, undefined, 2)}</pre>
      )}
    </form>
  );
}
```

## Define your form

In order to render your form you first need to define it's structure and validators.

The function `buildGroup<T>()` can be used to create a definition that matches the structure of your form data type. This comes in handy when you are creating forms based on types which are generated from a swagger or OpenAPI definition.

```tsx
type SimpleForm = {
  firstName: string;
  lastName: string;
};

const FormDef = buildGroup<SimpleForm>()({
  firstName: control(),
  lastName: control((v) => (!v ? "Required field" : undefined)),
});
```

`control<V>()` is used to define a control which holds a single immutable value of type V. When used within `buildGroup` the type will be inferred.

Instead of starting with a datatype and checking the form structure, you can also go with a form first approach:

```tsx
const FormDef = formGroup({
  firstName: control<string>(),
  lastName: control<string>((v) => (!v ? "Required field" : undefined)),
});

type SimpleForm = FormDataType<typeof FormDef>;
```

## Render your form

With the form defined you need to initialise it within your component by using the `useFormState()` hook:

```tsx
const formState = useFormState(FormDef, { firstName: "", lastName: "" });
```

This will return an instance of `GroupControl` which has a `fields` property which contains `FormControl` instances.

The core library contains an `<input>` renderer for `FormControl`s called `Finput` which uses html5's custom validation feature to show errors.

```tsx
return (
  <div>
    <Finput type="text" state={formState.fields.firstName} />
    <Finput type="text" state={formState.fields.lastName} />
  </div>
);
```

There is also a small library [(@react-typed-forms/core)](packages/mui/index.tsx) which has some renderers for the [MUI](https://material-ui.com/) `TextField` component.

## Rendering

Creating renderers for `FormControl`s is very easy, it's a simple matter of using a hook function to register change listening.

The easiest way is to just use `useFormStateVersion()` to trigger a re-render whenever any change that needs to be re-rendered occurs.

The most low level change listener hook is `useChangeListener()` which just runs an arbitrary listener function for the given change types.

Let's take a look at the `FInput` implementation which uses both:

```tsx
// Only allow strings and numbers
export type FinputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  state: FormControl<string | number>;
};

export function Finput({ state, ...others }: FinputProps) {
  // Re-render on value or disabled state change
  useFormStateVersion(state, NodeChange.Value | NodeChange.Disabled);

  // We need the DOM element for setting validation errors
  const domRef = useRef<HTMLInputElement | null>(null);

  // Update the HTML5 custom validity whenever the error message is changed/cleared
  useChangeListener(
    state,
    () => domRef.current?.setCustomValidity(state.error ?? ""),
    NodeChange.Error
  );
  return (
    <input
      ref={(r) => {
        domRef.current = r;
        if (r) r.setCustomValidity(state.error ?? "");
      }}
      value={state.value}
      disabled={state.disabled}
      onChange={(e) => state.setValue(e.currentTarget.value)}
      onBlur={() => state.setShowValidation(true)}
      {...others}
    />
  );
}
```

## Other listener hooks

TODO

- `useAsyncValidator()`
- `useFormListener()`
- `useFormListenerComponent()`
- `useValidChangeComponent()`
