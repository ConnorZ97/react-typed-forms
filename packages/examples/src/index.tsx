import React, { FC, Fragment } from "react";
import { render } from "react-dom";
import { BasicFormExample } from "./basic";
import { ArraysExample } from "./arrays";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { ValidationExample } from "./validation";
import { SimpleExample } from "./simple";
import { OptionalsTest } from "./optionals";

const examples: [string, FC, string][] = [
  ["/simple", SimpleExample, "Simple"],
  ["/basic", BasicFormExample, "Basic"],
  ["/arrays", ArraysExample, "Arrays"],
  ["/validation", ValidationExample, "Validation"],
];
render(
  <BrowserRouter>
    <div className="m-2">
      {examples.map(([to, _, text], idx) => (
        <Fragment key={idx}>
          {idx > 0 && " | "} <Link to={to}>{text}</Link>
        </Fragment>
      ))}
    </div>
    {examples.map(([path, component]) => (
      <Route key={path} path={path} component={component} />
    ))}
    <Route key="/optionals" path="/optionals" component={OptionalsTest} />
  </BrowserRouter>,
  document.getElementById("main")
);
