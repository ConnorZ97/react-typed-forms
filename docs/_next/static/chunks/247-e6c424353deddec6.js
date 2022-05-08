"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[247],{7247:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),i(n(9207),t),i(n(6606),t)},9207:function(e,t){var n,r,i=this&&this.__extends||function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},e(t,n)};return function(t,n){if("function"!==typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),o=this&&this.__assign||function(){return o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},o.apply(this,arguments)},u=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))};Object.defineProperty(t,"__esModule",{value:!0}),t.buildGroup=t.groupControl=t.arraySelectionControl=t.arrayControl=t.control=t.GroupControl=t.ArraySelectionControl=t.ArrayControl=t.ParentControl=t.FormControl=t.Control=t.ControlChange=t.ControlFlags=void 0,function(e){e[e.Valid=1]="Valid",e[e.Touched=2]="Touched",e[e.Dirty=4]="Dirty",e[e.Disabled=8]="Disabled"}(n=t.ControlFlags||(t.ControlFlags={})),function(e){e[e.Valid=1]="Valid",e[e.Touched=2]="Touched",e[e.Dirty=4]="Dirty",e[e.Disabled=8]="Disabled",e[e.Value=16]="Value",e[e.Error=32]="Error",e[e.All=63]="All",e[e.Validate=64]="Validate",e[e.Freeze=128]="Freeze"}(r=t.ControlChange||(t.ControlChange={}));var a=0,l=function(){function e(){this.flags=n.Valid,this.uniqueId=++a,this.element=null,this.listeners=[],this.stateVersion=0,this.freezeCount=0,this.frozenChanges=0}return e.prototype.updateError=function(e){return this.error!==e?(this.error=e,r.Error|this.updateValid(!Boolean(e))):this.updateValid(!Boolean(e))},Object.defineProperty(e.prototype,"valid",{get:function(){return Boolean(this.flags&n.Valid)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"dirty",{get:function(){return Boolean(this.flags&n.Dirty)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"disabled",{get:function(){return Boolean(this.flags&n.Disabled)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"touched",{get:function(){return Boolean(this.flags&n.Touched)},enumerable:!1,configurable:!0}),e.prototype.setFlag=function(e,t){this.flags=t?this.flags|e:this.flags&~e},e.prototype.updateValid=function(e){return this.valid!==e?(this.setFlag(n.Valid,e),r.Valid):0},e.prototype.updateDisabled=function(e){return this.disabled!==e?(this.setFlag(n.Disabled,e),r.Disabled):0},e.prototype.updateDirty=function(e){return this.dirty!==e?(this.setFlag(n.Dirty,e),r.Dirty):0},e.prototype.updateTouched=function(e){return this.touched!==e?(this.setFlag(n.Touched,e),r.Touched):0},e.prototype.runListeners=function(e){var t=this;this.frozenChanges=0,this.stateVersion++,this.listeners.forEach((function(n){var r=n[0],i=n[1];0!==(r&e)&&i(t,e)}))},e.prototype.runChange=function(e){return e&&(0===this.freezeCount?this.runListeners(e):this.frozenChanges|=e),this},e.prototype.groupedChanges=function(e){return this.freeze(!0),e(),this.unfreeze(!0),this},e.prototype.unfreeze=function(e){this.freezeCount--,0===this.freezeCount&&this.runListeners(this.frozenChanges|(e?r.Freeze:0))},e.prototype.freeze=function(e){var t=this;this.freezeCount++,e&&1===this.freezeCount&&this.listeners.forEach((function(e){var n=e[0],i=e[1];0!==(n&r.Freeze)&&i(t,r.Freeze)}))},e.prototype.addChangeListener=function(e,t){this.listeners=u(u([],this.listeners,!0),[[t||r.All,e]],!1)},e.prototype.removeChangeListener=function(e){this.listeners=this.listeners.filter((function(t){return t[1]!==e}))},e.prototype.setError=function(e){return this.runChange(this.updateError(e))},e.prototype.validate=function(){return this.runChange(r.Validate)},e}();function s(e,t,n){e.setValue(t,n)}t.Control=l;var c=function(e){function t(t,n,i){var o=e.call(this)||this;return o.value=t,o.initialValue=t,o.equals=null!==i&&void 0!==i?i:function(e,t){return e===t},null!==n&&(o.setError(null===n||void 0===n?void 0:n(t)),o.addChangeListener((function(){var e=null===n||void 0===n?void 0:n(o.value);o.runChange(o.updateError(e))}),r.Value|r.Validate)),o}return i(t,e),t.prototype.toValue=function(){return this.value},t.prototype.setValue=function(e,t){return this.equals(e,this.value)?t&&(this.initialValue=e,this.runChange(this.updateDirty(!1))):(this.value=e,t&&(this.initialValue=e),this.runChange(r.Value|this.updateDirty(!this.equals(e,this.initialValue)))),this},t.prototype.markAsClean=function(){this.initialValue=this.value,this.runChange(this.updateDirty(!1))},t.prototype.visitChildren=function(e,t,n){return!t||e(this)},t.prototype.setDisabled=function(e){return this.runChange(this.updateDisabled(e)),this},t.prototype.setTouched=function(e){return this.runChange(this.updateTouched(e)),this},t}(l);t.FormControl=c;var f=function(e){function t(t){var n=e.call(this)||this;return n.parentListener=t(n),n}return i(t,e),t.prototype.updateAll=function(e){this.visitChildren((function(t){return t.runChange(e(t)),!0}),!0,!0)},t.prototype.isAnyChildDirty=function(){return!this.visitChildren((function(e){return!e.dirty}))},t.prototype.controlFromDef=function(e){var t=this.parentListener,n=e();return n.addChangeListener(t[1],t[0]),t[1](n,r.All),n},t.prototype.setDisabled=function(e){return this.updateAll((function(t){return t.updateDisabled(e)})),this},t.prototype.setTouched=function(e){return this.updateAll((function(t){return t.updateTouched(e)})),this},t.prototype.validate=function(){return this.updateAll((function(){return r.Validate})),this},t.prototype.clearErrors=function(){return this.updateAll((function(e){return e.updateError(void 0)})),this},t.prototype.lookupControl=function(e){for(var t,n=this,r=0;r<e.length&&n;){var i=e[r];if(n instanceof p)n=n.fields[i];else if(n instanceof h&&"number"==typeof i)n=n.elems[i];else{if(!(n instanceof d&&"number"==typeof i))return null;n=null===(t=n.elems.filter((function(e){return e.fields.selected.value}))[i])||void 0===t?void 0:t.fields.value}r++}return n},t}(l);t.ParentControl=f;var h=function(e){function t(t,n,r){var i=e.call(this,null!==n&&void 0!==n?n:C)||this;return i.childDefinition=t,i.elems=[],i.initialFields=[],i.findExisting=null!==r&&void 0!==r?r:function(e,t){return t<e.length?e[t]:void 0},i}return i(t,e),t.prototype.setValue=function(e,t){var n=this;return e=null!==e&&void 0!==e?e:[],this.groupedChanges((function(){var i=e.length!==n.elems.length?r.Value:0,o=e.map((function(e,o){var u=n.findExisting(n.elems,o,e,Boolean(t));if(u)return(o>=n.elems.length||n.elems[o]!==u)&&(i|=r.Value),s(u,e,t),u;i|=r.Value;var a=n.controlFromDef(n.childDefinition);return s(a,e,!0),a}));n.elems=o,t?(n.initialFields=o,i|=n.updateDirty(!1)):i|=n.updateDirty(n.isAnyChildDirty()),n.runChange(i)}))},t.prototype.markAsClean=function(){var e=this;return this.groupedChanges((function(){e.runChange(e.updateDirty(!1)),e.initialFields=e.elems,e.elems.forEach((function(e){return e.markAsClean()}))}))},t.prototype.markArrayClean=function(){this.initialFields=this.elems,this.runChange(this.updateDirty(this.isAnyChildDirty()))},t.prototype.toArray=function(){return this.elems.map((function(e){return e.toValue()}))},t.prototype.toValue=function(){return this.toArray()},t.prototype.visitChildren=function(e,t,n){return!(t&&!e(this))&&(!!this.elems.every(e)&&(!n||this.elems.every((function(t){return t.visitChildren(e,!1,!0)}))))},t.prototype.add=function(e){var t=this.controlFromDef(this.childDefinition);return this.elems=u([],this.elems,!0),void 0!==e?this.elems.splice(e,0,t):this.elems.push(t),this.runChange(r.Value|this.updateArrayFlags()),t},t.prototype.update=function(e){var t=this,n=e(this.elems,(function(e){var n=t.controlFromDef(t.childDefinition);return s(n,e),n}));this.elems!==n&&(this.elems=n,this.runChange(r.Value|this.updateArrayFlags()))},t.prototype.remove=function(e){return this.elems=this.elems.filter((function(t,n){return n!==e})),this.runChange(r.Value|this.updateArrayFlags())},t.prototype.isAnyChildDirty=function(){var t=this.elems,n=this.initialFields;return t===n?e.prototype.isAnyChildDirty.call(this):t.length!==n.length||t.some((function(e,t){return e!==n[t]||e.dirty}))},t.prototype.updateArrayFlags=function(){return this.updateTouched(!0)|this.updateDirty(this.isAnyChildDirty())|this.updateValid(this.visitChildren((function(e){return e.valid})))},t}(f);t.ArrayControl=h;var d=function(e){function t(t,n,i,o){var u=e.call(this,C)||this;u.getKey=n,u.getElemKey=i,u.defaultValues=null!==o&&void 0!==o?o:[];var a=function(){return new p({selected:new c(!1),value:t()},(function(e){return t=e,[r.Value|r.Valid|r.Touched|r.Dirty,function(e,n){var i=n&r.Value;if(n&r.Valid){var o=e.valid&&(t.valid||t.visitChildren((function(e){return e.valid})));i|=t.updateValid(o)}if(n&r.Dirty){var u=t.fields,a=u.selected,l=u.value,s=a.dirty||a.value&&l.dirty;i|=t.updateDirty(s)}n&r.Touched&&(i|=t.updateTouched(e.touched||t.touched)),t.runChange(i)}];var t}))};return u.underlying=new h(a,(function(e){return u.parentListener}),(function(e,t,r,o){var l=n(r.value),c=e.find((function(e){return i(e.fields.value)===l}));if(c||o)return c;var f=u.controlFromDef(a);return s(f,{selected:!1,value:r.value},!0),f})),u}return i(t,e),Object.defineProperty(t.prototype,"elems",{get:function(){return this.underlying.elems},enumerable:!1,configurable:!0}),t.prototype.add=function(e){var t=this.underlying.add();return t.fields.selected.setValue(null===e||void 0===e||e),t},t.prototype.setDefaultValues=function(e){return this.defaultValues=e,this},t.prototype.markAsClean=function(){this.underlying.markAsClean()},t.prototype.setValue=function(e,t){var n=this;if(t){var r=this.defaultValues.map((function(e){return{selected:!1,value:e}}));e.forEach((function(e){var t=r.find((function(t){return n.getKey(t.value)===n.getKey(e)}));t?(t.selected=!0,t.value=e):r.push({selected:!0,value:e})})),this.underlying.setValue(r,!0)}else{var i=this.elems.filter((function(t){return e.every((function(e){return n.getElemKey(t.fields.value)!==n.getKey(e)}))}));this.underlying.setValue(u(u([],e.map((function(e){return{selected:!0,value:e}})),!0),i.map((function(e){return{selected:!1,value:e.fields.value.toValue()}})),!0))}return this},t.prototype.toArray=function(){var e=[];return this.underlying.elems.forEach((function(t){t.fields.selected.value&&e.push(t.fields.value.toValue())})),e},t.prototype.toValue=function(){return this.toArray()},t.prototype.visitChildren=function(e,t,n){return!(t&&!e(this))&&this.underlying.visitChildren(e,t,n)},t}(f);t.ArraySelectionControl=d;var p=function(e){function t(t,n){var r=e.call(this,null!==n&&void 0!==n?n:C)||this;return r.fields={},r.addFields(t),r}return i(t,e),t.prototype.addFields=function(e){this.fields=o(o({},this.fields),e);var t=this.parentListener;for(var r in e)e[r].addChangeListener(t[1],t[0]);return this.setFlag(n.Valid,this.visitChildren((function(e){return e.valid}))),this},t.prototype.subGroup=function(e){var n=this,i=new t(e(this.fields));return this.addChangeListener((function(e){0===e.freezeCount?i.unfreeze():i.freeze()}),r.Freeze),i.addChangeListener((function(e){0===e.freezeCount?n.unfreeze():n.freeze()}),r.Freeze),i},t.prototype.visitChildren=function(e,t,n){if(t&&!e(this))return!1;var r=this.fields;for(var i in r){if(!e(r[i]))return!1;if(n&&!r[i].visitChildren(e,!1,!0))return!1}return!0},t.prototype.setValue=function(e,t){var n=this;return e=null!==e&&void 0!==e?e:{},this.groupedChanges((function(){var r=n.fields;for(var i in r)s(r[i],e[i],t)}))},t.prototype.markAsClean=function(){var e=this;return this.groupedChanges((function(){e.runChange(e.updateDirty(!1));var t=e.fields;for(var n in t)t[n].markAsClean()}))},t.prototype.toObject=function(){var e={};for(var t in this.fields){var n=this.fields[t];e[t]=n.toValue()}return e},t.prototype.toValue=function(){return this.toObject()},t}(f);function v(e){return"function"===typeof e?e:function(){return new c(e)}}function y(e){return function(){var t={};for(var n in e)t[n]=v(e[n])();return new p(t)}}function C(e){return[r.Value|r.Valid|r.Touched|r.Dirty,function(t,n){var i=n&r.Value;if(n&r.Valid){var o=t.valid&&(e.valid||e.visitChildren((function(e){return e.valid})));i|=e.updateValid(o)}if(n&r.Dirty){var u=t.dirty||e.dirty&&e.isAnyChildDirty();i|=e.updateDirty(u)}n&r.Touched&&(i|=e.updateTouched(t.touched||e.touched)),e.runChange(i)}]}t.GroupControl=p,t.control=function(e,t,n){return function(){return new c(e,t,n)}},t.arrayControl=function(e){return function(){return new h(v(e))}},t.arraySelectionControl=function(e,t,n,r){return function(){return new d(v(e),t,n,r)}},t.groupControl=y,t.buildGroup=function(){return y}},6606:function(e,t,n){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},r.apply(this,arguments)},i=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),u=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return o(t,e),t},a=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n};Object.defineProperty(t,"__esModule",{value:!0}),t.Fcheckbox=t.Fselect=t.Finput=t.createRenderer=t.genericProps=t.useAsyncValidator=t.FormArray=t.FormValidAndDirty=t.useControlStateComponent=t.useControlStateVersion=t.useControlValue=t.useControlState=t.useValueChangeEffect=t.useControlChangeEffect=void 0;var l=u(n(6393)),s=n(9207);function c(e,t,n,r){var i=(0,l.useMemo)((function(){return t}),null!==r&&void 0!==r?r:[e]);(0,l.useEffect)((function(){return e.addChangeListener(i,n),function(){return e.removeChangeListener(i)}}),[i])}function f(e,t,n){var r=(0,l.useState)((function(){return t(e)})),i=r[0],o=r[1];return(0,l.useEffect)((function(){o((function(n){return t(e,n)}))}),[e]),c(e,(function(e){return o((function(n){return t(e,n)}))}),n),i}function h(e,t){return f(e,(function(e){return e.stateVersion}),t)}function d(e){return e instanceof s.FormControl?e.value:e.stateVersion}function p(e){return{ref:function(t){e.element=t},value:e.value,disabled:e.disabled,errorText:e.touched&&!e.valid?e.error:void 0,onBlur:function(){return e.setTouched(!0)},onChange:function(t){return e.setValue(t.target.value)}}}t.useControlChangeEffect=c,t.useValueChangeEffect=function(e,t,n){var r=(0,l.useRef)([t,void 0]);r.current[0]=t;var i=(0,l.useMemo)((function(){return function(e){n?(r.current[1]&&clearTimeout(r.current[1]),r.current[1]=setTimeout((function(){r.current[0](e.toValue())}),n)):r.current[0](e.toValue())}}),[r]);(0,l.useEffect)((function(){return e.addChangeListener(i,s.ControlChange.Value),function(){return e.removeChangeListener(i)}}),[e])},t.useControlState=f,t.useControlValue=function(e,t){return f(e,(function(e){return e.value}),t)},t.useControlStateVersion=h,t.useControlStateComponent=function(e,t,n){return(0,l.useMemo)((function(){return function(r){return(0,r.children)(f(e,t,n))}}),[])},t.FormValidAndDirty=function(e){var t=e.state;return(0,e.children)(f(t,(function(e){return e.valid&&e.dirty}),s.ControlChange.Valid|s.ControlChange.Dirty))},t.FormArray=function(e){var t=e.state,n=e.children;return f(t,(function(e){return e.elems}),s.ControlChange.Value),l.default.createElement(l.default.Fragment,null,n(t.elems))},t.useAsyncValidator=function(e,t,n,r){var i=(0,l.useRef)(),o=(0,l.useRef)(),u=null!==r&&void 0!==r?r:d;c(e,(function(e){i.current&&window.clearTimeout(i.current),o.current&&o.current.abort();var r=u(e);i.current=window.setTimeout((function(){var n=new AbortController;o.current=n,t(e,n.signal).then((function(t){u(e)===r&&(e.setTouched(!0),e.setError(t))})).catch((function(e){if(!(e instanceof DOMException&&e.code==DOMException.ABORT_ERR))throw e}))}),n)}),s.ControlChange.Value|s.ControlChange.Validate)},t.genericProps=p,t.createRenderer=function(e,t){return function(n){return h(n.state,t),e(n,p(n.state))}},t.Finput=function(e){var t=e.state,n=a(e,["state"]);h(t,s.ControlChange.Value|s.ControlChange.Disabled),c(t,(function(e){var n,r;return null===(n=t.element)||void 0===n?void 0:n.setCustomValidity(null!==(r=t.error)&&void 0!==r?r:"")}),s.ControlChange.Error);var i=p(t),o=(i.errorText,a(i,["errorText"]));return l.default.createElement("input",r({},o,{ref:function(e){var n;t.element=e,e&&e.setCustomValidity(null!==(n=t.error)&&void 0!==n?n:"")}},n))},t.Fselect=function(e){var t=e.state,n=e.children,i=a(e,["state","children"]);h(t,s.ControlChange.Value|s.ControlChange.Disabled),c(t,(function(e){var n,r;return null===(n=e.element)||void 0===n?void 0:n.setCustomValidity(null!==(r=t.error)&&void 0!==r?r:"")}),s.ControlChange.Error);var o=p(t),u=(o.errorText,a(o,["errorText"]));return l.default.createElement("select",r({},u,{ref:function(e){var n;t.element=e,e&&e.setCustomValidity(null!==(n=t.error)&&void 0!==n?n:"")}},i),n)},t.Fcheckbox=function(e){var t=e.state,n=e.type,i=void 0===n?"checkbox":n,o=a(e,["state","type"]);h(t,s.ControlChange.Value|s.ControlChange.Disabled),c(t,(function(e){var n,r;return null===(n=t.element)||void 0===n?void 0:n.setCustomValidity(null!==(r=t.error)&&void 0!==r?r:"")}),s.ControlChange.Error);var u=p(t),f=u.value,d=(u.onChange,u.errorText,a(u,["value","onChange","errorText"]));return l.default.createElement("input",r({},d,{checked:f,ref:function(e){var n;t.element=e,e&&e.setCustomValidity(null!==(n=t.error)&&void 0!==n?n:"")},onChange:function(e){return t.setValue(!f)},type:i},o))}}}]);