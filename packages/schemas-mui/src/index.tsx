import React from "react";

import {
  ActionRendererRegistration,
  DataRendererRegistration,
  DataRenderType,
  FieldType,
} from "@react-typed-forms/schemas";
import { FDateField, FTextField } from "@react-typed-forms/mui";
import Button, { ButtonProps } from "@mui/material/Button";

export function muiTextfieldRenderer(
  variant?: "standard" | "outlined" | "filled",
): DataRendererRegistration {
  return {
    type: "data",
    schemaType: FieldType.String,
    renderType: DataRenderType.Standard,
    render: (r, makeLabel, { renderVisibility }) => {
      const { title, required } = makeLabel();
      return renderVisibility(
        r.visible,
        <FTextField
          variant={variant}
          required={required}
          fullWidth
          size="small"
          state={r.control}
          label={title}
        />,
      );
    },
  };
}

export function muiActionRenderer(
  variant: ButtonProps["variant"] = "contained",
): ActionRendererRegistration {
  return {
    type: "action",
    render: (p, { renderVisibility }) =>
      renderVisibility(
        p.visible,
        <Button variant={variant} onClick={p.onClick}>
          {p.definition.title}
        </Button>,
      ),
  };
}

export function muiDateRenderer(): DataRendererRegistration {
  return {
    type: "data",
    schemaType: FieldType.Date,
    render: (
      { control, required, visible },
      defaultLabel,
      { renderVisibility },
    ) => {
      const { title } = defaultLabel();
      return renderVisibility(
        visible,
        <FDateField
          label={title}
          fullWidth
          size="small"
          state={control}
          required={required}
        />,
      );
    },
  };
}
