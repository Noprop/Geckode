module.exports = [
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Event = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Event.js [app-ssr] (ecmascript)");
const { tryImplForWrapper } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
function createAnEvent(e, globalObject, eventInterface = Event, attributes = {}) {
    return eventInterface.createImpl(globalObject, [
        e,
        attributes
    ], {
        isTrusted: attributes.isTrusted !== false
    });
}
function fireAnEvent(e, target, eventInterface, attributes, legacyTargetOverrideFlag) {
    const event = createAnEvent(e, target._globalObject, eventInterface, attributes);
    // tryImplForWrapper() is currently required due to use in Window.js
    return tryImplForWrapper(target)._dispatch(event, legacyTargetOverrideFlag);
}
module.exports = {
    createAnEvent,
    fireAnEvent
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const ErrorEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ErrorEvent.js [app-ssr] (ecmascript)");
const { createAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const errorReportingMode = Symbol("error reporting mode");
// https://html.spec.whatwg.org/multipage/webappapis.html#report-the-error
// Omits script parameter and any check for muted errors.
// Takes target as an EventTarget impl.
// Takes error object, message, and location as params, unlike the spec.
// Returns whether the event was handled or not.
function reportAnError(line, col, target, errorObject, message, location) {
    if (target[errorReportingMode]) {
        return false;
    }
    target[errorReportingMode] = true;
    if (typeof message !== "string") {
        message = "uncaught exception: " + util.inspect(errorObject);
    }
    const event = createAnEvent("error", target._globalObject, ErrorEvent, {
        cancelable: true,
        message,
        filename: location,
        lineno: line,
        colno: col,
        error: errorObject
    });
    try {
        target._dispatch(event);
    } finally{
        target[errorReportingMode] = false;
        return event.defaultPrevented;
    }
}
module.exports = function reportException(window, error, filenameHint) {
    // This function will give good results on real Error objects with stacks; poor ones otherwise
    const stack = error && error.stack;
    const lines = stack && stack.split("\n");
    // Find the first line that matches; important for multi-line messages
    let pieces;
    if (lines) {
        for(let i = 1; i < lines.length && !pieces; ++i){
            pieces = lines[i].match(/at (?:(.+)\s+)?\(?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/);
        }
    }
    const fileName = pieces && pieces[2] || filenameHint || window._document.URL;
    const lineNumber = pieces && parseInt(pieces[3]) || 0;
    const columnNumber = pieces && parseInt(pieces[4]) || 0;
    const windowImpl = idlUtils.implForWrapper(window);
    const handled = reportAnError(lineNumber, columnNumber, windowImpl, error, error && error.message, fileName);
    if (!handled) {
        const errorString = shouldBeDisplayedAsError(error) ? `[${error.name}: ${error.message}]` : util.inspect(error);
        const jsdomError = new Error(`Uncaught ${errorString}`);
        jsdomError.detail = error;
        jsdomError.type = "unhandled exception";
        window._virtualConsole.emit("jsdomError", jsdomError);
    }
};
function shouldBeDisplayedAsError(x) {
    return x && x.name && x.message !== undefined && x.stack;
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SymbolTree = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/symbol-tree@3.2.4/node_modules/symbol-tree/lib/SymbolTree.js [app-ssr] (ecmascript)");
exports.cloningSteps = Symbol("cloning steps");
// TODO: the many underscore-prefixed hooks should move here
// E.g. _attrModified (which maybe should be split into its per-spec variants)
/**
 * This SymbolTree is used to build the tree for all Node in a document
 */ exports.domSymbolTree = new SymbolTree("DOM SymbolTree");
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/node.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
// https://dom.spec.whatwg.org/#concept-node-length
function nodeLength(node) {
    switch(node.nodeType){
        case NODE_TYPE.DOCUMENT_TYPE_NODE:
            return 0;
        case NODE_TYPE.TEXT_NODE:
        case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
        case NODE_TYPE.COMMENT_NODE:
            return node.data.length;
        default:
            return domSymbolTree.childrenCount(node);
    }
}
// https://dom.spec.whatwg.org/#concept-tree-root
function nodeRoot(node) {
    while(domSymbolTree.parent(node)){
        node = domSymbolTree.parent(node);
    }
    return node;
}
// https://dom.spec.whatwg.org/#concept-tree-inclusive-ancestor
function isInclusiveAncestor(ancestorNode, node) {
    while(node){
        if (ancestorNode === node) {
            return true;
        }
        node = domSymbolTree.parent(node);
    }
    return false;
}
// https://dom.spec.whatwg.org/#concept-tree-following
function isFollowing(nodeA, nodeB) {
    if (nodeA === nodeB) {
        return false;
    }
    let current = nodeB;
    while(current){
        if (current === nodeA) {
            return true;
        }
        current = domSymbolTree.following(current);
    }
    return false;
}
module.exports = {
    nodeLength,
    nodeRoot,
    isInclusiveAncestor,
    isFollowing
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Do not require generated files from here, as this file is shared with the Web IDL converter.
// https://infra.spec.whatwg.org/#namespaces
exports.HTML_NS = "http://www.w3.org/1999/xhtml";
exports.MATHML_NS = "http://www.w3.org/1998/Math/MathML";
exports.SVG_NS = "http://www.w3.org/2000/svg";
exports.XLINK_NS = "http://www.w3.org/1999/xlink";
exports.XML_NS = "http://www.w3.org/XML/1998/namespace";
exports.XMLNS_NS = "http://www.w3.org/2000/xmlns/";
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/mutation-observers.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const reportException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js [app-ssr] (ecmascript)");
const Event = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Event.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const MutationRecord = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MutationRecord.js [app-ssr] (ecmascript)");
const MUTATION_TYPE = {
    ATTRIBUTES: "attributes",
    CHARACTER_DATA: "characterData",
    CHILD_LIST: "childList"
};
// Note:
// Since jsdom doesn't currently implement the concept of "unit of related similar-origin browsing contexts"
// (https://html.spec.whatwg.org/multipage/browsers.html#unit-of-related-similar-origin-browsing-contexts)
// we will approximate that the following properties are global for now.
// https://dom.spec.whatwg.org/#mutation-observer-compound-microtask-queued-flag
let mutationObserverMicrotaskQueueFlag = false;
// Non-spec compliant: List of all the mutation observers with mutation records enqueued. It's a replacement for
// mutation observer list (https://dom.spec.whatwg.org/#mutation-observer-list) but without leaking since it's empty
// before notifying the mutation observers.
const activeMutationObservers = new Set();
// https://dom.spec.whatwg.org/#signal-slot-list
const signalSlotList = [];
// https://dom.spec.whatwg.org/#queue-a-mutation-record
function queueMutationRecord(type, target, name, namespace, oldValue, addedNodes, removedNodes, previousSibling, nextSibling) {
    const interestedObservers = new Map();
    const nodes = domSymbolTree.ancestorsToArray(target);
    for (const node of nodes){
        for (const registered of node._registeredObserverList){
            const { options, observer: mo } = registered;
            if (!(node !== target && options.subtree === false) && !(type === MUTATION_TYPE.ATTRIBUTES && options.attributes !== true) && !(type === MUTATION_TYPE.ATTRIBUTES && options.attributeFilter && !options.attributeFilter.some((value)=>value === name || value === namespace)) && !(type === MUTATION_TYPE.CHARACTER_DATA && options.characterData !== true) && !(type === MUTATION_TYPE.CHILD_LIST && options.childList === false)) {
                if (!interestedObservers.has(mo)) {
                    interestedObservers.set(mo, null);
                }
                if (type === MUTATION_TYPE.ATTRIBUTES && options.attributeOldValue === true || type === MUTATION_TYPE.CHARACTER_DATA && options.characterDataOldValue === true) {
                    interestedObservers.set(mo, oldValue);
                }
            }
        }
    }
    for (const [observer, mappedOldValue] of interestedObservers.entries()){
        const record = MutationRecord.createImpl(target._globalObject, [], {
            type,
            target,
            attributeName: name,
            attributeNamespace: namespace,
            oldValue: mappedOldValue,
            addedNodes,
            removedNodes,
            previousSibling,
            nextSibling
        });
        observer._recordQueue.push(record);
        activeMutationObservers.add(observer);
    }
    queueMutationObserverMicrotask();
}
// https://dom.spec.whatwg.org/#queue-a-tree-mutation-record
function queueTreeMutationRecord(target, addedNodes, removedNodes, previousSibling, nextSibling) {
    queueMutationRecord(MUTATION_TYPE.CHILD_LIST, target, null, null, null, addedNodes, removedNodes, previousSibling, nextSibling);
}
// https://dom.spec.whatwg.org/#queue-an-attribute-mutation-record
function queueAttributeMutationRecord(target, name, namespace, oldValue) {
    queueMutationRecord(MUTATION_TYPE.ATTRIBUTES, target, name, namespace, oldValue, [], [], null, null);
}
// https://dom.spec.whatwg.org/#queue-a-mutation-observer-compound-microtask
function queueMutationObserverMicrotask() {
    if (mutationObserverMicrotaskQueueFlag) {
        return;
    }
    mutationObserverMicrotaskQueueFlag = true;
    Promise.resolve().then(()=>{
        notifyMutationObservers();
    });
}
// https://dom.spec.whatwg.org/#notify-mutation-observers
function notifyMutationObservers() {
    mutationObserverMicrotaskQueueFlag = false;
    const notifyList = [
        ...activeMutationObservers
    ].sort((a, b)=>a._id - b._id);
    activeMutationObservers.clear();
    const signalList = [
        ...signalSlotList
    ];
    signalSlotList.splice(0, signalSlotList.length);
    for (const mo of notifyList){
        const records = [
            ...mo._recordQueue
        ];
        mo._recordQueue = [];
        for (const node of mo._nodeList){
            node._registeredObserverList = node._registeredObserverList.filter((registeredObserver)=>{
                return registeredObserver.source !== mo;
            });
        }
        if (records.length > 0) {
            try {
                const moWrapper = idlUtils.wrapperForImpl(mo);
                mo._callback.call(moWrapper, records.map(idlUtils.wrapperForImpl), moWrapper);
            } catch (e) {
                const { target } = records[0];
                const window = target._ownerDocument._defaultView;
                reportException(window, e);
            }
        }
    }
    for (const slot of signalList){
        const slotChangeEvent = Event.createImpl(slot._globalObject, [
            "slotchange",
            {
                bubbles: true
            }
        ], {
            isTrusted: true
        });
        slot._dispatch(slotChangeEvent);
    }
}
module.exports = {
    MUTATION_TYPE,
    queueMutationRecord,
    queueTreeMutationRecord,
    queueAttributeMutationRecord,
    queueMutationObserverMicrotask,
    signalSlotList
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/shadow-dom.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { nodeRoot } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/node.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { signalSlotList, queueMutationObserverMicrotask } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/mutation-observers.js [app-ssr] (ecmascript)");
// Valid host element for ShadowRoot.
// Defined in: https://dom.spec.whatwg.org/#dom-element-attachshadow
const VALID_HOST_ELEMENT_NAME = new Set([
    "article",
    "aside",
    "blockquote",
    "body",
    "div",
    "footer",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "main",
    "nav",
    "p",
    "section",
    "span"
]);
function isValidHostElementName(name) {
    return VALID_HOST_ELEMENT_NAME.has(name);
}
// Use an approximation by checking the presence of nodeType instead of instead of using the isImpl from
// "../generated/Node" to avoid introduction of circular dependencies.
function isNode(nodeImpl) {
    return Boolean(nodeImpl && "nodeType" in nodeImpl);
}
// Use an approximation by checking the value of nodeType and presence of nodeType host instead of instead
// of using the isImpl from "../generated/ShadowRoot" to avoid introduction of circular dependencies.
function isShadowRoot(nodeImpl) {
    return Boolean(nodeImpl && nodeImpl.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE && "host" in nodeImpl);
}
// https://dom.spec.whatwg.org/#concept-slotable
function isSlotable(nodeImpl) {
    return nodeImpl && (nodeImpl.nodeType === NODE_TYPE.ELEMENT_NODE || nodeImpl.nodeType === NODE_TYPE.TEXT_NODE);
}
function isSlot(nodeImpl) {
    return nodeImpl && nodeImpl.localName === "slot" && nodeImpl._namespaceURI === HTML_NS;
}
// https://dom.spec.whatwg.org/#concept-shadow-including-inclusive-ancestor
function isShadowInclusiveAncestor(ancestor, node) {
    while(isNode(node)){
        if (node === ancestor) {
            return true;
        }
        if (isShadowRoot(node)) {
            node = node.host;
        } else {
            node = domSymbolTree.parent(node);
        }
    }
    return false;
}
// https://dom.spec.whatwg.org/#retarget
function retarget(a, b) {
    while(true){
        if (!isNode(a)) {
            return a;
        }
        const aRoot = nodeRoot(a);
        if (!isShadowRoot(aRoot) || isNode(b) && isShadowInclusiveAncestor(aRoot, b)) {
            return a;
        }
        a = nodeRoot(a).host;
    }
}
// https://dom.spec.whatwg.org/#get-the-parent
function getEventTargetParent(eventTarget, event) {
    // _getTheParent will be missing for Window, since it doesn't have an impl class and we don't want to pollute the
    // user-visible global scope with a _getTheParent value. TODO: remove this entire function and use _getTheParent
    // directly, once Window gets split into impl/wrapper.
    return eventTarget._getTheParent ? eventTarget._getTheParent(event) : null;
}
// https://dom.spec.whatwg.org/#concept-shadow-including-root
function shadowIncludingRoot(node) {
    const root = nodeRoot(node);
    return isShadowRoot(root) ? shadowIncludingRoot(root.host) : root;
}
// https://dom.spec.whatwg.org/#assign-a-slot
function assignSlot(slotable) {
    const slot = findSlot(slotable);
    if (slot) {
        assignSlotable(slot);
    }
}
// https://dom.spec.whatwg.org/#assign-slotables
function assignSlotable(slot) {
    const slotables = findSlotable(slot);
    let shouldFireSlotChange = false;
    if (slotables.length !== slot._assignedNodes.length) {
        shouldFireSlotChange = true;
    } else {
        for(let i = 0; i < slotables.length; i++){
            if (slotables[i] !== slot._assignedNodes[i]) {
                shouldFireSlotChange = true;
                break;
            }
        }
    }
    if (shouldFireSlotChange) {
        signalSlotChange(slot);
    }
    slot._assignedNodes = slotables;
    for (const slotable of slotables){
        slotable._assignedSlot = slot;
    }
}
// https://dom.spec.whatwg.org/#assign-slotables-for-a-tree
function assignSlotableForTree(root) {
    for (const slot of domSymbolTree.treeIterator(root)){
        if (isSlot(slot)) {
            assignSlotable(slot);
        }
    }
}
// https://dom.spec.whatwg.org/#find-slotables
function findSlotable(slot) {
    const result = [];
    const root = nodeRoot(slot);
    if (!isShadowRoot(root)) {
        return result;
    }
    for (const slotable of domSymbolTree.treeIterator(root.host)){
        const foundSlot = findSlot(slotable);
        if (foundSlot === slot) {
            result.push(slotable);
        }
    }
    return result;
}
// https://dom.spec.whatwg.org/#find-flattened-slotables
function findFlattenedSlotables(slot) {
    const result = [];
    const root = nodeRoot(slot);
    if (!isShadowRoot(root)) {
        return result;
    }
    const slotables = findSlotable(slot);
    if (slotables.length === 0) {
        for (const child of domSymbolTree.childrenIterator(slot)){
            if (isSlotable(child)) {
                slotables.push(child);
            }
        }
    }
    for (const node of slotables){
        if (isSlot(node) && isShadowRoot(nodeRoot(node))) {
            const temporaryResult = findFlattenedSlotables(node);
            result.push(...temporaryResult);
        } else {
            result.push(node);
        }
    }
    return result;
}
// https://dom.spec.whatwg.org/#find-a-slot
function findSlot(slotable, openFlag) {
    const { parentNode: parent } = slotable;
    if (!parent) {
        return null;
    }
    const shadow = parent._shadowRoot;
    if (!shadow || openFlag && shadow.mode !== "open") {
        return null;
    }
    for (const child of domSymbolTree.treeIterator(shadow)){
        if (isSlot(child) && child.name === slotable._slotableName) {
            return child;
        }
    }
    return null;
}
// https://dom.spec.whatwg.org/#signal-a-slot-change
function signalSlotChange(slot) {
    if (!signalSlotList.some((entry)=>entry === slot)) {
        signalSlotList.push(slot);
    }
    queueMutationObserverMicrotask();
}
// https://dom.spec.whatwg.org/#concept-shadow-including-descendant
function* shadowIncludingInclusiveDescendantsIterator(node) {
    yield node;
    if (node._shadowRoot) {
        yield* shadowIncludingInclusiveDescendantsIterator(node._shadowRoot);
    }
    for (const child of domSymbolTree.childrenIterator(node)){
        yield* shadowIncludingInclusiveDescendantsIterator(child);
    }
}
// https://dom.spec.whatwg.org/#concept-shadow-including-descendant
function* shadowIncludingDescendantsIterator(node) {
    if (node._shadowRoot) {
        yield* shadowIncludingInclusiveDescendantsIterator(node._shadowRoot);
    }
    for (const child of domSymbolTree.childrenIterator(node)){
        yield* shadowIncludingInclusiveDescendantsIterator(child);
    }
}
module.exports = {
    isValidHostElementName,
    isNode,
    isSlotable,
    isSlot,
    isShadowRoot,
    isShadowInclusiveAncestor,
    retarget,
    getEventTargetParent,
    shadowIncludingRoot,
    assignSlot,
    assignSlotable,
    assignSlotableForTree,
    findSlot,
    findFlattenedSlotables,
    signalSlotChange,
    shadowIncludingInclusiveDescendantsIterator,
    shadowIncludingDescendantsIterator
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-event-accessor.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const ErrorEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ErrorEvent.js [app-ssr] (ecmascript)");
const EventHandlerNonNull = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/EventHandlerNonNull.js [app-ssr] (ecmascript)");
const OnBeforeUnloadEventHandlerNonNull = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/OnBeforeUnloadEventHandlerNonNull.js [app-ssr] (ecmascript)");
const OnErrorEventHandlerNonNull = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/OnErrorEventHandlerNonNull.js [app-ssr] (ecmascript)");
const reportException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js [app-ssr] (ecmascript)");
exports.appendHandler = (el, eventName)=>{
    // tryImplForWrapper() is currently required due to use in Window.js
    idlUtils.tryImplForWrapper(el).addEventListener(eventName, (event)=>{
        // https://html.spec.whatwg.org/#the-event-handler-processing-algorithm
        const callback = exports.getCurrentEventHandlerValue(el, eventName);
        if (callback === null) {
            return;
        }
        const specialError = ErrorEvent.isImpl(event) && event.type === "error" && event.currentTarget.constructor.name === "Window";
        let returnValue = null;
        // https://heycam.github.io/webidl/#es-invoking-callback-functions
        if (typeof callback === "function") {
            if (specialError) {
                returnValue = callback.call(event.currentTarget, event.message, event.filename, event.lineno, event.colno, event.error);
            } else {
                returnValue = callback.call(event.currentTarget, event);
            }
        }
        // TODO: we don't implement BeforeUnloadEvent so we can't brand-check here
        if (event.type === "beforeunload") {
            if (returnValue !== null) {
                event._canceledFlag = true;
                if (event.returnValue === "") {
                    event.returnValue = returnValue;
                }
            }
        } else if (specialError) {
            if (returnValue === true) {
                event._canceledFlag = true;
            }
        } else if (returnValue === false) {
            event._canceledFlag = true;
        }
    });
};
// "Simple" in this case means "no content attributes involved"
exports.setupForSimpleEventAccessors = (prototype, events)=>{
    prototype._getEventHandlerFor = function(event) {
        return this._eventHandlers ? this._eventHandlers[event] : undefined;
    };
    prototype._setEventHandlerFor = function(event, handler) {
        if (!this._registeredHandlers) {
            this._registeredHandlers = new Set();
            this._eventHandlers = Object.create(null);
        }
        if (!this._registeredHandlers.has(event) && handler !== null) {
            this._registeredHandlers.add(event);
            exports.appendHandler(this, event);
        }
        this._eventHandlers[event] = handler;
    };
    for (const event of events){
        exports.createEventAccessor(prototype, event);
    }
};
// https://html.spec.whatwg.org/multipage/webappapis.html#getting-the-current-value-of-the-event-handler
exports.getCurrentEventHandlerValue = (target, event)=>{
    const value = target._getEventHandlerFor(event);
    if (!value) {
        return null;
    }
    if (value.body !== undefined) {
        let element, document, fn;
        if (target.constructor.name === "Window") {
            element = null;
            document = idlUtils.implForWrapper(target.document);
        } else {
            element = target;
            document = element.ownerDocument;
        }
        const { body } = value;
        const formOwner = element !== null && element.form ? element.form : null;
        const window = target.constructor.name === "Window" && target._document ? target : document.defaultView;
        try {
            // eslint-disable-next-line no-new-func
            Function(body); // properly error out on syntax errors
        // Note: this won't execute body; that would require `Function(body)()`.
        } catch (e) {
            if (window) {
                reportException(window, e);
            }
            target._setEventHandlerFor(event, null);
            return null;
        }
        // Note: the with (window) { } is not necessary in Node, but is necessary in a browserified environment.
        const createFunction = document.defaultView.Function;
        if (event === "error" && element === null) {
            const sourceURL = document ? `\n//# sourceURL=${document.URL}` : "";
            fn = createFunction(`\
with (arguments[0]) { return function onerror(event, source, lineno, colno, error) {
${body}
}; }${sourceURL}`)(window);
            fn = OnErrorEventHandlerNonNull.convert(window, fn);
        } else {
            const calls = [];
            if (element !== null) {
                calls.push(idlUtils.wrapperForImpl(document));
            }
            if (formOwner !== null) {
                calls.push(idlUtils.wrapperForImpl(formOwner));
            }
            if (element !== null) {
                calls.push(idlUtils.wrapperForImpl(element));
            }
            let wrapperBody = `\
with (arguments[0]) { return function on${event}(event) {
${body}
}; }`;
            // eslint-disable-next-line no-unused-vars
            for (const call of calls){
                wrapperBody = `\
with (arguments[0]) { return function () {
${wrapperBody}
}; }`;
            }
            if (document) {
                wrapperBody += `\n//# sourceURL=${document.URL}`;
            }
            fn = createFunction(wrapperBody)(window);
            for (const call of calls){
                fn = fn(call);
            }
            if (event === "beforeunload") {
                fn = OnBeforeUnloadEventHandlerNonNull.convert(window, fn);
            } else {
                fn = EventHandlerNonNull.convert(window, fn);
            }
        }
        target._setEventHandlerFor(event, fn);
    }
    return target._getEventHandlerFor(event);
};
// https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-idl-attributes
// TODO: Consider replacing this with `[ReflectEvent]`
exports.createEventAccessor = (obj, event)=>{
    Object.defineProperty(obj, "on" + event, {
        configurable: true,
        enumerable: true,
        get () {
            return exports.getCurrentEventHandlerValue(this, event);
        },
        set (val) {
            this._setEventHandlerFor(event, val);
        }
    });
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://infra.spec.whatwg.org/#ascii-whitespace
const asciiWhitespaceRe = /^[\t\n\f\r ]$/;
exports.asciiWhitespaceRe = asciiWhitespaceRe;
// https://infra.spec.whatwg.org/#ascii-lowercase
exports.asciiLowercase = (s)=>{
    const len = s.length;
    const out = new Array(len);
    for(let i = 0; i < len; i++){
        const code = s.charCodeAt(i);
        // If the character is between 'A' (65) and 'Z' (90), convert using bitwise OR with 32
        out[i] = code >= 65 && code <= 90 ? String.fromCharCode(code | 32) : s[i];
    }
    return out.join("");
};
// https://infra.spec.whatwg.org/#ascii-uppercase
exports.asciiUppercase = (s)=>{
    const len = s.length;
    const out = new Array(len);
    for(let i = 0; i < len; i++){
        const code = s.charCodeAt(i);
        // If the character is between 'a' (97) and 'z' (122), convert using bitwise AND with ~32
        out[i] = code >= 97 && code <= 122 ? String.fromCharCode(code & ~32) : s[i];
    }
    return out.join("");
};
// https://infra.spec.whatwg.org/#strip-newlines
exports.stripNewlines = (s)=>{
    return s.replace(/[\n\r]+/g, "");
};
// https://infra.spec.whatwg.org/#strip-leading-and-trailing-ascii-whitespace
exports.stripLeadingAndTrailingASCIIWhitespace = (s)=>{
    return s.replace(/^[ \t\n\f\r]+/, "").replace(/[ \t\n\f\r]+$/, "");
};
// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
exports.stripAndCollapseASCIIWhitespace = (s)=>{
    return s.replace(/[ \t\n\f\r]+/g, " ").replace(/^[ \t\n\f\r]+/, "").replace(/[ \t\n\f\r]+$/, "");
};
// https://html.spec.whatwg.org/multipage/infrastructure.html#valid-simple-colour
exports.isValidSimpleColor = (s)=>{
    return /^#[a-fA-F\d]{6}$/.test(s);
};
// https://infra.spec.whatwg.org/#ascii-case-insensitive
exports.asciiCaseInsensitiveMatch = (a, b)=>{
    if (a.length !== b.length) {
        return false;
    }
    for(let i = 0; i < a.length; ++i){
        if ((a.charCodeAt(i) | 32) !== (b.charCodeAt(i) | 32)) {
            return false;
        }
    }
    return true;
};
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-integers
// Error is represented as null.
const parseInteger = exports.parseInteger = (input)=>{
    // The implementation here is slightly different from the spec's. We want to use parseInt(), but parseInt() trims
    // Unicode whitespace in addition to just ASCII ones, so we make sure that the trimmed prefix contains only ASCII
    // whitespace ourselves.
    const numWhitespace = input.length - input.trimStart().length;
    if (/[^\t\n\f\r ]/.test(input.slice(0, numWhitespace))) {
        return null;
    }
    // We don't allow hexadecimal numbers here.
    // eslint-disable-next-line radix
    const value = parseInt(input, 10);
    if (Number.isNaN(value)) {
        return null;
    }
    // parseInt() returns -0 for "-0". Normalize that here.
    return value === 0 ? 0 : value;
};
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-non-negative-integers
// Error is represented as null.
exports.parseNonNegativeInteger = (input)=>{
    const value = parseInteger(input);
    if (value === null) {
        return null;
    }
    if (value < 0) {
        return null;
    }
    return value;
};
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-floating-point-number
const floatingPointNumRe = /^-?(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?$/;
exports.isValidFloatingPointNumber = (str)=>floatingPointNumRe.test(str);
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#rules-for-parsing-floating-point-number-values
// Error is represented as null.
exports.parseFloatingPointNumber = (str)=>{
    // The implementation here is slightly different from the spec's. We need to use parseFloat() in order to retain
    // accuracy, but parseFloat() trims Unicode whitespace in addition to just ASCII ones, so we make sure that the
    // trimmed prefix contains only ASCII whitespace ourselves.
    const numWhitespace = str.length - str.trimStart().length;
    if (/[^\t\n\f\r ]/.test(str.slice(0, numWhitespace))) {
        return null;
    }
    const parsed = parseFloat(str);
    return isFinite(parsed) ? parsed : null;
};
// https://infra.spec.whatwg.org/#split-on-ascii-whitespace
exports.splitOnASCIIWhitespace = (str)=>{
    let position = 0;
    const tokens = [];
    while(position < str.length && asciiWhitespaceRe.test(str[position])){
        position++;
    }
    if (position === str.length) {
        return tokens;
    }
    while(position < str.length){
        const start = position;
        while(position < str.length && !asciiWhitespaceRe.test(str[position])){
            position++;
        }
        tokens.push(str.slice(start, position));
        while(position < str.length && asciiWhitespaceRe.test(str[position])){
            position++;
        }
    }
    return tokens;
};
// https://infra.spec.whatwg.org/#split-on-commas
exports.splitOnCommas = (str)=>{
    let position = 0;
    const tokens = [];
    while(position < str.length){
        let start = position;
        while(position < str.length && str[position] !== ","){
            position++;
        }
        let end = position;
        while(start < str.length && asciiWhitespaceRe.test(str[start])){
            start++;
        }
        while(end > start && asciiWhitespaceRe.test(str[end - 1])){
            end--;
        }
        tokens.push(str.slice(start, end));
        if (position < str.length) {
            position++;
        }
    }
    return tokens;
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/custom-elements.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const isPotentialCustomElementName = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/is-potential-custom-element-name@1.0.1/node_modules/is-potential-custom-element-name/index.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { shadowIncludingRoot } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/shadow-dom.js [app-ssr] (ecmascript)");
const reportException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js [app-ssr] (ecmascript)");
const { implForWrapper, wrapperForImpl } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
// https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions-stack
class CEReactionsStack {
    constructor(){
        this._stack = [];
        // https://html.spec.whatwg.org/multipage/custom-elements.html#backup-element-queue
        this.backupElementQueue = [];
        // https://html.spec.whatwg.org/multipage/custom-elements.html#processing-the-backup-element-queue
        this.processingBackupElementQueue = false;
    }
    push(elementQueue) {
        this._stack.push(elementQueue);
    }
    pop() {
        return this._stack.pop();
    }
    get currentElementQueue() {
        const { _stack } = this;
        return _stack[_stack.length - 1];
    }
    isEmpty() {
        return this._stack.length === 0;
    }
}
// In theory separate cross-origin Windows created by separate JSDOM instances could have separate stacks. But, we would
// need to implement the whole agent architecture. Which is kind of questionable given that we don't run our Windows in
// their own separate threads, which is what agents are meant to represent.
const customElementReactionsStack = new CEReactionsStack();
// https://html.spec.whatwg.org/multipage/custom-elements.html#cereactions
function ceReactionsPreSteps() {
    customElementReactionsStack.push([]);
}
function ceReactionsPostSteps() {
    const queue = customElementReactionsStack.pop();
    invokeCEReactions(queue);
}
const RESTRICTED_CUSTOM_ELEMENT_NAME = new Set([
    "annotation-xml",
    "color-profile",
    "font-face",
    "font-face-src",
    "font-face-uri",
    "font-face-format",
    "font-face-name",
    "missing-glyph"
]);
// https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
function isValidCustomElementName(name) {
    if (RESTRICTED_CUSTOM_ELEMENT_NAME.has(name)) {
        return false;
    }
    return isPotentialCustomElementName(name);
}
// https://html.spec.whatwg.org/multipage/custom-elements.html#concept-upgrade-an-element
function upgradeElement(definition, element) {
    if (element._ceState !== "undefined" || element._ceState === "uncustomized") {
        return;
    }
    element._ceDefinition = definition;
    element._ceState = "failed";
    for (const attribute of element._attributeList){
        const { _localName, _namespace, _value } = attribute;
        enqueueCECallbackReaction(element, "attributeChangedCallback", [
            _localName,
            null,
            _value,
            _namespace
        ]);
    }
    if (shadowIncludingRoot(element).nodeType === NODE_TYPE.DOCUMENT_NODE) {
        enqueueCECallbackReaction(element, "connectedCallback", []);
    }
    definition.constructionStack.push(element);
    const { constructionStack, constructor: C } = definition;
    let constructionError;
    try {
        if (definition.disableShadow === true && element._shadowRoot !== null) {
            throw DOMException.create(element._globalObject, [
                "Can't upgrade a custom element with a shadow root if shadow is disabled",
                "NotSupportedError"
            ]);
        }
        element._ceState = "precustomized";
        const constructionResult = C.construct();
        const constructionResultImpl = implForWrapper(constructionResult);
        if (constructionResultImpl !== element) {
            throw new TypeError("Invalid custom element constructor return value");
        }
    } catch (error) {
        constructionError = error;
    }
    constructionStack.pop();
    if (constructionError !== undefined) {
        element._ceDefinition = null;
        element._ceReactionQueue = [];
        throw constructionError;
    }
    element._ceState = "custom";
}
// https://html.spec.whatwg.org/#concept-try-upgrade
function tryUpgradeElement(element) {
    const { _ownerDocument, _namespaceURI, _localName, _isValue } = element;
    const definition = lookupCEDefinition(_ownerDocument, _namespaceURI, _localName, _isValue);
    if (definition !== null) {
        enqueueCEUpgradeReaction(element, definition);
    }
}
// https://html.spec.whatwg.org/#look-up-a-custom-element-definition
function lookupCEDefinition(document, namespace, localName, isValue) {
    const definition = null;
    if (namespace !== HTML_NS) {
        return definition;
    }
    if (!document._defaultView) {
        return definition;
    }
    const registry = implForWrapper(document._globalObject._customElementRegistry);
    const definitionByName = registry._customElementDefinitions.find((def)=>{
        return def.name === def.localName && def.localName === localName;
    });
    if (definitionByName !== undefined) {
        return definitionByName;
    }
    const definitionByIs = registry._customElementDefinitions.find((def)=>{
        return def.name === isValue && def.localName === localName;
    });
    if (definitionByIs !== undefined) {
        return definitionByIs;
    }
    return definition;
}
// https://html.spec.whatwg.org/multipage/custom-elements.html#invoke-custom-element-reactions
function invokeCEReactions(elementQueue) {
    while(elementQueue.length > 0){
        const element = elementQueue.shift();
        const reactions = element._ceReactionQueue;
        try {
            while(reactions.length > 0){
                const reaction = reactions.shift();
                switch(reaction.type){
                    case "upgrade":
                        upgradeElement(reaction.definition, element);
                        break;
                    case "callback":
                        reaction.callback.apply(wrapperForImpl(element), reaction.args);
                        break;
                }
            }
        } catch (error) {
            reportException(element._globalObject, error);
        }
    }
}
// https://html.spec.whatwg.org/multipage/custom-elements.html#enqueue-an-element-on-the-appropriate-element-queue
function enqueueElementOnAppropriateElementQueue(element) {
    if (customElementReactionsStack.isEmpty()) {
        customElementReactionsStack.backupElementQueue.push(element);
        if (customElementReactionsStack.processingBackupElementQueue) {
            return;
        }
        customElementReactionsStack.processingBackupElementQueue = true;
        Promise.resolve().then(()=>{
            const elementQueue = customElementReactionsStack.backupElementQueue;
            invokeCEReactions(elementQueue);
            customElementReactionsStack.processingBackupElementQueue = false;
        });
    } else {
        customElementReactionsStack.currentElementQueue.push(element);
    }
}
// https://html.spec.whatwg.org/multipage/custom-elements.html#enqueue-a-custom-element-callback-reaction
function enqueueCECallbackReaction(element, callbackName, args) {
    const { _ceDefinition: { lifecycleCallbacks, observedAttributes } } = element;
    const callback = lifecycleCallbacks[callbackName];
    if (callback === null) {
        return;
    }
    if (callbackName === "attributeChangedCallback") {
        const attributeName = args[0];
        if (!observedAttributes.includes(attributeName)) {
            return;
        }
    }
    element._ceReactionQueue.push({
        type: "callback",
        callback,
        args
    });
    enqueueElementOnAppropriateElementQueue(element);
}
// https://html.spec.whatwg.org/#enqueue-a-custom-element-upgrade-reaction
function enqueueCEUpgradeReaction(element, definition) {
    element._ceReactionQueue.push({
        type: "upgrade",
        definition
    });
    enqueueElementOnAppropriateElementQueue(element);
}
module.exports = {
    customElementReactionsStack,
    ceReactionsPreSteps,
    ceReactionsPostSteps,
    isValidCustomElementName,
    upgradeElement,
    tryUpgradeElement,
    lookupCEDefinition,
    enqueueCEUpgradeReaction,
    enqueueCECallbackReaction,
    invokeCEReactions
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/ordered-set.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://infra.spec.whatwg.org/#sets
//
// Only use this class if a Set cannot be used, e.g. when "replace" operation is needed, since there's no way to replace
// an element while keep the relative order using a Set, only remove and then add something at the end.
module.exports = class OrderedSet {
    constructor(){
        this._items = [];
    }
    append(item) {
        if (!this.contains(item)) {
            this._items.push(item);
        }
    }
    prepend(item) {
        if (!this.contains(item)) {
            this._items.unshift(item);
        }
    }
    replace(item, replacement) {
        let seen = false;
        for(let i = 0; i < this._items.length;){
            const isInstance = this._items[i] === item || this._items[i] === replacement;
            if (seen && isInstance) {
                this._items.splice(i, 1);
            } else {
                if (isInstance) {
                    this._items[i] = replacement;
                    seen = true;
                }
                i++;
            }
        }
    }
    remove(...items) {
        this.removePredicate((item)=>items.includes(item));
    }
    removePredicate(predicate) {
        for(let i = 0; i < this._items.length;){
            if (predicate(this._items[i])) {
                this._items.splice(i, 1);
            } else {
                i++;
            }
        }
    }
    empty() {
        this._items.length = 0;
    }
    contains(item) {
        return this._items.includes(item);
    }
    get size() {
        return this._items.length;
    }
    isEmpty() {
        return this._items.length === 0;
    }
    // Useful for other parts of jsdom
    [Symbol.iterator]() {
        return this._items[Symbol.iterator]();
    }
    keys() {
        return this._items.keys();
    }
    get(index) {
        return this._items[index];
    }
    some(func) {
        return this._items.some(func);
    }
    // https://dom.spec.whatwg.org/#concept-ordered-set-parser
    static parse(input) {
        const tokens = new OrderedSet();
        for (const token of input.split(/[\t\n\f\r ]+/)){
            if (token) {
                tokens.append(token);
            }
        }
        return tokens;
    }
    // https://dom.spec.whatwg.org/#concept-ordered-set-serializer
    serialize() {
        return this._items.join(" ");
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/validate-names.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const xnv = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/xml-name-validator@5.0.0/node_modules/xml-name-validator/lib/xml-name-validator.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { XML_NS, XMLNS_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
// https://dom.spec.whatwg.org/#validate
exports.name = (globalObject, name)=>{
    if (!xnv.name(name)) {
        throw DOMException.create(globalObject, [
            `"${name}" did not match the Name production`,
            "InvalidCharacterError"
        ]);
    }
};
exports.qname = (globalObject, qname)=>{
    if (!xnv.qname(qname)) {
        throw DOMException.create(globalObject, [
            `"${qname}" did not match the QName production`,
            "InvalidCharacterError"
        ]);
    }
};
exports.validateAndExtract = (globalObject, namespace, qualifiedName)=>{
    if (namespace === "") {
        namespace = null;
    }
    exports.qname(globalObject, qualifiedName);
    let prefix = null;
    let localName = qualifiedName;
    const colonIndex = qualifiedName.indexOf(":");
    if (colonIndex !== -1) {
        prefix = qualifiedName.substring(0, colonIndex);
        localName = qualifiedName.substring(colonIndex + 1);
    }
    if (prefix !== null && namespace === null) {
        throw DOMException.create(globalObject, [
            "A namespace was given but a prefix was also extracted from the qualifiedName",
            "NamespaceError"
        ]);
    }
    if (prefix === "xml" && namespace !== XML_NS) {
        throw DOMException.create(globalObject, [
            "A prefix of \"xml\" was given but the namespace was not the XML namespace",
            "NamespaceError"
        ]);
    }
    if ((qualifiedName === "xmlns" || prefix === "xmlns") && namespace !== XMLNS_NS) {
        throw DOMException.create(globalObject, [
            "A prefix or qualifiedName of \"xmlns\" was given but the namespace was not the XMLNS namespace",
            "NamespaceError"
        ]);
    }
    if (namespace === XMLNS_NS && qualifiedName !== "xmlns" && prefix !== "xmlns") {
        throw DOMException.create(globalObject, [
            "The XMLNS namespace was given but neither the prefix nor qualifiedName was \"xmlns\"",
            "NamespaceError"
        ]);
    }
    return {
        namespace,
        prefix,
        localName
    };
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-element.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const interfaces = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/interfaces.js [app-ssr] (ecmascript)");
const { implForWrapper } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { HTML_NS, SVG_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { validateAndExtract } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/validate-names.js [app-ssr] (ecmascript)");
const reportException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js [app-ssr] (ecmascript)");
const { isValidCustomElementName, upgradeElement, lookupCEDefinition, enqueueCEUpgradeReaction } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/custom-elements.js [app-ssr] (ecmascript)");
const INTERFACE_TAG_MAPPING = {
    __proto__: null,
    // https://html.spec.whatwg.org/multipage/dom.html#elements-in-the-dom%3Aelement-interface
    // https://html.spec.whatwg.org/multipage/indices.html#elements-3
    [HTML_NS]: {
        __proto__: null,
        HTMLElement: [
            "abbr",
            "address",
            "article",
            "aside",
            "b",
            "bdi",
            "bdo",
            "cite",
            "code",
            "dd",
            "dfn",
            "dt",
            "em",
            "figcaption",
            "figure",
            "footer",
            "header",
            "hgroup",
            "i",
            "kbd",
            "main",
            "mark",
            "nav",
            "noscript",
            "rp",
            "rt",
            "ruby",
            "s",
            "samp",
            "section",
            "small",
            "strong",
            "sub",
            "summary",
            "sup",
            "u",
            "var",
            "wbr"
        ],
        HTMLAnchorElement: [
            "a"
        ],
        HTMLAreaElement: [
            "area"
        ],
        HTMLAudioElement: [
            "audio"
        ],
        HTMLBaseElement: [
            "base"
        ],
        HTMLBodyElement: [
            "body"
        ],
        HTMLBRElement: [
            "br"
        ],
        HTMLButtonElement: [
            "button"
        ],
        HTMLCanvasElement: [
            "canvas"
        ],
        HTMLDataElement: [
            "data"
        ],
        HTMLDataListElement: [
            "datalist"
        ],
        HTMLDetailsElement: [
            "details"
        ],
        HTMLDialogElement: [
            "dialog"
        ],
        HTMLDirectoryElement: [
            "dir"
        ],
        HTMLDivElement: [
            "div"
        ],
        HTMLDListElement: [
            "dl"
        ],
        HTMLEmbedElement: [
            "embed"
        ],
        HTMLFieldSetElement: [
            "fieldset"
        ],
        HTMLFontElement: [
            "font"
        ],
        HTMLFormElement: [
            "form"
        ],
        HTMLFrameElement: [
            "frame"
        ],
        HTMLFrameSetElement: [
            "frameset"
        ],
        HTMLHeadingElement: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6"
        ],
        HTMLHeadElement: [
            "head"
        ],
        HTMLHRElement: [
            "hr"
        ],
        HTMLHtmlElement: [
            "html"
        ],
        HTMLIFrameElement: [
            "iframe"
        ],
        HTMLImageElement: [
            "img"
        ],
        HTMLInputElement: [
            "input"
        ],
        HTMLLabelElement: [
            "label"
        ],
        HTMLLegendElement: [
            "legend"
        ],
        HTMLLIElement: [
            "li"
        ],
        HTMLLinkElement: [
            "link"
        ],
        HTMLMapElement: [
            "map"
        ],
        HTMLMarqueeElement: [
            "marquee"
        ],
        HTMLMediaElement: [],
        HTMLMenuElement: [
            "menu"
        ],
        HTMLMetaElement: [
            "meta"
        ],
        HTMLMeterElement: [
            "meter"
        ],
        HTMLModElement: [
            "del",
            "ins"
        ],
        HTMLObjectElement: [
            "object"
        ],
        HTMLOListElement: [
            "ol"
        ],
        HTMLOptGroupElement: [
            "optgroup"
        ],
        HTMLOptionElement: [
            "option"
        ],
        HTMLOutputElement: [
            "output"
        ],
        HTMLParagraphElement: [
            "p"
        ],
        HTMLParamElement: [
            "param"
        ],
        HTMLPictureElement: [
            "picture"
        ],
        HTMLPreElement: [
            "listing",
            "pre",
            "xmp"
        ],
        HTMLProgressElement: [
            "progress"
        ],
        HTMLQuoteElement: [
            "blockquote",
            "q"
        ],
        HTMLScriptElement: [
            "script"
        ],
        HTMLSelectElement: [
            "select"
        ],
        HTMLSlotElement: [
            "slot"
        ],
        HTMLSourceElement: [
            "source"
        ],
        HTMLSpanElement: [
            "span"
        ],
        HTMLStyleElement: [
            "style"
        ],
        HTMLTableCaptionElement: [
            "caption"
        ],
        HTMLTableCellElement: [
            "th",
            "td"
        ],
        HTMLTableColElement: [
            "col",
            "colgroup"
        ],
        HTMLTableElement: [
            "table"
        ],
        HTMLTimeElement: [
            "time"
        ],
        HTMLTitleElement: [
            "title"
        ],
        HTMLTableRowElement: [
            "tr"
        ],
        HTMLTableSectionElement: [
            "thead",
            "tbody",
            "tfoot"
        ],
        HTMLTemplateElement: [
            "template"
        ],
        HTMLTextAreaElement: [
            "textarea"
        ],
        HTMLTrackElement: [
            "track"
        ],
        HTMLUListElement: [
            "ul"
        ],
        HTMLUnknownElement: [],
        HTMLVideoElement: [
            "video"
        ]
    },
    [SVG_NS]: {
        __proto__: null,
        SVGElement: [],
        SVGGraphicsElement: [],
        SVGDefsElement: [
            "defs"
        ],
        SVGDescElement: [
            "desc"
        ],
        SVGGElement: [
            "g"
        ],
        SVGMetadataElement: [
            "metadata"
        ],
        SVGSVGElement: [
            "svg"
        ],
        SVGSwitchElement: [
            "switch"
        ],
        SVGSymbolElement: [
            "symbol"
        ],
        SVGTitleElement: [
            "title"
        ]
    }
};
const TAG_INTERFACE_LOOKUP = Object.create(null);
for (const namespace of [
    HTML_NS,
    SVG_NS
]){
    TAG_INTERFACE_LOOKUP[namespace] = Object.create(null);
    const interfaceNames = Object.keys(INTERFACE_TAG_MAPPING[namespace]);
    for (const interfaceName of interfaceNames){
        const tagNames = INTERFACE_TAG_MAPPING[namespace][interfaceName];
        for (const tagName of tagNames){
            TAG_INTERFACE_LOOKUP[namespace][tagName] = interfaceName;
        }
    }
}
const UNKNOWN_HTML_ELEMENTS_NAMES = [
    "applet",
    "bgsound",
    "blink",
    "isindex",
    "keygen",
    "multicol",
    "nextid",
    "spacer"
];
const HTML_ELEMENTS_NAMES = [
    "acronym",
    "basefont",
    "big",
    "center",
    "nobr",
    "noembed",
    "noframes",
    "plaintext",
    "rb",
    "rtc",
    "strike",
    "tt"
];
// https://html.spec.whatwg.org/multipage/dom.html#elements-in-the-dom:element-interface
function getHTMLElementInterface(name) {
    if (UNKNOWN_HTML_ELEMENTS_NAMES.includes(name)) {
        return interfaces.getInterfaceWrapper("HTMLUnknownElement");
    }
    if (HTML_ELEMENTS_NAMES.includes(name)) {
        return interfaces.getInterfaceWrapper("HTMLElement");
    }
    const specDefinedInterface = TAG_INTERFACE_LOOKUP[HTML_NS][name];
    if (specDefinedInterface !== undefined) {
        return interfaces.getInterfaceWrapper(specDefinedInterface);
    }
    if (isValidCustomElementName(name)) {
        return interfaces.getInterfaceWrapper("HTMLElement");
    }
    return interfaces.getInterfaceWrapper("HTMLUnknownElement");
}
// https://svgwg.org/svg2-draft/types.html#ElementsInTheSVGDOM
function getSVGInterface(name) {
    const specDefinedInterface = TAG_INTERFACE_LOOKUP[SVG_NS][name];
    if (specDefinedInterface !== undefined) {
        return interfaces.getInterfaceWrapper(specDefinedInterface);
    }
    return interfaces.getInterfaceWrapper("SVGElement");
}
// Returns the list of valid tag names that can bo associated with a element given its namespace and name.
function getValidTagNames(namespace, name) {
    if (INTERFACE_TAG_MAPPING[namespace] && INTERFACE_TAG_MAPPING[namespace][name]) {
        return INTERFACE_TAG_MAPPING[namespace][name];
    }
    return [];
}
// https://dom.spec.whatwg.org/#concept-create-element
function createElement(document, localName, namespace, prefix = null, isValue = null, synchronousCE = false) {
    let result = null;
    const { _globalObject } = document;
    const definition = lookupCEDefinition(document, namespace, localName, isValue);
    if (definition !== null && definition.name !== localName) {
        const elementInterface = getHTMLElementInterface(localName);
        result = elementInterface.createImpl(_globalObject, [], {
            ownerDocument: document,
            localName,
            namespace: HTML_NS,
            prefix,
            ceState: "undefined",
            ceDefinition: null,
            isValue
        });
        if (synchronousCE) {
            upgradeElement(definition, result);
        } else {
            enqueueCEUpgradeReaction(result, definition);
        }
    } else if (definition !== null) {
        if (synchronousCE) {
            try {
                const C = definition.constructor;
                const resultWrapper = C.construct();
                result = implForWrapper(resultWrapper);
                if (!result._ceState || !result._ceDefinition || result._namespaceURI !== HTML_NS) {
                    throw new TypeError("Internal error: Invalid custom element.");
                }
                if (result._attributeList.length !== 0) {
                    throw DOMException.create(_globalObject, [
                        "Unexpected attributes.",
                        "NotSupportedError"
                    ]);
                }
                if (domSymbolTree.hasChildren(result)) {
                    throw DOMException.create(_globalObject, [
                        "Unexpected child nodes.",
                        "NotSupportedError"
                    ]);
                }
                if (domSymbolTree.parent(result)) {
                    throw DOMException.create(_globalObject, [
                        "Unexpected element parent.",
                        "NotSupportedError"
                    ]);
                }
                if (result._ownerDocument !== document) {
                    throw DOMException.create(_globalObject, [
                        "Unexpected element owner document.",
                        "NotSupportedError"
                    ]);
                }
                if (result._namespaceURI !== namespace) {
                    throw DOMException.create(_globalObject, [
                        "Unexpected element namespace URI.",
                        "NotSupportedError"
                    ]);
                }
                if (result._localName !== localName) {
                    throw DOMException.create(_globalObject, [
                        "Unexpected element local name.",
                        "NotSupportedError"
                    ]);
                }
                result._prefix = prefix;
                result._isValue = isValue;
            } catch (error) {
                reportException(document._defaultView, error);
                const interfaceWrapper = interfaces.getInterfaceWrapper("HTMLUnknownElement");
                result = interfaceWrapper.createImpl(_globalObject, [], {
                    ownerDocument: document,
                    localName,
                    namespace: HTML_NS,
                    prefix,
                    ceState: "failed",
                    ceDefinition: null,
                    isValue: null
                });
            }
        } else {
            const interfaceWrapper = interfaces.getInterfaceWrapper("HTMLElement");
            result = interfaceWrapper.createImpl(_globalObject, [], {
                ownerDocument: document,
                localName,
                namespace: HTML_NS,
                prefix,
                ceState: "undefined",
                ceDefinition: null,
                isValue: null
            });
            enqueueCEUpgradeReaction(result, definition);
        }
    } else {
        let elementInterface;
        switch(namespace){
            case HTML_NS:
                elementInterface = getHTMLElementInterface(localName);
                break;
            case SVG_NS:
                elementInterface = getSVGInterface(localName);
                break;
            default:
                elementInterface = interfaces.getInterfaceWrapper("Element");
                break;
        }
        result = elementInterface.createImpl(_globalObject, [], {
            ownerDocument: document,
            localName,
            namespace,
            prefix,
            ceState: "uncustomized",
            ceDefinition: null,
            isValue
        });
        if (namespace === HTML_NS && (isValidCustomElementName(localName) || isValue !== null)) {
            result._ceState = "undefined";
        }
    }
    return result;
}
// https://dom.spec.whatwg.org/#internal-createelementns-steps
function internalCreateElementNSSteps(document, namespace, qualifiedName, options) {
    const extracted = validateAndExtract(document._globalObject, namespace, qualifiedName);
    let isValue = null;
    if (options && options.is !== undefined) {
        isValue = options.is;
    }
    return createElement(document, extracted.localName, extracted.namespace, extracted.prefix, isValue, true);
}
module.exports = {
    createElement,
    internalCreateElementNSSteps,
    getValidTagNames,
    getHTMLElementInterface
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/colors.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://drafts.csswg.org/css-color-4/#named-color
const namedColors = {
    __proto__: null,
    aliceblue: [
        0xF0,
        0xF8,
        0xFF
    ],
    antiquewhite: [
        0xFA,
        0xEB,
        0xD7
    ],
    aqua: [
        0x00,
        0xFF,
        0xFF
    ],
    aquamarine: [
        0x7F,
        0xFF,
        0xD4
    ],
    azure: [
        0xF0,
        0xFF,
        0xFF
    ],
    beige: [
        0xF5,
        0xF5,
        0xDC
    ],
    bisque: [
        0xFF,
        0xE4,
        0xC4
    ],
    black: [
        0x00,
        0x00,
        0x00
    ],
    blanchedalmond: [
        0xFF,
        0xEB,
        0xCD
    ],
    blue: [
        0x00,
        0x00,
        0xFF
    ],
    blueviolet: [
        0x8A,
        0x2B,
        0xE2
    ],
    brown: [
        0xA5,
        0x2A,
        0x2A
    ],
    burlywood: [
        0xDE,
        0xB8,
        0x87
    ],
    cadetblue: [
        0x5F,
        0x9E,
        0xA0
    ],
    chartreuse: [
        0x7F,
        0xFF,
        0x00
    ],
    chocolate: [
        0xD2,
        0x69,
        0x1E
    ],
    coral: [
        0xFF,
        0x7F,
        0x50
    ],
    cornflowerblue: [
        0x64,
        0x95,
        0xED
    ],
    cornsilk: [
        0xFF,
        0xF8,
        0xDC
    ],
    crimson: [
        0xDC,
        0x14,
        0x3C
    ],
    cyan: [
        0x00,
        0xFF,
        0xFF
    ],
    darkblue: [
        0x00,
        0x00,
        0x8B
    ],
    darkcyan: [
        0x00,
        0x8B,
        0x8B
    ],
    darkgoldenrod: [
        0xB8,
        0x86,
        0x0B
    ],
    darkgray: [
        0xA9,
        0xA9,
        0xA9
    ],
    darkgreen: [
        0x00,
        0x64,
        0x00
    ],
    darkgrey: [
        0xA9,
        0xA9,
        0xA9
    ],
    darkkhaki: [
        0xBD,
        0xB7,
        0x6B
    ],
    darkmagenta: [
        0x8B,
        0x00,
        0x8B
    ],
    darkolivegreen: [
        0x55,
        0x6B,
        0x2F
    ],
    darkorange: [
        0xFF,
        0x8C,
        0x00
    ],
    darkorchid: [
        0x99,
        0x32,
        0xCC
    ],
    darkred: [
        0x8B,
        0x00,
        0x00
    ],
    darksalmon: [
        0xE9,
        0x96,
        0x7A
    ],
    darkseagreen: [
        0x8F,
        0xBC,
        0x8F
    ],
    darkslateblue: [
        0x48,
        0x3D,
        0x8B
    ],
    darkslategray: [
        0x2F,
        0x4F,
        0x4F
    ],
    darkslategrey: [
        0x2F,
        0x4F,
        0x4F
    ],
    darkturquoise: [
        0x00,
        0xCE,
        0xD1
    ],
    darkviolet: [
        0x94,
        0x00,
        0xD3
    ],
    deeppink: [
        0xFF,
        0x14,
        0x93
    ],
    deepskyblue: [
        0x00,
        0xBF,
        0xFF
    ],
    dimgray: [
        0x69,
        0x69,
        0x69
    ],
    dimgrey: [
        0x69,
        0x69,
        0x69
    ],
    dodgerblue: [
        0x1E,
        0x90,
        0xFF
    ],
    firebrick: [
        0xB2,
        0x22,
        0x22
    ],
    floralwhite: [
        0xFF,
        0xFA,
        0xF0
    ],
    forestgreen: [
        0x22,
        0x8B,
        0x22
    ],
    fuchsia: [
        0xFF,
        0x00,
        0xFF
    ],
    gainsboro: [
        0xDC,
        0xDC,
        0xDC
    ],
    ghostwhite: [
        0xF8,
        0xF8,
        0xFF
    ],
    gold: [
        0xFF,
        0xD7,
        0x00
    ],
    goldenrod: [
        0xDA,
        0xA5,
        0x20
    ],
    gray: [
        0x80,
        0x80,
        0x80
    ],
    green: [
        0x00,
        0x80,
        0x00
    ],
    greenyellow: [
        0xAD,
        0xFF,
        0x2F
    ],
    grey: [
        0x80,
        0x80,
        0x80
    ],
    honeydew: [
        0xF0,
        0xFF,
        0xF0
    ],
    hotpink: [
        0xFF,
        0x69,
        0xB4
    ],
    indianred: [
        0xCD,
        0x5C,
        0x5C
    ],
    indigo: [
        0x4B,
        0x00,
        0x82
    ],
    ivory: [
        0xFF,
        0xFF,
        0xF0
    ],
    khaki: [
        0xF0,
        0xE6,
        0x8C
    ],
    lavender: [
        0xE6,
        0xE6,
        0xFA
    ],
    lavenderblush: [
        0xFF,
        0xF0,
        0xF5
    ],
    lawngreen: [
        0x7C,
        0xFC,
        0x00
    ],
    lemonchiffon: [
        0xFF,
        0xFA,
        0xCD
    ],
    lightblue: [
        0xAD,
        0xD8,
        0xE6
    ],
    lightcoral: [
        0xF0,
        0x80,
        0x80
    ],
    lightcyan: [
        0xE0,
        0xFF,
        0xFF
    ],
    lightgoldenrodyellow: [
        0xFA,
        0xFA,
        0xD2
    ],
    lightgray: [
        0xD3,
        0xD3,
        0xD3
    ],
    lightgreen: [
        0x90,
        0xEE,
        0x90
    ],
    lightgrey: [
        0xD3,
        0xD3,
        0xD3
    ],
    lightpink: [
        0xFF,
        0xB6,
        0xC1
    ],
    lightsalmon: [
        0xFF,
        0xA0,
        0x7A
    ],
    lightseagreen: [
        0x20,
        0xB2,
        0xAA
    ],
    lightskyblue: [
        0x87,
        0xCE,
        0xFA
    ],
    lightslategray: [
        0x77,
        0x88,
        0x99
    ],
    lightslategrey: [
        0x77,
        0x88,
        0x99
    ],
    lightsteelblue: [
        0xB0,
        0xC4,
        0xDE
    ],
    lightyellow: [
        0xFF,
        0xFF,
        0xE0
    ],
    lime: [
        0x00,
        0xFF,
        0x00
    ],
    limegreen: [
        0x32,
        0xCD,
        0x32
    ],
    linen: [
        0xFA,
        0xF0,
        0xE6
    ],
    magenta: [
        0xFF,
        0x00,
        0xFF
    ],
    maroon: [
        0x80,
        0x00,
        0x00
    ],
    mediumaquamarine: [
        0x66,
        0xCD,
        0xAA
    ],
    mediumblue: [
        0x00,
        0x00,
        0xCD
    ],
    mediumorchid: [
        0xBA,
        0x55,
        0xD3
    ],
    mediumpurple: [
        0x93,
        0x70,
        0xDB
    ],
    mediumseagreen: [
        0x3C,
        0xB3,
        0x71
    ],
    mediumslateblue: [
        0x7B,
        0x68,
        0xEE
    ],
    mediumspringgreen: [
        0x00,
        0xFA,
        0x9A
    ],
    mediumturquoise: [
        0x48,
        0xD1,
        0xCC
    ],
    mediumvioletred: [
        0xC7,
        0x15,
        0x85
    ],
    midnightblue: [
        0x19,
        0x19,
        0x70
    ],
    mintcream: [
        0xF5,
        0xFF,
        0xFA
    ],
    mistyrose: [
        0xFF,
        0xE4,
        0xE1
    ],
    moccasin: [
        0xFF,
        0xE4,
        0xB5
    ],
    navajowhite: [
        0xFF,
        0xDE,
        0xAD
    ],
    navy: [
        0x00,
        0x00,
        0x80
    ],
    oldlace: [
        0xFD,
        0xF5,
        0xE6
    ],
    olive: [
        0x80,
        0x80,
        0x00
    ],
    olivedrab: [
        0x6B,
        0x8E,
        0x23
    ],
    orange: [
        0xFF,
        0xA5,
        0x00
    ],
    orangered: [
        0xFF,
        0x45,
        0x00
    ],
    orchid: [
        0xDA,
        0x70,
        0xD6
    ],
    palegoldenrod: [
        0xEE,
        0xE8,
        0xAA
    ],
    palegreen: [
        0x98,
        0xFB,
        0x98
    ],
    paleturquoise: [
        0xAF,
        0xEE,
        0xEE
    ],
    palevioletred: [
        0xDB,
        0x70,
        0x93
    ],
    papayawhip: [
        0xFF,
        0xEF,
        0xD5
    ],
    peachpuff: [
        0xFF,
        0xDA,
        0xB9
    ],
    peru: [
        0xCD,
        0x85,
        0x3F
    ],
    pink: [
        0xFF,
        0xC0,
        0xCB
    ],
    plum: [
        0xDD,
        0xA0,
        0xDD
    ],
    powderblue: [
        0xB0,
        0xE0,
        0xE6
    ],
    purple: [
        0x80,
        0x00,
        0x80
    ],
    rebeccapurple: [
        0x66,
        0x33,
        0x99
    ],
    red: [
        0xFF,
        0x00,
        0x00
    ],
    rosybrown: [
        0xBC,
        0x8F,
        0x8F
    ],
    royalblue: [
        0x41,
        0x69,
        0xE1
    ],
    saddlebrown: [
        0x8B,
        0x45,
        0x13
    ],
    salmon: [
        0xFA,
        0x80,
        0x72
    ],
    sandybrown: [
        0xF4,
        0xA4,
        0x60
    ],
    seagreen: [
        0x2E,
        0x8B,
        0x57
    ],
    seashell: [
        0xFF,
        0xF5,
        0xEE
    ],
    sienna: [
        0xA0,
        0x52,
        0x2D
    ],
    silver: [
        0xC0,
        0xC0,
        0xC0
    ],
    skyblue: [
        0x87,
        0xCE,
        0xEB
    ],
    slateblue: [
        0x6A,
        0x5A,
        0xCD
    ],
    slategray: [
        0x70,
        0x80,
        0x90
    ],
    slategrey: [
        0x70,
        0x80,
        0x90
    ],
    snow: [
        0xFF,
        0xFA,
        0xFA
    ],
    springgreen: [
        0x00,
        0xFF,
        0x7F
    ],
    steelblue: [
        0x46,
        0x82,
        0xB4
    ],
    tan: [
        0xD2,
        0xB4,
        0x8C
    ],
    teal: [
        0x00,
        0x80,
        0x80
    ],
    thistle: [
        0xD8,
        0xBF,
        0xD8
    ],
    tomato: [
        0xFF,
        0x63,
        0x47
    ],
    turquoise: [
        0x40,
        0xE0,
        0xD0
    ],
    violet: [
        0xEE,
        0x82,
        0xEE
    ],
    wheat: [
        0xF5,
        0xDE,
        0xB3
    ],
    white: [
        0xFF,
        0xFF,
        0xFF
    ],
    whitesmoke: [
        0xF5,
        0xF5,
        0xF5
    ],
    yellow: [
        0xFF,
        0xFF,
        0x00
    ],
    yellowgreen: [
        0x9A,
        0xCD,
        0x32
    ]
};
// Implements some of https://drafts.csswg.org/css-color-4/#resolving-sRGB-values and
// https://drafts.csswg.org/css-color-4/#serializing-sRGB-values, in a somewhat fragile way since
// we're not using a real parser/serializer. Attempts to cover:
// * hex colors
// * 'rgb()' and 'rgba()' values
// * named colors
// * 'transparent'
exports.getSpecifiedColor = (color)=>{
    const lowercasedColor = color.toLowerCase();
    if (Object.hasOwn(namedColors, lowercasedColor) || lowercasedColor === "transparent") {
        return lowercasedColor;
    }
    return sharedSpecifiedAndComputedAndUsed(color);
};
exports.getComputedOrUsedColor = (color)=>{
    const lowercasedColor = color.toLowerCase();
    const fromNamedColors = namedColors[lowercasedColor];
    if (fromNamedColors !== undefined) {
        return `rgb(${fromNamedColors.join(", ")})`;
    }
    if (lowercasedColor === "transparent") {
        return "rgba(0, 0, 0, 0)";
    }
    return sharedSpecifiedAndComputedAndUsed(color);
};
function sharedSpecifiedAndComputedAndUsed(color) {
    if (/^#[0-9A-Fa-f]{6}$/.test(color) || /^#[0-9A-Fa-f]{3}$/.test(color)) {
        return hexToRGB(color.slice(1));
    }
    if (/^#[0-9A-Fa-f]{8}$/.test(color) || /^#[0-9A-Fa-f]{4}$/.test(color)) {
        return hexToRGBA(color.slice(1));
    }
    if (/^rgba?\(/.test(color)) {
        return color.split(",").map((s)=>s.trim()).join(", ");
    }
    return color;
}
function hexToRGB(color) {
    if (color.length === 6) {
        const [r1, r2, g1, g2, b1, b2] = color.split("");
        return `rgb(${hexesToDecimals([
            r1,
            r2
        ], [
            g1,
            g2
        ], [
            b1,
            b2
        ]).join(", ")})`;
    }
    if (color.length === 3) {
        const [r1, g1, b1] = color.split("");
        return `rgb(${hexesToDecimals([
            r1,
            r1
        ], [
            g1,
            g1
        ], [
            b1,
            b1
        ]).join(", ")})`;
    }
    return "rgb(0, 0, 0)";
}
function hexToRGBA(color) {
    if (color.length === 8) {
        const [r1, r2, g1, g2, b1, b2, a1, a2] = color.split("");
        return `rgba(${hexesToDecimals([
            r1,
            r2
        ], [
            g1,
            g2
        ], [
            b1,
            b2
        ]).join(", ")}, ${hexToPercent(a1, a2)})`;
    }
    if (color.length === 4) {
        const [r1, g1, b1, a1] = color.split("");
        return `rgba(${hexesToDecimals([
            r1,
            r1
        ], [
            g1,
            g1
        ], [
            b1,
            b1
        ]).join(", ")}, ${hexToPercent(a1, a1)})`;
    }
    return "rgba(0, 0, 0, 1)";
}
function hexToDecimal(d1, d2) {
    return parseInt(d1, 16) * 16 + parseInt(d2, 16);
}
function hexesToDecimals(...hexes) {
    return hexes.map((pair)=>hexToDecimal(pair[0], pair[1]));
}
function hexToPercent(d1, d2) {
    return Math.floor(1000 * hexToDecimal(d1, d2) / 255) / 1000;
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/selectors.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const nwsapi = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/nwsapi@2.2.22/node_modules/nwsapi/src/nwsapi.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
function initNwsapi(node) {
    const { _globalObject, _ownerDocument } = node;
    return nwsapi({
        document: idlUtils.wrapperForImpl(_ownerDocument),
        DOMException: _globalObject.DOMException
    });
}
exports.matchesDontThrow = (elImpl, selector)=>{
    const document = elImpl._ownerDocument;
    if (!document._nwsapiDontThrow) {
        document._nwsapiDontThrow = initNwsapi(elImpl);
        document._nwsapiDontThrow.configure({
            LOGERRORS: false,
            VERBOSITY: false,
            IDS_DUPES: true,
            MIXEDCASE: true
        });
    }
    return document._nwsapiDontThrow.match(selector, idlUtils.wrapperForImpl(elImpl));
};
// nwsapi gets `document.documentElement` at creation-time, so we have to initialize lazily, since in the initial
// stages of Document initialization, there is no documentElement present yet.
exports.addNwsapi = (parentNode)=>{
    const document = parentNode._ownerDocument;
    if (!document._nwsapi) {
        document._nwsapi = initNwsapi(parentNode);
        document._nwsapi.configure({
            LOGERRORS: false,
            IDS_DUPES: true,
            MIXEDCASE: true
        });
    }
    return document._nwsapi;
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/style-rules.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const cssom = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/index.js [app-ssr] (ecmascript)");
const { CSSStyleDeclaration } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/cssstyle@4.6.0/node_modules/cssstyle/lib/CSSStyleDeclaration.js [app-ssr] (ecmascript)");
const defaultStyleSheet = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/default-stylesheet.js [app-ssr] (ecmascript)");
const { getSpecifiedColor, getComputedOrUsedColor } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/colors.js [app-ssr] (ecmascript)");
const { matchesDontThrow } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/selectors.js [app-ssr] (ecmascript)");
const { forEach, indexOf } = Array.prototype;
let parsedDefaultStyleSheet;
// Properties for which getResolvedValue is implemented. This is less than
// every supported property.
// https://drafts.csswg.org/indexes/#properties
exports.propertiesWithResolvedValueImplemented = {
    "__proto__": null,
    // https://drafts.csswg.org/css2/visufx.html#visibility
    "visibility": {
        inherited: true,
        initial: "visible",
        computedValue: "as-specified"
    },
    // https://svgwg.org/svg2-draft/interact.html#PointerEventsProperty
    "pointer-events": {
        inherited: true,
        initial: "auto",
        computedValue: "as-specified"
    },
    // https://drafts.csswg.org/css-backgrounds-3/#propdef-background-color
    "background-color": {
        inherited: false,
        initial: "transparent",
        computedValue: "computed-color"
    },
    // https://drafts.csswg.org/css-logical-1/#propdef-border-block-end-color
    "border-block-start-color": {
        inherited: false,
        initial: "currentcolor",
        computedValue: "computed-color"
    },
    "border-block-end-color": {
        inherited: false,
        initial: "currentcolor",
        computedValue: "computed-color"
    },
    "border-inline-start-color": {
        inherited: false,
        initial: "currentcolor",
        computedValue: "computed-color"
    },
    "border-inline-end-color": {
        inherited: false,
        initial: "currentcolor",
        computedValue: "computed-color"
    },
    // https://drafts.csswg.org/css-backgrounds-3/#propdef-border-bottom-color
    "border-top-color": {
        inherited: false,
        initial: "currentcolor",
        computedValue: "computed-color"
    },
    "border-right-color": {
        inherited: false,
        initial: "currentcolor",
        computedValue: "computed-color"
    },
    "border-bottom-color": {
        inherited: false,
        initial: "currentcolor",
        computedValue: "computed-color"
    },
    "border-left-color": {
        inherited: false,
        initial: "currentcolor",
        computedValue: "computed-color"
    },
    // https://drafts.csswg.org/css-ui-4/#propdef-caret-color
    "caret-color": {
        inherited: true,
        initial: "auto",
        computedValue: "computed-color"
    },
    // https://drafts.csswg.org/css-color-4/#propdef-color
    "color": {
        inherited: true,
        initial: "CanvasText",
        computedValue: "computed-color"
    },
    // https://drafts.csswg.org/css-ui-4/#propdef-outline-color
    "outline-color": {
        inherited: false,
        initial: "invert",
        computedValue: "computed-color"
    }
};
function forEachMatchingSheetRuleOfElement(elementImpl, handleRule) {
    function handleSheet(sheet) {
        forEach.call(sheet.cssRules, (rule)=>{
            if (rule.media) {
                if (indexOf.call(rule.media, "screen") !== -1) {
                    forEach.call(rule.cssRules, (innerRule)=>{
                        if (matches(innerRule, elementImpl)) {
                            handleRule(innerRule);
                        }
                    });
                }
            } else if (matches(rule, elementImpl)) {
                handleRule(rule);
            }
        });
    }
    if (!parsedDefaultStyleSheet) {
        parsedDefaultStyleSheet = cssom.parse(defaultStyleSheet);
    }
    handleSheet(parsedDefaultStyleSheet);
    forEach.call(elementImpl._ownerDocument.styleSheets._list, handleSheet);
}
exports.invalidateStyleCache = (elementImpl)=>{
    if (elementImpl._attached) {
        elementImpl._ownerDocument._styleCache = null;
    }
};
exports.getDeclarationForElement = (elementImpl)=>{
    let styleCache = elementImpl._ownerDocument._styleCache;
    if (!styleCache) {
        styleCache = elementImpl._ownerDocument._styleCache = new WeakMap();
    }
    const cachedDeclaration = styleCache.get(elementImpl);
    if (cachedDeclaration) {
        return cachedDeclaration;
    }
    const declaration = new CSSStyleDeclaration();
    function handleProperty(style, property) {
        const value = style.getPropertyValue(property);
        // https://drafts.csswg.org/css-cascade-4/#valdef-all-unset
        if (value === "unset") {
            declaration.removeProperty(property);
        } else {
            declaration.setProperty(property, value, style.getPropertyPriority(property));
        }
    }
    forEachMatchingSheetRuleOfElement(elementImpl, (rule)=>{
        forEach.call(rule.style, (property)=>{
            handleProperty(rule.style, property);
        });
    });
    forEach.call(elementImpl.style, (property)=>{
        handleProperty(elementImpl.style, property);
    });
    styleCache.set(elementImpl, declaration);
    return declaration;
};
function matches(rule, element) {
    return matchesDontThrow(element, rule.selectorText);
}
// Naive implementation of https://drafts.csswg.org/css-cascade-4/#cascading
// based on the previous jsdom implementation of getComputedStyle.
// Does not implement https://drafts.csswg.org/css-cascade-4/#cascade-specificity,
// or rather specificity is only implemented by the order in which the matching
// rules appear. The last rule is the most specific while the first rule is
// the least specific.
function getCascadedPropertyValue(element, property) {
    return exports.getDeclarationForElement(element).getPropertyValue(property);
}
// https://drafts.csswg.org/css-cascade-4/#specified-value
function getSpecifiedValue(element, property) {
    const { initial, inherited, computedValue } = exports.propertiesWithResolvedValueImplemented[property];
    const cascade = getCascadedPropertyValue(element, property);
    if (cascade !== "") {
        if (computedValue === "computed-color") {
            return getSpecifiedColor(cascade);
        }
        return cascade;
    }
    // Defaulting
    if (inherited && element.parentElement !== null) {
        return getComputedValue(element.parentElement, property);
    }
    // root element without parent element or inherited property
    return initial;
}
// https://drafts.csswg.org/css-cascade-4/#computed-value
function getComputedValue(element, property) {
    const { computedValue, initial } = exports.propertiesWithResolvedValueImplemented[property];
    if (computedValue === "as-specified") {
        return getSpecifiedValue(element, property);
    } else if (computedValue === "computed-color") {
        const specifiedValue = getSpecifiedValue(element, property);
        // https://drafts.csswg.org/css-color-4/#resolving-other-colors
        if (specifiedValue === "currentcolor") {
            if (property === "color") {
                if (element.parentElement !== null) {
                    return getComputedValue(element.parentElement, "color");
                }
                return initial;
            }
            return getComputedValue(element, "color");
        }
        return getComputedOrUsedColor(specifiedValue);
    }
    throw new TypeError(`Internal error: unrecognized computed value instruction '${computedValue}'`);
}
// https://drafts.csswg.org/cssom/#resolved-value
// Only implements the properties that are defined in propertiesWithResolvedValueImplemented.
exports.getResolvedValue = (element, property)=>{
    // We can always use the computed value with the current set of propertiesWithResolvedValueImplemented:
    // * Color properties end up with the used value, but we don't implement any actual differences between used and
    //   computed that https://drafts.csswg.org/css-cascade-5/#used-value gestures at.
    // * The other properties fall back to the "any other property: The resolved value is the computed value." case.
    return getComputedValue(element, property);
};
exports.SHADOW_DOM_PSEUDO_REGEXP = /^::(?:part|slotted)\(/i;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
// All these operate on and return impls, not wrappers!
exports.closest = (e, localName, namespace = HTML_NS)=>{
    while(e){
        if (e.localName === localName && e.namespaceURI === namespace) {
            return e;
        }
        e = domSymbolTree.parent(e);
    }
    return null;
};
exports.childrenByLocalName = (parent, localName, namespace = HTML_NS)=>{
    return domSymbolTree.childrenToArray(parent, {
        filter (node) {
            return node._localName === localName && node._namespaceURI === namespace;
        }
    });
};
exports.descendantsByLocalName = (parent, localName, namespace = HTML_NS)=>{
    return domSymbolTree.treeToArray(parent, {
        filter (node) {
            return node._localName === localName && node._namespaceURI === namespace && node !== parent;
        }
    });
};
exports.childrenByLocalNames = (parent, localNamesSet, namespace = HTML_NS)=>{
    return domSymbolTree.childrenToArray(parent, {
        filter (node) {
            return localNamesSet.has(node._localName) && node._namespaceURI === namespace;
        }
    });
};
exports.descendantsByLocalNames = (parent, localNamesSet, namespace = HTML_NS)=>{
    return domSymbolTree.treeToArray(parent, {
        filter (node) {
            return localNamesSet.has(node._localName) && node._namespaceURI === namespace && node !== parent;
        }
    });
};
exports.firstChildWithLocalName = (parent, localName, namespace = HTML_NS)=>{
    const iterator = domSymbolTree.childrenIterator(parent);
    for (const child of iterator){
        if (child._localName === localName && child._namespaceURI === namespace) {
            return child;
        }
    }
    return null;
};
exports.firstChildWithLocalNames = (parent, localNamesSet, namespace = HTML_NS)=>{
    const iterator = domSymbolTree.childrenIterator(parent);
    for (const child of iterator){
        if (localNamesSet.has(child._localName) && child._namespaceURI === namespace) {
            return child;
        }
    }
    return null;
};
exports.firstDescendantWithLocalName = (parent, localName, namespace = HTML_NS)=>{
    const iterator = domSymbolTree.treeIterator(parent);
    for (const descendant of iterator){
        if (descendant._localName === localName && descendant._namespaceURI === namespace) {
            return descendant;
        }
    }
    return null;
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/text.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { CDATA_SECTION_NODE, TEXT_NODE } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
//
// https://dom.spec.whatwg.org/#concept-child-text-content
//
exports.childTextContent = (node)=>{
    let result = "";
    const iterator = domSymbolTree.childrenIterator(node);
    for (const child of iterator){
        if (child.nodeType === TEXT_NODE || // The CDataSection extends Text.
        child.nodeType === CDATA_SECTION_NODE) {
            result += child.data;
        }
    }
    return result;
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/iterable-weak-set.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// An iterable WeakSet implementation inspired by the iterable WeakMap example code in the WeakRefs specification:
// https://github.com/tc39/proposal-weakrefs#iterable-weakmaps
module.exports = class IterableWeakSet {
    constructor(){
        this._refSet = new Set();
        this._refMap = new WeakMap();
        this._finalizationRegistry = new FinalizationRegistry(({ ref, set })=>set.delete(ref));
    }
    add(value) {
        if (!this._refMap.has(value)) {
            const ref = new WeakRef(value);
            this._refMap.set(value, ref);
            this._refSet.add(ref);
            this._finalizationRegistry.register(value, {
                ref,
                set: this._refSet
            }, ref);
        }
        return this;
    }
    delete(value) {
        const ref = this._refMap.get(value);
        if (!ref) {
            return false;
        }
        this._refMap.delete(value);
        this._refSet.delete(ref);
        this._finalizationRegistry.unregister(ref);
        return true;
    }
    has(value) {
        return this._refMap.has(value);
    }
    *[Symbol.iterator]() {
        for (const ref of this._refSet){
            const value = ref.deref();
            if (value === undefined) {
                continue;
            }
            yield value;
        }
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/dates-and-times.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function isLeapYear(year) {
    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#number-of-days-in-month-month-of-year-year
const daysInMonth = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
];
function numberOfDaysInMonthOfYear(month, year) {
    if (month === 2 && isLeapYear(year)) {
        return 29;
    }
    return daysInMonth[month - 1];
}
const monthRe = /^([0-9]{4,})-([0-9]{2})$/;
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#parse-a-month-string
function parseMonthString(str) {
    const matches = monthRe.exec(str);
    if (!matches) {
        return null;
    }
    const year = Number(matches[1]);
    if (year <= 0) {
        return null;
    }
    const month = Number(matches[2]);
    if (month < 1 || month > 12) {
        return null;
    }
    return {
        year,
        month
    };
}
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-month-string
function isValidMonthString(str) {
    return parseMonthString(str) !== null;
}
function serializeMonth({ year, month }) {
    const yearStr = `${year}`.padStart(4, "0");
    const monthStr = `${month}`.padStart(2, "0");
    return `${yearStr}-${monthStr}`;
}
const dateRe = /^([0-9]{4,})-([0-9]{2})-([0-9]{2})$/;
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#parse-a-date-string
function parseDateString(str) {
    const matches = dateRe.exec(str);
    if (!matches) {
        return null;
    }
    const year = Number(matches[1]);
    if (year <= 0) {
        return null;
    }
    const month = Number(matches[2]);
    if (month < 1 || month > 12) {
        return null;
    }
    const day = Number(matches[3]);
    if (day < 1 || day > numberOfDaysInMonthOfYear(month, year)) {
        return null;
    }
    return {
        year,
        month,
        day
    };
}
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
function isValidDateString(str) {
    return parseDateString(str) !== null;
}
function serializeDate(date) {
    const dayStr = `${date.day}`.padStart(2, "0");
    return `${serializeMonth(date)}-${dayStr}`;
}
const yearlessDateRe = /^(?:--)?([0-9]{2})-([0-9]{2})$/;
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#parse-a-yearless-date-string
function parseYearlessDateString(str) {
    const matches = yearlessDateRe.exec(str);
    if (!matches) {
        return null;
    }
    const month = Number(matches[1]);
    if (month < 1 || month > 12) {
        return null;
    }
    const day = Number(matches[2]);
    if (day < 1 || day > numberOfDaysInMonthOfYear(month, 4)) {
        return null;
    }
    return {
        month,
        day
    };
}
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-yearless-date-string
function isValidYearlessDateString(str) {
    return parseYearlessDateString(str) !== null;
}
function serializeYearlessDate({ month, day }) {
    const monthStr = `${month}`.padStart(2, "0");
    const dayStr = `${day}`.padStart(2, "0");
    return `${monthStr}-${dayStr}`;
}
const timeRe = /^([0-9]{2}):([0-9]{2})(?::([0-9]{2}(?:\.([0-9]{1,3}))?))?$/;
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#parse-a-time-string
function parseTimeString(str) {
    const matches = timeRe.exec(str);
    if (!matches) {
        return null;
    }
    const hour = Number(matches[1]);
    if (hour < 0 || hour > 23) {
        return null;
    }
    const minute = Number(matches[2]);
    if (minute < 0 || minute > 59) {
        return null;
    }
    const second = matches[3] !== undefined ? Math.trunc(Number(matches[3])) : 0;
    if (second < 0 || second >= 60) {
        return null;
    }
    const millisecond = matches[4] !== undefined ? Number(matches[4]) : 0;
    return {
        hour,
        minute,
        second,
        millisecond
    };
}
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-time-string
function isValidTimeString(str) {
    return parseTimeString(str) !== null;
}
function serializeTime({ hour, minute, second, millisecond }) {
    const hourStr = `${hour}`.padStart(2, "0");
    const minuteStr = `${minute}`.padStart(2, "0");
    if (second === 0 && millisecond === 0) {
        return `${hourStr}:${minuteStr}`;
    }
    const secondStr = `${second}`.padStart(2, "0");
    const millisecondStr = `${millisecond}`.padStart(3, "0");
    return `${hourStr}:${minuteStr}:${secondStr}.${millisecondStr}`;
}
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#parse-a-local-date-and-time-string
function parseLocalDateAndTimeString(str, normalized = false) {
    let separatorIdx = str.indexOf("T");
    if (separatorIdx < 0 && !normalized) {
        separatorIdx = str.indexOf(" ");
    }
    if (separatorIdx < 0) {
        return null;
    }
    const date = parseDateString(str.slice(0, separatorIdx));
    if (date === null) {
        return null;
    }
    const time = parseTimeString(str.slice(separatorIdx + 1));
    if (time === null) {
        return null;
    }
    return {
        date,
        time
    };
}
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-local-date-and-time-string
function isValidLocalDateAndTimeString(str) {
    return parseLocalDateAndTimeString(str) !== null;
}
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-normalised-local-date-and-time-string
function isValidNormalizedLocalDateAndTimeString(str) {
    return parseLocalDateAndTimeString(str, true) !== null;
}
function serializeNormalizedDateAndTime({ date, time }) {
    return `${serializeDate(date)}T${serializeTime(time)}`;
}
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#week-number-of-the-last-day
// https://stackoverflow.com/a/18538272/1937836
function weekNumberOfLastDay(year) {
    const jan1 = new Date(year, 0);
    return jan1.getDay() === 4 || isLeapYear(year) && jan1.getDay() === 3 ? 53 : 52;
}
const weekRe = /^([0-9]{4,5})-W([0-9]{2})$/;
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#parse-a-week-string
function parseWeekString(str) {
    const matches = weekRe.exec(str);
    if (!matches) {
        return null;
    }
    const year = Number(matches[1]);
    if (year <= 0) {
        return null;
    }
    const week = Number(matches[2]);
    if (week < 1 || week > weekNumberOfLastDay(year)) {
        return null;
    }
    return {
        year,
        week
    };
}
// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-week-string
function isValidWeekString(str) {
    return parseWeekString(str) !== null;
}
function serializeWeek({ year, week }) {
    const yearStr = `${year}`.padStart(4, "0");
    const weekStr = `${week}`.padStart(2, "0");
    return `${yearStr}-W${weekStr}`;
}
// https://stackoverflow.com/a/6117889
function parseDateAsWeek(originalDate) {
    const dayInSeconds = 86400000;
    // Copy date so don't modify original
    const date = new Date(Date.UTC(originalDate.getUTCFullYear(), originalDate.getUTCMonth(), originalDate.getUTCDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const week = Math.ceil(((date - yearStart) / dayInSeconds + 1) / 7);
    return {
        year: date.getUTCFullYear(),
        week
    };
}
function isDate(obj) {
    try {
        Date.prototype.valueOf.call(obj);
        return true;
    } catch  {
        return false;
    }
}
module.exports = {
    isDate,
    numberOfDaysInMonthOfYear,
    parseMonthString,
    isValidMonthString,
    serializeMonth,
    parseDateString,
    isValidDateString,
    serializeDate,
    parseYearlessDateString,
    isValidYearlessDateString,
    serializeYearlessDate,
    parseTimeString,
    isValidTimeString,
    serializeTime,
    parseLocalDateAndTimeString,
    isValidLocalDateAndTimeString,
    isValidNormalizedLocalDateAndTimeString,
    serializeNormalizedDateAndTime,
    parseDateAsWeek,
    weekNumberOfLastDay,
    parseWeekString,
    isValidWeekString,
    serializeWeek
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { isValidFloatingPointNumber, isValidSimpleColor, parseFloatingPointNumber, stripLeadingAndTrailingASCIIWhitespace, stripNewlines, splitOnCommas } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { isValidDateString, isValidMonthString, isValidTimeString, isValidWeekString, parseLocalDateAndTimeString, serializeNormalizedDateAndTime } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/dates-and-times.js [app-ssr] (ecmascript)");
const whatwgURL = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const NodeList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/NodeList.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { closest, firstChildWithLocalName } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#concept-fe-disabled
exports.isDisabled = (formControl)=>{
    if (formControl.localName === "button" || formControl.localName === "input" || formControl.localName === "select" || formControl.localName === "textarea") {
        if (formControl.hasAttributeNS(null, "disabled")) {
            return true;
        }
    }
    let e = formControl.parentNode;
    while(e){
        if (e.localName === "fieldset" && e.hasAttributeNS(null, "disabled")) {
            const firstLegendElementChild = firstChildWithLocalName(e, "legend");
            if (!firstLegendElementChild || !firstLegendElementChild.contains(formControl)) {
                return true;
            }
        }
        e = e.parentNode;
    }
    return false;
};
// https://html.spec.whatwg.org/multipage/forms.html#category-listed
const listedElements = new Set([
    "button",
    "fieldset",
    "input",
    "object",
    "output",
    "select",
    "textarea"
]);
exports.isListed = (formControl)=>listedElements.has(formControl._localName) && formControl.namespaceURI === HTML_NS;
// https://html.spec.whatwg.org/multipage/forms.html#category-submit
const submittableElements = new Set([
    "button",
    "input",
    "object",
    "select",
    "textarea"
]);
exports.isSubmittable = (formControl)=>{
    return submittableElements.has(formControl._localName) && formControl.namespaceURI === HTML_NS;
};
// https://html.spec.whatwg.org/multipage/forms.html#concept-submit-button
const submitButtonInputTypes = new Set([
    "submit",
    "image"
]);
exports.isSubmitButton = (formControl)=>{
    return (formControl._localName === "input" && submitButtonInputTypes.has(formControl.type) || formControl._localName === "button" && formControl.type === "submit") && formControl.namespaceURI === HTML_NS;
};
// https://html.spec.whatwg.org/multipage/forms.html#concept-button
const buttonInputTypes = new Set([
    ...submitButtonInputTypes,
    "reset",
    "button"
]);
exports.isButton = (formControl)=>{
    return (formControl._localName === "input" && buttonInputTypes.has(formControl.type) || formControl._localName === "button") && formControl.namespaceURI === HTML_NS;
};
// https://html.spec.whatwg.org/multipage/dom.html#interactive-content-2
exports.isInteractiveContent = (node)=>{
    if (node.nodeType !== NODE_TYPE.ELEMENT_NODE) {
        return false;
    }
    if (node.namespaceURI !== HTML_NS) {
        return false;
    }
    if (node.hasAttributeNS(null, "tabindex")) {
        return true;
    }
    switch(node.localName){
        case "a":
            return node.hasAttributeNS(null, "href");
        case "audio":
        case "video":
            return node.hasAttributeNS(null, "controls");
        case "img":
        case "object":
            return node.hasAttributeNS(null, "usemap");
        case "input":
            return node.type !== "hidden";
        case "button":
        case "details":
        case "embed":
        case "iframe":
        case "label":
        case "select":
        case "textarea":
            return true;
    }
    return false;
};
// https://html.spec.whatwg.org/multipage/forms.html#category-label
exports.isLabelable = (node)=>{
    if (node.nodeType !== NODE_TYPE.ELEMENT_NODE) {
        return false;
    }
    if (node.namespaceURI !== HTML_NS) {
        return false;
    }
    switch(node.localName){
        case "button":
        case "meter":
        case "output":
        case "progress":
        case "select":
        case "textarea":
            return true;
        case "input":
            return node.type !== "hidden";
    }
    if (node._ceDefinition?.formAssociated) {
        return true;
    }
    return false;
};
exports.getLabelsForLabelable = (labelable)=>{
    if (!exports.isLabelable(labelable)) {
        return null;
    }
    if (!labelable._labels) {
        const root = labelable.getRootNode({});
        labelable._labels = NodeList.createImpl(root._globalObject, [], {
            element: root,
            query: ()=>{
                const nodes = [];
                for (const descendant of domSymbolTree.treeIterator(root)){
                    if (descendant.control === labelable) {
                        nodes.push(descendant);
                    }
                }
                return nodes;
            }
        });
    }
    return labelable._labels;
};
// https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
exports.isValidEmailAddress = (emailAddress, multiple = false)=>{
    const emailAddressRegExp = new RegExp("^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9]" + "(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}" + "[a-zA-Z0-9])?)*$");
    // A valid e-mail address list is a set of comma-separated tokens, where each token is itself
    // a valid e - mail address.To obtain the list of tokens from a valid e - mail address list,
    // an implementation must split the string on commas.
    if (multiple) {
        return splitOnCommas(emailAddress).every((value)=>emailAddressRegExp.test(value));
    }
    return emailAddressRegExp.test(emailAddress);
};
exports.isValidAbsoluteURL = (url)=>{
    return whatwgURL.parseURL(url) !== null;
};
exports.sanitizeValueByType = (input, val)=>{
    switch(input.type.toLowerCase()){
        case "password":
        case "search":
        case "tel":
        case "text":
            val = stripNewlines(val);
            break;
        case "color":
            // https://html.spec.whatwg.org/multipage/forms.html#color-state-(type=color):value-sanitization-algorithm
            val = isValidSimpleColor(val) ? val.toLowerCase() : "#000000";
            break;
        case "date":
            // https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date):value-sanitization-algorithm
            if (!isValidDateString(val)) {
                val = "";
            }
            break;
        case "datetime-local":
            {
                // https://html.spec.whatwg.org/multipage/input.html#local-date-and-time-state-(type=datetime-local):value-sanitization-algorithm
                const dateAndTime = parseLocalDateAndTimeString(val);
                val = dateAndTime !== null ? serializeNormalizedDateAndTime(dateAndTime) : "";
                break;
            }
        case "email":
            // https://html.spec.whatwg.org/multipage/forms.html#e-mail-state-(type=email):value-sanitization-algorithm
            // https://html.spec.whatwg.org/multipage/forms.html#e-mail-state-(type=email):value-sanitization-algorithm-2
            if (input.hasAttributeNS(null, "multiple")) {
                val = val.split(",").map((token)=>stripLeadingAndTrailingASCIIWhitespace(token)).join(",");
            } else {
                val = stripNewlines(val);
                val = stripLeadingAndTrailingASCIIWhitespace(val);
            }
            break;
        case "month":
            // https://html.spec.whatwg.org/multipage/input.html#month-state-(type=month):value-sanitization-algorithm
            if (!isValidMonthString(val)) {
                val = "";
            }
            break;
        case "number":
            // https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number):value-sanitization-algorithm
            // TODO: using parseFloatingPointNumber in addition to isValidFloatingPointNumber to pass number.html WPT.
            // Possible spec bug.
            if (!isValidFloatingPointNumber(val) || parseFloatingPointNumber(val) === null) {
                val = "";
            }
            break;
        case "range":
            // https://html.spec.whatwg.org/multipage/input.html#range-state-(type=range):value-sanitization-algorithm
            // TODO: using parseFloatingPointNumber in addition to isValidFloatingPointNumber to pass number.html WPT.
            // Possible spec bug.
            if (!isValidFloatingPointNumber(val) || parseFloatingPointNumber(val) === null) {
                const minimum = input._minimum;
                const maximum = input._maximum;
                const defaultValue = maximum < minimum ? minimum : (minimum + maximum) / 2;
                val = `${defaultValue}`;
            } else if (val < input._minimum) {
                val = `${input._minimum}`;
            } else if (val > input._maximum) {
                val = `${input._maximum}`;
            }
            break;
        case "time":
            // https://html.spec.whatwg.org/multipage/input.html#time-state-(type=time):value-sanitization-algorithm
            if (!isValidTimeString(val)) {
                val = "";
            }
            break;
        case "url":
            // https://html.spec.whatwg.org/multipage/forms.html#url-state-(type=url):value-sanitization-algorithm
            val = stripNewlines(val);
            val = stripLeadingAndTrailingASCIIWhitespace(val);
            break;
        case "week":
            // https://html.spec.whatwg.org/multipage/input.html#week-state-(type=week):value-sanitization-algorithm
            if (!isValidWeekString(val)) {
                val = "";
            }
    }
    return val;
};
// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-owner
// TODO: The spec describes an imperative process for assigning/resetting an element's form
// owner based on activities involving form-associated elements. This simpler implementation
// instead calculates the current form owner only when the property is accessed. This is not
// sufficient to pass all the web platform tests, but is good enough for most purposes. We
// should eventually update it to use the correct version, though. See
// https://github.com/whatwg/html/issues/4050 for some discussion.
exports.formOwner = (formControl)=>{
    const formAttr = formControl.getAttributeNS(null, "form");
    if (formAttr === "") {
        return null;
    }
    if (formAttr === null) {
        return closest(formControl, "form");
    }
    const root = formControl.getRootNode({});
    let firstElementWithId;
    for (const descendant of domSymbolTree.treeIterator(root)){
        if (descendant.nodeType === NODE_TYPE.ELEMENT_NODE && descendant.getAttributeNS(null, "id") === formAttr) {
            firstElementWithId = descendant;
            break;
        }
    }
    if (firstElementWithId && firstElementWithId.namespaceURI === HTML_NS && firstElementWithId.localName === "form") {
        return firstElementWithId;
    }
    return null;
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/details.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { firstChildWithLocalName } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
// https://html.spec.whatwg.org/multipage/interactive-elements.html#summary-for-its-parent-details
exports.isSummaryForParentDetails = (summaryElement)=>{
    const parent = summaryElement.parentNode;
    if (parent === null) {
        return false;
    }
    if (parent._localName !== "details" || parent._namespaceURI !== HTML_NS) {
        return false;
    }
    return firstChildWithLocalName(parent, "summary") === summaryElement;
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/svg/render.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { SVG_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
// https://svgwg.org/svg2-draft/render.html#TermNeverRenderedElement
const neverRenderedElements = new Set([
    "clipPath",
    "defs",
    "desc",
    "linearGradient",
    "marker",
    "mask",
    "metadata",
    "pattern",
    "radialGradient",
    "script",
    "style",
    "title",
    "symbol"
]);
// https://svgwg.org/svg2-draft/render.html#Rendered-vs-NonRendered
exports.isRenderedElement = (elImpl)=>{
    if (neverRenderedElements.has(elImpl._localName)) {
        return false;
    }
    // This does not check for elements excluded because of conditional processing attributes or ‘switch’ structures,
    // because conditional processing is not implemented.
    // https://svgwg.org/svg2-draft/struct.html#ConditionalProcessing
    // This does not check for computed style of display being none, since that is not yet implemented for HTML
    // focusability either (and there are no tests yet).
    if (!elImpl.isConnected) {
        return false;
    }
    // The spec is unclear about how to deal with non-SVG parents, so we only perform this check for SVG-namespace
    // parents.
    if (elImpl.parentElement && elImpl.parentElement._namespaceURI === SVG_NS && !exports.isRenderedElement(elImpl.parentNode)) {
        return false;
    }
    return true;
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/focusing.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const FocusEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/FocusEvent.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { isDisabled } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const { firstChildWithLocalName } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
const { createAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const { HTML_NS, SVG_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { isRenderedElement } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/svg/render.js [app-ssr] (ecmascript)");
const focusableFormElements = new Set([
    "input",
    "select",
    "textarea",
    "button"
]);
// https://html.spec.whatwg.org/multipage/interaction.html#focusable-area, but also some of
// https://html.spec.whatwg.org/multipage/interaction.html#focusing-steps and some of
// https://svgwg.org/svg2-draft/interact.html#TermFocusable
exports.isFocusableAreaElement = (elImpl)=>{
    // We implemented most of the suggested focusable elements found here:
    // https://html.spec.whatwg.org/multipage/interaction.html#tabindex-value
    // However, some suggested elements are not focusable in web browsers, as detailed here:
    // https://github.com/whatwg/html/issues/5490
    if (elImpl._namespaceURI === HTML_NS) {
        if (!elImpl._ownerDocument._defaultView) {
            return false;
        }
        if (!elImpl.isConnected) {
            return false;
        }
        if (!Number.isNaN(parseInt(elImpl.getAttributeNS(null, "tabindex")))) {
            return true;
        }
        if (elImpl._localName === "iframe") {
            return true;
        }
        if (elImpl._localName === "a" && elImpl.hasAttributeNS(null, "href")) {
            return true;
        }
        if (elImpl._localName === "summary" && elImpl.parentNode && elImpl.parentNode._localName === "details" && elImpl === firstChildWithLocalName(elImpl.parentNode, "summary")) {
            return true;
        }
        if (focusableFormElements.has(elImpl._localName) && !isDisabled(elImpl)) {
            if (elImpl._localName === "input" && elImpl.type === "hidden") {
                return false;
            }
            return true;
        }
        if (elImpl.hasAttributeNS(null, "contenteditable")) {
            return true;
        }
        return false;
    // This does not check for a designMode Document as specified in
    // https://html.spec.whatwg.org/multipage/interaction.html#editing-host because the designMode
    // attribute is not implemented.
    }
    if (elImpl._namespaceURI === SVG_NS) {
        if (!Number.isNaN(parseInt(elImpl.getAttributeNS(null, "tabindex"))) && isRenderedElement(elImpl)) {
            return true;
        }
        if (elImpl._localName === "a" && elImpl.hasAttributeNS(null, "href")) {
            return true;
        }
        return false;
    }
    return false;
};
// https://html.spec.whatwg.org/multipage/interaction.html#fire-a-focus-event plus the steps of
// https://html.spec.whatwg.org/multipage/interaction.html#focus-update-steps that adjust Documents to Windows
// It's extended with the bubbles option to also handle focusin/focusout, which are "defined" in
// https://w3c.github.io/uievents/#event-type-focusin. See https://github.com/whatwg/html/issues/3514.
exports.fireFocusEventWithTargetAdjustment = (name, target, relatedTarget, { bubbles = false } = {})=>{
    if (target === null) {
        // E.g. firing blur with nothing previously focused.
        return;
    }
    const event = createAnEvent(name, target._globalObject, FocusEvent, {
        bubbles,
        composed: true,
        relatedTarget,
        view: target._ownerDocument._defaultView,
        detail: 0
    });
    if (target._defaultView) {
        target = idlUtils.implForWrapper(target._defaultView);
    }
    target._dispatch(event);
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/html-constructor.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { createElement, getValidTagNames } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-element.js [app-ssr] (ecmascript)");
const { implForWrapper, wrapperForImpl } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
// https://html.spec.whatwg.org/multipage/custom-elements.html#concept-already-constructed-marker
const ALREADY_CONSTRUCTED_MARKER = Symbol("already-constructed-marker");
// https://html.spec.whatwg.org/multipage/dom.html#htmlconstructor
function HTMLConstructor(globalObject, constructorName, newTarget) {
    const registry = implForWrapper(globalObject._customElementRegistry);
    if (newTarget === HTMLConstructor) {
        throw new TypeError("Invalid constructor");
    }
    const definition = registry._customElementDefinitions.find((entry)=>entry.objectReference === newTarget);
    if (definition === undefined) {
        throw new TypeError("Invalid constructor, the constructor is not part of the custom element registry");
    }
    let isValue = null;
    if (definition.localName === definition.name) {
        if (constructorName !== "HTMLElement") {
            throw new TypeError("Invalid constructor, autonomous custom element should extend from HTMLElement");
        }
    } else {
        const validLocalNames = getValidTagNames(HTML_NS, constructorName);
        if (!validLocalNames.includes(definition.localName)) {
            throw new TypeError(`${definition.localName} is not valid local name for ${constructorName}`);
        }
        isValue = definition.name;
    }
    let { prototype } = newTarget;
    if (prototype === null || typeof prototype !== "object") {
        // The following line deviates from the specification. The HTMLElement prototype should be retrieved from the realm
        // associated with the "new.target". Because it is impossible to get such information in jsdom, we fallback to the
        // HTMLElement prototype associated with the current object.
        prototype = globalObject.HTMLElement.prototype;
    }
    if (definition.constructionStack.length === 0) {
        const documentImpl = implForWrapper(globalObject.document);
        const elementImpl = createElement(documentImpl, definition.localName, HTML_NS);
        const element = wrapperForImpl(elementImpl);
        Object.setPrototypeOf(element, prototype);
        elementImpl._ceState = "custom";
        elementImpl._ceDefinition = definition;
        elementImpl._isValue = isValue;
        return element;
    }
    const elementImpl = definition.constructionStack[definition.constructionStack.length - 1];
    const element = wrapperForImpl(elementImpl);
    if (elementImpl === ALREADY_CONSTRUCTED_MARKER) {
        throw new TypeError("This instance is already constructed");
    }
    Object.setPrototypeOf(element, prototype);
    definition.constructionStack[definition.constructionStack.length - 1] = ALREADY_CONSTRUCTED_MARKER;
    return element;
}
module.exports = {
    HTMLConstructor
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/stylesheets.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const cssom = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/index.js [app-ssr] (ecmascript)");
const whatwgEncoding = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-encoding@3.1.1/node_modules/whatwg-encoding/lib/whatwg-encoding.js [app-ssr] (ecmascript)");
const whatwgURL = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const { invalidateStyleCache } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/style-rules.js [app-ssr] (ecmascript)");
// TODO: this should really implement https://html.spec.whatwg.org/multipage/links.html#link-type-stylesheet
// It (and the things it calls) is nowhere close right now.
exports.fetchStylesheet = (elementImpl, urlString)=>{
    const parsedURL = whatwgURL.parseURL(urlString);
    return fetchStylesheetInternal(elementImpl, urlString, parsedURL);
};
// https://drafts.csswg.org/cssom/#remove-a-css-style-sheet
exports.removeStylesheet = (sheet, elementImpl)=>{
    const { styleSheets } = elementImpl._ownerDocument;
    styleSheets._remove(sheet);
    // Remove the association explicitly; in the spec it's implicit so this step doesn't exist.
    elementImpl.sheet = null;
    invalidateStyleCache(elementImpl);
// TODO: "Set the CSS style sheet’s parent CSS style sheet, owner node and owner CSS rule to null."
// Probably when we have a real CSSOM implementation.
};
// https://drafts.csswg.org/cssom/#create-a-css-style-sheet kinda:
// - Parsing failures are not handled gracefully like they should be
// - The import rules stuff seems out of place, and probably should affect the load event...
exports.createStylesheet = (sheetText, elementImpl, baseURL)=>{
    let sheet;
    try {
        sheet = cssom.parse(sheetText);
    } catch  {
        if (elementImpl._ownerDocument._defaultView) {
            const error = new Error("Could not parse CSS stylesheet");
            error.detail = sheetText;
            error.type = "css parsing";
            elementImpl._ownerDocument._defaultView._virtualConsole.emit("jsdomError", error);
        }
        return;
    }
    scanForImportRules(elementImpl, sheet.cssRules, baseURL);
    addStylesheet(sheet, elementImpl);
};
// https://drafts.csswg.org/cssom/#add-a-css-style-sheet
function addStylesheet(sheet, elementImpl) {
    elementImpl._ownerDocument.styleSheets._add(sheet);
    // Set the association explicitly; in the spec it's implicit.
    elementImpl.sheet = sheet;
    invalidateStyleCache(elementImpl);
// TODO: title and disabled stuff
}
function fetchStylesheetInternal(elementImpl, urlString, parsedURL) {
    const document = elementImpl._ownerDocument;
    let defaultEncoding = document._encoding;
    const resourceLoader = document._resourceLoader;
    if (elementImpl.localName === "link" && elementImpl.hasAttributeNS(null, "charset")) {
        defaultEncoding = whatwgEncoding.labelToName(elementImpl.getAttributeNS(null, "charset"));
    }
    function onStylesheetLoad(data) {
        // if the element was detached before the load could finish, don't process the data
        if (!elementImpl._attached) {
            return;
        }
        const css = whatwgEncoding.decode(data, defaultEncoding);
        // TODO: MIME type checking?
        if (elementImpl.sheet) {
            exports.removeStylesheet(elementImpl.sheet, elementImpl);
        }
        exports.createStylesheet(css, elementImpl, parsedURL);
    }
    resourceLoader.fetch(urlString, {
        element: elementImpl,
        onLoad: onStylesheetLoad
    });
}
// TODO this is actually really messed up and overwrites the sheet on elementImpl
// Tracking in https://github.com/jsdom/jsdom/issues/2124
function scanForImportRules(elementImpl, cssRules, baseURL) {
    if (!cssRules) {
        return;
    }
    for(let i = 0; i < cssRules.length; ++i){
        if (cssRules[i].cssRules) {
            // @media rule: keep searching inside it.
            scanForImportRules(elementImpl, cssRules[i].cssRules, baseURL);
        } else if (cssRules[i].href) {
            // @import rule: fetch the resource and evaluate it.
            // See http://dev.w3.org/csswg/cssom/#css-import-rule
            //     If loading of the style sheet fails its cssRules list is simply
            //     empty. I.e. an @import rule always has an associated style sheet.
            const parsed = whatwgURL.parseURL(cssRules[i].href, {
                baseURL
            });
            if (parsed === null) {
                const window = elementImpl._ownerDocument._defaultView;
                if (window) {
                    const error = new Error(`Could not parse CSS @import URL ${cssRules[i].href} relative to base URL ` + `"${whatwgURL.serializeURL(baseURL)}"`);
                    error.type = "css @import URL parsing";
                    window._virtualConsole.emit("jsdomError", error);
                }
            } else {
                fetchStylesheetInternal(elementImpl, whatwgURL.serializeURL(parsed), parsed);
            }
        }
    }
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/number-and-date-inputs.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { parseFloatingPointNumber } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { parseDateString, parseLocalDateAndTimeString, parseMonthString, parseTimeString, parseWeekString, serializeDate, serializeMonth, serializeNormalizedDateAndTime, serializeTime, serializeWeek, parseDateAsWeek } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/dates-and-times.js [app-ssr] (ecmascript)");
// Necessary because Date.UTC() treats year within [0, 99] as [1900, 1999].
function getUTCMs(year, month = 1, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0) {
    if (year > 99 || year < 0) {
        return Date.UTC(year, month - 1, day, hour, minute, second, millisecond);
    }
    const d = new Date(0);
    d.setUTCFullYear(year);
    d.setUTCMonth(month - 1);
    d.setUTCDate(day);
    d.setUTCHours(hour);
    d.setUTCMinutes(minute);
    d.setUTCSeconds(second, millisecond);
    return d.valueOf();
}
const dayOfWeekRelMondayLUT = [
    -1,
    0,
    1,
    2,
    3,
    -3,
    -2
];
exports.convertStringToNumberByType = {
    // https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date):concept-input-value-string-number
    date (input) {
        const date = parseDateString(input);
        if (date === null) {
            return null;
        }
        return getUTCMs(date.year, date.month, date.day);
    },
    // https://html.spec.whatwg.org/multipage/input.html#month-state-(type=month):concept-input-value-string-number
    month (input) {
        const date = parseMonthString(input);
        if (date === null) {
            return null;
        }
        return (date.year - 1970) * 12 + (date.month - 1);
    },
    // https://html.spec.whatwg.org/multipage/input.html#week-state-(type=week):concept-input-value-string-number
    week (input) {
        const date = parseWeekString(input);
        if (date === null) {
            return null;
        }
        const dateObj = new Date(getUTCMs(date.year));
        // An HTML week starts on Monday, while 0 represents Sunday. Account for such.
        const dayOfWeekRelMonday = dayOfWeekRelMondayLUT[dateObj.getUTCDay()];
        return dateObj.setUTCDate(1 + 7 * (date.week - 1) - dayOfWeekRelMonday);
    },
    // https://html.spec.whatwg.org/multipage/input.html#time-state-(type=time):concept-input-value-string-number
    time (input) {
        const time = parseTimeString(input);
        if (time === null) {
            return null;
        }
        return ((time.hour * 60 + time.minute) * 60 + time.second) * 1000 + time.millisecond;
    },
    // https://html.spec.whatwg.org/multipage/input.html#local-date-and-time-state-(type=datetime-local):concept-input-value-string-number
    "datetime-local" (input) {
        const dateAndTime = parseLocalDateAndTimeString(input);
        if (dateAndTime === null) {
            return null;
        }
        const { date: { year, month, day }, time: { hour, minute, second, millisecond } } = dateAndTime;
        // Doesn't quite matter whether or not UTC is used, since the offset from 1970-01-01 local time is returned.
        return getUTCMs(year, month, day, hour, minute, second, millisecond);
    },
    // https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number):concept-input-value-string-number
    number: parseFloatingPointNumber,
    // https://html.spec.whatwg.org/multipage/input.html#range-state-(type=range):concept-input-value-string-number
    range: parseFloatingPointNumber
};
exports.convertStringToDateByType = {
    date (input) {
        const parsedInput = exports.convertStringToNumberByType.date(input);
        return parsedInput === null ? null : new Date(parsedInput);
    },
    // https://html.spec.whatwg.org/multipage/input.html#month-state-(type=month):concept-input-value-string-number
    month (input) {
        const parsedMonthString = parseMonthString(input);
        if (parsedMonthString === null) {
            return null;
        }
        const date = new Date(0);
        date.setUTCFullYear(parsedMonthString.year);
        date.setUTCMonth(parsedMonthString.month - 1);
        return date;
    },
    week (input) {
        const parsedInput = exports.convertStringToNumberByType.week(input);
        return parsedInput === null ? null : new Date(parsedInput);
    },
    time (input) {
        const parsedInput = exports.convertStringToNumberByType.time(input);
        return parsedInput === null ? null : new Date(parsedInput);
    },
    "datetime-local" (input) {
        const parsedInput = exports.convertStringToNumberByType["datetime-local"](input);
        return parsedInput === null ? null : new Date(parsedInput);
    }
};
exports.serializeDateByType = {
    date (input) {
        return serializeDate({
            year: input.getUTCFullYear(),
            month: input.getUTCMonth() + 1,
            day: input.getUTCDate()
        });
    },
    month (input) {
        return serializeMonth({
            year: input.getUTCFullYear(),
            month: input.getUTCMonth() + 1
        });
    },
    week (input) {
        return serializeWeek(parseDateAsWeek(input));
    },
    time (input) {
        return serializeTime({
            hour: input.getUTCHours(),
            minute: input.getUTCMinutes(),
            second: input.getUTCSeconds(),
            millisecond: input.getUTCMilliseconds()
        });
    },
    "datetime-local" (input) {
        return serializeNormalizedDateAndTime({
            date: {
                year: input.getUTCFullYear(),
                month: input.getUTCMonth() + 1,
                day: input.getUTCDate()
            },
            time: {
                hour: input.getUTCHours(),
                minute: input.getUTCMinutes(),
                second: input.getUTCSeconds(),
                millisecond: input.getUTCMilliseconds()
            }
        });
    }
};
exports.convertNumberToStringByType = {
    // https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date):concept-input-value-string-number
    date (input) {
        return exports.serializeDateByType.date(new Date(input));
    },
    // https://html.spec.whatwg.org/multipage/input.html#month-state-(type=month):concept-input-value-string-date
    month (input) {
        const year = 1970 + Math.floor(input / 12);
        const month = input % 12;
        const date = new Date(0);
        date.setUTCFullYear(year);
        date.setUTCMonth(month);
        return exports.serializeDateByType.month(date);
    },
    // https://html.spec.whatwg.org/multipage/input.html#week-state-(type=week):concept-input-value-string-date
    week (input) {
        return exports.serializeDateByType.week(new Date(input));
    },
    // https://html.spec.whatwg.org/multipage/input.html#time-state-(type=time):concept-input-value-string-date
    time (input) {
        return exports.serializeDateByType.time(new Date(input));
    },
    // https://html.spec.whatwg.org/multipage/input.html#local-date-and-time-state-(type=datetime-local):concept-input-value-number-string
    "datetime-local" (input) {
        return exports.serializeDateByType["datetime-local"](new Date(input));
    },
    // https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number):concept-input-value-number-string
    number (input) {
        return input.toString();
    },
    // https://html.spec.whatwg.org/multipage/input.html#range-state-(type=range):concept-input-value-number-string
    range (input) {
        return input.toString();
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/svg/basic-types.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://svgwg.org/svg2-draft/types.html#TermDetach
function detach(value) {
    if (typeof value === "string") {
        return;
    }
    throw new TypeError(`jsdom internal error: detaching object of wrong type ${value}`);
}
exports.detach = detach;
// https://svgwg.org/svg2-draft/types.html#TermAttach
// listObject corresponds to the parameter taken by the algorithm in the spec, but is currently unused because only
// DOMString type is supported by jsdom (and this function) right now.
// eslint-disable-next-line no-unused-vars
function attach(value, listObject) {
    if (typeof value === "string") {
        return;
    }
    throw new TypeError(`jsdom internal error: attaching object of wrong type ${value}`);
}
exports.attach = attach;
// https://svgwg.org/svg2-draft/types.html#TermReserialize for DOMString.
function reserializeSpaceSeparatedTokens(elements) {
    return elements.join(" ");
}
exports.reserializeSpaceSeparatedTokens = reserializeSpaceSeparatedTokens;
// Used for systemLanguage attribute, whose value is a set of comma-separated tokens:
// https://svgwg.org/svg2-draft/struct.html#SystemLanguageAttribute
// SVG 2 spec (https://svgwg.org/svg2-draft/types.html#TermReserialize) says any SVGStringList should reserialize the
// same way, as space-separated tokens, but doing so for systemLanguage is illogical and contradicts the Firefox
// behavior.
// I cannot find a description of reserialization of SVGStringList in the SVG 1.1 spec.
function reserializeCommaSeparatedTokens(elements) {
    return elements.join(", ");
}
exports.reserializeCommaSeparatedTokens = reserializeCommaSeparatedTokens;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/binary-data.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// See https://github.com/jsdom/jsdom/pull/2743#issuecomment-562991955 for background.
exports.copyToArrayBufferInNewRealm = (nodejsBuffer, newRealm)=>{
    const newAB = new newRealm.ArrayBuffer(nodejsBuffer.byteLength);
    const view = new Uint8Array(newAB);
    view.set(nodejsBuffer);
    return newAB;
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/agent-factory.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const http = __turbopack_context__.r("[externals]/http [external] (http, cjs)");
const https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
const { HttpProxyAgent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/http-proxy-agent@7.0.2/node_modules/http-proxy-agent/dist/index.js [app-ssr] (ecmascript)");
const { HttpsProxyAgent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/https-proxy-agent@7.0.6/node_modules/https-proxy-agent/dist/index.js [app-ssr] (ecmascript)");
module.exports = function agentFactory(proxy, rejectUnauthorized) {
    const agentOpts = {
        keepAlive: true,
        rejectUnauthorized
    };
    if (proxy) {
        return {
            https: new HttpsProxyAgent(proxy, agentOpts),
            http: new HttpProxyAgent(proxy, agentOpts)
        };
    }
    return {
        http: new http.Agent(agentOpts),
        https: new https.Agent(agentOpts)
    };
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/http-request.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const http = __turbopack_context__.r("[externals]/http [external] (http, cjs)");
const https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
const { Writable } = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)");
const zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
const ver = process.version.replace("v", "").split(".");
const majorNodeVersion = Number.parseInt(ver[0]);
function abortRequest(clientRequest) {
    clientRequest.destroy();
    clientRequest.removeAllListeners();
    clientRequest.on("error", ()=>{});
}
module.exports = class Request extends Writable {
    constructor(url, clientOptions, requestOptions){
        super();
        Object.assign(this, clientOptions);
        this.currentURL = url;
        this._requestOptions = requestOptions;
        this.headers = requestOptions.headers;
        this._ended = false;
        this._redirectCount = 0;
        this._requestBodyBuffers = [];
        this._bufferIndex = 0;
        this._performRequest();
    }
    abort() {
        abortRequest(this._currentRequest);
        this.emit("abort");
        this.removeAllListeners();
    }
    pipeRequest(form) {
        form.pipe(this._currentRequest);
    }
    write(data, encoding) {
        if (data.length > 0) {
            this._requestBodyBuffers.push({
                data,
                encoding
            });
            this._currentRequest.write(data, encoding);
        }
    }
    end() {
        this.emit("request", this._currentRequest);
        this._ended = true;
        this._currentRequest.end();
    }
    setHeader(name, value) {
        this.headers[name] = value;
        this._currentRequest.setHeader(name, value);
    }
    removeHeader(name) {
        delete this.headers[name];
        this._currentRequest.removeHeader(name);
    }
    // Without this method, the test send-redirect-infinite-sync will halt the test suite
    // TODO: investigate this further and ideally remove
    toJSON() {
        const { method, headers } = this._requestOptions;
        return {
            uri: new URL(this.currentURL),
            method,
            headers
        };
    }
    _writeNext(error) {
        if (this._currentRequest) {
            if (error) {
                this.emit("error", error);
            } else if (this._bufferIndex < this._requestBodyBuffers.length) {
                const buffer = this._requestBodyBuffers[this._bufferIndex++];
                if (!this._currentRequest.writableEnded) {
                    this._currentRequest.write(buffer.data, buffer.encoding, this._writeNext.bind(this));
                }
            } else if (this._ended) {
                this._currentRequest.end();
            }
        }
    }
    _performRequest() {
        const urlOptions = new URL(this.currentURL);
        const scheme = urlOptions.protocol;
        // browserify's (http|https).request() does not work correctly with the (url, options, callback) signature. Instead
        // we need to have options for each of the URL components. Note that we can't use the spread operator because URL
        // instances don't have own properties for the URL components.
        const requestOptions = {
            ...this._requestOptions,
            agent: this.agents[scheme.substring(0, scheme.length - 1)],
            protocol: urlOptions.protocol,
            hostname: urlOptions.hostname,
            port: urlOptions.port,
            path: urlOptions.pathname + urlOptions.search
        };
        const { request } = scheme === "https:" ? https : http;
        this._currentRequest = request(requestOptions, (response)=>{
            this._processResponse(response);
        });
        let cookies;
        if (this._redirectCount === 0) {
            this.originalCookieHeader = this.getHeader("Cookie");
        }
        if (this.cookieJar) {
            cookies = this.cookieJar.getCookieStringSync(this.currentURL);
        }
        if (cookies && cookies.length) {
            if (this.originalCookieHeader) {
                this.setHeader("Cookie", this.originalCookieHeader + "; " + cookies);
            } else {
                this.setHeader("Cookie", cookies);
            }
        }
        for (const event of [
            "connect",
            "error",
            "socket",
            "timeout"
        ]){
            this._currentRequest.on(event, (...args)=>{
                this.emit(event, ...args);
            });
        }
        if (this._isRedirect) {
            this._bufferIndex = 0;
            this._writeNext();
        }
    }
    _processResponse(response) {
        const cookies = response.headers["set-cookie"];
        if (this.cookieJar && Array.isArray(cookies)) {
            try {
                cookies.forEach((cookie)=>{
                    this.cookieJar.setCookieSync(cookie, this.currentURL, {
                        ignoreError: true
                    });
                });
            } catch (e) {
                this.emit("error", e);
            }
        }
        const { statusCode } = response;
        const { location } = response.headers;
        // In Node v15, aborting a message with remaining data causes an error to be thrown,
        // hence the version check
        const catchResErrors = (err)=>{
            if (!(majorNodeVersion >= 15 && err.message === "aborted")) {
                this.emit("error", err);
            }
        };
        response.on("error", catchResErrors);
        let redirectAddress = null;
        let resendWithAuth = false;
        if (typeof location === "string" && location.length && this.followRedirects && statusCode >= 300 && statusCode < 400) {
            redirectAddress = location;
        } else if (statusCode === 401 && /^Basic /i.test(response.headers["www-authenticate"] || "") && this.user && this.user.length) {
            this._requestOptions.auth = `${this.user}:${this.pass}`;
            resendWithAuth = true;
        }
        if (redirectAddress || resendWithAuth) {
            if (++this._redirectCount > 21) {
                const redirectError = new Error("Maximum number of redirects exceeded");
                redirectError.code = "ERR_TOO_MANY_REDIRECTS";
                this.emit("error", redirectError);
                return;
            }
            abortRequest(this._currentRequest);
            response.destroy();
            this._isRedirect = true;
            if ((statusCode === 301 || statusCode === 302) && this._requestOptions.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._requestOptions.method)) {
                this._requestOptions.method = "GET";
                this._requestBodyBuffers = [];
            }
            let previousHostName = this._removeMatchingHeaders(/^host$/i);
            if (!previousHostName) {
                previousHostName = new URL(this.currentURL).hostname;
            }
            const previousURL = this.currentURL;
            if (!resendWithAuth) {
                let nextURL;
                try {
                    nextURL = new URL(redirectAddress, this.currentURL);
                } catch (e) {
                    this.emit("error", e);
                    return;
                }
                if (nextURL.hostname !== previousHostName) {
                    this._removeMatchingHeaders(/^authorization$/i);
                }
                this.currentURL = nextURL.toString();
            }
            this.headers.Referer = previousURL;
            this.emit("redirect", response, this.headers, this.currentURL);
            try {
                this._performRequest();
            } catch (cause) {
                this.emit("error", cause);
            }
        } else {
            let pipeline = response;
            const acceptEncoding = this.headers["Accept-Encoding"];
            const requestCompressed = typeof acceptEncoding === "string" && (acceptEncoding.includes("gzip") || acceptEncoding.includes("deflate"));
            if (requestCompressed && this._requestOptions.method !== "HEAD" && statusCode >= 200 && statusCode !== 204 && statusCode !== 304) {
                // Browserify's zlib does not support zlib.constants.
                const zlibOptions = {
                    flush: (zlib.constants ?? zlib).Z_SYNC_FLUSH,
                    finishFlush: (zlib.constants ?? zlib).Z_SYNC_FLUSH
                };
                const contentEncoding = (response.headers["content-encoding"] || "identity").trim().toLowerCase();
                if (contentEncoding === "gzip") {
                    pipeline = zlib.createGunzip(zlibOptions);
                    response.pipe(pipeline);
                } else if (contentEncoding === "deflate") {
                    pipeline = zlib.createInflate(zlibOptions);
                    response.pipe(pipeline);
                }
            }
            pipeline.removeAllListeners("error");
            this.emit("response", response, this.currentURL);
            pipeline.on("data", (bytes)=>this.emit("data", bytes));
            pipeline.once("end", (bytes)=>this.emit("end", bytes));
            pipeline.on("error", catchResErrors);
            pipeline.on("close", ()=>this.emit("close"));
            this._requestBodyBuffers = [];
        }
    }
    getHeader(key, value) {
        if (this._currentRequest) {
            return this._currentRequest.getHeader(key, value);
        }
        return null;
    }
    _removeMatchingHeaders(regex) {
        let lastValue;
        for(const header in this.headers){
            if (regex.test(header)) {
                lastValue = this.headers[header];
                delete this.headers[header];
            }
        }
        return lastValue;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/json.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://infra.spec.whatwg.org/#parse-json-from-bytes
exports.parseJSONFromBytes = (bytes)=>{
    // https://encoding.spec.whatwg.org/#utf-8-decode
    if (bytes[0] === 0xEF && bytes[1] === 0xBB && bytes[2] === 0xBF) {
        bytes = bytes.subarray(3);
    }
    const jsonText = bytes.toString("utf-8");
    return JSON.parse(jsonText);
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/page-transition-event.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const PageTransitionEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/PageTransitionEvent.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
// https://html.spec.whatwg.org/multipage/browsing-the-web.html#fire-a-page-transition-event
exports.fireAPageTransitionEvent = (eventName, window, persisted)=>{
    const attributes = {
        persisted,
        cancelable: true,
        bubbles: true
    };
    fireAnEvent(eventName, window, PageTransitionEvent, attributes, true);
};
}),
];

//# sourceMappingURL=d19db_jsdom_lib_jsdom_living_helpers_ecfd82f5._.js.map