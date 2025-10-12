module.exports = [
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/webidl/DOMException-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const legacyErrorCodes = {
    IndexSizeError: 1,
    HierarchyRequestError: 3,
    WrongDocumentError: 4,
    InvalidCharacterError: 5,
    NoModificationAllowedError: 7,
    NotFoundError: 8,
    NotSupportedError: 9,
    InUseAttributeError: 10,
    InvalidStateError: 11,
    SyntaxError: 12,
    InvalidModificationError: 13,
    NamespaceError: 14,
    InvalidAccessError: 15,
    TypeMismatchError: 17,
    SecurityError: 18,
    NetworkError: 19,
    AbortError: 20,
    URLMismatchError: 21,
    QuotaExceededError: 22,
    TimeoutError: 23,
    InvalidNodeTypeError: 24,
    DataCloneError: 25
};
exports.implementation = class DOMExceptionImpl {
    constructor(globalObject, [message, name]){
        this.name = name;
        this.message = message;
    }
    get code() {
        return legacyErrorCodes[this.name] || 0;
    }
};
// A proprietary V8 extension that causes the stack property to appear.
exports.init = (impl)=>{
    if (Error.captureStackTrace) {
        const wrapper = idlUtils.wrapperForImpl(impl);
        Error.captureStackTrace(wrapper, wrapper.constructor);
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/Event-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const EventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/EventInit.js [app-ssr] (ecmascript)");
class EventImpl {
    constructor(globalObject, args, privateData){
        const [type, eventInitDict = this.constructor.defaultInit] = args;
        this.type = type;
        this.bubbles = false;
        this.cancelable = false;
        for(const key in eventInitDict){
            if (key in this.constructor.defaultInit) {
                this[key] = eventInitDict[key];
            }
        }
        for(const key in this.constructor.defaultInit){
            if (!(key in this)) {
                this[key] = this.constructor.defaultInit[key];
            }
        }
        this.target = null;
        this.currentTarget = null;
        this.eventPhase = 0;
        this._globalObject = globalObject;
        this._initializedFlag = true;
        this._stopPropagationFlag = false;
        this._stopImmediatePropagationFlag = false;
        this._canceledFlag = false;
        this._inPassiveListenerFlag = false;
        this._dispatchFlag = false;
        this._path = [];
        this.isTrusted = privateData.isTrusted || false;
        this.timeStamp = Date.now();
    }
    // https://dom.spec.whatwg.org/#set-the-canceled-flag
    _setTheCanceledFlag() {
        if (this.cancelable && !this._inPassiveListenerFlag) {
            this._canceledFlag = true;
        }
    }
    get srcElement() {
        return this.target;
    }
    get returnValue() {
        return !this._canceledFlag;
    }
    set returnValue(v) {
        if (v === false) {
            this._setTheCanceledFlag();
        }
    }
    get defaultPrevented() {
        return this._canceledFlag;
    }
    stopPropagation() {
        this._stopPropagationFlag = true;
    }
    get cancelBubble() {
        return this._stopPropagationFlag;
    }
    set cancelBubble(v) {
        if (v) {
            this._stopPropagationFlag = true;
        }
    }
    stopImmediatePropagation() {
        this._stopPropagationFlag = true;
        this._stopImmediatePropagationFlag = true;
    }
    preventDefault() {
        this._setTheCanceledFlag();
    }
    // https://dom.spec.whatwg.org/#dom-event-composedpath
    // Current implementation is based of https://whatpr.org/dom/699.html#dom-event-composedpath
    // due to a bug in composed path implementation https://github.com/whatwg/dom/issues/684
    composedPath() {
        const composedPath = [];
        const { currentTarget, _path: path } = this;
        if (path.length === 0) {
            return composedPath;
        }
        composedPath.push(currentTarget);
        let currentTargetIndex = 0;
        let currentTargetHiddenSubtreeLevel = 0;
        for(let index = path.length - 1; index >= 0; index--){
            const { item, rootOfClosedTree, slotInClosedTree } = path[index];
            if (rootOfClosedTree) {
                currentTargetHiddenSubtreeLevel++;
            }
            if (item === idlUtils.implForWrapper(currentTarget)) {
                currentTargetIndex = index;
                break;
            }
            if (slotInClosedTree) {
                currentTargetHiddenSubtreeLevel--;
            }
        }
        let currentHiddenLevel = currentTargetHiddenSubtreeLevel;
        let maxHiddenLevel = currentTargetHiddenSubtreeLevel;
        for(let i = currentTargetIndex - 1; i >= 0; i--){
            const { item, rootOfClosedTree, slotInClosedTree } = path[i];
            if (rootOfClosedTree) {
                currentHiddenLevel++;
            }
            if (currentHiddenLevel <= maxHiddenLevel) {
                composedPath.unshift(idlUtils.wrapperForImpl(item));
            }
            if (slotInClosedTree) {
                currentHiddenLevel--;
                if (currentHiddenLevel < maxHiddenLevel) {
                    maxHiddenLevel = currentHiddenLevel;
                }
            }
        }
        currentHiddenLevel = currentTargetHiddenSubtreeLevel;
        maxHiddenLevel = currentTargetHiddenSubtreeLevel;
        for(let index = currentTargetIndex + 1; index < path.length; index++){
            const { item, rootOfClosedTree, slotInClosedTree } = path[index];
            if (slotInClosedTree) {
                currentHiddenLevel++;
            }
            if (currentHiddenLevel <= maxHiddenLevel) {
                composedPath.push(idlUtils.wrapperForImpl(item));
            }
            if (rootOfClosedTree) {
                currentHiddenLevel--;
                if (currentHiddenLevel < maxHiddenLevel) {
                    maxHiddenLevel = currentHiddenLevel;
                }
            }
        }
        return composedPath;
    }
    _initialize(type, bubbles, cancelable) {
        this.type = type;
        this._initializedFlag = true;
        this._stopPropagationFlag = false;
        this._stopImmediatePropagationFlag = false;
        this._canceledFlag = false;
        this.isTrusted = false;
        this.target = null;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
    }
    initEvent(type, bubbles, cancelable) {
        if (this._dispatchFlag) {
            return;
        }
        this._initialize(type, bubbles, cancelable);
    }
}
EventImpl.defaultInit = EventInit.convert(undefined, undefined);
module.exports = {
    implementation: EventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/ErrorEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/Event-impl.js [app-ssr] (ecmascript)").implementation;
const ErrorEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ErrorEventInit.js [app-ssr] (ecmascript)");
class ErrorEventImpl extends EventImpl {
}
ErrorEventImpl.defaultInit = ErrorEventInit.convert(undefined, undefined);
module.exports = {
    implementation: ErrorEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/EventModifierMixin-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This mixin doesn't have an IDL equivalent, but since MouseEvent and KeyboardEvent implement getModifierState() the
// same way, its implementation is shared here.
class EventModifierMixinImpl {
    // Event's constructor assumes all options correspond to IDL attributes with the same names, and sets them on `this`.
    // That is not the case for these modifier boolean options, but since the options are set on `this` anyway we'll
    // access them that way. The spec doesn't say much about the case where keyArg is not one of the valid ones
    // (https://w3c.github.io/uievents-key/#keys-modifier), but at least Chrome returns false for invalid modifiers. Since
    // these invalid modifiers will be undefined on `this` (thus `false` after casting it to boolean), we don't need to do
    // extra checking for validity.
    getModifierState(keyArg) {
        if (keyArg === "Control") {
            return Boolean(this.ctrlKey);
        }
        if ([
            "Alt",
            "Meta",
            "Shift"
        ].includes(keyArg)) {
            return Boolean(this[`${keyArg.toLowerCase()}Key`]);
        }
        return Boolean(this[`modifier${keyArg}`]);
    }
}
exports.implementation = EventModifierMixinImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/UIEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const UIEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/UIEventInit.js [app-ssr] (ecmascript)");
const EventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/Event-impl.js [app-ssr] (ecmascript)").implementation;
// Until webidl2js gains support for checking for Window, this would have to do.
function isWindow(val) {
    if (typeof val !== "object") {
        return false;
    }
    const wrapper = idlUtils.wrapperForImpl(val);
    if (typeof wrapper === "object") {
        return wrapper === wrapper._globalProxy;
    }
    // `val` may be either impl or wrapper currently, because webidl2js currently unwraps Window objects (and their global
    // proxies) to their underlying EventTargetImpl during conversion, which is not what we want. But at the same time,
    // some internal usage call this constructor with the actual global proxy.
    return isWindow(idlUtils.implForWrapper(val));
}
class UIEventImpl extends EventImpl {
    constructor(globalObject, args, privateData){
        const eventInitDict = args[1];
        // undefined check included so that we can omit the property in internal usage.
        if (eventInitDict && eventInitDict.view !== null && eventInitDict.view !== undefined) {
            if (!isWindow(eventInitDict.view)) {
                throw new TypeError(`Failed to construct '${new.target.name.replace(/Impl$/, "")}': member view is not of ` + "type Window.");
            }
        }
        super(globalObject, args, privateData);
    }
    initUIEvent(type, bubbles, cancelable, view, detail) {
        if (view !== null) {
            if (!isWindow(view)) {
                throw new TypeError(`Failed to execute 'initUIEvent' on '${this.constructor.name.replace(/Impl$/, "")}': ` + "parameter 4 is not of type 'Window'.");
            }
        }
        if (this._dispatchFlag) {
            return;
        }
        this.initEvent(type, bubbles, cancelable);
        this.view = view;
        this.detail = detail;
    }
}
UIEventImpl.defaultInit = UIEventInit.convert(undefined, undefined);
module.exports = {
    implementation: UIEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/MouseEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const EventModifierMixinImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/EventModifierMixin-impl.js [app-ssr] (ecmascript)").implementation;
const UIEventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/UIEvent-impl.js [app-ssr] (ecmascript)").implementation;
const MouseEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MouseEventInit.js [app-ssr] (ecmascript)");
class MouseEventImpl extends UIEventImpl {
    get x() {
        return this.clientX;
    }
    get y() {
        return this.clientY;
    }
    get pageX() {
        // TODO: consider dispatch flag and return page-relative event coordinate once layout is supported
        return this.clientX; // TODO: add horizontal scroll offset once jsdom implements scrolling support
    }
    get pageY() {
        // TODO: consider dispatch flag and return page-relative event coordinate once layout is supported
        return this.clientY; // TODO: add vertical scroll offset once jsdom implements scrolling support
    }
    get offsetX() {
        // TODO: consider dispatch flag and return target-relative event coordinate once layout is supported
        return this.pageX;
    }
    get offsetY() {
        // TODO: consider dispatch flag and return target-relative event coordinate once layout is supported
        return this.pageY;
    }
    initMouseEvent(type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget) {
        if (this._dispatchFlag) {
            return;
        }
        this.initUIEvent(type, bubbles, cancelable, view, detail);
        this.screenX = screenX;
        this.screenY = screenY;
        this.clientX = clientX;
        this.clientY = clientY;
        this.ctrlKey = ctrlKey;
        this.altKey = altKey;
        this.shiftKey = shiftKey;
        this.metaKey = metaKey;
        this.button = button;
        this.relatedTarget = relatedTarget;
    }
}
mixin(MouseEventImpl.prototype, EventModifierMixinImpl.prototype);
MouseEventImpl.defaultInit = MouseEventInit.convert(undefined, undefined);
module.exports = {
    implementation: MouseEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const reportException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { nodeRoot } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/node.js [app-ssr] (ecmascript)");
const { isNode, isShadowRoot, isSlotable, getEventTargetParent, isShadowInclusiveAncestor, retarget } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/shadow-dom.js [app-ssr] (ecmascript)");
const MouseEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MouseEvent.js [app-ssr] (ecmascript)");
const EVENT_PHASE = {
    NONE: 0,
    CAPTURING_PHASE: 1,
    AT_TARGET: 2,
    BUBBLING_PHASE: 3
};
class EventTargetImpl {
    constructor(globalObject){
        this._globalObject = globalObject;
        this._eventListeners = Object.create(null);
    }
    addEventListener(type, callback, options) {
        options = normalizeEventHandlerOptions(options, [
            "capture",
            "once",
            "passive"
        ]);
        if (options.signal !== null && options.signal.aborted) {
            return;
        }
        if (callback === null) {
            return;
        }
        if (!this._eventListeners[type]) {
            this._eventListeners[type] = [];
        }
        for(let i = 0; i < this._eventListeners[type].length; ++i){
            const listener = this._eventListeners[type][i];
            if (listener.callback.objectReference === callback.objectReference && listener.options.capture === options.capture) {
                return;
            }
        }
        this._eventListeners[type].push({
            callback,
            options
        });
        if (options.signal !== null) {
            options.signal._addAlgorithm(()=>{
                this.removeEventListener(type, callback, options);
            });
        }
    }
    removeEventListener(type, callback, options) {
        options = normalizeEventHandlerOptions(options, [
            "capture"
        ]);
        if (callback === null) {
            // Optimization, not in the spec.
            return;
        }
        if (!this._eventListeners[type]) {
            return;
        }
        for(let i = 0; i < this._eventListeners[type].length; ++i){
            const listener = this._eventListeners[type][i];
            if (listener.callback.objectReference === callback.objectReference && listener.options.capture === options.capture) {
                this._eventListeners[type].splice(i, 1);
                break;
            }
        }
    }
    dispatchEvent(eventImpl) {
        if (eventImpl._dispatchFlag || !eventImpl._initializedFlag) {
            throw DOMException.create(this._globalObject, [
                "Tried to dispatch an uninitialized event",
                "InvalidStateError"
            ]);
        }
        if (eventImpl.eventPhase !== EVENT_PHASE.NONE) {
            throw DOMException.create(this._globalObject, [
                "Tried to dispatch a dispatching event",
                "InvalidStateError"
            ]);
        }
        eventImpl.isTrusted = false;
        return this._dispatch(eventImpl);
    }
    // https://dom.spec.whatwg.org/#get-the-parent
    _getTheParent() {
        return null;
    }
    // https://dom.spec.whatwg.org/#concept-event-dispatch
    // legacyOutputDidListenersThrowFlag optional parameter is not necessary here since it is only used by indexDB.
    _dispatch(eventImpl, legacyTargetOverrideFlag /* , legacyOutputDidListenersThrowFlag */ ) {
        let targetImpl = this;
        let clearTargets = false;
        let activationTarget = null;
        eventImpl._dispatchFlag = true;
        const targetOverride = legacyTargetOverrideFlag ? idlUtils.implForWrapper(targetImpl._globalObject._document) : targetImpl;
        let relatedTarget = retarget(eventImpl.relatedTarget, targetImpl);
        if (targetImpl !== relatedTarget || targetImpl === eventImpl.relatedTarget) {
            const touchTargets = [];
            appendToEventPath(eventImpl, targetImpl, targetOverride, relatedTarget, touchTargets, false);
            const isActivationEvent = MouseEvent.isImpl(eventImpl) && eventImpl.type === "click";
            if (isActivationEvent && targetImpl._hasActivationBehavior) {
                activationTarget = targetImpl;
            }
            let slotInClosedTree = false;
            let slotable = isSlotable(targetImpl) && targetImpl._assignedSlot ? targetImpl : null;
            let parent = getEventTargetParent(targetImpl, eventImpl);
            // Populate event path
            // https://dom.spec.whatwg.org/#event-path
            while(parent !== null){
                if (slotable !== null) {
                    if (parent.localName !== "slot") {
                        throw new Error(`JSDOM Internal Error: Expected parent to be a Slot`);
                    }
                    slotable = null;
                    const parentRoot = nodeRoot(parent);
                    if (isShadowRoot(parentRoot) && parentRoot.mode === "closed") {
                        slotInClosedTree = true;
                    }
                }
                if (isSlotable(parent) && parent._assignedSlot) {
                    slotable = parent;
                }
                relatedTarget = retarget(eventImpl.relatedTarget, parent);
                if (isNode(parent) && isShadowInclusiveAncestor(nodeRoot(targetImpl), parent) || idlUtils.wrapperForImpl(parent).constructor.name === "Window") {
                    if (isActivationEvent && eventImpl.bubbles && activationTarget === null && parent._hasActivationBehavior) {
                        activationTarget = parent;
                    }
                    appendToEventPath(eventImpl, parent, null, relatedTarget, touchTargets, slotInClosedTree);
                } else if (parent === relatedTarget) {
                    parent = null;
                } else {
                    targetImpl = parent;
                    if (isActivationEvent && activationTarget === null && targetImpl._hasActivationBehavior) {
                        activationTarget = targetImpl;
                    }
                    appendToEventPath(eventImpl, parent, targetImpl, relatedTarget, touchTargets, slotInClosedTree);
                }
                if (parent !== null) {
                    parent = getEventTargetParent(parent, eventImpl);
                }
                slotInClosedTree = false;
            }
            let clearTargetsStructIndex = -1;
            for(let i = eventImpl._path.length - 1; i >= 0 && clearTargetsStructIndex === -1; i--){
                if (eventImpl._path[i].target !== null) {
                    clearTargetsStructIndex = i;
                }
            }
            const clearTargetsStruct = eventImpl._path[clearTargetsStructIndex];
            clearTargets = isNode(clearTargetsStruct.target) && isShadowRoot(nodeRoot(clearTargetsStruct.target)) || isNode(clearTargetsStruct.relatedTarget) && isShadowRoot(nodeRoot(clearTargetsStruct.relatedTarget));
            if (activationTarget !== null && activationTarget._legacyPreActivationBehavior) {
                activationTarget._legacyPreActivationBehavior();
            }
            for(let i = eventImpl._path.length - 1; i >= 0; --i){
                const struct = eventImpl._path[i];
                if (struct.target !== null) {
                    eventImpl.eventPhase = EVENT_PHASE.AT_TARGET;
                } else {
                    eventImpl.eventPhase = EVENT_PHASE.CAPTURING_PHASE;
                }
                invokeEventListeners(struct, eventImpl, "capturing");
            }
            for(let i = 0; i < eventImpl._path.length; i++){
                const struct = eventImpl._path[i];
                if (struct.target !== null) {
                    eventImpl.eventPhase = EVENT_PHASE.AT_TARGET;
                } else {
                    if (!eventImpl.bubbles) {
                        continue;
                    }
                    eventImpl.eventPhase = EVENT_PHASE.BUBBLING_PHASE;
                }
                invokeEventListeners(struct, eventImpl, "bubbling");
            }
        }
        eventImpl.eventPhase = EVENT_PHASE.NONE;
        eventImpl.currentTarget = null;
        eventImpl._path = [];
        eventImpl._dispatchFlag = false;
        eventImpl._stopPropagationFlag = false;
        eventImpl._stopImmediatePropagationFlag = false;
        if (clearTargets) {
            eventImpl.target = null;
            eventImpl.relatedTarget = null;
        }
        if (activationTarget !== null) {
            if (!eventImpl._canceledFlag) {
                activationTarget._activationBehavior(eventImpl);
            } else if (activationTarget._legacyCanceledActivationBehavior) {
                activationTarget._legacyCanceledActivationBehavior();
            }
        }
        return !eventImpl._canceledFlag;
    }
}
module.exports = {
    implementation: EventTargetImpl
};
// https://dom.spec.whatwg.org/#concept-event-listener-invoke
function invokeEventListeners(struct, eventImpl, phase) {
    const structIndex = eventImpl._path.indexOf(struct);
    for(let i = structIndex; i >= 0; i--){
        const t = eventImpl._path[i];
        if (t.target) {
            eventImpl.target = t.target;
            break;
        }
    }
    eventImpl.relatedTarget = idlUtils.wrapperForImpl(struct.relatedTarget);
    if (eventImpl._stopPropagationFlag) {
        return;
    }
    eventImpl.currentTarget = idlUtils.wrapperForImpl(struct.item);
    const listeners = struct.item._eventListeners;
    innerInvokeEventListeners(eventImpl, listeners, phase, struct.itemInShadowTree);
}
// https://dom.spec.whatwg.org/#concept-event-listener-inner-invoke
function innerInvokeEventListeners(eventImpl, listeners, phase, itemInShadowTree) {
    let found = false;
    const { type, target } = eventImpl;
    const wrapper = idlUtils.wrapperForImpl(target);
    if (!listeners || !listeners[type]) {
        return found;
    }
    // Copy event listeners before iterating since the list can be modified during the iteration.
    const handlers = listeners[type].slice();
    for(let i = 0; i < handlers.length; i++){
        const listener = handlers[i];
        const { capture, once, passive } = listener.options;
        // Check if the event listener has been removed since the listeners has been cloned.
        if (!listeners[type].includes(listener)) {
            continue;
        }
        found = true;
        if (phase === "capturing" && !capture || phase === "bubbling" && capture) {
            continue;
        }
        if (once) {
            listeners[type].splice(listeners[type].indexOf(listener), 1);
        }
        let window = null;
        if (wrapper && wrapper._document) {
            // Triggered by Window
            window = wrapper;
        } else if (target._ownerDocument) {
            // Triggered by most webidl2js'ed instances
            window = target._ownerDocument._defaultView;
        } else if (wrapper._ownerDocument) {
            // Currently triggered by some non-webidl2js things
            window = wrapper._ownerDocument._defaultView;
        }
        let currentEvent;
        if (window) {
            currentEvent = window._currentEvent;
            if (!itemInShadowTree) {
                window._currentEvent = eventImpl;
            }
        }
        if (passive) {
            eventImpl._inPassiveListenerFlag = true;
        }
        try {
            listener.callback.call(eventImpl.currentTarget, eventImpl);
        } catch (e) {
            if (window) {
                reportException(window, e);
            }
        // Errors in window-less documents just get swallowed... can you think of anything better?
        }
        eventImpl._inPassiveListenerFlag = false;
        if (window) {
            window._currentEvent = currentEvent;
        }
        if (eventImpl._stopImmediatePropagationFlag) {
            return found;
        }
    }
    return found;
}
/**
 * Normalize the event listeners options argument in order to get always a valid options object
 * @param   {Object} options         - user defined options
 * @param   {Array} defaultBoolKeys  - boolean properties that should belong to the options object
 * @returns {Object} object containing at least the "defaultBoolKeys"
 */ function normalizeEventHandlerOptions(options, defaultBoolKeys) {
    const returnValue = {
        signal: null
    };
    // no need to go further here
    if (typeof options === "boolean" || options === null || typeof options === "undefined") {
        returnValue.capture = Boolean(options);
        return returnValue;
    }
    // non objects options so we typecast its value as "capture" value
    if (typeof options !== "object") {
        returnValue.capture = Boolean(options);
        // at this point we don't need to loop the "capture" key anymore
        defaultBoolKeys = defaultBoolKeys.filter((k)=>k !== "capture");
    }
    for (const key of defaultBoolKeys){
        returnValue[key] = Boolean(options[key]);
    }
    if (options.signal !== undefined) {
        returnValue.signal = options.signal;
    }
    return returnValue;
}
// https://dom.spec.whatwg.org/#concept-event-path-append
function appendToEventPath(eventImpl, target, targetOverride, relatedTarget, touchTargets, slotInClosedTree) {
    const itemInShadowTree = isNode(target) && isShadowRoot(nodeRoot(target));
    const rootOfClosedTree = isShadowRoot(target) && target.mode === "closed";
    eventImpl._path.push({
        item: target,
        itemInShadowTree,
        target: targetOverride,
        relatedTarget,
        touchTargets,
        rootOfClosedTree,
        slotInClosedTree
    });
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/CustomEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/Event-impl.js [app-ssr] (ecmascript)").implementation;
const CustomEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CustomEventInit.js [app-ssr] (ecmascript)");
class CustomEventImpl extends EventImpl {
    initCustomEvent(type, bubbles, cancelable, detail) {
        if (this._dispatchFlag) {
            return;
        }
        this.initEvent(type, bubbles, cancelable);
        this.detail = detail;
    }
}
CustomEventImpl.defaultInit = CustomEventInit.convert(undefined, undefined);
module.exports = {
    implementation: CustomEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/FocusEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const UIEventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/UIEvent-impl.js [app-ssr] (ecmascript)").implementation;
const FocusEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/FocusEventInit.js [app-ssr] (ecmascript)");
class FocusEventImpl extends UIEventImpl {
}
FocusEventImpl.defaultInit = FocusEventInit.convert(undefined, undefined);
exports.implementation = FocusEventImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/HashChangeEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/Event-impl.js [app-ssr] (ecmascript)").implementation;
const HashChangeEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HashChangeEventInit.js [app-ssr] (ecmascript)");
class HashChangeEventImpl extends EventImpl {
}
HashChangeEventImpl.defaultInit = HashChangeEventInit.convert(undefined, undefined);
module.exports = {
    implementation: HashChangeEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/KeyboardEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const EventModifierMixinImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/EventModifierMixin-impl.js [app-ssr] (ecmascript)").implementation;
const UIEventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/UIEvent-impl.js [app-ssr] (ecmascript)").implementation;
const KeyboardEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/KeyboardEventInit.js [app-ssr] (ecmascript)");
class KeyboardEventImpl extends UIEventImpl {
    initKeyboardEvent(type, bubbles, cancelable, view, key, location, ctrlKey, altKey, shiftKey, metaKey) {
        if (this._dispatchFlag) {
            return;
        }
        this.initUIEvent(type, bubbles, cancelable, view, 0);
        this.key = key;
        this.location = location;
        this.ctrlKey = ctrlKey;
        this.altKey = altKey;
        this.shiftKey = shiftKey;
        this.metaKey = metaKey;
    }
}
mixin(KeyboardEventImpl.prototype, EventModifierMixinImpl.prototype);
KeyboardEventImpl.defaultInit = KeyboardEventInit.convert(undefined, undefined);
module.exports = {
    implementation: KeyboardEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/MessageEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/Event-impl.js [app-ssr] (ecmascript)").implementation;
const MessageEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MessageEventInit.js [app-ssr] (ecmascript)");
class MessageEventImpl extends EventImpl {
    initMessageEvent(type, bubbles, cancelable, data, origin, lastEventId, source, ports) {
        if (this._dispatchFlag) {
            return;
        }
        this.initEvent(type, bubbles, cancelable);
        this.data = data;
        this.origin = origin;
        this.lastEventId = lastEventId;
        this.source = source;
        this.ports = ports;
    }
}
MessageEventImpl.defaultInit = MessageEventInit.convert(undefined, undefined);
module.exports = {
    implementation: MessageEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/PopStateEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/Event-impl.js [app-ssr] (ecmascript)").implementation;
const PopStateEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/PopStateEventInit.js [app-ssr] (ecmascript)");
class PopStateEventImpl extends EventImpl {
}
PopStateEventImpl.defaultInit = PopStateEventInit.convert(undefined, undefined);
exports.implementation = PopStateEventImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/ProgressEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/Event-impl.js [app-ssr] (ecmascript)").implementation;
const ProgressEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ProgressEventInit.js [app-ssr] (ecmascript)");
class ProgressEventImpl extends EventImpl {
}
ProgressEventImpl.defaultInit = ProgressEventInit.convert(undefined, undefined);
module.exports = {
    implementation: ProgressEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/TouchEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const UIEventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/UIEvent-impl.js [app-ssr] (ecmascript)").implementation;
const TouchEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/TouchEventInit.js [app-ssr] (ecmascript)");
class TouchEventImpl extends UIEventImpl {
}
TouchEventImpl.defaultInit = TouchEventInit.convert(undefined, undefined);
module.exports = {
    implementation: TouchEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/SubmitEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/Event-impl.js [app-ssr] (ecmascript)").implementation;
const SubmitEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SubmitEventInit.js [app-ssr] (ecmascript)");
// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#the-submitevent-interface
class SubmitEventImpl extends EventImpl {
}
SubmitEventImpl.defaultInit = SubmitEventInit.convert(undefined, undefined);
module.exports = {
    implementation: SubmitEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/CloseEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/Event-impl.js [app-ssr] (ecmascript)").implementation;
const CloseEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CloseEventInit.js [app-ssr] (ecmascript)");
class CloseEventImpl extends EventImpl {
}
CloseEventImpl.defaultInit = CloseEventInit.convert(undefined, undefined);
exports.implementation = CloseEventImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/StorageEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/Event-impl.js [app-ssr] (ecmascript)").implementation;
const StorageEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/StorageEventInit.js [app-ssr] (ecmascript)");
// https://html.spec.whatwg.org/multipage/webstorage.html#the-storageevent-interface
class StorageEventImpl extends EventImpl {
    initStorageEvent(type, bubbles, cancelable, key, oldValue, newValue, url, storageArea) {
        if (this._dispatchFlag) {
            return;
        }
        this.initEvent(type, bubbles, cancelable);
        this.key = key;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.url = url;
        this.storageArea = storageArea;
    }
}
StorageEventImpl.defaultInit = StorageEventInit.convert(undefined, undefined);
module.exports = {
    implementation: StorageEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/PageTransitionEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/Event-impl.js [app-ssr] (ecmascript)").implementation;
const PageTransitionEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/PageTransitionEventInit.js [app-ssr] (ecmascript)");
// https://html.spec.whatwg.org/multipage/browsing-the-web.html#pagetransitionevent
class PageTransitionEventImpl extends EventImpl {
    initPageTransitionEvent(type, bubbles, cancelable, persisted) {
        if (this._dispatchFlag) {
            return;
        }
        this.initEvent(type, bubbles, cancelable);
        this.persisted = persisted;
    }
}
PageTransitionEventImpl.defaultInit = PageTransitionEventInit.convert(undefined, undefined);
exports.implementation = PageTransitionEventImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/InputEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const UIEventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/UIEvent-impl.js [app-ssr] (ecmascript)").implementation;
const InputEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/InputEventInit.js [app-ssr] (ecmascript)");
// https://w3c.github.io/uievents/#interface-inputevent
class InputEventImpl extends UIEventImpl {
}
InputEventImpl.defaultInit = InputEventInit.convert(undefined, undefined);
module.exports = {
    implementation: InputEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/CompositionEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const UIEventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/UIEvent-impl.js [app-ssr] (ecmascript)").implementation;
const CompositionEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CompositionEventInit.js [app-ssr] (ecmascript)");
class CompositionEventImpl extends UIEventImpl {
    initCompositionEvent(type, bubbles, cancelable, view, data) {
        if (this._dispatchFlag) {
            return;
        }
        this.initUIEvent(type, bubbles, cancelable, view, 0);
        this.data = data;
    }
}
CompositionEventImpl.defaultInit = CompositionEventInit.convert(undefined, undefined);
module.exports = {
    implementation: CompositionEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/WheelEvent-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const MouseEventImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/MouseEvent-impl.js [app-ssr] (ecmascript)").implementation;
const WheelEventInit = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/WheelEventInit.js [app-ssr] (ecmascript)");
class WheelEventImpl extends MouseEventImpl {
}
WheelEventImpl.defaultInit = WheelEventInit.convert(undefined, undefined);
module.exports = {
    implementation: WheelEventImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = Object.freeze({
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12 // historical
});
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/mutation-observer/MutationRecord-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const NodeList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/NodeList.js [app-ssr] (ecmascript)");
// https://dom.spec.whatwg.org/#mutationrecord
class MutationRecordImpl {
    constructor(globalObject, args, privateData){
        this._globalObject = globalObject;
        this.type = privateData.type;
        this.target = privateData.target;
        this.previousSibling = privateData.previousSibling;
        this.nextSibling = privateData.nextSibling;
        this.attributeName = privateData.attributeName;
        this.attributeNamespace = privateData.attributeNamespace;
        this.oldValue = privateData.oldValue;
        this._addedNodes = privateData.addedNodes;
        this._removedNodes = privateData.removedNodes;
    }
    get addedNodes() {
        return NodeList.createImpl(this._globalObject, [], {
            nodes: this._addedNodes
        });
    }
    get removedNodes() {
        return NodeList.createImpl(this._globalObject, [], {
            nodes: this._removedNodes
        });
    }
}
module.exports = {
    implementation: MutationRecordImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/mutation-observer/MutationObserver-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { wrapperForImpl } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
// If we were to implement the MutationObserver by spec, the MutationObservers will not be collected by the GC because
// all the MO are kept in a mutation observer list (https://github.com/jsdom/jsdom/pull/2398/files#r238123889). The
// mutation observer list is primarily used to invoke the mutation observer callback in the same order than the
// mutation observer creation.
// In order to get around this issue, we will assign an increasing id for each mutation observer, this way we would be
// able to invoke the callback in the creation order without having to keep a list of all the mutation observers.
let mutationObserverId = 0;
// https://dom.spec.whatwg.org/#mutationobserver
class MutationObserverImpl {
    // https://dom.spec.whatwg.org/#dom-mutationobserver-mutationobserver
    constructor(globalObject, args){
        const [callback] = args;
        this._callback = callback;
        this._nodeList = [];
        this._recordQueue = [];
        this._id = ++mutationObserverId;
    }
    // https://dom.spec.whatwg.org/#dom-mutationobserver-observe
    observe(target, options) {
        if (("attributeOldValue" in options || "attributeFilter" in options) && !("attributes" in options)) {
            options.attributes = true;
        }
        if ("characterDataOldValue" in options & !("characterData" in options)) {
            options.characterData = true;
        }
        if (!options.childList && !options.attributes && !options.characterData) {
            throw new TypeError("The options object must set at least one of 'attributes', 'characterData', or 'childList' " + "to true.");
        } else if (options.attributeOldValue && !options.attributes) {
            throw new TypeError("The options object may only set 'attributeOldValue' to true when 'attributes' is true or " + "not present.");
        } else if ("attributeFilter" in options && !options.attributes) {
            throw new TypeError("The options object may only set 'attributeFilter' when 'attributes' is true or not " + "present.");
        } else if (options.characterDataOldValue && !options.characterData) {
            throw new TypeError("The options object may only set 'characterDataOldValue' to true when 'characterData' is " + "true or not present.");
        }
        const existingRegisteredObserver = target._registeredObserverList.find((registeredObserver)=>{
            return registeredObserver.observer === this;
        });
        if (existingRegisteredObserver) {
            for (const node of this._nodeList){
                node._registeredObserverList = node._registeredObserverList.filter((registeredObserver)=>{
                    return registeredObserver.source !== existingRegisteredObserver;
                });
            }
            existingRegisteredObserver.options = options;
        } else {
            target._registeredObserverList.push({
                observer: this,
                options
            });
            this._nodeList.push(target);
        }
    }
    // https://dom.spec.whatwg.org/#dom-mutationobserver-disconnect
    disconnect() {
        for (const node of this._nodeList){
            node._registeredObserverList = node._registeredObserverList.filter((registeredObserver)=>{
                return registeredObserver.observer !== this;
            });
        }
        this._recordQueue = [];
    }
    // https://dom.spec.whatwg.org/#dom-mutationobserver-takerecords
    takeRecords() {
        // TODO: revisit if https://github.com/jsdom/webidl2js/pull/108 gets fixed.
        const records = this._recordQueue.map(wrapperForImpl);
        this._recordQueue = [];
        return records;
    }
}
module.exports = {
    implementation: MutationObserverImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/aborting/AbortSignal-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { setupForSimpleEventAccessors } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-event-accessor.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const EventTargetImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js [app-ssr] (ecmascript)").implementation;
const AbortSignal = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/AbortSignal.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
class AbortSignalImpl extends EventTargetImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        // make event firing possible
        this._ownerDocument = globalObject.document;
        this.reason = undefined;
        this.abortAlgorithms = new Set();
        this._dependent = false;
        this._sourceSignals = new Set();
        this._dependentSignals = new Set();
    }
    get aborted() {
        return this.reason !== undefined;
    }
    throwIfAborted() {
        if (this.aborted) {
            throw this.reason;
        }
    }
    static abort(globalObject, reason) {
        const abortSignal = AbortSignal.createImpl(globalObject, []);
        if (reason !== undefined) {
            abortSignal.reason = reason;
        } else {
            abortSignal.reason = DOMException.create(globalObject, [
                "The operation was aborted.",
                "AbortError"
            ]);
        }
        return abortSignal;
    }
    // https://dom.spec.whatwg.org/#abortsignal-dependent
    static any(globalObject, signals) {
        const resultSignal = AbortSignal.createImpl(globalObject, []);
        for (const signal of signals){
            if (signal.aborted) {
                resultSignal.reason = signal.reason;
                return resultSignal;
            }
        }
        resultSignal.dependent = true;
        for (const signal of signals){
            if (!signal.dependent) {
                resultSignal._sourceSignals.add(signal);
                signal._dependentSignals.add(resultSignal);
            } else {
                for (const sourceSignal of signal._sourceSignals){
                    if (!sourceSignal.aborted && !sourceSignal.dependent) {
                        resultSignal._sourceSignals.add(sourceSignal);
                        sourceSignal._dependentSignals.add(resultSignal);
                    }
                }
            }
        }
        return resultSignal;
    }
    static timeout(globalObject, milliseconds) {
        const signal = AbortSignal.createImpl(globalObject, []);
        globalObject.setTimeout(()=>{
            signal._signalAbort(DOMException.create(globalObject, [
                "The operation timed out.",
                "TimeoutError"
            ]));
        }, milliseconds);
        return signal;
    }
    // https://dom.spec.whatwg.org/#abortsignal-signal-abort
    _signalAbort(reason) {
        if (this.aborted) {
            return;
        }
        if (reason !== undefined) {
            this.reason = reason;
        } else {
            this.reason = DOMException.create(this._globalObject, [
                "The operation was aborted.",
                "AbortError"
            ]);
        }
        const dependentSignalsToAbort = [];
        for (const dependentSignal of this._dependentSignals){
            if (!dependentSignal.aborted) {
                dependentSignal.reason = this.reason;
                dependentSignalsToAbort.push(dependentSignal);
            }
        }
        this._runAbortStep();
        for (const dependentSignal of dependentSignalsToAbort){
            dependentSignal._runAbortStep();
        }
    }
    _runAbortStep() {
        for (const algorithm of this.abortAlgorithms){
            algorithm();
        }
        this.abortAlgorithms.clear();
        fireAnEvent("abort", this);
    }
    _addAlgorithm(algorithm) {
        if (this.aborted) {
            return;
        }
        this.abortAlgorithms.add(algorithm);
    }
    _removeAlgorithm(algorithm) {
        this.abortAlgorithms.delete(algorithm);
    }
}
setupForSimpleEventAccessors(AbortSignalImpl.prototype, [
    "abort"
]);
module.exports = {
    implementation: AbortSignalImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/aborting/AbortController-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const AbortSignal = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/AbortSignal.js [app-ssr] (ecmascript)");
class AbortControllerImpl {
    constructor(globalObject){
        this.signal = AbortSignal.createImpl(globalObject, []);
    }
    abort(reason) {
        this.signal._signalAbort(reason);
    }
}
module.exports = {
    implementation: AbortControllerImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { asciiLowercase } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { queueAttributeMutationRecord } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/mutation-observers.js [app-ssr] (ecmascript)");
const { enqueueCECallbackReaction } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/custom-elements.js [app-ssr] (ecmascript)");
// The following three are for https://dom.spec.whatwg.org/#concept-element-attribute-has. We don't just have a
// predicate tester since removing that kind of flexibility gives us the potential for better future optimizations.
/* eslint-disable no-restricted-properties */ exports.hasAttribute = function(element, A) {
    return element._attributeList.includes(A);
};
exports.hasAttributeByName = function(element, name) {
    return element._attributesByNameMap.has(name);
};
exports.hasAttributeByNameNS = function(element, namespace, localName) {
    return element._attributeList.some((attribute)=>{
        return attribute._localName === localName && attribute._namespace === namespace;
    });
};
// https://dom.spec.whatwg.org/#concept-element-attributes-change
exports.changeAttribute = (element, attribute, value)=>{
    const { _localName, _namespace, _value } = attribute;
    queueAttributeMutationRecord(element, _localName, _namespace, _value);
    if (element._ceState === "custom") {
        enqueueCECallbackReaction(element, "attributeChangedCallback", [
            _localName,
            _value,
            value,
            _namespace
        ]);
    }
    attribute._value = value;
    // Run jsdom hooks; roughly correspond to spec's "An attribute is set and an attribute is changed."
    element._attrModified(attribute._qualifiedName, value, _value);
};
// https://dom.spec.whatwg.org/#concept-element-attributes-append
exports.appendAttribute = function(element, attribute) {
    const { _localName, _namespace, _value } = attribute;
    queueAttributeMutationRecord(element, _localName, _namespace, null);
    if (element._ceState === "custom") {
        enqueueCECallbackReaction(element, "attributeChangedCallback", [
            _localName,
            null,
            _value,
            _namespace
        ]);
    }
    const attributeList = element._attributeList;
    attributeList.push(attribute);
    attribute._element = element;
    // Sync name cache
    const name = attribute._qualifiedName;
    const cache = element._attributesByNameMap;
    let entry = cache.get(name);
    if (!entry) {
        entry = [];
        cache.set(name, entry);
    }
    entry.push(attribute);
    // Run jsdom hooks; roughly correspond to spec's "An attribute is set and an attribute is added."
    element._attrModified(name, _value, null);
};
exports.removeAttribute = function(element, attribute) {
    // https://dom.spec.whatwg.org/#concept-element-attributes-remove
    const { _localName, _namespace, _value } = attribute;
    queueAttributeMutationRecord(element, _localName, _namespace, _value);
    if (element._ceState === "custom") {
        enqueueCECallbackReaction(element, "attributeChangedCallback", [
            _localName,
            _value,
            null,
            _namespace
        ]);
    }
    const attributeList = element._attributeList;
    for(let i = 0; i < attributeList.length; ++i){
        if (attributeList[i] === attribute) {
            attributeList.splice(i, 1);
            attribute._element = null;
            // Sync name cache
            const name = attribute._qualifiedName;
            const cache = element._attributesByNameMap;
            const entry = cache.get(name);
            entry.splice(entry.indexOf(attribute), 1);
            if (entry.length === 0) {
                cache.delete(name);
            }
            // Run jsdom hooks; roughly correspond to spec's "An attribute is removed."
            element._attrModified(name, null, attribute._value);
            return;
        }
    }
};
exports.replaceAttribute = function(element, oldAttr, newAttr) {
    // https://dom.spec.whatwg.org/#concept-element-attributes-replace
    const { _localName, _namespace, _value } = oldAttr;
    queueAttributeMutationRecord(element, _localName, _namespace, _value);
    if (element._ceState === "custom") {
        enqueueCECallbackReaction(element, "attributeChangedCallback", [
            _localName,
            _value,
            newAttr._value,
            _namespace
        ]);
    }
    const attributeList = element._attributeList;
    for(let i = 0; i < attributeList.length; ++i){
        if (attributeList[i] === oldAttr) {
            attributeList.splice(i, 1, newAttr);
            oldAttr._element = null;
            newAttr._element = element;
            // Sync name cache
            const name = newAttr._qualifiedName;
            const cache = element._attributesByNameMap;
            let entry = cache.get(name);
            if (!entry) {
                entry = [];
                cache.set(name, entry);
            }
            entry.splice(entry.indexOf(oldAttr), 1, newAttr);
            // Run jsdom hooks; roughly correspond to spec's "An attribute is set and an attribute is changed."
            element._attrModified(name, newAttr._value, oldAttr._value);
            return;
        }
    }
};
exports.getAttributeByName = function(element, name) {
    // https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name
    if (element._namespaceURI === HTML_NS && element._ownerDocument._parsingMode === "html") {
        name = asciiLowercase(name);
    }
    const cache = element._attributesByNameMap;
    const entry = cache.get(name);
    if (!entry) {
        return null;
    }
    return entry[0];
};
exports.getAttributeByNameNS = function(element, namespace, localName) {
    // https://dom.spec.whatwg.org/#concept-element-attributes-get-by-namespace
    if (namespace === "") {
        namespace = null;
    }
    const attributeList = element._attributeList;
    for(let i = 0; i < attributeList.length; ++i){
        const attr = attributeList[i];
        if (attr._namespace === namespace && attr._localName === localName) {
            return attr;
        }
    }
    return null;
};
// Both of the following functions implement https://dom.spec.whatwg.org/#concept-element-attributes-get-value.
// Separated them into two to keep symmetry with other functions.
exports.getAttributeValue = function(element, localName) {
    const attr = exports.getAttributeByNameNS(element, null, localName);
    if (!attr) {
        return "";
    }
    return attr._value;
};
exports.getAttributeValueNS = function(element, namespace, localName) {
    const attr = exports.getAttributeByNameNS(element, namespace, localName);
    if (!attr) {
        return "";
    }
    return attr._value;
};
exports.setAttribute = function(element, attr) {
    // https://dom.spec.whatwg.org/#concept-element-attributes-set
    if (attr._element !== null && attr._element !== element) {
        throw DOMException.create(element._globalObject, [
            "The attribute is in use.",
            "InUseAttributeError"
        ]);
    }
    const oldAttr = exports.getAttributeByNameNS(element, attr._namespace, attr._localName);
    if (oldAttr === attr) {
        return attr;
    }
    if (oldAttr !== null) {
        exports.replaceAttribute(element, oldAttr, attr);
    } else {
        exports.appendAttribute(element, attr);
    }
    return oldAttr;
};
exports.setAttributeValue = function(element, localName, value, prefix, namespace) {
    // https://dom.spec.whatwg.org/#concept-element-attributes-set-value
    if (prefix === undefined) {
        prefix = null;
    }
    if (namespace === undefined) {
        namespace = null;
    }
    const attribute = exports.getAttributeByNameNS(element, namespace, localName);
    if (attribute === null) {
        const newAttribute = element._ownerDocument._createAttribute({
            namespace,
            namespacePrefix: prefix,
            localName,
            value
        });
        exports.appendAttribute(element, newAttribute);
        return;
    }
    exports.changeAttribute(element, attribute, value);
};
// https://dom.spec.whatwg.org/#set-an-existing-attribute-value
exports.setAnExistingAttributeValue = (attribute, value)=>{
    const element = attribute._element;
    if (element === null) {
        attribute._value = value;
    } else {
        exports.changeAttribute(element, attribute, value);
    }
};
exports.removeAttributeByName = function(element, name) {
    // https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-name
    const attr = exports.getAttributeByName(element, name);
    if (attr !== null) {
        exports.removeAttribute(element, attr);
    }
    return attr;
};
exports.removeAttributeByNameNS = function(element, namespace, localName) {
    // https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-namespace
    const attr = exports.getAttributeByNameNS(element, namespace, localName);
    if (attr !== null) {
        exports.removeAttribute(element, attr);
    }
    return attr;
};
exports.attributeNames = function(element) {
    // Needed by https://dom.spec.whatwg.org/#dom-element-getattributenames
    return element._attributeList.map((a)=>a._qualifiedName);
};
exports.hasAttributes = function(element) {
    // Needed by https://dom.spec.whatwg.org/#dom-element-hasattributes
    return element._attributeList.length > 0;
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes/NamedNodeMap-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const attributes = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
exports.implementation = class NamedNodeMapImpl {
    constructor(globalObject, args, privateData){
        this._element = privateData.element;
        this._globalObject = globalObject;
    }
    get _attributeList() {
        return this._element._attributeList;
    }
    get [idlUtils.supportedPropertyIndices]() {
        return this._attributeList.keys();
    }
    get length() {
        return this._attributeList.length;
    }
    item(index) {
        if (index >= this._attributeList.length) {
            return null;
        }
        return this._attributeList[index];
    }
    get [idlUtils.supportedPropertyNames]() {
        const names = new Set(this._attributeList.map((a)=>a._qualifiedName));
        const el = this._element;
        if (el._namespaceURI === HTML_NS && el._ownerDocument._parsingMode === "html") {
            for (const name of names){
                const lowercaseName = name.toLowerCase();
                if (lowercaseName !== name) {
                    names.delete(name);
                }
            }
        }
        return names;
    }
    getNamedItem(qualifiedName) {
        return attributes.getAttributeByName(this._element, qualifiedName);
    }
    getNamedItemNS(namespace, localName) {
        return attributes.getAttributeByNameNS(this._element, namespace, localName);
    }
    setNamedItem(attr) {
        // eslint-disable-next-line no-restricted-properties
        return attributes.setAttribute(this._element, attr);
    }
    setNamedItemNS(attr) {
        // eslint-disable-next-line no-restricted-properties
        return attributes.setAttribute(this._element, attr);
    }
    removeNamedItem(qualifiedName) {
        const attr = attributes.removeAttributeByName(this._element, qualifiedName);
        if (attr === null) {
            throw DOMException.create(this._globalObject, [
                "Tried to remove an attribute that was not present",
                "NotFoundError"
            ]);
        }
        return attr;
    }
    removeNamedItemNS(namespace, localName) {
        const attr = attributes.removeAttributeByNameNS(this._element, namespace, localName);
        if (attr === null) {
            throw DOMException.create(this._globalObject, [
                "Tried to remove an attribute that was not present",
                "NotFoundError"
            ]);
        }
        return attr;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes/Attr-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { setAnExistingAttributeValue } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes.js [app-ssr] (ecmascript)");
const NodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Node-impl.js [app-ssr] (ecmascript)").implementation;
const { ATTRIBUTE_NODE } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
exports.implementation = class AttrImpl extends NodeImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._namespace = privateData.namespace !== undefined ? privateData.namespace : null;
        this._namespacePrefix = privateData.namespacePrefix !== undefined ? privateData.namespacePrefix : null;
        this._localName = privateData.localName;
        this._value = privateData.value !== undefined ? privateData.value : "";
        this._element = privateData.element !== undefined ? privateData.element : null;
        this.nodeType = ATTRIBUTE_NODE;
        this.specified = true;
    }
    get namespaceURI() {
        return this._namespace;
    }
    get prefix() {
        return this._namespacePrefix;
    }
    get localName() {
        return this._localName;
    }
    get name() {
        return this._qualifiedName;
    }
    get nodeName() {
        return this._qualifiedName;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        setAnExistingAttributeValue(this, value);
    }
    get ownerElement() {
        return this._element;
    }
    get _qualifiedName() {
        // https://dom.spec.whatwg.org/#concept-attribute-qualified-name
        if (this._namespacePrefix === null) {
            return this._localName;
        }
        return this._namespacePrefix + ":" + this._localName;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-document-position.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = Object.freeze({
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16,
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
});
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { appendAttribute } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const orderedSetParse = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/ordered-set.js [app-ssr] (ecmascript)").parse;
const { createElement } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-element.js [app-ssr] (ecmascript)");
const { HTML_NS, XMLNS_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { cloningSteps, domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { asciiCaseInsensitiveMatch, asciiLowercase } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const HTMLCollection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLCollection.js [app-ssr] (ecmascript)");
exports.clone = (node, document, cloneChildren)=>{
    if (document === undefined) {
        document = node._ownerDocument;
    }
    let copy;
    switch(node.nodeType){
        case NODE_TYPE.DOCUMENT_NODE:
            // Can't use a simple `Document.createImpl` because of circular dependency issues :-/
            copy = node._cloneDocument();
            break;
        case NODE_TYPE.DOCUMENT_TYPE_NODE:
            copy = document.implementation.createDocumentType(node.name, node.publicId, node.systemId);
            break;
        case NODE_TYPE.ELEMENT_NODE:
            copy = createElement(document, node._localName, node._namespaceURI, node._prefix, node._isValue, false);
            for (const attribute of node._attributeList){
                appendAttribute(copy, exports.clone(attribute, document));
            }
            break;
        case NODE_TYPE.ATTRIBUTE_NODE:
            copy = document._createAttribute({
                namespace: node._namespace,
                namespacePrefix: node._namespacePrefix,
                localName: node._localName,
                value: node._value
            });
            break;
        case NODE_TYPE.TEXT_NODE:
            copy = document.createTextNode(node._data);
            break;
        case NODE_TYPE.CDATA_SECTION_NODE:
            copy = document.createCDATASection(node._data);
            break;
        case NODE_TYPE.COMMENT_NODE:
            copy = document.createComment(node._data);
            break;
        case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
            copy = document.createProcessingInstruction(node.target, node._data);
            break;
        case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
            copy = document.createDocumentFragment();
            break;
    }
    if (node[cloningSteps]) {
        node[cloningSteps](copy, node, document, cloneChildren);
    }
    if (cloneChildren) {
        for (const child of domSymbolTree.childrenIterator(node)){
            const childCopy = exports.clone(child, document, true);
            copy._append(childCopy);
        }
    }
    return copy;
};
// For the following, memoization is not applied here since the memoized results are stored on `this`.
exports.listOfElementsWithClassNames = (classNames, root)=>{
    // https://dom.spec.whatwg.org/#concept-getElementsByClassName
    const classes = orderedSetParse(classNames);
    if (classes.size === 0) {
        return HTMLCollection.createImpl(root._globalObject, [], {
            element: root,
            query: ()=>[]
        });
    }
    return HTMLCollection.createImpl(root._globalObject, [], {
        element: root,
        query: ()=>{
            const isQuirksMode = root._ownerDocument.compatMode === "BackCompat";
            return domSymbolTree.treeToArray(root, {
                filter (node) {
                    if (node.nodeType !== NODE_TYPE.ELEMENT_NODE || node === root) {
                        return false;
                    }
                    const { classList } = node;
                    if (isQuirksMode) {
                        for (const className of classes){
                            if (!classList.tokenSet.some((cur)=>asciiCaseInsensitiveMatch(cur, className))) {
                                return false;
                            }
                        }
                    } else {
                        for (const className of classes){
                            if (!classList.tokenSet.contains(className)) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
            });
        }
    });
};
exports.listOfElementsWithQualifiedName = (qualifiedName, root)=>{
    // https://dom.spec.whatwg.org/#concept-getelementsbytagname
    if (qualifiedName === "*") {
        return HTMLCollection.createImpl(root._globalObject, [], {
            element: root,
            query: ()=>domSymbolTree.treeToArray(root, {
                    filter: (node)=>node.nodeType === NODE_TYPE.ELEMENT_NODE && node !== root
                })
        });
    }
    if (root._ownerDocument._parsingMode === "html") {
        const lowerQualifiedName = asciiLowercase(qualifiedName);
        return HTMLCollection.createImpl(root._globalObject, [], {
            element: root,
            query: ()=>domSymbolTree.treeToArray(root, {
                    filter (node) {
                        if (node.nodeType !== NODE_TYPE.ELEMENT_NODE || node === root) {
                            return false;
                        }
                        if (node._namespaceURI === HTML_NS) {
                            return node._qualifiedName === lowerQualifiedName;
                        }
                        return node._qualifiedName === qualifiedName;
                    }
                })
        });
    }
    return HTMLCollection.createImpl(root._globalObject, [], {
        element: root,
        query: ()=>domSymbolTree.treeToArray(root, {
                filter (node) {
                    if (node.nodeType !== NODE_TYPE.ELEMENT_NODE || node === root) {
                        return false;
                    }
                    return node._qualifiedName === qualifiedName;
                }
            })
    });
};
exports.listOfElementsWithNamespaceAndLocalName = (namespace, localName, root)=>{
    // https://dom.spec.whatwg.org/#concept-getelementsbytagnamens
    if (namespace === "") {
        namespace = null;
    }
    if (namespace === "*" && localName === "*") {
        return HTMLCollection.createImpl(root._globalObject, [], {
            element: root,
            query: ()=>domSymbolTree.treeToArray(root, {
                    filter: (node)=>node.nodeType === NODE_TYPE.ELEMENT_NODE && node !== root
                })
        });
    }
    if (namespace === "*") {
        return HTMLCollection.createImpl(root._globalObject, [], {
            element: root,
            query: ()=>domSymbolTree.treeToArray(root, {
                    filter (node) {
                        if (node.nodeType !== NODE_TYPE.ELEMENT_NODE || node === root) {
                            return false;
                        }
                        return node._localName === localName;
                    }
                })
        });
    }
    if (localName === "*") {
        return HTMLCollection.createImpl(root._globalObject, [], {
            element: root,
            query: ()=>domSymbolTree.treeToArray(root, {
                    filter (node) {
                        if (node.nodeType !== NODE_TYPE.ELEMENT_NODE || node === root) {
                            return false;
                        }
                        return node._namespaceURI === namespace;
                    }
                })
        });
    }
    return HTMLCollection.createImpl(root._globalObject, [], {
        element: root,
        query: ()=>domSymbolTree.treeToArray(root, {
                filter (node) {
                    if (node.nodeType !== NODE_TYPE.ELEMENT_NODE || node === root) {
                        return false;
                    }
                    return node._localName === localName && node._namespaceURI === namespace;
                }
            })
    });
};
// https://dom.spec.whatwg.org/#converting-nodes-into-a-node
// create a fragment (or just return a node for one item)
exports.convertNodesIntoNode = (document, nodes)=>{
    if (nodes.length === 1) {
        return typeof nodes[0] === "string" ? document.createTextNode(nodes[0]) : nodes[0];
    }
    const fragment = document.createDocumentFragment();
    for(let i = 0; i < nodes.length; i++){
        fragment._append(typeof nodes[i] === "string" ? document.createTextNode(nodes[i]) : nodes[i]);
    }
    return fragment;
};
// https://dom.spec.whatwg.org/#locate-a-namespace-prefix
exports.locateNamespacePrefix = (element, namespace)=>{
    if (element._namespaceURI === namespace && element._prefix !== null) {
        return element._prefix;
    }
    for (const attribute of element._attributeList){
        if (attribute._namespacePrefix === "xmlns" && attribute._value === namespace) {
            return attribute._localName;
        }
    }
    if (element.parentElement !== null) {
        return exports.locateNamespacePrefix(element.parentElement, namespace);
    }
    return null;
};
// https://dom.spec.whatwg.org/#locate-a-namespace
exports.locateNamespace = (node, prefix)=>{
    switch(node.nodeType){
        case NODE_TYPE.ELEMENT_NODE:
            {
                if (node._namespaceURI !== null && node._prefix === prefix) {
                    return node._namespaceURI;
                }
                if (prefix === null) {
                    for (const attribute of node._attributeList){
                        if (attribute._namespace === XMLNS_NS && attribute._namespacePrefix === null && attribute._localName === "xmlns") {
                            return attribute._value !== "" ? attribute._value : null;
                        }
                    }
                } else {
                    for (const attribute of node._attributeList){
                        if (attribute._namespace === XMLNS_NS && attribute._namespacePrefix === "xmlns" && attribute._localName === prefix) {
                            return attribute._value !== "" ? attribute._value : null;
                        }
                    }
                }
                if (node.parentElement === null) {
                    return null;
                }
                return exports.locateNamespace(node.parentElement, prefix);
            }
        case NODE_TYPE.DOCUMENT_NODE:
            {
                if (node.documentElement === null) {
                    return null;
                }
                return exports.locateNamespace(node.documentElement, prefix);
            }
        case NODE_TYPE.DOCUMENT_TYPE_NODE:
        case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
            {
                return null;
            }
        case NODE_TYPE.ATTRIBUTE_NODE:
            {
                if (node._element === null) {
                    return null;
                }
                return exports.locateNamespace(node._element, prefix);
            }
        default:
            {
                if (node.parentElement === null) {
                    return null;
                }
                return exports.locateNamespace(node.parentElement, prefix);
            }
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/named-properties-window.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const hasOwnProp = Object.prototype.hasOwnProperty;
const namedPropertiesTracker = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/named-properties-tracker.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const HTMLCollection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLCollection.js [app-ssr] (ecmascript)");
const { treeOrderSorter } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
function isNamedPropertyElement(element) {
    // (for the name attribute)
    // use hasOwnProperty to make sure contentWindow comes from the prototype,
    // and is not set directly on the node by a script.
    if ("contentWindow" in element && !hasOwnProp.call(element, "contentWindow")) {
        return true;
    }
    switch(element._localName){
        case "a":
        case "area":
        case "embed":
        case "form":
        case "frameset":
        case "img":
        case "object":
            return true;
        default:
            return false;
    }
}
function namedPropertyResolver(window, name, values) {
    function getResult() {
        const results = [];
        for (const node of values().keys()){
            if (node.nodeType !== NODE_TYPE.ELEMENT_NODE) {
                continue;
            }
            if (node.getAttributeNS(null, "id") === name) {
                results.push(node);
            } else if (node.getAttributeNS(null, "name") === name && isNamedPropertyElement(node)) {
                results.push(node);
            }
        }
        results.sort(treeOrderSorter);
        return results;
    }
    const document = window._document;
    const objects = HTMLCollection.create(window, [], {
        element: idlUtils.implForWrapper(document.documentElement),
        query: getResult
    });
    const { length } = objects;
    for(let i = 0; i < length; ++i){
        const node = objects[i];
        if ("contentWindow" in node && !hasOwnProp.call(node, "contentWindow") && node.getAttributeNS(null, "name") === name) {
            return node.contentWindow;
        }
    }
    if (length === 0) {
        return undefined;
    }
    if (length === 1) {
        return objects[0];
    }
    return objects;
}
exports.initializeWindow = function(window, windowProxy) {
    namedPropertiesTracker.create(window, windowProxy, namedPropertyResolver.bind(null));
};
exports.elementAttributeModified = function(element, name, value, oldValue) {
    if (!element._attached) {
        return;
    }
    const useName = isNamedPropertyElement(element);
    if (name === "id" || name === "name" && useName) {
        const tracker = namedPropertiesTracker.get(element._ownerDocument._global);
        // (tracker will be null if the document has no Window)
        if (tracker) {
            if (name === "id" && (!useName || element.getAttributeNS(null, "name") !== oldValue)) {
                tracker.untrack(oldValue, element);
            }
            if (name === "name" && element.getAttributeNS(null, "id") !== oldValue) {
                tracker.untrack(oldValue, element);
            }
            tracker.track(value, element);
        }
    }
};
exports.nodeAttachedToDocument = function(node) {
    if (node.nodeType !== NODE_TYPE.ELEMENT_NODE) {
        return;
    }
    const tracker = namedPropertiesTracker.get(node._ownerDocument._global);
    if (!tracker) {
        return;
    }
    tracker.track(node.getAttributeNS(null, "id"), node);
    if (isNamedPropertyElement(node)) {
        tracker.track(node.getAttributeNS(null, "name"), node);
    }
};
exports.nodeDetachedFromDocument = function(node) {
    if (node.nodeType !== NODE_TYPE.ELEMENT_NODE) {
        return;
    }
    const tracker = namedPropertiesTracker.get(node._ownerDocument._global);
    if (!tracker) {
        return;
    }
    tracker.untrack(node.getAttributeNS(null, "id"), node);
    if (isNamedPropertyElement(node)) {
        tracker.untrack(node.getAttributeNS(null, "name"), node);
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/domparsing/parse5-adapter-serialization.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const nodeTypes = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
// Serialization only requires a subset of the tree adapter interface.
// Tree traversing
exports.getFirstChild = (node)=>node.firstChild;
exports.getChildNodes = (node)=>domSymbolTree.childrenToArray(node);
exports.getParentNode = (node)=>node.parentNode;
exports.getAttrList = (element)=>{
    const attributeList = [
        ...element._attributeList
    ];
    if (element._isValue && attributeList.every((attr)=>attr.name !== "is")) {
        attributeList.unshift({
            name: "is",
            namespace: null,
            prefix: null,
            value: element._isValue
        });
    }
    return attributeList;
};
// Node data
exports.getTagName = (element)=>element._qualifiedName; // https://github.com/inikulin/parse5/issues/231
exports.getNamespaceURI = (element)=>element.namespaceURI;
exports.getTextNodeContent = exports.getCommentNodeContent = (node)=>node.data;
exports.getDocumentTypeNodeName = (node)=>node.name;
exports.getDocumentTypeNodePublicId = (node)=>node.publicId;
exports.getDocumentTypeNodeSystemId = (node)=>node.systemId;
exports.getTemplateContent = (templateElement)=>templateElement._templateContents;
exports.getDocumentMode = (document)=>document._mode;
// Node types
exports.isTextNode = (node)=>node.nodeType === nodeTypes.TEXT_NODE;
exports.isCommentNode = (node)=>node.nodeType === nodeTypes.COMMENT_NODE;
exports.isDocumentTypeNode = (node)=>node.nodeType === nodeTypes.DOCUMENT_TYPE_NODE;
exports.isElementNode = (node)=>node.nodeType === nodeTypes.ELEMENT_NODE;
// Source code location
exports.setNodeSourceCodeLocation = (node, location)=>{
    node.sourceCodeLocation = location;
};
exports.getNodeSourceCodeLocation = (node)=>node.sourceCodeLocation;
exports.updateNodeSourceCodeLocation = (node, endLocation)=>{
    Object.assign(node.sourceCodeLocation, endLocation);
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/domparsing/serialization.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const produceXMLSerialization = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/w3c-xmlserializer@5.0.0/node_modules/w3c-xmlserializer/lib/serialize.js [app-ssr] (ecmascript)");
const parse5 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/parse5@7.3.0/node_modules/parse5/dist/cjs/index.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const utils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const treeAdapter = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/domparsing/parse5-adapter-serialization.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
module.exports.fragmentSerialization = (node, { outer, requireWellFormed, globalObject })=>{
    const contextDocument = node.nodeType === NODE_TYPE.DOCUMENT_NODE ? node : node._ownerDocument;
    if (contextDocument._parsingMode === "html") {
        const config = {
            ...contextDocument._parseOptions,
            treeAdapter
        };
        return outer ? parse5.serializeOuter(node, config) : parse5.serialize(node, config);
    }
    const childNodes = outer ? [
        node
    ] : domSymbolTree.childrenToArray(node);
    try {
        let serialized = "";
        for(let i = 0; i < childNodes.length; ++i){
            serialized += produceXMLSerialization(utils.wrapperForImpl(childNodes[i]), {
                requireWellFormed
            });
        }
        return serialized;
    } catch (e) {
        throw DOMException.create(globalObject, [
            e.message,
            "InvalidStateError"
        ]);
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/domparsing/InnerHTML-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { parseFragment } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/parser/index.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { isShadowRoot } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/shadow-dom.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { fragmentSerialization } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/domparsing/serialization.js [app-ssr] (ecmascript)");
// https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin
exports.implementation = class InnerHTMLImpl {
    // https://w3c.github.io/DOM-Parsing/#dom-innerhtml-innerhtml
    get innerHTML() {
        return fragmentSerialization(this, {
            outer: false,
            requireWellFormed: true,
            globalObject: this._globalObject
        });
    }
    set innerHTML(markup) {
        const contextElement = isShadowRoot(this) ? this.host : this;
        const fragment = parseFragment(markup, contextElement);
        let contextObject = this;
        if (this.nodeType === NODE_TYPE.ELEMENT_NODE && this.localName === "template" && this.namespaceURI === HTML_NS) {
            contextObject = this._templateContents;
        }
        contextObject._replaceAll(fragment);
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/domparsing/DOMParser-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { parseIntoDocument } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/parser/index.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const Document = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Document.js [app-ssr] (ecmascript)");
exports.implementation = class DOMParserImpl {
    constructor(globalObject){
        this._globalObject = globalObject;
    }
    parseFromString(string, contentType) {
        switch(String(contentType)){
            case "text/html":
                {
                    return this.createScriptingDisabledDocument("html", contentType, string);
                }
            case "text/xml":
            case "application/xml":
            case "application/xhtml+xml":
            case "image/svg+xml":
                {
                    try {
                        return this.createScriptingDisabledDocument("xml", contentType, string);
                    } catch (error) {
                        const document = this.createScriptingDisabledDocument("xml", contentType);
                        const element = document.createElementNS("http://www.mozilla.org/newlayout/xml/parsererror.xml", "parsererror");
                        element.textContent = error.message;
                        document.appendChild(element);
                        return document;
                    }
                }
            default:
                throw new TypeError("Invalid contentType");
        }
    }
    createScriptingDisabledDocument(parsingMode, contentType, string) {
        const document = Document.createImpl(this._globalObject, [], {
            options: {
                parsingMode,
                encoding: "UTF-8",
                contentType,
                readyState: "complete",
                scriptingDisabled: true,
                url: idlUtils.implForWrapper(this._globalObject._document).URL
            }
        });
        if (string !== undefined) {
            parseIntoDocument(string, document);
        }
        return document;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/domparsing/XMLSerializer-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const serialize = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/w3c-xmlserializer@5.0.0/node_modules/w3c-xmlserializer/lib/serialize.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const utils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
exports.implementation = class XMLSerializerImpl {
    constructor(globalObject){
        this._globalObject = globalObject;
    }
    serializeToString(root) {
        try {
            return serialize(utils.wrapperForImpl(root), {
                requireWellFormed: false
            });
        } catch (e) {
            throw DOMException.create(this._globalObject, [
                e.message,
                "InvalidStateError"
            ]);
        }
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/cssom/StyleSheetList-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
exports.implementation = class StyleSheetList {
    constructor(){
        this._list = [];
    }
    get length() {
        return this._list.length;
    }
    item(index) {
        const result = this._list[index];
        return result !== undefined ? result : null;
    }
    get [idlUtils.supportedPropertyIndices]() {
        return this._list.keys();
    }
    _add(sheet) {
        const { _list } = this;
        if (!_list.includes(sheet)) {
            _list.push(sheet);
        }
    }
    _remove(sheet) {
        const { _list } = this;
        const index = _list.indexOf(sheet);
        if (index >= 0) {
            _list.splice(index, 1);
        }
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/window/History-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { serializeURL } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
// https://html.spec.whatwg.org/#history-3
exports.implementation = class HistoryImpl {
    constructor(globalObject, args, privateData){
        this._window = privateData.window;
        this._document = privateData.document;
        this._actAsIfLocationReloadCalled = privateData.actAsIfLocationReloadCalled;
        this._state = null;
        this._globalObject = globalObject;
    }
    _guardAgainstInactiveDocuments() {
        if (!this._window) {
            throw DOMException.create(this._globalObject, [
                "History object is associated with a document that is not fully active.",
                "SecurityError"
            ]);
        }
    }
    get length() {
        this._guardAgainstInactiveDocuments();
        return this._window._sessionHistory.length;
    }
    get state() {
        this._guardAgainstInactiveDocuments();
        return this._state;
    }
    go(delta) {
        this._guardAgainstInactiveDocuments();
        if (delta === 0) {
            // When the go(delta) method is invoked, if delta is zero, the user agent must act as
            // if the location.reload() method was called instead.
            this._actAsIfLocationReloadCalled();
        } else {
            // Otherwise, the user agent must traverse the history by a delta whose value is delta
            this._window._sessionHistory.traverseByDelta(delta);
        }
    }
    back() {
        this.go(-1);
    }
    forward() {
        this.go(+1);
    }
    pushState(data, unused, url) {
        this._sharedPushAndReplaceState(data, url, "push");
    }
    replaceState(data, unused, url) {
        this._sharedPushAndReplaceState(data, url, "replace");
    }
    // https://html.spec.whatwg.org/#shared-history-push/replace-state-steps
    _sharedPushAndReplaceState(data, url, historyHandling) {
        this._guardAgainstInactiveDocuments();
        // TODO structured clone data
        let newURL = this._document._URL;
        if (url !== null && url.length > 0) {
            newURL = this._document.encodingParseAURL(url);
            if (newURL === null) {
                throw DOMException.create(this._globalObject, [
                    `Could not parse url argument "${url}" to ${historyHandling}State() against base URL ` + `"${this._document.baseURLSerialized()}".`,
                    "SecurityError"
                ]);
            }
            if (!canHaveItsURLRewritten(this._document, newURL)) {
                throw DOMException.create(this._globalObject, [
                    `${historyHandling}State() cannot update history to the URL ${serializeURL(newURL)}.`,
                    "SecurityError"
                ]);
            }
        }
        // What follows is very unlike the spec's URL and history update steps. Maybe if we implement real session
        // history/navigation, we can fix that.
        if (historyHandling === "push") {
            this._window._sessionHistory.removeAllEntriesAfterCurrentEntry();
            this._window._sessionHistory.clearHistoryTraversalTasks();
            const newEntry = {
                document: this._document,
                stateObject: data,
                url: newURL
            };
            this._window._sessionHistory.addEntryAfterCurrentEntry(newEntry);
            this._window._sessionHistory.updateCurrentEntry(newEntry);
        } else {
            const { currentEntry } = this._window._sessionHistory;
            currentEntry.stateObject = data;
            currentEntry.url = newURL;
        }
        // TODO: If the current entry in the session history represents a non-GET request
        // (e.g. it was the result of a POST submission) then update it to instead represent
        // a GET request.
        this._document._URL = newURL;
        this._document._clearBaseURLCache();
        // arguably it's a bit odd that the state and latestEntry do not belong to the SessionHistory
        // but the spec gives them to "History" and "Document" respecively.
        this._state = data; // TODO clone again!! O_o
        this._document._latestEntry = this._window._sessionHistory.currentEntry;
    }
};
function canHaveItsURLRewritten(document, targetURL) {
    const documentURL = document._URL;
    if (targetURL.scheme !== documentURL.scheme || targetURL.username !== documentURL.username || targetURL.password !== documentURL.password || targetURL.host !== documentURL.host || targetURL.port !== documentURL.port) {
        return false;
    }
    if (targetURL.scheme === "https" || targetURL.scheme === "http") {
        return true;
    }
    if (targetURL.scheme === "file" && targetURL.path !== documentURL.path) {
        return false;
    }
    if (targetURL.path.join("/") !== documentURL.path.join("/") || targetURL.query !== documentURL.query) {
        return false;
    }
    return true;
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/window/navigation.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const whatwgURL = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const notImplemented = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/not-implemented.js [app-ssr] (ecmascript)");
const reportException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
exports.evaluateJavaScriptURL = (window, urlRecord)=>{
    const urlString = whatwgURL.serializeURL(urlRecord);
    const encodedScriptSource = urlString.substring("javascript:".length);
    const scriptSource = Buffer.from(whatwgURL.percentDecodeString(encodedScriptSource)).toString();
    if (window._runScripts === "dangerously") {
        try {
            return window.eval(scriptSource);
        } catch (e) {
            reportException(window, e, urlString);
        }
    }
    return undefined;
};
// https://html.spec.whatwg.org/#navigating-across-documents
exports.navigate = (window, newURL, flags)=>{
    // This is NOT a spec-compliant implementation of navigation in any way. It implements a few selective steps that
    // are nice for jsdom users, regarding hash changes and JavaScript URLs. Full navigation support is being worked on
    // and will likely require some additional hooks to be implemented.
    if (!window._document) {
        return;
    }
    const document = idlUtils.implForWrapper(window._document);
    const currentURL = document._URL;
    if (!flags.reloadTriggered && urlEquals(currentURL, newURL, {
        excludeFragments: true
    })) {
        if (newURL.fragment !== currentURL.fragment) {
            navigateToFragment(window, newURL, flags);
        }
        return;
    }
    // NOT IMPLEMENTED: Prompt to unload the active document of browsingContext.
    // NOT IMPLEMENTED: form submission algorithm
    // const navigationType = 'other';
    // NOT IMPLEMENTED: if resource is a response...
    if (newURL.scheme === "javascript") {
        setTimeout(()=>{
            const result = exports.evaluateJavaScriptURL(window, newURL);
            if (typeof result === "string") {
                notImplemented("string results from 'javascript:' URLs", window);
            }
        }, 0);
        return;
    }
    navigateFetch(window);
};
// https://html.spec.whatwg.org/#scroll-to-fragid
function navigateToFragment(window, newURL, flags) {
    const document = idlUtils.implForWrapper(window._document);
    window._sessionHistory.clearHistoryTraversalTasks();
    if (!flags.replacement) {
        // handling replacement=true here deviates from spec, but matches real browser behaviour
        // see https://github.com/whatwg/html/issues/2796 for spec bug
        window._sessionHistory.removeAllEntriesAfterCurrentEntry();
    }
    const newEntry = {
        document,
        url: newURL
    };
    window._sessionHistory.addEntryAfterCurrentEntry(newEntry);
    window._sessionHistory.traverseHistory(newEntry, {
        nonBlockingEvents: true,
        replacement: flags.replacement
    });
}
// https://html.spec.whatwg.org/#process-a-navigate-fetch
function navigateFetch(window) {
    // TODO:
    notImplemented("navigation (except hash changes)", window);
}
// https://url.spec.whatwg.org/#concept-url-equals
function urlEquals(a, b, flags) {
    const serializedA = whatwgURL.serializeURL(a, flags.excludeFragments);
    const serializedB = whatwgURL.serializeURL(b, flags.excludeFragments);
    return serializedA === serializedB;
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/window/Location-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const whatwgURL = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { navigate } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/window/navigation.js [app-ssr] (ecmascript)");
// Not implemented: use of entry settings object's API base URL in href setter, assign, and replace. Instead we just
// use the document base URL. The difference matters in the case of cross-frame calls.
exports.implementation = class LocationImpl {
    constructor(globalObject, args, privateData){
        this._relevantDocument = privateData.relevantDocument;
        this.url = null;
        this._globalObject = globalObject;
    }
    get _url() {
        return this._relevantDocument._URL;
    }
    _locationObjectSetterNavigate(url) {
        // Not implemented: extra steps here to determine replacement flag.
        return this._locationObjectNavigate(url);
    }
    _locationObjectNavigate(url, { replacement = false } = {}) {
        // Not implemented: the setup for calling navigate, which doesn't apply to our stub navigate anyway.
        navigate(this._relevantDocument._defaultView, url, {
            replacement,
            exceptionsEnabled: true
        });
    }
    toString() {
        return this.href;
    }
    get href() {
        return whatwgURL.serializeURL(this._url);
    }
    set href(v) {
        const newURL = whatwgURL.parseURL(v, {
            baseURL: this._relevantDocument.baseURL()
        });
        if (newURL === null) {
            throw new TypeError(`Could not parse "${v}" as a URL`);
        }
        this._locationObjectSetterNavigate(newURL);
    }
    get origin() {
        return whatwgURL.serializeURLOrigin(this._url);
    }
    get protocol() {
        return this._url.scheme + ":";
    }
    set protocol(v) {
        const copyURL = {
            ...this._url
        };
        const possibleFailure = whatwgURL.basicURLParse(v + ":", {
            url: copyURL,
            stateOverride: "scheme start"
        });
        if (possibleFailure === null) {
            throw new TypeError(`Could not parse the URL after setting the procol to "${v}"`);
        }
        if (copyURL.scheme !== "http" && copyURL.scheme !== "https") {
            return;
        }
        this._locationObjectSetterNavigate(copyURL);
    }
    get host() {
        const url = this._url;
        if (url.host === null) {
            return "";
        }
        if (url.port === null) {
            return whatwgURL.serializeHost(url.host);
        }
        return whatwgURL.serializeHost(url.host) + ":" + whatwgURL.serializeInteger(url.port);
    }
    set host(v) {
        const copyURL = {
            ...this._url
        };
        if (whatwgURL.hasAnOpaquePath(copyURL)) {
            return;
        }
        whatwgURL.basicURLParse(v, {
            url: copyURL,
            stateOverride: "host"
        });
        this._locationObjectSetterNavigate(copyURL);
    }
    get hostname() {
        if (this._url.host === null) {
            return "";
        }
        return whatwgURL.serializeHost(this._url.host);
    }
    set hostname(v) {
        const copyURL = {
            ...this._url
        };
        if (whatwgURL.hasAnOpaquePath(copyURL)) {
            return;
        }
        whatwgURL.basicURLParse(v, {
            url: copyURL,
            stateOverride: "hostname"
        });
        this._locationObjectSetterNavigate(copyURL);
    }
    get port() {
        if (this._url.port === null) {
            return "";
        }
        return whatwgURL.serializeInteger(this._url.port);
    }
    set port(v) {
        const copyURL = {
            ...this._url
        };
        if (whatwgURL.cannotHaveAUsernamePasswordPort(copyURL)) {
            return;
        }
        whatwgURL.basicURLParse(v, {
            url: copyURL,
            stateOverride: "port"
        });
        this._locationObjectSetterNavigate(copyURL);
    }
    get pathname() {
        return whatwgURL.serializePath(this._url);
    }
    set pathname(v) {
        const copyURL = {
            ...this._url
        };
        if (whatwgURL.hasAnOpaquePath(copyURL)) {
            return;
        }
        copyURL.path = [];
        whatwgURL.basicURLParse(v, {
            url: copyURL,
            stateOverride: "path start"
        });
        this._locationObjectSetterNavigate(copyURL);
    }
    get search() {
        if (this._url.query === null || this._url.query === "") {
            return "";
        }
        return "?" + this._url.query;
    }
    set search(v) {
        const copyURL = {
            ...this._url
        };
        if (v === "") {
            copyURL.query = null;
        } else {
            const input = v[0] === "?" ? v.substring(1) : v;
            copyURL.query = "";
            whatwgURL.basicURLParse(input, {
                url: copyURL,
                stateOverride: "query",
                encodingOverride: this._relevantDocument.charset
            });
        }
        this._locationObjectSetterNavigate(copyURL);
    }
    get hash() {
        if (this._url.fragment === null || this._url.fragment === "") {
            return "";
        }
        return "#" + this._url.fragment;
    }
    set hash(v) {
        const copyURL = {
            ...this._url
        };
        const input = v[0] === "#" ? v.substring(1) : v;
        copyURL.fragment = "";
        whatwgURL.basicURLParse(input, {
            url: copyURL,
            stateOverride: "fragment"
        });
        if (copyURL.fragment === this._url.fragment) {
            return;
        }
        this._locationObjectSetterNavigate(copyURL);
    }
    assign(url) {
        // Should be entry settings object; oh well
        const parsedURL = this._relevantDocument.encodingParseAURL(url);
        if (parsedURL === null) {
            throw DOMException.create(this._globalObject, [
                `Could not resolve the given string "${url}" relative to the base URL "${this._relevantDocument.URL}"`,
                "SyntaxError"
            ]);
        }
        this._locationObjectNavigate(parsedURL);
    }
    replace(url) {
        // Should be entry settings object; oh well
        const parsedURL = this._relevantDocument.encodingParseAURL(url);
        if (parsedURL === null) {
            throw DOMException.create(this._globalObject, [
                `Could not resolve the given string "${url}" relative to the base URL "${this._relevantDocument.URL}"`,
                "SyntaxError"
            ]);
        }
        this._locationObjectNavigate(parsedURL, {
            replacement: true
        });
    }
    reload() {
        const flags = {
            replace: true,
            reloadTriggered: true,
            exceptionsEnabled: true
        };
        navigate(this._relevantDocument._defaultView, this._url, flags);
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/window/BarProp-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://html.spec.whatwg.org/multipage/window-object.html#browser-interface-elements
class BarPropImpl {
}
// Since many BarProps do not apply to modern browsers,
// returning true in all cases seems to be common practice.
BarPropImpl.prototype.visible = true;
exports.implementation = BarPropImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/window/External-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://html.spec.whatwg.org/multipage/obsolete.html#dom-external
exports.implementation = class ExternalImpl {
    // The AddSearchProvider() and IsSearchProviderInstalled() methods must do nothing
    AddSearchProvider() {}
    IsSearchProviderInstalled() {}
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/window/Screen-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://drafts.csswg.org/cssom-view-1/#the-screen-interface
class ScreenImpl {
}
ScreenImpl.prototype.availWidth = 0;
ScreenImpl.prototype.availHeight = 0;
ScreenImpl.prototype.width = 0;
ScreenImpl.prototype.height = 0;
ScreenImpl.prototype.colorDepth = 24;
ScreenImpl.prototype.pixelDepth = 24;
exports.implementation = ScreenImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/window/SessionHistory.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const whatwgURL = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const HashChangeEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HashChangeEvent.js [app-ssr] (ecmascript)");
const PopStateEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/PopStateEvent.js [app-ssr] (ecmascript)");
const notImplemented = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/not-implemented.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
// https://html.spec.whatwg.org/#session-history
class SessionHistory {
    constructor(initialEntry, window){
        this._window = window;
        this._windowImpl = idlUtils.implForWrapper(window);
        this._historyTraversalQueue = new Set();
        this._entries = [
            initialEntry
        ];
        this._currentIndex = 0;
    }
    _queueHistoryTraversalTask(fn) {
        const timeoutId = this._window.setTimeout(()=>{
            this._historyTraversalQueue.delete(timeoutId);
            fn();
        }, 0);
        this._historyTraversalQueue.add(timeoutId);
    }
    clearHistoryTraversalTasks() {
        for (const timeoutId of this._historyTraversalQueue){
            this._window.clearTimeout(timeoutId);
        }
        this._historyTraversalQueue.clear();
    }
    get length() {
        return this._entries.length;
    }
    get currentEntry() {
        return this._entries[this._currentIndex];
    }
    // https://html.spec.whatwg.org/#dom-history-pushstate
    removeAllEntriesAfterCurrentEntry() {
        this._entries.splice(this._currentIndex + 1, Infinity);
    }
    // https://html.spec.whatwg.org/#traverse-the-history-by-a-delta
    traverseByDelta(delta) {
        this._queueHistoryTraversalTask(()=>{
            const newIndex = this._currentIndex + delta;
            if (newIndex < 0 || newIndex >= this.length) {
                return;
            }
            const specifiedEntry = this._entries[newIndex];
            // Not implemented: unload a document guard
            // Not clear that this should be queued. html/browsers/history/the-history-interface/004.html can be fixed
            // by removing the queue, but doing so breaks some tests in history.js that also pass in browsers.
            this._queueHistoryTraversalTask(()=>{
                // If there is an ongoing attempt to navigate specified browsing context that has not yet matured,
                // then cancel that attempt to navigate the browsing context.
                // Doing this seems to break tests involving navigating via push/pop state and via fragments. I think this
                // is because these navigations should already count as having "matured" because the document is not changing.
                // this.clearHistoryTraversalTasks();
                if (specifiedEntry.document !== this.currentEntry.document) {
                    // TODO: unload the active document with the recycle parameter set to false
                    notImplemented("Traversing history in a way that would change the window", this._window);
                }
                this.traverseHistory(specifiedEntry);
            });
        });
    }
    // https://html.spec.whatwg.org/#traverse-the-history
    traverseHistory(specifiedEntry, flags = {}) {
        if (!specifiedEntry.document) {
            // If entry no longer holds a Document object, then navigate the browsing context to entry's URL
            // to perform an entry update of entry, and abort these steps
            notImplemented("Traversing the history to an entry that no longer holds a Document object", this._window);
        }
        // Not spec compliant, just minimal. Lots of missing steps.
        const nonBlockingEvents = Boolean(flags.nonBlockingEvents);
        const document = idlUtils.implForWrapper(this._window._document);
        const { currentEntry } = this;
        // If the current entry's title was not set by the pushState() or replaceState() methods, then set its title
        // to the value returned by the document.title IDL attribute.
        if (currentEntry.title === undefined) {
            currentEntry.title = document.title;
        }
        if (specifiedEntry.document !== currentEntry.document) {
            // If entry has a different Document object than the current entry, then...
            notImplemented("Traversing the history to an entry with a different Document", this._window);
        }
        document._URL = specifiedEntry.url;
        const hashChanged = specifiedEntry.url.fragment !== currentEntry.url.fragment && specifiedEntry.document === currentEntry.document;
        let oldURL, newURL;
        if (hashChanged) {
            oldURL = currentEntry.url;
            newURL = specifiedEntry.url;
        }
        if (flags.replacement) {
            // If the traversal was initiated with replacement enabled, remove the entry immediately before the
            // specified entry in the session history.
            this._entries.splice(this._entries.indexOf(specifiedEntry) - 1, 1);
        }
        this.updateCurrentEntry(specifiedEntry);
        const state = specifiedEntry.stateObject; // TODO structured clone
        // arguably it's a bit odd that the state and latestEntry do not belong to the SessionHistory
        // but the spec gives them to "History" and "Document" respecively.
        document._history._state = state;
        const stateChanged = specifiedEntry.document._latestEntry !== specifiedEntry;
        specifiedEntry.document._latestEntry = specifiedEntry;
        const fireEvents = ()=>this._fireEvents(stateChanged, hashChanged, state, oldURL, newURL);
        if (nonBlockingEvents) {
            this._window.setTimeout(fireEvents, 0);
        } else {
            fireEvents();
        }
    }
    _fireEvents(stateChanged, hashChanged, state, oldURL, newURL) {
        if (stateChanged) {
            fireAnEvent("popstate", this._windowImpl, PopStateEvent, {
                state
            });
        }
        if (hashChanged) {
            fireAnEvent("hashchange", this._windowImpl, HashChangeEvent, {
                oldURL: whatwgURL.serializeURL(oldURL),
                newURL: whatwgURL.serializeURL(newURL)
            });
        }
    }
    addEntryAfterCurrentEntry(entry) {
        this._entries.splice(this._currentIndex + 1, 0, entry);
    }
    updateCurrentEntry(entry) {
        this._currentIndex = this._entries.indexOf(entry);
    }
}
module.exports = SessionHistory;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/traversal/helpers.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const conversions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)");
exports.FILTER_ACCEPT = 1; // NodeFilter.FILTER_ACCEPT
exports.FILTER_REJECT = 2; // NodeFilter.FILTER_REJECT
exports.FILTER_SKIP = 3; // NodeFilter.FILTER_SKIP
exports.filter = (nodeIteratorOrTreeWalkerImpl, nodeImpl)=>{
    if (nodeIteratorOrTreeWalkerImpl._active) {
        throw DOMException.create(nodeIteratorOrTreeWalkerImpl._globalObject, [
            "Recursive node filtering",
            "InvalidStateError"
        ]);
    }
    const n = nodeImpl.nodeType - 1;
    if (!(1 << n & nodeIteratorOrTreeWalkerImpl.whatToShow)) {
        return exports.FILTER_SKIP;
    }
    // Saving in a variable is important so we don't accidentally call it as a method later.
    const { filter } = nodeIteratorOrTreeWalkerImpl;
    if (filter === null) {
        return exports.FILTER_ACCEPT;
    }
    nodeIteratorOrTreeWalkerImpl._active = true;
    let result;
    // https://github.com/whatwg/dom/issues/494
    try {
        result = filter(nodeImpl);
    } finally{
        nodeIteratorOrTreeWalkerImpl._active = false;
    }
    result = conversions["unsigned short"](result);
    return result;
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/traversal/TreeWalker-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { filter, FILTER_ACCEPT, FILTER_REJECT, FILTER_SKIP } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/traversal/helpers.js [app-ssr] (ecmascript)");
const FIRST = false;
const LAST = true;
const NEXT = false;
const PREVIOUS = true;
exports.implementation = class TreeWalkerImpl {
    constructor(globalObject, args, privateData){
        this._active = false;
        this.root = privateData.root;
        this.currentNode = this.root;
        this.whatToShow = privateData.whatToShow;
        this.filter = privateData.filter;
        this._globalObject = globalObject;
    }
    get currentNode() {
        return this._currentNode;
    }
    set currentNode(node) {
        if (node === null) {
            throw DOMException.create(this._globalObject, [
                "Cannot set currentNode to null",
                "NotSupportedError"
            ]);
        }
        this._currentNode = node;
    }
    parentNode() {
        let node = this._currentNode;
        while(node !== null && node !== this.root){
            node = node.parentNode;
            if (node !== null && filter(this, node) === FILTER_ACCEPT) {
                return this._currentNode = node;
            }
        }
        return null;
    }
    firstChild() {
        return this._traverseChildren(FIRST);
    }
    lastChild() {
        return this._traverseChildren(LAST);
    }
    previousSibling() {
        return this._traverseSiblings(PREVIOUS);
    }
    nextSibling() {
        return this._traverseSiblings(NEXT);
    }
    previousNode() {
        let node = this._currentNode;
        while(node !== this.root){
            let sibling = node.previousSibling;
            while(sibling !== null){
                node = sibling;
                let result = filter(this, node);
                while(result !== FILTER_REJECT && node.hasChildNodes()){
                    node = node.lastChild;
                    result = filter(this, node);
                }
                if (result === FILTER_ACCEPT) {
                    return this._currentNode = node;
                }
                sibling = node.previousSibling;
            }
            if (node === this.root || node.parentNode === null) {
                return null;
            }
            node = node.parentNode;
            if (filter(this, node) === FILTER_ACCEPT) {
                return this._currentNode = node;
            }
        }
        return null;
    }
    nextNode() {
        let node = this._currentNode;
        let result = FILTER_ACCEPT;
        for(;;){
            while(result !== FILTER_REJECT && node.hasChildNodes()){
                node = node.firstChild;
                result = filter(this, node);
                if (result === FILTER_ACCEPT) {
                    return this._currentNode = node;
                }
            }
            do {
                if (node === this.root) {
                    return null;
                }
                const sibling = node.nextSibling;
                if (sibling !== null) {
                    node = sibling;
                    break;
                }
                node = node.parentNode;
            }while (node !== null)
            if (node === null) {
                return null;
            }
            result = filter(this, node);
            if (result === FILTER_ACCEPT) {
                return this._currentNode = node;
            }
        }
    }
    _traverseChildren(type) {
        let node = this._currentNode;
        node = type === FIRST ? node.firstChild : node.lastChild;
        if (node === null) {
            return null;
        }
        main: for(;;){
            const result = filter(this, node);
            if (result === FILTER_ACCEPT) {
                return this._currentNode = node;
            }
            if (result === FILTER_SKIP) {
                const child = type === FIRST ? node.firstChild : node.lastChild;
                if (child !== null) {
                    node = child;
                    continue;
                }
            }
            for(;;){
                const sibling = type === FIRST ? node.nextSibling : node.previousSibling;
                if (sibling !== null) {
                    node = sibling;
                    continue main;
                }
                const parent = node.parentNode;
                if (parent === null || parent === this.root || parent === this._currentNode) {
                    return null;
                }
                node = parent;
            }
        }
    }
    _traverseSiblings(type) {
        let node = this._currentNode;
        if (node === this.root) {
            return null;
        }
        for(;;){
            let sibling = type === NEXT ? node.nextSibling : node.previousSibling;
            while(sibling !== null){
                node = sibling;
                const result = filter(this, node);
                if (result === FILTER_ACCEPT) {
                    return this._currentNode = node;
                }
                sibling = type === NEXT ? node.firstChild : node.lastChild;
                if (result === FILTER_REJECT || sibling === null) {
                    sibling = type === NEXT ? node.nextSibling : node.previousSibling;
                }
            }
            node = node.parentNode;
            if (node === null || node === this.root) {
                return null;
            }
            if (filter(this, node) === FILTER_ACCEPT) {
                return null;
            }
        }
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/traversal/NodeIterator-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { filter, FILTER_ACCEPT } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/traversal/helpers.js [app-ssr] (ecmascript)");
exports.implementation = class NodeIteratorImpl {
    constructor(globalObject, args, privateData){
        this._active = false;
        this.root = privateData.root;
        this.whatToShow = privateData.whatToShow;
        this.filter = privateData.filter;
        this._referenceNode = this.root;
        this._pointerBeforeReferenceNode = true;
        this._globalObject = globalObject;
    }
    get referenceNode() {
        return this._referenceNode;
    }
    get pointerBeforeReferenceNode() {
        return this._pointerBeforeReferenceNode;
    }
    nextNode() {
        return this._traverse("next");
    }
    previousNode() {
        return this._traverse("previous");
    }
    detach() {
    // Intentionally do nothing, per spec.
    }
    // Called by Documents.
    _preRemovingSteps(toBeRemovedNode) {
        // Second clause is https://github.com/whatwg/dom/issues/496
        if (!toBeRemovedNode.contains(this._referenceNode) || toBeRemovedNode === this.root) {
            return;
        }
        if (this._pointerBeforeReferenceNode) {
            let next = null;
            let candidateForNext = domSymbolTree.following(toBeRemovedNode, {
                skipChildren: true
            });
            while(candidateForNext !== null){
                if (this.root.contains(candidateForNext)) {
                    next = candidateForNext;
                    break;
                }
                candidateForNext = domSymbolTree.following(candidateForNext, {
                    skipChildren: true
                });
            }
            if (next !== null) {
                this._referenceNode = next;
                return;
            }
            this._pointerBeforeReferenceNode = false;
        }
        const { previousSibling } = toBeRemovedNode;
        this._referenceNode = previousSibling === null ? toBeRemovedNode.parentNode : domSymbolTree.lastInclusiveDescendant(toBeRemovedNode.previousSibling);
    }
    _traverse(direction) {
        let node = this._referenceNode;
        let beforeNode = this._pointerBeforeReferenceNode;
        while(true){
            if (direction === "next") {
                if (!beforeNode) {
                    node = domSymbolTree.following(node, {
                        root: this.root
                    });
                    if (!node) {
                        return null;
                    }
                }
                beforeNode = false;
            } else if (direction === "previous") {
                if (beforeNode) {
                    node = domSymbolTree.preceding(node, {
                        root: this.root
                    });
                    if (!node) {
                        return null;
                    }
                }
                beforeNode = true;
            }
            const result = filter(this, node);
            if (result === FILTER_ACCEPT) {
                break;
            }
        }
        this._referenceNode = node;
        this._pointerBeforeReferenceNode = beforeNode;
        return node;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/range/boundary-point.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { nodeRoot, isFollowing, isInclusiveAncestor } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/node.js [app-ssr] (ecmascript)");
// Returns 0 if equal, +1 for after and -1 for before
// https://dom.spec.whatwg.org/#concept-range-bp-after
function compareBoundaryPointsPosition(bpA, bpB) {
    const { node: nodeA, offset: offsetA } = bpA;
    const { node: nodeB, offset: offsetB } = bpB;
    if (nodeRoot(nodeA) !== nodeRoot(nodeB)) {
        throw new Error(`Internal Error: Boundary points should have the same root!`);
    }
    if (nodeA === nodeB) {
        if (offsetA === offsetB) {
            return 0;
        } else if (offsetA < offsetB) {
            return -1;
        }
        return 1;
    }
    if (isFollowing(nodeA, nodeB)) {
        return compareBoundaryPointsPosition(bpB, bpA) === -1 ? 1 : -1;
    }
    if (isInclusiveAncestor(nodeA, nodeB)) {
        let child = nodeB;
        while(domSymbolTree.parent(child) !== nodeA){
            child = domSymbolTree.parent(child);
        }
        if (domSymbolTree.index(child) < offsetA) {
            return 1;
        }
    }
    return -1;
}
module.exports = {
    compareBoundaryPointsPosition
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/range/AbstractRange-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://dom.spec.whatwg.org/#abstractrange
class AbstractRangeImpl {
    constructor(globalObject, args, privateData){
        const { start, end } = privateData;
        this._start = start;
        this._end = end;
        this._globalObject = globalObject;
    }
    // https://dom.spec.whatwg.org/#dom-range-startcontainer
    get startContainer() {
        return this._start.node;
    }
    // https://dom.spec.whatwg.org/#dom-range-startoffset
    get startOffset() {
        return this._start.offset;
    }
    // https://dom.spec.whatwg.org/#dom-range-endcontainer
    get endContainer() {
        return this._end.node;
    }
    // https://dom.spec.whatwg.org/#dom-range-endoffset
    get endOffset() {
        return this._end.offset;
    }
    // https://dom.spec.whatwg.org/#dom-range-collapsed
    get collapsed() {
        const { _start, _end } = this;
        return _start.node === _end.node && _start.offset === _end.offset;
    }
}
module.exports = {
    implementation: AbstractRangeImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/range/Range-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { clone } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { parseFragment } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/parser/index.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { compareBoundaryPointsPosition } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/range/boundary-point.js [app-ssr] (ecmascript)");
const { nodeRoot, nodeLength, isInclusiveAncestor } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/node.js [app-ssr] (ecmascript)");
const { createElement } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-element.js [app-ssr] (ecmascript)");
const AbstractRangeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/range/AbstractRange-impl.js [app-ssr] (ecmascript)").implementation;
const Range = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Range.js [app-ssr] (ecmascript)");
const DocumentFragment = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DocumentFragment.js [app-ssr] (ecmascript)");
const { implForWrapper } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const RANGE_COMPARISON_TYPE = {
    START_TO_START: 0,
    START_TO_END: 1,
    END_TO_END: 2,
    END_TO_START: 3
};
class RangeImpl extends AbstractRangeImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        const defaultBoundaryPoint = {
            node: implForWrapper(globalObject._document),
            offset: 0
        };
        const { start = defaultBoundaryPoint, end = defaultBoundaryPoint } = privateData;
        this._setLiveRangeStart(start.node, start.offset);
        this._setLiveRangeEnd(end.node, end.offset);
    }
    // https://dom.spec.whatwg.org/#dom-range-commonancestorcontainer
    get commonAncestorContainer() {
        const { _start, _end } = this;
        for (const container of domSymbolTree.ancestorsIterator(_start.node)){
            if (isInclusiveAncestor(container, _end.node)) {
                return container;
            }
        }
        return null;
    }
    // https://dom.spec.whatwg.org/#dom-range-setstart
    setStart(node, offset) {
        setBoundaryPointStart(this, node, offset);
    }
    // https://dom.spec.whatwg.org/#dom-range-setend
    setEnd(node, offset) {
        setBoundaryPointEnd(this, node, offset);
    }
    // https://dom.spec.whatwg.org/#dom-range-setstartbefore
    setStartBefore(node) {
        const parent = domSymbolTree.parent(node);
        if (!parent) {
            throw DOMException.create(this._globalObject, [
                "The given Node has no parent.",
                "InvalidNodeTypeError"
            ]);
        }
        setBoundaryPointStart(this, parent, domSymbolTree.index(node));
    }
    // https://dom.spec.whatwg.org/#dom-range-setstartafter
    setStartAfter(node) {
        const parent = domSymbolTree.parent(node);
        if (!parent) {
            throw DOMException.create(this._globalObject, [
                "The given Node has no parent.",
                "InvalidNodeTypeError"
            ]);
        }
        setBoundaryPointStart(this, parent, domSymbolTree.index(node) + 1);
    }
    // https://dom.spec.whatwg.org/#dom-range-setendbefore
    setEndBefore(node) {
        const parent = domSymbolTree.parent(node);
        if (!parent) {
            throw DOMException.create(this._globalObject, [
                "The given Node has no parent.",
                "InvalidNodeTypeError"
            ]);
        }
        setBoundaryPointEnd(this, parent, domSymbolTree.index(node));
    }
    // https://dom.spec.whatwg.org/#dom-range-setendafter
    setEndAfter(node) {
        const parent = domSymbolTree.parent(node);
        if (!parent) {
            throw DOMException.create(this._globalObject, [
                "The given Node has no parent.",
                "InvalidNodeTypeError"
            ]);
        }
        setBoundaryPointEnd(this, parent, domSymbolTree.index(node) + 1);
    }
    // https://dom.spec.whatwg.org/#dom-range-collapse
    collapse(toStart) {
        if (toStart) {
            this._setLiveRangeEnd(this._start.node, this._start.offset);
        } else {
            this._setLiveRangeStart(this._end.node, this._end.offset);
        }
    }
    // https://dom.spec.whatwg.org/#dom-range-selectnode
    selectNode(node) {
        selectNodeWithinRange(node, this);
    }
    // https://dom.spec.whatwg.org/#dom-range-selectnodecontents
    selectNodeContents(node) {
        if (node.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) {
            throw DOMException.create(this._globalObject, [
                "DocumentType Node can't be used as boundary point.",
                "InvalidNodeTypeError"
            ]);
        }
        const length = nodeLength(node);
        this._setLiveRangeStart(node, 0);
        this._setLiveRangeEnd(node, length);
    }
    // https://dom.spec.whatwg.org/#dom-range-compareboundarypoints
    compareBoundaryPoints(how, sourceRange) {
        if (how !== RANGE_COMPARISON_TYPE.START_TO_START && how !== RANGE_COMPARISON_TYPE.START_TO_END && how !== RANGE_COMPARISON_TYPE.END_TO_END && how !== RANGE_COMPARISON_TYPE.END_TO_START) {
            const message = "The comparison method provided must be one of 'START_TO_START', 'START_TO_END', 'END_TO_END', " + "or 'END_TO_START'.";
            throw DOMException.create(this._globalObject, [
                message,
                "NotSupportedError"
            ]);
        }
        if (this._root !== sourceRange._root) {
            throw DOMException.create(this._globalObject, [
                "The two Ranges are not in the same tree.",
                "WrongDocumentError"
            ]);
        }
        let thisPoint, otherPoint;
        if (how === RANGE_COMPARISON_TYPE.START_TO_START) {
            thisPoint = this._start;
            otherPoint = sourceRange._start;
        } else if (how === RANGE_COMPARISON_TYPE.START_TO_END) {
            thisPoint = this._end;
            otherPoint = sourceRange._start;
        } else if (how === RANGE_COMPARISON_TYPE.END_TO_END) {
            thisPoint = this._end;
            otherPoint = sourceRange._end;
        } else {
            thisPoint = this._start;
            otherPoint = sourceRange._end;
        }
        return compareBoundaryPointsPosition(thisPoint, otherPoint);
    }
    // https://dom.spec.whatwg.org/#dom-range-deletecontents
    deleteContents() {
        if (this.collapsed) {
            return;
        }
        const { _start: originalStart, _end: originalEnd } = this;
        if (originalStart.node === originalEnd.node && (originalStart.node.nodeType === NODE_TYPE.TEXT_NODE || originalStart.node.nodeType === NODE_TYPE.PROCESSING_INSTRUCTION_NODE || originalStart.node.nodeType === NODE_TYPE.COMMENT_NODE)) {
            originalStart.node.replaceData(originalStart.offset, originalEnd.offset - originalStart.offset, "");
            return;
        }
        const nodesToRemove = [];
        let currentNode = this._start.node;
        const endNode = nextNodeDescendant(this._end.node);
        while(currentNode && currentNode !== endNode){
            if (isContained(currentNode, this) && !isContained(domSymbolTree.parent(currentNode), this)) {
                nodesToRemove.push(currentNode);
            }
            currentNode = domSymbolTree.following(currentNode);
        }
        let newNode, newOffset;
        if (isInclusiveAncestor(originalStart.node, originalEnd.node)) {
            newNode = originalStart.node;
            newOffset = originalStart.offset;
        } else {
            let referenceNode = originalStart.node;
            while(referenceNode && !isInclusiveAncestor(domSymbolTree.parent(referenceNode), originalEnd.node)){
                referenceNode = domSymbolTree.parent(referenceNode);
            }
            newNode = domSymbolTree.parent(referenceNode);
            newOffset = domSymbolTree.index(referenceNode) + 1;
        }
        if (originalStart.node.nodeType === NODE_TYPE.TEXT_NODE || originalStart.node.nodeType === NODE_TYPE.PROCESSING_INSTRUCTION_NODE || originalStart.node.nodeType === NODE_TYPE.COMMENT_NODE) {
            originalStart.node.replaceData(originalStart.offset, nodeLength(originalStart.node) - originalStart.offset, "");
        }
        for (const node of nodesToRemove){
            const parent = domSymbolTree.parent(node);
            parent.removeChild(node);
        }
        if (originalEnd.node.nodeType === NODE_TYPE.TEXT_NODE || originalEnd.node.nodeType === NODE_TYPE.PROCESSING_INSTRUCTION_NODE || originalEnd.node.nodeType === NODE_TYPE.COMMENT_NODE) {
            originalEnd.node.replaceData(0, originalEnd.offset, "");
        }
        this._setLiveRangeStart(newNode, newOffset);
        this._setLiveRangeEnd(newNode, newOffset);
    }
    // https://dom.spec.whatwg.org/#dom-range-extractcontents
    extractContents() {
        return extractRange(this);
    }
    // https://dom.spec.whatwg.org/#dom-range-clonecontents
    cloneContents() {
        return cloneRange(this);
    }
    // https://dom.spec.whatwg.org/#dom-range-insertnode
    insertNode(node) {
        insertNodeInRange(node, this);
    }
    // https://dom.spec.whatwg.org/#dom-range-surroundcontents
    surroundContents(newParent) {
        let node = this.commonAncestorContainer;
        const endNode = nextNodeDescendant(node);
        while(node !== endNode){
            if (node.nodeType !== NODE_TYPE.TEXT_NODE && isPartiallyContained(node, this)) {
                throw DOMException.create(this._globalObject, [
                    "The Range has partially contains a non-Text node.",
                    "InvalidStateError"
                ]);
            }
            node = domSymbolTree.following(node);
        }
        if (newParent.nodeType === NODE_TYPE.DOCUMENT_NODE || newParent.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE || newParent.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE) {
            throw DOMException.create(this._globalObject, [
                "Invalid element type.",
                "InvalidNodeTypeError"
            ]);
        }
        const fragment = extractRange(this);
        while(domSymbolTree.firstChild(newParent)){
            newParent.removeChild(domSymbolTree.firstChild(newParent));
        }
        insertNodeInRange(newParent, this);
        newParent.appendChild(fragment);
        selectNodeWithinRange(newParent, this);
    }
    // https://dom.spec.whatwg.org/#dom-range-clonerange
    cloneRange() {
        const { _start, _end, _globalObject } = this;
        return Range.createImpl(_globalObject, [], {
            start: {
                node: _start.node,
                offset: _start.offset
            },
            end: {
                node: _end.node,
                offset: _end.offset
            }
        });
    }
    // https://dom.spec.whatwg.org/#dom-range-detach
    detach() {
    // Do nothing by spec!
    }
    // https://dom.spec.whatwg.org/#dom-range-ispointinrange
    isPointInRange(node, offset) {
        if (nodeRoot(node) !== this._root) {
            return false;
        }
        validateSetBoundaryPoint(node, offset);
        const bp = {
            node,
            offset
        };
        if (compareBoundaryPointsPosition(bp, this._start) === -1 || compareBoundaryPointsPosition(bp, this._end) === 1) {
            return false;
        }
        return true;
    }
    // https://dom.spec.whatwg.org/#dom-range-comparepoint
    comparePoint(node, offset) {
        if (nodeRoot(node) !== this._root) {
            throw DOMException.create(this._globalObject, [
                "The given Node and the Range are not in the same tree.",
                "WrongDocumentError"
            ]);
        }
        validateSetBoundaryPoint(node, offset);
        const bp = {
            node,
            offset
        };
        if (compareBoundaryPointsPosition(bp, this._start) === -1) {
            return -1;
        } else if (compareBoundaryPointsPosition(bp, this._end) === 1) {
            return 1;
        }
        return 0;
    }
    // https://dom.spec.whatwg.org/#dom-range-intersectsnode
    intersectsNode(node) {
        if (nodeRoot(node) !== this._root) {
            return false;
        }
        const parent = domSymbolTree.parent(node);
        if (!parent) {
            return true;
        }
        const offset = domSymbolTree.index(node);
        return compareBoundaryPointsPosition({
            node: parent,
            offset
        }, this._end) === -1 && compareBoundaryPointsPosition({
            node: parent,
            offset: offset + 1
        }, this._start) === 1;
    }
    // https://dom.spec.whatwg.org/#dom-range-stringifier
    toString() {
        let s = "";
        const { _start, _end } = this;
        if (_start.node === _end.node && _start.node.nodeType === NODE_TYPE.TEXT_NODE) {
            return _start.node.data.slice(_start.offset, _end.offset);
        }
        if (_start.node.nodeType === NODE_TYPE.TEXT_NODE) {
            s += _start.node.data.slice(_start.offset);
        }
        let currentNode = _start.node;
        const endNode = nextNodeDescendant(_end.node);
        while(currentNode && currentNode !== endNode){
            if (currentNode.nodeType === NODE_TYPE.TEXT_NODE && isContained(currentNode, this)) {
                s += currentNode.data;
            }
            currentNode = domSymbolTree.following(currentNode);
        }
        if (_end.node.nodeType === NODE_TYPE.TEXT_NODE) {
            s += _end.node.data.slice(0, _end.offset);
        }
        return s;
    }
    // https://w3c.github.io/DOM-Parsing/#dom-range-createcontextualfragment
    createContextualFragment(fragment) {
        const { node } = this._start;
        let element;
        switch(node.nodeType){
            case NODE_TYPE.DOCUMENT_NODE:
            case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
                element = null;
                break;
            case NODE_TYPE.ELEMENT_NODE:
                element = node;
                break;
            case NODE_TYPE.TEXT_NODE:
            case NODE_TYPE.COMMENT_NODE:
                element = node.parentElement;
                break;
            default:
                throw new Error("Internal error: Invalid range start node");
        }
        if (element === null || element._ownerDocument._parsingMode === "html" && element._localName === "html" && element._namespaceURI === HTML_NS) {
            element = createElement(node._ownerDocument, "body", HTML_NS);
        }
        return parseFragment(fragment, element);
    }
    // https://dom.spec.whatwg.org/#concept-range-root
    get _root() {
        return nodeRoot(this._start.node);
    }
    _setLiveRangeStart(node, offset) {
        if (this._start && this._start.node !== node && this._start.node !== this._end.node) {
            this._start.node._referencedRanges.delete(this);
        }
        if (!node._referencedRanges.has(this)) {
            node._referencedRanges.add(this);
        }
        this._start = {
            node,
            offset
        };
    }
    _setLiveRangeEnd(node, offset) {
        if (this._end && this._end.node !== node && this._end.node !== this._start.node) {
            this._end.node._referencedRanges.delete(this);
        }
        if (!node._referencedRanges.has(this)) {
            node._referencedRanges.add(this);
        }
        this._end = {
            node,
            offset
        };
    }
}
function nextNodeDescendant(node) {
    while(node && !domSymbolTree.nextSibling(node)){
        node = domSymbolTree.parent(node);
    }
    if (!node) {
        return null;
    }
    return domSymbolTree.nextSibling(node);
}
// https://dom.spec.whatwg.org/#concept-range-bp-set
function validateSetBoundaryPoint(node, offset) {
    if (node.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) {
        throw DOMException.create(node._globalObject, [
            "DocumentType Node can't be used as boundary point.",
            "InvalidNodeTypeError"
        ]);
    }
    if (offset > nodeLength(node)) {
        throw DOMException.create(node._globalObject, [
            "Offset out of bound.",
            "IndexSizeError"
        ]);
    }
}
function setBoundaryPointStart(range, node, offset) {
    validateSetBoundaryPoint(node, offset);
    const bp = {
        node,
        offset
    };
    if (nodeRoot(node) !== range._root || compareBoundaryPointsPosition(bp, range._end) === 1) {
        range._setLiveRangeEnd(node, offset);
    }
    range._setLiveRangeStart(node, offset);
}
function setBoundaryPointEnd(range, node, offset) {
    validateSetBoundaryPoint(node, offset);
    const bp = {
        node,
        offset
    };
    if (nodeRoot(node) !== range._root || compareBoundaryPointsPosition(bp, range._start) === -1) {
        range._setLiveRangeStart(node, offset);
    }
    range._setLiveRangeEnd(node, offset);
}
// https://dom.spec.whatwg.org/#concept-range-select
function selectNodeWithinRange(node, range) {
    const parent = domSymbolTree.parent(node);
    if (!parent) {
        throw DOMException.create(node._globalObject, [
            "The given Node has no parent.",
            "InvalidNodeTypeError"
        ]);
    }
    const index = domSymbolTree.index(node);
    range._setLiveRangeStart(parent, index);
    range._setLiveRangeEnd(parent, index + 1);
}
// https://dom.spec.whatwg.org/#contained
function isContained(node, range) {
    const { _start, _end } = range;
    return compareBoundaryPointsPosition({
        node,
        offset: 0
    }, _start) === 1 && compareBoundaryPointsPosition({
        node,
        offset: nodeLength(node)
    }, _end) === -1;
}
// https://dom.spec.whatwg.org/#partially-contained
function isPartiallyContained(node, range) {
    const { _start, _end } = range;
    return isInclusiveAncestor(node, _start.node) && !isInclusiveAncestor(node, _end.node) || !isInclusiveAncestor(node, _start.node) && isInclusiveAncestor(node, _end.node);
}
// https://dom.spec.whatwg.org/#concept-range-insert
function insertNodeInRange(node, range) {
    const { node: startNode, offset: startOffset } = range._start;
    if (startNode.nodeType === NODE_TYPE.PROCESSING_INSTRUCTION_NODE || startNode.nodeType === NODE_TYPE.COMMENT_NODE || startNode.nodeType === NODE_TYPE.TEXT_NODE && !domSymbolTree.parent(startNode) || node === startNode) {
        throw DOMException.create(node._globalObject, [
            "Invalid start node.",
            "HierarchyRequestError"
        ]);
    }
    let referenceNode = startNode.nodeType === NODE_TYPE.TEXT_NODE ? startNode : domSymbolTree.childrenToArray(startNode)[startOffset] || null;
    const parent = !referenceNode ? startNode : domSymbolTree.parent(referenceNode);
    parent._preInsertValidity(node, referenceNode);
    if (startNode.nodeType === NODE_TYPE.TEXT_NODE) {
        referenceNode = startNode.splitText(startOffset);
    }
    if (node === referenceNode) {
        referenceNode = domSymbolTree.nextSibling(referenceNode);
    }
    const nodeParent = domSymbolTree.parent(node);
    if (nodeParent) {
        nodeParent.removeChild(node);
    }
    let newOffset = !referenceNode ? nodeLength(parent) : domSymbolTree.index(referenceNode);
    newOffset += node.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE ? nodeLength(node) : 1;
    parent.insertBefore(node, referenceNode);
    if (range.collapsed) {
        range._setLiveRangeEnd(parent, newOffset);
    }
}
// https://dom.spec.whatwg.org/#concept-range-clone
function cloneRange(range) {
    const { _start: originalStart, _end: originalEnd, _globalObject } = range;
    const fragment = DocumentFragment.createImpl(_globalObject, [], {
        ownerDocument: originalStart.node._ownerDocument
    });
    if (range.collapsed) {
        return fragment;
    }
    if (originalStart.node === originalEnd.node && (originalStart.node.nodeType === NODE_TYPE.TEXT_NODE || originalStart.node.nodeType === NODE_TYPE.PROCESSING_INSTRUCTION_NODE || originalStart.node.nodeType === NODE_TYPE.COMMENT_NODE)) {
        const cloned = clone(originalStart.node);
        cloned._data = cloned.substringData(originalStart.offset, originalEnd.offset - originalStart.offset);
        fragment.appendChild(cloned);
        return fragment;
    }
    let commonAncestor = originalStart.node;
    while(!isInclusiveAncestor(commonAncestor, originalEnd.node)){
        commonAncestor = domSymbolTree.parent(commonAncestor);
    }
    let firstPartialContainedChild = null;
    if (!isInclusiveAncestor(originalStart.node, originalEnd.node)) {
        let candidate = domSymbolTree.firstChild(commonAncestor);
        while(!firstPartialContainedChild){
            if (isPartiallyContained(candidate, range)) {
                firstPartialContainedChild = candidate;
            }
            candidate = domSymbolTree.nextSibling(candidate);
        }
    }
    let lastPartiallyContainedChild = null;
    if (!isInclusiveAncestor(originalEnd.node, originalStart.node)) {
        let candidate = domSymbolTree.lastChild(commonAncestor);
        while(!lastPartiallyContainedChild){
            if (isPartiallyContained(candidate, range)) {
                lastPartiallyContainedChild = candidate;
            }
            candidate = domSymbolTree.previousSibling(candidate);
        }
    }
    const containedChildren = domSymbolTree.childrenToArray(commonAncestor).filter((node)=>isContained(node, range));
    const hasDoctypeChildren = containedChildren.some((node)=>node.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE);
    if (hasDoctypeChildren) {
        throw DOMException.create(range._globalObject, [
            "Invalid document type element.",
            "HierarchyRequestError"
        ]);
    }
    if (firstPartialContainedChild !== null && (firstPartialContainedChild.nodeType === NODE_TYPE.TEXT_NODE || firstPartialContainedChild.nodeType === NODE_TYPE.PROCESSING_INSTRUCTION_NODE || firstPartialContainedChild.nodeType === NODE_TYPE.COMMENT_NODE)) {
        const cloned = clone(originalStart.node);
        cloned._data = cloned.substringData(originalStart.offset, nodeLength(originalStart.node) - originalStart.offset);
        fragment.appendChild(cloned);
    } else if (firstPartialContainedChild !== null) {
        const cloned = clone(firstPartialContainedChild);
        fragment.appendChild(cloned);
        const subrange = Range.createImpl(_globalObject, [], {
            start: {
                node: originalStart.node,
                offset: originalStart.offset
            },
            end: {
                node: firstPartialContainedChild,
                offset: nodeLength(firstPartialContainedChild)
            }
        });
        const subfragment = cloneRange(subrange);
        cloned.appendChild(subfragment);
    }
    for (const containedChild of containedChildren){
        const cloned = clone(containedChild, undefined, true);
        fragment.appendChild(cloned);
    }
    if (lastPartiallyContainedChild !== null && (lastPartiallyContainedChild.nodeType === NODE_TYPE.TEXT_NODE || lastPartiallyContainedChild.nodeType === NODE_TYPE.PROCESSING_INSTRUCTION_NODE || lastPartiallyContainedChild.nodeType === NODE_TYPE.COMMENT_NODE)) {
        const cloned = clone(originalEnd.node);
        cloned._data = cloned.substringData(0, originalEnd.offset);
        fragment.appendChild(cloned);
    } else if (lastPartiallyContainedChild !== null) {
        const cloned = clone(lastPartiallyContainedChild);
        fragment.appendChild(cloned);
        const subrange = Range.createImpl(_globalObject, [], {
            start: {
                node: lastPartiallyContainedChild,
                offset: 0
            },
            end: {
                node: originalEnd.node,
                offset: originalEnd.offset
            }
        });
        const subfragment = cloneRange(subrange);
        cloned.appendChild(subfragment);
    }
    return fragment;
}
// https://dom.spec.whatwg.org/#concept-range-extract
function extractRange(range) {
    const { _start: originalStart, _end: originalEnd, _globalObject } = range;
    const fragment = DocumentFragment.createImpl(_globalObject, [], {
        ownerDocument: originalStart.node._ownerDocument
    });
    if (range.collapsed) {
        return fragment;
    }
    if (originalStart.node === originalEnd.node && (originalStart.node.nodeType === NODE_TYPE.TEXT_NODE || originalStart.node.nodeType === NODE_TYPE.PROCESSING_INSTRUCTION_NODE || originalStart.node.nodeType === NODE_TYPE.COMMENT_NODE)) {
        const cloned = clone(originalStart.node);
        cloned._data = cloned.substringData(originalStart.offset, originalEnd.offset - originalStart.offset);
        fragment.appendChild(cloned);
        originalStart.node.replaceData(originalStart.offset, originalEnd.offset - originalStart.offset, "");
        return fragment;
    }
    let commonAncestor = originalStart.node;
    while(!isInclusiveAncestor(commonAncestor, originalEnd.node)){
        commonAncestor = domSymbolTree.parent(commonAncestor);
    }
    let firstPartialContainedChild = null;
    if (!isInclusiveAncestor(originalStart.node, originalEnd.node)) {
        let candidate = domSymbolTree.firstChild(commonAncestor);
        while(!firstPartialContainedChild){
            if (isPartiallyContained(candidate, range)) {
                firstPartialContainedChild = candidate;
            }
            candidate = domSymbolTree.nextSibling(candidate);
        }
    }
    let lastPartiallyContainedChild = null;
    if (!isInclusiveAncestor(originalEnd.node, originalStart.node)) {
        let candidate = domSymbolTree.lastChild(commonAncestor);
        while(!lastPartiallyContainedChild){
            if (isPartiallyContained(candidate, range)) {
                lastPartiallyContainedChild = candidate;
            }
            candidate = domSymbolTree.previousSibling(candidate);
        }
    }
    const containedChildren = domSymbolTree.childrenToArray(commonAncestor).filter((node)=>isContained(node, range));
    const hasDoctypeChildren = containedChildren.some((node)=>node.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE);
    if (hasDoctypeChildren) {
        throw DOMException.create(range._globalObject, [
            "Invalid document type element.",
            "HierarchyRequestError"
        ]);
    }
    let newNode, newOffset;
    if (isInclusiveAncestor(originalStart.node, originalEnd.node)) {
        newNode = originalStart.node;
        newOffset = originalStart.offset;
    } else {
        let referenceNode = originalStart.node;
        while(referenceNode && !isInclusiveAncestor(domSymbolTree.parent(referenceNode), originalEnd.node)){
            referenceNode = domSymbolTree.parent(referenceNode);
        }
        newNode = domSymbolTree.parent(referenceNode);
        newOffset = domSymbolTree.index(referenceNode) + 1;
    }
    if (firstPartialContainedChild !== null && (firstPartialContainedChild.nodeType === NODE_TYPE.TEXT_NODE || firstPartialContainedChild.nodeType === NODE_TYPE.PROCESSING_INSTRUCTION_NODE || firstPartialContainedChild.nodeType === NODE_TYPE.COMMENT_NODE)) {
        const cloned = clone(originalStart.node);
        cloned._data = cloned.substringData(originalStart.offset, nodeLength(originalStart.node) - originalStart.offset);
        fragment.appendChild(cloned);
        originalStart.node.replaceData(originalStart.offset, nodeLength(originalStart.node) - originalStart.offset, "");
    } else if (firstPartialContainedChild !== null) {
        const cloned = clone(firstPartialContainedChild);
        fragment.appendChild(cloned);
        const subrange = Range.createImpl(_globalObject, [], {
            start: {
                node: originalStart.node,
                offset: originalStart.offset
            },
            end: {
                node: firstPartialContainedChild,
                offset: nodeLength(firstPartialContainedChild)
            }
        });
        const subfragment = extractRange(subrange);
        cloned.appendChild(subfragment);
    }
    for (const containedChild of containedChildren){
        fragment.appendChild(containedChild);
    }
    if (lastPartiallyContainedChild !== null && (lastPartiallyContainedChild.nodeType === NODE_TYPE.TEXT_NODE || lastPartiallyContainedChild.nodeType === NODE_TYPE.PROCESSING_INSTRUCTION_NODE || lastPartiallyContainedChild.nodeType === NODE_TYPE.COMMENT_NODE)) {
        const cloned = clone(originalEnd.node);
        cloned._data = cloned.substringData(0, originalEnd.offset);
        fragment.appendChild(cloned);
        originalEnd.node.replaceData(0, originalEnd.offset, "");
    } else if (lastPartiallyContainedChild !== null) {
        const cloned = clone(lastPartiallyContainedChild);
        fragment.appendChild(cloned);
        const subrange = Range.createImpl(_globalObject, [], {
            start: {
                node: lastPartiallyContainedChild,
                offset: 0
            },
            end: {
                node: originalEnd.node,
                offset: originalEnd.offset
            }
        });
        const subfragment = extractRange(subrange);
        cloned.appendChild(subfragment);
    }
    range._setLiveRangeStart(newNode, newOffset);
    range._setLiveRangeEnd(newNode, newOffset);
    return fragment;
}
module.exports = {
    implementation: RangeImpl,
    setBoundaryPointStart,
    setBoundaryPointEnd
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/range/StaticRange-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const AbstractRangeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/range/AbstractRange-impl.js [app-ssr] (ecmascript)").implementation;
// https://dom.spec.whatwg.org/#staticrange
class StaticRangeImpl extends AbstractRangeImpl {
    // https://dom.spec.whatwg.org/#dom-staticrange-staticrange
    constructor(globalObject, args){
        const { startContainer, startOffset, endContainer, endOffset } = args[0];
        if (startContainer.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE || startContainer.nodeType === NODE_TYPE.ATTRIBUTE_NODE || endContainer.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE || endContainer.nodeType === NODE_TYPE.ATTRIBUTE_NODE) {
            throw DOMException.create(globalObject, [
                "The supplied node is incorrect.",
                "InvalidNodeTypeError"
            ]);
        }
        super(globalObject, [], {
            start: {
                node: startContainer,
                offset: startOffset
            },
            end: {
                node: endContainer,
                offset: endOffset
            }
        });
    }
}
module.exports = {
    implementation: StaticRangeImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/custom-elements/ElementInternals-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { getLabelsForLabelable } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
class ElementInternalsImpl {
    constructor(globalObject, args, { targetElement }){
        this._targetElement = targetElement;
    }
    get shadowRoot() {
        const shadow = this._targetElement._shadowRoot;
        if (!shadow || !shadow._availableToElementInternals) {
            return null;
        }
        return shadow;
    }
    get labels() {
        if (!this._targetElement._ceDefinition.formAssociated) {
            throw DOMException.create(this._targetElement._globalObject, [
                "Accesing an ElementInternal's labels property is only supported for form-associated custom elements",
                "NotSupportedError"
            ]);
        }
        return getLabelsForLabelable(this._targetElement);
    }
    // https://html.spec.whatwg.org/#reflecting-content-attributes-in-idl-attributes
    _reflectGetTheElement() {
        return this._targetElement;
    }
    _reflectGetTheContentAttribute(reflectedContentAttributeName) {
        return this._targetElement._internalContentAttributeMap.get(reflectedContentAttributeName) ?? null;
    }
    _reflectSetTheContentAttribute(reflectedContentAttributeName, value) {
        this._targetElement._internalContentAttributeMap.set(reflectedContentAttributeName, value);
    }
    _reflectDeleteTheContentAttribute(reflectedContentAttributeName) {
        this._targetElement._internalContentAttributeMap.delete(reflectedContentAttributeName);
    }
}
module.exports = {
    implementation: ElementInternalsImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/custom-elements/CustomElementRegistry-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const webIDLConversions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { getHTMLElementInterface } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-element.js [app-ssr] (ecmascript)");
const { shadowIncludingInclusiveDescendantsIterator } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/shadow-dom.js [app-ssr] (ecmascript)");
const { isValidCustomElementName, tryUpgradeElement, enqueueCEUpgradeReaction } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/custom-elements.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const IDLFunction = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Function.js [app-ssr] (ecmascript)");
const HTMLUnknownElement = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLUnknownElement.js [app-ssr] (ecmascript)");
const LIFECYCLE_CALLBACKS = [
    "connectedCallback",
    "disconnectedCallback",
    "adoptedCallback",
    "attributeChangedCallback"
];
function convertToSequenceDOMString(obj) {
    if (!obj || !obj[Symbol.iterator]) {
        throw new TypeError("Invalid Sequence");
    }
    return Array.from(obj, webIDLConversions.DOMString);
}
// Returns true is the passed value is a valid constructor.
// Borrowed from: https://stackoverflow.com/a/39336206/3832710
function isConstructor(value) {
    if (typeof value !== "function") {
        return false;
    }
    try {
        const P = new Proxy(value, {
            construct () {
                return {};
            }
        });
        // eslint-disable-next-line no-new
        new P();
        return true;
    } catch  {
        return false;
    }
}
// https://html.spec.whatwg.org/#customelementregistry
class CustomElementRegistryImpl {
    constructor(globalObject){
        this._customElementDefinitions = [];
        this._elementDefinitionIsRunning = false;
        this._whenDefinedPromiseMap = Object.create(null);
        this._globalObject = globalObject;
    }
    // https://html.spec.whatwg.org/#dom-customelementregistry-define
    define(name, constructor, options) {
        const { _globalObject } = this;
        const ctor = constructor.objectReference;
        if (!isConstructor(ctor)) {
            throw new TypeError("Constructor argument is not a constructor.");
        }
        if (!isValidCustomElementName(name)) {
            throw DOMException.create(_globalObject, [
                "Name argument is not a valid custom element name.",
                "SyntaxError"
            ]);
        }
        const nameAlreadyRegistered = this._customElementDefinitions.some((entry)=>entry.name === name);
        if (nameAlreadyRegistered) {
            throw DOMException.create(_globalObject, [
                "This name has already been registered in the registry.",
                "NotSupportedError"
            ]);
        }
        const ctorAlreadyRegistered = this._customElementDefinitions.some((entry)=>entry.objectReference === ctor);
        if (ctorAlreadyRegistered) {
            throw DOMException.create(_globalObject, [
                "This constructor has already been registered in the registry.",
                "NotSupportedError"
            ]);
        }
        let localName = name;
        let extendsOption = null;
        if (options !== undefined && options.extends) {
            extendsOption = options.extends;
        }
        if (extendsOption !== null) {
            if (isValidCustomElementName(extendsOption)) {
                throw DOMException.create(_globalObject, [
                    "Option extends value can't be a valid custom element name.",
                    "NotSupportedError"
                ]);
            }
            const extendsInterface = getHTMLElementInterface(extendsOption);
            if (extendsInterface === HTMLUnknownElement) {
                throw DOMException.create(_globalObject, [
                    `${extendsOption} is an HTMLUnknownElement.`,
                    "NotSupportedError"
                ]);
            }
            localName = extendsOption;
        }
        if (this._elementDefinitionIsRunning) {
            throw DOMException.create(_globalObject, [
                "Invalid nested custom element definition.",
                "NotSupportedError"
            ]);
        }
        this._elementDefinitionIsRunning = true;
        let disableInternals = false;
        let disableShadow = false;
        let observedAttributes = [];
        let formAssociated = false;
        const lifecycleCallbacks = {
            connectedCallback: null,
            disconnectedCallback: null,
            adoptedCallback: null,
            attributeChangedCallback: null
        };
        let caughtError;
        try {
            const { prototype } = ctor;
            if (typeof prototype !== "object") {
                throw new TypeError("Invalid constructor prototype.");
            }
            for (const callbackName of LIFECYCLE_CALLBACKS){
                const callbackValue = prototype[callbackName];
                if (callbackValue !== undefined) {
                    lifecycleCallbacks[callbackName] = IDLFunction.convert(_globalObject, callbackValue, {
                        context: `The lifecycle callback "${callbackName}"`
                    });
                }
            }
            if (lifecycleCallbacks.attributeChangedCallback !== null) {
                const observedAttributesIterable = ctor.observedAttributes;
                if (observedAttributesIterable !== undefined) {
                    observedAttributes = convertToSequenceDOMString(observedAttributesIterable);
                }
            }
            let disabledFeatures = [];
            const disabledFeaturesIterable = ctor.disabledFeatures;
            if (disabledFeaturesIterable) {
                disabledFeatures = convertToSequenceDOMString(disabledFeaturesIterable);
            }
            const formAssociatedValue = ctor.formAssociated;
            disableInternals = disabledFeatures.includes("internals");
            disableShadow = disabledFeatures.includes("shadow");
            formAssociated = webIDLConversions.boolean(formAssociatedValue);
        } catch (err) {
            caughtError = err;
        } finally{
            this._elementDefinitionIsRunning = false;
        }
        if (caughtError !== undefined) {
            throw caughtError;
        }
        const definition = {
            name,
            localName,
            constructor,
            objectReference: ctor,
            formAssociated,
            observedAttributes,
            lifecycleCallbacks,
            disableShadow,
            disableInternals,
            constructionStack: []
        };
        this._customElementDefinitions.push(definition);
        const document = idlUtils.implForWrapper(this._globalObject._document);
        const upgradeCandidates = [];
        for (const candidate of shadowIncludingInclusiveDescendantsIterator(document)){
            if (candidate._namespaceURI === HTML_NS && candidate._localName === localName && (extendsOption === null || candidate._isValue === name)) {
                upgradeCandidates.push(candidate);
            }
        }
        for (const upgradeCandidate of upgradeCandidates){
            enqueueCEUpgradeReaction(upgradeCandidate, definition);
        }
        if (this._whenDefinedPromiseMap[name] !== undefined) {
            this._whenDefinedPromiseMap[name].resolve(ctor);
            delete this._whenDefinedPromiseMap[name];
        }
    }
    // https://html.spec.whatwg.org/#dom-customelementregistry-get
    get(name) {
        const definition = this._customElementDefinitions.find((entry)=>entry.name === name);
        return definition && definition.objectReference;
    }
    // https://html.spec.whatwg.org/#dom-customelementregistry-whendefined
    whenDefined(name) {
        if (!isValidCustomElementName(name)) {
            return Promise.reject(DOMException.create(this._globalObject, [
                "Name argument is not a valid custom element name.",
                "SyntaxError"
            ]));
        }
        const alreadyRegistered = this._customElementDefinitions.find((entry)=>entry.name === name);
        if (alreadyRegistered) {
            return Promise.resolve(alreadyRegistered.objectReference);
        }
        if (this._whenDefinedPromiseMap[name] === undefined) {
            let resolve;
            const promise = new Promise((r)=>{
                resolve = r;
            });
            // Store the pending Promise along with the extracted resolve callback to actually resolve the returned Promise,
            // once the custom element is registered.
            this._whenDefinedPromiseMap[name] = {
                promise,
                resolve
            };
        }
        return this._whenDefinedPromiseMap[name].promise;
    }
    // https://html.spec.whatwg.org/#dom-customelementregistry-upgrade
    upgrade(root) {
        for (const candidate of shadowIncludingInclusiveDescendantsIterator(root)){
            if (candidate.nodeType === NODE_TYPE.ELEMENT_NODE) {
                tryUpgradeElement(candidate);
            }
        }
    }
}
module.exports = {
    implementation: CustomElementRegistryImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/documents.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const XMLDocument = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/XMLDocument.js [app-ssr] (ecmascript)");
const Document = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Document.js [app-ssr] (ecmascript)");
const { wrapperForImpl } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
exports.createImpl = (globalObject, options, { alwaysUseDocumentClass = false } = {})=>{
    if (options.parsingMode === "xml" && !alwaysUseDocumentClass) {
        return XMLDocument.createImpl(globalObject, [], {
            options
        });
    }
    return Document.createImpl(globalObject, [], {
        options
    });
};
exports.createWrapper = (...args)=>{
    return wrapperForImpl(exports.createImpl(...args));
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/constraint-validation/ValidityState-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.implementation = class ValidityStateImpl {
    constructor(globalObject, args, privateData){
        const { element, state = {} } = privateData;
        this._element = element;
        this._state = state;
    }
    get badInput() {
        return this._failsConstraint("badInput");
    }
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-a-custom-error
    get customError() {
        return this._element._customValidityErrorMessage !== "";
    }
    get patternMismatch() {
        return this._failsConstraint("patternMismatch");
    }
    get rangeOverflow() {
        return this._failsConstraint("rangeOverflow");
    }
    get rangeUnderflow() {
        return this._failsConstraint("rangeUnderflow");
    }
    get stepMismatch() {
        return this._failsConstraint("stepMismatch");
    }
    get tooLong() {
        return this._failsConstraint("tooLong");
    }
    get tooShort() {
        return this._failsConstraint("tooShort");
    }
    get typeMismatch() {
        return this._failsConstraint("typeMismatch");
    }
    get valueMissing() {
        return this._failsConstraint("valueMissing");
    }
    _failsConstraint(method) {
        const validationMethod = this._state[method];
        if (validationMethod) {
            return validationMethod();
        }
        return false;
    }
    get valid() {
        return !(this.badInput || this.valueMissing || this.customError || this.patternMismatch || this.rangeOverflow || this.rangeUnderflow || this.stepMismatch || this.tooLong || this.tooShort || this.typeMismatch);
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/constraint-validation/DefaultConstraintValidation-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const ValidityState = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ValidityState.js [app-ssr] (ecmascript)");
const { isDisabled } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const { closest } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
exports.implementation = class DefaultConstraintValidationImpl {
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#dom-cva-willvalidate
    get willValidate() {
        return this._isCandidateForConstraintValidation();
    }
    get validity() {
        if (!this._validity) {
            this._validity = ValidityState.createImpl(this._globalObject, [], {
                element: this
            });
        }
        return this._validity;
    }
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#dom-cva-checkvalidity
    checkValidity() {
        if (!this._isCandidateForConstraintValidation()) {
            return true;
        }
        if (this._satisfiesConstraints()) {
            return true;
        }
        fireAnEvent("invalid", this, undefined, {
            cancelable: true
        });
        return false;
    }
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#dom-cva-setcustomvalidity
    setCustomValidity(message) {
        this._customValidityErrorMessage = message;
    }
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#dom-cva-reportvalidity
    // Since jsdom has no user interaction, it's the same as #checkValidity
    reportValidity() {
        return this.checkValidity();
    }
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#dom-cva-validationmessage
    get validationMessage() {
        const { validity } = this;
        if (!this._isCandidateForConstraintValidation() || this._satisfiesConstraints()) {
            return "";
        }
        const isSufferingFromCustomError = validity.customError;
        if (isSufferingFromCustomError) {
            return this._customValidityErrorMessage;
        }
        return "Constraints not satisfied";
    }
    _isCandidateForConstraintValidation() {
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled
        return !isDisabled(this) && // If an element has a datalist element ancestor,
        // it is barred from constraint validation.
        closest(this, "datalist") === null && !this._barredFromConstraintValidationSpecialization();
    }
    _isBarredFromConstraintValidation() {
        return !this._isCandidateForConstraintValidation();
    }
    _satisfiesConstraints() {
        return this.validity.valid;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/file-api/FileList-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
exports.implementation = class FileListImpl extends Array {
    constructor(){
        super(0);
    }
    item(index) {
        return this[index] || null;
    }
    get [idlUtils.supportedPropertyIndices]() {
        return this.keys();
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/file-api/FileReader-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const whatwgEncoding = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-encoding@3.1.1/node_modules/whatwg-encoding/lib/whatwg-encoding.js [app-ssr] (ecmascript)");
const MIMEType = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/mime-type.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const EventTargetImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js [app-ssr] (ecmascript)").implementation;
const ProgressEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ProgressEvent.js [app-ssr] (ecmascript)");
const { setupForSimpleEventAccessors } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-event-accessor.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const { copyToArrayBufferInNewRealm } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/binary-data.js [app-ssr] (ecmascript)");
const READY_STATES = Object.freeze({
    EMPTY: 0,
    LOADING: 1,
    DONE: 2
});
const events = [
    "loadstart",
    "progress",
    "load",
    "abort",
    "error",
    "loadend"
];
class FileReaderImpl extends EventTargetImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this.error = null;
        this.readyState = READY_STATES.EMPTY;
        this.result = null;
        this._globalObject = globalObject;
        this._ownerDocument = globalObject.document;
        this._terminated = false;
    }
    readAsArrayBuffer(file) {
        this._readFile(file, "buffer");
    }
    readAsBinaryString(file) {
        this._readFile(file, "binaryString");
    }
    readAsDataURL(file) {
        this._readFile(file, "dataURL");
    }
    readAsText(file, encoding) {
        this._readFile(file, "text", whatwgEncoding.labelToName(encoding) || "UTF-8");
    }
    abort() {
        if (this.readyState === READY_STATES.EMPTY || this.readyState === READY_STATES.DONE) {
            this.result = null;
            return;
        }
        if (this.readyState === READY_STATES.LOADING) {
            this.readyState = READY_STATES.DONE;
            this.result = null;
        }
        this._terminated = true;
        this._fireProgressEvent("abort");
        this._fireProgressEvent("loadend");
    }
    _fireProgressEvent(name, props) {
        fireAnEvent(name, this, ProgressEvent, props);
    }
    _readFile(file, format, encoding) {
        if (this.readyState === READY_STATES.LOADING) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        this.readyState = READY_STATES.LOADING;
        setImmediate(()=>{
            if (this._terminated) {
                this._terminated = false;
                return;
            }
            this._fireProgressEvent("loadstart");
            let data = file._buffer;
            if (!data) {
                data = Buffer.alloc(0);
            }
            this._fireProgressEvent("progress", {
                lengthComputable: !isNaN(file.size),
                total: file.size,
                loaded: data.length
            });
            setImmediate(()=>{
                if (this._terminated) {
                    this._terminated = false;
                    return;
                }
                switch(format){
                    case "binaryString":
                        {
                            this.result = data.toString("binary");
                            break;
                        }
                    case "dataURL":
                        {
                            // Spec seems very unclear here; see https://github.com/w3c/FileAPI/issues/104.
                            const contentType = MIMEType.parse(file.type) || "application/octet-stream";
                            this.result = `data:${contentType};base64,${data.toString("base64")}`;
                            break;
                        }
                    case "text":
                        {
                            this.result = whatwgEncoding.decode(data, encoding);
                            break;
                        }
                    case "buffer":
                    default:
                        {
                            this.result = copyToArrayBufferInNewRealm(data, this._globalObject);
                            break;
                        }
                }
                this.readyState = READY_STATES.DONE;
                this._fireProgressEvent("load");
                this._fireProgressEvent("loadend");
            });
        });
    }
}
setupForSimpleEventAccessors(FileReaderImpl.prototype, events);
exports.implementation = FileReaderImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/file-api/Blob-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const Blob = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Blob.js [app-ssr] (ecmascript)");
const { isArrayBuffer } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
function convertLineEndingsToNative(s) {
    // jsdom always pretends to be *nix, for consistency.
    // See also https://github.com/jsdom/jsdom/issues/2396.
    return s.replace(/\r\n|\r|\n/g, "\n");
}
exports.implementation = class BlobImpl {
    constructor(globalObject, args){
        const parts = args[0];
        const properties = args[1];
        const buffers = [];
        if (parts !== undefined) {
            for (const part of parts){
                let buffer;
                if (isArrayBuffer(part)) {
                    buffer = Buffer.from(part);
                } else if (ArrayBuffer.isView(part)) {
                    buffer = Buffer.from(part.buffer, part.byteOffset, part.byteLength);
                } else if (Blob.isImpl(part)) {
                    buffer = part._buffer;
                } else {
                    let s = part;
                    if (properties.endings === "native") {
                        s = convertLineEndingsToNative(part);
                    }
                    buffer = Buffer.from(s);
                }
                buffers.push(buffer);
            }
        }
        this._buffer = Buffer.concat(buffers);
        this._globalObject = globalObject;
        this.type = properties.type;
        if (/[^\u0020-\u007E]/.test(this.type)) {
            this.type = "";
        } else {
            this.type = this.type.toLowerCase();
        }
    }
    get size() {
        return this._buffer.length;
    }
    slice(start, end, contentType) {
        const { size } = this;
        let relativeStart, relativeEnd, relativeContentType;
        if (start === undefined) {
            relativeStart = 0;
        } else if (start < 0) {
            relativeStart = Math.max(size + start, 0);
        } else {
            relativeStart = Math.min(start, size);
        }
        if (end === undefined) {
            relativeEnd = size;
        } else if (end < 0) {
            relativeEnd = Math.max(size + end, 0);
        } else {
            relativeEnd = Math.min(end, size);
        }
        if (contentType === undefined) {
            relativeContentType = "";
        } else {
            // sanitization (lower case and invalid char check) is done in the
            // constructor
            relativeContentType = contentType;
        }
        const span = Math.max(relativeEnd - relativeStart, 0);
        const buffer = this._buffer;
        const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
        const blob = Blob.createImpl(this._globalObject, [
            [],
            {
                type: relativeContentType
            }
        ], {});
        blob._buffer = slicedBuffer;
        return blob;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/file-api/File-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const BlobImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/file-api/Blob-impl.js [app-ssr] (ecmascript)").implementation;
exports.implementation = class FileImpl extends BlobImpl {
    constructor(globalObject, [fileBits, fileName, options], privateData){
        super(globalObject, [
            fileBits,
            options
        ], privateData);
        this.name = fileName;
        this.lastModified = "lastModified" in options ? options.lastModified : Date.now();
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/svg/SVGAnimatedString-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

class SVGAnimatedStringImpl {
    constructor(globalObject, args, privateData){
        this._element = privateData.element;
        this._attribute = privateData.attribute;
        // These three can be undefined.
        this._attributeDeprecated = privateData.attributeDeprecated;
        this._attributeDeprecatedNamespace = privateData.attributeDeprecatedNamespace;
        this._initialValue = privateData.initialValue;
    }
    get baseVal() {
        if (!this._element.hasAttributeNS(null, this._attribute)) {
            if (this._attributeDeprecated !== undefined && this._element.hasAttributeNS(this._attributeDeprecatedNamespace, this._attributeDeprecated)) {
                return this._element.getAttributeNS(this._attributeDeprecatedNamespace, this._attributeDeprecated);
            } else if (this._initialValue !== undefined) {
                return this._initialValue;
            }
            return "";
        }
        return this._element.getAttributeNS(null, this._attribute);
    }
    set baseVal(base) {
        if (!this._element.hasAttributeNS(null, this._attribute) && this._attributeDeprecated !== undefined && this._element.hasAttributeNS(null, this._attributeDeprecated)) {
            this._element.setAttributeNS(null, this._attributeDeprecated, base);
        } else {
            this._element.setAttributeNS(null, this._attribute, base);
        }
    }
    get animVal() {
        return this.baseVal;
    }
}
exports.implementation = SVGAnimatedStringImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/svg/SVGListBase.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { attach, detach } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/svg/basic-types.js [app-ssr] (ecmascript)");
// https://svgwg.org/svg2-draft/types.html#ListInterfaces
// Child classes must implement _reserialize()
class List {
    _initList({ element, attribute, readOnly = false }) {
        this._element = element;
        this._attribute = attribute;
        this._attributeRegistryEntry = element.constructor.attributeRegistry.get(attribute);
        this._readOnly = readOnly;
        this._list = [];
        this._version = -1;
    }
    get _needsResync() {
        return this._version < this._element._version;
    }
    _synchronize() {
        if (!this._needsResync) {
            return;
        }
        let value = [];
        if (this._element.hasAttributeNS(null, this._attribute)) {
            value = this._attributeRegistryEntry.getValue(this._element.getAttributeNS(null, this._attribute));
        }
        if (value.length === 0 && this._attributeRegistryEntry.initialValue !== undefined) {
            value = this._attributeRegistryEntry.getValue(this._attributeRegistryEntry.initialValue);
        }
        // TODO: support non-DOMString lists.
        this._list = value;
        this._version = this._element._version;
    }
    _reserialize() {
        const elements = this._list;
        this._element.setAttributeNS(null, this._attribute, this._attributeRegistryEntry.serialize(elements));
        // Prevent ping-ponging back and forth between _reserialize() and _synchronize().
        this._version = this._element._version;
    }
    [idlUtils.supportsPropertyIndex](index) {
        this._synchronize();
        return index >= 0 && index < this.length;
    }
    get [idlUtils.supportedPropertyIndices]() {
        this._synchronize();
        return this._list.keys();
    }
    get length() {
        this._synchronize();
        return this._list.length;
    }
    get numberOfItems() {
        this._synchronize();
        return this._list.length;
    }
    clear() {
        this._synchronize();
        if (this._readOnly) {
            throw DOMException.create(this._globalObject, [
                "Attempting to modify a read-only list",
                "NoModificationAllowedError"
            ]);
        }
        for (const item of this._list){
            detach(item);
        }
        this._list.length = 0;
        this._reserialize();
    }
    initialize(newItem) {
        this._synchronize();
        if (this._readOnly) {
            throw DOMException.create(this._globalObject, [
                "Attempting to modify a read-only list",
                "NoModificationAllowedError"
            ]);
        }
        for (const item of this._list){
            detach(item);
        }
        this._list.length = 0;
        // TODO: clone non-DOMString list elements.
        attach(newItem, this);
        this._list.push(newItem);
        this._reserialize();
    }
    getItem(index) {
        this._synchronize();
        if (index >= this._list.length) {
            throw DOMException.create(this._globalObject, [
                `The index provided (${index}) is greater than or equal to the maximum bound (${this._list.length}).`,
                "IndexSizeError"
            ]);
        }
        return this._list[index];
    }
    insertItemBefore(newItem, index) {
        this._synchronize();
        if (this._readOnly) {
            throw DOMException.create(this._globalObject, [
                "Attempting to modify a read-only list",
                "NoModificationAllowedError"
            ]);
        }
        // TODO: clone non-DOMString list elements.
        if (index > this._list.length) {
            index = this._list.length;
        }
        this._list.splice(index, 0, newItem);
        attach(newItem, this);
        this._reserialize();
        return newItem;
    }
    replaceItem(newItem, index) {
        this._synchronize();
        if (this._readOnly) {
            throw DOMException.create(this._globalObject, [
                "Attempting to modify a read-only list",
                "NoModificationAllowedError"
            ]);
        }
        if (index >= this._list.length) {
            throw DOMException.create(this._globalObject, [
                `The index provided (${index}) is greater than or equal to the maximum bound (${this._list.length}).`,
                "IndexSizeError"
            ]);
        }
        // TODO: clone non-DOMString list elements.
        detach(this._list[index]);
        this._list[index] = newItem;
        attach(newItem, this);
        this._reserialize();
        return newItem;
    }
    removeItem(index) {
        this._synchronize();
        if (this._readOnly) {
            throw DOMException.create(this._globalObject, [
                "Attempting to modify a read-only list",
                "NoModificationAllowedError"
            ]);
        }
        if (index >= this._list.length) {
            throw DOMException.create(this._globalObject, [
                `The index provided (${index}) is greater than or equal to the maximum bound (${this._list.length}).`,
                "IndexSizeError"
            ]);
        }
        const item = this._list[index];
        detach(item);
        this._list.splice(index, 1);
        this._reserialize();
        return item;
    }
    appendItem(newItem) {
        this._synchronize();
        // TODO: clone non-DOMString list elements.
        this._list.push(newItem);
        attach(newItem, this);
        this._reserialize();
        return newItem;
    }
    [idlUtils.indexedSetNew](index, value) {
        // Note: this will always throw a IndexSizeError.
        this.replaceItem(value, index);
    }
    [idlUtils.indexedSetExisting](index, value) {
        this.replaceItem(value, index);
    }
}
module.exports = List;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/svg/SVGStringList-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const SVGListBase = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/svg/SVGListBase.js [app-ssr] (ecmascript)");
class SVGStringListImpl {
    constructor(globalObject, args, privateData){
        this._globalObject = globalObject;
        this._initList(privateData);
    }
}
mixin(SVGStringListImpl.prototype, SVGListBase.prototype);
exports.implementation = SVGStringListImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/svg/SVGNumber-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
class SVGNumberImpl {
    constructor(globalObject, args, privateData){
        // Delegate to parent List object for (almost) everything related to reflection.
        this._parentList = privateData.parentList;
        this._value = 0;
    }
    get _readOnly() {
        if (this._parentList !== undefined) {
            return this._parentList._readOnly;
        }
        return false;
    }
    _synchronize() {
        if (this._parentList !== undefined) {
            this._parentList._synchronize();
        }
    }
    _reserialize() {
        if (this._parentList !== undefined) {
            this._parentList._reserialize();
        }
    }
    get value() {
        this._synchronize();
        return this._value;
    }
    set value(value) {
        if (this._readOnly) {
            throw DOMException.create(this._globalObject, [
                "Attempting to modify a read-only SVGNumber",
                "NoModificationAllowedError"
            ]);
        }
        this._value = value;
        this._reserialize();
    }
}
exports.implementation = SVGNumberImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/svg/SVGRect-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
class SVGRectImplRecord {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }
}
class SVGRectImplReflection {
    constructor(privateData){
        this._reflectedElement = privateData.reflectedElement;
        this._reflectedAttribute = privateData.reflectedAttribute;
        this._parser = privateData.parser;
    }
    // https://svgwg.org/svg2-draft/types.html#TermReserialize
    _reserialize({ x, y, width, height }) {
        this._reflectedElement.setAttributeNS(null, this._reflectedAttribute, `${x} ${y} ${width} ${height}`);
    }
    get x() {
        const attr = this._reflectedElement.getAttributeNS(null, this._reflectedAttribute);
        return this._parser(attr).x;
    }
    set x(newX) {
        const { y, width, height } = this;
        this._reserialize({
            x: newX,
            y,
            width,
            height
        });
    }
    get y() {
        const attr = this._reflectedElement.getAttributeNS(null, this._reflectedAttribute);
        return this._parser(attr).y;
    }
    set y(newY) {
        const { x, width, height } = this;
        this._reserialize({
            x,
            y: newY,
            width,
            height
        });
    }
    get width() {
        const attr = this._reflectedElement.getAttributeNS(null, this._reflectedAttribute);
        return this._parser(attr).width;
    }
    set width(newWidth) {
        const { x, y, height } = this;
        this._reserialize({
            x,
            y,
            width: newWidth,
            height
        });
    }
    get height() {
        const attr = this._reflectedElement.getAttributeNS(null, this._reflectedAttribute);
        return this._parser(attr).height;
    }
    set height(newHeight) {
        const { x, y, width } = this;
        this._reserialize({
            x,
            y,
            width,
            height: newHeight
        });
    }
}
class SVGRectImpl {
    constructor(globalObject, args, { readOnly = false, ...privateData } = {}){
        this._globalObject = globalObject;
        this._readOnly = readOnly;
        if (privateData.reflectedElement) {
            this._impl = new SVGRectImplReflection(privateData);
        } else {
            this._impl = new SVGRectImplRecord();
        }
    }
    get x() {
        return this._impl.x;
    }
    set x(newX) {
        if (this._readOnly) {
            throw DOMException.create(this._globalObject, [
                "This SVGRect is read-only",
                "NO_MODIFICATION_ALLOWED_ERR"
            ]);
        }
        this._impl.x = newX;
    }
    get y() {
        return this._impl.y;
    }
    set y(newY) {
        if (this._readOnly) {
            throw DOMException.create(this._globalObject, [
                "This SVGRect is read-only",
                "NO_MODIFICATION_ALLOWED_ERR"
            ]);
        }
        this._impl.y = newY;
    }
    get width() {
        return this._impl.width;
    }
    set width(newWidth) {
        if (this._readOnly) {
            throw DOMException.create(this._globalObject, [
                "This SVGRect is read-only",
                "NO_MODIFICATION_ALLOWED_ERR"
            ]);
        }
        this._impl.width = newWidth;
    }
    get height() {
        return this._impl.height;
    }
    set height(newHeight) {
        if (this._readOnly) {
            throw DOMException.create(this._globalObject, [
                "This SVGRect is read-only",
                "NO_MODIFICATION_ALLOWED_ERR"
            ]);
        }
        this._impl.height = newHeight;
    }
}
exports.implementation = SVGRectImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/svg/SVGAnimatedRect-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SVGRect = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGRect.js [app-ssr] (ecmascript)");
// https://drafts.csswg.org/css-syntax/#number-token-diagram
const numberRe = /^[+-]?(?:\d*\.)?\d+(?:[eE][+-]?\d+)?/;
// https://svgwg.org/svg2-draft/coords.html#ViewBoxAttribute
function parseViewBox(str) {
    // Use a do-while "loop" as JavaScript `goto end`.
    // eslint-disable-next-line no-unreachable-loop
    do {
        // When the attribute does not exist.
        if (typeof str !== "string") {
            break;
        }
        let i = 0;
        skipSpace();
        const xStr = matchNumber();
        if (!xStr) {
            break;
        }
        if (!skipDelimiter()) {
            break;
        }
        const yStr = matchNumber();
        if (!yStr) {
            break;
        }
        if (!skipDelimiter()) {
            break;
        }
        const widthStr = matchNumber();
        if (!widthStr) {
            break;
        }
        if (!skipDelimiter()) {
            break;
        }
        const heightStr = matchNumber();
        if (!heightStr) {
            break;
        }
        // Test for trailing junk.
        skipSpace();
        if (i < str.length) {
            break;
        }
        // A negative value for <width> or <height> is an error and invalidates the 'viewBox' attribute.
        const width = Number(widthStr);
        if (width < 0) {
            break;
        }
        const height = Number(heightStr);
        if (height < 0) {
            break;
        }
        return {
            x: Number(xStr),
            y: Number(yStr),
            width,
            height
        };
        //TURBOPACK unreachable
        ;
        function skipSpace() {
            while(i < str.length && str[i] === " "){
                i += 1;
            }
        }
        function matchNumber() {
            const numMatch = numberRe.exec(str.slice(i));
            if (!numMatch) {
                return undefined;
            }
            i += numMatch[0].length;
            return numMatch[0];
        }
        function skipDelimiter() {
            const start = i;
            skipSpace();
            if (i < str.length && str[i] === ",") {
                i += 1;
            }
            skipSpace();
            return i > start;
        }
    }while (false)
    return {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };
}
class SVGAnimatedRectImpl {
    constructor(globalObject, args, privateData){
        this._globalObject = globalObject;
        this._element = privateData.element;
        this._attribute = privateData.attribute;
    }
    get baseVal() {
        return SVGRect.createImpl(this._globalObject, [], {
            reflectedElement: this._element,
            reflectedAttribute: this._attribute,
            parser: parseViewBox
        });
    }
    get animVal() {
        return SVGRect.createImpl(this._globalObject, [], {
            reflectedElement: this._element,
            reflectedAttribute: this._attribute,
            parser: parseViewBox,
            readOnly: true
        });
    }
}
exports.implementation = SVGAnimatedRectImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/svg/SVGPreserveAspectRatio-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const alignmentStringsByIndex = [
    "unknown",
    "none",
    "xMinYMin",
    "xMidYMin",
    "xMaxYMin",
    "xMinYMid",
    "xMidYMid",
    "xMaxYMid",
    "xMinYMax",
    "xMidYMax",
    "xMaxYMax"
];
const alignmentIndicesByString = {
    __proto__: null,
    unknown: 0,
    none: 1,
    xMinYMin: 2,
    xMidYMin: 3,
    xMaxYMin: 4,
    xMinYMid: 5,
    xMidYMid: 6,
    xMaxYMid: 7,
    xMinYMax: 8,
    xMidYMax: 9,
    xMaxYMax: 10
};
const meetOrSliceStringsByIndex = [
    "unknown",
    "meet",
    "slice"
];
const meetOrSliceIndicesByString = {
    __proto__: null,
    unknown: 0,
    meet: 1,
    slice: 2
};
// https://svgwg.org/svg2-draft/coords.html#PreserveAspectRatioAttribute
const preserveAspectRatioRegExp = /^(none|x(?:Min|Mid|Max)Y(?:Min|Mid|Max))(?: +(meet|slice))?$/;
class SVGPreserveAspectRatioImpl {
    constructor(globalObject, args, privateData){
        this._globalObject = globalObject;
        this._element = privateData.element;
        this._readOnly = Boolean(privateData.readOnly);
    }
    _parse() {
        const attrValue = this._element.getAttributeNS(null, "preserveAspectRatio");
        if (attrValue) {
            const value = preserveAspectRatioRegExp.exec(attrValue);
            if (value) {
                return {
                    align: value[1],
                    meetOrSlice: value[2] || "meet"
                };
            }
        }
        return {
            align: "xMidYMid",
            meetOrSlice: "meet"
        };
    }
    get align() {
        const { align } = this._parse();
        return alignmentIndicesByString[align];
    }
    set align(value) {
        if (this._readOnly) {
            throw DOMException.create(this._globalObject, [
                "Attempting to modify a read-only SVGPreserveAspectRatio",
                "NoModificationAllowedError"
            ]);
        }
        const string = alignmentStringsByIndex[value];
        if (string === "unknown" || string === undefined) {
            throw new TypeError("Invalid alignment");
        }
        this._element.setAttributeNS(null, "preserveAspectRatio", `${string} ${this._parse().meetOrSlice}`);
    }
    get meetOrSlice() {
        const { meetOrSlice } = this._parse();
        return meetOrSliceIndicesByString[meetOrSlice];
    }
    set meetOrSlice(value) {
        if (this._readOnly) {
            throw DOMException.create(this._globalObject, [
                "Attempting to modify a read-only SVGPreserveAspectRatio",
                "NoModificationAllowedError"
            ]);
        }
        const string = meetOrSliceStringsByIndex[value];
        if (string === "unknown" || string === undefined) {
            throw new TypeError("Invalid meet-or-slice value");
        }
        this._element.setAttributeNS(null, "preserveAspectRatio", `${this._parse().align} ${string}`);
    }
}
exports.implementation = SVGPreserveAspectRatioImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/svg/SVGAnimatedPreserveAspectRatio-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SVGPreserveAspectRatio = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGPreserveAspectRatio.js [app-ssr] (ecmascript)");
class SVGAnimatedPreserveAspectRatioImpl {
    constructor(globalObject, args, privateData){
        this._globalObject = globalObject;
        this._element = privateData.element;
    }
    get baseVal() {
        return SVGPreserveAspectRatio.createImpl(this._globalObject, [], {
            element: this._element
        });
    }
    get animVal() {
        return SVGPreserveAspectRatio.createImpl(this._globalObject, [], {
            element: this._element
        });
    }
}
exports.implementation = SVGAnimatedPreserveAspectRatioImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/webstorage/Storage-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const StorageEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/StorageEvent.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
// https://html.spec.whatwg.org/multipage/webstorage.html#the-storage-interface
class StorageImpl {
    constructor(globalObject, args, privateData){
        const { associatedWindow, storageArea, url, type, storageQuota } = privateData;
        this._associatedWindow = associatedWindow;
        this._items = storageArea;
        this._url = url;
        this._type = type;
        this._quota = storageQuota;
        this._globalObject = globalObject;
    }
    _dispatchStorageEvent(key, oldValue, newValue) {
        return this._associatedWindow._currentOriginData.windowsInSameOrigin.filter((target)=>target !== this._associatedWindow).forEach((target)=>fireAnEvent("storage", target, StorageEvent, {
                key,
                oldValue,
                newValue,
                url: this._url,
                storageArea: target["_" + this._type]
            }));
    }
    get length() {
        return this._items.size;
    }
    key(n) {
        if (n >= this._items.size) {
            return null;
        }
        return [
            ...this._items.keys()
        ][n];
    }
    getItem(key) {
        if (this._items.has(key)) {
            return this._items.get(key);
        }
        return null;
    }
    setItem(key, value) {
        const oldValue = this._items.get(key) || null;
        if (oldValue === value) {
            return;
        }
        // Concatenate all keys and values to measure their length against the quota
        let itemsTotalLength = key.length + value.length;
        for (const [curKey, curValue] of this._items){
            // If the key already exists, skip it as it will be set to the new value instead
            if (key !== curKey) {
                itemsTotalLength += curKey.length + curValue.length;
            }
        }
        if (itemsTotalLength > this._quota) {
            throw DOMException.create(this._globalObject, [
                `The ${this._quota}-code unit storage quota has been exceeded.`,
                "QuotaExceededError"
            ]);
        }
        setTimeout(this._dispatchStorageEvent.bind(this), 0, key, oldValue, value);
        this._items.set(key, value);
    }
    removeItem(key) {
        if (this._items.has(key)) {
            setTimeout(this._dispatchStorageEvent.bind(this), 0, key, this._items.get(key), null);
            this._items.delete(key);
        }
    }
    clear() {
        if (this._items.size > 0) {
            setTimeout(this._dispatchStorageEvent.bind(this), 0, null, null, null);
            this._items.clear();
        }
    }
    get [idlUtils.supportedPropertyNames]() {
        return this._items.keys();
    }
}
module.exports = {
    implementation: StorageImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/hr-time/Performance-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventTargetImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js [app-ssr] (ecmascript)").implementation;
class PerformanceImpl extends EventTargetImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this.timeOrigin = privateData.timeOrigin;
        this._nowAtTimeOrigin = privateData.nowAtTimeOrigin;
    }
    now() {
        return performance.now() - this._nowAtTimeOrigin;
    }
    toJSON() {
        return {
            timeOrigin: this.timeOrigin
        };
    }
}
exports.implementation = PerformanceImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/PluginArray-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
exports.implementation = class PluginArray {
    refresh() {}
    get length() {
        return 0;
    }
    item() {
        return null;
    }
    namedItem() {
        return null;
    }
    get [idlUtils.supportedPropertyIndices]() {
        return [];
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/MimeTypeArray-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
exports.implementation = class MimeTypeArray {
    get length() {
        return 0;
    }
    item() {
        return null;
    }
    namedItem() {
        return null;
    }
    get [idlUtils.supportedPropertyIndices]() {
        return [];
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/NavigatorID-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.implementation = class NavigatorIDImpl {
    get appCodeName() {
        return "Mozilla";
    }
    get appName() {
        return "Netscape";
    }
    get appVersion() {
        return "4.0";
    }
    get platform() {
        return "";
    }
    get product() {
        return "Gecko";
    }
    get productSub() {
        return "20030107";
    }
    // see Navigator constructor for userAgent
    get vendor() {
        return "Apple Computer, Inc.";
    }
    get vendorSub() {
        return "";
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/NavigatorLanguage-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.implementation = class NavigatorLanguageImpl {
    get language() {
        return "en-US";
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/NavigatorOnLine-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.implementation = class NavigatorOnLineImpl {
    get onLine() {
        return true;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/NavigatorCookies-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.implementation = class NavigatorCookiesImpl {
    get cookieEnabled() {
        return true;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/NavigatorPlugins-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.implementation = class NavigatorPluginsImpl {
    // plugins and mimeTypes are implemented in Navigator-impl.js
    javaEnabled() {
        return false;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/NavigatorConcurrentHardware-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const os = __turbopack_context__.r("[externals]/os [external] (os, cjs)");
exports.implementation = class NavigatorConcurrentHardwareImpl {
    get hardwareConcurrency() {
        return os.cpus().length;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/Navigator-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const PluginArray = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/PluginArray.js [app-ssr] (ecmascript)");
const MimeTypeArray = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MimeTypeArray.js [app-ssr] (ecmascript)");
const NavigatorIDImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/NavigatorID-impl.js [app-ssr] (ecmascript)").implementation;
const NavigatorLanguageImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/NavigatorLanguage-impl.js [app-ssr] (ecmascript)").implementation;
const NavigatorOnLineImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/NavigatorOnLine-impl.js [app-ssr] (ecmascript)").implementation;
const NavigatorCookiesImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/NavigatorCookies-impl.js [app-ssr] (ecmascript)").implementation;
const NavigatorPluginsImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/NavigatorPlugins-impl.js [app-ssr] (ecmascript)").implementation;
const NavigatorConcurrentHardwareImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/NavigatorConcurrentHardware-impl.js [app-ssr] (ecmascript)").implementation;
class NavigatorImpl {
    constructor(globalObject, args, privateData){
        this._globalObject = globalObject;
        this.userAgent = privateData.userAgent;
        this.languages = Object.freeze([
            "en-US",
            "en"
        ]);
        this.plugins = PluginArray.create(this._globalObject);
        this.mimeTypes = MimeTypeArray.create(this._globalObject);
    }
}
mixin(NavigatorImpl.prototype, NavigatorIDImpl.prototype);
mixin(NavigatorImpl.prototype, NavigatorLanguageImpl.prototype);
mixin(NavigatorImpl.prototype, NavigatorOnLineImpl.prototype);
mixin(NavigatorImpl.prototype, NavigatorCookiesImpl.prototype);
mixin(NavigatorImpl.prototype, NavigatorPluginsImpl.prototype);
mixin(NavigatorImpl.prototype, NavigatorConcurrentHardwareImpl.prototype);
exports.implementation = NavigatorImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/Plugin-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.implementation = class Plugin {
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/navigator/MimeType-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.implementation = class MimeType {
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/crypto/Crypto-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const nodeCrypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
// https://w3c.github.io/webcrypto/#crypto-interface
class CryptoImpl {
    constructor(globalObject){
        this._globalObject = globalObject;
    }
    // https://w3c.github.io/webcrypto/#Crypto-method-getRandomValues
    getRandomValues(array) {
        const typeName = getTypedArrayTypeName(array);
        if (!(typeName === "Int8Array" || typeName === "Uint8Array" || typeName === "Uint8ClampedArray" || typeName === "Int16Array" || typeName === "Uint16Array" || typeName === "Int32Array" || typeName === "Uint32Array" || typeName === "BigInt64Array" || typeName === "BigUint64Array")) {
            throw DOMException.create(this._globalObject, [
                `getRandomValues() only accepts integer typed arrays`,
                "TypeMismatchError"
            ]);
        }
        if (array.byteLength > 65536) {
            throw DOMException.create(this._globalObject, [
                `getRandomValues() cannot generate more than 65536 bytes of random values; ` + `${array.byteLength} bytes were requested`,
                "QuotaExceededError"
            ]);
        }
        nodeCrypto.randomFillSync(array);
        return array;
    }
    // https://w3c.github.io/webcrypto/#Crypto-method-randomUUID
    randomUUID() {
        return nodeCrypto.randomUUID();
    }
}
exports.implementation = CryptoImpl;
// See #3395. Subclasses of TypedArrays should properly work, but we can't rely
// on instanceof because Uint8Array may be different across different windows -
// which can happen in JSDOM when running { runScripts: "dangerously" }. As a
// solution, we imitate the behavior of instanceof by walking the proottype
// chain.
function getTypedArrayTypeName(array) {
    const target = array.constructor;
    const chain = [
        target.name
    ];
    let proto = Object.getPrototypeOf(target);
    while(proto){
        chain.push(proto.name);
        proto = Object.getPrototypeOf(proto);
    }
    while(chain.length > 0 && chain[chain.length - 1] !== "TypedArray"){
        chain.pop();
    }
    chain.reverse();
    return chain[1];
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/FormData-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { closest } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
const { isDisabled, isButton, isSubmitButton } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const Blob = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Blob.js [app-ssr] (ecmascript)");
const File = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/File.js [app-ssr] (ecmascript)");
const conversions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)");
exports.implementation = class FormDataImpl {
    constructor(globalObject, args){
        this._globalObject = globalObject;
        this._entries = [];
        if (args[0] !== undefined) {
            const [form, submitter = null] = args;
            if (submitter !== null) {
                if (!isSubmitButton(submitter)) {
                    throw new TypeError("The specified element is not a submit button");
                }
                if (submitter.form !== form) {
                    throw DOMException.create(this._globalObject, [
                        "The specified element is not owned by this form element",
                        "NotFoundError"
                    ]);
                }
            }
            this._entries = constructTheEntryList(form, submitter);
        }
    }
    append(name, value, filename) {
        const entry = createAnEntry(name, value, filename);
        this._entries.push(entry);
    }
    delete(name) {
        this._entries = this._entries.filter((entry)=>entry.name !== name);
    }
    get(name) {
        const foundEntry = this._entries.find((entry)=>entry.name === name);
        return foundEntry !== undefined ? idlUtils.tryWrapperForImpl(foundEntry.value) : null;
    }
    getAll(name) {
        return this._entries.filter((entry)=>entry.name === name).map((entry)=>idlUtils.tryWrapperForImpl(entry.value));
    }
    has(name) {
        return this._entries.findIndex((entry)=>entry.name === name) !== -1;
    }
    set(name, value, filename) {
        const entry = createAnEntry(name, value, filename);
        const foundIndex = this._entries.findIndex((e)=>e.name === name);
        if (foundIndex !== -1) {
            this._entries[foundIndex] = entry;
            this._entries = this._entries.filter((e, i)=>e.name !== name || i === foundIndex);
        } else {
            this._entries.push(entry);
        }
    }
    *[Symbol.iterator]() {
        for (const entry of this._entries){
            yield [
                entry.name,
                idlUtils.tryWrapperForImpl(entry.value)
            ];
        }
    }
};
function createAnEntry(name, value, filename) {
    const entry = {
        name
    };
    // https://github.com/whatwg/xhr/issues/75
    if (Blob.isImpl(value) && !File.isImpl(value)) {
        const oldValue = value;
        value = File.createImpl(value._globalObject, [
            [],
            "blob",
            {
                type: oldValue.type
            }
        ]);
        // "representing the same bytes"
        value._buffer = oldValue._buffer;
    }
    if (File.isImpl(value) && filename !== undefined) {
        const oldValue = value;
        value = File.createImpl(value._globalObject, [
            [],
            filename,
            // spec makes no mention of `lastModified`; assume it is inherited
            // (Chrome's behavior)
            {
                type: oldValue.type,
                lastModified: oldValue.lastModified
            }
        ]);
        // "representing the same bytes"
        value._buffer = oldValue._buffer;
    }
    entry.value = value;
    return entry;
}
function constructTheEntryList(form, submitter) {
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-the-form-data-set
    // TODO: handle encoding
    // TODO: handling "constructing entry list"
    const controls = form._getSubmittableElementNodes();
    const entryList = [];
    for (const field of controls){
        if (closest(field, "datalist") !== null) {
            continue;
        }
        if (isDisabled(field)) {
            continue;
        }
        if (isButton(field) && field !== submitter) {
            continue;
        }
        if (field.type === "checkbox" && field._checkedness === false) {
            continue;
        }
        if (field.type === "radio" && field._checkedness === false) {
            continue;
        }
        if (field.localName === "object") {
            continue;
        }
        const name = field.getAttributeNS(null, "name");
        if (field.localName === "input" && field.type === "image") {
            const prefix = name ? `${name}.` : "";
            const coordinate = field._selectedCoordinate ?? {
                x: 0,
                y: 0
            };
            appendAnEntry(entryList, `${prefix}x`, coordinate.x);
            appendAnEntry(entryList, `${prefix}y`, coordinate.y);
            continue;
        }
        // TODO: handle form-associated custom elements.
        if (name === null || name === "") {
            continue;
        }
        if (field.localName === "select") {
            for (const option of field.options){
                if (option._selectedness === true && !isDisabled(field)) {
                    appendAnEntry(entryList, name, option._getValue());
                }
            }
        } else if (field.localName === "input" && (field.type === "checkbox" || field.type === "radio")) {
            const value = field.hasAttributeNS(null, "value") ? field.getAttributeNS(null, "value") : "on";
            appendAnEntry(entryList, name, value);
        } else if (field.type === "file") {
            if (field.files.length === 0) {
                const value = File.createImpl(form._globalObject, [
                    [],
                    "",
                    {
                        type: "application/octet-stream"
                    }
                ]);
                appendAnEntry(entryList, name, value);
            } else {
                for(let i = 0; i < field.files.length; ++i){
                    appendAnEntry(entryList, name, field.files.item(i));
                }
            }
        } else {
            appendAnEntry(entryList, name, field._getValue());
        }
        const dirname = field.getAttributeNS(null, "dirname");
        if (dirname !== null && dirname !== "") {
            const dir = "ltr"; // jsdom does not (yet?) implement actual directionality
            appendAnEntry(entryList, dirname, dir);
        }
    }
    // TODO: formdata event
    return entryList;
}
function appendAnEntry(entryList, name, value) {
    name = conversions.USVString(name);
    if (!File.isImpl(value)) {
        value = conversions.USVString(value);
    }
    const entry = createAnEntry(name, value);
    entryList.push(entry);
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/XMLHttpRequestEventTarget-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const EventTargetImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js [app-ssr] (ecmascript)").implementation;
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { setupForSimpleEventAccessors } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-event-accessor.js [app-ssr] (ecmascript)");
const events = [
    "loadstart",
    "progress",
    "abort",
    "error",
    "load",
    "timeout",
    "loadend"
];
class XMLHttpRequestEventTargetImpl extends EventTargetImpl {
    // TODO: remove this when we fix EventTargetImpl to use this._globalObject directly instead of using _ownerDocument.
    // https://github.com/jsdom/jsdom/issues/2780
    get _ownerDocument() {
        return idlUtils.implForWrapper(this._globalObject._document);
    }
}
setupForSimpleEventAccessors(XMLHttpRequestEventTargetImpl.prototype, events);
exports.implementation = XMLHttpRequestEventTargetImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/XMLHttpRequestUpload-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const XMLHttpRequestEventTargetImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/XMLHttpRequestEventTarget-impl.js [app-ssr] (ecmascript)").implementation;
exports.implementation = class XMLHttpRequestUploadImpl extends XMLHttpRequestEventTargetImpl {
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/xhr-utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const { EventEmitter } = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const { URL } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const parseDataURL = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/data-urls@5.0.0/node_modules/data-urls/lib/parser.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const ProgressEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ProgressEvent.js [app-ssr] (ecmascript)");
const agentFactory = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/agent-factory.js [app-ssr] (ecmascript)");
const Request = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/http-request.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const headerListSeparatorRegexp = /,[ \t]*/;
const simpleMethods = new Set([
    "GET",
    "HEAD",
    "POST"
]);
const simpleHeaders = new Set([
    "accept",
    "accept-language",
    "content-language",
    "content-type"
]);
const preflightHeaders = new Set([
    "access-control-expose-headers",
    "access-control-allow-headers",
    "access-control-allow-credentials",
    "access-control-allow-origin"
]);
const READY_STATES = exports.READY_STATES = Object.freeze({
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
});
function getRequestHeader(requestHeaders, header) {
    const lcHeader = header.toLowerCase();
    const keys = Object.keys(requestHeaders);
    let n = keys.length;
    while(n--){
        const key = keys[n];
        if (key.toLowerCase() === lcHeader) {
            return requestHeaders[key];
        }
    }
    return null;
}
function updateRequestHeader(requestHeaders, header, newValue) {
    const lcHeader = header.toLowerCase();
    const keys = Object.keys(requestHeaders);
    let n = keys.length;
    while(n--){
        const key = keys[n];
        if (key.toLowerCase() === lcHeader) {
            requestHeaders[key] = newValue;
        }
    }
}
function dispatchError(xhr) {
    const errMessage = xhr.properties.error;
    requestErrorSteps(xhr, "error", DOMException.create(xhr._globalObject, [
        errMessage,
        "NetworkError"
    ]));
    if (xhr._ownerDocument) {
        const error = new Error(errMessage);
        error.type = "XMLHttpRequest"; // TODO this should become "resource loading" when XHR goes through resource loader
        xhr._ownerDocument._defaultView._virtualConsole.emit("jsdomError", error);
    }
}
function validCORSHeaders(xhr, response, flag, properties, origin) {
    const acaoStr = response.headers["access-control-allow-origin"];
    const acao = acaoStr ? acaoStr.trim() : null;
    if (acao !== "*" && acao !== origin) {
        properties.error = "Cross origin " + origin + " forbidden";
        dispatchError(xhr);
        return false;
    }
    const acacStr = response.headers["access-control-allow-credentials"];
    const acac = acacStr ? acacStr.trim() : null;
    if (flag.withCredentials && acac !== "true") {
        properties.error = "Credentials forbidden";
        dispatchError(xhr);
        return false;
    }
    return true;
}
function validCORSPreflightHeaders(xhr, response, flag, properties) {
    if (!validCORSHeaders(xhr, response, flag, properties, properties.origin)) {
        return false;
    }
    const acahStr = response.headers["access-control-allow-headers"];
    const acah = new Set(acahStr ? acahStr.trim().toLowerCase().split(headerListSeparatorRegexp) : []);
    const forbiddenHeaders = acah.has("*") ? [] : Object.keys(flag.requestHeaders).filter((header)=>{
        const lcHeader = header.toLowerCase();
        return !simpleHeaders.has(lcHeader) && !acah.has(lcHeader);
    });
    if (forbiddenHeaders.length > 0) {
        properties.error = "Headers " + forbiddenHeaders + " forbidden";
        dispatchError(xhr);
        return false;
    }
    return true;
}
function requestErrorSteps(xhr, event, exception) {
    const { flag, properties, upload } = xhr;
    xhr.readyState = READY_STATES.DONE;
    properties.send = false;
    setResponseToNetworkError(xhr);
    if (flag.synchronous) {
        throw exception;
    }
    fireAnEvent("readystatechange", xhr);
    if (!properties.uploadComplete) {
        properties.uploadComplete = true;
        if (properties.uploadListener) {
            fireAnEvent(event, upload, ProgressEvent, {
                loaded: 0,
                total: 0,
                lengthComputable: false
            });
            fireAnEvent("loadend", upload, ProgressEvent, {
                loaded: 0,
                total: 0,
                lengthComputable: false
            });
        }
    }
    fireAnEvent(event, xhr, ProgressEvent, {
        loaded: 0,
        total: 0,
        lengthComputable: false
    });
    fireAnEvent("loadend", xhr, ProgressEvent, {
        loaded: 0,
        total: 0,
        lengthComputable: false
    });
}
function setResponseToNetworkError(xhr) {
    const { properties } = xhr;
    properties.responseBuffer = properties.responseCache = properties.responseTextCache = properties.responseXMLCache = null;
    properties.responseHeaders = {};
    xhr.status = 0;
    xhr.statusText = "";
}
// return a "request" client object or an event emitter matching the same behaviour for unsupported protocols
// the callback should be called with a "request" response object or an event emitter matching the same behaviour too
function createClient(xhr) {
    const { flag, properties } = xhr;
    const urlObj = new URL(flag.uri);
    const uri = urlObj.href;
    const ucMethod = flag.method.toUpperCase();
    const { requestManager } = flag;
    if (urlObj.protocol === "file:") {
        const response = new EventEmitter();
        response.statusCode = 200;
        response.rawHeaders = [];
        response.headers = {};
        const filePath = urlObj.pathname.replace(/^file:\/\//, "").replace(/^\/([a-z]):\//i, "$1:/").replace(/%20/g, " ");
        const client = new EventEmitter();
        const readableStream = fs.createReadStream(filePath, {
            encoding: null
        });
        readableStream.on("data", (chunk)=>{
            response.emit("data", chunk);
            client.emit("data", chunk);
        });
        readableStream.on("end", ()=>{
            response.emit("end");
            client.emit("end");
        });
        readableStream.on("error", (err)=>{
            client.emit("error", err);
        });
        client.abort = function() {
            readableStream.destroy();
            client.emit("abort");
        };
        if (requestManager) {
            const req = {
                abort () {
                    properties.abortError = true;
                    xhr.abort();
                }
            };
            requestManager.add(req);
            const rmReq = requestManager.remove.bind(requestManager, req);
            client.on("abort", rmReq);
            client.on("error", rmReq);
            client.on("end", rmReq);
        }
        process.nextTick(()=>client.emit("response", response, urlObj.href));
        return client;
    }
    if (urlObj.protocol === "data:") {
        const response = new EventEmitter();
        const client = new EventEmitter();
        let buffer;
        try {
            const parsed = parseDataURL(uri);
            const contentType = parsed.mimeType.toString();
            buffer = Buffer.from(parsed.body);
            response.statusCode = 200;
            response.rawHeaders = [
                "Content-Type",
                contentType
            ];
            response.headers = {
                "content-type": contentType
            };
        } catch (err) {
            process.nextTick(()=>client.emit("error", err));
            return client;
        }
        client.abort = ()=>{
        // do nothing
        };
        process.nextTick(()=>{
            client.emit("response", response, urlObj.href);
            process.nextTick(()=>{
                response.emit("data", buffer);
                client.emit("data", buffer);
                response.emit("end");
                client.emit("end");
            });
        });
        return client;
    }
    const agents = agentFactory(flag.proxy, flag.strictSSL);
    const requestHeaders = {};
    for(const header in flag.requestHeaders){
        requestHeaders[header] = flag.requestHeaders[header];
    }
    if (getRequestHeader(flag.requestHeaders, "referer") === null) {
        requestHeaders.Referer = flag.referrer;
    }
    if (getRequestHeader(flag.requestHeaders, "user-agent") === null) {
        requestHeaders["User-Agent"] = flag.userAgent;
    }
    if (getRequestHeader(flag.requestHeaders, "accept-language") === null) {
        requestHeaders["Accept-Language"] = "en";
    }
    if (getRequestHeader(flag.requestHeaders, "accept") === null) {
        requestHeaders.Accept = "*/*";
    }
    const crossOrigin = flag.origin !== urlObj.origin;
    if (crossOrigin) {
        requestHeaders.Origin = flag.origin;
    }
    const options = {
        rejectUnauthorized: flag.strictSSL,
        agents,
        followRedirects: true
    };
    if (flag.auth) {
        options.user = flag.auth.user || "";
        options.pass = flag.auth.pass || "";
    }
    if (flag.cookieJar && (!crossOrigin || flag.withCredentials)) {
        options.cookieJar = flag.cookieJar;
    }
    const { body } = flag;
    const hasBody = body !== undefined && body !== null && body !== "" && !(ucMethod === "HEAD" || ucMethod === "GET");
    if (hasBody && getRequestHeader(flag.requestHeaders, "content-type") === null) {
        requestHeaders["Content-Type"] = "text/plain;charset=UTF-8";
    }
    function doRequest() {
        try {
            requestHeaders["Accept-Encoding"] = "gzip, deflate";
            let len = 0;
            if (hasBody) {
                len = body.byteLength;
                requestHeaders["Content-Length"] = len;
            }
            const requestClient = new Request(uri, options, {
                method: flag.method,
                headers: requestHeaders
            });
            if (hasBody) {
                requestClient.write(body);
            }
            return requestClient;
        } catch (e) {
            const eventEmitterclient = new EventEmitter();
            process.nextTick(()=>eventEmitterclient.emit("error", e));
            eventEmitterclient.end = ()=>{};
            eventEmitterclient.abort = ()=>{
            // do nothing
            };
            return eventEmitterclient;
        }
    }
    let client;
    const nonSimpleHeaders = Object.keys(flag.requestHeaders).filter((header)=>!simpleHeaders.has(header.toLowerCase()));
    if (crossOrigin && (!simpleMethods.has(ucMethod) || nonSimpleHeaders.length > 0 || properties.uploadListener)) {
        client = new EventEmitter();
        const preflightRequestHeaders = {};
        for(const header in requestHeaders){
            // the only existing request headers the cors spec allows on the preflight request are Origin and Referer
            const lcHeader = header.toLowerCase();
            if (lcHeader === "origin" || lcHeader === "referer") {
                preflightRequestHeaders[header] = requestHeaders[header];
            }
        }
        preflightRequestHeaders["Access-Control-Request-Method"] = flag.method;
        if (nonSimpleHeaders.length > 0) {
            preflightRequestHeaders["Access-Control-Request-Headers"] = nonSimpleHeaders.join(", ");
        }
        preflightRequestHeaders["User-Agent"] = flag.userAgent;
        flag.preflight = true;
        const rejectUnauthorized = flag.strictSSL;
        const preflightClient = new Request(uri, {
            agents,
            followRedirects: false
        }, {
            method: "OPTIONS",
            headers: preflightRequestHeaders,
            rejectUnauthorized
        });
        preflightClient.on("response", (resp)=>{
            // don't send the real request if the preflight request returned an error
            if (resp.statusCode < 200 || resp.statusCode > 299) {
                client.emit("error", new Error("Response for preflight has invalid HTTP status code " + resp.statusCode));
                return;
            }
            // don't send the real request if we aren't allowed to use the headers
            if (!validCORSPreflightHeaders(xhr, resp, flag, properties)) {
                setResponseToNetworkError(xhr);
                return;
            }
            // Set request gzip option right before headers are set
            const realClient = doRequest();
            realClient.on("response", (...args)=>client.emit("response", ...args));
            realClient.on("data", (chunk)=>client.emit("data", chunk));
            realClient.on("end", ()=>client.emit("end"));
            realClient.on("abort", ()=>client.emit("abort"));
            realClient.on("request", (req)=>{
                client.headers = realClient.headers;
                client.emit("request", req);
            });
            realClient.on("redirect", (...args)=>{
                client.emit("redirect", ...args);
            });
            realClient.on("error", (err)=>{
                client.emit("error", err);
            });
            client.abort = ()=>{
                realClient.abort();
            };
            setImmediate(()=>realClient.end());
        });
        preflightClient.on("error", (err)=>{
            client.emit("error", err);
        });
        client.abort = ()=>{
            preflightClient.abort();
        };
        setImmediate(()=>preflightClient.end());
    } else {
        client = doRequest();
        setImmediate(()=>client.end());
    }
    if (requestManager) {
        const req = {
            abort () {
                properties.abortError = true;
                xhr.abort();
            }
        };
        requestManager.add(req);
        const rmReq = requestManager.remove.bind(requestManager, req);
        client.on("abort", rmReq);
        client.on("error", rmReq);
        client.on("end", rmReq);
    }
    return client;
}
exports.headerListSeparatorRegexp = headerListSeparatorRegexp;
exports.simpleHeaders = simpleHeaders;
exports.preflightHeaders = preflightHeaders;
exports.getRequestHeader = getRequestHeader;
exports.updateRequestHeader = updateRequestHeader;
exports.dispatchError = dispatchError;
exports.validCORSHeaders = validCORSHeaders;
exports.requestErrorSteps = requestErrorSteps;
exports.setResponseToNetworkError = setResponseToNetworkError;
exports.createClient = createClient;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/multipart-form-data.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const conversions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)");
// https://fetch.spec.whatwg.org/#concept-bodyinit-extract (note: always UTF-8)
// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#multipart%2Fform-data-encoding-algorithm
// https://andreubotella.github.io/multipart-form-data/
const utf8Encoder = new TextEncoder();
const contentDispositionPrefix = utf8Encoder.encode(`Content-Disposition: form-data; name="`);
const filenamePrefix = utf8Encoder.encode(`; filename="`);
const contentType = utf8Encoder.encode(`Content-Type: `);
// https://andreubotella.github.io/multipart-form-data/#multipart-form-data-boundary
function generateBoundary() {
    let boundary = "--------------------------";
    for(let i = 0; i < 24; ++i){
        boundary += Math.floor(Math.random() * 10).toString(16);
    }
    return utf8Encoder.encode(boundary);
}
// https://andreubotella.github.io/multipart-form-data/#escape-a-multipart-form-data-name
function escapeName(name, isFilename = false) {
    if (isFilename) {
        name = conversions.USVString(name);
    } else {
        name = name.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n");
    }
    const encoded = utf8Encoder.encode(name);
    const encodedWithSubs = [];
    for (const originalByte of encoded){
        if (originalByte === 0x0A) {
            encodedWithSubs.push(37, 48, 65); // `%0A`
        } else if (originalByte === 0x0D) {
            encodedWithSubs.push(37, 48, 68); // `%0D`
        } else if (originalByte === 0x22) {
            encodedWithSubs.push(37, 50, 50); // `%22`
        } else {
            encodedWithSubs.push(originalByte);
        }
    }
    return new Uint8Array(encodedWithSubs);
}
// https://andreubotella.github.io/multipart-form-data/#multipart-form-data-chunk-serializer
exports.serializeEntryList = (entries)=>{
    const boundary = generateBoundary();
    const outputChunks = [];
    for (const entry of entries){
        const chunkBytes = [
            45,
            45,
            ...boundary,
            0x0D,
            0x0A
        ];
        chunkBytes.push(...contentDispositionPrefix, ...escapeName(entry.name), 0x22 /* `"` */ );
        let { value } = entry;
        if (typeof value === "string") {
            chunkBytes.push(0x0D, 0x0A, 0x0D, 0x0A);
            value = value.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n");
            chunkBytes.push(...utf8Encoder.encode(value));
            chunkBytes.push(0x0D, 0x0A);
            outputChunks.push(new Uint8Array(chunkBytes));
        } else {
            // value is a FileImpl object
            chunkBytes.push(...filenamePrefix, ...escapeName(value.name, true), 0x22, 0x0D, 0x0A);
            const type = value.type !== "" ? value.type : "application/octet-stream";
            chunkBytes.push(...contentType, ...utf8Encoder.encode(type));
            chunkBytes.push(0x0D, 0x0A, 0x0D, 0x0A);
            outputChunks.push(new Uint8Array(chunkBytes), // The spec returns the File object here but for our purposes the bytes (as a `Buffer`) are more convenient.
            value._buffer, new Uint8Array([
                0x0D,
                0x0A
            ]));
        }
    }
    outputChunks.push(new Uint8Array([
        45,
        45
    ]), boundary, new Uint8Array([
        45,
        45
    ]), new Uint8Array([
        0x0D,
        0x0A
    ]));
    return {
        boundary,
        outputChunks
    };
};
// Inspired by https://andreubotella.github.io/multipart-form-data/#create-a-multipart-form-data-readable-stream
// (But we don't stream in jsdom, at least for now.)
exports.chunksToBuffer = (chunks)=>{
    return Buffer.concat(chunks);
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/xhr-sync-worker.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
const { JSDOM } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/api.js [app-ssr] (ecmascript)");
const { READY_STATES } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/xhr-utils.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const tough = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/index.js [app-ssr] (ecmascript)");
const dom = new JSDOM();
const xhr = new dom.window.XMLHttpRequest();
const xhrImpl = idlUtils.implForWrapper(xhr);
const chunks = [];
process.stdin.on("data", (chunk)=>{
    chunks.push(chunk);
});
process.stdin.on("end", ()=>{
    const buffer = Buffer.concat(chunks);
    const flag = JSON.parse(buffer.toString());
    if (flag.body && flag.body.type === "Buffer" && flag.body.data) {
        flag.body = Buffer.from(flag.body.data);
    }
    if (flag.cookieJar) {
        flag.cookieJar = tough.CookieJar.fromJSON(flag.cookieJar);
    }
    flag.synchronous = false;
    Object.assign(xhrImpl.flag, flag);
    const { properties } = xhrImpl;
    xhrImpl.readyState = READY_STATES.OPENED;
    try {
        xhr.addEventListener("loadend", ()=>{
            if (properties.error) {
                properties.error = properties.error.stack || util.inspect(properties.error);
            }
            process.stdout.write(JSON.stringify({
                responseURL: xhrImpl.responseURL,
                status: xhrImpl.status,
                statusText: xhrImpl.statusText,
                properties
            }), ()=>{
                process.exit(0);
            });
        }, false);
        xhr.send(flag.body);
    } catch (error) {
        properties.error += error.stack || util.inspect(error);
        process.stdout.write(JSON.stringify({
            responseURL: xhrImpl.responseURL,
            status: xhrImpl.status,
            statusText: xhrImpl.statusText,
            properties
        }), ()=>{
            process.exit(0);
        });
    }
});
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/XMLHttpRequest-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTTP_STATUS_CODES = __turbopack_context__.r("[externals]/http [external] (http, cjs)").STATUS_CODES;
const { spawnSync } = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)");
const { URL } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const whatwgEncoding = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-encoding@3.1.1/node_modules/whatwg-encoding/lib/whatwg-encoding.js [app-ssr] (ecmascript)");
const tough = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/index.js [app-ssr] (ecmascript)");
const MIMEType = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/mime-type.js [app-ssr] (ecmascript)");
const xhrUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/xhr-utils.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { asciiCaseInsensitiveMatch } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const Document = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Document.js [app-ssr] (ecmascript)");
const Blob = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Blob.js [app-ssr] (ecmascript)");
const FormData = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/FormData.js [app-ssr] (ecmascript)");
const XMLHttpRequestEventTargetImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/XMLHttpRequestEventTarget-impl.js [app-ssr] (ecmascript)").implementation;
const XMLHttpRequestUpload = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/XMLHttpRequestUpload.js [app-ssr] (ecmascript)");
const ProgressEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ProgressEvent.js [app-ssr] (ecmascript)");
const { isArrayBuffer } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { parseIntoDocument } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/parser/index.js [app-ssr] (ecmascript)");
const { fragmentSerialization } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/domparsing/serialization.js [app-ssr] (ecmascript)");
const { setupForSimpleEventAccessors } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-event-accessor.js [app-ssr] (ecmascript)");
const { parseJSONFromBytes } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/json.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const { copyToArrayBufferInNewRealm } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/binary-data.js [app-ssr] (ecmascript)");
const { serializeEntryList, chunksToBuffer } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/multipart-form-data.js [app-ssr] (ecmascript)");
const { READY_STATES } = xhrUtils;
const syncWorkerFile = ("TURBOPACK compile-time truthy", 1) ? "[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/xhr/xhr-sync-worker.js [app-ssr] (ecmascript)" : "TURBOPACK unreachable";
const tokenRegexp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
const fieldValueRegexp = /^[ \t]*(?:[\x21-\x7E\x80-\xFF](?:[ \t][\x21-\x7E\x80-\xFF])?)*[ \t]*$/;
const utf8Decoder = new TextDecoder();
const forbiddenRequestHeaders = new Set([
    "accept-charset",
    "accept-encoding",
    "access-control-request-headers",
    "access-control-request-method",
    "connection",
    "content-length",
    "cookie",
    "cookie2",
    "date",
    "dnt",
    "expect",
    "host",
    "keep-alive",
    "origin",
    "referer",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
    "via"
]);
const forbiddenResponseHeaders = new Set([
    "set-cookie",
    "set-cookie2"
]);
const uniqueResponseHeaders = new Set([
    "content-type",
    "content-length",
    "user-agent",
    "referer",
    "host",
    "authorization",
    "proxy-authorization",
    "if-modified-since",
    "if-unmodified-since",
    "from",
    "location",
    "max-forwards"
]);
const corsSafeResponseHeaders = new Set([
    "cache-control",
    "content-language",
    "content-length",
    "content-type",
    "expires",
    "last-modified",
    "pragma"
]);
const allowedRequestMethods = new Set([
    "OPTIONS",
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "DELETE"
]);
const forbiddenRequestMethods = new Set([
    "TRACK",
    "TRACE",
    "CONNECT"
]);
class XMLHttpRequestImpl extends XMLHttpRequestEventTargetImpl {
    constructor(window){
        super(window);
        // Avoid running `_ownerDocument` getter multiple times in the constructor:
        const { _ownerDocument } = this;
        this.upload = XMLHttpRequestUpload.createImpl(window);
        this.readyState = READY_STATES.UNSENT;
        this.responseURL = "";
        this.status = 0;
        this.statusText = "";
        this.flag = {
            synchronous: false,
            withCredentials: false,
            mimeType: null,
            auth: null,
            method: undefined,
            responseType: "",
            requestHeaders: {},
            referrer: _ownerDocument.URL,
            uri: "",
            timeout: 0,
            body: undefined,
            preflight: false,
            requestManager: _ownerDocument._requestManager,
            strictSSL: window._resourceLoader._strictSSL,
            proxy: window._resourceLoader._proxy,
            cookieJar: _ownerDocument._cookieJar,
            encoding: _ownerDocument._encoding,
            origin: window._origin,
            userAgent: window.navigator.userAgent
        };
        this.properties = {
            beforeSend: false,
            send: false,
            client: null,
            timeoutStart: 0,
            timeoutId: 0,
            timeoutFn: null,
            responseBuffer: null,
            responseCache: null,
            responseTextCache: null,
            responseXMLCache: null,
            responseHeaders: {},
            filteredResponseHeaders: [],
            error: "",
            uploadComplete: false,
            uploadListener: false,
            // Signifies that we're calling abort() from xhr-utils.js because of a window shutdown.
            // In that case the termination reason is "fatal", not "end-user abort".
            abortError: false,
            cookieJar: _ownerDocument._cookieJar,
            bufferStepSize: 1 * 1024 * 1024,
            totalReceivedChunkSize: 0
        };
    }
    get responseType() {
        return this.flag.responseType;
    }
    set responseType(responseType) {
        const { flag } = this;
        if (this.readyState === READY_STATES.LOADING || this.readyState === READY_STATES.DONE) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        if (this.readyState === READY_STATES.OPENED && flag.synchronous) {
            throw DOMException.create(this._globalObject, [
                "The object does not support the operation or argument.",
                "InvalidAccessError"
            ]);
        }
        flag.responseType = responseType;
    }
    get response() {
        const { properties } = this;
        if (properties.responseCache) {
            // Needed because of: https://github.com/jsdom/webidl2js/issues/149
            return idlUtils.tryWrapperForImpl(properties.responseCache);
        }
        let res;
        const responseBuffer = properties.responseBuffer ? properties.responseBuffer.slice(0, properties.totalReceivedChunkSize) : null;
        switch(this.responseType){
            case "":
            case "text":
                {
                    res = this.responseText;
                    break;
                }
            case "arraybuffer":
                {
                    if (!responseBuffer) {
                        return null;
                    }
                    res = copyToArrayBufferInNewRealm(responseBuffer, this._globalObject);
                    break;
                }
            case "blob":
                {
                    if (!responseBuffer) {
                        return null;
                    }
                    const contentType = finalMIMEType(this);
                    res = Blob.createImpl(this._globalObject, [
                        [
                            new Uint8Array(responseBuffer)
                        ],
                        {
                            type: contentType || ""
                        }
                    ]);
                    break;
                }
            case "document":
                {
                    res = this.responseXML;
                    break;
                }
            case "json":
                {
                    if (this.readyState !== READY_STATES.DONE || !responseBuffer) {
                        res = null;
                    }
                    try {
                        res = parseJSONFromBytes(responseBuffer);
                    } catch  {
                        res = null;
                    }
                    break;
                }
        }
        properties.responseCache = res;
        // Needed because of: https://github.com/jsdom/webidl2js/issues/149
        return idlUtils.tryWrapperForImpl(res);
    }
    get responseText() {
        const { properties } = this;
        if (this.responseType !== "" && this.responseType !== "text") {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        if (this.readyState !== READY_STATES.LOADING && this.readyState !== READY_STATES.DONE) {
            return "";
        }
        if (properties.responseTextCache) {
            return properties.responseTextCache;
        }
        const responseBuffer = properties.responseBuffer ? properties.responseBuffer.slice(0, properties.totalReceivedChunkSize) : null;
        if (!responseBuffer) {
            return "";
        }
        const fallbackEncoding = finalCharset(this) || whatwgEncoding.getBOMEncoding(responseBuffer) || "UTF-8";
        const res = whatwgEncoding.decode(responseBuffer, fallbackEncoding);
        properties.responseTextCache = res;
        return res;
    }
    get responseXML() {
        const { flag, properties } = this;
        if (this.responseType !== "" && this.responseType !== "document") {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        if (this.readyState !== READY_STATES.DONE) {
            return null;
        }
        if (properties.responseXMLCache) {
            return properties.responseXMLCache;
        }
        const responseBuffer = properties.responseBuffer ? properties.responseBuffer.slice(0, properties.totalReceivedChunkSize) : null;
        if (!responseBuffer) {
            return null;
        }
        const contentType = finalMIMEType(this);
        let isHTML = false;
        let isXML = false;
        const parsed = MIMEType.parse(contentType);
        if (parsed) {
            isHTML = parsed.isHTML();
            isXML = parsed.isXML();
            if (!isXML && !isHTML) {
                return null;
            }
        }
        if (this.responseType === "" && isHTML) {
            return null;
        }
        const encoding = finalCharset(this) || whatwgEncoding.getBOMEncoding(responseBuffer) || "UTF-8";
        const resText = whatwgEncoding.decode(responseBuffer, encoding);
        if (!resText) {
            return null;
        }
        const res = Document.createImpl(this._globalObject, [], {
            options: {
                url: flag.uri,
                lastModified: new Date(getResponseHeader(this, "last-modified")),
                parsingMode: isHTML ? "html" : "xml",
                cookieJar: {
                    setCookieSync: ()=>undefined,
                    getCookieStringSync: ()=>""
                },
                encoding,
                parseOptions: this._ownerDocument._parseOptions
            }
        });
        try {
            parseIntoDocument(resText, res);
        } catch  {
            properties.responseXMLCache = null;
            return null;
        }
        res.close();
        properties.responseXMLCache = res;
        return res;
    }
    get timeout() {
        return this.flag.timeout;
    }
    set timeout(val) {
        const { flag, properties } = this;
        if (flag.synchronous) {
            throw DOMException.create(this._globalObject, [
                "The object does not support the operation or argument.",
                "InvalidAccessError"
            ]);
        }
        flag.timeout = val;
        clearTimeout(properties.timeoutId);
        if (val > 0 && properties.timeoutFn) {
            properties.timeoutId = setTimeout(properties.timeoutFn, Math.max(0, val - (new Date().getTime() - properties.timeoutStart)));
        } else {
            properties.timeoutFn = null;
            properties.timeoutStart = 0;
        }
    }
    get withCredentials() {
        return this.flag.withCredentials;
    }
    set withCredentials(val) {
        const { flag, properties } = this;
        if (!(this.readyState === READY_STATES.UNSENT || this.readyState === READY_STATES.OPENED)) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        if (properties.send) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        flag.withCredentials = val;
    }
    abort() {
        const { properties } = this;
        // Terminate the request
        clearTimeout(properties.timeoutId);
        properties.timeoutFn = null;
        properties.timeoutStart = 0;
        const { client } = properties;
        if (client) {
            client.abort();
            properties.client = null;
        }
        if (properties.abortError) {
            // Special case that ideally shouldn't be going through the public API at all.
            // Run the https://xhr.spec.whatwg.org/#handle-errors "fatal" steps.
            this.readyState = READY_STATES.DONE;
            properties.send = false;
            xhrUtils.setResponseToNetworkError(this);
            return;
        }
        if (this.readyState === READY_STATES.OPENED && properties.send || this.readyState === READY_STATES.HEADERS_RECEIVED || this.readyState === READY_STATES.LOADING) {
            xhrUtils.requestErrorSteps(this, "abort");
        }
        if (this.readyState === READY_STATES.DONE) {
            this.readyState = READY_STATES.UNSENT;
            xhrUtils.setResponseToNetworkError(this);
        }
    }
    getAllResponseHeaders() {
        const { properties, readyState } = this;
        if (readyState === READY_STATES.UNSENT || readyState === READY_STATES.OPENED) {
            return "";
        }
        return Object.keys(properties.responseHeaders).filter((key)=>properties.filteredResponseHeaders.indexOf(key) === -1).map((key)=>[
                key.toLowerCase(),
                properties.responseHeaders[key]
            ].join(": ")).join("\r\n");
    }
    getResponseHeader(header) {
        const { properties, readyState } = this;
        if (readyState === READY_STATES.UNSENT || readyState === READY_STATES.OPENED) {
            return null;
        }
        const lcHeader = header.toLowerCase();
        if (properties.filteredResponseHeaders.find((filtered)=>lcHeader === filtered.toLowerCase())) {
            return null;
        }
        return getResponseHeader(this, lcHeader);
    }
    open(method, uri, asynchronous, user, password) {
        const { flag, properties, _ownerDocument } = this;
        if (!_ownerDocument) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        if (!tokenRegexp.test(method)) {
            throw DOMException.create(this._globalObject, [
                "The string did not match the expected pattern.",
                "SyntaxError"
            ]);
        }
        const upperCaseMethod = method.toUpperCase();
        if (forbiddenRequestMethods.has(upperCaseMethod)) {
            throw DOMException.create(this._globalObject, [
                "The operation is insecure.",
                "SecurityError"
            ]);
        }
        const { client } = properties;
        if (client && typeof client.abort === "function") {
            client.abort();
        }
        if (allowedRequestMethods.has(upperCaseMethod)) {
            method = upperCaseMethod;
        }
        if (typeof asynchronous !== "undefined") {
            flag.synchronous = !asynchronous;
        } else {
            flag.synchronous = false;
        }
        if (flag.responseType && flag.synchronous) {
            throw DOMException.create(this._globalObject, [
                "The object does not support the operation or argument.",
                "InvalidAccessError"
            ]);
        }
        if (flag.synchronous && flag.timeout) {
            throw DOMException.create(this._globalObject, [
                "The object does not support the operation or argument.",
                "InvalidAccessError"
            ]);
        }
        flag.method = method;
        let urlObj;
        try {
            urlObj = new URL(uri, _ownerDocument.baseURLSerialized());
        } catch  {
            throw DOMException.create(this._globalObject, [
                "The string did not match the expected pattern.",
                "SyntaxError"
            ]);
        }
        if (user || password && !urlObj.username) {
            flag.auth = {
                user,
                pass: password
            };
            urlObj.username = "";
            urlObj.password = "";
        }
        flag.uri = urlObj.href;
        flag.requestHeaders = {};
        flag.preflight = false;
        properties.send = false;
        properties.uploadListener = false;
        properties.abortError = false;
        this.responseURL = "";
        readyStateChange(this, READY_STATES.OPENED);
    }
    overrideMimeType(mime) {
        const { readyState } = this;
        if (readyState === READY_STATES.LOADING || readyState === READY_STATES.DONE) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        this.flag.overrideMIMEType = "application/octet-stream";
        // Waiting for better spec: https://github.com/whatwg/xhr/issues/157
        const parsed = MIMEType.parse(mime);
        if (parsed) {
            this.flag.overrideMIMEType = parsed.essence;
            const charset = parsed.parameters.get("charset");
            if (charset) {
                this.flag.overrideCharset = whatwgEncoding.labelToName(charset);
            }
        }
    }
    // TODO: Add support for URLSearchParams and ReadableStream
    send(body) {
        const { flag, properties, upload, _ownerDocument } = this;
        // Not per spec, but per tests: https://github.com/whatwg/xhr/issues/65
        if (!_ownerDocument) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        if (this.readyState !== READY_STATES.OPENED || properties.send) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        properties.beforeSend = true;
        try {
            if (flag.method === "GET" || flag.method === "HEAD") {
                body = null;
            }
            if (body !== null) {
                let encoding = null;
                let mimeType = null;
                if (Document.isImpl(body)) {
                    encoding = "UTF-8";
                    mimeType = (body._parsingMode === "html" ? "text/html" : "application/xml") + ";charset=UTF-8";
                    flag.body = Buffer.from(fragmentSerialization(body, {
                        requireWellFormed: false
                    }));
                } else {
                    if (typeof body === "string") {
                        encoding = "UTF-8";
                    }
                    const { buffer, contentType } = extractBody(body);
                    mimeType = contentType;
                    flag.body = buffer;
                }
                const existingContentType = xhrUtils.getRequestHeader(flag.requestHeaders, "content-type");
                if (mimeType !== null && existingContentType === null) {
                    flag.requestHeaders["Content-Type"] = mimeType;
                } else if (existingContentType !== null && encoding !== null) {
                    // Waiting for better spec: https://github.com/whatwg/xhr/issues/188. This seems like a good guess at what
                    // the spec will be, in the meantime.
                    const parsed = MIMEType.parse(existingContentType);
                    if (parsed) {
                        const charset = parsed.parameters.get("charset");
                        if (charset && !asciiCaseInsensitiveMatch(charset, encoding) && encoding !== null) {
                            parsed.parameters.set("charset", encoding);
                            xhrUtils.updateRequestHeader(flag.requestHeaders, "content-type", parsed.toString());
                        }
                    }
                }
            }
        } finally{
            if (properties.beforeSend) {
                properties.beforeSend = false;
            } else {
                throw DOMException.create(this._globalObject, [
                    "The object is in an invalid state.",
                    "InvalidStateError"
                ]);
            }
        }
        if (Object.keys(upload._eventListeners).length > 0) {
            properties.uploadListener = true;
        }
        // request doesn't like zero-length bodies
        if (flag.body && flag.body.byteLength === 0) {
            flag.body = null;
        }
        if (flag.synchronous) {
            const flagStr = JSON.stringify(flag, function(k, v) {
                if (this === flag && k === "requestManager") {
                    return null;
                }
                if (this === flag && k === "pool" && v) {
                    return {
                        maxSockets: v.maxSockets
                    };
                }
                return v;
            });
            const res = spawnSync(process.execPath, [
                syncWorkerFile
            ], {
                input: flagStr,
                maxBuffer: Infinity
            });
            if (res.status !== 0) {
                throw new Error(res.stderr.toString());
            }
            if (res.error) {
                if (typeof res.error === "string") {
                    res.error = new Error(res.error);
                }
                throw res.error;
            }
            const response = JSON.parse(res.stdout.toString());
            const resProp = response.properties;
            if (resProp.responseBuffer && resProp.responseBuffer.data) {
                resProp.responseBuffer = Buffer.from(resProp.responseBuffer.data);
            }
            if (resProp.cookieJar) {
                resProp.cookieJar = tough.CookieJar.deserializeSync(resProp.cookieJar, _ownerDocument._cookieJar.store);
            }
            this.readyState = READY_STATES.LOADING;
            this.status = response.status;
            this.statusText = response.statusText;
            this.responseURL = response.responseURL;
            Object.assign(this.properties, response.properties);
            if (resProp.error) {
                xhrUtils.dispatchError(this);
                throw DOMException.create(this._globalObject, [
                    resProp.error,
                    "NetworkError"
                ]);
            } else {
                const { responseBuffer } = properties;
                const contentLength = getResponseHeader(this, "content-length") || "0";
                const bufferLength = parseInt(contentLength) || responseBuffer.length;
                const progressObj = {
                    lengthComputable: false
                };
                if (bufferLength !== 0) {
                    progressObj.total = bufferLength;
                    progressObj.loaded = bufferLength;
                    progressObj.lengthComputable = true;
                }
                fireAnEvent("progress", this, ProgressEvent, progressObj);
                readyStateChange(this, READY_STATES.DONE);
                fireAnEvent("load", this, ProgressEvent, progressObj);
                fireAnEvent("loadend", this, ProgressEvent, progressObj);
            }
        } else {
            properties.send = true;
            fireAnEvent("loadstart", this, ProgressEvent);
            const client = xhrUtils.createClient(this);
            properties.client = client;
            // For new client, reset totalReceivedChunkSize and bufferStepSize
            properties.totalReceivedChunkSize = 0;
            properties.bufferStepSize = 1 * 1024 * 1024;
            properties.origin = flag.origin;
            client.on("error", (err)=>{
                client.removeAllListeners();
                properties.error = err;
                xhrUtils.dispatchError(this);
            });
            client.on("response", (res, url)=>receiveResponse(this, res, url));
            client.on("redirect", (response, requestHeaders, currentURL)=>{
                const destUrlObj = new URL(requestHeaders.Referer);
                const urlObj = new URL(currentURL);
                if (destUrlObj.origin !== urlObj.origin && destUrlObj.origin !== flag.origin) {
                    properties.origin = "null";
                }
                requestHeaders.Origin = properties.origin;
                if (flag.origin !== destUrlObj.origin && destUrlObj.protocol !== "data:") {
                    if (!xhrUtils.validCORSHeaders(this, response, flag, properties, flag.origin)) {
                        return;
                    }
                    if (urlObj.username || urlObj.password) {
                        properties.error = "Userinfo forbidden in cors redirect";
                        xhrUtils.dispatchError(this);
                    }
                }
            });
            if (body !== null && body !== "") {
                properties.uploadComplete = false;
                setDispatchProgressEvents(this);
            } else {
                properties.uploadComplete = true;
            }
            if (this.timeout > 0) {
                properties.timeoutStart = new Date().getTime();
                properties.timeoutFn = ()=>{
                    client.abort();
                    if (!(this.readyState === READY_STATES.UNSENT || this.readyState === READY_STATES.OPENED && !properties.send || this.readyState === READY_STATES.DONE)) {
                        properties.send = false;
                        let stateChanged = false;
                        if (!properties.uploadComplete) {
                            fireAnEvent("progress", upload, ProgressEvent);
                            readyStateChange(this, READY_STATES.DONE);
                            fireAnEvent("timeout", upload, ProgressEvent);
                            fireAnEvent("loadend", upload, ProgressEvent);
                            stateChanged = true;
                        }
                        fireAnEvent("progress", this, ProgressEvent);
                        if (!stateChanged) {
                            readyStateChange(this, READY_STATES.DONE);
                        }
                        fireAnEvent("timeout", this, ProgressEvent);
                        fireAnEvent("loadend", this, ProgressEvent);
                    }
                    this.readyState = READY_STATES.UNSENT;
                };
                properties.timeoutId = setTimeout(properties.timeoutFn, this.timeout);
            }
        }
    }
    setRequestHeader(header, value) {
        const { flag, properties } = this;
        if (this.readyState !== READY_STATES.OPENED || properties.send) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        value = normalizeHeaderValue(value);
        if (!tokenRegexp.test(header) || !fieldValueRegexp.test(value)) {
            throw DOMException.create(this._globalObject, [
                "The string did not match the expected pattern.",
                "SyntaxError"
            ]);
        }
        const lcHeader = header.toLowerCase();
        if (forbiddenRequestHeaders.has(lcHeader) || lcHeader.startsWith("sec-") || lcHeader.startsWith("proxy-")) {
            return;
        }
        const keys = Object.keys(flag.requestHeaders);
        let n = keys.length;
        while(n--){
            const key = keys[n];
            if (key.toLowerCase() === lcHeader) {
                flag.requestHeaders[key] += ", " + value;
                return;
            }
        }
        flag.requestHeaders[header] = value;
    }
}
setupForSimpleEventAccessors(XMLHttpRequestImpl.prototype, [
    "readystatechange"
]);
function readyStateChange(xhr, readyState) {
    if (xhr.readyState === readyState) {
        return;
    }
    xhr.readyState = readyState;
    fireAnEvent("readystatechange", xhr);
}
function receiveResponse(xhr, response, currentURL) {
    const { flag, properties } = xhr;
    const { rawHeaders, statusCode } = response;
    let byteOffset = 0;
    const headers = {};
    const filteredResponseHeaders = [];
    const headerMap = {};
    const n = Number(rawHeaders.length);
    for(let i = 0; i < n; i += 2){
        const k = rawHeaders[i];
        const kl = k.toLowerCase();
        const v = rawHeaders[i + 1];
        if (uniqueResponseHeaders.has(kl)) {
            if (headerMap[kl] !== undefined) {
                delete headers[headerMap[kl]];
            }
            headers[k] = v;
        } else if (headerMap[kl] !== undefined) {
            headers[headerMap[kl]] += ", " + v;
        } else {
            headers[k] = v;
        }
        headerMap[kl] = k;
    }
    const destUrlObj = new URL(currentURL);
    if (properties.origin !== destUrlObj.origin && destUrlObj.protocol !== "data:") {
        if (!xhrUtils.validCORSHeaders(xhr, response, flag, properties, properties.origin)) {
            return;
        }
        const acehStr = response.headers["access-control-expose-headers"];
        const aceh = new Set(acehStr ? acehStr.trim().toLowerCase().split(xhrUtils.headerListSeparatorRegexp) : []);
        for(const header in headers){
            const lcHeader = header.toLowerCase();
            if (!corsSafeResponseHeaders.has(lcHeader) && !aceh.has(lcHeader)) {
                filteredResponseHeaders.push(header);
            }
        }
    }
    for(const header in headers){
        const lcHeader = header.toLowerCase();
        if (forbiddenResponseHeaders.has(lcHeader)) {
            filteredResponseHeaders.push(header);
        }
    }
    xhr.responseURL = destUrlObj.href;
    xhr.status = statusCode;
    xhr.statusText = response.statusMessage || HTTP_STATUS_CODES[statusCode] || "";
    properties.responseHeaders = headers;
    properties.filteredResponseHeaders = filteredResponseHeaders;
    const contentLength = getResponseHeader(xhr, "content-length") || "0";
    const bufferLength = parseInt(contentLength) || 0;
    const progressObj = {
        lengthComputable: false
    };
    let lastProgressReported;
    if (bufferLength !== 0) {
        progressObj.total = bufferLength;
        progressObj.loaded = 0;
        progressObj.lengthComputable = true;
    }
    // pre-allocate buffer.
    properties.responseBuffer = Buffer.alloc(properties.bufferStepSize);
    properties.responseCache = null;
    properties.responseTextCache = null;
    properties.responseXMLCache = null;
    readyStateChange(xhr, READY_STATES.HEADERS_RECEIVED);
    if (!properties.client) {
        // The request was aborted in reaction to the readystatechange event.
        return;
    }
    // Can't use the client since the client gets the post-ungzipping bytes (which can be greater than the
    // Content-Length).
    response.on("data", (chunk)=>{
        byteOffset += chunk.length;
        progressObj.loaded = byteOffset;
    });
    properties.client.on("data", (chunk)=>{
        properties.totalReceivedChunkSize += chunk.length;
        if (properties.totalReceivedChunkSize >= properties.bufferStepSize) {
            properties.bufferStepSize *= 2;
            while(properties.totalReceivedChunkSize >= properties.bufferStepSize){
                properties.bufferStepSize *= 2;
            }
            const tmpBuf = Buffer.alloc(properties.bufferStepSize);
            properties.responseBuffer.copy(tmpBuf, 0, 0, properties.responseBuffer.length);
            properties.responseBuffer = tmpBuf;
        }
        chunk.copy(properties.responseBuffer, properties.totalReceivedChunkSize - chunk.length, 0, chunk.length);
        properties.responseCache = null;
        properties.responseTextCache = null;
        properties.responseXMLCache = null;
        if (xhr.readyState === READY_STATES.HEADERS_RECEIVED) {
            xhr.readyState = READY_STATES.LOADING;
        }
        fireAnEvent("readystatechange", xhr);
        if (progressObj.total !== progressObj.loaded || properties.totalReceivedChunkSize === byteOffset) {
            if (lastProgressReported !== progressObj.loaded) {
                // This is a necessary check in the gzip case where we can be getting new data from the client, as it
                // un-gzips, but no new data has been gotten from the response, so we should not fire a progress event.
                lastProgressReported = progressObj.loaded;
                fireAnEvent("progress", xhr, ProgressEvent, progressObj);
            }
        }
    });
    properties.client.on("end", ()=>{
        clearTimeout(properties.timeoutId);
        properties.timeoutFn = null;
        properties.timeoutStart = 0;
        properties.client = null;
        if (lastProgressReported !== progressObj.loaded) {
            // https://github.com/whatwg/xhr/issues/318
            fireAnEvent("progress", xhr, ProgressEvent, progressObj);
        }
        readyStateChange(xhr, READY_STATES.DONE);
        fireAnEvent("load", xhr, ProgressEvent, progressObj);
        fireAnEvent("loadend", xhr, ProgressEvent, progressObj);
    });
}
function setDispatchProgressEvents(xhr) {
    const { properties, upload } = xhr;
    const { client } = properties;
    let total = 0;
    let lengthComputable = false;
    const length = client.headers && parseInt(xhrUtils.getRequestHeader(client.headers, "content-length"));
    if (length) {
        total = length;
        lengthComputable = true;
    }
    const initProgress = {
        lengthComputable,
        total,
        loaded: 0
    };
    if (properties.uploadListener) {
        fireAnEvent("loadstart", upload, ProgressEvent, initProgress);
    }
    client.on("request", (req)=>{
        req.on("response", ()=>{
            properties.uploadComplete = true;
            if (!properties.uploadListener) {
                return;
            }
            const progress = {
                lengthComputable,
                total,
                loaded: total
            };
            fireAnEvent("progress", upload, ProgressEvent, progress);
            fireAnEvent("load", upload, ProgressEvent, progress);
            fireAnEvent("loadend", upload, ProgressEvent, progress);
        });
    });
}
function finalMIMEType(xhr) {
    const { flag } = xhr;
    return flag.overrideMIMEType || getResponseHeader(xhr, "content-type");
}
function finalCharset(xhr) {
    const { flag } = xhr;
    if (flag.overrideCharset) {
        return flag.overrideCharset;
    }
    const parsedContentType = MIMEType.parse(getResponseHeader(xhr, "content-type"));
    if (parsedContentType) {
        return whatwgEncoding.labelToName(parsedContentType.parameters.get("charset"));
    }
    return null;
}
function getResponseHeader(xhr, lcHeader) {
    const { properties } = xhr;
    const keys = Object.keys(properties.responseHeaders);
    let n = keys.length;
    while(n--){
        const key = keys[n];
        if (key.toLowerCase() === lcHeader) {
            return properties.responseHeaders[key];
        }
    }
    return null;
}
function normalizeHeaderValue(value) {
    return value.replace(/^[\x09\x0A\x0D\x20]+/, "").replace(/[\x09\x0A\x0D\x20]+$/, "");
}
function extractBody(bodyInit) {
    // https://fetch.spec.whatwg.org/#concept-bodyinit-extract
    // except we represent the body as a Node.js Buffer instead.
    if (Blob.isImpl(bodyInit)) {
        return {
            buffer: bodyInit._buffer,
            contentType: bodyInit.type === "" ? null : bodyInit.type
        };
    } else if (isArrayBuffer(bodyInit)) {
        return {
            buffer: Buffer.from(bodyInit),
            contentType: null
        };
    } else if (ArrayBuffer.isView(bodyInit)) {
        return {
            buffer: Buffer.from(bodyInit.buffer, bodyInit.byteOffset, bodyInit.byteLength),
            contentType: null
        };
    } else if (FormData.isImpl(bodyInit)) {
        const { boundary, outputChunks } = serializeEntryList(bodyInit._entries);
        return {
            buffer: chunksToBuffer(outputChunks),
            contentType: "multipart/form-data; boundary=" + utf8Decoder.decode(boundary)
        };
    }
    // Must be a string
    return {
        buffer: Buffer.from(bodyInit, "utf-8"),
        contentType: "text/plain;charset=UTF-8"
    };
}
exports.implementation = XMLHttpRequestImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/websockets/WebSocket-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const nodeURL = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { parseURL, serializeURL, serializeURLOrigin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const WebSocket = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/ws@8.18.3/node_modules/ws/index.js [app-ssr] (ecmascript)");
const { setupForSimpleEventAccessors } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-event-accessor.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const { isArrayBuffer } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { copyToArrayBufferInNewRealm } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/binary-data.js [app-ssr] (ecmascript)");
const EventTargetImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js [app-ssr] (ecmascript)").implementation;
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const Blob = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Blob.js [app-ssr] (ecmascript)");
const CloseEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CloseEvent.js [app-ssr] (ecmascript)");
const MessageEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MessageEvent.js [app-ssr] (ecmascript)");
const CONNECTING = 0;
const OPEN = 1;
const CLOSING = 2;
const CLOSED = 3;
const productions = {
    // https://tools.ietf.org/html/rfc7230#section-3.2.6
    token: /^[!#$%&'*+\-.^_`|~\dA-Za-z]+$/
};
const readyStateWSToDOM = [];
readyStateWSToDOM[WebSocket.CONNECTING] = CONNECTING;
readyStateWSToDOM[WebSocket.OPEN] = OPEN;
readyStateWSToDOM[WebSocket.CLOSING] = CLOSING;
readyStateWSToDOM[WebSocket.CLOSED] = CLOSED;
// https://tools.ietf.org/html/rfc6455#section-4.3
// See Sec-WebSocket-Protocol-Client, which is for the syntax of an entire header value. This function checks if a
// single header conforms to the rules.
function verifySecWebSocketProtocol(str) {
    return productions.token.test(str);
}
class PromiseQueues extends WeakMap {
    get(window) {
        const cur = super.get(window);
        return cur !== undefined ? cur : Promise.resolve();
    }
}
const openSockets = new WeakMap();
const openingQueues = new PromiseQueues();
class WebSocketImpl extends EventTargetImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._ownerDocument = idlUtils.implForWrapper(globalObject._document);
        const url = args[0];
        let protocols = args[1] !== undefined ? args[1] : [];
        const urlRecord = parseURL(url);
        if (urlRecord === null) {
            throw DOMException.create(this._globalObject, [
                `The URL '${url}' is invalid.`,
                "SyntaxError"
            ]);
        }
        if (urlRecord.scheme !== "ws" && urlRecord.scheme !== "wss") {
            throw DOMException.create(this._globalObject, [
                `The URL's scheme must be either 'ws' or 'wss'. '${urlRecord.scheme}' is not allowed.`,
                "SyntaxError"
            ]);
        }
        if (urlRecord.fragment !== null) {
            throw DOMException.create(this._globalObject, [
                `The URL contains a fragment identifier ('${urlRecord.fragment}'). Fragment identifiers ` + "are not allowed in WebSocket URLs.",
                "SyntaxError"
            ]);
        }
        if (typeof protocols === "string") {
            protocols = [
                protocols
            ];
        }
        const protocolSet = new Set();
        for (const protocol of protocols){
            if (!verifySecWebSocketProtocol(protocol)) {
                throw DOMException.create(this._globalObject, [
                    `The subprotocol '${protocol}' is invalid.`,
                    "SyntaxError"
                ]);
            }
            const lowered = protocol.toLowerCase();
            if (protocolSet.has(lowered)) {
                throw DOMException.create(this._globalObject, [
                    `The subprotocol '${protocol}' is duplicated.`,
                    "SyntaxError"
                ]);
            }
            protocolSet.add(lowered);
        }
        this._urlRecord = urlRecord;
        this.url = serializeURL(urlRecord);
        const nodeParsedURL = nodeURL.parse(this.url);
        this.extensions = "";
        this.binaryType = "blob";
        this._ws = null;
        // Used when this._ws has not been initialized yet.
        this._readyState = CONNECTING;
        this._requiredToFail = false;
        this.bufferedAmount = 0;
        this._sendQueue = [];
        let openSocketsForWindow = openSockets.get(globalObject._globalProxy);
        if (openSocketsForWindow === undefined) {
            openSocketsForWindow = new Set();
            openSockets.set(globalObject._globalProxy, openSocketsForWindow);
        }
        openSocketsForWindow.add(this);
        openingQueues.set(this._ownerDocument, openingQueues.get(this._ownerDocument).then(()=>new Promise((resolve)=>{
                // close() called before _ws has been initialized.
                if (this._requiredToFail) {
                    resolve();
                    this._readyState = CLOSED;
                    this._onConnectionClosed(1006, "");
                    return;
                }
                this._ws = new WebSocket(this.url, protocols, {
                    headers: {
                        "user-agent": globalObject.navigator.userAgent,
                        "cookie": this._ownerDocument._cookieJar.getCookieStringSync(nodeParsedURL, {
                            http: true
                        }),
                        "origin": globalObject._origin
                    },
                    rejectUnauthorized: globalObject._resourceLoader._strictSSL
                });
                this._ws.once("open", ()=>{
                    resolve();
                    this._onConnectionEstablished();
                });
                this._ws.on("message", this._onMessageReceived.bind(this));
                this._ws.once("close", (...closeArgs)=>{
                    resolve();
                    this._onConnectionClosed(...closeArgs);
                });
                this._ws.once("upgrade", ({ headers })=>{
                    if (Array.isArray(headers["set-cookie"])) {
                        for (const cookie of headers["set-cookie"]){
                            this._ownerDocument._cookieJar.setCookieSync(cookie, nodeParsedURL, {
                                http: true,
                                ignoreError: true
                            });
                        }
                    } else if (headers["set-cookie"] !== undefined) {
                        this._ownerDocument._cookieJar.setCookieSync(headers["set-cookie"], nodeParsedURL, {
                            http: true,
                            ignoreError: true
                        });
                    }
                });
                this._ws.once("error", ()=>{
                    // The exact error is passed into this callback, but it is ignored as we don't really care about it.
                    resolve();
                    this._requiredToFail = true;
                // Do not emit an error here, as that will be handled in _onConnectionClosed. ws always emits a close event
                // after errors.
                });
            })));
    }
    // https://html.spec.whatwg.org/multipage/web-sockets.html#make-disappear
    _makeDisappear() {
        this._eventListeners = Object.create(null);
        this._close(1001);
    }
    static cleanUpWindow(window) {
        const openSocketsForWindow = openSockets.get(window._globalProxy);
        if (openSocketsForWindow !== undefined) {
            for (const ws of openSocketsForWindow){
                ws._makeDisappear();
            }
        }
    }
    // https://html.spec.whatwg.org/multipage/web-sockets.html#feedback-from-the-protocol
    _onConnectionEstablished() {
        // readyState is a getter.
        if (this._ws.extensions !== null) {
            // Right now, ws only supports one extension, permessage-deflate, without any parameters. This algorithm may need
            // to be more sophiscated as more extenions are supported.
            this.extensions = Object.keys(this._ws.extensions).join(", ");
        }
        // protocol is a getter.
        fireAnEvent("open", this);
    }
    _onMessageReceived(data, isBinary) {
        if (this.readyState !== OPEN) {
            return;
        }
        let dataForEvent;
        if (!isBinary) {
            dataForEvent = data.toString();
        } else if (this.binaryType === "arraybuffer") {
            if (isArrayBuffer(data)) {
                dataForEvent = data;
            } else if (Array.isArray(data)) {
                dataForEvent = copyToArrayBufferInNewRealm(Buffer.concat(data), this._globalObject);
            } else {
                dataForEvent = copyToArrayBufferInNewRealm(data, this._globalObject);
            }
        } else {
            if (!Array.isArray(data)) {
                data = [
                    data
                ];
            }
            dataForEvent = Blob.create(this._globalObject, [
                data,
                {
                    type: ""
                }
            ]);
        }
        fireAnEvent("message", this, MessageEvent, {
            data: dataForEvent,
            origin: serializeURLOrigin(this._urlRecord)
        });
    }
    _onConnectionClosed(code, reason) {
        const openSocketsForWindow = openSockets.get(this._ownerDocument._defaultView);
        openSocketsForWindow.delete(this);
        const wasClean = !this._requiredToFail;
        if (this._requiredToFail) {
            fireAnEvent("error", this);
        }
        fireAnEvent("close", this, CloseEvent, {
            wasClean,
            code,
            reason: reason.toString()
        });
    }
    get readyState() {
        if (this._ws !== null) {
            return readyStateWSToDOM[this._ws.readyState];
        }
        return this._readyState;
    }
    get protocol() {
        if (this._ws === null) {
            return "";
        }
        return this._ws.protocol;
    }
    close(code = undefined, reason = undefined) {
        if (code !== undefined && code !== 1000 && !(code >= 3000 && code <= 4999)) {
            throw DOMException.create(this._globalObject, [
                `The code must be either 1000, or between 3000 and 4999. ${code} is neither.`,
                "InvalidAccessError"
            ]);
        }
        if (reason !== undefined && Buffer.byteLength(reason, "utf8") > 123) {
            throw DOMException.create(this._globalObject, [
                "The message must not be greater than 123 bytes.",
                "SyntaxError"
            ]);
        }
        this._close(code, reason);
    }
    _close(code = undefined, reason = undefined) {
        if (this.readyState === CONNECTING) {
            this._requiredToFail = true;
            if (this._ws !== null) {
                this._ws.terminate();
            } else {
                this._readyState = CLOSING;
            }
        } else if (this.readyState === OPEN) {
            this._ws.close(code, reason);
        }
    }
    send(data) {
        if (this.readyState === CONNECTING) {
            throw DOMException.create(this._globalObject, [
                "Still in CONNECTING state.",
                "InvalidStateError"
            ]);
        }
        if (this.readyState !== OPEN) {
            return;
        }
        if (Blob.isImpl(data)) {
            data = data._buffer;
        }
        let length;
        if (typeof data === "string") {
            length = Buffer.byteLength(data, "utf8");
        } else {
            length = data.byteLength;
        }
        this.bufferedAmount += length;
        this._sendQueue.push([
            data,
            length
        ]);
        this._scheduleSend();
    }
    _actuallySend() {
        for (const [data, length] of this._sendQueue.splice(0)){
            this._ws.send(data, {
                binary: typeof data !== "string"
            }, ()=>{
                this.bufferedAmount -= length;
            });
        }
    }
    _scheduleSend() {
        if (this._dequeueScheduled) {
            return;
        }
        this._dequeueScheduled = true;
        process.nextTick(()=>{
            this._dequeueScheduled = false;
            this._actuallySend();
        });
    }
}
setupForSimpleEventAccessors(WebSocketImpl.prototype, [
    "open",
    "message",
    "error",
    "close"
]);
exports.implementation = WebSocketImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/selection/Selection-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { nodeLength, nodeRoot } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/node.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { compareBoundaryPointsPosition } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/range/boundary-point.js [app-ssr] (ecmascript)");
const { setBoundaryPointStart, setBoundaryPointEnd } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/range/Range-impl.js [app-ssr] (ecmascript)");
const Range = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Range.js [app-ssr] (ecmascript)");
const { implForWrapper } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
// https://w3c.github.io/selection-api/#dfn-direction
const SELECTION_DIRECTION = {
    FORWARDS: 1,
    BACKWARDS: -1,
    DIRECTIONLESS: 0
};
// https://w3c.github.io/selection-api/#dom-selection
class SelectionImpl {
    constructor(globalObject){
        this._range = null;
        this._direction = SELECTION_DIRECTION.DIRECTIONLESS;
        this._globalObject = globalObject;
    }
    // https://w3c.github.io/selection-api/#dom-selection-anchornode
    get anchorNode() {
        const anchor = this._anchor;
        return anchor ? anchor.node : null;
    }
    // https://w3c.github.io/selection-api/#dom-selection-anchoroffset
    get anchorOffset() {
        const anchor = this._anchor;
        return anchor ? anchor.offset : 0;
    }
    // https://w3c.github.io/selection-api/#dom-selection-focusnode
    get focusNode() {
        const focus = this._focus;
        return focus ? focus.node : null;
    }
    // https://w3c.github.io/selection-api/#dom-selection-focusoffset
    get focusOffset() {
        const focus = this._focus;
        return focus ? focus.offset : 0;
    }
    // https://w3c.github.io/selection-api/#dom-selection-iscollapsed
    get isCollapsed() {
        return this._range === null || this._range.collapsed;
    }
    // https://w3c.github.io/selection-api/#dom-selection-rangecount
    get rangeCount() {
        return this._isEmpty() ? 0 : 1;
    }
    // https://w3c.github.io/selection-api/#dom-selection-type
    get type() {
        if (this._isEmpty()) {
            return "None";
        } else if (this._range.collapsed) {
            return "Caret";
        }
        return "Range";
    }
    // https://w3c.github.io/selection-api/#dom-selection-getrangeat
    getRangeAt(index) {
        if (index !== 0 || this._isEmpty()) {
            throw DOMException.create(this._globalObject, [
                "Invalid range index.",
                "IndexSizeError"
            ]);
        }
        return this._range;
    }
    // https://w3c.github.io/selection-api/#dom-selection-addrange
    addRange(range) {
        if (range._root === implForWrapper(this._globalObject._document) && this.rangeCount === 0) {
            this._associateRange(range);
        }
    }
    // https://w3c.github.io/selection-api/#dom-selection-removerange
    removeRange(range) {
        if (range !== this._range) {
            throw DOMException.create(this._globalObject, [
                "Invalid range.",
                "NotFoundError"
            ]);
        }
        this._associateRange(null);
    }
    // https://w3c.github.io/selection-api/#dom-selection-removeallranges
    removeAllRanges() {
        this._associateRange(null);
    }
    // https://w3c.github.io/selection-api/#dom-selection-empty
    empty() {
        this.removeAllRanges();
    }
    // https://w3c.github.io/selection-api/#dom-selection-collapse
    collapse(node, offset) {
        if (node === null) {
            this.removeAllRanges();
            return;
        }
        if (node.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) {
            throw DOMException.create(this._globalObject, [
                "DocumentType Node can't be used as boundary point.",
                "InvalidNodeTypeError"
            ]);
        }
        if (offset > nodeLength(node)) {
            throw DOMException.create(this._globalObject, [
                "Invalid range index.",
                "IndexSizeError"
            ]);
        }
        if (nodeRoot(node) !== implForWrapper(this._globalObject._document)) {
            return;
        }
        const newRange = Range.createImpl(this._globalObject, [], {
            start: {
                node,
                offset: 0
            },
            end: {
                node,
                offset: 0
            }
        });
        setBoundaryPointStart(newRange, node, offset);
        setBoundaryPointEnd(newRange, node, offset);
        this._associateRange(newRange);
    }
    // https://w3c.github.io/selection-api/#dom-selection-setposition
    setPosition(node, offset) {
        this.collapse(node, offset);
    }
    // https://w3c.github.io/selection-api/#dom-selection-collapsetostart
    collapseToStart() {
        if (this._isEmpty()) {
            throw DOMException.create(this._globalObject, [
                "There is no selection to collapse.",
                "InvalidStateError"
            ]);
        }
        const { node, offset } = this._range._start;
        const newRange = Range.createImpl(this._globalObject, [], {
            start: {
                node,
                offset
            },
            end: {
                node,
                offset
            }
        });
        this._associateRange(newRange);
    }
    // https://w3c.github.io/selection-api/#dom-selection-collapsetoend
    collapseToEnd() {
        if (this._isEmpty()) {
            throw DOMException.create(this._globalObject, [
                "There is no selection to collapse.",
                "InvalidStateError"
            ]);
        }
        const { node, offset } = this._range._end;
        const newRange = Range.createImpl(this._globalObject, [], {
            start: {
                node,
                offset
            },
            end: {
                node,
                offset
            }
        });
        this._associateRange(newRange);
    }
    // https://w3c.github.io/selection-api/#dom-selection-extend
    extend(node, offset) {
        if (nodeRoot(node) !== implForWrapper(this._globalObject._document)) {
            return;
        }
        if (this._isEmpty()) {
            throw DOMException.create(this._globalObject, [
                "There is no selection to extend.",
                "InvalidStateError"
            ]);
        }
        const { _anchor: oldAnchor } = this;
        const newFocus = {
            node,
            offset
        };
        const newRange = Range.createImpl(this._globalObject, [], {
            start: {
                node,
                offset: 0
            },
            end: {
                node,
                offset: 0
            }
        });
        if (nodeRoot(node) !== this._range._root) {
            setBoundaryPointStart(newRange, newFocus.node, newFocus.offset);
            setBoundaryPointEnd(newRange, newFocus.node, newFocus.offset);
        } else if (compareBoundaryPointsPosition(oldAnchor, newFocus) <= 0) {
            setBoundaryPointStart(newRange, oldAnchor.node, oldAnchor.offset);
            setBoundaryPointEnd(newRange, newFocus.node, newFocus.offset);
        } else {
            setBoundaryPointStart(newRange, newFocus.node, newFocus.offset);
            setBoundaryPointEnd(newRange, oldAnchor.node, oldAnchor.offset);
        }
        this._associateRange(newRange);
        this._direction = compareBoundaryPointsPosition(newFocus, oldAnchor) === -1 ? SELECTION_DIRECTION.BACKWARDS : SELECTION_DIRECTION.FORWARDS;
    }
    // https://w3c.github.io/selection-api/#dom-selection-setbaseandextent
    setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset) {
        if (anchorOffset > nodeLength(anchorNode) || focusOffset > nodeLength(focusNode)) {
            throw DOMException.create(this._globalObject, [
                "Invalid anchor or focus offset.",
                "IndexSizeError"
            ]);
        }
        const document = implForWrapper(this._globalObject._document);
        if (document !== nodeRoot(anchorNode) || document !== nodeRoot(focusNode)) {
            return;
        }
        const anchor = {
            node: anchorNode,
            offset: anchorOffset
        };
        const focus = {
            node: focusNode,
            offset: focusOffset
        };
        let newRange;
        if (compareBoundaryPointsPosition(anchor, focus) === -1) {
            newRange = Range.createImpl(this._globalObject, [], {
                start: {
                    node: anchor.node,
                    offset: anchor.offset
                },
                end: {
                    node: focus.node,
                    offset: focus.offset
                }
            });
        } else {
            newRange = Range.createImpl(this._globalObject, [], {
                start: {
                    node: focus.node,
                    offset: focus.offset
                },
                end: {
                    node: anchor.node,
                    offset: anchor.offset
                }
            });
        }
        this._associateRange(newRange);
        this._direction = compareBoundaryPointsPosition(focus, anchor) === -1 ? SELECTION_DIRECTION.BACKWARDS : SELECTION_DIRECTION.FORWARDS;
    }
    // https://w3c.github.io/selection-api/#dom-selection-selectallchildren
    selectAllChildren(node) {
        if (node.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) {
            throw DOMException.create(this._globalObject, [
                "DocumentType Node can't be used as boundary point.",
                "InvalidNodeTypeError"
            ]);
        }
        const document = implForWrapper(this._globalObject._document);
        if (document !== nodeRoot(node)) {
            return;
        }
        const length = domSymbolTree.childrenCount(node);
        const newRange = Range.createImpl(this._globalObject, [], {
            start: {
                node,
                offset: 0
            },
            end: {
                node,
                offset: 0
            }
        });
        setBoundaryPointStart(newRange, node, 0);
        setBoundaryPointEnd(newRange, node, length);
        this._associateRange(newRange);
    }
    // https://w3c.github.io/selection-api/#dom-selection-deletefromdocument
    deleteFromDocument() {
        if (!this._isEmpty()) {
            this._range.deleteContents();
        }
    }
    // https://w3c.github.io/selection-api/#dom-selection-containsnode
    containsNode(node, allowPartialContainment) {
        if (this._isEmpty() || nodeRoot(node) !== implForWrapper(this._globalObject._document)) {
            return false;
        }
        const { _start, _end } = this._range;
        const startIsBeforeNode = compareBoundaryPointsPosition(_start, {
            node,
            offset: 0
        }) === -1;
        const endIsAfterNode = compareBoundaryPointsPosition(_end, {
            node,
            offset: nodeLength(node)
        }) === 1;
        return allowPartialContainment ? startIsBeforeNode || endIsAfterNode : startIsBeforeNode && endIsAfterNode;
    }
    // https://w3c.github.io/selection-api/#dom-selection-stringifier
    toString() {
        return this._range ? this._range.toString() : "";
    }
    // https://w3c.github.io/selection-api/#dfn-empty
    _isEmpty() {
        return this._range === null;
    }
    // https://w3c.github.io/selection-api/#dfn-anchor
    get _anchor() {
        if (!this._range) {
            return null;
        }
        return this._direction === SELECTION_DIRECTION.FORWARDS ? this._range._start : this._range._end;
    }
    // https://w3c.github.io/selection-api/#dfn-focus
    get _focus() {
        if (!this._range) {
            return null;
        }
        return this._direction === SELECTION_DIRECTION.FORWARDS ? this._range._end : this._range._start;
    }
    _associateRange(newRange) {
        const didSelectionChange = this._range !== newRange && (// Change from/to null selection
        newRange === null || this._range === null || // Change of selection range
        compareBoundaryPointsPosition(newRange._start, this._range._start) !== 0 || compareBoundaryPointsPosition(newRange._end, this._range._end) !== 0);
        this._range = newRange;
        this._direction = newRange === null ? SELECTION_DIRECTION.DIRECTIONLESS : SELECTION_DIRECTION.FORWARDS;
        // https://w3c.github.io/selection-api/#selectionchange-event
        if (didSelectionChange) {
            // Fire the event asynchronously, as it's done in the browser
            const document = this._globalObject._document;
            setTimeout(()=>{
                fireAnEvent("selectionchange", implForWrapper(document));
            }, 0);
        }
    }
}
module.exports = {
    implementation: SelectionImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/fetch/header-types.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const MIMEType = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/mime-type.js [app-ssr] (ecmascript)");
const PRIVILEGED_NO_CORS_REQUEST = new Set([
    "range"
]);
function isPrivilegedNoCORSRequest(name) {
    return PRIVILEGED_NO_CORS_REQUEST.has(name.toLowerCase());
}
const NO_CORS_SAFELISTED_REQUEST = new Set([
    `accept`,
    `accept-language`,
    `content-language`,
    `content-type`
]);
function isNoCORSSafelistedRequest(name) {
    return NO_CORS_SAFELISTED_REQUEST.has(name.toLowerCase());
}
const FORBIDDEN = new Set([
    `accept-charset`,
    `accept-encoding`,
    `access-control-request-headers`,
    `access-control-request-method`,
    `connection`,
    `content-length`,
    `cookie`,
    `cookie2`,
    `date`,
    `dnt`,
    `expect`,
    `host`,
    `keep-alive`,
    `origin`,
    `referer`,
    `te`,
    `trailer`,
    `transfer-encoding`,
    `upgrade`,
    `via`
]);
function isForbidden(name) {
    name = name.toLowerCase();
    return FORBIDDEN.has(name) || name.startsWith("proxy-") || name.startsWith("sec-");
}
const FORBIDDEN_RESPONSE = new Set([
    "set-cookie",
    "set-cookie2"
]);
function isForbiddenResponse(name) {
    return FORBIDDEN_RESPONSE.has(name.toLowerCase());
}
const CORS_UNSAFE_BYTE = /[\x00-\x08\x0A-\x1F"():<>?@[\\\]{}\x7F]/;
function isCORSWhitelisted(name, value) {
    name = name.toLowerCase();
    switch(name){
        case "accept":
            if (value.match(CORS_UNSAFE_BYTE)) {
                return false;
            }
            break;
        case "accept-language":
        case "content-language":
            if (value.match(/[^\x30-\x39\x41-\x5A\x61-\x7A *,\-.;=]/)) {
                return false;
            }
            break;
        case "content-type":
            {
                if (value.match(CORS_UNSAFE_BYTE)) {
                    return false;
                }
                const mimeType = MIMEType.parse(value);
                if (mimeType === null) {
                    return false;
                }
                if (![
                    "application/x-www-form-urlencoded",
                    "multipart/form-data",
                    "text/plain"
                ].includes(mimeType.essence)) {
                    return false;
                }
                break;
            }
        default:
            return false;
    }
    if (Buffer.from(value).length > 128) {
        return false;
    }
    return true;
}
module.exports = {
    isPrivilegedNoCORSRequest,
    isNoCORSSafelistedRequest,
    isForbidden,
    isForbiddenResponse,
    isCORSWhitelisted
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/fetch/header-list.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Provides some utility functions for somewhat efficiently modifying a
 * collection of headers.
 *
 * Note that this class only operates on ByteStrings (which is also why we use
 * toLowerCase internally).
 */ class HeaderList {
    constructor(){
        this.headers = new Map();
    }
    append(name, value) {
        const existing = this.headers.get(name.toLowerCase());
        if (existing) {
            existing.push(value);
        } else {
            this.headers.set(name.toLowerCase(), [
                value
            ]);
        }
    }
    contains(name) {
        return this.headers.has(name.toLowerCase());
    }
    get(name) {
        name = name.toLowerCase();
        const values = this.headers.get(name);
        if (!values) {
            return null;
        }
        return values;
    }
    delete(name) {
        this.headers.delete(name.toLowerCase());
    }
    set(name, value) {
        const lowerName = name.toLowerCase();
        this.headers.delete(lowerName);
        this.headers.set(lowerName, [
            value
        ]);
    }
    sortAndCombine() {
        const names = [
            ...this.headers.keys()
        ].sort();
        const headers = [];
        for (const name of names){
            if (name === "set-cookie") {
                for (const value of this.get(name)){
                    headers.push([
                        name,
                        value
                    ]);
                }
            } else {
                headers.push([
                    name,
                    this.get(name).join(", ")
                ]);
            }
        }
        return headers;
    }
}
module.exports = HeaderList;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/fetch/Headers-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { isForbidden, isForbiddenResponse, isPrivilegedNoCORSRequest, isNoCORSSafelistedRequest, isCORSWhitelisted } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/fetch/header-types.js [app-ssr] (ecmascript)");
const HeaderList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/fetch/header-list.js [app-ssr] (ecmascript)");
function assertName(name) {
    if (!name.match(/^[!#$%&'*+\-.^`|~\w]+$/)) {
        throw new TypeError("name is invalid");
    }
}
function assertValue(value) {
    if (value.match(/[\0\r\n]/)) {
        throw new TypeError("value is invalid");
    }
}
// https://fetch.spec.whatwg.org/#concept-header-value-normalize
function normalizeValue(potentialValue) {
    return potentialValue.replace(/^[\n\r\t ]+|[\n\r\t ]+$/g, "");
}
class HeadersImpl {
    constructor(globalObject, args){
        this.guard = "none";
        this.headersList = new HeaderList();
        if (args[0]) {
            this._fill(args[0]);
        }
    }
    _fill(init) {
        if (Array.isArray(init)) {
            for (const header of init){
                if (header.length !== 2) {
                    throw new TypeError("init is invalid");
                }
                this.append(header[0], header[1]);
            }
        } else {
            for (const key of Object.keys(init)){
                this.append(key, init[key]);
            }
        }
    }
    has(name) {
        assertName(name);
        return this.headersList.contains(name);
    }
    getSetCookie() {
        return this.headersList.get("Set-Cookie") || [];
    }
    get(name) {
        assertName(name);
        const r = this.headersList.get(name);
        if (!r) {
            return null;
        }
        return r.join(", ");
    }
    _removePrivilegedNoCORSHeaders() {
        this.headersList.delete("range");
    }
    append(name, value) {
        value = normalizeValue(value);
        assertName(name);
        assertValue(value);
        switch(this.guard){
            case "immutable":
                throw new TypeError("Headers is immutable");
            case "request":
                if (isForbidden(name)) {
                    return;
                }
                break;
            case "request-no-cors":
                {
                    if (!isCORSWhitelisted(name, value)) {
                        return;
                    }
                    break;
                }
            case "response":
                if (isForbiddenResponse(name)) {
                    return;
                }
                break;
        }
        this.headersList.append(name, value);
        this._removePrivilegedNoCORSHeaders();
    }
    set(name, value) {
        value = normalizeValue(value);
        assertName(name);
        assertValue(value);
        switch(this.guard){
            case "immutable":
                throw new TypeError("Headers is immutable");
            case "request":
                if (isForbidden(name)) {
                    return;
                }
                break;
            case "request-no-cors":
                {
                    if (!isCORSWhitelisted(name, value)) {
                        return;
                    }
                    break;
                }
            case "response":
                if (isForbiddenResponse(name)) {
                    return;
                }
                break;
        }
        this.headersList.set(name, value);
        this._removePrivilegedNoCORSHeaders();
    }
    delete(name) {
        assertName(name);
        switch(this.guard){
            case "immutable":
                throw new TypeError("Headers is immutable");
            case "request":
                if (isForbidden(name)) {
                    return;
                }
                break;
            case "request-no-cors":
                {
                    if (!isNoCORSSafelistedRequest(name) && !isPrivilegedNoCORSRequest(name)) {
                        return;
                    }
                    break;
                }
            case "response":
                if (isForbiddenResponse(name)) {
                    return;
                }
                break;
        }
        this.headersList.delete(name);
        this._removePrivilegedNoCORSHeaders();
    }
    *[Symbol.iterator]() {
        for (const header of this.headersList.sortAndCombine()){
            yield header;
        }
    }
}
exports.implementation = HeadersImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/geometry/DOMRectReadOnly-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMRectReadOnly = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMRectReadOnly.js [app-ssr] (ecmascript)");
class DOMRectReadOnlyImpl {
    constructor(globalObject, [x = 0, y = 0, width = 0, height = 0]){
        this._globalObject = globalObject;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
    static fromRect(globalObject, other) {
        return DOMRectReadOnly.createImpl(globalObject, [
            other.x,
            other.y,
            other.width,
            other.height
        ]);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get top() {
        const { height, y } = this;
        // We use Math.min's built-in NaN handling: https://github.com/w3c/fxtf-drafts/issues/222
        return Math.min(y, y + height);
    }
    get right() {
        const { width, x } = this;
        // We use Math.max's built-in NaN handling: https://github.com/w3c/fxtf-drafts/issues/222
        return Math.max(x, x + width);
    }
    get bottom() {
        const { height, y } = this;
        // We use Math.max's built-in NaN handling: https://github.com/w3c/fxtf-drafts/issues/222
        return Math.max(y, y + height);
    }
    get left() {
        const { width, x } = this;
        // We use Math.min's built-in NaN handling: https://github.com/w3c/fxtf-drafts/issues/222
        return Math.min(x, x + width);
    }
    // Could be removed after https://github.com/jsdom/webidl2js/issues/185 gets fixed.
    toJSON() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            top: this.top,
            right: this.right,
            bottom: this.bottom,
            left: this.left
        };
    }
}
exports.implementation = DOMRectReadOnlyImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/geometry/DOMRect-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMRectReadOnlyImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/geometry/DOMRectReadOnly-impl.js [app-ssr] (ecmascript)").implementation;
const DOMRect = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMRect.js [app-ssr] (ecmascript)");
class DOMRectImpl extends DOMRectReadOnlyImpl {
    static fromRect(globalObject, other) {
        return DOMRect.createImpl(globalObject, [
            other.x,
            other.y,
            other.width,
            other.height
        ]);
    }
    get x() {
        return super.x;
    }
    set x(newX) {
        this._x = newX;
    }
    get y() {
        return super.y;
    }
    set y(newY) {
        this._y = newY;
    }
    get width() {
        return super.width;
    }
    set width(newWidth) {
        this._width = newWidth;
    }
    get height() {
        return super.height;
    }
    set height(newHeight) {
        this._height = newHeight;
    }
}
exports.implementation = DOMRectImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/interfaces.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const style = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/level2/style.js [app-ssr] (ecmascript)");
const xpath = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/level3/xpath.js [app-ssr] (ecmascript)");
// This object defines the mapping between the interface name and the generated interface wrapper code.
// Note: The mapping needs to stay as-is in order due to interface evaluation.
// We cannot "refactor" this to something less duplicative because that would break bundlers which depend on static
// analysis of require()s.
const generatedInterfaces = {
    DOMException: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)"),
    URL: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/webidl2js-wrapper.js [app-ssr] (ecmascript)").URL,
    URLSearchParams: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/webidl2js-wrapper.js [app-ssr] (ecmascript)").URLSearchParams,
    EventTarget: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js [app-ssr] (ecmascript)"),
    NamedNodeMap: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/NamedNodeMap.js [app-ssr] (ecmascript)"),
    Node: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Node.js [app-ssr] (ecmascript)"),
    Attr: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Attr.js [app-ssr] (ecmascript)"),
    Element: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Element.js [app-ssr] (ecmascript)"),
    DocumentFragment: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DocumentFragment.js [app-ssr] (ecmascript)"),
    DOMImplementation: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMImplementation.js [app-ssr] (ecmascript)"),
    Document: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Document.js [app-ssr] (ecmascript)"),
    XMLDocument: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/XMLDocument.js [app-ssr] (ecmascript)"),
    CharacterData: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CharacterData.js [app-ssr] (ecmascript)"),
    Text: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Text.js [app-ssr] (ecmascript)"),
    CDATASection: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CDATASection.js [app-ssr] (ecmascript)"),
    ProcessingInstruction: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ProcessingInstruction.js [app-ssr] (ecmascript)"),
    Comment: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Comment.js [app-ssr] (ecmascript)"),
    DocumentType: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DocumentType.js [app-ssr] (ecmascript)"),
    NodeList: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/NodeList.js [app-ssr] (ecmascript)"),
    RadioNodeList: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/RadioNodeList.js [app-ssr] (ecmascript)"),
    HTMLCollection: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLCollection.js [app-ssr] (ecmascript)"),
    HTMLOptionsCollection: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLOptionsCollection.js [app-ssr] (ecmascript)"),
    DOMStringMap: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMStringMap.js [app-ssr] (ecmascript)"),
    DOMTokenList: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMTokenList.js [app-ssr] (ecmascript)"),
    StyleSheetList: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/StyleSheetList.js [app-ssr] (ecmascript)"),
    HTMLElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLElement.js [app-ssr] (ecmascript)"),
    HTMLHeadElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLHeadElement.js [app-ssr] (ecmascript)"),
    HTMLTitleElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLTitleElement.js [app-ssr] (ecmascript)"),
    HTMLBaseElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLBaseElement.js [app-ssr] (ecmascript)"),
    HTMLLinkElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLLinkElement.js [app-ssr] (ecmascript)"),
    HTMLMetaElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLMetaElement.js [app-ssr] (ecmascript)"),
    HTMLStyleElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLStyleElement.js [app-ssr] (ecmascript)"),
    HTMLBodyElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLBodyElement.js [app-ssr] (ecmascript)"),
    HTMLHeadingElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLHeadingElement.js [app-ssr] (ecmascript)"),
    HTMLParagraphElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLParagraphElement.js [app-ssr] (ecmascript)"),
    HTMLHRElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLHRElement.js [app-ssr] (ecmascript)"),
    HTMLPreElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLPreElement.js [app-ssr] (ecmascript)"),
    HTMLUListElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLUListElement.js [app-ssr] (ecmascript)"),
    HTMLOListElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLOListElement.js [app-ssr] (ecmascript)"),
    HTMLLIElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLLIElement.js [app-ssr] (ecmascript)"),
    HTMLMenuElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLMenuElement.js [app-ssr] (ecmascript)"),
    HTMLDListElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLDListElement.js [app-ssr] (ecmascript)"),
    HTMLDivElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLDivElement.js [app-ssr] (ecmascript)"),
    HTMLAnchorElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLAnchorElement.js [app-ssr] (ecmascript)"),
    HTMLAreaElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLAreaElement.js [app-ssr] (ecmascript)"),
    HTMLBRElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLBRElement.js [app-ssr] (ecmascript)"),
    HTMLButtonElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLButtonElement.js [app-ssr] (ecmascript)"),
    HTMLCanvasElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLCanvasElement.js [app-ssr] (ecmascript)"),
    HTMLDataElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLDataElement.js [app-ssr] (ecmascript)"),
    HTMLDataListElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLDataListElement.js [app-ssr] (ecmascript)"),
    HTMLDetailsElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLDetailsElement.js [app-ssr] (ecmascript)"),
    HTMLDialogElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLDialogElement.js [app-ssr] (ecmascript)"),
    HTMLDirectoryElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLDirectoryElement.js [app-ssr] (ecmascript)"),
    HTMLFieldSetElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLFieldSetElement.js [app-ssr] (ecmascript)"),
    HTMLFontElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLFontElement.js [app-ssr] (ecmascript)"),
    HTMLFormElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLFormElement.js [app-ssr] (ecmascript)"),
    HTMLHtmlElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLHtmlElement.js [app-ssr] (ecmascript)"),
    HTMLImageElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLImageElement.js [app-ssr] (ecmascript)"),
    HTMLInputElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLInputElement.js [app-ssr] (ecmascript)"),
    HTMLLabelElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLLabelElement.js [app-ssr] (ecmascript)"),
    HTMLLegendElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLLegendElement.js [app-ssr] (ecmascript)"),
    HTMLMapElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLMapElement.js [app-ssr] (ecmascript)"),
    HTMLMarqueeElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLMarqueeElement.js [app-ssr] (ecmascript)"),
    HTMLMediaElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLMediaElement.js [app-ssr] (ecmascript)"),
    HTMLMeterElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLMeterElement.js [app-ssr] (ecmascript)"),
    HTMLModElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLModElement.js [app-ssr] (ecmascript)"),
    HTMLOptGroupElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLOptGroupElement.js [app-ssr] (ecmascript)"),
    HTMLOptionElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLOptionElement.js [app-ssr] (ecmascript)"),
    HTMLOutputElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLOutputElement.js [app-ssr] (ecmascript)"),
    HTMLPictureElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLPictureElement.js [app-ssr] (ecmascript)"),
    HTMLProgressElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLProgressElement.js [app-ssr] (ecmascript)"),
    HTMLQuoteElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLQuoteElement.js [app-ssr] (ecmascript)"),
    HTMLScriptElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLScriptElement.js [app-ssr] (ecmascript)"),
    HTMLSelectElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLSelectElement.js [app-ssr] (ecmascript)"),
    HTMLSlotElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLSlotElement.js [app-ssr] (ecmascript)"),
    HTMLSourceElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLSourceElement.js [app-ssr] (ecmascript)"),
    HTMLSpanElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLSpanElement.js [app-ssr] (ecmascript)"),
    HTMLTableCaptionElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLTableCaptionElement.js [app-ssr] (ecmascript)"),
    HTMLTableCellElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLTableCellElement.js [app-ssr] (ecmascript)"),
    HTMLTableColElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLTableColElement.js [app-ssr] (ecmascript)"),
    HTMLTableElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLTableElement.js [app-ssr] (ecmascript)"),
    HTMLTimeElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLTimeElement.js [app-ssr] (ecmascript)"),
    HTMLTableRowElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLTableRowElement.js [app-ssr] (ecmascript)"),
    HTMLTableSectionElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLTableSectionElement.js [app-ssr] (ecmascript)"),
    HTMLTemplateElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLTemplateElement.js [app-ssr] (ecmascript)"),
    HTMLTextAreaElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLTextAreaElement.js [app-ssr] (ecmascript)"),
    HTMLUnknownElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLUnknownElement.js [app-ssr] (ecmascript)"),
    HTMLFrameElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLFrameElement.js [app-ssr] (ecmascript)"),
    HTMLFrameSetElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLFrameSetElement.js [app-ssr] (ecmascript)"),
    HTMLIFrameElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLIFrameElement.js [app-ssr] (ecmascript)"),
    HTMLEmbedElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLEmbedElement.js [app-ssr] (ecmascript)"),
    HTMLObjectElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLObjectElement.js [app-ssr] (ecmascript)"),
    HTMLParamElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLParamElement.js [app-ssr] (ecmascript)"),
    HTMLVideoElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLVideoElement.js [app-ssr] (ecmascript)"),
    HTMLAudioElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLAudioElement.js [app-ssr] (ecmascript)"),
    HTMLTrackElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLTrackElement.js [app-ssr] (ecmascript)"),
    HTMLFormControlsCollection: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLFormControlsCollection.js [app-ssr] (ecmascript)"),
    SVGElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGElement.js [app-ssr] (ecmascript)"),
    SVGGraphicsElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGGraphicsElement.js [app-ssr] (ecmascript)"),
    SVGSVGElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGSVGElement.js [app-ssr] (ecmascript)"),
    SVGGElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGGElement.js [app-ssr] (ecmascript)"),
    SVGDefsElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGDefsElement.js [app-ssr] (ecmascript)"),
    SVGDescElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGDescElement.js [app-ssr] (ecmascript)"),
    SVGMetadataElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGMetadataElement.js [app-ssr] (ecmascript)"),
    SVGTitleElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGTitleElement.js [app-ssr] (ecmascript)"),
    SVGSymbolElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGSymbolElement.js [app-ssr] (ecmascript)"),
    SVGSwitchElement: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGSwitchElement.js [app-ssr] (ecmascript)"),
    SVGAnimatedPreserveAspectRatio: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGAnimatedPreserveAspectRatio.js [app-ssr] (ecmascript)"),
    SVGAnimatedRect: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGAnimatedRect.js [app-ssr] (ecmascript)"),
    SVGAnimatedString: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGAnimatedString.js [app-ssr] (ecmascript)"),
    SVGNumber: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGNumber.js [app-ssr] (ecmascript)"),
    SVGPreserveAspectRatio: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGPreserveAspectRatio.js [app-ssr] (ecmascript)"),
    SVGRect: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGRect.js [app-ssr] (ecmascript)"),
    SVGStringList: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGStringList.js [app-ssr] (ecmascript)"),
    Event: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Event.js [app-ssr] (ecmascript)"),
    CloseEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CloseEvent.js [app-ssr] (ecmascript)"),
    CustomEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CustomEvent.js [app-ssr] (ecmascript)"),
    MessageEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MessageEvent.js [app-ssr] (ecmascript)"),
    ErrorEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ErrorEvent.js [app-ssr] (ecmascript)"),
    HashChangeEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HashChangeEvent.js [app-ssr] (ecmascript)"),
    PopStateEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/PopStateEvent.js [app-ssr] (ecmascript)"),
    StorageEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/StorageEvent.js [app-ssr] (ecmascript)"),
    ProgressEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ProgressEvent.js [app-ssr] (ecmascript)"),
    PageTransitionEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/PageTransitionEvent.js [app-ssr] (ecmascript)"),
    SubmitEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SubmitEvent.js [app-ssr] (ecmascript)"),
    UIEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/UIEvent.js [app-ssr] (ecmascript)"),
    FocusEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/FocusEvent.js [app-ssr] (ecmascript)"),
    InputEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/InputEvent.js [app-ssr] (ecmascript)"),
    MouseEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MouseEvent.js [app-ssr] (ecmascript)"),
    KeyboardEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/KeyboardEvent.js [app-ssr] (ecmascript)"),
    TouchEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/TouchEvent.js [app-ssr] (ecmascript)"),
    CompositionEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CompositionEvent.js [app-ssr] (ecmascript)"),
    WheelEvent: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/WheelEvent.js [app-ssr] (ecmascript)"),
    BarProp: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/BarProp.js [app-ssr] (ecmascript)"),
    External: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/External.js [app-ssr] (ecmascript)"),
    Location: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Location.js [app-ssr] (ecmascript)"),
    History: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/History.js [app-ssr] (ecmascript)"),
    Screen: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Screen.js [app-ssr] (ecmascript)"),
    Performance: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Performance.js [app-ssr] (ecmascript)"),
    Navigator: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Navigator.js [app-ssr] (ecmascript)"),
    Crypto: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Crypto.js [app-ssr] (ecmascript)"),
    PluginArray: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/PluginArray.js [app-ssr] (ecmascript)"),
    MimeTypeArray: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MimeTypeArray.js [app-ssr] (ecmascript)"),
    Plugin: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Plugin.js [app-ssr] (ecmascript)"),
    MimeType: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MimeType.js [app-ssr] (ecmascript)"),
    FileReader: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/FileReader.js [app-ssr] (ecmascript)"),
    Blob: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Blob.js [app-ssr] (ecmascript)"),
    File: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/File.js [app-ssr] (ecmascript)"),
    FileList: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/FileList.js [app-ssr] (ecmascript)"),
    ValidityState: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ValidityState.js [app-ssr] (ecmascript)"),
    DOMParser: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMParser.js [app-ssr] (ecmascript)"),
    XMLSerializer: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/XMLSerializer.js [app-ssr] (ecmascript)"),
    FormData: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/FormData.js [app-ssr] (ecmascript)"),
    XMLHttpRequestEventTarget: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/XMLHttpRequestEventTarget.js [app-ssr] (ecmascript)"),
    XMLHttpRequestUpload: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/XMLHttpRequestUpload.js [app-ssr] (ecmascript)"),
    XMLHttpRequest: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/XMLHttpRequest.js [app-ssr] (ecmascript)"),
    WebSocket: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/WebSocket.js [app-ssr] (ecmascript)"),
    NodeFilter: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/NodeFilter.js [app-ssr] (ecmascript)"),
    NodeIterator: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/NodeIterator.js [app-ssr] (ecmascript)"),
    TreeWalker: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/TreeWalker.js [app-ssr] (ecmascript)"),
    AbstractRange: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/AbstractRange.js [app-ssr] (ecmascript)"),
    Range: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Range.js [app-ssr] (ecmascript)"),
    StaticRange: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/StaticRange.js [app-ssr] (ecmascript)"),
    Selection: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Selection.js [app-ssr] (ecmascript)"),
    Storage: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Storage.js [app-ssr] (ecmascript)"),
    CustomElementRegistry: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CustomElementRegistry.js [app-ssr] (ecmascript)"),
    ElementInternals: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ElementInternals.js [app-ssr] (ecmascript)"),
    ShadowRoot: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ShadowRoot.js [app-ssr] (ecmascript)"),
    MutationObserver: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MutationObserver.js [app-ssr] (ecmascript)"),
    MutationRecord: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MutationRecord.js [app-ssr] (ecmascript)"),
    Headers: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Headers.js [app-ssr] (ecmascript)"),
    AbortController: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/AbortController.js [app-ssr] (ecmascript)"),
    AbortSignal: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/AbortSignal.js [app-ssr] (ecmascript)"),
    DOMRectReadOnly: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMRectReadOnly.js [app-ssr] (ecmascript)"),
    DOMRect: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMRect.js [app-ssr] (ecmascript)")
};
function install(window, name, interfaceConstructor) {
    Object.defineProperty(window, name, {
        configurable: true,
        writable: true,
        value: interfaceConstructor
    });
}
exports.installInterfaces = (window, globalNames)=>{
    // Install generated interface.
    for (const generatedInterface of Object.values(generatedInterfaces)){
        generatedInterface.install(window, globalNames);
    }
    // Install legacy HTMLDocument interface
    // https://html.spec.whatwg.org/#htmldocument
    install(window, "HTMLDocument", window.Document);
    // https://webidl.spec.whatwg.org/#es-DOMException-specialness
    Object.setPrototypeOf(window.DOMException.prototype, window.Error.prototype);
    // These need to be cleaned up...
    style.addToCore(window);
    xpath(window);
};
// Returns an interface webidl2js wrapper given its an interface name.
exports.getInterfaceWrapper = (name)=>{
    return generatedInterfaces[name];
};
}),
];

//# sourceMappingURL=d19db_jsdom_lib_jsdom_living_e50e42b5._.js.map