module.exports = [
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/virtual-console.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { EventEmitter } = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
module.exports = class VirtualConsole extends EventEmitter {
    constructor(){
        super();
        this.on("error", ()=>{
        // If "error" event has no listeners,
        // EventEmitter throws an exception
        });
    }
    sendTo(anyConsole, options) {
        if (options === undefined) {
            options = {};
        }
        for (const method of Object.keys(anyConsole)){
            if (typeof anyConsole[method] === "function") {
                function onMethodCall(...args) {
                    anyConsole[method](...args);
                }
                this.on(method, onMethodCall);
            }
        }
        if (!options.omitJSDOMErrors) {
            this.on("jsdomError", (e)=>anyConsole.error(e.stack, e.detail));
        }
        return this;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/not-implemented.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function(nameForErrorMessage, window) {
    if (!window) {
        // Do nothing for window-less documents.
        return;
    }
    const error = new Error(`Not implemented: ${nameForErrorMessage}`);
    error.type = "not implemented";
    window._virtualConsole.emit("jsdomError", error);
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/default-stylesheet.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Ideally, we would use
// https://html.spec.whatwg.org/multipage/rendering.html#the-css-user-agent-style-sheet-and-presentational-hints
// but for now, just use the version from blink. This file is copied from
// https://chromium.googlesource.com/chromium/blink/+/96aa3a280ab7d67178c8f122a04949ce5f8579e0/Source/core/css/html.css
// (removed a line which had octal literals inside since octal literals are not allowed in template strings)
// We use a .js file because otherwise we can't browserify this. (brfs is unusable due to lack of ES2015 support)
module.exports = `
/*
 * The default style sheet used to render HTML.
 *
 * Copyright (C) 2000 Lars Knoll (knoll@kde.org)
 * Copyright (C) 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011 Apple Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Library General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Library General Public License for more details.
 *
 * You should have received a copy of the GNU Library General Public License
 * along with this library; see the file COPYING.LIB.  If not, write to
 * the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA 02110-1301, USA.
 *
 */

@namespace "http://www.w3.org/1999/xhtml";

html {
    display: block
}

:root {
    scroll-blocks-on: start-touch wheel-event
}

/* children of the <head> element all have display:none */
head {
    display: none
}

meta {
    display: none
}

title {
    display: none
}

link {
    display: none
}

style {
    display: none
}

script {
    display: none
}

/* generic block-level elements */

body {
    display: block;
    margin: 8px
}

p {
    display: block;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1__qem;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
}

div {
    display: block
}

layer {
    display: block
}

article, aside, footer, header, hgroup, main, nav, section {
    display: block
}

marquee {
    display: inline-block;
}

address {
    display: block
}

blockquote {
    display: block;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 40px;
    -webkit-margin-end: 40px;
}

figcaption {
    display: block
}

figure {
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 40px;
    -webkit-margin-end: 40px;
}

q {
    display: inline
}

/* nwmatcher does not support ::before and ::after, so we can't render q
correctly: https://html.spec.whatwg.org/multipage/rendering.html#phrasing-content-3
TODO: add q::before and q::after selectors
*/

center {
    display: block;
    /* special centering to be able to emulate the html4/netscape behaviour */
    text-align: -webkit-center
}

hr {
    display: block;
    -webkit-margin-before: 0.5em;
    -webkit-margin-after: 0.5em;
    -webkit-margin-start: auto;
    -webkit-margin-end: auto;
    border-style: inset;
    border-width: 1px;
    box-sizing: border-box
}

map {
    display: inline
}

video {
    object-fit: contain;
}

/* heading elements */

h1 {
    display: block;
    font-size: 2em;
    -webkit-margin-before: 0.67__qem;
    -webkit-margin-after: 0.67em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    font-weight: bold
}

article h1,
aside h1,
nav h1,
section h1 {
    font-size: 1.5em;
    -webkit-margin-before: 0.83__qem;
    -webkit-margin-after: 0.83em;
}

article article h1,
article aside h1,
article nav h1,
article section h1,
aside article h1,
aside aside h1,
aside nav h1,
aside section h1,
nav article h1,
nav aside h1,
nav nav h1,
nav section h1,
section article h1,
section aside h1,
section nav h1,
section section h1 {
    font-size: 1.17em;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1em;
}

/* Remaining selectors are deleted because nwmatcher does not support
:matches() and expanding the selectors manually would be far too verbose.
Also see https://html.spec.whatwg.org/multipage/rendering.html#sections-and-headings
TODO: rewrite to use :matches() when nwmatcher supports it.
*/

h2 {
    display: block;
    font-size: 1.5em;
    -webkit-margin-before: 0.83__qem;
    -webkit-margin-after: 0.83em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    font-weight: bold
}

h3 {
    display: block;
    font-size: 1.17em;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    font-weight: bold
}

h4 {
    display: block;
    -webkit-margin-before: 1.33__qem;
    -webkit-margin-after: 1.33em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    font-weight: bold
}

h5 {
    display: block;
    font-size: .83em;
    -webkit-margin-before: 1.67__qem;
    -webkit-margin-after: 1.67em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    font-weight: bold
}

h6 {
    display: block;
    font-size: .67em;
    -webkit-margin-before: 2.33__qem;
    -webkit-margin-after: 2.33em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    font-weight: bold
}

/* tables */

table {
    display: table;
    border-collapse: separate;
    border-spacing: 2px;
    border-color: gray
}

thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit
}

tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit
}

tfoot {
    display: table-footer-group;
    vertical-align: middle;
    border-color: inherit
}

/* for tables without table section elements (can happen with XHTML or dynamically created tables) */
table > tr {
    vertical-align: middle;
}

col {
    display: table-column
}

colgroup {
    display: table-column-group
}

tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit
}

td, th {
    display: table-cell;
    vertical-align: inherit
}

th {
    font-weight: bold
}

caption {
    display: table-caption;
    text-align: -webkit-center
}

/* lists */

ul, menu, dir {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    -webkit-padding-start: 40px
}

ol {
    display: block;
    list-style-type: decimal;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    -webkit-padding-start: 40px
}

li {
    display: list-item;
    text-align: -webkit-match-parent;
}

ul ul, ol ul {
    list-style-type: circle
}

ol ol ul, ol ul ul, ul ol ul, ul ul ul {
    list-style-type: square
}

dd {
    display: block;
    -webkit-margin-start: 40px
}

dl {
    display: block;
    -webkit-margin-before: 1__qem;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
}

dt {
    display: block
}

ol ul, ul ol, ul ul, ol ol {
    -webkit-margin-before: 0;
    -webkit-margin-after: 0
}

/* form elements */

form {
    display: block;
    margin-top: 0__qem;
}

label {
    cursor: default;
}

legend {
    display: block;
    -webkit-padding-start: 2px;
    -webkit-padding-end: 2px;
    border: none
}

fieldset {
    display: block;
    -webkit-margin-start: 2px;
    -webkit-margin-end: 2px;
    -webkit-padding-before: 0.35em;
    -webkit-padding-start: 0.75em;
    -webkit-padding-end: 0.75em;
    -webkit-padding-after: 0.625em;
    border: 2px groove ThreeDFace;
    min-width: -webkit-min-content;
}

button {
    -webkit-appearance: button;
}

/* Form controls don't go vertical. */
input, textarea, select, button, meter, progress {
    -webkit-writing-mode: horizontal-tb !important;
}

input, textarea, select, button {
    margin: 0__qem;
    font: -webkit-small-control;
    text-rendering: auto; /* FIXME: Remove when tabs work with optimizeLegibility. */
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0;
    text-shadow: none;
    display: inline-block;
    text-align: start;
}

/* TODO: Add " i" to attribute matchers to support case-insensitive matching */
input[type="hidden"] {
    display: none
}

input {
    -webkit-appearance: textfield;
    padding: 1px;
    background-color: white;
    border: 2px inset;
    -webkit-rtl-ordering: logical;
    -webkit-user-select: text;
    cursor: auto;
}

input[type="search"] {
    -webkit-appearance: searchfield;
    box-sizing: border-box;
}

select {
    border-radius: 5px;
}

textarea {
    -webkit-appearance: textarea;
    background-color: white;
    border: 1px solid;
    -webkit-rtl-ordering: logical;
    -webkit-user-select: text;
    flex-direction: column;
    resize: auto;
    cursor: auto;
    padding: 2px;
    white-space: pre-wrap;
    word-wrap: break-word;
}

input[type="password"] {
    -webkit-text-security: disc !important;
}

input[type="hidden"], input[type="image"], input[type="file"] {
    -webkit-appearance: initial;
    padding: initial;
    background-color: initial;
    border: initial;
}

input[type="file"] {
    align-items: baseline;
    color: inherit;
    text-align: start !important;
}

input[type="radio"], input[type="checkbox"] {
    margin: 3px 0.5ex;
    padding: initial;
    background-color: initial;
    border: initial;
}

input[type="button"], input[type="submit"], input[type="reset"] {
    -webkit-appearance: push-button;
    -webkit-user-select: none;
    white-space: pre
}

input[type="button"], input[type="submit"], input[type="reset"], button {
    align-items: flex-start;
    text-align: center;
    cursor: default;
    color: ButtonText;
    padding: 2px 6px 3px 6px;
    border: 2px outset ButtonFace;
    background-color: ButtonFace;
    box-sizing: border-box
}

input[type="range"] {
    -webkit-appearance: slider-horizontal;
    padding: initial;
    border: initial;
    margin: 2px;
    color: #909090;
}

input[type="button"]:disabled, input[type="submit"]:disabled, input[type="reset"]:disabled,
button:disabled, select:disabled, optgroup:disabled, option:disabled,
select[disabled]>option {
    color: GrayText
}

input[type="button"]:active, input[type="submit"]:active, input[type="reset"]:active, button:active {
    border-style: inset
}

input[type="button"]:active:disabled, input[type="submit"]:active:disabled, input[type="reset"]:active:disabled, button:active:disabled {
    border-style: outset
}

datalist {
    display: none
}

area {
    display: inline;
    cursor: pointer;
}

param {
    display: none
}

input[type="checkbox"] {
    -webkit-appearance: checkbox;
    box-sizing: border-box;
}

input[type="radio"] {
    -webkit-appearance: radio;
    box-sizing: border-box;
}

input[type="color"] {
    -webkit-appearance: square-button;
    width: 44px;
    height: 23px;
    background-color: ButtonFace;
    /* Same as native_theme_base. */
    border: 1px #a9a9a9 solid;
    padding: 1px 2px;
}

input[type="color"][list] {
    -webkit-appearance: menulist;
    width: 88px;
    height: 23px
}

select {
    -webkit-appearance: menulist;
    box-sizing: border-box;
    align-items: center;
    border: 1px solid;
    white-space: pre;
    -webkit-rtl-ordering: logical;
    color: black;
    background-color: white;
    cursor: default;
}

optgroup {
    font-weight: bolder;
    display: block;
}

option {
    font-weight: normal;
    display: block;
    padding: 0 2px 1px 2px;
    white-space: pre;
    min-height: 1.2em;
}

output {
    display: inline;
}

/* meter */

meter {
    -webkit-appearance: meter;
    box-sizing: border-box;
    display: inline-block;
    height: 1em;
    width: 5em;
    vertical-align: -0.2em;
}

/* progress */

progress {
    -webkit-appearance: progress-bar;
    box-sizing: border-box;
    display: inline-block;
    height: 1em;
    width: 10em;
    vertical-align: -0.2em;
}

/* inline elements */

u, ins {
    text-decoration: underline
}

strong, b {
    font-weight: bold
}

i, cite, em, var, address, dfn {
    font-style: italic
}

tt, code, kbd, samp {
    font-family: monospace
}

pre, xmp, plaintext, listing {
    display: block;
    font-family: monospace;
    white-space: pre;
    margin: 1__qem 0
}

mark {
    background-color: yellow;
    color: black
}

big {
    font-size: larger
}

small {
    font-size: smaller
}

s, strike, del {
    text-decoration: line-through
}

sub {
    vertical-align: sub;
    font-size: smaller
}

sup {
    vertical-align: super;
    font-size: smaller
}

nobr {
    white-space: nowrap
}

/* states */

:focus {
    outline: auto 5px -webkit-focus-ring-color
}

/* Read-only text fields do not show a focus ring but do still receive focus */
html:focus, body:focus, input[readonly]:focus {
    outline: none
}

embed:focus, iframe:focus, object:focus {
    outline: none
}

input:focus, textarea:focus, select:focus {
    outline-offset: -2px
}

input[type="button"]:focus,
input[type="checkbox"]:focus,
input[type="file"]:focus,
input[type="hidden"]:focus,
input[type="image"]:focus,
input[type="radio"]:focus,
input[type="reset"]:focus,
input[type="search"]:focus,
input[type="submit"]:focus {
    outline-offset: 0
}

/* HTML5 ruby elements */

ruby, rt {
    text-indent: 0; /* blocks used for ruby rendering should not trigger this */
}

rt {
    line-height: normal;
    -webkit-text-emphasis: none;
}

ruby > rt {
    display: block;
    font-size: 50%;
    text-align: start;
}

ruby > rp {
    display: none;
}

/* other elements */

noframes {
    display: none
}

frameset, frame {
    display: block
}

frameset {
    border-color: inherit
}

iframe {
    border: 2px inset
}

details {
    display: block
}

summary {
    display: block
}

template {
    display: none
}

bdi, output {
    unicode-bidi: -webkit-isolate;
}

bdo {
    unicode-bidi: bidi-override;
}

textarea[dir=auto] {
    unicode-bidi: -webkit-plaintext;
}

dialog:not([open]) {
    display: none
}

dialog {
    position: absolute;
    left: 0;
    right: 0;
    width: -webkit-fit-content;
    height: -webkit-fit-content;
    margin: auto;
    border: solid;
    padding: 1em;
    background: white;
    color: black
}

[hidden] {
    display: none
}

/* noscript is handled internally, as it depends on settings. */

`;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/parser/xml.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { SaxesParser } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/saxes@6.0.0/node_modules/saxes/saxes.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { createElement } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-element.js [app-ssr] (ecmascript)");
const DocumentFragment = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DocumentFragment.js [app-ssr] (ecmascript)");
const DocumentType = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DocumentType.js [app-ssr] (ecmascript)");
const CDATASection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CDATASection.js [app-ssr] (ecmascript)");
const Comment = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Comment.js [app-ssr] (ecmascript)");
const ProcessingInstruction = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ProcessingInstruction.js [app-ssr] (ecmascript)");
const Text = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Text.js [app-ssr] (ecmascript)");
const attributes = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const HTML5_DOCTYPE = /<!doctype html>/i;
const PUBLIC_DOCTYPE = /<!doctype\s+([^\s]+)\s+public\s+"([^"]+)"\s+"([^"]+)"/i;
const SYSTEM_DOCTYPE = /<!doctype\s+([^\s]+)\s+system\s+"([^"]+)"/i;
const CUSTOM_NAME_DOCTYPE = /<!doctype\s+([^\s>]+)/i;
function parseDocType(globalObject, ownerDocument, html) {
    if (HTML5_DOCTYPE.test(html)) {
        return createDocumentType(globalObject, ownerDocument, "html", "", "");
    }
    const publicPieces = PUBLIC_DOCTYPE.exec(html);
    if (publicPieces) {
        return createDocumentType(globalObject, ownerDocument, publicPieces[1], publicPieces[2], publicPieces[3]);
    }
    const systemPieces = SYSTEM_DOCTYPE.exec(html);
    if (systemPieces) {
        return createDocumentType(globalObject, ownerDocument, systemPieces[1], "", systemPieces[2]);
    }
    const namePiece = CUSTOM_NAME_DOCTYPE.exec(html)[1] || "html";
    return createDocumentType(globalObject, ownerDocument, namePiece, "", "");
}
function createDocumentType(globalObject, ownerDocument, name, publicId, systemId) {
    return DocumentType.createImpl(globalObject, [], {
        ownerDocument,
        name,
        publicId,
        systemId
    });
}
function isHTMLTemplateElement(element) {
    return element.tagName === "template" && element.namespaceURI === HTML_NS;
}
function createParser(rootNode, globalObject, saxesOptions) {
    const parser = new SaxesParser({
        ...saxesOptions,
        // Browsers always have namespace support.
        xmlns: true,
        // We force the parser to treat all documents (even documents declaring themselves to be XML 1.1 documents) as XML
        // 1.0 documents. See https://github.com/jsdom/jsdom/issues/2677 for a discussion of the stakes.
        defaultXMLVersion: "1.0",
        forceXMLVersion: true
    });
    const openStack = [
        rootNode
    ];
    function getOwnerDocument() {
        const currentElement = openStack[openStack.length - 1];
        return isHTMLTemplateElement(currentElement) ? currentElement._templateContents._ownerDocument : currentElement._ownerDocument;
    }
    function appendChild(child) {
        const parentElement = openStack[openStack.length - 1];
        if (isHTMLTemplateElement(parentElement)) {
            parentElement._templateContents._insert(child, null);
        } else {
            parentElement._insert(child, null);
        }
    }
    parser.on("text", saxesOptions.fragment ? // In a fragment, all text events produced by saxes must result in a text
    // node.
    (data)=>{
        const ownerDocument = getOwnerDocument();
        appendChild(Text.createImpl(globalObject, [], {
            data,
            ownerDocument
        }));
    } : // When parsing a whole document, we must ignore those text nodes that are
    // produced outside the root element. Saxes produces events for them,
    // but DOM trees do not record text outside the root element.
    (data)=>{
        if (openStack.length > 1) {
            const ownerDocument = getOwnerDocument();
            appendChild(Text.createImpl(globalObject, [], {
                data,
                ownerDocument
            }));
        }
    });
    parser.on("cdata", (data)=>{
        const ownerDocument = getOwnerDocument();
        appendChild(CDATASection.createImpl(globalObject, [], {
            data,
            ownerDocument
        }));
    });
    parser.on("opentag", (tag)=>{
        const { local: tagLocal, attributes: tagAttributes } = tag;
        const ownerDocument = getOwnerDocument();
        const tagNamespace = tag.uri === "" ? null : tag.uri;
        const tagPrefix = tag.prefix === "" ? null : tag.prefix;
        const isValue = tagAttributes.is === undefined ? null : tagAttributes.is.value;
        const elem = createElement(ownerDocument, tagLocal, tagNamespace, tagPrefix, isValue, true);
        // We mark a script element as "parser-inserted", which prevents it from
        // being immediately executed.
        if (tagLocal === "script" && tagNamespace === HTML_NS) {
            elem._parserInserted = true;
        }
        for (const key of Object.keys(tagAttributes)){
            const { prefix, local, uri, value } = tagAttributes[key];
            attributes.setAttributeValue(elem, local, value, prefix === "" ? null : prefix, uri === "" ? null : uri);
        }
        appendChild(elem);
        openStack.push(elem);
    });
    parser.on("closetag", ()=>{
        const elem = openStack.pop();
        // Once a script is populated, we can execute it.
        if (elem.localName === "script" && elem.namespaceURI === HTML_NS) {
            elem._eval();
        }
    });
    parser.on("comment", (data)=>{
        const ownerDocument = getOwnerDocument();
        appendChild(Comment.createImpl(globalObject, [], {
            data,
            ownerDocument
        }));
    });
    parser.on("processinginstruction", ({ target, body })=>{
        const ownerDocument = getOwnerDocument();
        appendChild(ProcessingInstruction.createImpl(globalObject, [], {
            target,
            data: body,
            ownerDocument
        }));
    });
    parser.on("doctype", (dt)=>{
        const ownerDocument = getOwnerDocument();
        appendChild(parseDocType(globalObject, ownerDocument, `<!doctype ${dt}>`));
        const entityMatcher = /<!ENTITY ([^ ]+) "([^"]+)">/g;
        let result;
        while(result = entityMatcher.exec(dt)){
            const [, name, value] = result;
            if (!(name in parser.ENTITIES)) {
                parser.ENTITIES[name] = value;
            }
        }
    });
    parser.on("error", (err)=>{
        throw DOMException.create(globalObject, [
            err.message,
            "SyntaxError"
        ]);
    });
    return parser;
}
function parseFragment(markup, contextElement) {
    const { _globalObject, _ownerDocument } = contextElement;
    const fragment = DocumentFragment.createImpl(_globalObject, [], {
        ownerDocument: _ownerDocument
    });
    // Only parseFragment needs resolvePrefix per the saxes documentation:
    // https://github.com/lddubeau/saxes#parsing-xml-fragments
    const parser = createParser(fragment, _globalObject, {
        fragment: true,
        resolvePrefix (prefix) {
            // saxes wants undefined as the return value if the prefix is not defined, not null.
            return contextElement.lookupNamespaceURI(prefix) || undefined;
        }
    });
    parser.write(markup).close();
    return fragment;
}
function parseIntoDocument(markup, ownerDocument) {
    const { _globalObject } = ownerDocument;
    const parser = createParser(ownerDocument, _globalObject, {
        fileName: ownerDocument.location && ownerDocument.location.href
    });
    parser.write(markup).close();
    return ownerDocument;
}
module.exports = {
    parseFragment,
    parseIntoDocument
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/parser/html.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const parse5 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/parse5@7.3.0/node_modules/parse5/dist/cjs/index.js [app-ssr] (ecmascript)");
const { createElement } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-element.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const DocumentType = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DocumentType.js [app-ssr] (ecmascript)");
const DocumentFragment = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DocumentFragment.js [app-ssr] (ecmascript)");
const Text = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Text.js [app-ssr] (ecmascript)");
const Comment = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Comment.js [app-ssr] (ecmascript)");
const attributes = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes.js [app-ssr] (ecmascript)");
const nodeTypes = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const serializationAdapter = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/domparsing/parse5-adapter-serialization.js [app-ssr] (ecmascript)");
const { customElementReactionsStack, invokeCEReactions, lookupCEDefinition } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/custom-elements.js [app-ssr] (ecmascript)");
class JSDOMParse5Adapter {
    constructor(documentImpl, options = {}){
        this._documentImpl = documentImpl;
        this._globalObject = documentImpl._globalObject;
        this._fragment = options.fragment || false;
        // Since the createElement hook doesn't provide the parent element, we keep track of this using _currentElement:
        // https://github.com/inikulin/parse5/issues/285.
        this._currentElement = undefined;
    }
    _ownerDocument() {
        const { _currentElement } = this;
        // The _currentElement is undefined when parsing elements at the root of the document.
        if (_currentElement) {
            return _currentElement.localName === "template" && _currentElement.namespaceURI === HTML_NS ? _currentElement.content._ownerDocument : _currentElement._ownerDocument;
        }
        return this._documentImpl;
    }
    createDocument() {
        // parse5's model assumes that parse(html) will call into here to create the new Document, then return it. However,
        // jsdom's model assumes we can create a Window (and through that create an empty Document), do some other setup
        // stuff, and then parse, stuffing nodes into that Document as we go. So to adapt between these two models, we just
        // return the already-created Document when asked by parse5 to "create" a Document.
        return this._documentImpl;
    }
    createDocumentFragment() {
        const ownerDocument = this._ownerDocument();
        return DocumentFragment.createImpl(this._globalObject, [], {
            ownerDocument
        });
    }
    // https://html.spec.whatwg.org/#create-an-element-for-the-token
    createElement(localName, namespace, attrs) {
        const ownerDocument = this._ownerDocument();
        const isAttribute = attrs.find((attr)=>attr.name === "is");
        const isValue = isAttribute ? isAttribute.value : null;
        const definition = lookupCEDefinition(ownerDocument, namespace, localName);
        let willExecuteScript = false;
        if (definition !== null && !this._fragment) {
            willExecuteScript = true;
        }
        if (willExecuteScript) {
            ownerDocument._throwOnDynamicMarkupInsertionCounter++;
            customElementReactionsStack.push([]);
        }
        const element = createElement(ownerDocument, localName, namespace, null, isValue, willExecuteScript);
        this.adoptAttributes(element, attrs);
        if (willExecuteScript) {
            const queue = customElementReactionsStack.pop();
            invokeCEReactions(queue);
            ownerDocument._throwOnDynamicMarkupInsertionCounter--;
        }
        if ("_parserInserted" in element) {
            element._parserInserted = true;
        }
        return element;
    }
    createCommentNode(data) {
        const ownerDocument = this._ownerDocument();
        return Comment.createImpl(this._globalObject, [], {
            data,
            ownerDocument
        });
    }
    appendChild(parentNode, newNode) {
        parentNode._append(newNode);
    }
    insertBefore(parentNode, newNode, referenceNode) {
        parentNode._insert(newNode, referenceNode);
    }
    setTemplateContent(templateElement, contentFragment) {
        // This code makes the glue between jsdom and parse5 HTMLTemplateElement parsing:
        //
        // * jsdom during the construction of the HTMLTemplateElement (for example when create via
        //   `document.createElement("template")`), creates a DocumentFragment and set it into _templateContents.
        // * parse5 when parsing a <template> tag creates an HTMLTemplateElement (`createElement` adapter hook) and also
        //   create a DocumentFragment (`createDocumentFragment` adapter hook).
        //
        // At this point we now have to replace the one created in jsdom with one created by parse5.
        const { _ownerDocument, _host } = templateElement._templateContents;
        contentFragment._ownerDocument = _ownerDocument;
        contentFragment._host = _host;
        templateElement._templateContents = contentFragment;
    }
    setDocumentType(document, name, publicId, systemId) {
        const ownerDocument = this._ownerDocument();
        const documentType = DocumentType.createImpl(this._globalObject, [], {
            name,
            publicId,
            systemId,
            ownerDocument
        });
        document._append(documentType);
    }
    setDocumentMode(document, mode) {
        // TODO: the rest of jsdom ignores this
        document._mode = mode;
    }
    detachNode(node) {
        node.remove();
    }
    insertText(parentNode, text) {
        const { lastChild } = parentNode;
        if (lastChild && lastChild.nodeType === nodeTypes.TEXT_NODE) {
            lastChild.data += text;
        } else {
            const ownerDocument = this._ownerDocument();
            const textNode = Text.createImpl(this._globalObject, [], {
                data: text,
                ownerDocument
            });
            parentNode._append(textNode);
        }
    }
    insertTextBefore(parentNode, text, referenceNode) {
        const { previousSibling } = referenceNode;
        if (previousSibling && previousSibling.nodeType === nodeTypes.TEXT_NODE) {
            previousSibling.data += text;
        } else {
            const ownerDocument = this._ownerDocument();
            const textNode = Text.createImpl(this._globalObject, [], {
                data: text,
                ownerDocument
            });
            parentNode._append(textNode, referenceNode);
        }
    }
    adoptAttributes(element, attrs) {
        for (const attr of attrs){
            const prefix = attr.prefix === "" ? null : attr.prefix;
            attributes.setAttributeValue(element, attr.name, attr.value, prefix, attr.namespace);
        }
    }
    onItemPush(after) {
        this._currentElement = after;
        after._pushedOnStackOfOpenElements?.();
    }
    onItemPop(before, newTop) {
        this._currentElement = newTop;
        before._poppedOffStackOfOpenElements?.();
    }
}
// Assign shared adapters with serializer.
Object.assign(JSDOMParse5Adapter.prototype, serializationAdapter);
function parseFragment(markup, contextElement) {
    const ownerDocument = contextElement.localName === "template" && contextElement.namespaceURI === HTML_NS ? contextElement.content._ownerDocument : contextElement._ownerDocument;
    const config = {
        ...ownerDocument._parseOptions,
        sourceCodeLocationInfo: false,
        treeAdapter: new JSDOMParse5Adapter(ownerDocument, {
            fragment: true
        })
    };
    return parse5.parseFragment(contextElement, markup, config);
}
function parseIntoDocument(markup, ownerDocument) {
    const config = {
        ...ownerDocument._parseOptions,
        treeAdapter: new JSDOMParse5Adapter(ownerDocument)
    };
    return parse5.parse(markup, config);
}
module.exports = {
    parseFragment,
    parseIntoDocument
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/parser/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const xmlParser = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/parser/xml.js [app-ssr] (ecmascript)");
const htmlParser = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/parser/html.js [app-ssr] (ecmascript)");
// https://w3c.github.io/DOM-Parsing/#dfn-fragment-parsing-algorithm
function parseFragment(markup, contextElement) {
    const { _parsingMode } = contextElement._ownerDocument;
    let parseAlgorithm;
    if (_parsingMode === "html") {
        parseAlgorithm = htmlParser.parseFragment;
    } else if (_parsingMode === "xml") {
        parseAlgorithm = xmlParser.parseFragment;
    }
    // Note: HTML and XML fragment parsing algorithm already return a document fragments; no need to do steps 3 and 4
    return parseAlgorithm(markup, contextElement);
}
function parseIntoDocument(markup, ownerDocument) {
    const { _parsingMode } = ownerDocument;
    let parseAlgorithm;
    if (_parsingMode === "html") {
        parseAlgorithm = htmlParser.parseIntoDocument;
    } else if (_parsingMode === "xml") {
        parseAlgorithm = xmlParser.parseIntoDocument;
    }
    return parseAlgorithm(markup, ownerDocument);
}
module.exports = {
    parseFragment,
    parseIntoDocument
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/resources/request-manager.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Manage all the request and it is able to abort
 * all pending request.
 */ module.exports = class RequestManager {
    constructor(){
        this.openedRequests = [];
    }
    add(req) {
        this.openedRequests.push(req);
    }
    remove(req) {
        const idx = this.openedRequests.indexOf(req);
        if (idx !== -1) {
            this.openedRequests.splice(idx, 1);
        }
    }
    close() {
        for (const openedRequest of this.openedRequests){
            openedRequest.abort();
        }
        this.openedRequests = [];
    }
    size() {
        return this.openedRequests.length;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/resources/async-resource-queue.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

class QueueItem {
    constructor(onLoad, onError, dependentItem){
        this.onLoad = onLoad;
        this.onError = onError;
        this.data = null;
        this.error = null;
        this.dependentItem = dependentItem;
    }
}
/**
 * AsyncResourceQueue is the queue in charge of run the async scripts
 * and notify when they finish.
 */ module.exports = class AsyncResourceQueue {
    constructor(){
        this.items = new Set();
        this.dependentItems = new Set();
    }
    count() {
        return this.items.size + this.dependentItems.size;
    }
    _notify() {
        if (this._listener) {
            this._listener();
        }
    }
    _check(item) {
        let promise;
        if (item.onError && item.error) {
            promise = item.onError(item.error);
        } else if (item.onLoad && item.data) {
            promise = item.onLoad(item.data);
        }
        promise.then(()=>{
            this.items.delete(item);
            this.dependentItems.delete(item);
            if (this.count() === 0) {
                this._notify();
            }
        });
    }
    setListener(listener) {
        this._listener = listener;
    }
    push(request, onLoad, onError, dependentItem) {
        const q = this;
        const item = new QueueItem(onLoad, onError, dependentItem);
        q.items.add(item);
        return request.then((data)=>{
            item.data = data;
            if (dependentItem && !dependentItem.finished) {
                q.dependentItems.add(item);
                return q.items.delete(item);
            }
            if (onLoad) {
                return q._check(item);
            }
            q.items.delete(item);
            if (q.count() === 0) {
                q._notify();
            }
            return null;
        }).catch((err)=>{
            item.error = err;
            if (dependentItem && !dependentItem.finished) {
                q.dependentItems.add(item);
                return q.items.delete(item);
            }
            if (onError) {
                return q._check(item);
            }
            q.items.delete(item);
            if (q.count() === 0) {
                q._notify();
            }
            return null;
        });
    }
    notifyItem(syncItem) {
        for (const item of this.dependentItems){
            if (item.dependentItem === syncItem) {
                this._check(item);
            }
        }
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/resources/resource-queue.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Queue for all the resources to be download except async scripts.
 * Async scripts have their own queue AsyncResourceQueue.
 */ module.exports = class ResourceQueue {
    constructor({ paused, asyncQueue } = {}){
        this.paused = Boolean(paused);
        this._asyncQueue = asyncQueue;
    }
    getLastScript() {
        let head = this.tail;
        while(head){
            if (head.isScript) {
                return head;
            }
            head = head.prev;
        }
        return null;
    }
    _moreScripts() {
        let found = false;
        let head = this.tail;
        while(head && !found){
            found = head.isScript;
            head = head.prev;
        }
        return found;
    }
    _notify() {
        if (this._listener) {
            this._listener();
        }
    }
    setListener(listener) {
        this._listener = listener;
    }
    push(request, onLoad, onError, keepLast, element) {
        const isScript = element ? element.localName === "script" : false;
        if (!request) {
            if (isScript && !this._moreScripts()) {
                return onLoad();
            }
            request = Promise.resolve();
        }
        const q = this;
        const item = {
            isScript,
            err: null,
            element,
            fired: false,
            data: null,
            keepLast,
            prev: q.tail,
            check () {
                if (!q.paused && !this.prev && this.fired) {
                    let promise;
                    if (this.err && onError) {
                        promise = onError(this.err);
                    }
                    if (!this.err && onLoad) {
                        promise = onLoad(this.data);
                    }
                    Promise.resolve(promise).then(()=>{
                        if (this.next) {
                            this.next.prev = null;
                            this.next.check();
                        } else {
                            q.tail = null;
                            q._notify();
                        }
                        this.finished = true;
                        if (q._asyncQueue) {
                            q._asyncQueue.notifyItem(this);
                        }
                    });
                }
            }
        };
        if (q.tail) {
            if (q.tail.keepLast) {
                // if the tail is the load event in document and we receive a new element to load
                // we should add this new request before the load event.
                if (q.tail.prev) {
                    q.tail.prev.next = item;
                }
                item.prev = q.tail.prev;
                q.tail.prev = item;
                item.next = q.tail;
            } else {
                q.tail.next = item;
                q.tail = item;
            }
        } else {
            q.tail = item;
        }
        return request.then((data)=>{
            item.fired = 1;
            item.data = data;
            item.check();
        }).catch((err)=>{
            item.fired = true;
            item.err = err;
            item.check();
        });
    }
    resume() {
        if (!this.paused) {
            return;
        }
        this.paused = false;
        let head = this.tail;
        while(head && head.prev){
            head = head.prev;
        }
        if (head) {
            head.check();
        }
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/resources/per-document-resource-loader.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
module.exports = class PerDocumentResourceLoader {
    constructor(document){
        this._document = document;
        this._defaultEncoding = document._encoding;
        this._resourceLoader = document._defaultView ? document._defaultView._resourceLoader : null;
        this._requestManager = document._requestManager;
        this._queue = document._queue;
        this._deferQueue = document._deferQueue;
        this._asyncQueue = document._asyncQueue;
    }
    fetch(url, { element, onLoad, onError }) {
        const request = this._resourceLoader.fetch(url, {
            cookieJar: this._document._cookieJar,
            element: idlUtils.wrapperForImpl(element),
            referrer: this._document.URL
        });
        if (request === null) {
            return null;
        }
        this._requestManager.add(request);
        const onErrorWrapped = (error)=>{
            this._requestManager.remove(request);
            if (onError) {
                onError(error);
            }
            fireAnEvent("error", element);
            const err = new Error(`Could not load ${element.localName}: "${url}"`);
            err.type = "resource loading";
            err.detail = error;
            this._document._defaultView._virtualConsole.emit("jsdomError", err);
            return Promise.resolve();
        };
        const onLoadWrapped = (data)=>{
            this._requestManager.remove(request);
            this._addCookies(url, request.response ? request.response.headers : {});
            try {
                const result = onLoad ? onLoad(data) : undefined;
                return Promise.resolve(result).then(()=>{
                    fireAnEvent("load", element);
                    return Promise.resolve();
                }).catch((err)=>{
                    return onErrorWrapped(err);
                });
            } catch (err) {
                return onErrorWrapped(err);
            }
        };
        if (element.localName === "script" && element.hasAttributeNS(null, "async")) {
            this._asyncQueue.push(request, onLoadWrapped, onErrorWrapped, this._queue.getLastScript());
        } else if (element.localName === "script" && element.hasAttributeNS(null, "defer") && this._document.readyState !== "interactive") {
            this._deferQueue.push(request, onLoadWrapped, onErrorWrapped, false, element);
        } else {
            this._queue.push(request, onLoadWrapped, onErrorWrapped, false, element);
        }
        return request;
    }
    _addCookies(url, headers) {
        let cookies = headers["set-cookie"];
        if (!cookies) {
            return;
        }
        if (!Array.isArray(cookies)) {
            cookies = [
                cookies
            ];
        }
        cookies.forEach((cookie)=>{
            this._document._cookieJar.setCookieSync(cookie, url, {
                http: true,
                ignoreError: true
            });
        });
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/js-globals.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"Object\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Function\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Array\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Number\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"parseFloat\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"parseInt\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Infinity\":{\"writable\":false,\"enumerable\":false,\"configurable\":false},\"NaN\":{\"writable\":false,\"enumerable\":false,\"configurable\":false},\"undefined\":{\"writable\":false,\"enumerable\":false,\"configurable\":false},\"Boolean\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"String\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Symbol\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Date\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Promise\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"RegExp\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Error\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"AggregateError\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"EvalError\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"RangeError\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"ReferenceError\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"SyntaxError\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"TypeError\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"URIError\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"globalThis\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"JSON\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Math\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Intl\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"ArrayBuffer\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Atomics\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Uint8Array\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Int8Array\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Uint16Array\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Int16Array\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Uint32Array\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Int32Array\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Float32Array\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Float64Array\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Uint8ClampedArray\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"BigUint64Array\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"BigInt64Array\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"DataView\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Map\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"BigInt\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Set\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"WeakMap\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"WeakSet\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Proxy\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Reflect\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"FinalizationRegistry\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"WeakRef\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"decodeURI\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"decodeURIComponent\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"encodeURI\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"encodeURIComponent\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"escape\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"unescape\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"eval\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"isFinite\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"isNaN\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"Iterator\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"SharedArrayBuffer\":{\"writable\":true,\"enumerable\":false,\"configurable\":true},\"WebAssembly\":{\"writable\":true,\"enumerable\":false,\"configurable\":true}}"));}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/Window.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const vm = __turbopack_context__.r("[externals]/vm [external] (vm, cjs)");
const webIDLConversions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)");
const { CSSStyleDeclaration } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/cssstyle@4.6.0/node_modules/cssstyle/lib/CSSStyleDeclaration.js [app-ssr] (ecmascript)");
const whatwgURL = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const notImplemented = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/not-implemented.js [app-ssr] (ecmascript)");
const { installInterfaces } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/interfaces.js [app-ssr] (ecmascript)");
const { define, mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const Element = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Element.js [app-ssr] (ecmascript)");
const EventTarget = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js [app-ssr] (ecmascript)");
const EventHandlerNonNull = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/EventHandlerNonNull.js [app-ssr] (ecmascript)");
const IDLFunction = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Function.js [app-ssr] (ecmascript)");
const OnBeforeUnloadEventHandlerNonNull = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/OnBeforeUnloadEventHandlerNonNull.js [app-ssr] (ecmascript)");
const OnErrorEventHandlerNonNull = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/OnErrorEventHandlerNonNull.js [app-ssr] (ecmascript)");
const { fireAPageTransitionEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/page-transition-event.js [app-ssr] (ecmascript)");
const namedPropertiesWindow = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/named-properties-window.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const WebSocketImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/websockets/WebSocket-impl.js [app-ssr] (ecmascript)").implementation;
const BarProp = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/BarProp.js [app-ssr] (ecmascript)");
const documents = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/documents.js [app-ssr] (ecmascript)");
const External = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/External.js [app-ssr] (ecmascript)");
const Navigator = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Navigator.js [app-ssr] (ecmascript)");
const Performance = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Performance.js [app-ssr] (ecmascript)");
const Screen = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Screen.js [app-ssr] (ecmascript)");
const Crypto = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Crypto.js [app-ssr] (ecmascript)");
const Storage = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Storage.js [app-ssr] (ecmascript)");
const Selection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Selection.js [app-ssr] (ecmascript)");
const reportException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js [app-ssr] (ecmascript)");
const { getCurrentEventHandlerValue } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-event-accessor.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const SessionHistory = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/window/SessionHistory.js [app-ssr] (ecmascript)");
const { getDeclarationForElement, getResolvedValue, propertiesWithResolvedValueImplemented, SHADOW_DOM_PSEUDO_REGEXP } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/style-rules.js [app-ssr] (ecmascript)");
const CustomElementRegistry = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CustomElementRegistry.js [app-ssr] (ecmascript)");
const MessageEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MessageEvent.js [app-ssr] (ecmascript)");
const jsGlobals = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/js-globals.json (json)");
const GlobalEventHandlersImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/GlobalEventHandlers-impl.js [app-ssr] (ecmascript)").implementation;
const WindowEventHandlersImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/WindowEventHandlers-impl.js [app-ssr] (ecmascript)").implementation;
const events = new Set([
    // GlobalEventHandlers
    "abort",
    "autocomplete",
    "autocompleteerror",
    "blur",
    "cancel",
    "canplay",
    "canplaythrough",
    "change",
    "click",
    "close",
    "contextmenu",
    "cuechange",
    "dblclick",
    "drag",
    "dragend",
    "dragenter",
    "dragleave",
    "dragover",
    "dragstart",
    "drop",
    "durationchange",
    "emptied",
    "ended",
    "focus",
    "input",
    "invalid",
    "keydown",
    "keypress",
    "keyup",
    "load",
    "loadeddata",
    "loadedmetadata",
    "loadstart",
    "mousedown",
    "mouseenter",
    "mouseleave",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "wheel",
    "pause",
    "play",
    "playing",
    "progress",
    "ratechange",
    "reset",
    "resize",
    "scroll",
    "securitypolicyviolation",
    "seeked",
    "seeking",
    "select",
    "sort",
    "stalled",
    "submit",
    "suspend",
    "timeupdate",
    "toggle",
    "volumechange",
    "waiting",
    // WindowEventHandlers
    "afterprint",
    "beforeprint",
    "hashchange",
    "languagechange",
    "message",
    "messageerror",
    "offline",
    "online",
    "pagehide",
    "pageshow",
    "popstate",
    "rejectionhandled",
    "storage",
    "unhandledrejection",
    "unload"
]);
const jsGlobalEntriesToInstall = Object.entries(jsGlobals).filter(([name])=>name in /*TURBOPACK member replacement*/ __turbopack_context__.g);
exports.createWindow = (options)=>{
    const makeVMContext = options.runScripts === "outside-only" || options.runScripts === "dangerously";
    // Bootstrap with an empty object from the Node.js realm. We'll muck with its prototype chain shortly.
    const window = {};
    // Make window into a global object: either via vm, or just aliasing the Node.js globals.
    // Also set _globalObject and _globalProxy.
    //
    // TODO: don't expose _globalObject and _globalProxy as public properties. While you're there, audit usage sites to
    // see how necessary they really are.
    if (makeVMContext) {
        vm.createContext(window);
        window._globalObject = window;
        window._globalProxy = vm.runInContext("this", window);
        // Without this, these globals will only appear to scripts running inside the context using vm.runScript; they will
        // not appear to scripts running from the outside, including to JSDOM implementation code.
        for (const [globalName, globalPropDesc] of jsGlobalEntriesToInstall){
            const propDesc = {
                ...globalPropDesc,
                value: vm.runInContext(globalName, window)
            };
            Object.defineProperty(window, globalName, propDesc);
        }
    } else {
        window._globalObject = window._globalProxy = window;
        // Without contextifying the window, none of the globals will exist. So, let's at least alias them from the Node.js
        // context. See https://github.com/jsdom/jsdom/issues/2727 for more background and discussion.
        for (const [globalName, globalPropDesc] of jsGlobalEntriesToInstall){
            const propDesc = {
                ...globalPropDesc,
                value: /*TURBOPACK member replacement*/ __turbopack_context__.g[globalName]
            };
            Object.defineProperty(window, globalName, propDesc);
        }
    }
    // Create instances of all the web platform interfaces and install them on the window.
    installInterfaces(window, [
        "Window"
    ]);
    // Now we have an EventTarget contructor so we can work on the prototype chain.
    // eslint-disable-next-line func-name-matching, func-style
    const WindowConstructor = function Window() {
        throw new TypeError("Illegal constructor");
    };
    Object.setPrototypeOf(WindowConstructor, window.EventTarget);
    Object.defineProperty(window, "Window", {
        configurable: true,
        writable: true,
        value: WindowConstructor
    });
    // TODO: do an actual WindowProperties object. See https://github.com/jsdom/jsdom/pull/3765 for an attempt.
    const windowPropertiesObject = Object.create(window.EventTarget.prototype);
    Object.defineProperties(windowPropertiesObject, {
        [Symbol.toStringTag]: {
            value: "WindowProperties",
            configurable: true
        }
    });
    namedPropertiesWindow.initializeWindow(window, window._globalProxy);
    const windowPrototype = Object.create(windowPropertiesObject);
    Object.defineProperties(windowPrototype, {
        constructor: {
            value: WindowConstructor,
            writable: true,
            configurable: true
        },
        [Symbol.toStringTag]: {
            value: "Window",
            configurable: true
        }
    });
    WindowConstructor.prototype = windowPrototype;
    Object.setPrototypeOf(window, windowPrototype);
    if (makeVMContext) {
        Object.setPrototypeOf(window._globalProxy, windowPrototype);
        Object.setPrototypeOf(window.EventTarget.prototype, window.Object.prototype);
    }
    // Now that the prototype chain is fully set up, call the superclass setup.
    EventTarget.setup(window, window);
    installEventHandlers(window);
    installOwnProperties(window, options);
    // Not sure why this is necessary... TODO figure it out.
    Object.defineProperty(idlUtils.implForWrapper(window), idlUtils.wrapperSymbol, {
        get: ()=>window._globalProxy
    });
    // Fire or prepare to fire load and pageshow events.
    process.nextTick(()=>{
        if (!window.document) {
            return; // window might've been closed already
        }
        if (window.document.readyState === "complete") {
            fireAnEvent("load", window, undefined, {}, true);
        } else {
            window.document.addEventListener("load", ()=>{
                fireAnEvent("load", window, undefined, {}, true);
                if (!window._document) {
                    return; // window might've been closed already
                }
                const documentImpl = idlUtils.implForWrapper(window._document);
                if (!documentImpl._pageShowingFlag) {
                    documentImpl._pageShowingFlag = true;
                    fireAPageTransitionEvent("pageshow", window, false);
                }
            });
        }
    });
    return window;
};
function installEventHandlers(window) {
    mixin(window, WindowEventHandlersImpl.prototype);
    mixin(window, GlobalEventHandlersImpl.prototype);
    window._initGlobalEvents();
    Object.defineProperty(window, "onbeforeunload", {
        configurable: true,
        enumerable: true,
        get () {
            return idlUtils.tryWrapperForImpl(getCurrentEventHandlerValue(window, "beforeunload"));
        },
        set (V) {
            if (!idlUtils.isObject(V)) {
                V = null;
            } else {
                V = OnBeforeUnloadEventHandlerNonNull.convert(window, V, {
                    context: "Failed to set the 'onbeforeunload' property on 'Window': The provided value"
                });
            }
            window._setEventHandlerFor("beforeunload", V);
        }
    });
    Object.defineProperty(window, "onerror", {
        configurable: true,
        enumerable: true,
        get () {
            return idlUtils.tryWrapperForImpl(getCurrentEventHandlerValue(window, "error"));
        },
        set (V) {
            if (!idlUtils.isObject(V)) {
                V = null;
            } else {
                V = OnErrorEventHandlerNonNull.convert(window, V, {
                    context: "Failed to set the 'onerror' property on 'Window': The provided value"
                });
            }
            window._setEventHandlerFor("error", V);
        }
    });
    for (const event of events){
        Object.defineProperty(window, `on${event}`, {
            configurable: true,
            enumerable: true,
            get () {
                return idlUtils.tryWrapperForImpl(getCurrentEventHandlerValue(window, event));
            },
            set (V) {
                if (!idlUtils.isObject(V)) {
                    V = null;
                } else {
                    V = EventHandlerNonNull.convert(window, V, {
                        context: `Failed to set the 'on${event}' property on 'Window': The provided value`
                    });
                }
                window._setEventHandlerFor(event, V);
            }
        });
    }
}
function installOwnProperties(window, options) {
    const windowInitialized = performance.now();
    // ### PRIVATE DATA PROPERTIES
    window._resourceLoader = options.resourceLoader;
    // List options explicitly to be clear which are passed through
    window._document = documents.createWrapper(window, {
        parsingMode: options.parsingMode,
        contentType: options.contentType,
        encoding: options.encoding,
        cookieJar: options.cookieJar,
        url: options.url,
        lastModified: options.lastModified,
        referrer: options.referrer,
        parseOptions: options.parseOptions,
        defaultView: window._globalProxy,
        global: window,
        parentOrigin: options.parentOrigin
    }, {
        alwaysUseDocumentClass: true
    });
    const documentOrigin = idlUtils.implForWrapper(window._document)._origin;
    window._origin = documentOrigin;
    // https://html.spec.whatwg.org/#session-history
    window._sessionHistory = new SessionHistory({
        document: idlUtils.implForWrapper(window._document),
        url: idlUtils.implForWrapper(window._document)._URL,
        stateObject: null
    }, window);
    window._virtualConsole = options.virtualConsole;
    window._runScripts = options.runScripts;
    // Set up the window as if it's a top level window.
    // If it's not, then references will be corrected by frame/iframe code.
    window._parent = window._top = window._globalProxy;
    window._frameElement = null;
    // This implements window.frames.length, since window.frames returns a
    // self reference to the window object.  This value is incremented in the
    // HTMLFrameElement implementation.
    window._length = 0;
    // https://dom.spec.whatwg.org/#window-current-event
    window._currentEvent = undefined;
    window._pretendToBeVisual = options.pretendToBeVisual;
    window._storageQuota = options.storageQuota;
    // Some properties (such as localStorage and sessionStorage) share data
    // between windows in the same origin. This object is intended
    // to contain such data.
    if (options.commonForOrigin && options.commonForOrigin[documentOrigin]) {
        window._commonForOrigin = options.commonForOrigin;
    } else {
        window._commonForOrigin = {
            [documentOrigin]: {
                localStorageArea: new Map(),
                sessionStorageArea: new Map(),
                windowsInSameOrigin: [
                    window
                ]
            }
        };
    }
    window._currentOriginData = window._commonForOrigin[documentOrigin];
    // ### WEB STORAGE
    window._localStorage = Storage.create(window, [], {
        associatedWindow: window,
        storageArea: window._currentOriginData.localStorageArea,
        type: "localStorage",
        url: window._document.documentURI,
        storageQuota: window._storageQuota
    });
    window._sessionStorage = Storage.create(window, [], {
        associatedWindow: window,
        storageArea: window._currentOriginData.sessionStorageArea,
        type: "sessionStorage",
        url: window._document.documentURI,
        storageQuota: window._storageQuota
    });
    // ### SELECTION
    // https://w3c.github.io/selection-api/#dfn-selection
    window._selection = Selection.createImpl(window);
    // https://w3c.github.io/selection-api/#dom-window
    window.getSelection = function() {
        return window._selection;
    };
    // ### GETTERS
    const locationbar = BarProp.create(window);
    const menubar = BarProp.create(window);
    const personalbar = BarProp.create(window);
    const scrollbars = BarProp.create(window);
    const statusbar = BarProp.create(window);
    const toolbar = BarProp.create(window);
    const external = External.create(window);
    const navigator = Navigator.create(window, [], {
        userAgent: window._resourceLoader._userAgent
    });
    const performanceImpl = Performance.create(window, [], {
        timeOrigin: performance.timeOrigin + windowInitialized,
        nowAtTimeOrigin: windowInitialized
    });
    const screen = Screen.create(window);
    const crypto = Crypto.create(window);
    window._customElementRegistry = CustomElementRegistry.create(window);
    define(window, {
        get length () {
            return window._length;
        },
        get window () {
            return window._globalProxy;
        },
        get frameElement () {
            return idlUtils.wrapperForImpl(window._frameElement);
        },
        get frames () {
            return window._globalProxy;
        },
        get self () {
            return window._globalProxy;
        },
        get parent () {
            return window._parent;
        },
        get top () {
            return window._top;
        },
        get document () {
            return window._document;
        },
        get external () {
            return external;
        },
        get location () {
            return idlUtils.wrapperForImpl(idlUtils.implForWrapper(window._document)._location);
        },
        // [PutForwards=href]:
        set location (value){
            Reflect.set(window.location, "href", value);
        },
        get history () {
            return idlUtils.wrapperForImpl(idlUtils.implForWrapper(window._document)._history);
        },
        get navigator () {
            return navigator;
        },
        get locationbar () {
            return locationbar;
        },
        get menubar () {
            return menubar;
        },
        get personalbar () {
            return personalbar;
        },
        get scrollbars () {
            return scrollbars;
        },
        get statusbar () {
            return statusbar;
        },
        get toolbar () {
            return toolbar;
        },
        get performance () {
            return performanceImpl;
        },
        get screen () {
            return screen;
        },
        get crypto () {
            return crypto;
        },
        get origin () {
            return window._origin;
        },
        get localStorage () {
            if (idlUtils.implForWrapper(window._document)._origin === "null") {
                throw DOMException.create(window, [
                    "localStorage is not available for opaque origins",
                    "SecurityError"
                ]);
            }
            return window._localStorage;
        },
        get sessionStorage () {
            if (idlUtils.implForWrapper(window._document)._origin === "null") {
                throw DOMException.create(window, [
                    "sessionStorage is not available for opaque origins",
                    "SecurityError"
                ]);
            }
            return window._sessionStorage;
        },
        get customElements () {
            return window._customElementRegistry;
        },
        get event () {
            return window._currentEvent ? idlUtils.wrapperForImpl(window._currentEvent) : undefined;
        }
    });
    Object.defineProperties(window, {
        // [Replaceable]:
        self: makeReplaceablePropertyDescriptor("self", window),
        locationbar: makeReplaceablePropertyDescriptor("locationbar", window),
        menubar: makeReplaceablePropertyDescriptor("menubar", window),
        personalbar: makeReplaceablePropertyDescriptor("personalbar", window),
        scrollbars: makeReplaceablePropertyDescriptor("scrollbars", window),
        statusbar: makeReplaceablePropertyDescriptor("statusbar", window),
        toolbar: makeReplaceablePropertyDescriptor("toolbar", window),
        frames: makeReplaceablePropertyDescriptor("frames", window),
        parent: makeReplaceablePropertyDescriptor("parent", window),
        external: makeReplaceablePropertyDescriptor("external", window),
        length: makeReplaceablePropertyDescriptor("length", window),
        screen: makeReplaceablePropertyDescriptor("screen", window),
        origin: makeReplaceablePropertyDescriptor("origin", window),
        event: makeReplaceablePropertyDescriptor("event", window),
        // [LegacyUnforgeable]:
        window: {
            configurable: false
        },
        document: {
            configurable: false
        },
        location: {
            configurable: false
        },
        top: {
            configurable: false
        }
    });
    // ### METHODS
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
    // In the spec the list of active timers is a set of IDs. We make it a map of IDs to Node.js timer objects, so that
    // we can call Node.js-side clearTimeout() when clearing, and thus allow process shutdown faster.
    const listOfActiveTimers = new Map();
    let latestTimerId = 0;
    window.setTimeout = function(handler, timeout = 0, ...args) {
        if (typeof handler !== "function") {
            handler = webIDLConversions.DOMString(handler);
        }
        timeout = webIDLConversions.long(timeout);
        return timerInitializationSteps(handler, timeout, args, {
            methodContext: window,
            repeat: false
        });
    };
    window.setInterval = function(handler, timeout = 0, ...args) {
        if (typeof handler !== "function") {
            handler = webIDLConversions.DOMString(handler);
        }
        timeout = webIDLConversions.long(timeout);
        return timerInitializationSteps(handler, timeout, args, {
            methodContext: window,
            repeat: true
        });
    };
    window.clearTimeout = function(handle = 0) {
        handle = webIDLConversions.long(handle);
        const nodejsTimer = listOfActiveTimers.get(handle);
        if (nodejsTimer) {
            clearTimeout(nodejsTimer);
            listOfActiveTimers.delete(handle);
        }
    };
    window.clearInterval = function(handle = 0) {
        handle = webIDLConversions.long(handle);
        const nodejsTimer = listOfActiveTimers.get(handle);
        if (nodejsTimer) {
            // We use setTimeout() in timerInitializationSteps even for window.setInterval().
            clearTimeout(nodejsTimer);
            listOfActiveTimers.delete(handle);
        }
    };
    function timerInitializationSteps(handler, timeout, args, { methodContext, repeat, previousHandle }) {
        // This appears to be unspecced, but matches browser behavior for close()ed windows.
        if (!methodContext._document) {
            return 0;
        }
        // TODO: implement timer nesting level behavior.
        const methodContextProxy = methodContext._globalProxy;
        const handle = previousHandle !== undefined ? previousHandle : ++latestTimerId;
        function task() {
            if (!listOfActiveTimers.has(handle)) {
                return;
            }
            try {
                if (typeof handler === "function") {
                    handler.apply(methodContextProxy, args);
                } else if (window._runScripts === "dangerously") {
                    vm.runInContext(handler, window, {
                        filename: window.location.href,
                        displayErrors: false
                    });
                }
            } catch (e) {
                reportException(window, e, window.location.href);
            }
            if (listOfActiveTimers.has(handle)) {
                if (repeat) {
                    timerInitializationSteps(handler, timeout, args, {
                        methodContext,
                        repeat: true,
                        previousHandle: handle
                    });
                } else {
                    listOfActiveTimers.delete(handle);
                }
            }
        }
        if (timeout < 0) {
            timeout = 0;
        }
        const nodejsTimer = setTimeout(task, timeout);
        listOfActiveTimers.set(handle, nodejsTimer);
        return handle;
    }
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#microtask-queuing
    window.queueMicrotask = function(callback) {
        callback = IDLFunction.convert(window, callback);
        queueMicrotask(()=>{
            try {
                callback();
            } catch (e) {
                reportException(window, e, window.location.href);
            }
        });
    };
    // https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#animation-frames
    let animationFrameCallbackId = 0;
    const mapOfAnimationFrameCallbacks = new Map();
    let animationFrameNodejsInterval = null;
    // Unlike the spec, where an animation frame happens every 60 Hz regardless, we optimize so that if there are no
    // requestAnimationFrame() calls outstanding, we don't fire the timer. This helps us track that.
    let numberOfOngoingAnimationFrameCallbacks = 0;
    if (window._pretendToBeVisual) {
        window.requestAnimationFrame = function(callback) {
            callback = IDLFunction.convert(window, callback);
            const handle = ++animationFrameCallbackId;
            mapOfAnimationFrameCallbacks.set(handle, callback);
            ++numberOfOngoingAnimationFrameCallbacks;
            if (numberOfOngoingAnimationFrameCallbacks === 1) {
                animationFrameNodejsInterval = setInterval(()=>{
                    runAnimationFrameCallbacks(performance.now() - windowInitialized);
                }, 1000 / 60);
            }
            return handle;
        };
        window.cancelAnimationFrame = function(handle) {
            handle = webIDLConversions["unsigned long"](handle);
            removeAnimationFrameCallback(handle);
        };
        function runAnimationFrameCallbacks(now) {
            // Converting to an array is important to get a sync snapshot and thus match spec semantics.
            const callbackHandles = [
                ...mapOfAnimationFrameCallbacks.keys()
            ];
            for (const handle of callbackHandles){
                // This has() can be false if a callback calls cancelAnimationFrame().
                if (mapOfAnimationFrameCallbacks.has(handle)) {
                    const callback = mapOfAnimationFrameCallbacks.get(handle);
                    removeAnimationFrameCallback(handle);
                    try {
                        callback(now);
                    } catch (e) {
                        reportException(window, e, window.location.href);
                    }
                }
            }
        }
        function removeAnimationFrameCallback(handle) {
            if (mapOfAnimationFrameCallbacks.has(handle)) {
                --numberOfOngoingAnimationFrameCallbacks;
                if (numberOfOngoingAnimationFrameCallbacks === 0) {
                    clearInterval(animationFrameNodejsInterval);
                }
            }
            mapOfAnimationFrameCallbacks.delete(handle);
        }
    }
    function stopAllTimers() {
        for (const nodejsTimer of listOfActiveTimers.values()){
            clearTimeout(nodejsTimer);
        }
        listOfActiveTimers.clear();
        clearInterval(animationFrameNodejsInterval);
    }
    function Option(text, value1, defaultSelected, selected) {
        if (text === undefined) {
            text = "";
        }
        text = webIDLConversions.DOMString(text);
        if (value1 !== undefined) {
            value1 = webIDLConversions.DOMString(value1);
        }
        defaultSelected = webIDLConversions.boolean(defaultSelected);
        selected = webIDLConversions.boolean(selected);
        const option = window._document.createElement("option");
        const impl = idlUtils.implForWrapper(option);
        if (text !== "") {
            impl.text = text;
        }
        if (value1 !== undefined) {
            impl.setAttributeNS(null, "value", value1);
        }
        if (defaultSelected) {
            impl.setAttributeNS(null, "selected", "");
        }
        impl._selectedness = selected;
        return option;
    }
    Object.defineProperty(Option, "prototype", {
        value: window.HTMLOptionElement.prototype,
        configurable: false,
        enumerable: false,
        writable: false
    });
    Object.defineProperty(window, "Option", {
        value: Option,
        configurable: true,
        enumerable: false,
        writable: true
    });
    function Image(...args) {
        const img = window._document.createElement("img");
        const impl = idlUtils.implForWrapper(img);
        if (args.length > 0) {
            impl.setAttributeNS(null, "width", String(args[0]));
        }
        if (args.length > 1) {
            impl.setAttributeNS(null, "height", String(args[1]));
        }
        return img;
    }
    Object.defineProperty(Image, "prototype", {
        value: window.HTMLImageElement.prototype,
        configurable: false,
        enumerable: false,
        writable: false
    });
    Object.defineProperty(window, "Image", {
        value: Image,
        configurable: true,
        enumerable: false,
        writable: true
    });
    function Audio(src) {
        const audio = window._document.createElement("audio");
        const impl = idlUtils.implForWrapper(audio);
        impl.setAttributeNS(null, "preload", "auto");
        if (src !== undefined) {
            impl.setAttributeNS(null, "src", String(src));
        }
        return audio;
    }
    Object.defineProperty(Audio, "prototype", {
        value: window.HTMLAudioElement.prototype,
        configurable: false,
        enumerable: false,
        writable: false
    });
    Object.defineProperty(window, "Audio", {
        value: Audio,
        configurable: true,
        enumerable: false,
        writable: true
    });
    window.postMessage = function(message, targetOrigin) {
        if (arguments.length < 2) {
            throw new TypeError("'postMessage' requires 2 arguments: 'message' and 'targetOrigin'");
        }
        targetOrigin = webIDLConversions.DOMString(targetOrigin);
        if (targetOrigin === "/") {
            // TODO: targetOrigin === "/" requires getting incumbent settings object.
            // Maybe could be done with Error stack traces??
            return;
        } else if (targetOrigin !== "*") {
            const parsedURL = whatwgURL.parseURL(targetOrigin);
            if (parsedURL === null) {
                throw DOMException.create(window, [
                    "Failed to execute 'postMessage' on 'Window': " + "Invalid target origin '" + targetOrigin + "' in a call to 'postMessage'.",
                    "SyntaxError"
                ]);
            }
            targetOrigin = whatwgURL.serializeURLOrigin(parsedURL);
            if (targetOrigin !== idlUtils.implForWrapper(window._document)._origin) {
                // Not implemented.
                return;
            }
        }
        // TODO: event.source - requires reference to incumbent window
        // TODO: event.origin - requires reference to incumbent window
        // TODO: event.ports
        // TODO: event.data - requires structured cloning
        setTimeout(()=>{
            fireAnEvent("message", window, MessageEvent, {
                data: message
            });
        }, 0);
    };
    window.atob = function(str) {
        try {
            return atob(str);
        } catch  {
            // Convert Node.js DOMException to one from our global.
            throw DOMException.create(window, [
                "The string to be decoded contains invalid characters.",
                "InvalidCharacterError"
            ]);
        }
    };
    window.btoa = function(str) {
        try {
            return btoa(str);
        } catch  {
            // Convert Node.js DOMException to one from our global.
            throw DOMException.create(window, [
                "The string to be encoded contains invalid characters.",
                "InvalidCharacterError"
            ]);
        }
    };
    window.stop = function() {
        const manager = idlUtils.implForWrapper(window._document)._requestManager;
        if (manager) {
            manager.close();
        }
    };
    window.close = function() {
        // Recursively close child frame windows, then ourselves (depth-first).
        for(let i = 0; i < window.length; ++i){
            window[i].close();
        }
        // Clear out all listeners. Any in-flight or upcoming events should not get delivered.
        idlUtils.implForWrapper(window)._eventListeners = Object.create(null);
        if (window._document) {
            if (window._document.body) {
                window._document.body.innerHTML = "";
            }
            if (window._document.close) {
                // It's especially important to clear out the listeners here because document.close() causes a "load" event to
                // fire.
                idlUtils.implForWrapper(window._document)._eventListeners = Object.create(null);
                window._document.close();
            }
            const doc = idlUtils.implForWrapper(window._document);
            if (doc._requestManager) {
                doc._requestManager.close();
            }
            delete window._document;
        }
        stopAllTimers();
        WebSocketImpl.cleanUpWindow(window);
    };
    window.getComputedStyle = function(elt, pseudoElt = undefined) {
        elt = Element.convert(window, elt);
        if (pseudoElt !== undefined && pseudoElt !== null) {
            pseudoElt = webIDLConversions.DOMString(pseudoElt);
        }
        if (pseudoElt !== undefined && pseudoElt !== null && pseudoElt !== "") {
            // TODO: Parse pseudoElt
            if (SHADOW_DOM_PSEUDO_REGEXP.test(pseudoElt)) {
                throw new TypeError("Tried to get the computed style of a Shadow DOM pseudo-element.");
            }
            notImplemented("window.getComputedStyle(elt, pseudoElt)", window);
        }
        const declaration = new CSSStyleDeclaration();
        const { forEach } = Array.prototype;
        const elementDeclaration = getDeclarationForElement(elt);
        forEach.call(elementDeclaration, (property)=>{
            declaration.setProperty(property, elementDeclaration.getPropertyValue(property), elementDeclaration.getPropertyPriority(property));
        });
        // https://drafts.csswg.org/cssom/#dom-window-getcomputedstyle
        const declarations = Object.keys(propertiesWithResolvedValueImplemented);
        forEach.call(declarations, (property)=>{
            declaration.setProperty(property, getResolvedValue(elt, property));
        });
        return declaration;
    };
    window.getSelection = function() {
        return window._document.getSelection();
    };
    // The captureEvents() and releaseEvents() methods must do nothing
    window.captureEvents = function() {};
    window.releaseEvents = function() {};
    // ### PUBLIC DATA PROPERTIES (TODO: should be getters)
    function wrapConsoleMethod(method) {
        return (...args)=>{
            window._virtualConsole.emit(method, ...args);
        };
    }
    window.console = {
        assert: wrapConsoleMethod("assert"),
        clear: wrapConsoleMethod("clear"),
        count: wrapConsoleMethod("count"),
        countReset: wrapConsoleMethod("countReset"),
        debug: wrapConsoleMethod("debug"),
        dir: wrapConsoleMethod("dir"),
        dirxml: wrapConsoleMethod("dirxml"),
        error: wrapConsoleMethod("error"),
        group: wrapConsoleMethod("group"),
        groupCollapsed: wrapConsoleMethod("groupCollapsed"),
        groupEnd: wrapConsoleMethod("groupEnd"),
        info: wrapConsoleMethod("info"),
        log: wrapConsoleMethod("log"),
        table: wrapConsoleMethod("table"),
        time: wrapConsoleMethod("time"),
        timeLog: wrapConsoleMethod("timeLog"),
        timeEnd: wrapConsoleMethod("timeEnd"),
        trace: wrapConsoleMethod("trace"),
        warn: wrapConsoleMethod("warn")
    };
    function notImplementedMethod(name) {
        return function() {
            notImplemented(name, window);
        };
    }
    define(window, {
        name: "",
        status: "",
        devicePixelRatio: 1,
        innerWidth: 1024,
        innerHeight: 768,
        outerWidth: 1024,
        outerHeight: 768,
        pageXOffset: 0,
        pageYOffset: 0,
        screenX: 0,
        screenLeft: 0,
        screenY: 0,
        screenTop: 0,
        scrollX: 0,
        scrollY: 0,
        alert: notImplementedMethod("window.alert"),
        blur: notImplementedMethod("window.blur"),
        confirm: notImplementedMethod("window.confirm"),
        focus: notImplementedMethod("window.focus"),
        moveBy: notImplementedMethod("window.moveBy"),
        moveTo: notImplementedMethod("window.moveTo"),
        open: notImplementedMethod("window.open"),
        print: notImplementedMethod("window.print"),
        prompt: notImplementedMethod("window.prompt"),
        resizeBy: notImplementedMethod("window.resizeBy"),
        resizeTo: notImplementedMethod("window.resizeTo"),
        scroll: notImplementedMethod("window.scroll"),
        scrollBy: notImplementedMethod("window.scrollBy"),
        scrollTo: notImplementedMethod("window.scrollTo")
    });
}
function makeReplaceablePropertyDescriptor(property, window) {
    const desc = {
        set (value1) {
            Object.defineProperty(window, property, {
                configurable: true,
                enumerable: true,
                writable: true,
                value: value1
            });
        }
    };
    Object.defineProperty(desc.set, "name", {
        value: `set ${property}`
    });
    return desc;
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/resources/resource-loader.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const { fileURLToPath } = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
const { parseURL } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const dataURLFromRecord = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/data-urls@5.0.0/node_modules/data-urls/lib/parser.js [app-ssr] (ecmascript)").fromURLRecord;
const packageVersion = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/package.json (json)").version;
const agentFactory = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/agent-factory.js [app-ssr] (ecmascript)");
const Request = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/http-request.js [app-ssr] (ecmascript)");
const IS_BROWSER = Object.prototype.toString.call(process) !== "[object process]";
module.exports = class ResourceLoader {
    constructor({ strictSSL = true, proxy = undefined, userAgent = `Mozilla/5.0 (${process.platform || "unknown OS"}) AppleWebKit/537.36 ` + `(KHTML, like Gecko) jsdom/${packageVersion}` } = {}){
        this._strictSSL = strictSSL;
        this._proxy = proxy;
        this._userAgent = userAgent;
    }
    _readDataURL(urlRecord) {
        const dataURL = dataURLFromRecord(urlRecord);
        let timeoutId;
        const promise = new Promise((resolve)=>{
            timeoutId = setTimeout(resolve, 0, Buffer.from(dataURL.body));
        });
        promise.abort = ()=>{
            if (timeoutId !== undefined) {
                clearTimeout(timeoutId);
            }
        };
        return promise;
    }
    _readFile(filePath) {
        let readableStream, abort; // Native Promises doesn't have an "abort" method.
        // Creating a promise for two reason:
        //   1. fetch always return a promise.
        //   2. We need to add an abort handler.
        const promise = new Promise((resolve, reject)=>{
            readableStream = fs.createReadStream(filePath);
            let data = Buffer.alloc(0);
            abort = reject;
            readableStream.on("error", reject);
            readableStream.on("data", (chunk)=>{
                data = Buffer.concat([
                    data,
                    chunk
                ]);
            });
            readableStream.on("end", ()=>{
                resolve(data);
            });
        });
        promise.abort = ()=>{
            readableStream.destroy();
            const error = new Error("request canceled by user");
            error.isAbortError = true;
            abort(error);
        };
        return promise;
    }
    fetch(urlString, { accept, cookieJar, referrer } = {}) {
        const url = parseURL(urlString);
        if (!url) {
            return Promise.reject(new Error(`Tried to fetch invalid URL ${urlString}`));
        }
        switch(url.scheme){
            case "data":
                {
                    return this._readDataURL(url);
                }
            case "http":
            case "https":
                {
                    const agents = agentFactory(this._proxy, this._strictSSL);
                    const headers = {
                        "User-Agent": this._userAgent,
                        "Accept-Language": "en",
                        "Accept-Encoding": "gzip",
                        "Accept": accept || "*/*"
                    };
                    if (referrer && !IS_BROWSER) {
                        headers.Referer = referrer;
                    }
                    const requestClient = new Request(urlString, {
                        followRedirects: true,
                        cookieJar,
                        agents
                    }, {
                        headers
                    });
                    const promise = new Promise((resolve, reject)=>{
                        const accumulated = [];
                        requestClient.once("response", (res)=>{
                            promise.response = res;
                            const { statusCode } = res;
                            // TODO This deviates from the spec when it comes to
                            // loading resources such as images
                            if (statusCode < 200 || statusCode > 299) {
                                requestClient.abort();
                                reject(new Error(`Resource was not loaded. Status: ${statusCode}`));
                            }
                        });
                        requestClient.on("data", (chunk)=>{
                            accumulated.push(chunk);
                        });
                        requestClient.on("end", ()=>resolve(Buffer.concat(accumulated)));
                        requestClient.on("error", reject);
                    });
                    // The method fromURL in lib/api.js crashes without the following four
                    // properties defined on the Promise instance, causing the test suite to halt
                    requestClient.on("end", ()=>{
                        promise.href = requestClient.currentURL;
                    });
                    promise.abort = requestClient.abort.bind(requestClient);
                    promise.getHeader = (name)=>headers[name] || requestClient.getHeader(name);
                    requestClient.end();
                    return promise;
                }
            case "file":
                {
                    try {
                        return this._readFile(fileURLToPath(urlString));
                    } catch (e) {
                        return Promise.reject(e);
                    }
                }
            default:
                {
                    return Promise.reject(new Error(`Tried to fetch URL ${urlString} with invalid scheme ${url.scheme}`));
                }
        }
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/resources/no-op-resource-loader.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const ResourceLoader = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/resources/resource-loader.js [app-ssr] (ecmascript)");
module.exports = class NoOpResourceLoader extends ResourceLoader {
    fetch() {
        return null;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/level2/style.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const cssom = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/index.js [app-ssr] (ecmascript)");
const cssstyle = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/cssstyle@4.6.0/node_modules/cssstyle/lib/CSSStyleDeclaration.js [app-ssr] (ecmascript)");
exports.addToCore = (core)=>{
    // What works now:
    // - Accessing the rules defined in individual stylesheets
    // - Modifications to style content attribute are reflected in style property
    // - Modifications to style property are reflected in style content attribute
    // TODO
    // - Modifications to style element's textContent are reflected in sheet property.
    // - Modifications to style element's sheet property are reflected in textContent.
    // - Modifications to link.href property are reflected in sheet property.
    // - Less-used features of link: disabled
    // - Less-used features of style: disabled, scoped, title
    // - CSSOM-View
    //   - getComputedStyle(): requires default stylesheet, cascading, inheritance,
    //     filtering by @media (screen? print?), layout for widths/heights
    // - Load events are not in the specs, but apparently some browsers
    //   implement something. Should onload only fire after all @imports have been
    //   loaded, or only the primary sheet?
    core.StyleSheet = cssom.StyleSheet;
    core.MediaList = cssom.MediaList;
    core.CSSStyleSheet = cssom.CSSStyleSheet;
    core.CSSRule = cssom.CSSRule;
    core.CSSStyleRule = cssom.CSSStyleRule;
    core.CSSMediaRule = cssom.CSSMediaRule;
    core.CSSImportRule = cssom.CSSImportRule;
    core.CSSStyleDeclaration = cssstyle.CSSStyleDeclaration;
// Relevant specs
// http://www.w3.org/TR/DOM-Level-2-Style (2000)
// http://www.w3.org/TR/cssom-view/ (2008)
// http://dev.w3.org/csswg/cssom/ (2010) Meant to replace DOM Level 2 Style
// http://www.whatwg.org/specs/web-apps/current-work/multipage/ HTML5, of course
// http://dev.w3.org/csswg/css-style-attr/  not sure what's new here
// Objects that aren't in cssom library but should be:
//   CSSRuleList  (cssom just uses array)
//   CSSFontFaceRule
//   CSSPageRule
// These rules don't really make sense to implement, so CSSOM draft makes them
// obsolete.
//   CSSCharsetRule
//   CSSUnknownRule
// These objects are considered obsolete by CSSOM draft, although modern
// browsers implement them.
//   CSSValue
//   CSSPrimitiveValue
//   CSSValueList
//   RGBColor
//   Rect
//   Counter
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/level3/xpath.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/** Here is yet another implementation of XPath 1.0 in Javascript.
 *
 * My goal was to make it relatively compact, but as I fixed all the axis bugs
 * the axes became more and more complicated. :-(.
 *
 * I have not implemented namespaces or case-sensitive axes for XML yet.
 *
 * How to test it in Chrome: You can make a Chrome extension that replaces
 * the WebKit XPath parser with this one. But it takes a bit of effort to
 * get around isolated world and same-origin restrictions:
 * manifest.json:
    {
      "name": "XPathTest",
      "version": "0.1",
      "content_scripts": [{
        "matches": ["http://localhost/*"],  // or wildcard host
        "js": ["xpath.js", "injection.js"],
        "all_frames": true, "run_at": "document_start"
      }]
    }
 * injection.js:
    // goal: give my xpath object to the website's JS context.
    var script = document.createElement('script');
    script.textContent =
        "document.addEventListener('xpathextend', function(e) {\n" +
        "  console.log('extending document with xpath...');\n" +
        "  e.detail(window);" +
        "});";
    document.documentElement.appendChild(script);
    document.documentElement.removeChild(script);
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('xpathextend', true, true, this.xpath.extend);
    document.dispatchEvent(evt);
 */ module.exports = (core)=>{
    var xpath = {};
    // Helper function to deal with the migration of Attr to no longer have a nodeName property despite this codebase
    // assuming it does.
    function getNodeName(nodeOrAttr) {
        return nodeOrAttr.constructor.name === 'Attr' ? nodeOrAttr.name : nodeOrAttr.nodeName;
    }
    /***************************************************************************
   *                            Tokenization                                 *
   ***************************************************************************/ /**
   * The XPath lexer is basically a single regular expression, along with
   * some helper functions to pop different types.
   */ var Stream = xpath.Stream = function Stream(str) {
        this.original = this.str = str;
        this.peeked = null;
        // TODO: not really needed, but supposedly tokenizer also disambiguates
        // a * b vs. node test *
        this.prev = null; // for debugging
        this.prevprev = null;
    };
    Stream.prototype = {
        peek: function() {
            if (this.peeked) return this.peeked;
            var m = this.re.exec(this.str);
            if (!m) return null;
            this.str = this.str.substr(m[0].length);
            return this.peeked = m[1];
        },
        /** Peek 2 tokens ahead. */ peek2: function() {
            this.peek(); // make sure this.peeked is set
            var m = this.re.exec(this.str);
            if (!m) return null;
            return m[1];
        },
        pop: function() {
            var r = this.peek();
            this.peeked = null;
            this.prevprev = this.prev;
            this.prev = r;
            return r;
        },
        trypop: function(tokens) {
            var tok = this.peek();
            if (tok === tokens) return this.pop();
            if (Array.isArray(tokens)) {
                for(var i = 0; i < tokens.length; ++i){
                    var t = tokens[i];
                    if (t == tok) return this.pop();
                    ;
                }
            }
        },
        trypopfuncname: function() {
            var tok = this.peek();
            if (!this.isQnameRe.test(tok)) return null;
            switch(tok){
                case 'comment':
                case 'text':
                case 'processing-instruction':
                case 'node':
                    return null;
            }
            if ('(' != this.peek2()) return null;
            return this.pop();
        },
        trypopaxisname: function() {
            var tok = this.peek();
            switch(tok){
                case 'ancestor':
                case 'ancestor-or-self':
                case 'attribute':
                case 'child':
                case 'descendant':
                case 'descendant-or-self':
                case 'following':
                case 'following-sibling':
                case 'namespace':
                case 'parent':
                case 'preceding':
                case 'preceding-sibling':
                case 'self':
                    if ('::' == this.peek2()) return this.pop();
            }
            return null;
        },
        trypopnametest: function() {
            var tok = this.peek();
            if ('*' === tok || this.startsWithNcNameRe.test(tok)) return this.pop();
            return null;
        },
        trypopliteral: function() {
            var tok = this.peek();
            if (null == tok) return null;
            var first = tok.charAt(0);
            var last = tok.charAt(tok.length - 1);
            if ('"' === first && '"' === last || "'" === first && "'" === last) {
                this.pop();
                return tok.substr(1, tok.length - 2) ?? null;
            }
            return null;
        },
        trypopnumber: function() {
            var tok = this.peek();
            if (this.isNumberRe.test(tok)) return parseFloat(this.pop()) ?? null;
            else return null;
        },
        trypopvarref: function() {
            var tok = this.peek();
            if (null == tok) return null;
            if ('$' === tok.charAt(0)) return this.pop().substr(1) ?? null;
            else return null;
        },
        position: function() {
            return this.original.length - this.str.length;
        }
    };
    (function() {
        // http://www.w3.org/TR/REC-xml-names/#NT-NCName
        var nameStartCharsExceptColon = 'A-Z_a-z\xc0-\xd6\xd8-\xf6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF' + '\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF' + '\uFDF0-\uFFFD'; // JS doesn't support [#x10000-#xEFFFF]
        var nameCharExceptColon = nameStartCharsExceptColon + '\\-\\.0-9\xb7\u0300-\u036F\u203F-\u2040';
        var ncNameChars = '[' + nameStartCharsExceptColon + '][' + nameCharExceptColon + ']*';
        // http://www.w3.org/TR/REC-xml-names/#NT-QName
        var qNameChars = ncNameChars + '(?::' + ncNameChars + ')?';
        var otherChars = '\\.\\.|[\\(\\)\\[\\].@,]|::'; // .. must come before [.]
        var operatorChars = 'and|or|mod|div|' + '//|!=|<=|>=|[*/|+\\-=<>]'; // //, !=, <=, >= before individual ones.
        var literal = '"[^"]*"|' + "'[^']*'";
        var numberChars = '[0-9]+(?:\\.[0-9]*)?|\\.[0-9]+';
        var variableReference = '\\$' + qNameChars;
        var nameTestChars = '\\*|' + ncNameChars + ':\\*|' + qNameChars;
        var optionalSpace = '[ \t\r\n]*'; // stricter than regexp \s.
        var nodeType = 'comment|text|processing-instruction|node';
        var re = new RegExp(// numberChars before otherChars so that leading-decimal doesn't become .
        '^' + optionalSpace + '(' + numberChars + '|' + otherChars + '|' + nameTestChars + '|' + operatorChars + '|' + literal + '|' + variableReference + ')');
        Stream.prototype.re = re;
        Stream.prototype.startsWithNcNameRe = new RegExp('^' + ncNameChars);
        Stream.prototype.isQnameRe = new RegExp('^' + qNameChars + '$');
        Stream.prototype.isNumberRe = new RegExp('^' + numberChars + '$');
    })();
    /***************************************************************************
   *                               Parsing                                   *
   ***************************************************************************/ var parse = xpath.parse = function parse(stream1, a) {
        var r = orExpr(stream1, a);
        var x, unparsed = [];
        while(x = stream1.pop()){
            unparsed.push(x);
        }
        if (unparsed.length) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Unparsed tokens: ' + unparsed.join(' '));
        return r;
    };
    /**
   * binaryL  ::= subExpr
   *            | binaryL op subExpr
   * so a op b op c becomes ((a op b) op c)
   */ function binaryL(subExpr, stream1, a, ops) {
        var lhs = subExpr(stream1, a);
        if (lhs == null) return null;
        var op;
        while(op = stream1.trypop(ops)){
            var rhs = subExpr(stream1, a);
            if (rhs == null) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected something after ' + op);
            lhs = a.node(op, lhs, rhs);
        }
        return lhs;
    }
    /**
   * Too bad this is never used. If they made a ** operator (raise to power),
   ( we would use it.
   * binaryR  ::= subExpr
   *            | subExpr op binaryR
   * so a op b op c becomes (a op (b op c))
   */ function binaryR(subExpr, stream1, a, ops) {
        var lhs = subExpr(stream1, a);
        if (lhs == null) return null;
        var op = stream1.trypop(ops);
        if (op) {
            var rhs = binaryR(stream1, a);
            if (rhs == null) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected something after ' + op);
            return a.node(op, lhs, rhs);
        } else {
            return lhs; // TODO
        }
    }
    /** [1] LocationPath::= RelativeLocationPath | AbsoluteLocationPath
   * e.g. a, a/b, //a/b
   */ function locationPath(stream1, a) {
        return absoluteLocationPath(stream1, a) || relativeLocationPath(null, stream1, a);
    }
    /** [2] AbsoluteLocationPath::= '/' RelativeLocationPath? | AbbreviatedAbsoluteLocationPath
   *  [10] AbbreviatedAbsoluteLocationPath::= '//' RelativeLocationPath
   */ function absoluteLocationPath(stream1, a) {
        var op = stream1.peek();
        if ('/' === op || '//' === op) {
            var lhs = a.node('Root');
            return relativeLocationPath(lhs, stream1, a, true);
        } else {
            return null;
        }
    }
    /** [3] RelativeLocationPath::= Step | RelativeLocationPath '/' Step |
   *                            | AbbreviatedRelativeLocationPath
   *  [11] AbbreviatedRelativeLocationPath::= RelativeLocationPath '//' Step
   * e.g. p/a, etc.
   */ function relativeLocationPath(lhs, stream1, a, isOnlyRootOk) {
        if (null == lhs) {
            lhs = step(stream1, a);
            if (null == lhs) return lhs;
        }
        var op;
        while(op = stream1.trypop([
            '/',
            '//'
        ])){
            if ('//' === op) {
                lhs = a.node('/', lhs, a.node('Axis', 'descendant-or-self', 'node', undefined));
            }
            var rhs = step(stream1, a);
            if (null == rhs && '/' === op && isOnlyRootOk) return lhs;
            else isOnlyRootOk = false;
            if (null == rhs) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected step after ' + op);
            lhs = a.node('/', lhs, rhs);
        }
        return lhs;
    }
    /** [4] Step::= AxisSpecifier NodeTest Predicate* | AbbreviatedStep
   *  [12] AbbreviatedStep::= '.' | '..'
   * e.g. @href, self::p, p, a[@href], ., ..
   */ function step(stream1, a) {
        var abbrStep = stream1.trypop([
            '.',
            '..'
        ]);
        if ('.' === abbrStep) return a.node('Axis', 'self', 'node');
        if ('..' === abbrStep) return a.node('Axis', 'parent', 'node');
        var axis = axisSpecifier(stream1, a);
        var nodeType = nodeTypeTest(stream1, a);
        var nodeName;
        if (null == nodeType) nodeName = nodeNameTest(stream1, a);
        if (null == axis && null == nodeType && null == nodeName) return null;
        if (null == nodeType && null == nodeName) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected nodeTest after axisSpecifier ' + axis);
        if (null == axis) axis = 'child';
        if (null == nodeType) {
            // When there's only a node name, then the node type is forced to be the
            // principal node type of the axis.
            // see http://www.w3.org/TR/xpath/#dt-principal-node-type
            if ('attribute' === axis) nodeType = 'attribute';
            else if ('namespace' === axis) nodeType = 'namespace';
            else nodeType = 'element';
        }
        var lhs = a.node('Axis', axis, nodeType, nodeName);
        var pred;
        while(null != (pred = predicate(lhs, stream1, a))){
            lhs = pred;
        }
        return lhs;
    }
    /** [5] AxisSpecifier::= AxisName '::' | AbbreviatedAxisSpecifier
   *  [6] AxisName::= 'ancestor' | 'ancestor-or-self' | 'attribute' | 'child'
   *                | 'descendant' | 'descendant-or-self' | 'following'
   *                | 'following-sibling' | 'namespace' | 'parent' |
   *                | 'preceding' | 'preceding-sibling' | 'self'
   *  [13] AbbreviatedAxisSpecifier::= '@'?
   */ function axisSpecifier(stream1, a) {
        var attr = stream1.trypop('@');
        if (null != attr) return 'attribute';
        var axisName = stream1.trypopaxisname();
        if (null != axisName) {
            var coloncolon = stream1.trypop('::');
            if (null == coloncolon) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Should not happen. Should be ::.');
            return axisName;
        }
    }
    /** [7] NodeTest::= NameTest | NodeType '(' ')' | 'processing-instruction' '(' Literal ')'
   *  [38] NodeType::= 'comment' | 'text' | 'processing-instruction' | 'node'
   * I've split nodeTypeTest from nodeNameTest for convenience.
   */ function nodeTypeTest(stream1, a) {
        if ('(' !== stream1.peek2()) {
            return null;
        }
        var type = stream1.trypop([
            'comment',
            'text',
            'processing-instruction',
            'node'
        ]);
        if (null != type) {
            if (null == stream1.trypop('(')) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Should not happen.');
            var param = undefined;
            if (type == 'processing-instruction') {
                param = stream1.trypopliteral();
            }
            if (null == stream1.trypop(')')) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected close parens.');
            return type;
        }
    }
    function nodeNameTest(stream1, a) {
        var name = stream1.trypopnametest();
        if (name != null) return name;
        else return null;
    }
    /** [8] Predicate::= '[' PredicateExpr ']'
   *  [9] PredicateExpr::= Expr
   */ function predicate(lhs, stream1, a) {
        if (null == stream1.trypop('[')) return null;
        var expr = orExpr(stream1, a);
        if (null == expr) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected expression after [');
        if (null == stream1.trypop(']')) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected ] after expression.');
        return a.node('Predicate', lhs, expr);
    }
    /** [14] Expr::= OrExpr
   */ /** [15] PrimaryExpr::= VariableReference | '(' Expr ')' | Literal | Number | FunctionCall
   * e.g. $x,  (3+4),  "hi",  32,  f(x)
   */ function primaryExpr(stream1, a) {
        var x = stream1.trypopliteral();
        if (null == x) x = stream1.trypopnumber();
        if (null != x) {
            return x;
        }
        var varRef = stream1.trypopvarref();
        if (null != varRef) return a.node('VariableReference', varRef);
        var funCall = functionCall(stream1, a);
        if (null != funCall) {
            return funCall;
        }
        if (stream1.trypop('(')) {
            var e = orExpr(stream1, a);
            if (null == e) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected expression after (.');
            if (null == stream1.trypop(')')) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected ) after expression.');
            return e;
        }
        return null;
    }
    /** [16] FunctionCall::= FunctionName '(' ( Argument ( ',' Argument )* )? ')'
   *  [17] Argument::= Expr
   */ function functionCall(stream1, a) {
        var name = stream1.trypopfuncname(stream1, a);
        if (null == name) return null;
        if (null == stream1.trypop('(')) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected ( ) after function name.');
        var params = [];
        var first = true;
        while(null == stream1.trypop(')')){
            if (!first && null == stream1.trypop(',')) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected , between arguments of the function.');
            first = false;
            var param = orExpr(stream1, a);
            if (param == null) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected expression as argument of function.');
            params.push(param);
        }
        return a.node('FunctionCall', name, params);
    }
    /** [18] UnionExpr::= PathExpr | UnionExpr '|' PathExpr
   */ function unionExpr(stream1, a) {
        return binaryL(pathExpr, stream1, a, '|');
    }
    /** [19] PathExpr ::= LocationPath
   *                  | FilterExpr
   *                  | FilterExpr '/' RelativeLocationPath
   *                  | FilterExpr '//' RelativeLocationPath
   * Unlike most other nodes, this one always generates a node because
   * at this point all reverse nodesets must turn into a forward nodeset
   */ function pathExpr(stream1, a) {
        // We have to do FilterExpr before LocationPath because otherwise
        // LocationPath will eat up the name from a function call.
        var filter = filterExpr(stream1, a);
        if (null == filter) {
            var loc = locationPath(stream1, a);
            if (null == loc) {
                throw new Error;
                throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': The expression shouldn\'t be empty...');
            }
            return a.node('PathExpr', loc);
        }
        var rel = relativeLocationPath(filter, stream1, a, false);
        if (filter === rel) return rel;
        else return a.node('PathExpr', rel);
    }
    /** [20] FilterExpr::= PrimaryExpr | FilterExpr Predicate
   * aka. FilterExpr ::= PrimaryExpr Predicate*
   */ function filterExpr(stream1, a) {
        var primary = primaryExpr(stream1, a);
        if (primary == null) return null;
        var pred, lhs = primary;
        while(null != (pred = predicate(lhs, stream1, a))){
            lhs = pred;
        }
        return lhs;
    }
    /** [21] OrExpr::= AndExpr | OrExpr 'or' AndExpr
   */ function orExpr(stream1, a) {
        var orig = (stream1.peeked || '') + stream1.str;
        var r = binaryL(andExpr, stream1, a, 'or');
        var now = (stream1.peeked || '') + stream1.str;
        return r;
    }
    /** [22] AndExpr::= EqualityExpr | AndExpr 'and' EqualityExpr
   */ function andExpr(stream1, a) {
        return binaryL(equalityExpr, stream1, a, 'and');
    }
    /** [23] EqualityExpr::= RelationalExpr | EqualityExpr '=' RelationalExpr
   *                     | EqualityExpr '!=' RelationalExpr
   */ function equalityExpr(stream1, a) {
        return binaryL(relationalExpr, stream1, a, [
            '=',
            '!='
        ]);
    }
    /** [24] RelationalExpr::= AdditiveExpr | RelationalExpr '<' AdditiveExpr
   *                       | RelationalExpr '>' AdditiveExpr
   *                       | RelationalExpr '<=' AdditiveExpr
   *                       | RelationalExpr '>=' AdditiveExpr
   */ function relationalExpr(stream1, a) {
        return binaryL(additiveExpr, stream1, a, [
            '<',
            '>',
            '<=',
            '>='
        ]);
    }
    /** [25] AdditiveExpr::= MultiplicativeExpr
   *                     | AdditiveExpr '+' MultiplicativeExpr
   *                     | AdditiveExpr '-' MultiplicativeExpr
   */ function additiveExpr(stream1, a) {
        return binaryL(multiplicativeExpr, stream1, a, [
            '+',
            '-'
        ]);
    }
    /** [26] MultiplicativeExpr::= UnaryExpr
   *                           | MultiplicativeExpr MultiplyOperator UnaryExpr
   *                           | MultiplicativeExpr 'div' UnaryExpr
   *                           | MultiplicativeExpr 'mod' UnaryExpr
   */ function multiplicativeExpr(stream1, a) {
        return binaryL(unaryExpr, stream1, a, [
            '*',
            'div',
            'mod'
        ]);
    }
    /** [27] UnaryExpr::= UnionExpr | '-' UnaryExpr
   */ function unaryExpr(stream1, a) {
        if (stream1.trypop('-')) {
            var e = unaryExpr(stream1, a);
            if (null == e) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream1.position() + ': Expected unary expression after -');
            return a.node('UnaryMinus', e);
        } else return unionExpr(stream1, a);
    }
    var astFactory = {
        node: function() {
            return Array.prototype.slice.call(arguments);
        }
    };
    /***************************************************************************
   *                            Optimizations (TODO)                         *
   ***************************************************************************/ /**
   * Some things I've been considering:
   * 1) a//b becomes a/descendant::b if there's no predicate that uses
   *    position() or last()
   * 2) axis[pred]: when pred doesn't use position, evaluate it just once per
   *    node in the node-set rather than once per (node, position, last).
   * For more optimizations, look up Gecko's optimizer:
   * http://mxr.mozilla.org/mozilla-central/source/content/xslt/src/xpath/txXPathOptimizer.cpp
   */ // TODO
    function optimize(ast) {}
    /***************************************************************************
   *                           Evaluation: axes                              *
   ***************************************************************************/ /**
   * Data types: For string, number, boolean, we just use Javascript types.
   * Node-sets have the form
   *    {nodes: [node, ...]}
   * or {nodes: [node, ...], pos: [[1], [2], ...], lasts: [[1], [2], ...]}
   *
   * Most of the time, only the node is used and the position information is
   * discarded. But if you use a predicate, we need to try every value of
   * position and last in case the predicate calls position() or last().
   */ /**
   * The NodeMultiSet is a helper class to help generate
   * {nodes:[], pos:[], lasts:[]} structures. It is useful for the
   * descendant, descendant-or-self, following-sibling, and
   * preceding-sibling axes for which we can use a stack to organize things.
   */ function NodeMultiSet(isReverseAxis) {
        this.nodes = [];
        this.pos = [];
        this.lasts = [];
        this.nextPos = [];
        this.seriesIndexes = []; // index within nodes that each series begins.
        this.isReverseAxis = isReverseAxis;
        this._pushToNodes = isReverseAxis ? Array.prototype.unshift : Array.prototype.push;
    }
    NodeMultiSet.prototype = {
        pushSeries: function pushSeries() {
            this.nextPos.push(1);
            this.seriesIndexes.push(this.nodes.length);
        },
        popSeries: function popSeries() {
            console.assert(0 < this.nextPos.length, this.nextPos);
            var last = this.nextPos.pop() - 1, indexInPos = this.nextPos.length, seriesBeginIndex = this.seriesIndexes.pop(), seriesEndIndex = this.nodes.length;
            for(var i = seriesBeginIndex; i < seriesEndIndex; ++i){
                console.assert(indexInPos < this.lasts[i].length);
                console.assert(undefined === this.lasts[i][indexInPos]);
                this.lasts[i][indexInPos] = last;
            }
        },
        finalize: function() {
            if (null == this.nextPos) return this;
            console.assert(0 === this.nextPos.length);
            var lastsJSON = JSON.stringify(this.lasts);
            for(var i = 0; i < this.lasts.length; ++i){
                for(var j = 0; j < this.lasts[i].length; ++j){
                    console.assert(null != this.lasts[i][j], i + ',' + j + ':' + lastsJSON);
                }
            }
            this.pushSeries = this.popSeries = this.addNode = function() {
                throw new Error('Already finalized.');
            };
            return this;
        },
        addNode: function addNode(node) {
            console.assert(node);
            this._pushToNodes.call(this.nodes, node);
            this._pushToNodes.call(this.pos, this.nextPos.slice());
            this._pushToNodes.call(this.lasts, new Array(this.nextPos.length));
            for(var i = 0; i < this.nextPos.length; ++i)this.nextPos[i]++;
        },
        simplify: function() {
            this.finalize();
            return {
                nodes: this.nodes,
                pos: this.pos,
                lasts: this.lasts
            };
        }
    };
    function eachContext(nodeMultiSet) {
        var r = [];
        for(var i = 0; i < nodeMultiSet.nodes.length; i++){
            var node = nodeMultiSet.nodes[i];
            if (!nodeMultiSet.pos) {
                r.push({
                    nodes: [
                        node
                    ],
                    pos: [
                        [
                            i + 1
                        ]
                    ],
                    lasts: [
                        [
                            nodeMultiSet.nodes.length
                        ]
                    ]
                });
            } else {
                for(var j = 0; j < nodeMultiSet.pos[i].length; ++j){
                    r.push({
                        nodes: [
                            node
                        ],
                        pos: [
                            [
                                nodeMultiSet.pos[i][j]
                            ]
                        ],
                        lasts: [
                            [
                                nodeMultiSet.lasts[i][j]
                            ]
                        ]
                    });
                }
            }
        }
        return r;
    }
    /** Matcher used in the axes.
   */ function NodeMatcher(nodeTypeNum, nodeName, shouldLowerCase) {
        this.nodeTypeNum = nodeTypeNum;
        this.nodeName = nodeName;
        this.shouldLowerCase = shouldLowerCase;
        this.nodeNameTest = null == nodeName ? this._alwaysTrue : shouldLowerCase ? this._nodeNameLowerCaseEquals : this._nodeNameEquals;
    }
    NodeMatcher.prototype = {
        matches: function matches(node) {
            if (0 === this.nodeTypeNum || this._nodeTypeMatches(node)) {
                return this.nodeNameTest(getNodeName(node));
            }
            return false;
        },
        _nodeTypeMatches (nodeOrAttr) {
            if (nodeOrAttr.constructor.name === 'Attr' && this.nodeTypeNum === 2) {
                return true;
            }
            return nodeOrAttr.nodeType === this.nodeTypeNum;
        },
        _alwaysTrue: function(name) {
            return true;
        },
        _nodeNameEquals: function _nodeNameEquals(name) {
            return this.nodeName === name;
        },
        _nodeNameLowerCaseEquals: function _nodeNameLowerCaseEquals(name) {
            return this.nodeName === name.toLowerCase();
        }
    };
    function followingSiblingHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase, shift, peek, followingNode, andSelf, isReverseAxis) {
        var matcher = new NodeMatcher(nodeTypeNum, nodeName, shouldLowerCase);
        var nodeMultiSet = new NodeMultiSet(isReverseAxis);
        while(0 < nodeList.length){
            var node = shift.call(nodeList);
            console.assert(node != null);
            node = followingNode(node);
            nodeMultiSet.pushSeries();
            var numPushed = 1;
            while(null != node){
                if (!andSelf && matcher.matches(node)) nodeMultiSet.addNode(node);
                if (node === peek.call(nodeList)) {
                    shift.call(nodeList);
                    nodeMultiSet.pushSeries();
                    numPushed++;
                }
                if (andSelf && matcher.matches(node)) nodeMultiSet.addNode(node);
                node = followingNode(node);
            }
            while(0 < numPushed--)nodeMultiSet.popSeries();
        }
        return nodeMultiSet;
    }
    /** Returns the next non-descendant node in document order.
   * This is the first node in following::node(), if node is the context.
   */ function followingNonDescendantNode(node) {
        if (node.ownerElement) {
            if (node.ownerElement.firstChild) return node.ownerElement.firstChild;
            node = node.ownerElement;
        }
        do {
            if (node.nextSibling) return node.nextSibling;
        }while (node = node.parentNode)
        return null;
    }
    /** Returns the next node in a document-order depth-first search.
   * See the definition of document order[1]:
   *   1) element
   *   2) namespace nodes
   *   3) attributes
   *   4) children
   *   [1]: http://www.w3.org/TR/xpath/#dt-document-order
   */ function followingNode(node) {
        if (node.ownerElement) node = node.ownerElement;
        if (null != node.firstChild) return node.firstChild;
        do {
            if (null != node.nextSibling) {
                return node.nextSibling;
            }
            node = node.parentNode;
        }while (node)
        return null;
    }
    /** Returns the previous node in document order (excluding attributes
   * and namespace nodes).
   */ function precedingNode(node) {
        if (node.ownerElement) return node.ownerElement;
        if (null != node.previousSibling) {
            node = node.previousSibling;
            while(null != node.lastChild){
                node = node.lastChild;
            }
            return node;
        }
        if (null != node.parentNode) {
            return node.parentNode;
        }
        return null;
    }
    /** This axis is inefficient if there are many nodes in the nodeList.
   * But I think it's a pretty useless axis so it's ok. */ function followingHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
        var matcher = new NodeMatcher(nodeTypeNum, nodeName, shouldLowerCase);
        var nodeMultiSet = new NodeMultiSet(false);
        var cursor = nodeList[0];
        var unorderedFollowingStarts = [];
        for(var i = 0; i < nodeList.length; i++){
            var node = nodeList[i];
            var start = followingNonDescendantNode(node);
            if (start) unorderedFollowingStarts.push(start);
        }
        if (0 === unorderedFollowingStarts.length) return {
            nodes: []
        };
        var pos = [], nextPos = [];
        var started = 0;
        while(cursor = followingNode(cursor)){
            for(var i = unorderedFollowingStarts.length - 1; i >= 0; i--){
                if (cursor === unorderedFollowingStarts[i]) {
                    nodeMultiSet.pushSeries();
                    unorderedFollowingStarts.splice(i, i + 1);
                    started++;
                }
            }
            if (started && matcher.matches(cursor)) {
                nodeMultiSet.addNode(cursor);
            }
        }
        console.assert(0 === unorderedFollowingStarts.length);
        for(var i = 0; i < started; i++)nodeMultiSet.popSeries();
        return nodeMultiSet.finalize();
    }
    function precedingHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
        var matcher = new NodeMatcher(nodeTypeNum, nodeName, shouldLowerCase);
        var cursor = nodeList.pop();
        if (null == cursor) return {
            nodes: {}
        };
        var r = {
            nodes: [],
            pos: [],
            lasts: []
        };
        var nextParents = [
            cursor.parentNode || cursor.ownerElement
        ], nextPos = [
            1
        ];
        while(cursor = precedingNode(cursor)){
            if (cursor === nodeList[nodeList.length - 1]) {
                nextParents.push(nodeList.pop());
                nextPos.push(1);
            }
            var matches = matcher.matches(cursor);
            var pos, someoneUsed = false;
            if (matches) pos = nextPos.slice();
            for(var i = 0; i < nextParents.length; ++i){
                if (cursor === nextParents[i]) {
                    nextParents[i] = cursor.parentNode || cursor.ownerElement;
                    if (matches) {
                        pos[i] = null;
                    }
                } else {
                    if (matches) {
                        pos[i] = nextPos[i]++;
                        someoneUsed = true;
                    }
                }
            }
            if (someoneUsed) {
                r.nodes.unshift(cursor);
                r.pos.unshift(pos);
            }
        }
        for(var i = 0; i < r.pos.length; ++i){
            var lasts = [];
            r.lasts.push(lasts);
            for(var j = r.pos[i].length - 1; j >= 0; j--){
                if (null == r.pos[i][j]) {
                    r.pos[i].splice(j, j + 1);
                } else {
                    lasts.unshift(nextPos[j] - 1);
                }
            }
        }
        return r;
    }
    /** node-set, axis -> node-set */ function descendantDfs(nodeMultiSet, node, remaining, matcher, andSelf, attrIndices, attrNodes) {
        while(0 < remaining.length && null != remaining[0].ownerElement){
            var attr = remaining.shift();
            if (andSelf && matcher.matches(attr)) {
                attrNodes.push(attr);
                attrIndices.push(nodeMultiSet.nodes.length);
            }
        }
        if (null != node && !andSelf) {
            if (matcher.matches(node)) nodeMultiSet.addNode(node);
        }
        var pushed = false;
        if (null == node) {
            if (0 === remaining.length) return;
            node = remaining.shift();
            nodeMultiSet.pushSeries();
            pushed = true;
        } else if (0 < remaining.length && node === remaining[0]) {
            nodeMultiSet.pushSeries();
            pushed = true;
            remaining.shift();
        }
        if (andSelf) {
            if (matcher.matches(node)) nodeMultiSet.addNode(node);
        }
        // TODO: use optimization. Also try element.getElementsByTagName
        // var nodeList = 1 === nodeTypeNum && null != node.children ? node.children : node.childNodes;
        var nodeList = node.childNodes;
        for(var j = 0; j < nodeList.length; ++j){
            var child = nodeList[j];
            descendantDfs(nodeMultiSet, child, remaining, matcher, andSelf, attrIndices, attrNodes);
        }
        if (pushed) {
            nodeMultiSet.popSeries();
        }
    }
    function descenantHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase, andSelf) {
        var matcher = new NodeMatcher(nodeTypeNum, nodeName, shouldLowerCase);
        var nodeMultiSet = new NodeMultiSet(false);
        var attrIndices = [], attrNodes = [];
        while(0 < nodeList.length){
            // var node = nodeList.shift();
            descendantDfs(nodeMultiSet, null, nodeList, matcher, andSelf, attrIndices, attrNodes);
        }
        nodeMultiSet.finalize();
        for(var i = attrNodes.length - 1; i >= 0; --i){
            nodeMultiSet.nodes.splice(attrIndices[i], attrIndices[i], attrNodes[i]);
            nodeMultiSet.pos.splice(attrIndices[i], attrIndices[i], [
                1
            ]);
            nodeMultiSet.lasts.splice(attrIndices[i], attrIndices[i], [
                1
            ]);
        }
        return nodeMultiSet;
    }
    /**
   */ function ancestorHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase, andSelf) {
        var matcher = new NodeMatcher(nodeTypeNum, nodeName, shouldLowerCase);
        var ancestors = []; // array of non-empty arrays of matching ancestors
        for(var i = 0; i < nodeList.length; ++i){
            var node = nodeList[i];
            var isFirst = true;
            var a = [];
            while(null != node){
                if (!isFirst || andSelf) {
                    if (matcher.matches(node)) a.push(node);
                }
                isFirst = false;
                node = node.parentNode || node.ownerElement;
            }
            if (0 < a.length) ancestors.push(a);
        }
        var lasts = [];
        for(var i = 0; i < ancestors.length; ++i)lasts.push(ancestors[i].length);
        var nodeMultiSet = new NodeMultiSet(true);
        var newCtx = {
            nodes: [],
            pos: [],
            lasts: []
        };
        while(0 < ancestors.length){
            var pos = [
                ancestors[0].length
            ];
            var last = [
                lasts[0]
            ];
            var node = ancestors[0].pop();
            for(var i = ancestors.length - 1; i > 0; --i){
                if (node === ancestors[i][ancestors[i].length - 1]) {
                    pos.push(ancestors[i].length);
                    last.push(lasts[i]);
                    ancestors[i].pop();
                    if (0 === ancestors[i].length) {
                        ancestors.splice(i, i + 1);
                        lasts.splice(i, i + 1);
                    }
                }
            }
            if (0 === ancestors[0].length) {
                ancestors.shift();
                lasts.shift();
            }
            newCtx.nodes.push(node);
            newCtx.pos.push(pos);
            newCtx.lasts.push(last);
        }
        return newCtx;
    }
    /** Helper function for sortDocumentOrder. Returns a list of indices, from the
   * node to the root, of positions within parent.
   * For convenience, the node is the first element of the array.
   */ function addressVector(node) {
        var r = [
            node
        ];
        if (null != node.ownerElement) {
            node = node.ownerElement;
            r.push(-1);
        }
        while(null != node){
            var i = 0;
            while(null != node.previousSibling){
                node = node.previousSibling;
                i++;
            }
            r.push(i);
            node = node.parentNode;
        }
        return r;
    }
    function addressComparator(a, b) {
        var minlen = Math.min(a.length - 1, b.length - 1), alen = a.length, blen = b.length;
        if (a[0] === b[0]) return 0;
        var c;
        for(var i = 0; i < minlen; ++i){
            c = a[alen - i - 1] - b[blen - i - 1];
            if (0 !== c) break;
        }
        if (null == c || 0 === c) {
            // All equal until one of the nodes. The longer one is the descendant.
            c = alen - blen;
        }
        if (0 === c) c = getNodeName(a) - getNodeName(b);
        if (0 === c) c = 1;
        return c;
    }
    var sortUniqDocumentOrder = xpath.sortUniqDocumentOrder = function(nodes) {
        var a = [];
        for(var i = 0; i < nodes.length; i++){
            var node = nodes[i];
            var v = addressVector(node);
            a.push(v);
        }
        a.sort(addressComparator);
        var b = [];
        for(var i = 0; i < a.length; i++){
            if (0 < i && a[i][0] === a[i - 1][0]) continue;
            b.push(a[i][0]);
        }
        return b;
    };
    /** Sort node multiset. Does not do any de-duping. */ function sortNodeMultiSet(nodeMultiSet) {
        var a = [];
        for(var i = 0; i < nodeMultiSet.nodes.length; i++){
            var v = addressVector(nodeMultiSet.nodes[i]);
            a.push({
                v: v,
                n: nodeMultiSet.nodes[i],
                p: nodeMultiSet.pos[i],
                l: nodeMultiSet.lasts[i]
            });
        }
        a.sort(compare);
        var r = {
            nodes: [],
            pos: [],
            lasts: []
        };
        for(var i = 0; i < a.length; ++i){
            r.nodes.push(a[i].n);
            r.pos.push(a[i].p);
            r.lasts.push(a[i].l);
        }
        function compare(x, y) {
            return addressComparator(x.v, y.v);
        }
        return r;
    }
    /** Returns an array containing all the ancestors down to a node.
   * The array starts with document.
   */ function nodeAndAncestors(node) {
        var ancestors = [
            node
        ];
        var p = node;
        while(p = p.parentNode || p.ownerElement){
            ancestors.unshift(p);
        }
        return ancestors;
    }
    function compareSiblings(a, b) {
        if (a === b) return 0;
        var c = a;
        while(c = c.previousSibling){
            if (c === b) return 1; // b < a
        }
        c = b;
        while(c = c.previousSibling){
            if (c === a) return -1; // a < b
        }
        throw new Error('a and b are not siblings: ' + xpath.stringifyObject(a) + ' vs ' + xpath.stringifyObject(b));
    }
    /** The merge in merge-sort.*/ function mergeNodeLists(x, y) {
        var a, b, aanc, banc, r = [];
        if ('object' !== typeof x) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Invalid LHS for | operator ' + '(expected node-set): ' + x);
        if ('object' !== typeof y) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Invalid LHS for | operator ' + '(expected node-set): ' + y);
        while(true){
            if (null == a) {
                a = x.shift();
                if (null != a) aanc = addressVector(a);
            }
            if (null == b) {
                b = y.shift();
                if (null != b) banc = addressVector(b);
            }
            if (null == a || null == b) break;
            var c = addressComparator(aanc, banc);
            if (c < 0) {
                r.push(a);
                a = null;
                aanc = null;
            } else if (c > 0) {
                r.push(b);
                b = null;
                banc = null;
            } else if (getNodeName(a) < getNodeName(b)) {
                r.push(a);
                a = null;
                aanc = null;
            } else if (getNodeName(a) > getNodeName(b)) {
                r.push(b);
                b = null;
                banc = null;
            } else if (a !== b) {
                // choose b arbitrarily
                r.push(b);
                b = null;
                banc = null;
            } else {
                console.assert(a === b, c);
                // just skip b without pushing it.
                b = null;
                banc = null;
            }
        }
        while(a){
            r.push(a);
            a = x.shift();
        }
        while(b){
            r.push(b);
            b = y.shift();
        }
        return r;
    }
    function comparisonHelper(test, x, y, isNumericComparison) {
        var coersion;
        if (isNumericComparison) coersion = fn.number;
        else coersion = 'boolean' === typeof x || 'boolean' === typeof y ? fn['boolean'] : 'number' === typeof x || 'number' === typeof y ? fn.number : fn.string;
        if ('object' === typeof x && 'object' === typeof y) {
            var aMap = {};
            for(var i = 0; i < x.nodes.length; ++i){
                var xi = coersion({
                    nodes: [
                        x.nodes[i]
                    ]
                });
                for(var j = 0; j < y.nodes.length; ++j){
                    var yj = coersion({
                        nodes: [
                            y.nodes[j]
                        ]
                    });
                    if (test(xi, yj)) return true;
                }
            }
            return false;
        } else if ('object' === typeof x && x.nodes && x.nodes.length) {
            for(var i = 0; i < x.nodes.length; ++i){
                var xi = coersion({
                    nodes: [
                        x.nodes[i]
                    ]
                }), yc = coersion(y);
                if (test(xi, yc)) return true;
            }
            return false;
        } else if ('object' === typeof y && x.nodes && x.nodes.length) {
            for(var i = 0; i < x.nodes.length; ++i){
                var yi = coersion({
                    nodes: [
                        y.nodes[i]
                    ]
                }), xc = coersion(x);
                if (test(xc, yi)) return true;
            }
            return false;
        } else {
            var xc = coersion(x), yc = coersion(y);
            return test(xc, yc);
        }
    }
    var axes = xpath.axes = {
        'ancestor': function ancestor(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
            return ancestorHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase, false);
        },
        'ancestor-or-self': function ancestorOrSelf(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
            return ancestorHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase, true);
        },
        'attribute': function attribute(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
            // TODO: figure out whether positions should be undefined here.
            var matcher = new NodeMatcher(nodeTypeNum, nodeName, shouldLowerCase);
            var nodeMultiSet = new NodeMultiSet(false);
            if (null != nodeName) {
                // TODO: with namespace
                for(var i = 0; i < nodeList.length; ++i){
                    var node = nodeList[i];
                    if (null == node.getAttributeNode) continue; // only Element has .getAttributeNode
                    var attr = node.getAttributeNode(nodeName);
                    if (null != attr && matcher.matches(attr)) {
                        nodeMultiSet.pushSeries();
                        nodeMultiSet.addNode(attr);
                        nodeMultiSet.popSeries();
                    }
                }
            } else {
                for(var i = 0; i < nodeList.length; ++i){
                    var node = nodeList[i];
                    if (null != node.attributes) {
                        nodeMultiSet.pushSeries();
                        for(var j = 0; j < node.attributes.length; j++){
                            var attr = node.attributes[j];
                            if (matcher.matches(attr)) nodeMultiSet.addNode(attr);
                        }
                        nodeMultiSet.popSeries();
                    }
                }
            }
            return nodeMultiSet.finalize();
        },
        'child': function child(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
            var matcher = new NodeMatcher(nodeTypeNum, nodeName, shouldLowerCase);
            var nodeMultiSet = new NodeMultiSet(false);
            for(var i = 0; i < nodeList.length; ++i){
                var n = nodeList[i];
                if (n.ownerElement) continue;
                if (n.childNodes) {
                    nodeMultiSet.pushSeries();
                    var childList = 1 === nodeTypeNum && null != n.children ? n.children : n.childNodes;
                    for(var j = 0; j < childList.length; ++j){
                        var child = childList[j];
                        if (matcher.matches(child)) {
                            nodeMultiSet.addNode(child);
                        }
                    // don't have to do de-duping because children have parent,
                    // which are current context.
                    }
                    nodeMultiSet.popSeries();
                }
            }
            nodeMultiSet.finalize();
            return sortNodeMultiSet(nodeMultiSet);
        },
        'descendant': function descenant(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
            return descenantHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase, false);
        },
        'descendant-or-self': function descenantOrSelf(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
            return descenantHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase, true);
        },
        'following': function following(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
            return followingHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase);
        },
        'following-sibling': function followingSibling(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
            return followingSiblingHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase, Array.prototype.shift, function() {
                return this[0];
            }, function(node) {
                return node.nextSibling;
            });
        },
        'namespace': function namespace(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
        // TODO
        },
        'parent': function parent(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
            var matcher = new NodeMatcher(nodeTypeNum, nodeName, shouldLowerCase);
            var nodes = [], pos = [];
            for(var i = 0; i < nodeList.length; ++i){
                var parent = nodeList[i].parentNode || nodeList[i].ownerElement;
                if (null == parent) continue;
                if (!matcher.matches(parent)) continue;
                if (nodes.length > 0 && parent === nodes[nodes.length - 1]) continue;
                nodes.push(parent);
                pos.push([
                    1
                ]);
            }
            return {
                nodes: nodes,
                pos: pos,
                lasts: pos
            };
        },
        'preceding': function preceding(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
            return precedingHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase);
        },
        'preceding-sibling': function precedingSibling(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
            return followingSiblingHelper(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase, Array.prototype.pop, function() {
                return this[this.length - 1];
            }, function(node) {
                return node.previousSibling;
            }, false, true);
        },
        'self': function self(nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase) {
            var nodes = [], pos = [];
            var matcher = new NodeMatcher(nodeTypeNum, nodeName, shouldLowerCase);
            for(var i = 0; i < nodeList.length; ++i){
                if (matcher.matches(nodeList[i])) {
                    nodes.push(nodeList[i]);
                    pos.push([
                        1
                    ]);
                }
            }
            return {
                nodes: nodes,
                pos: pos,
                lasts: pos
            };
        }
    };
    /***************************************************************************
   *                         Evaluation: functions                           *
   ***************************************************************************/ var fn = {
        'number': function number(optObject) {
            if ('number' === typeof optObject) return optObject;
            if ('string' === typeof optObject) return parseFloat(optObject); // note: parseFloat(' ') -> NaN, unlike +' ' -> 0.
            if ('boolean' === typeof optObject) return +optObject;
            return fn.number(fn.string.call(this, optObject)); // for node-sets
        },
        'string': function string(optObject) {
            if (null == optObject) return fn.string(this);
            if ('string' === typeof optObject || 'boolean' === typeof optObject || 'number' === typeof optObject) return '' + optObject;
            if (0 == optObject.nodes.length) return '';
            if (null != optObject.nodes[0].textContent) return optObject.nodes[0].textContent;
            return optObject.nodes[0].nodeValue;
        },
        'boolean': function booleanVal(x) {
            return 'object' === typeof x ? x.nodes.length > 0 : !!x;
        },
        'last': function last() {
            console.assert(Array.isArray(this.pos));
            console.assert(Array.isArray(this.lasts));
            console.assert(1 === this.pos.length);
            console.assert(1 === this.lasts.length);
            console.assert(1 === this.lasts[0].length);
            return this.lasts[0][0];
        },
        'position': function position() {
            console.assert(Array.isArray(this.pos));
            console.assert(Array.isArray(this.lasts));
            console.assert(1 === this.pos.length);
            console.assert(1 === this.lasts.length);
            console.assert(1 === this.pos[0].length);
            return this.pos[0][0];
        },
        'count': function count(nodeSet) {
            if ('object' !== typeof nodeSet) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Position ' + stream.position() + ': Function count(node-set) ' + 'got wrong argument type: ' + nodeSet);
            return nodeSet.nodes.length;
        },
        'id': function id(object) {
            var r = {
                nodes: []
            };
            var doc = this.nodes[0].ownerDocument || this.nodes[0];
            console.assert(doc);
            var ids;
            if ('object' === typeof object) {
                // for node-sets, map id over each node value.
                ids = [];
                for(var i = 0; i < object.nodes.length; ++i){
                    var idNode = object.nodes[i];
                    var idsString = fn.string({
                        nodes: [
                            idNode
                        ]
                    });
                    var a = idsString.split(/[ \t\r\n]+/g);
                    Array.prototype.push.apply(ids, a);
                }
            } else {
                var idsString = fn.string(object);
                var a = idsString.split(/[ \t\r\n]+/g);
                ids = a;
            }
            for(var i = 0; i < ids.length; ++i){
                var id = ids[i];
                if (0 === id.length) continue;
                var node = doc.getElementById(id);
                if (null != node) r.nodes.push(node);
            }
            r.nodes = sortUniqDocumentOrder(r.nodes);
            return r;
        },
        'local-name': function(nodeSet) {
            if (null == nodeSet) return fn.name(this);
            if (null == nodeSet.nodes) {
                throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'argument to name() must be a node-set. got ' + nodeSet);
            }
            // TODO: namespaced version
            return nodeSet.nodes[0].localName;
        },
        'namespace-uri': function(nodeSet) {
            // TODO
            throw new Error('not implemented yet');
        },
        'name': function(nodeSet) {
            if (null == nodeSet) return fn.name(this);
            if (null == nodeSet.nodes) {
                throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'argument to name() must be a node-set. got ' + nodeSet);
            }
            return nodeSet.nodes[0].name;
        },
        'concat': function concat(x) {
            var l = [];
            for(var i = 0; i < arguments.length; ++i){
                l.push(fn.string(arguments[i]));
            }
            return l.join('');
        },
        'starts-with': function startsWith(a, b) {
            var as = fn.string(a), bs = fn.string(b);
            return as.substr(0, bs.length) === bs;
        },
        'contains': function contains(a, b) {
            var as = fn.string(a), bs = fn.string(b);
            var i = as.indexOf(bs);
            if (-1 === i) return false;
            return true;
        },
        'substring-before': function substringBefore(a, b) {
            var as = fn.string(a), bs = fn.string(b);
            var i = as.indexOf(bs);
            if (-1 === i) return '';
            return as.substr(0, i);
        },
        'substring-after': function substringBefore(a, b) {
            var as = fn.string(a), bs = fn.string(b);
            var i = as.indexOf(bs);
            if (-1 === i) return '';
            return as.substr(i + bs.length);
        },
        'substring': function substring(string, start, optEnd) {
            if (null == string || null == start) {
                throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Must be at least 2 arguments to string()');
            }
            var sString = fn.string(string), iStart = fn.round(start), iEnd = optEnd == null ? null : fn.round(optEnd);
            // Note that xpath string positions user 1-based index
            if (iEnd == null) return sString.substr(iStart - 1);
            else return sString.substr(iStart - 1, iEnd);
        },
        'string-length': function stringLength(optString) {
            return fn.string.call(this, optString).length;
        },
        'normalize-space': function normalizeSpace(optString) {
            var s = fn.string.call(this, optString);
            return s.replace(/[ \t\r\n]+/g, ' ').replace(/^ | $/g, '');
        },
        'translate': function translate(string, from, to) {
            var sString = fn.string.call(this, string), sFrom = fn.string(from), sTo = fn.string(to);
            var eachCharRe = [];
            var map = {};
            for(var i = 0; i < sFrom.length; ++i){
                var c = sFrom.charAt(i);
                map[c] = sTo.charAt(i); // returns '' if beyond length of sTo.
                // copied from goog.string.regExpEscape in the Closure library.
                eachCharRe.push(c.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').replace(/\x08/g, '\\x08'));
            }
            var re = new RegExp(eachCharRe.join('|'), 'g');
            return sString.replace(re, function(c) {
                return map[c];
            });
        },
        /// Boolean functions
        'not': function not(x) {
            var bx = fn['boolean'](x);
            return !bx;
        },
        'true': function trueVal() {
            return true;
        },
        'false': function falseVal() {
            return false;
        },
        // TODO
        'lang': function lang(string) {
            throw new Error('Not implemented');
        },
        'sum': function sum(optNodeSet) {
            if (null == optNodeSet) return fn.sum(this);
            // for node-sets, map id over each node value.
            var sum = 0;
            for(var i = 0; i < optNodeSet.nodes.length; ++i){
                var node = optNodeSet.nodes[i];
                var x = fn.number({
                    nodes: [
                        node
                    ]
                });
                sum += x;
            }
            return sum;
        },
        'floor': function floor(number) {
            return Math.floor(fn.number(number));
        },
        'ceiling': function ceiling(number) {
            return Math.ceil(fn.number(number));
        },
        'round': function round(number) {
            return Math.round(fn.number(number));
        }
    };
    /***************************************************************************
   *                         Evaluation: operators                           *
   ***************************************************************************/ var more = {
        UnaryMinus: function(x) {
            return -fn.number(x);
        },
        '+': function(x, y) {
            return fn.number(x) + fn.number(y);
        },
        '-': function(x, y) {
            return fn.number(x) - fn.number(y);
        },
        '*': function(x, y) {
            return fn.number(x) * fn.number(y);
        },
        'div': function(x, y) {
            return fn.number(x) / fn.number(y);
        },
        'mod': function(x, y) {
            return fn.number(x) % fn.number(y);
        },
        '<': function(x, y) {
            return comparisonHelper(function(x, y) {
                return fn.number(x) < fn.number(y);
            }, x, y, true);
        },
        '<=': function(x, y) {
            return comparisonHelper(function(x, y) {
                return fn.number(x) <= fn.number(y);
            }, x, y, true);
        },
        '>': function(x, y) {
            return comparisonHelper(function(x, y) {
                return fn.number(x) > fn.number(y);
            }, x, y, true);
        },
        '>=': function(x, y) {
            return comparisonHelper(function(x, y) {
                return fn.number(x) >= fn.number(y);
            }, x, y, true);
        },
        'and': function(x, y) {
            return fn['boolean'](x) && fn['boolean'](y);
        },
        'or': function(x, y) {
            return fn['boolean'](x) || fn['boolean'](y);
        },
        '|': function(x, y) {
            return {
                nodes: mergeNodeLists(x.nodes, y.nodes)
            };
        },
        '=': function(x, y) {
            // optimization for two node-sets case: avoid n^2 comparisons.
            if ('object' === typeof x && 'object' === typeof y) {
                var aMap = {};
                for(var i = 0; i < x.nodes.length; ++i){
                    var s = fn.string({
                        nodes: [
                            x.nodes[i]
                        ]
                    });
                    aMap[s] = true;
                }
                for(var i = 0; i < y.nodes.length; ++i){
                    var s = fn.string({
                        nodes: [
                            y.nodes[i]
                        ]
                    });
                    if (aMap[s]) return true;
                }
                return false;
            } else {
                return comparisonHelper(function(x, y) {
                    return x === y;
                }, x, y);
            }
        },
        '!=': function(x, y) {
            // optimization for two node-sets case: avoid n^2 comparisons.
            if ('object' === typeof x && 'object' === typeof y) {
                if (0 === x.nodes.length || 0 === y.nodes.length) return false;
                var aMap = {};
                for(var i = 0; i < x.nodes.length; ++i){
                    var s = fn.string({
                        nodes: [
                            x.nodes[i]
                        ]
                    });
                    aMap[s] = true;
                }
                for(var i = 0; i < y.nodes.length; ++i){
                    var s = fn.string({
                        nodes: [
                            y.nodes[i]
                        ]
                    });
                    if (!aMap[s]) return true;
                }
                return false;
            } else {
                return comparisonHelper(function(x, y) {
                    return x !== y;
                }, x, y);
            }
        }
    };
    var nodeTypes = xpath.nodeTypes = {
        'node': 0,
        'attribute': 2,
        'comment': 8,
        'text': 3,
        'processing-instruction': 7,
        'element': 1 //this.doc.ELEMENT_NODE
    };
    /** For debugging and unit tests: returnjs a stringified version of the
   * argument. */ var stringifyObject = xpath.stringifyObject = function stringifyObject(ctx) {
        var seenKey = 'seen' + Math.floor(Math.random() * 1000000000);
        return JSON.stringify(helper(ctx));
        //TURBOPACK unreachable
        ;
        function helper(ctx) {
            if (Array.isArray(ctx)) {
                return ctx.map(function(x) {
                    return helper(x);
                });
            }
            if ('object' !== typeof ctx) return ctx;
            if (null == ctx) return ctx;
            //  if (ctx.toString) return ctx.toString();
            if (null != ctx.outerHTML) return ctx.outerHTML;
            if (null != ctx.nodeValue) return ctx.nodeName + '=' + ctx.nodeValue;
            if (ctx[seenKey]) return '[circular]';
            ctx[seenKey] = true;
            var nicer = {};
            for(var key in ctx){
                if (seenKey === key) continue;
                try {
                    nicer[key] = helper(ctx[key]);
                } catch (e) {
                    nicer[key] = '[exception: ' + e.message + ']';
                }
            }
            delete ctx[seenKey];
            return nicer;
        }
    };
    var Evaluator = xpath.Evaluator = function Evaluator(doc) {
        this.doc = doc;
    };
    Evaluator.prototype = {
        val: function val(ast, ctx) {
            console.assert(ctx.nodes);
            if ('number' === typeof ast || 'string' === typeof ast) return ast;
            if (more[ast[0]]) {
                var evaluatedParams = [];
                for(var i = 1; i < ast.length; ++i){
                    evaluatedParams.push(this.val(ast[i], ctx));
                }
                var r = more[ast[0]].apply(ctx, evaluatedParams);
                return r;
            }
            switch(ast[0]){
                case 'Root':
                    return {
                        nodes: [
                            this.doc
                        ]
                    };
                case 'FunctionCall':
                    var functionName = ast[1], functionParams = ast[2];
                    if (null == fn[functionName]) throw new XPathException(XPathException.INVALID_EXPRESSION_ERR, 'Unknown function: ' + functionName);
                    var evaluatedParams = [];
                    for(var i = 0; i < functionParams.length; ++i){
                        evaluatedParams.push(this.val(functionParams[i], ctx));
                    }
                    var r = fn[functionName].apply(ctx, evaluatedParams);
                    return r;
                case 'Predicate':
                    var lhs = this.val(ast[1], ctx);
                    var ret = {
                        nodes: []
                    };
                    var contexts = eachContext(lhs);
                    for(var i = 0; i < contexts.length; ++i){
                        var singleNodeSet = contexts[i];
                        var rhs = this.val(ast[2], singleNodeSet);
                        var success;
                        if ('number' === typeof rhs) {
                            success = rhs === singleNodeSet.pos[0][0];
                        } else {
                            success = fn['boolean'](rhs);
                        }
                        if (success) {
                            var node = singleNodeSet.nodes[0];
                            ret.nodes.push(node);
                            // skip over all the rest of the same node.
                            while(i + 1 < contexts.length && node === contexts[i + 1].nodes[0]){
                                i++;
                            }
                        }
                    }
                    return ret;
                case 'PathExpr':
                    // turn the path into an expressoin; i.e., remove the position
                    // information of the last axis.
                    var x = this.val(ast[1], ctx);
                    // Make the nodeset a forward-direction-only one.
                    if (x.finalize) {
                        return {
                            nodes: x.nodes
                        };
                    } else {
                        return x;
                    }
                case '/':
                    // TODO: don't generate '/' nodes, just Axis nodes.
                    var lhs = this.val(ast[1], ctx);
                    console.assert(null != lhs);
                    var r = this.val(ast[2], lhs);
                    console.assert(null != r);
                    return r;
                case 'Axis':
                    // All the axis tests from Step. We only get AxisSpecifier NodeTest,
                    // not the predicate (which is applied later)
                    var axis = ast[1], nodeType = ast[2], nodeTypeNum = nodeTypes[nodeType], shouldLowerCase = true, nodeName = ast[3] && shouldLowerCase ? ast[3].toLowerCase() : ast[3];
                    nodeName = nodeName === '*' ? null : nodeName;
                    if ('object' !== typeof ctx) return {
                        nodes: [],
                        pos: []
                    };
                    var nodeList = ctx.nodes.slice(); // TODO: is copy needed?
                    var r = axes[axis](nodeList /*destructive!*/ , nodeTypeNum, nodeName, shouldLowerCase);
                    return r;
            }
        }
    };
    var evaluate = xpath.evaluate = function evaluate(expr, doc, context) {
        //var astFactory = new AstEvaluatorFactory(doc, context);
        var stream1 = new Stream(expr);
        var ast = parse(stream1, astFactory);
        var val = new Evaluator(doc).val(ast, {
            nodes: [
                context
            ]
        });
        return val;
    };
    /***************************************************************************
   *                           DOM interface                                 *
   ***************************************************************************/ var XPathException = xpath.XPathException = function XPathException(code, message) {
        var e = new Error(message);
        e.name = 'XPathException';
        e.code = code;
        return e;
    };
    XPathException.INVALID_EXPRESSION_ERR = 51;
    XPathException.TYPE_ERR = 52;
    var XPathEvaluator = xpath.XPathEvaluator = function XPathEvaluator() {};
    XPathEvaluator.prototype = {
        createExpression: function(expression, resolver) {
            return new XPathExpression(expression, resolver);
        },
        createNSResolver: function(nodeResolver) {
        // TODO
        },
        evaluate: function evaluate(expression, contextNode, resolver, type, result) {
            var expr = new XPathExpression(expression, resolver);
            return expr.evaluate(contextNode, type, result);
        }
    };
    var XPathExpression = xpath.XPathExpression = function XPathExpression(expression, resolver, optDoc) {
        var stream1 = new Stream(expression);
        this._ast = parse(stream1, astFactory);
        this._doc = optDoc;
    };
    XPathExpression.prototype = {
        evaluate: function evaluate(contextNode, type, result) {
            if (null == contextNode.nodeType) throw new Error('bad argument (expected context node): ' + contextNode);
            var doc = contextNode.ownerDocument || contextNode;
            if (null != this._doc && this._doc !== doc) {
                throw new core.DOMException(core.DOMException.WRONG_DOCUMENT_ERR, 'The document must be the same as the context node\'s document.');
            }
            var evaluator = new Evaluator(doc);
            var value = evaluator.val(this._ast, {
                nodes: [
                    contextNode
                ]
            });
            if (XPathResult.NUMBER_TYPE === type) value = fn.number(value);
            else if (XPathResult.STRING_TYPE === type) value = fn.string(value);
            else if (XPathResult.BOOLEAN_TYPE === type) value = fn['boolean'](value);
            else if (XPathResult.ANY_TYPE !== type && XPathResult.UNORDERED_NODE_ITERATOR_TYPE !== type && XPathResult.ORDERED_NODE_ITERATOR_TYPE !== type && XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE !== type && XPathResult.ORDERED_NODE_SNAPSHOT_TYPE !== type && XPathResult.ANY_UNORDERED_NODE_TYPE !== type && XPathResult.FIRST_ORDERED_NODE_TYPE !== type) throw new core.DOMException(core.DOMException.NOT_SUPPORTED_ERR, 'You must provide an XPath result type (0=any).');
            else if (XPathResult.ANY_TYPE !== type && 'object' !== typeof value) throw new XPathException(XPathException.TYPE_ERR, 'Value should be a node-set: ' + value);
            return new XPathResult(doc, value, type);
        }
    };
    var XPathResult = xpath.XPathResult = function XPathResult(doc, value, resultType) {
        this._value = value;
        this._resultType = resultType;
        this._i = 0;
    // TODO: we removed mutation events but didn't take care of this. No tests fail, so that's nice, but eventually we
    // should fix this, preferably by entirely replacing our XPath implementation.
    // this._invalidated = false;
    // if (this.resultType === XPathResult.UNORDERED_NODE_ITERATOR_TYPE ||
    //     this.resultType === XPathResult.ORDERED_NODE_ITERATOR_TYPE) {
    //   doc.addEventListener('DOMSubtreeModified', invalidate, true);
    //   var self = this;
    //   function invalidate() {
    //     self._invalidated = true;
    //     doc.removeEventListener('DOMSubtreeModified', invalidate, true);
    //   }
    // }
    };
    XPathResult.ANY_TYPE = 0;
    XPathResult.NUMBER_TYPE = 1;
    XPathResult.STRING_TYPE = 2;
    XPathResult.BOOLEAN_TYPE = 3;
    XPathResult.UNORDERED_NODE_ITERATOR_TYPE = 4;
    XPathResult.ORDERED_NODE_ITERATOR_TYPE = 5;
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE = 7;
    XPathResult.ANY_UNORDERED_NODE_TYPE = 8;
    XPathResult.FIRST_ORDERED_NODE_TYPE = 9;
    var proto = {
        // XPathResultType
        get resultType () {
            if (this._resultType) return this._resultType;
            switch(typeof this._value){
                case 'number':
                    return XPathResult.NUMBER_TYPE;
                case 'string':
                    return XPathResult.STRING_TYPE;
                case 'boolean':
                    return XPathResult.BOOLEAN_TYPE;
                default:
                    return XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
            }
        },
        get numberValue () {
            if (XPathResult.NUMBER_TYPE !== this.resultType) throw new XPathException(XPathException.TYPE_ERR, 'You should have asked for a NUMBER_TYPE.');
            return this._value;
        },
        get stringValue () {
            if (XPathResult.STRING_TYPE !== this.resultType) throw new XPathException(XPathException.TYPE_ERR, 'You should have asked for a STRING_TYPE.');
            return this._value;
        },
        get booleanValue () {
            if (XPathResult.BOOLEAN_TYPE !== this.resultType) throw new XPathException(XPathException.TYPE_ERR, 'You should have asked for a BOOLEAN_TYPE.');
            return this._value;
        },
        get singleNodeValue () {
            if (XPathResult.ANY_UNORDERED_NODE_TYPE !== this.resultType && XPathResult.FIRST_ORDERED_NODE_TYPE !== this.resultType) throw new XPathException(XPathException.TYPE_ERR, 'You should have asked for a FIRST_ORDERED_NODE_TYPE.');
            return this._value.nodes[0] || null;
        },
        get invalidIteratorState () {
            if (XPathResult.UNORDERED_NODE_ITERATOR_TYPE !== this.resultType && XPathResult.ORDERED_NODE_ITERATOR_TYPE !== this.resultType) return false;
            return !!this._invalidated;
        },
        get snapshotLength () {
            if (XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE !== this.resultType && XPathResult.ORDERED_NODE_SNAPSHOT_TYPE !== this.resultType) throw new XPathException(XPathException.TYPE_ERR, 'You should have asked for a ORDERED_NODE_SNAPSHOT_TYPE.');
            return this._value.nodes.length;
        },
        iterateNext: function iterateNext() {
            if (XPathResult.UNORDERED_NODE_ITERATOR_TYPE !== this.resultType && XPathResult.ORDERED_NODE_ITERATOR_TYPE !== this.resultType) throw new XPathException(XPathException.TYPE_ERR, 'You should have asked for a ORDERED_NODE_ITERATOR_TYPE.');
            if (this.invalidIteratorState) throw new core.DOMException(core.DOMException.INVALID_STATE_ERR, 'The document has been mutated since the result was returned');
            return this._value.nodes[this._i++] || null;
        },
        snapshotItem: function snapshotItem(index) {
            if (XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE !== this.resultType && XPathResult.ORDERED_NODE_SNAPSHOT_TYPE !== this.resultType) throw new XPathException(XPathException.TYPE_ERR, 'You should have asked for a ORDERED_NODE_SNAPSHOT_TYPE.');
            return this._value.nodes[index] || null;
        }
    };
    // so you can access ANY_TYPE etc. from the instances:
    XPathResult.prototype = Object.create(XPathResult, Object.keys(proto).reduce(function(descriptors, name) {
        descriptors[name] = Object.getOwnPropertyDescriptor(proto, name);
        return descriptors;
    }, {
        constructor: {
            value: XPathResult,
            writable: true,
            configurable: true
        }
    }));
    core.XPathException = XPathException;
    core.XPathExpression = XPathExpression;
    core.XPathResult = XPathResult;
    core.XPathEvaluator = XPathEvaluator;
    core.Document.prototype.createExpression = XPathEvaluator.prototype.createExpression;
    core.Document.prototype.createNSResolver = XPathEvaluator.prototype.createNSResolver;
    core.Document.prototype.evaluate = XPathEvaluator.prototype.evaluate;
    return xpath; // for tests
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const SYMBOL_TREE_POSITION = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/symbol-tree@3.2.4/node_modules/symbol-tree/lib/SymbolTree.js [app-ssr] (ecmascript)").TreePosition;
/**
 * Define a set of properties on an object, by copying the property descriptors
 * from the original object.
 *
 * - `object` {Object} the target object
 * - `properties` {Object} the source from which to copy property descriptors
 */ exports.define = function define(object, properties) {
    for (const name of Object.getOwnPropertyNames(properties)){
        const propDesc = Object.getOwnPropertyDescriptor(properties, name);
        Object.defineProperty(object, name, propDesc);
    }
};
exports.mixin = (target, source)=>{
    const keys = Reflect.ownKeys(source);
    for(let i = 0; i < keys.length; ++i){
        if (keys[i] in target) {
            continue;
        }
        Object.defineProperty(target, keys[i], Object.getOwnPropertyDescriptor(source, keys[i]));
    }
};
let memoizeQueryTypeCounter = 0;
/**
 * Returns a version of a method that memoizes specific types of calls on the object
 *
 * - `fn` {Function} the method to be memozied
 */ exports.memoizeQuery = function memoizeQuery(fn) {
    // Only memoize query functions with arity <= 2
    if (fn.length > 2) {
        return fn;
    }
    const type = memoizeQueryTypeCounter++;
    return function(...args) {
        if (!this._memoizedQueries) {
            return fn.apply(this, args);
        }
        if (!this._memoizedQueries[type]) {
            this._memoizedQueries[type] = Object.create(null);
        }
        let key;
        if (args.length === 1 && typeof args[0] === "string") {
            key = args[0];
        } else if (args.length === 2 && typeof args[0] === "string" && typeof args[1] === "string") {
            key = args[0] + "::" + args[1];
        } else {
            return fn.apply(this, args);
        }
        if (!(key in this._memoizedQueries[type])) {
            this._memoizedQueries[type][key] = fn.apply(this, args);
        }
        return this._memoizedQueries[type][key];
    };
};
exports.simultaneousIterators = function*(first, second) {
    for(;;){
        const firstResult = first.next();
        const secondResult = second.next();
        if (firstResult.done && secondResult.done) {
            return;
        }
        yield [
            firstResult.done ? null : firstResult.value,
            secondResult.done ? null : secondResult.value
        ];
    }
};
exports.treeOrderSorter = function(a, b) {
    const compare = domSymbolTree.compareTreePosition(a, b);
    if (compare & SYMBOL_TREE_POSITION.PRECEDING) {
        return 1;
    }
    if (compare & SYMBOL_TREE_POSITION.FOLLOWING) {
        return -1;
    }
    // disconnected or equal:
    return 0;
};
try {
    exports.Canvas = (()=>{
        const e = new Error("Cannot find module 'canvas'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })();
} catch  {
    exports.Canvas = null;
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/named-properties-tracker.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://heycam.github.io/webidl/#idl-named-properties
const IS_NAMED_PROPERTY = Symbol("is named property");
const TRACKER = Symbol("named property tracker");
/**
 * Create a new NamedPropertiesTracker for the given `object`.
 *
 * Named properties are used in DOM to let you lookup (for example) a Node by accessing a property on another object.
 * For example `window.foo` might resolve to an image element with id "foo".
 *
 * This tracker is a workaround because the ES6 Proxy feature is not yet available.
 *
 * @param {Object} object Object used to write properties to
 * @param {Object} objectProxy Object used to check if a property is already defined
 * @param {Function} resolverFunc Each time a property is accessed, this function is called to determine the value of
 *        the property. The function is passed 3 arguments: (object, name, values).
 *        `object` is identical to the `object` parameter of this `create` function.
 *        `name` is the name of the property.
 *        `values` is a function that returns a Set with all the tracked values for this name. The order of these
 *        values is undefined.
 *
 * @returns {NamedPropertiesTracker}
 */ exports.create = function(object, objectProxy, resolverFunc) {
    if (object[TRACKER]) {
        throw Error("A NamedPropertiesTracker has already been created for this object");
    }
    const tracker = new NamedPropertiesTracker(object, objectProxy, resolverFunc);
    object[TRACKER] = tracker;
    return tracker;
};
exports.get = function(object) {
    if (!object) {
        return null;
    }
    return object[TRACKER] || null;
};
function NamedPropertiesTracker(object, objectProxy, resolverFunc) {
    this.object = object;
    this.objectProxy = objectProxy;
    this.resolverFunc = resolverFunc;
    this.trackedValues = new Map(); // Map<Set<value>>
}
function newPropertyDescriptor(tracker, name) {
    const emptySet = new Set();
    function getValues() {
        return tracker.trackedValues.get(name) || emptySet;
    }
    const descriptor = {
        enumerable: true,
        configurable: true,
        get () {
            return tracker.resolverFunc(tracker.object, name, getValues);
        },
        set (value) {
            Object.defineProperty(tracker.object, name, {
                enumerable: true,
                configurable: true,
                writable: true,
                value
            });
        }
    };
    descriptor.get[IS_NAMED_PROPERTY] = true;
    descriptor.set[IS_NAMED_PROPERTY] = true;
    return descriptor;
}
/**
 * Track a value (e.g. a Node) for a specified name.
 *
 * Values can be tracked eagerly, which means that not all tracked values *have* to appear in the output. The resolver
 * function that was passed to the output may filter the value.
 *
 * Tracking the same `name` and `value` pair multiple times has no effect
 *
 * @param {String} name
 * @param {*} value
 */ NamedPropertiesTracker.prototype.track = function(name, value) {
    if (name === undefined || name === null || name === "") {
        return;
    }
    let valueSet = this.trackedValues.get(name);
    if (!valueSet) {
        valueSet = new Set();
        this.trackedValues.set(name, valueSet);
    }
    valueSet.add(value);
    if (name in this.objectProxy) {
        // already added our getter or it is not a named property (e.g. "addEventListener")
        return;
    }
    const descriptor = newPropertyDescriptor(this, name);
    Object.defineProperty(this.object, name, descriptor);
};
/**
 * Stop tracking a previously tracked `name` & `value` pair, see track().
 *
 * Untracking the same `name` and `value` pair multiple times has no effect
 *
 * @param {String} name
 * @param {*} value
 */ NamedPropertiesTracker.prototype.untrack = function(name, value) {
    if (name === undefined || name === null || name === "") {
        return;
    }
    const valueSet = this.trackedValues.get(name);
    if (!valueSet) {
        // the value is not present
        return;
    }
    if (!valueSet.delete(value)) {
        // the value was not present
        return;
    }
    if (valueSet.size === 0) {
        this.trackedValues.delete(name);
    }
    if (valueSet.size > 0) {
        // other values for this name are still present
        return;
    }
    // at this point there are no more values, delete the property
    const descriptor = Object.getOwnPropertyDescriptor(this.object, name);
    if (!descriptor || !descriptor.get || descriptor.get[IS_NAMED_PROPERTY] !== true) {
        // Not defined by NamedPropertyTracker
        return;
    }
    // note: delete puts the object in dictionary mode.
    // if this turns out to be a performance issue, maybe add:
    // https://github.com/petkaantonov/bluebird/blob/3e36fc861ac5795193ba37935333eb6ef3716390/src/util.js#L177
    delete this.object[name];
};
}),
];

//# sourceMappingURL=d19db_jsdom_lib_jsdom_f1137cf4._.js.map