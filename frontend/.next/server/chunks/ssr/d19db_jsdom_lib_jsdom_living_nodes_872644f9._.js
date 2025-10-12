module.exports = [
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/NodeList-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
exports.implementation = class NodeListImpl {
    constructor(globalObject, args, privateData){
        if (privateData.nodes) {
            this._list = [
                ...privateData.nodes
            ];
            this._isLive = false;
        } else {
            this._list = [];
            this._isLive = true;
            this._version = -1;
            this._element = privateData.element;
            this._query = privateData.query;
            this._update();
        }
    }
    get length() {
        this._update();
        return this._list.length;
    }
    item(index) {
        this._update();
        return this._list[index] || null;
    }
    _update() {
        if (this._isLive) {
            if (this._version < this._element._version) {
                const snapshot = this._query();
                for(let i = 0; i < snapshot.length; i++){
                    this._list[i] = snapshot[i];
                }
                this._list.length = snapshot.length;
                this._version = this._element._version;
            }
        }
    }
    get [idlUtils.supportedPropertyIndices]() {
        this._update();
        return this._list.keys();
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLCollection-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
exports.implementation = class HTMLCollectionImpl {
    constructor(globalObject, args, privateData){
        this._list = [];
        this._version = -1;
        this._element = privateData.element;
        this._query = privateData.query;
        this._globalObject = globalObject;
        this._update();
    }
    get length() {
        this._update();
        return this._list.length;
    }
    item(index) {
        this._update();
        return this._list[index] || null;
    }
    namedItem(key) {
        if (key === "") {
            return null;
        }
        this._update();
        for (const element of this._list){
            if (element.getAttributeNS(null, "id") === key) {
                return element;
            }
            if (element._namespaceURI === HTML_NS) {
                const name = element.getAttributeNS(null, "name");
                if (name === key) {
                    return element;
                }
            }
        }
        return null;
    }
    _update() {
        if (this._version < this._element._version) {
            const snapshot = this._query();
            for(let i = 0; i < snapshot.length; i++){
                this._list[i] = snapshot[i];
            }
            this._list.length = snapshot.length;
            this._version = this._element._version;
        }
    }
    get [idlUtils.supportedPropertyIndices]() {
        this._update();
        return this._list.keys();
    }
    get [idlUtils.supportedPropertyNames]() {
        this._update();
        const result = new Set();
        for (const element of this._list){
            const id = element.getAttributeNS(null, "id");
            if (id) {
                result.add(id);
            }
            if (element._namespaceURI === HTML_NS) {
                const name = element.getAttributeNS(null, "name");
                if (name) {
                    result.add(name);
                }
            }
        }
        return result;
    }
    // Inherit some useful functions from Array.
    [Symbol.iterator]() {
        this._update();
        return this._list[Symbol.iterator]();
    }
    entries() {
        this._update();
        return this._list.entries();
    }
    filter(...args) {
        this._update();
        return this._list.filter(...args);
    }
    map(...args) {
        this._update();
        return this._list.map(...args);
    }
    indexOf(...args) {
        this._update();
        return this._list.indexOf(...args);
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Node-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const EventTargetImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js [app-ssr] (ecmascript)").implementation;
const { simultaneousIterators } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const NODE_DOCUMENT_POSITION = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-document-position.js [app-ssr] (ecmascript)");
const { clone, locateNamespacePrefix, locateNamespace } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node.js [app-ssr] (ecmascript)");
const { setAnExistingAttributeValue } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes.js [app-ssr] (ecmascript)");
const NodeList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/NodeList.js [app-ssr] (ecmascript)");
const { nodeRoot, nodeLength, isInclusiveAncestor } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/node.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { queueTreeMutationRecord } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/mutation-observers.js [app-ssr] (ecmascript)");
const { enqueueCECallbackReaction, tryUpgradeElement } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/custom-elements.js [app-ssr] (ecmascript)");
const { isShadowRoot, shadowIncludingRoot, assignSlot, assignSlotableForTree, assignSlotable, signalSlotChange, isSlot, shadowIncludingInclusiveDescendantsIterator, shadowIncludingDescendantsIterator } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/shadow-dom.js [app-ssr] (ecmascript)");
const { invalidateStyleCache } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/style-rules.js [app-ssr] (ecmascript)");
function nodeEquals(a, b) {
    if (a.nodeType !== b.nodeType) {
        return false;
    }
    switch(a.nodeType){
        case NODE_TYPE.DOCUMENT_TYPE_NODE:
            if (a.name !== b.name || a.publicId !== b.publicId || a.systemId !== b.systemId) {
                return false;
            }
            break;
        case NODE_TYPE.ELEMENT_NODE:
            if (a._namespaceURI !== b._namespaceURI || a._prefix !== b._prefix || a._localName !== b._localName || a._attributeList.length !== b._attributeList.length) {
                return false;
            }
            break;
        case NODE_TYPE.ATTRIBUTE_NODE:
            if (a._namespace !== b._namespace || a._localName !== b._localName || a._value !== b._value) {
                return false;
            }
            break;
        case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
            if (a._target !== b._target || a._data !== b._data) {
                return false;
            }
            break;
        case NODE_TYPE.TEXT_NODE:
        case NODE_TYPE.COMMENT_NODE:
            if (a._data !== b._data) {
                return false;
            }
            break;
    }
    if (a.nodeType === NODE_TYPE.ELEMENT_NODE && !attributeListsEqual(a, b)) {
        return false;
    }
    for (const nodes of simultaneousIterators(domSymbolTree.childrenIterator(a), domSymbolTree.childrenIterator(b))){
        if (!nodes[0] || !nodes[1]) {
            // mismatch in the amount of childNodes
            return false;
        }
        if (!nodeEquals(nodes[0], nodes[1])) {
            return false;
        }
    }
    return true;
}
// Needed by https://dom.spec.whatwg.org/#concept-node-equals
function attributeListsEqual(elementA, elementB) {
    const listA = elementA._attributeList;
    const listB = elementB._attributeList;
    const lengthA = listA.length;
    const lengthB = listB.length;
    if (lengthA !== lengthB) {
        return false;
    }
    for(let i = 0; i < lengthA; ++i){
        const attrA = listA[i];
        if (!listB.some((attrB)=>nodeEquals(attrA, attrB))) {
            return false;
        }
    }
    return true;
}
// https://dom.spec.whatwg.org/#concept-tree-host-including-inclusive-ancestor
function isHostInclusiveAncestor(nodeImplA, nodeImplB) {
    for (const ancestor of domSymbolTree.ancestorsIterator(nodeImplB)){
        if (ancestor === nodeImplA) {
            return true;
        }
    }
    const rootImplB = nodeRoot(nodeImplB);
    if (rootImplB._host) {
        return isHostInclusiveAncestor(nodeImplA, rootImplB._host);
    }
    return false;
}
class NodeImpl extends EventTargetImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        domSymbolTree.initialize(this);
        this._ownerDocument = privateData.ownerDocument;
        this._childNodesList = null;
        this._childrenList = null;
        this._version = 0;
        this._memoizedQueries = {};
        this._registeredObserverList = [];
        this._referencedRanges = new Set();
    }
    _getTheParent() {
        if (this._assignedSlot) {
            return this._assignedSlot;
        }
        return domSymbolTree.parent(this);
    }
    get parentNode() {
        return domSymbolTree.parent(this);
    }
    getRootNode(options) {
        return options.composed ? shadowIncludingRoot(this) : nodeRoot(this);
    }
    get nodeName() {
        switch(this.nodeType){
            case NODE_TYPE.ELEMENT_NODE:
                return this.tagName;
            case NODE_TYPE.ATTRIBUTE_NODE:
                return this._qualifiedName;
            case NODE_TYPE.TEXT_NODE:
                return "#text";
            case NODE_TYPE.CDATA_SECTION_NODE:
                return "#cdata-section";
            case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
                return this.target;
            case NODE_TYPE.COMMENT_NODE:
                return "#comment";
            case NODE_TYPE.DOCUMENT_NODE:
                return "#document";
            case NODE_TYPE.DOCUMENT_TYPE_NODE:
                return this.name;
            case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
                return "#document-fragment";
        }
        // should never happen
        return null;
    }
    get firstChild() {
        return domSymbolTree.firstChild(this);
    }
    // https://dom.spec.whatwg.org/#connected
    // https://dom.spec.whatwg.org/#dom-node-isconnected
    get isConnected() {
        const root = shadowIncludingRoot(this);
        return root && root.nodeType === NODE_TYPE.DOCUMENT_NODE;
    }
    get ownerDocument() {
        return this.nodeType === NODE_TYPE.DOCUMENT_NODE ? null : this._ownerDocument;
    }
    get lastChild() {
        return domSymbolTree.lastChild(this);
    }
    get childNodes() {
        if (!this._childNodesList) {
            this._childNodesList = NodeList.createImpl(this._globalObject, [], {
                element: this,
                query: ()=>domSymbolTree.childrenToArray(this)
            });
        } else {
            this._childNodesList._update();
        }
        return this._childNodesList;
    }
    get nextSibling() {
        return domSymbolTree.nextSibling(this);
    }
    get previousSibling() {
        return domSymbolTree.previousSibling(this);
    }
    _modified() {
        this._version++;
        for (const ancestor of domSymbolTree.ancestorsIterator(this)){
            ancestor._version++;
        }
        if (this._childrenList) {
            this._childrenList._update();
        }
        if (this._childNodesList) {
            this._childNodesList._update();
        }
        this._clearMemoizedQueries();
        invalidateStyleCache(this);
    }
    _childTextContentChangeSteps() {
        invalidateStyleCache(this);
    }
    _clearMemoizedQueries() {
        this._memoizedQueries = {};
        const myParent = domSymbolTree.parent(this);
        if (myParent) {
            myParent._clearMemoizedQueries();
        }
    }
    _descendantRemoved(parent, child) {
        const myParent = domSymbolTree.parent(this);
        if (myParent) {
            myParent._descendantRemoved(parent, child);
        }
    }
    _descendantAdded(parent, child) {
        const myParent = domSymbolTree.parent(this);
        if (myParent) {
            myParent._descendantAdded(parent, child);
        }
    }
    _attach() {
        this._attached = true;
        for (const child of domSymbolTree.childrenIterator(this)){
            if (child._attach) {
                child._attach();
            }
        }
    }
    _detach() {
        this._attached = false;
        if (this._ownerDocument && this._ownerDocument._lastFocusedElement === this) {
            this._ownerDocument._lastFocusedElement = null;
        }
        for (const child of domSymbolTree.childrenIterator(this)){
            if (child._detach) {
                child._detach();
            }
        }
    }
    hasChildNodes() {
        return domSymbolTree.hasChildren(this);
    }
    // https://dom.spec.whatwg.org/#dom-node-normalize
    normalize() {
        // It is important to use a treeToArray instead of a treeToIterator here, because the
        // treeToIterator doesn't support tree mutation in the middle of the traversal.
        for (const node of domSymbolTree.treeToArray(this)){
            const parentNode = domSymbolTree.parent(node);
            if (parentNode === null || node.nodeType !== NODE_TYPE.TEXT_NODE) {
                continue;
            }
            let length = nodeLength(node);
            if (length === 0) {
                parentNode._remove(node);
                continue;
            }
            const continuousExclusiveTextNodes = [];
            for (const currentNode of domSymbolTree.previousSiblingsIterator(node)){
                if (currentNode.nodeType !== NODE_TYPE.TEXT_NODE) {
                    break;
                }
                continuousExclusiveTextNodes.unshift(currentNode);
            }
            for (const currentNode of domSymbolTree.nextSiblingsIterator(node)){
                if (currentNode.nodeType !== NODE_TYPE.TEXT_NODE) {
                    break;
                }
                continuousExclusiveTextNodes.push(currentNode);
            }
            const data = continuousExclusiveTextNodes.reduce((d, n)=>d + n._data, "");
            node.replaceData(length, 0, data);
            let currentNode = domSymbolTree.nextSibling(node);
            while(currentNode && currentNode.nodeType === NODE_TYPE.TEXT_NODE){
                const currentNodeIndex = domSymbolTree.index(currentNode);
                for (const range of node._referencedRanges){
                    const { _start, _end } = range;
                    if (_start.node === currentNode) {
                        range._setLiveRangeStart(node, _start.offset + length);
                    }
                    if (_end.node === currentNode) {
                        range._setLiveRangeEnd(node, _end.offset + length);
                    }
                }
                for (const range of parentNode._referencedRanges){
                    const { _start, _end } = range;
                    if (_start.node === parentNode && _start.offset === currentNodeIndex) {
                        range._setLiveRangeStart(node, length);
                    }
                    if (_end.node === parentNode && _end.offset === currentNodeIndex) {
                        range._setLiveRangeEnd(node, length);
                    }
                }
                length += nodeLength(currentNode);
                currentNode = domSymbolTree.nextSibling(currentNode);
            }
            for (const continuousExclusiveTextNode of continuousExclusiveTextNodes){
                parentNode._remove(continuousExclusiveTextNode);
            }
        }
    }
    get parentElement() {
        const parentNode = domSymbolTree.parent(this);
        return parentNode !== null && parentNode.nodeType === NODE_TYPE.ELEMENT_NODE ? parentNode : null;
    }
    get baseURI() {
        return this._ownerDocument.baseURLSerialized();
    }
    compareDocumentPosition(other) {
        // Let node1 be other and node2 be the context object.
        let node1 = other;
        let node2 = this;
        let attr1 = null;
        let attr2 = null;
        if (node1.nodeType === NODE_TYPE.ATTRIBUTE_NODE) {
            attr1 = node1;
            node1 = attr1._element;
        }
        if (node2.nodeType === NODE_TYPE.ATTRIBUTE_NODE) {
            attr2 = node2;
            node2 = attr2._element;
            if (attr1 !== null && node1 !== null && node2 === node1) {
                for (const attr of node2._attributeList){
                    if (nodeEquals(attr, attr1)) {
                        return NODE_DOCUMENT_POSITION.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | NODE_DOCUMENT_POSITION.DOCUMENT_POSITION_PRECEDING;
                    }
                    if (nodeEquals(attr, attr2)) {
                        return NODE_DOCUMENT_POSITION.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | NODE_DOCUMENT_POSITION.DOCUMENT_POSITION_FOLLOWING;
                    }
                }
            }
        }
        const result = domSymbolTree.compareTreePosition(node2, node1);
        // “If other and reference are not in the same tree, return the result of adding DOCUMENT_POSITION_DISCONNECTED,
        //  DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC, and either DOCUMENT_POSITION_PRECEDING or
        // DOCUMENT_POSITION_FOLLOWING, with the constraint that this is to be consistent, together.”
        if (result === NODE_DOCUMENT_POSITION.DOCUMENT_POSITION_DISCONNECTED) {
            // symbol-tree does not add these bits required by the spec:
            return NODE_DOCUMENT_POSITION.DOCUMENT_POSITION_DISCONNECTED | NODE_DOCUMENT_POSITION.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | NODE_DOCUMENT_POSITION.DOCUMENT_POSITION_FOLLOWING;
        }
        return result;
    }
    lookupPrefix(namespace) {
        if (namespace === null || namespace === "") {
            return null;
        }
        switch(this.nodeType){
            case NODE_TYPE.ELEMENT_NODE:
                {
                    return locateNamespacePrefix(this, namespace);
                }
            case NODE_TYPE.DOCUMENT_NODE:
                {
                    return this.documentElement !== null ? locateNamespacePrefix(this.documentElement, namespace) : null;
                }
            case NODE_TYPE.DOCUMENT_TYPE_NODE:
            case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
                {
                    return null;
                }
            case NODE_TYPE.ATTRIBUTE_NODE:
                {
                    return this._element !== null ? locateNamespacePrefix(this._element, namespace) : null;
                }
            default:
                {
                    return this.parentElement !== null ? locateNamespacePrefix(this.parentElement, namespace) : null;
                }
        }
    }
    lookupNamespaceURI(prefix) {
        if (prefix === "") {
            prefix = null;
        }
        return locateNamespace(this, prefix);
    }
    isDefaultNamespace(namespace) {
        if (namespace === "") {
            namespace = null;
        }
        const defaultNamespace = locateNamespace(this, null);
        return defaultNamespace === namespace;
    }
    contains(other) {
        return isInclusiveAncestor(this, other);
    }
    isEqualNode(node) {
        if (node === null) {
            return false;
        }
        // Fast-path, not in the spec
        if (this === node) {
            return true;
        }
        return nodeEquals(this, node);
    }
    isSameNode(node) {
        if (this === node) {
            return true;
        }
        return false;
    }
    cloneNode(deep) {
        if (isShadowRoot(this)) {
            throw DOMException.create(this._globalObject, [
                "ShadowRoot nodes are not clonable.",
                "NotSupportedError"
            ]);
        }
        deep = Boolean(deep);
        return clone(this, undefined, deep);
    }
    get nodeValue() {
        switch(this.nodeType){
            case NODE_TYPE.ATTRIBUTE_NODE:
                {
                    return this._value;
                }
            case NODE_TYPE.TEXT_NODE:
            case NODE_TYPE.CDATA_SECTION_NODE:
            case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
            case NODE_TYPE.COMMENT_NODE:
                {
                    return this._data;
                }
            default:
                {
                    return null;
                }
        }
    }
    set nodeValue(value) {
        if (value === null) {
            value = "";
        }
        switch(this.nodeType){
            case NODE_TYPE.ATTRIBUTE_NODE:
                {
                    setAnExistingAttributeValue(this, value);
                    break;
                }
            case NODE_TYPE.TEXT_NODE:
            case NODE_TYPE.CDATA_SECTION_NODE:
            case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
            case NODE_TYPE.COMMENT_NODE:
                {
                    this.replaceData(0, this.length, value);
                    break;
                }
        }
    }
    // https://dom.spec.whatwg.org/#dom-node-textcontent
    get textContent() {
        switch(this.nodeType){
            case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
            case NODE_TYPE.ELEMENT_NODE:
                {
                    let text = "";
                    for (const child of domSymbolTree.treeIterator(this)){
                        if (child.nodeType === NODE_TYPE.TEXT_NODE || child.nodeType === NODE_TYPE.CDATA_SECTION_NODE) {
                            text += child.nodeValue;
                        }
                    }
                    return text;
                }
            case NODE_TYPE.ATTRIBUTE_NODE:
                {
                    return this._value;
                }
            case NODE_TYPE.TEXT_NODE:
            case NODE_TYPE.CDATA_SECTION_NODE:
            case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
            case NODE_TYPE.COMMENT_NODE:
                {
                    return this._data;
                }
            default:
                {
                    return null;
                }
        }
    }
    set textContent(value) {
        if (value === null) {
            value = "";
        }
        switch(this.nodeType){
            case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
            case NODE_TYPE.ELEMENT_NODE:
                {
                    // https://dom.spec.whatwg.org/#string-replace-all
                    let nodeImpl = null;
                    if (value !== "") {
                        nodeImpl = this._ownerDocument.createTextNode(value);
                    }
                    this._replaceAll(nodeImpl);
                    break;
                }
            case NODE_TYPE.ATTRIBUTE_NODE:
                {
                    setAnExistingAttributeValue(this, value);
                    break;
                }
            case NODE_TYPE.TEXT_NODE:
            case NODE_TYPE.CDATA_SECTION_NODE:
            case NODE_TYPE.PROCESSING_INSTRUCTION_NODE:
            case NODE_TYPE.COMMENT_NODE:
                {
                    this.replaceData(0, this.length, value);
                    break;
                }
        }
    }
    // https://dom.spec.whatwg.org/#dom-node-insertbefore
    insertBefore(nodeImpl, childImpl) {
        return this._preInsert(nodeImpl, childImpl);
    }
    // https://dom.spec.whatwg.org/#dom-node-appendchild
    appendChild(nodeImpl) {
        return this._append(nodeImpl);
    }
    // https://dom.spec.whatwg.org/#dom-node-replacechild
    replaceChild(nodeImpl, childImpl) {
        return this._replace(nodeImpl, childImpl);
    }
    // https://dom.spec.whatwg.org/#dom-node-removechild
    removeChild(oldChildImpl) {
        return this._preRemove(oldChildImpl);
    }
    // https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
    _preInsertValidity(nodeImpl, childImpl) {
        const { nodeType } = nodeImpl;
        const parentType = this.nodeType;
        if (parentType !== NODE_TYPE.DOCUMENT_NODE && parentType !== NODE_TYPE.DOCUMENT_FRAGMENT_NODE && parentType !== NODE_TYPE.ELEMENT_NODE) {
            throw DOMException.create(this._globalObject, [
                `Node can't be inserted in a ${this.nodeName} parent.`,
                "HierarchyRequestError"
            ]);
        }
        if (isHostInclusiveAncestor(nodeImpl, this)) {
            throw DOMException.create(this._globalObject, [
                "The operation would yield an incorrect node tree.",
                "HierarchyRequestError"
            ]);
        }
        if (childImpl && domSymbolTree.parent(childImpl) !== this) {
            throw DOMException.create(this._globalObject, [
                "The child can not be found in the parent.",
                "NotFoundError"
            ]);
        }
        if (nodeType !== NODE_TYPE.DOCUMENT_FRAGMENT_NODE && nodeType !== NODE_TYPE.DOCUMENT_TYPE_NODE && nodeType !== NODE_TYPE.ELEMENT_NODE && nodeType !== NODE_TYPE.TEXT_NODE && nodeType !== NODE_TYPE.CDATA_SECTION_NODE && // CData section extends from Text
        nodeType !== NODE_TYPE.PROCESSING_INSTRUCTION_NODE && nodeType !== NODE_TYPE.COMMENT_NODE) {
            throw DOMException.create(this._globalObject, [
                `${nodeImpl.nodeName} node can't be inserted in parent node.`,
                "HierarchyRequestError"
            ]);
        }
        if (nodeType === NODE_TYPE.TEXT_NODE && parentType === NODE_TYPE.DOCUMENT_NODE || nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE && parentType !== NODE_TYPE.DOCUMENT_NODE) {
            throw DOMException.create(this._globalObject, [
                `${nodeImpl.nodeName} node can't be inserted in ${this.nodeName} parent.`,
                "HierarchyRequestError"
            ]);
        }
        if (parentType === NODE_TYPE.DOCUMENT_NODE) {
            const nodeChildren = domSymbolTree.childrenToArray(nodeImpl);
            const parentChildren = domSymbolTree.childrenToArray(this);
            switch(nodeType){
                case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
                    {
                        const nodeChildrenElements = nodeChildren.filter((child)=>child.nodeType === NODE_TYPE.ELEMENT_NODE);
                        if (nodeChildrenElements.length > 1) {
                            throw DOMException.create(this._globalObject, [
                                `Invalid insertion of ${nodeImpl.nodeName} node in ${this.nodeName} node.`,
                                "HierarchyRequestError"
                            ]);
                        }
                        const hasNodeTextChildren = nodeChildren.some((child)=>child.nodeType === NODE_TYPE.TEXT_NODE);
                        if (hasNodeTextChildren) {
                            throw DOMException.create(this._globalObject, [
                                `Invalid insertion of ${nodeImpl.nodeName} node in ${this.nodeName} node.`,
                                "HierarchyRequestError"
                            ]);
                        }
                        if (nodeChildrenElements.length === 1 && (parentChildren.some((child)=>child.nodeType === NODE_TYPE.ELEMENT_NODE) || childImpl && childImpl.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE || childImpl && domSymbolTree.nextSibling(childImpl) && domSymbolTree.nextSibling(childImpl).nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE)) {
                            throw DOMException.create(this._globalObject, [
                                `Invalid insertion of ${nodeImpl.nodeName} node in ${this.nodeName} node.`,
                                "HierarchyRequestError"
                            ]);
                        }
                        break;
                    }
                case NODE_TYPE.ELEMENT_NODE:
                    if (parentChildren.some((child)=>child.nodeType === NODE_TYPE.ELEMENT_NODE) || childImpl && childImpl.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE || childImpl && domSymbolTree.nextSibling(childImpl) && domSymbolTree.nextSibling(childImpl).nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) {
                        throw DOMException.create(this._globalObject, [
                            `Invalid insertion of ${nodeImpl.nodeName} node in ${this.nodeName} node.`,
                            "HierarchyRequestError"
                        ]);
                    }
                    break;
                case NODE_TYPE.DOCUMENT_TYPE_NODE:
                    if (parentChildren.some((child)=>child.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) || childImpl && domSymbolTree.previousSibling(childImpl) && domSymbolTree.previousSibling(childImpl).nodeType === NODE_TYPE.ELEMENT_NODE || !childImpl && parentChildren.some((child)=>child.nodeType === NODE_TYPE.ELEMENT_NODE)) {
                        throw DOMException.create(this._globalObject, [
                            `Invalid insertion of ${nodeImpl.nodeName} node in ${this.nodeName} node.`,
                            "HierarchyRequestError"
                        ]);
                    }
                    break;
            }
        }
    }
    // https://dom.spec.whatwg.org/#concept-node-pre-insert
    _preInsert(nodeImpl, childImpl) {
        this._preInsertValidity(nodeImpl, childImpl);
        let referenceChildImpl = childImpl;
        if (referenceChildImpl === nodeImpl) {
            referenceChildImpl = domSymbolTree.nextSibling(nodeImpl);
        }
        this._ownerDocument._adoptNode(nodeImpl);
        this._insert(nodeImpl, referenceChildImpl);
        return nodeImpl;
    }
    // https://dom.spec.whatwg.org/#concept-node-insert
    _insert(nodeImpl, childImpl, suppressObservers) {
        const count = nodeImpl.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE ? domSymbolTree.childrenCount(nodeImpl) : 1;
        if (childImpl) {
            const childIndex = domSymbolTree.index(childImpl);
            for (const range of this._referencedRanges){
                const { _start, _end } = range;
                if (_start.offset > childIndex) {
                    range._setLiveRangeStart(this, _start.offset + count);
                }
                if (_end.offset > childIndex) {
                    range._setLiveRangeEnd(this, _end.offset + count);
                }
            }
        }
        const nodesImpl = nodeImpl.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE ? domSymbolTree.childrenToArray(nodeImpl) : [
            nodeImpl
        ];
        if (nodeImpl.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE) {
            let grandChildImpl;
            while(grandChildImpl = domSymbolTree.firstChild(nodeImpl)){
                nodeImpl._remove(grandChildImpl, true);
            }
        }
        if (nodeImpl.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE) {
            queueTreeMutationRecord(nodeImpl, [], nodesImpl, null, null);
        }
        const previousChildImpl = childImpl ? domSymbolTree.previousSibling(childImpl) : domSymbolTree.lastChild(this);
        let isConnected;
        for (const node of nodesImpl){
            if (!childImpl) {
                domSymbolTree.appendChild(this, node);
            } else {
                domSymbolTree.insertBefore(childImpl, node);
            }
            if (this.nodeType === NODE_TYPE.ELEMENT_NODE && this._shadowRoot !== null && (node.nodeType === NODE_TYPE.ELEMENT_NODE || node.nodeType === NODE_TYPE.TEXT_NODE)) {
                assignSlot(node);
            }
            this._modified();
            if (node.nodeType === NODE_TYPE.TEXT_NODE || node.nodeType === NODE_TYPE.CDATA_SECTION_NODE) {
                this._childTextContentChangeSteps();
            }
            if (isSlot(this) && this._assignedNodes.length === 0 && isShadowRoot(nodeRoot(this))) {
                signalSlotChange(this);
            }
            const root = nodeRoot(node);
            if (isShadowRoot(root)) {
                assignSlotableForTree(root);
            }
            if (this._attached && nodeImpl._attach) {
                node._attach();
            }
            this._descendantAdded(this, node);
            if (isConnected === undefined) {
                isConnected = node.isConnected;
            }
            if (isConnected) {
                for (const inclusiveDescendant of shadowIncludingInclusiveDescendantsIterator(node)){
                    if (inclusiveDescendant._ceState === "custom") {
                        enqueueCECallbackReaction(inclusiveDescendant, "connectedCallback", []);
                    } else {
                        tryUpgradeElement(inclusiveDescendant);
                    }
                }
            }
        }
        if (!suppressObservers) {
            queueTreeMutationRecord(this, nodesImpl, [], previousChildImpl, childImpl);
        }
    }
    // https://dom.spec.whatwg.org/#concept-node-append
    _append(nodeImpl) {
        return this._preInsert(nodeImpl, null);
    }
    // https://dom.spec.whatwg.org/#concept-node-replace
    _replace(nodeImpl, childImpl) {
        const { nodeType, nodeName } = nodeImpl;
        const { nodeType: parentType, nodeName: parentName } = this;
        // Note: This section differs from the pre-insert validation algorithm.
        if (parentType !== NODE_TYPE.DOCUMENT_NODE && parentType !== NODE_TYPE.DOCUMENT_FRAGMENT_NODE && parentType !== NODE_TYPE.ELEMENT_NODE) {
            throw DOMException.create(this._globalObject, [
                `Node can't be inserted in a ${parentName} parent.`,
                "HierarchyRequestError"
            ]);
        }
        if (isHostInclusiveAncestor(nodeImpl, this)) {
            throw DOMException.create(this._globalObject, [
                "The operation would yield an incorrect node tree.",
                "HierarchyRequestError"
            ]);
        }
        if (childImpl && domSymbolTree.parent(childImpl) !== this) {
            throw DOMException.create(this._globalObject, [
                "The child can not be found in the parent.",
                "NotFoundError"
            ]);
        }
        if (nodeType !== NODE_TYPE.DOCUMENT_FRAGMENT_NODE && nodeType !== NODE_TYPE.DOCUMENT_TYPE_NODE && nodeType !== NODE_TYPE.ELEMENT_NODE && nodeType !== NODE_TYPE.TEXT_NODE && nodeType !== NODE_TYPE.CDATA_SECTION_NODE && // CData section extends from Text
        nodeType !== NODE_TYPE.PROCESSING_INSTRUCTION_NODE && nodeType !== NODE_TYPE.COMMENT_NODE) {
            throw DOMException.create(this._globalObject, [
                `${nodeName} node can't be inserted in parent node.`,
                "HierarchyRequestError"
            ]);
        }
        if (nodeType === NODE_TYPE.TEXT_NODE && parentType === NODE_TYPE.DOCUMENT_NODE || nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE && parentType !== NODE_TYPE.DOCUMENT_NODE) {
            throw DOMException.create(this._globalObject, [
                `${nodeName} node can't be inserted in ${parentName} parent.`,
                "HierarchyRequestError"
            ]);
        }
        if (parentType === NODE_TYPE.DOCUMENT_NODE) {
            const nodeChildren = domSymbolTree.childrenToArray(nodeImpl);
            const parentChildren = domSymbolTree.childrenToArray(this);
            switch(nodeType){
                case NODE_TYPE.DOCUMENT_FRAGMENT_NODE:
                    {
                        const nodeChildrenElements = nodeChildren.filter((child)=>child.nodeType === NODE_TYPE.ELEMENT_NODE);
                        if (nodeChildrenElements.length > 1) {
                            throw DOMException.create(this._globalObject, [
                                `Invalid insertion of ${nodeName} node in ${parentName} node.`,
                                "HierarchyRequestError"
                            ]);
                        }
                        const hasNodeTextChildren = nodeChildren.some((child)=>child.nodeType === NODE_TYPE.TEXT_NODE);
                        if (hasNodeTextChildren) {
                            throw DOMException.create(this._globalObject, [
                                `Invalid insertion of ${nodeName} node in ${parentName} node.`,
                                "HierarchyRequestError"
                            ]);
                        }
                        const parentChildElements = parentChildren.filter((child)=>child.nodeType === NODE_TYPE.ELEMENT_NODE);
                        if (nodeChildrenElements.length === 1 && (parentChildElements.length === 1 && parentChildElements[0] !== childImpl || childImpl && domSymbolTree.nextSibling(childImpl) && domSymbolTree.nextSibling(childImpl).nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE)) {
                            throw DOMException.create(this._globalObject, [
                                `Invalid insertion of ${nodeName} node in ${parentName} node.`,
                                "HierarchyRequestError"
                            ]);
                        }
                        break;
                    }
                case NODE_TYPE.ELEMENT_NODE:
                    if (parentChildren.some((child)=>child.nodeType === NODE_TYPE.ELEMENT_NODE && child !== childImpl) || childImpl && domSymbolTree.nextSibling(childImpl) && domSymbolTree.nextSibling(childImpl).nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) {
                        throw DOMException.create(this._globalObject, [
                            `Invalid insertion of ${nodeName} node in ${parentName} node.`,
                            "HierarchyRequestError"
                        ]);
                    }
                    break;
                case NODE_TYPE.DOCUMENT_TYPE_NODE:
                    if (parentChildren.some((child)=>child.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE && child !== childImpl) || childImpl && domSymbolTree.previousSibling(childImpl) && domSymbolTree.previousSibling(childImpl).nodeType === NODE_TYPE.ELEMENT_NODE) {
                        throw DOMException.create(this._globalObject, [
                            `Invalid insertion of ${nodeName} node in ${parentName} node.`,
                            "HierarchyRequestError"
                        ]);
                    }
                    break;
            }
        }
        let referenceChildImpl = domSymbolTree.nextSibling(childImpl);
        if (referenceChildImpl === nodeImpl) {
            referenceChildImpl = domSymbolTree.nextSibling(nodeImpl);
        }
        const previousSiblingImpl = domSymbolTree.previousSibling(childImpl);
        this._ownerDocument._adoptNode(nodeImpl);
        let removedNodesImpl = [];
        if (domSymbolTree.parent(childImpl)) {
            removedNodesImpl = [
                childImpl
            ];
            this._remove(childImpl, true);
        }
        const nodesImpl = nodeImpl.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE ? domSymbolTree.childrenToArray(nodeImpl) : [
            nodeImpl
        ];
        this._insert(nodeImpl, referenceChildImpl, true);
        queueTreeMutationRecord(this, nodesImpl, removedNodesImpl, previousSiblingImpl, referenceChildImpl);
        return childImpl;
    }
    // https://dom.spec.whatwg.org/#concept-node-replace-all
    _replaceAll(nodeImpl) {
        if (nodeImpl !== null) {
            this._ownerDocument._adoptNode(nodeImpl);
        }
        const removedNodesImpl = domSymbolTree.childrenToArray(this);
        let addedNodesImpl;
        if (nodeImpl === null) {
            addedNodesImpl = [];
        } else if (nodeImpl.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE) {
            addedNodesImpl = domSymbolTree.childrenToArray(nodeImpl);
        } else {
            addedNodesImpl = [
                nodeImpl
            ];
        }
        for (const childImpl of domSymbolTree.childrenIterator(this)){
            this._remove(childImpl, true);
        }
        if (nodeImpl !== null) {
            this._insert(nodeImpl, null, true);
        }
        if (addedNodesImpl.length > 0 || removedNodesImpl.length > 0) {
            queueTreeMutationRecord(this, addedNodesImpl, removedNodesImpl, null, null);
        }
    }
    // https://dom.spec.whatwg.org/#concept-node-pre-remove
    _preRemove(childImpl) {
        if (domSymbolTree.parent(childImpl) !== this) {
            throw DOMException.create(this._globalObject, [
                "The node to be removed is not a child of this node.",
                "NotFoundError"
            ]);
        }
        this._remove(childImpl);
        return childImpl;
    }
    // https://dom.spec.whatwg.org/#concept-node-remove
    _remove(nodeImpl, suppressObservers) {
        const index = domSymbolTree.index(nodeImpl);
        for (const descendant of domSymbolTree.treeIterator(nodeImpl)){
            for (const range of descendant._referencedRanges){
                const { _start, _end } = range;
                if (_start.node === descendant) {
                    range._setLiveRangeStart(this, index);
                }
                if (_end.node === descendant) {
                    range._setLiveRangeEnd(this, index);
                }
            }
        }
        for (const range of this._referencedRanges){
            const { _start, _end } = range;
            if (_start.node === this && _start.offset > index) {
                range._setLiveRangeStart(this, _start.offset - 1);
            }
            if (_end.node === this && _end.offset > index) {
                range._setLiveRangeEnd(this, _end.offset - 1);
            }
        }
        if (this._ownerDocument) {
            this._ownerDocument._runPreRemovingSteps(nodeImpl);
        }
        const oldPreviousSiblingImpl = domSymbolTree.previousSibling(nodeImpl);
        const oldNextSiblingImpl = domSymbolTree.nextSibling(nodeImpl);
        domSymbolTree.remove(nodeImpl);
        if (nodeImpl._assignedSlot) {
            assignSlotable(nodeImpl._assignedSlot);
        }
        if (isSlot(this) && this._assignedNodes.length === 0 && isShadowRoot(nodeRoot(this))) {
            signalSlotChange(this);
        }
        let hasSlotDescendant = isSlot(nodeImpl);
        if (!hasSlotDescendant) {
            for (const child of domSymbolTree.treeIterator(nodeImpl)){
                if (isSlot(child)) {
                    hasSlotDescendant = true;
                    break;
                }
            }
        }
        if (hasSlotDescendant) {
            assignSlotableForTree(nodeRoot(this));
            assignSlotableForTree(nodeImpl);
        }
        this._modified();
        nodeImpl._detach();
        this._descendantRemoved(this, nodeImpl);
        if (this.isConnected) {
            if (nodeImpl._ceState === "custom") {
                enqueueCECallbackReaction(nodeImpl, "disconnectedCallback", []);
            }
            for (const descendantImpl of shadowIncludingDescendantsIterator(nodeImpl)){
                if (descendantImpl._ceState === "custom") {
                    enqueueCECallbackReaction(descendantImpl, "disconnectedCallback", []);
                }
            }
        }
        if (!suppressObservers) {
            queueTreeMutationRecord(this, [], [
                nodeImpl
            ], oldPreviousSiblingImpl, oldNextSiblingImpl);
        }
        if (nodeImpl.nodeType === NODE_TYPE.TEXT_NODE) {
            this._childTextContentChangeSteps();
        }
    }
}
module.exports = {
    implementation: NodeImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ParentNode-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const NodeList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/NodeList.js [app-ssr] (ecmascript)");
const HTMLCollection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLCollection.js [app-ssr] (ecmascript)");
const { addNwsapi } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/selectors.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { convertNodesIntoNode } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node.js [app-ssr] (ecmascript)");
class ParentNodeImpl {
    get children() {
        if (!this._childrenList) {
            this._childrenList = HTMLCollection.createImpl(this._globalObject, [], {
                element: this,
                query: ()=>domSymbolTree.childrenToArray(this, {
                        filter: (node)=>node.nodeType === NODE_TYPE.ELEMENT_NODE
                    })
            });
        } else {
            this._childrenList._update();
        }
        return this._childrenList;
    }
    get firstElementChild() {
        for (const child of domSymbolTree.childrenIterator(this)){
            if (child.nodeType === NODE_TYPE.ELEMENT_NODE) {
                return child;
            }
        }
        return null;
    }
    get lastElementChild() {
        for (const child of domSymbolTree.childrenIterator(this, {
            reverse: true
        })){
            if (child.nodeType === NODE_TYPE.ELEMENT_NODE) {
                return child;
            }
        }
        return null;
    }
    get childElementCount() {
        return this.children.length;
    }
    prepend(...nodes) {
        this._preInsert(convertNodesIntoNode(this._ownerDocument, nodes), this.firstChild);
    }
    append(...nodes) {
        this._append(convertNodesIntoNode(this._ownerDocument, nodes));
    }
    replaceChildren(...nodes) {
        const node = convertNodesIntoNode(this._ownerDocument, nodes);
        this._preInsertValidity(node, null);
        this._replaceAll(node);
    }
    querySelector(selectors) {
        if (shouldAlwaysSelectNothing(this)) {
            return null;
        }
        const matcher = addNwsapi(this);
        return idlUtils.implForWrapper(matcher.first(selectors, idlUtils.wrapperForImpl(this)));
    }
    // WARNING FOR INTERNAL USERS:
    // This returns a NodeList impl, not a NodeList wrapper. NodeList impls are not iterable and do not have indexed
    // properties. To iterate over them, use `for (let i = 0; i < nodeListImpl.length; ++i) { nodeListImpl.item(i) }`.
    querySelectorAll(selectors) {
        if (shouldAlwaysSelectNothing(this)) {
            return NodeList.createImpl(this._globalObject, [], {
                nodes: []
            });
        }
        const matcher = addNwsapi(this);
        const list = matcher.select(selectors, idlUtils.wrapperForImpl(this));
        return NodeList.createImpl(this._globalObject, [], {
            nodes: list.map((n)=>idlUtils.tryImplForWrapper(n))
        });
    }
}
function shouldAlwaysSelectNothing(elImpl) {
    // This is true during initialization.
    return elImpl === elImpl._ownerDocument && !elImpl.documentElement;
}
module.exports = {
    implementation: ParentNodeImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ChildNode-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { convertNodesIntoNode } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node.js [app-ssr] (ecmascript)");
class ChildNodeImpl {
    remove() {
        if (!this.parentNode) {
            return;
        }
        this.parentNode._remove(this);
    }
    after(...nodes) {
        const parent = this.parentNode;
        if (parent) {
            let viableNextSibling = this.nextSibling;
            let idx = viableNextSibling ? nodes.indexOf(viableNextSibling) : -1;
            while(idx !== -1){
                viableNextSibling = viableNextSibling.nextSibling;
                if (!viableNextSibling) {
                    break;
                }
                idx = nodes.indexOf(viableNextSibling);
            }
            parent._preInsert(convertNodesIntoNode(this._ownerDocument, nodes), viableNextSibling);
        }
    }
    before(...nodes) {
        const parent = this.parentNode;
        if (parent) {
            let viablePreviousSibling = this.previousSibling;
            let idx = viablePreviousSibling ? nodes.indexOf(viablePreviousSibling) : -1;
            while(idx !== -1){
                viablePreviousSibling = viablePreviousSibling.previousSibling;
                if (!viablePreviousSibling) {
                    break;
                }
                idx = nodes.indexOf(viablePreviousSibling);
            }
            parent._preInsert(convertNodesIntoNode(this._ownerDocument, nodes), viablePreviousSibling ? viablePreviousSibling.nextSibling : parent.firstChild);
        }
    }
    replaceWith(...nodes) {
        const parent = this.parentNode;
        if (parent) {
            let viableNextSibling = this.nextSibling;
            let idx = viableNextSibling ? nodes.indexOf(viableNextSibling) : -1;
            while(idx !== -1){
                viableNextSibling = viableNextSibling.nextSibling;
                if (!viableNextSibling) {
                    break;
                }
                idx = nodes.indexOf(viableNextSibling);
            }
            const node = convertNodesIntoNode(this._ownerDocument, nodes);
            if (this.parentNode === parent) {
                parent._replace(node, this);
            } else {
                parent._preInsert(node, viableNextSibling);
            }
        }
    }
}
module.exports = {
    implementation: ChildNodeImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/NonElementParentNode-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// https://dom.spec.whatwg.org/#interface-nonelementparentnode
// getElementById is implemented separately inside Document and DocumentFragment.
class NonElementParentNodeImpl {
}
module.exports = {
    implementation: NonElementParentNodeImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/DocumentFragment-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const NodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Node-impl.js [app-ssr] (ecmascript)").implementation;
const NonElementParentNodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/NonElementParentNode-impl.js [app-ssr] (ecmascript)").implementation;
const ParentNodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ParentNode-impl.js [app-ssr] (ecmascript)").implementation;
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
class DocumentFragmentImpl extends NodeImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, {
            ownerDocument: idlUtils.implForWrapper(globalObject._document),
            ...privateData
        });
        const { host } = privateData;
        this._host = host;
        this.nodeType = NODE_TYPE.DOCUMENT_FRAGMENT_NODE;
    }
    // This is implemented separately for Document (which has a _ids cache) and DocumentFragment (which does not).
    getElementById(id) {
        if (id === "") {
            return null;
        }
        for (const descendant of domSymbolTree.treeIterator(this)){
            if (descendant.nodeType === NODE_TYPE.ELEMENT_NODE && descendant.getAttributeNS(null, "id") === id) {
                return descendant;
            }
        }
        return null;
    }
}
mixin(DocumentFragmentImpl.prototype, NonElementParentNodeImpl.prototype);
mixin(DocumentFragmentImpl.prototype, ParentNodeImpl.prototype);
module.exports = {
    implementation: DocumentFragmentImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/DocumentType-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const NodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Node-impl.js [app-ssr] (ecmascript)").implementation;
const ChildNodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ChildNode-impl.js [app-ssr] (ecmascript)").implementation;
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
class DocumentTypeImpl extends NodeImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this.nodeType = NODE_TYPE.DOCUMENT_TYPE_NODE;
        this.name = privateData.name;
        this.publicId = privateData.publicId;
        this.systemId = privateData.systemId;
    }
}
mixin(DocumentTypeImpl.prototype, ChildNodeImpl.prototype);
module.exports = {
    implementation: DocumentTypeImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Slotable-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { findSlot, assignSlot, assignSlotable } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/shadow-dom.js [app-ssr] (ecmascript)");
// https://dom.spec.whatwg.org/#mixin-slotable
// https://dom.spec.whatwg.org/#light-tree-slotables
class SlotableMixinImpl {
    _initSlotableMixin() {
        this._slotableName = "";
    }
    _attrModifiedSlotableMixin(name, value, oldValue) {
        if (name === "slot") {
            if (value === oldValue) {
                return;
            }
            if (value === null && oldValue === "") {
                return;
            }
            if (value === "" && oldValue === null) {
                return;
            }
            if (value === null || value === "") {
                this._slotableName = "";
            } else {
                this._slotableName = value;
            }
            if (this._assignedSlot) {
                assignSlotable(this._assignedSlot);
            }
            assignSlot(this);
        }
    }
    get assignedSlot() {
        return findSlot(this, "open");
    }
}
module.exports = {
    implementation: SlotableMixinImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/NonDocumentTypeChildNode-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
class NonDocumentTypeChildNodeImpl {
    get nextElementSibling() {
        for (const sibling of domSymbolTree.nextSiblingsIterator(this)){
            if (sibling.nodeType === NODE_TYPE.ELEMENT_NODE) {
                return sibling;
            }
        }
        return null;
    }
    get previousElementSibling() {
        for (const sibling of domSymbolTree.previousSiblingsIterator(this)){
            if (sibling.nodeType === NODE_TYPE.ELEMENT_NODE) {
                return sibling;
            }
        }
        return null;
    }
}
module.exports = {
    implementation: NonDocumentTypeChildNodeImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/CharacterData-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const NodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Node-impl.js [app-ssr] (ecmascript)").implementation;
const ChildNodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ChildNode-impl.js [app-ssr] (ecmascript)").implementation;
const NonDocumentTypeChildNodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/NonDocumentTypeChildNode-impl.js [app-ssr] (ecmascript)").implementation;
const { TEXT_NODE } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { MUTATION_TYPE, queueMutationRecord } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/mutation-observers.js [app-ssr] (ecmascript)");
// https://dom.spec.whatwg.org/#characterdata
class CharacterDataImpl extends NodeImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._data = privateData.data;
    }
    // https://dom.spec.whatwg.org/#dom-characterdata-data
    get data() {
        return this._data;
    }
    set data(data) {
        this.replaceData(0, this.length, data);
    }
    // https://dom.spec.whatwg.org/#dom-characterdata-length
    get length() {
        return this._data.length;
    }
    // https://dom.spec.whatwg.org/#dom-characterdata-substringdata
    // https://dom.spec.whatwg.org/#concept-cd-substring
    substringData(offset, count) {
        const { length } = this;
        if (offset > length) {
            throw DOMException.create(this._globalObject, [
                "The index is not in the allowed range.",
                "IndexSizeError"
            ]);
        }
        if (offset + count > length) {
            return this._data.slice(offset);
        }
        return this._data.slice(offset, offset + count);
    }
    // https://dom.spec.whatwg.org/#dom-characterdata-appenddata
    appendData(data) {
        this.replaceData(this.length, 0, data);
    }
    // https://dom.spec.whatwg.org/#dom-characterdata-insertdata
    insertData(offset, data) {
        this.replaceData(offset, 0, data);
    }
    // https://dom.spec.whatwg.org/#dom-characterdata-deletedata
    deleteData(offset, count) {
        this.replaceData(offset, count, "");
    }
    // https://dom.spec.whatwg.org/#dom-characterdata-replacedata
    // https://dom.spec.whatwg.org/#concept-cd-replace
    replaceData(offset, count, data) {
        const { length } = this;
        if (offset > length) {
            throw DOMException.create(this._globalObject, [
                "The index is not in the allowed range.",
                "IndexSizeError"
            ]);
        }
        if (offset + count > length) {
            count = length - offset;
        }
        queueMutationRecord(MUTATION_TYPE.CHARACTER_DATA, this, null, null, this._data, [], [], null, null);
        const start = this._data.slice(0, offset);
        const end = this._data.slice(offset + count);
        this._data = start + data + end;
        for (const range of this._referencedRanges){
            const { _start, _end } = range;
            if (_start.node === this && _start.offset > offset && _start.offset <= offset + count) {
                range._setLiveRangeStart(this, offset);
            }
            if (_end.node === this && _end.offset > offset && _end.offset <= offset + count) {
                range._setLiveRangeEnd(this, offset);
            }
            if (_start.node === this && _start.offset > offset + count) {
                range._setLiveRangeStart(this, _start.offset + data.length - count);
            }
            if (_end.node === this && _end.offset > offset + count) {
                range._setLiveRangeEnd(this, _end.offset + data.length - count);
            }
        }
        if (this.nodeType === TEXT_NODE && this.parentNode) {
            this.parentNode._childTextContentChangeSteps();
        }
    }
}
mixin(CharacterDataImpl.prototype, NonDocumentTypeChildNodeImpl.prototype);
mixin(CharacterDataImpl.prototype, ChildNodeImpl.prototype);
module.exports = {
    implementation: CharacterDataImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Text-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SlotableMixinImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Slotable-impl.js [app-ssr] (ecmascript)").implementation;
const CharacterDataImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/CharacterData-impl.js [app-ssr] (ecmascript)").implementation;
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
// https://dom.spec.whatwg.org/#text
class TextImpl extends CharacterDataImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, {
            data: args[0],
            ownerDocument: idlUtils.implForWrapper(globalObject._document),
            ...privateData
        });
        this._initSlotableMixin();
        this.nodeType = NODE_TYPE.TEXT_NODE;
    }
    // https://dom.spec.whatwg.org/#dom-text-splittext
    // https://dom.spec.whatwg.org/#concept-text-split
    splitText(offset) {
        const { length } = this;
        if (offset > length) {
            throw DOMException.create(this._globalObject, [
                "The index is not in the allowed range.",
                "IndexSizeError"
            ]);
        }
        const count = length - offset;
        const newData = this.substringData(offset, count);
        const newNode = this._ownerDocument.createTextNode(newData);
        const parent = domSymbolTree.parent(this);
        if (parent !== null) {
            parent._insert(newNode, this.nextSibling);
            for (const range of this._referencedRanges){
                const { _start, _end } = range;
                if (_start.node === this && _start.offset > offset) {
                    range._setLiveRangeStart(newNode, _start.offset - offset);
                }
                if (_end.node === this && _end.offset > offset) {
                    range._setLiveRangeEnd(newNode, _end.offset - offset);
                }
            }
            const nodeIndex = domSymbolTree.index(this);
            for (const range of parent._referencedRanges){
                const { _start, _end } = range;
                if (_start.node === parent && _start.offset === nodeIndex + 1) {
                    range._setLiveRangeStart(parent, _start.offset + 1);
                }
                if (_end.node === parent && _end.offset === nodeIndex + 1) {
                    range._setLiveRangeEnd(parent, _end.offset + 1);
                }
            }
        }
        this.replaceData(offset, count, "");
        return newNode;
    }
    // https://dom.spec.whatwg.org/#dom-text-wholetext
    get wholeText() {
        let wholeText = this.textContent;
        let next;
        let current = this;
        while((next = domSymbolTree.previousSibling(current)) && next.nodeType === NODE_TYPE.TEXT_NODE){
            wholeText = next.textContent + wholeText;
            current = next;
        }
        current = this;
        while((next = domSymbolTree.nextSibling(current)) && next.nodeType === NODE_TYPE.TEXT_NODE){
            wholeText += next.textContent;
            current = next;
        }
        return wholeText;
    }
}
mixin(TextImpl.prototype, SlotableMixinImpl.prototype);
module.exports = {
    implementation: TextImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/CDATASection-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const TextImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Text-impl.js [app-ssr] (ecmascript)").implementation;
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
class CDATASectionImpl extends TextImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this.nodeType = NODE_TYPE.CDATA_SECTION_NODE;
    }
}
module.exports = {
    implementation: CDATASectionImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Comment-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const CharacterDataImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/CharacterData-impl.js [app-ssr] (ecmascript)").implementation;
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
class CommentImpl extends CharacterDataImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, {
            data: args[0],
            ownerDocument: idlUtils.implForWrapper(globalObject._document),
            ...privateData
        });
        this.nodeType = NODE_TYPE.COMMENT_NODE;
    }
}
module.exports = {
    implementation: CommentImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ProcessingInstruction-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const CharacterDataImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/CharacterData-impl.js [app-ssr] (ecmascript)").implementation;
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
class ProcessingInstructionImpl extends CharacterDataImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this.nodeType = NODE_TYPE.PROCESSING_INSTRUCTION_NODE;
        this._target = privateData.target;
    }
    get target() {
        return this._target;
    }
}
module.exports = {
    implementation: ProcessingInstructionImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/DOMTokenList-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const OrderedSet = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/ordered-set.js [app-ssr] (ecmascript)");
const { asciiLowercase } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { getAttributeValue, setAttributeValue, hasAttributeByName } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes.js [app-ssr] (ecmascript)");
function validateTokens(globalObject, ...tokens) {
    for (const token of tokens){
        if (token === "") {
            throw DOMException.create(globalObject, [
                "The token provided must not be empty.",
                "SyntaxError"
            ]);
        }
    }
    for (const token of tokens){
        if (/[\t\n\f\r ]/.test(token)) {
            throw DOMException.create(globalObject, [
                "The token provided contains HTML space characters, which are not valid in tokens.",
                "InvalidCharacterError"
            ]);
        }
    }
}
// https://dom.spec.whatwg.org/#domtokenlist
class DOMTokenListImpl {
    constructor(globalObject, args, privateData){
        this._globalObject = globalObject;
        // _syncWithElement() must always be called before any _tokenSet access.
        this._tokenSet = new OrderedSet();
        this._element = privateData.element;
        this._attributeLocalName = privateData.attributeLocalName;
        this._supportedTokens = privateData.supportedTokens;
        // Needs synchronization with element if token set is to be accessed.
        this._dirty = true;
    }
    attrModified() {
        this._dirty = true;
    }
    _syncWithElement() {
        if (!this._dirty) {
            return;
        }
        const val = getAttributeValue(this._element, this._attributeLocalName);
        if (val === null) {
            this._tokenSet.empty();
        } else {
            this._tokenSet = OrderedSet.parse(val);
        }
        this._dirty = false;
    }
    _validationSteps(token) {
        if (!this._supportedTokens) {
            throw new TypeError(`${this._attributeLocalName} attribute has no supported tokens`);
        }
        const lowerToken = asciiLowercase(token);
        return this._supportedTokens.has(lowerToken);
    }
    _updateSteps() {
        if (!hasAttributeByName(this._element, this._attributeLocalName) && this._tokenSet.isEmpty()) {
            return;
        }
        setAttributeValue(this._element, this._attributeLocalName, this._tokenSet.serialize());
    }
    _serializeSteps() {
        return getAttributeValue(this._element, this._attributeLocalName);
    }
    // Used by other parts of jsdom
    get tokenSet() {
        this._syncWithElement();
        return this._tokenSet;
    }
    get length() {
        this._syncWithElement();
        return this._tokenSet.size;
    }
    get [idlUtils.supportedPropertyIndices]() {
        this._syncWithElement();
        return this._tokenSet.keys();
    }
    item(index) {
        this._syncWithElement();
        if (index >= this._tokenSet.size) {
            return null;
        }
        return this._tokenSet.get(index);
    }
    contains(token) {
        this._syncWithElement();
        return this._tokenSet.contains(token);
    }
    add(...tokens) {
        for (const token of tokens){
            validateTokens(this._globalObject, token);
        }
        this._syncWithElement();
        for (const token of tokens){
            this._tokenSet.append(token);
        }
        this._updateSteps();
    }
    remove(...tokens) {
        for (const token of tokens){
            validateTokens(this._globalObject, token);
        }
        this._syncWithElement();
        this._tokenSet.remove(...tokens);
        this._updateSteps();
    }
    toggle(token, force = undefined) {
        validateTokens(this._globalObject, token);
        this._syncWithElement();
        if (this._tokenSet.contains(token)) {
            if (force === undefined || force === false) {
                this._tokenSet.remove(token);
                this._updateSteps();
                return false;
            }
            return true;
        }
        if (force === undefined || force === true) {
            this._tokenSet.append(token);
            this._updateSteps();
            return true;
        }
        return false;
    }
    replace(token, newToken) {
        validateTokens(this._globalObject, token, newToken);
        this._syncWithElement();
        if (!this._tokenSet.contains(token)) {
            return false;
        }
        this._tokenSet.replace(token, newToken);
        this._updateSteps();
        return true;
    }
    supports(token) {
        return this._validationSteps(token);
    }
    get value() {
        return this._serializeSteps();
    }
    set value(V) {
        setAttributeValue(this._element, this._attributeLocalName, V);
    }
}
exports.implementation = DOMTokenListImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/DocumentOrShadowRoot-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { nodeRoot } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/node.js [app-ssr] (ecmascript)");
const { retarget } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/shadow-dom.js [app-ssr] (ecmascript)");
class DocumentOrShadowRootImpl {
    get activeElement() {
        let candidate = this._ownerDocument._lastFocusedElement || this._ownerDocument.body;
        if (!candidate) {
            return null;
        }
        candidate = retarget(candidate, this);
        if (nodeRoot(candidate) !== this) {
            return null;
        }
        if (candidate.nodeType !== NODE_TYPE.DOCUMENT_NODE) {
            return candidate;
        }
        if (candidate.body !== null) {
            return candidate.body;
        }
        return candidate.documentElement;
    }
}
module.exports = {
    implementation: DocumentOrShadowRootImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ShadowRoot-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { nodeRoot } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/node.js [app-ssr] (ecmascript)");
const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const DocumentFragment = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/DocumentFragment-impl.js [app-ssr] (ecmascript)").implementation;
const DocumentOrShadowRootImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/DocumentOrShadowRoot-impl.js [app-ssr] (ecmascript)").implementation;
const InnerHTMLImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/domparsing/InnerHTML-impl.js [app-ssr] (ecmascript)").implementation;
class ShadowRootImpl extends DocumentFragment {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        const { mode } = privateData;
        this._mode = mode;
        this._availableToElementInternals = false;
    }
    _getTheParent(event) {
        if (!event.composed && this === nodeRoot(event._path[0].item)) {
            return null;
        }
        return this._host;
    }
    get mode() {
        return this._mode;
    }
    get host() {
        return this._host;
    }
}
mixin(ShadowRootImpl.prototype, DocumentOrShadowRootImpl.prototype);
mixin(ShadowRootImpl.prototype, InnerHTMLImpl.prototype);
module.exports = {
    implementation: ShadowRootImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Element-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { addNwsapi } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/selectors.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { mixin, memoizeQuery } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const NodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Node-impl.js [app-ssr] (ecmascript)").implementation;
const ParentNodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ParentNode-impl.js [app-ssr] (ecmascript)").implementation;
const ChildNodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ChildNode-impl.js [app-ssr] (ecmascript)").implementation;
const attributes = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes.js [app-ssr] (ecmascript)");
const namedPropertiesWindow = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/named-properties-window.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { parseFragment } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/parser/index.js [app-ssr] (ecmascript)");
const InnerHTMLImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/domparsing/InnerHTML-impl.js [app-ssr] (ecmascript)").implementation;
const { fragmentSerialization } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/domparsing/serialization.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const DOMTokenList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMTokenList.js [app-ssr] (ecmascript)");
const NamedNodeMap = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/NamedNodeMap.js [app-ssr] (ecmascript)");
const validateNames = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/validate-names.js [app-ssr] (ecmascript)");
const { asciiLowercase, asciiUppercase } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { listOfElementsWithQualifiedName, listOfElementsWithNamespaceAndLocalName, listOfElementsWithClassNames } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node.js [app-ssr] (ecmascript)");
const SlotableMixinImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Slotable-impl.js [app-ssr] (ecmascript)").implementation;
const NonDocumentTypeChildNode = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/NonDocumentTypeChildNode-impl.js [app-ssr] (ecmascript)").implementation;
const ShadowRoot = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ShadowRoot.js [app-ssr] (ecmascript)");
const Text = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Text.js [app-ssr] (ecmascript)");
const { isValidHostElementName } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/shadow-dom.js [app-ssr] (ecmascript)");
const { isValidCustomElementName, lookupCEDefinition } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/custom-elements.js [app-ssr] (ecmascript)");
function attachId(id, elm, doc) {
    if (id && elm && doc) {
        if (!doc._ids[id]) {
            doc._ids[id] = [];
        }
        doc._ids[id].push(elm);
    }
}
function detachId(id, elm, doc) {
    if (id && elm && doc) {
        if (doc._ids && doc._ids[id]) {
            const elms = doc._ids[id];
            for(let i = 0; i < elms.length; i++){
                if (elms[i] === elm) {
                    elms.splice(i, 1);
                    --i;
                }
            }
            if (elms.length === 0) {
                delete doc._ids[id];
            }
        }
    }
}
class ElementImpl extends NodeImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._initSlotableMixin();
        this._namespaceURI = privateData.namespace;
        this._prefix = privateData.prefix;
        this._localName = privateData.localName;
        this._ceState = privateData.ceState;
        this._ceDefinition = privateData.ceDefinition;
        this._isValue = privateData.isValue;
        this._shadowRoot = null;
        this._ceReactionQueue = [];
        this.nodeType = NODE_TYPE.ELEMENT_NODE;
        this.scrollTop = 0;
        this.scrollLeft = 0;
        this._attributeList = [];
        // Used for caching.
        this._attributesByNameMap = new Map();
        this._attributes = null;
        this._cachedTagName = null;
    }
    _attach() {
        namedPropertiesWindow.nodeAttachedToDocument(this);
        const id = this.getAttributeNS(null, "id");
        if (id) {
            attachId(id, this, this._ownerDocument);
        }
        // If the element is initially in an HTML document but is later
        // inserted in another type of document, the tagName should no
        // longer be uppercase. Therefore the cached tagName is reset.
        this._cachedTagName = null;
        super._attach();
    }
    _detach() {
        super._detach();
        namedPropertiesWindow.nodeDetachedFromDocument(this);
        const id = this.getAttributeNS(null, "id");
        if (id) {
            detachId(id, this, this._ownerDocument);
        }
    }
    _attrModified(name, value, oldValue) {
        this._modified();
        namedPropertiesWindow.elementAttributeModified(this, name, value, oldValue);
        if (name === "id" && this._attached) {
            const doc = this._ownerDocument;
            detachId(oldValue, this, doc);
            attachId(value, this, doc);
        }
        // update classList
        if (name === "class" && this._classList !== undefined) {
            this._classList.attrModified();
        }
        this._attrModifiedSlotableMixin(name, value, oldValue);
    }
    get namespaceURI() {
        return this._namespaceURI;
    }
    get prefix() {
        return this._prefix;
    }
    get localName() {
        return this._localName;
    }
    get _qualifiedName() {
        return this._prefix !== null ? this._prefix + ":" + this._localName : this._localName;
    }
    get tagName() {
        // This getter can be a hotpath in getComputedStyle.
        // All these are invariants during the instance lifetime so we can safely cache the computed tagName.
        // We could create it during construction but since we already identified this as potentially slow we do it lazily.
        if (this._cachedTagName === null) {
            if (this._namespaceURI === HTML_NS && this._ownerDocument._parsingMode === "html") {
                this._cachedTagName = asciiUppercase(this._qualifiedName);
            } else {
                this._cachedTagName = this._qualifiedName;
            }
        }
        return this._cachedTagName;
    }
    get attributes() {
        if (!this._attributes) {
            this._attributes = NamedNodeMap.createImpl(this._globalObject, [], {
                element: this
            });
        }
        return this._attributes;
    }
    // https://w3c.github.io/DOM-Parsing/#dom-element-outerhtml
    get outerHTML() {
        return fragmentSerialization(this, {
            outer: true,
            requireWellFormed: true,
            globalObject: this._globalObject
        });
    }
    set outerHTML(markup) {
        let parent = domSymbolTree.parent(this);
        const document = this._ownerDocument;
        if (!parent) {
            return;
        }
        if (parent.nodeType === NODE_TYPE.DOCUMENT_NODE) {
            throw DOMException.create(this._globalObject, [
                "Modifications are not allowed for this document",
                "NoModificationAllowedError"
            ]);
        }
        if (parent.nodeType === NODE_TYPE.DOCUMENT_FRAGMENT_NODE) {
            parent = document.createElementNS(HTML_NS, "body");
        }
        const fragment = parseFragment(markup, parent);
        const contextObjectParent = domSymbolTree.parent(this);
        contextObjectParent._replace(fragment, this);
    }
    get classList() {
        if (this._classList === undefined) {
            this._classList = DOMTokenList.createImpl(this._globalObject, [], {
                element: this,
                attributeLocalName: "class"
            });
        }
        return this._classList;
    }
    hasAttributes() {
        return attributes.hasAttributes(this);
    }
    getAttributeNames() {
        return attributes.attributeNames(this);
    }
    getAttribute(name) {
        const attr = attributes.getAttributeByName(this, name);
        if (!attr) {
            return null;
        }
        return attr._value;
    }
    getAttributeNS(namespace, localName) {
        const attr = attributes.getAttributeByNameNS(this, namespace, localName);
        if (!attr) {
            return null;
        }
        return attr._value;
    }
    setAttribute(name, value) {
        validateNames.name(this._globalObject, name);
        if (this._namespaceURI === HTML_NS && this._ownerDocument._parsingMode === "html") {
            name = asciiLowercase(name);
        }
        const attribute = attributes.getAttributeByName(this, name);
        if (attribute === null) {
            const newAttr = this._ownerDocument._createAttribute({
                localName: name,
                value
            });
            attributes.appendAttribute(this, newAttr);
            return;
        }
        attributes.changeAttribute(this, attribute, value);
    }
    setAttributeNS(namespace, name, value) {
        const extracted = validateNames.validateAndExtract(this._globalObject, namespace, name);
        // Because of widespread use of this method internally, e.g. to manually implement attribute/content reflection, we
        // centralize the conversion to a string here, so that all call sites don't have to do it.
        value = `${value}`;
        attributes.setAttributeValue(this, extracted.localName, value, extracted.prefix, extracted.namespace);
    }
    removeAttribute(name) {
        attributes.removeAttributeByName(this, name);
    }
    removeAttributeNS(namespace, localName) {
        attributes.removeAttributeByNameNS(this, namespace, localName);
    }
    toggleAttribute(qualifiedName, force) {
        validateNames.name(this._globalObject, qualifiedName);
        if (this._namespaceURI === HTML_NS && this._ownerDocument._parsingMode === "html") {
            qualifiedName = asciiLowercase(qualifiedName);
        }
        const attribute = attributes.getAttributeByName(this, qualifiedName);
        if (attribute === null) {
            if (force === undefined || force === true) {
                const newAttr = this._ownerDocument._createAttribute({
                    localName: qualifiedName,
                    value: ""
                });
                attributes.appendAttribute(this, newAttr);
                return true;
            }
            return false;
        }
        if (force === undefined || force === false) {
            attributes.removeAttributeByName(this, qualifiedName);
            return false;
        }
        return true;
    }
    hasAttribute(name) {
        if (this._namespaceURI === HTML_NS && this._ownerDocument._parsingMode === "html") {
            name = asciiLowercase(name);
        }
        return attributes.hasAttributeByName(this, name);
    }
    hasAttributeNS(namespace, localName) {
        if (namespace === "") {
            namespace = null;
        }
        return attributes.hasAttributeByNameNS(this, namespace, localName);
    }
    getAttributeNode(name) {
        return attributes.getAttributeByName(this, name);
    }
    getAttributeNodeNS(namespace, localName) {
        return attributes.getAttributeByNameNS(this, namespace, localName);
    }
    setAttributeNode(attr) {
        // eslint-disable-next-line no-restricted-properties
        return attributes.setAttribute(this, attr);
    }
    setAttributeNodeNS(attr) {
        // eslint-disable-next-line no-restricted-properties
        return attributes.setAttribute(this, attr);
    }
    removeAttributeNode(attr) {
        // eslint-disable-next-line no-restricted-properties
        if (!attributes.hasAttribute(this, attr)) {
            throw DOMException.create(this._globalObject, [
                "Tried to remove an attribute that was not present",
                "NotFoundError"
            ]);
        }
        // eslint-disable-next-line no-restricted-properties
        attributes.removeAttribute(this, attr);
        return attr;
    }
    getBoundingClientRect() {
        return {
            x: 0,
            y: 0,
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0
        };
    }
    getClientRects() {
        return [];
    }
    get scrollWidth() {
        return 0;
    }
    get scrollHeight() {
        return 0;
    }
    get clientTop() {
        return 0;
    }
    get clientLeft() {
        return 0;
    }
    get clientWidth() {
        return 0;
    }
    get clientHeight() {
        return 0;
    }
    // https://dom.spec.whatwg.org/#dom-element-attachshadow
    attachShadow(init) {
        const { _ownerDocument, _namespaceURI, _localName, _isValue } = this;
        if (this.namespaceURI !== HTML_NS) {
            throw DOMException.create(this._globalObject, [
                "This element does not support attachShadow. This element is not part of the HTML namespace.",
                "NotSupportedError"
            ]);
        }
        if (!isValidHostElementName(_localName) && !isValidCustomElementName(_localName)) {
            const message = "This element does not support attachShadow. This element is not a custom element nor " + "a standard element supporting a shadow root.";
            throw DOMException.create(this._globalObject, [
                message,
                "NotSupportedError"
            ]);
        }
        if (isValidCustomElementName(_localName) || _isValue) {
            const definition = lookupCEDefinition(_ownerDocument, _namespaceURI, _localName, _isValue);
            if (definition && definition.disableShadow) {
                throw DOMException.create(this._globalObject, [
                    "Shadow root cannot be create on a custom element with disabled shadow",
                    "NotSupportedError"
                ]);
            }
        }
        if (this._shadowRoot !== null) {
            throw DOMException.create(this._globalObject, [
                "Shadow root cannot be created on a host which already hosts a shadow tree.",
                "NotSupportedError"
            ]);
        }
        const shadow = ShadowRoot.createImpl(this._globalObject, [], {
            ownerDocument: this.ownerDocument,
            mode: init.mode,
            host: this
        });
        if (this._ceState === "precustomized" || this._ceState === "custom") {
            shadow._availableToElementInternals = true;
        }
        this._shadowRoot = shadow;
        return shadow;
    }
    // https://dom.spec.whatwg.org/#dom-element-shadowroot
    get shadowRoot() {
        const shadow = this._shadowRoot;
        if (shadow === null || shadow.mode === "closed") {
            return null;
        }
        return shadow;
    }
    // https://dom.spec.whatwg.org/#insert-adjacent
    _insertAdjacent(element, where, node) {
        where = asciiLowercase(where);
        if (where === "beforebegin") {
            if (element.parentNode === null) {
                return null;
            }
            return element.parentNode._preInsert(node, element);
        }
        if (where === "afterbegin") {
            return element._preInsert(node, element.firstChild);
        }
        if (where === "beforeend") {
            return element._preInsert(node, null);
        }
        if (where === "afterend") {
            if (element.parentNode === null) {
                return null;
            }
            return element.parentNode._preInsert(node, element.nextSibling);
        }
        throw DOMException.create(this._globalObject, [
            'Must provide one of "beforebegin", "afterbegin", "beforeend", or "afterend".',
            "SyntaxError"
        ]);
    }
    insertAdjacentElement(where, element) {
        return this._insertAdjacent(this, where, element);
    }
    insertAdjacentText(where, data) {
        const text = Text.createImpl(this._globalObject, [], {
            data,
            ownerDocument: this._ownerDocument
        });
        this._insertAdjacent(this, where, text);
    }
    // https://w3c.github.io/DOM-Parsing/#dom-element-insertadjacenthtml
    insertAdjacentHTML(position, text) {
        position = asciiLowercase(position);
        let context;
        switch(position){
            case "beforebegin":
            case "afterend":
                {
                    context = this.parentNode;
                    if (context === null || context.nodeType === NODE_TYPE.DOCUMENT_NODE) {
                        throw DOMException.create(this._globalObject, [
                            "Cannot insert HTML adjacent to parent-less nodes or children of document nodes.",
                            "NoModificationAllowedError"
                        ]);
                    }
                    break;
                }
            case "afterbegin":
            case "beforeend":
                {
                    context = this;
                    break;
                }
            default:
                {
                    throw DOMException.create(this._globalObject, [
                        'Must provide one of "beforebegin", "afterbegin", "beforeend", or "afterend".',
                        "SyntaxError"
                    ]);
                }
        }
        if (context.nodeType !== NODE_TYPE.ELEMENT_NODE || context._ownerDocument._parsingMode === "html" && context._localName === "html" && context._namespaceURI === HTML_NS) {
            context = context._ownerDocument.createElement("body");
        }
        const fragment = parseFragment(text, context);
        switch(position){
            case "beforebegin":
                {
                    this.parentNode._insert(fragment, this);
                    break;
                }
            case "afterbegin":
                {
                    this._insert(fragment, this.firstChild);
                    break;
                }
            case "beforeend":
                {
                    this._append(fragment);
                    break;
                }
            case "afterend":
                {
                    this.parentNode._insert(fragment, this.nextSibling);
                    break;
                }
        }
    }
    closest(selectors) {
        const matcher = addNwsapi(this);
        return matcher.closest(selectors, idlUtils.wrapperForImpl(this));
    }
    // https://html.spec.whatwg.org/#reflecting-content-attributes-in-idl-attributes
    _reflectGetTheElement() {
        return this;
    }
    _reflectGetTheContentAttribute(reflectedContentAttributeName) {
        return this.getAttributeNS(null, reflectedContentAttributeName);
    }
    _reflectSetTheContentAttribute(reflectedContentAttributeName, value) {
        this.setAttributeNS(null, reflectedContentAttributeName, value);
    }
    _reflectDeleteTheContentAttribute(reflectedContentAttributeName) {
        this.removeAttributeNS(null, reflectedContentAttributeName);
    }
}
mixin(ElementImpl.prototype, NonDocumentTypeChildNode.prototype);
mixin(ElementImpl.prototype, ParentNodeImpl.prototype);
mixin(ElementImpl.prototype, ChildNodeImpl.prototype);
mixin(ElementImpl.prototype, SlotableMixinImpl.prototype);
mixin(ElementImpl.prototype, InnerHTMLImpl.prototype);
ElementImpl.prototype.getElementsByTagName = memoizeQuery(function(qualifiedName) {
    return listOfElementsWithQualifiedName(qualifiedName, this);
});
ElementImpl.prototype.getElementsByTagNameNS = memoizeQuery(function(namespace, localName) {
    return listOfElementsWithNamespaceAndLocalName(namespace, localName, this);
});
ElementImpl.prototype.getElementsByClassName = memoizeQuery(function(classNames) {
    return listOfElementsWithClassNames(classNames, this);
});
ElementImpl.prototype.matches = function(selectors) {
    const matcher = addNwsapi(this);
    return matcher.match(selectors, idlUtils.wrapperForImpl(this));
};
ElementImpl.prototype.webkitMatchesSelector = ElementImpl.prototype.matches;
module.exports = {
    implementation: ElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/GlobalEventHandlers-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { appendHandler, createEventAccessor } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-event-accessor.js [app-ssr] (ecmascript)");
// Must be kept in sync with GlobalEventHandlers.webidl.
const events = new Set([
    "abort",
    "auxclick",
    "beforeinput",
    "beforematch",
    "beforetoggle",
    "blur",
    "cancel",
    "canplay",
    "canplaythrough",
    "change",
    "click",
    "close",
    "contextlost",
    "contextmenu",
    "contextrestored",
    "copy",
    "cuechange",
    "cut",
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
    "error",
    "focus",
    "formdata",
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
    "paste",
    "pause",
    "play",
    "playing",
    "progress",
    "ratechange",
    "reset",
    "resize",
    "scroll",
    "scrollend",
    "securitypolicyviolation",
    "seeked",
    "seeking",
    "select",
    "slotchange",
    "stalled",
    "submit",
    "suspend",
    "timeupdate",
    "toggle",
    "volumechange",
    "waiting",
    "webkitanimationend",
    "webkitanimationiteration",
    "webkitanimationstart",
    "webkittransitionend",
    "wheel",
    "touchstart",
    "touchend",
    "touchmove",
    "touchcancel"
]);
class GlobalEventHandlersImpl {
    _initGlobalEvents() {
        this._registeredHandlers = new Set();
        this._eventHandlers = Object.create(null);
    }
    _getEventHandlerTarget() {
        return this;
    }
    _getEventHandlerFor(event) {
        const target = this._getEventHandlerTarget(event);
        if (!target) {
            return null;
        }
        return target._eventHandlers[event];
    }
    _setEventHandlerFor(event, handler) {
        const target = this._getEventHandlerTarget(event);
        if (!target) {
            return;
        }
        if (!target._registeredHandlers.has(event) && handler !== null) {
            target._registeredHandlers.add(event);
            appendHandler(target, event);
        }
        target._eventHandlers[event] = handler;
    }
    _globalEventChanged(event) {
        const propName = "on" + event;
        if (!(propName in this)) {
            return;
        }
        // Only translate attribute changes into properties when runScripts: "dangerously" is set.
        // Documents without a browsing context (i.e. without a _defaultView) never run scripts.
        const runScripts = "_runScripts" in this ? this._runScripts : (this._ownerDocument._defaultView || {})._runScripts;
        if (runScripts !== "dangerously") {
            return;
        }
        const val = this.getAttributeNS(null, propName);
        const handler = val === null ? null : {
            body: val
        };
        this._setEventHandlerFor(event, handler);
    }
}
for (const event of events){
    createEventAccessor(GlobalEventHandlersImpl.prototype, event);
}
module.exports = {
    implementation: GlobalEventHandlersImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Document-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { CookieJar } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/index.js [app-ssr] (ecmascript)");
const NodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Node-impl.js [app-ssr] (ecmascript)").implementation;
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { mixin, memoizeQuery } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const { firstChildWithLocalName, firstChildWithLocalNames, firstDescendantWithLocalName } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
const whatwgURL = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const StyleSheetList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/StyleSheetList.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const eventAccessors = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-event-accessor.js [app-ssr] (ecmascript)");
const { asciiLowercase, stripAndCollapseASCIIWhitespace } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { childTextContent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/text.js [app-ssr] (ecmascript)");
const { HTML_NS, SVG_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { parseIntoDocument } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/parser/index.js [app-ssr] (ecmascript)");
const History = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/History.js [app-ssr] (ecmascript)");
const Location = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Location.js [app-ssr] (ecmascript)");
const HTMLCollection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLCollection.js [app-ssr] (ecmascript)");
const NodeList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/NodeList.js [app-ssr] (ecmascript)");
const validateName = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/validate-names.js [app-ssr] (ecmascript)").name;
const { validateAndExtract } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/validate-names.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const { shadowIncludingInclusiveDescendantsIterator } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/shadow-dom.js [app-ssr] (ecmascript)");
const { enqueueCECallbackReaction } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/custom-elements.js [app-ssr] (ecmascript)");
const { createElement, internalCreateElementNSSteps } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-element.js [app-ssr] (ecmascript)");
const IterableWeakSet = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/iterable-weak-set.js [app-ssr] (ecmascript)");
const DocumentOrShadowRootImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/DocumentOrShadowRoot-impl.js [app-ssr] (ecmascript)").implementation;
const GlobalEventHandlersImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/GlobalEventHandlers-impl.js [app-ssr] (ecmascript)").implementation;
const NonElementParentNodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/NonElementParentNode-impl.js [app-ssr] (ecmascript)").implementation;
const ParentNodeImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ParentNode-impl.js [app-ssr] (ecmascript)").implementation;
const { clone, listOfElementsWithQualifiedName, listOfElementsWithNamespaceAndLocalName, listOfElementsWithClassNames } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node.js [app-ssr] (ecmascript)");
const generatedAttr = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Attr.js [app-ssr] (ecmascript)");
const Comment = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Comment.js [app-ssr] (ecmascript)");
const ProcessingInstruction = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ProcessingInstruction.js [app-ssr] (ecmascript)");
const CDATASection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CDATASection.js [app-ssr] (ecmascript)");
const Text = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Text.js [app-ssr] (ecmascript)");
const DocumentFragment = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DocumentFragment.js [app-ssr] (ecmascript)");
const DOMImplementation = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMImplementation.js [app-ssr] (ecmascript)");
const TreeWalker = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/TreeWalker.js [app-ssr] (ecmascript)");
const NodeIterator = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/NodeIterator.js [app-ssr] (ecmascript)");
const ShadowRoot = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ShadowRoot.js [app-ssr] (ecmascript)");
const Range = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Range.js [app-ssr] (ecmascript)");
const documents = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/documents.js [app-ssr] (ecmascript)");
const CustomEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/CustomEvent.js [app-ssr] (ecmascript)");
const ErrorEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ErrorEvent.js [app-ssr] (ecmascript)");
const Event = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Event.js [app-ssr] (ecmascript)");
const FocusEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/FocusEvent.js [app-ssr] (ecmascript)");
const HashChangeEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HashChangeEvent.js [app-ssr] (ecmascript)");
const KeyboardEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/KeyboardEvent.js [app-ssr] (ecmascript)");
const MessageEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MessageEvent.js [app-ssr] (ecmascript)");
const MouseEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MouseEvent.js [app-ssr] (ecmascript)");
const PopStateEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/PopStateEvent.js [app-ssr] (ecmascript)");
const ProgressEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ProgressEvent.js [app-ssr] (ecmascript)");
const TouchEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/TouchEvent.js [app-ssr] (ecmascript)");
const UIEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/UIEvent.js [app-ssr] (ecmascript)");
const RequestManager = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/resources/request-manager.js [app-ssr] (ecmascript)");
const AsyncResourceQueue = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/resources/async-resource-queue.js [app-ssr] (ecmascript)");
const ResourceQueue = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/resources/resource-queue.js [app-ssr] (ecmascript)");
const PerDocumentResourceLoader = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/resources/per-document-resource-loader.js [app-ssr] (ecmascript)");
function clearChildNodes(node) {
    for(let child = domSymbolTree.firstChild(node); child; child = domSymbolTree.firstChild(node)){
        node.removeChild(child);
    }
}
function pad(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}
function toLastModifiedString(date) {
    return pad(date.getMonth() + 1) + "/" + pad(date.getDate()) + "/" + date.getFullYear() + " " + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds());
}
const eventInterfaceTable = {
    customevent: CustomEvent,
    errorevent: ErrorEvent,
    event: Event,
    events: Event,
    focusevent: FocusEvent,
    hashchangeevent: HashChangeEvent,
    htmlevents: Event,
    keyboardevent: KeyboardEvent,
    messageevent: MessageEvent,
    mouseevent: MouseEvent,
    mouseevents: MouseEvent,
    popstateevent: PopStateEvent,
    progressevent: ProgressEvent,
    svgevents: Event,
    touchevent: TouchEvent,
    uievent: UIEvent,
    uievents: UIEvent
};
class DocumentImpl extends NodeImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._initGlobalEvents();
        this._ownerDocument = this;
        this.nodeType = NODE_TYPE.DOCUMENT_NODE;
        if (!privateData.options) {
            privateData.options = {};
        }
        if (!privateData.options.parsingMode) {
            privateData.options.parsingMode = "xml";
        }
        if (!privateData.options.encoding) {
            privateData.options.encoding = "UTF-8";
        }
        if (!privateData.options.contentType) {
            privateData.options.contentType = privateData.options.parsingMode === "xml" ? "application/xml" : "text/html";
        }
        this._parsingMode = privateData.options.parsingMode;
        this._implementation = DOMImplementation.createImpl(this._globalObject, [], {
            ownerDocument: this
        });
        this._defaultView = privateData.options.defaultView || null;
        this._global = privateData.options.global;
        this._ids = Object.create(null);
        this._attached = true;
        this._currentScript = null;
        this._pageShowingFlag = false;
        this._cookieJar = privateData.options.cookieJar;
        this._parseOptions = privateData.options.parseOptions || {};
        this._scriptingDisabled = privateData.options.scriptingDisabled;
        if (this._cookieJar === undefined) {
            this._cookieJar = new CookieJar(null, {
                looseMode: true
            });
        }
        if (this._scriptingDisabled) {
            this._parseOptions.scriptingEnabled = false;
        }
        this.contentType = privateData.options.contentType;
        this._encoding = privateData.options.encoding;
        const urlOption = privateData.options.url === undefined ? "about:blank" : privateData.options.url;
        const parsed = whatwgURL.parseURL(urlOption);
        if (parsed === null) {
            throw new TypeError(`Could not parse "${urlOption}" as a URL`);
        }
        this._URL = parsed;
        this._origin = urlOption === "about:blank" && privateData.options.parentOrigin ? privateData.options.parentOrigin : whatwgURL.serializeURLOrigin(this._URL);
        this._location = Location.createImpl(this._globalObject, [], {
            relevantDocument: this
        });
        this._history = History.createImpl(this._globalObject, [], {
            window: this._defaultView,
            document: this,
            actAsIfLocationReloadCalled: ()=>this._location.reload()
        });
        this._workingNodeIterators = new IterableWeakSet();
        this._referrer = privateData.options.referrer || "";
        this._lastModified = toLastModifiedString(privateData.options.lastModified || new Date());
        this._asyncQueue = new AsyncResourceQueue();
        this._queue = new ResourceQueue({
            asyncQueue: this._asyncQueue,
            paused: false
        });
        this._deferQueue = new ResourceQueue({
            paused: true
        });
        this._requestManager = new RequestManager();
        this._currentDocumentReadiness = privateData.options.readyState || "loading";
        this._lastFocusedElement = null;
        this._resourceLoader = new PerDocumentResourceLoader(this);
        // Each Document in a browsing context can also have a latest entry. This is the entry for that Document
        // to which the browsing context's session history was most recently traversed. When a Document is created,
        // it initially has no latest entry.
        this._latestEntry = null;
        // https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#throw-on-dynamic-markup-insertion-counter
        this._throwOnDynamicMarkupInsertionCounter = 0;
        // Cache of computed element styles
        this._styleCache = null;
        // Cache of document base URL
        this._baseURLCache = null;
        this._baseURLSerializedCache = null;
    }
    _clearBaseURLCache() {
        this._baseURLCache = null;
        this._baseURLSerializedCache = null;
    }
    // https://html.spec.whatwg.org/multipage/infrastructure.html#document-base-url
    baseURL() {
        if (this._baseURLCache) {
            return this._baseURLCache;
        }
        const firstBase = this.querySelector("base[href]");
        this._baseURLCache = firstBase === null ? this._fallbackBaseURL() : this._frozenBaseURL(firstBase, this._fallbackBaseURL());
        return this._baseURLCache;
    }
    baseURLSerialized() {
        if (this._baseURLSerializedCache) {
            return this._baseURLSerializedCache;
        }
        const result = whatwgURL.serializeURL(this.baseURL());
        this._baseURLSerializedCache = result;
        return result;
    }
    // https://html.spec.whatwg.org/#resolve-a-url
    encodingParseAURL(url) {
        // TODO account for encoding (once whatwg-url supports that)
        return whatwgURL.parseURL(url, {
            baseURL: this.baseURL()
        });
    }
    // https://html.spec.whatwg.org/#frozen-base-url
    _frozenBaseURL(baseElement, fallbackBaseURL) {
        // The spec is eager (setting the frozen base URL when things change); we are lazy (getting it when we need to).
        //
        // There is a slight difference, which is when history.pushState() is involved. The frozen base URL does not get
        // updated in response to history.pushState() per spec, but since we're lazy, it will get updated.
        //
        // The test in to-port-to-wpts/history.js checks for the current jsdom behavior (which is incorrect).
        // We could make it pass by not invalidating the base URL cache, actually. But that would just make the fallback
        // base URL case use the stale base URL.
        //
        // TODO: implement, with tests for all code paths, the spec's behavior.
        const baseHrefAttribute = baseElement.getAttributeNS(null, "href");
        const result = whatwgURL.parseURL(baseHrefAttribute, {
            baseURL: fallbackBaseURL
        });
        return result === null ? fallbackBaseURL : result;
    }
    // https://html.spec.whatwg.org/#fallback-base-url
    _fallbackBaseURL() {
        if (this.URL === "about:blank" && this._defaultView && this._defaultView._parent !== this._defaultView) {
            const parentDocument = idlUtils.implForWrapper(this._defaultView._parent._document);
            return parentDocument.baseURL();
        }
        return this._URL;
    }
    _getTheParent(event) {
        if (event.type === "load" || !this._defaultView) {
            return null;
        }
        return idlUtils.implForWrapper(this._defaultView);
    }
    get compatMode() {
        return this._parsingMode === "xml" || this.doctype ? "CSS1Compat" : "BackCompat";
    }
    get charset() {
        return this._encoding;
    }
    get characterSet() {
        return this._encoding;
    }
    get inputEncoding() {
        return this._encoding;
    }
    get doctype() {
        for (const childNode of domSymbolTree.childrenIterator(this)){
            if (childNode.nodeType === NODE_TYPE.DOCUMENT_TYPE_NODE) {
                return childNode;
            }
        }
        return null;
    }
    get URL() {
        return whatwgURL.serializeURL(this._URL);
    }
    get documentURI() {
        return whatwgURL.serializeURL(this._URL);
    }
    get location() {
        return this._defaultView ? this._location : null;
    }
    // https://dom.spec.whatwg.org/#dom-document-documentelement
    get documentElement() {
        for (const childNode of domSymbolTree.childrenIterator(this)){
            if (childNode.nodeType === NODE_TYPE.ELEMENT_NODE) {
                return childNode;
            }
        }
        return null;
    }
    get implementation() {
        return this._implementation;
    }
    set implementation(implementation) {
        this._implementation = implementation;
    }
    get defaultView() {
        return this._defaultView;
    }
    get currentScript() {
        return this._currentScript;
    }
    get readyState() {
        return this._currentDocumentReadiness;
    }
    set readyState(state) {
        this._currentDocumentReadiness = state;
        fireAnEvent("readystatechange", this);
    }
    hasFocus() {
        return Boolean(this._lastFocusedElement);
    }
    _descendantRemoved(parent, child) {
        if (child.tagName === "STYLE") {
            this.styleSheets._remove(child.sheet);
        }
        super._descendantRemoved(parent, child);
    }
    write(...args) {
        let text = "";
        for(let i = 0; i < args.length; ++i){
            text += args[i];
        }
        if (this._parsingMode === "xml") {
            throw DOMException.create(this._globalObject, [
                "Cannot use document.write on XML documents",
                "InvalidStateError"
            ]);
        }
        if (this._throwOnDynamicMarkupInsertionCounter > 0) {
            throw DOMException.create(this._globalObject, [
                "Cannot use document.write while a custom element upgrades",
                "InvalidStateError"
            ]);
        }
        if (this._writeAfterElement) {
            // If called from an script element directly (during the first tick),
            // the new elements are inserted right after that element.
            const tempDiv = this.createElement("div");
            tempDiv.innerHTML = text;
            let child = tempDiv.firstChild;
            let previous = this._writeAfterElement;
            const parent = this._writeAfterElement.parentNode;
            while(child){
                const node = child;
                child = child.nextSibling;
                node._isMovingDueToDocumentWrite = true; // hack for script execution
                parent.insertBefore(node, previous.nextSibling);
                node._isMovingDueToDocumentWrite = false;
                previous = node;
            }
        } else if (this.readyState === "loading") {
            // During page loading, document.write appends to the current element
            // Find the last child that has been added to the document.
            if (this.lastChild) {
                let node = this;
                while(node.lastChild && node.lastChild.nodeType === NODE_TYPE.ELEMENT_NODE){
                    node = node.lastChild;
                }
                node.innerHTML = text;
            } else {
                clearChildNodes(this);
                parseIntoDocument(text, this);
            }
        } else if (text) {
            clearChildNodes(this);
            parseIntoDocument(text, this);
        }
    }
    writeln(...args) {
        this.write(...args, "\n");
    }
    // This is implemented separately for Document (which has a _ids cache) and DocumentFragment (which does not).
    getElementById(id) {
        if (!this._ids[id]) {
            return null;
        }
        // Let's find the first element with where it's root is the document.
        const matchElement = this._ids[id].find((candidate)=>{
            let root = candidate;
            while(domSymbolTree.parent(root)){
                root = domSymbolTree.parent(root);
            }
            return root === this;
        });
        return matchElement || null;
    }
    get referrer() {
        return this._referrer || "";
    }
    get lastModified() {
        return this._lastModified;
    }
    get images() {
        return this.getElementsByTagName("IMG");
    }
    get embeds() {
        return this.getElementsByTagName("EMBED");
    }
    get plugins() {
        return this.embeds;
    }
    get links() {
        return HTMLCollection.createImpl(this._globalObject, [], {
            element: this,
            query: ()=>domSymbolTree.treeToArray(this, {
                    filter: (node)=>(node._localName === "a" || node._localName === "area") && node.hasAttributeNS(null, "href") && node._namespaceURI === HTML_NS
                })
        });
    }
    get forms() {
        return this.getElementsByTagName("FORM");
    }
    get scripts() {
        return this.getElementsByTagName("SCRIPT");
    }
    get anchors() {
        return HTMLCollection.createImpl(this._globalObject, [], {
            element: this,
            query: ()=>domSymbolTree.treeToArray(this, {
                    filter: (node)=>node._localName === "a" && node.hasAttributeNS(null, "name") && node._namespaceURI === HTML_NS
                })
        });
    }
    // The applets attribute must return an
    // HTMLCollection rooted at the Document node,
    // whose filter matches nothing.
    // (It exists for historical reasons.)
    get applets() {
        return HTMLCollection.createImpl(this._globalObject, [], {
            element: this,
            query: ()=>[]
        });
    }
    open() {
        let child = domSymbolTree.firstChild(this);
        while(child){
            this.removeChild(child);
            child = domSymbolTree.firstChild(this);
        }
        this._modified();
        return this;
    }
    close(noQueue) {
        // In some cases like when creating an empty iframe, I want to emit the
        // events right away to avoid problems if later I asign the property src.
        if (noQueue) {
            this.readyState = "complete";
            fireAnEvent("DOMContentLoaded", this, undefined, {
                bubbles: true
            });
            fireAnEvent("load", this);
            return;
        }
        this._queue.resume();
        const dummyPromise = Promise.resolve();
        const onDOMContentLoad = ()=>{
            const doc = this;
            function dispatchEvent() {
                // https://html.spec.whatwg.org/#the-end
                doc.readyState = "interactive";
                fireAnEvent("DOMContentLoaded", doc, undefined, {
                    bubbles: true
                });
            }
            return new Promise((resolve)=>{
                if (!this._deferQueue.tail) {
                    dispatchEvent();
                    resolve();
                    return;
                }
                this._deferQueue.setListener(()=>{
                    dispatchEvent();
                    resolve();
                });
                this._deferQueue.resume();
            });
        };
        const onLoad = ()=>{
            const doc = this;
            function dispatchEvent() {
                doc.readyState = "complete";
                fireAnEvent("load", doc);
            }
            return new Promise((resolve)=>{
                if (this._asyncQueue.count() === 0) {
                    dispatchEvent();
                    resolve();
                    return;
                }
                this._asyncQueue.setListener(()=>{
                    dispatchEvent();
                    resolve();
                });
            });
        };
        this._queue.push(dummyPromise, onDOMContentLoad, null);
        // Set the readyState to 'complete' once all resources are loaded.
        // As a side-effect the document's load-event will be dispatched.
        this._queue.push(dummyPromise, onLoad, null, true);
    }
    getElementsByName(elementName) {
        return NodeList.createImpl(this._globalObject, [], {
            element: this,
            query: ()=>domSymbolTree.treeToArray(this, {
                    filter: (node)=>node.getAttributeNS && node.getAttributeNS(null, "name") === elementName
                })
        });
    }
    get title() {
        const { documentElement } = this;
        let value = "";
        if (documentElement && documentElement._localName === "svg") {
            const svgTitleElement = firstChildWithLocalName(documentElement, "title", SVG_NS);
            if (svgTitleElement) {
                value = childTextContent(svgTitleElement);
            }
        } else {
            const titleElement = firstDescendantWithLocalName(this, "title");
            if (titleElement) {
                value = childTextContent(titleElement);
            }
        }
        value = stripAndCollapseASCIIWhitespace(value);
        return value;
    }
    set title(value) {
        const { documentElement } = this;
        let element;
        if (documentElement && documentElement._localName === "svg") {
            element = firstChildWithLocalName(documentElement, "title", SVG_NS);
            if (!element) {
                element = this.createElementNS(SVG_NS, "title");
                this._insert(element, documentElement.firstChild);
            }
            element.textContent = value;
        } else if (documentElement && documentElement._namespaceURI === HTML_NS) {
            const titleElement = firstDescendantWithLocalName(this, "title");
            const headElement = this.head;
            if (titleElement === null && headElement === null) {
                return;
            }
            if (titleElement !== null) {
                element = titleElement;
            } else {
                element = this.createElement("title");
                headElement._append(element);
            }
            element.textContent = value;
        }
    }
    get dir() {
        return this.documentElement ? this.documentElement.dir : "";
    }
    set dir(value) {
        if (this.documentElement) {
            this.documentElement.dir = value;
        }
    }
    get head() {
        return this.documentElement ? firstChildWithLocalName(this.documentElement, "head") : null;
    }
    get body() {
        const { documentElement } = this;
        if (!documentElement || documentElement._localName !== "html" || documentElement._namespaceURI !== HTML_NS) {
            return null;
        }
        return firstChildWithLocalNames(this.documentElement, new Set([
            "body",
            "frameset"
        ]));
    }
    set body(value) {
        if (value === null || value._namespaceURI !== HTML_NS || value._localName !== "body" && value._localName !== "frameset") {
            throw DOMException.create(this._globalObject, [
                "Cannot set the body to null or a non-body/frameset element",
                "HierarchyRequestError"
            ]);
        }
        const bodyElement = this.body;
        if (value === bodyElement) {
            return;
        }
        if (bodyElement !== null) {
            bodyElement.parentNode._replace(value, bodyElement);
            return;
        }
        const { documentElement } = this;
        if (documentElement === null) {
            throw DOMException.create(this._globalObject, [
                "Cannot set the body when there is no document element",
                "HierarchyRequestError"
            ]);
        }
        documentElement._append(value);
    }
    _runPreRemovingSteps(oldNode) {
        // https://html.spec.whatwg.org/#focus-fixup-rule
        if (oldNode === this.activeElement) {
            this._lastFocusedElement = this.body;
        }
        for (const activeNodeIterator of this._workingNodeIterators){
            activeNodeIterator._preRemovingSteps(oldNode);
        }
    }
    createEvent(type) {
        const typeLower = type.toLowerCase();
        const eventWrapper = eventInterfaceTable[typeLower] || null;
        if (!eventWrapper) {
            throw DOMException.create(this._globalObject, [
                "The provided event type (\"" + type + "\") is invalid",
                "NotSupportedError"
            ]);
        }
        const impl = eventWrapper.createImpl(this._globalObject, [
            ""
        ]);
        impl._initializedFlag = false;
        return impl;
    }
    createRange() {
        return Range.createImpl(this._globalObject, [], {
            start: {
                node: this,
                offset: 0
            },
            end: {
                node: this,
                offset: 0
            }
        });
    }
    createProcessingInstruction(target, data) {
        validateName(this._globalObject, target);
        if (data.includes("?>")) {
            throw DOMException.create(this._globalObject, [
                "Processing instruction data cannot contain the string \"?>\"",
                "InvalidCharacterError"
            ]);
        }
        return ProcessingInstruction.createImpl(this._globalObject, [], {
            ownerDocument: this,
            target,
            data
        });
    }
    // https://dom.spec.whatwg.org/#dom-document-createcdatasection
    createCDATASection(data) {
        if (this._parsingMode === "html") {
            throw DOMException.create(this._globalObject, [
                "Cannot create CDATA sections in HTML documents",
                "NotSupportedError"
            ]);
        }
        if (data.includes("]]>")) {
            throw DOMException.create(this._globalObject, [
                "CDATA section data cannot contain the string \"]]>\"",
                "InvalidCharacterError"
            ]);
        }
        return CDATASection.createImpl(this._globalObject, [], {
            ownerDocument: this,
            data
        });
    }
    createTextNode(data) {
        return Text.createImpl(this._globalObject, [], {
            ownerDocument: this,
            data
        });
    }
    createComment(data) {
        return Comment.createImpl(this._globalObject, [], {
            ownerDocument: this,
            data
        });
    }
    // https://dom.spec.whatwg.org/#dom-document-createelement
    createElement(localName, options) {
        validateName(this._globalObject, localName);
        if (this._parsingMode === "html") {
            localName = asciiLowercase(localName);
        }
        let isValue = null;
        if (options && options.is !== undefined) {
            isValue = options.is;
        }
        const namespace = this._parsingMode === "html" || this.contentType === "application/xhtml+xml" ? HTML_NS : null;
        return createElement(this, localName, namespace, null, isValue, true);
    }
    // https://dom.spec.whatwg.org/#dom-document-createelementns
    createElementNS(namespace, qualifiedName, options) {
        return internalCreateElementNSSteps(this, namespace, qualifiedName, options);
    }
    createDocumentFragment() {
        return DocumentFragment.createImpl(this._globalObject, [], {
            ownerDocument: this
        });
    }
    createAttribute(localName) {
        validateName(this._globalObject, localName);
        if (this._parsingMode === "html") {
            localName = asciiLowercase(localName);
        }
        return this._createAttribute({
            localName
        });
    }
    createAttributeNS(namespace, name) {
        if (namespace === undefined) {
            namespace = null;
        }
        namespace = namespace !== null ? String(namespace) : namespace;
        const extracted = validateAndExtract(this._globalObject, namespace, name);
        return this._createAttribute({
            namespace: extracted.namespace,
            namespacePrefix: extracted.prefix,
            localName: extracted.localName
        });
    }
    // Using this helper function rather than directly calling generatedAttr.createImpl may be preferred in some files,
    // to avoid introducing a potentially cyclic dependency on generated/Attr.js.
    _createAttribute({ localName, value, namespace, namespacePrefix }) {
        return generatedAttr.createImpl(this._globalObject, [], {
            localName,
            value,
            namespace,
            namespacePrefix,
            ownerDocument: this
        });
    }
    createTreeWalker(root, whatToShow, filter) {
        return TreeWalker.createImpl(this._globalObject, [], {
            root,
            whatToShow,
            filter
        });
    }
    createNodeIterator(root, whatToShow, filter) {
        const nodeIterator = NodeIterator.createImpl(this._globalObject, [], {
            root,
            whatToShow,
            filter
        });
        this._workingNodeIterators.add(nodeIterator);
        return nodeIterator;
    }
    importNode(node, deep) {
        if (node.nodeType === NODE_TYPE.DOCUMENT_NODE) {
            throw DOMException.create(this._globalObject, [
                "Cannot import a document node",
                "NotSupportedError"
            ]);
        } else if (ShadowRoot.isImpl(node)) {
            throw DOMException.create(this._globalObject, [
                "Cannot adopt a shadow root",
                "NotSupportedError"
            ]);
        }
        return clone(node, this, deep);
    }
    // https://dom.spec.whatwg.org/#dom-document-adoptnode
    adoptNode(node) {
        if (node.nodeType === NODE_TYPE.DOCUMENT_NODE) {
            throw DOMException.create(this._globalObject, [
                "Cannot adopt a document node",
                "NotSupportedError"
            ]);
        } else if (ShadowRoot.isImpl(node)) {
            throw DOMException.create(this._globalObject, [
                "Cannot adopt a shadow root",
                "HierarchyRequestError"
            ]);
        }
        this._adoptNode(node);
        return node;
    }
    // https://dom.spec.whatwg.org/#concept-node-adopt
    _adoptNode(node) {
        const newDocument = this;
        const oldDocument = node._ownerDocument;
        const parent = domSymbolTree.parent(node);
        if (parent) {
            parent._remove(node);
        }
        if (oldDocument !== newDocument) {
            for (const inclusiveDescendant of shadowIncludingInclusiveDescendantsIterator(node)){
                inclusiveDescendant._ownerDocument = newDocument;
            }
            for (const inclusiveDescendant of shadowIncludingInclusiveDescendantsIterator(node)){
                if (inclusiveDescendant._ceState === "custom") {
                    enqueueCECallbackReaction(inclusiveDescendant, "adoptedCallback", [
                        idlUtils.wrapperForImpl(oldDocument),
                        idlUtils.wrapperForImpl(newDocument)
                    ]);
                }
            }
            for (const inclusiveDescendant of shadowIncludingInclusiveDescendantsIterator(node)){
                if (inclusiveDescendant._adoptingSteps) {
                    inclusiveDescendant._adoptingSteps(oldDocument);
                }
            }
        }
    }
    get cookie() {
        return this._cookieJar.getCookieStringSync(this.URL, {
            http: false
        });
    }
    set cookie(cookieStr) {
        cookieStr = String(cookieStr);
        this._cookieJar.setCookieSync(cookieStr, this.URL, {
            http: false,
            ignoreError: true
        });
    }
    // The clear(), captureEvents(), and releaseEvents() methods must do nothing
    clear() {}
    captureEvents() {}
    releaseEvents() {}
    get styleSheets() {
        if (!this._styleSheets) {
            this._styleSheets = StyleSheetList.createImpl(this._globalObject);
        }
        // TODO: each style and link element should register its sheet on creation
        // and remove it on removal.
        return this._styleSheets;
    }
    get hidden() {
        if (this._defaultView && this._defaultView._pretendToBeVisual) {
            return false;
        }
        return true;
    }
    get visibilityState() {
        if (this._defaultView && this._defaultView._pretendToBeVisual) {
            return "visible";
        }
        return "prerender";
    }
    // https://w3c.github.io/selection-api/#extensions-to-document-interface
    getSelection() {
        return this._defaultView ? this._defaultView._selection : null;
    }
    // Needed to ensure that the resulting document has the correct prototype chain:
    // https://dom.spec.whatwg.org/#concept-node-clone says "that implements the same interfaces as node".
    _cloneDocument() {
        const copy = documents.createImpl(this._globalObject, {
            contentType: this.contentType,
            encoding: this._encoding,
            parsingMode: this._parsingMode
        });
        copy._URL = this._URL;
        copy._origin = this._origin;
        return copy;
    }
}
eventAccessors.createEventAccessor(DocumentImpl.prototype, "readystatechange");
mixin(DocumentImpl.prototype, DocumentOrShadowRootImpl.prototype);
mixin(DocumentImpl.prototype, GlobalEventHandlersImpl.prototype);
mixin(DocumentImpl.prototype, NonElementParentNodeImpl.prototype);
mixin(DocumentImpl.prototype, ParentNodeImpl.prototype);
DocumentImpl.prototype.getElementsByTagName = memoizeQuery(function(qualifiedName) {
    return listOfElementsWithQualifiedName(qualifiedName, this);
});
DocumentImpl.prototype.getElementsByTagNameNS = memoizeQuery(function(namespace, localName) {
    return listOfElementsWithNamespaceAndLocalName(namespace, localName, this);
});
DocumentImpl.prototype.getElementsByClassName = memoizeQuery(function getElementsByClassName(classNames) {
    return listOfElementsWithClassNames(classNames, this);
});
module.exports = {
    implementation: DocumentImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/XMLDocument-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DocumentImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Document-impl.js [app-ssr] (ecmascript)").implementation;
exports.implementation = class XMLDocumentImpl extends DocumentImpl {
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ElementCSSInlineStyle-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const cssstyle = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/cssstyle@4.6.0/node_modules/cssstyle/lib/CSSStyleDeclaration.js [app-ssr] (ecmascript)");
class ElementCSSInlineStyle {
    _initElementCSSInlineStyle() {
        this._settingCssText = false;
        this._style = new cssstyle.CSSStyleDeclaration((newCssText)=>{
            if (!this._settingCssText) {
                this._settingCssText = true;
                this.setAttributeNS(null, "style", newCssText);
                this._settingCssText = false;
            }
        });
    }
    get style() {
        return this._style;
    }
}
module.exports = {
    implementation: ElementCSSInlineStyle
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/DOMStringMap-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { setAttributeValue, removeAttributeByName } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes.js [app-ssr] (ecmascript)");
const validateName = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/validate-names.js [app-ssr] (ecmascript)").name;
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const dataAttrRe = /^data-([^A-Z]*)$/;
function attrCamelCase(name) {
    return name.replace(/-([a-z])/g, (match, alpha)=>alpha.toUpperCase());
}
function attrSnakeCase(name) {
    return name.replace(/[A-Z]/g, (match)=>`-${match.toLowerCase()}`);
}
exports.implementation = class DOMStringMapImpl {
    constructor(globalObject, args, privateData){
        this._globalObject = globalObject;
        this._element = privateData.element;
    }
    get [idlUtils.supportedPropertyNames]() {
        const result = new Set();
        const { attributes } = this._element;
        for(let i = 0; i < attributes.length; i++){
            const attr = attributes.item(i);
            const matches = dataAttrRe.exec(attr.localName);
            if (matches) {
                result.add(attrCamelCase(matches[1]));
            }
        }
        return result;
    }
    [idlUtils.namedGet](name) {
        const { attributes } = this._element;
        for(let i = 0; i < attributes.length; i++){
            const attr = attributes.item(i);
            const matches = dataAttrRe.exec(attr.localName);
            if (matches && attrCamelCase(matches[1]) === name) {
                return attr.value;
            }
        }
        return undefined;
    }
    [idlUtils.namedSetNew](name, value) {
        if (/-[a-z]/.test(name)) {
            throw DOMException.create(this._globalObject, [
                `'${name}' is not a valid property name`,
                "SyntaxError"
            ]);
        }
        name = `data-${attrSnakeCase(name)}`;
        validateName(this._globalObject, name);
        setAttributeValue(this._element, name, value);
    }
    [idlUtils.namedSetExisting](name, value) {
        this[idlUtils.namedSetNew](name, value);
    }
    [idlUtils.namedDelete](name) {
        name = `data-${attrSnakeCase(name)}`;
        removeAttributeByName(this._element, name);
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLOrSVGElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const conversions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)");
const { isSummaryForParentDetails } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/details.js [app-ssr] (ecmascript)");
const focusing = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/focusing.js [app-ssr] (ecmascript)");
const { HTML_NS, SVG_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const DOMStringMap = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMStringMap.js [app-ssr] (ecmascript)");
const tabIndexReflectAllowedHTMLElements = new Set([
    "a",
    "area",
    "button",
    "frame",
    "iframe",
    "input",
    "object",
    "select",
    "textarea"
]);
class HTMLOrSVGElementImpl {
    _initHTMLOrSVGElement() {
        this._tabIndex = 0;
        this._dataset = null;
    }
    get dataset() {
        if (!this._dataset) {
            this._dataset = DOMStringMap.createImpl(this._globalObject, [], {
                element: this
            });
        }
        return this._dataset;
    }
    // TODO this should be [Reflect]able if we added default value support to webidl2js's [Reflect]
    get tabIndex() {
        if (!this.hasAttributeNS(null, "tabindex")) {
            if (this.namespaceURI === HTML_NS && (tabIndexReflectAllowedHTMLElements.has(this._localName) || this._localName === "summary" && isSummaryForParentDetails(this)) || this.namespaceURI === SVG_NS && this._localName === "a") {
                return 0;
            }
            return -1;
        }
        return conversions.long(this.getAttributeNS(null, "tabindex"));
    }
    set tabIndex(value) {
        this.setAttributeNS(null, "tabindex", String(value));
    }
    focus() {
        if (!focusing.isFocusableAreaElement(this)) {
            return;
        }
        const ownerDocument = this._ownerDocument;
        const previous = ownerDocument._lastFocusedElement;
        if (previous === this) {
            return;
        }
        ownerDocument._lastFocusedElement = null;
        if (previous) {
            focusing.fireFocusEventWithTargetAdjustment("blur", previous, this);
            focusing.fireFocusEventWithTargetAdjustment("focusout", previous, this, {
                bubbles: true
            });
        } else {
            const frameElement = ownerDocument._defaultView._frameElement;
            if (frameElement) {
                const frameLastFocusedElement = frameElement.ownerDocument._lastFocusedElement;
                frameElement.ownerDocument._lastFocusedElement = null;
                focusing.fireFocusEventWithTargetAdjustment("blur", frameLastFocusedElement, null);
                focusing.fireFocusEventWithTargetAdjustment("focusout", frameLastFocusedElement, null, {
                    bubbles: true
                });
                frameElement.ownerDocument._lastFocusedElement = frameElement;
            }
        }
        ownerDocument._lastFocusedElement = this;
        focusing.fireFocusEventWithTargetAdjustment("focus", this, previous);
        focusing.fireFocusEventWithTargetAdjustment("focusin", this, previous, {
            bubbles: true
        });
        ownerDocument.getSelection().collapse(this, 0);
    }
    blur() {
        if (this._ownerDocument._lastFocusedElement !== this || !focusing.isFocusableAreaElement(this)) {
            return;
        }
        this._ownerDocument._lastFocusedElement = null;
        focusing.fireFocusEventWithTargetAdjustment("blur", this, null);
        focusing.fireFocusEventWithTargetAdjustment("focusout", this, null, {
            bubbles: true
        });
        this._ownerDocument.getSelection().empty();
    }
}
exports.implementation = HTMLOrSVGElementImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const ElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Element-impl.js [app-ssr] (ecmascript)").implementation;
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const MouseEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MouseEvent.js [app-ssr] (ecmascript)");
const ElementInternals = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ElementInternals.js [app-ssr] (ecmascript)");
const ElementCSSInlineStyleImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ElementCSSInlineStyle-impl.js [app-ssr] (ecmascript)").implementation;
const GlobalEventHandlersImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/GlobalEventHandlers-impl.js [app-ssr] (ecmascript)").implementation;
const HTMLOrSVGElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLOrSVGElement-impl.js [app-ssr] (ecmascript)").implementation;
const { firstChildWithLocalName } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
const { isDisabled } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const { asciiLowercase } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { lookupCEDefinition } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/custom-elements.js [app-ssr] (ecmascript)");
class HTMLElementImpl extends ElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._initHTMLOrSVGElement();
        this._initElementCSSInlineStyle();
        this._initGlobalEvents();
        this._clickInProgress = false;
        // <summary> uses HTMLElement and has activation behavior
        this._hasActivationBehavior = this._localName === "summary";
        // https://html.spec.whatwg.org/#attached-internals
        this._attachedInternals = null;
    }
    _activationBehavior() {
        const parent = this.parentNode;
        if (parent && parent._localName === "details" && this === firstChildWithLocalName(parent, "summary")) {
            if (parent.hasAttributeNS(null, "open")) {
                parent.removeAttributeNS(null, "open");
            } else {
                parent.setAttributeNS(null, "open", "");
            }
        }
    }
    // https://html.spec.whatwg.org/multipage/dom.html#the-translate-attribute
    get translate() {
        const translateAttr = this.getAttributeNS(null, "translate");
        const translateAttrString = asciiLowercase(translateAttr || "");
        if (translateAttrString === "yes" || translateAttr && translateAttrString === "") {
            return true;
        } else if (translateAttrString === "no") {
            return false;
        }
        if (this === this.ownerDocument.documentElement) {
            return true;
        }
        return this.parentElement && this.parentElement.translate;
    }
    set translate(value) {
        if (value === true) {
            this.setAttributeNS(null, "translate", "yes");
        } else {
            this.setAttributeNS(null, "translate", "no");
        }
    }
    click() {
        // https://html.spec.whatwg.org/multipage/interaction.html#dom-click
        // https://html.spec.whatwg.org/multipage/webappapis.html#fire-a-synthetic-mouse-event
        if (isDisabled(this)) {
            return;
        }
        if (this._clickInProgress) {
            return;
        }
        this._clickInProgress = true;
        // https://github.com/whatwg/html/issues/4451
        // https://github.com/whatwg/html/issues/4452
        fireAnEvent("click", this, MouseEvent, {
            bubbles: true,
            cancelable: true,
            composed: true,
            isTrusted: false,
            view: this.ownerDocument.defaultView
        });
        this._clickInProgress = false;
    }
    get draggable() {
        const attributeValue = asciiLowercase(this.getAttributeNS(null, "draggable") || "");
        if (attributeValue === "true") {
            return true;
        } else if (attributeValue === "false") {
            return false;
        }
        return this._localName === "img" || this._localName === "a" && this.hasAttributeNS(null, "href");
    }
    set draggable(value) {
        this.setAttributeNS(null, "draggable", String(value));
    }
    get dir() {
        let dirValue = this.getAttributeNS(null, "dir");
        if (dirValue !== null) {
            dirValue = dirValue.toLowerCase();
            if ([
                "ltr",
                "rtl",
                "auto"
            ].includes(dirValue)) {
                return dirValue;
            }
        }
        return "";
    }
    set dir(value) {
        this.setAttributeNS(null, "dir", value);
    }
    // https://html.spec.whatwg.org/#dom-attachinternals
    attachInternals() {
        if (this._isValue !== null) {
            throw DOMException.create(this._globalObject, [
                "Unable to attach ElementInternals to a customized built-in element.",
                "NotSupportedError"
            ]);
        }
        const definition = lookupCEDefinition(this._ownerDocument, this._namespaceURI, this._localName, null);
        if (definition === null) {
            throw DOMException.create(this._globalObject, [
                "Unable to attach ElementInternals to non-custom elements.",
                "NotSupportedError"
            ]);
        }
        if (definition.disableInternals === true) {
            throw DOMException.create(this._globalObject, [
                "ElementInternals is disabled by disabledFeature static field.",
                "NotSupportedError"
            ]);
        }
        if (this._attachedInternals !== null) {
            throw DOMException.create(this._globalObject, [
                "ElementInternals for the specified element was already attached.",
                "NotSupportedError"
            ]);
        }
        if (this._ceState !== "precustomized" && this._ceState !== "custom") {
            throw DOMException.create(this._globalObject, [
                "The attachInternals() function cannot be called prior to the execution of the custom element constructor.",
                "NotSupportedError"
            ]);
        }
        this._attachedInternals = ElementInternals.createImpl(this._globalObject, [], {
            targetElement: this
        });
        return this._attachedInternals;
    }
    // Keep in sync with SVGElement. https://github.com/jsdom/jsdom/issues/2599
    _attrModified(name, value, oldValue) {
        if (name === "style" && value !== oldValue && !this._settingCssText) {
            this._settingCssText = true;
            this._style.cssText = value;
            this._settingCssText = false;
        } else if (name.startsWith("on")) {
            this._globalEventChanged(name.substring(2));
        }
        super._attrModified(name, value, oldValue);
    }
    get offsetParent() {
        return null;
    }
    get offsetTop() {
        return 0;
    }
    get offsetLeft() {
        return 0;
    }
    get offsetWidth() {
        return 0;
    }
    get offsetHeight() {
        return 0;
    }
}
mixin(HTMLElementImpl.prototype, ElementCSSInlineStyleImpl.prototype);
mixin(HTMLElementImpl.prototype, GlobalEventHandlersImpl.prototype);
mixin(HTMLElementImpl.prototype, HTMLOrSVGElementImpl.prototype);
module.exports = {
    implementation: HTMLElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/DOMImplementation-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const validateNames = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/validate-names.js [app-ssr] (ecmascript)");
const { HTML_NS, SVG_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { createElement, internalCreateElementNSSteps } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-element.js [app-ssr] (ecmascript)");
const DocumentType = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DocumentType.js [app-ssr] (ecmascript)");
const documents = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/documents.js [app-ssr] (ecmascript)");
class DOMImplementationImpl {
    constructor(globalObject, args, privateData){
        this._globalObject = globalObject;
        this._ownerDocument = privateData.ownerDocument;
    }
    hasFeature() {
        return true;
    }
    createDocumentType(qualifiedName, publicId, systemId) {
        validateNames.qname(this._globalObject, qualifiedName);
        return DocumentType.createImpl(this._globalObject, [], {
            ownerDocument: this._ownerDocument,
            name: qualifiedName,
            publicId,
            systemId
        });
    }
    // https://dom.spec.whatwg.org/#dom-domimplementation-createdocument
    createDocument(namespace, qualifiedName, doctype) {
        let contentType = "application/xml";
        if (namespace === HTML_NS) {
            contentType = "application/xhtml+xml";
        } else if (namespace === SVG_NS) {
            contentType = "image/svg+xml";
        }
        const document = documents.createImpl(this._globalObject, {
            contentType,
            parsingMode: "xml",
            encoding: "UTF-8"
        });
        let element = null;
        if (qualifiedName !== "") {
            element = internalCreateElementNSSteps(document, namespace, qualifiedName, {});
        }
        if (doctype !== null) {
            document.appendChild(doctype);
        }
        if (element !== null) {
            document.appendChild(element);
        }
        document._origin = this._ownerDocument._origin;
        return document;
    }
    // https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
    createHTMLDocument(title) {
        // Let doc be a new document that is an HTML document.
        // Set doc's content type to "text/html".
        const document = documents.createImpl(this._globalObject, {
            parsingMode: "html",
            encoding: "UTF-8"
        });
        // Create a doctype, with "html" as its name and with its node document set
        // to doc. Append the newly created node to doc.
        const doctype = DocumentType.createImpl(this._globalObject, [], {
            ownerDocument: document,
            name: "html",
            publicId: "",
            systemId: ""
        });
        document.appendChild(doctype);
        // Create an html element in the HTML namespace, and append it to doc.
        const htmlElement = createElement(document, "html", HTML_NS);
        document.appendChild(htmlElement);
        // Create a head element in the HTML namespace, and append it to the html
        // element created in the previous step.
        const headElement = createElement(document, "head", HTML_NS);
        htmlElement.appendChild(headElement);
        // If the title argument is not omitted:
        if (title !== undefined) {
            // Create a title element in the HTML namespace, and append it to the head
            // element created in the previous step.
            const titleElement = createElement(document, "title", HTML_NS);
            headElement.appendChild(titleElement);
            // Create a Text node, set its data to title (which could be the empty
            // string), and append it to the title element created in the previous step.
            titleElement.appendChild(document.createTextNode(title));
        }
        // Create a body element in the HTML namespace, and append it to the html
        // element created in the earlier step.
        const bodyElement = createElement(document, "body", HTML_NS);
        htmlElement.appendChild(bodyElement);
        // doc's origin is an alias to the origin of the context object's associated
        // document, and doc's effective script origin is an alias to the effective
        // script origin of the context object's associated document.
        return document;
    }
}
module.exports = {
    implementation: DOMImplementationImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/RadioNodeList-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const NodeListImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/NodeList-impl.js [app-ssr] (ecmascript)").implementation;
class RadioNodeListImpl extends NodeListImpl {
    // https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#dom-radionodelist-value
    // Note in general the spec says to manipulate/consult checkedness, but we use `checked` instead
    // because the spec isn't very good here: https://github.com/whatwg/html/issues/7612.
    get value() {
        this._update();
        const element = this._list.find((e)=>e._localName === "input" && e.type === "radio" && e.checked);
        if (element === undefined) {
            return "";
        }
        if (!element.hasAttributeNS(null, "value")) {
            return "on";
        }
        return element.getAttributeNS(null, "value");
    }
    set value(value) {
        let element;
        if (value === "on") {
            element = this._list.find((e)=>e._localName === "input" && e.type === "radio" && (!e.hasAttributeNS(null, "value") || e.getAttributeNS(null, "value") === value));
        } else {
            element = this._list.find((e)=>e._localName === "input" && e.type === "radio" && e.hasAttributeNS(null, "value") && e.getAttributeNS(null, "value") === value);
        }
        if (element) {
            element.checked = true;
        }
    }
}
module.exports = {
    implementation: RadioNodeListImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLOptionsCollection-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { DOCUMENT_POSITION_CONTAINS, DOCUMENT_POSITION_CONTAINED_BY } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-document-position.js [app-ssr] (ecmascript)");
const Element = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Element.js [app-ssr] (ecmascript)");
const Node = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Node.js [app-ssr] (ecmascript)");
const HTMLCollectionImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLCollection-impl.js [app-ssr] (ecmascript)").implementation;
exports.implementation = class HTMLOptionsCollectionImpl extends HTMLCollectionImpl {
    // inherits supported property indices
    get length() {
        this._update();
        return this._list.length;
    }
    set length(value) {
        this._update();
        if (value > this._list.length) {
            const doc = this._element._ownerDocument;
            for(let i = this._list.length; i < value; i++){
                const el = doc.createElement("option");
                this._element.appendChild(el);
            }
        } else if (value < this._list.length) {
            for(let i = this._list.length - 1; i >= value; i--){
                const el = this._list[i];
                this._element.removeChild(el);
            }
        }
    }
    get [idlUtils.supportedPropertyNames]() {
        this._update();
        const result = new Set();
        for (const element of this._list){
            result.add(element.getAttributeNS(null, "id"));
            result.add(element.getAttributeNS(null, "name"));
        }
        return result;
    }
    [idlUtils.indexedSetNew](index, value) {
        if (value === null) {
            this.remove(index);
            return;
        }
        this._update();
        const { length } = this._list;
        const n = index - length;
        if (n > 0) {
            const doc = this._element._ownerDocument;
            const frag = doc.createDocumentFragment();
            // Spec says n - 1, but n seems to be the right number here.
            for(let i = 0; i < n; i++){
                const el = doc.createElement("option");
                frag.appendChild(el);
            }
            this._element._append(frag);
        }
        if (n >= 0) {
            this._element._append(value);
        } else {
            this._element._replace(value, this._list[index]);
        }
    }
    [idlUtils.indexedSetExisting](index, value) {
        return this[idlUtils.indexedSetNew](index, value);
    }
    add(element, before) {
        if (this._element.compareDocumentPosition(element) & DOCUMENT_POSITION_CONTAINS) {
            throw DOMException.create(this._globalObject, [
                "The operation would yield an incorrect node tree.",
                "HierarchyRequestError"
            ]);
        }
        if (Element.isImpl(before) && !(this._element.compareDocumentPosition(before) & DOCUMENT_POSITION_CONTAINED_BY)) {
            throw DOMException.create(this._globalObject, [
                "The object can not be found here.",
                "NotFoundError"
            ]);
        }
        if (element === before) {
            return;
        }
        let reference = null;
        if (Node.isImpl(before)) {
            reference = before;
        } else if (typeof before === "number") {
            this._update();
            reference = this._list[before] || null;
        }
        const parent = reference !== null ? reference.parentNode : this._element;
        parent._preInsert(element, reference);
    }
    remove(index) {
        this._update();
        if (this._list.length === 0) {
            return;
        }
        if (index < 0 || index >= this._list.length) {
            return;
        }
        const element = this._list[index];
        element.parentNode._remove(element);
    }
    get selectedIndex() {
        return this._element.selectedIndex;
    }
    set selectedIndex(value) {
        this._element.selectedIndex = value;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLOptionElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { stripAndCollapseASCIIWhitespace } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { HTML_NS, SVG_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { closest } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
const { formOwner } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
class HTMLOptionElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        // whenever selectedness is set to true, make sure all
        // other options set selectedness to false
        this._selectedness = false;
        this._dirtyness = false;
    }
    _removeOtherSelectedness() {
        // Remove the selectedness flag from all other options in this select
        const select = this._selectNode;
        if (select && !select.hasAttributeNS(null, "multiple")) {
            for (const option of select.options){
                if (option !== this) {
                    option._selectedness = false;
                }
            }
        }
    }
    _askForAReset() {
        const select = this._selectNode;
        if (select) {
            select._askedForAReset();
        }
    }
    _attrModified(name, value, oldValue) {
        if (!this._dirtyness && name === "selected") {
            this._selectedness = this.hasAttributeNS(null, "selected");
            if (this._selectedness) {
                this._removeOtherSelectedness();
            }
            this._askForAReset();
        }
        super._attrModified(name, value, oldValue);
    }
    get _selectNode() {
        let select = domSymbolTree.parent(this);
        if (!select) {
            return null;
        }
        if (select._localName !== "select") {
            select = domSymbolTree.parent(select);
            if (!select || select._localName !== "select") {
                return null;
            }
        }
        return select;
    }
    get form() {
        return formOwner(this);
    }
    get text() {
        return stripAndCollapseASCIIWhitespace(childTextContentExcludingDescendantsOfScript(this));
    }
    set text(value) {
        this.textContent = value;
    }
    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-value
    _getValue() {
        if (this.hasAttributeNS(null, "value")) {
            return this.getAttributeNS(null, "value");
        }
        return this.text;
    }
    get value() {
        return this._getValue();
    }
    set value(value) {
        this.setAttributeNS(null, "value", value);
    }
    get index() {
        const select = closest(this, "select");
        if (select === null) {
            return 0;
        }
        return select.options.indexOf(this);
    }
    get selected() {
        return this._selectedness;
    }
    set selected(s) {
        this._dirtyness = true;
        this._selectedness = Boolean(s);
        if (this._selectedness) {
            this._removeOtherSelectedness();
        }
        this._askForAReset();
        this._modified();
    }
    get label() {
        if (this.hasAttributeNS(null, "label")) {
            return this.getAttributeNS(null, "label");
        }
        return this.text;
    }
    set label(value) {
        this.setAttributeNS(null, "label", value);
    }
}
function childTextContentExcludingDescendantsOfScript(root) {
    let text = "";
    for (const child of domSymbolTree.childrenIterator(root)){
        if (child._localName === "script" && (child._namespaceURI === HTML_NS || child._namespaceURI === SVG_NS)) {
            continue;
        }
        if (child.nodeType === NODE_TYPE.TEXT_NODE || child.nodeType === NODE_TYPE.CDATA_SECTION_NODE) {
            text += child.nodeValue;
        } else {
            text += childTextContentExcludingDescendantsOfScript(child);
        }
    }
    return text;
}
module.exports = {
    implementation: HTMLOptionElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLOptGroupElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLOptGroupElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLOptGroupElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLHeadElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLHeadElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLHeadElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLTitleElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { childTextContent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/text.js [app-ssr] (ecmascript)");
class HTMLTitleElementImpl extends HTMLElementImpl {
    get text() {
        return childTextContent(this);
    }
    set text(value) {
        this.textContent = value;
    }
}
module.exports = {
    implementation: HTMLTitleElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLBaseElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const whatwgURL = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLBaseElementImpl extends HTMLElementImpl {
    get href() {
        const document = this._ownerDocument;
        const url = this.hasAttributeNS(null, "href") ? this.getAttributeNS(null, "href") : "";
        const parsed = whatwgURL.parseURL(url, {
            baseURL: document._fallbackBaseURL()
        });
        if (parsed === null) {
            return url;
        }
        return whatwgURL.serializeURL(parsed);
    }
    set href(value) {
        this.setAttributeNS(null, "href", value);
    }
    _attrModified(name, value, oldValue) {
        super._attrModified(name, value, oldValue);
        if (name === "href") {
            this._ownerDocument._clearBaseURLCache();
        }
    }
    _attach() {
        super._attach();
        this._ownerDocument._clearBaseURLCache();
    }
    _detach() {
        super._detach();
        this._ownerDocument._clearBaseURLCache();
    }
}
module.exports = {
    implementation: HTMLBaseElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLLinkElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMTokenList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMTokenList.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { fetchStylesheet, removeStylesheet } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/stylesheets.js [app-ssr] (ecmascript)");
const whatwgURL = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
// Important reading: "appropriate times to obtain the resource" in
// https://html.spec.whatwg.org/multipage/semantics.html#link-type-stylesheet
class HTMLLinkElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this.sheet = null;
    }
    get relList() {
        if (this._relList === undefined) {
            this._relList = DOMTokenList.createImpl(this._globalObject, [], {
                element: this,
                attributeLocalName: "rel",
                supportedTokens: new Set([
                    "stylesheet"
                ])
            });
        }
        return this._relList;
    }
    _attach() {
        super._attach();
        maybeFetchAndProcess(this);
    }
    _detach() {
        super._detach();
        if (this.sheet) {
            removeStylesheet(this.sheet, this);
        }
    }
    _attrModified(name, value, oldValue) {
        super._attrModified(name, value, oldValue);
        if (name === "href") {
            maybeFetchAndProcess(this);
        }
        if (name === "rel" && this._relList !== undefined) {
            this._relList.attrModified();
        }
    }
    get _accept() {
        return "text/css,*/*;q=0.1";
    }
}
module.exports = {
    implementation: HTMLLinkElementImpl
};
// https://html.spec.whatwg.org/multipage/links.html#link-type-stylesheet
function maybeFetchAndProcess(el) {
    if (!isExternalResourceLink(el)) {
        return;
    }
    // Browsing-context connected
    if (!el.isConnected || !el._ownerDocument._defaultView) {
        return;
    }
    fetchAndProcess(el);
}
// https://html.spec.whatwg.org/multipage/semantics.html#default-fetch-and-process-the-linked-resource
// TODO: refactor into general link-fetching like the spec.
function fetchAndProcess(el) {
    const href = el.getAttributeNS(null, "href");
    if (href === null || href === "") {
        return;
    }
    const url = el._ownerDocument.encodingParseAURL(href);
    if (url === null) {
        return;
    }
    // TODO handle crossorigin="", nonce, integrity="", referrerpolicy=""
    const serialized = whatwgURL.serializeURL(url);
    fetchStylesheet(el, serialized);
}
function isExternalResourceLink(el) {
    // for our purposes, only stylesheets can be external resource links
    const wrapper = idlUtils.wrapperForImpl(el);
    if (!/(?:[ \t\n\r\f]|^)stylesheet(?:[ \t\n\r\f]|$)/i.test(wrapper.rel)) {
        // rel is a space-separated list of tokens, and the original rel types
        // are case-insensitive.
        return false;
    }
    return el.hasAttributeNS(null, "href");
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLMetaElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLMetaElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLMetaElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLStyleElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { removeStylesheet, createStylesheet } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/stylesheets.js [app-ssr] (ecmascript)");
const { childTextContent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/text.js [app-ssr] (ecmascript)");
const { asciiCaseInsensitiveMatch } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
class HTMLStyleElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this.sheet = null;
        this._isOnStackOfOpenElements = false;
    }
    _attach() {
        super._attach();
        if (!this._isOnStackOfOpenElements) {
            this._updateAStyleBlock();
        }
    }
    _detach() {
        super._detach();
        if (!this._isOnStackOfOpenElements) {
            this._updateAStyleBlock();
        }
    }
    _childTextContentChangeSteps() {
        super._childTextContentChangeSteps();
        // This guard is not required by the spec, but should be unobservable (since you can't run script during the middle
        // of parsing a <style> element) and saves a bunch of unnecessary work.
        if (!this._isOnStackOfOpenElements) {
            this._updateAStyleBlock();
        }
    }
    _poppedOffStackOfOpenElements() {
        this._isOnStackOfOpenElements = false;
        this._updateAStyleBlock();
    }
    _pushedOnStackOfOpenElements() {
        this._isOnStackOfOpenElements = true;
    }
    _updateAStyleBlock() {
        if (this.sheet) {
            removeStylesheet(this.sheet, this);
        }
        // Browsing-context connected, per https://github.com/whatwg/html/issues/4547
        if (!this.isConnected || !this._ownerDocument._defaultView) {
            return;
        }
        const type = this.getAttributeNS(null, "type");
        if (type !== null && type !== "" && !asciiCaseInsensitiveMatch(type, "text/css")) {
            return;
        }
        // Not implemented: CSP
        const content = childTextContent(this);
        // Not implemented: a bunch of other state, e.g. title/media attributes
        createStylesheet(content, this, this._ownerDocument.baseURL());
    }
}
module.exports = {
    implementation: HTMLStyleElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/WindowEventHandlers-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { createEventAccessor } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/create-event-accessor.js [app-ssr] (ecmascript)");
const events = new Set([
    // WindowEventHandlers
    "afterprint",
    "beforeprint",
    "beforeunload",
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
    "unload",
    // inherited and overridden
    "blur",
    "error",
    "focus",
    "load",
    "resize",
    "scroll"
]);
// This class builds on GlobalEventHandlers, which must be mixed in first.
class WindowEventHandlersImpl {
    _proxyWindowEventsToWindow() {
        // We're a <body> or <frameset>, so we need to proxy these specific events to the Window (if it exists)
        this._getEventHandlerTarget = (event)=>{
            if (events.has(event)) {
                return this.ownerDocument.defaultView || null;
            }
            return this;
        };
    }
}
for (const event of events){
    createEventAccessor(WindowEventHandlersImpl.prototype, event);
}
module.exports = {
    implementation: WindowEventHandlersImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLBodyElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const WindowEventHandlersImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/WindowEventHandlers-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLBodyElementImpl extends HTMLElementImpl {
    constructor(...args){
        super(...args);
        this._proxyWindowEventsToWindow();
    }
}
mixin(HTMLBodyElementImpl.prototype, WindowEventHandlersImpl.prototype);
module.exports = {
    implementation: HTMLBodyElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLHeadingElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLHeadingElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLHeadingElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLParagraphElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLParagraphElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLParagraphElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLHRElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLHRElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLHRElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLPreElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLPreElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLPreElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLUListElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLUListElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLUListElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLOListElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLOListElementImpl extends HTMLElementImpl {
    get start() {
        const value = parseInt(this.getAttributeNS(null, "start"));
        if (!isNaN(value)) {
            return value;
        }
        return 1;
    }
    set start(value) {
        this.setAttributeNS(null, "start", value);
    }
}
module.exports = {
    implementation: HTMLOListElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLLIElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLLIElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLLIElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLMenuElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLMenuElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLMenuElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLDListElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLDListElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLDListElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLDivElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLDivElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLDivElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLHyperlinkElementUtils-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const whatwgURL = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const { asciiCaseInsensitiveMatch } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { navigate } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/window/navigation.js [app-ssr] (ecmascript)");
exports.implementation = class HTMLHyperlinkElementUtilsImpl {
    _htmlHyperlinkElementUtilsSetup() {
        this.url = null;
    }
    // https://html.spec.whatwg.org/multipage/links.html#cannot-navigate
    _cannotNavigate() {
        // TODO: Correctly check if the document is fully active
        return this._localName !== "a" && !this.isConnected;
    }
    // https://html.spec.whatwg.org/multipage/semantics.html#get-an-element's-target
    _getAnElementsTarget() {
        if (this.hasAttributeNS(null, "target")) {
            return this.getAttributeNS(null, "target");
        }
        const baseEl = this._ownerDocument.querySelector("base[target]");
        if (baseEl) {
            return baseEl.getAttributeNS(null, "target");
        }
        return "";
    }
    // https://html.spec.whatwg.org/multipage/browsers.html#the-rules-for-choosing-a-browsing-context-given-a-browsing-context-name
    _chooseABrowsingContext(name, current) {
        let chosen = null;
        if (name === "" || asciiCaseInsensitiveMatch(name, "_self")) {
            chosen = current;
        } else if (asciiCaseInsensitiveMatch(name, "_parent")) {
            chosen = current.parent;
        } else if (asciiCaseInsensitiveMatch(name, "_top")) {
            chosen = current.top;
        } else if (!asciiCaseInsensitiveMatch(name, "_blank")) {
        // https://github.com/whatwg/html/issues/1440
        }
        // TODO: Create new browsing context, handle noopener
        return chosen;
    }
    // https://html.spec.whatwg.org/multipage/links.html#following-hyperlinks-2
    _followAHyperlink() {
        if (this._cannotNavigate()) {
            return;
        }
        const source = this._ownerDocument._defaultView;
        let targetAttributeValue = "";
        if (this._localName === "a" || this._localName === "area") {
            targetAttributeValue = this._getAnElementsTarget();
        }
        const noopener = this.relList.contains("noreferrer") || this.relList.contains("noopener");
        const target = this._chooseABrowsingContext(targetAttributeValue, source, noopener);
        if (target === null) {
            return;
        }
        const url = this._ownerDocument.encodingParseAURL(this.href);
        if (url === null) {
            return;
        }
        // TODO: Handle hyperlink suffix and referrerpolicy
        setTimeout(()=>{
            navigate(target, url, {});
        }, 0);
    }
    toString() {
        return this.href;
    }
    get href() {
        reinitializeURL(this);
        const { url } = this;
        if (url === null) {
            const href = this.getAttributeNS(null, "href");
            return href === null ? "" : href;
        }
        return whatwgURL.serializeURL(url);
    }
    set href(v) {
        this.setAttributeNS(null, "href", v);
    }
    get origin() {
        reinitializeURL(this);
        if (this.url === null) {
            return "";
        }
        return whatwgURL.serializeURLOrigin(this.url);
    }
    get protocol() {
        reinitializeURL(this);
        if (this.url === null) {
            return ":";
        }
        return this.url.scheme + ":";
    }
    set protocol(v) {
        reinitializeURL(this);
        if (this.url === null) {
            return;
        }
        whatwgURL.basicURLParse(v + ":", {
            url: this.url,
            stateOverride: "scheme start"
        });
        updateHref(this);
    }
    get username() {
        reinitializeURL(this);
        if (this.url === null) {
            return "";
        }
        return this.url.username;
    }
    set username(v) {
        reinitializeURL(this);
        const { url } = this;
        if (url === null || whatwgURL.cannotHaveAUsernamePasswordPort(url)) {
            return;
        }
        whatwgURL.setTheUsername(url, v);
        updateHref(this);
    }
    get password() {
        reinitializeURL(this);
        const { url } = this;
        if (url === null) {
            return "";
        }
        return url.password;
    }
    set password(v) {
        reinitializeURL(this);
        const { url } = this;
        if (url === null || whatwgURL.cannotHaveAUsernamePasswordPort(url)) {
            return;
        }
        whatwgURL.setThePassword(url, v);
        updateHref(this);
    }
    get host() {
        reinitializeURL(this);
        const { url } = this;
        if (url === null || url.host === null) {
            return "";
        }
        if (url.port === null) {
            return whatwgURL.serializeHost(url.host);
        }
        return whatwgURL.serializeHost(url.host) + ":" + whatwgURL.serializeInteger(url.port);
    }
    set host(v) {
        reinitializeURL(this);
        const { url } = this;
        if (url === null || whatwgURL.hasAnOpaquePath(url)) {
            return;
        }
        whatwgURL.basicURLParse(v, {
            url,
            stateOverride: "host"
        });
        updateHref(this);
    }
    get hostname() {
        reinitializeURL(this);
        const { url } = this;
        if (url === null || url.host === null) {
            return "";
        }
        return whatwgURL.serializeHost(url.host);
    }
    set hostname(v) {
        reinitializeURL(this);
        const { url } = this;
        if (url === null || whatwgURL.hasAnOpaquePath(url)) {
            return;
        }
        whatwgURL.basicURLParse(v, {
            url,
            stateOverride: "hostname"
        });
        updateHref(this);
    }
    get port() {
        reinitializeURL(this);
        const { url } = this;
        if (url === null || url.port === null) {
            return "";
        }
        return whatwgURL.serializeInteger(url.port);
    }
    set port(v) {
        reinitializeURL(this);
        const { url } = this;
        if (url === null || whatwgURL.cannotHaveAUsernamePasswordPort(url)) {
            return;
        }
        if (v === "") {
            url.port = null;
        } else {
            whatwgURL.basicURLParse(v, {
                url,
                stateOverride: "port"
            });
        }
        updateHref(this);
    }
    get pathname() {
        reinitializeURL(this);
        const { url } = this;
        if (url === null) {
            return "";
        }
        return whatwgURL.serializePath(url);
    }
    set pathname(v) {
        reinitializeURL(this);
        const { url } = this;
        if (url === null || whatwgURL.hasAnOpaquePath(url)) {
            return;
        }
        url.path = [];
        whatwgURL.basicURLParse(v, {
            url,
            stateOverride: "path start"
        });
        updateHref(this);
    }
    get search() {
        reinitializeURL(this);
        const { url } = this;
        if (url === null || url.query === null || url.query === "") {
            return "";
        }
        return "?" + url.query;
    }
    set search(v) {
        reinitializeURL(this);
        const { url } = this;
        if (url === null) {
            return;
        }
        if (v === "") {
            url.query = null;
        } else {
            const input = v[0] === "?" ? v.substring(1) : v;
            url.query = "";
            whatwgURL.basicURLParse(input, {
                url,
                stateOverride: "query",
                encodingOverride: this._ownerDocument.charset
            });
        }
        updateHref(this);
    }
    get hash() {
        reinitializeURL(this);
        const { url } = this;
        if (url === null || url.fragment === null || url.fragment === "") {
            return "";
        }
        return "#" + url.fragment;
    }
    set hash(v) {
        reinitializeURL(this);
        const { url } = this;
        if (url === null) {
            return;
        }
        if (v === "") {
            url.fragment = null;
        } else {
            const input = v[0] === "#" ? v.substring(1) : v;
            url.fragment = "";
            whatwgURL.basicURLParse(input, {
                url,
                stateOverride: "fragment"
            });
        }
        updateHref(this);
    }
};
function reinitializeURL(hheu) {
    if (hheu.url !== null && hheu.url.scheme === "blob" && whatwgURL.hasAnOpaquePath(hheu.url)) {
        return;
    }
    setTheURL(hheu);
}
function setTheURL(hheu) {
    const href = hheu.getAttributeNS(null, "href");
    if (href === null) {
        hheu.url = null;
        return;
    }
    const parsed = hheu._ownerDocument.encodingParseAURL(href);
    hheu.url = parsed === null ? null : parsed;
}
function updateHref(hheu) {
    hheu.setAttributeNS(null, "href", whatwgURL.serializeURL(hheu.url));
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLAnchorElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const DOMTokenList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMTokenList.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const HTMLHyperlinkElementUtilsImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLHyperlinkElementUtils-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLAnchorElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._htmlHyperlinkElementUtilsSetup();
        this._hasActivationBehavior = true;
    }
    _activationBehavior() {
        this._followAHyperlink();
    }
    get relList() {
        if (this._relList === undefined) {
            this._relList = DOMTokenList.createImpl(this._globalObject, [], {
                element: this,
                attributeLocalName: "rel"
            });
        }
        return this._relList;
    }
    get text() {
        return this.textContent;
    }
    set text(v) {
        this.textContent = v;
    }
    _attrModified(name, value, oldValue) {
        super._attrModified(name, value, oldValue);
        if (name === "rel" && this._relList !== undefined) {
            this._relList.attrModified();
        }
    }
}
mixin(HTMLAnchorElementImpl.prototype, HTMLHyperlinkElementUtilsImpl.prototype);
module.exports = {
    implementation: HTMLAnchorElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLAreaElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const DOMTokenList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMTokenList.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const HTMLHyperlinkElementUtilsImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLHyperlinkElementUtils-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLAreaElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._htmlHyperlinkElementUtilsSetup();
        this._hasActivationBehavior = true;
    }
    _activationBehavior() {
        this._followAHyperlink();
    }
    get relList() {
        if (this._relList === undefined) {
            this._relList = DOMTokenList.createImpl(this._globalObject, [], {
                element: this,
                attributeLocalName: "rel"
            });
        }
        return this._relList;
    }
    _attrModified(name, value, oldValue) {
        super._attrModified(name, value, oldValue);
        if (name === "rel" && this._relList !== undefined) {
            this._relList.attrModified();
        }
    }
}
mixin(HTMLAreaElementImpl.prototype, HTMLHyperlinkElementUtilsImpl.prototype);
module.exports = {
    implementation: HTMLAreaElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLBRElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLBRElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLBRElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLButtonElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const DefaultConstraintValidationImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/constraint-validation/DefaultConstraintValidation-impl.js [app-ssr] (ecmascript)").implementation;
const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const { isDisabled, formOwner, getLabelsForLabelable } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const { asciiLowercase } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
class HTMLButtonElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._customValidityErrorMessage = "";
        this._labels = null;
        this._hasActivationBehavior = true;
    }
    _activationBehavior() {
        const { form } = this;
        if (form && !isDisabled(this)) {
            if (this.type === "submit") {
                form._doRequestSubmit(this);
            }
            if (this.type === "reset") {
                form._doReset();
            }
        }
    }
    _getValue() {
        const valueAttr = this.getAttributeNS(null, "value");
        return valueAttr === null ? "" : valueAttr;
    }
    get labels() {
        return getLabelsForLabelable(this);
    }
    get form() {
        return formOwner(this);
    }
    get type() {
        const typeAttr = asciiLowercase(this.getAttributeNS(null, "type") || "");
        switch(typeAttr){
            case "submit":
            case "reset":
            case "button":
                return typeAttr;
            default:
                return "submit";
        }
    }
    set type(v) {
        v = asciiLowercase(String(v));
        switch(v){
            case "submit":
            case "reset":
            case "button":
                this.setAttributeNS(null, "type", v);
                break;
            default:
                this.setAttributeNS(null, "type", "submit");
                break;
        }
    }
    _barredFromConstraintValidationSpecialization() {
        return this.type === "reset" || this.type === "button";
    }
}
mixin(HTMLButtonElementImpl.prototype, DefaultConstraintValidationImpl.prototype);
module.exports = {
    implementation: HTMLButtonElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLCanvasElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const notImplemented = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/not-implemented.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const { Canvas } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
class HTMLCanvasElementImpl extends HTMLElementImpl {
    _attrModified(name, value, oldValue) {
        if (this._canvas && (name === "width" || name === "height")) {
            this._canvas[name] = parseInt(value);
        }
        super._attrModified(name, value, oldValue);
    }
    _getCanvas() {
        if (Canvas && !this._canvas) {
            this._canvas = Canvas.createCanvas(this.width, this.height);
        }
        return this._canvas;
    }
    getContext(contextId) {
        const canvas = this._getCanvas();
        if (canvas) {
            if (!this._context) {
                this._context = canvas.getContext(contextId) || null;
                if (this._context) {
                    // Override the native canvas reference with our wrapper. This is the
                    // reason why we need to locally cache _context, since each call to
                    // canvas.getContext(contextId) would replace this reference again.
                    // Perhaps in the longer term, a better solution would be to create a
                    // full wrapper for the Context object as well.
                    this._context.canvas = idlUtils.wrapperForImpl(this);
                    wrapNodeCanvasMethod(this._context, "createPattern");
                    wrapNodeCanvasMethod(this._context, "drawImage");
                }
            }
            return this._context;
        }
        notImplemented("HTMLCanvasElement.prototype.getContext (without installing the canvas npm package)", this._ownerDocument._defaultView);
        return null;
    }
    toDataURL(...args) {
        const canvas = this._getCanvas();
        if (canvas) {
            return canvas.toDataURL(...args);
        }
        notImplemented("HTMLCanvasElement.prototype.toDataURL (without installing the canvas npm package)", this._ownerDocument._defaultView);
        return null;
    }
    toBlob(callback, type, qualityArgument) {
        const window = this._ownerDocument._defaultView;
        const canvas = this._getCanvas();
        if (canvas) {
            const options = {};
            switch(type){
                case "image/jpg":
                case "image/jpeg":
                    type = "image/jpeg";
                    options.quality = qualityArgument;
                    break;
                default:
                    type = "image/png";
            }
            canvas.toBuffer((err, buff)=>{
                if (err) {
                    throw err;
                }
                callback(new window.Blob([
                    buff
                ], {
                    type
                }));
            }, type, options);
        } else {
            notImplemented("HTMLCanvasElement.prototype.toBlob (without installing the canvas npm package)", window);
        }
    }
    get width() {
        const parsed = parseInt(this.getAttributeNS(null, "width"));
        return isNaN(parsed) || parsed < 0 || parsed > 2147483647 ? 300 : parsed;
    }
    set width(v) {
        v = v > 2147483647 ? 300 : v;
        this.setAttributeNS(null, "width", String(v));
    }
    get height() {
        const parsed = parseInt(this.getAttributeNS(null, "height"));
        return isNaN(parsed) || parsed < 0 || parsed > 2147483647 ? 150 : parsed;
    }
    set height(v) {
        v = v > 2147483647 ? 150 : v;
        this.setAttributeNS(null, "height", String(v));
    }
}
// We need to wrap the methods that receive an image or canvas object
// (luckily, always as the first argument), so that these objects can be
// unwrapped an the expected types passed.
function wrapNodeCanvasMethod(ctx, name) {
    const prev = ctx[name];
    ctx[name] = function(image, ...rest) {
        const impl = idlUtils.implForWrapper(image);
        if (impl) {
            if (impl instanceof HTMLCanvasElementImpl && !impl._canvas) {
                impl._getCanvas();
            }
            image = impl._image || impl._canvas;
        }
        return prev.call(ctx, image, ...rest);
    };
}
module.exports = {
    implementation: HTMLCanvasElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLDataElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLDataElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLDataElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLDataListElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLCollection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLCollection.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { descendantsByLocalName } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
class HTMLDataListElementImpl extends HTMLElementImpl {
    // https://html.spec.whatwg.org/multipage/form-elements.html#dom-datalist-options
    get options() {
        return HTMLCollection.createImpl(this._globalObject, [], {
            element: this,
            query: ()=>descendantsByLocalName(this, "option")
        });
    }
}
module.exports = {
    implementation: HTMLDataListElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLDetailsElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLDetailsElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._taskQueue = null;
    }
    _dispatchToggleEvent() {
        this._taskQueue = null;
        fireAnEvent("toggle", this);
    }
    _attrModified(name, value, oldValue) {
        super._attrModified(name, value, oldValue);
        if (name === "open" && this._taskQueue === null) {
            // Check that the attribute is added or removed, not merely changed
            if (value !== oldValue && value !== null && oldValue === null || value === null && oldValue !== null) {
                this._taskQueue = setTimeout(this._dispatchToggleEvent.bind(this), 0);
            }
        }
    }
}
module.exports = {
    implementation: HTMLDetailsElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLDialogElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLDialogElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLDialogElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLDirectoryElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLDirectoryElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLDirectoryElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLFieldSetElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLCollection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLCollection.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const DefaultConstraintValidationImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/constraint-validation/DefaultConstraintValidation-impl.js [app-ssr] (ecmascript)").implementation;
const { formOwner } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const { descendantsByLocalNames } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
const listedElements = new Set([
    "button",
    "fieldset",
    "input",
    "object",
    "output",
    "select",
    "textarea"
]);
class HTMLFieldSetElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._customValidityErrorMessage = "";
    }
    get elements() {
        return HTMLCollection.createImpl(this._globalObject, [], {
            element: this,
            query: ()=>descendantsByLocalNames(this, listedElements)
        });
    }
    get form() {
        return formOwner(this);
    }
    get type() {
        return "fieldset";
    }
    _barredFromConstraintValidationSpecialization() {
        return true;
    }
}
mixin(HTMLFieldSetElementImpl.prototype, DefaultConstraintValidationImpl.prototype);
module.exports = {
    implementation: HTMLFieldSetElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLFontElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLFontElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLFontElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLFormControlsCollection-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLCollectionImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLCollection-impl.js [app-ssr] (ecmascript)").implementation;
const RadioNodeList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/RadioNodeList.js [app-ssr] (ecmascript)");
exports.implementation = class HTMLFormControlsCollectionImpl extends HTMLCollectionImpl {
    namedItem(name) {
        if (name === "") {
            return null;
        }
        this._update();
        const nodeList = RadioNodeList.createImpl(this._globalObject, [], {
            element: this,
            query: ()=>this._list.filter((e)=>e.getAttributeNS(null, "id") === name || e.getAttributeNS(null, "name") === name)
        });
        switch(nodeList.length){
            case 0:
                {
                    return null;
                }
            case 1:
                {
                    return nodeList.item(0);
                }
            default:
                {
                    return nodeList;
                }
        }
    }
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLFormElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { serializeURL } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const { formOwner, isListed, isSubmittable, isSubmitButton } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const HTMLFormControlsCollection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLFormControlsCollection.js [app-ssr] (ecmascript)");
const notImplemented = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/not-implemented.js [app-ssr] (ecmascript)");
const SubmitEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SubmitEvent.js [app-ssr] (ecmascript)");
const encTypes = new Set([
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
]);
const methods = new Set([
    "get",
    "post",
    "dialog"
]);
const constraintValidationPositiveResult = Symbol("positive");
const constraintValidationNegativeResult = Symbol("negative");
class HTMLFormElementImpl extends HTMLElementImpl {
    _descendantAdded(parent, child) {
        const form = this;
        for (const el of domSymbolTree.treeIterator(child)){
            if (typeof el._changedFormOwner === "function") {
                el._changedFormOwner(form);
            }
        }
        super._descendantAdded(parent, child);
    }
    _descendantRemoved(parent, child) {
        for (const el of domSymbolTree.treeIterator(child)){
            if (typeof el._changedFormOwner === "function") {
                el._changedFormOwner(null);
            }
        }
        super._descendantRemoved(parent, child);
    }
    _getSubmittableElementNodes() {
        return domSymbolTree.treeToArray(this.getRootNode({}), {
            filter: (node)=>{
                if (!isSubmittable(node)) {
                    return false;
                }
                return formOwner(node) === this;
            }
        });
    }
    _getElementNodes() {
        return domSymbolTree.treeToArray(this.getRootNode({}), {
            filter: (node)=>{
                if (!isListed(node) || node._localName === "input" && node.type === "image") {
                    return false;
                }
                return formOwner(node) === this;
            }
        });
    }
    // https://html.spec.whatwg.org/multipage/forms.html#dom-form-elements
    get elements() {
        return HTMLFormControlsCollection.createImpl(this._globalObject, [], {
            element: this.getRootNode({}),
            query: ()=>this._getElementNodes()
        });
    }
    [idlUtils.indexedGet](index) {
        return this._getElementNodes()[index] || null;
    }
    get [idlUtils.supportedPropertyIndices]() {
        return Object.keys(this._getElementNodes());
    }
    get length() {
        return this.elements.length;
    }
    _doRequestSubmit(submitter) {
        if (!this.isConnected) {
            return;
        }
        this.requestSubmit(submitter);
    }
    submit() {
        notImplemented("HTMLFormElement.prototype.submit", this._ownerDocument._defaultView);
    }
    requestSubmit(submitter = null) {
        if (submitter !== null) {
            if (!isSubmitButton(submitter)) {
                throw new TypeError("The specified element is not a submit button");
            }
            if (submitter.form !== this) {
                throw DOMException.create(this._globalObject, [
                    "The specified element is not owned by this form element",
                    "NotFoundError"
                ]);
            }
        }
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-algorithm
        // Step 6.3: if form doesn't have the 'novalidate' attribute, validate it and abort submission if form is invalid
        if (!this.hasAttributeNS(null, "novalidate") && !this.reportValidity()) {
            return;
        }
        if (!fireAnEvent("submit", this, SubmitEvent, {
            bubbles: true,
            cancelable: true,
            submitter
        })) {
            return;
        }
        notImplemented("HTMLFormElement.prototype.requestSubmit", this._ownerDocument._defaultView);
    }
    _doReset() {
        if (!this.isConnected) {
            return;
        }
        this.reset();
    }
    reset() {
        if (!fireAnEvent("reset", this, undefined, {
            bubbles: true,
            cancelable: true
        })) {
            return;
        }
        for (const el of this.elements){
            if (typeof el._formReset === "function") {
                el._formReset();
            }
        }
    }
    get method() {
        let method = this.getAttributeNS(null, "method");
        if (method) {
            method = method.toLowerCase();
        }
        if (methods.has(method)) {
            return method;
        }
        return "get";
    }
    set method(V) {
        this.setAttributeNS(null, "method", V);
    }
    get enctype() {
        let type = this.getAttributeNS(null, "enctype");
        if (type) {
            type = type.toLowerCase();
        }
        if (encTypes.has(type)) {
            return type;
        }
        return "application/x-www-form-urlencoded";
    }
    set enctype(V) {
        this.setAttributeNS(null, "enctype", V);
    }
    get action() {
        const attributeValue = this.getAttributeNS(null, "action");
        if (attributeValue === null || attributeValue === "") {
            return this._ownerDocument.URL;
        }
        const urlRecord = this._ownerDocument.encodingParseAURL(attributeValue);
        if (urlRecord === null) {
            return attributeValue;
        }
        return serializeURL(urlRecord);
    }
    set action(V) {
        this.setAttributeNS(null, "action", V);
    }
    // If the checkValidity() method is invoked, the user agent must statically validate the
    // constraints of the form element, and return true if the constraint validation returned
    // a positive result, and false if it returned a negative result.
    checkValidity() {
        return this._staticallyValidateConstraints().result === constraintValidationPositiveResult;
    }
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#interactively-validate-the-constraints
    reportValidity() {
        return this.checkValidity();
    }
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#statically-validate-the-constraints
    _staticallyValidateConstraints() {
        const controls = [];
        for (const el of this.elements){
            if (el.form === this && isSubmittable(el)) {
                controls.push(el);
            }
        }
        const invalidControls = [];
        for (const control of controls){
            if (control._isCandidateForConstraintValidation() && !control._satisfiesConstraints()) {
                invalidControls.push(control);
            }
        }
        if (invalidControls.length === 0) {
            return {
                result: constraintValidationPositiveResult
            };
        }
        const unhandledInvalidControls = [];
        for (const invalidControl of invalidControls){
            const notCancelled = fireAnEvent("invalid", invalidControl, undefined, {
                cancelable: true
            });
            if (notCancelled) {
                unhandledInvalidControls.push(invalidControl);
            }
        }
        return {
            result: constraintValidationNegativeResult,
            unhandledInvalidControls
        };
    }
}
module.exports = {
    implementation: HTMLFormElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLHtmlElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLHtmlElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLHtmlElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLImageElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const conversions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)");
const { serializeURL } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { Canvas } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
class HTMLImageElementImpl extends HTMLElementImpl {
    constructor(...args){
        super(...args);
        this._currentRequestState = "unavailable";
    }
    _attrModified(name, value, oldVal) {
        // TODO: handle crossorigin
        if (name === "src" || (name === "srcset" || name === "width" || name === "sizes") && value !== oldVal) {
            this._updateTheImageData();
        }
        super._attrModified(name, value, oldVal);
    }
    get _accept() {
        return "image/png,image/*;q=0.8,*/*;q=0.5";
    }
    get height() {
        // Just like on browsers, if no width / height is defined, we fall back on the
        // dimensions of the internal image data.
        return this.hasAttributeNS(null, "height") ? conversions["unsigned long"](this.getAttributeNS(null, "height")) : this.naturalHeight;
    }
    set height(V) {
        this.setAttributeNS(null, "height", String(V));
    }
    get width() {
        return this.hasAttributeNS(null, "width") ? conversions["unsigned long"](this.getAttributeNS(null, "width")) : this.naturalWidth;
    }
    set width(V) {
        this.setAttributeNS(null, "width", String(V));
    }
    get naturalHeight() {
        return this._image ? this._image.naturalHeight : 0;
    }
    get naturalWidth() {
        return this._image ? this._image.naturalWidth : 0;
    }
    get complete() {
        const srcAttributeValue = this.getAttributeNS(null, "src");
        return srcAttributeValue === null || srcAttributeValue === "" || this._currentRequestState === "broken" || this._currentRequestState === "completely available";
    }
    get currentSrc() {
        return this._currentSrc || "";
    }
    // https://html.spec.whatwg.org/multipage/images.html#updating-the-image-data
    _updateTheImageData() {
        const document = this._ownerDocument;
        if (!document._defaultView) {
            return;
        }
        if (!Canvas) {
            return;
        }
        if (!this._image) {
            this._image = new Canvas.Image();
        }
        this._currentSrc = null;
        this._currentRequestState = "unavailable";
        const srcAttributeValue = this.getAttributeNS(null, "src");
        let urlString = null;
        if (srcAttributeValue !== null && srcAttributeValue !== "") {
            const urlRecord = this._ownerDocument.encodingParseAURL(srcAttributeValue);
            if (urlRecord === null) {
                return;
            }
            urlString = serializeURL(urlRecord);
        }
        if (urlString !== null) {
            const resourceLoader = document._resourceLoader;
            let request;
            const onLoadImage = (data)=>{
                const { response } = request;
                if (response && response.statusCode !== undefined && response.statusCode !== 200) {
                    throw new Error("Status code: " + response.statusCode);
                }
                let error = null;
                this._image.onerror = function(err) {
                    error = err;
                };
                this._image.src = data;
                if (error) {
                    throw new Error(error);
                }
                this._currentSrc = srcAttributeValue;
                this._currentRequestState = "completely available";
            };
            request = resourceLoader.fetch(urlString, {
                element: this,
                onLoad: onLoadImage,
                onError: ()=>{
                    this._currentRequestState = "broken";
                }
            });
        } else {
            this._image.src = "";
        }
    }
}
module.exports = {
    implementation: HTMLImageElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLInputElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const FileList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/FileList.js [app-ssr] (ecmascript)");
const Decimal = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/decimal.js@10.6.0/node_modules/decimal.js/decimal.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const DefaultConstraintValidationImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/constraint-validation/DefaultConstraintValidation-impl.js [app-ssr] (ecmascript)").implementation;
const ValidityState = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ValidityState.js [app-ssr] (ecmascript)");
const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const { domSymbolTree, cloningSteps } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { getLabelsForLabelable, formOwner } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const { isDisabled, isValidEmailAddress, isValidAbsoluteURL, sanitizeValueByType } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const { asciiCaseInsensitiveMatch, asciiLowercase, parseFloatingPointNumber, splitOnCommas } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { isDate } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/dates-and-times.js [app-ssr] (ecmascript)");
const { convertStringToNumberByType, convertStringToDateByType, serializeDateByType, convertNumberToStringByType } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/number-and-date-inputs.js [app-ssr] (ecmascript)");
const filesSymbol = Symbol("files");
// https://html.spec.whatwg.org/multipage/input.html#attr-input-type
const inputAllowedTypes = new Set([
    "hidden",
    "text",
    "search",
    "tel",
    "url",
    "email",
    "password",
    "date",
    "month",
    "week",
    "time",
    "datetime-local",
    "number",
    "range",
    "color",
    "checkbox",
    "radio",
    "file",
    "submit",
    "image",
    "reset",
    "button"
]);
// https://html.spec.whatwg.org/multipage/input.html#concept-input-apply
const variableLengthSelectionAllowedTypes = new Set([
    "text",
    "search",
    "url",
    "tel",
    "password"
]);
const numericTypes = new Set([
    "date",
    "month",
    "week",
    "time",
    "datetime-local",
    "number",
    "range"
]);
const applicableTypesForIDLMember = {
    valueAsDate: new Set([
        "date",
        "month",
        "week",
        "time"
    ]),
    valueAsNumber: numericTypes,
    select: new Set([
        "text",
        "search",
        "url",
        "tel",
        "email",
        "password",
        "date",
        "month",
        "week",
        "time",
        "datetime-local",
        "number",
        "color",
        "file"
    ]),
    selectionStart: variableLengthSelectionAllowedTypes,
    selectionEnd: variableLengthSelectionAllowedTypes,
    selectionDirection: variableLengthSelectionAllowedTypes,
    setRangeText: variableLengthSelectionAllowedTypes,
    setSelectionRange: variableLengthSelectionAllowedTypes,
    stepDown: numericTypes,
    stepUp: numericTypes
};
const lengthPatternSizeTypes = new Set([
    "text",
    "search",
    "url",
    "tel",
    "email",
    "password"
]);
const readonlyTypes = new Set([
    ...lengthPatternSizeTypes,
    "date",
    "month",
    "week",
    "time",
    "datetime-local",
    "number"
]);
const applicableTypesForContentAttribute = {
    list: new Set([
        "text",
        "search",
        "url",
        "tel",
        "email",
        ...numericTypes,
        "color"
    ]),
    max: numericTypes,
    maxlength: lengthPatternSizeTypes,
    min: numericTypes,
    minlength: lengthPatternSizeTypes,
    multiple: new Set([
        "email",
        "file"
    ]),
    pattern: lengthPatternSizeTypes,
    readonly: readonlyTypes,
    required: new Set([
        ...readonlyTypes,
        "checkbox",
        "radio",
        "file"
    ]),
    step: numericTypes
};
const valueAttributeDefaultMode = new Set([
    "hidden",
    "submit",
    "image",
    "reset",
    "button"
]);
const valueAttributeDefaultOnMode = new Set([
    "checkbox",
    "radio"
]);
function valueAttributeMode(type) {
    if (valueAttributeDefaultMode.has(type)) {
        return "default";
    }
    if (valueAttributeDefaultOnMode.has(type)) {
        return "default/on";
    }
    if (type === "file") {
        return "filename";
    }
    return "value";
}
function getTypeFromAttribute(typeAttribute) {
    if (typeof typeAttribute !== "string") {
        return "text";
    }
    const type = asciiLowercase(typeAttribute);
    return inputAllowedTypes.has(type) ? type : "text";
}
class HTMLInputElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._selectionStart = this._selectionEnd = 0;
        this._selectionDirection = "none";
        this._value = "";
        this._dirtyValue = false;
        this._checkedness = false;
        this._dirtyCheckedness = false;
        this._preCheckedRadioState = null;
        this._legacyActivationBehaviorPreviousIndeterminateState = false;
        this.indeterminate = false;
        this._customValidityErrorMessage = "";
        this._labels = null;
        this._hasActivationBehavior = true;
    }
    // https://html.spec.whatwg.org/multipage/input.html#concept-input-value-string-number
    get _convertStringToNumber() {
        return convertStringToNumberByType[this.type];
    }
    get _convertNumberToString() {
        return convertNumberToStringByType[this.type];
    }
    get _convertDateToString() {
        return serializeDateByType[this.type];
    }
    get _convertStringToDate() {
        return convertStringToDateByType[this.type];
    }
    _isStepAligned(v) {
        return new Decimal(v).minus(this._stepBase).modulo(this._allowedValueStep).isZero();
    }
    // Returns a Decimal.
    _stepAlign(v, roundUp) {
        const allowedValueStep = this._allowedValueStep;
        const stepBase = this._stepBase;
        return new Decimal(v).minus(stepBase).toNearest(allowedValueStep, roundUp ? Decimal.ROUND_UP : Decimal.ROUND_DOWN).add(stepBase);
    }
    // For <input>, https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#concept-fe-value
    // is a simple value that is gotten and set, not computed.
    _getValue() {
        return this._value;
    }
    _legacyPreActivationBehavior() {
        if (this.type === "checkbox") {
            this.checked = !this.checked;
            this._legacyActivationBehaviorPreviousIndeterminateState = this.indeterminate;
            this.indeterminate = false;
        } else if (this.type === "radio") {
            this._preCheckedRadioState = this.checked;
            this.checked = true;
        }
    }
    _legacyCanceledActivationBehavior() {
        if (this.type === "checkbox") {
            this.checked = !this.checked;
            this.indeterminate = this._legacyActivationBehaviorPreviousIndeterminateState;
        } else if (this.type === "radio") {
            if (this._preCheckedRadioState !== null) {
                this.checked = this._preCheckedRadioState;
                this._preCheckedRadioState = null;
            }
        }
    }
    _activationBehavior(event) {
        if (!this._mutable && this.type !== "checkbox" && this.type !== "radio") {
            return;
        }
        const { form } = this;
        if (this.type === "checkbox" || this.type === "radio" && !this._preCheckedRadioState) {
            if (this.isConnected) {
                fireAnEvent("input", this, undefined, {
                    bubbles: true
                });
                fireAnEvent("change", this, undefined, {
                    bubbles: true
                });
            }
        } else if (form && this.type === "image") {
            // https://html.spec.whatwg.org/multipage/input.html#image-button-state-(type=image):input-activation-behavior
            // TODO: if/when layout is implemented, record the selected coordinate at the start of dispatch and use it here,
            // rather than relying on these getters that just mirror pageX/Y outside of dispatch
            this._selectedCoordinate = {
                x: event.offsetX,
                y: event.offsetY
            };
            form._doRequestSubmit(this);
        } else if (form && this.type === "submit") {
            form._doRequestSubmit(this);
        } else if (form && this.type === "reset") {
            form._doReset();
        }
    }
    _attrModified(name, value, oldVal) {
        const wrapper = idlUtils.wrapperForImpl(this);
        if (!this._dirtyValue && name === "value") {
            this._value = sanitizeValueByType(this, wrapper.defaultValue);
        }
        if (!this._dirtyCheckedness && name === "checked") {
            this._checkedness = wrapper.defaultChecked;
            if (this._checkedness) {
                this._removeOtherRadioCheckedness();
            }
        }
        if (name === "name" || name === "type") {
            if (this._checkedness) {
                this._removeOtherRadioCheckedness();
            }
        }
        if (name === "type") {
            const prevType = getTypeFromAttribute(oldVal);
            const curType = getTypeFromAttribute(value);
            // When an input element's type attribute changes state…
            if (prevType !== curType) {
                const prevValueMode = valueAttributeMode(prevType);
                const curValueMode = valueAttributeMode(curType);
                if (prevValueMode === "value" && this._value !== "" && (curValueMode === "default" || curValueMode === "default/on")) {
                    this.setAttributeNS(null, "value", this._value);
                } else if (prevValueMode !== "value" && curValueMode === "value") {
                    this._value = this.getAttributeNS(null, "value") || "";
                    this._dirtyValue = false;
                } else if (prevValueMode !== "filename" && curValueMode === "filename") {
                    this._value = "";
                }
                this._signalATypeChange();
                this._value = sanitizeValueByType(this, this._value);
                const previouslySelectable = this._idlMemberApplies("setRangeText", prevType);
                const nowSelectable = this._idlMemberApplies("setRangeText", curType);
                if (!previouslySelectable && nowSelectable) {
                    this._selectionStart = 0;
                    this._selectionEnd = 0;
                    this._selectionDirection = "none";
                }
            }
        }
        super._attrModified(name, value, oldVal);
    }
    // https://html.spec.whatwg.org/multipage/input.html#signal-a-type-change
    _signalATypeChange() {
        if (this._checkedness) {
            this._removeOtherRadioCheckedness();
        }
    }
    _formReset() {
        const wrapper = idlUtils.wrapperForImpl(this);
        this._value = sanitizeValueByType(this, wrapper.defaultValue);
        this._dirtyValue = false;
        this._checkedness = wrapper.defaultChecked;
        this._dirtyCheckedness = false;
        if (this._checkedness) {
            this._removeOtherRadioCheckedness();
        }
    }
    _changedFormOwner() {
        if (this._checkedness) {
            this._removeOtherRadioCheckedness();
        }
    }
    get _otherRadioGroupElements() {
        const wrapper = idlUtils.wrapperForImpl(this);
        const root = this._radioButtonGroupRoot;
        if (!root) {
            return [];
        }
        const result = [];
        const descendants = domSymbolTree.treeIterator(root);
        for (const candidate of descendants){
            if (candidate._radioButtonGroupRoot !== root) {
                continue;
            }
            const candidateWrapper = idlUtils.wrapperForImpl(candidate);
            if (!candidateWrapper.name || candidateWrapper.name !== wrapper.name) {
                continue;
            }
            if (candidate !== this) {
                result.push(candidate);
            }
        }
        return result;
    }
    _removeOtherRadioCheckedness() {
        for (const radioGroupElement of this._otherRadioGroupElements){
            radioGroupElement._checkedness = false;
        }
    }
    get _radioButtonGroupRoot() {
        const wrapper = idlUtils.wrapperForImpl(this);
        if (this.type !== "radio" || !wrapper.name) {
            return null;
        }
        let e = domSymbolTree.parent(this);
        while(e){
            // root node of this home sub tree
            // or the form element we belong to
            if (!domSymbolTree.parent(e) || e._localName === "form") {
                return e;
            }
            e = domSymbolTree.parent(e);
        }
        return null;
    }
    _someInRadioGroup(name) {
        if (this[name]) {
            return true;
        }
        return this._otherRadioGroupElements.some((radioGroupElement)=>radioGroupElement[name]);
    }
    get _mutable() {
        return !isDisabled(this) && !this._hasAttributeAndApplies("readonly");
    }
    get labels() {
        return getLabelsForLabelable(this);
    }
    get form() {
        return formOwner(this);
    }
    get checked() {
        return this._checkedness;
    }
    set checked(checked) {
        this._checkedness = Boolean(checked);
        this._dirtyCheckedness = true;
        if (this._checkedness) {
            this._removeOtherRadioCheckedness();
        }
    }
    get value() {
        switch(valueAttributeMode(this.type)){
            // https://html.spec.whatwg.org/multipage/input.html#dom-input-value-value
            case "value":
                return this._getValue();
            // https://html.spec.whatwg.org/multipage/input.html#dom-input-value-default
            case "default":
                {
                    const attr = this.getAttributeNS(null, "value");
                    return attr !== null ? attr : "";
                }
            // https://html.spec.whatwg.org/multipage/input.html#dom-input-value-default-on
            case "default/on":
                {
                    const attr = this.getAttributeNS(null, "value");
                    return attr !== null ? attr : "on";
                }
            // https://html.spec.whatwg.org/multipage/input.html#dom-input-value-filename
            case "filename":
                return this.files.length ? "C:\\fakepath\\" + this.files[0].name : "";
            default:
                throw new Error("jsdom internal error: unknown value attribute mode");
        }
    }
    set value(val) {
        switch(valueAttributeMode(this.type)){
            // https://html.spec.whatwg.org/multipage/input.html#dom-input-value-value
            case "value":
                {
                    const oldValue = this._value;
                    this._value = sanitizeValueByType(this, val);
                    this._dirtyValue = true;
                    if (oldValue !== this._value) {
                        this._selectionStart = this._selectionEnd = this._getValueLength();
                        this._selectionDirection = "none";
                    }
                    break;
                }
            // https://html.spec.whatwg.org/multipage/input.html#dom-input-value-default
            // https://html.spec.whatwg.org/multipage/input.html#dom-input-value-default-on
            case "default":
            case "default/on":
                this.setAttributeNS(null, "value", val);
                break;
            // https://html.spec.whatwg.org/multipage/input.html#dom-input-value-filename
            case "filename":
                if (val === "") {
                    this.files.length = 0;
                } else {
                    throw DOMException.create(this._globalObject, [
                        "This input element accepts a filename, which may only be programmatically set to the empty string.",
                        "InvalidStateError"
                    ]);
                }
                break;
            default:
                throw new Error("jsdom internal error: unknown value attribute mode");
        }
    }
    // https://html.spec.whatwg.org/multipage/input.html#dom-input-valueasdate
    get valueAsDate() {
        if (!this._idlMemberApplies("valueAsDate")) {
            return null;
        }
        const window = this._ownerDocument._defaultView;
        const convertedValue = this._convertStringToDate(this._value);
        if (convertedValue instanceof Date) {
            return new window.Date(convertedValue.getTime());
        }
        return null;
    }
    set valueAsDate(v) {
        if (!this._idlMemberApplies("valueAsDate")) {
            throw DOMException.create(this._globalObject, [
                "Failed to set the 'valueAsDate' property on 'HTMLInputElement': This input element does not support Date " + "values.",
                "InvalidStateError"
            ]);
        }
        if (v !== null && !isDate(v)) {
            throw new TypeError("Failed to set the 'valueAsDate' property on 'HTMLInputElement': The provided value is " + "not a Date.");
        }
        if (v === null || isNaN(v)) {
            this._value = "";
            return;
        }
        this._value = this._convertDateToString(v);
    }
    // https://html.spec.whatwg.org/multipage/input.html#dom-input-valueasnumber
    get valueAsNumber() {
        if (!this._idlMemberApplies("valueAsNumber")) {
            return NaN;
        }
        const parsedValue = this._convertStringToNumber(this._value);
        return parsedValue !== null ? parsedValue : NaN;
    }
    set valueAsNumber(v) {
        if (!isFinite(v) && !isNaN(v)) {
            throw new TypeError("Failed to set infinite value as Number");
        }
        if (!this._idlMemberApplies("valueAsNumber")) {
            throw DOMException.create(this._globalObject, [
                "Failed to set the 'valueAsNumber' property on 'HTMLInputElement': This input element does not support " + "Number values.",
                "InvalidStateError"
            ]);
        }
        if (isNaN(v)) {
            this._value = "";
        } else {
            this._value = this._convertNumberToString(v);
        }
    }
    // https://html.spec.whatwg.org/multipage/input.html#dom-input-stepup
    _stepUpdate(n, isUp) {
        const methodName = isUp ? "stepUp" : "stepDown";
        if (!this._idlMemberApplies(methodName)) {
            throw DOMException.create(this._globalObject, [
                `Failed to invoke '${methodName}' method on 'HTMLInputElement': ` + "This input element does not support Number values.",
                "InvalidStateError"
            ]);
        }
        const allowedValueStep = this._allowedValueStep;
        if (allowedValueStep === null) {
            throw DOMException.create(this._globalObject, [
                `Failed to invoke '${methodName}' method on 'HTMLInputElement': ` + "This input element does not support value step.",
                "InvalidStateError"
            ]);
        }
        const min = this._minimum;
        const max = this._maximum;
        if (min !== null && max !== null) {
            if (min > max) {
                return;
            }
            const candidateStepValue = this._stepAlign(Decimal.add(min, allowedValueStep), /* roundUp = */ false);
            if (candidateStepValue.lt(min) || candidateStepValue.gt(max)) {
                return;
            }
        }
        let value = 0;
        try {
            value = this.valueAsNumber;
            if (isNaN(value)) {
                value = 0;
            }
        } catch  {
        // Step 5. Default value is 0.
        }
        value = new Decimal(value);
        const valueBeforeStepping = value;
        if (!this._isStepAligned(value)) {
            value = this._stepAlign(value, /* roundUp = */ isUp);
        } else {
            let delta = Decimal.mul(n, allowedValueStep);
            if (!isUp) {
                delta = delta.neg();
            }
            value = value.add(delta);
        }
        if (min !== null && value.lt(min)) {
            value = this._stepAlign(min, /* roundUp = */ true);
        }
        if (max !== null && value.gt(max)) {
            value = this._stepAlign(max, /* roundUp = */ false);
        }
        if (isUp ? value.lt(valueBeforeStepping) : value.gt(valueBeforeStepping)) {
            return;
        }
        this._value = this._convertNumberToString(value.toNumber());
    }
    stepDown(n = 1) {
        return this._stepUpdate(n, false);
    }
    stepUp(n = 1) {
        return this._stepUpdate(n, true);
    }
    get files() {
        if (this.type === "file") {
            this[filesSymbol] ||= FileList.createImpl(this._globalObject);
        } else {
            this[filesSymbol] = null;
        }
        return this[filesSymbol];
    }
    set files(value) {
        if (this.type === "file" && value !== null) {
            this[filesSymbol] = value;
        }
    }
    get type() {
        const typeAttribute = this.getAttributeNS(null, "type");
        return getTypeFromAttribute(typeAttribute);
    }
    set type(type) {
        this.setAttributeNS(null, "type", type);
    }
    _dispatchSelectEvent() {
        setTimeout(()=>fireAnEvent("select", this, undefined, {
                bubbles: true,
                cancelable: false
            }), 0);
    }
    _getValueLength() {
        return typeof this.value === "string" ? this.value.length : 0;
    }
    select() {
        if (!this._idlMemberApplies("select")) {
            return;
        }
        this._selectionStart = 0;
        this._selectionEnd = this._getValueLength();
        this._selectionDirection = "none";
        this._dispatchSelectEvent();
    }
    get selectionStart() {
        if (!this._idlMemberApplies("selectionStart")) {
            return null;
        }
        return this._selectionStart;
    }
    set selectionStart(start) {
        if (!this._idlMemberApplies("selectionStart")) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        this.setSelectionRange(start, Math.max(start, this._selectionEnd), this._selectionDirection);
    }
    get selectionEnd() {
        if (!this._idlMemberApplies("selectionEnd")) {
            return null;
        }
        return this._selectionEnd;
    }
    set selectionEnd(end) {
        if (!this._idlMemberApplies("selectionEnd")) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        this.setSelectionRange(this._selectionStart, end, this._selectionDirection);
    }
    get selectionDirection() {
        if (!this._idlMemberApplies("selectionDirection")) {
            return null;
        }
        return this._selectionDirection;
    }
    set selectionDirection(dir) {
        if (!this._idlMemberApplies("selectionDirection")) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        this.setSelectionRange(this._selectionStart, this._selectionEnd, dir);
    }
    setSelectionRange(start, end, dir) {
        if (!this._idlMemberApplies("setSelectionRange")) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        this._selectionEnd = Math.min(end, this._getValueLength());
        this._selectionStart = Math.min(start, this._selectionEnd);
        this._selectionDirection = dir === "forward" || dir === "backward" ? dir : "none";
        this._dispatchSelectEvent();
    }
    setRangeText(repl, start, end, selectionMode = "preserve") {
        if (!this._idlMemberApplies("setRangeText")) {
            throw DOMException.create(this._globalObject, [
                "The object is in an invalid state.",
                "InvalidStateError"
            ]);
        }
        if (arguments.length < 2) {
            start = this._selectionStart;
            end = this._selectionEnd;
        } else if (start > end) {
            throw DOMException.create(this._globalObject, [
                "The index is not in the allowed range.",
                "IndexSizeError"
            ]);
        }
        start = Math.min(start, this._getValueLength());
        end = Math.min(end, this._getValueLength());
        const val = this.value;
        let selStart = this._selectionStart;
        let selEnd = this._selectionEnd;
        this.value = val.slice(0, start) + repl + val.slice(end);
        const newEnd = start + repl.length;
        if (selectionMode === "select") {
            this.setSelectionRange(start, newEnd);
        } else if (selectionMode === "start") {
            this.setSelectionRange(start, start);
        } else if (selectionMode === "end") {
            this.setSelectionRange(newEnd, newEnd);
        } else {
            const delta = repl.length - (end - start);
            if (selStart > end) {
                selStart += delta;
            } else if (selStart > start) {
                selStart = start;
            }
            if (selEnd > end) {
                selEnd += delta;
            } else if (selEnd > start) {
                selEnd = newEnd;
            }
            this.setSelectionRange(selStart, selEnd);
        }
    }
    // https://html.spec.whatwg.org/multipage/input.html#the-list-attribute
    get list() {
        const id = this._getAttributeIfApplies("list");
        if (!id) {
            return null;
        }
        const el = this.getRootNode({}).getElementById(id);
        if (el && el.localName === "datalist") {
            return el;
        }
        return null;
    }
    // https://html.spec.whatwg.org/multipage/input.html#the-min-and-max-attributes
    get _minimum() {
        let min = this._defaultMinimum;
        const attr = this._getAttributeIfApplies("min");
        if (attr !== null && this._convertStringToNumber !== undefined) {
            const parsed = this._convertStringToNumber(attr);
            if (parsed !== null) {
                min = parsed;
            }
        }
        return min;
    }
    get _maximum() {
        let max = this._defaultMaximum;
        const attr = this._getAttributeIfApplies("max");
        if (attr !== null && this._convertStringToNumber !== undefined) {
            const parsed = this._convertStringToNumber(attr);
            if (parsed !== null) {
                max = parsed;
            }
        }
        return max;
    }
    get _defaultMinimum() {
        if (this.type === "range") {
            return 0;
        }
        return null;
    }
    get _defaultMaximum() {
        if (this.type === "range") {
            return 100;
        }
        return null;
    }
    // https://html.spec.whatwg.org/multipage/input.html#concept-input-step
    get _allowedValueStep() {
        if (!this._contentAttributeApplies("step")) {
            return null;
        }
        const attr = this.getAttributeNS(null, "step");
        if (attr === null) {
            return this._defaultStep * this._stepScaleFactor;
        }
        if (asciiCaseInsensitiveMatch(attr, "any")) {
            return null;
        }
        const parsedStep = parseFloatingPointNumber(attr);
        if (parsedStep === null || parsedStep <= 0) {
            return this._defaultStep * this._stepScaleFactor;
        }
        return parsedStep * this._stepScaleFactor;
    }
    // https://html.spec.whatwg.org/multipage/input.html#concept-input-step-scale
    get _stepScaleFactor() {
        const dayInMilliseconds = 24 * 60 * 60 * 1000;
        switch(this.type){
            case "week":
                return 7 * dayInMilliseconds;
            case "date":
                return dayInMilliseconds;
            case "datetime-local":
            case "datetime":
            case "time":
                return 1000;
        }
        return 1;
    }
    // https://html.spec.whatwg.org/multipage/input.html#concept-input-step-default
    get _defaultStep() {
        if (this.type === "datetime-local" || this.type === "datetime" || this.type === "time") {
            return 60;
        }
        return 1;
    }
    // https://html.spec.whatwg.org/multipage/input.html#concept-input-min-zero
    get _stepBase() {
        if (this._hasAttributeAndApplies("min")) {
            const min = this._convertStringToNumber(this.getAttributeNS(null, "min"));
            if (min !== null) {
                return min;
            }
        }
        if (this.hasAttributeNS(null, "value")) {
            const value = this._convertStringToNumber(this.getAttributeNS(null, "value"));
            if (value !== null) {
                return value;
            }
        }
        if (this._defaultStepBase !== null) {
            return this._defaultStepBase;
        }
        return 0;
    }
    // https://html.spec.whatwg.org/multipage/input.html#concept-input-step-default-base
    get _defaultStepBase() {
        if (this.type === "week") {
            // The start of week 1970-W01
            return -259200000;
        }
        return null;
    }
    // https://html.spec.whatwg.org/multipage/input.html#common-input-element-attributes
    // When an attribute doesn't apply to an input element, user agents must ignore the attribute.
    _contentAttributeApplies(attribute) {
        return applicableTypesForContentAttribute[attribute].has(this.type);
    }
    _hasAttributeAndApplies(attribute) {
        return this._contentAttributeApplies(attribute) && this.hasAttributeNS(null, attribute);
    }
    _getAttributeIfApplies(attribute) {
        if (this._contentAttributeApplies(attribute)) {
            return this.getAttributeNS(null, attribute);
        }
        return null;
    }
    _idlMemberApplies(member, type = this.type) {
        return applicableTypesForIDLMember[member].has(type);
    }
    _barredFromConstraintValidationSpecialization() {
        // https://html.spec.whatwg.org/multipage/input.html#hidden-state-(type=hidden)
        // https://html.spec.whatwg.org/multipage/input.html#reset-button-state-(type=reset)
        // https://html.spec.whatwg.org/multipage/input.html#button-state-(type=button)
        const willNotValidateTypes = new Set([
            "hidden",
            "reset",
            "button"
        ]);
        // https://html.spec.whatwg.org/multipage/input.html#attr-input-readonly
        const readOnly = this._hasAttributeAndApplies("readonly");
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-disabled
        return willNotValidateTypes.has(this.type) || readOnly;
    }
    // https://html.spec.whatwg.org/multipage/input.html#concept-input-required
    get _required() {
        return this._hasAttributeAndApplies("required");
    }
    // https://html.spec.whatwg.org/multipage/input.html#has-a-periodic-domain
    get _hasAPeriodicDomain() {
        return this.type === "time";
    }
    // https://html.spec.whatwg.org/multipage/input.html#has-a-reversed-range
    get _hasAReversedRange() {
        return this._hasAPeriodicDomain && this._maximum < this._minimum;
    }
    get validity() {
        if (!this._validity) {
            // Constraint validation: When an element has a reversed range, and the result of applying
            // the algorithm to convert a string to a number to the string given by the element's value
            // is a number, and the number obtained from that algorithm is more than the maximum and less
            // than the minimum, the element is simultaneously suffering from an underflow and suffering
            // from an overflow.
            const reversedRangeSufferingOverUnderflow = ()=>{
                const parsedValue = this._convertStringToNumber(this._value);
                return parsedValue !== null && parsedValue > this._maximum && parsedValue < this._minimum;
            };
            const state = {
                // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-being-missing
                valueMissing: ()=>{
                    // https://html.spec.whatwg.org/multipage/input.html#the-required-attribute
                    // Constraint validation: If the element is required, and its value IDL attribute applies
                    // and is in the mode value, and the element is mutable, and the element's value is the
                    // empty string, then the element is suffering from being missing.
                    //
                    // Note: As of today, the value IDL attribute always applies.
                    if (this._required && valueAttributeMode(this.type) === "value" && this._mutable && this._value === "") {
                        return true;
                    }
                    switch(this.type){
                        // https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)
                        // Constraint validation: If the element is required and its checkedness is
                        // false, then the element is suffering from being missing.
                        case "checkbox":
                            if (this._required && !this._checkedness) {
                                return true;
                            }
                            break;
                        // https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio)
                        // Constraint validation: If an element in the radio button group is required,
                        // and all of the input elements in the radio button group have a checkedness
                        // that is false, then the element is suffering from being missing.
                        case "radio":
                            if (this._someInRadioGroup("_required") && !this._someInRadioGroup("checked")) {
                                return true;
                            }
                            break;
                        // https://html.spec.whatwg.org/multipage/input.html#file-upload-state-(type=file)
                        // Constraint validation: If the element is required and the list of selected files is
                        // empty, then the element is suffering from being missing.
                        case "file":
                            if (this._required && this.files.length === 0) {
                                return true;
                            }
                            break;
                    }
                    return false;
                },
                // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-being-too-long
                // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-maxlength
                // jsdom has no way at the moment to emulate a user interaction, so tooLong/tooShort have
                // to be set to false.
                tooLong: ()=>false,
                // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-being-too-short
                // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-minlength
                tooShort: ()=>false,
                // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-an-overflow
                rangeOverflow: ()=>{
                    // https://html.spec.whatwg.org/multipage/input.html#the-min-and-max-attributes
                    if (this._hasAReversedRange) {
                        return reversedRangeSufferingOverUnderflow();
                    }
                    // Constraint validation: When the element has a maximum and does not have a reversed
                    // range, and the result of applying the algorithm to convert a string to a number to the
                    // string given by the element's value is a number, and the number obtained from that
                    // algorithm is more than the maximum, the element is suffering from an overflow.
                    if (this._maximum !== null) {
                        const parsedValue = this._convertStringToNumber(this._value);
                        if (parsedValue !== null && parsedValue > this._maximum) {
                            return true;
                        }
                    }
                    return false;
                },
                // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-an-underflow
                rangeUnderflow: ()=>{
                    // https://html.spec.whatwg.org/multipage/input.html#the-min-and-max-attributes
                    if (this._hasAReversedRange) {
                        return reversedRangeSufferingOverUnderflow();
                    }
                    // Constraint validation: When the element has a minimum and does not have a reversed
                    // range, and the result of applying the algorithm to convert a string to a number to the
                    // string given by the element's value is a number, and the number obtained from that
                    // algorithm is less than the minimum, the element is suffering from an underflow.
                    if (this._minimum !== null) {
                        const parsedValue = this._convertStringToNumber(this._value);
                        if (parsedValue !== null && parsedValue < this._minimum) {
                            return true;
                        }
                    }
                    return false;
                },
                // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-a-pattern-mismatch
                patternMismatch: ()=>{
                    // https://html.spec.whatwg.org/multipage/input.html#the-pattern-attribute
                    if (this._value === "" || !this._hasAttributeAndApplies("pattern")) {
                        return false;
                    }
                    let regExp;
                    try {
                        const pattern = this.getAttributeNS(null, "pattern");
                        // The pattern attribute should be matched against the entire value, not just any
                        // subset, so add ^ and $ anchors. But also check the validity of the regex itself
                        // first.
                        new RegExp(pattern, "u"); // eslint-disable-line no-new
                        regExp = new RegExp("^(?:" + pattern + ")$", "u");
                    } catch  {
                        return false;
                    }
                    if (this._hasAttributeAndApplies("multiple")) {
                        return !splitOnCommas(this._value).every((value)=>regExp.test(value));
                    }
                    return !regExp.test(this._value);
                },
                // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-a-step-mismatch
                // https://html.spec.whatwg.org/multipage/input.html#attr-input-step
                stepMismatch: ()=>{
                    const allowedValueStep = this._allowedValueStep;
                    if (allowedValueStep === null) {
                        return false;
                    }
                    const number = this._convertStringToNumber(this._value);
                    return number !== null && !this._isStepAligned(number);
                },
                // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#suffering-from-a-type-mismatch
                typeMismatch: ()=>{
                    switch(this.type){
                        // https://html.spec.whatwg.org/multipage/input.html#url-state-(type=url)
                        // Constraint validation: While the value of the element is neither the empty string
                        // nor a valid absolute URL, the element is suffering from a type mismatch.
                        case "url":
                            if (this._value !== "" && !isValidAbsoluteURL(this._value)) {
                                return true;
                            }
                            break;
                        // https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
                        // Constraint validation [multiple=false]: While the value of the element is neither the empty
                        // string nor a single valid e - mail address, the element is suffering from a type mismatch.
                        // Constraint validation [multiple=true]: While the value of the element is not a valid e-mail address list,
                        // the element is suffering from a type mismatch.
                        case "email":
                            if (this._value !== "" && !isValidEmailAddress(this._getValue(), this.hasAttributeNS(null, "multiple"))) {
                                return true;
                            }
                            break;
                    }
                    return false;
                }
            };
            this._validity = ValidityState.createImpl(this._globalObject, [], {
                element: this,
                state
            });
        }
        return this._validity;
    }
    [cloningSteps](copy, node) {
        copy._value = node._value;
        copy._checkedness = node._checkedness;
        copy._dirtyValue = node._dirtyValue;
        copy._dirtyCheckedness = node._dirtyCheckedness;
    }
}
mixin(HTMLInputElementImpl.prototype, DefaultConstraintValidationImpl.prototype);
module.exports = {
    implementation: HTMLInputElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLLabelElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const MouseEvent = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/MouseEvent.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const { isLabelable, isDisabled, isInteractiveContent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const { isInclusiveAncestor } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/node.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
function sendClickToAssociatedNode(node) {
    fireAnEvent("click", node, MouseEvent, {
        bubbles: true,
        cancelable: true,
        view: node.ownerDocument ? node.ownerDocument.defaultView : null,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        button: 0,
        detail: 1,
        relatedTarget: null
    });
}
class HTMLLabelElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._hasActivationBehavior = true;
    }
    get control() {
        if (this.hasAttributeNS(null, "for")) {
            const forValue = this.getAttributeNS(null, "for");
            if (forValue === "") {
                return null;
            }
            const root = this.getRootNode({});
            for (const descendant of domSymbolTree.treeIterator(root)){
                if (descendant.nodeType === NODE_TYPE.ELEMENT_NODE && descendant.getAttributeNS(null, "id") === forValue) {
                    return isLabelable(descendant) ? descendant : null;
                }
            }
            return null;
        }
        for (const descendant of domSymbolTree.treeIterator(this)){
            if (isLabelable(descendant)) {
                return descendant;
            }
        }
        return null;
    }
    get form() {
        const node = this.control;
        if (node) {
            return node.form;
        }
        return null;
    }
    _activationBehavior(event) {
        // Check if the event's target is an inclusive descendant of any interactive content descendant of this <label>.
        // If so, do nothing.
        if (event.target && event.target !== this && isInclusiveAncestor(this, event.target)) {
            for (const ancestor of domSymbolTree.ancestorsIterator(event.target)){
                if (ancestor === this) {
                    break;
                }
                if (isInteractiveContent(ancestor)) {
                    return;
                }
            }
        }
        const node = this.control;
        if (node && !isDisabled(node)) {
            // Check if the control is an inclusive ancestor of the event's target (and has already received this event).
            // If so, do nothing.
            // See https://github.com/whatwg/html/issues/5415.
            if (event.target && isInclusiveAncestor(node, event.target)) {
                return;
            }
            sendClickToAssociatedNode(node);
        }
    }
}
module.exports = {
    implementation: HTMLLabelElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLLegendElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { formOwner } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
class HTMLLegendElementImpl extends HTMLElementImpl {
    get form() {
        const parent = this.parentNode;
        if (parent && parent._localName === "fieldset" && parent.namespaceURI === HTML_NS) {
            return formOwner(parent);
        }
        return null;
    }
}
module.exports = {
    implementation: HTMLLegendElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLMapElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLMapElementImpl extends HTMLElementImpl {
    get areas() {
        return this.getElementsByTagName("AREA");
    }
}
module.exports = {
    implementation: HTMLMapElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLMarqueeElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLMarqueeElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLMarqueeElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLMediaElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const notImplemented = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/not-implemented.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
function getTimeRangeDummy() {
    return {
        length: 0,
        start () {
            return 0;
        },
        end () {
            return 0;
        }
    };
}
class HTMLMediaElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._muted = false;
        this._volume = 1.0;
        this.readyState = 0;
        this.networkState = 0;
        this.currentTime = 0;
        this.currentSrc = "";
        this.buffered = getTimeRangeDummy();
        this.seeking = false;
        this.duration = NaN;
        this.paused = true;
        this.played = getTimeRangeDummy();
        this.seekable = getTimeRangeDummy();
        this.ended = false;
        this.audioTracks = [];
        this.videoTracks = [];
        this.textTracks = [];
    }
    get defaultPlaybackRate() {
        if (this._defaultPlaybackRate === undefined) {
            return 1.0;
        }
        return this._defaultPlaybackRate;
    }
    set defaultPlaybackRate(v) {
        if (v === 0.0) {
            throw DOMException.create(this._globalObject, [
                "The operation is not supported.",
                "NotSupportedError"
            ]);
        }
        if (this._defaultPlaybackRate !== v) {
            this._defaultPlaybackRate = v;
            this._dispatchRateChange();
        }
    }
    get playbackRate() {
        if (this._playbackRate === undefined) {
            return 1.0;
        }
        return this._playbackRate;
    }
    set playbackRate(v) {
        if (v !== this._playbackRate) {
            this._playbackRate = v;
            this._dispatchRateChange();
        }
    }
    get muted() {
        return this._muted;
    }
    set muted(v) {
        if (v !== this._muted) {
            this._muted = v;
            this._dispatchVolumeChange();
        }
    }
    get defaultMuted() {
        return this.getAttributeNS(null, "muted") !== null;
    }
    set defaultMuted(v) {
        if (v) {
            this.setAttributeNS(null, "muted", v);
        } else {
            this.removeAttributeNS(null, "muted");
        }
    }
    get volume() {
        return this._volume;
    }
    set volume(v) {
        if (v < 0 || v > 1) {
            throw DOMException.create(this._globalObject, [
                "The index is not in the allowed range.",
                "IndexSizeError"
            ]);
        }
        if (this._volume !== v) {
            this._volume = v;
            this._dispatchVolumeChange();
        }
    }
    // Not (yet) implemented according to spec
    // Should return sane default values
    load() {
        notImplemented("HTMLMediaElement.prototype.load", this._ownerDocument._defaultView);
    }
    canPlayType() {
        return "";
    }
    play() {
        notImplemented("HTMLMediaElement.prototype.play", this._ownerDocument._defaultView);
    }
    pause() {
        notImplemented("HTMLMediaElement.prototype.pause", this._ownerDocument._defaultView);
    }
    addTextTrack() {
        notImplemented("HTMLMediaElement.prototype.addTextTrack", this._ownerDocument._defaultView);
    }
    _dispatchRateChange() {
        fireAnEvent("ratechange", this);
    }
    _dispatchVolumeChange() {
        fireAnEvent("volumechange", this);
    }
}
module.exports = {
    implementation: HTMLMediaElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLMeterElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { parseFloatingPointNumber } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { getLabelsForLabelable } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
class HTMLMeterElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._labels = null;
    }
    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-meter-minimum
    get _minimumValue() {
        const min = this.getAttributeNS(null, "min");
        if (min !== null) {
            const parsed = parseFloatingPointNumber(min);
            if (parsed !== null) {
                return parsed;
            }
        }
        return 0;
    }
    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-meter-maximum
    get _maximumValue() {
        let candidate = 1.0;
        const max = this.getAttributeNS(null, "max");
        if (max !== null) {
            const parsed = parseFloatingPointNumber(max);
            if (parsed !== null) {
                candidate = parsed;
            }
        }
        const minimumValue = this._minimumValue;
        return candidate >= minimumValue ? candidate : minimumValue;
    }
    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-meter-actual
    get _actualValue() {
        let candidate = 0;
        const value = this.getAttributeNS(null, "value");
        if (value !== null) {
            const parsed = parseFloatingPointNumber(value);
            if (parsed !== null) {
                candidate = parsed;
            }
        }
        const minimumValue = this._minimumValue;
        if (candidate < minimumValue) {
            return minimumValue;
        }
        const maximumValue = this._maximumValue;
        return candidate > maximumValue ? maximumValue : candidate;
    }
    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-meter-low
    get _lowBoundary() {
        const minimumValue = this._minimumValue;
        let candidate = minimumValue;
        const low = this.getAttributeNS(null, "low");
        if (low !== null) {
            const parsed = parseFloatingPointNumber(low);
            if (parsed !== null) {
                candidate = parsed;
            }
        }
        if (candidate < minimumValue) {
            return minimumValue;
        }
        const maximumValue = this._maximumValue;
        return candidate > maximumValue ? maximumValue : candidate;
    }
    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-meter-high
    get _highBoundary() {
        const maximumValue = this._maximumValue;
        let candidate = maximumValue;
        const high = this.getAttributeNS(null, "high");
        if (high !== null) {
            const parsed = parseFloatingPointNumber(high);
            if (parsed !== null) {
                candidate = parsed;
            }
        }
        const lowBoundary = this._lowBoundary;
        if (candidate < lowBoundary) {
            return lowBoundary;
        }
        return candidate > maximumValue ? maximumValue : candidate;
    }
    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-meter-optimum
    get _optimumPoint() {
        const minimumValue = this._minimumValue;
        const maximumValue = this._maximumValue;
        let candidate = (minimumValue + maximumValue) / 2;
        const optimum = this.getAttributeNS(null, "optimum");
        if (optimum !== null) {
            const parsed = parseFloatingPointNumber(optimum);
            if (parsed !== null) {
                candidate = parsed;
            }
        }
        if (candidate < minimumValue) {
            return minimumValue;
        }
        return candidate > maximumValue ? maximumValue : candidate;
    }
    get labels() {
        return getLabelsForLabelable(this);
    }
    get value() {
        return this._actualValue;
    }
    set value(val) {
        this.setAttributeNS(null, "value", String(val));
    }
    get min() {
        return this._minimumValue;
    }
    set min(val) {
        this.setAttributeNS(null, "min", String(val));
    }
    get max() {
        return this._maximumValue;
    }
    set max(val) {
        this.setAttributeNS(null, "max", String(val));
    }
    get low() {
        return this._lowBoundary;
    }
    set low(val) {
        this.setAttributeNS(null, "low", String(val));
    }
    get high() {
        return this._highBoundary;
    }
    set high(val) {
        this.setAttributeNS(null, "high", String(val));
    }
    get optimum() {
        return this._optimumPoint;
    }
    set optimum(val) {
        this.setAttributeNS(null, "optimum", String(val));
    }
}
module.exports = {
    implementation: HTMLMeterElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLModElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLModElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLModElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLOutputElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMTokenList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMTokenList.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const DefaultConstraintValidationImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/constraint-validation/DefaultConstraintValidation-impl.js [app-ssr] (ecmascript)").implementation;
const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const { getLabelsForLabelable, formOwner } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
class HTMLOutputElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._labels = null;
        this._defaultValueOverride = null;
        this._customValidityErrorMessage = "";
    }
    _attrModified(name, value, oldValue) {
        super._attrModified(name, value, oldValue);
        if (name === "for" && this._htmlFor !== undefined) {
            this._htmlFor.attrModified();
        }
    }
    _barredFromConstraintValidationSpecialization() {
        return true;
    }
    _formReset() {
        this.textContent = this.defaultValue;
        this._defaultValueOverride = null;
    }
    get htmlFor() {
        if (this._htmlFor === undefined) {
            this._htmlFor = DOMTokenList.createImpl(this._globalObject, [], {
                element: this,
                attributeLocalName: "for"
            });
        }
        return this._htmlFor;
    }
    get type() {
        return "output";
    }
    get labels() {
        return getLabelsForLabelable(this);
    }
    get form() {
        return formOwner(this);
    }
    get value() {
        return this.textContent;
    }
    set value(val) {
        this._defaultValueOverride = this.defaultValue;
        this.textContent = val;
    }
    get defaultValue() {
        if (this._defaultValueOverride !== null) {
            return this._defaultValueOverride;
        }
        return this.textContent;
    }
    set defaultValue(val) {
        if (this._defaultValueOverride === null) {
            this.textContent = val;
            return;
        }
        this._defaultValueOverride = val;
    }
}
mixin(HTMLOutputElementImpl.prototype, DefaultConstraintValidationImpl.prototype);
module.exports = {
    implementation: HTMLOutputElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLPictureElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLPictureElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLPictureElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLProgressElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { getLabelsForLabelable } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const { parseFloatingPointNumber } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
class HTMLProgressElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._labels = null;
    }
    get _isDeterminate() {
        return this.hasAttributeNS(null, "value");
    }
    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-progress-value
    get _value() {
        const valueAttr = this.getAttributeNS(null, "value");
        if (valueAttr !== null) {
            const parsedValue = parseFloatingPointNumber(valueAttr);
            if (parsedValue !== null && parsedValue > 0) {
                return parsedValue;
            }
        }
        return 0;
    }
    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-progress-current-value
    get _currentValue() {
        const value = this._value;
        return value > this._maximumValue ? this._maximumValue : value;
    }
    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-progress-maximum
    get _maximumValue() {
        const maxAttr = this.getAttributeNS(null, "max");
        if (maxAttr !== null) {
            const parsedMax = parseFloatingPointNumber(maxAttr);
            if (parsedMax !== null && parsedMax > 0) {
                return parsedMax;
            }
        }
        return 1.0;
    }
    get value() {
        if (this._isDeterminate) {
            return this._currentValue;
        }
        return 0;
    }
    set value(value) {
        this.setAttributeNS(null, "value", value);
    }
    get position() {
        if (!this._isDeterminate) {
            return -1;
        }
        return this._currentValue / this._maximumValue;
    }
    get labels() {
        return getLabelsForLabelable(this);
    }
}
module.exports = {
    implementation: HTMLProgressElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLQuoteElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLQuoteElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLQuoteElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLScriptElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const vm = __turbopack_context__.r("[externals]/vm [external] (vm, cjs)");
const whatwgEncoding = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-encoding@3.1.1/node_modules/whatwg-encoding/lib/whatwg-encoding.js [app-ssr] (ecmascript)");
const MIMEType = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/mime-type.js [app-ssr] (ecmascript)");
const { serializeURL } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const reportException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js [app-ssr] (ecmascript)");
const { domSymbolTree, cloningSteps } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { asciiLowercase } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { childTextContent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/text.js [app-ssr] (ecmascript)");
const nodeTypes = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const jsMIMETypes = new Set([
    "application/ecmascript",
    "application/javascript",
    "application/x-ecmascript",
    "application/x-javascript",
    "text/ecmascript",
    "text/javascript",
    "text/javascript1.0",
    "text/javascript1.1",
    "text/javascript1.2",
    "text/javascript1.3",
    "text/javascript1.4",
    "text/javascript1.5",
    "text/jscript",
    "text/livescript",
    "text/x-ecmascript",
    "text/x-javascript"
]);
class HTMLScriptElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._alreadyStarted = false;
        this._parserInserted = false; // set by the parser
    }
    _attach() {
        super._attach();
        // In our current terribly-hacky document.write() implementation, we parse in a div them move elements into the main
        // document. Thus _eval() will bail early when it gets in _poppedOffStackOfOpenElements(), since we're not attached
        // then. Instead, we'll let it eval here.
        if (!this._parserInserted || this._isMovingDueToDocumentWrite) {
            this._eval();
        }
    }
    _canRunScript() {
        const document = this._ownerDocument;
        // Equivalent to the spec's "scripting is disabled" check.
        if (!document._defaultView || document._defaultView._runScripts !== "dangerously" || document._scriptingDisabled) {
            return false;
        }
        return true;
    }
    _fetchExternalScript() {
        const document = this._ownerDocument;
        const resourceLoader = document._resourceLoader;
        const defaultEncoding = whatwgEncoding.labelToName(this.getAttributeNS(null, "charset")) || document._encoding;
        let request;
        if (!this._canRunScript()) {
            return;
        }
        const src = this.getAttributeNS(null, "src");
        const url = this._ownerDocument.encodingParseAURL(src);
        if (url === null) {
            return;
        }
        const urlString = serializeURL(url);
        const onLoadExternalScript = (data)=>{
            const { response } = request;
            let contentType;
            if (response && response.statusCode !== undefined && response.statusCode >= 400) {
                throw new Error("Status code: " + response.statusCode);
            }
            if (response) {
                contentType = MIMEType.parse(response.headers["content-type"]) || new MIMEType("text/plain");
            }
            const encoding = whatwgEncoding.getBOMEncoding(data) || contentType && whatwgEncoding.labelToName(contentType.parameters.get("charset")) || defaultEncoding;
            const script = whatwgEncoding.decode(data, encoding);
            this._innerEval(script, urlString);
        };
        request = resourceLoader.fetch(urlString, {
            element: this,
            onLoad: onLoadExternalScript
        });
    }
    _fetchInternalScript() {
        const document = this._ownerDocument;
        if (!this._canRunScript()) {
            return;
        }
        document._queue.push(null, ()=>{
            this._innerEval(this.text, document.URL);
        }, null, false, this);
    }
    _attrModified(name, value, oldValue) {
        super._attrModified(name, value, oldValue);
        if (this._attached && !this._startedEval && name === "src" && oldValue === null && value !== null) {
            this._fetchExternalScript();
        }
    }
    _poppedOffStackOfOpenElements() {
        // This seems to roughly correspond to
        // https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-incdata:prepare-a-script, although we certainly
        // don't implement the full semantics.
        this._eval();
    }
    // Vaguely similar to https://html.spec.whatwg.org/multipage/scripting.html#prepare-a-script, but we have a long way
    // to go before it's aligned.
    _eval() {
        if (this._alreadyStarted) {
            return;
        }
        // TODO: this text check doesn't seem completely the same as the spec, which e.g. will try to execute scripts with
        // child element nodes. Spec bug? https://github.com/whatwg/html/issues/3419
        if (!this.hasAttributeNS(null, "src") && this.text.length === 0) {
            return;
        }
        if (!this._attached) {
            return;
        }
        const scriptBlocksTypeString = this._getTypeString();
        const type = getType(scriptBlocksTypeString);
        if (type !== "classic") {
            // TODO: implement modules, and then change the check to `type === null`.
            return;
        }
        this._alreadyStarted = true;
        // TODO: implement nomodule here, **but only after we support modules**.
        // At this point we completely depart from the spec.
        if (this.hasAttributeNS(null, "src")) {
            this._fetchExternalScript();
        } else {
            this._fetchInternalScript();
        }
    }
    _innerEval(text, filename) {
        this._ownerDocument._writeAfterElement = this;
        processJavaScript(this, text, filename);
        delete this._ownerDocument._writeAfterElement;
    }
    _getTypeString() {
        const typeAttr = this.getAttributeNS(null, "type");
        const langAttr = this.getAttributeNS(null, "language");
        if (typeAttr === "") {
            return "text/javascript";
        }
        if (typeAttr === null && langAttr === "") {
            return "text/javascript";
        }
        if (typeAttr === null && langAttr === null) {
            return "text/javascript";
        }
        if (typeAttr !== null) {
            return typeAttr.trim();
        }
        if (langAttr !== null) {
            return "text/" + langAttr;
        }
        return null;
    }
    get text() {
        return childTextContent(this);
    }
    set text(text) {
        this.textContent = text;
    }
    // https://html.spec.whatwg.org/multipage/scripting.html#script-processing-model
    [cloningSteps](copy, node) {
        copy._alreadyStarted = node._alreadyStarted;
    }
}
function processJavaScript(element, code, filename) {
    const document = element.ownerDocument;
    const window = document && document._global;
    if (window) {
        document._currentScript = element;
        let lineOffset = 0;
        if (!element.hasAttributeNS(null, "src")) {
            for (const child of domSymbolTree.childrenIterator(element)){
                if (child.nodeType === nodeTypes.TEXT_NODE) {
                    if (child.sourceCodeLocation) {
                        lineOffset = child.sourceCodeLocation.startLine - 1;
                    }
                    break;
                }
            }
        }
        try {
            vm.runInContext(code, window, {
                filename,
                lineOffset,
                displayErrors: false
            });
        } catch (e) {
            reportException(window, e, filename);
        } finally{
            document._currentScript = null;
        }
    }
}
function getType(typeString) {
    const lowercased = asciiLowercase(typeString);
    // Cannot use whatwg-mimetype parsing because that strips whitespace. The spec demands a strict string comparison.
    // That is, the type="" attribute is not really related to MIME types at all.
    if (jsMIMETypes.has(lowercased)) {
        return "classic";
    }
    if (lowercased === "module") {
        return "module";
    }
    return null;
}
module.exports = {
    implementation: HTMLScriptElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLSelectElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const conversions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const ValidityState = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ValidityState.js [app-ssr] (ecmascript)");
const DefaultConstraintValidationImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/constraint-validation/DefaultConstraintValidation-impl.js [app-ssr] (ecmascript)").implementation;
const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
const HTMLCollection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLCollection.js [app-ssr] (ecmascript)");
const HTMLOptionsCollection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLOptionsCollection.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { getLabelsForLabelable, formOwner, isDisabled } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const { parseNonNegativeInteger } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
class HTMLSelectElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._options = HTMLOptionsCollection.createImpl(this._globalObject, [], {
            element: this,
            query: ()=>{
                // Customized domSymbolTree.treeToArray() clone.
                const array = [];
                for (const child of domSymbolTree.childrenIterator(this)){
                    if (child._localName === "option") {
                        array.push(child);
                    } else if (child._localName === "optgroup") {
                        for (const childOfGroup of domSymbolTree.childrenIterator(child)){
                            if (childOfGroup._localName === "option") {
                                array.push(childOfGroup);
                            }
                        }
                    }
                }
                return array;
            }
        });
        this._selectedOptions = null; // lazy
        this._customValidityErrorMessage = "";
        this._labels = null;
    }
    _formReset() {
        for (const option of this.options){
            option._selectedness = option.hasAttributeNS(null, "selected");
            option._dirtyness = false;
        }
        this._askedForAReset();
    }
    _askedForAReset() {
        if (this.hasAttributeNS(null, "multiple")) {
            return;
        }
        const selected = this.options.filter((opt)=>opt._selectedness);
        const size = this._displaySize;
        if (size === 1 && !selected.length) {
            // select the first option that is not disabled
            for (const option of this.options){
                let disabled = option.hasAttributeNS(null, "disabled");
                const parentNode = domSymbolTree.parent(option);
                if (parentNode && parentNode._localName === "optgroup" && parentNode.hasAttributeNS(null, "disabled")) {
                    disabled = true;
                }
                if (!disabled) {
                    // (do not set dirty)
                    option._selectedness = true;
                    break;
                }
            }
        } else if (selected.length >= 2) {
            // select the last selected option
            selected.forEach((option, index)=>{
                option._selectedness = index === selected.length - 1;
            });
        }
    }
    _descendantAdded(parent, child) {
        if (child.nodeType === NODE_TYPE.ELEMENT_NODE) {
            this._askedForAReset();
        }
        super._descendantAdded(parent, child);
    }
    _descendantRemoved(parent, child) {
        if (child.nodeType === NODE_TYPE.ELEMENT_NODE) {
            this._askedForAReset();
        }
        super._descendantRemoved(parent, child);
    }
    _attrModified(name, value, oldValue) {
        if (name === "multiple" || name === "size") {
            this._askedForAReset();
        }
        super._attrModified(name, value, oldValue);
    }
    get _displaySize() {
        if (this.hasAttributeNS(null, "size")) {
            const size = parseNonNegativeInteger(this.getAttributeNS(null, "size"));
            if (size !== null) {
                return size;
            }
        }
        return this.hasAttributeNS(null, "multiple") ? 4 : 1;
    }
    get _mutable() {
        return !isDisabled(this);
    }
    get options() {
        return this._options;
    }
    get selectedOptions() {
        return HTMLCollection.createImpl(this._globalObject, [], {
            element: this,
            query: ()=>domSymbolTree.treeToArray(this, {
                    filter: (node)=>node._localName === "option" && node._selectedness === true
                })
        });
    }
    get selectedIndex() {
        for(let i = 0; i < this.options.length; i++){
            if (this.options.item(i)._selectedness) {
                return i;
            }
        }
        return -1;
    }
    set selectedIndex(index) {
        for(let i = 0; i < this.options.length; i++){
            this.options.item(i)._selectedness = false;
        }
        const selectedOption = this.options.item(index);
        if (selectedOption) {
            selectedOption._selectedness = true;
            selectedOption._dirtyness = true;
        }
    }
    get labels() {
        return getLabelsForLabelable(this);
    }
    get value() {
        for (const option of this.options){
            if (option._selectedness) {
                return option.value;
            }
        }
        return "";
    }
    set value(val) {
        for (const option of this.options){
            if (option.value === val) {
                option._selectedness = true;
                option._dirtyness = true;
            } else {
                option._selectedness = false;
            }
            option._modified();
        }
    }
    get form() {
        return formOwner(this);
    }
    get type() {
        return this.hasAttributeNS(null, "multiple") ? "select-multiple" : "select-one";
    }
    get [idlUtils.supportedPropertyIndices]() {
        return this.options[idlUtils.supportedPropertyIndices];
    }
    get length() {
        return this.options.length;
    }
    set length(value) {
        this.options.length = value;
    }
    item(index) {
        return this.options.item(index);
    }
    namedItem(name) {
        return this.options.namedItem(name);
    }
    [idlUtils.indexedSetNew](index, value) {
        return this.options[idlUtils.indexedSetNew](index, value);
    }
    [idlUtils.indexedSetExisting](index, value) {
        return this.options[idlUtils.indexedSetExisting](index, value);
    }
    add(opt, before) {
        this.options.add(opt, before);
    }
    remove(index) {
        if (arguments.length > 0) {
            index = conversions.long(index, {
                context: "Failed to execute 'remove' on 'HTMLSelectElement': parameter 1"
            });
            this.options.remove(index);
        } else {
            super.remove();
        }
    }
    _barredFromConstraintValidationSpecialization() {
        return this.hasAttributeNS(null, "readonly");
    }
    // Constraint validation: If the element has its required attribute specified,
    // and either none of the option elements in the select element's list of options
    // have their selectedness set to true, or the only option element in the select
    // element's list of options with its selectedness set to true is the placeholder
    // label option, then the element is suffering from being missing.
    get validity() {
        if (!this._validity) {
            const state = {
                valueMissing: ()=>{
                    if (!this.hasAttributeNS(null, "required")) {
                        return false;
                    }
                    const selectedOptionIndex = this.selectedIndex;
                    return selectedOptionIndex < 0 || selectedOptionIndex === 0 && this._hasPlaceholderOption;
                }
            };
            this._validity = ValidityState.createImpl(this._globalObject, [], {
                element: this,
                state
            });
        }
        return this._validity;
    }
    // If a select element has a required attribute specified, does not have a multiple attribute
    // specified, and has a display size of 1; and if the value of the first option element in the
    // select element's list of options (if any) is the empty string, and that option element's parent
    // node is the select element(and not an optgroup element), then that option is the select
    // element's placeholder label option.
    // https://html.spec.whatwg.org/multipage/form-elements.html#placeholder-label-option
    get _hasPlaceholderOption() {
        return this.hasAttributeNS(null, "required") && !this.hasAttributeNS(null, "multiple") && this._displaySize === 1 && this.options.length > 0 && this.options.item(0).value === "" && this.options.item(0).parentNode._localName !== "optgroup";
    }
}
mixin(HTMLSelectElementImpl.prototype, DefaultConstraintValidationImpl.prototype);
module.exports = {
    implementation: HTMLSelectElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLSlotElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
const HTMLElement = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLElement.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { nodeRoot } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/node.js [app-ssr] (ecmascript)");
const { assignSlotableForTree, findFlattenedSlotables } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/shadow-dom.js [app-ssr] (ecmascript)");
class HTMLSlotElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._assignedNodes = [];
    }
    // https://dom.spec.whatwg.org/#slot-name
    get name() {
        return this.getAttributeNS(null, "name") || "";
    }
    _attrModified(name, value, oldValue) {
        super._attrModified(name, value, oldValue);
        // https://dom.spec.whatwg.org/#slot-name
        if (name === "name") {
            if (value === oldValue) {
                return;
            }
            if (value === null && oldValue === "") {
                return;
            }
            if (value === "" && oldValue === null) {
                return;
            }
            assignSlotableForTree(nodeRoot(this));
        }
    }
    // https://html.spec.whatwg.org/#dom-slot-assignednodes
    assignedNodes(options) {
        if (!options || !options.flatten) {
            return this._assignedNodes.map(idlUtils.wrapperForImpl);
        }
        return findFlattenedSlotables(this).map(idlUtils.wrapperForImpl);
    }
    // https://html.spec.whatwg.org/#dom-slot-assignedelements
    assignedElements(options) {
        return this.assignedNodes(options).filter(HTMLElement.is);
    }
}
module.exports = {
    implementation: HTMLSlotElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLSourceElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLSourceElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLSourceElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLSpanElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLSpanElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLSpanElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLTableCaptionElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLTableCaptionElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLTableCaptionElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLTableCellElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { asciiLowercase, parseNonNegativeInteger } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { closest } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
function reflectedAttributeClampedToRange(attrValue, min, max, defaultValue = 0) {
    if (attrValue === null) {
        return defaultValue;
    }
    const parsed = parseNonNegativeInteger(attrValue);
    if (parsed === null) {
        return defaultValue;
    }
    if (parsed < min) {
        return min;
    }
    if (parsed > max) {
        return max;
    }
    return parsed;
}
class HTMLTableCellElementImpl extends HTMLElementImpl {
    get colSpan() {
        return reflectedAttributeClampedToRange(this.getAttributeNS(null, "colspan"), 1, 1000, 1);
    }
    set colSpan(V) {
        this.setAttributeNS(null, "colspan", String(V));
    }
    get rowSpan() {
        return reflectedAttributeClampedToRange(this.getAttributeNS(null, "rowspan"), 0, 65534, 1);
    }
    set rowSpan(V) {
        this.setAttributeNS(null, "rowspan", String(V));
    }
    get cellIndex() {
        const tr = closest(this, "tr");
        if (tr === null) {
            return -1;
        }
        return tr.cells.indexOf(this);
    }
    get scope() {
        let value = this.getAttributeNS(null, "scope");
        if (value === null) {
            return "";
        }
        // Enumerated attribute is matched ASCII-case-insensitively.
        value = asciiLowercase(value);
        if (value === "row" || value === "col" || value === "rowgroup" || value === "colgroup") {
            return value;
        }
        return "";
    }
    set scope(V) {
        this.setAttributeNS(null, "scope", V);
    }
}
module.exports = {
    implementation: HTMLTableCellElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLTableColElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLTableColElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLTableColElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLTableElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { firstChildWithLocalName, childrenByLocalName } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
const HTMLCollection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLCollection.js [app-ssr] (ecmascript)");
const NODE_TYPE = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
function tHeadInsertionPoint(table) {
    const iterator = domSymbolTree.childrenIterator(table);
    for (const child of iterator){
        if (child.nodeType !== NODE_TYPE.ELEMENT_NODE) {
            continue;
        }
        if (child._namespaceURI !== HTML_NS || child._localName !== "caption" && child._localName !== "colgroup") {
            return child;
        }
    }
    return null;
}
class HTMLTableElementImpl extends HTMLElementImpl {
    get caption() {
        return firstChildWithLocalName(this, "caption");
    }
    set caption(value) {
        const currentCaption = this.caption;
        if (currentCaption !== null) {
            this.removeChild(currentCaption);
        }
        if (value !== null) {
            const insertionPoint = this.firstChild;
            this.insertBefore(value, insertionPoint);
        }
    }
    get tHead() {
        return firstChildWithLocalName(this, "thead");
    }
    set tHead(value) {
        if (value !== null && value._localName !== "thead") {
            throw DOMException.create(this._globalObject, [
                "Cannot set a non-thead element as a table header",
                "HierarchyRequestError"
            ]);
        }
        const currentHead = this.tHead;
        if (currentHead !== null) {
            this.removeChild(currentHead);
        }
        if (value !== null) {
            const insertionPoint = tHeadInsertionPoint(this);
            this.insertBefore(value, insertionPoint);
        }
    }
    get tFoot() {
        return firstChildWithLocalName(this, "tfoot");
    }
    set tFoot(value) {
        if (value !== null && value._localName !== "tfoot") {
            throw DOMException.create(this._globalObject, [
                "Cannot set a non-tfoot element as a table footer",
                "HierarchyRequestError"
            ]);
        }
        const currentFoot = this.tFoot;
        if (currentFoot !== null) {
            this.removeChild(currentFoot);
        }
        if (value !== null) {
            this.appendChild(value);
        }
    }
    get rows() {
        if (!this._rows) {
            this._rows = HTMLCollection.createImpl(this._globalObject, [], {
                element: this,
                query: ()=>{
                    const headerRows = [];
                    const bodyRows = [];
                    const footerRows = [];
                    const iterator = domSymbolTree.childrenIterator(this);
                    for (const child of iterator){
                        if (child.nodeType !== NODE_TYPE.ELEMENT_NODE || child._namespaceURI !== HTML_NS) {
                            continue;
                        }
                        if (child._localName === "thead") {
                            headerRows.push(...childrenByLocalName(child, "tr"));
                        } else if (child._localName === "tbody") {
                            bodyRows.push(...childrenByLocalName(child, "tr"));
                        } else if (child._localName === "tfoot") {
                            footerRows.push(...childrenByLocalName(child, "tr"));
                        } else if (child._localName === "tr") {
                            bodyRows.push(child);
                        }
                    }
                    return [
                        ...headerRows,
                        ...bodyRows,
                        ...footerRows
                    ];
                }
            });
        }
        return this._rows;
    }
    get tBodies() {
        if (!this._tBodies) {
            this._tBodies = HTMLCollection.createImpl(this._globalObject, [], {
                element: this,
                query: ()=>childrenByLocalName(this, "tbody")
            });
        }
        return this._tBodies;
    }
    createTBody() {
        const el = this._ownerDocument.createElement("TBODY");
        const tbodies = childrenByLocalName(this, "tbody");
        const insertionPoint = tbodies[tbodies.length - 1];
        if (insertionPoint) {
            this.insertBefore(el, insertionPoint.nextSibling);
        } else {
            this.appendChild(el);
        }
        return el;
    }
    createTHead() {
        let el = this.tHead;
        if (!el) {
            el = this.tHead = this._ownerDocument.createElement("THEAD");
        }
        return el;
    }
    deleteTHead() {
        this.tHead = null;
    }
    createTFoot() {
        let el = this.tFoot;
        if (!el) {
            el = this.tFoot = this._ownerDocument.createElement("TFOOT");
        }
        return el;
    }
    deleteTFoot() {
        this.tFoot = null;
    }
    createCaption() {
        let el = this.caption;
        if (!el) {
            el = this.caption = this._ownerDocument.createElement("CAPTION");
        }
        return el;
    }
    deleteCaption() {
        const c = this.caption;
        if (c) {
            c.parentNode.removeChild(c);
        }
    }
    insertRow(index) {
        if (index < -1 || index > this.rows.length) {
            throw DOMException.create(this._globalObject, [
                "Cannot insert a row at an index that is less than -1 or greater than the number of existing rows",
                "IndexSizeError"
            ]);
        }
        const tr = this._ownerDocument.createElement("tr");
        if (this.rows.length === 0 && this.tBodies.length === 0) {
            const tBody = this._ownerDocument.createElement("tbody");
            tBody.appendChild(tr);
            this.appendChild(tBody);
        } else if (this.rows.length === 0) {
            const tBody = this.tBodies.item(this.tBodies.length - 1);
            tBody.appendChild(tr);
        } else if (index === -1 || index === this.rows.length) {
            const tSection = this.rows.item(this.rows.length - 1).parentNode;
            tSection.appendChild(tr);
        } else {
            const beforeTR = this.rows.item(index);
            const tSection = beforeTR.parentNode;
            tSection.insertBefore(tr, beforeTR);
        }
        return tr;
    }
    deleteRow(index) {
        const rowLength = this.rows.length;
        if (index < -1 || index >= rowLength) {
            throw DOMException.create(this._globalObject, [
                `Cannot delete a row at index ${index}, where no row exists`,
                "IndexSizeError"
            ]);
        }
        if (index === -1) {
            if (rowLength === 0) {
                return;
            }
            index = rowLength - 1;
        }
        const tr = this.rows.item(index);
        tr.parentNode.removeChild(tr);
    }
}
module.exports = {
    implementation: HTMLTableElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLTableSectionElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { childrenByLocalName } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
const HTMLCollection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLCollection.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
class HTMLTableSectionElementImpl extends HTMLElementImpl {
    get rows() {
        if (!this._rows) {
            this._rows = HTMLCollection.createImpl(this._globalObject, [], {
                element: this,
                query: ()=>childrenByLocalName(this, "tr")
            });
        }
        return this._rows;
    }
    insertRow(index) {
        if (index < -1 || index > this.rows.length) {
            throw DOMException.create(this._globalObject, [
                "Cannot insert a row at an index that is less than -1 or greater than the number of existing rows",
                "IndexSizeError"
            ]);
        }
        const tr = this._ownerDocument.createElement("tr");
        if (index === -1 || index === this.rows.length) {
            this._append(tr);
        } else {
            const beforeTR = this.rows.item(index);
            this._insert(tr, beforeTR);
        }
        return tr;
    }
    deleteRow(index) {
        if (index < -1 || index >= this.rows.length) {
            throw DOMException.create(this._globalObject, [
                `Cannot delete a row at index ${index}, where no row exists`,
                "IndexSizeError"
            ]);
        }
        if (index === -1) {
            if (this.rows.length > 0) {
                const tr = this.rows.item(this.rows.length - 1);
                this._remove(tr);
            }
        } else {
            const tr = this.rows.item(index);
            this._remove(tr);
        }
    }
}
module.exports = {
    implementation: HTMLTableSectionElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLTimeElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLTimeElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLTimeElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLTableRowElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const HTMLCollection = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/HTMLCollection.js [app-ssr] (ecmascript)");
const { HTML_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { childrenByLocalNames } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/traversal.js [app-ssr] (ecmascript)");
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const cellLocalNames = new Set([
    "td",
    "th"
]);
class HTMLTableRowElementImpl extends HTMLElementImpl {
    get cells() {
        if (!this._cells) {
            this._cells = HTMLCollection.createImpl(this._globalObject, [], {
                element: this,
                query: ()=>childrenByLocalNames(this, cellLocalNames)
            });
        }
        return this._cells;
    }
    get rowIndex() {
        const parent = this.parentElement;
        if (parent === null || parent.namespaceURI !== HTML_NS) {
            return -1;
        }
        let tableElement = parent;
        if (parent.localName === "thead" || parent.localName === "tbody" || parent.localName === "tfoot") {
            tableElement = parent.parentElement;
        }
        if (tableElement === null || tableElement.namespaceURI !== HTML_NS || tableElement.localName !== "table") {
            return -1;
        }
        return tableElement.rows.indexOf(this);
    }
    get sectionRowIndex() {
        const parent = domSymbolTree.parent(this);
        if (parent === null) {
            return -1;
        }
        const { rows } = parent;
        if (!rows) {
            return -1;
        }
        return rows.indexOf(this);
    }
    insertCell(index) {
        const td = this._ownerDocument.createElement("TD");
        const { cells } = this;
        if (index < -1 || index > cells.length) {
            throw DOMException.create(this._globalObject, [
                "The index is not in the allowed range.",
                "IndexSizeError"
            ]);
        }
        if (index === -1 || index === cells.length) {
            this._append(td);
        } else {
            const ref = cells.item(index);
            this._insert(td, ref);
        }
        return td;
    }
    deleteCell(index) {
        const { cells } = this;
        if (index < -1 || index >= cells.length) {
            throw DOMException.create(this._globalObject, [
                "The index is not in the allowed range.",
                "IndexSizeError"
            ]);
        }
        if (index === -1) {
            if (cells.length === 0) {
                return;
            }
            index = cells.length - 1;
        }
        const td = cells.item(index);
        this._remove(td);
    }
}
module.exports = {
    implementation: HTMLTableRowElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLTemplateElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const Document = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/Document.js [app-ssr] (ecmascript)");
const DocumentFragment = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DocumentFragment.js [app-ssr] (ecmascript)");
const { cloningSteps, domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { clone } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node.js [app-ssr] (ecmascript)");
class HTMLTemplateElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        const doc = this._appropriateTemplateContentsOwnerDocument(this._ownerDocument);
        this._templateContents = DocumentFragment.createImpl(this._globalObject, [], {
            ownerDocument: doc,
            host: this
        });
    }
    // https://html.spec.whatwg.org/multipage/scripting.html#appropriate-template-contents-owner-document
    _appropriateTemplateContentsOwnerDocument(doc) {
        if (!doc._isInertTemplateDocument) {
            if (doc._associatedInertTemplateDocument === undefined) {
                const newDoc = Document.createImpl(this._globalObject, [], {
                    options: {
                        parsingMode: doc._parsingMode,
                        encoding: doc._encoding
                    }
                });
                newDoc._isInertTemplateDocument = true;
                doc._associatedInertTemplateDocument = newDoc;
            }
            doc = doc._associatedInertTemplateDocument;
        }
        return doc;
    }
    // https://html.spec.whatwg.org/multipage/scripting.html#template-adopting-steps
    _adoptingSteps() {
        const doc = this._appropriateTemplateContentsOwnerDocument(this._ownerDocument);
        doc._adoptNode(this._templateContents);
    }
    get content() {
        return this._templateContents;
    }
    [cloningSteps](copy, node, document, cloneChildren) {
        if (!cloneChildren) {
            return;
        }
        for (const child of domSymbolTree.childrenIterator(node._templateContents)){
            const childCopy = clone(child, copy._templateContents._ownerDocument, true);
            copy._templateContents.appendChild(childCopy);
        }
    }
}
module.exports = {
    implementation: HTMLTemplateElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLTextAreaElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const DefaultConstraintValidationImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/constraint-validation/DefaultConstraintValidation-impl.js [app-ssr] (ecmascript)").implementation;
const ValidityState = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/ValidityState.js [app-ssr] (ecmascript)");
const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const DOMException = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/DOMException.js [app-ssr] (ecmascript)");
const { cloningSteps } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { isDisabled, getLabelsForLabelable, formOwner } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
const { childTextContent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/text.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
class HTMLTextAreaElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._selectionStart = this._selectionEnd = 0;
        this._selectionDirection = "none";
        this._rawValue = "";
        this._dirtyValue = false;
        this._customValidityErrorMessage = "";
        this._labels = null;
    }
    _formReset() {
        this._rawValue = childTextContent(this);
        this._dirtyValue = false;
    }
    _getAPIValue() {
        return this._rawValue.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    }
    // https://html.spec.whatwg.org/multipage/form-elements.html#textarea-wrapping-transformation
    _getValue() {
        const apiValue = this._getAPIValue();
        const wrap = this.getAttributeNS(null, "wrap");
        return wrap === "hard" ? textareaWrappingTransformation(apiValue, this.getAttributeNS(null, "cols") ?? 20) : apiValue;
    }
    _childTextContentChangeSteps() {
        super._childTextContentChangeSteps();
        if (this._dirtyValue === false) {
            this._rawValue = childTextContent(this);
        }
    }
    get labels() {
        return getLabelsForLabelable(this);
    }
    get form() {
        return formOwner(this);
    }
    get defaultValue() {
        return childTextContent(this);
    }
    set defaultValue(val) {
        this.textContent = val;
    }
    get value() {
        return this._getAPIValue();
    }
    set value(val) {
        // https://html.spec.whatwg.org/multipage/form-elements.html#dom-textarea-value
        const oldAPIValue = this._getAPIValue();
        this._rawValue = val;
        this._dirtyValue = true;
        if (oldAPIValue !== this._getAPIValue()) {
            this._selectionStart = this._selectionEnd = this._getValueLength();
            this._selectionDirection = "none";
        }
    }
    get textLength() {
        return this.value.length; // code unit length (16 bit)
    }
    get type() {
        return "textarea";
    }
    _dispatchSelectEvent() {
        setTimeout(()=>fireAnEvent("select", this, undefined, {
                bubbles: true,
                cancelable: false
            }), 0);
    }
    _getValueLength() {
        return typeof this.value === "string" ? this.value.length : 0;
    }
    select() {
        this._selectionStart = 0;
        this._selectionEnd = this._getValueLength();
        this._selectionDirection = "none";
        this._dispatchSelectEvent();
    }
    get selectionStart() {
        return this._selectionStart;
    }
    set selectionStart(start) {
        this.setSelectionRange(start, Math.max(start, this._selectionEnd), this._selectionDirection);
    }
    get selectionEnd() {
        return this._selectionEnd;
    }
    set selectionEnd(end) {
        this.setSelectionRange(this._selectionStart, end, this._selectionDirection);
    }
    get selectionDirection() {
        return this._selectionDirection;
    }
    set selectionDirection(dir) {
        this.setSelectionRange(this._selectionStart, this._selectionEnd, dir);
    }
    setSelectionRange(start, end, dir) {
        this._selectionEnd = Math.min(end, this._getValueLength());
        this._selectionStart = Math.min(start, this._selectionEnd);
        this._selectionDirection = dir === "forward" || dir === "backward" ? dir : "none";
        this._dispatchSelectEvent();
    }
    setRangeText(repl, start, end, selectionMode = "preserve") {
        if (arguments.length < 2) {
            start = this._selectionStart;
            end = this._selectionEnd;
        } else if (start > end) {
            throw DOMException.create(this._globalObject, [
                "The index is not in the allowed range.",
                "IndexSizeError"
            ]);
        }
        start = Math.min(start, this._getValueLength());
        end = Math.min(end, this._getValueLength());
        const val = this.value;
        let selStart = this._selectionStart;
        let selEnd = this._selectionEnd;
        this.value = val.slice(0, start) + repl + val.slice(end);
        const newEnd = start + repl.length;
        if (selectionMode === "select") {
            this.setSelectionRange(start, newEnd);
        } else if (selectionMode === "start") {
            this.setSelectionRange(start, start);
        } else if (selectionMode === "end") {
            this.setSelectionRange(newEnd, newEnd);
        } else {
            const delta = repl.length - (end - start);
            if (selStart > end) {
                selStart += delta;
            } else if (selStart > start) {
                selStart = start;
            }
            if (selEnd > end) {
                selEnd += delta;
            } else if (selEnd > start) {
                selEnd = newEnd;
            }
            this.setSelectionRange(selStart, selEnd);
        }
    }
    _barredFromConstraintValidationSpecialization() {
        return this.hasAttributeNS(null, "readonly");
    }
    get _mutable() {
        return !isDisabled(this) && !this.hasAttributeNS(null, "readonly");
    }
    // https://html.spec.whatwg.org/multipage/form-elements.html#attr-textarea-required
    get validity() {
        if (!this._validity) {
            const state = {
                valueMissing: ()=>this.hasAttributeNS(null, "required") && this._mutable && this.value === ""
            };
            this._validity = ValidityState.createImpl(this._globalObject, [], {
                element: this,
                state
            });
        }
        return this._validity;
    }
    [cloningSteps](copy, node) {
        copy._dirtyValue = node._dirtyValue;
        copy._rawValue = node._rawValue;
    }
}
mixin(HTMLTextAreaElementImpl.prototype, DefaultConstraintValidationImpl.prototype);
module.exports = {
    implementation: HTMLTextAreaElementImpl
};
function textareaWrappingTransformation(text, cols) {
    let lineStart = 0;
    let lineEnd = text.indexOf("\n");
    if (lineEnd === -1) {
        lineEnd = text.length;
    }
    while(lineStart < text.length){
        const lineLength = lineEnd - lineStart;
        if (lineLength > cols) {
            // split the line
            lineEnd = lineStart + cols;
            text = text.slice(0, lineEnd) + "\n" + text.slice(lineEnd);
        }
        // move to next line
        lineStart = lineEnd + 1; // step over the newline
        lineEnd = text.indexOf("\n", lineStart);
        if (lineEnd === -1) {
            lineEnd = text.length;
        }
    }
    return text;
}
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLUnknownElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLUnknownElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLUnknownElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLFrameElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const MIMEType = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/mime-type.js [app-ssr] (ecmascript)");
const whatwgEncoding = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-encoding@3.1.1/node_modules/whatwg-encoding/lib/whatwg-encoding.js [app-ssr] (ecmascript)");
const { parseURL, serializeURL } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const sniffHTMLEncoding = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/html-encoding-sniffer@4.0.0/node_modules/html-encoding-sniffer/lib/html-encoding-sniffer.js [app-ssr] (ecmascript)");
const window = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/Window.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const { evaluateJavaScriptURL } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/window/navigation.js [app-ssr] (ecmascript)");
const { parseIntoDocument } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/browser/parser/index.js [app-ssr] (ecmascript)");
const { fireAnEvent } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/events.js [app-ssr] (ecmascript)");
const { getAttributeValue } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/attributes.js [app-ssr] (ecmascript)");
const idlUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/utils.js [app-ssr] (ecmascript)");
function fireLoadEvent(document, frame, attaching) {
    if (attaching) {
        fireAnEvent("load", frame);
        return;
    }
    const dummyPromise = Promise.resolve();
    function onLoad() {
        fireAnEvent("load", frame);
    }
    document._queue.push(dummyPromise, onLoad);
}
function fetchFrame(serializedURL, frame, document, contentDoc) {
    const resourceLoader = document._resourceLoader;
    let request;
    function onFrameLoaded(data) {
        const sniffOptions = {
            defaultEncoding: document._encoding
        };
        if (request.response) {
            const contentType = MIMEType.parse(request.response.headers["content-type"]) || new MIMEType("text/plain");
            sniffOptions.transportLayerEncodingLabel = contentType.parameters.get("charset");
            if (contentType) {
                if (contentType.isXML()) {
                    contentDoc._parsingMode = "xml";
                }
                contentDoc.contentType = contentType.essence;
            }
        }
        const encoding = sniffHTMLEncoding(data, sniffOptions);
        contentDoc._encoding = encoding;
        const html = whatwgEncoding.decode(data, contentDoc._encoding);
        try {
            parseIntoDocument(html, contentDoc);
        } catch (error) {
            const { DOMException } = contentDoc._globalObject;
            if (error.constructor.name === "DOMException" && error.code === DOMException.SYNTAX_ERR && contentDoc._parsingMode === "xml") {
                // As defined (https://html.spec.whatwg.org/#read-xml) parsing error in XML document may be reported inline by
                // mutating the document.
                const element = contentDoc.createElementNS("http://www.mozilla.org/newlayout/xml/parsererror.xml", "parsererror");
                element.textContent = error.message;
                while(contentDoc.childNodes.length > 0){
                    contentDoc.removeChild(contentDoc.lastChild);
                }
                contentDoc.appendChild(element);
            } else {
                throw error;
            }
        }
        contentDoc.close();
        return new Promise((resolve, reject)=>{
            contentDoc.addEventListener("load", resolve);
            contentDoc.addEventListener("error", reject);
        });
    }
    request = resourceLoader.fetch(serializedURL, {
        element: frame,
        onLoad: onFrameLoaded
    });
}
function canDispatchEvents(frame, attaching) {
    if (!attaching) {
        return false;
    }
    return Object.keys(frame._eventListeners).length === 0;
}
function loadFrame(frame, attaching) {
    if (frame._contentDocument) {
        if (frame._contentDocument._defaultView) {
            // close calls delete on its document.
            frame._contentDocument._defaultView.close();
        } else {
            delete frame._contentDocument;
        }
    }
    const parentDoc = frame._ownerDocument;
    // https://html.spec.whatwg.org/#process-the-iframe-attributes
    let url;
    const srcAttribute = getAttributeValue(frame, "src");
    if (srcAttribute === "") {
        url = parseURL("about:blank");
    } else {
        url = parseURL(srcAttribute, {
            baseURL: parentDoc.baseURL() || undefined
        }) || parseURL("about:blank");
    }
    const serializedURL = serializeURL(url);
    const wnd = window.createWindow({
        parsingMode: "html",
        url: url.scheme === "javascript" ? parentDoc.URL : serializedURL,
        parentOrigin: parentDoc._origin,
        resourceLoader: parentDoc._defaultView._resourceLoader,
        referrer: parentDoc.URL,
        cookieJar: parentDoc._cookieJar,
        pool: parentDoc._pool,
        encoding: parentDoc._encoding,
        runScripts: parentDoc._defaultView._runScripts,
        commonForOrigin: parentDoc._defaultView._commonForOrigin,
        pretendToBeVisual: parentDoc._defaultView._pretendToBeVisual
    });
    const contentDoc = frame._contentDocument = idlUtils.implForWrapper(wnd._document);
    const parent = parentDoc._defaultView;
    const contentWindow = contentDoc._defaultView;
    contentWindow._parent = parent;
    contentWindow._top = parent.top;
    contentWindow._frameElement = frame;
    contentWindow._virtualConsole = parent._virtualConsole;
    if (parentDoc._origin === contentDoc._origin) {
        contentWindow._currentOriginData.windowsInSameOrigin.push(contentWindow);
    }
    const noQueue = canDispatchEvents(frame, attaching);
    // Handle about:blank with a simulated load of an empty document.
    if (serializedURL === "about:blank") {
        // Cannot be done inside the enqueued callback; the documentElement etc. need to be immediately available.
        parseIntoDocument("<html><head></head><body></body></html>", contentDoc);
        contentDoc.close(noQueue);
        if (noQueue) {
            fireLoadEvent(parentDoc, frame, noQueue);
        } else {
            contentDoc.addEventListener("load", ()=>{
                fireLoadEvent(parentDoc, frame);
            });
        }
    } else if (url.scheme === "javascript") {
        // Cannot be done inside the enqueued callback; the documentElement etc. need to be immediately available.
        parseIntoDocument("<html><head></head><body></body></html>", contentDoc);
        contentDoc.close(noQueue);
        const result = evaluateJavaScriptURL(contentWindow, url);
        if (typeof result === "string") {
            contentDoc.body.textContent = result;
        }
        if (noQueue) {
            fireLoadEvent(parentDoc, frame, noQueue);
        } else {
            contentDoc.addEventListener("load", ()=>{
                fireLoadEvent(parentDoc, frame);
            });
        }
    } else {
        fetchFrame(serializedURL, frame, parentDoc, contentDoc);
    }
}
function refreshAccessors(document) {
    const { _defaultView } = document;
    if (!_defaultView) {
        return;
    }
    const frames = document.querySelectorAll("iframe,frame");
    // delete accessors for all frames
    for(let i = 0; i < _defaultView._length; ++i){
        delete _defaultView[i];
    }
    _defaultView._length = frames.length;
    for(let i = 0; i < frames.length; ++i){
        const frame = frames.item(i);
        Object.defineProperty(_defaultView, i, {
            configurable: true,
            enumerable: true,
            get () {
                return frame.contentWindow;
            }
        });
    }
}
class HTMLFrameElementImpl extends HTMLElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._contentDocument = null;
    }
    _attrModified(name, value, oldVal) {
        super._attrModified(name, value, oldVal);
        if (name === "src") {
            // iframe should never load in a document without a Window
            // (e.g. implementation.createHTMLDocument)
            if (this._attached && this._ownerDocument._defaultView) {
                loadFrame(this);
            }
        }
    }
    _detach() {
        super._detach();
        if (this.contentWindow) {
            // TODO: this is not really correct behavior, because jsdom's window.close() is very aggressive and is meant for
            // killing off the whole jsdom, not just moving the Window to a no-browsing-context state.
            //
            // If we revise this in the future, be sure to also invalidate the base URL cache.
            this.contentWindow.close();
        }
        refreshAccessors(this._ownerDocument);
    }
    _attach() {
        super._attach();
        if (this._ownerDocument._defaultView) {
            loadFrame(this, true);
        }
        refreshAccessors(this._ownerDocument);
    }
    get contentDocument() {
        return this._contentDocument;
    }
    get contentWindow() {
        return this.contentDocument ? this.contentDocument._defaultView : null;
    }
}
module.exports = {
    implementation: HTMLFrameElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLFrameSetElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const WindowEventHandlersImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/WindowEventHandlers-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLFrameSetElementImpl extends HTMLElementImpl {
    constructor(...args){
        super(...args);
        this._proxyWindowEventsToWindow();
    }
}
mixin(HTMLFrameSetElementImpl.prototype, WindowEventHandlersImpl.prototype);
module.exports = {
    implementation: HTMLFrameSetElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLIFrameElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLFrameElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLFrameElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLIFrameElementImpl extends HTMLFrameElementImpl {
}
module.exports = {
    implementation: HTMLIFrameElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLEmbedElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLEmbedElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLEmbedElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLObjectElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
const DefaultConstraintValidationImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/constraint-validation/DefaultConstraintValidation-impl.js [app-ssr] (ecmascript)").implementation;
const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const { formOwner } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/form-controls.js [app-ssr] (ecmascript)");
class HTMLObjectElementImpl extends HTMLElementImpl {
    get form() {
        return formOwner(this);
    }
    get contentDocument() {
        return null;
    }
    _barredFromConstraintValidationSpecialization() {
        return true;
    }
}
mixin(HTMLObjectElementImpl.prototype, DefaultConstraintValidationImpl.prototype);
module.exports = {
    implementation: HTMLObjectElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLParamElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLParamElementImpl extends HTMLElementImpl {
}
module.exports = {
    implementation: HTMLParamElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLVideoElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLMediaElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLMediaElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLVideoElementImpl extends HTMLMediaElementImpl {
    get videoWidth() {
        return 0;
    }
    get videoHeight() {
        return 0;
    }
}
module.exports = {
    implementation: HTMLVideoElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLAudioElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLMediaElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLMediaElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLAudioElementImpl extends HTMLMediaElementImpl {
}
module.exports = {
    implementation: HTMLAudioElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLTrackElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HTMLElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js [app-ssr] (ecmascript)").implementation;
class HTMLTrackElementImpl extends HTMLElementImpl {
    get readyState() {
        return 0;
    }
}
module.exports = {
    implementation: HTMLTrackElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { SVG_NS } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/namespaces.js [app-ssr] (ecmascript)");
const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const ElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/Element-impl.js [app-ssr] (ecmascript)").implementation;
const ElementCSSInlineStyleImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/ElementCSSInlineStyle-impl.js [app-ssr] (ecmascript)").implementation;
const GlobalEventHandlersImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/GlobalEventHandlers-impl.js [app-ssr] (ecmascript)").implementation;
const HTMLOrSVGElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/HTMLOrSVGElement-impl.js [app-ssr] (ecmascript)").implementation;
class SVGElementImpl extends ElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._initHTMLOrSVGElement();
        this._initElementCSSInlineStyle();
        this._initGlobalEvents();
    }
    // Keep in sync with HTMLElement. https://github.com/jsdom/jsdom/issues/2599
    _attrModified(name, value, oldValue) {
        if (name === "style" && value !== oldValue && !this._settingCssText) {
            this._settingCssText = true;
            this._style.cssText = value;
            this._settingCssText = false;
        } else if (name.startsWith("on")) {
            this._globalEventChanged(name.substring(2));
        }
        super._attrModified(name, value, oldValue);
    }
    get ownerSVGElement() {
        let e = domSymbolTree.parent(this);
        while(e && e.namespaceURI === SVG_NS){
            if (e.localName === "svg") {
                return e;
            }
            e = domSymbolTree.parent(e);
        }
        return null;
    }
    get viewportElement() {
        // Get the nearest ancestor that establishes the viewport.
        // https://svgwg.org/svg2-draft/coords.html#EstablishingANewSVGViewport
        let e = domSymbolTree.parent(this);
        while(e && e.namespaceURI === SVG_NS){
            if (e.localName === "svg" || e.localName === "symbol") {
                return e;
            }
            e = domSymbolTree.parent(e);
        }
        return null;
    }
}
SVGElementImpl.attributeRegistry = new Map();
mixin(SVGElementImpl.prototype, ElementCSSInlineStyleImpl.prototype);
mixin(SVGElementImpl.prototype, GlobalEventHandlersImpl.prototype);
mixin(SVGElementImpl.prototype, HTMLOrSVGElementImpl.prototype);
exports.implementation = SVGElementImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGTests-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { splitOnASCIIWhitespace, splitOnCommas } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/strings.js [app-ssr] (ecmascript)");
const { reserializeCommaSeparatedTokens, reserializeSpaceSeparatedTokens } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/svg/basic-types.js [app-ssr] (ecmascript)");
const SVGStringList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGStringList.js [app-ssr] (ecmascript)");
class SVGTestsImpl {
    get requiredExtensions() {
        return SVGStringList.createImpl(this._globalObject, [], {
            element: this,
            attribute: "requiredExtensions"
        });
    }
    get systemLanguage() {
        return SVGStringList.createImpl(this._globalObject, [], {
            element: this,
            attribute: "systemLanguage"
        });
    }
}
SVGTestsImpl.attributeRegistry = new Map([
    // https://svgwg.org/svg2-draft/struct.html#RequiredExtensionsAttribute
    [
        "requiredExtensions",
        {
            getValue: splitOnASCIIWhitespace,
            serialize: reserializeSpaceSeparatedTokens,
            initialValue: undefined
        }
    ],
    // https://svgwg.org/svg2-draft/struct.html#SystemLanguageAttribute
    [
        "systemLanguage",
        {
            getValue: splitOnCommas,
            serialize: reserializeCommaSeparatedTokens,
            initialValue: undefined
        }
    ]
]);
exports.implementation = SVGTestsImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGGraphicsElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const SVGElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGElement-impl.js [app-ssr] (ecmascript)").implementation;
const SVGTestsImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGTests-impl.js [app-ssr] (ecmascript)").implementation;
class SVGGraphicsElementImpl extends SVGElementImpl {
}
SVGGraphicsElementImpl.attributeRegistry = new Map([
    ...SVGElementImpl.attributeRegistry,
    ...SVGTestsImpl.attributeRegistry
]);
mixin(SVGGraphicsElementImpl.prototype, SVGTestsImpl.prototype);
exports.implementation = SVGGraphicsElementImpl;
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGSVGElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { mixin } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/utils.js [app-ssr] (ecmascript)");
const SVGNumber = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGNumber.js [app-ssr] (ecmascript)");
const SVGRect = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/generated/SVGRect.js [app-ssr] (ecmascript)");
const SVGGraphicsElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGGraphicsElement-impl.js [app-ssr] (ecmascript)").implementation;
const WindowEventHandlersImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/WindowEventHandlers-impl.js [app-ssr] (ecmascript)").implementation;
const { domSymbolTree } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/helpers/internal-constants.js [app-ssr] (ecmascript)");
const { ELEMENT_NODE } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/node-type.js [app-ssr] (ecmascript)");
class SVGSVGElementImpl extends SVGGraphicsElementImpl {
    constructor(globalObject, args, privateData){
        super(globalObject, args, privateData);
        this._proxyWindowEventsToWindow();
    }
    createSVGNumber() {
        return SVGNumber.createImpl(this._globalObject, [], {});
    }
    createSVGRect() {
        return SVGRect.createImpl(this._globalObject, [], {});
    }
    getElementById(elementId) {
        // TODO: optimize with _ids caching trick; see Document class.
        for (const node of domSymbolTree.treeIterator(this)){
            if (node.nodeType === ELEMENT_NODE && node.getAttributeNS(null, "id") === elementId) {
                return node;
            }
        }
        return null;
    }
    suspendRedraw() {
        return 1;
    }
    unsuspendRedraw() {}
    unsuspendRedrawAll() {}
    forceRedraw() {}
}
mixin(SVGSVGElementImpl.prototype, WindowEventHandlersImpl.prototype);
module.exports = {
    implementation: SVGSVGElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGGElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SVGGraphicsElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGGraphicsElement-impl.js [app-ssr] (ecmascript)").implementation;
class SVGGElementImpl extends SVGGraphicsElementImpl {
}
module.exports = {
    implementation: SVGGElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGDefsElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SVGGraphicsElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGGraphicsElement-impl.js [app-ssr] (ecmascript)").implementation;
class SVGDefsElementImpl extends SVGGraphicsElementImpl {
}
module.exports = {
    implementation: SVGDefsElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGDescElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SVGElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGElement-impl.js [app-ssr] (ecmascript)").implementation;
class SVGDescElementImpl extends SVGElementImpl {
}
module.exports = {
    implementation: SVGDescElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGMetadataElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SVGElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGElement-impl.js [app-ssr] (ecmascript)").implementation;
class SVGMetadataElementImpl extends SVGElementImpl {
}
module.exports = {
    implementation: SVGMetadataElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGTitleElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SVGElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGElement-impl.js [app-ssr] (ecmascript)").implementation;
class SVGTitleElementImpl extends SVGElementImpl {
}
module.exports = {
    implementation: SVGTitleElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGSymbolElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SVGGraphicsElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGGraphicsElement-impl.js [app-ssr] (ecmascript)").implementation;
class SVGSymbolElementImpl extends SVGGraphicsElementImpl {
}
module.exports = {
    implementation: SVGSymbolElementImpl
};
}),
"[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGSwitchElement-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const SVGGraphicsElementImpl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/jsdom@26.1.0/node_modules/jsdom/lib/jsdom/living/nodes/SVGGraphicsElement-impl.js [app-ssr] (ecmascript)").implementation;
class SVGSwitchElementImpl extends SVGGraphicsElementImpl {
}
module.exports = {
    implementation: SVGSwitchElementImpl
};
}),
];

//# sourceMappingURL=d19db_jsdom_lib_jsdom_living_nodes_872644f9._.js.map