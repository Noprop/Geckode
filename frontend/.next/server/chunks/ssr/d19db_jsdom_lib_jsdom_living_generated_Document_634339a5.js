module.exports = [
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Document.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const conversions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)");
const utils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const ElementCreationOptions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ElementCreationOptions.js [app-ssr] (ecmascript)");
const ceReactionsPreSteps_helpers_custom_elements = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/custom-elements.js [app-ssr] (ecmascript)").ceReactionsPreSteps;
const ceReactionsPostSteps_helpers_custom_elements = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/custom-elements.js [app-ssr] (ecmascript)").ceReactionsPostSteps;
const Node = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Node.js [app-ssr] (ecmascript)");
const NodeFilter = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/NodeFilter.js [app-ssr] (ecmascript)");
const HTMLElement = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLElement.js [app-ssr] (ecmascript)");
const EventHandlerNonNull = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/EventHandlerNonNull.js [app-ssr] (ecmascript)");
const OnErrorEventHandlerNonNull = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/OnErrorEventHandlerNonNull.js [app-ssr] (ecmascript)");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const interfaceName = "Document";
exports.is = (value)=>{
    return utils.isObject(value) && utils.hasOwn(value, implSymbol) && value[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = (value)=>{
    return utils.isObject(value) && value instanceof Impl.implementation;
};
exports.convert = (globalObject, value, { context = "The provided value" } = {})=>{
    if (exports.is(value)) {
        return utils.implForWrapper(value);
    }
    throw new globalObject.TypeError(`${context} is not of type 'Document'.`);
};
function makeWrapper(globalObject, newTarget) {
    let proto;
    if (newTarget !== undefined) {
        proto = newTarget.prototype;
    }
    if (!utils.isObject(proto)) {
        proto = globalObject[ctorRegistrySymbol]["Document"].prototype;
    }
    return Object.create(proto);
}
exports.create = (globalObject, constructorArgs, privateData)=>{
    const wrapper = makeWrapper(globalObject);
    return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};
exports.createImpl = (globalObject, constructorArgs, privateData)=>{
    const wrapper = exports.create(globalObject, constructorArgs, privateData);
    return utils.implForWrapper(wrapper);
};
function getUnforgeables(globalObject) {
    let unforgeables = unforgeablesMap.get(globalObject);
    if (unforgeables === undefined) {
        unforgeables = Object.create(null);
        utils.define(unforgeables, {
            get location () {
                const esValue = this !== null && this !== undefined ? this : globalObject;
                if (!exports.is(esValue)) {
                    throw new globalObject.TypeError("'get location' called on an object that is not a valid instance of Document.");
                }
                return utils.tryWrapperForImpl(esValue[implSymbol]["location"]);
            },
            set location (V){
                const esValue = this !== null && this !== undefined ? this : globalObject;
                if (!exports.is(esValue)) {
                    throw new globalObject.TypeError("'set location' called on an object that is not a valid instance of Document.");
                }
                const Q = esValue["location"];
                if (!utils.isObject(Q)) {
                    throw new globalObject.TypeError("Property 'location' is not an object");
                }
                Reflect.set(Q, "href", V);
            }
        });
        Object.defineProperties(unforgeables, {
            location: {
                configurable: false
            }
        });
        unforgeablesMap.set(globalObject, unforgeables);
    }
    return unforgeables;
}
exports._internalSetup = (wrapper, globalObject)=>{
    Node._internalSetup(wrapper, globalObject);
    utils.define(wrapper, getUnforgeables(globalObject));
};
exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {})=>{
    privateData.wrapper = wrapper;
    exports._internalSetup(wrapper, globalObject);
    Object.defineProperty(wrapper, implSymbol, {
        value: new Impl.implementation(globalObject, constructorArgs, privateData),
        configurable: true
    });
    wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
    if (Impl.init) {
        Impl.init(wrapper[implSymbol]);
    }
    return wrapper;
};
exports.new = (globalObject, newTarget)=>{
    const wrapper = makeWrapper(globalObject, newTarget);
    exports._internalSetup(wrapper, globalObject);
    Object.defineProperty(wrapper, implSymbol, {
        value: Object.create(Impl.implementation.prototype),
        configurable: true
    });
    wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
    if (Impl.init) {
        Impl.init(wrapper[implSymbol]);
    }
    return wrapper[implSymbol];
};
const unforgeablesMap = new WeakMap();
const exposed = new Set([
    "Window"
]);
exports.install = (globalObject, globalNames)=>{
    if (!globalNames.some((globalName)=>exposed.has(globalName))) {
        return;
    }
    const ctorRegistry = utils.initCtorRegistry(globalObject);
    class Document extends globalObject.Node {
        constructor(){
            return exports.setup(Object.create(new.target.prototype), globalObject, undefined);
        }
        getElementsByTagName(qualifiedName) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'getElementsByTagName' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'getElementsByTagName' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'getElementsByTagName' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].getElementsByTagName(...args));
        }
        getElementsByTagNameNS(namespace, localName) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'getElementsByTagNameNS' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 2) {
                throw new globalObject.TypeError(`Failed to execute 'getElementsByTagNameNS' on 'Document': 2 arguments required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                if (curArg === null || curArg === undefined) {
                    curArg = null;
                } else {
                    curArg = conversions["DOMString"](curArg, {
                        context: "Failed to execute 'getElementsByTagNameNS' on 'Document': parameter 1",
                        globals: globalObject
                    });
                }
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'getElementsByTagNameNS' on 'Document': parameter 2",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].getElementsByTagNameNS(...args));
        }
        getElementsByClassName(classNames) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'getElementsByClassName' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'getElementsByClassName' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'getElementsByClassName' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].getElementsByClassName(...args));
        }
        createElement(localName) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createElement' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'createElement' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'createElement' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                if (curArg !== undefined) {
                    if (curArg === null || curArg === undefined) {
                        curArg = ElementCreationOptions.convert(globalObject, curArg, {
                            context: "Failed to execute 'createElement' on 'Document': parameter 2"
                        });
                    } else if (utils.isObject(curArg)) {
                        curArg = ElementCreationOptions.convert(globalObject, curArg, {
                            context: "Failed to execute 'createElement' on 'Document': parameter 2" + " dictionary"
                        });
                    } else {
                        curArg = conversions["DOMString"](curArg, {
                            context: "Failed to execute 'createElement' on 'Document': parameter 2",
                            globals: globalObject
                        });
                    }
                }
                args.push(curArg);
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return utils.tryWrapperForImpl(esValue[implSymbol].createElement(...args));
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        createElementNS(namespace, qualifiedName) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createElementNS' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 2) {
                throw new globalObject.TypeError(`Failed to execute 'createElementNS' on 'Document': 2 arguments required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                if (curArg === null || curArg === undefined) {
                    curArg = null;
                } else {
                    curArg = conversions["DOMString"](curArg, {
                        context: "Failed to execute 'createElementNS' on 'Document': parameter 1",
                        globals: globalObject
                    });
                }
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'createElementNS' on 'Document': parameter 2",
                    globals: globalObject
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[2];
                if (curArg !== undefined) {
                    if (curArg === null || curArg === undefined) {
                        curArg = ElementCreationOptions.convert(globalObject, curArg, {
                            context: "Failed to execute 'createElementNS' on 'Document': parameter 3"
                        });
                    } else if (utils.isObject(curArg)) {
                        curArg = ElementCreationOptions.convert(globalObject, curArg, {
                            context: "Failed to execute 'createElementNS' on 'Document': parameter 3" + " dictionary"
                        });
                    } else {
                        curArg = conversions["DOMString"](curArg, {
                            context: "Failed to execute 'createElementNS' on 'Document': parameter 3",
                            globals: globalObject
                        });
                    }
                }
                args.push(curArg);
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return utils.tryWrapperForImpl(esValue[implSymbol].createElementNS(...args));
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        createDocumentFragment() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createDocumentFragment' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].createDocumentFragment());
        }
        createTextNode(data) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createTextNode' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'createTextNode' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'createTextNode' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].createTextNode(...args));
        }
        createCDATASection(data) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createCDATASection' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'createCDATASection' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'createCDATASection' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].createCDATASection(...args));
        }
        createComment(data) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createComment' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'createComment' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'createComment' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].createComment(...args));
        }
        createProcessingInstruction(target, data) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createProcessingInstruction' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 2) {
                throw new globalObject.TypeError(`Failed to execute 'createProcessingInstruction' on 'Document': 2 arguments required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'createProcessingInstruction' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'createProcessingInstruction' on 'Document': parameter 2",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].createProcessingInstruction(...args));
        }
        importNode(node) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'importNode' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'importNode' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = Node.convert(globalObject, curArg, {
                    context: "Failed to execute 'importNode' on 'Document': parameter 1"
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                if (curArg !== undefined) {
                    curArg = conversions["boolean"](curArg, {
                        context: "Failed to execute 'importNode' on 'Document': parameter 2",
                        globals: globalObject
                    });
                } else {
                    curArg = false;
                }
                args.push(curArg);
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return utils.tryWrapperForImpl(esValue[implSymbol].importNode(...args));
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        adoptNode(node) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'adoptNode' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'adoptNode' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = Node.convert(globalObject, curArg, {
                    context: "Failed to execute 'adoptNode' on 'Document': parameter 1"
                });
                args.push(curArg);
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return utils.tryWrapperForImpl(esValue[implSymbol].adoptNode(...args));
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        createAttribute(localName) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createAttribute' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'createAttribute' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'createAttribute' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].createAttribute(...args));
        }
        createAttributeNS(namespace, qualifiedName) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createAttributeNS' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 2) {
                throw new globalObject.TypeError(`Failed to execute 'createAttributeNS' on 'Document': 2 arguments required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                if (curArg === null || curArg === undefined) {
                    curArg = null;
                } else {
                    curArg = conversions["DOMString"](curArg, {
                        context: "Failed to execute 'createAttributeNS' on 'Document': parameter 1",
                        globals: globalObject
                    });
                }
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'createAttributeNS' on 'Document': parameter 2",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].createAttributeNS(...args));
        }
        createEvent(interface_) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createEvent' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'createEvent' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'createEvent' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].createEvent(...args));
        }
        createRange() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createRange' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].createRange());
        }
        createNodeIterator(root) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createNodeIterator' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'createNodeIterator' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = Node.convert(globalObject, curArg, {
                    context: "Failed to execute 'createNodeIterator' on 'Document': parameter 1"
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                if (curArg !== undefined) {
                    curArg = conversions["unsigned long"](curArg, {
                        context: "Failed to execute 'createNodeIterator' on 'Document': parameter 2",
                        globals: globalObject
                    });
                } else {
                    curArg = 0xffffffff;
                }
                args.push(curArg);
            }
            {
                let curArg = arguments[2];
                if (curArg !== undefined) {
                    if (curArg === null || curArg === undefined) {
                        curArg = null;
                    } else {
                        curArg = NodeFilter.convert(globalObject, curArg, {
                            context: "Failed to execute 'createNodeIterator' on 'Document': parameter 3"
                        });
                    }
                } else {
                    curArg = null;
                }
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].createNodeIterator(...args));
        }
        createTreeWalker(root) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'createTreeWalker' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'createTreeWalker' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = Node.convert(globalObject, curArg, {
                    context: "Failed to execute 'createTreeWalker' on 'Document': parameter 1"
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                if (curArg !== undefined) {
                    curArg = conversions["unsigned long"](curArg, {
                        context: "Failed to execute 'createTreeWalker' on 'Document': parameter 2",
                        globals: globalObject
                    });
                } else {
                    curArg = 0xffffffff;
                }
                args.push(curArg);
            }
            {
                let curArg = arguments[2];
                if (curArg !== undefined) {
                    if (curArg === null || curArg === undefined) {
                        curArg = null;
                    } else {
                        curArg = NodeFilter.convert(globalObject, curArg, {
                            context: "Failed to execute 'createTreeWalker' on 'Document': parameter 3"
                        });
                    }
                } else {
                    curArg = null;
                }
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].createTreeWalker(...args));
        }
        getElementsByName(elementName) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'getElementsByName' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'getElementsByName' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'getElementsByName' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].getElementsByName(...args));
        }
        open() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'open' called on an object that is not a valid instance of Document.");
            }
            const args = [];
            {
                let curArg = arguments[0];
                if (curArg !== undefined) {
                    curArg = conversions["DOMString"](curArg, {
                        context: "Failed to execute 'open' on 'Document': parameter 1",
                        globals: globalObject
                    });
                } else {
                    curArg = "text/html";
                }
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                if (curArg !== undefined) {
                    curArg = conversions["DOMString"](curArg, {
                        context: "Failed to execute 'open' on 'Document': parameter 2",
                        globals: globalObject
                    });
                } else {
                    curArg = "";
                }
                args.push(curArg);
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return utils.tryWrapperForImpl(esValue[implSymbol].open(...args));
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        close() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'close' called on an object that is not a valid instance of Document.");
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return esValue[implSymbol].close();
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        write() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'write' called on an object that is not a valid instance of Document.");
            }
            const args = [];
            for(let i = 0; i < arguments.length; i++){
                let curArg = arguments[i];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'write' on 'Document': parameter " + (i + 1),
                    globals: globalObject
                });
                args.push(curArg);
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return esValue[implSymbol].write(...args);
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        writeln() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'writeln' called on an object that is not a valid instance of Document.");
            }
            const args = [];
            for(let i = 0; i < arguments.length; i++){
                let curArg = arguments[i];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'writeln' on 'Document': parameter " + (i + 1),
                    globals: globalObject
                });
                args.push(curArg);
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return esValue[implSymbol].writeln(...args);
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        hasFocus() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'hasFocus' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol].hasFocus();
        }
        clear() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'clear' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol].clear();
        }
        captureEvents() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'captureEvents' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol].captureEvents();
        }
        releaseEvents() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'releaseEvents' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol].releaseEvents();
        }
        getSelection() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'getSelection' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].getSelection());
        }
        getElementById(elementId) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'getElementById' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'getElementById' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'getElementById' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].getElementById(...args));
        }
        prepend() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'prepend' called on an object that is not a valid instance of Document.");
            }
            const args = [];
            for(let i = 0; i < arguments.length; i++){
                let curArg = arguments[i];
                if (Node.is(curArg)) {
                    curArg = utils.implForWrapper(curArg);
                } else {
                    curArg = conversions["DOMString"](curArg, {
                        context: "Failed to execute 'prepend' on 'Document': parameter " + (i + 1),
                        globals: globalObject
                    });
                }
                args.push(curArg);
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return esValue[implSymbol].prepend(...args);
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        append() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'append' called on an object that is not a valid instance of Document.");
            }
            const args = [];
            for(let i = 0; i < arguments.length; i++){
                let curArg = arguments[i];
                if (Node.is(curArg)) {
                    curArg = utils.implForWrapper(curArg);
                } else {
                    curArg = conversions["DOMString"](curArg, {
                        context: "Failed to execute 'append' on 'Document': parameter " + (i + 1),
                        globals: globalObject
                    });
                }
                args.push(curArg);
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return esValue[implSymbol].append(...args);
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        replaceChildren() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'replaceChildren' called on an object that is not a valid instance of Document.");
            }
            const args = [];
            for(let i = 0; i < arguments.length; i++){
                let curArg = arguments[i];
                if (Node.is(curArg)) {
                    curArg = utils.implForWrapper(curArg);
                } else {
                    curArg = conversions["DOMString"](curArg, {
                        context: "Failed to execute 'replaceChildren' on 'Document': parameter " + (i + 1),
                        globals: globalObject
                    });
                }
                args.push(curArg);
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return esValue[implSymbol].replaceChildren(...args);
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        querySelector(selectors) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'querySelector' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'querySelector' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'querySelector' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].querySelector(...args));
        }
        querySelectorAll(selectors) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'querySelectorAll' called on an object that is not a valid instance of Document.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'querySelectorAll' on 'Document': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["DOMString"](curArg, {
                    context: "Failed to execute 'querySelectorAll' on 'Document': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].querySelectorAll(...args));
        }
        get implementation() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get implementation' called on an object that is not a valid instance of Document.");
            }
            return utils.getSameObject(this, "implementation", ()=>{
                return utils.tryWrapperForImpl(esValue[implSymbol]["implementation"]);
            });
        }
        get URL() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get URL' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol]["URL"];
        }
        get documentURI() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get documentURI' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol]["documentURI"];
        }
        get compatMode() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get compatMode' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol]["compatMode"];
        }
        get characterSet() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get characterSet' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol]["characterSet"];
        }
        get charset() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get charset' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol]["charset"];
        }
        get inputEncoding() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get inputEncoding' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol]["inputEncoding"];
        }
        get contentType() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get contentType' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol]["contentType"];
        }
        get doctype() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get doctype' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["doctype"]);
        }
        get documentElement() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get documentElement' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["documentElement"]);
        }
        get referrer() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get referrer' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol]["referrer"];
        }
        get cookie() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get cookie' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol]["cookie"];
        }
        set cookie(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set cookie' called on an object that is not a valid instance of Document.");
            }
            V1 = conversions["USVString"](V1, {
                context: "Failed to set the 'cookie' property on 'Document': The provided value",
                globals: globalObject
            });
            esValue[implSymbol]["cookie"] = V1;
        }
        get lastModified() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get lastModified' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol]["lastModified"];
        }
        get readyState() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get readyState' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["readyState"]);
        }
        get title() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get title' called on an object that is not a valid instance of Document.");
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return esValue[implSymbol]["title"];
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        set title(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set title' called on an object that is not a valid instance of Document.");
            }
            V1 = conversions["DOMString"](V1, {
                context: "Failed to set the 'title' property on 'Document': The provided value",
                globals: globalObject
            });
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                esValue[implSymbol]["title"] = V1;
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        get dir() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get dir' called on an object that is not a valid instance of Document.");
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return esValue[implSymbol]["dir"];
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        set dir(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set dir' called on an object that is not a valid instance of Document.");
            }
            V1 = conversions["DOMString"](V1, {
                context: "Failed to set the 'dir' property on 'Document': The provided value",
                globals: globalObject
            });
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                esValue[implSymbol]["dir"] = V1;
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        get body() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get body' called on an object that is not a valid instance of Document.");
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                return utils.tryWrapperForImpl(esValue[implSymbol]["body"]);
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        set body(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set body' called on an object that is not a valid instance of Document.");
            }
            if (V1 === null || V1 === undefined) {
                V1 = null;
            } else {
                V1 = HTMLElement.convert(globalObject, V1, {
                    context: "Failed to set the 'body' property on 'Document': The provided value"
                });
            }
            ceReactionsPreSteps_helpers_custom_elements(globalObject);
            try {
                esValue[implSymbol]["body"] = V1;
            } finally{
                ceReactionsPostSteps_helpers_custom_elements(globalObject);
            }
        }
        get head() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get head' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["head"]);
        }
        get images() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get images' called on an object that is not a valid instance of Document.");
            }
            return utils.getSameObject(this, "images", ()=>{
                return utils.tryWrapperForImpl(esValue[implSymbol]["images"]);
            });
        }
        get embeds() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get embeds' called on an object that is not a valid instance of Document.");
            }
            return utils.getSameObject(this, "embeds", ()=>{
                return utils.tryWrapperForImpl(esValue[implSymbol]["embeds"]);
            });
        }
        get plugins() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get plugins' called on an object that is not a valid instance of Document.");
            }
            return utils.getSameObject(this, "plugins", ()=>{
                return utils.tryWrapperForImpl(esValue[implSymbol]["plugins"]);
            });
        }
        get links() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get links' called on an object that is not a valid instance of Document.");
            }
            return utils.getSameObject(this, "links", ()=>{
                return utils.tryWrapperForImpl(esValue[implSymbol]["links"]);
            });
        }
        get forms() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get forms' called on an object that is not a valid instance of Document.");
            }
            return utils.getSameObject(this, "forms", ()=>{
                return utils.tryWrapperForImpl(esValue[implSymbol]["forms"]);
            });
        }
        get scripts() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get scripts' called on an object that is not a valid instance of Document.");
            }
            return utils.getSameObject(this, "scripts", ()=>{
                return utils.tryWrapperForImpl(esValue[implSymbol]["scripts"]);
            });
        }
        get currentScript() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get currentScript' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["currentScript"]);
        }
        get defaultView() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get defaultView' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["defaultView"]);
        }
        get onreadystatechange() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                return;
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onreadystatechange"]);
        }
        set onreadystatechange(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                return;
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onreadystatechange' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onreadystatechange"] = V1;
        }
        get anchors() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get anchors' called on an object that is not a valid instance of Document.");
            }
            return utils.getSameObject(this, "anchors", ()=>{
                return utils.tryWrapperForImpl(esValue[implSymbol]["anchors"]);
            });
        }
        get applets() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get applets' called on an object that is not a valid instance of Document.");
            }
            return utils.getSameObject(this, "applets", ()=>{
                return utils.tryWrapperForImpl(esValue[implSymbol]["applets"]);
            });
        }
        get styleSheets() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get styleSheets' called on an object that is not a valid instance of Document.");
            }
            return utils.getSameObject(this, "styleSheets", ()=>{
                return utils.tryWrapperForImpl(esValue[implSymbol]["styleSheets"]);
            });
        }
        get hidden() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get hidden' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol]["hidden"];
        }
        get visibilityState() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get visibilityState' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["visibilityState"]);
        }
        get onvisibilitychange() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onvisibilitychange' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onvisibilitychange"]);
        }
        set onvisibilitychange(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onvisibilitychange' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onvisibilitychange' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onvisibilitychange"] = V1;
        }
        get onabort() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onabort' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onabort"]);
        }
        set onabort(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onabort' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onabort' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onabort"] = V1;
        }
        get onauxclick() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onauxclick' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onauxclick"]);
        }
        set onauxclick(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onauxclick' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onauxclick' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onauxclick"] = V1;
        }
        get onbeforeinput() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onbeforeinput' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onbeforeinput"]);
        }
        set onbeforeinput(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onbeforeinput' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onbeforeinput' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onbeforeinput"] = V1;
        }
        get onbeforematch() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onbeforematch' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onbeforematch"]);
        }
        set onbeforematch(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onbeforematch' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onbeforematch' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onbeforematch"] = V1;
        }
        get onbeforetoggle() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onbeforetoggle' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onbeforetoggle"]);
        }
        set onbeforetoggle(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onbeforetoggle' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onbeforetoggle' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onbeforetoggle"] = V1;
        }
        get onblur() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onblur' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onblur"]);
        }
        set onblur(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onblur' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onblur' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onblur"] = V1;
        }
        get oncancel() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get oncancel' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["oncancel"]);
        }
        set oncancel(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set oncancel' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'oncancel' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["oncancel"] = V1;
        }
        get oncanplay() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get oncanplay' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["oncanplay"]);
        }
        set oncanplay(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set oncanplay' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'oncanplay' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["oncanplay"] = V1;
        }
        get oncanplaythrough() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get oncanplaythrough' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["oncanplaythrough"]);
        }
        set oncanplaythrough(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set oncanplaythrough' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'oncanplaythrough' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["oncanplaythrough"] = V1;
        }
        get onchange() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onchange' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onchange"]);
        }
        set onchange(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onchange' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onchange' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onchange"] = V1;
        }
        get onclick() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onclick' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onclick"]);
        }
        set onclick(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onclick' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onclick' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onclick"] = V1;
        }
        get onclose() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onclose' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onclose"]);
        }
        set onclose(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onclose' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onclose' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onclose"] = V1;
        }
        get oncontextlost() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get oncontextlost' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["oncontextlost"]);
        }
        set oncontextlost(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set oncontextlost' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'oncontextlost' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["oncontextlost"] = V1;
        }
        get oncontextmenu() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get oncontextmenu' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["oncontextmenu"]);
        }
        set oncontextmenu(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set oncontextmenu' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'oncontextmenu' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["oncontextmenu"] = V1;
        }
        get oncontextrestored() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get oncontextrestored' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["oncontextrestored"]);
        }
        set oncontextrestored(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set oncontextrestored' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'oncontextrestored' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["oncontextrestored"] = V1;
        }
        get oncopy() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get oncopy' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["oncopy"]);
        }
        set oncopy(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set oncopy' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'oncopy' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["oncopy"] = V1;
        }
        get oncuechange() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get oncuechange' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["oncuechange"]);
        }
        set oncuechange(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set oncuechange' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'oncuechange' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["oncuechange"] = V1;
        }
        get oncut() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get oncut' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["oncut"]);
        }
        set oncut(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set oncut' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'oncut' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["oncut"] = V1;
        }
        get ondblclick() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ondblclick' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ondblclick"]);
        }
        set ondblclick(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ondblclick' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ondblclick' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ondblclick"] = V1;
        }
        get ondrag() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ondrag' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ondrag"]);
        }
        set ondrag(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ondrag' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ondrag' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ondrag"] = V1;
        }
        get ondragend() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ondragend' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ondragend"]);
        }
        set ondragend(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ondragend' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ondragend' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ondragend"] = V1;
        }
        get ondragenter() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ondragenter' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ondragenter"]);
        }
        set ondragenter(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ondragenter' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ondragenter' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ondragenter"] = V1;
        }
        get ondragleave() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ondragleave' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ondragleave"]);
        }
        set ondragleave(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ondragleave' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ondragleave' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ondragleave"] = V1;
        }
        get ondragover() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ondragover' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ondragover"]);
        }
        set ondragover(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ondragover' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ondragover' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ondragover"] = V1;
        }
        get ondragstart() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ondragstart' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ondragstart"]);
        }
        set ondragstart(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ondragstart' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ondragstart' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ondragstart"] = V1;
        }
        get ondrop() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ondrop' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ondrop"]);
        }
        set ondrop(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ondrop' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ondrop' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ondrop"] = V1;
        }
        get ondurationchange() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ondurationchange' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ondurationchange"]);
        }
        set ondurationchange(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ondurationchange' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ondurationchange' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ondurationchange"] = V1;
        }
        get onemptied() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onemptied' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onemptied"]);
        }
        set onemptied(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onemptied' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onemptied' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onemptied"] = V1;
        }
        get onended() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onended' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onended"]);
        }
        set onended(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onended' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onended' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onended"] = V1;
        }
        get onerror() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onerror' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onerror"]);
        }
        set onerror(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onerror' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = OnErrorEventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onerror' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onerror"] = V1;
        }
        get onfocus() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onfocus' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onfocus"]);
        }
        set onfocus(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onfocus' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onfocus' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onfocus"] = V1;
        }
        get onformdata() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onformdata' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onformdata"]);
        }
        set onformdata(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onformdata' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onformdata' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onformdata"] = V1;
        }
        get oninput() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get oninput' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["oninput"]);
        }
        set oninput(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set oninput' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'oninput' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["oninput"] = V1;
        }
        get oninvalid() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get oninvalid' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["oninvalid"]);
        }
        set oninvalid(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set oninvalid' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'oninvalid' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["oninvalid"] = V1;
        }
        get onkeydown() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onkeydown' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onkeydown"]);
        }
        set onkeydown(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onkeydown' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onkeydown' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onkeydown"] = V1;
        }
        get onkeypress() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onkeypress' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onkeypress"]);
        }
        set onkeypress(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onkeypress' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onkeypress' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onkeypress"] = V1;
        }
        get onkeyup() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onkeyup' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onkeyup"]);
        }
        set onkeyup(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onkeyup' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onkeyup' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onkeyup"] = V1;
        }
        get onload() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onload' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onload"]);
        }
        set onload(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onload' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onload' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onload"] = V1;
        }
        get onloadeddata() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onloadeddata' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onloadeddata"]);
        }
        set onloadeddata(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onloadeddata' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onloadeddata' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onloadeddata"] = V1;
        }
        get onloadedmetadata() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onloadedmetadata' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onloadedmetadata"]);
        }
        set onloadedmetadata(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onloadedmetadata' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onloadedmetadata' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onloadedmetadata"] = V1;
        }
        get onloadstart() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onloadstart' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onloadstart"]);
        }
        set onloadstart(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onloadstart' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onloadstart' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onloadstart"] = V1;
        }
        get onmousedown() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onmousedown' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onmousedown"]);
        }
        set onmousedown(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onmousedown' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onmousedown' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onmousedown"] = V1;
        }
        get onmouseenter() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                return;
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onmouseenter"]);
        }
        set onmouseenter(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                return;
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onmouseenter' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onmouseenter"] = V1;
        }
        get onmouseleave() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                return;
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onmouseleave"]);
        }
        set onmouseleave(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                return;
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onmouseleave' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onmouseleave"] = V1;
        }
        get onmousemove() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onmousemove' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onmousemove"]);
        }
        set onmousemove(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onmousemove' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onmousemove' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onmousemove"] = V1;
        }
        get onmouseout() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onmouseout' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onmouseout"]);
        }
        set onmouseout(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onmouseout' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onmouseout' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onmouseout"] = V1;
        }
        get onmouseover() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onmouseover' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onmouseover"]);
        }
        set onmouseover(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onmouseover' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onmouseover' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onmouseover"] = V1;
        }
        get onmouseup() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onmouseup' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onmouseup"]);
        }
        set onmouseup(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onmouseup' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onmouseup' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onmouseup"] = V1;
        }
        get onpaste() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onpaste' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onpaste"]);
        }
        set onpaste(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onpaste' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onpaste' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onpaste"] = V1;
        }
        get onpause() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onpause' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onpause"]);
        }
        set onpause(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onpause' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onpause' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onpause"] = V1;
        }
        get onplay() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onplay' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onplay"]);
        }
        set onplay(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onplay' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onplay' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onplay"] = V1;
        }
        get onplaying() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onplaying' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onplaying"]);
        }
        set onplaying(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onplaying' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onplaying' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onplaying"] = V1;
        }
        get onprogress() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onprogress' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onprogress"]);
        }
        set onprogress(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onprogress' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onprogress' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onprogress"] = V1;
        }
        get onratechange() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onratechange' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onratechange"]);
        }
        set onratechange(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onratechange' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onratechange' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onratechange"] = V1;
        }
        get onreset() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onreset' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onreset"]);
        }
        set onreset(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onreset' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onreset' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onreset"] = V1;
        }
        get onresize() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onresize' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onresize"]);
        }
        set onresize(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onresize' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onresize' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onresize"] = V1;
        }
        get onscroll() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onscroll' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onscroll"]);
        }
        set onscroll(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onscroll' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onscroll' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onscroll"] = V1;
        }
        get onscrollend() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onscrollend' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onscrollend"]);
        }
        set onscrollend(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onscrollend' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onscrollend' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onscrollend"] = V1;
        }
        get onsecuritypolicyviolation() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onsecuritypolicyviolation' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onsecuritypolicyviolation"]);
        }
        set onsecuritypolicyviolation(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onsecuritypolicyviolation' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onsecuritypolicyviolation' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onsecuritypolicyviolation"] = V1;
        }
        get onseeked() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onseeked' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onseeked"]);
        }
        set onseeked(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onseeked' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onseeked' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onseeked"] = V1;
        }
        get onseeking() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onseeking' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onseeking"]);
        }
        set onseeking(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onseeking' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onseeking' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onseeking"] = V1;
        }
        get onselect() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onselect' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onselect"]);
        }
        set onselect(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onselect' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onselect' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onselect"] = V1;
        }
        get onslotchange() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onslotchange' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onslotchange"]);
        }
        set onslotchange(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onslotchange' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onslotchange' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onslotchange"] = V1;
        }
        get onstalled() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onstalled' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onstalled"]);
        }
        set onstalled(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onstalled' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onstalled' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onstalled"] = V1;
        }
        get onsubmit() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onsubmit' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onsubmit"]);
        }
        set onsubmit(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onsubmit' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onsubmit' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onsubmit"] = V1;
        }
        get onsuspend() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onsuspend' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onsuspend"]);
        }
        set onsuspend(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onsuspend' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onsuspend' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onsuspend"] = V1;
        }
        get ontimeupdate() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ontimeupdate' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ontimeupdate"]);
        }
        set ontimeupdate(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ontimeupdate' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ontimeupdate' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ontimeupdate"] = V1;
        }
        get ontoggle() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ontoggle' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ontoggle"]);
        }
        set ontoggle(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ontoggle' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ontoggle' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ontoggle"] = V1;
        }
        get onvolumechange() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onvolumechange' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onvolumechange"]);
        }
        set onvolumechange(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onvolumechange' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onvolumechange' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onvolumechange"] = V1;
        }
        get onwaiting() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onwaiting' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onwaiting"]);
        }
        set onwaiting(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onwaiting' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onwaiting' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onwaiting"] = V1;
        }
        get onwebkitanimationend() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onwebkitanimationend' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onwebkitanimationend"]);
        }
        set onwebkitanimationend(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onwebkitanimationend' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onwebkitanimationend' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onwebkitanimationend"] = V1;
        }
        get onwebkitanimationiteration() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onwebkitanimationiteration' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onwebkitanimationiteration"]);
        }
        set onwebkitanimationiteration(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onwebkitanimationiteration' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onwebkitanimationiteration' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onwebkitanimationiteration"] = V1;
        }
        get onwebkitanimationstart() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onwebkitanimationstart' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onwebkitanimationstart"]);
        }
        set onwebkitanimationstart(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onwebkitanimationstart' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onwebkitanimationstart' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onwebkitanimationstart"] = V1;
        }
        get onwebkittransitionend() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onwebkittransitionend' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onwebkittransitionend"]);
        }
        set onwebkittransitionend(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onwebkittransitionend' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onwebkittransitionend' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onwebkittransitionend"] = V1;
        }
        get onwheel() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get onwheel' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["onwheel"]);
        }
        set onwheel(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set onwheel' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'onwheel' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["onwheel"] = V1;
        }
        get ontouchstart() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ontouchstart' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ontouchstart"]);
        }
        set ontouchstart(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ontouchstart' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ontouchstart' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ontouchstart"] = V1;
        }
        get ontouchend() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ontouchend' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ontouchend"]);
        }
        set ontouchend(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ontouchend' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ontouchend' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ontouchend"] = V1;
        }
        get ontouchmove() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ontouchmove' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ontouchmove"]);
        }
        set ontouchmove(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ontouchmove' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ontouchmove' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ontouchmove"] = V1;
        }
        get ontouchcancel() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get ontouchcancel' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["ontouchcancel"]);
        }
        set ontouchcancel(V1) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set ontouchcancel' called on an object that is not a valid instance of Document.");
            }
            if (!utils.isObject(V1)) {
                V1 = null;
            } else {
                V1 = EventHandlerNonNull.convert(globalObject, V1, {
                    context: "Failed to set the 'ontouchcancel' property on 'Document': The provided value"
                });
            }
            esValue[implSymbol]["ontouchcancel"] = V1;
        }
        get activeElement() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get activeElement' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["activeElement"]);
        }
        get children() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get children' called on an object that is not a valid instance of Document.");
            }
            return utils.getSameObject(this, "children", ()=>{
                return utils.tryWrapperForImpl(esValue[implSymbol]["children"]);
            });
        }
        get firstElementChild() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get firstElementChild' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["firstElementChild"]);
        }
        get lastElementChild() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get lastElementChild' called on an object that is not a valid instance of Document.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol]["lastElementChild"]);
        }
        get childElementCount() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get childElementCount' called on an object that is not a valid instance of Document.");
            }
            return esValue[implSymbol]["childElementCount"];
        }
    }
    Object.defineProperties(Document.prototype, {
        getElementsByTagName: {
            enumerable: true
        },
        getElementsByTagNameNS: {
            enumerable: true
        },
        getElementsByClassName: {
            enumerable: true
        },
        createElement: {
            enumerable: true
        },
        createElementNS: {
            enumerable: true
        },
        createDocumentFragment: {
            enumerable: true
        },
        createTextNode: {
            enumerable: true
        },
        createCDATASection: {
            enumerable: true
        },
        createComment: {
            enumerable: true
        },
        createProcessingInstruction: {
            enumerable: true
        },
        importNode: {
            enumerable: true
        },
        adoptNode: {
            enumerable: true
        },
        createAttribute: {
            enumerable: true
        },
        createAttributeNS: {
            enumerable: true
        },
        createEvent: {
            enumerable: true
        },
        createRange: {
            enumerable: true
        },
        createNodeIterator: {
            enumerable: true
        },
        createTreeWalker: {
            enumerable: true
        },
        getElementsByName: {
            enumerable: true
        },
        open: {
            enumerable: true
        },
        close: {
            enumerable: true
        },
        write: {
            enumerable: true
        },
        writeln: {
            enumerable: true
        },
        hasFocus: {
            enumerable: true
        },
        clear: {
            enumerable: true
        },
        captureEvents: {
            enumerable: true
        },
        releaseEvents: {
            enumerable: true
        },
        getSelection: {
            enumerable: true
        },
        getElementById: {
            enumerable: true
        },
        prepend: {
            enumerable: true
        },
        append: {
            enumerable: true
        },
        replaceChildren: {
            enumerable: true
        },
        querySelector: {
            enumerable: true
        },
        querySelectorAll: {
            enumerable: true
        },
        implementation: {
            enumerable: true
        },
        URL: {
            enumerable: true
        },
        documentURI: {
            enumerable: true
        },
        compatMode: {
            enumerable: true
        },
        characterSet: {
            enumerable: true
        },
        charset: {
            enumerable: true
        },
        inputEncoding: {
            enumerable: true
        },
        contentType: {
            enumerable: true
        },
        doctype: {
            enumerable: true
        },
        documentElement: {
            enumerable: true
        },
        referrer: {
            enumerable: true
        },
        cookie: {
            enumerable: true
        },
        lastModified: {
            enumerable: true
        },
        readyState: {
            enumerable: true
        },
        title: {
            enumerable: true
        },
        dir: {
            enumerable: true
        },
        body: {
            enumerable: true
        },
        head: {
            enumerable: true
        },
        images: {
            enumerable: true
        },
        embeds: {
            enumerable: true
        },
        plugins: {
            enumerable: true
        },
        links: {
            enumerable: true
        },
        forms: {
            enumerable: true
        },
        scripts: {
            enumerable: true
        },
        currentScript: {
            enumerable: true
        },
        defaultView: {
            enumerable: true
        },
        onreadystatechange: {
            enumerable: true
        },
        anchors: {
            enumerable: true
        },
        applets: {
            enumerable: true
        },
        styleSheets: {
            enumerable: true
        },
        hidden: {
            enumerable: true
        },
        visibilityState: {
            enumerable: true
        },
        onvisibilitychange: {
            enumerable: true
        },
        onabort: {
            enumerable: true
        },
        onauxclick: {
            enumerable: true
        },
        onbeforeinput: {
            enumerable: true
        },
        onbeforematch: {
            enumerable: true
        },
        onbeforetoggle: {
            enumerable: true
        },
        onblur: {
            enumerable: true
        },
        oncancel: {
            enumerable: true
        },
        oncanplay: {
            enumerable: true
        },
        oncanplaythrough: {
            enumerable: true
        },
        onchange: {
            enumerable: true
        },
        onclick: {
            enumerable: true
        },
        onclose: {
            enumerable: true
        },
        oncontextlost: {
            enumerable: true
        },
        oncontextmenu: {
            enumerable: true
        },
        oncontextrestored: {
            enumerable: true
        },
        oncopy: {
            enumerable: true
        },
        oncuechange: {
            enumerable: true
        },
        oncut: {
            enumerable: true
        },
        ondblclick: {
            enumerable: true
        },
        ondrag: {
            enumerable: true
        },
        ondragend: {
            enumerable: true
        },
        ondragenter: {
            enumerable: true
        },
        ondragleave: {
            enumerable: true
        },
        ondragover: {
            enumerable: true
        },
        ondragstart: {
            enumerable: true
        },
        ondrop: {
            enumerable: true
        },
        ondurationchange: {
            enumerable: true
        },
        onemptied: {
            enumerable: true
        },
        onended: {
            enumerable: true
        },
        onerror: {
            enumerable: true
        },
        onfocus: {
            enumerable: true
        },
        onformdata: {
            enumerable: true
        },
        oninput: {
            enumerable: true
        },
        oninvalid: {
            enumerable: true
        },
        onkeydown: {
            enumerable: true
        },
        onkeypress: {
            enumerable: true
        },
        onkeyup: {
            enumerable: true
        },
        onload: {
            enumerable: true
        },
        onloadeddata: {
            enumerable: true
        },
        onloadedmetadata: {
            enumerable: true
        },
        onloadstart: {
            enumerable: true
        },
        onmousedown: {
            enumerable: true
        },
        onmouseenter: {
            enumerable: true
        },
        onmouseleave: {
            enumerable: true
        },
        onmousemove: {
            enumerable: true
        },
        onmouseout: {
            enumerable: true
        },
        onmouseover: {
            enumerable: true
        },
        onmouseup: {
            enumerable: true
        },
        onpaste: {
            enumerable: true
        },
        onpause: {
            enumerable: true
        },
        onplay: {
            enumerable: true
        },
        onplaying: {
            enumerable: true
        },
        onprogress: {
            enumerable: true
        },
        onratechange: {
            enumerable: true
        },
        onreset: {
            enumerable: true
        },
        onresize: {
            enumerable: true
        },
        onscroll: {
            enumerable: true
        },
        onscrollend: {
            enumerable: true
        },
        onsecuritypolicyviolation: {
            enumerable: true
        },
        onseeked: {
            enumerable: true
        },
        onseeking: {
            enumerable: true
        },
        onselect: {
            enumerable: true
        },
        onslotchange: {
            enumerable: true
        },
        onstalled: {
            enumerable: true
        },
        onsubmit: {
            enumerable: true
        },
        onsuspend: {
            enumerable: true
        },
        ontimeupdate: {
            enumerable: true
        },
        ontoggle: {
            enumerable: true
        },
        onvolumechange: {
            enumerable: true
        },
        onwaiting: {
            enumerable: true
        },
        onwebkitanimationend: {
            enumerable: true
        },
        onwebkitanimationiteration: {
            enumerable: true
        },
        onwebkitanimationstart: {
            enumerable: true
        },
        onwebkittransitionend: {
            enumerable: true
        },
        onwheel: {
            enumerable: true
        },
        ontouchstart: {
            enumerable: true
        },
        ontouchend: {
            enumerable: true
        },
        ontouchmove: {
            enumerable: true
        },
        ontouchcancel: {
            enumerable: true
        },
        activeElement: {
            enumerable: true
        },
        children: {
            enumerable: true
        },
        firstElementChild: {
            enumerable: true
        },
        lastElementChild: {
            enumerable: true
        },
        childElementCount: {
            enumerable: true
        },
        [Symbol.toStringTag]: {
            value: "Document",
            configurable: true
        },
        [Symbol.unscopables]: {
            value: {
                prepend: true,
                append: true,
                replaceChildren: true,
                __proto__: null
            },
            configurable: true
        }
    });
    ctorRegistry[interfaceName] = Document;
    Object.defineProperty(globalObject, interfaceName, {
        configurable: true,
        writable: true,
        value: Document
    });
};
const Impl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Document-impl.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=d19db_jsdom_lib_jsdom_living_generated_Document_634339a5.js.map