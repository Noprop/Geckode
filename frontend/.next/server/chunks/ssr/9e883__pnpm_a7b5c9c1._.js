module.exports = [
"[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxRuntime; //# sourceMappingURL=react-jsx-runtime.js.map
}),
"[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
"[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This has to be a shared module which is shared between client component error boundary and dynamic component
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    BailoutToCSRError: null,
    isBailoutToCSRError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BailoutToCSRError: function() {
        return BailoutToCSRError;
    },
    isBailoutToCSRError: function() {
        return isBailoutToCSRError;
    }
});
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
class BailoutToCSRError extends Error {
    constructor(reason){
        super("Bail out to client-side rendering: " + reason), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} //# sourceMappingURL=bailout-to-csr.js.map
}),
"[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BailoutToCSR", {
    enumerable: true,
    get: function() {
        return BailoutToCSR;
    }
});
const _bailouttocsr = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-ssr] (ecmascript)");
function BailoutToCSR(param) {
    let { reason, children } = param;
    if ("TURBOPACK compile-time truthy", 1) {
        throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(reason), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    return children;
} //# sourceMappingURL=dynamic-bailout-to-csr.js.map
}),
"[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactDOM; //# sourceMappingURL=react-dom.js.map
}),
"[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/encode-uri-path.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "encodeURIPath", {
    enumerable: true,
    get: function() {
        return encodeURIPath;
    }
});
function encodeURIPath(file) {
    return file.split('/').map((p)=>encodeURIComponent(p)).join('/');
} //# sourceMappingURL=encode-uri-path.js.map
}),
"[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PreloadChunks", {
    enumerable: true,
    get: function() {
        return PreloadChunks;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
const _reactdom = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
const _workasyncstorageexternal = __turbopack_context__.r("[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)");
const _encodeuripath = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/encode-uri-path.js [app-ssr] (ecmascript)");
function PreloadChunks(param) {
    let { moduleIds } = param;
    // Early return in client compilation and only load requestStore on server side
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (workStore === undefined) {
        return null;
    }
    const allFiles = [];
    // Search the current dynamic call unique key id in react loadable manifest,
    // and find the corresponding CSS files to preload
    if (workStore.reactLoadableManifest && moduleIds) {
        const manifest = workStore.reactLoadableManifest;
        for (const key of moduleIds){
            if (!manifest[key]) continue;
            const chunks = manifest[key].files;
            allFiles.push(...chunks);
        }
    }
    if (allFiles.length === 0) {
        return null;
    }
    const dplId = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : '';
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: allFiles.map((chunk)=>{
            const href = workStore.assetPrefix + "/_next/" + (0, _encodeuripath.encodeURIPath)(chunk) + dplId;
            const isCss = chunk.endsWith('.css');
            // If it's stylesheet we use `precedence` o help hoist with React Float.
            // For stylesheets we actually need to render the CSS because nothing else is going to do it so it needs to be part of the component tree.
            // The `preload` for stylesheet is not optional.
            if (isCss) {
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
                    // @ts-ignore
                    precedence: "dynamic",
                    href: href,
                    rel: "stylesheet",
                    as: "style"
                }, chunk);
            } else {
                // If it's script we use ReactDOM.preload to preload the resources
                (0, _reactdom.preload)(href, {
                    as: 'script',
                    fetchPriority: 'low'
                });
                return null;
            }
        })
    });
} //# sourceMappingURL=preload-chunks.js.map
}),
"[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _jsxruntime = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
const _react = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
const _dynamicbailouttocsr = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-bailout-to-csr.js [app-ssr] (ecmascript)");
const _preloadchunks = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/lazy-dynamic/preload-chunks.js [app-ssr] (ecmascript)");
// Normalize loader to return the module as form { default: Component } for `React.lazy`.
// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
// Client component reference proxy need to be converted to a module.
function convertModule(mod) {
    // Check "default" prop before accessing it, as it could be client reference proxy that could break it reference.
    // Cases:
    // mod: { default: Component }
    // mod: Component
    // mod: { default: proxy(Component) }
    // mod: proxy(Component)
    const hasDefault = mod && 'default' in mod;
    return {
        default: hasDefault ? mod.default : mod
    };
}
const defaultOptions = {
    loader: ()=>Promise.resolve(convertModule(()=>null)),
    loading: null,
    ssr: true
};
function Loadable(options) {
    const opts = {
        ...defaultOptions,
        ...options
    };
    const Lazy = /*#__PURE__*/ (0, _react.lazy)(()=>opts.loader().then(convertModule));
    const Loading = opts.loading;
    function LoadableComponent(props) {
        const fallbackElement = Loading ? /*#__PURE__*/ (0, _jsxruntime.jsx)(Loading, {
            isLoading: true,
            pastDelay: true,
            error: null
        }) : null;
        // If it's non-SSR or provided a loading component, wrap it in a suspense boundary
        const hasSuspenseBoundary = !opts.ssr || !!opts.loading;
        const Wrap = hasSuspenseBoundary ? _react.Suspense : _react.Fragment;
        const wrapProps = hasSuspenseBoundary ? {
            fallback: fallbackElement
        } : {};
        const children = opts.ssr ? /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
                ("TURBOPACK compile-time truthy", 1) ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_preloadchunks.PreloadChunks, {
                    moduleIds: opts.modules
                }) : "TURBOPACK unreachable",
                /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                    ...props
                })
            ]
        }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_dynamicbailouttocsr.BailoutToCSR, {
            reason: "next/dynamic",
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(Lazy, {
                ...props
            })
        });
        return /*#__PURE__*/ (0, _jsxruntime.jsx)(Wrap, {
            ...wrapProps,
            children: children
        });
    }
    LoadableComponent.displayName = 'LoadableComponent';
    return LoadableComponent;
}
const _default = Loadable; //# sourceMappingURL=loadable.js.map
}),
"[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return dynamic;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)");
const _loadable = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/frontend/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/shared/lib/lazy-dynamic/loadable.js [app-ssr] (ecmascript)"));
function dynamic(dynamicOptions, options) {
    var _mergedOptions_loadableGenerated;
    const loadableOptions = {};
    if (typeof dynamicOptions === 'function') {
        loadableOptions.loader = dynamicOptions;
    }
    const mergedOptions = {
        ...loadableOptions,
        ...options
    };
    return (0, _loadable.default)({
        ...mergedOptions,
        modules: (_mergedOptions_loadableGenerated = mergedOptions.loadableGenerated) == null ? void 0 : _mergedOptions_loadableGenerated.modules
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-dynamic.js.map
}),
"[project]/frontend/node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/domain.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Check if `vhost` is a valid suffix of `hostname` (top-domain)
 *
 * It means that `vhost` needs to be a suffix of `hostname` and we then need to
 * make sure that: either they are equal, or the character preceding `vhost` in
 * `hostname` is a '.' (it should not be a partial label).
 *
 * * hostname = 'not.evil.com' and vhost = 'vil.com'      => not ok
 * * hostname = 'not.evil.com' and vhost = 'evil.com'     => ok
 * * hostname = 'not.evil.com' and vhost = 'not.evil.com' => ok
 */ __turbopack_context__.s([
    "default",
    ()=>getDomain
]);
function shareSameDomainSuffix(hostname, vhost) {
    if (hostname.endsWith(vhost)) {
        return hostname.length === vhost.length || hostname[hostname.length - vhost.length - 1] === '.';
    }
    return false;
}
/**
 * Given a hostname and its public suffix, extract the general domain.
 */ function extractDomainWithSuffix(hostname, publicSuffix) {
    // Locate the index of the last '.' in the part of the `hostname` preceding
    // the public suffix.
    //
    // examples:
    //   1. not.evil.co.uk  => evil.co.uk
    //         ^    ^
    //         |    | start of public suffix
    //         | index of the last dot
    //
    //   2. example.co.uk   => example.co.uk
    //     ^       ^
    //     |       | start of public suffix
    //     |
    //     | (-1) no dot found before the public suffix
    const publicSuffixIndex = hostname.length - publicSuffix.length - 2;
    const lastDotBeforeSuffixIndex = hostname.lastIndexOf('.', publicSuffixIndex);
    // No '.' found, then `hostname` is the general domain (no sub-domain)
    if (lastDotBeforeSuffixIndex === -1) {
        return hostname;
    }
    // Extract the part between the last '.'
    return hostname.slice(lastDotBeforeSuffixIndex + 1);
}
function getDomain(suffix, hostname, options) {
    // Check if `hostname` ends with a member of `validHosts`.
    if (options.validHosts !== null) {
        const validHosts = options.validHosts;
        for (const vhost of validHosts){
            if (/*@__INLINE__*/ shareSameDomainSuffix(hostname, vhost)) {
                return vhost;
            }
        }
    }
    let numberOfLeadingDots = 0;
    if (hostname.startsWith('.')) {
        while(numberOfLeadingDots < hostname.length && hostname[numberOfLeadingDots] === '.'){
            numberOfLeadingDots += 1;
        }
    }
    // If `hostname` is a valid public suffix, then there is no domain to return.
    // Since we already know that `getPublicSuffix` returns a suffix of `hostname`
    // there is no need to perform a string comparison and we only compare the
    // size.
    if (suffix.length === hostname.length - numberOfLeadingDots) {
        return null;
    }
    // To extract the general domain, we start by identifying the public suffix
    // (if any), then consider the domain to be the public suffix with one added
    // level of depth. (e.g.: if hostname is `not.evil.co.uk` and public suffix:
    // `co.uk`, then we take one more level: `evil`, giving the final result:
    // `evil.co.uk`).
    return /*@__INLINE__*/ extractDomainWithSuffix(hostname, suffix);
} //# sourceMappingURL=domain.js.map
}),
"[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/domain-without-suffix.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Return the part of domain without suffix.
 *
 * Example: for domain 'foo.com', the result would be 'foo'.
 */ __turbopack_context__.s([
    "default",
    ()=>getDomainWithoutSuffix
]);
function getDomainWithoutSuffix(domain, suffix) {
    // Note: here `domain` and `suffix` cannot have the same length because in
    // this case we set `domain` to `null` instead. It is thus safe to assume
    // that `suffix` is shorter than `domain`.
    return domain.slice(0, -suffix.length - 1);
} //# sourceMappingURL=domain-without-suffix.js.map
}),
"[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/extract-hostname.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @param url - URL we want to extract a hostname from.
 * @param urlIsValidHostname - hint from caller; true if `url` is already a valid hostname.
 */ __turbopack_context__.s([
    "default",
    ()=>extractHostname
]);
function extractHostname(url, urlIsValidHostname) {
    let start = 0;
    let end = url.length;
    let hasUpper = false;
    // If url is not already a valid hostname, then try to extract hostname.
    if (!urlIsValidHostname) {
        // Special handling of data URLs
        if (url.startsWith('data:')) {
            return null;
        }
        // Trim leading spaces
        while(start < url.length && url.charCodeAt(start) <= 32){
            start += 1;
        }
        // Trim trailing spaces
        while(end > start + 1 && url.charCodeAt(end - 1) <= 32){
            end -= 1;
        }
        // Skip scheme.
        if (url.charCodeAt(start) === 47 /* '/' */  && url.charCodeAt(start + 1) === 47 /* '/' */ ) {
            start += 2;
        } else {
            const indexOfProtocol = url.indexOf(':/', start);
            if (indexOfProtocol !== -1) {
                // Implement fast-path for common protocols. We expect most protocols
                // should be one of these 4 and thus we will not need to perform the
                // more expansive validity check most of the time.
                const protocolSize = indexOfProtocol - start;
                const c0 = url.charCodeAt(start);
                const c1 = url.charCodeAt(start + 1);
                const c2 = url.charCodeAt(start + 2);
                const c3 = url.charCodeAt(start + 3);
                const c4 = url.charCodeAt(start + 4);
                if (protocolSize === 5 && c0 === 104 /* 'h' */  && c1 === 116 /* 't' */  && c2 === 116 /* 't' */  && c3 === 112 /* 'p' */  && c4 === 115 /* 's' */ ) {
                // https
                } else if (protocolSize === 4 && c0 === 104 /* 'h' */  && c1 === 116 /* 't' */  && c2 === 116 /* 't' */  && c3 === 112 /* 'p' */ ) {
                // http
                } else if (protocolSize === 3 && c0 === 119 /* 'w' */  && c1 === 115 /* 's' */  && c2 === 115 /* 's' */ ) {
                // wss
                } else if (protocolSize === 2 && c0 === 119 /* 'w' */  && c1 === 115 /* 's' */ ) {
                // ws
                } else {
                    // Check that scheme is valid
                    for(let i = start; i < indexOfProtocol; i += 1){
                        const lowerCaseCode = url.charCodeAt(i) | 32;
                        if (!(lowerCaseCode >= 97 && lowerCaseCode <= 122 || lowerCaseCode >= 48 && lowerCaseCode <= 57 || // [0, 9]
                        lowerCaseCode === 46 || // '.'
                        lowerCaseCode === 45 || // '-'
                        lowerCaseCode === 43) // '+'
                        ) {
                            return null;
                        }
                    }
                }
                // Skip 0, 1 or more '/' after ':/'
                start = indexOfProtocol + 2;
                while(url.charCodeAt(start) === 47 /* '/' */ ){
                    start += 1;
                }
            }
        }
        // Detect first occurrence of '/', '?' or '#'. We also keep track of the
        // last occurrence of '@', ']' or ':' to speed-up subsequent parsing of
        // (respectively), identifier, ipv6 or port.
        let indexOfIdentifier = -1;
        let indexOfClosingBracket = -1;
        let indexOfPort = -1;
        for(let i = start; i < end; i += 1){
            const code = url.charCodeAt(i);
            if (code === 35 || // '#'
            code === 47 || // '/'
            code === 63 // '?'
            ) {
                end = i;
                break;
            } else if (code === 64) {
                // '@'
                indexOfIdentifier = i;
            } else if (code === 93) {
                // ']'
                indexOfClosingBracket = i;
            } else if (code === 58) {
                // ':'
                indexOfPort = i;
            } else if (code >= 65 && code <= 90) {
                hasUpper = true;
            }
        }
        // Detect identifier: '@'
        if (indexOfIdentifier !== -1 && indexOfIdentifier > start && indexOfIdentifier < end) {
            start = indexOfIdentifier + 1;
        }
        // Handle ipv6 addresses
        if (url.charCodeAt(start) === 91 /* '[' */ ) {
            if (indexOfClosingBracket !== -1) {
                return url.slice(start + 1, indexOfClosingBracket).toLowerCase();
            }
            return null;
        } else if (indexOfPort !== -1 && indexOfPort > start && indexOfPort < end) {
            // Detect port: ':'
            end = indexOfPort;
        }
    }
    // Trim trailing dots
    while(end > start + 1 && url.charCodeAt(end - 1) === 46 /* '.' */ ){
        end -= 1;
    }
    const hostname = start !== 0 || end !== url.length ? url.slice(start, end) : url;
    if (hasUpper) {
        return hostname.toLowerCase();
    }
    return hostname;
} //# sourceMappingURL=extract-hostname.js.map
}),
"[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/is-ip.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Check if a hostname is an IP. You should be aware that this only works
 * because `hostname` is already garanteed to be a valid hostname!
 */ __turbopack_context__.s([
    "default",
    ()=>isIp
]);
function isProbablyIpv4(hostname) {
    // Cannot be shorted than 1.1.1.1
    if (hostname.length < 7) {
        return false;
    }
    // Cannot be longer than: 255.255.255.255
    if (hostname.length > 15) {
        return false;
    }
    let numberOfDots = 0;
    for(let i = 0; i < hostname.length; i += 1){
        const code = hostname.charCodeAt(i);
        if (code === 46 /* '.' */ ) {
            numberOfDots += 1;
        } else if (code < 48 /* '0' */  || code > 57 /* '9' */ ) {
            return false;
        }
    }
    return numberOfDots === 3 && hostname.charCodeAt(0) !== 46 /* '.' */  && hostname.charCodeAt(hostname.length - 1) !== 46 /* '.' */ ;
}
/**
 * Similar to isProbablyIpv4.
 */ function isProbablyIpv6(hostname) {
    if (hostname.length < 3) {
        return false;
    }
    let start = hostname.startsWith('[') ? 1 : 0;
    let end = hostname.length;
    if (hostname[end - 1] === ']') {
        end -= 1;
    }
    // We only consider the maximum size of a normal IPV6. Note that this will
    // fail on so-called "IPv4 mapped IPv6 addresses" but this is a corner-case
    // and a proper validation library should be used for these.
    if (end - start > 39) {
        return false;
    }
    let hasColon = false;
    for(; start < end; start += 1){
        const code = hostname.charCodeAt(start);
        if (code === 58 /* ':' */ ) {
            hasColon = true;
        } else if (!(code >= 48 && code <= 57 || code >= 97 && code <= 102 || code >= 65 && code <= 90) // A-F
        ) {
            return false;
        }
    }
    return hasColon;
}
function isIp(hostname) {
    return isProbablyIpv6(hostname) || isProbablyIpv4(hostname);
} //# sourceMappingURL=is-ip.js.map
}),
"[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/is-valid.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Implements fast shallow verification of hostnames. This does not perform a
 * struct check on the content of labels (classes of Unicode characters, etc.)
 * but instead check that the structure is valid (number of labels, length of
 * labels, etc.).
 *
 * If you need stricter validation, consider using an external library.
 */ __turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
function isValidAscii(code) {
    return code >= 97 && code <= 122 || code >= 48 && code <= 57 || code > 127;
}
function __TURBOPACK__default__export__(hostname) {
    if (hostname.length > 255) {
        return false;
    }
    if (hostname.length === 0) {
        return false;
    }
    if (/*@__INLINE__*/ !isValidAscii(hostname.charCodeAt(0)) && hostname.charCodeAt(0) !== 46 && // '.' (dot)
    hostname.charCodeAt(0) !== 95 // '_' (underscore)
    ) {
        return false;
    }
    // Validate hostname according to RFC
    let lastDotIndex = -1;
    let lastCharCode = -1;
    const len = hostname.length;
    for(let i = 0; i < len; i += 1){
        const code = hostname.charCodeAt(i);
        if (code === 46 /* '.' */ ) {
            if (// Check that previous label is < 63 bytes long (64 = 63 + '.')
            i - lastDotIndex > 64 || // Check that previous character was not already a '.'
            lastCharCode === 46 || // Check that the previous label does not end with a '-' (dash)
            lastCharCode === 45 || // Check that the previous label does not end with a '_' (underscore)
            lastCharCode === 95) {
                return false;
            }
            lastDotIndex = i;
        } else if (!/*@__INLINE__*/ (isValidAscii(code) || code === 45 || code === 95)) {
            // Check if there is a forbidden character in the label
            return false;
        }
        lastCharCode = code;
    }
    return(// Check that last label is shorter than 63 chars
    len - lastDotIndex - 1 <= 63 && // Check that the last character is an allowed trailing label character.
    // Since we already checked that the char is a valid hostname character,
    // we only need to check that it's different from '-'.
    lastCharCode !== 45);
} //# sourceMappingURL=is-valid.js.map
}),
"[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/options.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setDefaults",
    ()=>setDefaults
]);
function setDefaultsImpl({ allowIcannDomains = true, allowPrivateDomains = false, detectIp = true, extractHostname = true, mixedInputs = true, validHosts = null, validateHostname = true }) {
    return {
        allowIcannDomains,
        allowPrivateDomains,
        detectIp,
        extractHostname,
        mixedInputs,
        validHosts,
        validateHostname
    };
}
const DEFAULT_OPTIONS = /*@__INLINE__*/ setDefaultsImpl({});
function setDefaults(options) {
    if (options === undefined) {
        return DEFAULT_OPTIONS;
    }
    return /*@__INLINE__*/ setDefaultsImpl(options);
} //# sourceMappingURL=options.js.map
}),
"[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/subdomain.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Returns the subdomain of a hostname string
 */ __turbopack_context__.s([
    "default",
    ()=>getSubdomain
]);
function getSubdomain(hostname, domain) {
    // If `hostname` and `domain` are the same, then there is no sub-domain
    if (domain.length === hostname.length) {
        return '';
    }
    return hostname.slice(0, -domain.length - 1);
} //# sourceMappingURL=subdomain.js.map
}),
"[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/factory.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Implement a factory allowing to plug different implementations of suffix
 * lookup (e.g.: using a trie or the packed hashes datastructures). This is used
 * and exposed in `tldts.ts` and `tldts-experimental.ts` bundle entrypoints.
 */ __turbopack_context__.s([
    "getEmptyResult",
    ()=>getEmptyResult,
    "parseImpl",
    ()=>parseImpl,
    "resetResult",
    ()=>resetResult
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$domain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/domain.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$domain$2d$without$2d$suffix$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/domain-without-suffix.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$extract$2d$hostname$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/extract-hostname.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$is$2d$ip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/is-ip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$is$2d$valid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/is-valid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$options$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/options.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$subdomain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/subdomain.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
function getEmptyResult() {
    return {
        domain: null,
        domainWithoutSuffix: null,
        hostname: null,
        isIcann: null,
        isIp: null,
        isPrivate: null,
        publicSuffix: null,
        subdomain: null
    };
}
function resetResult(result) {
    result.domain = null;
    result.domainWithoutSuffix = null;
    result.hostname = null;
    result.isIcann = null;
    result.isIp = null;
    result.isPrivate = null;
    result.publicSuffix = null;
    result.subdomain = null;
}
function parseImpl(url, step, suffixLookup, partialOptions, result) {
    const options = /*@__INLINE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$options$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setDefaults"])(partialOptions);
    // Very fast approximate check to make sure `url` is a string. This is needed
    // because the library will not necessarily be used in a typed setup and
    // values of arbitrary types might be given as argument.
    if (typeof url !== 'string') {
        return result;
    }
    // Extract hostname from `url` only if needed. This can be made optional
    // using `options.extractHostname`. This option will typically be used
    // whenever we are sure the inputs to `parse` are already hostnames and not
    // arbitrary URLs.
    //
    // `mixedInput` allows to specify if we expect a mix of URLs and hostnames
    // as input. If only hostnames are expected then `extractHostname` can be
    // set to `false` to speed-up parsing. If only URLs are expected then
    // `mixedInputs` can be set to `false`. The `mixedInputs` is only a hint
    // and will not change the behavior of the library.
    if (!options.extractHostname) {
        result.hostname = url;
    } else if (options.mixedInputs) {
        result.hostname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$extract$2d$hostname$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(url, (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$is$2d$valid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(url));
    } else {
        result.hostname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$extract$2d$hostname$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(url, false);
    }
    if (step === 0 /* FLAG.HOSTNAME */  || result.hostname === null) {
        return result;
    }
    // Check if `hostname` is a valid ip address
    if (options.detectIp) {
        result.isIp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$is$2d$ip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(result.hostname);
        if (result.isIp) {
            return result;
        }
    }
    // Perform optional hostname validation. If hostname is not valid, no need to
    // go further as there will be no valid domain or sub-domain.
    if (options.validateHostname && options.extractHostname && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$is$2d$valid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(result.hostname)) {
        result.hostname = null;
        return result;
    }
    // Extract public suffix
    suffixLookup(result.hostname, options, result);
    if (step === 2 /* FLAG.PUBLIC_SUFFIX */  || result.publicSuffix === null) {
        return result;
    }
    // Extract domain
    result.domain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$domain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(result.publicSuffix, result.hostname, options);
    if (step === 3 /* FLAG.DOMAIN */  || result.domain === null) {
        return result;
    }
    // Extract subdomain
    result.subdomain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$subdomain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(result.hostname, result.domain);
    if (step === 4 /* FLAG.SUB_DOMAIN */ ) {
        return result;
    }
    // Extract domain without suffix
    result.domainWithoutSuffix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$domain$2d$without$2d$suffix$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(result.domain, result.publicSuffix);
    return result;
} //# sourceMappingURL=factory.js.map
}),
"[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/lookup/fast-path.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
function __TURBOPACK__default__export__(hostname, options, out) {
    // Fast path for very popular suffixes; this allows to by-pass lookup
    // completely as well as any extra allocation or string manipulation.
    if (!options.allowPrivateDomains && hostname.length > 3) {
        const last = hostname.length - 1;
        const c3 = hostname.charCodeAt(last);
        const c2 = hostname.charCodeAt(last - 1);
        const c1 = hostname.charCodeAt(last - 2);
        const c0 = hostname.charCodeAt(last - 3);
        if (c3 === 109 /* 'm' */  && c2 === 111 /* 'o' */  && c1 === 99 /* 'c' */  && c0 === 46 /* '.' */ ) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'com';
            return true;
        } else if (c3 === 103 /* 'g' */  && c2 === 114 /* 'r' */  && c1 === 111 /* 'o' */  && c0 === 46 /* '.' */ ) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'org';
            return true;
        } else if (c3 === 117 /* 'u' */  && c2 === 100 /* 'd' */  && c1 === 101 /* 'e' */  && c0 === 46 /* '.' */ ) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'edu';
            return true;
        } else if (c3 === 118 /* 'v' */  && c2 === 111 /* 'o' */  && c1 === 103 /* 'g' */  && c0 === 46 /* '.' */ ) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'gov';
            return true;
        } else if (c3 === 116 /* 't' */  && c2 === 101 /* 'e' */  && c1 === 110 /* 'n' */  && c0 === 46 /* '.' */ ) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'net';
            return true;
        } else if (c3 === 101 /* 'e' */  && c2 === 100 /* 'd' */  && c1 === 46 /* '.' */ ) {
            out.isIcann = true;
            out.isPrivate = false;
            out.publicSuffix = 'de';
            return true;
        }
    }
    return false;
} //# sourceMappingURL=fast-path.js.map
}),
"[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/factory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$lookup$2f$fast$2d$path$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/lookup/fast-path.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$options$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/options.js [app-ssr] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
}),
"[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/lookup/fast-path.js [app-ssr] (ecmascript) <export default as fastPathLookup>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fastPathLookup",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$lookup$2f$fast$2d$path$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$tldts$2d$core$40$6$2e$1$2e$86$2f$node_modules$2f$tldts$2d$core$2f$dist$2f$es6$2f$src$2f$lookup$2f$fast$2d$path$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/tldts-core@6.1.86/node_modules/tldts-core/dist/es6/src/lookup/fast-path.js [app-ssr] (ecmascript)");
}),
"[project]/frontend/node_modules/.pnpm/safer-buffer@2.1.2/node_modules/safer-buffer/safer.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable node/no-deprecated-api */ var buffer = __turbopack_context__.r("[externals]/buffer [external] (buffer, cjs)");
var Buffer = buffer.Buffer;
var safer = {};
var key;
for(key in buffer){
    if (!buffer.hasOwnProperty(key)) continue;
    if (key === 'SlowBuffer' || key === 'Buffer') continue;
    safer[key] = buffer[key];
}
var Safer = safer.Buffer = {};
for(key in Buffer){
    if (!Buffer.hasOwnProperty(key)) continue;
    if (key === 'allocUnsafe' || key === 'allocUnsafeSlow') continue;
    Safer[key] = Buffer[key];
}
safer.Buffer.prototype = Buffer.prototype;
if (!Safer.from || Safer.from === Uint8Array.from) {
    Safer.from = function(value, encodingOrOffset, length) {
        if (typeof value === 'number') {
            throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof value);
        }
        if (value && typeof value.length === 'undefined') {
            throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof value);
        }
        return Buffer(value, encodingOrOffset, length);
    };
}
if (!Safer.alloc) {
    Safer.alloc = function(size, fill, encoding) {
        if (typeof size !== 'number') {
            throw new TypeError('The "size" argument must be of type number. Received type ' + typeof size);
        }
        if (size < 0 || size >= 2 * (1 << 30)) {
            throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
        var buf = Buffer(size);
        if (!fill || fill.length === 0) {
            buf.fill(0);
        } else if (typeof encoding === 'string') {
            buf.fill(fill, encoding);
        } else {
            buf.fill(fill);
        }
        return buf;
    };
}
if (!safer.kStringMaxLength) {
    try {
        safer.kStringMaxLength = process.binding('buffer').kStringMaxLength;
    } catch (e) {
    // we can't determine kStringMaxLength in environments where process.binding
    // is unsupported, so let's not set it
    }
}
if (!safer.constants) {
    safer.constants = {
        MAX_LENGTH: safer.kMaxLength
    };
    if (safer.kStringMaxLength) {
        safer.constants.MAX_STRING_LENGTH = safer.kStringMaxLength;
    }
}
module.exports = safer;
}),
"[project]/frontend/node_modules/.pnpm/whatwg-encoding@3.1.1/node_modules/whatwg-encoding/lib/supported-names.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[\"UTF-8\",\"IBM866\",\"ISO-8859-2\",\"ISO-8859-3\",\"ISO-8859-4\",\"ISO-8859-5\",\"ISO-8859-6\",\"ISO-8859-7\",\"ISO-8859-8\",\"ISO-8859-10\",\"ISO-8859-13\",\"ISO-8859-14\",\"ISO-8859-15\",\"ISO-8859-16\",\"KOI8-R\",\"KOI8-U\",\"macintosh\",\"windows-874\",\"windows-1250\",\"windows-1251\",\"windows-1252\",\"windows-1253\",\"windows-1254\",\"windows-1255\",\"windows-1256\",\"windows-1257\",\"windows-1258\",\"GBK\",\"gb18030\",\"Big5\",\"EUC-JP\",\"Shift_JIS\",\"EUC-KR\",\"UTF-16BE\",\"UTF-16LE\",\"x-user-defined\"]"));}),
"[project]/frontend/node_modules/.pnpm/whatwg-encoding@3.1.1/node_modules/whatwg-encoding/lib/labels-to-names.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"866\":\"IBM866\",\"unicode-1-1-utf-8\":\"UTF-8\",\"unicode11utf8\":\"UTF-8\",\"unicode20utf8\":\"UTF-8\",\"utf-8\":\"UTF-8\",\"utf8\":\"UTF-8\",\"x-unicode20utf8\":\"UTF-8\",\"cp866\":\"IBM866\",\"csibm866\":\"IBM866\",\"ibm866\":\"IBM866\",\"csisolatin2\":\"ISO-8859-2\",\"iso-8859-2\":\"ISO-8859-2\",\"iso-ir-101\":\"ISO-8859-2\",\"iso8859-2\":\"ISO-8859-2\",\"iso88592\":\"ISO-8859-2\",\"iso_8859-2\":\"ISO-8859-2\",\"iso_8859-2:1987\":\"ISO-8859-2\",\"l2\":\"ISO-8859-2\",\"latin2\":\"ISO-8859-2\",\"csisolatin3\":\"ISO-8859-3\",\"iso-8859-3\":\"ISO-8859-3\",\"iso-ir-109\":\"ISO-8859-3\",\"iso8859-3\":\"ISO-8859-3\",\"iso88593\":\"ISO-8859-3\",\"iso_8859-3\":\"ISO-8859-3\",\"iso_8859-3:1988\":\"ISO-8859-3\",\"l3\":\"ISO-8859-3\",\"latin3\":\"ISO-8859-3\",\"csisolatin4\":\"ISO-8859-4\",\"iso-8859-4\":\"ISO-8859-4\",\"iso-ir-110\":\"ISO-8859-4\",\"iso8859-4\":\"ISO-8859-4\",\"iso88594\":\"ISO-8859-4\",\"iso_8859-4\":\"ISO-8859-4\",\"iso_8859-4:1988\":\"ISO-8859-4\",\"l4\":\"ISO-8859-4\",\"latin4\":\"ISO-8859-4\",\"csisolatincyrillic\":\"ISO-8859-5\",\"cyrillic\":\"ISO-8859-5\",\"iso-8859-5\":\"ISO-8859-5\",\"iso-ir-144\":\"ISO-8859-5\",\"iso8859-5\":\"ISO-8859-5\",\"iso88595\":\"ISO-8859-5\",\"iso_8859-5\":\"ISO-8859-5\",\"iso_8859-5:1988\":\"ISO-8859-5\",\"arabic\":\"ISO-8859-6\",\"asmo-708\":\"ISO-8859-6\",\"csiso88596e\":\"ISO-8859-6\",\"csiso88596i\":\"ISO-8859-6\",\"csisolatinarabic\":\"ISO-8859-6\",\"ecma-114\":\"ISO-8859-6\",\"iso-8859-6\":\"ISO-8859-6\",\"iso-8859-6-e\":\"ISO-8859-6\",\"iso-8859-6-i\":\"ISO-8859-6\",\"iso-ir-127\":\"ISO-8859-6\",\"iso8859-6\":\"ISO-8859-6\",\"iso88596\":\"ISO-8859-6\",\"iso_8859-6\":\"ISO-8859-6\",\"iso_8859-6:1987\":\"ISO-8859-6\",\"csisolatingreek\":\"ISO-8859-7\",\"ecma-118\":\"ISO-8859-7\",\"elot_928\":\"ISO-8859-7\",\"greek\":\"ISO-8859-7\",\"greek8\":\"ISO-8859-7\",\"iso-8859-7\":\"ISO-8859-7\",\"iso-ir-126\":\"ISO-8859-7\",\"iso8859-7\":\"ISO-8859-7\",\"iso88597\":\"ISO-8859-7\",\"iso_8859-7\":\"ISO-8859-7\",\"iso_8859-7:1987\":\"ISO-8859-7\",\"sun_eu_greek\":\"ISO-8859-7\",\"csiso88598e\":\"ISO-8859-8\",\"csisolatinhebrew\":\"ISO-8859-8\",\"hebrew\":\"ISO-8859-8\",\"iso-8859-8\":\"ISO-8859-8\",\"iso-8859-8-e\":\"ISO-8859-8\",\"iso-ir-138\":\"ISO-8859-8\",\"iso8859-8\":\"ISO-8859-8\",\"iso88598\":\"ISO-8859-8\",\"iso_8859-8\":\"ISO-8859-8\",\"iso_8859-8:1988\":\"ISO-8859-8\",\"visual\":\"ISO-8859-8\",\"csisolatin6\":\"ISO-8859-10\",\"iso-8859-10\":\"ISO-8859-10\",\"iso-ir-157\":\"ISO-8859-10\",\"iso8859-10\":\"ISO-8859-10\",\"iso885910\":\"ISO-8859-10\",\"l6\":\"ISO-8859-10\",\"latin6\":\"ISO-8859-10\",\"iso-8859-13\":\"ISO-8859-13\",\"iso8859-13\":\"ISO-8859-13\",\"iso885913\":\"ISO-8859-13\",\"iso-8859-14\":\"ISO-8859-14\",\"iso8859-14\":\"ISO-8859-14\",\"iso885914\":\"ISO-8859-14\",\"csisolatin9\":\"ISO-8859-15\",\"iso-8859-15\":\"ISO-8859-15\",\"iso8859-15\":\"ISO-8859-15\",\"iso885915\":\"ISO-8859-15\",\"iso_8859-15\":\"ISO-8859-15\",\"l9\":\"ISO-8859-15\",\"iso-8859-16\":\"ISO-8859-16\",\"cskoi8r\":\"KOI8-R\",\"koi\":\"KOI8-R\",\"koi8\":\"KOI8-R\",\"koi8-r\":\"KOI8-R\",\"koi8_r\":\"KOI8-R\",\"koi8-ru\":\"KOI8-U\",\"koi8-u\":\"KOI8-U\",\"csmacintosh\":\"macintosh\",\"mac\":\"macintosh\",\"macintosh\":\"macintosh\",\"x-mac-roman\":\"macintosh\",\"dos-874\":\"windows-874\",\"iso-8859-11\":\"windows-874\",\"iso8859-11\":\"windows-874\",\"iso885911\":\"windows-874\",\"tis-620\":\"windows-874\",\"windows-874\":\"windows-874\",\"cp1250\":\"windows-1250\",\"windows-1250\":\"windows-1250\",\"x-cp1250\":\"windows-1250\",\"cp1251\":\"windows-1251\",\"windows-1251\":\"windows-1251\",\"x-cp1251\":\"windows-1251\",\"ansi_x3.4-1968\":\"windows-1252\",\"ascii\":\"windows-1252\",\"cp1252\":\"windows-1252\",\"cp819\":\"windows-1252\",\"csisolatin1\":\"windows-1252\",\"ibm819\":\"windows-1252\",\"iso-8859-1\":\"windows-1252\",\"iso-ir-100\":\"windows-1252\",\"iso8859-1\":\"windows-1252\",\"iso88591\":\"windows-1252\",\"iso_8859-1\":\"windows-1252\",\"iso_8859-1:1987\":\"windows-1252\",\"l1\":\"windows-1252\",\"latin1\":\"windows-1252\",\"us-ascii\":\"windows-1252\",\"windows-1252\":\"windows-1252\",\"x-cp1252\":\"windows-1252\",\"cp1253\":\"windows-1253\",\"windows-1253\":\"windows-1253\",\"x-cp1253\":\"windows-1253\",\"cp1254\":\"windows-1254\",\"csisolatin5\":\"windows-1254\",\"iso-8859-9\":\"windows-1254\",\"iso-ir-148\":\"windows-1254\",\"iso8859-9\":\"windows-1254\",\"iso88599\":\"windows-1254\",\"iso_8859-9\":\"windows-1254\",\"iso_8859-9:1989\":\"windows-1254\",\"l5\":\"windows-1254\",\"latin5\":\"windows-1254\",\"windows-1254\":\"windows-1254\",\"x-cp1254\":\"windows-1254\",\"cp1255\":\"windows-1255\",\"windows-1255\":\"windows-1255\",\"x-cp1255\":\"windows-1255\",\"cp1256\":\"windows-1256\",\"windows-1256\":\"windows-1256\",\"x-cp1256\":\"windows-1256\",\"cp1257\":\"windows-1257\",\"windows-1257\":\"windows-1257\",\"x-cp1257\":\"windows-1257\",\"cp1258\":\"windows-1258\",\"windows-1258\":\"windows-1258\",\"x-cp1258\":\"windows-1258\",\"chinese\":\"GBK\",\"csgb2312\":\"GBK\",\"csiso58gb231280\":\"GBK\",\"gb2312\":\"GBK\",\"gb_2312\":\"GBK\",\"gb_2312-80\":\"GBK\",\"gbk\":\"GBK\",\"iso-ir-58\":\"GBK\",\"x-gbk\":\"GBK\",\"gb18030\":\"gb18030\",\"big5\":\"Big5\",\"big5-hkscs\":\"Big5\",\"cn-big5\":\"Big5\",\"csbig5\":\"Big5\",\"x-x-big5\":\"Big5\",\"cseucpkdfmtjapanese\":\"EUC-JP\",\"euc-jp\":\"EUC-JP\",\"x-euc-jp\":\"EUC-JP\",\"csshiftjis\":\"Shift_JIS\",\"ms932\":\"Shift_JIS\",\"ms_kanji\":\"Shift_JIS\",\"shift-jis\":\"Shift_JIS\",\"shift_jis\":\"Shift_JIS\",\"sjis\":\"Shift_JIS\",\"windows-31j\":\"Shift_JIS\",\"x-sjis\":\"Shift_JIS\",\"cseuckr\":\"EUC-KR\",\"csksc56011987\":\"EUC-KR\",\"euc-kr\":\"EUC-KR\",\"iso-ir-149\":\"EUC-KR\",\"korean\":\"EUC-KR\",\"ks_c_5601-1987\":\"EUC-KR\",\"ks_c_5601-1989\":\"EUC-KR\",\"ksc5601\":\"EUC-KR\",\"ksc_5601\":\"EUC-KR\",\"windows-949\":\"EUC-KR\",\"unicodefffe\":\"UTF-16BE\",\"utf-16be\":\"UTF-16BE\",\"csunicode\":\"UTF-16LE\",\"iso-10646-ucs-2\":\"UTF-16LE\",\"ucs-2\":\"UTF-16LE\",\"unicode\":\"UTF-16LE\",\"unicodefeff\":\"UTF-16LE\",\"utf-16\":\"UTF-16LE\",\"utf-16le\":\"UTF-16LE\",\"x-user-defined\":\"x-user-defined\"}"));}),
"[project]/frontend/node_modules/.pnpm/whatwg-encoding@3.1.1/node_modules/whatwg-encoding/lib/whatwg-encoding.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const iconvLite = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/iconv-lite@0.6.3/node_modules/iconv-lite/lib/index.js [app-ssr] (ecmascript)");
const supportedNames = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-encoding@3.1.1/node_modules/whatwg-encoding/lib/supported-names.json (json)");
const labelsToNames = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-encoding@3.1.1/node_modules/whatwg-encoding/lib/labels-to-names.json (json)");
const supportedNamesSet = new Set(supportedNames);
// https://encoding.spec.whatwg.org/#concept-encoding-get
exports.labelToName = (label)=>{
    label = String(label).trim().toLowerCase();
    return labelsToNames[label] || null;
};
// https://encoding.spec.whatwg.org/#decode
exports.decode = (uint8Array, fallbackEncodingName)=>{
    let encoding = fallbackEncodingName;
    if (!exports.isSupported(encoding)) {
        throw new RangeError(`"${encoding}" is not a supported encoding name`);
    }
    const bomEncoding = exports.getBOMEncoding(uint8Array);
    if (bomEncoding !== null) {
        encoding = bomEncoding;
    // iconv-lite will strip BOMs for us, so no need to do the extra byte removal that the spec does.
    // Note that we won't end up in the x-user-defined case when there's a bomEncoding.
    }
    if (encoding === "x-user-defined") {
        // https://encoding.spec.whatwg.org/#x-user-defined-decoder
        let result = "";
        for (const byte of uint8Array){
            if (byte <= 0x7F) {
                result += String.fromCodePoint(byte);
            } else {
                result += String.fromCodePoint(0xF780 + byte - 0x80);
            }
        }
        return result;
    }
    return iconvLite.decode(uint8Array, encoding);
};
// https://github.com/whatwg/html/issues/1910#issuecomment-254017369
exports.getBOMEncoding = (uint8Array)=>{
    if (uint8Array[0] === 0xFE && uint8Array[1] === 0xFF) {
        return "UTF-16BE";
    } else if (uint8Array[0] === 0xFF && uint8Array[1] === 0xFE) {
        return "UTF-16LE";
    } else if (uint8Array[0] === 0xEF && uint8Array[1] === 0xBB && uint8Array[2] === 0xBF) {
        return "UTF-8";
    }
    return null;
};
exports.isSupported = (name)=>{
    return supportedNamesSet.has(String(name));
};
}),
"[project]/frontend/node_modules/.pnpm/html-encoding-sniffer@4.0.0/node_modules/html-encoding-sniffer/lib/html-encoding-sniffer.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const whatwgEncoding = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-encoding@3.1.1/node_modules/whatwg-encoding/lib/whatwg-encoding.js [app-ssr] (ecmascript)");
// https://html.spec.whatwg.org/#encoding-sniffing-algorithm
module.exports = (uint8Array, { transportLayerEncodingLabel, defaultEncoding = "windows-1252" } = {})=>{
    let encoding = whatwgEncoding.getBOMEncoding(uint8Array);
    if (encoding === null && transportLayerEncodingLabel !== undefined) {
        encoding = whatwgEncoding.labelToName(transportLayerEncodingLabel);
    }
    if (encoding === null) {
        encoding = prescanMetaCharset(uint8Array);
    }
    if (encoding === null) {
        encoding = defaultEncoding;
    }
    return encoding;
};
// https://html.spec.whatwg.org/multipage/syntax.html#prescan-a-byte-stream-to-determine-its-encoding
function prescanMetaCharset(uint8Array) {
    const l = Math.min(uint8Array.byteLength, 1024);
    for(let i = 0; i < l; i++){
        let c = uint8Array[i];
        if (c === 0x3C) {
            // "<"
            const c1 = uint8Array[i + 1];
            const c2 = uint8Array[i + 2];
            const c3 = uint8Array[i + 3];
            const c4 = uint8Array[i + 4];
            const c5 = uint8Array[i + 5];
            // !-- (comment start)
            if (c1 === 0x21 && c2 === 0x2D && c3 === 0x2D) {
                i += 4;
                for(; i < l; i++){
                    c = uint8Array[i];
                    const cMinus1 = uint8Array[i - 1];
                    const cMinus2 = uint8Array[i - 2];
                    // --> (comment end)
                    if (c === 0x3E && cMinus1 === 0x2D && cMinus2 === 0x2D) {
                        break;
                    }
                }
            } else if ((c1 === 0x4D || c1 === 0x6D) && (c2 === 0x45 || c2 === 0x65) && (c3 === 0x54 || c3 === 0x74) && (c4 === 0x41 || c4 === 0x61) && (isSpaceCharacter(c5) || c5 === 0x2F)) {
                // "meta" + space or /
                i += 6;
                const attributeList = new Set();
                let gotPragma = false;
                let needPragma = null;
                let charset = null;
                let attrRes;
                do {
                    attrRes = getAttribute(uint8Array, i, l);
                    if (attrRes.attr && !attributeList.has(attrRes.attr.name)) {
                        attributeList.add(attrRes.attr.name);
                        if (attrRes.attr.name === "http-equiv") {
                            gotPragma = attrRes.attr.value === "content-type";
                        } else if (attrRes.attr.name === "content" && !charset) {
                            charset = extractCharacterEncodingFromMeta(attrRes.attr.value);
                            if (charset !== null) {
                                needPragma = true;
                            }
                        } else if (attrRes.attr.name === "charset") {
                            charset = whatwgEncoding.labelToName(attrRes.attr.value);
                            needPragma = false;
                        }
                    }
                    i = attrRes.i;
                }while (attrRes.attr)
                if (needPragma === null) {
                    continue;
                }
                if (needPragma === true && gotPragma === false) {
                    continue;
                }
                if (charset === null) {
                    continue;
                }
                if (charset === "UTF-16LE" || charset === "UTF-16BE") {
                    charset = "UTF-8";
                }
                if (charset === "x-user-defined") {
                    charset = "windows-1252";
                }
                return charset;
            } else if (c1 >= 0x41 && c1 <= 0x5A || c1 >= 0x61 && c1 <= 0x7A) {
                // a-z or A-Z
                for(i += 2; i < l; i++){
                    c = uint8Array[i];
                    // space or >
                    if (isSpaceCharacter(c) || c === 0x3E) {
                        break;
                    }
                }
                let attrRes;
                do {
                    attrRes = getAttribute(uint8Array, i, l);
                    i = attrRes.i;
                }while (attrRes.attr)
            } else if (c1 === 0x21 || c1 === 0x2F || c1 === 0x3F) {
                // ! or / or ?
                for(i += 2; i < l; i++){
                    c = uint8Array[i];
                    // >
                    if (c === 0x3E) {
                        break;
                    }
                }
            }
        }
    }
    return null;
}
// https://html.spec.whatwg.org/multipage/syntax.html#concept-get-attributes-when-sniffing
function getAttribute(uint8Array, i, l) {
    for(; i < l; i++){
        let c = uint8Array[i];
        // space or /
        if (isSpaceCharacter(c) || c === 0x2F) {
            continue;
        }
        // ">"
        if (c === 0x3E) {
            break;
        }
        let name = "";
        let value = "";
        nameLoop: for(; i < l; i++){
            c = uint8Array[i];
            // "="
            if (c === 0x3D && name !== "") {
                i++;
                break;
            }
            // space
            if (isSpaceCharacter(c)) {
                for(i++; i < l; i++){
                    c = uint8Array[i];
                    // space
                    if (isSpaceCharacter(c)) {
                        continue;
                    }
                    // not "="
                    if (c !== 0x3D) {
                        return {
                            attr: {
                                name,
                                value
                            },
                            i
                        };
                    }
                    i++;
                    break nameLoop;
                }
                break;
            }
            // / or >
            if (c === 0x2F || c === 0x3E) {
                return {
                    attr: {
                        name,
                        value
                    },
                    i
                };
            }
            // A-Z
            if (c >= 0x41 && c <= 0x5A) {
                name += String.fromCharCode(c + 0x20); // lowercase
            } else {
                name += String.fromCharCode(c);
            }
        }
        c = uint8Array[i];
        // space
        if (isSpaceCharacter(c)) {
            for(i++; i < l; i++){
                c = uint8Array[i];
                // space
                if (isSpaceCharacter(c)) {
                    continue;
                } else {
                    break;
                }
            }
        }
        // " or '
        if (c === 0x22 || c === 0x27) {
            const quote = c;
            for(i++; i < l; i++){
                c = uint8Array[i];
                if (c === quote) {
                    i++;
                    return {
                        attr: {
                            name,
                            value
                        },
                        i
                    };
                }
                // A-Z
                if (c >= 0x41 && c <= 0x5A) {
                    value += String.fromCharCode(c + 0x20); // lowercase
                } else {
                    value += String.fromCharCode(c);
                }
            }
        }
        // >
        if (c === 0x3E) {
            return {
                attr: {
                    name,
                    value
                },
                i
            };
        }
        // A-Z
        if (c >= 0x41 && c <= 0x5A) {
            value += String.fromCharCode(c + 0x20); // lowercase
        } else {
            value += String.fromCharCode(c);
        }
        for(i++; i < l; i++){
            c = uint8Array[i];
            // space or >
            if (isSpaceCharacter(c) || c === 0x3E) {
                return {
                    attr: {
                        name,
                        value
                    },
                    i
                };
            }
            // A-Z
            if (c >= 0x41 && c <= 0x5A) {
                value += String.fromCharCode(c + 0x20); // lowercase
            } else {
                value += String.fromCharCode(c);
            }
        }
    }
    return {
        i
    };
}
function extractCharacterEncodingFromMeta(string) {
    let position = 0;
    while(true){
        const indexOfCharset = string.substring(position).search(/charset/ui);
        if (indexOfCharset === -1) {
            return null;
        }
        let subPosition = position + indexOfCharset + "charset".length;
        while(isSpaceCharacter(string[subPosition].charCodeAt(0))){
            ++subPosition;
        }
        if (string[subPosition] !== "=") {
            position = subPosition - 1;
            continue;
        }
        ++subPosition;
        while(isSpaceCharacter(string[subPosition].charCodeAt(0))){
            ++subPosition;
        }
        position = subPosition;
        break;
    }
    if (string[position] === "\"" || string[position] === "'") {
        const nextIndex = string.indexOf(string[position], position + 1);
        if (nextIndex !== -1) {
            return whatwgEncoding.labelToName(string.substring(position + 1, nextIndex));
        }
        // It is an unmatched quotation mark
        return null;
    }
    if (string.length === position + 1) {
        return null;
    }
    const indexOfASCIIWhitespaceOrSemicolon = string.substring(position + 1).search(/\x09|\x0A|\x0C|\x0D|\x20|;/u);
    const end = indexOfASCIIWhitespaceOrSemicolon === -1 ? string.length : position + indexOfASCIIWhitespaceOrSemicolon + 1;
    return whatwgEncoding.labelToName(string.substring(position, end));
}
function isSpaceCharacter(c) {
    return c === 0x09 || c === 0x0A || c === 0x0C || c === 0x0D || c === 0x20;
}
}),
"[project]/frontend/node_modules/.pnpm/punycode@2.3.1/node_modules/punycode/punycode.es6.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decode",
    ()=>decode,
    "default",
    ()=>__TURBOPACK__default__export__,
    "encode",
    ()=>encode,
    "toASCII",
    ()=>toASCII,
    "toUnicode",
    ()=>toUnicode,
    "ucs2decode",
    ()=>ucs2decode,
    "ucs2encode",
    ()=>ucs2encode
]);
'use strict';
/** Highest positive signed 32-bit float value */ const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
/** Bootstring parameters */ const base = 36;
const tMin = 1;
const tMax = 26;
const skew = 38;
const damp = 700;
const initialBias = 72;
const initialN = 128; // 0x80
const delimiter = '-'; // '\x2D'
/** Regular expressions */ const regexPunycode = /^xn--/;
const regexNonASCII = /[^\0-\x7F]/; // Note: U+007F DEL is excluded too.
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
/** Error messages */ const errors = {
    'overflow': 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input'
};
/** Convenience shortcuts */ const baseMinusTMin = base - tMin;
const floor = Math.floor;
const stringFromCharCode = String.fromCharCode;
/*--------------------------------------------------------------------------*/ /**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */ function error(type) {
    throw new RangeError(errors[type]);
}
/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */ function map(array, callback) {
    const result = [];
    let length = array.length;
    while(length--){
        result[length] = callback(array[length]);
    }
    return result;
}
/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {String} A new string of characters returned by the callback
 * function.
 */ function mapDomain(domain, callback) {
    const parts = domain.split('@');
    let result = '';
    if (parts.length > 1) {
        // In email addresses, only the domain name should be punycoded. Leave
        // the local part (i.e. everything up to `@`) intact.
        result = parts[0] + '@';
        domain = parts[1];
    }
    // Avoid `split(regex)` for IE8 compatibility. See #17.
    domain = domain.replace(regexSeparators, '\x2E');
    const labels = domain.split('.');
    const encoded = map(labels, callback).join('.');
    return result + encoded;
}
/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */ function ucs2decode(string) {
    const output = [];
    let counter = 0;
    const length = string.length;
    while(counter < length){
        const value = string.charCodeAt(counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
            // It's a high surrogate, and there is a next character.
            const extra = string.charCodeAt(counter++);
            if ((extra & 0xFC00) == 0xDC00) {
                output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
            } else {
                // It's an unmatched surrogate; only append this code unit, in case the
                // next code unit is the high surrogate of a surrogate pair.
                output.push(value);
                counter--;
            }
        } else {
            output.push(value);
        }
    }
    return output;
}
/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */ const ucs2encode = (codePoints)=>String.fromCodePoint(...codePoints);
/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */ const basicToDigit = function(codePoint) {
    if (codePoint >= 0x30 && codePoint < 0x3A) {
        return 26 + (codePoint - 0x30);
    }
    if (codePoint >= 0x41 && codePoint < 0x5B) {
        return codePoint - 0x41;
    }
    if (codePoint >= 0x61 && codePoint < 0x7B) {
        return codePoint - 0x61;
    }
    return base;
};
/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */ const digitToBasic = function(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};
/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */ const adapt = function(delta, numPoints, firstTime) {
    let k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);
    for(; delta > baseMinusTMin * tMax >> 1; k += base){
        delta = floor(delta / baseMinusTMin);
    }
    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};
/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */ const decode = function(input) {
    // Don't use UCS-2.
    const output = [];
    const inputLength = input.length;
    let i = 0;
    let n = initialN;
    let bias = initialBias;
    // Handle the basic code points: let `basic` be the number of input code
    // points before the last delimiter, or `0` if there is none, then copy
    // the first basic code points to the output.
    let basic = input.lastIndexOf(delimiter);
    if (basic < 0) {
        basic = 0;
    }
    for(let j = 0; j < basic; ++j){
        // if it's not a basic code point
        if (input.charCodeAt(j) >= 0x80) {
            error('not-basic');
        }
        output.push(input.charCodeAt(j));
    }
    // Main decoding loop: start just after the last delimiter if any basic code
    // points were copied; start at the beginning otherwise.
    for(let index = basic > 0 ? basic + 1 : 0; index < inputLength;){
        // `index` is the index of the next character to be consumed.
        // Decode a generalized variable-length integer into `delta`,
        // which gets added to `i`. The overflow checking is easier
        // if we increase `i` as we go, then subtract off its starting
        // value at the end to obtain `delta`.
        const oldi = i;
        for(let w = 1, k = base;; k += base){
            if (index >= inputLength) {
                error('invalid-input');
            }
            const digit = basicToDigit(input.charCodeAt(index++));
            if (digit >= base) {
                error('invalid-input');
            }
            if (digit > floor((maxInt - i) / w)) {
                error('overflow');
            }
            i += digit * w;
            const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (digit < t) {
                break;
            }
            const baseMinusT = base - t;
            if (w > floor(maxInt / baseMinusT)) {
                error('overflow');
            }
            w *= baseMinusT;
        }
        const out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0);
        // `i` was supposed to wrap around from `out` to `0`,
        // incrementing `n` each time, so we'll fix that now:
        if (floor(i / out) > maxInt - n) {
            error('overflow');
        }
        n += floor(i / out);
        i %= out;
        // Insert `n` at position `i` of the output.
        output.splice(i++, 0, n);
    }
    return String.fromCodePoint(...output);
};
/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */ const encode = function(input) {
    const output = [];
    // Convert the input in UCS-2 to an array of Unicode code points.
    input = ucs2decode(input);
    // Cache the length.
    const inputLength = input.length;
    // Initialize the state.
    let n = initialN;
    let delta = 0;
    let bias = initialBias;
    // Handle the basic code points.
    for (const currentValue of input){
        if (currentValue < 0x80) {
            output.push(stringFromCharCode(currentValue));
        }
    }
    const basicLength = output.length;
    let handledCPCount = basicLength;
    // `handledCPCount` is the number of code points that have been handled;
    // `basicLength` is the number of basic code points.
    // Finish the basic string with a delimiter unless it's empty.
    if (basicLength) {
        output.push(delimiter);
    }
    // Main encoding loop:
    while(handledCPCount < inputLength){
        // All non-basic code points < n have been handled already. Find the next
        // larger one:
        let m = maxInt;
        for (const currentValue of input){
            if (currentValue >= n && currentValue < m) {
                m = currentValue;
            }
        }
        // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
        // but guard against overflow.
        const handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
            error('overflow');
        }
        delta += (m - n) * handledCPCountPlusOne;
        n = m;
        for (const currentValue of input){
            if (currentValue < n && ++delta > maxInt) {
                error('overflow');
            }
            if (currentValue === n) {
                // Represent delta as a generalized variable-length integer.
                let q = delta;
                for(let k = base;; k += base){
                    const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                    if (q < t) {
                        break;
                    }
                    const qMinusT = q - t;
                    const baseMinusT = base - t;
                    output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                    q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
                delta = 0;
                ++handledCPCount;
            }
        }
        ++delta;
        ++n;
    }
    return output.join('');
};
/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */ const toUnicode = function(input) {
    return mapDomain(input, function(string) {
        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
    });
};
/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */ const toASCII = function(input) {
    return mapDomain(input, function(string) {
        return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
    });
};
/*--------------------------------------------------------------------------*/ /** Define the public API */ const punycode = {
    /**
	 * A string representing the current Punycode.js version number.
	 * @memberOf punycode
	 * @type String
	 */ 'version': '2.3.1',
    /**
	 * An object of methods to convert from JavaScript's internal character
	 * representation (UCS-2) to Unicode code points, and back.
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode
	 * @type Object
	 */ 'ucs2': {
        'decode': ucs2decode,
        'encode': ucs2encode
    },
    'decode': decode,
    'encode': encode,
    'toASCII': toASCII,
    'toUnicode': toUnicode
};
;
const __TURBOPACK__default__export__ = punycode;
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/infra.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Note that we take code points as JS numbers, not JS strings.
function isASCIIDigit(c) {
    return c >= 0x30 && c <= 0x39;
}
function isASCIIAlpha(c) {
    return c >= 0x41 && c <= 0x5A || c >= 0x61 && c <= 0x7A;
}
function isASCIIAlphanumeric(c) {
    return isASCIIAlpha(c) || isASCIIDigit(c);
}
function isASCIIHex(c) {
    return isASCIIDigit(c) || c >= 0x41 && c <= 0x46 || c >= 0x61 && c <= 0x66;
}
module.exports = {
    isASCIIDigit,
    isASCIIAlpha,
    isASCIIAlphanumeric,
    isASCIIHex
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/encoding.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder("utf-8", {
    ignoreBOM: true
});
function utf8Encode(string) {
    return utf8Encoder.encode(string);
}
function utf8DecodeWithoutBOM(bytes) {
    return utf8Decoder.decode(bytes);
}
module.exports = {
    utf8Encode,
    utf8DecodeWithoutBOM
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/percent-encoding.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { isASCIIHex } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/infra.js [app-ssr] (ecmascript)");
const { utf8Encode } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/encoding.js [app-ssr] (ecmascript)");
function p(char) {
    return char.codePointAt(0);
}
// https://url.spec.whatwg.org/#percent-encode
function percentEncode(c) {
    let hex = c.toString(16).toUpperCase();
    if (hex.length === 1) {
        hex = `0${hex}`;
    }
    return `%${hex}`;
}
// https://url.spec.whatwg.org/#percent-decode
function percentDecodeBytes(input) {
    const output = new Uint8Array(input.byteLength);
    let outputIndex = 0;
    for(let i = 0; i < input.byteLength; ++i){
        const byte = input[i];
        if (byte !== 0x25) {
            output[outputIndex++] = byte;
        } else if (byte === 0x25 && (!isASCIIHex(input[i + 1]) || !isASCIIHex(input[i + 2]))) {
            output[outputIndex++] = byte;
        } else {
            const bytePoint = parseInt(String.fromCodePoint(input[i + 1], input[i + 2]), 16);
            output[outputIndex++] = bytePoint;
            i += 2;
        }
    }
    return output.slice(0, outputIndex);
}
// https://url.spec.whatwg.org/#string-percent-decode
function percentDecodeString(input) {
    const bytes = utf8Encode(input);
    return percentDecodeBytes(bytes);
}
// https://url.spec.whatwg.org/#c0-control-percent-encode-set
function isC0ControlPercentEncode(c) {
    return c <= 0x1F || c > 0x7E;
}
// https://url.spec.whatwg.org/#fragment-percent-encode-set
const extraFragmentPercentEncodeSet = new Set([
    p(" "),
    p("\""),
    p("<"),
    p(">"),
    p("`")
]);
function isFragmentPercentEncode(c) {
    return isC0ControlPercentEncode(c) || extraFragmentPercentEncodeSet.has(c);
}
// https://url.spec.whatwg.org/#query-percent-encode-set
const extraQueryPercentEncodeSet = new Set([
    p(" "),
    p("\""),
    p("#"),
    p("<"),
    p(">")
]);
function isQueryPercentEncode(c) {
    return isC0ControlPercentEncode(c) || extraQueryPercentEncodeSet.has(c);
}
// https://url.spec.whatwg.org/#special-query-percent-encode-set
function isSpecialQueryPercentEncode(c) {
    return isQueryPercentEncode(c) || c === p("'");
}
// https://url.spec.whatwg.org/#path-percent-encode-set
const extraPathPercentEncodeSet = new Set([
    p("?"),
    p("`"),
    p("{"),
    p("}"),
    p("^")
]);
function isPathPercentEncode(c) {
    return isQueryPercentEncode(c) || extraPathPercentEncodeSet.has(c);
}
// https://url.spec.whatwg.org/#userinfo-percent-encode-set
const extraUserinfoPercentEncodeSet = new Set([
    p("/"),
    p(":"),
    p(";"),
    p("="),
    p("@"),
    p("["),
    p("\\"),
    p("]"),
    p("|")
]);
function isUserinfoPercentEncode(c) {
    return isPathPercentEncode(c) || extraUserinfoPercentEncodeSet.has(c);
}
// https://url.spec.whatwg.org/#component-percent-encode-set
const extraComponentPercentEncodeSet = new Set([
    p("$"),
    p("%"),
    p("&"),
    p("+"),
    p(",")
]);
function isComponentPercentEncode(c) {
    return isUserinfoPercentEncode(c) || extraComponentPercentEncodeSet.has(c);
}
// https://url.spec.whatwg.org/#application-x-www-form-urlencoded-percent-encode-set
const extraURLEncodedPercentEncodeSet = new Set([
    p("!"),
    p("'"),
    p("("),
    p(")"),
    p("~")
]);
function isURLEncodedPercentEncode(c) {
    return isComponentPercentEncode(c) || extraURLEncodedPercentEncodeSet.has(c);
}
// https://url.spec.whatwg.org/#code-point-percent-encode-after-encoding
// https://url.spec.whatwg.org/#utf-8-percent-encode
// Assuming encoding is always utf-8 allows us to trim one of the logic branches. TODO: support encoding.
// The "-Internal" variant here has code points as JS strings. The external version used by other files has code points
// as JS numbers, like the rest of the codebase.
function utf8PercentEncodeCodePointInternal(codePoint, percentEncodePredicate) {
    const bytes = utf8Encode(codePoint);
    let output = "";
    for (const byte of bytes){
        // Our percentEncodePredicate operates on bytes, not code points, so this is slightly different from the spec.
        if (!percentEncodePredicate(byte)) {
            output += String.fromCharCode(byte);
        } else {
            output += percentEncode(byte);
        }
    }
    return output;
}
function utf8PercentEncodeCodePoint(codePoint, percentEncodePredicate) {
    return utf8PercentEncodeCodePointInternal(String.fromCodePoint(codePoint), percentEncodePredicate);
}
// https://url.spec.whatwg.org/#string-percent-encode-after-encoding
// https://url.spec.whatwg.org/#string-utf-8-percent-encode
function utf8PercentEncodeString(input, percentEncodePredicate, spaceAsPlus = false) {
    let output = "";
    for (const codePoint of input){
        if (spaceAsPlus && codePoint === " ") {
            output += "+";
        } else {
            output += utf8PercentEncodeCodePointInternal(codePoint, percentEncodePredicate);
        }
    }
    return output;
}
module.exports = {
    isC0ControlPercentEncode,
    isFragmentPercentEncode,
    isQueryPercentEncode,
    isSpecialQueryPercentEncode,
    isPathPercentEncode,
    isUserinfoPercentEncode,
    isURLEncodedPercentEncode,
    percentDecodeString,
    percentDecodeBytes,
    utf8PercentEncodeString,
    utf8PercentEncodeCodePoint
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/url-state-machine.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const tr46 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tr46@5.1.1/node_modules/tr46/index.js [app-ssr] (ecmascript)");
const infra = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/infra.js [app-ssr] (ecmascript)");
const { utf8DecodeWithoutBOM } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/encoding.js [app-ssr] (ecmascript)");
const { percentDecodeString, utf8PercentEncodeCodePoint, utf8PercentEncodeString, isC0ControlPercentEncode, isFragmentPercentEncode, isQueryPercentEncode, isSpecialQueryPercentEncode, isPathPercentEncode, isUserinfoPercentEncode } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/percent-encoding.js [app-ssr] (ecmascript)");
function p(char) {
    return char.codePointAt(0);
}
const specialSchemes = {
    ftp: 21,
    file: null,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
};
const failure = Symbol("failure");
function countSymbols(str) {
    return [
        ...str
    ].length;
}
function at(input, idx) {
    const c = input[idx];
    return isNaN(c) ? undefined : String.fromCodePoint(c);
}
function isSingleDot(buffer) {
    return buffer === "." || buffer.toLowerCase() === "%2e";
}
function isDoubleDot(buffer) {
    buffer = buffer.toLowerCase();
    return buffer === ".." || buffer === "%2e." || buffer === ".%2e" || buffer === "%2e%2e";
}
function isWindowsDriveLetterCodePoints(cp1, cp2) {
    return infra.isASCIIAlpha(cp1) && (cp2 === p(":") || cp2 === p("|"));
}
function isWindowsDriveLetterString(string) {
    return string.length === 2 && infra.isASCIIAlpha(string.codePointAt(0)) && (string[1] === ":" || string[1] === "|");
}
function isNormalizedWindowsDriveLetterString(string) {
    return string.length === 2 && infra.isASCIIAlpha(string.codePointAt(0)) && string[1] === ":";
}
function containsForbiddenHostCodePoint(string) {
    return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|<|>|\?|@|\[|\\|\]|\^|\|/u) !== -1;
}
function containsForbiddenDomainCodePoint(string) {
    return containsForbiddenHostCodePoint(string) || string.search(/[\u0000-\u001F]|%|\u007F/u) !== -1;
}
function isSpecialScheme(scheme) {
    return specialSchemes[scheme] !== undefined;
}
function isSpecial(url) {
    return isSpecialScheme(url.scheme);
}
function isNotSpecial(url) {
    return !isSpecialScheme(url.scheme);
}
function defaultPort(scheme) {
    return specialSchemes[scheme];
}
function parseIPv4Number(input) {
    if (input === "") {
        return failure;
    }
    let R = 10;
    if (input.length >= 2 && input.charAt(0) === "0" && input.charAt(1).toLowerCase() === "x") {
        input = input.substring(2);
        R = 16;
    } else if (input.length >= 2 && input.charAt(0) === "0") {
        input = input.substring(1);
        R = 8;
    }
    if (input === "") {
        return 0;
    }
    let regex = /[^0-7]/u;
    if (R === 10) {
        regex = /[^0-9]/u;
    }
    if (R === 16) {
        regex = /[^0-9A-Fa-f]/u;
    }
    if (regex.test(input)) {
        return failure;
    }
    return parseInt(input, R);
}
function parseIPv4(input) {
    const parts = input.split(".");
    if (parts[parts.length - 1] === "") {
        if (parts.length > 1) {
            parts.pop();
        }
    }
    if (parts.length > 4) {
        return failure;
    }
    const numbers = [];
    for (const part of parts){
        const n = parseIPv4Number(part);
        if (n === failure) {
            return failure;
        }
        numbers.push(n);
    }
    for(let i = 0; i < numbers.length - 1; ++i){
        if (numbers[i] > 255) {
            return failure;
        }
    }
    if (numbers[numbers.length - 1] >= 256 ** (5 - numbers.length)) {
        return failure;
    }
    let ipv4 = numbers.pop();
    let counter = 0;
    for (const n of numbers){
        ipv4 += n * 256 ** (3 - counter);
        ++counter;
    }
    return ipv4;
}
function serializeIPv4(address) {
    let output = "";
    let n = address;
    for(let i = 1; i <= 4; ++i){
        output = String(n % 256) + output;
        if (i !== 4) {
            output = `.${output}`;
        }
        n = Math.floor(n / 256);
    }
    return output;
}
function parseIPv6(input) {
    const address = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];
    let pieceIndex = 0;
    let compress = null;
    let pointer = 0;
    input = Array.from(input, (c)=>c.codePointAt(0));
    if (input[pointer] === p(":")) {
        if (input[pointer + 1] !== p(":")) {
            return failure;
        }
        pointer += 2;
        ++pieceIndex;
        compress = pieceIndex;
    }
    while(pointer < input.length){
        if (pieceIndex === 8) {
            return failure;
        }
        if (input[pointer] === p(":")) {
            if (compress !== null) {
                return failure;
            }
            ++pointer;
            ++pieceIndex;
            compress = pieceIndex;
            continue;
        }
        let value = 0;
        let length = 0;
        while(length < 4 && infra.isASCIIHex(input[pointer])){
            value = value * 0x10 + parseInt(at(input, pointer), 16);
            ++pointer;
            ++length;
        }
        if (input[pointer] === p(".")) {
            if (length === 0) {
                return failure;
            }
            pointer -= length;
            if (pieceIndex > 6) {
                return failure;
            }
            let numbersSeen = 0;
            while(input[pointer] !== undefined){
                let ipv4Piece = null;
                if (numbersSeen > 0) {
                    if (input[pointer] === p(".") && numbersSeen < 4) {
                        ++pointer;
                    } else {
                        return failure;
                    }
                }
                if (!infra.isASCIIDigit(input[pointer])) {
                    return failure;
                }
                while(infra.isASCIIDigit(input[pointer])){
                    const number = parseInt(at(input, pointer));
                    if (ipv4Piece === null) {
                        ipv4Piece = number;
                    } else if (ipv4Piece === 0) {
                        return failure;
                    } else {
                        ipv4Piece = ipv4Piece * 10 + number;
                    }
                    if (ipv4Piece > 255) {
                        return failure;
                    }
                    ++pointer;
                }
                address[pieceIndex] = address[pieceIndex] * 0x100 + ipv4Piece;
                ++numbersSeen;
                if (numbersSeen === 2 || numbersSeen === 4) {
                    ++pieceIndex;
                }
            }
            if (numbersSeen !== 4) {
                return failure;
            }
            break;
        } else if (input[pointer] === p(":")) {
            ++pointer;
            if (input[pointer] === undefined) {
                return failure;
            }
        } else if (input[pointer] !== undefined) {
            return failure;
        }
        address[pieceIndex] = value;
        ++pieceIndex;
    }
    if (compress !== null) {
        let swaps = pieceIndex - compress;
        pieceIndex = 7;
        while(pieceIndex !== 0 && swaps > 0){
            const temp = address[compress + swaps - 1];
            address[compress + swaps - 1] = address[pieceIndex];
            address[pieceIndex] = temp;
            --pieceIndex;
            --swaps;
        }
    } else if (compress === null && pieceIndex !== 8) {
        return failure;
    }
    return address;
}
function serializeIPv6(address) {
    let output = "";
    const compress = findTheIPv6AddressCompressedPieceIndex(address);
    let ignore0 = false;
    for(let pieceIndex = 0; pieceIndex <= 7; ++pieceIndex){
        if (ignore0 && address[pieceIndex] === 0) {
            continue;
        } else if (ignore0) {
            ignore0 = false;
        }
        if (compress === pieceIndex) {
            const separator = pieceIndex === 0 ? "::" : ":";
            output += separator;
            ignore0 = true;
            continue;
        }
        output += address[pieceIndex].toString(16);
        if (pieceIndex !== 7) {
            output += ":";
        }
    }
    return output;
}
function parseHost(input, isOpaque = false) {
    if (input[0] === "[") {
        if (input[input.length - 1] !== "]") {
            return failure;
        }
        return parseIPv6(input.substring(1, input.length - 1));
    }
    if (isOpaque) {
        return parseOpaqueHost(input);
    }
    const domain = utf8DecodeWithoutBOM(percentDecodeString(input));
    const asciiDomain = domainToASCII(domain);
    if (asciiDomain === failure) {
        return failure;
    }
    if (endsInANumber(asciiDomain)) {
        return parseIPv4(asciiDomain);
    }
    return asciiDomain;
}
function endsInANumber(input) {
    const parts = input.split(".");
    if (parts[parts.length - 1] === "") {
        if (parts.length === 1) {
            return false;
        }
        parts.pop();
    }
    const last = parts[parts.length - 1];
    if (parseIPv4Number(last) !== failure) {
        return true;
    }
    if (/^[0-9]+$/u.test(last)) {
        return true;
    }
    return false;
}
function parseOpaqueHost(input) {
    if (containsForbiddenHostCodePoint(input)) {
        return failure;
    }
    return utf8PercentEncodeString(input, isC0ControlPercentEncode);
}
function findTheIPv6AddressCompressedPieceIndex(address) {
    let longestIndex = null;
    let longestSize = 1; // only find elements > 1
    let foundIndex = null;
    let foundSize = 0;
    for(let pieceIndex = 0; pieceIndex < address.length; ++pieceIndex){
        if (address[pieceIndex] !== 0) {
            if (foundSize > longestSize) {
                longestIndex = foundIndex;
                longestSize = foundSize;
            }
            foundIndex = null;
            foundSize = 0;
        } else {
            if (foundIndex === null) {
                foundIndex = pieceIndex;
            }
            ++foundSize;
        }
    }
    if (foundSize > longestSize) {
        return foundIndex;
    }
    return longestIndex;
}
function serializeHost(host) {
    if (typeof host === "number") {
        return serializeIPv4(host);
    }
    // IPv6 serializer
    if (host instanceof Array) {
        return `[${serializeIPv6(host)}]`;
    }
    return host;
}
function domainToASCII(domain, beStrict = false) {
    const result = tr46.toASCII(domain, {
        checkHyphens: beStrict,
        checkBidi: true,
        checkJoiners: true,
        useSTD3ASCIIRules: beStrict,
        transitionalProcessing: false,
        verifyDNSLength: beStrict,
        ignoreInvalidPunycode: false
    });
    if (result === null) {
        return failure;
    }
    if (!beStrict) {
        if (result === "") {
            return failure;
        }
        if (containsForbiddenDomainCodePoint(result)) {
            return failure;
        }
    }
    return result;
}
function trimControlChars(string) {
    // Avoid using regexp because of this V8 bug: https://issues.chromium.org/issues/42204424
    let start = 0;
    let end = string.length;
    for(; start < end; ++start){
        if (string.charCodeAt(start) > 0x20) {
            break;
        }
    }
    for(; end > start; --end){
        if (string.charCodeAt(end - 1) > 0x20) {
            break;
        }
    }
    return string.substring(start, end);
}
function trimTabAndNewline(url) {
    return url.replace(/\u0009|\u000A|\u000D/ug, "");
}
function shortenPath(url) {
    const { path } = url;
    if (path.length === 0) {
        return;
    }
    if (url.scheme === "file" && path.length === 1 && isNormalizedWindowsDriveLetter(path[0])) {
        return;
    }
    path.pop();
}
function includesCredentials(url) {
    return url.username !== "" || url.password !== "";
}
function cannotHaveAUsernamePasswordPort(url) {
    return url.host === null || url.host === "" || url.scheme === "file";
}
function hasAnOpaquePath(url) {
    return typeof url.path === "string";
}
function isNormalizedWindowsDriveLetter(string) {
    return /^[A-Za-z]:$/u.test(string);
}
function URLStateMachine(input, base, encodingOverride, url, stateOverride) {
    this.pointer = 0;
    this.input = input;
    this.base = base || null;
    this.encodingOverride = encodingOverride || "utf-8";
    this.stateOverride = stateOverride;
    this.url = url;
    this.failure = false;
    this.parseError = false;
    if (!this.url) {
        this.url = {
            scheme: "",
            username: "",
            password: "",
            host: null,
            port: null,
            path: [],
            query: null,
            fragment: null
        };
        const res = trimControlChars(this.input);
        if (res !== this.input) {
            this.parseError = true;
        }
        this.input = res;
    }
    const res = trimTabAndNewline(this.input);
    if (res !== this.input) {
        this.parseError = true;
    }
    this.input = res;
    this.state = stateOverride || "scheme start";
    this.buffer = "";
    this.atFlag = false;
    this.arrFlag = false;
    this.passwordTokenSeenFlag = false;
    this.input = Array.from(this.input, (c)=>c.codePointAt(0));
    for(; this.pointer <= this.input.length; ++this.pointer){
        const c = this.input[this.pointer];
        const cStr = isNaN(c) ? undefined : String.fromCodePoint(c);
        // exec state machine
        const ret = this[`parse ${this.state}`](c, cStr);
        if (!ret) {
            break; // terminate algorithm
        } else if (ret === failure) {
            this.failure = true;
            break;
        }
    }
}
URLStateMachine.prototype["parse scheme start"] = function parseSchemeStart(c, cStr) {
    if (infra.isASCIIAlpha(c)) {
        this.buffer += cStr.toLowerCase();
        this.state = "scheme";
    } else if (!this.stateOverride) {
        this.state = "no scheme";
        --this.pointer;
    } else {
        this.parseError = true;
        return failure;
    }
    return true;
};
URLStateMachine.prototype["parse scheme"] = function parseScheme(c, cStr) {
    if (infra.isASCIIAlphanumeric(c) || c === p("+") || c === p("-") || c === p(".")) {
        this.buffer += cStr.toLowerCase();
    } else if (c === p(":")) {
        if (this.stateOverride) {
            if (isSpecial(this.url) && !isSpecialScheme(this.buffer)) {
                return false;
            }
            if (!isSpecial(this.url) && isSpecialScheme(this.buffer)) {
                return false;
            }
            if ((includesCredentials(this.url) || this.url.port !== null) && this.buffer === "file") {
                return false;
            }
            if (this.url.scheme === "file" && this.url.host === "") {
                return false;
            }
        }
        this.url.scheme = this.buffer;
        if (this.stateOverride) {
            if (this.url.port === defaultPort(this.url.scheme)) {
                this.url.port = null;
            }
            return false;
        }
        this.buffer = "";
        if (this.url.scheme === "file") {
            if (this.input[this.pointer + 1] !== p("/") || this.input[this.pointer + 2] !== p("/")) {
                this.parseError = true;
            }
            this.state = "file";
        } else if (isSpecial(this.url) && this.base !== null && this.base.scheme === this.url.scheme) {
            this.state = "special relative or authority";
        } else if (isSpecial(this.url)) {
            this.state = "special authority slashes";
        } else if (this.input[this.pointer + 1] === p("/")) {
            this.state = "path or authority";
            ++this.pointer;
        } else {
            this.url.path = "";
            this.state = "opaque path";
        }
    } else if (!this.stateOverride) {
        this.buffer = "";
        this.state = "no scheme";
        this.pointer = -1;
    } else {
        this.parseError = true;
        return failure;
    }
    return true;
};
URLStateMachine.prototype["parse no scheme"] = function parseNoScheme(c) {
    if (this.base === null || hasAnOpaquePath(this.base) && c !== p("#")) {
        return failure;
    } else if (hasAnOpaquePath(this.base) && c === p("#")) {
        this.url.scheme = this.base.scheme;
        this.url.path = this.base.path;
        this.url.query = this.base.query;
        this.url.fragment = "";
        this.state = "fragment";
    } else if (this.base.scheme === "file") {
        this.state = "file";
        --this.pointer;
    } else {
        this.state = "relative";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse special relative or authority"] = function parseSpecialRelativeOrAuthority(c) {
    if (c === p("/") && this.input[this.pointer + 1] === p("/")) {
        this.state = "special authority ignore slashes";
        ++this.pointer;
    } else {
        this.parseError = true;
        this.state = "relative";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse path or authority"] = function parsePathOrAuthority(c) {
    if (c === p("/")) {
        this.state = "authority";
    } else {
        this.state = "path";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse relative"] = function parseRelative(c) {
    this.url.scheme = this.base.scheme;
    if (c === p("/")) {
        this.state = "relative slash";
    } else if (isSpecial(this.url) && c === p("\\")) {
        this.parseError = true;
        this.state = "relative slash";
    } else {
        this.url.username = this.base.username;
        this.url.password = this.base.password;
        this.url.host = this.base.host;
        this.url.port = this.base.port;
        this.url.path = this.base.path.slice();
        this.url.query = this.base.query;
        if (c === p("?")) {
            this.url.query = "";
            this.state = "query";
        } else if (c === p("#")) {
            this.url.fragment = "";
            this.state = "fragment";
        } else if (!isNaN(c)) {
            this.url.query = null;
            this.url.path.pop();
            this.state = "path";
            --this.pointer;
        }
    }
    return true;
};
URLStateMachine.prototype["parse relative slash"] = function parseRelativeSlash(c) {
    if (isSpecial(this.url) && (c === p("/") || c === p("\\"))) {
        if (c === p("\\")) {
            this.parseError = true;
        }
        this.state = "special authority ignore slashes";
    } else if (c === p("/")) {
        this.state = "authority";
    } else {
        this.url.username = this.base.username;
        this.url.password = this.base.password;
        this.url.host = this.base.host;
        this.url.port = this.base.port;
        this.state = "path";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse special authority slashes"] = function parseSpecialAuthoritySlashes(c) {
    if (c === p("/") && this.input[this.pointer + 1] === p("/")) {
        this.state = "special authority ignore slashes";
        ++this.pointer;
    } else {
        this.parseError = true;
        this.state = "special authority ignore slashes";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse special authority ignore slashes"] = function parseSpecialAuthorityIgnoreSlashes(c) {
    if (c !== p("/") && c !== p("\\")) {
        this.state = "authority";
        --this.pointer;
    } else {
        this.parseError = true;
    }
    return true;
};
URLStateMachine.prototype["parse authority"] = function parseAuthority(c, cStr) {
    if (c === p("@")) {
        this.parseError = true;
        if (this.atFlag) {
            this.buffer = `%40${this.buffer}`;
        }
        this.atFlag = true;
        // careful, this is based on buffer and has its own pointer (this.pointer != pointer) and inner chars
        const len = countSymbols(this.buffer);
        for(let pointer = 0; pointer < len; ++pointer){
            const codePoint = this.buffer.codePointAt(pointer);
            if (codePoint === p(":") && !this.passwordTokenSeenFlag) {
                this.passwordTokenSeenFlag = true;
                continue;
            }
            const encodedCodePoints = utf8PercentEncodeCodePoint(codePoint, isUserinfoPercentEncode);
            if (this.passwordTokenSeenFlag) {
                this.url.password += encodedCodePoints;
            } else {
                this.url.username += encodedCodePoints;
            }
        }
        this.buffer = "";
    } else if (isNaN(c) || c === p("/") || c === p("?") || c === p("#") || isSpecial(this.url) && c === p("\\")) {
        if (this.atFlag && this.buffer === "") {
            this.parseError = true;
            return failure;
        }
        this.pointer -= countSymbols(this.buffer) + 1;
        this.buffer = "";
        this.state = "host";
    } else {
        this.buffer += cStr;
    }
    return true;
};
URLStateMachine.prototype["parse hostname"] = URLStateMachine.prototype["parse host"] = function parseHostName(c, cStr) {
    if (this.stateOverride && this.url.scheme === "file") {
        --this.pointer;
        this.state = "file host";
    } else if (c === p(":") && !this.arrFlag) {
        if (this.buffer === "") {
            this.parseError = true;
            return failure;
        }
        if (this.stateOverride === "hostname") {
            return false;
        }
        const host = parseHost(this.buffer, isNotSpecial(this.url));
        if (host === failure) {
            return failure;
        }
        this.url.host = host;
        this.buffer = "";
        this.state = "port";
    } else if (isNaN(c) || c === p("/") || c === p("?") || c === p("#") || isSpecial(this.url) && c === p("\\")) {
        --this.pointer;
        if (isSpecial(this.url) && this.buffer === "") {
            this.parseError = true;
            return failure;
        } else if (this.stateOverride && this.buffer === "" && (includesCredentials(this.url) || this.url.port !== null)) {
            this.parseError = true;
            return false;
        }
        const host = parseHost(this.buffer, isNotSpecial(this.url));
        if (host === failure) {
            return failure;
        }
        this.url.host = host;
        this.buffer = "";
        this.state = "path start";
        if (this.stateOverride) {
            return false;
        }
    } else {
        if (c === p("[")) {
            this.arrFlag = true;
        } else if (c === p("]")) {
            this.arrFlag = false;
        }
        this.buffer += cStr;
    }
    return true;
};
URLStateMachine.prototype["parse port"] = function parsePort(c, cStr) {
    if (infra.isASCIIDigit(c)) {
        this.buffer += cStr;
    } else if (isNaN(c) || c === p("/") || c === p("?") || c === p("#") || isSpecial(this.url) && c === p("\\") || this.stateOverride) {
        if (this.buffer !== "") {
            const port = parseInt(this.buffer);
            if (port > 2 ** 16 - 1) {
                this.parseError = true;
                return failure;
            }
            this.url.port = port === defaultPort(this.url.scheme) ? null : port;
            this.buffer = "";
        }
        if (this.stateOverride) {
            return false;
        }
        this.state = "path start";
        --this.pointer;
    } else {
        this.parseError = true;
        return failure;
    }
    return true;
};
const fileOtherwiseCodePoints = new Set([
    p("/"),
    p("\\"),
    p("?"),
    p("#")
]);
function startsWithWindowsDriveLetter(input, pointer) {
    const length = input.length - pointer;
    return length >= 2 && isWindowsDriveLetterCodePoints(input[pointer], input[pointer + 1]) && (length === 2 || fileOtherwiseCodePoints.has(input[pointer + 2]));
}
URLStateMachine.prototype["parse file"] = function parseFile(c) {
    this.url.scheme = "file";
    this.url.host = "";
    if (c === p("/") || c === p("\\")) {
        if (c === p("\\")) {
            this.parseError = true;
        }
        this.state = "file slash";
    } else if (this.base !== null && this.base.scheme === "file") {
        this.url.host = this.base.host;
        this.url.path = this.base.path.slice();
        this.url.query = this.base.query;
        if (c === p("?")) {
            this.url.query = "";
            this.state = "query";
        } else if (c === p("#")) {
            this.url.fragment = "";
            this.state = "fragment";
        } else if (!isNaN(c)) {
            this.url.query = null;
            if (!startsWithWindowsDriveLetter(this.input, this.pointer)) {
                shortenPath(this.url);
            } else {
                this.parseError = true;
                this.url.path = [];
            }
            this.state = "path";
            --this.pointer;
        }
    } else {
        this.state = "path";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse file slash"] = function parseFileSlash(c) {
    if (c === p("/") || c === p("\\")) {
        if (c === p("\\")) {
            this.parseError = true;
        }
        this.state = "file host";
    } else {
        if (this.base !== null && this.base.scheme === "file") {
            if (!startsWithWindowsDriveLetter(this.input, this.pointer) && isNormalizedWindowsDriveLetterString(this.base.path[0])) {
                this.url.path.push(this.base.path[0]);
            }
            this.url.host = this.base.host;
        }
        this.state = "path";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse file host"] = function parseFileHost(c, cStr) {
    if (isNaN(c) || c === p("/") || c === p("\\") || c === p("?") || c === p("#")) {
        --this.pointer;
        if (!this.stateOverride && isWindowsDriveLetterString(this.buffer)) {
            this.parseError = true;
            this.state = "path";
        } else if (this.buffer === "") {
            this.url.host = "";
            if (this.stateOverride) {
                return false;
            }
            this.state = "path start";
        } else {
            let host = parseHost(this.buffer, isNotSpecial(this.url));
            if (host === failure) {
                return failure;
            }
            if (host === "localhost") {
                host = "";
            }
            this.url.host = host;
            if (this.stateOverride) {
                return false;
            }
            this.buffer = "";
            this.state = "path start";
        }
    } else {
        this.buffer += cStr;
    }
    return true;
};
URLStateMachine.prototype["parse path start"] = function parsePathStart(c) {
    if (isSpecial(this.url)) {
        if (c === p("\\")) {
            this.parseError = true;
        }
        this.state = "path";
        if (c !== p("/") && c !== p("\\")) {
            --this.pointer;
        }
    } else if (!this.stateOverride && c === p("?")) {
        this.url.query = "";
        this.state = "query";
    } else if (!this.stateOverride && c === p("#")) {
        this.url.fragment = "";
        this.state = "fragment";
    } else if (c !== undefined) {
        this.state = "path";
        if (c !== p("/")) {
            --this.pointer;
        }
    } else if (this.stateOverride && this.url.host === null) {
        this.url.path.push("");
    }
    return true;
};
URLStateMachine.prototype["parse path"] = function parsePath(c) {
    if (isNaN(c) || c === p("/") || isSpecial(this.url) && c === p("\\") || !this.stateOverride && (c === p("?") || c === p("#"))) {
        if (isSpecial(this.url) && c === p("\\")) {
            this.parseError = true;
        }
        if (isDoubleDot(this.buffer)) {
            shortenPath(this.url);
            if (c !== p("/") && !(isSpecial(this.url) && c === p("\\"))) {
                this.url.path.push("");
            }
        } else if (isSingleDot(this.buffer) && c !== p("/") && !(isSpecial(this.url) && c === p("\\"))) {
            this.url.path.push("");
        } else if (!isSingleDot(this.buffer)) {
            if (this.url.scheme === "file" && this.url.path.length === 0 && isWindowsDriveLetterString(this.buffer)) {
                this.buffer = `${this.buffer[0]}:`;
            }
            this.url.path.push(this.buffer);
        }
        this.buffer = "";
        if (c === p("?")) {
            this.url.query = "";
            this.state = "query";
        }
        if (c === p("#")) {
            this.url.fragment = "";
            this.state = "fragment";
        }
    } else {
        // TODO: If c is not a URL code point and not "%", parse error.
        if (c === p("%") && (!infra.isASCIIHex(this.input[this.pointer + 1]) || !infra.isASCIIHex(this.input[this.pointer + 2]))) {
            this.parseError = true;
        }
        this.buffer += utf8PercentEncodeCodePoint(c, isPathPercentEncode);
    }
    return true;
};
URLStateMachine.prototype["parse opaque path"] = function parseOpaquePath(c) {
    if (c === p("?")) {
        this.url.query = "";
        this.state = "query";
    } else if (c === p("#")) {
        this.url.fragment = "";
        this.state = "fragment";
    } else if (c === p(" ")) {
        const remaining = this.input[this.pointer + 1];
        if (remaining === p("?") || remaining === p("#")) {
            this.url.path += "%20";
        } else {
            this.url.path += " ";
        }
    } else {
        // TODO: Add: not a URL code point
        if (!isNaN(c) && c !== p("%")) {
            this.parseError = true;
        }
        if (c === p("%") && (!infra.isASCIIHex(this.input[this.pointer + 1]) || !infra.isASCIIHex(this.input[this.pointer + 2]))) {
            this.parseError = true;
        }
        if (!isNaN(c)) {
            this.url.path += utf8PercentEncodeCodePoint(c, isC0ControlPercentEncode);
        }
    }
    return true;
};
URLStateMachine.prototype["parse query"] = function parseQuery(c, cStr) {
    if (!isSpecial(this.url) || this.url.scheme === "ws" || this.url.scheme === "wss") {
        this.encodingOverride = "utf-8";
    }
    if (!this.stateOverride && c === p("#") || isNaN(c)) {
        const queryPercentEncodePredicate = isSpecial(this.url) ? isSpecialQueryPercentEncode : isQueryPercentEncode;
        this.url.query += utf8PercentEncodeString(this.buffer, queryPercentEncodePredicate);
        this.buffer = "";
        if (c === p("#")) {
            this.url.fragment = "";
            this.state = "fragment";
        }
    } else if (!isNaN(c)) {
        // TODO: If c is not a URL code point and not "%", parse error.
        if (c === p("%") && (!infra.isASCIIHex(this.input[this.pointer + 1]) || !infra.isASCIIHex(this.input[this.pointer + 2]))) {
            this.parseError = true;
        }
        this.buffer += cStr;
    }
    return true;
};
URLStateMachine.prototype["parse fragment"] = function parseFragment(c) {
    if (!isNaN(c)) {
        // TODO: If c is not a URL code point and not "%", parse error.
        if (c === p("%") && (!infra.isASCIIHex(this.input[this.pointer + 1]) || !infra.isASCIIHex(this.input[this.pointer + 2]))) {
            this.parseError = true;
        }
        this.url.fragment += utf8PercentEncodeCodePoint(c, isFragmentPercentEncode);
    }
    return true;
};
function serializeURL(url, excludeFragment) {
    let output = `${url.scheme}:`;
    if (url.host !== null) {
        output += "//";
        if (url.username !== "" || url.password !== "") {
            output += url.username;
            if (url.password !== "") {
                output += `:${url.password}`;
            }
            output += "@";
        }
        output += serializeHost(url.host);
        if (url.port !== null) {
            output += `:${url.port}`;
        }
    }
    if (url.host === null && !hasAnOpaquePath(url) && url.path.length > 1 && url.path[0] === "") {
        output += "/.";
    }
    output += serializePath(url);
    if (url.query !== null) {
        output += `?${url.query}`;
    }
    if (!excludeFragment && url.fragment !== null) {
        output += `#${url.fragment}`;
    }
    return output;
}
function serializeOrigin(tuple) {
    let result = `${tuple.scheme}://`;
    result += serializeHost(tuple.host);
    if (tuple.port !== null) {
        result += `:${tuple.port}`;
    }
    return result;
}
function serializePath(url) {
    if (hasAnOpaquePath(url)) {
        return url.path;
    }
    let output = "";
    for (const segment of url.path){
        output += `/${segment}`;
    }
    return output;
}
module.exports.serializeURL = serializeURL;
module.exports.serializePath = serializePath;
module.exports.serializeURLOrigin = function(url) {
    // https://url.spec.whatwg.org/#concept-url-origin
    switch(url.scheme){
        case "blob":
            {
                const pathURL = module.exports.parseURL(serializePath(url));
                if (pathURL === null) {
                    return "null";
                }
                if (pathURL.scheme !== "http" && pathURL.scheme !== "https") {
                    return "null";
                }
                return module.exports.serializeURLOrigin(pathURL);
            }
        case "ftp":
        case "http":
        case "https":
        case "ws":
        case "wss":
            return serializeOrigin({
                scheme: url.scheme,
                host: url.host,
                port: url.port
            });
        case "file":
            // The spec says:
            // > Unfortunate as it is, this is left as an exercise to the reader. When in doubt, return a new opaque origin.
            // Browsers tested so far:
            // - Chrome says "file://", but treats file: URLs as cross-origin for most (all?) purposes; see e.g.
            //   https://bugs.chromium.org/p/chromium/issues/detail?id=37586
            // - Firefox says "null", but treats file: URLs as same-origin sometimes based on directory stuff; see
            //   https://developer.mozilla.org/en-US/docs/Archive/Misc_top_level/Same-origin_policy_for_file:_URIs
            return "null";
        default:
            // serializing an opaque origin returns "null"
            return "null";
    }
};
module.exports.basicURLParse = function(input, options) {
    if (options === undefined) {
        options = {};
    }
    const usm = new URLStateMachine(input, options.baseURL, options.encodingOverride, options.url, options.stateOverride);
    if (usm.failure) {
        return null;
    }
    return usm.url;
};
module.exports.setTheUsername = function(url, username) {
    url.username = utf8PercentEncodeString(username, isUserinfoPercentEncode);
};
module.exports.setThePassword = function(url, password) {
    url.password = utf8PercentEncodeString(password, isUserinfoPercentEncode);
};
module.exports.serializeHost = serializeHost;
module.exports.cannotHaveAUsernamePasswordPort = cannotHaveAUsernamePasswordPort;
module.exports.hasAnOpaquePath = hasAnOpaquePath;
module.exports.serializeInteger = function(integer) {
    return String(integer);
};
module.exports.parseURL = function(input, options) {
    if (options === undefined) {
        options = {};
    }
    // We don't handle blobs, so this just delegates:
    return module.exports.basicURLParse(input, {
        baseURL: options.baseURL,
        encodingOverride: options.encodingOverride
    });
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/urlencoded.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { utf8Encode, utf8DecodeWithoutBOM } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/encoding.js [app-ssr] (ecmascript)");
const { percentDecodeBytes, utf8PercentEncodeString, isURLEncodedPercentEncode } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/percent-encoding.js [app-ssr] (ecmascript)");
function p(char) {
    return char.codePointAt(0);
}
// https://url.spec.whatwg.org/#concept-urlencoded-parser
function parseUrlencoded(input) {
    const sequences = strictlySplitByteSequence(input, p("&"));
    const output = [];
    for (const bytes of sequences){
        if (bytes.length === 0) {
            continue;
        }
        let name, value;
        const indexOfEqual = bytes.indexOf(p("="));
        if (indexOfEqual >= 0) {
            name = bytes.slice(0, indexOfEqual);
            value = bytes.slice(indexOfEqual + 1);
        } else {
            name = bytes;
            value = new Uint8Array(0);
        }
        name = replaceByteInByteSequence(name, 0x2B, 0x20);
        value = replaceByteInByteSequence(value, 0x2B, 0x20);
        const nameString = utf8DecodeWithoutBOM(percentDecodeBytes(name));
        const valueString = utf8DecodeWithoutBOM(percentDecodeBytes(value));
        output.push([
            nameString,
            valueString
        ]);
    }
    return output;
}
// https://url.spec.whatwg.org/#concept-urlencoded-string-parser
function parseUrlencodedString(input) {
    return parseUrlencoded(utf8Encode(input));
}
// https://url.spec.whatwg.org/#concept-urlencoded-serializer
function serializeUrlencoded(tuples) {
    // TODO: accept and use encoding argument
    let output = "";
    for (const [i, tuple] of tuples.entries()){
        const name = utf8PercentEncodeString(tuple[0], isURLEncodedPercentEncode, true);
        const value = utf8PercentEncodeString(tuple[1], isURLEncodedPercentEncode, true);
        if (i !== 0) {
            output += "&";
        }
        output += `${name}=${value}`;
    }
    return output;
}
function strictlySplitByteSequence(buf, cp) {
    const list = [];
    let last = 0;
    let i = buf.indexOf(cp);
    while(i >= 0){
        list.push(buf.slice(last, i));
        last = i + 1;
        i = buf.indexOf(cp, last);
    }
    if (last !== buf.length) {
        list.push(buf.slice(last));
    }
    return list;
}
function replaceByteInByteSequence(buf, from, to) {
    let i = buf.indexOf(from);
    while(i >= 0){
        buf[i] = to;
        i = buf.indexOf(from, i + 1);
    }
    return buf;
}
module.exports = {
    parseUrlencodedString,
    serializeUrlencoded
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/URLSearchParams-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const urlencoded = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/urlencoded.js [app-ssr] (ecmascript)");
exports.implementation = class URLSearchParamsImpl {
    constructor(globalObject, constructorArgs, { doNotStripQMark = false }){
        let init = constructorArgs[0];
        this._list = [];
        this._url = null;
        if (!doNotStripQMark && typeof init === "string" && init[0] === "?") {
            init = init.slice(1);
        }
        if (Array.isArray(init)) {
            for (const pair of init){
                if (pair.length !== 2) {
                    throw new TypeError("Failed to construct 'URLSearchParams': parameter 1 sequence's element does not " + "contain exactly two elements.");
                }
                this._list.push([
                    pair[0],
                    pair[1]
                ]);
            }
        } else if (typeof init === "object" && Object.getPrototypeOf(init) === null) {
            for (const name of Object.keys(init)){
                const value = init[name];
                this._list.push([
                    name,
                    value
                ]);
            }
        } else {
            this._list = urlencoded.parseUrlencodedString(init);
        }
    }
    _updateSteps() {
        if (this._url !== null) {
            let serializedQuery = urlencoded.serializeUrlencoded(this._list);
            if (serializedQuery === "") {
                serializedQuery = null;
            }
            this._url._url.query = serializedQuery;
        }
    }
    get size() {
        return this._list.length;
    }
    append(name, value) {
        this._list.push([
            name,
            value
        ]);
        this._updateSteps();
    }
    delete(name, value) {
        let i = 0;
        while(i < this._list.length){
            if (this._list[i][0] === name && (value === undefined || this._list[i][1] === value)) {
                this._list.splice(i, 1);
            } else {
                i++;
            }
        }
        this._updateSteps();
    }
    get(name) {
        for (const tuple of this._list){
            if (tuple[0] === name) {
                return tuple[1];
            }
        }
        return null;
    }
    getAll(name) {
        const output = [];
        for (const tuple of this._list){
            if (tuple[0] === name) {
                output.push(tuple[1]);
            }
        }
        return output;
    }
    has(name, value) {
        for (const tuple of this._list){
            if (tuple[0] === name && (value === undefined || tuple[1] === value)) {
                return true;
            }
        }
        return false;
    }
    set(name, value) {
        let found = false;
        let i = 0;
        while(i < this._list.length){
            if (this._list[i][0] === name) {
                if (found) {
                    this._list.splice(i, 1);
                } else {
                    found = true;
                    this._list[i][1] = value;
                    i++;
                }
            } else {
                i++;
            }
        }
        if (!found) {
            this._list.push([
                name,
                value
            ]);
        }
        this._updateSteps();
    }
    sort() {
        this._list.sort((a, b)=>{
            if (a[0] < b[0]) {
                return -1;
            }
            if (a[0] > b[0]) {
                return 1;
            }
            return 0;
        });
        this._updateSteps();
    }
    [Symbol.iterator]() {
        return this._list[Symbol.iterator]();
    }
    toString() {
        return urlencoded.serializeUrlencoded(this._list);
    }
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Returns "Type(value) is Object" in ES terminology.
function isObject(value) {
    return typeof value === "object" && value !== null || typeof value === "function";
}
const hasOwn = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
// Like `Object.assign`, but using `[[GetOwnProperty]]` and `[[DefineOwnProperty]]`
// instead of `[[Get]]` and `[[Set]]` and only allowing objects
function define(target, source) {
    for (const key of Reflect.ownKeys(source)){
        const descriptor = Reflect.getOwnPropertyDescriptor(source, key);
        if (descriptor && !Reflect.defineProperty(target, key, descriptor)) {
            throw new TypeError(`Cannot redefine property: ${String(key)}`);
        }
    }
}
function newObjectInRealm(globalObject, object) {
    const ctorRegistry = initCtorRegistry(globalObject);
    return Object.defineProperties(Object.create(ctorRegistry["%Object.prototype%"]), Object.getOwnPropertyDescriptors(object));
}
const wrapperSymbol = Symbol("wrapper");
const implSymbol = Symbol("impl");
const sameObjectCaches = Symbol("SameObject caches");
const ctorRegistrySymbol = Symbol.for("[webidl2js] constructor registry");
const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function*() {}).prototype);
function initCtorRegistry(globalObject) {
    if (hasOwn(globalObject, ctorRegistrySymbol)) {
        return globalObject[ctorRegistrySymbol];
    }
    const ctorRegistry = Object.create(null);
    // In addition to registering all the WebIDL2JS-generated types in the constructor registry,
    // we also register a few intrinsics that we make use of in generated code, since they are not
    // easy to grab from the globalObject variable.
    ctorRegistry["%Object.prototype%"] = globalObject.Object.prototype;
    ctorRegistry["%IteratorPrototype%"] = Object.getPrototypeOf(Object.getPrototypeOf(new globalObject.Array()[Symbol.iterator]()));
    try {
        ctorRegistry["%AsyncIteratorPrototype%"] = Object.getPrototypeOf(Object.getPrototypeOf(globalObject.eval("(async function* () {})").prototype));
    } catch  {
        ctorRegistry["%AsyncIteratorPrototype%"] = AsyncIteratorPrototype;
    }
    globalObject[ctorRegistrySymbol] = ctorRegistry;
    return ctorRegistry;
}
function getSameObject(wrapper, prop, creator) {
    if (!wrapper[sameObjectCaches]) {
        wrapper[sameObjectCaches] = Object.create(null);
    }
    if (prop in wrapper[sameObjectCaches]) {
        return wrapper[sameObjectCaches][prop];
    }
    wrapper[sameObjectCaches][prop] = creator();
    return wrapper[sameObjectCaches][prop];
}
function wrapperForImpl(impl) {
    return impl ? impl[wrapperSymbol] : null;
}
function implForWrapper(wrapper) {
    return wrapper ? wrapper[implSymbol] : null;
}
function tryWrapperForImpl(impl) {
    const wrapper = wrapperForImpl(impl);
    return wrapper ? wrapper : impl;
}
function tryImplForWrapper(wrapper) {
    const impl = implForWrapper(wrapper);
    return impl ? impl : wrapper;
}
const iterInternalSymbol = Symbol("internal");
function isArrayIndexPropName(P) {
    if (typeof P !== "string") {
        return false;
    }
    const i = P >>> 0;
    if (i === 2 ** 32 - 1) {
        return false;
    }
    const s = `${i}`;
    if (P !== s) {
        return false;
    }
    return true;
}
const byteLengthGetter = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get;
function isArrayBuffer(value) {
    try {
        byteLengthGetter.call(value);
        return true;
    } catch (e) {
        return false;
    }
}
function iteratorResult([key, value], kind) {
    let result;
    switch(kind){
        case "key":
            result = key;
            break;
        case "value":
            result = value;
            break;
        case "key+value":
            result = [
                key,
                value
            ];
            break;
    }
    return {
        value: result,
        done: false
    };
}
const supportsPropertyIndex = Symbol("supports property index");
const supportedPropertyIndices = Symbol("supported property indices");
const supportsPropertyName = Symbol("supports property name");
const supportedPropertyNames = Symbol("supported property names");
const indexedGet = Symbol("indexed property get");
const indexedSetNew = Symbol("indexed property set new");
const indexedSetExisting = Symbol("indexed property set existing");
const namedGet = Symbol("named property get");
const namedSetNew = Symbol("named property set new");
const namedSetExisting = Symbol("named property set existing");
const namedDelete = Symbol("named property delete");
const asyncIteratorNext = Symbol("async iterator get the next iteration result");
const asyncIteratorReturn = Symbol("async iterator return steps");
const asyncIteratorInit = Symbol("async iterator initialization steps");
const asyncIteratorEOI = Symbol("async iterator end of iteration");
module.exports = exports = {
    isObject,
    hasOwn,
    define,
    newObjectInRealm,
    wrapperSymbol,
    implSymbol,
    getSameObject,
    ctorRegistrySymbol,
    initCtorRegistry,
    wrapperForImpl,
    implForWrapper,
    tryWrapperForImpl,
    tryImplForWrapper,
    iterInternalSymbol,
    isArrayBuffer,
    isArrayIndexPropName,
    supportsPropertyIndex,
    supportedPropertyIndices,
    supportsPropertyName,
    supportedPropertyNames,
    indexedGet,
    indexedSetNew,
    indexedSetExisting,
    namedGet,
    namedSetNew,
    namedSetExisting,
    namedDelete,
    asyncIteratorNext,
    asyncIteratorReturn,
    asyncIteratorInit,
    asyncIteratorEOI,
    iteratorResult
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/Function.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const conversions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)");
const utils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/utils.js [app-ssr] (ecmascript)");
exports.convert = (globalObject, value, { context = "The provided value" } = {})=>{
    if (typeof value !== "function") {
        throw new globalObject.TypeError(context + " is not a function");
    }
    function invokeTheCallbackFunction(...args) {
        const thisArg = utils.tryWrapperForImpl(this);
        let callResult;
        for(let i = 0; i < args.length; i++){
            args[i] = utils.tryWrapperForImpl(args[i]);
        }
        callResult = Reflect.apply(value, thisArg, args);
        callResult = conversions["any"](callResult, {
            context: context,
            globals: globalObject
        });
        return callResult;
    }
    invokeTheCallbackFunction.construct = (...args)=>{
        for(let i = 0; i < args.length; i++){
            args[i] = utils.tryWrapperForImpl(args[i]);
        }
        let callResult = Reflect.construct(value, args);
        callResult = conversions["any"](callResult, {
            context: context,
            globals: globalObject
        });
        return callResult;
    };
    invokeTheCallbackFunction[utils.wrapperSymbol] = value;
    invokeTheCallbackFunction.objectReference = value;
    return invokeTheCallbackFunction;
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/URLSearchParams.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const conversions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)");
const utils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/utils.js [app-ssr] (ecmascript)");
const Function = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/Function.js [app-ssr] (ecmascript)");
const newObjectInRealm = utils.newObjectInRealm;
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const interfaceName = "URLSearchParams";
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
    throw new globalObject.TypeError(`${context} is not of type 'URLSearchParams'.`);
};
exports.createDefaultIterator = (globalObject, target, kind)=>{
    const ctorRegistry = globalObject[ctorRegistrySymbol];
    const iteratorPrototype = ctorRegistry["URLSearchParams Iterator"];
    const iterator = Object.create(iteratorPrototype);
    Object.defineProperty(iterator, utils.iterInternalSymbol, {
        value: {
            target,
            kind,
            index: 0
        },
        configurable: true
    });
    return iterator;
};
function makeWrapper(globalObject, newTarget) {
    let proto;
    if (newTarget !== undefined) {
        proto = newTarget.prototype;
    }
    if (!utils.isObject(proto)) {
        proto = globalObject[ctorRegistrySymbol]["URLSearchParams"].prototype;
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
exports._internalSetup = (wrapper, globalObject)=>{};
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
const exposed = new Set([
    "Window",
    "Worker"
]);
exports.install = (globalObject, globalNames)=>{
    if (!globalNames.some((globalName)=>exposed.has(globalName))) {
        return;
    }
    const ctorRegistry = utils.initCtorRegistry(globalObject);
    class URLSearchParams {
        constructor(){
            const args = [];
            {
                let curArg = arguments[0];
                if (curArg !== undefined) {
                    if (utils.isObject(curArg)) {
                        if (curArg[Symbol.iterator] !== undefined) {
                            if (!utils.isObject(curArg)) {
                                throw new globalObject.TypeError("Failed to construct 'URLSearchParams': parameter 1" + " sequence" + " is not an iterable object.");
                            } else {
                                const V = [];
                                const tmp = curArg;
                                for (let nextItem of tmp){
                                    if (!utils.isObject(nextItem)) {
                                        throw new globalObject.TypeError("Failed to construct 'URLSearchParams': parameter 1" + " sequence" + "'s element" + " is not an iterable object.");
                                    } else {
                                        const V = [];
                                        const tmp = nextItem;
                                        for (let nextItem of tmp){
                                            nextItem = conversions["USVString"](nextItem, {
                                                context: "Failed to construct 'URLSearchParams': parameter 1" + " sequence" + "'s element" + "'s element",
                                                globals: globalObject
                                            });
                                            V.push(nextItem);
                                        }
                                        nextItem = V;
                                    }
                                    V.push(nextItem);
                                }
                                curArg = V;
                            }
                        } else {
                            if (!utils.isObject(curArg)) {
                                throw new globalObject.TypeError("Failed to construct 'URLSearchParams': parameter 1" + " record" + " is not an object.");
                            } else {
                                const result = Object.create(null);
                                for (const key of Reflect.ownKeys(curArg)){
                                    const desc = Object.getOwnPropertyDescriptor(curArg, key);
                                    if (desc && desc.enumerable) {
                                        let typedKey = key;
                                        typedKey = conversions["USVString"](typedKey, {
                                            context: "Failed to construct 'URLSearchParams': parameter 1" + " record" + "'s key",
                                            globals: globalObject
                                        });
                                        let typedValue = curArg[key];
                                        typedValue = conversions["USVString"](typedValue, {
                                            context: "Failed to construct 'URLSearchParams': parameter 1" + " record" + "'s value",
                                            globals: globalObject
                                        });
                                        result[typedKey] = typedValue;
                                    }
                                }
                                curArg = result;
                            }
                        }
                    } else {
                        curArg = conversions["USVString"](curArg, {
                            context: "Failed to construct 'URLSearchParams': parameter 1",
                            globals: globalObject
                        });
                    }
                } else {
                    curArg = "";
                }
                args.push(curArg);
            }
            return exports.setup(Object.create(new.target.prototype), globalObject, args);
        }
        append(name, value) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'append' called on an object that is not a valid instance of URLSearchParams.");
            }
            if (arguments.length < 2) {
                throw new globalObject.TypeError(`Failed to execute 'append' on 'URLSearchParams': 2 arguments required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["USVString"](curArg, {
                    context: "Failed to execute 'append' on 'URLSearchParams': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                curArg = conversions["USVString"](curArg, {
                    context: "Failed to execute 'append' on 'URLSearchParams': parameter 2",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].append(...args));
        }
        delete(name) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'delete' called on an object that is not a valid instance of URLSearchParams.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'delete' on 'URLSearchParams': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["USVString"](curArg, {
                    context: "Failed to execute 'delete' on 'URLSearchParams': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                if (curArg !== undefined) {
                    curArg = conversions["USVString"](curArg, {
                        context: "Failed to execute 'delete' on 'URLSearchParams': parameter 2",
                        globals: globalObject
                    });
                }
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].delete(...args));
        }
        get(name) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get' called on an object that is not a valid instance of URLSearchParams.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'get' on 'URLSearchParams': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["USVString"](curArg, {
                    context: "Failed to execute 'get' on 'URLSearchParams': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return esValue[implSymbol].get(...args);
        }
        getAll(name) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'getAll' called on an object that is not a valid instance of URLSearchParams.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'getAll' on 'URLSearchParams': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["USVString"](curArg, {
                    context: "Failed to execute 'getAll' on 'URLSearchParams': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].getAll(...args));
        }
        has(name) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'has' called on an object that is not a valid instance of URLSearchParams.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'has' on 'URLSearchParams': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["USVString"](curArg, {
                    context: "Failed to execute 'has' on 'URLSearchParams': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                if (curArg !== undefined) {
                    curArg = conversions["USVString"](curArg, {
                        context: "Failed to execute 'has' on 'URLSearchParams': parameter 2",
                        globals: globalObject
                    });
                }
                args.push(curArg);
            }
            return esValue[implSymbol].has(...args);
        }
        set(name, value) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set' called on an object that is not a valid instance of URLSearchParams.");
            }
            if (arguments.length < 2) {
                throw new globalObject.TypeError(`Failed to execute 'set' on 'URLSearchParams': 2 arguments required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["USVString"](curArg, {
                    context: "Failed to execute 'set' on 'URLSearchParams': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                curArg = conversions["USVString"](curArg, {
                    context: "Failed to execute 'set' on 'URLSearchParams': parameter 2",
                    globals: globalObject
                });
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].set(...args));
        }
        sort() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'sort' called on an object that is not a valid instance of URLSearchParams.");
            }
            return utils.tryWrapperForImpl(esValue[implSymbol].sort());
        }
        toString() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'toString' called on an object that is not a valid instance of URLSearchParams.");
            }
            return esValue[implSymbol].toString();
        }
        keys() {
            if (!exports.is(this)) {
                throw new globalObject.TypeError("'keys' called on an object that is not a valid instance of URLSearchParams.");
            }
            return exports.createDefaultIterator(globalObject, this, "key");
        }
        values() {
            if (!exports.is(this)) {
                throw new globalObject.TypeError("'values' called on an object that is not a valid instance of URLSearchParams.");
            }
            return exports.createDefaultIterator(globalObject, this, "value");
        }
        entries() {
            if (!exports.is(this)) {
                throw new globalObject.TypeError("'entries' called on an object that is not a valid instance of URLSearchParams.");
            }
            return exports.createDefaultIterator(globalObject, this, "key+value");
        }
        forEach(callback) {
            if (!exports.is(this)) {
                throw new globalObject.TypeError("'forEach' called on an object that is not a valid instance of URLSearchParams.");
            }
            if (arguments.length < 1) {
                throw new globalObject.TypeError("Failed to execute 'forEach' on 'iterable': 1 argument required, but only 0 present.");
            }
            callback = Function.convert(globalObject, callback, {
                context: "Failed to execute 'forEach' on 'iterable': The callback provided as parameter 1"
            });
            const thisArg = arguments[1];
            let pairs = Array.from(this[implSymbol]);
            let i = 0;
            while(i < pairs.length){
                const [key, value] = pairs[i].map(utils.tryWrapperForImpl);
                callback.call(thisArg, value, key, this);
                pairs = Array.from(this[implSymbol]);
                i++;
            }
        }
        get size() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get size' called on an object that is not a valid instance of URLSearchParams.");
            }
            return esValue[implSymbol]["size"];
        }
    }
    Object.defineProperties(URLSearchParams.prototype, {
        append: {
            enumerable: true
        },
        delete: {
            enumerable: true
        },
        get: {
            enumerable: true
        },
        getAll: {
            enumerable: true
        },
        has: {
            enumerable: true
        },
        set: {
            enumerable: true
        },
        sort: {
            enumerable: true
        },
        toString: {
            enumerable: true
        },
        keys: {
            enumerable: true
        },
        values: {
            enumerable: true
        },
        entries: {
            enumerable: true
        },
        forEach: {
            enumerable: true
        },
        size: {
            enumerable: true
        },
        [Symbol.toStringTag]: {
            value: "URLSearchParams",
            configurable: true
        },
        [Symbol.iterator]: {
            value: URLSearchParams.prototype.entries,
            configurable: true,
            writable: true
        }
    });
    ctorRegistry[interfaceName] = URLSearchParams;
    ctorRegistry["URLSearchParams Iterator"] = Object.create(ctorRegistry["%IteratorPrototype%"], {
        [Symbol.toStringTag]: {
            configurable: true,
            value: "URLSearchParams Iterator"
        }
    });
    utils.define(ctorRegistry["URLSearchParams Iterator"], {
        next () {
            const internal = this && this[utils.iterInternalSymbol];
            if (!internal) {
                throw new globalObject.TypeError("next() called on a value that is not a URLSearchParams iterator object");
            }
            const { target, kind, index } = internal;
            const values = Array.from(target[implSymbol]);
            const len = values.length;
            if (index >= len) {
                return newObjectInRealm(globalObject, {
                    value: undefined,
                    done: true
                });
            }
            const pair = values[index];
            internal.index = index + 1;
            return newObjectInRealm(globalObject, utils.iteratorResult(pair.map(utils.tryWrapperForImpl), kind));
        }
    });
    Object.defineProperty(globalObject, interfaceName, {
        configurable: true,
        writable: true,
        value: URLSearchParams
    });
};
const Impl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/URLSearchParams-impl.js [app-ssr] (ecmascript)");
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/URL-impl.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const usm = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/url-state-machine.js [app-ssr] (ecmascript)");
const urlencoded = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/urlencoded.js [app-ssr] (ecmascript)");
const URLSearchParams = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/URLSearchParams.js [app-ssr] (ecmascript)");
exports.implementation = class URLImpl {
    // Unlike the spec, we duplicate some code between the constructor and canParse, because we want to give useful error
    // messages in the constructor that distinguish between the different causes of failure.
    constructor(globalObject, [url, base]){
        let parsedBase = null;
        if (base !== undefined) {
            parsedBase = usm.basicURLParse(base);
            if (parsedBase === null) {
                throw new TypeError(`Invalid base URL: ${base}`);
            }
        }
        const parsedURL = usm.basicURLParse(url, {
            baseURL: parsedBase
        });
        if (parsedURL === null) {
            throw new TypeError(`Invalid URL: ${url}`);
        }
        const query = parsedURL.query !== null ? parsedURL.query : "";
        this._url = parsedURL;
        // We cannot invoke the "new URLSearchParams object" algorithm without going through the constructor, which strips
        // question mark by default. Therefore the doNotStripQMark hack is used.
        this._query = URLSearchParams.createImpl(globalObject, [
            query
        ], {
            doNotStripQMark: true
        });
        this._query._url = this;
    }
    static parse(globalObject, input, base) {
        try {
            return new URLImpl(globalObject, [
                input,
                base
            ]);
        } catch  {
            return null;
        }
    }
    static canParse(url, base) {
        let parsedBase = null;
        if (base !== undefined) {
            parsedBase = usm.basicURLParse(base);
            if (parsedBase === null) {
                return false;
            }
        }
        const parsedURL = usm.basicURLParse(url, {
            baseURL: parsedBase
        });
        if (parsedURL === null) {
            return false;
        }
        return true;
    }
    get href() {
        return usm.serializeURL(this._url);
    }
    set href(v) {
        const parsedURL = usm.basicURLParse(v);
        if (parsedURL === null) {
            throw new TypeError(`Invalid URL: ${v}`);
        }
        this._url = parsedURL;
        this._query._list.splice(0);
        const { query } = parsedURL;
        if (query !== null) {
            this._query._list = urlencoded.parseUrlencodedString(query);
        }
    }
    get origin() {
        return usm.serializeURLOrigin(this._url);
    }
    get protocol() {
        return `${this._url.scheme}:`;
    }
    set protocol(v) {
        usm.basicURLParse(`${v}:`, {
            url: this._url,
            stateOverride: "scheme start"
        });
    }
    get username() {
        return this._url.username;
    }
    set username(v) {
        if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
            return;
        }
        usm.setTheUsername(this._url, v);
    }
    get password() {
        return this._url.password;
    }
    set password(v) {
        if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
            return;
        }
        usm.setThePassword(this._url, v);
    }
    get host() {
        const url = this._url;
        if (url.host === null) {
            return "";
        }
        if (url.port === null) {
            return usm.serializeHost(url.host);
        }
        return `${usm.serializeHost(url.host)}:${usm.serializeInteger(url.port)}`;
    }
    set host(v) {
        if (usm.hasAnOpaquePath(this._url)) {
            return;
        }
        usm.basicURLParse(v, {
            url: this._url,
            stateOverride: "host"
        });
    }
    get hostname() {
        if (this._url.host === null) {
            return "";
        }
        return usm.serializeHost(this._url.host);
    }
    set hostname(v) {
        if (usm.hasAnOpaquePath(this._url)) {
            return;
        }
        usm.basicURLParse(v, {
            url: this._url,
            stateOverride: "hostname"
        });
    }
    get port() {
        if (this._url.port === null) {
            return "";
        }
        return usm.serializeInteger(this._url.port);
    }
    set port(v) {
        if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
            return;
        }
        if (v === "") {
            this._url.port = null;
        } else {
            usm.basicURLParse(v, {
                url: this._url,
                stateOverride: "port"
            });
        }
    }
    get pathname() {
        return usm.serializePath(this._url);
    }
    set pathname(v) {
        if (usm.hasAnOpaquePath(this._url)) {
            return;
        }
        this._url.path = [];
        usm.basicURLParse(v, {
            url: this._url,
            stateOverride: "path start"
        });
    }
    get search() {
        if (this._url.query === null || this._url.query === "") {
            return "";
        }
        return `?${this._url.query}`;
    }
    set search(v) {
        const url = this._url;
        if (v === "") {
            url.query = null;
            this._query._list = [];
            return;
        }
        const input = v[0] === "?" ? v.substring(1) : v;
        url.query = "";
        usm.basicURLParse(input, {
            url,
            stateOverride: "query"
        });
        this._query._list = urlencoded.parseUrlencodedString(input);
    }
    get searchParams() {
        return this._query;
    }
    get hash() {
        if (this._url.fragment === null || this._url.fragment === "") {
            return "";
        }
        return `#${this._url.fragment}`;
    }
    set hash(v) {
        if (v === "") {
            this._url.fragment = null;
            return;
        }
        const input = v[0] === "#" ? v.substring(1) : v;
        this._url.fragment = "";
        usm.basicURLParse(input, {
            url: this._url,
            stateOverride: "fragment"
        });
    }
    toJSON() {
        return this.href;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/URL.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const conversions = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)");
const utils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/utils.js [app-ssr] (ecmascript)");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const interfaceName = "URL";
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
    throw new globalObject.TypeError(`${context} is not of type 'URL'.`);
};
function makeWrapper(globalObject, newTarget) {
    let proto;
    if (newTarget !== undefined) {
        proto = newTarget.prototype;
    }
    if (!utils.isObject(proto)) {
        proto = globalObject[ctorRegistrySymbol]["URL"].prototype;
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
exports._internalSetup = (wrapper, globalObject)=>{};
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
const exposed = new Set([
    "Window",
    "Worker"
]);
exports.install = (globalObject, globalNames)=>{
    if (!globalNames.some((globalName)=>exposed.has(globalName))) {
        return;
    }
    const ctorRegistry = utils.initCtorRegistry(globalObject);
    class URL {
        constructor(url){
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to construct 'URL': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["USVString"](curArg, {
                    context: "Failed to construct 'URL': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                if (curArg !== undefined) {
                    curArg = conversions["USVString"](curArg, {
                        context: "Failed to construct 'URL': parameter 2",
                        globals: globalObject
                    });
                }
                args.push(curArg);
            }
            return exports.setup(Object.create(new.target.prototype), globalObject, args);
        }
        toJSON() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'toJSON' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol].toJSON();
        }
        get href() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get href' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol]["href"];
        }
        set href(V) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set href' called on an object that is not a valid instance of URL.");
            }
            V = conversions["USVString"](V, {
                context: "Failed to set the 'href' property on 'URL': The provided value",
                globals: globalObject
            });
            esValue[implSymbol]["href"] = V;
        }
        toString() {
            const esValue = this;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'toString' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol]["href"];
        }
        get origin() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get origin' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol]["origin"];
        }
        get protocol() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get protocol' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol]["protocol"];
        }
        set protocol(V) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set protocol' called on an object that is not a valid instance of URL.");
            }
            V = conversions["USVString"](V, {
                context: "Failed to set the 'protocol' property on 'URL': The provided value",
                globals: globalObject
            });
            esValue[implSymbol]["protocol"] = V;
        }
        get username() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get username' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol]["username"];
        }
        set username(V) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set username' called on an object that is not a valid instance of URL.");
            }
            V = conversions["USVString"](V, {
                context: "Failed to set the 'username' property on 'URL': The provided value",
                globals: globalObject
            });
            esValue[implSymbol]["username"] = V;
        }
        get password() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get password' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol]["password"];
        }
        set password(V) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set password' called on an object that is not a valid instance of URL.");
            }
            V = conversions["USVString"](V, {
                context: "Failed to set the 'password' property on 'URL': The provided value",
                globals: globalObject
            });
            esValue[implSymbol]["password"] = V;
        }
        get host() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get host' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol]["host"];
        }
        set host(V) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set host' called on an object that is not a valid instance of URL.");
            }
            V = conversions["USVString"](V, {
                context: "Failed to set the 'host' property on 'URL': The provided value",
                globals: globalObject
            });
            esValue[implSymbol]["host"] = V;
        }
        get hostname() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get hostname' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol]["hostname"];
        }
        set hostname(V) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set hostname' called on an object that is not a valid instance of URL.");
            }
            V = conversions["USVString"](V, {
                context: "Failed to set the 'hostname' property on 'URL': The provided value",
                globals: globalObject
            });
            esValue[implSymbol]["hostname"] = V;
        }
        get port() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get port' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol]["port"];
        }
        set port(V) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set port' called on an object that is not a valid instance of URL.");
            }
            V = conversions["USVString"](V, {
                context: "Failed to set the 'port' property on 'URL': The provided value",
                globals: globalObject
            });
            esValue[implSymbol]["port"] = V;
        }
        get pathname() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get pathname' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol]["pathname"];
        }
        set pathname(V) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set pathname' called on an object that is not a valid instance of URL.");
            }
            V = conversions["USVString"](V, {
                context: "Failed to set the 'pathname' property on 'URL': The provided value",
                globals: globalObject
            });
            esValue[implSymbol]["pathname"] = V;
        }
        get search() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get search' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol]["search"];
        }
        set search(V) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set search' called on an object that is not a valid instance of URL.");
            }
            V = conversions["USVString"](V, {
                context: "Failed to set the 'search' property on 'URL': The provided value",
                globals: globalObject
            });
            esValue[implSymbol]["search"] = V;
        }
        get searchParams() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get searchParams' called on an object that is not a valid instance of URL.");
            }
            return utils.getSameObject(this, "searchParams", ()=>{
                return utils.tryWrapperForImpl(esValue[implSymbol]["searchParams"]);
            });
        }
        get hash() {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'get hash' called on an object that is not a valid instance of URL.");
            }
            return esValue[implSymbol]["hash"];
        }
        set hash(V) {
            const esValue = this !== null && this !== undefined ? this : globalObject;
            if (!exports.is(esValue)) {
                throw new globalObject.TypeError("'set hash' called on an object that is not a valid instance of URL.");
            }
            V = conversions["USVString"](V, {
                context: "Failed to set the 'hash' property on 'URL': The provided value",
                globals: globalObject
            });
            esValue[implSymbol]["hash"] = V;
        }
        static parse(url) {
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'parse' on 'URL': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["USVString"](curArg, {
                    context: "Failed to execute 'parse' on 'URL': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                if (curArg !== undefined) {
                    curArg = conversions["USVString"](curArg, {
                        context: "Failed to execute 'parse' on 'URL': parameter 2",
                        globals: globalObject
                    });
                }
                args.push(curArg);
            }
            return utils.tryWrapperForImpl(Impl.implementation.parse(globalObject, ...args));
        }
        static canParse(url) {
            if (arguments.length < 1) {
                throw new globalObject.TypeError(`Failed to execute 'canParse' on 'URL': 1 argument required, but only ${arguments.length} present.`);
            }
            const args = [];
            {
                let curArg = arguments[0];
                curArg = conversions["USVString"](curArg, {
                    context: "Failed to execute 'canParse' on 'URL': parameter 1",
                    globals: globalObject
                });
                args.push(curArg);
            }
            {
                let curArg = arguments[1];
                if (curArg !== undefined) {
                    curArg = conversions["USVString"](curArg, {
                        context: "Failed to execute 'canParse' on 'URL': parameter 2",
                        globals: globalObject
                    });
                }
                args.push(curArg);
            }
            return Impl.implementation.canParse(...args);
        }
    }
    Object.defineProperties(URL.prototype, {
        toJSON: {
            enumerable: true
        },
        href: {
            enumerable: true
        },
        toString: {
            enumerable: true
        },
        origin: {
            enumerable: true
        },
        protocol: {
            enumerable: true
        },
        username: {
            enumerable: true
        },
        password: {
            enumerable: true
        },
        host: {
            enumerable: true
        },
        hostname: {
            enumerable: true
        },
        port: {
            enumerable: true
        },
        pathname: {
            enumerable: true
        },
        search: {
            enumerable: true
        },
        searchParams: {
            enumerable: true
        },
        hash: {
            enumerable: true
        },
        [Symbol.toStringTag]: {
            value: "URL",
            configurable: true
        }
    });
    Object.defineProperties(URL, {
        parse: {
            enumerable: true
        },
        canParse: {
            enumerable: true
        }
    });
    ctorRegistry[interfaceName] = URL;
    Object.defineProperty(globalObject, interfaceName, {
        configurable: true,
        writable: true,
        value: URL
    });
    if (globalNames.includes("Window")) {
        Object.defineProperty(globalObject, "webkitURL", {
            configurable: true,
            writable: true,
            value: URL
        });
    }
};
const Impl = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/URL-impl.js [app-ssr] (ecmascript)");
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/webidl2js-wrapper.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const URL = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/URL.js [app-ssr] (ecmascript)");
const URLSearchParams = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/URLSearchParams.js [app-ssr] (ecmascript)");
exports.URL = URL;
exports.URLSearchParams = URLSearchParams;
}),
"[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { URL, URLSearchParams } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/webidl2js-wrapper.js [app-ssr] (ecmascript)");
const urlStateMachine = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/url-state-machine.js [app-ssr] (ecmascript)");
const percentEncoding = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/lib/percent-encoding.js [app-ssr] (ecmascript)");
const sharedGlobalObject = {
    Array,
    Object,
    Promise,
    String,
    TypeError
};
URL.install(sharedGlobalObject, [
    "Window"
]);
URLSearchParams.install(sharedGlobalObject, [
    "Window"
]);
exports.URL = sharedGlobalObject.URL;
exports.URLSearchParams = sharedGlobalObject.URLSearchParams;
exports.parseURL = urlStateMachine.parseURL;
exports.basicURLParse = urlStateMachine.basicURLParse;
exports.serializeURL = urlStateMachine.serializeURL;
exports.serializePath = urlStateMachine.serializePath;
exports.serializeHost = urlStateMachine.serializeHost;
exports.serializeInteger = urlStateMachine.serializeInteger;
exports.serializeURLOrigin = urlStateMachine.serializeURLOrigin;
exports.setTheUsername = urlStateMachine.setTheUsername;
exports.setThePassword = urlStateMachine.setThePassword;
exports.cannotHaveAUsernamePasswordPort = urlStateMachine.cannotHaveAUsernamePasswordPort;
exports.hasAnOpaquePath = urlStateMachine.hasAnOpaquePath;
exports.percentDecodeString = percentEncoding.percentDecodeString;
exports.percentDecodeBytes = percentEncoding.percentDecodeBytes;
}),
"[project]/frontend/node_modules/.pnpm/webidl-conversions@7.0.0/node_modules/webidl-conversions/lib/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function makeException(ErrorType, message, options) {
    if (options.globals) {
        ErrorType = options.globals[ErrorType.name];
    }
    return new ErrorType(`${options.context ? options.context : "Value"} ${message}.`);
}
function toNumber(value, options) {
    if (typeof value === "bigint") {
        throw makeException(TypeError, "is a BigInt which cannot be converted to a number", options);
    }
    if (!options.globals) {
        return Number(value);
    }
    return options.globals.Number(value);
}
// Round x to the nearest integer, choosing the even integer if it lies halfway between two.
function evenRound(x) {
    // There are four cases for numbers with fractional part being .5:
    //
    // case |     x     | floor(x) | round(x) | expected | x <> 0 | x % 1 | x & 1 |   example
    //   1  |  2n + 0.5 |  2n      |  2n + 1  |  2n      |   >    |  0.5  |   0   |  0.5 ->  0
    //   2  |  2n + 1.5 |  2n + 1  |  2n + 2  |  2n + 2  |   >    |  0.5  |   1   |  1.5 ->  2
    //   3  | -2n - 0.5 | -2n - 1  | -2n      | -2n      |   <    | -0.5  |   0   | -0.5 ->  0
    //   4  | -2n - 1.5 | -2n - 2  | -2n - 1  | -2n - 2  |   <    | -0.5  |   1   | -1.5 -> -2
    // (where n is a non-negative integer)
    //
    // Branch here for cases 1 and 4
    if (x > 0 && x % 1 === +0.5 && (x & 1) === 0 || x < 0 && x % 1 === -0.5 && (x & 1) === 1) {
        return censorNegativeZero(Math.floor(x));
    }
    return censorNegativeZero(Math.round(x));
}
function integerPart(n) {
    return censorNegativeZero(Math.trunc(n));
}
function sign(x) {
    return x < 0 ? -1 : 1;
}
function modulo(x, y) {
    // https://tc39.github.io/ecma262/#eqn-modulo
    // Note that http://stackoverflow.com/a/4467559/3191 does NOT work for large modulos
    const signMightNotMatch = x % y;
    if (sign(y) !== sign(signMightNotMatch)) {
        return signMightNotMatch + y;
    }
    return signMightNotMatch;
}
function censorNegativeZero(x) {
    return x === 0 ? 0 : x;
}
function createIntegerConversion(bitLength, { unsigned }) {
    let lowerBound, upperBound;
    if (unsigned) {
        lowerBound = 0;
        upperBound = 2 ** bitLength - 1;
    } else {
        lowerBound = -(2 ** (bitLength - 1));
        upperBound = 2 ** (bitLength - 1) - 1;
    }
    const twoToTheBitLength = 2 ** bitLength;
    const twoToOneLessThanTheBitLength = 2 ** (bitLength - 1);
    return (value, options = {})=>{
        let x = toNumber(value, options);
        x = censorNegativeZero(x);
        if (options.enforceRange) {
            if (!Number.isFinite(x)) {
                throw makeException(TypeError, "is not a finite number", options);
            }
            x = integerPart(x);
            if (x < lowerBound || x > upperBound) {
                throw makeException(TypeError, `is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`, options);
            }
            return x;
        }
        if (!Number.isNaN(x) && options.clamp) {
            x = Math.min(Math.max(x, lowerBound), upperBound);
            x = evenRound(x);
            return x;
        }
        if (!Number.isFinite(x) || x === 0) {
            return 0;
        }
        x = integerPart(x);
        // Math.pow(2, 64) is not accurately representable in JavaScript, so try to avoid these per-spec operations if
        // possible. Hopefully it's an optimization for the non-64-bitLength cases too.
        if (x >= lowerBound && x <= upperBound) {
            return x;
        }
        // These will not work great for bitLength of 64, but oh well. See the README for more details.
        x = modulo(x, twoToTheBitLength);
        if (!unsigned && x >= twoToOneLessThanTheBitLength) {
            return x - twoToTheBitLength;
        }
        return x;
    };
}
function createLongLongConversion(bitLength, { unsigned }) {
    const upperBound = Number.MAX_SAFE_INTEGER;
    const lowerBound = unsigned ? 0 : Number.MIN_SAFE_INTEGER;
    const asBigIntN = unsigned ? BigInt.asUintN : BigInt.asIntN;
    return (value, options = {})=>{
        let x = toNumber(value, options);
        x = censorNegativeZero(x);
        if (options.enforceRange) {
            if (!Number.isFinite(x)) {
                throw makeException(TypeError, "is not a finite number", options);
            }
            x = integerPart(x);
            if (x < lowerBound || x > upperBound) {
                throw makeException(TypeError, `is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`, options);
            }
            return x;
        }
        if (!Number.isNaN(x) && options.clamp) {
            x = Math.min(Math.max(x, lowerBound), upperBound);
            x = evenRound(x);
            return x;
        }
        if (!Number.isFinite(x) || x === 0) {
            return 0;
        }
        let xBigInt = BigInt(integerPart(x));
        xBigInt = asBigIntN(bitLength, xBigInt);
        return Number(xBigInt);
    };
}
exports.any = (value)=>{
    return value;
};
exports.undefined = ()=>{
    return undefined;
};
exports.boolean = (value)=>{
    return Boolean(value);
};
exports.byte = createIntegerConversion(8, {
    unsigned: false
});
exports.octet = createIntegerConversion(8, {
    unsigned: true
});
exports.short = createIntegerConversion(16, {
    unsigned: false
});
exports["unsigned short"] = createIntegerConversion(16, {
    unsigned: true
});
exports.long = createIntegerConversion(32, {
    unsigned: false
});
exports["unsigned long"] = createIntegerConversion(32, {
    unsigned: true
});
exports["long long"] = createLongLongConversion(64, {
    unsigned: false
});
exports["unsigned long long"] = createLongLongConversion(64, {
    unsigned: true
});
exports.double = (value, options = {})=>{
    const x = toNumber(value, options);
    if (!Number.isFinite(x)) {
        throw makeException(TypeError, "is not a finite floating-point value", options);
    }
    return x;
};
exports["unrestricted double"] = (value, options = {})=>{
    const x = toNumber(value, options);
    return x;
};
exports.float = (value, options = {})=>{
    const x = toNumber(value, options);
    if (!Number.isFinite(x)) {
        throw makeException(TypeError, "is not a finite floating-point value", options);
    }
    if (Object.is(x, -0)) {
        return x;
    }
    const y = Math.fround(x);
    if (!Number.isFinite(y)) {
        throw makeException(TypeError, "is outside the range of a single-precision floating-point value", options);
    }
    return y;
};
exports["unrestricted float"] = (value, options = {})=>{
    const x = toNumber(value, options);
    if (isNaN(x)) {
        return x;
    }
    if (Object.is(x, -0)) {
        return x;
    }
    return Math.fround(x);
};
exports.DOMString = (value, options = {})=>{
    if (options.treatNullAsEmptyString && value === null) {
        return "";
    }
    if (typeof value === "symbol") {
        throw makeException(TypeError, "is a symbol, which cannot be converted to a string", options);
    }
    const StringCtor = options.globals ? options.globals.String : String;
    return StringCtor(value);
};
exports.ByteString = (value, options = {})=>{
    const x = exports.DOMString(value, options);
    let c;
    for(let i = 0; (c = x.codePointAt(i)) !== undefined; ++i){
        if (c > 255) {
            throw makeException(TypeError, "is not a valid ByteString", options);
        }
    }
    return x;
};
exports.USVString = (value, options = {})=>{
    const S = exports.DOMString(value, options);
    const n = S.length;
    const U = [];
    for(let i = 0; i < n; ++i){
        const c = S.charCodeAt(i);
        if (c < 0xD800 || c > 0xDFFF) {
            U.push(String.fromCodePoint(c));
        } else if (0xDC00 <= c && c <= 0xDFFF) {
            U.push(String.fromCodePoint(0xFFFD));
        } else if (i === n - 1) {
            U.push(String.fromCodePoint(0xFFFD));
        } else {
            const d = S.charCodeAt(i + 1);
            if (0xDC00 <= d && d <= 0xDFFF) {
                const a = c & 0x3FF;
                const b = d & 0x3FF;
                U.push(String.fromCodePoint((2 << 15) + (2 << 9) * a + b));
                ++i;
            } else {
                U.push(String.fromCodePoint(0xFFFD));
            }
        }
    }
    return U.join("");
};
exports.object = (value, options = {})=>{
    if (value === null || typeof value !== "object" && typeof value !== "function") {
        throw makeException(TypeError, "is not an object", options);
    }
    return value;
};
const abByteLengthGetter = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get;
const sabByteLengthGetter = typeof SharedArrayBuffer === "function" ? Object.getOwnPropertyDescriptor(SharedArrayBuffer.prototype, "byteLength").get : null;
function isNonSharedArrayBuffer(value) {
    try {
        // This will throw on SharedArrayBuffers, but not detached ArrayBuffers.
        // (The spec says it should throw, but the spec conflicts with implementations: https://github.com/tc39/ecma262/issues/678)
        abByteLengthGetter.call(value);
        return true;
    } catch  {
        return false;
    }
}
function isSharedArrayBuffer(value) {
    try {
        sabByteLengthGetter.call(value);
        return true;
    } catch  {
        return false;
    }
}
function isArrayBufferDetached(value) {
    try {
        // eslint-disable-next-line no-new
        new Uint8Array(value);
        return false;
    } catch  {
        return true;
    }
}
exports.ArrayBuffer = (value, options = {})=>{
    if (!isNonSharedArrayBuffer(value)) {
        if (options.allowShared && !isSharedArrayBuffer(value)) {
            throw makeException(TypeError, "is not an ArrayBuffer or SharedArrayBuffer", options);
        }
        throw makeException(TypeError, "is not an ArrayBuffer", options);
    }
    if (isArrayBufferDetached(value)) {
        throw makeException(TypeError, "is a detached ArrayBuffer", options);
    }
    return value;
};
const dvByteLengthGetter = Object.getOwnPropertyDescriptor(DataView.prototype, "byteLength").get;
exports.DataView = (value, options = {})=>{
    try {
        dvByteLengthGetter.call(value);
    } catch (e) {
        throw makeException(TypeError, "is not a DataView", options);
    }
    if (!options.allowShared && isSharedArrayBuffer(value.buffer)) {
        throw makeException(TypeError, "is backed by a SharedArrayBuffer, which is not allowed", options);
    }
    if (isArrayBufferDetached(value.buffer)) {
        throw makeException(TypeError, "is backed by a detached ArrayBuffer", options);
    }
    return value;
};
// Returns the unforgeable `TypedArray` constructor name or `undefined`,
// if the `this` value isn't a valid `TypedArray` object.
//
// https://tc39.es/ecma262/#sec-get-%typedarray%.prototype-@@tostringtag
const typedArrayNameGetter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Uint8Array).prototype, Symbol.toStringTag).get;
[
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Float32Array,
    Float64Array
].forEach((func)=>{
    const { name } = func;
    const article = /^[AEIOU]/u.test(name) ? "an" : "a";
    exports[name] = (value, options = {})=>{
        if (!ArrayBuffer.isView(value) || typedArrayNameGetter.call(value) !== name) {
            throw makeException(TypeError, `is not ${article} ${name} object`, options);
        }
        if (!options.allowShared && isSharedArrayBuffer(value.buffer)) {
            throw makeException(TypeError, "is a view on a SharedArrayBuffer, which is not allowed", options);
        }
        if (isArrayBufferDetached(value.buffer)) {
            throw makeException(TypeError, "is a view on a detached ArrayBuffer", options);
        }
        return value;
    };
});
// Common definitions
exports.ArrayBufferView = (value, options = {})=>{
    if (!ArrayBuffer.isView(value)) {
        throw makeException(TypeError, "is not a view on an ArrayBuffer or SharedArrayBuffer", options);
    }
    if (!options.allowShared && isSharedArrayBuffer(value.buffer)) {
        throw makeException(TypeError, "is a view on a SharedArrayBuffer, which is not allowed", options);
    }
    if (isArrayBufferDetached(value.buffer)) {
        throw makeException(TypeError, "is a view on a detached ArrayBuffer", options);
    }
    return value;
};
exports.BufferSource = (value, options = {})=>{
    if (ArrayBuffer.isView(value)) {
        if (!options.allowShared && isSharedArrayBuffer(value.buffer)) {
            throw makeException(TypeError, "is a view on a SharedArrayBuffer, which is not allowed", options);
        }
        if (isArrayBufferDetached(value.buffer)) {
            throw makeException(TypeError, "is a view on a detached ArrayBuffer", options);
        }
        return value;
    }
    if (!options.allowShared && !isNonSharedArrayBuffer(value)) {
        throw makeException(TypeError, "is not an ArrayBuffer or a view on one", options);
    }
    if (options.allowShared && !isSharedArrayBuffer(value) && !isNonSharedArrayBuffer(value)) {
        throw makeException(TypeError, "is not an ArrayBuffer, SharedArrayBuffer, or a view on one", options);
    }
    if (isArrayBufferDetached(value)) {
        throw makeException(TypeError, "is a detached ArrayBuffer", options);
    }
    return value;
};
exports.DOMTimeStamp = exports["unsigned long long"];
}),
"[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.removeLeadingAndTrailingHTTPWhitespace = (string)=>{
    return string.replace(/^[ \t\n\r]+/u, "").replace(/[ \t\n\r]+$/u, "");
};
exports.removeTrailingHTTPWhitespace = (string)=>{
    return string.replace(/[ \t\n\r]+$/u, "");
};
exports.isHTTPWhitespaceChar = (char)=>{
    return char === " " || char === "\t" || char === "\n" || char === "\r";
};
exports.solelyContainsHTTPTokenCodePoints = (string)=>{
    return /^[-!#$%&'*+.^_`|~A-Za-z0-9]*$/u.test(string);
};
exports.soleyContainsHTTPQuotedStringTokenCodePoints = (string)=>{
    return /^[\t\u0020-\u007E\u0080-\u00FF]*$/u.test(string);
};
exports.asciiLowercase = (string)=>{
    return string.replace(/[A-Z]/ug, (l)=>l.toLowerCase());
};
// This variant only implements it with the extract-value flag set.
exports.collectAnHTTPQuotedString = (input, position)=>{
    let value = "";
    position++;
    while(true){
        while(position < input.length && input[position] !== "\"" && input[position] !== "\\"){
            value += input[position];
            ++position;
        }
        if (position >= input.length) {
            break;
        }
        const quoteOrBackslash = input[position];
        ++position;
        if (quoteOrBackslash === "\\") {
            if (position >= input.length) {
                value += "\\";
                break;
            }
            value += input[position];
            ++position;
        } else {
            break;
        }
    }
    return [
        value,
        position
    ];
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/mime-type-parameters.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { asciiLowercase, solelyContainsHTTPTokenCodePoints, soleyContainsHTTPQuotedStringTokenCodePoints } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/utils.js [app-ssr] (ecmascript)");
module.exports = class MIMETypeParameters {
    constructor(map){
        this._map = map;
    }
    get size() {
        return this._map.size;
    }
    get(name) {
        name = asciiLowercase(String(name));
        return this._map.get(name);
    }
    has(name) {
        name = asciiLowercase(String(name));
        return this._map.has(name);
    }
    set(name, value) {
        name = asciiLowercase(String(name));
        value = String(value);
        if (!solelyContainsHTTPTokenCodePoints(name)) {
            throw new Error(`Invalid MIME type parameter name "${name}": only HTTP token code points are valid.`);
        }
        if (!soleyContainsHTTPQuotedStringTokenCodePoints(value)) {
            throw new Error(`Invalid MIME type parameter value "${value}": only HTTP quoted-string token code points are ` + `valid.`);
        }
        return this._map.set(name, value);
    }
    clear() {
        this._map.clear();
    }
    delete(name) {
        name = asciiLowercase(String(name));
        return this._map.delete(name);
    }
    forEach(callbackFn, thisArg) {
        this._map.forEach(callbackFn, thisArg);
    }
    keys() {
        return this._map.keys();
    }
    values() {
        return this._map.values();
    }
    entries() {
        return this._map.entries();
    }
    [Symbol.iterator]() {
        return this._map[Symbol.iterator]();
    }
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/parser.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { removeLeadingAndTrailingHTTPWhitespace, removeTrailingHTTPWhitespace, isHTTPWhitespaceChar, solelyContainsHTTPTokenCodePoints, soleyContainsHTTPQuotedStringTokenCodePoints, asciiLowercase, collectAnHTTPQuotedString } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/utils.js [app-ssr] (ecmascript)");
module.exports = (input)=>{
    input = removeLeadingAndTrailingHTTPWhitespace(input);
    let position = 0;
    let type = "";
    while(position < input.length && input[position] !== "/"){
        type += input[position];
        ++position;
    }
    if (type.length === 0 || !solelyContainsHTTPTokenCodePoints(type)) {
        return null;
    }
    if (position >= input.length) {
        return null;
    }
    // Skips past "/"
    ++position;
    let subtype = "";
    while(position < input.length && input[position] !== ";"){
        subtype += input[position];
        ++position;
    }
    subtype = removeTrailingHTTPWhitespace(subtype);
    if (subtype.length === 0 || !solelyContainsHTTPTokenCodePoints(subtype)) {
        return null;
    }
    const mimeType = {
        type: asciiLowercase(type),
        subtype: asciiLowercase(subtype),
        parameters: new Map()
    };
    while(position < input.length){
        // Skip past ";"
        ++position;
        while(isHTTPWhitespaceChar(input[position])){
            ++position;
        }
        let parameterName = "";
        while(position < input.length && input[position] !== ";" && input[position] !== "="){
            parameterName += input[position];
            ++position;
        }
        parameterName = asciiLowercase(parameterName);
        if (position < input.length) {
            if (input[position] === ";") {
                continue;
            }
            // Skip past "="
            ++position;
        }
        let parameterValue = null;
        if (input[position] === "\"") {
            [parameterValue, position] = collectAnHTTPQuotedString(input, position);
            while(position < input.length && input[position] !== ";"){
                ++position;
            }
        } else {
            parameterValue = "";
            while(position < input.length && input[position] !== ";"){
                parameterValue += input[position];
                ++position;
            }
            parameterValue = removeTrailingHTTPWhitespace(parameterValue);
            if (parameterValue === "") {
                continue;
            }
        }
        if (parameterName.length > 0 && solelyContainsHTTPTokenCodePoints(parameterName) && soleyContainsHTTPQuotedStringTokenCodePoints(parameterValue) && !mimeType.parameters.has(parameterName)) {
            mimeType.parameters.set(parameterName, parameterValue);
        }
    }
    return mimeType;
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/serializer.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const { solelyContainsHTTPTokenCodePoints } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/utils.js [app-ssr] (ecmascript)");
module.exports = (mimeType)=>{
    let serialization = `${mimeType.type}/${mimeType.subtype}`;
    if (mimeType.parameters.size === 0) {
        return serialization;
    }
    for (let [name, value] of mimeType.parameters){
        serialization += ";";
        serialization += name;
        serialization += "=";
        if (!solelyContainsHTTPTokenCodePoints(value) || value.length === 0) {
            value = value.replace(/(["\\])/ug, "\\$1");
            value = `"${value}"`;
        }
        serialization += value;
    }
    return serialization;
};
}),
"[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/mime-type.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const MIMETypeParameters = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/mime-type-parameters.js [app-ssr] (ecmascript)");
const parse = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/parser.js [app-ssr] (ecmascript)");
const serialize = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/serializer.js [app-ssr] (ecmascript)");
const { asciiLowercase, solelyContainsHTTPTokenCodePoints } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/utils.js [app-ssr] (ecmascript)");
module.exports = class MIMEType {
    constructor(string){
        string = String(string);
        const result = parse(string);
        if (result === null) {
            throw new Error(`Could not parse MIME type string "${string}"`);
        }
        this._type = result.type;
        this._subtype = result.subtype;
        this._parameters = new MIMETypeParameters(result.parameters);
    }
    static parse(string) {
        try {
            return new this(string);
        } catch (e) {
            return null;
        }
    }
    get essence() {
        return `${this.type}/${this.subtype}`;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        value = asciiLowercase(String(value));
        if (value.length === 0) {
            throw new Error("Invalid type: must be a non-empty string");
        }
        if (!solelyContainsHTTPTokenCodePoints(value)) {
            throw new Error(`Invalid type ${value}: must contain only HTTP token code points`);
        }
        this._type = value;
    }
    get subtype() {
        return this._subtype;
    }
    set subtype(value) {
        value = asciiLowercase(String(value));
        if (value.length === 0) {
            throw new Error("Invalid subtype: must be a non-empty string");
        }
        if (!solelyContainsHTTPTokenCodePoints(value)) {
            throw new Error(`Invalid subtype ${value}: must contain only HTTP token code points`);
        }
        this._subtype = value;
    }
    get parameters() {
        return this._parameters;
    }
    toString() {
        // The serialize function works on both "MIME type records" (i.e. the results of parse) and on this class, since
        // this class's interface is identical.
        return serialize(this);
    }
    isJavaScript({ prohibitParameters = false } = {}) {
        switch(this._type){
            case "text":
                {
                    switch(this._subtype){
                        case "ecmascript":
                        case "javascript":
                        case "javascript1.0":
                        case "javascript1.1":
                        case "javascript1.2":
                        case "javascript1.3":
                        case "javascript1.4":
                        case "javascript1.5":
                        case "jscript":
                        case "livescript":
                        case "x-ecmascript":
                        case "x-javascript":
                            {
                                return !prohibitParameters || this._parameters.size === 0;
                            }
                        default:
                            {
                                return false;
                            }
                    }
                }
            case "application":
                {
                    switch(this._subtype){
                        case "ecmascript":
                        case "javascript":
                        case "x-ecmascript":
                        case "x-javascript":
                            {
                                return !prohibitParameters || this._parameters.size === 0;
                            }
                        default:
                            {
                                return false;
                            }
                    }
                }
            default:
                {
                    return false;
                }
        }
    }
    isXML() {
        return this._subtype === "xml" && (this._type === "text" || this._type === "application") || this._subtype.endsWith("+xml");
    }
    isHTML() {
        return this._subtype === "html" && this._type === "text";
    }
};
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/StyleSheet.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {};
///CommonJS
/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-stylesheet-interface
 */ CSSOM.StyleSheet = function StyleSheet() {
    this.parentStyleSheet = null;
};
//.CommonJS
exports.StyleSheet = CSSOM.StyleSheet; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {};
///CommonJS
/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-cssrule-interface
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSRule
 */ CSSOM.CSSRule = function CSSRule() {
    this.parentRule = null;
    this.parentStyleSheet = null;
};
CSSOM.CSSRule.UNKNOWN_RULE = 0; // obsolete
CSSOM.CSSRule.STYLE_RULE = 1;
CSSOM.CSSRule.CHARSET_RULE = 2; // obsolete
CSSOM.CSSRule.IMPORT_RULE = 3;
CSSOM.CSSRule.MEDIA_RULE = 4;
CSSOM.CSSRule.FONT_FACE_RULE = 5;
CSSOM.CSSRule.PAGE_RULE = 6;
CSSOM.CSSRule.KEYFRAMES_RULE = 7;
CSSOM.CSSRule.KEYFRAME_RULE = 8;
CSSOM.CSSRule.MARGIN_RULE = 9;
CSSOM.CSSRule.NAMESPACE_RULE = 10;
CSSOM.CSSRule.COUNTER_STYLE_RULE = 11;
CSSOM.CSSRule.SUPPORTS_RULE = 12;
CSSOM.CSSRule.DOCUMENT_RULE = 13;
CSSOM.CSSRule.FONT_FEATURE_VALUES_RULE = 14;
CSSOM.CSSRule.VIEWPORT_RULE = 15;
CSSOM.CSSRule.REGION_STYLE_RULE = 16;
CSSOM.CSSRule.CONTAINER_RULE = 17;
CSSOM.CSSRule.LAYER_BLOCK_RULE = 18;
CSSOM.CSSRule.STARTING_STYLE_RULE = 1002;
CSSOM.CSSRule.prototype = {
    constructor: CSSOM.CSSRule
};
exports.CSSRule = CSSOM.CSSRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSStyleDeclaration: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleDeclaration.js [app-ssr] (ecmascript)").CSSStyleDeclaration,
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule
};
///CommonJS
/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssstylerule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleRule
 */ CSSOM.CSSStyleRule = function CSSStyleRule() {
    CSSOM.CSSRule.call(this);
    this.selectorText = "";
    this.style = new CSSOM.CSSStyleDeclaration();
    this.style.parentRule = this;
};
CSSOM.CSSStyleRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSStyleRule.prototype.constructor = CSSOM.CSSStyleRule;
CSSOM.CSSStyleRule.prototype.type = 1;
Object.defineProperty(CSSOM.CSSStyleRule.prototype, "cssText", {
    get: function() {
        var text;
        if (this.selectorText) {
            text = this.selectorText + " {" + this.style.cssText + "}";
        } else {
            text = "";
        }
        return text;
    },
    set: function(cssText) {
        var rule = CSSOM.CSSStyleRule.parse(cssText);
        this.style = rule.style;
        this.selectorText = rule.selectorText;
    }
});
/**
 * NON-STANDARD
 * lightweight version of parse.js.
 * @param {string} ruleText
 * @return CSSStyleRule
 */ CSSOM.CSSStyleRule.parse = function(ruleText) {
    var i = 0;
    var state = "selector";
    var index;
    var j = i;
    var buffer = "";
    var SIGNIFICANT_WHITESPACE = {
        "selector": true,
        "value": true
    };
    var styleRule = new CSSOM.CSSStyleRule();
    var name, priority = "";
    for(var character; character = ruleText.charAt(i); i++){
        switch(character){
            case " ":
            case "\t":
            case "\r":
            case "\n":
            case "\f":
                if (SIGNIFICANT_WHITESPACE[state]) {
                    // Squash 2 or more white-spaces in the row into 1
                    switch(ruleText.charAt(i - 1)){
                        case " ":
                        case "\t":
                        case "\r":
                        case "\n":
                        case "\f":
                            break;
                        default:
                            buffer += " ";
                            break;
                    }
                }
                break;
            // String
            case '"':
                j = i + 1;
                index = ruleText.indexOf('"', j) + 1;
                if (!index) {
                    throw '" is missing';
                }
                buffer += ruleText.slice(i, index);
                i = index - 1;
                break;
            case "'":
                j = i + 1;
                index = ruleText.indexOf("'", j) + 1;
                if (!index) {
                    throw "' is missing";
                }
                buffer += ruleText.slice(i, index);
                i = index - 1;
                break;
            // Comment
            case "/":
                if (ruleText.charAt(i + 1) === "*") {
                    i += 2;
                    index = ruleText.indexOf("*/", i);
                    if (index === -1) {
                        throw new SyntaxError("Missing */");
                    } else {
                        i = index + 1;
                    }
                } else {
                    buffer += character;
                }
                break;
            case "{":
                if (state === "selector") {
                    styleRule.selectorText = buffer.trim();
                    buffer = "";
                    state = "name";
                }
                break;
            case ":":
                if (state === "name") {
                    name = buffer.trim();
                    buffer = "";
                    state = "value";
                } else {
                    buffer += character;
                }
                break;
            case "!":
                if (state === "value" && ruleText.indexOf("!important", i) === i) {
                    priority = "important";
                    i += "important".length;
                } else {
                    buffer += character;
                }
                break;
            case ";":
                if (state === "value") {
                    styleRule.style.setProperty(name, buffer.trim(), priority);
                    priority = "";
                    buffer = "";
                    state = "name";
                } else {
                    buffer += character;
                }
                break;
            case "}":
                if (state === "value") {
                    styleRule.style.setProperty(name, buffer.trim(), priority);
                    priority = "";
                    buffer = "";
                } else if (state === "name") {
                    break;
                } else {
                    buffer += character;
                }
                state = "selector";
                break;
            default:
                buffer += character;
                break;
        }
    }
    return styleRule;
};
//.CommonJS
exports.CSSStyleRule = CSSOM.CSSStyleRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleSheet.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    StyleSheet: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/StyleSheet.js [app-ssr] (ecmascript)").StyleSheet,
    CSSStyleRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleRule.js [app-ssr] (ecmascript)").CSSStyleRule
};
///CommonJS
/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet
 */ CSSOM.CSSStyleSheet = function CSSStyleSheet() {
    CSSOM.StyleSheet.call(this);
    this.cssRules = [];
};
CSSOM.CSSStyleSheet.prototype = new CSSOM.StyleSheet();
CSSOM.CSSStyleSheet.prototype.constructor = CSSOM.CSSStyleSheet;
/**
 * Used to insert a new rule into the style sheet. The new rule now becomes part of the cascade.
 *
 *   sheet = new Sheet("body {margin: 0}")
 *   sheet.toString()
 *   -> "body{margin:0;}"
 *   sheet.insertRule("img {border: none}", 0)
 *   -> 0
 *   sheet.toString()
 *   -> "img{border:none;}body{margin:0;}"
 *
 * @param {string} rule
 * @param {number} index
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet-insertRule
 * @return {number} The index within the style sheet's rule collection of the newly inserted rule.
 */ CSSOM.CSSStyleSheet.prototype.insertRule = function(rule, index) {
    if (index < 0 || index > this.cssRules.length) {
        throw new RangeError("INDEX_SIZE_ERR");
    }
    var cssRule = CSSOM.parse(rule).cssRules[0];
    cssRule.parentStyleSheet = this;
    this.cssRules.splice(index, 0, cssRule);
    return index;
};
/**
 * Used to delete a rule from the style sheet.
 *
 *   sheet = new Sheet("img{border:none} body{margin:0}")
 *   sheet.toString()
 *   -> "img{border:none;}body{margin:0;}"
 *   sheet.deleteRule(0)
 *   sheet.toString()
 *   -> "body{margin:0;}"
 *
 * @param {number} index within the style sheet's rule list of the rule to remove.
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet-deleteRule
 */ CSSOM.CSSStyleSheet.prototype.deleteRule = function(index) {
    if (index < 0 || index >= this.cssRules.length) {
        throw new RangeError("INDEX_SIZE_ERR");
    }
    this.cssRules.splice(index, 1);
};
/**
 * NON-STANDARD
 * @return {string} serialize stylesheet
 */ CSSOM.CSSStyleSheet.prototype.toString = function() {
    var result = "";
    var rules = this.cssRules;
    for(var i = 0; i < rules.length; i++){
        result += rules[i].cssText + "\n";
    }
    return result;
};
//.CommonJS
exports.CSSStyleSheet = CSSOM.CSSStyleSheet;
CSSOM.parse = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/parse.js [app-ssr] (ecmascript)").parse; // Cannot be included sooner due to the mutual dependency between parse.js and CSSStyleSheet.js
 ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/MediaList.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {};
///CommonJS
/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-medialist-interface
 */ CSSOM.MediaList = function MediaList() {
    this.length = 0;
};
CSSOM.MediaList.prototype = {
    constructor: CSSOM.MediaList,
    /**
	 * @return {string}
	 */ get mediaText () {
        return Array.prototype.join.call(this, ", ");
    },
    /**
	 * @param {string} value
	 */ set mediaText (value){
        var values = value.split(",");
        var length = this.length = values.length;
        for(var i = 0; i < length; i++){
            this[i] = values[i].trim();
        }
    },
    /**
	 * @param {string} medium
	 */ appendMedium: function(medium) {
        if (Array.prototype.indexOf.call(this, medium) === -1) {
            this[this.length] = medium;
            this.length++;
        }
    },
    /**
	 * @param {string} medium
	 */ deleteMedium: function(medium) {
        var index = Array.prototype.indexOf.call(this, medium);
        if (index !== -1) {
            Array.prototype.splice.call(this, index, 1);
        }
    }
};
//.CommonJS
exports.MediaList = CSSOM.MediaList; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSImportRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule,
    CSSStyleSheet: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleSheet.js [app-ssr] (ecmascript)").CSSStyleSheet,
    MediaList: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/MediaList.js [app-ssr] (ecmascript)").MediaList
};
///CommonJS
/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssimportrule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSImportRule
 */ CSSOM.CSSImportRule = function CSSImportRule() {
    CSSOM.CSSRule.call(this);
    this.href = "";
    this.media = new CSSOM.MediaList();
    this.styleSheet = new CSSOM.CSSStyleSheet();
};
CSSOM.CSSImportRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSImportRule.prototype.constructor = CSSOM.CSSImportRule;
CSSOM.CSSImportRule.prototype.type = 3;
Object.defineProperty(CSSOM.CSSImportRule.prototype, "cssText", {
    get: function() {
        var mediaText = this.media.mediaText;
        return "@import url(" + this.href + ")" + (mediaText ? " " + mediaText : "") + ";";
    },
    set: function(cssText) {
        var i = 0;
        /**
     * @import url(partial.css) screen, handheld;
     *        ||               |
     *        after-import     media
     *         |
     *         url
     */ var state = '';
        var buffer = '';
        var index;
        for(var character; character = cssText.charAt(i); i++){
            switch(character){
                case ' ':
                case '\t':
                case '\r':
                case '\n':
                case '\f':
                    if (state === 'after-import') {
                        state = 'url';
                    } else {
                        buffer += character;
                    }
                    break;
                case '@':
                    if (!state && cssText.indexOf('@import', i) === i) {
                        state = 'after-import';
                        i += 'import'.length;
                        buffer = '';
                    }
                    break;
                case 'u':
                    if (state === 'url' && cssText.indexOf('url(', i) === i) {
                        index = cssText.indexOf(')', i + 1);
                        if (index === -1) {
                            throw i + ': ")" not found';
                        }
                        i += 'url('.length;
                        var url = cssText.slice(i, index);
                        if (url[0] === url[url.length - 1]) {
                            if (url[0] === '"' || url[0] === "'") {
                                url = url.slice(1, -1);
                            }
                        }
                        this.href = url;
                        i = index;
                        state = 'media';
                    }
                    break;
                case '"':
                    if (state === 'url') {
                        index = cssText.indexOf('"', i + 1);
                        if (!index) {
                            throw i + ": '\"' not found";
                        }
                        this.href = cssText.slice(i + 1, index);
                        i = index;
                        state = 'media';
                    }
                    break;
                case "'":
                    if (state === 'url') {
                        index = cssText.indexOf("'", i + 1);
                        if (!index) {
                            throw i + ': "\'" not found';
                        }
                        this.href = cssText.slice(i + 1, index);
                        i = index;
                        state = 'media';
                    }
                    break;
                case ';':
                    if (state === 'media') {
                        if (buffer) {
                            this.media.mediaText = buffer.trim();
                        }
                    }
                    break;
                default:
                    if (state === 'media') {
                        buffer += character;
                    }
                    break;
            }
        }
    }
});
//.CommonJS
exports.CSSImportRule = CSSOM.CSSImportRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSGroupingRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule,
    parse: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/parse.js [app-ssr] (ecmascript)").parse
};
///CommonJS
/**
 * @constructor
 * @see https://drafts.csswg.org/cssom/#the-cssgroupingrule-interface
 */ CSSOM.CSSGroupingRule = function CSSGroupingRule() {
    CSSOM.CSSRule.call(this);
    this.cssRules = [];
};
CSSOM.CSSGroupingRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSGroupingRule.prototype.constructor = CSSOM.CSSGroupingRule;
/**
 * Used to insert a new CSS rule to a list of CSS rules.
 *
 * @example
 *   cssGroupingRule.cssText
 *   -> "body{margin:0;}"
 *   cssGroupingRule.insertRule("img{border:none;}", 1)
 *   -> 1
 *   cssGroupingRule.cssText
 *   -> "body{margin:0;}img{border:none;}"
 *
 * @param {string} rule
 * @param {number} [index]
 * @see https://www.w3.org/TR/cssom-1/#dom-cssgroupingrule-insertrule
 * @return {number} The index within the grouping rule's collection of the newly inserted rule.
 */ CSSOM.CSSGroupingRule.prototype.insertRule = function insertRule(rule, index) {
    if (index < 0 || index > this.cssRules.length) {
        throw new RangeError("INDEX_SIZE_ERR");
    }
    var cssRule = CSSOM.parse(rule).cssRules[0];
    cssRule.parentRule = this;
    this.cssRules.splice(index, 0, cssRule);
    return index;
};
/**
 * Used to delete a rule from the grouping rule.
 *
 *   cssGroupingRule.cssText
 *   -> "img{border:none;}body{margin:0;}"
 *   cssGroupingRule.deleteRule(0)
 *   cssGroupingRule.cssText
 *   -> "body{margin:0;}"
 *
 * @param {number} index within the grouping rule's rule list of the rule to remove.
 * @see https://www.w3.org/TR/cssom-1/#dom-cssgroupingrule-deleterule
 */ CSSOM.CSSGroupingRule.prototype.deleteRule = function deleteRule(index) {
    if (index < 0 || index >= this.cssRules.length) {
        throw new RangeError("INDEX_SIZE_ERR");
    }
    this.cssRules.splice(index, 1)[0].parentRule = null;
};
//.CommonJS
exports.CSSGroupingRule = CSSOM.CSSGroupingRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSConditionRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule,
    CSSGroupingRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSGroupingRule.js [app-ssr] (ecmascript)").CSSGroupingRule
};
///CommonJS
/**
 * @constructor
 * @see https://www.w3.org/TR/css-conditional-3/#the-cssconditionrule-interface
 */ CSSOM.CSSConditionRule = function CSSConditionRule() {
    CSSOM.CSSGroupingRule.call(this);
    this.cssRules = [];
};
CSSOM.CSSConditionRule.prototype = new CSSOM.CSSGroupingRule();
CSSOM.CSSConditionRule.prototype.constructor = CSSOM.CSSConditionRule;
CSSOM.CSSConditionRule.prototype.conditionText = '';
CSSOM.CSSConditionRule.prototype.cssText = '';
//.CommonJS
exports.CSSConditionRule = CSSOM.CSSConditionRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSMediaRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule,
    CSSGroupingRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSGroupingRule.js [app-ssr] (ecmascript)").CSSGroupingRule,
    CSSConditionRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSConditionRule.js [app-ssr] (ecmascript)").CSSConditionRule,
    MediaList: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/MediaList.js [app-ssr] (ecmascript)").MediaList
};
///CommonJS
/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssmediarule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSMediaRule
 */ CSSOM.CSSMediaRule = function CSSMediaRule() {
    CSSOM.CSSConditionRule.call(this);
    this.media = new CSSOM.MediaList();
};
CSSOM.CSSMediaRule.prototype = new CSSOM.CSSConditionRule();
CSSOM.CSSMediaRule.prototype.constructor = CSSOM.CSSMediaRule;
CSSOM.CSSMediaRule.prototype.type = 4;
// https://opensource.apple.com/source/WebCore/WebCore-7611.1.21.161.3/css/CSSMediaRule.cpp
Object.defineProperties(CSSOM.CSSMediaRule.prototype, {
    "conditionText": {
        get: function() {
            return this.media.mediaText;
        },
        set: function(value) {
            this.media.mediaText = value;
        },
        configurable: true,
        enumerable: true
    },
    "cssText": {
        get: function() {
            var cssTexts = [];
            for(var i = 0, length = this.cssRules.length; i < length; i++){
                cssTexts.push(this.cssRules[i].cssText);
            }
            return "@media " + this.media.mediaText + " {" + cssTexts.join("") + "}";
        },
        configurable: true,
        enumerable: true
    }
});
//.CommonJS
exports.CSSMediaRule = CSSOM.CSSMediaRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSContainerRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule,
    CSSGroupingRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSGroupingRule.js [app-ssr] (ecmascript)").CSSGroupingRule,
    CSSConditionRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSConditionRule.js [app-ssr] (ecmascript)").CSSConditionRule
};
///CommonJS
/**
 * @constructor
 * @see https://drafts.csswg.org/css-contain-3/
 * @see https://www.w3.org/TR/css-contain-3/
 */ CSSOM.CSSContainerRule = function CSSContainerRule() {
    CSSOM.CSSConditionRule.call(this);
};
CSSOM.CSSContainerRule.prototype = new CSSOM.CSSConditionRule();
CSSOM.CSSContainerRule.prototype.constructor = CSSOM.CSSContainerRule;
CSSOM.CSSContainerRule.prototype.type = 17;
Object.defineProperties(CSSOM.CSSContainerRule.prototype, {
    "conditionText": {
        get: function() {
            return this.containerText;
        },
        set: function(value) {
            this.containerText = value;
        },
        configurable: true,
        enumerable: true
    },
    "cssText": {
        get: function() {
            var cssTexts = [];
            for(var i = 0, length = this.cssRules.length; i < length; i++){
                cssTexts.push(this.cssRules[i].cssText);
            }
            return "@container " + this.containerText + " {" + cssTexts.join("") + "}";
        },
        configurable: true,
        enumerable: true
    }
});
//.CommonJS
exports.CSSContainerRule = CSSOM.CSSContainerRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSSupportsRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule,
    CSSGroupingRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSGroupingRule.js [app-ssr] (ecmascript)").CSSGroupingRule,
    CSSConditionRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSConditionRule.js [app-ssr] (ecmascript)").CSSConditionRule
};
///CommonJS
/**
 * @constructor
 * @see https://drafts.csswg.org/css-conditional-3/#the-csssupportsrule-interface
 */ CSSOM.CSSSupportsRule = function CSSSupportsRule() {
    CSSOM.CSSConditionRule.call(this);
};
CSSOM.CSSSupportsRule.prototype = new CSSOM.CSSConditionRule();
CSSOM.CSSSupportsRule.prototype.constructor = CSSOM.CSSSupportsRule;
CSSOM.CSSSupportsRule.prototype.type = 12;
Object.defineProperty(CSSOM.CSSSupportsRule.prototype, "cssText", {
    get: function() {
        var cssTexts = [];
        for(var i = 0, length = this.cssRules.length; i < length; i++){
            cssTexts.push(this.cssRules[i].cssText);
        }
        return "@supports " + this.conditionText + " {" + cssTexts.join("") + "}";
    }
});
//.CommonJS
exports.CSSSupportsRule = CSSOM.CSSSupportsRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSFontFaceRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSStyleDeclaration: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleDeclaration.js [app-ssr] (ecmascript)").CSSStyleDeclaration,
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule
};
///CommonJS
/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#css-font-face-rule
 */ CSSOM.CSSFontFaceRule = function CSSFontFaceRule() {
    CSSOM.CSSRule.call(this);
    this.style = new CSSOM.CSSStyleDeclaration();
    this.style.parentRule = this;
};
CSSOM.CSSFontFaceRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSFontFaceRule.prototype.constructor = CSSOM.CSSFontFaceRule;
CSSOM.CSSFontFaceRule.prototype.type = 5;
//FIXME
//CSSOM.CSSFontFaceRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSFontFaceRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;
// http://www.opensource.apple.com/source/WebCore/WebCore-955.66.1/css/WebKitCSSFontFaceRule.cpp
Object.defineProperty(CSSOM.CSSFontFaceRule.prototype, "cssText", {
    get: function() {
        return "@font-face {" + this.style.cssText + "}";
    }
});
//.CommonJS
exports.CSSFontFaceRule = CSSOM.CSSFontFaceRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSHostRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule
};
///CommonJS
/**
 * @constructor
 * @see http://www.w3.org/TR/shadow-dom/#host-at-rule
 */ CSSOM.CSSHostRule = function CSSHostRule() {
    CSSOM.CSSRule.call(this);
    this.cssRules = [];
};
CSSOM.CSSHostRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSHostRule.prototype.constructor = CSSOM.CSSHostRule;
CSSOM.CSSHostRule.prototype.type = 1001;
//FIXME
//CSSOM.CSSHostRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSHostRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;
Object.defineProperty(CSSOM.CSSHostRule.prototype, "cssText", {
    get: function() {
        var cssTexts = [];
        for(var i = 0, length = this.cssRules.length; i < length; i++){
            cssTexts.push(this.cssRules[i].cssText);
        }
        return "@host {" + cssTexts.join("") + "}";
    }
});
//.CommonJS
exports.CSSHostRule = CSSOM.CSSHostRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStartingStyleRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule
};
///CommonJS
/**
 * @constructor
 * @see http://www.w3.org/TR/shadow-dom/#host-at-rule
 */ CSSOM.CSSStartingStyleRule = function CSSStartingStyleRule() {
    CSSOM.CSSRule.call(this);
    this.cssRules = [];
};
CSSOM.CSSStartingStyleRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSStartingStyleRule.prototype.constructor = CSSOM.CSSStartingStyleRule;
CSSOM.CSSStartingStyleRule.prototype.type = 1002;
//FIXME
//CSSOM.CSSStartingStyleRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSStartingStyleRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;
Object.defineProperty(CSSOM.CSSStartingStyleRule.prototype, "cssText", {
    get: function() {
        var cssTexts = [];
        for(var i = 0, length = this.cssRules.length; i < length; i++){
            cssTexts.push(this.cssRules[i].cssText);
        }
        return "@starting-style {" + cssTexts.join("") + "}";
    }
});
//.CommonJS
exports.CSSStartingStyleRule = CSSOM.CSSStartingStyleRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSKeyframeRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule,
    CSSStyleDeclaration: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleDeclaration.js [app-ssr] (ecmascript)").CSSStyleDeclaration
};
///CommonJS
/**
 * @constructor
 * @see http://www.w3.org/TR/css3-animations/#DOM-CSSKeyframeRule
 */ CSSOM.CSSKeyframeRule = function CSSKeyframeRule() {
    CSSOM.CSSRule.call(this);
    this.keyText = '';
    this.style = new CSSOM.CSSStyleDeclaration();
    this.style.parentRule = this;
};
CSSOM.CSSKeyframeRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSKeyframeRule.prototype.constructor = CSSOM.CSSKeyframeRule;
CSSOM.CSSKeyframeRule.prototype.type = 8;
//FIXME
//CSSOM.CSSKeyframeRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSKeyframeRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;
// http://www.opensource.apple.com/source/WebCore/WebCore-955.66.1/css/WebKitCSSKeyframeRule.cpp
Object.defineProperty(CSSOM.CSSKeyframeRule.prototype, "cssText", {
    get: function() {
        return this.keyText + " {" + this.style.cssText + "} ";
    }
});
//.CommonJS
exports.CSSKeyframeRule = CSSOM.CSSKeyframeRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSKeyframesRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule
};
///CommonJS
/**
 * @constructor
 * @see http://www.w3.org/TR/css3-animations/#DOM-CSSKeyframesRule
 */ CSSOM.CSSKeyframesRule = function CSSKeyframesRule() {
    CSSOM.CSSRule.call(this);
    this.name = '';
    this.cssRules = [];
};
CSSOM.CSSKeyframesRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSKeyframesRule.prototype.constructor = CSSOM.CSSKeyframesRule;
CSSOM.CSSKeyframesRule.prototype.type = 7;
//FIXME
//CSSOM.CSSKeyframesRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSKeyframesRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;
// http://www.opensource.apple.com/source/WebCore/WebCore-955.66.1/css/WebKitCSSKeyframesRule.cpp
Object.defineProperty(CSSOM.CSSKeyframesRule.prototype, "cssText", {
    get: function() {
        var cssTexts = [];
        for(var i = 0, length = this.cssRules.length; i < length; i++){
            cssTexts.push("  " + this.cssRules[i].cssText);
        }
        return "@" + (this._vendorPrefix || '') + "keyframes " + this.name + " { \n" + cssTexts.join("\n") + "\n}";
    }
});
//.CommonJS
exports.CSSKeyframesRule = CSSOM.CSSKeyframesRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSValue.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {};
///CommonJS
/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
 *
 * TODO: add if needed
 */ CSSOM.CSSValue = function CSSValue() {};
CSSOM.CSSValue.prototype = {
    constructor: CSSOM.CSSValue,
    // @see: http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
    set cssText (text){
        var name = this._getConstructorName();
        throw new Error('DOMException: property "cssText" of "' + name + '" is readonly and can not be replaced with "' + text + '"!');
    },
    get cssText () {
        var name1 = this._getConstructorName();
        throw new Error('getter "cssText" of "' + name1 + '" is not implemented!');
    },
    _getConstructorName: function() {
        var s = this.constructor.toString(), c = s.match(/function\s([^\(]+)/), name = c[1];
        return name;
    }
};
//.CommonJS
exports.CSSValue = CSSOM.CSSValue; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSValueExpression.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSValue: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSValue.js [app-ssr] (ecmascript)").CSSValue
};
///CommonJS
/**
 * @constructor
 * @see http://msdn.microsoft.com/en-us/library/ms537634(v=vs.85).aspx
 *
 */ CSSOM.CSSValueExpression = function CSSValueExpression(token, idx) {
    this._token = token;
    this._idx = idx;
};
CSSOM.CSSValueExpression.prototype = new CSSOM.CSSValue();
CSSOM.CSSValueExpression.prototype.constructor = CSSOM.CSSValueExpression;
/**
 * parse css expression() value
 *
 * @return {Object}
 *         - error:
 *         or
 *         - idx:
 *         - expression:
 *
 * Example:
 *
 * .selector {
 *		zoom: expression(documentElement.clientWidth > 1000 ? '1000px' : 'auto');
 * }
 */ CSSOM.CSSValueExpression.prototype.parse = function() {
    var token = this._token, idx = this._idx;
    var character = '', expression = '', error = '', info, paren = [];
    for(;; ++idx){
        character = token.charAt(idx);
        // end of token
        if (character === '') {
            error = 'css expression error: unfinished expression!';
            break;
        }
        switch(character){
            case '(':
                paren.push(character);
                expression += character;
                break;
            case ')':
                paren.pop(character);
                expression += character;
                break;
            case '/':
                if (info = this._parseJSComment(token, idx)) {
                    if (info.error) {
                        error = 'css expression error: unfinished comment in expression!';
                    } else {
                        idx = info.idx;
                    // ignore the comment
                    }
                } else if (info = this._parseJSRexExp(token, idx)) {
                    idx = info.idx;
                    expression += info.text;
                } else {
                    expression += character;
                }
                break;
            case "'":
            case '"':
                info = this._parseJSString(token, idx, character);
                if (info) {
                    idx = info.idx;
                    expression += info.text;
                } else {
                    expression += character;
                }
                break;
            default:
                expression += character;
                break;
        }
        if (error) {
            break;
        }
        // end of expression
        if (paren.length === 0) {
            break;
        }
    }
    var ret;
    if (error) {
        ret = {
            error: error
        };
    } else {
        ret = {
            idx: idx,
            expression: expression
        };
    }
    return ret;
};
/**
 *
 * @return {Object|false}
 *          - idx:
 *          - text:
 *          or
 *          - error:
 *          or
 *          false
 *
 */ CSSOM.CSSValueExpression.prototype._parseJSComment = function(token, idx) {
    var nextChar = token.charAt(idx + 1), text;
    if (nextChar === '/' || nextChar === '*') {
        var startIdx = idx, endIdx, commentEndChar;
        if (nextChar === '/') {
            commentEndChar = '\n';
        } else if (nextChar === '*') {
            commentEndChar = '*/';
        }
        endIdx = token.indexOf(commentEndChar, startIdx + 1 + 1);
        if (endIdx !== -1) {
            endIdx = endIdx + commentEndChar.length - 1;
            text = token.substring(idx, endIdx + 1);
            return {
                idx: endIdx,
                text: text
            };
        } else {
            var error = 'css expression error: unfinished comment in expression!';
            return {
                error: error
            };
        }
    } else {
        return false;
    }
};
/**
 *
 * @return {Object|false}
 *					- idx:
 *					- text:
 *					or 
 *					false
 *
 */ CSSOM.CSSValueExpression.prototype._parseJSString = function(token, idx, sep) {
    var endIdx = this._findMatchedIdx(token, idx, sep), text;
    if (endIdx === -1) {
        return false;
    } else {
        text = token.substring(idx, endIdx + sep.length);
        return {
            idx: endIdx,
            text: text
        };
    }
};
/**
 * parse regexp in css expression
 *
 * @return {Object|false}
 *				- idx:
 *				- regExp:
 *				or 
 *				false
 */ /*

all legal RegExp
 
/a/
(/a/)
[/a/]
[12, /a/]

!/a/

+/a/
-/a/
* /a/
/ /a/
%/a/

===/a/
!==/a/
==/a/
!=/a/
>/a/
>=/a/
</a/
<=/a/

&/a/
|/a/
^/a/
~/a/
<</a/
>>/a/
>>>/a/

&&/a/
||/a/
?/a/
=/a/
,/a/

		delete /a/
				in /a/
instanceof /a/
				new /a/
		typeof /a/
			void /a/

*/ CSSOM.CSSValueExpression.prototype._parseJSRexExp = function(token, idx) {
    var before = token.substring(0, idx).replace(/\s+$/, ""), legalRegx = [
        /^$/,
        /\($/,
        /\[$/,
        /\!$/,
        /\+$/,
        /\-$/,
        /\*$/,
        /\/\s+/,
        /\%$/,
        /\=$/,
        /\>$/,
        /<$/,
        /\&$/,
        /\|$/,
        /\^$/,
        /\~$/,
        /\?$/,
        /\,$/,
        /delete$/,
        /in$/,
        /instanceof$/,
        /new$/,
        /typeof$/,
        /void$/
    ];
    var isLegal = legalRegx.some(function(reg) {
        return reg.test(before);
    });
    if (!isLegal) {
        return false;
    } else {
        var sep = '/';
        // same logic as string
        return this._parseJSString(token, idx, sep);
    }
};
/**
 *
 * find next sep(same line) index in `token`
 *
 * @return {Number}
 *
 */ CSSOM.CSSValueExpression.prototype._findMatchedIdx = function(token, idx, sep) {
    var startIdx = idx, endIdx;
    var NOT_FOUND = -1;
    while(true){
        endIdx = token.indexOf(sep, startIdx + 1);
        if (endIdx === -1) {
            endIdx = NOT_FOUND;
            break;
        } else {
            var text = token.substring(idx + 1, endIdx), matched = text.match(/\\+$/);
            if (!matched || matched[0] % 2 === 0) {
                break;
            } else {
                startIdx = endIdx;
            }
        }
    }
    // boundary must be in the same line(js sting or regexp)
    var nextNewLineIdx = token.indexOf('\n', idx + 1);
    if (nextNewLineIdx < endIdx) {
        endIdx = NOT_FOUND;
    }
    return endIdx;
};
//.CommonJS
exports.CSSValueExpression = CSSOM.CSSValueExpression; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/MatcherList.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {};
///CommonJS
/**
 * @constructor
 * @see https://developer.mozilla.org/en/CSS/@-moz-document
 */ CSSOM.MatcherList = function MatcherList() {
    this.length = 0;
};
CSSOM.MatcherList.prototype = {
    constructor: CSSOM.MatcherList,
    /**
     * @return {string}
     */ get matcherText () {
        return Array.prototype.join.call(this, ", ");
    },
    /**
     * @param {string} value
     */ set matcherText (value){
        // just a temporary solution, actually it may be wrong by just split the value with ',', because a url can include ','.
        var values = value.split(",");
        var length = this.length = values.length;
        for(var i = 0; i < length; i++){
            this[i] = values[i].trim();
        }
    },
    /**
     * @param {string} matcher
     */ appendMatcher: function(matcher) {
        if (Array.prototype.indexOf.call(this, matcher) === -1) {
            this[this.length] = matcher;
            this.length++;
        }
    },
    /**
     * @param {string} matcher
     */ deleteMatcher: function(matcher) {
        var index = Array.prototype.indexOf.call(this, matcher);
        if (index !== -1) {
            Array.prototype.splice.call(this, index, 1);
        }
    }
};
//.CommonJS
exports.MatcherList = CSSOM.MatcherList; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSDocumentRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule,
    MatcherList: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/MatcherList.js [app-ssr] (ecmascript)").MatcherList
};
///CommonJS
/**
 * @constructor
 * @see https://developer.mozilla.org/en/CSS/@-moz-document
 */ CSSOM.CSSDocumentRule = function CSSDocumentRule() {
    CSSOM.CSSRule.call(this);
    this.matcher = new CSSOM.MatcherList();
    this.cssRules = [];
};
CSSOM.CSSDocumentRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSDocumentRule.prototype.constructor = CSSOM.CSSDocumentRule;
CSSOM.CSSDocumentRule.prototype.type = 10;
//FIXME
//CSSOM.CSSDocumentRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSDocumentRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;
Object.defineProperty(CSSOM.CSSDocumentRule.prototype, "cssText", {
    get: function() {
        var cssTexts = [];
        for(var i = 0, length = this.cssRules.length; i < length; i++){
            cssTexts.push(this.cssRules[i].cssText);
        }
        return "@-moz-document " + this.matcher.matcherText + " {" + cssTexts.join("") + "}";
    }
});
//.CommonJS
exports.CSSDocumentRule = CSSOM.CSSDocumentRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSLayerBlockRule.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule,
    CSSGroupingRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSGroupingRule.js [app-ssr] (ecmascript)").CSSGroupingRule
};
///CommonJS
/**
 * @constructor
 * @see https://drafts.csswg.org/css-cascade-5/#csslayerblockrule
 */ CSSOM.CSSLayerBlockRule = function CSSLayerBlockRule() {
    CSSOM.CSSGroupingRule.call(this);
    this.layerName = "";
    this.cssRules = [];
};
CSSOM.CSSLayerBlockRule.prototype = new CSSOM.CSSGroupingRule();
CSSOM.CSSLayerBlockRule.prototype.constructor = CSSOM.CSSLayerBlockRule;
CSSOM.CSSLayerBlockRule.prototype.type = 18;
Object.defineProperties(CSSOM.CSSLayerBlockRule.prototype, {
    layerNameText: {
        get: function() {
            return this.layerName;
        },
        set: function(value) {
            this.layerName = value;
        },
        configurable: true,
        enumerable: true
    },
    cssText: {
        get: function() {
            var cssTexts = [];
            for(var i = 0, length = this.cssRules.length; i < length; i++){
                cssTexts.push(this.cssRules[i].cssText);
            }
            return "@layer " + this.layerNameText + " {" + cssTexts.join("") + "}";
        },
        configurable: true,
        enumerable: true
    }
});
//.CommonJS
exports.CSSLayerBlockRule = CSSOM.CSSLayerBlockRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/parse.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {};
///CommonJS
/**
 * @param {string} token
 */ CSSOM.parse = function parse(token) {
    var i = 0;
    /**
		"before-selector" or
		"selector" or
		"atRule" or
		"atBlock" or
		"conditionBlock" or
		"before-name" or
		"name" or
		"before-value" or
		"value"
	*/ var state = "before-selector";
    var index;
    var buffer = "";
    var valueParenthesisDepth = 0;
    var SIGNIFICANT_WHITESPACE = {
        "selector": true,
        "value": true,
        "value-parenthesis": true,
        "atRule": true,
        "importRule-begin": true,
        "importRule": true,
        "atBlock": true,
        "containerBlock": true,
        "conditionBlock": true,
        'documentRule-begin': true,
        "layerBlock": true
    };
    var styleSheet = new CSSOM.CSSStyleSheet();
    // @type CSSStyleSheet|CSSMediaRule|CSSContainerRule|CSSSupportsRule|CSSFontFaceRule|CSSKeyframesRule|CSSDocumentRule
    var currentScope = styleSheet;
    // @type CSSMediaRule|CSSContainerRule|CSSSupportsRule|CSSKeyframesRule|CSSDocumentRule
    var parentRule;
    var ancestorRules = [];
    var hasAncestors = false;
    var prevScope;
    var name, priority = "", styleRule, mediaRule, containerRule, supportsRule, importRule, fontFaceRule, keyframesRule, documentRule, hostRule, startingStyleRule, layerBlockRule;
    var atKeyframesRegExp = /@(-(?:\w+-)+)?keyframes/g;
    var parseError = function(message) {
        var lines = token.substring(0, i).split('\n');
        var lineCount = lines.length;
        var charCount = lines.pop().length + 1;
        var error = new Error(message + ' (line ' + lineCount + ', char ' + charCount + ')');
        error.line = lineCount;
        /* jshint sub : true */ error['char'] = charCount;
        error.styleSheet = styleSheet;
        throw error;
    };
    for(var character; character = token.charAt(i); i++){
        switch(character){
            case " ":
            case "\t":
            case "\r":
            case "\n":
            case "\f":
                if (SIGNIFICANT_WHITESPACE[state]) {
                    buffer += character;
                }
                break;
            // String
            case '"':
                index = i + 1;
                do {
                    index = token.indexOf('"', index) + 1;
                    if (!index) {
                        parseError('Unmatched "');
                    }
                }while (token[index - 2] === '\\')
                buffer += token.slice(i, index);
                i = index - 1;
                switch(state){
                    case 'before-value':
                        state = 'value';
                        break;
                    case 'importRule-begin':
                        state = 'importRule';
                        break;
                }
                break;
            case "'":
                index = i + 1;
                do {
                    index = token.indexOf("'", index) + 1;
                    if (!index) {
                        parseError("Unmatched '");
                    }
                }while (token[index - 2] === '\\')
                buffer += token.slice(i, index);
                i = index - 1;
                switch(state){
                    case 'before-value':
                        state = 'value';
                        break;
                    case 'importRule-begin':
                        state = 'importRule';
                        break;
                }
                break;
            // Comment
            case "/":
                if (token.charAt(i + 1) === "*") {
                    i += 2;
                    index = token.indexOf("*/", i);
                    if (index === -1) {
                        parseError("Missing */");
                    } else {
                        i = index + 1;
                    }
                } else {
                    buffer += character;
                }
                if (state === "importRule-begin") {
                    buffer += " ";
                    state = "importRule";
                }
                break;
            // At-rule
            case "@":
                if (token.indexOf("@-moz-document", i) === i) {
                    state = "documentRule-begin";
                    documentRule = new CSSOM.CSSDocumentRule();
                    documentRule.__starts = i;
                    i += "-moz-document".length;
                    buffer = "";
                    break;
                } else if (token.indexOf("@media", i) === i) {
                    state = "atBlock";
                    mediaRule = new CSSOM.CSSMediaRule();
                    mediaRule.__starts = i;
                    i += "media".length;
                    buffer = "";
                    break;
                } else if (token.indexOf("@container", i) === i) {
                    state = "containerBlock";
                    containerRule = new CSSOM.CSSContainerRule();
                    containerRule.__starts = i;
                    i += "container".length;
                    buffer = "";
                    break;
                } else if (token.indexOf("@layer", i) === i) {
                    state = "layerBlock";
                    layerBlockRule = new CSSOM.CSSLayerBlockRule();
                    layerBlockRule.__starts = i;
                    i += "layer".length;
                    buffer = "";
                    break;
                } else if (token.indexOf("@supports", i) === i) {
                    state = "conditionBlock";
                    supportsRule = new CSSOM.CSSSupportsRule();
                    supportsRule.__starts = i;
                    i += "supports".length;
                    buffer = "";
                    break;
                } else if (token.indexOf("@host", i) === i) {
                    state = "hostRule-begin";
                    i += "host".length;
                    hostRule = new CSSOM.CSSHostRule();
                    hostRule.__starts = i;
                    buffer = "";
                    break;
                } else if (token.indexOf("@starting-style", i) === i) {
                    state = "startingStyleRule-begin";
                    i += "starting-style".length;
                    startingStyleRule = new CSSOM.CSSStartingStyleRule();
                    startingStyleRule.__starts = i;
                    buffer = "";
                    break;
                } else if (token.indexOf("@import", i) === i) {
                    state = "importRule-begin";
                    i += "import".length;
                    buffer += "@import";
                    break;
                } else if (token.indexOf("@font-face", i) === i) {
                    state = "fontFaceRule-begin";
                    i += "font-face".length;
                    fontFaceRule = new CSSOM.CSSFontFaceRule();
                    fontFaceRule.__starts = i;
                    buffer = "";
                    break;
                } else {
                    atKeyframesRegExp.lastIndex = i;
                    var matchKeyframes = atKeyframesRegExp.exec(token);
                    if (matchKeyframes && matchKeyframes.index === i) {
                        state = "keyframesRule-begin";
                        keyframesRule = new CSSOM.CSSKeyframesRule();
                        keyframesRule.__starts = i;
                        keyframesRule._vendorPrefix = matchKeyframes[1]; // Will come out as undefined if no prefix was found
                        i += matchKeyframes[0].length - 1;
                        buffer = "";
                        break;
                    } else if (state === "selector") {
                        state = "atRule";
                    }
                }
                buffer += character;
                break;
            case "{":
                if (state === "selector" || state === "atRule") {
                    styleRule.selectorText = buffer.trim();
                    styleRule.style.__starts = i;
                    buffer = "";
                    state = "before-name";
                } else if (state === "atBlock") {
                    mediaRule.media.mediaText = buffer.trim();
                    if (parentRule) {
                        ancestorRules.push(parentRule);
                    }
                    currentScope = parentRule = mediaRule;
                    mediaRule.parentStyleSheet = styleSheet;
                    buffer = "";
                    state = "before-selector";
                } else if (state === "containerBlock") {
                    containerRule.containerText = buffer.trim();
                    if (parentRule) {
                        ancestorRules.push(parentRule);
                    }
                    currentScope = parentRule = containerRule;
                    containerRule.parentStyleSheet = styleSheet;
                    buffer = "";
                    state = "before-selector";
                } else if (state === "conditionBlock") {
                    supportsRule.conditionText = buffer.trim();
                    if (parentRule) {
                        ancestorRules.push(parentRule);
                    }
                    currentScope = parentRule = supportsRule;
                    supportsRule.parentStyleSheet = styleSheet;
                    buffer = "";
                    state = "before-selector";
                } else if (state === "layerBlock") {
                    layerBlockRule.layerNameText = buffer.trim();
                    if (parentRule) {
                        ancestorRules.push(parentRule);
                    }
                    currentScope = parentRule = layerBlockRule;
                    layerBlockRule.parentStyleSheet = styleSheet;
                    buffer = "";
                    state = "before-selector";
                } else if (state === "hostRule-begin") {
                    if (parentRule) {
                        ancestorRules.push(parentRule);
                    }
                    currentScope = parentRule = hostRule;
                    hostRule.parentStyleSheet = styleSheet;
                    buffer = "";
                    state = "before-selector";
                } else if (state === "startingStyleRule-begin") {
                    if (parentRule) {
                        ancestorRules.push(parentRule);
                    }
                    currentScope = parentRule = startingStyleRule;
                    startingStyleRule.parentStyleSheet = styleSheet;
                    buffer = "";
                    state = "before-selector";
                } else if (state === "fontFaceRule-begin") {
                    if (parentRule) {
                        fontFaceRule.parentRule = parentRule;
                    }
                    fontFaceRule.parentStyleSheet = styleSheet;
                    styleRule = fontFaceRule;
                    buffer = "";
                    state = "before-name";
                } else if (state === "keyframesRule-begin") {
                    keyframesRule.name = buffer.trim();
                    if (parentRule) {
                        ancestorRules.push(parentRule);
                        keyframesRule.parentRule = parentRule;
                    }
                    keyframesRule.parentStyleSheet = styleSheet;
                    currentScope = parentRule = keyframesRule;
                    buffer = "";
                    state = "keyframeRule-begin";
                } else if (state === "keyframeRule-begin") {
                    styleRule = new CSSOM.CSSKeyframeRule();
                    styleRule.keyText = buffer.trim();
                    styleRule.__starts = i;
                    buffer = "";
                    state = "before-name";
                } else if (state === "documentRule-begin") {
                    // FIXME: what if this '{' is in the url text of the match function?
                    documentRule.matcher.matcherText = buffer.trim();
                    if (parentRule) {
                        ancestorRules.push(parentRule);
                        documentRule.parentRule = parentRule;
                    }
                    currentScope = parentRule = documentRule;
                    documentRule.parentStyleSheet = styleSheet;
                    buffer = "";
                    state = "before-selector";
                }
                break;
            case ":":
                if (state === "name") {
                    name = buffer.trim();
                    buffer = "";
                    state = "before-value";
                } else {
                    buffer += character;
                }
                break;
            case "(":
                if (state === 'value') {
                    // ie css expression mode
                    if (buffer.trim() === 'expression') {
                        var info = new CSSOM.CSSValueExpression(token, i).parse();
                        if (info.error) {
                            parseError(info.error);
                        } else {
                            buffer += info.expression;
                            i = info.idx;
                        }
                    } else {
                        state = 'value-parenthesis';
                        //always ensure this is reset to 1 on transition
                        //from value to value-parenthesis
                        valueParenthesisDepth = 1;
                        buffer += character;
                    }
                } else if (state === 'value-parenthesis') {
                    valueParenthesisDepth++;
                    buffer += character;
                } else {
                    buffer += character;
                }
                break;
            case ")":
                if (state === 'value-parenthesis') {
                    valueParenthesisDepth--;
                    if (valueParenthesisDepth === 0) state = 'value';
                }
                buffer += character;
                break;
            case "!":
                if (state === "value" && token.indexOf("!important", i) === i) {
                    priority = "important";
                    i += "important".length;
                } else {
                    buffer += character;
                }
                break;
            case ";":
                switch(state){
                    case "value":
                        styleRule.style.setProperty(name, buffer.trim(), priority);
                        priority = "";
                        buffer = "";
                        state = "before-name";
                        break;
                    case "atRule":
                        buffer = "";
                        state = "before-selector";
                        break;
                    case "importRule":
                        importRule = new CSSOM.CSSImportRule();
                        importRule.parentStyleSheet = importRule.styleSheet.parentStyleSheet = styleSheet;
                        importRule.cssText = buffer + character;
                        styleSheet.cssRules.push(importRule);
                        buffer = "";
                        state = "before-selector";
                        break;
                    default:
                        buffer += character;
                        break;
                }
                break;
            case "}":
                switch(state){
                    case "value":
                        styleRule.style.setProperty(name, buffer.trim(), priority);
                        priority = "";
                    /* falls through */ case "before-name":
                    case "name":
                        styleRule.__ends = i + 1;
                        if (parentRule) {
                            styleRule.parentRule = parentRule;
                        }
                        styleRule.parentStyleSheet = styleSheet;
                        currentScope.cssRules.push(styleRule);
                        buffer = "";
                        if (currentScope.constructor === CSSOM.CSSKeyframesRule) {
                            state = "keyframeRule-begin";
                        } else {
                            state = "before-selector";
                        }
                        break;
                    case "keyframeRule-begin":
                    case "before-selector":
                    case "selector":
                        // End of media/supports/document rule.
                        if (!parentRule) {
                            parseError("Unexpected }");
                        }
                        // Handle rules nested in @media or @supports
                        hasAncestors = ancestorRules.length > 0;
                        while(ancestorRules.length > 0){
                            parentRule = ancestorRules.pop();
                            if (parentRule.constructor.name === "CSSMediaRule" || parentRule.constructor.name === "CSSSupportsRule" || parentRule.constructor.name === "CSSContainerRule" || parentRule.constructor.name === "CSSLayerBlockRule" || parentRule.constructor.name === "CSSStartingStyleRule") {
                                prevScope = currentScope;
                                currentScope = parentRule;
                                currentScope.cssRules.push(prevScope);
                                break;
                            }
                            if (ancestorRules.length === 0) {
                                hasAncestors = false;
                            }
                        }
                        if (!hasAncestors) {
                            currentScope.__ends = i + 1;
                            styleSheet.cssRules.push(currentScope);
                            currentScope = styleSheet;
                            parentRule = null;
                        }
                        buffer = "";
                        state = "before-selector";
                        break;
                }
                break;
            default:
                switch(state){
                    case "before-selector":
                        state = "selector";
                        styleRule = new CSSOM.CSSStyleRule();
                        styleRule.__starts = i;
                        break;
                    case "before-name":
                        state = "name";
                        break;
                    case "before-value":
                        state = "value";
                        break;
                    case "importRule-begin":
                        state = "importRule";
                        break;
                }
                buffer += character;
                break;
        }
    }
    return styleSheet;
};
//.CommonJS
exports.parse = CSSOM.parse;
// The following modules cannot be included sooner due to the mutual dependency with parse.js
CSSOM.CSSStyleSheet = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleSheet.js [app-ssr] (ecmascript)").CSSStyleSheet;
CSSOM.CSSStyleRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleRule.js [app-ssr] (ecmascript)").CSSStyleRule;
CSSOM.CSSImportRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSImportRule.js [app-ssr] (ecmascript)").CSSImportRule;
CSSOM.CSSGroupingRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSGroupingRule.js [app-ssr] (ecmascript)").CSSGroupingRule;
CSSOM.CSSMediaRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSMediaRule.js [app-ssr] (ecmascript)").CSSMediaRule;
CSSOM.CSSContainerRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSContainerRule.js [app-ssr] (ecmascript)").CSSContainerRule;
CSSOM.CSSConditionRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSConditionRule.js [app-ssr] (ecmascript)").CSSConditionRule;
CSSOM.CSSSupportsRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSSupportsRule.js [app-ssr] (ecmascript)").CSSSupportsRule;
CSSOM.CSSFontFaceRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSFontFaceRule.js [app-ssr] (ecmascript)").CSSFontFaceRule;
CSSOM.CSSHostRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSHostRule.js [app-ssr] (ecmascript)").CSSHostRule;
CSSOM.CSSStartingStyleRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStartingStyleRule.js [app-ssr] (ecmascript)").CSSStartingStyleRule;
CSSOM.CSSStyleDeclaration = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleDeclaration.js [app-ssr] (ecmascript)").CSSStyleDeclaration;
CSSOM.CSSKeyframeRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSKeyframeRule.js [app-ssr] (ecmascript)").CSSKeyframeRule;
CSSOM.CSSKeyframesRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSKeyframesRule.js [app-ssr] (ecmascript)").CSSKeyframesRule;
CSSOM.CSSValueExpression = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSValueExpression.js [app-ssr] (ecmascript)").CSSValueExpression;
CSSOM.CSSDocumentRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSDocumentRule.js [app-ssr] (ecmascript)").CSSDocumentRule;
CSSOM.CSSLayerBlockRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSLayerBlockRule.js [app-ssr] (ecmascript)").CSSLayerBlockRule; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleDeclaration.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {};
///CommonJS
/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration
 */ CSSOM.CSSStyleDeclaration = function CSSStyleDeclaration() {
    this.length = 0;
    this.parentRule = null;
    // NON-STANDARD
    this._importants = {};
};
CSSOM.CSSStyleDeclaration.prototype = {
    constructor: CSSOM.CSSStyleDeclaration,
    /**
	 *
	 * @param {string} name
	 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
	 * @return {string} the value of the property if it has been explicitly set for this declaration block.
	 * Returns the empty string if the property has not been set.
	 */ getPropertyValue: function(name) {
        return this[name] || "";
    },
    /**
	 *
	 * @param {string} name
	 * @param {string} value
	 * @param {string} [priority=null] "important" or null
	 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
	 */ setProperty: function(name, value, priority) {
        if (this[name]) {
            // Property already exist. Overwrite it.
            var index = Array.prototype.indexOf.call(this, name);
            if (index < 0) {
                this[this.length] = name;
                this.length++;
            }
        } else {
            // New property.
            this[this.length] = name;
            this.length++;
        }
        this[name] = value + "";
        this._importants[name] = priority;
    },
    /**
	 *
	 * @param {string} name
	 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
	 * @return {string} the value of the property if it has been explicitly set for this declaration block.
	 * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
	 */ removeProperty: function(name) {
        if (!(name in this)) {
            return "";
        }
        var index = Array.prototype.indexOf.call(this, name);
        if (index < 0) {
            return "";
        }
        var prevValue = this[name];
        this[name] = "";
        // That's what WebKit and Opera do
        Array.prototype.splice.call(this, index, 1);
        // That's what Firefox does
        //this[index] = ""
        return prevValue;
    },
    getPropertyCSSValue: function() {
    //FIXME
    },
    /**
	 *
	 * @param {String} name
	 */ getPropertyPriority: function(name) {
        return this._importants[name] || "";
    },
    /**
	 *   element.style.overflow = "auto"
	 *   element.style.getPropertyShorthand("overflow-x")
	 *   -> "overflow"
	 */ getPropertyShorthand: function() {
    //FIXME
    },
    isPropertyImplicit: function() {
    //FIXME
    },
    // Doesn't work in IE < 9
    get cssText () {
        var properties = [];
        for(var i = 0, length = this.length; i < length; ++i){
            var name = this[i];
            var value = this.getPropertyValue(name);
            var priority = this.getPropertyPriority(name);
            if (priority) {
                priority = " !" + priority;
            }
            properties[i] = name + ": " + value + priority + ";";
        }
        return properties.join(" ");
    },
    set cssText (text){
        var i1, name1;
        for(i1 = this.length; i1--;){
            name1 = this[i1];
            this[name1] = "";
        }
        Array.prototype.splice.call(this, 0, this.length);
        this._importants = {};
        var dummyRule = CSSOM.parse('#bogus{' + text + '}').cssRules[0].style;
        var length1 = dummyRule.length;
        for(i1 = 0; i1 < length1; ++i1){
            name1 = dummyRule[i1];
            this.setProperty(dummyRule[i1], dummyRule.getPropertyValue(name1), dummyRule.getPropertyPriority(name1));
        }
    }
};
//.CommonJS
exports.CSSStyleDeclaration = CSSOM.CSSStyleDeclaration;
CSSOM.parse = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/parse.js [app-ssr] (ecmascript)").parse; // Cannot be included sooner due to the mutual dependency between parse.js and CSSStyleDeclaration.js
 ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/clone.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

//.CommonJS
var CSSOM = {
    CSSStyleSheet: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleSheet.js [app-ssr] (ecmascript)").CSSStyleSheet,
    CSSRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule,
    CSSStyleRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleRule.js [app-ssr] (ecmascript)").CSSStyleRule,
    CSSGroupingRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSGroupingRule.js [app-ssr] (ecmascript)").CSSGroupingRule,
    CSSConditionRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSConditionRule.js [app-ssr] (ecmascript)").CSSConditionRule,
    CSSMediaRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSMediaRule.js [app-ssr] (ecmascript)").CSSMediaRule,
    CSSContainerRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSContainerRule.js [app-ssr] (ecmascript)").CSSContainerRule,
    CSSSupportsRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSSupportsRule.js [app-ssr] (ecmascript)").CSSSupportsRule,
    CSSStyleDeclaration: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleDeclaration.js [app-ssr] (ecmascript)").CSSStyleDeclaration,
    CSSKeyframeRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSKeyframeRule.js [app-ssr] (ecmascript)").CSSKeyframeRule,
    CSSKeyframesRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSKeyframesRule.js [app-ssr] (ecmascript)").CSSKeyframesRule,
    CSSLayerBlockRule: __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSLayerBlockRule.js [app-ssr] (ecmascript)").CSSLayerBlockRule
};
///CommonJS
/**
 * Produces a deep copy of stylesheet — the instance variables of stylesheet are copied recursively.
 * @param {CSSStyleSheet|CSSOM.CSSStyleSheet} stylesheet
 * @nosideeffects
 * @return {CSSOM.CSSStyleSheet}
 */ CSSOM.clone = function clone(stylesheet) {
    var cloned = new CSSOM.CSSStyleSheet();
    var rules = stylesheet.cssRules;
    if (!rules) {
        return cloned;
    }
    for(var i = 0, rulesLength = rules.length; i < rulesLength; i++){
        var rule = rules[i];
        var ruleClone = cloned.cssRules[i] = new rule.constructor();
        var style = rule.style;
        if (style) {
            var styleClone = ruleClone.style = new CSSOM.CSSStyleDeclaration();
            for(var j = 0, styleLength = style.length; j < styleLength; j++){
                var name = styleClone[j] = style[j];
                styleClone[name] = style[name];
                styleClone._importants[name] = style.getPropertyPriority(name);
            }
            styleClone.length = style.length;
        }
        if (rule.hasOwnProperty('keyText')) {
            ruleClone.keyText = rule.keyText;
        }
        if (rule.hasOwnProperty('selectorText')) {
            ruleClone.selectorText = rule.selectorText;
        }
        if (rule.hasOwnProperty('mediaText')) {
            ruleClone.mediaText = rule.mediaText;
        }
        if (rule.hasOwnProperty('conditionText')) {
            ruleClone.conditionText = rule.conditionText;
        }
        if (rule.hasOwnProperty('layerName')) {
            ruleClone.layerName = rule.layerName;
        }
        if (rule.hasOwnProperty('cssRules')) {
            ruleClone.cssRules = clone(rule).cssRules;
        }
    }
    return cloned;
};
//.CommonJS
exports.clone = CSSOM.clone; ///CommonJS
}),
"[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.CSSStyleDeclaration = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleDeclaration.js [app-ssr] (ecmascript)").CSSStyleDeclaration;
exports.CSSRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSRule.js [app-ssr] (ecmascript)").CSSRule;
exports.CSSGroupingRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSGroupingRule.js [app-ssr] (ecmascript)").CSSGroupingRule;
exports.CSSConditionRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSConditionRule.js [app-ssr] (ecmascript)").CSSConditionRule;
exports.CSSStyleRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleRule.js [app-ssr] (ecmascript)").CSSStyleRule;
exports.MediaList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/MediaList.js [app-ssr] (ecmascript)").MediaList;
exports.CSSMediaRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSMediaRule.js [app-ssr] (ecmascript)").CSSMediaRule;
exports.CSSContainerRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSContainerRule.js [app-ssr] (ecmascript)").CSSContainerRule;
exports.CSSSupportsRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSSupportsRule.js [app-ssr] (ecmascript)").CSSSupportsRule;
exports.CSSImportRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSImportRule.js [app-ssr] (ecmascript)").CSSImportRule;
exports.CSSFontFaceRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSFontFaceRule.js [app-ssr] (ecmascript)").CSSFontFaceRule;
exports.CSSHostRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSHostRule.js [app-ssr] (ecmascript)").CSSHostRule;
exports.CSSStartingStyleRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStartingStyleRule.js [app-ssr] (ecmascript)").CSSStartingStyleRule;
exports.StyleSheet = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/StyleSheet.js [app-ssr] (ecmascript)").StyleSheet;
exports.CSSStyleSheet = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSStyleSheet.js [app-ssr] (ecmascript)").CSSStyleSheet;
exports.CSSKeyframesRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSKeyframesRule.js [app-ssr] (ecmascript)").CSSKeyframesRule;
exports.CSSKeyframeRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSKeyframeRule.js [app-ssr] (ecmascript)").CSSKeyframeRule;
exports.MatcherList = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/MatcherList.js [app-ssr] (ecmascript)").MatcherList;
exports.CSSDocumentRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSDocumentRule.js [app-ssr] (ecmascript)").CSSDocumentRule;
exports.CSSValue = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSValue.js [app-ssr] (ecmascript)").CSSValue;
exports.CSSValueExpression = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSValueExpression.js [app-ssr] (ecmascript)").CSSValueExpression;
exports.CSSLayerBlockRule = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/CSSLayerBlockRule.js [app-ssr] (ecmascript)").CSSLayerBlockRule;
exports.parse = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/parse.js [app-ssr] (ecmascript)").parse;
exports.clone = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/rrweb-cssom@0.8.0/node_modules/rrweb-cssom/lib/clone.js [app-ssr] (ecmascript)").clone;
}),
"[project]/frontend/node_modules/.pnpm/@csstools+css-tokenizer@3.0.4/node_modules/@csstools/css-tokenizer/dist/index.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

class ParseError extends Error {
    sourceStart;
    sourceEnd;
    parserState;
    constructor(e, n, o, t){
        super(e), this.name = "ParseError", this.sourceStart = n, this.sourceEnd = o, this.parserState = t;
    }
}
class ParseErrorWithToken extends ParseError {
    token;
    constructor(e, n, o, t, r){
        super(e, n, o, t), this.token = r;
    }
}
const e = {
    UnexpectedNewLineInString: "Unexpected newline while consuming a string token.",
    UnexpectedEOFInString: "Unexpected EOF while consuming a string token.",
    UnexpectedEOFInComment: "Unexpected EOF while consuming a comment.",
    UnexpectedEOFInURL: "Unexpected EOF while consuming a url token.",
    UnexpectedEOFInEscapedCodePoint: "Unexpected EOF while consuming an escaped code point.",
    UnexpectedCharacterInURL: "Unexpected character while consuming a url token.",
    InvalidEscapeSequenceInURL: "Invalid escape sequence while consuming a url token.",
    InvalidEscapeSequenceAfterBackslash: 'Invalid escape sequence after "\\"'
}, n = "undefined" != typeof globalThis && "structuredClone" in globalThis;
const o = 13, t = 45, r = 10, s = 43, i = 65533;
function checkIfFourCodePointsWouldStartCDO(e) {
    return 60 === e.source.codePointAt(e.cursor) && 33 === e.source.codePointAt(e.cursor + 1) && e.source.codePointAt(e.cursor + 2) === t && e.source.codePointAt(e.cursor + 3) === t;
}
function isDigitCodePoint(e) {
    return e >= 48 && e <= 57;
}
function isUppercaseLetterCodePoint(e) {
    return e >= 65 && e <= 90;
}
function isLowercaseLetterCodePoint(e) {
    return e >= 97 && e <= 122;
}
function isHexDigitCodePoint(e) {
    return e >= 48 && e <= 57 || e >= 97 && e <= 102 || e >= 65 && e <= 70;
}
function isLetterCodePoint(e) {
    return isLowercaseLetterCodePoint(e) || isUppercaseLetterCodePoint(e);
}
function isIdentStartCodePoint(e) {
    return isLetterCodePoint(e) || isNonASCII_IdentCodePoint(e) || 95 === e;
}
function isIdentCodePoint(e) {
    return isIdentStartCodePoint(e) || isDigitCodePoint(e) || e === t;
}
function isNonASCII_IdentCodePoint(e) {
    return 183 === e || 8204 === e || 8205 === e || 8255 === e || 8256 === e || 8204 === e || 192 <= e && e <= 214 || 216 <= e && e <= 246 || 248 <= e && e <= 893 || 895 <= e && e <= 8191 || 8304 <= e && e <= 8591 || 11264 <= e && e <= 12271 || 12289 <= e && e <= 55295 || 63744 <= e && e <= 64975 || 65008 <= e && e <= 65533 || 0 === e || !!isSurrogate(e) || e >= 65536;
}
function isNewLine(e) {
    return e === r || e === o || 12 === e;
}
function isWhitespace(e) {
    return 32 === e || e === r || 9 === e || e === o || 12 === e;
}
function isSurrogate(e) {
    return e >= 55296 && e <= 57343;
}
function checkIfTwoCodePointsAreAValidEscape(e) {
    return 92 === e.source.codePointAt(e.cursor) && !isNewLine(e.source.codePointAt(e.cursor + 1) ?? -1);
}
function checkIfThreeCodePointsWouldStartAnIdentSequence(e, n) {
    return n.source.codePointAt(n.cursor) === t ? n.source.codePointAt(n.cursor + 1) === t || !!isIdentStartCodePoint(n.source.codePointAt(n.cursor + 1) ?? -1) || 92 === n.source.codePointAt(n.cursor + 1) && !isNewLine(n.source.codePointAt(n.cursor + 2) ?? -1) : !!isIdentStartCodePoint(n.source.codePointAt(n.cursor) ?? -1) || checkIfTwoCodePointsAreAValidEscape(n);
}
function checkIfThreeCodePointsWouldStartANumber(e) {
    return e.source.codePointAt(e.cursor) === s || e.source.codePointAt(e.cursor) === t ? !!isDigitCodePoint(e.source.codePointAt(e.cursor + 1) ?? -1) || 46 === e.source.codePointAt(e.cursor + 1) && isDigitCodePoint(e.source.codePointAt(e.cursor + 2) ?? -1) : 46 === e.source.codePointAt(e.cursor) ? isDigitCodePoint(e.source.codePointAt(e.cursor + 1) ?? -1) : isDigitCodePoint(e.source.codePointAt(e.cursor) ?? -1);
}
function checkIfTwoCodePointsStartAComment(e) {
    return 47 === e.source.codePointAt(e.cursor) && 42 === e.source.codePointAt(e.cursor + 1);
}
function checkIfThreeCodePointsWouldStartCDC(e) {
    return e.source.codePointAt(e.cursor) === t && e.source.codePointAt(e.cursor + 1) === t && 62 === e.source.codePointAt(e.cursor + 2);
}
var c, a, u;
function consumeComment(n, o) {
    for(o.advanceCodePoint(2);;){
        const t = o.readCodePoint();
        if (void 0 === t) {
            const t = [
                exports.TokenType.Comment,
                o.source.slice(o.representationStart, o.representationEnd + 1),
                o.representationStart,
                o.representationEnd,
                void 0
            ];
            return n.onParseError(new ParseErrorWithToken(e.UnexpectedEOFInComment, o.representationStart, o.representationEnd, [
                "4.3.2. Consume comments",
                "Unexpected EOF"
            ], t)), t;
        }
        if (42 === t && void 0 !== o.source.codePointAt(o.cursor) && 47 === o.source.codePointAt(o.cursor)) {
            o.advanceCodePoint();
            break;
        }
    }
    return [
        exports.TokenType.Comment,
        o.source.slice(o.representationStart, o.representationEnd + 1),
        o.representationStart,
        o.representationEnd,
        void 0
    ];
}
function consumeEscapedCodePoint(n, t) {
    const s = t.readCodePoint();
    if (void 0 === s) return n.onParseError(new ParseError(e.UnexpectedEOFInEscapedCodePoint, t.representationStart, t.representationEnd, [
        "4.3.7. Consume an escaped code point",
        "Unexpected EOF"
    ])), i;
    if (isHexDigitCodePoint(s)) {
        const e = [
            s
        ];
        let n;
        for(; void 0 !== (n = t.source.codePointAt(t.cursor)) && isHexDigitCodePoint(n) && e.length < 6;)e.push(n), t.advanceCodePoint();
        isWhitespace(t.source.codePointAt(t.cursor) ?? -1) && (t.source.codePointAt(t.cursor) === o && t.source.codePointAt(t.cursor + 1) === r && t.advanceCodePoint(), t.advanceCodePoint());
        const c = parseInt(String.fromCodePoint(...e), 16);
        return 0 === c || isSurrogate(c) || c > 1114111 ? i : c;
    }
    return 0 === s || isSurrogate(s) ? i : s;
}
function consumeIdentSequence(e, n) {
    const o = [];
    for(;;){
        const t = n.source.codePointAt(n.cursor) ?? -1;
        if (0 === t || isSurrogate(t)) o.push(i), n.advanceCodePoint(+(t > 65535) + 1);
        else if (isIdentCodePoint(t)) o.push(t), n.advanceCodePoint(+(t > 65535) + 1);
        else {
            if (!checkIfTwoCodePointsAreAValidEscape(n)) return o;
            n.advanceCodePoint(), o.push(consumeEscapedCodePoint(e, n));
        }
    }
}
function consumeHashToken(e, n) {
    n.advanceCodePoint();
    const o = n.source.codePointAt(n.cursor);
    if (void 0 !== o && (isIdentCodePoint(o) || checkIfTwoCodePointsAreAValidEscape(n))) {
        let o = exports.HashType.Unrestricted;
        checkIfThreeCodePointsWouldStartAnIdentSequence(0, n) && (o = exports.HashType.ID);
        const t = consumeIdentSequence(e, n);
        return [
            exports.TokenType.Hash,
            n.source.slice(n.representationStart, n.representationEnd + 1),
            n.representationStart,
            n.representationEnd,
            {
                value: String.fromCodePoint(...t),
                type: o
            }
        ];
    }
    return [
        exports.TokenType.Delim,
        "#",
        n.representationStart,
        n.representationEnd,
        {
            value: "#"
        }
    ];
}
function consumeNumber(e, n) {
    let o = exports.NumberType.Integer;
    for(n.source.codePointAt(n.cursor) !== s && n.source.codePointAt(n.cursor) !== t || n.advanceCodePoint(); isDigitCodePoint(n.source.codePointAt(n.cursor) ?? -1);)n.advanceCodePoint();
    if (46 === n.source.codePointAt(n.cursor) && isDigitCodePoint(n.source.codePointAt(n.cursor + 1) ?? -1)) for(n.advanceCodePoint(2), o = exports.NumberType.Number; isDigitCodePoint(n.source.codePointAt(n.cursor) ?? -1);)n.advanceCodePoint();
    if (101 === n.source.codePointAt(n.cursor) || 69 === n.source.codePointAt(n.cursor)) {
        if (isDigitCodePoint(n.source.codePointAt(n.cursor + 1) ?? -1)) n.advanceCodePoint(2);
        else {
            if (n.source.codePointAt(n.cursor + 1) !== t && n.source.codePointAt(n.cursor + 1) !== s || !isDigitCodePoint(n.source.codePointAt(n.cursor + 2) ?? -1)) return o;
            n.advanceCodePoint(3);
        }
        for(o = exports.NumberType.Number; isDigitCodePoint(n.source.codePointAt(n.cursor) ?? -1);)n.advanceCodePoint();
    }
    return o;
}
function consumeNumericToken(e, n) {
    let o;
    {
        const e = n.source.codePointAt(n.cursor);
        e === t ? o = "-" : e === s && (o = "+");
    }
    const r = consumeNumber(0, n), i = parseFloat(n.source.slice(n.representationStart, n.representationEnd + 1));
    if (checkIfThreeCodePointsWouldStartAnIdentSequence(0, n)) {
        const t = consumeIdentSequence(e, n);
        return [
            exports.TokenType.Dimension,
            n.source.slice(n.representationStart, n.representationEnd + 1),
            n.representationStart,
            n.representationEnd,
            {
                value: i,
                signCharacter: o,
                type: r,
                unit: String.fromCodePoint(...t)
            }
        ];
    }
    return 37 === n.source.codePointAt(n.cursor) ? (n.advanceCodePoint(), [
        exports.TokenType.Percentage,
        n.source.slice(n.representationStart, n.representationEnd + 1),
        n.representationStart,
        n.representationEnd,
        {
            value: i,
            signCharacter: o
        }
    ]) : [
        exports.TokenType.Number,
        n.source.slice(n.representationStart, n.representationEnd + 1),
        n.representationStart,
        n.representationEnd,
        {
            value: i,
            signCharacter: o,
            type: r
        }
    ];
}
function consumeWhiteSpace(e) {
    for(; isWhitespace(e.source.codePointAt(e.cursor) ?? -1);)e.advanceCodePoint();
    return [
        exports.TokenType.Whitespace,
        e.source.slice(e.representationStart, e.representationEnd + 1),
        e.representationStart,
        e.representationEnd,
        void 0
    ];
}
exports.TokenType = void 0, (c = exports.TokenType || (exports.TokenType = {})).Comment = "comment", c.AtKeyword = "at-keyword-token", c.BadString = "bad-string-token", c.BadURL = "bad-url-token", c.CDC = "CDC-token", c.CDO = "CDO-token", c.Colon = "colon-token", c.Comma = "comma-token", c.Delim = "delim-token", c.Dimension = "dimension-token", c.EOF = "EOF-token", c.Function = "function-token", c.Hash = "hash-token", c.Ident = "ident-token", c.Number = "number-token", c.Percentage = "percentage-token", c.Semicolon = "semicolon-token", c.String = "string-token", c.URL = "url-token", c.Whitespace = "whitespace-token", c.OpenParen = "(-token", c.CloseParen = ")-token", c.OpenSquare = "[-token", c.CloseSquare = "]-token", c.OpenCurly = "{-token", c.CloseCurly = "}-token", c.UnicodeRange = "unicode-range-token", exports.NumberType = void 0, (a = exports.NumberType || (exports.NumberType = {})).Integer = "integer", a.Number = "number", exports.HashType = void 0, (u = exports.HashType || (exports.HashType = {})).Unrestricted = "unrestricted", u.ID = "id";
class Reader {
    cursor = 0;
    source = "";
    representationStart = 0;
    representationEnd = -1;
    constructor(e){
        this.source = e;
    }
    advanceCodePoint(e = 1) {
        this.cursor = this.cursor + e, this.representationEnd = this.cursor - 1;
    }
    readCodePoint() {
        const e = this.source.codePointAt(this.cursor);
        if (void 0 !== e) return this.cursor = this.cursor + 1, this.representationEnd = this.cursor - 1, e;
    }
    unreadCodePoint(e = 1) {
        this.cursor = this.cursor - e, this.representationEnd = this.cursor - 1;
    }
    resetRepresentation() {
        this.representationStart = this.cursor, this.representationEnd = -1;
    }
}
function consumeStringToken(n, t) {
    let s = "";
    const c = t.readCodePoint();
    for(;;){
        const a = t.readCodePoint();
        if (void 0 === a) {
            const o = [
                exports.TokenType.String,
                t.source.slice(t.representationStart, t.representationEnd + 1),
                t.representationStart,
                t.representationEnd,
                {
                    value: s
                }
            ];
            return n.onParseError(new ParseErrorWithToken(e.UnexpectedEOFInString, t.representationStart, t.representationEnd, [
                "4.3.5. Consume a string token",
                "Unexpected EOF"
            ], o)), o;
        }
        if (isNewLine(a)) {
            t.unreadCodePoint();
            const s = [
                exports.TokenType.BadString,
                t.source.slice(t.representationStart, t.representationEnd + 1),
                t.representationStart,
                t.representationEnd,
                void 0
            ];
            return n.onParseError(new ParseErrorWithToken(e.UnexpectedNewLineInString, t.representationStart, t.source.codePointAt(t.cursor) === o && t.source.codePointAt(t.cursor + 1) === r ? t.representationEnd + 2 : t.representationEnd + 1, [
                "4.3.5. Consume a string token",
                "Unexpected newline"
            ], s)), s;
        }
        if (a === c) return [
            exports.TokenType.String,
            t.source.slice(t.representationStart, t.representationEnd + 1),
            t.representationStart,
            t.representationEnd,
            {
                value: s
            }
        ];
        if (92 !== a) 0 === a || isSurrogate(a) ? s += String.fromCodePoint(i) : s += String.fromCodePoint(a);
        else {
            if (void 0 === t.source.codePointAt(t.cursor)) continue;
            if (isNewLine(t.source.codePointAt(t.cursor) ?? -1)) {
                t.source.codePointAt(t.cursor) === o && t.source.codePointAt(t.cursor + 1) === r && t.advanceCodePoint(), t.advanceCodePoint();
                continue;
            }
            s += String.fromCodePoint(consumeEscapedCodePoint(n, t));
        }
    }
}
function checkIfCodePointsMatchURLIdent(e) {
    return !(3 !== e.length || 117 !== e[0] && 85 !== e[0] || 114 !== e[1] && 82 !== e[1] || 108 !== e[2] && 76 !== e[2]);
}
function consumeBadURL(e, n) {
    for(;;){
        const o = n.source.codePointAt(n.cursor);
        if (void 0 === o) return;
        if (41 === o) return void n.advanceCodePoint();
        checkIfTwoCodePointsAreAValidEscape(n) ? (n.advanceCodePoint(), consumeEscapedCodePoint(e, n)) : n.advanceCodePoint();
    }
}
function consumeUrlToken(n, o) {
    for(; isWhitespace(o.source.codePointAt(o.cursor) ?? -1);)o.advanceCodePoint();
    let t = "";
    for(;;){
        if (void 0 === o.source.codePointAt(o.cursor)) {
            const r = [
                exports.TokenType.URL,
                o.source.slice(o.representationStart, o.representationEnd + 1),
                o.representationStart,
                o.representationEnd,
                {
                    value: t
                }
            ];
            return n.onParseError(new ParseErrorWithToken(e.UnexpectedEOFInURL, o.representationStart, o.representationEnd, [
                "4.3.6. Consume a url token",
                "Unexpected EOF"
            ], r)), r;
        }
        if (41 === o.source.codePointAt(o.cursor)) return o.advanceCodePoint(), [
            exports.TokenType.URL,
            o.source.slice(o.representationStart, o.representationEnd + 1),
            o.representationStart,
            o.representationEnd,
            {
                value: t
            }
        ];
        if (isWhitespace(o.source.codePointAt(o.cursor) ?? -1)) {
            for(o.advanceCodePoint(); isWhitespace(o.source.codePointAt(o.cursor) ?? -1);)o.advanceCodePoint();
            if (void 0 === o.source.codePointAt(o.cursor)) {
                const r = [
                    exports.TokenType.URL,
                    o.source.slice(o.representationStart, o.representationEnd + 1),
                    o.representationStart,
                    o.representationEnd,
                    {
                        value: t
                    }
                ];
                return n.onParseError(new ParseErrorWithToken(e.UnexpectedEOFInURL, o.representationStart, o.representationEnd, [
                    "4.3.6. Consume a url token",
                    "Consume as much whitespace as possible",
                    "Unexpected EOF"
                ], r)), r;
            }
            return 41 === o.source.codePointAt(o.cursor) ? (o.advanceCodePoint(), [
                exports.TokenType.URL,
                o.source.slice(o.representationStart, o.representationEnd + 1),
                o.representationStart,
                o.representationEnd,
                {
                    value: t
                }
            ]) : (consumeBadURL(n, o), [
                exports.TokenType.BadURL,
                o.source.slice(o.representationStart, o.representationEnd + 1),
                o.representationStart,
                o.representationEnd,
                void 0
            ]);
        }
        const s = o.source.codePointAt(o.cursor);
        if (34 === s || 39 === s || 40 === s || 11 === (r = s ?? -1) || 127 === r || 0 <= r && r <= 8 || 14 <= r && r <= 31) {
            consumeBadURL(n, o);
            const t = [
                exports.TokenType.BadURL,
                o.source.slice(o.representationStart, o.representationEnd + 1),
                o.representationStart,
                o.representationEnd,
                void 0
            ];
            return n.onParseError(new ParseErrorWithToken(e.UnexpectedCharacterInURL, o.representationStart, o.representationEnd, [
                "4.3.6. Consume a url token",
                "Unexpected U+0022 QUOTATION MARK (\"), U+0027 APOSTROPHE ('), U+0028 LEFT PARENTHESIS (() or non-printable code point"
            ], t)), t;
        }
        if (92 === s) {
            if (checkIfTwoCodePointsAreAValidEscape(o)) {
                o.advanceCodePoint(), t += String.fromCodePoint(consumeEscapedCodePoint(n, o));
                continue;
            }
            consumeBadURL(n, o);
            const r = [
                exports.TokenType.BadURL,
                o.source.slice(o.representationStart, o.representationEnd + 1),
                o.representationStart,
                o.representationEnd,
                void 0
            ];
            return n.onParseError(new ParseErrorWithToken(e.InvalidEscapeSequenceInURL, o.representationStart, o.representationEnd, [
                "4.3.6. Consume a url token",
                "U+005C REVERSE SOLIDUS (\\)",
                "The input stream does not start with a valid escape sequence"
            ], r)), r;
        }
        0 === o.source.codePointAt(o.cursor) || isSurrogate(o.source.codePointAt(o.cursor) ?? -1) ? (t += String.fromCodePoint(i), o.advanceCodePoint()) : (t += o.source[o.cursor], o.advanceCodePoint());
    }
    var r;
}
function consumeIdentLikeToken(e, n) {
    const o = consumeIdentSequence(e, n);
    if (40 !== n.source.codePointAt(n.cursor)) return [
        exports.TokenType.Ident,
        n.source.slice(n.representationStart, n.representationEnd + 1),
        n.representationStart,
        n.representationEnd,
        {
            value: String.fromCodePoint(...o)
        }
    ];
    if (checkIfCodePointsMatchURLIdent(o)) {
        n.advanceCodePoint();
        let t = 0;
        for(;;){
            const e = isWhitespace(n.source.codePointAt(n.cursor) ?? -1), r = isWhitespace(n.source.codePointAt(n.cursor + 1) ?? -1);
            if (e && r) {
                t += 1, n.advanceCodePoint(1);
                continue;
            }
            const s = e ? n.source.codePointAt(n.cursor + 1) : n.source.codePointAt(n.cursor);
            if (34 === s || 39 === s) return t > 0 && n.unreadCodePoint(t), [
                exports.TokenType.Function,
                n.source.slice(n.representationStart, n.representationEnd + 1),
                n.representationStart,
                n.representationEnd,
                {
                    value: String.fromCodePoint(...o)
                }
            ];
            break;
        }
        return consumeUrlToken(e, n);
    }
    return n.advanceCodePoint(), [
        exports.TokenType.Function,
        n.source.slice(n.representationStart, n.representationEnd + 1),
        n.representationStart,
        n.representationEnd,
        {
            value: String.fromCodePoint(...o)
        }
    ];
}
function checkIfThreeCodePointsWouldStartAUnicodeRange(e) {
    return !(117 !== e.source.codePointAt(e.cursor) && 85 !== e.source.codePointAt(e.cursor) || e.source.codePointAt(e.cursor + 1) !== s || 63 !== e.source.codePointAt(e.cursor + 2) && !isHexDigitCodePoint(e.source.codePointAt(e.cursor + 2) ?? -1));
}
function consumeUnicodeRangeToken(e, n) {
    n.advanceCodePoint(2);
    const o = [], r = [];
    let s;
    for(; void 0 !== (s = n.source.codePointAt(n.cursor)) && o.length < 6 && isHexDigitCodePoint(s);)o.push(s), n.advanceCodePoint();
    for(; void 0 !== (s = n.source.codePointAt(n.cursor)) && o.length < 6 && 63 === s;)0 === r.length && r.push(...o), o.push(48), r.push(70), n.advanceCodePoint();
    if (!r.length && n.source.codePointAt(n.cursor) === t && isHexDigitCodePoint(n.source.codePointAt(n.cursor + 1) ?? -1)) for(n.advanceCodePoint(); void 0 !== (s = n.source.codePointAt(n.cursor)) && r.length < 6 && isHexDigitCodePoint(s);)r.push(s), n.advanceCodePoint();
    if (!r.length) {
        const e = parseInt(String.fromCodePoint(...o), 16);
        return [
            exports.TokenType.UnicodeRange,
            n.source.slice(n.representationStart, n.representationEnd + 1),
            n.representationStart,
            n.representationEnd,
            {
                startOfRange: e,
                endOfRange: e
            }
        ];
    }
    const i = parseInt(String.fromCodePoint(...o), 16), c = parseInt(String.fromCodePoint(...r), 16);
    return [
        exports.TokenType.UnicodeRange,
        n.source.slice(n.representationStart, n.representationEnd + 1),
        n.representationStart,
        n.representationEnd,
        {
            startOfRange: i,
            endOfRange: c
        }
    ];
}
function tokenizer(n, i) {
    const c = n.css.valueOf(), a = n.unicodeRangesAllowed ?? !1, u = new Reader(c), d = {
        onParseError: i?.onParseError ?? noop
    };
    return {
        nextToken: function nextToken() {
            u.resetRepresentation();
            const n = u.source.codePointAt(u.cursor);
            if (void 0 === n) return [
                exports.TokenType.EOF,
                "",
                -1,
                -1,
                void 0
            ];
            if (47 === n && checkIfTwoCodePointsStartAComment(u)) return consumeComment(d, u);
            if (a && (117 === n || 85 === n) && checkIfThreeCodePointsWouldStartAUnicodeRange(u)) return consumeUnicodeRangeToken(0, u);
            if (isIdentStartCodePoint(n)) return consumeIdentLikeToken(d, u);
            if (isDigitCodePoint(n)) return consumeNumericToken(d, u);
            switch(n){
                case 44:
                    return u.advanceCodePoint(), [
                        exports.TokenType.Comma,
                        ",",
                        u.representationStart,
                        u.representationEnd,
                        void 0
                    ];
                case 58:
                    return u.advanceCodePoint(), [
                        exports.TokenType.Colon,
                        ":",
                        u.representationStart,
                        u.representationEnd,
                        void 0
                    ];
                case 59:
                    return u.advanceCodePoint(), [
                        exports.TokenType.Semicolon,
                        ";",
                        u.representationStart,
                        u.representationEnd,
                        void 0
                    ];
                case 40:
                    return u.advanceCodePoint(), [
                        exports.TokenType.OpenParen,
                        "(",
                        u.representationStart,
                        u.representationEnd,
                        void 0
                    ];
                case 41:
                    return u.advanceCodePoint(), [
                        exports.TokenType.CloseParen,
                        ")",
                        u.representationStart,
                        u.representationEnd,
                        void 0
                    ];
                case 91:
                    return u.advanceCodePoint(), [
                        exports.TokenType.OpenSquare,
                        "[",
                        u.representationStart,
                        u.representationEnd,
                        void 0
                    ];
                case 93:
                    return u.advanceCodePoint(), [
                        exports.TokenType.CloseSquare,
                        "]",
                        u.representationStart,
                        u.representationEnd,
                        void 0
                    ];
                case 123:
                    return u.advanceCodePoint(), [
                        exports.TokenType.OpenCurly,
                        "{",
                        u.representationStart,
                        u.representationEnd,
                        void 0
                    ];
                case 125:
                    return u.advanceCodePoint(), [
                        exports.TokenType.CloseCurly,
                        "}",
                        u.representationStart,
                        u.representationEnd,
                        void 0
                    ];
                case 39:
                case 34:
                    return consumeStringToken(d, u);
                case 35:
                    return consumeHashToken(d, u);
                case s:
                case 46:
                    return checkIfThreeCodePointsWouldStartANumber(u) ? consumeNumericToken(d, u) : (u.advanceCodePoint(), [
                        exports.TokenType.Delim,
                        u.source[u.representationStart],
                        u.representationStart,
                        u.representationEnd,
                        {
                            value: u.source[u.representationStart]
                        }
                    ]);
                case r:
                case o:
                case 12:
                case 9:
                case 32:
                    return consumeWhiteSpace(u);
                case t:
                    return checkIfThreeCodePointsWouldStartANumber(u) ? consumeNumericToken(d, u) : checkIfThreeCodePointsWouldStartCDC(u) ? (u.advanceCodePoint(3), [
                        exports.TokenType.CDC,
                        "--\x3e",
                        u.representationStart,
                        u.representationEnd,
                        void 0
                    ]) : checkIfThreeCodePointsWouldStartAnIdentSequence(0, u) ? consumeIdentLikeToken(d, u) : (u.advanceCodePoint(), [
                        exports.TokenType.Delim,
                        "-",
                        u.representationStart,
                        u.representationEnd,
                        {
                            value: "-"
                        }
                    ]);
                case 60:
                    return checkIfFourCodePointsWouldStartCDO(u) ? (u.advanceCodePoint(4), [
                        exports.TokenType.CDO,
                        "\x3c!--",
                        u.representationStart,
                        u.representationEnd,
                        void 0
                    ]) : (u.advanceCodePoint(), [
                        exports.TokenType.Delim,
                        "<",
                        u.representationStart,
                        u.representationEnd,
                        {
                            value: "<"
                        }
                    ]);
                case 64:
                    if (u.advanceCodePoint(), checkIfThreeCodePointsWouldStartAnIdentSequence(0, u)) {
                        const e = consumeIdentSequence(d, u);
                        return [
                            exports.TokenType.AtKeyword,
                            u.source.slice(u.representationStart, u.representationEnd + 1),
                            u.representationStart,
                            u.representationEnd,
                            {
                                value: String.fromCodePoint(...e)
                            }
                        ];
                    }
                    return [
                        exports.TokenType.Delim,
                        "@",
                        u.representationStart,
                        u.representationEnd,
                        {
                            value: "@"
                        }
                    ];
                case 92:
                    {
                        if (checkIfTwoCodePointsAreAValidEscape(u)) return consumeIdentLikeToken(d, u);
                        u.advanceCodePoint();
                        const n = [
                            exports.TokenType.Delim,
                            "\\",
                            u.representationStart,
                            u.representationEnd,
                            {
                                value: "\\"
                            }
                        ];
                        return d.onParseError(new ParseErrorWithToken(e.InvalidEscapeSequenceAfterBackslash, u.representationStart, u.representationEnd, [
                            "4.3.1. Consume a token",
                            "U+005C REVERSE SOLIDUS (\\)",
                            "The input stream does not start with a valid escape sequence"
                        ], n)), n;
                    }
            }
            return u.advanceCodePoint(), [
                exports.TokenType.Delim,
                u.source[u.representationStart],
                u.representationStart,
                u.representationEnd,
                {
                    value: u.source[u.representationStart]
                }
            ];
        },
        endOfFile: function endOfFile() {
            return void 0 === u.source.codePointAt(u.cursor);
        }
    };
}
function noop() {}
function serializeIdent(e) {
    let n = 0;
    if (0 === e[0]) e.splice(0, 1, i), n = 1;
    else if (e[0] === t && e[1] === t) n = 2;
    else if (e[0] === t && e[1]) n = 2, isIdentStartCodePoint(e[1]) || (n += insertEscapedCodePoint(e, 1, e[1]));
    else {
        if (e[0] === t && !e[1]) return [
            92,
            e[0]
        ];
        isIdentStartCodePoint(e[0]) ? n = 1 : (n = 1, n += insertEscapedCodePoint(e, 0, e[0]));
    }
    for(let o = n; o < e.length; o++)0 !== e[o] ? isIdentCodePoint(e[o]) || (o += insertEscapedCharacter(e, o, e[o])) : (e.splice(o, 1, i), o++);
    return e;
}
function insertEscapedCharacter(e, n, o) {
    return e.splice(n, 1, 92, o), 1;
}
function insertEscapedCodePoint(e, n, o) {
    const t = o.toString(16), r = [];
    for (const e of t)r.push(e.codePointAt(0));
    return e.splice(n, 1, 92, ...r, 32), 1 + r.length;
}
const d = Object.values(exports.TokenType);
exports.ParseError = ParseError, exports.ParseErrorMessage = e, exports.ParseErrorWithToken = ParseErrorWithToken, exports.cloneTokens = function cloneTokens(e) {
    return n ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}, exports.isToken = function isToken(e) {
    return !!Array.isArray(e) && !(e.length < 4) && !!d.includes(e[0]) && "string" == typeof e[1] && "number" == typeof e[2] && "number" == typeof e[3];
}, exports.isTokenAtKeyword = function isTokenAtKeyword(e) {
    return !!e && e[0] === exports.TokenType.AtKeyword;
}, exports.isTokenBadString = function isTokenBadString(e) {
    return !!e && e[0] === exports.TokenType.BadString;
}, exports.isTokenBadURL = function isTokenBadURL(e) {
    return !!e && e[0] === exports.TokenType.BadURL;
}, exports.isTokenCDC = function isTokenCDC(e) {
    return !!e && e[0] === exports.TokenType.CDC;
}, exports.isTokenCDO = function isTokenCDO(e) {
    return !!e && e[0] === exports.TokenType.CDO;
}, exports.isTokenCloseCurly = function isTokenCloseCurly(e) {
    return !!e && e[0] === exports.TokenType.CloseCurly;
}, exports.isTokenCloseParen = function isTokenCloseParen(e) {
    return !!e && e[0] === exports.TokenType.CloseParen;
}, exports.isTokenCloseSquare = function isTokenCloseSquare(e) {
    return !!e && e[0] === exports.TokenType.CloseSquare;
}, exports.isTokenColon = function isTokenColon(e) {
    return !!e && e[0] === exports.TokenType.Colon;
}, exports.isTokenComma = function isTokenComma(e) {
    return !!e && e[0] === exports.TokenType.Comma;
}, exports.isTokenComment = function isTokenComment(e) {
    return !!e && e[0] === exports.TokenType.Comment;
}, exports.isTokenDelim = function isTokenDelim(e) {
    return !!e && e[0] === exports.TokenType.Delim;
}, exports.isTokenDimension = function isTokenDimension(e) {
    return !!e && e[0] === exports.TokenType.Dimension;
}, exports.isTokenEOF = function isTokenEOF(e) {
    return !!e && e[0] === exports.TokenType.EOF;
}, exports.isTokenFunction = function isTokenFunction(e) {
    return !!e && e[0] === exports.TokenType.Function;
}, exports.isTokenHash = function isTokenHash(e) {
    return !!e && e[0] === exports.TokenType.Hash;
}, exports.isTokenIdent = function isTokenIdent(e) {
    return !!e && e[0] === exports.TokenType.Ident;
}, exports.isTokenNumber = function isTokenNumber(e) {
    return !!e && e[0] === exports.TokenType.Number;
}, exports.isTokenNumeric = function isTokenNumeric(e) {
    if (!e) return !1;
    switch(e[0]){
        case exports.TokenType.Dimension:
        case exports.TokenType.Number:
        case exports.TokenType.Percentage:
            return !0;
        default:
            return !1;
    }
}, exports.isTokenOpenCurly = function isTokenOpenCurly(e) {
    return !!e && e[0] === exports.TokenType.OpenCurly;
}, exports.isTokenOpenParen = function isTokenOpenParen(e) {
    return !!e && e[0] === exports.TokenType.OpenParen;
}, exports.isTokenOpenSquare = function isTokenOpenSquare(e) {
    return !!e && e[0] === exports.TokenType.OpenSquare;
}, exports.isTokenPercentage = function isTokenPercentage(e) {
    return !!e && e[0] === exports.TokenType.Percentage;
}, exports.isTokenSemicolon = function isTokenSemicolon(e) {
    return !!e && e[0] === exports.TokenType.Semicolon;
}, exports.isTokenString = function isTokenString(e) {
    return !!e && e[0] === exports.TokenType.String;
}, exports.isTokenURL = function isTokenURL(e) {
    return !!e && e[0] === exports.TokenType.URL;
}, exports.isTokenUnicodeRange = function isTokenUnicodeRange(e) {
    return !!e && e[0] === exports.TokenType.UnicodeRange;
}, exports.isTokenWhiteSpaceOrComment = function isTokenWhiteSpaceOrComment(e) {
    if (!e) return !1;
    switch(e[0]){
        case exports.TokenType.Whitespace:
        case exports.TokenType.Comment:
            return !0;
        default:
            return !1;
    }
}, exports.isTokenWhitespace = function isTokenWhitespace(e) {
    return !!e && e[0] === exports.TokenType.Whitespace;
}, exports.mirrorVariant = function mirrorVariant(e) {
    switch(e[0]){
        case exports.TokenType.OpenParen:
            return [
                exports.TokenType.CloseParen,
                ")",
                -1,
                -1,
                void 0
            ];
        case exports.TokenType.CloseParen:
            return [
                exports.TokenType.OpenParen,
                "(",
                -1,
                -1,
                void 0
            ];
        case exports.TokenType.OpenCurly:
            return [
                exports.TokenType.CloseCurly,
                "}",
                -1,
                -1,
                void 0
            ];
        case exports.TokenType.CloseCurly:
            return [
                exports.TokenType.OpenCurly,
                "{",
                -1,
                -1,
                void 0
            ];
        case exports.TokenType.OpenSquare:
            return [
                exports.TokenType.CloseSquare,
                "]",
                -1,
                -1,
                void 0
            ];
        case exports.TokenType.CloseSquare:
            return [
                exports.TokenType.OpenSquare,
                "[",
                -1,
                -1,
                void 0
            ];
        default:
            return null;
    }
}, exports.mirrorVariantType = function mirrorVariantType(e) {
    switch(e){
        case exports.TokenType.OpenParen:
            return exports.TokenType.CloseParen;
        case exports.TokenType.CloseParen:
            return exports.TokenType.OpenParen;
        case exports.TokenType.OpenCurly:
            return exports.TokenType.CloseCurly;
        case exports.TokenType.CloseCurly:
            return exports.TokenType.OpenCurly;
        case exports.TokenType.OpenSquare:
            return exports.TokenType.CloseSquare;
        case exports.TokenType.CloseSquare:
            return exports.TokenType.OpenSquare;
        default:
            return null;
    }
}, exports.mutateIdent = function mutateIdent(e, n) {
    const o = [];
    for (const e of n)o.push(e.codePointAt(0));
    const t = String.fromCodePoint(...serializeIdent(o));
    e[1] = t, e[4].value = n;
}, exports.mutateUnit = function mutateUnit(e, n) {
    const o = [];
    for (const e of n)o.push(e.codePointAt(0));
    const t = serializeIdent(o);
    101 === t[0] && insertEscapedCodePoint(t, 0, t[0]);
    const r = String.fromCodePoint(...t), s = "+" === e[4].signCharacter ? e[4].signCharacter : "", i = e[4].value.toString();
    e[1] = `${s}${i}${r}`, e[4].unit = n;
}, exports.stringify = function stringify(...e) {
    let n = "";
    for(let o = 0; o < e.length; o++)n += e[o][1];
    return n;
}, exports.tokenize = function tokenize(e, n) {
    const o = tokenizer(e, n), t = [];
    for(; !o.endOfFile();)t.push(o.nextToken());
    return t.push(o.nextToken()), t;
}, exports.tokenizer = tokenizer;
}),
"[project]/frontend/node_modules/.pnpm/@csstools+css-parser-algorithms@3.0.5_@csstools+css-tokenizer@3.0.4/node_modules/@csstools/css-parser-algorithms/dist/index.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var e, n = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/@csstools+css-tokenizer@3.0.4/node_modules/@csstools/css-tokenizer/dist/index.cjs [app-ssr] (ecmascript)");
function walkerIndexGenerator(e) {
    let n = e.slice();
    return (e, o, t)=>{
        let s = -1;
        for(let i = n.indexOf(o); i < n.length && (s = e.indexOf(n[i]), -1 === s || s < t); i++);
        return -1 === s || s === t && o === e[t] && (s++, s >= e.length) ? -1 : (n = e.slice(), s);
    };
}
function consumeComponentValue(e, o) {
    const t = o[0];
    if (n.isTokenOpenParen(t) || n.isTokenOpenCurly(t) || n.isTokenOpenSquare(t)) {
        const n = consumeSimpleBlock(e, o);
        return {
            advance: n.advance,
            node: n.node
        };
    }
    if (n.isTokenFunction(t)) {
        const n = consumeFunction(e, o);
        return {
            advance: n.advance,
            node: n.node
        };
    }
    if (n.isTokenWhitespace(t)) {
        const n = consumeWhitespace(e, o);
        return {
            advance: n.advance,
            node: n.node
        };
    }
    if (n.isTokenComment(t)) {
        const n = consumeComment(e, o);
        return {
            advance: n.advance,
            node: n.node
        };
    }
    return {
        advance: 1,
        node: new TokenNode(t)
    };
}
exports.ComponentValueType = void 0, (e = exports.ComponentValueType || (exports.ComponentValueType = {})).Function = "function", e.SimpleBlock = "simple-block", e.Whitespace = "whitespace", e.Comment = "comment", e.Token = "token";
class ContainerNodeBaseClass {
    value = [];
    indexOf(e) {
        return this.value.indexOf(e);
    }
    at(e) {
        if ("number" == typeof e) return e < 0 && (e = this.value.length + e), this.value[e];
    }
    forEach(e, n) {
        if (0 === this.value.length) return;
        const o = walkerIndexGenerator(this.value);
        let t = 0;
        for(; t < this.value.length;){
            const s = this.value[t];
            let i;
            if (n && (i = {
                ...n
            }), !1 === e({
                node: s,
                parent: this,
                state: i
            }, t)) return !1;
            if (t = o(this.value, s, t), -1 === t) break;
        }
    }
    walk(e, n) {
        0 !== this.value.length && this.forEach((n, o)=>!1 !== e(n, o) && (!("walk" in n.node) || !this.value.includes(n.node) || !1 !== n.node.walk(e, n.state)) && void 0, n);
    }
}
class FunctionNode extends ContainerNodeBaseClass {
    type = exports.ComponentValueType.Function;
    name;
    endToken;
    constructor(e, n, o){
        super(), this.name = e, this.endToken = n, this.value = o;
    }
    getName() {
        return this.name[4].value;
    }
    normalize() {
        n.isTokenEOF(this.endToken) && (this.endToken = [
            n.TokenType.CloseParen,
            ")",
            -1,
            -1,
            void 0
        ]);
    }
    tokens() {
        return n.isTokenEOF(this.endToken) ? [
            this.name,
            ...this.value.flatMap((e)=>e.tokens())
        ] : [
            this.name,
            ...this.value.flatMap((e)=>e.tokens()),
            this.endToken
        ];
    }
    toString() {
        const e = this.value.map((e)=>n.isToken(e) ? n.stringify(e) : e.toString()).join("");
        return n.stringify(this.name) + e + n.stringify(this.endToken);
    }
    toJSON() {
        return {
            type: this.type,
            name: this.getName(),
            tokens: this.tokens(),
            value: this.value.map((e)=>e.toJSON())
        };
    }
    isFunctionNode() {
        return FunctionNode.isFunctionNode(this);
    }
    static isFunctionNode(e) {
        return !!e && e instanceof FunctionNode && e.type === exports.ComponentValueType.Function;
    }
}
function consumeFunction(e, o) {
    const t = [];
    let s = 1;
    for(;;){
        const i = o[s];
        if (!i || n.isTokenEOF(i)) return e.onParseError(new n.ParseError("Unexpected EOF while consuming a function.", o[0][2], o[o.length - 1][3], [
            "5.4.9. Consume a function",
            "Unexpected EOF"
        ])), {
            advance: o.length,
            node: new FunctionNode(o[0], i, t)
        };
        if (n.isTokenCloseParen(i)) return {
            advance: s + 1,
            node: new FunctionNode(o[0], i, t)
        };
        if (n.isTokenWhiteSpaceOrComment(i)) {
            const n = consumeAllCommentsAndWhitespace(e, o.slice(s));
            s += n.advance, t.push(...n.nodes);
            continue;
        }
        const r = consumeComponentValue(e, o.slice(s));
        s += r.advance, t.push(r.node);
    }
}
class SimpleBlockNode extends ContainerNodeBaseClass {
    type = exports.ComponentValueType.SimpleBlock;
    startToken;
    endToken;
    constructor(e, n, o){
        super(), this.startToken = e, this.endToken = n, this.value = o;
    }
    normalize() {
        if (n.isTokenEOF(this.endToken)) {
            const e = n.mirrorVariant(this.startToken);
            e && (this.endToken = e);
        }
    }
    tokens() {
        return n.isTokenEOF(this.endToken) ? [
            this.startToken,
            ...this.value.flatMap((e)=>e.tokens())
        ] : [
            this.startToken,
            ...this.value.flatMap((e)=>e.tokens()),
            this.endToken
        ];
    }
    toString() {
        const e = this.value.map((e)=>n.isToken(e) ? n.stringify(e) : e.toString()).join("");
        return n.stringify(this.startToken) + e + n.stringify(this.endToken);
    }
    toJSON() {
        return {
            type: this.type,
            startToken: this.startToken,
            tokens: this.tokens(),
            value: this.value.map((e)=>e.toJSON())
        };
    }
    isSimpleBlockNode() {
        return SimpleBlockNode.isSimpleBlockNode(this);
    }
    static isSimpleBlockNode(e) {
        return !!e && e instanceof SimpleBlockNode && e.type === exports.ComponentValueType.SimpleBlock;
    }
}
function consumeSimpleBlock(e, o) {
    const t = n.mirrorVariantType(o[0][0]);
    if (!t) throw new Error("Failed to parse, a mirror variant must exist for all block open tokens.");
    const s = [];
    let i = 1;
    for(;;){
        const r = o[i];
        if (!r || n.isTokenEOF(r)) return e.onParseError(new n.ParseError("Unexpected EOF while consuming a simple block.", o[0][2], o[o.length - 1][3], [
            "5.4.8. Consume a simple block",
            "Unexpected EOF"
        ])), {
            advance: o.length,
            node: new SimpleBlockNode(o[0], r, s)
        };
        if (r[0] === t) return {
            advance: i + 1,
            node: new SimpleBlockNode(o[0], r, s)
        };
        if (n.isTokenWhiteSpaceOrComment(r)) {
            const n = consumeAllCommentsAndWhitespace(e, o.slice(i));
            i += n.advance, s.push(...n.nodes);
            continue;
        }
        const a = consumeComponentValue(e, o.slice(i));
        i += a.advance, s.push(a.node);
    }
}
class WhitespaceNode {
    type = exports.ComponentValueType.Whitespace;
    value;
    constructor(e){
        this.value = e;
    }
    tokens() {
        return this.value;
    }
    toString() {
        return n.stringify(...this.value);
    }
    toJSON() {
        return {
            type: this.type,
            tokens: this.tokens()
        };
    }
    isWhitespaceNode() {
        return WhitespaceNode.isWhitespaceNode(this);
    }
    static isWhitespaceNode(e) {
        return !!e && e instanceof WhitespaceNode && e.type === exports.ComponentValueType.Whitespace;
    }
}
function consumeWhitespace(e, o) {
    let t = 0;
    for(;;){
        const e = o[t];
        if (!n.isTokenWhitespace(e)) return {
            advance: t,
            node: new WhitespaceNode(o.slice(0, t))
        };
        t++;
    }
}
class CommentNode {
    type = exports.ComponentValueType.Comment;
    value;
    constructor(e){
        this.value = e;
    }
    tokens() {
        return [
            this.value
        ];
    }
    toString() {
        return n.stringify(this.value);
    }
    toJSON() {
        return {
            type: this.type,
            tokens: this.tokens()
        };
    }
    isCommentNode() {
        return CommentNode.isCommentNode(this);
    }
    static isCommentNode(e) {
        return !!e && e instanceof CommentNode && e.type === exports.ComponentValueType.Comment;
    }
}
function consumeComment(e, n) {
    return {
        advance: 1,
        node: new CommentNode(n[0])
    };
}
function consumeAllCommentsAndWhitespace(e, o) {
    const t = [];
    let s = 0;
    for(;;)if (n.isTokenWhitespace(o[s])) {
        const e = consumeWhitespace(0, o.slice(s));
        s += e.advance, t.push(e.node);
    } else {
        if (!n.isTokenComment(o[s])) return {
            advance: s,
            nodes: t
        };
        t.push(new CommentNode(o[s])), s++;
    }
}
class TokenNode {
    type = exports.ComponentValueType.Token;
    value;
    constructor(e){
        this.value = e;
    }
    tokens() {
        return [
            this.value
        ];
    }
    toString() {
        return this.value[1];
    }
    toJSON() {
        return {
            type: this.type,
            tokens: this.tokens()
        };
    }
    isTokenNode() {
        return TokenNode.isTokenNode(this);
    }
    static isTokenNode(e) {
        return !!e && e instanceof TokenNode && e.type === exports.ComponentValueType.Token;
    }
}
function forEach(e, n, o) {
    if (0 === e.length) return;
    const t = walkerIndexGenerator(e);
    let s = 0;
    for(; s < e.length;){
        const i = e[s];
        let r;
        if (o && (r = {
            ...o
        }), !1 === n({
            node: i,
            parent: {
                value: e
            },
            state: r
        }, s)) return !1;
        if (s = t(e, i, s), -1 === s) break;
    }
}
function walk(e, n, o) {
    0 !== e.length && forEach(e, (o, t)=>!1 !== n(o, t) && (!("walk" in o.node) || !e.includes(o.node) || !1 !== o.node.walk(n, o.state)) && void 0, o);
}
function isWhitespaceNode(e) {
    return WhitespaceNode.isWhitespaceNode(e);
}
function isCommentNode(e) {
    return CommentNode.isCommentNode(e);
}
exports.CommentNode = CommentNode, exports.ContainerNodeBaseClass = ContainerNodeBaseClass, exports.FunctionNode = FunctionNode, exports.SimpleBlockNode = SimpleBlockNode, exports.TokenNode = TokenNode, exports.WhitespaceNode = WhitespaceNode, exports.forEach = forEach, exports.gatherNodeAncestry = function gatherNodeAncestry(e) {
    const n = new Map;
    return e.walk((e)=>{
        Array.isArray(e.node) ? e.node.forEach((o)=>{
            n.set(o, e.parent);
        }) : n.set(e.node, e.parent);
    }), n;
}, exports.isCommentNode = isCommentNode, exports.isFunctionNode = function isFunctionNode(e) {
    return FunctionNode.isFunctionNode(e);
}, exports.isSimpleBlockNode = function isSimpleBlockNode(e) {
    return SimpleBlockNode.isSimpleBlockNode(e);
}, exports.isTokenNode = function isTokenNode(e) {
    return TokenNode.isTokenNode(e);
}, exports.isWhiteSpaceOrCommentNode = function isWhiteSpaceOrCommentNode(e) {
    return isWhitespaceNode(e) || isCommentNode(e);
}, exports.isWhitespaceNode = isWhitespaceNode, exports.parseCommaSeparatedListOfComponentValues = function parseCommaSeparatedListOfComponentValues(e, o) {
    const t = {
        onParseError: o?.onParseError ?? (()=>{})
    }, s = [
        ...e
    ];
    if (0 === e.length) return [];
    n.isTokenEOF(s[s.length - 1]) && s.push([
        n.TokenType.EOF,
        "",
        s[s.length - 1][2],
        s[s.length - 1][3],
        void 0
    ]);
    const i = [];
    let r = [], a = 0;
    for(;;){
        if (!s[a] || n.isTokenEOF(s[a])) return r.length && i.push(r), i;
        if (n.isTokenComma(s[a])) {
            i.push(r), r = [], a++;
            continue;
        }
        const o = consumeComponentValue(t, e.slice(a));
        r.push(o.node), a += o.advance;
    }
}, exports.parseComponentValue = function parseComponentValue(e, o) {
    const t = {
        onParseError: o?.onParseError ?? (()=>{})
    }, s = [
        ...e
    ];
    n.isTokenEOF(s[s.length - 1]) && s.push([
        n.TokenType.EOF,
        "",
        s[s.length - 1][2],
        s[s.length - 1][3],
        void 0
    ]);
    const i = consumeComponentValue(t, s);
    if (n.isTokenEOF(s[Math.min(i.advance, s.length - 1)])) return i.node;
    t.onParseError(new n.ParseError("Expected EOF after parsing a component value.", e[0][2], e[e.length - 1][3], [
        "5.3.9. Parse a component value",
        "Expected EOF"
    ]));
}, exports.parseListOfComponentValues = function parseListOfComponentValues(e, o) {
    const t = {
        onParseError: o?.onParseError ?? (()=>{})
    }, s = [
        ...e
    ];
    n.isTokenEOF(s[s.length - 1]) && s.push([
        n.TokenType.EOF,
        "",
        s[s.length - 1][2],
        s[s.length - 1][3],
        void 0
    ]);
    const i = [];
    let r = 0;
    for(;;){
        if (!s[r] || n.isTokenEOF(s[r])) return i;
        const e = consumeComponentValue(t, s.slice(r));
        i.push(e.node), r += e.advance;
    }
}, exports.replaceComponentValues = function replaceComponentValues(e, n) {
    for(let o = 0; o < e.length; o++){
        walk(e[o], (e, o)=>{
            if ("number" != typeof o) return;
            const t = n(e.node);
            t && (Array.isArray(t) ? e.parent.value.splice(o, 1, ...t) : e.parent.value.splice(o, 1, t));
        });
    }
    return e;
}, exports.sourceIndices = function sourceIndices(e) {
    if (Array.isArray(e)) {
        const n = e[0];
        if (!n) return [
            0,
            0
        ];
        const o = e[e.length - 1] || n;
        return [
            sourceIndices(n)[0],
            sourceIndices(o)[1]
        ];
    }
    const n = e.tokens(), o = n[0], t = n[n.length - 1];
    return o && t ? [
        o[2],
        t[3]
    ] : [
        0,
        0
    ];
}, exports.stringify = function stringify(e) {
    return e.map((e)=>e.map((e)=>n.stringify(...e.tokens())).join("")).join(",");
}, exports.walk = walk, exports.walkerIndexGenerator = walkerIndexGenerator;
}),
"[project]/frontend/node_modules/.pnpm/@csstools+css-calc@2.1.4_@csstools+css-parser-algorithms@3.0.5_@csstools+css-tokenizer@_e8d5cb57048a11d39451107410ea18b6/node_modules/@csstools/css-calc/dist/index.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var e = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/@csstools+css-parser-algorithms@3.0.5_@csstools+css-tokenizer@3.0.4/node_modules/@csstools/css-parser-algorithms/dist/index.cjs [app-ssr] (ecmascript)"), n = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/@csstools+css-tokenizer@3.0.4/node_modules/@csstools/css-tokenizer/dist/index.cjs [app-ssr] (ecmascript)");
const t = /[A-Z]/g;
function toLowerCaseAZ(e) {
    return e.replace(t, (e)=>String.fromCharCode(e.charCodeAt(0) + 32));
}
const o = {
    cm: "px",
    in: "px",
    mm: "px",
    pc: "px",
    pt: "px",
    px: "px",
    q: "px",
    deg: "deg",
    grad: "deg",
    rad: "deg",
    turn: "deg",
    ms: "s",
    s: "s",
    hz: "hz",
    khz: "hz"
}, r = new Map([
    [
        "cm",
        (e)=>e
    ],
    [
        "mm",
        (e)=>10 * e
    ],
    [
        "q",
        (e)=>40 * e
    ],
    [
        "in",
        (e)=>e / 2.54
    ],
    [
        "pc",
        (e)=>e / 2.54 * 6
    ],
    [
        "pt",
        (e)=>e / 2.54 * 72
    ],
    [
        "px",
        (e)=>e / 2.54 * 96
    ]
]), i = new Map([
    [
        "deg",
        (e)=>e
    ],
    [
        "grad",
        (e)=>e / .9
    ],
    [
        "rad",
        (e)=>e / 180 * Math.PI
    ],
    [
        "turn",
        (e)=>e / 360
    ]
]), u = new Map([
    [
        "deg",
        (e)=>.9 * e
    ],
    [
        "grad",
        (e)=>e
    ],
    [
        "rad",
        (e)=>.9 * e / 180 * Math.PI
    ],
    [
        "turn",
        (e)=>.9 * e / 360
    ]
]), a = new Map([
    [
        "hz",
        (e)=>e
    ],
    [
        "khz",
        (e)=>e / 1e3
    ]
]), s = new Map([
    [
        "cm",
        (e)=>2.54 * e
    ],
    [
        "mm",
        (e)=>25.4 * e
    ],
    [
        "q",
        (e)=>25.4 * e * 4
    ],
    [
        "in",
        (e)=>e
    ],
    [
        "pc",
        (e)=>6 * e
    ],
    [
        "pt",
        (e)=>72 * e
    ],
    [
        "px",
        (e)=>96 * e
    ]
]), l = new Map([
    [
        "hz",
        (e)=>1e3 * e
    ],
    [
        "khz",
        (e)=>e
    ]
]), c = new Map([
    [
        "cm",
        (e)=>e / 10
    ],
    [
        "mm",
        (e)=>e
    ],
    [
        "q",
        (e)=>4 * e
    ],
    [
        "in",
        (e)=>e / 25.4
    ],
    [
        "pc",
        (e)=>e / 25.4 * 6
    ],
    [
        "pt",
        (e)=>e / 25.4 * 72
    ],
    [
        "px",
        (e)=>e / 25.4 * 96
    ]
]), m = new Map([
    [
        "ms",
        (e)=>e
    ],
    [
        "s",
        (e)=>e / 1e3
    ]
]), v = new Map([
    [
        "cm",
        (e)=>e / 6 * 2.54
    ],
    [
        "mm",
        (e)=>e / 6 * 25.4
    ],
    [
        "q",
        (e)=>e / 6 * 25.4 * 4
    ],
    [
        "in",
        (e)=>e / 6
    ],
    [
        "pc",
        (e)=>e
    ],
    [
        "pt",
        (e)=>e / 6 * 72
    ],
    [
        "px",
        (e)=>e / 6 * 96
    ]
]), T = new Map([
    [
        "cm",
        (e)=>e / 72 * 2.54
    ],
    [
        "mm",
        (e)=>e / 72 * 25.4
    ],
    [
        "q",
        (e)=>e / 72 * 25.4 * 4
    ],
    [
        "in",
        (e)=>e / 72
    ],
    [
        "pc",
        (e)=>e / 72 * 6
    ],
    [
        "pt",
        (e)=>e
    ],
    [
        "px",
        (e)=>e / 72 * 96
    ]
]), p = new Map([
    [
        "cm",
        (e)=>e / 96 * 2.54
    ],
    [
        "mm",
        (e)=>e / 96 * 25.4
    ],
    [
        "q",
        (e)=>e / 96 * 25.4 * 4
    ],
    [
        "in",
        (e)=>e / 96
    ],
    [
        "pc",
        (e)=>e / 96 * 6
    ],
    [
        "pt",
        (e)=>e / 96 * 72
    ],
    [
        "px",
        (e)=>e
    ]
]), N = new Map([
    [
        "cm",
        (e)=>e / 4 / 10
    ],
    [
        "mm",
        (e)=>e / 4
    ],
    [
        "q",
        (e)=>e
    ],
    [
        "in",
        (e)=>e / 4 / 25.4
    ],
    [
        "pc",
        (e)=>e / 4 / 25.4 * 6
    ],
    [
        "pt",
        (e)=>e / 4 / 25.4 * 72
    ],
    [
        "px",
        (e)=>e / 4 / 25.4 * 96
    ]
]), f = new Map([
    [
        "deg",
        (e)=>180 * e / Math.PI
    ],
    [
        "grad",
        (e)=>180 * e / Math.PI / .9
    ],
    [
        "rad",
        (e)=>e
    ],
    [
        "turn",
        (e)=>180 * e / Math.PI / 360
    ]
]), d = new Map([
    [
        "ms",
        (e)=>1e3 * e
    ],
    [
        "s",
        (e)=>e
    ]
]), k = new Map([
    [
        "deg",
        (e)=>360 * e
    ],
    [
        "grad",
        (e)=>360 * e / .9
    ],
    [
        "rad",
        (e)=>360 * e / 180 * Math.PI
    ],
    [
        "turn",
        (e)=>e
    ]
]), C = new Map([
    [
        "cm",
        r
    ],
    [
        "mm",
        c
    ],
    [
        "q",
        N
    ],
    [
        "in",
        s
    ],
    [
        "pc",
        v
    ],
    [
        "pt",
        T
    ],
    [
        "px",
        p
    ],
    [
        "ms",
        m
    ],
    [
        "s",
        d
    ],
    [
        "deg",
        i
    ],
    [
        "grad",
        u
    ],
    [
        "rad",
        f
    ],
    [
        "turn",
        k
    ],
    [
        "hz",
        a
    ],
    [
        "khz",
        l
    ]
]);
function convertUnit(e, t) {
    if (!n.isTokenDimension(e)) return t;
    if (!n.isTokenDimension(t)) return t;
    const o = toLowerCaseAZ(e[4].unit), r = toLowerCaseAZ(t[4].unit);
    if (o === r) return t;
    const i = C.get(r);
    if (!i) return t;
    const u = i.get(o);
    if (!u) return t;
    const a = u(t[4].value), s = [
        n.TokenType.Dimension,
        "",
        t[2],
        t[3],
        {
            ...t[4],
            signCharacter: a < 0 ? "-" : void 0,
            type: Number.isInteger(a) ? n.NumberType.Integer : n.NumberType.Number,
            value: a
        }
    ];
    return n.mutateUnit(s, e[4].unit), s;
}
function toCanonicalUnit(e) {
    if (!n.isTokenDimension(e)) return e;
    const t = toLowerCaseAZ(e[4].unit), r = o[t];
    if (t === r) return e;
    const i = C.get(t);
    if (!i) return e;
    const u = i.get(r);
    if (!u) return e;
    const a = u(e[4].value), s = [
        n.TokenType.Dimension,
        "",
        e[2],
        e[3],
        {
            ...e[4],
            signCharacter: a < 0 ? "-" : void 0,
            type: Number.isInteger(a) ? n.NumberType.Integer : n.NumberType.Number,
            value: a
        }
    ];
    return n.mutateUnit(s, r), s;
}
function addition(t) {
    if (2 !== t.length) return -1;
    const o = t[0].value;
    let r = t[1].value;
    if (n.isTokenNumber(o) && n.isTokenNumber(r)) {
        const t = o[4].value + r[4].value;
        return new e.TokenNode([
            n.TokenType.Number,
            t.toString(),
            o[2],
            r[3],
            {
                value: t,
                type: o[4].type === n.NumberType.Integer && r[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number
            }
        ]);
    }
    if (n.isTokenPercentage(o) && n.isTokenPercentage(r)) {
        const t = o[4].value + r[4].value;
        return new e.TokenNode([
            n.TokenType.Percentage,
            t.toString() + "%",
            o[2],
            r[3],
            {
                value: t
            }
        ]);
    }
    if (n.isTokenDimension(o) && n.isTokenDimension(r) && (r = convertUnit(o, r), toLowerCaseAZ(o[4].unit) === toLowerCaseAZ(r[4].unit))) {
        const t = o[4].value + r[4].value;
        return new e.TokenNode([
            n.TokenType.Dimension,
            t.toString() + o[4].unit,
            o[2],
            r[3],
            {
                value: t,
                type: o[4].type === n.NumberType.Integer && r[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number,
                unit: o[4].unit
            }
        ]);
    }
    return -1;
}
function division(t) {
    if (2 !== t.length) return -1;
    const o = t[0].value, r = t[1].value;
    if (n.isTokenNumber(o) && n.isTokenNumber(r)) {
        const t = o[4].value / r[4].value;
        return new e.TokenNode([
            n.TokenType.Number,
            t.toString(),
            o[2],
            r[3],
            {
                value: t,
                type: Number.isInteger(t) ? n.NumberType.Integer : n.NumberType.Number
            }
        ]);
    }
    if (n.isTokenPercentage(o) && n.isTokenNumber(r)) {
        const t = o[4].value / r[4].value;
        return new e.TokenNode([
            n.TokenType.Percentage,
            t.toString() + "%",
            o[2],
            r[3],
            {
                value: t
            }
        ]);
    }
    if (n.isTokenDimension(o) && n.isTokenNumber(r)) {
        const t = o[4].value / r[4].value;
        return new e.TokenNode([
            n.TokenType.Dimension,
            t.toString() + o[4].unit,
            o[2],
            r[3],
            {
                value: t,
                type: Number.isInteger(t) ? n.NumberType.Integer : n.NumberType.Number,
                unit: o[4].unit
            }
        ]);
    }
    return -1;
}
function isCalculation(e) {
    return !!e && "object" == typeof e && "inputs" in e && Array.isArray(e.inputs) && "operation" in e;
}
function solve(n) {
    if (-1 === n) return -1;
    const t = [];
    for(let o = 0; o < n.inputs.length; o++){
        const r = n.inputs[o];
        if (e.isTokenNode(r)) {
            t.push(r);
            continue;
        }
        const i = solve(r);
        if (-1 === i) return -1;
        t.push(i);
    }
    return n.operation(t);
}
function multiplication(t) {
    if (2 !== t.length) return -1;
    const o = t[0].value, r = t[1].value;
    if (n.isTokenNumber(o) && n.isTokenNumber(r)) {
        const t = o[4].value * r[4].value;
        return new e.TokenNode([
            n.TokenType.Number,
            t.toString(),
            o[2],
            r[3],
            {
                value: t,
                type: o[4].type === n.NumberType.Integer && r[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number
            }
        ]);
    }
    if (n.isTokenPercentage(o) && n.isTokenNumber(r)) {
        const t = o[4].value * r[4].value;
        return new e.TokenNode([
            n.TokenType.Percentage,
            t.toString() + "%",
            o[2],
            r[3],
            {
                value: t
            }
        ]);
    }
    if (n.isTokenNumber(o) && n.isTokenPercentage(r)) {
        const t = o[4].value * r[4].value;
        return new e.TokenNode([
            n.TokenType.Percentage,
            t.toString() + "%",
            o[2],
            r[3],
            {
                value: t
            }
        ]);
    }
    if (n.isTokenDimension(o) && n.isTokenNumber(r)) {
        const t = o[4].value * r[4].value;
        return new e.TokenNode([
            n.TokenType.Dimension,
            t.toString() + o[4].unit,
            o[2],
            r[3],
            {
                value: t,
                type: o[4].type === n.NumberType.Integer && r[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number,
                unit: o[4].unit
            }
        ]);
    }
    if (n.isTokenNumber(o) && n.isTokenDimension(r)) {
        const t = o[4].value * r[4].value;
        return new e.TokenNode([
            n.TokenType.Dimension,
            t.toString() + r[4].unit,
            o[2],
            r[3],
            {
                value: t,
                type: o[4].type === n.NumberType.Integer && r[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number,
                unit: r[4].unit
            }
        ]);
    }
    return -1;
}
function resolveGlobalsAndConstants(t, o) {
    for(let r = 0; r < t.length; r++){
        const i = t[r];
        if (!e.isTokenNode(i)) continue;
        const u = i.value;
        if (!n.isTokenIdent(u)) continue;
        const a = toLowerCaseAZ(u[4].value);
        switch(a){
            case "e":
                t.splice(r, 1, new e.TokenNode([
                    n.TokenType.Number,
                    Math.E.toString(),
                    u[2],
                    u[3],
                    {
                        value: Math.E,
                        type: n.NumberType.Number
                    }
                ]));
                break;
            case "pi":
                t.splice(r, 1, new e.TokenNode([
                    n.TokenType.Number,
                    Math.PI.toString(),
                    u[2],
                    u[3],
                    {
                        value: Math.PI,
                        type: n.NumberType.Number
                    }
                ]));
                break;
            case "infinity":
                t.splice(r, 1, new e.TokenNode([
                    n.TokenType.Number,
                    "infinity",
                    u[2],
                    u[3],
                    {
                        value: 1 / 0,
                        type: n.NumberType.Number
                    }
                ]));
                break;
            case "-infinity":
                t.splice(r, 1, new e.TokenNode([
                    n.TokenType.Number,
                    "-infinity",
                    u[2],
                    u[3],
                    {
                        value: -1 / 0,
                        type: n.NumberType.Number
                    }
                ]));
                break;
            case "nan":
                t.splice(r, 1, new e.TokenNode([
                    n.TokenType.Number,
                    "NaN",
                    u[2],
                    u[3],
                    {
                        value: Number.NaN,
                        type: n.NumberType.Number
                    }
                ]));
                break;
            default:
                if (o.has(a)) {
                    const n = o.get(a);
                    t.splice(r, 1, new e.TokenNode(n));
                }
        }
    }
    return t;
}
function unary(e) {
    if (1 !== e.length) return -1;
    const t = e[0].value;
    return n.isTokenNumeric(t) ? e[0] : -1;
}
function resultToCalculation(e, t, o) {
    return n.isTokenDimension(t) ? dimensionToCalculation(e, t[4].unit, o) : n.isTokenPercentage(t) ? percentageToCalculation(e, o) : n.isTokenNumber(t) ? numberToCalculation(e, o) : -1;
}
function dimensionToCalculation(t, o, r) {
    const i = t.tokens();
    return {
        inputs: [
            new e.TokenNode([
                n.TokenType.Dimension,
                r.toString() + o,
                i[0][2],
                i[i.length - 1][3],
                {
                    value: r,
                    type: Number.isInteger(r) ? n.NumberType.Integer : n.NumberType.Number,
                    unit: o
                }
            ])
        ],
        operation: unary
    };
}
function percentageToCalculation(t, o) {
    const r = t.tokens();
    return {
        inputs: [
            new e.TokenNode([
                n.TokenType.Percentage,
                o.toString() + "%",
                r[0][2],
                r[r.length - 1][3],
                {
                    value: o
                }
            ])
        ],
        operation: unary
    };
}
function numberToCalculation(t, o) {
    const r = t.tokens();
    return {
        inputs: [
            new e.TokenNode([
                n.TokenType.Number,
                o.toString(),
                r[0][2],
                r[r.length - 1][3],
                {
                    value: o,
                    type: Number.isInteger(o) ? n.NumberType.Integer : n.NumberType.Number
                }
            ])
        ],
        operation: unary
    };
}
function solveACos(e, t) {
    const o = t.value;
    if (!n.isTokenNumber(o)) return -1;
    return dimensionToCalculation(e, "rad", Math.acos(o[4].value));
}
function solveASin(e, t) {
    const o = t.value;
    if (!n.isTokenNumber(o)) return -1;
    return dimensionToCalculation(e, "rad", Math.asin(o[4].value));
}
function solveATan(e, t) {
    const o = t.value;
    if (!n.isTokenNumber(o)) return -1;
    return dimensionToCalculation(e, "rad", Math.atan(o[4].value));
}
function isDimensionOrNumber(e) {
    return n.isTokenDimension(e) || n.isTokenNumber(e);
}
function arrayOfSameNumeric(e) {
    if (0 === e.length) return !0;
    const t = e[0];
    if (!n.isTokenNumeric(t)) return !1;
    if (1 === e.length) return !0;
    if (n.isTokenDimension(t)) {
        const n = toLowerCaseAZ(t[4].unit);
        for(let o = 1; o < e.length; o++){
            const r = e[o];
            if (t[0] !== r[0]) return !1;
            if (n !== toLowerCaseAZ(r[4].unit)) return !1;
        }
        return !0;
    }
    for(let n = 1; n < e.length; n++){
        const o = e[n];
        if (t[0] !== o[0]) return !1;
    }
    return !0;
}
function twoOfSameNumeric(e, t) {
    return !!n.isTokenNumeric(e) && (n.isTokenDimension(e) ? e[0] === t[0] && toLowerCaseAZ(e[4].unit) === toLowerCaseAZ(t[4].unit) : e[0] === t[0]);
}
function solveATan2(e, n, t) {
    const o = n.value;
    if (!isDimensionOrNumber(o)) return -1;
    const r = convertUnit(o, t.value);
    if (!twoOfSameNumeric(o, r)) return -1;
    return dimensionToCalculation(e, "rad", Math.atan2(o[4].value, r[4].value));
}
function solveAbs(e, t, o) {
    const r = t.value;
    if (!n.isTokenNumeric(r)) return -1;
    if (!o.rawPercentages && n.isTokenPercentage(r)) return -1;
    return resultToCalculation(e, r, Math.abs(r[4].value));
}
function solveClamp(t, o, r, i, u) {
    if (!e.isTokenNode(o) || !e.isTokenNode(r) || !e.isTokenNode(i)) return -1;
    const a = o.value;
    if (!n.isTokenNumeric(a)) return -1;
    if (!u.rawPercentages && n.isTokenPercentage(a)) return -1;
    const s = convertUnit(a, r.value);
    if (!twoOfSameNumeric(a, s)) return -1;
    const l = convertUnit(a, i.value);
    if (!twoOfSameNumeric(a, l)) return -1;
    return resultToCalculation(t, a, Math.max(a[4].value, Math.min(s[4].value, l[4].value)));
}
function solveCos(e, t) {
    const o = t.value;
    if (!isDimensionOrNumber(o)) return -1;
    let r = o[4].value;
    if (n.isTokenDimension(o)) switch(o[4].unit.toLowerCase()){
        case "rad":
            break;
        case "deg":
            r = i.get("rad")(o[4].value);
            break;
        case "grad":
            r = u.get("rad")(o[4].value);
            break;
        case "turn":
            r = k.get("rad")(o[4].value);
            break;
        default:
            return -1;
    }
    return r = Math.cos(r), numberToCalculation(e, r);
}
function solveExp(e, t) {
    const o = t.value;
    if (!n.isTokenNumber(o)) return -1;
    return numberToCalculation(e, Math.exp(o[4].value));
}
function solveHypot(t, o, r) {
    if (!o.every(e.isTokenNode)) return -1;
    const i = o[0].value;
    if (!n.isTokenNumeric(i)) return -1;
    if (!r.rawPercentages && n.isTokenPercentage(i)) return -1;
    const u = o.map((e)=>convertUnit(i, e.value));
    if (!arrayOfSameNumeric(u)) return -1;
    const a = u.map((e)=>e[4].value), s = Math.hypot(...a);
    return resultToCalculation(t, i, s);
}
function solveMax(t, o, r) {
    if (!o.every(e.isTokenNode)) return -1;
    const i = o[0].value;
    if (!n.isTokenNumeric(i)) return -1;
    if (!r.rawPercentages && n.isTokenPercentage(i)) return -1;
    const u = o.map((e)=>convertUnit(i, e.value));
    if (!arrayOfSameNumeric(u)) return -1;
    const a = u.map((e)=>e[4].value), s = Math.max(...a);
    return resultToCalculation(t, i, s);
}
function solveMin(t, o, r) {
    if (!o.every(e.isTokenNode)) return -1;
    const i = o[0].value;
    if (!n.isTokenNumeric(i)) return -1;
    if (!r.rawPercentages && n.isTokenPercentage(i)) return -1;
    const u = o.map((e)=>convertUnit(i, e.value));
    if (!arrayOfSameNumeric(u)) return -1;
    const a = u.map((e)=>e[4].value), s = Math.min(...a);
    return resultToCalculation(t, i, s);
}
function solveMod(e, t, o) {
    const r = t.value;
    if (!n.isTokenNumeric(r)) return -1;
    const i = convertUnit(r, o.value);
    if (!twoOfSameNumeric(r, i)) return -1;
    let u;
    return u = 0 === i[4].value ? Number.NaN : Number.isFinite(r[4].value) && (Number.isFinite(i[4].value) || (i[4].value !== Number.POSITIVE_INFINITY || r[4].value !== Number.NEGATIVE_INFINITY && !Object.is(0 * r[4].value, -0)) && (i[4].value !== Number.NEGATIVE_INFINITY || r[4].value !== Number.POSITIVE_INFINITY && !Object.is(0 * r[4].value, 0))) ? Number.isFinite(i[4].value) ? (r[4].value % i[4].value + i[4].value) % i[4].value : r[4].value : Number.NaN, resultToCalculation(e, r, u);
}
function solvePow(e, t, o) {
    const r = t.value, i = o.value;
    if (!n.isTokenNumber(r)) return -1;
    if (!twoOfSameNumeric(r, i)) return -1;
    return numberToCalculation(e, Math.pow(r[4].value, i[4].value));
}
function solveRem(e, t, o) {
    const r = t.value;
    if (!n.isTokenNumeric(r)) return -1;
    const i = convertUnit(r, o.value);
    if (!twoOfSameNumeric(r, i)) return -1;
    let u;
    return u = 0 === i[4].value ? Number.NaN : Number.isFinite(r[4].value) ? Number.isFinite(i[4].value) ? r[4].value % i[4].value : r[4].value : Number.NaN, resultToCalculation(e, r, u);
}
function solveRound(e, t, o, r, i) {
    const u = o.value;
    if (!n.isTokenNumeric(u)) return -1;
    if (!i.rawPercentages && n.isTokenPercentage(u)) return -1;
    const a = convertUnit(u, r.value);
    if (!twoOfSameNumeric(u, a)) return -1;
    let s;
    if (0 === a[4].value) s = Number.NaN;
    else if (Number.isFinite(u[4].value) || Number.isFinite(a[4].value)) if (!Number.isFinite(u[4].value) && Number.isFinite(a[4].value)) s = u[4].value;
    else if (Number.isFinite(u[4].value) && !Number.isFinite(a[4].value)) switch(t){
        case "down":
            s = u[4].value < 0 ? -1 / 0 : Object.is(-0, 0 * u[4].value) ? -0 : 0;
            break;
        case "up":
            s = u[4].value > 0 ? 1 / 0 : Object.is(0, 0 * u[4].value) ? 0 : -0;
            break;
        default:
            s = Object.is(0, 0 * u[4].value) ? 0 : -0;
    }
    else if (Number.isFinite(a[4].value)) switch(t){
        case "down":
            s = Math.floor(u[4].value / a[4].value) * a[4].value;
            break;
        case "up":
            s = Math.ceil(u[4].value / a[4].value) * a[4].value;
            break;
        case "to-zero":
            s = Math.trunc(u[4].value / a[4].value) * a[4].value;
            break;
        default:
            {
                let e = Math.floor(u[4].value / a[4].value) * a[4].value, n = Math.ceil(u[4].value / a[4].value) * a[4].value;
                if (e > n) {
                    const t = e;
                    e = n, n = t;
                }
                const t = Math.abs(u[4].value - e), o = Math.abs(u[4].value - n);
                s = t === o ? n : t < o ? e : n;
                break;
            }
    }
    else s = u[4].value;
    else s = Number.NaN;
    return resultToCalculation(e, u, s);
}
function solveSign(e, t, o) {
    const r = t.value;
    if (!n.isTokenNumeric(r)) return -1;
    if (!o.rawPercentages && n.isTokenPercentage(r)) return -1;
    return numberToCalculation(e, Math.sign(r[4].value));
}
function solveSin(e, t) {
    const o = t.value;
    if (!isDimensionOrNumber(o)) return -1;
    let r = o[4].value;
    if (n.isTokenDimension(o)) switch(toLowerCaseAZ(o[4].unit)){
        case "rad":
            break;
        case "deg":
            r = i.get("rad")(o[4].value);
            break;
        case "grad":
            r = u.get("rad")(o[4].value);
            break;
        case "turn":
            r = k.get("rad")(o[4].value);
            break;
        default:
            return -1;
    }
    return r = Math.sin(r), numberToCalculation(e, r);
}
function solveSqrt(e, t) {
    const o = t.value;
    if (!n.isTokenNumber(o)) return -1;
    return numberToCalculation(e, Math.sqrt(o[4].value));
}
function solveTan(e, t) {
    const o = t.value;
    if (!isDimensionOrNumber(o)) return -1;
    const r = o[4].value;
    let a = 0, s = o[4].value;
    if (n.isTokenDimension(o)) switch(toLowerCaseAZ(o[4].unit)){
        case "rad":
            a = f.get("deg")(r);
            break;
        case "deg":
            a = r, s = i.get("rad")(r);
            break;
        case "grad":
            a = u.get("deg")(r), s = u.get("rad")(r);
            break;
        case "turn":
            a = k.get("deg")(r), s = k.get("rad")(r);
            break;
        default:
            return -1;
    }
    const l = a / 90;
    return s = a % 90 == 0 && l % 2 != 0 ? l > 0 ? 1 / 0 : -1 / 0 : Math.tan(s), numberToCalculation(e, s);
}
function subtraction(t) {
    if (2 !== t.length) return -1;
    const o = t[0].value;
    let r = t[1].value;
    if (n.isTokenNumber(o) && n.isTokenNumber(r)) {
        const t = o[4].value - r[4].value;
        return new e.TokenNode([
            n.TokenType.Number,
            t.toString(),
            o[2],
            r[3],
            {
                value: t,
                type: o[4].type === n.NumberType.Integer && r[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number
            }
        ]);
    }
    if (n.isTokenPercentage(o) && n.isTokenPercentage(r)) {
        const t = o[4].value - r[4].value;
        return new e.TokenNode([
            n.TokenType.Percentage,
            t.toString() + "%",
            o[2],
            r[3],
            {
                value: t
            }
        ]);
    }
    if (n.isTokenDimension(o) && n.isTokenDimension(r) && (r = convertUnit(o, r), toLowerCaseAZ(o[4].unit) === toLowerCaseAZ(r[4].unit))) {
        const t = o[4].value - r[4].value;
        return new e.TokenNode([
            n.TokenType.Dimension,
            t.toString() + o[4].unit,
            o[2],
            r[3],
            {
                value: t,
                type: o[4].type === n.NumberType.Integer && r[4].type === n.NumberType.Integer ? n.NumberType.Integer : n.NumberType.Number,
                unit: o[4].unit
            }
        ]);
    }
    return -1;
}
function solveLog(t, o) {
    if (1 === o.length) {
        const r = o[0];
        if (!r || !e.isTokenNode(r)) return -1;
        const i = r.value;
        if (!n.isTokenNumber(i)) return -1;
        return numberToCalculation(t, Math.log(i[4].value));
    }
    if (2 === o.length) {
        const r = o[0];
        if (!r || !e.isTokenNode(r)) return -1;
        const i = r.value;
        if (!n.isTokenNumber(i)) return -1;
        const u = o[1];
        if (!u || !e.isTokenNode(u)) return -1;
        const a = u.value;
        if (!n.isTokenNumber(a)) return -1;
        return numberToCalculation(t, Math.log(i[4].value) / Math.log(a[4].value));
    }
    return -1;
}
const g = /^none$/i;
function isNone(t) {
    if (Array.isArray(t)) {
        const n = t.filter((n)=>!(e.isWhitespaceNode(n) && e.isCommentNode(n)));
        return 1 === n.length && isNone(n[0]);
    }
    if (!e.isTokenNode(t)) return !1;
    const o = t.value;
    return !!n.isTokenIdent(o) && g.test(o[4].value);
}
const D = String.fromCodePoint(0);
function solveRandom(e, t, o, r, i, u) {
    if (-1 === t.fixed && !u.randomCaching) return -1;
    u.randomCaching || (u.randomCaching = {
        propertyName: "",
        propertyN: 0,
        elementID: "",
        documentID: ""
    }), u.randomCaching && !u.randomCaching.propertyN && (u.randomCaching.propertyN = 0);
    const a = o.value;
    if (!n.isTokenNumeric(a)) return -1;
    const s = convertUnit(a, r.value);
    if (!twoOfSameNumeric(a, s)) return -1;
    let l = null;
    if (i && (l = convertUnit(a, i.value), !twoOfSameNumeric(a, l))) return -1;
    if (!Number.isFinite(a[4].value)) return resultToCalculation(e, a, Number.NaN);
    if (!Number.isFinite(s[4].value)) return resultToCalculation(e, a, Number.NaN);
    if (!Number.isFinite(s[4].value - a[4].value)) return resultToCalculation(e, a, Number.NaN);
    if (l && !Number.isFinite(l[4].value)) return resultToCalculation(e, a, a[4].value);
    const c = -1 === t.fixed ? sfc32(crc32([
        t.dashedIdent ? t.dashedIdent : `${u.randomCaching?.propertyName} ${u.randomCaching.propertyN++}`,
        t.elementShared ? "" : u.randomCaching.elementID,
        u.randomCaching.documentID
    ].join(D))) : ()=>t.fixed;
    let m = a[4].value, v = s[4].value;
    if (m > v && ([m, v] = [
        v,
        m
    ]), l && (l[4].value <= 0 || Math.abs(m - v) / l[4].value > 1e10) && (l = null), l) {
        const n = Math.max(l[4].value / 1e3, 1e-9), t = [
            m
        ];
        let o = 0;
        for(;;){
            o += l[4].value;
            const e = m + o;
            if (!(e + n < v)) {
                t.push(v);
                break;
            }
            if (t.push(e), e + l[4].value - n > v) break;
        }
        const r = c();
        return resultToCalculation(e, a, Number(t[Math.floor(t.length * r)].toFixed(5)));
    }
    const T = c();
    return resultToCalculation(e, a, Number((T * (v - m) + m).toFixed(5)));
}
function sfc32(e = .34944106645296036, n = .19228640875738723, t = .8784393832007205, o = .04850964319275053) {
    return ()=>{
        const r = ((e |= 0) + (n |= 0) | 0) + (o |= 0) | 0;
        return o = o + 1 | 0, e = n ^ n >>> 9, n = (t |= 0) + (t << 3) | 0, t = (t = t << 21 | t >>> 11) + r | 0, (r >>> 0) / 4294967296;
    };
}
function crc32(e) {
    let n = 0, t = 0, o = 0;
    n ^= -1;
    for(let r = 0, i = e.length; r < i; r++)o = 255 & (n ^ e.charCodeAt(r)), t = Number("0x" + "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".substring(9 * o, 9 * o + 8)), n = n >>> 8 ^ t;
    return (-1 ^ n) >>> 0;
}
const b = new Map([
    [
        "abs",
        function abs(e, n, t) {
            return singleNodeSolver(e, n, t, solveAbs);
        }
    ],
    [
        "acos",
        function acos(e, n, t) {
            return singleNodeSolver(e, n, t, solveACos);
        }
    ],
    [
        "asin",
        function asin(e, n, t) {
            return singleNodeSolver(e, n, t, solveASin);
        }
    ],
    [
        "atan",
        function atan(e, n, t) {
            return singleNodeSolver(e, n, t, solveATan);
        }
    ],
    [
        "atan2",
        function atan2(e, n, t) {
            return twoCommaSeparatedNodesSolver(e, n, t, solveATan2);
        }
    ],
    [
        "calc",
        calc$1
    ],
    [
        "clamp",
        function clamp(t, o, r) {
            const i = resolveGlobalsAndConstants([
                ...t.value.filter((n)=>!e.isWhiteSpaceOrCommentNode(n))
            ], o), u = [], a = [], s = [];
            {
                let t = u;
                for(let o = 0; o < i.length; o++){
                    const r = i[o];
                    if (e.isTokenNode(r) && n.isTokenComma(r.value)) {
                        if (t === s) return -1;
                        if (t === a) {
                            t = s;
                            continue;
                        }
                        if (t === u) {
                            t = a;
                            continue;
                        }
                        return -1;
                    }
                    t.push(r);
                }
            }
            const l = isNone(u), c = isNone(s);
            if (l && c) return calc$1(calcWrapper(a), o, r);
            const m = solve(calc$1(calcWrapper(a), o, r));
            if (-1 === m) return -1;
            if (l) {
                const t = solve(calc$1(calcWrapper(s), o, r));
                return -1 === t ? -1 : solveMin((v = m, T = t, new e.FunctionNode([
                    n.TokenType.Function,
                    "min(",
                    -1,
                    -1,
                    {
                        value: "min"
                    }
                ], [
                    n.TokenType.CloseParen,
                    ")",
                    -1,
                    -1,
                    void 0
                ], [
                    v,
                    new e.TokenNode([
                        n.TokenType.Comma,
                        ",",
                        -1,
                        -1,
                        void 0
                    ]),
                    T
                ])), [
                    m,
                    t
                ], r);
            }
            if (c) {
                const e = solve(calc$1(calcWrapper(u), o, r));
                return -1 === e ? -1 : solveMax(maxWrapper(e, m), [
                    e,
                    m
                ], r);
            }
            var v, T;
            const p = solve(calc$1(calcWrapper(u), o, r));
            if (-1 === p) return -1;
            const N = solve(calc$1(calcWrapper(s), o, r));
            if (-1 === N) return -1;
            return solveClamp(t, p, m, N, r);
        }
    ],
    [
        "cos",
        function cos(e, n, t) {
            return singleNodeSolver(e, n, t, solveCos);
        }
    ],
    [
        "exp",
        function exp(e, n, t) {
            return singleNodeSolver(e, n, t, solveExp);
        }
    ],
    [
        "hypot",
        function hypot(e, n, t) {
            return variadicNodesSolver(e, e.value, n, t, solveHypot);
        }
    ],
    [
        "log",
        function log(e, n, t) {
            return variadicNodesSolver(e, e.value, n, t, solveLog);
        }
    ],
    [
        "max",
        function max(e, n, t) {
            return variadicNodesSolver(e, e.value, n, t, solveMax);
        }
    ],
    [
        "min",
        function min(e, n, t) {
            return variadicNodesSolver(e, e.value, n, t, solveMin);
        }
    ],
    [
        "mod",
        function mod(e, n, t) {
            return twoCommaSeparatedNodesSolver(e, n, t, solveMod);
        }
    ],
    [
        "pow",
        function pow(e, n, t) {
            return twoCommaSeparatedNodesSolver(e, n, t, solvePow);
        }
    ],
    [
        "random",
        function random(n, t, o) {
            const r = parseRandomValueSharing(n.value.filter((n)=>!e.isWhiteSpaceOrCommentNode(n)), t, o);
            if (-1 === r) return -1;
            const [i, u] = r, a = variadicArguments(u, t, o);
            if (-1 === a) return -1;
            const [s, l, c] = a;
            if (!s || !l) return -1;
            return solveRandom(n, i, s, l, c, o);
        }
    ],
    [
        "rem",
        function rem(e, n, t) {
            return twoCommaSeparatedNodesSolver(e, n, t, solveRem);
        }
    ],
    [
        "round",
        function round(t, o, r) {
            const i = resolveGlobalsAndConstants([
                ...t.value.filter((n)=>!e.isWhiteSpaceOrCommentNode(n))
            ], o);
            let u = "", a = !1;
            const s = [], l = [];
            {
                let t = s;
                for(let o = 0; o < i.length; o++){
                    const r = i[o];
                    if (!u && 0 === s.length && 0 === l.length && e.isTokenNode(r) && n.isTokenIdent(r.value)) {
                        const e = r.value[4].value.toLowerCase();
                        if (y.has(e)) {
                            u = e;
                            continue;
                        }
                    }
                    if (e.isTokenNode(r) && n.isTokenComma(r.value)) {
                        if (t === l) return -1;
                        if (t === s && u && 0 === s.length) continue;
                        if (t === s) {
                            a = !0, t = l;
                            continue;
                        }
                        return -1;
                    }
                    t.push(r);
                }
            }
            const c = solve(calc$1(calcWrapper(s), o, r));
            if (-1 === c) return -1;
            a || 0 !== l.length || l.push(new e.TokenNode([
                n.TokenType.Number,
                "1",
                -1,
                -1,
                {
                    value: 1,
                    type: n.NumberType.Integer
                }
            ]));
            const m = solve(calc$1(calcWrapper(l), o, r));
            if (-1 === m) return -1;
            u || (u = "nearest");
            return solveRound(t, u, c, m, r);
        }
    ],
    [
        "sign",
        function sign(e, n, t) {
            return singleNodeSolver(e, n, t, solveSign);
        }
    ],
    [
        "sin",
        function sin(e, n, t) {
            return singleNodeSolver(e, n, t, solveSin);
        }
    ],
    [
        "sqrt",
        function sqrt(e, n, t) {
            return singleNodeSolver(e, n, t, solveSqrt);
        }
    ],
    [
        "tan",
        function tan(e, n, t) {
            return singleNodeSolver(e, n, t, solveTan);
        }
    ]
]);
function calc$1(t, o, r) {
    const i = resolveGlobalsAndConstants([
        ...t.value.filter((n)=>!e.isWhiteSpaceOrCommentNode(n))
    ], o);
    if (1 === i.length && e.isTokenNode(i[0])) return {
        inputs: [
            i[0]
        ],
        operation: unary
    };
    let u = 0;
    for(; u < i.length;){
        const t = i[u];
        if (e.isSimpleBlockNode(t) && n.isTokenOpenParen(t.startToken)) {
            const e = calc$1(t, o, r);
            if (-1 === e) return -1;
            i.splice(u, 1, e);
        } else if (e.isFunctionNode(t)) {
            const e = b.get(t.getName().toLowerCase());
            if (!e) return -1;
            const n = e(t, o, r);
            if (-1 === n) return -1;
            i.splice(u, 1, n);
        } else u++;
    }
    if (u = 0, 1 === i.length && isCalculation(i[0])) return i[0];
    for(; u < i.length;){
        const t = i[u];
        if (!t || !e.isTokenNode(t) && !isCalculation(t)) {
            u++;
            continue;
        }
        const o = i[u + 1];
        if (!o || !e.isTokenNode(o)) {
            u++;
            continue;
        }
        const r = o.value;
        if (!n.isTokenDelim(r) || "*" !== r[4].value && "/" !== r[4].value) {
            u++;
            continue;
        }
        const a = i[u + 2];
        if (!a || !e.isTokenNode(a) && !isCalculation(a)) return -1;
        "*" !== r[4].value ? "/" !== r[4].value ? u++ : i.splice(u, 3, {
            inputs: [
                t,
                a
            ],
            operation: division
        }) : i.splice(u, 3, {
            inputs: [
                t,
                a
            ],
            operation: multiplication
        });
    }
    if (u = 0, 1 === i.length && isCalculation(i[0])) return i[0];
    for(; u < i.length;){
        const t = i[u];
        if (!t || !e.isTokenNode(t) && !isCalculation(t)) {
            u++;
            continue;
        }
        const o = i[u + 1];
        if (!o || !e.isTokenNode(o)) {
            u++;
            continue;
        }
        const r = o.value;
        if (!n.isTokenDelim(r) || "+" !== r[4].value && "-" !== r[4].value) {
            u++;
            continue;
        }
        const a = i[u + 2];
        if (!a || !e.isTokenNode(a) && !isCalculation(a)) return -1;
        "+" !== r[4].value ? "-" !== r[4].value ? u++ : i.splice(u, 3, {
            inputs: [
                t,
                a
            ],
            operation: subtraction
        }) : i.splice(u, 3, {
            inputs: [
                t,
                a
            ],
            operation: addition
        });
    }
    return 1 === i.length && isCalculation(i[0]) ? i[0] : -1;
}
function singleNodeSolver(e, n, t, o) {
    const r = singleArgument(e.value, n, t);
    return -1 === r ? -1 : o(e, r, t);
}
function singleArgument(n, t, o) {
    const r = solve(calc$1(calcWrapper(resolveGlobalsAndConstants([
        ...n.filter((n)=>!e.isWhiteSpaceOrCommentNode(n))
    ], t)), t, o));
    return -1 === r ? -1 : r;
}
function twoCommaSeparatedNodesSolver(e, n, t, o) {
    const r = twoCommaSeparatedArguments(e.value, n, t);
    if (-1 === r) return -1;
    const [i, u] = r;
    return o(e, i, u, t);
}
function twoCommaSeparatedArguments(t, o, r) {
    const i = resolveGlobalsAndConstants([
        ...t.filter((n)=>!e.isWhiteSpaceOrCommentNode(n))
    ], o), u = [], a = [];
    {
        let t = u;
        for(let o = 0; o < i.length; o++){
            const r = i[o];
            if (e.isTokenNode(r) && n.isTokenComma(r.value)) {
                if (t === a) return -1;
                if (t === u) {
                    t = a;
                    continue;
                }
                return -1;
            }
            t.push(r);
        }
    }
    const s = solve(calc$1(calcWrapper(u), o, r));
    if (-1 === s) return -1;
    const l = solve(calc$1(calcWrapper(a), o, r));
    return -1 === l ? -1 : [
        s,
        l
    ];
}
function variadicNodesSolver(e, n, t, o, r) {
    const i = variadicArguments(e.value, t, o);
    return -1 === i ? -1 : r(e, i, o);
}
function variadicArguments(t, o, r) {
    const i = resolveGlobalsAndConstants([
        ...t.filter((n)=>!e.isWhiteSpaceOrCommentNode(n))
    ], o), u = [];
    {
        const t = [];
        let a = [];
        for(let o = 0; o < i.length; o++){
            const r = i[o];
            e.isTokenNode(r) && n.isTokenComma(r.value) ? (t.push(a), a = []) : a.push(r);
        }
        t.push(a);
        for(let e = 0; e < t.length; e++){
            if (0 === t[e].length) return -1;
            const n = solve(calc$1(calcWrapper(t[e]), o, r));
            if (-1 === n) return -1;
            u.push(n);
        }
    }
    return u;
}
const y = new Set([
    "nearest",
    "up",
    "down",
    "to-zero"
]);
function parseRandomValueSharing(t, o, r) {
    const i = {
        isAuto: !1,
        dashedIdent: "",
        fixed: -1,
        elementShared: !1
    }, u = t[0];
    if (!e.isTokenNode(u) || !n.isTokenIdent(u.value)) return [
        i,
        t
    ];
    for(let u = 0; u < t.length; u++){
        const a = t[u];
        if (!e.isTokenNode(a)) return -1;
        if (n.isTokenComma(a.value)) return [
            i,
            t.slice(u + 1)
        ];
        if (!n.isTokenIdent(a.value)) return -1;
        const s = a.value[4].value.toLowerCase();
        if ("element-shared" !== s) if ("fixed" !== s) if ("auto" !== s) if (s.startsWith("--")) {
            if (-1 !== i.fixed || i.isAuto) return -1;
            i.dashedIdent = s;
        } else ;
        else {
            if (-1 !== i.fixed || i.dashedIdent) return -1;
            i.isAuto = !0;
        }
        else {
            if (i.elementShared || i.dashedIdent || i.isAuto) return -1;
            u++;
            const e = t[u];
            if (!e) return -1;
            const a = solve(calc$1(calcWrapper([
                e
            ]), o, r));
            if (-1 === a) return -1;
            if (!n.isTokenNumber(a.value)) return -1;
            if (a.value[4].value < 0 || a.value[4].value > 1) return -1;
            i.fixed = Math.max(0, Math.min(a.value[4].value, 1 - 1e-9));
        }
        else {
            if (-1 !== i.fixed) return -1;
            i.elementShared = !0;
        }
    }
    return -1;
}
function calcWrapper(t) {
    return new e.FunctionNode([
        n.TokenType.Function,
        "calc(",
        -1,
        -1,
        {
            value: "calc"
        }
    ], [
        n.TokenType.CloseParen,
        ")",
        -1,
        -1,
        void 0
    ], t);
}
function maxWrapper(t, o) {
    return new e.FunctionNode([
        n.TokenType.Function,
        "max(",
        -1,
        -1,
        {
            value: "max"
        }
    ], [
        n.TokenType.CloseParen,
        ")",
        -1,
        -1,
        void 0
    ], [
        t,
        new e.TokenNode([
            n.TokenType.Comma,
            ",",
            -1,
            -1,
            void 0
        ]),
        o
    ]);
}
function patchNaN(t) {
    if (-1 === t) return -1;
    if (e.isFunctionNode(t)) return t;
    const o = t.value;
    return n.isTokenNumeric(o) && Number.isNaN(o[4].value) ? n.isTokenNumber(o) ? new e.FunctionNode([
        n.TokenType.Function,
        "calc(",
        o[2],
        o[3],
        {
            value: "calc"
        }
    ], [
        n.TokenType.CloseParen,
        ")",
        o[2],
        o[3],
        void 0
    ], [
        new e.TokenNode([
            n.TokenType.Ident,
            "NaN",
            o[2],
            o[3],
            {
                value: "NaN"
            }
        ])
    ]) : n.isTokenDimension(o) ? new e.FunctionNode([
        n.TokenType.Function,
        "calc(",
        o[2],
        o[3],
        {
            value: "calc"
        }
    ], [
        n.TokenType.CloseParen,
        ")",
        o[2],
        o[3],
        void 0
    ], [
        new e.TokenNode([
            n.TokenType.Ident,
            "NaN",
            o[2],
            o[3],
            {
                value: "NaN"
            }
        ]),
        new e.WhitespaceNode([
            [
                n.TokenType.Whitespace,
                " ",
                o[2],
                o[3],
                void 0
            ]
        ]),
        new e.TokenNode([
            n.TokenType.Delim,
            "*",
            o[2],
            o[3],
            {
                value: "*"
            }
        ]),
        new e.WhitespaceNode([
            [
                n.TokenType.Whitespace,
                " ",
                o[2],
                o[3],
                void 0
            ]
        ]),
        new e.TokenNode([
            n.TokenType.Dimension,
            "1" + o[4].unit,
            o[2],
            o[3],
            {
                value: 1,
                type: n.NumberType.Integer,
                unit: o[4].unit
            }
        ])
    ]) : n.isTokenPercentage(o) ? new e.FunctionNode([
        n.TokenType.Function,
        "calc(",
        o[2],
        o[3],
        {
            value: "calc"
        }
    ], [
        n.TokenType.CloseParen,
        ")",
        o[2],
        o[3],
        void 0
    ], [
        new e.TokenNode([
            n.TokenType.Ident,
            "NaN",
            o[2],
            o[3],
            {
                value: "NaN"
            }
        ]),
        new e.WhitespaceNode([
            [
                n.TokenType.Whitespace,
                " ",
                o[2],
                o[3],
                void 0
            ]
        ]),
        new e.TokenNode([
            n.TokenType.Delim,
            "*",
            o[2],
            o[3],
            {
                value: "*"
            }
        ]),
        new e.WhitespaceNode([
            [
                n.TokenType.Whitespace,
                " ",
                o[2],
                o[3],
                void 0
            ]
        ]),
        new e.TokenNode([
            n.TokenType.Percentage,
            "1%",
            o[2],
            o[3],
            {
                value: 1
            }
        ])
    ]) : -1 : t;
}
function patchInfinity(t) {
    if (-1 === t) return -1;
    if (e.isFunctionNode(t)) return t;
    const o = t.value;
    if (!n.isTokenNumeric(o)) return t;
    if (Number.isFinite(o[4].value) || Number.isNaN(o[4].value)) return t;
    let r = "";
    return Number.NEGATIVE_INFINITY === o[4].value && (r = "-"), n.isTokenNumber(o) ? new e.FunctionNode([
        n.TokenType.Function,
        "calc(",
        o[2],
        o[3],
        {
            value: "calc"
        }
    ], [
        n.TokenType.CloseParen,
        ")",
        o[2],
        o[3],
        void 0
    ], [
        new e.TokenNode([
            n.TokenType.Ident,
            r + "infinity",
            o[2],
            o[3],
            {
                value: r + "infinity"
            }
        ])
    ]) : n.isTokenDimension(o) ? new e.FunctionNode([
        n.TokenType.Function,
        "calc(",
        o[2],
        o[3],
        {
            value: "calc"
        }
    ], [
        n.TokenType.CloseParen,
        ")",
        o[2],
        o[3],
        void 0
    ], [
        new e.TokenNode([
            n.TokenType.Ident,
            r + "infinity",
            o[2],
            o[3],
            {
                value: r + "infinity"
            }
        ]),
        new e.WhitespaceNode([
            [
                n.TokenType.Whitespace,
                " ",
                o[2],
                o[3],
                void 0
            ]
        ]),
        new e.TokenNode([
            n.TokenType.Delim,
            "*",
            o[2],
            o[3],
            {
                value: "*"
            }
        ]),
        new e.WhitespaceNode([
            [
                n.TokenType.Whitespace,
                " ",
                o[2],
                o[3],
                void 0
            ]
        ]),
        new e.TokenNode([
            n.TokenType.Dimension,
            "1" + o[4].unit,
            o[2],
            o[3],
            {
                value: 1,
                type: n.NumberType.Integer,
                unit: o[4].unit
            }
        ])
    ]) : new e.FunctionNode([
        n.TokenType.Function,
        "calc(",
        o[2],
        o[3],
        {
            value: "calc"
        }
    ], [
        n.TokenType.CloseParen,
        ")",
        o[2],
        o[3],
        void 0
    ], [
        new e.TokenNode([
            n.TokenType.Ident,
            r + "infinity",
            o[2],
            o[3],
            {
                value: r + "infinity"
            }
        ]),
        new e.WhitespaceNode([
            [
                n.TokenType.Whitespace,
                " ",
                o[2],
                o[3],
                void 0
            ]
        ]),
        new e.TokenNode([
            n.TokenType.Delim,
            "*",
            o[2],
            o[3],
            {
                value: "*"
            }
        ]),
        new e.WhitespaceNode([
            [
                n.TokenType.Whitespace,
                " ",
                o[2],
                o[3],
                void 0
            ]
        ]),
        new e.TokenNode([
            n.TokenType.Percentage,
            "1%",
            o[2],
            o[3],
            {
                value: 1
            }
        ])
    ]);
}
function patchMinusZero(t) {
    if (-1 === t) return -1;
    if (e.isFunctionNode(t)) return t;
    const o = t.value;
    return n.isTokenNumeric(o) && Object.is(-0, o[4].value) ? ("-0" === o[1] || (n.isTokenPercentage(o) ? o[1] = "-0%" : n.isTokenDimension(o) ? o[1] = "-0" + o[4].unit : o[1] = "-0"), t) : t;
}
function patchPrecision(t, o = 13) {
    if (-1 === t) return -1;
    if (o <= 0) return t;
    if (e.isFunctionNode(t)) return t;
    const r = t.value;
    if (!n.isTokenNumeric(r)) return t;
    if (Number.isInteger(r[4].value)) return t;
    const i = Number(r[4].value.toFixed(o)).toString();
    return n.isTokenNumber(r) ? r[1] = i : n.isTokenPercentage(r) ? r[1] = i + "%" : n.isTokenDimension(r) && (r[1] = i + r[4].unit), t;
}
function patchCanonicalUnit(t) {
    return -1 === t ? -1 : e.isFunctionNode(t) ? t : n.isTokenDimension(t.value) ? (t.value = toCanonicalUnit(t.value), t) : t;
}
function patchCalcResult(e, n) {
    let t = e;
    return n?.toCanonicalUnits && (t = patchCanonicalUnit(t)), t = patchPrecision(t, n?.precision), t = patchMinusZero(t), n?.censorIntoStandardRepresentableValues || (t = patchNaN(t), t = patchInfinity(t)), t;
}
function tokenizeGlobals(e) {
    const t = new Map;
    if (!e) return t;
    for (const [o, r] of e)if (n.isToken(r)) t.set(o, r);
    else if ("string" != typeof r) ;
    else {
        const e = n.tokenizer({
            css: r
        }), i = e.nextToken();
        if (e.nextToken(), !e.endOfFile()) continue;
        if (!n.isTokenNumeric(i)) continue;
        t.set(o, i);
    }
    return t;
}
function calcFromComponentValues(n, t) {
    const o = tokenizeGlobals(t?.globals);
    return e.replaceComponentValues(n, (n)=>{
        if (!e.isFunctionNode(n)) return;
        const r = b.get(n.getName().toLowerCase());
        if (!r) return;
        const i = patchCalcResult(solve(r(n, o, t ?? {})), t);
        return -1 !== i ? i : void 0;
    });
}
const h = new Set(b.keys());
exports.calc = function calc(t, o) {
    return calcFromComponentValues(e.parseCommaSeparatedListOfComponentValues(n.tokenize({
        css: t
    }), {}), o).map((e)=>e.map((e)=>n.stringify(...e.tokens())).join("")).join(",");
}, exports.calcFromComponentValues = calcFromComponentValues, exports.mathFunctionNames = h;
}),
"[project]/frontend/node_modules/.pnpm/lru-cache@10.4.3/node_modules/lru-cache/dist/commonjs/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @module LRUCache
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LRUCache = void 0;
const perf = typeof performance === 'object' && performance && typeof performance.now === 'function' ? performance : Date;
const warned = new Set();
/* c8 ignore start */ const PROCESS = typeof process === 'object' && !!process ? process : {};
/* c8 ignore start */ const emitWarning = (msg, type, code, fn)=>{
    typeof PROCESS.emitWarning === 'function' ? PROCESS.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
};
let AC = globalThis.AbortController;
let AS = globalThis.AbortSignal;
/* c8 ignore start */ if (typeof AC === 'undefined') {
    //@ts-ignore
    AS = class AbortSignal {
        onabort;
        _onabort = [];
        reason;
        aborted = false;
        addEventListener(_, fn) {
            this._onabort.push(fn);
        }
    };
    //@ts-ignore
    AC = class AbortController {
        constructor(){
            warnACPolyfill();
        }
        signal = new AS();
        abort(reason) {
            if (this.signal.aborted) return;
            //@ts-ignore
            this.signal.reason = reason;
            //@ts-ignore
            this.signal.aborted = true;
            //@ts-ignore
            for (const fn of this.signal._onabort){
                fn(reason);
            }
            this.signal.onabort?.(reason);
        }
    };
    let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== '1';
    const warnACPolyfill = ()=>{
        if (!printACPolyfillWarning) return;
        printACPolyfillWarning = false;
        emitWarning('AbortController is not defined. If using lru-cache in ' + 'node 14, load an AbortController polyfill from the ' + '`node-abort-controller` package. A minimal polyfill is ' + 'provided for use by LRUCache.fetch(), but it should not be ' + 'relied upon in other contexts (eg, passing it to other APIs that ' + 'use AbortController/AbortSignal might have undesirable effects). ' + 'You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.', 'NO_ABORT_CONTROLLER', 'ENOTSUP', warnACPolyfill);
    };
}
/* c8 ignore stop */ const shouldWarn = (code)=>!warned.has(code);
const TYPE = Symbol('type');
const isPosInt = (n)=>n && n === Math.floor(n) && n > 0 && isFinite(n);
/* c8 ignore start */ // This is a little bit ridiculous, tbh.
// The maximum array length is 2^32-1 or thereabouts on most JS impls.
// And well before that point, you're caching the entire world, I mean,
// that's ~32GB of just integers for the next/prev links, plus whatever
// else to hold that many keys and values.  Just filling the memory with
// zeroes at init time is brutal when you get that big.
// But why not be complete?
// Maybe in the future, these limits will have expanded.
const getUintArray = (max)=>!isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
/* c8 ignore stop */ class ZeroArray extends Array {
    constructor(size){
        super(size);
        this.fill(0);
    }
}
class Stack {
    heap;
    length;
    // private constructor
    static #constructing = false;
    static create(max) {
        const HeapCls = getUintArray(max);
        if (!HeapCls) return [];
        Stack.#constructing = true;
        const s = new Stack(max, HeapCls);
        Stack.#constructing = false;
        return s;
    }
    constructor(max, HeapCls){
        /* c8 ignore start */ if (!Stack.#constructing) {
            throw new TypeError('instantiate Stack using Stack.create(n)');
        }
        /* c8 ignore stop */ this.heap = new HeapCls(max);
        this.length = 0;
    }
    push(n) {
        this.heap[this.length++] = n;
    }
    pop() {
        return this.heap[--this.length];
    }
}
/**
 * Default export, the thing you're using this module to get.
 *
 * The `K` and `V` types define the key and value types, respectively. The
 * optional `FC` type defines the type of the `context` object passed to
 * `cache.fetch()` and `cache.memo()`.
 *
 * Keys and values **must not** be `null` or `undefined`.
 *
 * All properties from the options object (with the exception of `max`,
 * `maxSize`, `fetchMethod`, `memoMethod`, `dispose` and `disposeAfter`) are
 * added as normal public members. (The listed options are read-only getters.)
 *
 * Changing any of these will alter the defaults for subsequent method calls.
 */ class LRUCache {
    // options that cannot be changed without disaster
    #max;
    #maxSize;
    #dispose;
    #disposeAfter;
    #fetchMethod;
    #memoMethod;
    /**
     * {@link LRUCache.OptionsBase.ttl}
     */ ttl;
    /**
     * {@link LRUCache.OptionsBase.ttlResolution}
     */ ttlResolution;
    /**
     * {@link LRUCache.OptionsBase.ttlAutopurge}
     */ ttlAutopurge;
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnGet}
     */ updateAgeOnGet;
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnHas}
     */ updateAgeOnHas;
    /**
     * {@link LRUCache.OptionsBase.allowStale}
     */ allowStale;
    /**
     * {@link LRUCache.OptionsBase.noDisposeOnSet}
     */ noDisposeOnSet;
    /**
     * {@link LRUCache.OptionsBase.noUpdateTTL}
     */ noUpdateTTL;
    /**
     * {@link LRUCache.OptionsBase.maxEntrySize}
     */ maxEntrySize;
    /**
     * {@link LRUCache.OptionsBase.sizeCalculation}
     */ sizeCalculation;
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
     */ noDeleteOnFetchRejection;
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
     */ noDeleteOnStaleGet;
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
     */ allowStaleOnFetchAbort;
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
     */ allowStaleOnFetchRejection;
    /**
     * {@link LRUCache.OptionsBase.ignoreFetchAbort}
     */ ignoreFetchAbort;
    // computed properties
    #size;
    #calculatedSize;
    #keyMap;
    #keyList;
    #valList;
    #next;
    #prev;
    #head;
    #tail;
    #free;
    #disposed;
    #sizes;
    #starts;
    #ttls;
    #hasDispose;
    #hasFetchMethod;
    #hasDisposeAfter;
    /**
     * Do not call this method unless you need to inspect the
     * inner workings of the cache.  If anything returned by this
     * object is modified in any way, strange breakage may occur.
     *
     * These fields are private for a reason!
     *
     * @internal
     */ static unsafeExposeInternals(c) {
        return {
            // properties
            starts: c.#starts,
            ttls: c.#ttls,
            sizes: c.#sizes,
            keyMap: c.#keyMap,
            keyList: c.#keyList,
            valList: c.#valList,
            next: c.#next,
            prev: c.#prev,
            get head () {
                return c.#head;
            },
            get tail () {
                return c.#tail;
            },
            free: c.#free,
            // methods
            isBackgroundFetch: (p)=>c.#isBackgroundFetch(p),
            backgroundFetch: (k, index, options, context)=>c.#backgroundFetch(k, index, options, context),
            moveToTail: (index)=>c.#moveToTail(index),
            indexes: (options)=>c.#indexes(options),
            rindexes: (options)=>c.#rindexes(options),
            isStale: (index)=>c.#isStale(index)
        };
    }
    // Protected read-only members
    /**
     * {@link LRUCache.OptionsBase.max} (read-only)
     */ get max() {
        return this.#max;
    }
    /**
     * {@link LRUCache.OptionsBase.maxSize} (read-only)
     */ get maxSize() {
        return this.#maxSize;
    }
    /**
     * The total computed size of items in the cache (read-only)
     */ get calculatedSize() {
        return this.#calculatedSize;
    }
    /**
     * The number of items stored in the cache (read-only)
     */ get size() {
        return this.#size;
    }
    /**
     * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
     */ get fetchMethod() {
        return this.#fetchMethod;
    }
    get memoMethod() {
        return this.#memoMethod;
    }
    /**
     * {@link LRUCache.OptionsBase.dispose} (read-only)
     */ get dispose() {
        return this.#dispose;
    }
    /**
     * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
     */ get disposeAfter() {
        return this.#disposeAfter;
    }
    constructor(options){
        const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
        if (max !== 0 && !isPosInt(max)) {
            throw new TypeError('max option must be a nonnegative integer');
        }
        const UintArray = max ? getUintArray(max) : Array;
        if (!UintArray) {
            throw new Error('invalid max value: ' + max);
        }
        this.#max = max;
        this.#maxSize = maxSize;
        this.maxEntrySize = maxEntrySize || this.#maxSize;
        this.sizeCalculation = sizeCalculation;
        if (this.sizeCalculation) {
            if (!this.#maxSize && !this.maxEntrySize) {
                throw new TypeError('cannot set sizeCalculation without setting maxSize or maxEntrySize');
            }
            if (typeof this.sizeCalculation !== 'function') {
                throw new TypeError('sizeCalculation set to non-function');
            }
        }
        if (memoMethod !== undefined && typeof memoMethod !== 'function') {
            throw new TypeError('memoMethod must be a function if defined');
        }
        this.#memoMethod = memoMethod;
        if (fetchMethod !== undefined && typeof fetchMethod !== 'function') {
            throw new TypeError('fetchMethod must be a function if specified');
        }
        this.#fetchMethod = fetchMethod;
        this.#hasFetchMethod = !!fetchMethod;
        this.#keyMap = new Map();
        this.#keyList = new Array(max).fill(undefined);
        this.#valList = new Array(max).fill(undefined);
        this.#next = new UintArray(max);
        this.#prev = new UintArray(max);
        this.#head = 0;
        this.#tail = 0;
        this.#free = Stack.create(max);
        this.#size = 0;
        this.#calculatedSize = 0;
        if (typeof dispose === 'function') {
            this.#dispose = dispose;
        }
        if (typeof disposeAfter === 'function') {
            this.#disposeAfter = disposeAfter;
            this.#disposed = [];
        } else {
            this.#disposeAfter = undefined;
            this.#disposed = undefined;
        }
        this.#hasDispose = !!this.#dispose;
        this.#hasDisposeAfter = !!this.#disposeAfter;
        this.noDisposeOnSet = !!noDisposeOnSet;
        this.noUpdateTTL = !!noUpdateTTL;
        this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
        this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
        this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
        this.ignoreFetchAbort = !!ignoreFetchAbort;
        // NB: maxEntrySize is set to maxSize if it's set
        if (this.maxEntrySize !== 0) {
            if (this.#maxSize !== 0) {
                if (!isPosInt(this.#maxSize)) {
                    throw new TypeError('maxSize must be a positive integer if specified');
                }
            }
            if (!isPosInt(this.maxEntrySize)) {
                throw new TypeError('maxEntrySize must be a positive integer if specified');
            }
            this.#initializeSizeTracking();
        }
        this.allowStale = !!allowStale;
        this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.updateAgeOnHas = !!updateAgeOnHas;
        this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
        this.ttlAutopurge = !!ttlAutopurge;
        this.ttl = ttl || 0;
        if (this.ttl) {
            if (!isPosInt(this.ttl)) {
                throw new TypeError('ttl must be a positive integer if specified');
            }
            this.#initializeTTLTracking();
        }
        // do not allow completely unbounded caches
        if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0) {
            throw new TypeError('At least one of max, maxSize, or ttl is required');
        }
        if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
            const code = 'LRU_CACHE_UNBOUNDED';
            if (shouldWarn(code)) {
                warned.add(code);
                const msg = 'TTL caching without ttlAutopurge, max, or maxSize can ' + 'result in unbounded memory consumption.';
                emitWarning(msg, 'UnboundedCacheWarning', code, LRUCache);
            }
        }
    }
    /**
     * Return the number of ms left in the item's TTL. If item is not in cache,
     * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
     */ getRemainingTTL(key) {
        return this.#keyMap.has(key) ? Infinity : 0;
    }
    #initializeTTLTracking() {
        const ttls = new ZeroArray(this.#max);
        const starts = new ZeroArray(this.#max);
        this.#ttls = ttls;
        this.#starts = starts;
        this.#setItemTTL = (index, ttl, start = perf.now())=>{
            starts[index] = ttl !== 0 ? start : 0;
            ttls[index] = ttl;
            if (ttl !== 0 && this.ttlAutopurge) {
                const t = setTimeout(()=>{
                    if (this.#isStale(index)) {
                        this.#delete(this.#keyList[index], 'expire');
                    }
                }, ttl + 1);
                // unref() not supported on all platforms
                /* c8 ignore start */ if (t.unref) {
                    t.unref();
                }
            /* c8 ignore stop */ }
        };
        this.#updateItemAge = (index)=>{
            starts[index] = ttls[index] !== 0 ? perf.now() : 0;
        };
        this.#statusTTL = (status, index)=>{
            if (ttls[index]) {
                const ttl = ttls[index];
                const start = starts[index];
                /* c8 ignore next */ if (!ttl || !start) return;
                status.ttl = ttl;
                status.start = start;
                status.now = cachedNow || getNow();
                const age = status.now - start;
                status.remainingTTL = ttl - age;
            }
        };
        // debounce calls to perf.now() to 1s so we're not hitting
        // that costly call repeatedly.
        let cachedNow = 0;
        const getNow = ()=>{
            const n = perf.now();
            if (this.ttlResolution > 0) {
                cachedNow = n;
                const t = setTimeout(()=>cachedNow = 0, this.ttlResolution);
                // not available on all platforms
                /* c8 ignore start */ if (t.unref) {
                    t.unref();
                }
            /* c8 ignore stop */ }
            return n;
        };
        this.getRemainingTTL = (key)=>{
            const index = this.#keyMap.get(key);
            if (index === undefined) {
                return 0;
            }
            const ttl = ttls[index];
            const start = starts[index];
            if (!ttl || !start) {
                return Infinity;
            }
            const age = (cachedNow || getNow()) - start;
            return ttl - age;
        };
        this.#isStale = (index)=>{
            const s = starts[index];
            const t = ttls[index];
            return !!t && !!s && (cachedNow || getNow()) - s > t;
        };
    }
    // conditionally set private methods related to TTL
    #updateItemAge = ()=>{};
    #statusTTL = ()=>{};
    #setItemTTL = ()=>{};
    /* c8 ignore stop */ #isStale = ()=>false;
    #initializeSizeTracking() {
        const sizes = new ZeroArray(this.#max);
        this.#calculatedSize = 0;
        this.#sizes = sizes;
        this.#removeItemSize = (index)=>{
            this.#calculatedSize -= sizes[index];
            sizes[index] = 0;
        };
        this.#requireSize = (k, v, size, sizeCalculation)=>{
            // provisionally accept background fetches.
            // actual value size will be checked when they return.
            if (this.#isBackgroundFetch(v)) {
                return 0;
            }
            if (!isPosInt(size)) {
                if (sizeCalculation) {
                    if (typeof sizeCalculation !== 'function') {
                        throw new TypeError('sizeCalculation must be a function');
                    }
                    size = sizeCalculation(v, k);
                    if (!isPosInt(size)) {
                        throw new TypeError('sizeCalculation return invalid (expect positive integer)');
                    }
                } else {
                    throw new TypeError('invalid size value (must be positive integer). ' + 'When maxSize or maxEntrySize is used, sizeCalculation ' + 'or size must be set.');
                }
            }
            return size;
        };
        this.#addItemSize = (index, size, status)=>{
            sizes[index] = size;
            if (this.#maxSize) {
                const maxSize = this.#maxSize - sizes[index];
                while(this.#calculatedSize > maxSize){
                    this.#evict(true);
                }
            }
            this.#calculatedSize += sizes[index];
            if (status) {
                status.entrySize = size;
                status.totalCalculatedSize = this.#calculatedSize;
            }
        };
    }
    #removeItemSize = (_i)=>{};
    #addItemSize = (_i, _s, _st)=>{};
    #requireSize = (_k, _v, size, sizeCalculation)=>{
        if (size || sizeCalculation) {
            throw new TypeError('cannot set size without setting maxSize or maxEntrySize on cache');
        }
        return 0;
    };
    *#indexes({ allowStale = this.allowStale } = {}) {
        if (this.#size) {
            for(let i = this.#tail; true;){
                if (!this.#isValidIndex(i)) {
                    break;
                }
                if (allowStale || !this.#isStale(i)) {
                    yield i;
                }
                if (i === this.#head) {
                    break;
                } else {
                    i = this.#prev[i];
                }
            }
        }
    }
    *#rindexes({ allowStale = this.allowStale } = {}) {
        if (this.#size) {
            for(let i = this.#head; true;){
                if (!this.#isValidIndex(i)) {
                    break;
                }
                if (allowStale || !this.#isStale(i)) {
                    yield i;
                }
                if (i === this.#tail) {
                    break;
                } else {
                    i = this.#next[i];
                }
            }
        }
    }
    #isValidIndex(index) {
        return index !== undefined && this.#keyMap.get(this.#keyList[index]) === index;
    }
    /**
     * Return a generator yielding `[key, value]` pairs,
     * in order from most recently used to least recently used.
     */ *entries() {
        for (const i of this.#indexes()){
            if (this.#valList[i] !== undefined && this.#keyList[i] !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield [
                    this.#keyList[i],
                    this.#valList[i]
                ];
            }
        }
    }
    /**
     * Inverse order version of {@link LRUCache.entries}
     *
     * Return a generator yielding `[key, value]` pairs,
     * in order from least recently used to most recently used.
     */ *rentries() {
        for (const i of this.#rindexes()){
            if (this.#valList[i] !== undefined && this.#keyList[i] !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield [
                    this.#keyList[i],
                    this.#valList[i]
                ];
            }
        }
    }
    /**
     * Return a generator yielding the keys in the cache,
     * in order from most recently used to least recently used.
     */ *keys() {
        for (const i of this.#indexes()){
            const k = this.#keyList[i];
            if (k !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield k;
            }
        }
    }
    /**
     * Inverse order version of {@link LRUCache.keys}
     *
     * Return a generator yielding the keys in the cache,
     * in order from least recently used to most recently used.
     */ *rkeys() {
        for (const i of this.#rindexes()){
            const k = this.#keyList[i];
            if (k !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield k;
            }
        }
    }
    /**
     * Return a generator yielding the values in the cache,
     * in order from most recently used to least recently used.
     */ *values() {
        for (const i of this.#indexes()){
            const v = this.#valList[i];
            if (v !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield this.#valList[i];
            }
        }
    }
    /**
     * Inverse order version of {@link LRUCache.values}
     *
     * Return a generator yielding the values in the cache,
     * in order from least recently used to most recently used.
     */ *rvalues() {
        for (const i of this.#rindexes()){
            const v = this.#valList[i];
            if (v !== undefined && !this.#isBackgroundFetch(this.#valList[i])) {
                yield this.#valList[i];
            }
        }
    }
    /**
     * Iterating over the cache itself yields the same results as
     * {@link LRUCache.entries}
     */ [Symbol.iterator]() {
        return this.entries();
    }
    /**
     * A String value that is used in the creation of the default string
     * description of an object. Called by the built-in method
     * `Object.prototype.toString`.
     */ [Symbol.toStringTag] = 'LRUCache';
    /**
     * Find a value for which the supplied fn method returns a truthy value,
     * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
     */ find(fn, getOptions = {}) {
        for (const i of this.#indexes()){
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === undefined) continue;
            if (fn(value, this.#keyList[i], this)) {
                return this.get(this.#keyList[i], getOptions);
            }
        }
    }
    /**
     * Call the supplied function on each item in the cache, in order from most
     * recently used to least recently used.
     *
     * `fn` is called as `fn(value, key, cache)`.
     *
     * If `thisp` is provided, function will be called in the `this`-context of
     * the provided object, or the cache if no `thisp` object is provided.
     *
     * Does not update age or recenty of use, or iterate over stale values.
     */ forEach(fn, thisp = this) {
        for (const i of this.#indexes()){
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === undefined) continue;
            fn.call(thisp, value, this.#keyList[i], this);
        }
    }
    /**
     * The same as {@link LRUCache.forEach} but items are iterated over in
     * reverse order.  (ie, less recently used items are iterated over first.)
     */ rforEach(fn, thisp = this) {
        for (const i of this.#rindexes()){
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === undefined) continue;
            fn.call(thisp, value, this.#keyList[i], this);
        }
    }
    /**
     * Delete any stale entries. Returns true if anything was removed,
     * false otherwise.
     */ purgeStale() {
        let deleted = false;
        for (const i of this.#rindexes({
            allowStale: true
        })){
            if (this.#isStale(i)) {
                this.#delete(this.#keyList[i], 'expire');
                deleted = true;
            }
        }
        return deleted;
    }
    /**
     * Get the extended info about a given entry, to get its value, size, and
     * TTL info simultaneously. Returns `undefined` if the key is not present.
     *
     * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
     * serialization, the `start` value is always the current timestamp, and the
     * `ttl` is a calculated remaining time to live (negative if expired).
     *
     * Always returns stale values, if their info is found in the cache, so be
     * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
     * if relevant.
     */ info(key) {
        const i = this.#keyMap.get(key);
        if (i === undefined) return undefined;
        const v = this.#valList[i];
        const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
        if (value === undefined) return undefined;
        const entry = {
            value
        };
        if (this.#ttls && this.#starts) {
            const ttl = this.#ttls[i];
            const start = this.#starts[i];
            if (ttl && start) {
                const remain = ttl - (perf.now() - start);
                entry.ttl = remain;
                entry.start = Date.now();
            }
        }
        if (this.#sizes) {
            entry.size = this.#sizes[i];
        }
        return entry;
    }
    /**
     * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
     * passed to {@link LRLUCache#load}.
     *
     * The `start` fields are calculated relative to a portable `Date.now()`
     * timestamp, even if `performance.now()` is available.
     *
     * Stale entries are always included in the `dump`, even if
     * {@link LRUCache.OptionsBase.allowStale} is false.
     *
     * Note: this returns an actual array, not a generator, so it can be more
     * easily passed around.
     */ dump() {
        const arr = [];
        for (const i of this.#indexes({
            allowStale: true
        })){
            const key = this.#keyList[i];
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
            if (value === undefined || key === undefined) continue;
            const entry = {
                value
            };
            if (this.#ttls && this.#starts) {
                entry.ttl = this.#ttls[i];
                // always dump the start relative to a portable timestamp
                // it's ok for this to be a bit slow, it's a rare operation.
                const age = perf.now() - this.#starts[i];
                entry.start = Math.floor(Date.now() - age);
            }
            if (this.#sizes) {
                entry.size = this.#sizes[i];
            }
            arr.unshift([
                key,
                entry
            ]);
        }
        return arr;
    }
    /**
     * Reset the cache and load in the items in entries in the order listed.
     *
     * The shape of the resulting cache may be different if the same options are
     * not used in both caches.
     *
     * The `start` fields are assumed to be calculated relative to a portable
     * `Date.now()` timestamp, even if `performance.now()` is available.
     */ load(arr) {
        this.clear();
        for (const [key, entry] of arr){
            if (entry.start) {
                // entry.start is a portable timestamp, but we may be using
                // node's performance.now(), so calculate the offset, so that
                // we get the intended remaining TTL, no matter how long it's
                // been on ice.
                //
                // it's ok for this to be a bit slow, it's a rare operation.
                const age = Date.now() - entry.start;
                entry.start = perf.now() - age;
            }
            this.set(key, entry.value, entry);
        }
    }
    /**
     * Add a value to the cache.
     *
     * Note: if `undefined` is specified as a value, this is an alias for
     * {@link LRUCache#delete}
     *
     * Fields on the {@link LRUCache.SetOptions} options param will override
     * their corresponding values in the constructor options for the scope
     * of this single `set()` operation.
     *
     * If `start` is provided, then that will set the effective start
     * time for the TTL calculation. Note that this must be a previous
     * value of `performance.now()` if supported, or a previous value of
     * `Date.now()` if not.
     *
     * Options object may also include `size`, which will prevent
     * calling the `sizeCalculation` function and just use the specified
     * number if it is a positive integer, and `noDisposeOnSet` which
     * will prevent calling a `dispose` function in the case of
     * overwrites.
     *
     * If the `size` (or return value of `sizeCalculation`) for a given
     * entry is greater than `maxEntrySize`, then the item will not be
     * added to the cache.
     *
     * Will update the recency of the entry.
     *
     * If the value is `undefined`, then this is an alias for
     * `cache.delete(key)`. `undefined` is never stored in the cache.
     */ set(k, v, setOptions = {}) {
        if (v === undefined) {
            this.delete(k);
            return this;
        }
        const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
        let { noUpdateTTL = this.noUpdateTTL } = setOptions;
        const size = this.#requireSize(k, v, setOptions.size || 0, sizeCalculation);
        // if the item doesn't fit, don't do anything
        // NB: maxEntrySize set to maxSize by default
        if (this.maxEntrySize && size > this.maxEntrySize) {
            if (status) {
                status.set = 'miss';
                status.maxEntrySizeExceeded = true;
            }
            // have to delete, in case something is there already.
            this.#delete(k, 'set');
            return this;
        }
        let index = this.#size === 0 ? undefined : this.#keyMap.get(k);
        if (index === undefined) {
            // addition
            index = this.#size === 0 ? this.#tail : this.#free.length !== 0 ? this.#free.pop() : this.#size === this.#max ? this.#evict(false) : this.#size;
            this.#keyList[index] = k;
            this.#valList[index] = v;
            this.#keyMap.set(k, index);
            this.#next[this.#tail] = index;
            this.#prev[index] = this.#tail;
            this.#tail = index;
            this.#size++;
            this.#addItemSize(index, size, status);
            if (status) status.set = 'add';
            noUpdateTTL = false;
        } else {
            // update
            this.#moveToTail(index);
            const oldVal = this.#valList[index];
            if (v !== oldVal) {
                if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
                    oldVal.__abortController.abort(new Error('replaced'));
                    const { __staleWhileFetching: s } = oldVal;
                    if (s !== undefined && !noDisposeOnSet) {
                        if (this.#hasDispose) {
                            this.#dispose?.(s, k, 'set');
                        }
                        if (this.#hasDisposeAfter) {
                            this.#disposed?.push([
                                s,
                                k,
                                'set'
                            ]);
                        }
                    }
                } else if (!noDisposeOnSet) {
                    if (this.#hasDispose) {
                        this.#dispose?.(oldVal, k, 'set');
                    }
                    if (this.#hasDisposeAfter) {
                        this.#disposed?.push([
                            oldVal,
                            k,
                            'set'
                        ]);
                    }
                }
                this.#removeItemSize(index);
                this.#addItemSize(index, size, status);
                this.#valList[index] = v;
                if (status) {
                    status.set = 'replace';
                    const oldValue = oldVal && this.#isBackgroundFetch(oldVal) ? oldVal.__staleWhileFetching : oldVal;
                    if (oldValue !== undefined) status.oldValue = oldValue;
                }
            } else if (status) {
                status.set = 'update';
            }
        }
        if (ttl !== 0 && !this.#ttls) {
            this.#initializeTTLTracking();
        }
        if (this.#ttls) {
            if (!noUpdateTTL) {
                this.#setItemTTL(index, ttl, start);
            }
            if (status) this.#statusTTL(status, index);
        }
        if (!noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
            const dt = this.#disposed;
            let task;
            while(task = dt?.shift()){
                this.#disposeAfter?.(...task);
            }
        }
        return this;
    }
    /**
     * Evict the least recently used item, returning its value or
     * `undefined` if cache is empty.
     */ pop() {
        try {
            while(this.#size){
                const val = this.#valList[this.#head];
                this.#evict(true);
                if (this.#isBackgroundFetch(val)) {
                    if (val.__staleWhileFetching) {
                        return val.__staleWhileFetching;
                    }
                } else if (val !== undefined) {
                    return val;
                }
            }
        } finally{
            if (this.#hasDisposeAfter && this.#disposed) {
                const dt = this.#disposed;
                let task;
                while(task = dt?.shift()){
                    this.#disposeAfter?.(...task);
                }
            }
        }
    }
    #evict(free) {
        const head = this.#head;
        const k = this.#keyList[head];
        const v = this.#valList[head];
        if (this.#hasFetchMethod && this.#isBackgroundFetch(v)) {
            v.__abortController.abort(new Error('evicted'));
        } else if (this.#hasDispose || this.#hasDisposeAfter) {
            if (this.#hasDispose) {
                this.#dispose?.(v, k, 'evict');
            }
            if (this.#hasDisposeAfter) {
                this.#disposed?.push([
                    v,
                    k,
                    'evict'
                ]);
            }
        }
        this.#removeItemSize(head);
        // if we aren't about to use the index, then null these out
        if (free) {
            this.#keyList[head] = undefined;
            this.#valList[head] = undefined;
            this.#free.push(head);
        }
        if (this.#size === 1) {
            this.#head = this.#tail = 0;
            this.#free.length = 0;
        } else {
            this.#head = this.#next[head];
        }
        this.#keyMap.delete(k);
        this.#size--;
        return head;
    }
    /**
     * Check if a key is in the cache, without updating the recency of use.
     * Will return false if the item is stale, even though it is technically
     * in the cache.
     *
     * Check if a key is in the cache, without updating the recency of
     * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
     * to `true` in either the options or the constructor.
     *
     * Will return `false` if the item is stale, even though it is technically in
     * the cache. The difference can be determined (if it matters) by using a
     * `status` argument, and inspecting the `has` field.
     *
     * Will not update item age unless
     * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
     */ has(k, hasOptions = {}) {
        const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
        const index = this.#keyMap.get(k);
        if (index !== undefined) {
            const v = this.#valList[index];
            if (this.#isBackgroundFetch(v) && v.__staleWhileFetching === undefined) {
                return false;
            }
            if (!this.#isStale(index)) {
                if (updateAgeOnHas) {
                    this.#updateItemAge(index);
                }
                if (status) {
                    status.has = 'hit';
                    this.#statusTTL(status, index);
                }
                return true;
            } else if (status) {
                status.has = 'stale';
                this.#statusTTL(status, index);
            }
        } else if (status) {
            status.has = 'miss';
        }
        return false;
    }
    /**
     * Like {@link LRUCache#get} but doesn't update recency or delete stale
     * items.
     *
     * Returns `undefined` if the item is stale, unless
     * {@link LRUCache.OptionsBase.allowStale} is set.
     */ peek(k, peekOptions = {}) {
        const { allowStale = this.allowStale } = peekOptions;
        const index = this.#keyMap.get(k);
        if (index === undefined || !allowStale && this.#isStale(index)) {
            return;
        }
        const v = this.#valList[index];
        // either stale and allowed, or forcing a refresh of non-stale value
        return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
    }
    #backgroundFetch(k, index, options, context) {
        const v = index === undefined ? undefined : this.#valList[index];
        if (this.#isBackgroundFetch(v)) {
            return v;
        }
        const ac = new AC();
        const { signal } = options;
        // when/if our AC signals, then stop listening to theirs.
        signal?.addEventListener('abort', ()=>ac.abort(signal.reason), {
            signal: ac.signal
        });
        const fetchOpts = {
            signal: ac.signal,
            options,
            context
        };
        const cb = (v, updateCache = false)=>{
            const { aborted } = ac.signal;
            const ignoreAbort = options.ignoreFetchAbort && v !== undefined;
            if (options.status) {
                if (aborted && !updateCache) {
                    options.status.fetchAborted = true;
                    options.status.fetchError = ac.signal.reason;
                    if (ignoreAbort) options.status.fetchAbortIgnored = true;
                } else {
                    options.status.fetchResolved = true;
                }
            }
            if (aborted && !ignoreAbort && !updateCache) {
                return fetchFail(ac.signal.reason);
            }
            // either we didn't abort, and are still here, or we did, and ignored
            const bf = p;
            if (this.#valList[index] === p) {
                if (v === undefined) {
                    if (bf.__staleWhileFetching) {
                        this.#valList[index] = bf.__staleWhileFetching;
                    } else {
                        this.#delete(k, 'fetch');
                    }
                } else {
                    if (options.status) options.status.fetchUpdated = true;
                    this.set(k, v, fetchOpts.options);
                }
            }
            return v;
        };
        const eb = (er)=>{
            if (options.status) {
                options.status.fetchRejected = true;
                options.status.fetchError = er;
            }
            return fetchFail(er);
        };
        const fetchFail = (er)=>{
            const { aborted } = ac.signal;
            const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
            const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
            const noDelete = allowStale || options.noDeleteOnFetchRejection;
            const bf = p;
            if (this.#valList[index] === p) {
                // if we allow stale on fetch rejections, then we need to ensure that
                // the stale value is not removed from the cache when the fetch fails.
                const del = !noDelete || bf.__staleWhileFetching === undefined;
                if (del) {
                    this.#delete(k, 'fetch');
                } else if (!allowStaleAborted) {
                    // still replace the *promise* with the stale value,
                    // since we are done with the promise at this point.
                    // leave it untouched if we're still waiting for an
                    // aborted background fetch that hasn't yet returned.
                    this.#valList[index] = bf.__staleWhileFetching;
                }
            }
            if (allowStale) {
                if (options.status && bf.__staleWhileFetching !== undefined) {
                    options.status.returnedStale = true;
                }
                return bf.__staleWhileFetching;
            } else if (bf.__returned === bf) {
                throw er;
            }
        };
        const pcall = (res, rej)=>{
            const fmp = this.#fetchMethod?.(k, v, fetchOpts);
            if (fmp && fmp instanceof Promise) {
                fmp.then((v)=>res(v === undefined ? undefined : v), rej);
            }
            // ignored, we go until we finish, regardless.
            // defer check until we are actually aborting,
            // so fetchMethod can override.
            ac.signal.addEventListener('abort', ()=>{
                if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
                    res(undefined);
                    // when it eventually resolves, update the cache.
                    if (options.allowStaleOnFetchAbort) {
                        res = (v)=>cb(v, true);
                    }
                }
            });
        };
        if (options.status) options.status.fetchDispatched = true;
        const p = new Promise(pcall).then(cb, eb);
        const bf = Object.assign(p, {
            __abortController: ac,
            __staleWhileFetching: v,
            __returned: undefined
        });
        if (index === undefined) {
            // internal, don't expose status.
            this.set(k, bf, {
                ...fetchOpts.options,
                status: undefined
            });
            index = this.#keyMap.get(k);
        } else {
            this.#valList[index] = bf;
        }
        return bf;
    }
    #isBackgroundFetch(p) {
        if (!this.#hasFetchMethod) return false;
        const b = p;
        return !!b && b instanceof Promise && b.hasOwnProperty('__staleWhileFetching') && b.__abortController instanceof AC;
    }
    async fetch(k, fetchOptions = {}) {
        const { // get options
        allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, // set options
        ttl = this.ttl, noDisposeOnSet = this.noDisposeOnSet, size = 0, sizeCalculation = this.sizeCalculation, noUpdateTTL = this.noUpdateTTL, // fetch exclusive options
        noDeleteOnFetchRejection = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection = this.allowStaleOnFetchRejection, ignoreFetchAbort = this.ignoreFetchAbort, allowStaleOnFetchAbort = this.allowStaleOnFetchAbort, context, forceRefresh = false, status, signal } = fetchOptions;
        if (!this.#hasFetchMethod) {
            if (status) status.fetch = 'get';
            return this.get(k, {
                allowStale,
                updateAgeOnGet,
                noDeleteOnStaleGet,
                status
            });
        }
        const options = {
            allowStale,
            updateAgeOnGet,
            noDeleteOnStaleGet,
            ttl,
            noDisposeOnSet,
            size,
            sizeCalculation,
            noUpdateTTL,
            noDeleteOnFetchRejection,
            allowStaleOnFetchRejection,
            allowStaleOnFetchAbort,
            ignoreFetchAbort,
            status,
            signal
        };
        let index = this.#keyMap.get(k);
        if (index === undefined) {
            if (status) status.fetch = 'miss';
            const p = this.#backgroundFetch(k, index, options, context);
            return p.__returned = p;
        } else {
            // in cache, maybe already fetching
            const v = this.#valList[index];
            if (this.#isBackgroundFetch(v)) {
                const stale = allowStale && v.__staleWhileFetching !== undefined;
                if (status) {
                    status.fetch = 'inflight';
                    if (stale) status.returnedStale = true;
                }
                return stale ? v.__staleWhileFetching : v.__returned = v;
            }
            // if we force a refresh, that means do NOT serve the cached value,
            // unless we are already in the process of refreshing the cache.
            const isStale = this.#isStale(index);
            if (!forceRefresh && !isStale) {
                if (status) status.fetch = 'hit';
                this.#moveToTail(index);
                if (updateAgeOnGet) {
                    this.#updateItemAge(index);
                }
                if (status) this.#statusTTL(status, index);
                return v;
            }
            // ok, it is stale or a forced refresh, and not already fetching.
            // refresh the cache.
            const p = this.#backgroundFetch(k, index, options, context);
            const hasStale = p.__staleWhileFetching !== undefined;
            const staleVal = hasStale && allowStale;
            if (status) {
                status.fetch = isStale ? 'stale' : 'refresh';
                if (staleVal && isStale) status.returnedStale = true;
            }
            return staleVal ? p.__staleWhileFetching : p.__returned = p;
        }
    }
    async forceFetch(k, fetchOptions = {}) {
        const v = await this.fetch(k, fetchOptions);
        if (v === undefined) throw new Error('fetch() returned undefined');
        return v;
    }
    memo(k, memoOptions = {}) {
        const memoMethod = this.#memoMethod;
        if (!memoMethod) {
            throw new Error('no memoMethod provided to constructor');
        }
        const { context, forceRefresh, ...options } = memoOptions;
        const v = this.get(k, options);
        if (!forceRefresh && v !== undefined) return v;
        const vv = memoMethod(k, v, {
            options,
            context
        });
        this.set(k, vv, options);
        return vv;
    }
    /**
     * Return a value from the cache. Will update the recency of the cache
     * entry found.
     *
     * If the key is not found, get() will return `undefined`.
     */ get(k, getOptions = {}) {
        const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
        const index = this.#keyMap.get(k);
        if (index !== undefined) {
            const value = this.#valList[index];
            const fetching = this.#isBackgroundFetch(value);
            if (status) this.#statusTTL(status, index);
            if (this.#isStale(index)) {
                if (status) status.get = 'stale';
                // delete only if not an in-flight background fetch
                if (!fetching) {
                    if (!noDeleteOnStaleGet) {
                        this.#delete(k, 'expire');
                    }
                    if (status && allowStale) status.returnedStale = true;
                    return allowStale ? value : undefined;
                } else {
                    if (status && allowStale && value.__staleWhileFetching !== undefined) {
                        status.returnedStale = true;
                    }
                    return allowStale ? value.__staleWhileFetching : undefined;
                }
            } else {
                if (status) status.get = 'hit';
                // if we're currently fetching it, we don't actually have it yet
                // it's not stale, which means this isn't a staleWhileRefetching.
                // If it's not stale, and fetching, AND has a __staleWhileFetching
                // value, then that means the user fetched with {forceRefresh:true},
                // so it's safe to return that value.
                if (fetching) {
                    return value.__staleWhileFetching;
                }
                this.#moveToTail(index);
                if (updateAgeOnGet) {
                    this.#updateItemAge(index);
                }
                return value;
            }
        } else if (status) {
            status.get = 'miss';
        }
    }
    #connect(p, n) {
        this.#prev[n] = p;
        this.#next[p] = n;
    }
    #moveToTail(index) {
        // if tail already, nothing to do
        // if head, move head to next[index]
        // else
        //   move next[prev[index]] to next[index] (head has no prev)
        //   move prev[next[index]] to prev[index]
        // prev[index] = tail
        // next[tail] = index
        // tail = index
        if (index !== this.#tail) {
            if (index === this.#head) {
                this.#head = this.#next[index];
            } else {
                this.#connect(this.#prev[index], this.#next[index]);
            }
            this.#connect(this.#tail, index);
            this.#tail = index;
        }
    }
    /**
     * Deletes a key out of the cache.
     *
     * Returns true if the key was deleted, false otherwise.
     */ delete(k) {
        return this.#delete(k, 'delete');
    }
    #delete(k, reason) {
        let deleted = false;
        if (this.#size !== 0) {
            const index = this.#keyMap.get(k);
            if (index !== undefined) {
                deleted = true;
                if (this.#size === 1) {
                    this.#clear(reason);
                } else {
                    this.#removeItemSize(index);
                    const v = this.#valList[index];
                    if (this.#isBackgroundFetch(v)) {
                        v.__abortController.abort(new Error('deleted'));
                    } else if (this.#hasDispose || this.#hasDisposeAfter) {
                        if (this.#hasDispose) {
                            this.#dispose?.(v, k, reason);
                        }
                        if (this.#hasDisposeAfter) {
                            this.#disposed?.push([
                                v,
                                k,
                                reason
                            ]);
                        }
                    }
                    this.#keyMap.delete(k);
                    this.#keyList[index] = undefined;
                    this.#valList[index] = undefined;
                    if (index === this.#tail) {
                        this.#tail = this.#prev[index];
                    } else if (index === this.#head) {
                        this.#head = this.#next[index];
                    } else {
                        const pi = this.#prev[index];
                        this.#next[pi] = this.#next[index];
                        const ni = this.#next[index];
                        this.#prev[ni] = this.#prev[index];
                    }
                    this.#size--;
                    this.#free.push(index);
                }
            }
        }
        if (this.#hasDisposeAfter && this.#disposed?.length) {
            const dt = this.#disposed;
            let task;
            while(task = dt?.shift()){
                this.#disposeAfter?.(...task);
            }
        }
        return deleted;
    }
    /**
     * Clear the cache entirely, throwing away all values.
     */ clear() {
        return this.#clear('delete');
    }
    #clear(reason) {
        for (const index of this.#rindexes({
            allowStale: true
        })){
            const v = this.#valList[index];
            if (this.#isBackgroundFetch(v)) {
                v.__abortController.abort(new Error('deleted'));
            } else {
                const k = this.#keyList[index];
                if (this.#hasDispose) {
                    this.#dispose?.(v, k, reason);
                }
                if (this.#hasDisposeAfter) {
                    this.#disposed?.push([
                        v,
                        k,
                        reason
                    ]);
                }
            }
        }
        this.#keyMap.clear();
        this.#valList.fill(undefined);
        this.#keyList.fill(undefined);
        if (this.#ttls && this.#starts) {
            this.#ttls.fill(0);
            this.#starts.fill(0);
        }
        if (this.#sizes) {
            this.#sizes.fill(0);
        }
        this.#head = 0;
        this.#tail = 0;
        this.#free.length = 0;
        this.#calculatedSize = 0;
        this.#size = 0;
        if (this.#hasDisposeAfter && this.#disposed) {
            const dt = this.#disposed;
            let task;
            while(task = dt?.shift()){
                this.#disposeAfter?.(...task);
            }
        }
    }
}
exports.LRUCache = LRUCache; //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/.pnpm/@csstools+color-helpers@5.1.0/node_modules/@csstools/color-helpers/dist/index.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function multiplyMatrices(t, _) {
    return [
        t[0] * _[0] + t[1] * _[1] + t[2] * _[2],
        t[3] * _[0] + t[4] * _[1] + t[5] * _[2],
        t[6] * _[0] + t[7] * _[1] + t[8] * _[2]
    ];
}
const t = [
    .955473421488075,
    -.02309845494876471,
    .06325924320057072,
    -.0283697093338637,
    1.0099953980813041,
    .021041441191917323,
    .012314014864481998,
    -.020507649298898964,
    1.330365926242124
];
/**
 * Bradford chromatic adaptation from D50 to D65
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ function D50_to_D65(_) {
    return multiplyMatrices(t, _);
}
const _ = [
    1.0479297925449969,
    .022946870601609652,
    -.05019226628920524,
    .02962780877005599,
    .9904344267538799,
    -.017073799063418826,
    -.009243040646204504,
    .015055191490298152,
    .7518742814281371
];
/**
 * Bradford chromatic adaptation from D65 to D50
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html
 */ function D65_to_D50(t) {
    return multiplyMatrices(_, t);
}
/**
 * @param {number} hue - Hue as degrees 0..360
 * @param {number} sat - Saturation as percentage 0..100
 * @param {number} light - Lightness as percentage 0..100
 * @return {number[]} Array of sRGB components; in-gamut colors in range [0..1]
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/hslToRgb.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/hslToRgb.js
 */ function HSL_to_sRGB(t) {
    let _ = t[0] % 360;
    const n = t[1] / 100, o = t[2] / 100;
    return _ < 0 && (_ += 360), [
        HSL_to_sRGB_channel(0, _, n, o),
        HSL_to_sRGB_channel(8, _, n, o),
        HSL_to_sRGB_channel(4, _, n, o)
    ];
}
function HSL_to_sRGB_channel(t, _, n, o) {
    const e = (t + _ / 30) % 12;
    return o - n * Math.min(o, 1 - o) * Math.max(-1, Math.min(e - 3, 9 - e, 1));
}
/**
 * @param {number} hue -  Hue as degrees 0..360
 * @param {number} white -  Whiteness as percentage 0..100
 * @param {number} black -  Blackness as percentage 0..100
 * @return {number[]} Array of RGB components 0..1
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/hwbToRgb.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/hwbToRgb.js
 */ function HWB_to_sRGB(t) {
    const _ = t[0], n = t[1] / 100, o = t[2] / 100;
    if (n + o >= 1) {
        const t = n / (n + o);
        return [
            t,
            t,
            t
        ];
    }
    const e = HSL_to_sRGB([
        _,
        100,
        50
    ]), r = 1 - n - o;
    return [
        e[0] * r + n,
        e[1] * r + n,
        e[2] * r + n
    ];
}
/**
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ function LCH_to_Lab(t) {
    const _ = t[2] * Math.PI / 180;
    return [
        t[0],
        t[1] * Math.cos(_),
        t[1] * Math.sin(_)
    ];
}
/**
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ function Lab_to_LCH(t) {
    const _ = 180 * Math.atan2(t[2], t[1]) / Math.PI;
    return [
        t[0],
        Math.sqrt(Math.pow(t[1], 2) + Math.pow(t[2], 2)),
        _ >= 0 ? _ : _ + 360
    ];
}
const n = [
    .3457 / .3585,
    1,
    .2958 / .3585
];
/**
 * Convert Lab to D50-adapted XYZ
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */ function Lab_to_XYZ(t) {
    const _ = 24389 / 27, o = 216 / 24389, e = (t[0] + 16) / 116, r = t[1] / 500 + e, a = e - t[2] / 200;
    return [
        (Math.pow(r, 3) > o ? Math.pow(r, 3) : (116 * r - 16) / _) * n[0],
        (t[0] > 8 ? Math.pow((t[0] + 16) / 116, 3) : t[0] / _) * n[1],
        (Math.pow(a, 3) > o ? Math.pow(a, 3) : (116 * a - 16) / _) * n[2]
    ];
}
/**
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js
 */ function OKLCH_to_OKLab(t) {
    const _ = t[2] * Math.PI / 180;
    return [
        t[0],
        t[1] * Math.cos(_),
        t[1] * Math.sin(_)
    ];
}
/**
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js
 */ function OKLab_to_OKLCH(t) {
    const _ = 180 * Math.atan2(t[2], t[1]) / Math.PI;
    return [
        t[0],
        Math.sqrt(t[1] ** 2 + t[2] ** 2),
        _ >= 0 ? _ : _ + 360
    ];
}
const o = [
    1.2268798758459243,
    -.5578149944602171,
    .2813910456659647,
    -.0405757452148008,
    1.112286803280317,
    -.0717110580655164,
    -.0763729366746601,
    -.4214933324022432,
    1.5869240198367816
], e = [
    1,
    .3963377773761749,
    .2158037573099136,
    1,
    -.1055613458156586,
    -.0638541728258133,
    1,
    -.0894841775298119,
    -1.2914855480194092
];
/**
 * Given OKLab, convert to XYZ relative to D65
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js
 */ function OKLab_to_XYZ(t) {
    const _ = multiplyMatrices(e, t);
    return multiplyMatrices(o, [
        _[0] ** 3,
        _[1] ** 3,
        _[2] ** 3
    ]);
}
/**
 * Assuming XYZ is relative to D50, convert to CIE Lab
 * from CIE standard, which now defines these as a rational fraction
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ function XYZ_to_Lab(t) {
    const _ = compute_f(t[0] / n[0]), o = compute_f(t[1] / n[1]);
    return [
        116 * o - 16,
        500 * (_ - o),
        200 * (o - compute_f(t[2] / n[2]))
    ];
}
const r = 216 / 24389, a = 24389 / 27;
function compute_f(t) {
    return t > r ? Math.cbrt(t) : (a * t + 16) / 116;
}
const i = [
    .819022437996703,
    .3619062600528904,
    -.1288737815209879,
    .0329836539323885,
    .9292868615863434,
    .0361446663506424,
    .0481771893596242,
    .2642395317527308,
    .6335478284694309
], l = [
    .210454268309314,
    .7936177747023054,
    -.0040720430116193,
    1.9779985324311684,
    -2.42859224204858,
    .450593709617411,
    .0259040424655478,
    .7827717124575296,
    -.8086757549230774
];
/**
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 *
 * XYZ <-> LMS matrices recalculated for consistent reference white
 * @see https://github.com/w3c/csswg-drafts/issues/6642#issuecomment-943521484
 */ function XYZ_to_OKLab(t) {
    const _ = multiplyMatrices(i, t);
    return multiplyMatrices(l, [
        Math.cbrt(_[0]),
        Math.cbrt(_[1]),
        Math.cbrt(_[2])
    ]);
}
const s = [
    30757411 / 17917100,
    -6372589 / 17917100,
    -4539589 / 17917100,
    -.666684351832489,
    1.616481236634939,
    467509 / 29648200,
    792561 / 44930125,
    -1921689 / 44930125,
    .942103121235474
];
/**
 * Convert XYZ to linear-light rec2020
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ const c = [
    446124 / 178915,
    -333277 / 357830,
    -72051 / 178915,
    -14852 / 17905,
    63121 / 35810,
    423 / 17905,
    11844 / 330415,
    -50337 / 660830,
    316169 / 330415
];
/**
 * Convert XYZ to linear-light P3
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ function XYZ_to_lin_P3(t) {
    return multiplyMatrices(c, t);
}
const u = [
    1.3457868816471583,
    -.25557208737979464,
    -.05110186497554526,
    -.5446307051249019,
    1.5082477428451468,
    .02052744743642139,
    0,
    0,
    1.2119675456389452
];
/**
 * Convert D50 XYZ to linear-light prophoto-rgb
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */ const h = [
    1829569 / 896150,
    -506331 / 896150,
    -308931 / 896150,
    -851781 / 878810,
    1648619 / 878810,
    36519 / 878810,
    16779 / 1248040,
    -147721 / 1248040,
    1266979 / 1248040
];
/**
 * Convert XYZ to linear-light a98-rgb
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ const m = [
    12831 / 3959,
    -329 / 214,
    -1974 / 3959,
    -851781 / 878810,
    1648619 / 878810,
    36519 / 878810,
    705 / 12673,
    -2585 / 12673,
    705 / 667
];
/**
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ function XYZ_to_lin_sRGB(t) {
    return multiplyMatrices(m, t);
}
/**
 * Convert an array of linear-light rec2020 RGB  in the range 0.0-1.0
 * to gamma corrected form ITU-R BT.2020-2 p.4
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ const p = 1.09929682680944, D = .018053968510807;
function gam_2020_channel(t) {
    const _ = t < 0 ? -1 : 1, n = Math.abs(t);
    return n > D ? _ * (p * Math.pow(n, .45) - (p - 1)) : 4.5 * t;
}
/**
 * Convert an array of linear-light sRGB values in the range 0.0-1.0 to gamma corrected form
 * Extended transfer function:
 *  For negative values, linear portion extends on reflection
 *  of axis, then uses reflected pow below that
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see https://en.wikipedia.org/wiki/SRGB
 */ function gam_sRGB(t) {
    return [
        gam_sRGB_channel(t[0]),
        gam_sRGB_channel(t[1]),
        gam_sRGB_channel(t[2])
    ];
}
function gam_sRGB_channel(t) {
    const _ = t < 0 ? -1 : 1, n = Math.abs(t);
    return n > .0031308 ? _ * (1.055 * Math.pow(n, 1 / 2.4) - .055) : 12.92 * t;
}
/**
 * Convert an array of linear-light display-p3 RGB in the range 0.0-1.0
 * to gamma corrected form
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ function gam_P3(t) {
    return gam_sRGB(t);
}
/**
 * Convert an array of linear-light prophoto-rgb in the range 0.0-1.0
 * to gamma corrected form.
 * Transfer curve is gamma 1.8 with a small linear portion.
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ const X = 1 / 512;
function gam_ProPhoto_channel(t) {
    const _ = t < 0 ? -1 : 1, n = Math.abs(t);
    return n >= X ? _ * Math.pow(n, 1 / 1.8) : 16 * t;
}
/**
 * Convert an array of linear-light a98-rgb in the range 0.0-1.0
 * to gamma corrected form. Negative values are also now accepted
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ function gam_a98rgb_channel(t) {
    const _ = t < 0 ? -1 : 1, n = Math.abs(t);
    return _ * Math.pow(n, 256 / 563);
}
/**
 * Convert an array of rec2020 RGB values in the range 0.0 - 1.0
 * to linear light (un-companded) form.
 * ITU-R BT.2020-2 p.4
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ const Y = 1.09929682680944, Z = .018053968510807;
function lin_2020_channel(t) {
    const _ = t < 0 ? -1 : 1, n = Math.abs(t);
    return n < 4.5 * Z ? t / 4.5 : _ * Math.pow((n + Y - 1) / Y, 1 / .45);
}
const b = [
    63426534 / 99577255,
    20160776 / 139408157,
    47086771 / 278816314,
    26158966 / 99577255,
    .677998071518871,
    8267143 / 139408157,
    0,
    19567812 / 697040785,
    1.0609850577107909
];
/**
 * Convert an array of linear-light rec2020 values to CIE XYZ
 * using  D65 (no chromatic adaptation)
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */ /**
 * Convert an array of of sRGB values where in-gamut values are in the range
 * [0 - 1] to linear light (un-companded) form.
 * Extended transfer function:
 *  For negative values, linear portion is extended on reflection of axis,
 *  then reflected power function is used.
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see https://en.wikipedia.org/wiki/SRGB
 */ function lin_sRGB(t) {
    return [
        lin_sRGB_channel(t[0]),
        lin_sRGB_channel(t[1]),
        lin_sRGB_channel(t[2])
    ];
}
function lin_sRGB_channel(t) {
    const _ = t < 0 ? -1 : 1, n = Math.abs(t);
    return n <= .04045 ? t / 12.92 : _ * Math.pow((n + .055) / 1.055, 2.4);
}
/**
 * Convert an array of display-p3 RGB values in the range 0.0 - 1.0
 * to linear light (un-companded) form.
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ function lin_P3(t) {
    return lin_sRGB(t);
}
const g = [
    608311 / 1250200,
    189793 / 714400,
    198249 / 1000160,
    35783 / 156275,
    247089 / 357200,
    198249 / 2500400,
    0,
    32229 / 714400,
    5220557 / 5000800
];
/**
 * Convert an array of linear-light display-p3 values to CIE XYZ
 * using D65 (no chromatic adaptation)
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 */ function lin_P3_to_XYZ(t) {
    return multiplyMatrices(g, t);
}
/**
 * Convert an array of prophoto-rgb values where in-gamut Colors are in the
 * range [0.0 - 1.0] to linear light (un-companded) form. Transfer curve is
 * gamma 1.8 with a small linear portion. Extended transfer function
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ const f = 16 / 512;
function lin_ProPhoto_channel(t) {
    const _ = t < 0 ? -1 : 1, n = Math.abs(t);
    return n <= f ? t / 16 : _ * Math.pow(n, 1.8);
}
const L = [
    .7977666449006423,
    .13518129740053308,
    .0313477341283922,
    .2880748288194013,
    .711835234241873,
    8993693872564e-17,
    0,
    0,
    .8251046025104602
];
/**
 * Convert an array of linear-light prophoto-rgb values to CIE D50 XYZ.
 * Matrix cannot be expressed in rational form, but is calculated to 64 bit accuracy.
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see see https://github.com/w3c/csswg-drafts/issues/7675
 */ function lin_a98rgb_channel(t) {
    const _ = t < 0 ? -1 : 1, n = Math.abs(t);
    return _ * Math.pow(n, 563 / 256);
}
const M = [
    573536 / 994567,
    263643 / 1420810,
    187206 / 994567,
    591459 / 1989134,
    6239551 / 9945670,
    374412 / 4972835,
    53769 / 1989134,
    351524 / 4972835,
    4929758 / 4972835
];
/**
 * Convert an array of linear-light a98-rgb values to CIE XYZ
 * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 * has greater numerical precision than section 4.3.5.3 of
 * https://www.adobe.com/digitalimag/pdfs/AdobeRGB1998.pdf
 * but the values below were calculated from first principles
 * from the chromaticity coordinates of R G B W
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
 * @see https://www.adobe.com/digitalimag/pdfs/AdobeRGB1998.pdf
 * @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/matrixmaker.html
 */ const d = [
    506752 / 1228815,
    87881 / 245763,
    12673 / 70218,
    87098 / 409605,
    175762 / 245763,
    12673 / 175545,
    7918 / 409605,
    87881 / 737289,
    1001167 / 1053270
];
/**
 * Convert an array of linear-light sRGB values to CIE XYZ
 * using sRGB's own white, D65 (no chromatic adaptation)
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ function lin_sRGB_to_XYZ(t) {
    return multiplyMatrices(d, t);
}
/**
 * Convert an array of gamma-corrected sRGB values in the 0.0 to 1.0 range to HSL.
 *
 * @param {Color} RGB [r, g, b]
 * - Red component 0..1
 * - Green component 0..1
 * - Blue component 0..1
 * @return {number[]} Array of HSL values: Hue as degrees 0..360, Saturation and Lightness as percentages 0..100
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/utilities.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 *
 * @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/better-rgbToHsl.js
 */ function sRGB_to_HSL(t) {
    const _ = t[0], n = t[1], o = t[2], e = Math.max(_, n, o), r = Math.min(_, n, o), a = (r + e) / 2, i = e - r;
    let l = Number.NaN, s = 0;
    if (0 !== Math.round(1e5 * i)) {
        const t = Math.round(1e5 * a);
        switch(s = 0 === t || 1e5 === t ? 0 : (e - a) / Math.min(a, 1 - a), e){
            case _:
                l = (n - o) / i + (n < o ? 6 : 0);
                break;
            case n:
                l = (o - _) / i + 2;
                break;
            case o:
                l = (_ - n) / i + 4;
        }
        l *= 60;
    }
    return s < 0 && (l += 180, s = Math.abs(s)), l >= 360 && (l -= 360), [
        l,
        100 * s,
        100 * a
    ];
}
function sRGB_to_Hue(t) {
    const _ = t[0], n = t[1], o = t[2], e = Math.max(_, n, o), r = Math.min(_, n, o);
    let a = Number.NaN;
    const i = e - r;
    if (0 !== i) {
        switch(e){
            case _:
                a = (n - o) / i + (n < o ? 6 : 0);
                break;
            case n:
                a = (o - _) / i + 2;
                break;
            case o:
                a = (_ - n) / i + 4;
        }
        a *= 60;
    }
    return a >= 360 && (a -= 360), a;
}
function inGamut(t) {
    return t[0] >= -1e-4 && t[0] <= 1.0001 && t[1] >= -1e-4 && t[1] <= 1.0001 && t[2] >= -1e-4 && t[2] <= 1.0001;
}
function clip(t) {
    return [
        t[0] < 0 ? 0 : t[0] > 1 ? 1 : t[0],
        t[1] < 0 ? 0 : t[1] > 1 ? 1 : t[1],
        t[2] < 0 ? 0 : t[2] > 1 ? 1 : t[2]
    ];
}
/**
 * @description Calculate deltaE OK which is the simple root sum of squares
 * @param {number[]} reference - Array of OKLab values: L as 0..1, a and b as -1..1
 * @param {number[]} sample - Array of OKLab values: L as 0..1, a and b as -1..1
 * @return {number} How different a color sample is from reference
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/deltaEOK.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 * @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/deltaEOK.js
 */ function deltaEOK(t, _) {
    const [n, o, e] = t, [r, a, i] = _, l = n - r, s = o - a, c = e - i;
    return Math.sqrt(l ** 2 + s ** 2 + c ** 2);
}
const B = .02, G = 1e-4;
function rayTraceBox(t, _) {
    let n = 1 / 0, o = -1 / 0;
    const e = [
        0,
        0,
        0
    ];
    for(let r = 0; r < 3; r++){
        const a = t[r], i = _[r] - a;
        e[r] = i;
        const l = 0, s = 1;
        if (i) {
            const t = 1 / i, _ = (l - a) * t, e = (s - a) * t;
            o = Math.max(Math.min(_, e), o), n = Math.min(Math.max(_, e), n);
        } else if (a < l || a > s) return !1;
    }
    return !(o > n || n < 0) && (o < 0 && (o = n), !!isFinite(o) && [
        t[0] + e[0] * o,
        t[1] + e[1] * o,
        t[2] + e[2] * o
    ]);
}
function luminance(t) {
    const [_, n, o] = t.map((t)=>t <= .03928 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4));
    return .2126 * _ + .7152 * n + .0722 * o;
}
exports.HSL_to_XYZ_D50 = function HSL_to_XYZ_D50(t) {
    let _ = t;
    return _ = HSL_to_sRGB(_), _ = lin_sRGB(_), _ = lin_sRGB_to_XYZ(_), _ = D65_to_D50(_), _;
}, exports.HWB_to_XYZ_D50 = function HWB_to_XYZ_D50(t) {
    let _ = t;
    return _ = HWB_to_sRGB(_), _ = lin_sRGB(_), _ = lin_sRGB_to_XYZ(_), _ = D65_to_D50(_), _;
}, exports.LCH_to_XYZ_D50 = function LCH_to_XYZ_D50(t) {
    let _ = t;
    return _ = LCH_to_Lab(_), _ = Lab_to_XYZ(_), _;
}, exports.Lab_to_XYZ_D50 = function Lab_to_XYZ_D50(t) {
    let _ = t;
    return _ = Lab_to_XYZ(_), _;
}, exports.OKLCH_to_OKLab = OKLCH_to_OKLab, exports.OKLCH_to_XYZ_D50 = function OKLCH_to_XYZ_D50(t) {
    let _ = t;
    return _ = OKLCH_to_OKLab(_), _ = OKLab_to_XYZ(_), _ = D65_to_D50(_), _;
}, exports.OKLab_to_OKLCH = OKLab_to_OKLCH, exports.OKLab_to_XYZ = OKLab_to_XYZ, exports.OKLab_to_XYZ_D50 = function OKLab_to_XYZ_D50(t) {
    let _ = t;
    return _ = OKLab_to_XYZ(_), _ = D65_to_D50(_), _;
}, exports.P3_to_XYZ_D50 = function P3_to_XYZ_D50(t) {
    let _ = t;
    return _ = lin_P3(_), _ = lin_P3_to_XYZ(_), _ = D65_to_D50(_), _;
}, exports.ProPhoto_RGB_to_XYZ_D50 = function ProPhoto_RGB_to_XYZ_D50(t) {
    let _ = t;
    var n;
    return _ = [
        lin_ProPhoto_channel((n = _)[0]),
        lin_ProPhoto_channel(n[1]),
        lin_ProPhoto_channel(n[2])
    ], _ = multiplyMatrices(L, _), _;
}, exports.XYZ_D50_to_HSL = function XYZ_D50_to_HSL(t) {
    let _ = t;
    return _ = D50_to_D65(_), _ = XYZ_to_lin_sRGB(_), _ = gam_sRGB(_), _ = sRGB_to_HSL(_), _;
}, exports.XYZ_D50_to_HWB = function XYZ_D50_to_HWB(t) {
    let _ = t;
    _ = D50_to_D65(_), _ = XYZ_to_lin_sRGB(_);
    const n = gam_sRGB(_), o = Math.min(n[0], n[1], n[2]), e = 1 - Math.max(n[0], n[1], n[2]);
    return [
        sRGB_to_Hue(n),
        100 * o,
        100 * e
    ];
}, exports.XYZ_D50_to_LCH = function XYZ_D50_to_LCH(t) {
    let _ = t;
    return _ = XYZ_to_Lab(_), _ = Lab_to_LCH(_), _;
}, exports.XYZ_D50_to_Lab = function XYZ_D50_to_Lab(t) {
    let _ = t;
    return _ = XYZ_to_Lab(_), _;
}, exports.XYZ_D50_to_OKLCH = function XYZ_D50_to_OKLCH(t) {
    let _ = t;
    return _ = D50_to_D65(_), _ = XYZ_to_OKLab(_), _ = OKLab_to_OKLCH(_), _;
}, exports.XYZ_D50_to_OKLab = function XYZ_D50_to_OKLab(t) {
    let _ = t;
    return _ = D50_to_D65(_), _ = XYZ_to_OKLab(_), _;
}, exports.XYZ_D50_to_P3 = function XYZ_D50_to_P3(t) {
    let _ = t;
    return _ = D50_to_D65(_), _ = XYZ_to_lin_P3(_), _ = gam_P3(_), _;
}, exports.XYZ_D50_to_ProPhoto = function XYZ_D50_to_ProPhoto(t) {
    let _ = t;
    var n;
    return _ = multiplyMatrices(u, _), _ = [
        gam_ProPhoto_channel((n = _)[0]),
        gam_ProPhoto_channel(n[1]),
        gam_ProPhoto_channel(n[2])
    ], _;
}, exports.XYZ_D50_to_XYZ_D50 = function XYZ_D50_to_XYZ_D50(t) {
    return t;
}, exports.XYZ_D50_to_XYZ_D65 = function XYZ_D50_to_XYZ_D65(t) {
    let _ = t;
    return _ = D50_to_D65(_), _;
}, exports.XYZ_D50_to_a98_RGB = function XYZ_D50_to_a98_RGB(t) {
    let _ = t;
    var n;
    return _ = D50_to_D65(_), _ = multiplyMatrices(h, _), _ = [
        gam_a98rgb_channel((n = _)[0]),
        gam_a98rgb_channel(n[1]),
        gam_a98rgb_channel(n[2])
    ], _;
}, exports.XYZ_D50_to_lin_P3 = function XYZ_D50_to_lin_P3(t) {
    let _ = t;
    return _ = D50_to_D65(_), _ = XYZ_to_lin_P3(_), _;
}, exports.XYZ_D50_to_lin_sRGB = function XYZ_D50_to_lin_sRGB(t) {
    let _ = t;
    return _ = D50_to_D65(_), _ = XYZ_to_lin_sRGB(_), _;
}, exports.XYZ_D50_to_rec_2020 = function XYZ_D50_to_rec_2020(t) {
    let _ = t;
    var n;
    return _ = D50_to_D65(_), _ = multiplyMatrices(s, _), _ = [
        gam_2020_channel((n = _)[0]),
        gam_2020_channel(n[1]),
        gam_2020_channel(n[2])
    ], _;
}, exports.XYZ_D50_to_sRGB = function XYZ_D50_to_sRGB(t) {
    let _ = t;
    return _ = D50_to_D65(_), _ = XYZ_to_lin_sRGB(_), _ = gam_sRGB(_), _;
}, exports.XYZ_D65_to_XYZ_D50 = function XYZ_D65_to_XYZ_D50(t) {
    let _ = t;
    return _ = D65_to_D50(_), _;
}, exports.XYZ_to_OKLab = XYZ_to_OKLab, exports.XYZ_to_lin_P3 = XYZ_to_lin_P3, exports.XYZ_to_lin_sRGB = XYZ_to_lin_sRGB, exports.a98_RGB_to_XYZ_D50 = function a98_RGB_to_XYZ_D50(t) {
    let _ = t;
    /**
 * Convert an array of a98-rgb values in the range 0.0 - 1.0
 * to linear light (un-companded) form. Negative values are also now accepted
 *
 * @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 * @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */ var n;
    return _ = [
        lin_a98rgb_channel((n = _)[0]),
        lin_a98rgb_channel(n[1]),
        lin_a98rgb_channel(n[2])
    ], _ = multiplyMatrices(M, _), _ = D65_to_D50(_), _;
}, exports.clip = clip, exports.contrast_ratio_wcag_2_1 = function contrast_ratio_wcag_2_1(t, _) {
    const n = luminance(t), o = luminance(_);
    return (Math.max(n, o) + .05) / (Math.min(n, o) + .05);
}, exports.gam_P3 = gam_P3, exports.gam_sRGB = gam_sRGB, exports.inGamut = inGamut, exports.lin_P3 = lin_P3, exports.lin_P3_to_XYZ = lin_P3_to_XYZ, exports.lin_P3_to_XYZ_D50 = function lin_P3_to_XYZ_D50(t) {
    let _ = t;
    return _ = lin_P3_to_XYZ(_), _ = D65_to_D50(_), _;
}, exports.lin_sRGB = lin_sRGB, exports.lin_sRGB_to_XYZ = lin_sRGB_to_XYZ, exports.lin_sRGB_to_XYZ_D50 = function lin_sRGB_to_XYZ_D50(t) {
    let _ = t;
    return _ = lin_sRGB_to_XYZ(_), _ = D65_to_D50(_), _;
}, exports.mapGamut = function mapGamut(t, _, n) {
    const o = t;
    let e = clip(_(o)), r = deltaEOK(OKLCH_to_OKLab(n(e)), OKLCH_to_OKLab(o));
    if (r < B) return e;
    let a = 0, i = o[1], l = !0;
    for(; i - a > G;){
        const t = (a + i) / 2;
        if (o[1] = t, l && inGamut(_(o))) a = t;
        else if (e = clip(_(o)), r = deltaEOK(OKLCH_to_OKLab(n(e)), OKLCH_to_OKLab(o)), r < B) {
            if (B - r < G) return e;
            l = !1, a = t;
        } else i = t;
    }
    return clip(_([
        ...o
    ]));
}, exports.mapGamutRayTrace = function mapGamutRayTrace(t, _, n) {
    const o = t[0], e = t[2];
    let r = _(t);
    const a = _([
        o,
        0,
        e
    ]);
    for(let t = 0; t < 4; t++){
        if (t > 0) {
            const t = n(r);
            t[0] = o, t[2] = e, r = _(t);
        }
        const i = rayTraceBox(a, r);
        if (!i) break;
        r = i;
    }
    return clip(r);
}, exports.namedColors = {
    aliceblue: [
        240,
        248,
        255
    ],
    antiquewhite: [
        250,
        235,
        215
    ],
    aqua: [
        0,
        255,
        255
    ],
    aquamarine: [
        127,
        255,
        212
    ],
    azure: [
        240,
        255,
        255
    ],
    beige: [
        245,
        245,
        220
    ],
    bisque: [
        255,
        228,
        196
    ],
    black: [
        0,
        0,
        0
    ],
    blanchedalmond: [
        255,
        235,
        205
    ],
    blue: [
        0,
        0,
        255
    ],
    blueviolet: [
        138,
        43,
        226
    ],
    brown: [
        165,
        42,
        42
    ],
    burlywood: [
        222,
        184,
        135
    ],
    cadetblue: [
        95,
        158,
        160
    ],
    chartreuse: [
        127,
        255,
        0
    ],
    chocolate: [
        210,
        105,
        30
    ],
    coral: [
        255,
        127,
        80
    ],
    cornflowerblue: [
        100,
        149,
        237
    ],
    cornsilk: [
        255,
        248,
        220
    ],
    crimson: [
        220,
        20,
        60
    ],
    cyan: [
        0,
        255,
        255
    ],
    darkblue: [
        0,
        0,
        139
    ],
    darkcyan: [
        0,
        139,
        139
    ],
    darkgoldenrod: [
        184,
        134,
        11
    ],
    darkgray: [
        169,
        169,
        169
    ],
    darkgreen: [
        0,
        100,
        0
    ],
    darkgrey: [
        169,
        169,
        169
    ],
    darkkhaki: [
        189,
        183,
        107
    ],
    darkmagenta: [
        139,
        0,
        139
    ],
    darkolivegreen: [
        85,
        107,
        47
    ],
    darkorange: [
        255,
        140,
        0
    ],
    darkorchid: [
        153,
        50,
        204
    ],
    darkred: [
        139,
        0,
        0
    ],
    darksalmon: [
        233,
        150,
        122
    ],
    darkseagreen: [
        143,
        188,
        143
    ],
    darkslateblue: [
        72,
        61,
        139
    ],
    darkslategray: [
        47,
        79,
        79
    ],
    darkslategrey: [
        47,
        79,
        79
    ],
    darkturquoise: [
        0,
        206,
        209
    ],
    darkviolet: [
        148,
        0,
        211
    ],
    deeppink: [
        255,
        20,
        147
    ],
    deepskyblue: [
        0,
        191,
        255
    ],
    dimgray: [
        105,
        105,
        105
    ],
    dimgrey: [
        105,
        105,
        105
    ],
    dodgerblue: [
        30,
        144,
        255
    ],
    firebrick: [
        178,
        34,
        34
    ],
    floralwhite: [
        255,
        250,
        240
    ],
    forestgreen: [
        34,
        139,
        34
    ],
    fuchsia: [
        255,
        0,
        255
    ],
    gainsboro: [
        220,
        220,
        220
    ],
    ghostwhite: [
        248,
        248,
        255
    ],
    gold: [
        255,
        215,
        0
    ],
    goldenrod: [
        218,
        165,
        32
    ],
    gray: [
        128,
        128,
        128
    ],
    green: [
        0,
        128,
        0
    ],
    greenyellow: [
        173,
        255,
        47
    ],
    grey: [
        128,
        128,
        128
    ],
    honeydew: [
        240,
        255,
        240
    ],
    hotpink: [
        255,
        105,
        180
    ],
    indianred: [
        205,
        92,
        92
    ],
    indigo: [
        75,
        0,
        130
    ],
    ivory: [
        255,
        255,
        240
    ],
    khaki: [
        240,
        230,
        140
    ],
    lavender: [
        230,
        230,
        250
    ],
    lavenderblush: [
        255,
        240,
        245
    ],
    lawngreen: [
        124,
        252,
        0
    ],
    lemonchiffon: [
        255,
        250,
        205
    ],
    lightblue: [
        173,
        216,
        230
    ],
    lightcoral: [
        240,
        128,
        128
    ],
    lightcyan: [
        224,
        255,
        255
    ],
    lightgoldenrodyellow: [
        250,
        250,
        210
    ],
    lightgray: [
        211,
        211,
        211
    ],
    lightgreen: [
        144,
        238,
        144
    ],
    lightgrey: [
        211,
        211,
        211
    ],
    lightpink: [
        255,
        182,
        193
    ],
    lightsalmon: [
        255,
        160,
        122
    ],
    lightseagreen: [
        32,
        178,
        170
    ],
    lightskyblue: [
        135,
        206,
        250
    ],
    lightslategray: [
        119,
        136,
        153
    ],
    lightslategrey: [
        119,
        136,
        153
    ],
    lightsteelblue: [
        176,
        196,
        222
    ],
    lightyellow: [
        255,
        255,
        224
    ],
    lime: [
        0,
        255,
        0
    ],
    limegreen: [
        50,
        205,
        50
    ],
    linen: [
        250,
        240,
        230
    ],
    magenta: [
        255,
        0,
        255
    ],
    maroon: [
        128,
        0,
        0
    ],
    mediumaquamarine: [
        102,
        205,
        170
    ],
    mediumblue: [
        0,
        0,
        205
    ],
    mediumorchid: [
        186,
        85,
        211
    ],
    mediumpurple: [
        147,
        112,
        219
    ],
    mediumseagreen: [
        60,
        179,
        113
    ],
    mediumslateblue: [
        123,
        104,
        238
    ],
    mediumspringgreen: [
        0,
        250,
        154
    ],
    mediumturquoise: [
        72,
        209,
        204
    ],
    mediumvioletred: [
        199,
        21,
        133
    ],
    midnightblue: [
        25,
        25,
        112
    ],
    mintcream: [
        245,
        255,
        250
    ],
    mistyrose: [
        255,
        228,
        225
    ],
    moccasin: [
        255,
        228,
        181
    ],
    navajowhite: [
        255,
        222,
        173
    ],
    navy: [
        0,
        0,
        128
    ],
    oldlace: [
        253,
        245,
        230
    ],
    olive: [
        128,
        128,
        0
    ],
    olivedrab: [
        107,
        142,
        35
    ],
    orange: [
        255,
        165,
        0
    ],
    orangered: [
        255,
        69,
        0
    ],
    orchid: [
        218,
        112,
        214
    ],
    palegoldenrod: [
        238,
        232,
        170
    ],
    palegreen: [
        152,
        251,
        152
    ],
    paleturquoise: [
        175,
        238,
        238
    ],
    palevioletred: [
        219,
        112,
        147
    ],
    papayawhip: [
        255,
        239,
        213
    ],
    peachpuff: [
        255,
        218,
        185
    ],
    peru: [
        205,
        133,
        63
    ],
    pink: [
        255,
        192,
        203
    ],
    plum: [
        221,
        160,
        221
    ],
    powderblue: [
        176,
        224,
        230
    ],
    purple: [
        128,
        0,
        128
    ],
    rebeccapurple: [
        102,
        51,
        153
    ],
    red: [
        255,
        0,
        0
    ],
    rosybrown: [
        188,
        143,
        143
    ],
    royalblue: [
        65,
        105,
        225
    ],
    saddlebrown: [
        139,
        69,
        19
    ],
    salmon: [
        250,
        128,
        114
    ],
    sandybrown: [
        244,
        164,
        96
    ],
    seagreen: [
        46,
        139,
        87
    ],
    seashell: [
        255,
        245,
        238
    ],
    sienna: [
        160,
        82,
        45
    ],
    silver: [
        192,
        192,
        192
    ],
    skyblue: [
        135,
        206,
        235
    ],
    slateblue: [
        106,
        90,
        205
    ],
    slategray: [
        112,
        128,
        144
    ],
    slategrey: [
        112,
        128,
        144
    ],
    snow: [
        255,
        250,
        250
    ],
    springgreen: [
        0,
        255,
        127
    ],
    steelblue: [
        70,
        130,
        180
    ],
    tan: [
        210,
        180,
        140
    ],
    teal: [
        0,
        128,
        128
    ],
    thistle: [
        216,
        191,
        216
    ],
    tomato: [
        255,
        99,
        71
    ],
    turquoise: [
        64,
        224,
        208
    ],
    violet: [
        238,
        130,
        238
    ],
    wheat: [
        245,
        222,
        179
    ],
    white: [
        255,
        255,
        255
    ],
    whitesmoke: [
        245,
        245,
        245
    ],
    yellow: [
        255,
        255,
        0
    ],
    yellowgreen: [
        154,
        205,
        50
    ]
}, exports.rec_2020_to_XYZ_D50 = function rec_2020_to_XYZ_D50(t) {
    let _ = t;
    var n;
    return _ = [
        lin_2020_channel((n = _)[0]),
        lin_2020_channel(n[1]),
        lin_2020_channel(n[2])
    ], _ = multiplyMatrices(b, _), _ = D65_to_D50(_), _;
}, exports.sRGB_to_XYZ_D50 = function sRGB_to_XYZ_D50(t) {
    let _ = t;
    return _ = lin_sRGB(_), _ = lin_sRGB_to_XYZ(_), _ = D65_to_D50(_), _;
};
}),
"[project]/frontend/node_modules/.pnpm/@csstools+css-color-parser@3.1.0_@csstools+css-parser-algorithms@3.0.5_@csstools+css-to_ac3eaa9e6357e2e6fe2577d663b974a1/node_modules/@csstools/css-color-parser/dist/index.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var e, o, a = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/@csstools+css-tokenizer@3.0.4/node_modules/@csstools/css-tokenizer/dist/index.cjs [app-ssr] (ecmascript)"), n = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/@csstools+color-helpers@5.1.0/node_modules/@csstools/color-helpers/dist/index.cjs [app-ssr] (ecmascript)"), t = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/@csstools+css-parser-algorithms@3.0.5_@csstools+css-tokenizer@3.0.4/node_modules/@csstools/css-parser-algorithms/dist/index.cjs [app-ssr] (ecmascript)"), r = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/@csstools+css-calc@2.1.4_@csstools+css-parser-algorithms@3.0.5_@csstools+css-tokenizer@_e8d5cb57048a11d39451107410ea18b6/node_modules/@csstools/css-calc/dist/index.cjs [app-ssr] (ecmascript)");
function convertNaNToZero(e) {
    return [
        Number.isNaN(e[0]) ? 0 : e[0],
        Number.isNaN(e[1]) ? 0 : e[1],
        Number.isNaN(e[2]) ? 0 : e[2]
    ];
}
function colorData_to_XYZ_D50(e) {
    switch(e.colorNotation){
        case exports.ColorNotation.HEX:
        case exports.ColorNotation.RGB:
        case exports.ColorNotation.sRGB:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.sRGB_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.Linear_sRGB:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.lin_sRGB_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.Display_P3:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.P3_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.Linear_Display_P3:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.lin_P3_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.Rec2020:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.rec_2020_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.A98_RGB:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.a98_RGB_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.ProPhoto_RGB:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.ProPhoto_RGB_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.HSL:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.HSL_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.HWB:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.HWB_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.Lab:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.Lab_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.OKLab:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.OKLab_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.LCH:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.LCH_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.OKLCH:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.OKLCH_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.XYZ_D50:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.XYZ_D50_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        case exports.ColorNotation.XYZ_D65:
            return {
                ...e,
                colorNotation: exports.ColorNotation.XYZ_D50,
                channels: n.XYZ_D65_to_XYZ_D50(convertNaNToZero(e.channels))
            };
        default:
            throw new Error("Unsupported color notation");
    }
}
exports.ColorNotation = void 0, (e = exports.ColorNotation || (exports.ColorNotation = {})).A98_RGB = "a98-rgb", e.Display_P3 = "display-p3", e.Linear_Display_P3 = "display-p3-linear", e.HEX = "hex", e.HSL = "hsl", e.HWB = "hwb", e.LCH = "lch", e.Lab = "lab", e.Linear_sRGB = "srgb-linear", e.OKLCH = "oklch", e.OKLab = "oklab", e.ProPhoto_RGB = "prophoto-rgb", e.RGB = "rgb", e.sRGB = "srgb", e.Rec2020 = "rec2020", e.XYZ_D50 = "xyz-d50", e.XYZ_D65 = "xyz-d65", exports.SyntaxFlag = void 0, (o = exports.SyntaxFlag || (exports.SyntaxFlag = {})).ColorKeyword = "color-keyword", o.HasAlpha = "has-alpha", o.HasDimensionValues = "has-dimension-values", o.HasNoneKeywords = "has-none-keywords", o.HasNumberValues = "has-number-values", o.HasPercentageAlpha = "has-percentage-alpha", o.HasPercentageValues = "has-percentage-values", o.HasVariableAlpha = "has-variable-alpha", o.Hex = "hex", o.LegacyHSL = "legacy-hsl", o.LegacyRGB = "legacy-rgb", o.NamedColor = "named-color", o.RelativeColorSyntax = "relative-color-syntax", o.ColorMix = "color-mix", o.ColorMixVariadic = "color-mix-variadic", o.ContrastColor = "contrast-color", o.RelativeAlphaSyntax = "relative-alpha-syntax", o.Experimental = "experimental";
const l = new Set([
    exports.ColorNotation.A98_RGB,
    exports.ColorNotation.Display_P3,
    exports.ColorNotation.Linear_Display_P3,
    exports.ColorNotation.HEX,
    exports.ColorNotation.Linear_sRGB,
    exports.ColorNotation.ProPhoto_RGB,
    exports.ColorNotation.RGB,
    exports.ColorNotation.sRGB,
    exports.ColorNotation.Rec2020,
    exports.ColorNotation.XYZ_D50,
    exports.ColorNotation.XYZ_D65
]);
function colorDataTo(e, o) {
    const a = {
        ...e
    };
    if (e.colorNotation !== o) {
        const e = colorData_to_XYZ_D50(a);
        switch(o){
            case exports.ColorNotation.HEX:
            case exports.ColorNotation.RGB:
                a.colorNotation = exports.ColorNotation.RGB, a.channels = n.XYZ_D50_to_sRGB(e.channels);
                break;
            case exports.ColorNotation.sRGB:
                a.colorNotation = exports.ColorNotation.sRGB, a.channels = n.XYZ_D50_to_sRGB(e.channels);
                break;
            case exports.ColorNotation.Linear_sRGB:
                a.colorNotation = exports.ColorNotation.Linear_sRGB, a.channels = n.XYZ_D50_to_lin_sRGB(e.channels);
                break;
            case exports.ColorNotation.Display_P3:
                a.colorNotation = exports.ColorNotation.Display_P3, a.channels = n.XYZ_D50_to_P3(e.channels);
                break;
            case exports.ColorNotation.Linear_Display_P3:
                a.colorNotation = exports.ColorNotation.Linear_Display_P3, a.channels = n.XYZ_D50_to_lin_P3(e.channels);
                break;
            case exports.ColorNotation.Rec2020:
                a.colorNotation = exports.ColorNotation.Rec2020, a.channels = n.XYZ_D50_to_rec_2020(e.channels);
                break;
            case exports.ColorNotation.ProPhoto_RGB:
                a.colorNotation = exports.ColorNotation.ProPhoto_RGB, a.channels = n.XYZ_D50_to_ProPhoto(e.channels);
                break;
            case exports.ColorNotation.A98_RGB:
                a.colorNotation = exports.ColorNotation.A98_RGB, a.channels = n.XYZ_D50_to_a98_RGB(e.channels);
                break;
            case exports.ColorNotation.HSL:
                a.colorNotation = exports.ColorNotation.HSL, a.channels = n.XYZ_D50_to_HSL(e.channels);
                break;
            case exports.ColorNotation.HWB:
                a.colorNotation = exports.ColorNotation.HWB, a.channels = n.XYZ_D50_to_HWB(e.channels);
                break;
            case exports.ColorNotation.Lab:
                a.colorNotation = exports.ColorNotation.Lab, a.channels = n.XYZ_D50_to_Lab(e.channels);
                break;
            case exports.ColorNotation.LCH:
                a.colorNotation = exports.ColorNotation.LCH, a.channels = n.XYZ_D50_to_LCH(e.channels);
                break;
            case exports.ColorNotation.OKLCH:
                a.colorNotation = exports.ColorNotation.OKLCH, a.channels = n.XYZ_D50_to_OKLCH(e.channels);
                break;
            case exports.ColorNotation.OKLab:
                a.colorNotation = exports.ColorNotation.OKLab, a.channels = n.XYZ_D50_to_OKLab(e.channels);
                break;
            case exports.ColorNotation.XYZ_D50:
                a.colorNotation = exports.ColorNotation.XYZ_D50, a.channels = n.XYZ_D50_to_XYZ_D50(e.channels);
                break;
            case exports.ColorNotation.XYZ_D65:
                a.colorNotation = exports.ColorNotation.XYZ_D65, a.channels = n.XYZ_D50_to_XYZ_D65(e.channels);
                break;
            default:
                throw new Error("Unsupported color notation");
        }
    } else a.channels = convertNaNToZero(e.channels);
    if (o === e.colorNotation) a.channels = carryForwardMissingComponents(e.channels, [
        0,
        1,
        2
    ], a.channels, [
        0,
        1,
        2
    ]);
    else if (l.has(o) && l.has(e.colorNotation)) a.channels = carryForwardMissingComponents(e.channels, [
        0,
        1,
        2
    ], a.channels, [
        0,
        1,
        2
    ]);
    else switch(o){
        case exports.ColorNotation.HSL:
            switch(e.colorNotation){
                case exports.ColorNotation.HWB:
                    a.channels = carryForwardMissingComponents(e.channels, [
                        0
                    ], a.channels, [
                        0
                    ]);
                    break;
                case exports.ColorNotation.Lab:
                case exports.ColorNotation.OKLab:
                    a.channels = carryForwardMissingComponents(e.channels, [
                        2
                    ], a.channels, [
                        0
                    ]);
                    break;
                case exports.ColorNotation.LCH:
                case exports.ColorNotation.OKLCH:
                    a.channels = carryForwardMissingComponents(e.channels, [
                        0,
                        1,
                        2
                    ], a.channels, [
                        2,
                        1,
                        0
                    ]);
            }
            break;
        case exports.ColorNotation.HWB:
            switch(e.colorNotation){
                case exports.ColorNotation.HSL:
                    a.channels = carryForwardMissingComponents(e.channels, [
                        0
                    ], a.channels, [
                        0
                    ]);
                    break;
                case exports.ColorNotation.LCH:
                case exports.ColorNotation.OKLCH:
                    a.channels = carryForwardMissingComponents(e.channels, [
                        0
                    ], a.channels, [
                        2
                    ]);
            }
            break;
        case exports.ColorNotation.Lab:
        case exports.ColorNotation.OKLab:
            switch(e.colorNotation){
                case exports.ColorNotation.HSL:
                    a.channels = carryForwardMissingComponents(e.channels, [
                        0
                    ], a.channels, [
                        2
                    ]);
                    break;
                case exports.ColorNotation.Lab:
                case exports.ColorNotation.OKLab:
                    a.channels = carryForwardMissingComponents(e.channels, [
                        0,
                        1,
                        2
                    ], a.channels, [
                        0,
                        1,
                        2
                    ]);
                    break;
                case exports.ColorNotation.LCH:
                case exports.ColorNotation.OKLCH:
                    a.channels = carryForwardMissingComponents(e.channels, [
                        0
                    ], a.channels, [
                        0
                    ]);
            }
            break;
        case exports.ColorNotation.LCH:
        case exports.ColorNotation.OKLCH:
            switch(e.colorNotation){
                case exports.ColorNotation.HSL:
                    a.channels = carryForwardMissingComponents(e.channels, [
                        0,
                        1,
                        2
                    ], a.channels, [
                        2,
                        1,
                        0
                    ]);
                    break;
                case exports.ColorNotation.HWB:
                    a.channels = carryForwardMissingComponents(e.channels, [
                        0
                    ], a.channels, [
                        2
                    ]);
                    break;
                case exports.ColorNotation.Lab:
                case exports.ColorNotation.OKLab:
                    a.channels = carryForwardMissingComponents(e.channels, [
                        0
                    ], a.channels, [
                        0
                    ]);
                    break;
                case exports.ColorNotation.LCH:
                case exports.ColorNotation.OKLCH:
                    a.channels = carryForwardMissingComponents(e.channels, [
                        0,
                        1,
                        2
                    ], a.channels, [
                        0,
                        1,
                        2
                    ]);
            }
    }
    return a.channels = convertPowerlessComponentsToMissingComponents(a.channels, o), a;
}
function convertPowerlessComponentsToMissingComponents(e, o) {
    const a = [
        ...e
    ];
    switch(o){
        case exports.ColorNotation.HSL:
            !Number.isNaN(a[1]) && reducePrecision(a[1], 4) <= 0 && (a[0] = Number.NaN);
            break;
        case exports.ColorNotation.HWB:
            Math.max(0, reducePrecision(a[1], 4)) + Math.max(0, reducePrecision(a[2], 4)) >= 100 && (a[0] = Number.NaN);
            break;
        case exports.ColorNotation.LCH:
            !Number.isNaN(a[1]) && reducePrecision(a[1], 4) <= 0 && (a[2] = Number.NaN);
            break;
        case exports.ColorNotation.OKLCH:
            !Number.isNaN(a[1]) && reducePrecision(a[1], 6) <= 0 && (a[2] = Number.NaN);
    }
    return a;
}
function convertPowerlessComponentsToZeroValuesForDisplay(e, o) {
    const a = [
        ...e
    ];
    switch(o){
        case exports.ColorNotation.HSL:
            (reducePrecision(a[2]) <= 0 || reducePrecision(a[2]) >= 100) && (a[0] = Number.NaN, a[1] = Number.NaN), reducePrecision(a[1]) <= 0 && (a[0] = Number.NaN);
            break;
        case exports.ColorNotation.HWB:
            Math.max(0, reducePrecision(a[1])) + Math.max(0, reducePrecision(a[2])) >= 100 && (a[0] = Number.NaN);
            break;
        case exports.ColorNotation.Lab:
            (reducePrecision(a[0]) <= 0 || reducePrecision(a[0]) >= 100) && (a[1] = Number.NaN, a[2] = Number.NaN);
            break;
        case exports.ColorNotation.LCH:
            reducePrecision(a[1]) <= 0 && (a[2] = Number.NaN), (reducePrecision(a[0]) <= 0 || reducePrecision(a[0]) >= 100) && (a[1] = Number.NaN, a[2] = Number.NaN);
            break;
        case exports.ColorNotation.OKLab:
            (reducePrecision(a[0]) <= 0 || reducePrecision(a[0]) >= 1) && (a[1] = Number.NaN, a[2] = Number.NaN);
            break;
        case exports.ColorNotation.OKLCH:
            reducePrecision(a[1]) <= 0 && (a[2] = Number.NaN), (reducePrecision(a[0]) <= 0 || reducePrecision(a[0]) >= 1) && (a[1] = Number.NaN, a[2] = Number.NaN);
    }
    return a;
}
function carryForwardMissingComponents(e, o, a, n) {
    const t = [
        ...a
    ];
    for (const a of o)Number.isNaN(e[o[a]]) && (t[n[a]] = Number.NaN);
    return t;
}
function normalizeRelativeColorDataChannels(e) {
    const o = new Map;
    switch(e.colorNotation){
        case exports.ColorNotation.RGB:
        case exports.ColorNotation.HEX:
            o.set("r", dummyNumberToken(255 * e.channels[0])), o.set("g", dummyNumberToken(255 * e.channels[1])), o.set("b", dummyNumberToken(255 * e.channels[2])), "number" == typeof e.alpha && o.set("alpha", dummyNumberToken(e.alpha));
            break;
        case exports.ColorNotation.HSL:
            o.set("h", dummyNumberToken(e.channels[0])), o.set("s", dummyNumberToken(e.channels[1])), o.set("l", dummyNumberToken(e.channels[2])), "number" == typeof e.alpha && o.set("alpha", dummyNumberToken(e.alpha));
            break;
        case exports.ColorNotation.HWB:
            o.set("h", dummyNumberToken(e.channels[0])), o.set("w", dummyNumberToken(e.channels[1])), o.set("b", dummyNumberToken(e.channels[2])), "number" == typeof e.alpha && o.set("alpha", dummyNumberToken(e.alpha));
            break;
        case exports.ColorNotation.Lab:
        case exports.ColorNotation.OKLab:
            o.set("l", dummyNumberToken(e.channels[0])), o.set("a", dummyNumberToken(e.channels[1])), o.set("b", dummyNumberToken(e.channels[2])), "number" == typeof e.alpha && o.set("alpha", dummyNumberToken(e.alpha));
            break;
        case exports.ColorNotation.LCH:
        case exports.ColorNotation.OKLCH:
            o.set("l", dummyNumberToken(e.channels[0])), o.set("c", dummyNumberToken(e.channels[1])), o.set("h", dummyNumberToken(e.channels[2])), "number" == typeof e.alpha && o.set("alpha", dummyNumberToken(e.alpha));
            break;
        case exports.ColorNotation.sRGB:
        case exports.ColorNotation.A98_RGB:
        case exports.ColorNotation.Display_P3:
        case exports.ColorNotation.Linear_Display_P3:
        case exports.ColorNotation.Rec2020:
        case exports.ColorNotation.Linear_sRGB:
        case exports.ColorNotation.ProPhoto_RGB:
            o.set("r", dummyNumberToken(e.channels[0])), o.set("g", dummyNumberToken(e.channels[1])), o.set("b", dummyNumberToken(e.channels[2])), "number" == typeof e.alpha && o.set("alpha", dummyNumberToken(e.alpha));
            break;
        case exports.ColorNotation.XYZ_D50:
        case exports.ColorNotation.XYZ_D65:
            o.set("x", dummyNumberToken(e.channels[0])), o.set("y", dummyNumberToken(e.channels[1])), o.set("z", dummyNumberToken(e.channels[2])), "number" == typeof e.alpha && o.set("alpha", dummyNumberToken(e.alpha));
    }
    return o;
}
function noneToZeroInRelativeColorDataChannels(e) {
    const o = new Map(e);
    for (const [a, n] of e)Number.isNaN(n[4].value) && o.set(a, dummyNumberToken(0));
    return o;
}
function dummyNumberToken(e) {
    return Number.isNaN(e) ? [
        a.TokenType.Number,
        "none",
        -1,
        -1,
        {
            value: Number.NaN,
            type: a.NumberType.Number
        }
    ] : [
        a.TokenType.Number,
        e.toString(),
        -1,
        -1,
        {
            value: e,
            type: a.NumberType.Number
        }
    ];
}
function reducePrecision(e, o = 7) {
    if (Number.isNaN(e)) return 0;
    const a = Math.pow(10, o);
    return Math.round(e * a) / a;
}
function normalize(e, o, a, n) {
    return Math.min(Math.max(e / o, a), n);
}
const s = /[A-Z]/g;
function toLowerCaseAZ(e) {
    return e.replace(s, (e)=>String.fromCharCode(e.charCodeAt(0) + 32));
}
function normalize_Color_ChannelValues(e, o, n) {
    if (a.isTokenIdent(e) && "none" === toLowerCaseAZ(e[4].value)) return n.syntaxFlags.add(exports.SyntaxFlag.HasNoneKeywords), [
        a.TokenType.Number,
        "none",
        e[2],
        e[3],
        {
            value: Number.NaN,
            type: a.NumberType.Number
        }
    ];
    if (a.isTokenPercentage(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageValues);
        let t = normalize(e[4].value, 100, -2147483647, 2147483647);
        return 3 === o && (t = normalize(e[4].value, 100, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    if (a.isTokenNumber(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasNumberValues);
        let t = normalize(e[4].value, 1, -2147483647, 2147483647);
        return 3 === o && (t = normalize(e[4].value, 1, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    return !1;
}
const i = new Set([
    "srgb",
    "srgb-linear",
    "display-p3",
    "display-p3-linear",
    "a98-rgb",
    "prophoto-rgb",
    "rec2020",
    "xyz",
    "xyz-d50",
    "xyz-d65"
]);
function color$1(e, o) {
    const n = [], l = [], s = [], u = [];
    let c, p, N = !1, m = !1;
    const h = {
        colorNotation: exports.ColorNotation.sRGB,
        channels: [
            0,
            0,
            0
        ],
        alpha: 1,
        syntaxFlags: new Set([])
    };
    let x = n;
    for(let y = 0; y < e.value.length; y++){
        let b = e.value[y];
        if (t.isWhitespaceNode(b) || t.isCommentNode(b)) for(; t.isWhitespaceNode(e.value[y + 1]) || t.isCommentNode(e.value[y + 1]);)y++;
        else if (x === n && n.length && (x = l), x === l && l.length && (x = s), t.isTokenNode(b) && a.isTokenDelim(b.value) && "/" === b.value[4].value) {
            if (x === u) return !1;
            x = u;
        } else {
            if (t.isFunctionNode(b)) {
                if (x === u && "var" === toLowerCaseAZ(b.getName())) {
                    h.syntaxFlags.add(exports.SyntaxFlag.HasVariableAlpha), x.push(b);
                    continue;
                }
                if (!r.mathFunctionNames.has(toLowerCaseAZ(b.getName()))) return !1;
                const [[e]] = r.calcFromComponentValues([
                    [
                        b
                    ]
                ], {
                    censorIntoStandardRepresentableValues: !0,
                    globals: p,
                    precision: -1,
                    toCanonicalUnits: !0,
                    rawPercentages: !0
                });
                if (!e || !t.isTokenNode(e) || !a.isTokenNumeric(e.value)) return !1;
                Number.isNaN(e.value[4].value) && (e.value[4].value = 0), b = e;
            }
            if (x === n && 0 === n.length && t.isTokenNode(b) && a.isTokenIdent(b.value) && i.has(toLowerCaseAZ(b.value[4].value))) {
                if (N) return !1;
                N = toLowerCaseAZ(b.value[4].value), h.colorNotation = colorSpaceNameToColorNotation(N), m && (m.colorNotation !== h.colorNotation && (m = colorDataTo(m, h.colorNotation)), c = normalizeRelativeColorDataChannels(m), p = noneToZeroInRelativeColorDataChannels(c));
            } else if (x === n && 0 === n.length && t.isTokenNode(b) && a.isTokenIdent(b.value) && "from" === toLowerCaseAZ(b.value[4].value)) {
                if (m) return !1;
                if (N) return !1;
                for(; t.isWhitespaceNode(e.value[y + 1]) || t.isCommentNode(e.value[y + 1]);)y++;
                if (y++, b = e.value[y], m = o(b), !1 === m) return !1;
                m.syntaxFlags.has(exports.SyntaxFlag.Experimental) && h.syntaxFlags.add(exports.SyntaxFlag.Experimental), h.syntaxFlags.add(exports.SyntaxFlag.RelativeColorSyntax);
            } else {
                if (!t.isTokenNode(b)) return !1;
                if (a.isTokenIdent(b.value) && c && c.has(toLowerCaseAZ(b.value[4].value))) {
                    x.push(new t.TokenNode(c.get(toLowerCaseAZ(b.value[4].value))));
                    continue;
                }
                x.push(b);
            }
        }
    }
    if (!N) return !1;
    if (1 !== x.length) return !1;
    if (1 !== n.length || 1 !== l.length || 1 !== s.length) return !1;
    if (!t.isTokenNode(n[0]) || !t.isTokenNode(l[0]) || !t.isTokenNode(s[0])) return !1;
    if (c && !c.has("alpha")) return !1;
    const y = normalize_Color_ChannelValues(n[0].value, 0, h);
    if (!y || !a.isTokenNumber(y)) return !1;
    const b = normalize_Color_ChannelValues(l[0].value, 1, h);
    if (!b || !a.isTokenNumber(b)) return !1;
    const C = normalize_Color_ChannelValues(s[0].value, 2, h);
    if (!C || !a.isTokenNumber(C)) return !1;
    const d = [
        y,
        b,
        C
    ];
    if (1 === u.length) if (h.syntaxFlags.add(exports.SyntaxFlag.HasAlpha), t.isTokenNode(u[0])) {
        const e = normalize_Color_ChannelValues(u[0].value, 3, h);
        if (!e || !a.isTokenNumber(e)) return !1;
        d.push(e);
    } else h.alpha = u[0];
    else if (c && c.has("alpha")) {
        const e = normalize_Color_ChannelValues(c.get("alpha"), 3, h);
        if (!e || !a.isTokenNumber(e)) return !1;
        d.push(e);
    }
    return h.channels = [
        d[0][4].value,
        d[1][4].value,
        d[2][4].value
    ], 4 === d.length && (h.alpha = d[3][4].value), h;
}
function colorSpaceNameToColorNotation(e) {
    switch(e){
        case "srgb":
            return exports.ColorNotation.sRGB;
        case "srgb-linear":
            return exports.ColorNotation.Linear_sRGB;
        case "display-p3":
            return exports.ColorNotation.Display_P3;
        case "display-p3-linear":
            return exports.ColorNotation.Linear_Display_P3;
        case "a98-rgb":
            return exports.ColorNotation.A98_RGB;
        case "prophoto-rgb":
            return exports.ColorNotation.ProPhoto_RGB;
        case "rec2020":
            return exports.ColorNotation.Rec2020;
        case "xyz":
        case "xyz-d65":
            return exports.ColorNotation.XYZ_D65;
        case "xyz-d50":
            return exports.ColorNotation.XYZ_D50;
        default:
            throw new Error("Unknown color space name: " + e);
    }
}
const u = new Set([
    "srgb",
    "srgb-linear",
    "display-p3",
    "display-p3-linear",
    "a98-rgb",
    "prophoto-rgb",
    "rec2020",
    "lab",
    "oklab",
    "xyz",
    "xyz-d50",
    "xyz-d65"
]), c = new Set([
    "hsl",
    "hwb",
    "lch",
    "oklch"
]), p = new Set([
    "shorter",
    "longer",
    "increasing",
    "decreasing"
]);
function colorMix(e, o) {
    let n = null, r = null, l = null, s = !1;
    for(let i = 0; i < e.value.length; i++){
        const N = e.value[i];
        if (!t.isWhiteSpaceOrCommentNode(N)) {
            if (!(n || t.isTokenNode(N) && a.isTokenIdent(N.value) && "in" === toLowerCaseAZ(N.value[4].value))) return colorMixRectangular("oklab", colorMixComponents(e.value, o));
            if (t.isTokenNode(N) && a.isTokenIdent(N.value)) {
                if (!n && "in" === toLowerCaseAZ(N.value[4].value)) {
                    n = N;
                    continue;
                }
                if (n && !r) {
                    r = toLowerCaseAZ(N.value[4].value);
                    continue;
                }
                if (n && r && !l && c.has(r)) {
                    l = toLowerCaseAZ(N.value[4].value);
                    continue;
                }
                if (n && r && l && !s && "hue" === toLowerCaseAZ(N.value[4].value)) {
                    s = !0;
                    continue;
                }
                return !1;
            }
            return !(!t.isTokenNode(N) || !a.isTokenComma(N.value)) && !!r && (l || s ? !!(r && l && s && c.has(r) && p.has(l)) && colorMixPolar(r, l, colorMixComponents(e.value.slice(i + 1), o)) : u.has(r) ? colorMixRectangular(r, colorMixComponents(e.value.slice(i + 1), o)) : !!c.has(r) && colorMixPolar(r, "shorter", colorMixComponents(e.value.slice(i + 1), o)));
        }
    }
    return !1;
}
function colorMixComponents(e, o) {
    const n = [];
    let l = 1, s = !1, i = !1;
    for(let l = 0; l < e.length; l++){
        let u = e[l];
        if (!t.isWhiteSpaceOrCommentNode(u)) {
            if (!t.isTokenNode(u) || !a.isTokenComma(u.value)) {
                if (!s) {
                    const e = o(u);
                    if (e) {
                        s = e;
                        continue;
                    }
                }
                if (!i) {
                    if (t.isFunctionNode(u) && r.mathFunctionNames.has(toLowerCaseAZ(u.getName()))) {
                        if ([[u]] = r.calcFromComponentValues([
                            [
                                u
                            ]
                        ], {
                            censorIntoStandardRepresentableValues: !0,
                            precision: -1,
                            toCanonicalUnits: !0,
                            rawPercentages: !0
                        }), !u || !t.isTokenNode(u) || !a.isTokenNumeric(u.value)) return !1;
                        Number.isNaN(u.value[4].value) && (u.value[4].value = 0);
                    }
                    if (t.isTokenNode(u) && a.isTokenPercentage(u.value) && u.value[4].value >= 0) {
                        i = u.value[4].value;
                        continue;
                    }
                }
                return !1;
            }
            if (!s) return !1;
            n.push({
                color: s,
                percentage: i
            }), s = !1, i = !1;
        }
    }
    if (!s) return !1;
    n.push({
        color: s,
        percentage: i
    });
    let u = 0, c = 0;
    for(let e = 0; e < n.length; e++){
        const o = n[e].percentage;
        if (!1 !== o) {
            if (o < 0 || o > 100) return !1;
            u += o;
        } else c++;
    }
    const p = Math.max(0, 100 - u);
    u = 0;
    for(let e = 0; e < n.length; e++)!1 === n[e].percentage && (n[e].percentage = p / c), u += n[e].percentage;
    if (0 === u) return {
        colors: [
            {
                color: {
                    channels: [
                        0,
                        0,
                        0
                    ],
                    colorNotation: exports.ColorNotation.sRGB,
                    alpha: 0,
                    syntaxFlags: new Set
                },
                percentage: 0
            }
        ],
        alphaMultiplier: 0
    };
    if (u > 100) for(let e = 0; e < n.length; e++){
        let o = n[e].percentage;
        o = o / u * 100, n[e].percentage = o;
    }
    if (u < 100) {
        l = u / 100;
        for(let e = 0; e < n.length; e++){
            let o = n[e].percentage;
            o = o / u * 100, n[e].percentage = o;
        }
    }
    return {
        colors: n,
        alphaMultiplier: l
    };
}
function colorMixRectangular(e, o) {
    if (!o || !o.colors.length) return !1;
    const a = o.colors.slice();
    a.reverse();
    let n = exports.ColorNotation.RGB;
    switch(e){
        case "srgb":
            n = exports.ColorNotation.RGB;
            break;
        case "srgb-linear":
            n = exports.ColorNotation.Linear_sRGB;
            break;
        case "display-p3":
            n = exports.ColorNotation.Display_P3;
            break;
        case "display-p3-linear":
            n = exports.ColorNotation.Linear_Display_P3;
            break;
        case "a98-rgb":
            n = exports.ColorNotation.A98_RGB;
            break;
        case "prophoto-rgb":
            n = exports.ColorNotation.ProPhoto_RGB;
            break;
        case "rec2020":
            n = exports.ColorNotation.Rec2020;
            break;
        case "lab":
            n = exports.ColorNotation.Lab;
            break;
        case "oklab":
            n = exports.ColorNotation.OKLab;
            break;
        case "xyz-d50":
            n = exports.ColorNotation.XYZ_D50;
            break;
        case "xyz":
        case "xyz-d65":
            n = exports.ColorNotation.XYZ_D65;
            break;
        default:
            return !1;
    }
    if (1 === a.length) {
        const e = colorDataTo(a[0].color, n);
        return e.colorNotation = n, e.syntaxFlags.add(exports.SyntaxFlag.ColorMixVariadic), "number" != typeof e.alpha ? !1 : (e.alpha = e.alpha * o.alphaMultiplier, e);
    }
    for(; a.length >= 2;){
        const e = a.pop(), o = a.pop();
        if (!e || !o) return !1;
        const t = colorMixRectangularPair(n, e.color, e.percentage, o.color, o.percentage);
        if (!t) return !1;
        a.push({
            color: t,
            percentage: e.percentage + o.percentage
        });
    }
    const t = a[0]?.color;
    return !!t && (o.colors.some((e)=>e.color.syntaxFlags.has(exports.SyntaxFlag.Experimental)) && t.syntaxFlags.add(exports.SyntaxFlag.Experimental), "number" == typeof t.alpha && (t.alpha = t.alpha * o.alphaMultiplier, 2 !== o.colors.length && t.syntaxFlags.add(exports.SyntaxFlag.ColorMixVariadic), t));
}
function colorMixRectangularPair(e, o, a, n, t) {
    const r = a / (a + t);
    let l = o.alpha;
    if ("number" != typeof l) return !1;
    let s = n.alpha;
    if ("number" != typeof s) return !1;
    l = Number.isNaN(l) ? s : l, s = Number.isNaN(s) ? l : s;
    const i = colorDataTo(o, e).channels, u = colorDataTo(n, e).channels;
    i[0] = fillInMissingComponent(i[0], u[0]), u[0] = fillInMissingComponent(u[0], i[0]), i[1] = fillInMissingComponent(i[1], u[1]), u[1] = fillInMissingComponent(u[1], i[1]), i[2] = fillInMissingComponent(i[2], u[2]), u[2] = fillInMissingComponent(u[2], i[2]), i[0] = premultiply(i[0], l), i[1] = premultiply(i[1], l), i[2] = premultiply(i[2], l), u[0] = premultiply(u[0], s), u[1] = premultiply(u[1], s), u[2] = premultiply(u[2], s);
    const c = interpolate(l, s, r);
    return {
        colorNotation: e,
        channels: [
            un_premultiply(interpolate(i[0], u[0], r), c),
            un_premultiply(interpolate(i[1], u[1], r), c),
            un_premultiply(interpolate(i[2], u[2], r), c)
        ],
        alpha: c,
        syntaxFlags: new Set([
            exports.SyntaxFlag.ColorMix
        ])
    };
}
function colorMixPolar(e, o, a) {
    if (!a || !a.colors.length) return !1;
    const n = a.colors.slice();
    n.reverse();
    let t = exports.ColorNotation.HSL;
    switch(e){
        case "hsl":
            t = exports.ColorNotation.HSL;
            break;
        case "hwb":
            t = exports.ColorNotation.HWB;
            break;
        case "lch":
            t = exports.ColorNotation.LCH;
            break;
        case "oklch":
            t = exports.ColorNotation.OKLCH;
            break;
        default:
            return !1;
    }
    if (1 === n.length) {
        const e = colorDataTo(n[0].color, t);
        return e.colorNotation = t, e.syntaxFlags.add(exports.SyntaxFlag.ColorMixVariadic), "number" != typeof e.alpha ? !1 : (e.alpha = e.alpha * a.alphaMultiplier, e);
    }
    for(; n.length >= 2;){
        const e = n.pop(), a = n.pop();
        if (!e || !a) return !1;
        const r = colorMixPolarPair(t, o, e.color, e.percentage, a.color, a.percentage);
        if (!r) return !1;
        n.push({
            color: r,
            percentage: e.percentage + a.percentage
        });
    }
    const r = n[0]?.color;
    return !!r && (a.colors.some((e)=>e.color.syntaxFlags.has(exports.SyntaxFlag.Experimental)) && r.syntaxFlags.add(exports.SyntaxFlag.Experimental), "number" == typeof r.alpha && (r.alpha = r.alpha * a.alphaMultiplier, 2 !== a.colors.length && r.syntaxFlags.add(exports.SyntaxFlag.ColorMixVariadic), r));
}
function colorMixPolarPair(e, o, a, n, t, r) {
    const l = n / (n + r);
    let s = 0, i = 0, u = 0, c = 0, p = 0, N = 0, m = a.alpha;
    if ("number" != typeof m) return !1;
    let h = t.alpha;
    if ("number" != typeof h) return !1;
    m = Number.isNaN(m) ? h : m, h = Number.isNaN(h) ? m : h;
    const x = colorDataTo(a, e).channels, y = colorDataTo(t, e).channels;
    switch(e){
        case exports.ColorNotation.HSL:
        case exports.ColorNotation.HWB:
            s = x[0], i = y[0], u = x[1], c = y[1], p = x[2], N = y[2];
            break;
        case exports.ColorNotation.LCH:
        case exports.ColorNotation.OKLCH:
            u = x[0], c = y[0], p = x[1], N = y[1], s = x[2], i = y[2];
    }
    s = fillInMissingComponent(s, i), Number.isNaN(s) && (s = 0), i = fillInMissingComponent(i, s), Number.isNaN(i) && (i = 0), u = fillInMissingComponent(u, c), c = fillInMissingComponent(c, u), p = fillInMissingComponent(p, N), N = fillInMissingComponent(N, p);
    const b = i - s;
    switch(o){
        case "shorter":
            b > 180 ? s += 360 : b < -180 && (i += 360);
            break;
        case "longer":
            -180 < b && b < 180 && (b > 0 ? s += 360 : i += 360);
            break;
        case "increasing":
            b < 0 && (i += 360);
            break;
        case "decreasing":
            b > 0 && (s += 360);
            break;
        default:
            throw new Error("Unknown hue interpolation method");
    }
    u = premultiply(u, m), p = premultiply(p, m), c = premultiply(c, h), N = premultiply(N, h);
    let C = [
        0,
        0,
        0
    ];
    const d = interpolate(m, h, l);
    switch(e){
        case exports.ColorNotation.HSL:
        case exports.ColorNotation.HWB:
            C = [
                interpolate(s, i, l),
                un_premultiply(interpolate(u, c, l), d),
                un_premultiply(interpolate(p, N, l), d)
            ];
            break;
        case exports.ColorNotation.LCH:
        case exports.ColorNotation.OKLCH:
            C = [
                un_premultiply(interpolate(u, c, l), d),
                un_premultiply(interpolate(p, N, l), d),
                interpolate(s, i, l)
            ];
    }
    return {
        colorNotation: e,
        channels: C,
        alpha: d,
        syntaxFlags: new Set([
            exports.SyntaxFlag.ColorMix
        ])
    };
}
function fillInMissingComponent(e, o) {
    return Number.isNaN(e) ? o : e;
}
function interpolate(e, o, a) {
    return e * a + o * (1 - a);
}
function premultiply(e, o) {
    return Number.isNaN(o) ? e : Number.isNaN(e) ? Number.NaN : e * o;
}
function un_premultiply(e, o) {
    return 0 === o || Number.isNaN(o) ? e : Number.isNaN(e) ? Number.NaN : e / o;
}
function hex(e) {
    const o = toLowerCaseAZ(e[4].value);
    if (o.match(/[^a-f0-9]/)) return !1;
    const a = {
        colorNotation: exports.ColorNotation.HEX,
        channels: [
            0,
            0,
            0
        ],
        alpha: 1,
        syntaxFlags: new Set([
            exports.SyntaxFlag.Hex
        ])
    }, n = o.length;
    if (3 === n) {
        const e = o[0], n = o[1], t = o[2];
        return a.channels = [
            parseInt(e + e, 16) / 255,
            parseInt(n + n, 16) / 255,
            parseInt(t + t, 16) / 255
        ], a;
    }
    if (6 === n) {
        const e = o[0] + o[1], n = o[2] + o[3], t = o[4] + o[5];
        return a.channels = [
            parseInt(e, 16) / 255,
            parseInt(n, 16) / 255,
            parseInt(t, 16) / 255
        ], a;
    }
    if (4 === n) {
        const e = o[0], n = o[1], t = o[2], r = o[3];
        return a.channels = [
            parseInt(e + e, 16) / 255,
            parseInt(n + n, 16) / 255,
            parseInt(t + t, 16) / 255
        ], a.alpha = parseInt(r + r, 16) / 255, a.syntaxFlags.add(exports.SyntaxFlag.HasAlpha), a;
    }
    if (8 === n) {
        const e = o[0] + o[1], n = o[2] + o[3], t = o[4] + o[5], r = o[6] + o[7];
        return a.channels = [
            parseInt(e, 16) / 255,
            parseInt(n, 16) / 255,
            parseInt(t, 16) / 255
        ], a.alpha = parseInt(r, 16) / 255, a.syntaxFlags.add(exports.SyntaxFlag.HasAlpha), a;
    }
    return !1;
}
function normalizeHue(e) {
    if (a.isTokenNumber(e)) return e[4].value = e[4].value % 360, e[1] = e[4].value.toString(), e;
    if (a.isTokenDimension(e)) {
        let o = e[4].value;
        switch(toLowerCaseAZ(e[4].unit)){
            case "deg":
                break;
            case "rad":
                o = 180 * e[4].value / Math.PI;
                break;
            case "grad":
                o = .9 * e[4].value;
                break;
            case "turn":
                o = 360 * e[4].value;
                break;
            default:
                return !1;
        }
        return o %= 360, [
            a.TokenType.Number,
            o.toString(),
            e[2],
            e[3],
            {
                value: o,
                type: a.NumberType.Number
            }
        ];
    }
    return !1;
}
function normalize_legacy_HSL_ChannelValues(e, o, n) {
    if (0 === o) {
        const o = normalizeHue(e);
        return !1 !== o && (a.isTokenDimension(e) && n.syntaxFlags.add(exports.SyntaxFlag.HasDimensionValues), o);
    }
    if (a.isTokenPercentage(e)) {
        3 === o ? n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageAlpha) : n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageValues);
        let t = normalize(e[4].value, 1, 0, 100);
        return 3 === o && (t = normalize(e[4].value, 100, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    if (a.isTokenNumber(e)) {
        if (3 !== o) return !1;
        let n = normalize(e[4].value, 1, 0, 100);
        return 3 === o && (n = normalize(e[4].value, 1, 0, 1)), [
            a.TokenType.Number,
            n.toString(),
            e[2],
            e[3],
            {
                value: n,
                type: a.NumberType.Number
            }
        ];
    }
    return !1;
}
function normalize_modern_HSL_ChannelValues(e, o, n) {
    if (a.isTokenIdent(e) && "none" === toLowerCaseAZ(e[4].value)) return n.syntaxFlags.add(exports.SyntaxFlag.HasNoneKeywords), [
        a.TokenType.Number,
        "none",
        e[2],
        e[3],
        {
            value: Number.NaN,
            type: a.NumberType.Number
        }
    ];
    if (0 === o) {
        const o = normalizeHue(e);
        return !1 !== o && (a.isTokenDimension(e) && n.syntaxFlags.add(exports.SyntaxFlag.HasDimensionValues), o);
    }
    if (a.isTokenPercentage(e)) {
        3 === o ? n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageAlpha) : n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageValues);
        let t = e[4].value;
        return 3 === o ? t = normalize(e[4].value, 100, 0, 1) : 1 === o && (t = normalize(e[4].value, 1, 0, 2147483647)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    if (a.isTokenNumber(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasNumberValues);
        let t = e[4].value;
        return 3 === o ? t = normalize(e[4].value, 1, 0, 1) : 1 === o && (t = normalize(e[4].value, 1, 0, 2147483647)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    return !1;
}
function threeChannelLegacySyntax(e, o, n, l) {
    const s = [], i = [], u = [], c = [], p = {
        colorNotation: n,
        channels: [
            0,
            0,
            0
        ],
        alpha: 1,
        syntaxFlags: new Set(l)
    };
    let N = s;
    for(let o = 0; o < e.value.length; o++){
        let n = e.value[o];
        if (!t.isWhitespaceNode(n) && !t.isCommentNode(n)) {
            if (t.isTokenNode(n) && a.isTokenComma(n.value)) {
                if (N === s) {
                    N = i;
                    continue;
                }
                if (N === i) {
                    N = u;
                    continue;
                }
                if (N === u) {
                    N = c;
                    continue;
                }
                if (N === c) return !1;
            }
            if (t.isFunctionNode(n)) {
                if (N === c && "var" === n.getName().toLowerCase()) {
                    p.syntaxFlags.add(exports.SyntaxFlag.HasVariableAlpha), N.push(n);
                    continue;
                }
                if (!r.mathFunctionNames.has(n.getName().toLowerCase())) return !1;
                const [[e]] = r.calcFromComponentValues([
                    [
                        n
                    ]
                ], {
                    censorIntoStandardRepresentableValues: !0,
                    precision: -1,
                    toCanonicalUnits: !0,
                    rawPercentages: !0
                });
                if (!e || !t.isTokenNode(e) || !a.isTokenNumeric(e.value)) return !1;
                Number.isNaN(e.value[4].value) && (e.value[4].value = 0), n = e;
            }
            if (!t.isTokenNode(n)) return !1;
            N.push(n);
        }
    }
    if (1 !== N.length) return !1;
    if (1 !== s.length || 1 !== i.length || 1 !== u.length) return !1;
    if (!t.isTokenNode(s[0]) || !t.isTokenNode(i[0]) || !t.isTokenNode(u[0])) return !1;
    const m = o(s[0].value, 0, p);
    if (!m || !a.isTokenNumber(m)) return !1;
    const h = o(i[0].value, 1, p);
    if (!h || !a.isTokenNumber(h)) return !1;
    const x = o(u[0].value, 2, p);
    if (!x || !a.isTokenNumber(x)) return !1;
    const y = [
        m,
        h,
        x
    ];
    if (1 === c.length) if (p.syntaxFlags.add(exports.SyntaxFlag.HasAlpha), t.isTokenNode(c[0])) {
        const e = o(c[0].value, 3, p);
        if (!e || !a.isTokenNumber(e)) return !1;
        y.push(e);
    } else p.alpha = c[0];
    return p.channels = [
        y[0][4].value,
        y[1][4].value,
        y[2][4].value
    ], 4 === y.length && (p.alpha = y[3][4].value), p;
}
function threeChannelSpaceSeparated(e, o, n, l, s) {
    const i = [], u = [], c = [], p = [];
    let N, m, h = !1;
    const x = {
        colorNotation: n,
        channels: [
            0,
            0,
            0
        ],
        alpha: 1,
        syntaxFlags: new Set(l)
    };
    let y = i;
    for(let o = 0; o < e.value.length; o++){
        let l = e.value[o];
        if (t.isWhitespaceNode(l) || t.isCommentNode(l)) for(; t.isWhitespaceNode(e.value[o + 1]) || t.isCommentNode(e.value[o + 1]);)o++;
        else if (y === i && i.length && (y = u), y === u && u.length && (y = c), t.isTokenNode(l) && a.isTokenDelim(l.value) && "/" === l.value[4].value) {
            if (y === p) return !1;
            y = p;
        } else {
            if (t.isFunctionNode(l)) {
                if (y === p && "var" === l.getName().toLowerCase()) {
                    x.syntaxFlags.add(exports.SyntaxFlag.HasVariableAlpha), y.push(l);
                    continue;
                }
                if (!r.mathFunctionNames.has(l.getName().toLowerCase())) return !1;
                const [[e]] = r.calcFromComponentValues([
                    [
                        l
                    ]
                ], {
                    censorIntoStandardRepresentableValues: !0,
                    globals: m,
                    precision: -1,
                    toCanonicalUnits: !0,
                    rawPercentages: !0
                });
                if (!e || !t.isTokenNode(e) || !a.isTokenNumeric(e.value)) return !1;
                Number.isNaN(e.value[4].value) && (e.value[4].value = 0), l = e;
            }
            if (y === i && 0 === i.length && t.isTokenNode(l) && a.isTokenIdent(l.value) && "from" === l.value[4].value.toLowerCase()) {
                if (h) return !1;
                for(; t.isWhitespaceNode(e.value[o + 1]) || t.isCommentNode(e.value[o + 1]);)o++;
                if (o++, l = e.value[o], h = s(l), !1 === h) return !1;
                h.syntaxFlags.has(exports.SyntaxFlag.Experimental) && x.syntaxFlags.add(exports.SyntaxFlag.Experimental), x.syntaxFlags.add(exports.SyntaxFlag.RelativeColorSyntax), h.colorNotation !== n && (h = colorDataTo(h, n)), N = normalizeRelativeColorDataChannels(h), m = noneToZeroInRelativeColorDataChannels(N);
            } else {
                if (!t.isTokenNode(l)) return !1;
                if (a.isTokenIdent(l.value) && N) {
                    const e = l.value[4].value.toLowerCase();
                    if (N.has(e)) {
                        y.push(new t.TokenNode(N.get(e)));
                        continue;
                    }
                }
                y.push(l);
            }
        }
    }
    if (1 !== y.length) return !1;
    if (1 !== i.length || 1 !== u.length || 1 !== c.length) return !1;
    if (!t.isTokenNode(i[0]) || !t.isTokenNode(u[0]) || !t.isTokenNode(c[0])) return !1;
    if (N && !N.has("alpha")) return !1;
    const b = o(i[0].value, 0, x);
    if (!b || !a.isTokenNumber(b)) return !1;
    const C = o(u[0].value, 1, x);
    if (!C || !a.isTokenNumber(C)) return !1;
    const d = o(c[0].value, 2, x);
    if (!d || !a.isTokenNumber(d)) return !1;
    const g = [
        b,
        C,
        d
    ];
    if (1 === p.length) if (x.syntaxFlags.add(exports.SyntaxFlag.HasAlpha), t.isTokenNode(p[0])) {
        const e = o(p[0].value, 3, x);
        if (!e || !a.isTokenNumber(e)) return !1;
        g.push(e);
    } else x.alpha = p[0];
    else if (N && N.has("alpha")) {
        const e = o(N.get("alpha"), 3, x);
        if (!e || !a.isTokenNumber(e)) return !1;
        g.push(e);
    }
    return x.channels = [
        g[0][4].value,
        g[1][4].value,
        g[2][4].value
    ], 4 === g.length && (x.alpha = g[3][4].value), x;
}
function hsl(e, o) {
    if (e.value.some((e)=>t.isTokenNode(e) && a.isTokenComma(e.value))) {
        const o = hslCommaSeparated(e);
        if (!1 !== o) return o;
    }
    {
        const a = hslSpaceSeparated(e, o);
        if (!1 !== a) return a;
    }
    return !1;
}
function hslCommaSeparated(e) {
    return threeChannelLegacySyntax(e, normalize_legacy_HSL_ChannelValues, exports.ColorNotation.HSL, [
        exports.SyntaxFlag.LegacyHSL
    ]);
}
function hslSpaceSeparated(e, o) {
    return threeChannelSpaceSeparated(e, normalize_modern_HSL_ChannelValues, exports.ColorNotation.HSL, [], o);
}
function normalize_HWB_ChannelValues(e, o, n) {
    if (a.isTokenIdent(e) && "none" === toLowerCaseAZ(e[4].value)) return n.syntaxFlags.add(exports.SyntaxFlag.HasNoneKeywords), [
        a.TokenType.Number,
        "none",
        e[2],
        e[3],
        {
            value: Number.NaN,
            type: a.NumberType.Number
        }
    ];
    if (0 === o) {
        const o = normalizeHue(e);
        return !1 !== o && (a.isTokenDimension(e) && n.syntaxFlags.add(exports.SyntaxFlag.HasDimensionValues), o);
    }
    if (a.isTokenPercentage(e)) {
        3 === o ? n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageAlpha) : n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageValues);
        let t = e[4].value;
        return 3 === o && (t = normalize(e[4].value, 100, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    if (a.isTokenNumber(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasNumberValues);
        let t = e[4].value;
        return 3 === o && (t = normalize(e[4].value, 1, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    return !1;
}
function normalize_Lab_ChannelValues(e, o, n) {
    if (a.isTokenIdent(e) && "none" === toLowerCaseAZ(e[4].value)) return n.syntaxFlags.add(exports.SyntaxFlag.HasNoneKeywords), [
        a.TokenType.Number,
        "none",
        e[2],
        e[3],
        {
            value: Number.NaN,
            type: a.NumberType.Number
        }
    ];
    if (a.isTokenPercentage(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageValues);
        let t = normalize(e[4].value, 1, 0, 100);
        return 1 === o || 2 === o ? t = normalize(e[4].value, .8, -2147483647, 2147483647) : 3 === o && (t = normalize(e[4].value, 100, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    if (a.isTokenNumber(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasNumberValues);
        let t = normalize(e[4].value, 1, 0, 100);
        return 1 === o || 2 === o ? t = normalize(e[4].value, 1, -2147483647, 2147483647) : 3 === o && (t = normalize(e[4].value, 1, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    return !1;
}
function lab(e, o) {
    return threeChannelSpaceSeparated(e, normalize_Lab_ChannelValues, exports.ColorNotation.Lab, [], o);
}
function normalize_LCH_ChannelValues(e, o, n) {
    if (a.isTokenIdent(e) && "none" === toLowerCaseAZ(e[4].value)) return n.syntaxFlags.add(exports.SyntaxFlag.HasNoneKeywords), [
        a.TokenType.Number,
        "none",
        e[2],
        e[3],
        {
            value: Number.NaN,
            type: a.NumberType.Number
        }
    ];
    if (2 === o) {
        const o = normalizeHue(e);
        return !1 !== o && (a.isTokenDimension(e) && n.syntaxFlags.add(exports.SyntaxFlag.HasDimensionValues), o);
    }
    if (a.isTokenPercentage(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageValues);
        let t = normalize(e[4].value, 1, 0, 100);
        return 1 === o ? t = normalize(e[4].value, 100 / 150, 0, 2147483647) : 3 === o && (t = normalize(e[4].value, 100, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    if (a.isTokenNumber(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasNumberValues);
        let t = normalize(e[4].value, 1, 0, 100);
        return 1 === o ? t = normalize(e[4].value, 1, 0, 2147483647) : 3 === o && (t = normalize(e[4].value, 1, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    return !1;
}
function lch(e, o) {
    return threeChannelSpaceSeparated(e, normalize_LCH_ChannelValues, exports.ColorNotation.LCH, [], o);
}
const N = new Map;
for (const [e, o] of Object.entries(n.namedColors))N.set(e, o);
function namedColor(e) {
    const o = N.get(toLowerCaseAZ(e));
    return !!o && {
        colorNotation: exports.ColorNotation.RGB,
        channels: [
            o[0] / 255,
            o[1] / 255,
            o[2] / 255
        ],
        alpha: 1,
        syntaxFlags: new Set([
            exports.SyntaxFlag.ColorKeyword,
            exports.SyntaxFlag.NamedColor
        ])
    };
}
function normalize_OKLab_ChannelValues(e, o, n) {
    if (a.isTokenIdent(e) && "none" === toLowerCaseAZ(e[4].value)) return n.syntaxFlags.add(exports.SyntaxFlag.HasNoneKeywords), [
        a.TokenType.Number,
        "none",
        e[2],
        e[3],
        {
            value: Number.NaN,
            type: a.NumberType.Number
        }
    ];
    if (a.isTokenPercentage(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageValues);
        let t = normalize(e[4].value, 100, 0, 1);
        return 1 === o || 2 === o ? t = normalize(e[4].value, 250, -2147483647, 2147483647) : 3 === o && (t = normalize(e[4].value, 100, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    if (a.isTokenNumber(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasNumberValues);
        let t = normalize(e[4].value, 1, 0, 1);
        return 1 === o || 2 === o ? t = normalize(e[4].value, 1, -2147483647, 2147483647) : 3 === o && (t = normalize(e[4].value, 1, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    return !1;
}
function oklab(e, o) {
    return threeChannelSpaceSeparated(e, normalize_OKLab_ChannelValues, exports.ColorNotation.OKLab, [], o);
}
function normalize_OKLCH_ChannelValues(e, o, n) {
    if (a.isTokenIdent(e) && "none" === toLowerCaseAZ(e[4].value)) return n.syntaxFlags.add(exports.SyntaxFlag.HasNoneKeywords), [
        a.TokenType.Number,
        "none",
        e[2],
        e[3],
        {
            value: Number.NaN,
            type: a.NumberType.Number
        }
    ];
    if (2 === o) {
        const o = normalizeHue(e);
        return !1 !== o && (a.isTokenDimension(e) && n.syntaxFlags.add(exports.SyntaxFlag.HasDimensionValues), o);
    }
    if (a.isTokenPercentage(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageValues);
        let t = normalize(e[4].value, 100, 0, 1);
        return 1 === o ? t = normalize(e[4].value, 250, 0, 2147483647) : 3 === o && (t = normalize(e[4].value, 100, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    if (a.isTokenNumber(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasNumberValues);
        let t = normalize(e[4].value, 1, 0, 1);
        return 1 === o ? t = normalize(e[4].value, 1, 0, 2147483647) : 3 === o && (t = normalize(e[4].value, 1, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    return !1;
}
function oklch(e, o) {
    return threeChannelSpaceSeparated(e, normalize_OKLCH_ChannelValues, exports.ColorNotation.OKLCH, [], o);
}
function normalize_legacy_sRGB_ChannelValues(e, o, n) {
    if (a.isTokenPercentage(e)) {
        3 === o ? n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageAlpha) : n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageValues);
        const t = normalize(e[4].value, 100, 0, 1);
        return [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    if (a.isTokenNumber(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasNumberValues);
        let t = normalize(e[4].value, 255, 0, 1);
        return 3 === o && (t = normalize(e[4].value, 1, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    return !1;
}
function normalize_modern_sRGB_ChannelValues(e, o, n) {
    if (a.isTokenIdent(e) && "none" === e[4].value.toLowerCase()) return n.syntaxFlags.add(exports.SyntaxFlag.HasNoneKeywords), [
        a.TokenType.Number,
        "none",
        e[2],
        e[3],
        {
            value: Number.NaN,
            type: a.NumberType.Number
        }
    ];
    if (a.isTokenPercentage(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasPercentageValues);
        let t = normalize(e[4].value, 100, -2147483647, 2147483647);
        return 3 === o && (t = normalize(e[4].value, 100, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    if (a.isTokenNumber(e)) {
        3 !== o && n.syntaxFlags.add(exports.SyntaxFlag.HasNumberValues);
        let t = normalize(e[4].value, 255, -2147483647, 2147483647);
        return 3 === o && (t = normalize(e[4].value, 1, 0, 1)), [
            a.TokenType.Number,
            t.toString(),
            e[2],
            e[3],
            {
                value: t,
                type: a.NumberType.Number
            }
        ];
    }
    return !1;
}
function rgb(e, o) {
    if (e.value.some((e)=>t.isTokenNode(e) && a.isTokenComma(e.value))) {
        const o = rgbCommaSeparated(e);
        if (!1 !== o) return (!o.syntaxFlags.has(exports.SyntaxFlag.HasNumberValues) || !o.syntaxFlags.has(exports.SyntaxFlag.HasPercentageValues)) && o;
    } else {
        const a = rgbSpaceSeparated(e, o);
        if (!1 !== a) return a;
    }
    return !1;
}
function rgbCommaSeparated(e) {
    return threeChannelLegacySyntax(e, normalize_legacy_sRGB_ChannelValues, exports.ColorNotation.RGB, [
        exports.SyntaxFlag.LegacyRGB
    ]);
}
function rgbSpaceSeparated(e, o) {
    return threeChannelSpaceSeparated(e, normalize_modern_sRGB_ChannelValues, exports.ColorNotation.RGB, [], o);
}
function XYZ_D50_to_sRGB_Gamut(e) {
    const o = n.XYZ_D50_to_sRGB(e);
    if (n.inGamut(o)) return n.clip(o);
    let a = e;
    return a = n.XYZ_D50_to_OKLCH(a), a[0] < 1e-6 && (a = [
        0,
        0,
        0
    ]), a[0] > .999999 && (a = [
        1,
        0,
        0
    ]), n.gam_sRGB(n.mapGamutRayTrace(a, oklch_to_lin_srgb, lin_srgb_to_oklch));
}
function oklch_to_lin_srgb(e) {
    return e = n.OKLCH_to_OKLab(e), e = n.OKLab_to_XYZ(e), n.XYZ_to_lin_sRGB(e);
}
function lin_srgb_to_oklch(e) {
    return e = n.lin_sRGB_to_XYZ(e), e = n.XYZ_to_OKLab(e), n.OKLab_to_OKLCH(e);
}
function contrastColor(e, o) {
    let a = !1;
    for(let n = 0; n < e.value.length; n++){
        const r = e.value[n];
        if (!t.isWhitespaceNode(r) && !t.isCommentNode(r) && (a || (a = o(r), !a))) return !1;
    }
    if (!a) return !1;
    a.channels = convertNaNToZero(a.channels), a.channels = XYZ_D50_to_sRGB_Gamut(colorData_to_XYZ_D50(a).channels), a.colorNotation = exports.ColorNotation.sRGB;
    const r = {
        colorNotation: exports.ColorNotation.sRGB,
        channels: [
            0,
            0,
            0
        ],
        alpha: 1,
        syntaxFlags: new Set([
            exports.SyntaxFlag.ContrastColor,
            exports.SyntaxFlag.Experimental
        ])
    }, l = n.contrast_ratio_wcag_2_1(a.channels, [
        1,
        1,
        1
    ]), s = n.contrast_ratio_wcag_2_1(a.channels, [
        0,
        0,
        0
    ]);
    return r.channels = l > s ? [
        1,
        1,
        1
    ] : [
        0,
        0,
        0
    ], r;
}
function alpha(e, o) {
    let n, l, s = !1, i = !1, u = !1;
    const c = {
        colorNotation: exports.ColorNotation.sRGB,
        channels: [
            0,
            0,
            0
        ],
        alpha: 1,
        syntaxFlags: new Set([])
    };
    for(let p = 0; p < e.value.length; p++){
        let N = e.value[p];
        if (t.isWhitespaceNode(N) || t.isCommentNode(N)) for(; t.isWhitespaceNode(e.value[p + 1]) || t.isCommentNode(e.value[p + 1]);)p++;
        else if (u && !s && !i && t.isTokenNode(N) && a.isTokenDelim(N.value) && "/" === N.value[4].value) s = !0;
        else {
            if (t.isFunctionNode(N) && r.mathFunctionNames.has(toLowerCaseAZ(N.getName()))) {
                const [[e]] = r.calcFromComponentValues([
                    [
                        N
                    ]
                ], {
                    censorIntoStandardRepresentableValues: !0,
                    globals: l,
                    precision: -1,
                    toCanonicalUnits: !0,
                    rawPercentages: !0
                });
                if (!e || !t.isTokenNode(e) || !a.isTokenNumeric(e.value)) return !1;
                Number.isNaN(e.value[4].value) && (e.value[4].value = 0), N = e;
            }
            if (s || i || !t.isTokenNode(N) || !a.isTokenIdent(N.value) || "from" !== toLowerCaseAZ(N.value[4].value)) {
                if (!s) return !1;
                if (i) return !1;
                if (t.isTokenNode(N)) {
                    if (a.isTokenIdent(N.value) && "alpha" === toLowerCaseAZ(N.value[4].value) && n && n.has("alpha")) {
                        c.alpha = n.get("alpha")[4].value, i = !0;
                        continue;
                    }
                    const e = normalize_Color_ChannelValues(N.value, 3, c);
                    if (!e || !a.isTokenNumber(e)) return !1;
                    c.alpha = new t.TokenNode(e), i = !0;
                    continue;
                }
                if (t.isFunctionNode(N)) {
                    const e = t.replaceComponentValues([
                        [
                            N
                        ]
                    ], (e)=>{
                        if (t.isTokenNode(e) && a.isTokenIdent(e.value) && "alpha" === toLowerCaseAZ(e.value[4].value) && n && n.has("alpha")) return new t.TokenNode(n.get("alpha"));
                    });
                    c.alpha = e[0][0], i = !0;
                    continue;
                }
                return !1;
            }
            if (u) return !1;
            for(; t.isWhitespaceNode(e.value[p + 1]) || t.isCommentNode(e.value[p + 1]);)p++;
            if (p++, N = e.value[p], u = o(N), !1 === u) return !1;
            n = normalizeRelativeColorDataChannels(u), l = noneToZeroInRelativeColorDataChannels(n), c.syntaxFlags = new Set(u.syntaxFlags), c.syntaxFlags.add(exports.SyntaxFlag.RelativeAlphaSyntax), c.channels = [
                ...u.channels
            ], c.colorNotation = u.colorNotation, c.alpha = u.alpha;
        }
    }
    return !!n && c;
}
function XYZ_D50_to_P3_Gamut(e) {
    const o = n.XYZ_D50_to_P3(e);
    if (n.inGamut(o)) return n.clip(o);
    let a = e;
    return a = n.XYZ_D50_to_OKLCH(a), a[0] < 1e-6 && (a = [
        0,
        0,
        0
    ]), a[0] > .999999 && (a = [
        1,
        0,
        0
    ]), n.gam_P3(n.mapGamutRayTrace(a, oklch_to_lin_p3, lin_p3_to_oklch));
}
function oklch_to_lin_p3(e) {
    return e = n.OKLCH_to_OKLab(e), e = n.OKLab_to_XYZ(e), n.XYZ_to_lin_P3(e);
}
function lin_p3_to_oklch(e) {
    return e = n.lin_P3_to_XYZ(e), e = n.XYZ_to_OKLab(e), n.OKLab_to_OKLCH(e);
}
function toPrecision(e, o = 7) {
    e = +e, o = +o;
    const a = (Math.floor(Math.abs(e)) + "").length;
    if (o > a) return +e.toFixed(o - a);
    {
        const n = 10 ** (a - o);
        return Math.round(e / n) * n;
    }
}
function serializeWithAlpha(e, o, n, r) {
    const l = [
        a.TokenType.CloseParen,
        ")",
        -1,
        -1,
        void 0
    ];
    if ("number" == typeof e.alpha) {
        const s = Math.min(1, Math.max(0, toPrecision(Number.isNaN(e.alpha) ? 0 : e.alpha)));
        return 1 === toPrecision(s, 4) ? new t.FunctionNode(o, l, r) : new t.FunctionNode(o, l, [
            ...r,
            new t.WhitespaceNode([
                n
            ]),
            new t.TokenNode([
                a.TokenType.Delim,
                "/",
                -1,
                -1,
                {
                    value: "/"
                }
            ]),
            new t.WhitespaceNode([
                n
            ]),
            new t.TokenNode([
                a.TokenType.Number,
                toPrecision(s, 4).toString(),
                -1,
                -1,
                {
                    value: e.alpha,
                    type: a.NumberType.Integer
                }
            ])
        ]);
    }
    return new t.FunctionNode(o, l, [
        ...r,
        new t.WhitespaceNode([
            n
        ]),
        new t.TokenNode([
            a.TokenType.Delim,
            "/",
            -1,
            -1,
            {
                value: "/"
            }
        ]),
        new t.WhitespaceNode([
            n
        ]),
        e.alpha
    ]);
}
exports.color = function color(e) {
    if (t.isFunctionNode(e)) {
        switch(toLowerCaseAZ(e.getName())){
            case "rgb":
            case "rgba":
                return rgb(e, color);
            case "hsl":
            case "hsla":
                return hsl(e, color);
            case "hwb":
                return o = color, threeChannelSpaceSeparated(e, normalize_HWB_ChannelValues, exports.ColorNotation.HWB, [], o);
            case "lab":
                return lab(e, color);
            case "lch":
                return lch(e, color);
            case "oklab":
                return oklab(e, color);
            case "oklch":
                return oklch(e, color);
            case "color":
                return color$1(e, color);
            case "color-mix":
                return colorMix(e, color);
            case "contrast-color":
                return contrastColor(e, color);
            case "alpha":
                return alpha(e, color);
        }
    }
    var o;
    if (t.isTokenNode(e)) {
        if (a.isTokenHash(e.value)) return hex(e.value);
        if (a.isTokenIdent(e.value)) {
            const o = namedColor(e.value[4].value);
            return !1 !== o ? o : "transparent" === toLowerCaseAZ(e.value[4].value) && {
                colorNotation: exports.ColorNotation.RGB,
                channels: [
                    0,
                    0,
                    0
                ],
                alpha: 0,
                syntaxFlags: new Set([
                    exports.SyntaxFlag.ColorKeyword
                ])
            };
        }
    }
    return !1;
}, exports.colorDataFitsDisplayP3_Gamut = function colorDataFitsDisplayP3_Gamut(e) {
    const o = {
        ...e,
        channels: [
            ...e.channels
        ]
    };
    return o.channels = convertPowerlessComponentsToZeroValuesForDisplay(o.channels, o.colorNotation), !colorDataTo(o, exports.ColorNotation.Display_P3).channels.find((e)=>e < -1e-5 || e > 1.00001);
}, exports.colorDataFitsRGB_Gamut = function colorDataFitsRGB_Gamut(e) {
    const o = {
        ...e,
        channels: [
            ...e.channels
        ]
    };
    return o.channels = convertPowerlessComponentsToZeroValuesForDisplay(o.channels, o.colorNotation), !colorDataTo(o, exports.ColorNotation.RGB).channels.find((e)=>e < -1e-5 || e > 1.00001);
}, exports.serializeHSL = function serializeHSL(e, o = !0) {
    e.channels = convertPowerlessComponentsToZeroValuesForDisplay(e.channels, e.colorNotation);
    let r = e.channels.map((e)=>Number.isNaN(e) ? 0 : e);
    r = o ? n.XYZ_D50_to_HSL(n.sRGB_to_XYZ_D50(XYZ_D50_to_sRGB_Gamut(colorData_to_XYZ_D50(e).channels))) : n.XYZ_D50_to_HSL(colorData_to_XYZ_D50(e).channels), r = r.map((e)=>Number.isNaN(e) ? 0 : e);
    const l = Math.min(360, Math.max(0, Math.round(toPrecision(r[0])))), s = Math.min(100, Math.max(0, Math.round(toPrecision(r[1])))), i = Math.min(100, Math.max(0, Math.round(toPrecision(r[2])))), u = [
        a.TokenType.CloseParen,
        ")",
        -1,
        -1,
        void 0
    ], c = [
        a.TokenType.Whitespace,
        " ",
        -1,
        -1,
        void 0
    ], p = [
        a.TokenType.Comma,
        ",",
        -1,
        -1,
        void 0
    ], N = [
        new t.TokenNode([
            a.TokenType.Number,
            l.toString(),
            -1,
            -1,
            {
                value: r[0],
                type: a.NumberType.Integer
            }
        ]),
        new t.TokenNode(p),
        new t.WhitespaceNode([
            c
        ]),
        new t.TokenNode([
            a.TokenType.Percentage,
            s.toString() + "%",
            -1,
            -1,
            {
                value: r[1]
            }
        ]),
        new t.TokenNode(p),
        new t.WhitespaceNode([
            c
        ]),
        new t.TokenNode([
            a.TokenType.Percentage,
            i.toString() + "%",
            -1,
            -1,
            {
                value: r[2]
            }
        ])
    ];
    if ("number" == typeof e.alpha) {
        const o = Math.min(1, Math.max(0, toPrecision(Number.isNaN(e.alpha) ? 0 : e.alpha)));
        return 1 === toPrecision(o, 4) ? new t.FunctionNode([
            a.TokenType.Function,
            "hsl(",
            -1,
            -1,
            {
                value: "hsl"
            }
        ], u, N) : new t.FunctionNode([
            a.TokenType.Function,
            "hsla(",
            -1,
            -1,
            {
                value: "hsla"
            }
        ], u, [
            ...N,
            new t.TokenNode(p),
            new t.WhitespaceNode([
                c
            ]),
            new t.TokenNode([
                a.TokenType.Number,
                toPrecision(o, 4).toString(),
                -1,
                -1,
                {
                    value: e.alpha,
                    type: a.NumberType.Number
                }
            ])
        ]);
    }
    return new t.FunctionNode([
        a.TokenType.Function,
        "hsla(",
        -1,
        -1,
        {
            value: "hsla"
        }
    ], u, [
        ...N,
        new t.TokenNode(p),
        new t.WhitespaceNode([
            c
        ]),
        e.alpha
    ]);
}, exports.serializeOKLCH = function serializeOKLCH(e) {
    e.channels = convertPowerlessComponentsToZeroValuesForDisplay(e.channels, e.colorNotation);
    let o = e.channels.map((e)=>Number.isNaN(e) ? 0 : e);
    e.colorNotation !== exports.ColorNotation.OKLCH && (o = n.XYZ_D50_to_OKLCH(colorData_to_XYZ_D50(e).channels));
    const r = toPrecision(o[0], 6), l = toPrecision(o[1], 6), s = toPrecision(o[2], 6), i = [
        a.TokenType.Function,
        "oklch(",
        -1,
        -1,
        {
            value: "oklch"
        }
    ], u = [
        a.TokenType.Whitespace,
        " ",
        -1,
        -1,
        void 0
    ];
    return serializeWithAlpha(e, i, u, [
        new t.TokenNode([
            a.TokenType.Number,
            r.toString(),
            -1,
            -1,
            {
                value: o[0],
                type: a.NumberType.Number
            }
        ]),
        new t.WhitespaceNode([
            u
        ]),
        new t.TokenNode([
            a.TokenType.Number,
            l.toString(),
            -1,
            -1,
            {
                value: o[1],
                type: a.NumberType.Number
            }
        ]),
        new t.WhitespaceNode([
            u
        ]),
        new t.TokenNode([
            a.TokenType.Number,
            s.toString(),
            -1,
            -1,
            {
                value: o[2],
                type: a.NumberType.Number
            }
        ])
    ]);
}, exports.serializeP3 = function serializeP3(e, o = !0) {
    e.channels = convertPowerlessComponentsToZeroValuesForDisplay(e.channels, e.colorNotation);
    let r = e.channels.map((e)=>Number.isNaN(e) ? 0 : e);
    o ? r = XYZ_D50_to_P3_Gamut(colorData_to_XYZ_D50(e).channels) : e.colorNotation !== exports.ColorNotation.Display_P3 && (r = n.XYZ_D50_to_P3(colorData_to_XYZ_D50(e).channels));
    const l = o ? Math.min(1, Math.max(0, toPrecision(r[0], 6))) : toPrecision(r[0], 6), s = o ? Math.min(1, Math.max(0, toPrecision(r[1], 6))) : toPrecision(r[1], 6), i = o ? Math.min(1, Math.max(0, toPrecision(r[2], 6))) : toPrecision(r[2], 6), u = [
        a.TokenType.Function,
        "color(",
        -1,
        -1,
        {
            value: "color"
        }
    ], c = [
        a.TokenType.Whitespace,
        " ",
        -1,
        -1,
        void 0
    ];
    return serializeWithAlpha(e, u, c, [
        new t.TokenNode([
            a.TokenType.Ident,
            "display-p3",
            -1,
            -1,
            {
                value: "display-p3"
            }
        ]),
        new t.WhitespaceNode([
            c
        ]),
        new t.TokenNode([
            a.TokenType.Number,
            l.toString(),
            -1,
            -1,
            {
                value: r[0],
                type: a.NumberType.Number
            }
        ]),
        new t.WhitespaceNode([
            c
        ]),
        new t.TokenNode([
            a.TokenType.Number,
            s.toString(),
            -1,
            -1,
            {
                value: r[1],
                type: a.NumberType.Number
            }
        ]),
        new t.WhitespaceNode([
            c
        ]),
        new t.TokenNode([
            a.TokenType.Number,
            i.toString(),
            -1,
            -1,
            {
                value: r[2],
                type: a.NumberType.Number
            }
        ])
    ]);
}, exports.serializeRGB = function serializeRGB(e, o = !0) {
    e.channels = convertPowerlessComponentsToZeroValuesForDisplay(e.channels, e.colorNotation);
    let r = e.channels.map((e)=>Number.isNaN(e) ? 0 : e);
    r = o ? XYZ_D50_to_sRGB_Gamut(colorData_to_XYZ_D50(e).channels) : n.XYZ_D50_to_sRGB(colorData_to_XYZ_D50(e).channels);
    const l = Math.min(255, Math.max(0, Math.round(255 * toPrecision(r[0])))), s = Math.min(255, Math.max(0, Math.round(255 * toPrecision(r[1])))), i = Math.min(255, Math.max(0, Math.round(255 * toPrecision(r[2])))), u = [
        a.TokenType.CloseParen,
        ")",
        -1,
        -1,
        void 0
    ], c = [
        a.TokenType.Whitespace,
        " ",
        -1,
        -1,
        void 0
    ], p = [
        a.TokenType.Comma,
        ",",
        -1,
        -1,
        void 0
    ], N = [
        new t.TokenNode([
            a.TokenType.Number,
            l.toString(),
            -1,
            -1,
            {
                value: Math.min(255, 255 * Math.max(0, r[0])),
                type: a.NumberType.Integer
            }
        ]),
        new t.TokenNode(p),
        new t.WhitespaceNode([
            c
        ]),
        new t.TokenNode([
            a.TokenType.Number,
            s.toString(),
            -1,
            -1,
            {
                value: Math.min(255, 255 * Math.max(0, r[1])),
                type: a.NumberType.Integer
            }
        ]),
        new t.TokenNode(p),
        new t.WhitespaceNode([
            c
        ]),
        new t.TokenNode([
            a.TokenType.Number,
            i.toString(),
            -1,
            -1,
            {
                value: Math.min(255, 255 * Math.max(0, r[2])),
                type: a.NumberType.Integer
            }
        ])
    ];
    if ("number" == typeof e.alpha) {
        const o = Math.min(1, Math.max(0, toPrecision(Number.isNaN(e.alpha) ? 0 : e.alpha)));
        return 1 === toPrecision(o, 4) ? new t.FunctionNode([
            a.TokenType.Function,
            "rgb(",
            -1,
            -1,
            {
                value: "rgb"
            }
        ], u, N) : new t.FunctionNode([
            a.TokenType.Function,
            "rgba(",
            -1,
            -1,
            {
                value: "rgba"
            }
        ], u, [
            ...N,
            new t.TokenNode(p),
            new t.WhitespaceNode([
                c
            ]),
            new t.TokenNode([
                a.TokenType.Number,
                toPrecision(o, 4).toString(),
                -1,
                -1,
                {
                    value: e.alpha,
                    type: a.NumberType.Number
                }
            ])
        ]);
    }
    return new t.FunctionNode([
        a.TokenType.Function,
        "rgba(",
        -1,
        -1,
        {
            value: "rgba"
        }
    ], u, [
        ...N,
        new t.TokenNode(p),
        new t.WhitespaceNode([
            c
        ]),
        e.alpha
    ]);
};
}),
"[project]/frontend/node_modules/.pnpm/symbol-tree@3.2.4/node_modules/symbol-tree/lib/SymbolTreeNode.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = class SymbolTreeNode {
    constructor(){
        this.parent = null;
        this.previousSibling = null;
        this.nextSibling = null;
        this.firstChild = null;
        this.lastChild = null;
        /** This value is incremented anytime a children is added or removed */ this.childrenVersion = 0;
        /** The last child object which has a cached index */ this.childIndexCachedUpTo = null;
        /** This value represents the cached node index, as long as
                 * cachedIndexVersion matches with the childrenVersion of the parent */ this.cachedIndex = -1;
        this.cachedIndexVersion = NaN; // NaN is never equal to anything
    }
    get isAttached() {
        return Boolean(this.parent || this.previousSibling || this.nextSibling);
    }
    get hasChildren() {
        return Boolean(this.firstChild);
    }
    childrenChanged() {
        /* jshint -W016 */ // integer wrap around
        this.childrenVersion = this.childrenVersion + 1 & 0xFFFFFFFF;
        this.childIndexCachedUpTo = null;
    }
    getCachedIndex(parentNode) {
        // (assumes parentNode is actually the parent)
        if (this.cachedIndexVersion !== parentNode.childrenVersion) {
            this.cachedIndexVersion = NaN;
            // cachedIndex is no longer valid
            return -1;
        }
        return this.cachedIndex; // -1 if not cached
    }
    setCachedIndex(parentNode, index) {
        // (assumes parentNode is actually the parent)
        this.cachedIndexVersion = parentNode.childrenVersion;
        this.cachedIndex = index;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/symbol-tree@3.2.4/node_modules/symbol-tree/lib/TreePosition.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable sort-keys */ module.exports = Object.freeze({
    // same as DOM DOCUMENT_POSITION_
    DISCONNECTED: 1,
    PRECEDING: 2,
    FOLLOWING: 4,
    CONTAINS: 8,
    CONTAINED_BY: 16
});
}),
"[project]/frontend/node_modules/.pnpm/symbol-tree@3.2.4/node_modules/symbol-tree/lib/TreeIterator.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const TREE = Symbol();
const ROOT = Symbol();
const NEXT = Symbol();
const ITERATE_FUNC = Symbol();
class TreeIterator {
    constructor(tree, root, firstResult, iterateFunction){
        this[TREE] = tree;
        this[ROOT] = root;
        this[NEXT] = firstResult;
        this[ITERATE_FUNC] = iterateFunction;
    }
    next() {
        const tree = this[TREE];
        const iterateFunc = this[ITERATE_FUNC];
        const root = this[ROOT];
        if (!this[NEXT]) {
            return {
                done: true,
                value: root
            };
        }
        const value = this[NEXT];
        if (iterateFunc === 1) {
            this[NEXT] = tree._node(value).previousSibling;
        } else if (iterateFunc === 2) {
            this[NEXT] = tree._node(value).nextSibling;
        } else if (iterateFunc === 3) {
            this[NEXT] = tree._node(value).parent;
        } else if (iterateFunc === 4) {
            this[NEXT] = tree.preceding(value, {
                root: root
            });
        } else /* if (iterateFunc === 5)*/ {
            this[NEXT] = tree.following(value, {
                root: root
            });
        }
        return {
            done: false,
            value: value
        };
    }
}
Object.defineProperty(TreeIterator.prototype, Symbol.iterator, {
    value: function() {
        return this;
    },
    writable: false
});
TreeIterator.PREV = 1;
TreeIterator.NEXT = 2;
TreeIterator.PARENT = 3;
TreeIterator.PRECEDING = 4;
TreeIterator.FOLLOWING = 5;
Object.freeze(TreeIterator);
Object.freeze(TreeIterator.prototype);
module.exports = TreeIterator;
}),
"[project]/frontend/node_modules/.pnpm/symbol-tree@3.2.4/node_modules/symbol-tree/lib/SymbolTree.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @module symbol-tree
 * @author Joris van der Wel <joris@jorisvanderwel.com>
 */ const SymbolTreeNode = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/symbol-tree@3.2.4/node_modules/symbol-tree/lib/SymbolTreeNode.js [app-ssr] (ecmascript)");
const TreePosition = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/symbol-tree@3.2.4/node_modules/symbol-tree/lib/TreePosition.js [app-ssr] (ecmascript)");
const TreeIterator = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/symbol-tree@3.2.4/node_modules/symbol-tree/lib/TreeIterator.js [app-ssr] (ecmascript)");
function returnTrue() {
    return true;
}
function reverseArrayIndex(array, reverseIndex) {
    return array[array.length - 1 - reverseIndex]; // no need to check `index >= 0`
}
class SymbolTree {
    /**
         * @constructor
         * @alias module:symbol-tree
         * @param {string} [description='SymbolTree data'] Description used for the Symbol
         */ constructor(description){
        this.symbol = Symbol(description || 'SymbolTree data');
    }
    /**
         * You can use this function to (optionally) initialize an object right after its creation,
         * to take advantage of V8's fast properties. Also useful if you would like to
         * freeze your object.
         *
         * `O(1)`
         *
         * @method
         * @alias module:symbol-tree#initialize
         * @param {Object} object
         * @return {Object} object
         */ initialize(object) {
        this._node(object);
        return object;
    }
    _node(object) {
        if (!object) {
            return null;
        }
        const node = object[this.symbol];
        if (node) {
            return node;
        }
        return object[this.symbol] = new SymbolTreeNode();
    }
    /**
         * Returns `true` if the object has any children. Otherwise it returns `false`.
         *
         * * `O(1)`
         *
         * @method hasChildren
         * @memberOf module:symbol-tree#
         * @param {Object} object
         * @return {Boolean}
         */ hasChildren(object) {
        return this._node(object).hasChildren;
    }
    /**
         * Returns the first child of the given object.
         *
         * * `O(1)`
         *
         * @method firstChild
         * @memberOf module:symbol-tree#
         * @param {Object} object
         * @return {Object}
         */ firstChild(object) {
        return this._node(object).firstChild;
    }
    /**
         * Returns the last child of the given object.
         *
         * * `O(1)`
         *
         * @method lastChild
         * @memberOf module:symbol-tree#
         * @param {Object} object
         * @return {Object}
         */ lastChild(object) {
        return this._node(object).lastChild;
    }
    /**
         * Returns the previous sibling of the given object.
         *
         * * `O(1)`
         *
         * @method previousSibling
         * @memberOf module:symbol-tree#
         * @param {Object} object
         * @return {Object}
         */ previousSibling(object) {
        return this._node(object).previousSibling;
    }
    /**
         * Returns the next sibling of the given object.
         *
         * * `O(1)`
         *
         * @method nextSibling
         * @memberOf module:symbol-tree#
         * @param {Object} object
         * @return {Object}
         */ nextSibling(object) {
        return this._node(object).nextSibling;
    }
    /**
         * Return the parent of the given object.
         *
         * * `O(1)`
         *
         * @method parent
         * @memberOf module:symbol-tree#
         * @param {Object} object
         * @return {Object}
         */ parent(object) {
        return this._node(object).parent;
    }
    /**
         * Find the inclusive descendant that is last in tree order of the given object.
         *
         * * `O(n)` (worst case) where `n` is the depth of the subtree of `object`
         *
         * @method lastInclusiveDescendant
         * @memberOf module:symbol-tree#
         * @param {Object} object
         * @return {Object}
         */ lastInclusiveDescendant(object) {
        let lastChild;
        let current = object;
        while(lastChild = this._node(current).lastChild){
            current = lastChild;
        }
        return current;
    }
    /**
         * Find the preceding object (A) of the given object (B).
         * An object A is preceding an object B if A and B are in the same tree
         * and A comes before B in tree order.
         *
         * * `O(n)` (worst case)
         * * `O(1)` (amortized when walking the entire tree)
         *
         * @method preceding
         * @memberOf module:symbol-tree#
         * @param {Object} object
         * @param {Object} [options]
         * @param {Object} [options.root] If set, `root` must be an inclusive ancestor
         *        of the return value (or else null is returned). This check _assumes_
         *        that `root` is also an inclusive ancestor of the given `object`
         * @return {?Object}
         */ preceding(object, options) {
        const treeRoot = options && options.root;
        if (object === treeRoot) {
            return null;
        }
        const previousSibling = this._node(object).previousSibling;
        if (previousSibling) {
            return this.lastInclusiveDescendant(previousSibling);
        }
        // if there is no previous sibling return the parent (might be null)
        return this._node(object).parent;
    }
    /**
         * Find the following object (A) of the given object (B).
         * An object A is following an object B if A and B are in the same tree
         * and A comes after B in tree order.
         *
         * * `O(n)` (worst case) where `n` is the amount of objects in the entire tree
         * * `O(1)` (amortized when walking the entire tree)
         *
         * @method following
         * @memberOf module:symbol-tree#
         * @param {!Object} object
         * @param {Object} [options]
         * @param {Object} [options.root] If set, `root` must be an inclusive ancestor
         *        of the return value (or else null is returned). This check _assumes_
         *        that `root` is also an inclusive ancestor of the given `object`
         * @param {Boolean} [options.skipChildren=false] If set, ignore the children of `object`
         * @return {?Object}
         */ following(object, options) {
        const treeRoot = options && options.root;
        const skipChildren = options && options.skipChildren;
        const firstChild = !skipChildren && this._node(object).firstChild;
        if (firstChild) {
            return firstChild;
        }
        let current = object;
        do {
            if (current === treeRoot) {
                return null;
            }
            const nextSibling = this._node(current).nextSibling;
            if (nextSibling) {
                return nextSibling;
            }
            current = this._node(current).parent;
        }while (current)
        return null;
    }
    /**
         * Append all children of the given object to an array.
         *
         * * `O(n)` where `n` is the amount of children of the given `parent`
         *
         * @method childrenToArray
         * @memberOf module:symbol-tree#
         * @param {Object} parent
         * @param {Object} [options]
         * @param {Object[]} [options.array=[]]
         * @param {Function} [options.filter] Function to test each object before it is added to the array.
         *                            Invoked with arguments (object). Should return `true` if an object
         *                            is to be included.
         * @param {*} [options.thisArg] Value to use as `this` when executing `filter`.
         * @return {Object[]}
         */ childrenToArray(parent, options) {
        const array = options && options.array || [];
        const filter = options && options.filter || returnTrue;
        const thisArg = options && options.thisArg || undefined;
        const parentNode = this._node(parent);
        let object = parentNode.firstChild;
        let index = 0;
        while(object){
            const node = this._node(object);
            node.setCachedIndex(parentNode, index);
            if (filter.call(thisArg, object)) {
                array.push(object);
            }
            object = node.nextSibling;
            ++index;
        }
        return array;
    }
    /**
         * Append all inclusive ancestors of the given object to an array.
         *
         * * `O(n)` where `n` is the amount of ancestors of the given `object`
         *
         * @method ancestorsToArray
         * @memberOf module:symbol-tree#
         * @param {Object} object
         * @param {Object} [options]
         * @param {Object[]} [options.array=[]]
         * @param {Function} [options.filter] Function to test each object before it is added to the array.
         *                            Invoked with arguments (object). Should return `true` if an object
         *                            is to be included.
         * @param {*} [options.thisArg] Value to use as `this` when executing `filter`.
         * @return {Object[]}
         */ ancestorsToArray(object, options) {
        const array = options && options.array || [];
        const filter = options && options.filter || returnTrue;
        const thisArg = options && options.thisArg || undefined;
        let ancestor = object;
        while(ancestor){
            if (filter.call(thisArg, ancestor)) {
                array.push(ancestor);
            }
            ancestor = this._node(ancestor).parent;
        }
        return array;
    }
    /**
         * Append all descendants of the given object to an array (in tree order).
         *
         * * `O(n)` where `n` is the amount of objects in the sub-tree of the given `object`
         *
         * @method treeToArray
         * @memberOf module:symbol-tree#
         * @param {Object} root
         * @param {Object} [options]
         * @param {Object[]} [options.array=[]]
         * @param {Function} [options.filter] Function to test each object before it is added to the array.
         *                            Invoked with arguments (object). Should return `true` if an object
         *                            is to be included.
         * @param {*} [options.thisArg] Value to use as `this` when executing `filter`.
         * @return {Object[]}
         */ treeToArray(root, options) {
        const array = options && options.array || [];
        const filter = options && options.filter || returnTrue;
        const thisArg = options && options.thisArg || undefined;
        let object = root;
        while(object){
            if (filter.call(thisArg, object)) {
                array.push(object);
            }
            object = this.following(object, {
                root: root
            });
        }
        return array;
    }
    /**
         * Iterate over all children of the given object
         *
         * * `O(1)` for a single iteration
         *
         * @method childrenIterator
         * @memberOf module:symbol-tree#
         * @param {Object} parent
         * @param {Object} [options]
         * @param {Boolean} [options.reverse=false]
         * @return {Object} An iterable iterator (ES6)
         */ childrenIterator(parent, options) {
        const reverse = options && options.reverse;
        const parentNode = this._node(parent);
        return new TreeIterator(this, parent, reverse ? parentNode.lastChild : parentNode.firstChild, reverse ? TreeIterator.PREV : TreeIterator.NEXT);
    }
    /**
         * Iterate over all the previous siblings of the given object. (in reverse tree order)
         *
         * * `O(1)` for a single iteration
         *
         * @method previousSiblingsIterator
         * @memberOf module:symbol-tree#
         * @param {Object} object
         * @return {Object} An iterable iterator (ES6)
         */ previousSiblingsIterator(object) {
        return new TreeIterator(this, object, this._node(object).previousSibling, TreeIterator.PREV);
    }
    /**
         * Iterate over all the next siblings of the given object. (in tree order)
         *
         * * `O(1)` for a single iteration
         *
         * @method nextSiblingsIterator
         * @memberOf module:symbol-tree#
         * @param {Object} object
         * @return {Object} An iterable iterator (ES6)
         */ nextSiblingsIterator(object) {
        return new TreeIterator(this, object, this._node(object).nextSibling, TreeIterator.NEXT);
    }
    /**
         * Iterate over all inclusive ancestors of the given object
         *
         * * `O(1)` for a single iteration
         *
         * @method ancestorsIterator
         * @memberOf module:symbol-tree#
         * @param {Object} object
         * @return {Object} An iterable iterator (ES6)
         */ ancestorsIterator(object) {
        return new TreeIterator(this, object, object, TreeIterator.PARENT);
    }
    /**
         * Iterate over all descendants of the given object (in tree order).
         *
         * Where `n` is the amount of objects in the sub-tree of the given `root`:
         *
         * * `O(n)` (worst case for a single iteration)
         * * `O(n)` (amortized, when completing the iterator)
         *
         * @method treeIterator
         * @memberOf module:symbol-tree#
         * @param {Object} root
         * @param {Object} options
         * @param {Boolean} [options.reverse=false]
         * @return {Object} An iterable iterator (ES6)
         */ treeIterator(root, options) {
        const reverse = options && options.reverse;
        return new TreeIterator(this, root, reverse ? this.lastInclusiveDescendant(root) : root, reverse ? TreeIterator.PRECEDING : TreeIterator.FOLLOWING);
    }
    /**
         * Find the index of the given object (the number of preceding siblings).
         *
         * * `O(n)` where `n` is the amount of preceding siblings
         * * `O(1)` (amortized, if the tree is not modified)
         *
         * @method index
         * @memberOf module:symbol-tree#
         * @param {Object} child
         * @return {Number} The number of preceding siblings, or -1 if the object has no parent
         */ index(child) {
        const childNode = this._node(child);
        const parentNode = this._node(childNode.parent);
        if (!parentNode) {
            // In principal, you could also find out the number of preceding siblings
            // for objects that do not have a parent. This method limits itself only to
            // objects that have a parent because that lets us optimize more.
            return -1;
        }
        let currentIndex = childNode.getCachedIndex(parentNode);
        if (currentIndex >= 0) {
            return currentIndex;
        }
        currentIndex = 0;
        let object = parentNode.firstChild;
        if (parentNode.childIndexCachedUpTo) {
            const cachedUpToNode = this._node(parentNode.childIndexCachedUpTo);
            object = cachedUpToNode.nextSibling;
            currentIndex = cachedUpToNode.getCachedIndex(parentNode) + 1;
        }
        while(object){
            const node = this._node(object);
            node.setCachedIndex(parentNode, currentIndex);
            if (object === child) {
                break;
            }
            ++currentIndex;
            object = node.nextSibling;
        }
        parentNode.childIndexCachedUpTo = child;
        return currentIndex;
    }
    /**
         * Calculate the number of children.
         *
         * * `O(n)` where `n` is the amount of children
         * * `O(1)` (amortized, if the tree is not modified)
         *
         * @method childrenCount
         * @memberOf module:symbol-tree#
         * @param {Object} parent
         * @return {Number}
         */ childrenCount(parent) {
        const parentNode = this._node(parent);
        if (!parentNode.lastChild) {
            return 0;
        }
        return this.index(parentNode.lastChild) + 1;
    }
    /**
         * Compare the position of an object relative to another object. A bit set is returned:
         *
         * <ul>
         *     <li>DISCONNECTED : 1</li>
         *     <li>PRECEDING : 2</li>
         *     <li>FOLLOWING : 4</li>
         *     <li>CONTAINS : 8</li>
         *     <li>CONTAINED_BY : 16</li>
         * </ul>
         *
         * The semantics are the same as compareDocumentPosition in DOM, with the exception that
         * DISCONNECTED never occurs with any other bit.
         *
         * where `n` and `m` are the amount of ancestors of `left` and `right`;
         * where `o` is the amount of children of the lowest common ancestor of `left` and `right`:
         *
         * * `O(n + m + o)` (worst case)
         * * `O(n + m)` (amortized, if the tree is not modified)
         *
         * @method compareTreePosition
         * @memberOf module:symbol-tree#
         * @param {Object} left
         * @param {Object} right
         * @return {Number}
         */ compareTreePosition(left, right) {
        // In DOM terms:
        // left = reference / context object
        // right = other
        if (left === right) {
            return 0;
        }
        /* jshint -W016 */ const leftAncestors = [];
        {
            let leftAncestor = left;
            while(leftAncestor){
                if (leftAncestor === right) {
                    return TreePosition.CONTAINS | TreePosition.PRECEDING;
                // other is ancestor of reference
                }
                leftAncestors.push(leftAncestor);
                leftAncestor = this.parent(leftAncestor);
            }
        }
        const rightAncestors = [];
        {
            let rightAncestor = right;
            while(rightAncestor){
                if (rightAncestor === left) {
                    return TreePosition.CONTAINED_BY | TreePosition.FOLLOWING;
                }
                rightAncestors.push(rightAncestor);
                rightAncestor = this.parent(rightAncestor);
            }
        }
        const root = reverseArrayIndex(leftAncestors, 0);
        if (!root || root !== reverseArrayIndex(rightAncestors, 0)) {
            // note: unlike DOM, preceding / following is not set here
            return TreePosition.DISCONNECTED;
        }
        // find the lowest common ancestor
        let commonAncestorIndex = 0;
        const ancestorsMinLength = Math.min(leftAncestors.length, rightAncestors.length);
        for(let i = 0; i < ancestorsMinLength; ++i){
            const leftAncestor = reverseArrayIndex(leftAncestors, i);
            const rightAncestor = reverseArrayIndex(rightAncestors, i);
            if (leftAncestor !== rightAncestor) {
                break;
            }
            commonAncestorIndex = i;
        }
        // indexes within the common ancestor
        const leftIndex = this.index(reverseArrayIndex(leftAncestors, commonAncestorIndex + 1));
        const rightIndex = this.index(reverseArrayIndex(rightAncestors, commonAncestorIndex + 1));
        return rightIndex < leftIndex ? TreePosition.PRECEDING : TreePosition.FOLLOWING;
    }
    /**
         * Remove the object from this tree.
         * Has no effect if already removed.
         *
         * * `O(1)`
         *
         * @method remove
         * @memberOf module:symbol-tree#
         * @param {Object} removeObject
         * @return {Object} removeObject
         */ remove(removeObject) {
        const removeNode = this._node(removeObject);
        const parentNode = this._node(removeNode.parent);
        const prevNode = this._node(removeNode.previousSibling);
        const nextNode = this._node(removeNode.nextSibling);
        if (parentNode) {
            if (parentNode.firstChild === removeObject) {
                parentNode.firstChild = removeNode.nextSibling;
            }
            if (parentNode.lastChild === removeObject) {
                parentNode.lastChild = removeNode.previousSibling;
            }
        }
        if (prevNode) {
            prevNode.nextSibling = removeNode.nextSibling;
        }
        if (nextNode) {
            nextNode.previousSibling = removeNode.previousSibling;
        }
        removeNode.parent = null;
        removeNode.previousSibling = null;
        removeNode.nextSibling = null;
        removeNode.cachedIndex = -1;
        removeNode.cachedIndexVersion = NaN;
        if (parentNode) {
            parentNode.childrenChanged();
        }
        return removeObject;
    }
    /**
         * Insert the given object before the reference object.
         * `newObject` is now the previous sibling of `referenceObject`.
         *
         * * `O(1)`
         *
         * @method insertBefore
         * @memberOf module:symbol-tree#
         * @param {Object} referenceObject
         * @param {Object} newObject
         * @throws {Error} If the newObject is already present in this SymbolTree
         * @return {Object} newObject
         */ insertBefore(referenceObject, newObject) {
        const referenceNode = this._node(referenceObject);
        const prevNode = this._node(referenceNode.previousSibling);
        const newNode = this._node(newObject);
        const parentNode = this._node(referenceNode.parent);
        if (newNode.isAttached) {
            throw Error('Given object is already present in this SymbolTree, remove it first');
        }
        newNode.parent = referenceNode.parent;
        newNode.previousSibling = referenceNode.previousSibling;
        newNode.nextSibling = referenceObject;
        referenceNode.previousSibling = newObject;
        if (prevNode) {
            prevNode.nextSibling = newObject;
        }
        if (parentNode && parentNode.firstChild === referenceObject) {
            parentNode.firstChild = newObject;
        }
        if (parentNode) {
            parentNode.childrenChanged();
        }
        return newObject;
    }
    /**
         * Insert the given object after the reference object.
         * `newObject` is now the next sibling of `referenceObject`.
         *
         * * `O(1)`
         *
         * @method insertAfter
         * @memberOf module:symbol-tree#
         * @param {Object} referenceObject
         * @param {Object} newObject
         * @throws {Error} If the newObject is already present in this SymbolTree
         * @return {Object} newObject
         */ insertAfter(referenceObject, newObject) {
        const referenceNode = this._node(referenceObject);
        const nextNode = this._node(referenceNode.nextSibling);
        const newNode = this._node(newObject);
        const parentNode = this._node(referenceNode.parent);
        if (newNode.isAttached) {
            throw Error('Given object is already present in this SymbolTree, remove it first');
        }
        newNode.parent = referenceNode.parent;
        newNode.previousSibling = referenceObject;
        newNode.nextSibling = referenceNode.nextSibling;
        referenceNode.nextSibling = newObject;
        if (nextNode) {
            nextNode.previousSibling = newObject;
        }
        if (parentNode && parentNode.lastChild === referenceObject) {
            parentNode.lastChild = newObject;
        }
        if (parentNode) {
            parentNode.childrenChanged();
        }
        return newObject;
    }
    /**
         * Insert the given object as the first child of the given reference object.
         * `newObject` is now the first child of `referenceObject`.
         *
         * * `O(1)`
         *
         * @method prependChild
         * @memberOf module:symbol-tree#
         * @param {Object} referenceObject
         * @param {Object} newObject
         * @throws {Error} If the newObject is already present in this SymbolTree
         * @return {Object} newObject
         */ prependChild(referenceObject, newObject) {
        const referenceNode = this._node(referenceObject);
        const newNode = this._node(newObject);
        if (newNode.isAttached) {
            throw Error('Given object is already present in this SymbolTree, remove it first');
        }
        if (referenceNode.hasChildren) {
            this.insertBefore(referenceNode.firstChild, newObject);
        } else {
            newNode.parent = referenceObject;
            referenceNode.firstChild = newObject;
            referenceNode.lastChild = newObject;
            referenceNode.childrenChanged();
        }
        return newObject;
    }
    /**
         * Insert the given object as the last child of the given reference object.
         * `newObject` is now the last child of `referenceObject`.
         *
         * * `O(1)`
         *
         * @method appendChild
         * @memberOf module:symbol-tree#
         * @param {Object} referenceObject
         * @param {Object} newObject
         * @throws {Error} If the newObject is already present in this SymbolTree
         * @return {Object} newObject
         */ appendChild(referenceObject, newObject) {
        const referenceNode = this._node(referenceObject);
        const newNode = this._node(newObject);
        if (newNode.isAttached) {
            throw Error('Given object is already present in this SymbolTree, remove it first');
        }
        if (referenceNode.hasChildren) {
            this.insertAfter(referenceNode.lastChild, newObject);
        } else {
            newNode.parent = referenceObject;
            referenceNode.firstChild = newObject;
            referenceNode.lastChild = newObject;
            referenceNode.childrenChanged();
        }
        return newObject;
    }
}
module.exports = SymbolTree;
SymbolTree.TreePosition = TreePosition;
}),
"[project]/frontend/node_modules/.pnpm/is-potential-custom-element-name@1.0.1/node_modules/is-potential-custom-element-name/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Generated using `npm run build`. Do not edit.
var regex = /^[a-z](?:[\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*-(?:[\x2D\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
var isPotentialCustomElementName = function(string) {
    return regex.test(string);
};
module.exports = isPotentialCustomElementName;
}),
"[project]/frontend/node_modules/.pnpm/xml-name-validator@5.0.0/node_modules/xml-name-validator/lib/xml-name-validator.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.name = (potentialName)=>{
    return /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/u.test(potentialName);
};
exports.qname = (potentialQname)=>{
    return /(?:^[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}][A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*:[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}][A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$)|(?:^[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}][A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$)/u.test(potentialQname);
};
}),
"[project]/frontend/node_modules/.pnpm/nwsapi@2.2.22/node_modules/nwsapi/src/nwsapi.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*
 * Copyright (C) 2007-2025 Diego Perini
 * All rights reserved.
 *
 * nwsapi.js - Fast CSS Selectors API Engine
 *
 * Author: Diego Perini <diego.perini at gmail com>
 * Version: 2.2.22
 * Created: 20070722
 * Release: 20250901
 *
 * License:
 *  https://javascript.nwbox.com/nwsapi/MIT-LICENSE
 * Download:
 *  https://javascript.nwbox.com/nwsapi/nwsapi.js
 */ (function Export(global, factory) {
    'use strict';
    if ("TURBOPACK compile-time truthy", 1) {
        module.exports = factory;
    } else //TURBOPACK unreachable
    ;
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function Factory(global, Export) {
    var version = 'nwsapi-2.2.22', doc = global.document, root = doc.documentElement, slice = Array.prototype.slice, HSP = '[\\x20\\t]', VSP = '[\\r\\n\\f]', WSP = '[\\x20\\t\\r\\n\\f]', CFG = {
        // extensions
        operators: '[~*^$|]=|=',
        combinators: '[\\x20\\t>+~](?=[^>+~])'
    }, HAS = {
        nestedself: ':has\\x28(?::has\\x28|.*)\\x29)\\x29'
    }, NOT = {
        // not enclosed in double/single/parens/square
        double_enc: '(?=(?:[^"]*["][^"]*["])*[^"]*$)',
        single_enc: "(?=(?:[^']*['][^']*['])*[^']*$)",
        parens_enc: '(?![^\\x28]*\\x29)',
        square_enc: '(?![^\\x5b]*\\x5d)'
    }, REX = {
        // regular expressions
        HasEscapes: RegExp('\\\\'),
        HexNumbers: RegExp('^[0-9a-fA-F]'),
        EscOrQuote: RegExp('^\\\\|[\\x22\\x27]'),
        RegExpChar: RegExp('(?!\\\\)[\\\\^$.,*+?()[\\]{}|\\/]', 'g'),
        TrimSpaces: RegExp('^' + WSP + '+|' + WSP + '+$|' + VSP, 'g'),
        SplitGroup: RegExp('(\\([^)]*\\)|\\[[^[]*\\]|\\\\.|[^,])+', 'g'),
        CommaGroup: RegExp('(\\s*,\\s*)' + NOT.square_enc + NOT.parens_enc, 'g'),
        FixEscapes: RegExp('\\\\([0-9a-fA-F]{1,6}' + WSP + '?|.)|([\\x22\\x27])', 'g'),
        CombineWSP: RegExp('[\\n\\r\\f\\x20]+' + NOT.single_enc + NOT.double_enc, 'g'),
        TabCharWSP: RegExp('(\\x20?\\t+\\x20?)' + NOT.single_enc + NOT.double_enc, 'g'),
        PseudosWSP: RegExp('\\s+([-+])\\s+' + NOT.square_enc, 'g')
    }, STD = {
        combinator: RegExp('\\s?([>+~])\\s?', 'g'),
        apimethods: RegExp('^(?:\\w+|\\*)\\|'),
        namespaces: RegExp('(\\*|\\w+)\\|[\\w-]+')
    }, GROUPS = {
        // pseudo-classes requiring parameters
        linguistic: '(dir|lang)(?:\\x28\\s?([-\\w]{2,})\\s?\\x29)',
        logicalsel: '(is|where|matches|not|has)(?:\\x28\\s?(' + '[^()]*|.*' + ')\\s?\\x29)',
        treestruct: '(nth(?:-last)?(?:-child|-of\\-type))(?:\\x28\\s?(even|odd|(?:[-+]?\\d*)(?:n\\s?[-+]?\\s?\\d*)?)\\s?\\x29)',
        // pseudo-classes not requiring parameters
        locationpc: '(any\\-link|link|visited|target|defined)\\b',
        useraction: '(hover|active|focus\\-within|focus\\-visible|focus)\\b',
        structural: '(scope|root|empty|(?:(?:first|last|only)(?:-child|\\-of\\-type)))\\b',
        inputstate: '(enabled|disabled|read\\-only|read\\-write|placeholder\\-shown|default)\\b',
        inputvalue: '(checked|indeterminate|required|optional|valid|invalid|in\\-range|out\\-of\\-range)\\b',
        // pseudo-classes not requiring parameters and describing functional state
        rsrc_state: '(playing|paused|seeking|buffering|stalled|muted|volume-locked)\\b',
        disp_state: '(open|closed|modal|fullscreen|picture-in-picture)\\b',
        time_state: '(current|past|future)\\b',
        // pseudo-classes for parsing only selectors
        pseudo_nop: '(autofill|-webkit\\-autofill)\\b',
        // pseudo-elements starting with single colon (:)
        pseudo_sng: '(after|before|first\\-letter|first\\-line)\\b',
        // pseudo-elements starting with double colon (::)
        pseudo_dbl: ':(after|before|first\\-letter|first\\-line|selection|placeholder|-webkit-[-a-zA-Z0-9]{2,})\\b'
    }, Patterns = {
        // pseudo-classes
        treestruct: RegExp('^:(?:' + GROUPS.treestruct + ')(.*)', 'i'),
        structural: RegExp('^:(?:' + GROUPS.structural + ')(.*)', 'i'),
        linguistic: RegExp('^:(?:' + GROUPS.linguistic + ')(.*)', 'i'),
        useraction: RegExp('^:(?:' + GROUPS.useraction + ')(.*)', 'i'),
        inputstate: RegExp('^:(?:' + GROUPS.inputstate + ')(.*)', 'i'),
        inputvalue: RegExp('^:(?:' + GROUPS.inputvalue + ')(.*)', 'i'),
        rsrc_state: RegExp('^:(?:' + GROUPS.rsrc_state + ')(.*)', 'i'),
        disp_state: RegExp('^:(?:' + GROUPS.disp_state + ')(.*)', 'i'),
        time_state: RegExp('^:(?:' + GROUPS.time_state + ')(.*)', 'i'),
        locationpc: RegExp('^:(?:' + GROUPS.locationpc + ')(.*)', 'i'),
        logicalsel: RegExp('^:(?:' + GROUPS.logicalsel + ')(.*)', 'i'),
        pseudo_nop: RegExp('^:(?:' + GROUPS.pseudo_nop + ')(.*)', 'i'),
        pseudo_sng: RegExp('^:(?:' + GROUPS.pseudo_sng + ')(.*)', 'i'),
        pseudo_dbl: RegExp('^:(?:' + GROUPS.pseudo_dbl + ')(.*)', 'i'),
        // combinator symbols
        children: RegExp('^' + WSP + '?\\>' + WSP + '?(.*)'),
        adjacent: RegExp('^' + WSP + '?\\+' + WSP + '?(.*)'),
        relative: RegExp('^' + WSP + '?\\~' + WSP + '?(.*)'),
        ancestor: RegExp('^' + WSP + '+(.*)'),
        // universal & namespace
        universal: RegExp('^(\\*)(.*)'),
        namespace: RegExp('^(\\*|[\\w-]+)?\\|(.*)')
    }, // regexp to better aproximate detection of RTL languages (Arabic)
    RTL = RegExp('^(?:[\\u0627-\\u064a]|[\\u0591-\\u08ff]|[\\ufb1d-\\ufdfd]|[\\ufe70-\\ufefc])+$'), // emulate firefox error strings
    qsNotArgs = 'Not enough arguments', qsInvalid = ' is not a valid selector', // detect structural pseudo-classes in selectors
    reNthElem = RegExp('(:nth(?:-last)?-child)', 'i'), reNthType = RegExp('(:nth(?:-last)?-of-type)', 'i'), // placeholder for global regexp
    reOptimizer, reValidator, // special handling configuration flags
    Config = {
        IDS_DUPES: true,
        FORGIVING: true,
        NODE_LIST: false,
        LOGERRORS: true,
        USR_EVENT: true,
        VERBOSITY: true
    }, NAMESPACE, QUIRKS_MODE, HTML_DOCUMENT, ATTR_STD_OPS = {
        '=': 1,
        '^=': 1,
        '$=': 1,
        '|=': 1,
        '*=': 1,
        '~=': 1
    }, HTML_TABLE = {
        'accept': 1,
        'accept-charset': 1,
        'align': 1,
        'alink': 1,
        'axis': 1,
        'bgcolor': 1,
        'charset': 1,
        'checked': 1,
        'clear': 1,
        'codetype': 1,
        'color': 1,
        'compact': 1,
        'declare': 1,
        'defer': 1,
        'dir': 1,
        'direction': 1,
        'disabled': 1,
        'enctype': 1,
        'face': 1,
        'frame': 1,
        'hreflang': 1,
        'http-equiv': 1,
        'lang': 1,
        'language': 1,
        'link': 1,
        'media': 1,
        'method': 1,
        'multiple': 1,
        'nohref': 1,
        'noresize': 1,
        'noshade': 1,
        'nowrap': 1,
        'readonly': 1,
        'rel': 1,
        'rev': 1,
        'rules': 1,
        'scope': 1,
        'scrolling': 1,
        'selected': 1,
        'shape': 1,
        'target': 1,
        'text': 1,
        'type': 1,
        'valign': 1,
        'valuetype': 1,
        'vlink': 1
    }, Combinators = {}, Selectors = {}, Operators = {
        '=': {
            p1: '^',
            p2: '$',
            p3: 'true'
        },
        '^=': {
            p1: '^',
            p2: '',
            p3: 'true'
        },
        '$=': {
            p1: '',
            p2: '$',
            p3: 'true'
        },
        '*=': {
            p1: '',
            p2: '',
            p3: 'true'
        },
        '|=': {
            p1: '^',
            p2: '(-|$)',
            p3: 'true'
        },
        '~=': {
            p1: '(^|\\s)',
            p2: '(\\s|$)',
            p3: 'true'
        }
    }, concatCall = function(nodes, callback) {
        var i = 0, l = nodes.length, list = Array(l);
        while(l > i){
            if (false === callback(list[i] = nodes[i])) break;
            ++i;
        }
        return list;
    }, concatList = function(list, nodes) {
        var i = -1, l = nodes.length;
        while(l--){
            list[list.length] = nodes[++i];
        }
        return list;
    }, // only define the toNodeList helper if explicitly enabled in Config,
    // a safety measure for headless hosts missing feature/implementation
    toNodeList = Config.NODE_LIST == false ? function(x) {
        return x;
    } : function() {
        // create a DocumentFragment
        var emptyNL = doc.createDocumentFragment().childNodes;
        // this is returned from a self-executing function so that
        // the DocumentFragment isn't repeatedly created
        return function(nodeArray) {
            // check if it is already a nodelist
            if (isInstanceOf(nodeArray)) return nodeArray;
            // if it's a single element, wrap it in a classic array
            if (!Array.isArray(nodeArray)) nodeArray = [
                nodeArray
            ];
            // base an object on emptyNL
            var fakeNL = Object.create(emptyNL, {
                'length': {
                    value: nodeArray.length,
                    enumerable: false
                },
                'item': {
                    'value': function(i) {
                        return this[+i || 0];
                    },
                    enumerable: false
                }
            });
            // copy the array elemnts
            nodeArray.forEach(function(v, i) {
                fakeNL[i] = v;
            });
            // return an object pretending to be a NodeList.
            return fakeNL;
        };
    }(), isInstanceOf = function(nodes) {
        return nodes instanceof global.NodeList;
    }, documentOrder = function(a, b) {
        if (!hasDupes && a === b) {
            hasDupes = true;
            return 0;
        }
        return a.compareDocumentPosition(b) & 4 ? -1 : 1;
    }, hasDupes = false, unique = function(nodes) {
        var i = 0, j = -1, l = nodes.length + 1, list = [];
        while(--l){
            if (nodes[i++] === nodes[i]) continue;
            list[++j] = nodes[i - 1];
        }
        hasDupes = false;
        return list;
    }, switchContext = function(context, force) {
        var oldDoc = doc;
        doc = context.ownerDocument || context;
        if (force || oldDoc !== doc) {
            // force a new check for each document change
            // performed before the next select operation
            root = doc.documentElement;
            HTML_DOCUMENT = isHTML(doc);
            QUIRKS_MODE = HTML_DOCUMENT && doc.compatMode.indexOf('CSS') < 0;
            NAMESPACE = root && root.namespaceURI;
            Snapshot.doc = doc;
            Snapshot.root = root;
        }
        return Snapshot.from = context;
    }, // convert single codepoint to UTF-16 encoding
    codePointToUTF16 = function(codePoint) {
        // out of range, use replacement character
        if (codePoint < 1 || codePoint > 0x10ffff || codePoint > 0xd7ff && codePoint < 0xe000) {
            return '\\ufffd';
        }
        // javascript strings are UTF-16 encoded
        if (codePoint < 0x10000) {
            var lowHex = '000' + codePoint.toString(16);
            return '\\u' + lowHex.substr(lowHex.length - 4);
        }
        // supplementary high + low surrogates
        return '\\u' + ((codePoint - 0x10000 >> 0x0a) + 0xd800).toString(16) + '\\u' + ((codePoint - 0x10000) % 0x400 + 0xdc00).toString(16);
    }, // convert single codepoint to string
    stringFromCodePoint = function(codePoint) {
        // out of range, use replacement character
        if (codePoint < 1 || codePoint > 0x10ffff || codePoint > 0xd7ff && codePoint < 0xe000) {
            return '\ufffd';
        }
        if (codePoint < 0x10000) {
            return String.fromCharCode(codePoint);
        }
        return String.fromCodePoint ? String.fromCodePoint(codePoint) : String.fromCharCode((codePoint - 0x10000 >> 0x0a) + 0xd800, (codePoint - 0x10000) % 0x400 + 0xdc00);
    }, // convert escape sequence in a CSS string or identifier
    // to javascript string with javascript escape sequences
    convertEscapes = function(str) {
        return REX.HasEscapes.test(str) ? str.replace(REX.FixEscapes, function(substring, p1, p2) {
            // unescaped " or '
            return p2 ? '\\' + p2 : // javascript strings are UTF-16 encoded
            REX.HexNumbers.test(p1) ? codePointToUTF16(parseInt(p1, 16)) : // \' \"
            REX.EscOrQuote.test(p1) ? substring : // \g \h \. \# etc
            p1;
        }) : str;
    }, // convert escape sequence in a CSS string or identifier
    // to javascript string with characters representations
    unescapeIdentifier = function(str) {
        return REX.HasEscapes.test(str) ? str.replace(REX.FixEscapes, function(substring, p1, p2) {
            // unescaped " or '
            return p2 ? p2 : // javascript strings are UTF-16 encoded
            REX.HexNumbers.test(p1) ? stringFromCodePoint(parseInt(p1, 16)) : // \' \"
            REX.EscOrQuote.test(p1) ? substring : // \g \h \. \# etc
            p1;
        }) : str;
    }, method = {
        '#': 'getElementById',
        '*': 'getElementsByTagName',
        '|': 'getElementsByTagNameNS',
        '.': 'getElementsByClassName'
    }, compat = {
        '#': (c, n)=>(e, f)=>byId(n, c),
        '*': (c, n)=>(e, f)=>byTag(n, c),
        '|': (c, n)=>(e, f)=>byTagNS(n, c),
        '.': (c, n)=>(e, f)=>byClass(n, c)
    }, // find duplicate ids using iterative walk
    byIdRaw = function(id, context) {
        var node = context, nodes = [], next = node.firstElementChild;
        while(node = next){
            node.id == id && (nodes[nodes.length] = node);
            if (next = node.firstElementChild || node.nextElementSibling) continue;
            while(!next && (node = node.parentElement) && node !== context){
                next = node.nextElementSibling;
            }
        }
        return nodes;
    }, // context agnostic getElementById
    byId = function(id, context) {
        var e, i, l, nodes, api = method['#'];
        // duplicates id allowed
        if (Config.IDS_DUPES === false) {
            if (api in context) {
                return (e = context[api](id)) ? [
                    e
                ] : none;
            }
        } else {
            if ('all' in context) {
                if (e = context.all[id]) {
                    if (e.nodeType == 1) return e.getAttribute('id') != id ? [] : [
                        e
                    ];
                    else if (id == 'length') return (e = context[api](id)) ? [
                        e
                    ] : none;
                    for(i = 0, l = e.length, nodes = []; l > i; ++i){
                        if (e[i].id == id) nodes[nodes.length] = e[i];
                    }
                    return nodes && nodes.length ? nodes : [
                        nodes
                    ];
                } else return none;
            }
        }
        return byIdRaw(id, context);
    }, // wrapped up namespaced TagName api calls
    byTagNS = function(context, tag) {
        return byTag(tag, context);
    }, // context agnostic getElementsByTagName
    byTag = function(tag, context) {
        var e, nodes, api = method['*'];
        // DOCUMENT_NODE (9) & ELEMENT_NODE (1)
        if (api in context) {
            return slice.call(context[api](tag));
        } else {
            tag = tag.toLowerCase();
            // DOCUMENT_FRAGMENT_NODE (11)
            if (e = context.firstElementChild) {
                if (!(e.nextElementSibling || tag == '*' || e.localName == tag)) {
                    return slice.call(e[api](tag));
                } else {
                    nodes = [];
                    do {
                        if (tag == '*' || e.localName == tag) nodes[nodes.length] = e;
                        concatList(nodes, e[api](tag));
                    }while (e = e.nextElementSibling)
                }
            } else nodes = none;
        }
        return !Config.NODE_LIST ? nodes : isInstanceOf(nodes) ? nodes : toNodeList(nodes);
    }, // context agnostic getElementsByClassName
    byClass = function(cls, context) {
        var e, nodes, api = method['.'], reCls;
        // DOCUMENT_NODE (9) & ELEMENT_NODE (1)
        if (api in context) {
            return slice.call(context[api](cls));
        } else {
            // DOCUMENT_FRAGMENT_NODE (11)
            if (e = context.firstElementChild) {
                reCls = RegExp('(^|\\s)' + cls + '(\\s|$)', QUIRKS_MODE ? 'i' : '');
                if (!(e.nextElementSibling || reCls.test(e.className))) {
                    return slice.call(e[api](cls));
                } else {
                    nodes = [];
                    do {
                        if (reCls.test(e.className)) nodes[nodes.length] = e;
                        concatList(nodes, e[api](cls));
                    }while (e = e.nextElementSibling)
                }
            } else nodes = none;
        }
        return !Config.NODE_LIST ? nodes : isInstanceof(nodes) ? nodes : toNodeList(nodes);
    }, // namespace aware hasAttribute
    // helper for XML/XHTML documents
    hasAttributeNS = function(e, name) {
        var i, l, attr = e.getAttributeNames();
        name = RegExp(':?' + name + '$', HTML_DOCUMENT ? 'i' : '');
        for(i = 0, l = attr.length; l > i; ++i){
            if (name.test(attr[i])) return true;
        }
        return false;
    }, // fast resolver for the :nth-child() and :nth-last-child() pseudo-classes
    nthElement = function() {
        var idx = 0, len = 0, set = 0, parent = undefined, parents = Array(), nodes = Array();
        return function(element, dir) {
            // ensure caches are emptied after each run, invoking with dir = 2
            if (dir == 2) {
                idx = 0;
                len = 0;
                set = 0;
                nodes.length = 0;
                parents.length = 0;
                parent = undefined;
                return -1;
            }
            var e, i, j, k, l;
            if (parent === element.parentElement) {
                i = set;
                j = idx;
                l = len;
            } else {
                l = parents.length;
                parent = element.parentElement;
                for(i = -1, j = 0, k = l - 1; l > j; ++j, --k){
                    if (parents[j] === parent) {
                        i = j;
                        break;
                    }
                    if (parents[k] === parent) {
                        i = k;
                        break;
                    }
                }
                if (i < 0) {
                    parents[i = l] = parent;
                    l = 0;
                    nodes[i] = Array();
                    e = parent && parent.firstElementChild || element;
                    while(e){
                        nodes[i][l] = e;
                        if (e === element) j = l;
                        e = e.nextElementSibling;
                        ++l;
                    }
                    set = i;
                    idx = 0;
                    len = l;
                    if (l < 2) return l;
                } else {
                    l = nodes[i].length;
                    set = i;
                }
            }
            if (element !== nodes[i][j] && element !== nodes[i][j = 0]) {
                for(j = 0, e = nodes[i], k = l - 1; l > j; ++j, --k){
                    if (e[j] === element) {
                        break;
                    }
                    if (e[k] === element) {
                        j = k;
                        break;
                    }
                }
            }
            idx = j + 1;
            len = l;
            return dir ? l - j : idx;
        };
    }(), // fast resolver for the :nth-of-type() and :nth-last-of-type() pseudo-classes
    nthOfType = function() {
        var idx = 0, len = 0, set = 0, parent = undefined, parents = Array(), nodes = Array();
        return function(element, dir) {
            // ensure caches are emptied after each run, invoking with dir = 2
            if (dir == 2) {
                idx = 0;
                len = 0;
                set = 0;
                nodes.length = 0;
                parents.length = 0;
                parent = undefined;
                return -1;
            }
            var e, i, j, k, l, name = element.localName;
            if (nodes[set] && nodes[set][name] && parent === element.parentElement) {
                i = set;
                j = idx;
                l = len;
            } else {
                l = parents.length;
                parent = element.parentElement;
                for(i = -1, j = 0, k = l - 1; l > j; ++j, --k){
                    if (parents[j] === parent) {
                        i = j;
                        break;
                    }
                    if (parents[k] === parent) {
                        i = k;
                        break;
                    }
                }
                if (i < 0 || !nodes[i][name]) {
                    parents[i = l] = parent;
                    nodes[i] || (nodes[i] = Object());
                    l = 0;
                    nodes[i][name] = Array();
                    e = parent && parent.firstElementChild || element;
                    while(e){
                        if (e === element) j = l;
                        if (e.localName == name) {
                            nodes[i][name][l] = e;
                            ++l;
                        }
                        e = e.nextElementSibling;
                    }
                    set = i;
                    idx = j;
                    len = l;
                    if (l < 2) return l;
                } else {
                    l = nodes[i][name].length;
                    set = i;
                }
            }
            if (element !== nodes[i][name][j] && element !== nodes[i][name][j = 0]) {
                for(j = 0, e = nodes[i][name], k = l - 1; l > j; ++j, --k){
                    if (e[j] === element) {
                        break;
                    }
                    if (e[k] === element) {
                        j = k;
                        break;
                    }
                }
            }
            idx = j + 1;
            len = l;
            return dir ? l - j : idx;
        };
    }(), // check if the document type is HTML
    isHTML = function(node) {
        var doc = node.ownerDocument || node;
        return doc.nodeType == 9 && // contentType not in IE <= 11
        'contentType' in doc ? doc.contentType.indexOf('/html') > 0 : doc.createElement('DiV').localName == 'div';
    }, // return node if node is focusable
    // or false if node isn't focusable
    isFocusable = function(node) {
        var doc = node.ownerDocument;
        if (node.contentDocument && node.localName == 'iframe') {
            return false;
        }
        if (doc.hasFocus() && node === doc.activeElement) {
            if (node.type || node.href || typeof node.tabIndex == 'number') {
                return node;
            }
        }
        return false;
    }, // check if node content is editable
    isContentEditable = function(node) {
        var attrValue = 'inherit';
        if (node.hasAttribute('contenteditable')) {
            attrValue = node.getAttribute('contenteditable');
        }
        switch(attrValue){
            case '':
            case 'plaintext-only':
            case 'true':
                return true;
            case 'false':
                return false;
            default:
                if (node.parentNode && node.parentNode.nodeType === 1) {
                    return isContentEditable(node.parentNode);
                }
                return false;
        }
    }, // check media resources is playing
    isPlaying = function(media) {
        // for <audio>, <video>, <source> and <track> elements
        var parent = media instanceof HTMLMediaElement ? null : media.parentElement;
        return !!(media && media.currentTime > 0 && !media.paused && !media.ended && media.readyState > 2) || !!(parent && parent.currentTime > 0 && !parent.paused && !parent.ended && parent.readyState > 2);
    }, // configure the engine to use special handling
    configure = function(option, clear) {
        if (typeof option == 'string') {
            return !!Config[option];
        }
        if (typeof option != 'object') {
            return Config;
        }
        for(var i in option){
            Config[i] = !!option[i];
        }
        // clear lambda cache
        if (clear) {
            matchResolvers = {};
            selectResolvers = {};
        }
        setIdentifierSyntax();
        return true;
    }, // centralized error and exceptions handling
    emit = function(message, proto) {
        var err;
        if (Config.VERBOSITY) {
            if (proto) {
                err = new proto(message);
            } else {
                err = new global.DOMException(message, 'SyntaxError');
            }
            throw err;
        }
        if (Config.LOGERRORS && console && console.log) {
            console.log(message);
        }
    }, // execute the engine initialization code
    initialize = function(doc) {
        setIdentifierSyntax();
        lastContext = switchContext(doc, true);
    }, // build validation regexps used by the engine
    setIdentifierSyntax = function() {
        //
        // NOTE: SPECIAL CASES IN CSS SYNTAX PARSING RULES
        //
        // The <EOF-token> https://drafts.csswg.org/css-syntax/#typedef-eof-token
        // allow mangled|unclosed selector syntax at the end of selectors strings
        //
        // Literal equivalent hex representations of the characters: " ' ` ] )
        //
        //     \\x22 = " - double quotes    \\x5b = [ - open square bracket
        //     \\x27 = ' - single quote     \\x5d = ] - closed square bracket
        //     \\x60 = ` - back tick        \\x28 = ( - open round parens
        //     \\x5c = \ - back slash       \\x29 = ) - closed round parens
        //
        // using hex format prevents false matches of opened/closed instances
        // pairs, coloring breakage and other editors highlightning problems.
        //
        var // non-ascii chars
        noascii = '[^\\x00-\\x9f]', // escaped chars
        escaped = '\\\\[^\\r\\n\\f0-9a-fA-F]', // unicode chars
        unicode = '\\\\[0-9a-fA-F]{1,6}(?:\\r\\n|\\s)?', // can start with single/double dash
        // but it can not start with a digit
        identifier = '-?(?:[a-zA-Z_-]|' + noascii + '|' + escaped + '|' + unicode + ')' + '(?:-{2}|[0-9]|[a-zA-Z_-]|' + noascii + '|' + escaped + '|' + unicode + ')*', pseudonames = '[-\\w]+', pseudoparms = '(?:[-+]?\\d*)(?:n\\s?[-+]?\\s?\\d*)', doublequote = '"[^"\\\\]*(?:\\\\.[^"\\\\]*)*(?:"|$)', singlequote = "'[^'\\\\]*(?:\\\\.[^'\\\\]*)*(?:'|$)", attrparser = identifier + '|' + doublequote + '|' + singlequote, attrvalues = '([\\x22\\x27]?)((?!\\3)*|(?:\\\\?.)*?)(?:\\3|$)', attributes = '\\[' + // attribute presence
        '(?:\\*\\|)?' + WSP + '?' + '(' + identifier + '(?::' + identifier + ')?)' + WSP + '?' + '(?:' + '(' + CFG.operators + ')' + WSP + '?' + '(?:' + attrparser + ')' + ')?' + // attribute case sensitivity
        '(?:' + WSP + '?\\b(i))?' + WSP + '?' + '(?:\\]|$)', attrmatcher = attributes.replace(attrparser, attrvalues), pseudoclass = '(?:\\x28' + WSP + '*' + '(?:' + pseudoparms + '?)?|' + // universal * &
        // namespace *|*
        '(?:\\*|\\*\\|)|' + '(?:' + '(?::' + pseudonames + '(?:\\x28' + pseudoparms + '?(?:\\x29|$))?|' + ')|' + '(?:[.#]?' + identifier + ')|' + '(?:' + attributes + ')' + ')+|' + '(?:' + WSP + '?[>+~][^>+~]' + WSP + '?)|' + '(?:' + WSP + '?,' + WSP + '?)|' + '(?:' + WSP + '?)|' + '(?:\\x29|$)' + ')*', standardValidator = '(?=' + WSP + '?[^>+~(){}<>])' + '(?:' + // universal * &
        // namespace *|*
        '(?:\\*|\\*\\|)|' + '(?:[.#]?' + identifier + ')+|' + '(?:' + attributes + ')+|' + '(?:::?' + pseudonames + pseudoclass + ')|' + '(?:' + WSP + '?' + CFG.combinators + WSP + '?)|' + '(?:' + WSP + '?,' + WSP + '?)|' + '(?:' + WSP + '?)' + ')+';
        // the following global RE is used to return the
        // deepest localName in selector strings and then
        // use it to retrieve all possible matching nodes
        // that will be filtered by compiled resolvers
        reOptimizer = RegExp('(?:([.:#*]?)' + '(' + identifier + ')' + '(?:' + ':[-\\w]+|' + '\\[[^\\]]+(?:\\]|$)|' + '\\x28[^\\x29]+(?:\\x29|$)' + ')*)$');
        // global
        reValidator = RegExp(standardValidator, 'g');
        Patterns.id = RegExp('^#(' + identifier + ')(.*)');
        Patterns.tagName = RegExp('^(' + identifier + ')(.*)');
        Patterns.className = RegExp('^\\.(' + identifier + ')(.*)');
        Patterns.attribute = RegExp('^(?:' + attrmatcher + ')(.*)');
    }, F_INIT = '"use strict";return function Resolver(c,f,x,r)', /*
  // S - M - N
  //
  // SELECT
  // MATCH
  // NONE
  //
  */ S_HEAD = 'var e,n,o,j=r.length-1,k=-1', M_HEAD = 'var e,n,o', N_HEAD = 'var e,n,o', S_LOOP = 'main:while((e=c[++k]))', M_LOOP = 'e=c;', N_LOOP = 'main:while((e=c.item(++k)))', S_BODY = 'r[++j]=c[k];', M_BODY = '', N_BODY = 'r[++j]=c.item(k);', S_TAIL = 'continue main;', M_TAIL = 'r=true;', N_TAIL = 'r=true;', S_TEST = 'if(f(c[k])){break main;}', M_TEST = 'f(c);', N_TEST = 'if(f(c.item(k))){break main;}', S_VARS = [], M_VARS = [], N_VARS = [], // compile groups or single selector strings into
    // executable functions for matching or selecting
    S_TEST = 'if(f(c[k])){break main;}', M_TEST = 'f(c);', N_TEST = 'if(f(c.item(k))){break main;}', S_VARS = [], M_VARS = [], N_VARS = [], // compile groups or single selector strings into
    // executable functions for matching or selecting
    compile = function(selector, mode, callback) {
        var factory, token, head = '', loop = '', macro = '', source = '', vars = '';
        // 'mode' can be boolean or null
        // true = select / false = match
        // null to use collection.item()
        switch(mode){
            case true:
                if (selectLambdas[selector]) {
                    return selectLambdas[selector];
                }
                macro = S_BODY + (callback ? S_TEST : '') + S_TAIL;
                head = S_HEAD;
                loop = S_LOOP;
                break;
            case false:
                if (matchLambdas[selector]) {
                    return matchLambdas[selector];
                }
                macro = M_BODY + (callback ? M_TEST : '') + M_TAIL;
                head = M_HEAD;
                loop = M_LOOP;
                break;
            case null:
                if (selectLambdas[selector]) {
                    return selectLambdas[selector];
                }
                macro = N_BODY + (callback ? N_TEST : '') + N_TAIL;
                head = N_HEAD;
                loop = N_LOOP;
                break;
            default:
                break;
        }
        source = compileSelector(selector, macro, mode, callback);
        loop += mode || mode === null ? '{' + source + '}' : source;
        if (mode || mode === null && selector.includes(':nth')) {
            loop += reNthElem.test(selector) ? 's.nthElement(null, 2);' : '';
            loop += reNthType.test(selector) ? 's.nthOfType(null, 2);' : '';
        }
        if (S_VARS[0] || M_VARS[0] || N_VARS[0]) {
            vars = ',' + (S_VARS.join(',') || M_VARS.join(',') || N_VARS[0]);
            S_VARS.length = 0;
            M_VARS.length = 0;
            N_VARS.length = 0;
        }
        factory = Function('s', F_INIT + '{' + head + vars + ';' + loop + 'return r;}')(Snapshot);
        return mode || mode === null ? selectLambdas[selector] = factory : matchLambdas[selector] = factory;
    }, // build conditional code to check components of selector strings
    compileSelector = function(expression, source, mode, callback) {
        var a, b, n, f, name, NS, referenceElement, compat, expr, match, result, status, symbol, test, type, selector = expression, vars;
        // isolate selector combinators
        selector = selector.replace(STD.combinator, '$1');
        // javascript needs a label to break
        // out of the while loops processing
        selector_recursion_label: while(selector){
            // get namespace prefix if present or get first char of selector
            symbol = STD.apimethods.test(selector) ? '|' : selector[0];
            switch(symbol){
                // universal resolver
                case '*':
                    match = selector.match(Patterns.universal);
                    break;
                // id resolver
                case '#':
                    match = selector.match(Patterns.id);
                    source = 'if((/^' + match[1] + '$/.test(e.getAttribute("id")))){' + source + '}';
                    break;
                // class name resolver
                case '.':
                    match = selector.match(Patterns.className);
                    compat = (QUIRKS_MODE ? 'i' : '') + '.test(e.getAttribute("class"))';
                    source = 'if((/(^|\\s)' + match[1] + '(\\s|$)/' + compat + ')){' + source + '}';
                    break;
                // tag name resolver
                case /[_a-z]/i.test(symbol) ? symbol : undefined:
                    match = selector.match(Patterns.tagName);
                    source = 'if((e.localName=="' + match[1] + '")){' + source + '}';
                    break;
                // namespace resolver
                case '|':
                    match = selector.match(Patterns.namespace);
                    if (match[1] == '*') {
                        source = 'if(true){' + source + '}';
                    } else if (!match[1]) {
                        source = 'if((!e.namespaceURI)){' + source + '}';
                    } else if (typeof match[1] == 'string' && root.prefix == match[1]) {
                        source = 'if((e.namespaceURI=="' + NAMESPACE + '")){' + source + '}';
                    } else {
                        emit('\'' + expression + '\'' + qsInvalid);
                    }
                    break;
                // attributes resolver
                case '[':
                    match = selector.match(Patterns.attribute);
                    NS = match[0].match(STD.namespaces);
                    name = match[1];
                    expr = name.split(':');
                    expr = expr.length == 2 ? expr[1] : expr[0];
                    if (match[2] && !(test = Operators[match[2]])) {
                        emit('\'' + expression + '\'' + qsInvalid);
                        return '';
                    }
                    if (match[4] === '') {
                        test = match[2] == '~=' ? {
                            p1: '^\\s',
                            p2: '+$',
                            p3: 'true'
                        } : match[2] in ATTR_STD_OPS && match[2] != '~=' ? {
                            p1: '^',
                            p2: '$',
                            p3: 'true'
                        } : test;
                    } else if (match[2] == '~=' && match[4].includes(' ')) {
                        break;
                    } else if (match[4]) {
                        match[4] = convertEscapes(match[4]).replace(REX.RegExpChar, '\\$&');
                    }
                    type = match[5] == 'i' || HTML_DOCUMENT && HTML_TABLE[expr.toLowerCase()] ? 'i' : '';
                    source = 'if((' + (!match[2] ? NS ? 's.hasAttributeNS(e,"' + name + '")' : 'e.hasAttribute&&e.hasAttribute("' + name + '")' : !match[4] && ATTR_STD_OPS[match[2]] && match[2] != '~=' ? 'e.getAttribute&&e.getAttribute("' + name + '")==""' : '(/' + test.p1 + match[4] + test.p2 + '/' + type + ').test(e.getAttribute&&e.getAttribute("' + name + '"))==' + test.p3) + ')){' + source + '}';
                    break;
                // *** General sibling combinator
                // E ~ F (F relative sibling of E)
                case '~':
                    match = selector.match(Patterns.relative);
                    source = 'while(e&&(e=e.previousElementSibling)){' + source + '}';
                    break;
                // *** Adjacent sibling combinator
                // E + F (F adiacent sibling of E)
                case '+':
                    match = selector.match(Patterns.adjacent);
                    source = 'if(e&&(e=e.previousElementSibling)){' + source + '}';
                    break;
                // *** Descendant combinator
                // E F (E ancestor of F)
                case '\x09':
                case '\x20':
                    match = selector.match(Patterns.ancestor);
                    source = 'while(e&&(e=e.parentElement)){' + source + '}';
                    break;
                // *** Child combinator
                // E > F (F children of E)
                case '>':
                    match = selector.match(Patterns.children);
                    source = 'if(e&&(e=e.parentElement)){' + source + '}';
                    break;
                // *** user supplied combinators extensions
                case symbol in Combinators ? symbol : undefined:
                    // for other registered combinators extensions
                    match[match.length - 1] = '*';
                    source = Combinators[symbol](match) + source;
                    break;
                // *** tree-structural pseudo-classes
                // :root, :empty, :first-child, :last-child, :only-child, :first-of-type, :last-of-type, :only-of-type
                case ':':
                    if (match = selector.match(Patterns.structural)) {
                        match[1] = match[1].toLowerCase();
                        switch(match[1]){
                            case 'scope':
                                // use the root (documentElement) when comparing against a document
                                source = 'if(e===(s.from.nodeType===9?s.root:s.from)){' + source + '}';
                                break;
                            case 'root':
                                // there can only be one :root element, so exit the loop once found
                                source = 'if((e===s.root)){' + source + (mode ? 'break main;' : '') + '}';
                                break;
                            case 'empty':
                                // matches elements that don't contain elements or text nodes
                                source = 'n=e.firstChild;while(n&&!(/1|3/).test(n.nodeType)){n=n.nextSibling}if(!n){' + source + '}';
                                break;
                            // *** child-indexed pseudo-classes
                            // :first-child, :last-child, :only-child
                            case 'only-child':
                                source = 'if((!e.nextElementSibling&&!e.previousElementSibling)){' + source + '}';
                                break;
                            case 'last-child':
                                source = 'if((!e.nextElementSibling)){' + source + '}';
                                break;
                            case 'first-child':
                                source = 'if((!e.previousElementSibling)){' + source + '}';
                                break;
                            // *** typed child-indexed pseudo-classes
                            // :only-of-type, :last-of-type, :first-of-type
                            case 'only-of-type':
                                source = 'o=e.localName;' + 'n=e;while((n=n.nextElementSibling)&&n.localName!=o);if(!n){' + 'n=e;while((n=n.previousElementSibling)&&n.localName!=o);}if(!n){' + source + '}';
                                break;
                            case 'last-of-type':
                                source = 'n=e;o=e.localName;while((n=n.nextElementSibling)&&n.localName!=o);if(!n){' + source + '}';
                                break;
                            case 'first-of-type':
                                source = 'n=e;o=e.localName;while((n=n.previousElementSibling)&&n.localName!=o);if(!n){' + source + '}';
                                break;
                            default:
                                emit('\'' + expression + '\'' + qsInvalid);
                                break;
                        }
                    } else if (match = selector.match(Patterns.treestruct)) {
                        match[1] = match[1].toLowerCase();
                        switch(match[1]){
                            case 'nth-child':
                            case 'nth-of-type':
                            case 'nth-last-child':
                            case 'nth-last-of-type':
                                expr = /-of-type/i.test(match[1]);
                                if (match[1] && match[2]) {
                                    type = /last/i.test(match[1]);
                                    if (match[2] == 'n') {
                                        source = 'if(true){' + source + '}';
                                        break;
                                    } else if (match[2] == '1') {
                                        test = type ? 'next' : 'previous';
                                        source = expr ? 'n=e;o=e.localName;' + 'while((n=n.' + test + 'ElementSibling)&&n.localName!=o);if(!n){' + source + '}' : 'if(!e.' + test + 'ElementSibling){' + source + '}';
                                        break;
                                    } else if (match[2] == 'even' || match[2] == '2n0' || match[2] == '2n+0' || match[2] == '2n') {
                                        test = 'n%2==0';
                                    } else if (match[2] == 'odd' || match[2] == '2n1' || match[2] == '2n+1') {
                                        test = 'n%2==1';
                                    } else {
                                        f = /n/i.test(match[2]);
                                        n = match[2].split('n');
                                        a = parseInt(n[0], 10) || 0;
                                        b = parseInt(n[1], 10) || 0;
                                        if (n[0] == '-') {
                                            a = -1;
                                        }
                                        if (n[0] == '+') {
                                            a = +1;
                                        }
                                        test = (b ? '(n' + (b > 0 ? '-' : '+') + Math.abs(b) + ')' : 'n') + '%' + a + '==0';
                                        test = a >= +1 ? f ? 'n>' + (b - 1) + (Math.abs(a) != 1 ? '&&' + test : '') : 'n==' + a : a <= -1 ? f ? 'n<' + (b + 1) + (Math.abs(a) != 1 ? '&&' + test : '') : 'n==' + a : a === 0 ? n[0] ? 'n==' + b : 'n>' + (b - 1) : 'false';
                                    }
                                    expr = expr ? 'OfType' : 'Element';
                                    type = type ? 'true' : 'false';
                                    source = 'n=s.nth' + expr + '(e,' + type + ');if((' + test + ')){' + source + '}';
                                } else {
                                    emit('\'' + expression + '\'' + qsInvalid);
                                }
                                break;
                            default:
                                emit('\'' + expression + '\'' + qsInvalid);
                                break;
                        }
                    } else if (match = selector.match(Patterns.logicalsel)) {
                        match[1] = match[1].toLowerCase();
                        expr = match[2].replace(REX.CommaGroup, ',').replace(REX.TrimSpaces, '').replace(/\x22/g, '\\"');
                        switch(match[1]){
                            case 'is':
                            case 'where':
                                if (Config.FORGIVING) {
                                    source = 'try{' + 'if(s.match("' + expr + '",e)){' + source + '}' + '}catch(E){}';
                                } else {
                                    source = 'if(s.match("' + expr + '",e)){' + source + '}';
                                }
                                break;
                            case 'matches':
                                source = 'if(s.match("' + expr + '",e)){' + source + '}';
                                break;
                            case 'not':
                                source = 'if(!s.match("' + expr + '",e)){' + source + '}';
                                break;
                            case 'has':
                                if (/^\s*(\+|\~)/.test(match[2])) {
                                    source = 'if(e.parentElement&&Array.from(e.parentElement' + (/^\s*[+]/.test(match[2]) ? '.querySelectorAll("*' + expr + '")' : '.children') + ').includes(e.nextElementSibling)){' + source + '}';
                                } else {
                                    source = 'if(e.querySelector(":scope ' + expr + '"))' + '{' + source + '}';
                                }
                                break;
                            default:
                                emit('\'' + expression + '\'' + qsInvalid);
                                break;
                        }
                    } else if (match = selector.match(Patterns.linguistic)) {
                        match[1] = match[1].toLowerCase();
                        switch(match[1]){
                            case 'dir':
                                source = 'var p;if((' + '(/' + match[2] + '/i.test(e.dir))||(p=s.ancestor("[dir]", e))&&' + '(/' + match[2] + '/i.test(p.dir))||(e.dir==""||e.dir=="auto")&&' + '(' + (match[2] == 'ltr' ? '!' : '') + RTL + '.test(e.textContent)))' + '){' + source + '};';
                                break;
                            case 'lang':
                                expr = '(?:^|-)' + match[2] + '(?:-|$)';
                                source = 'var p;if((' + '(e.isConnected&&(e.lang==""&&(p=s.ancestor("[lang]",e)))&&' + '(p.lang=="' + match[2] + '")||/' + expr + '/i.test(e.lang)))' + '){' + source + '};';
                                break;
                            default:
                                emit('\'' + expression + '\'' + qsInvalid);
                                break;
                        }
                    } else if (match = selector.match(Patterns.locationpc)) {
                        match[1] = match[1].toLowerCase();
                        switch(match[1]){
                            case 'any-link':
                                source = 'if((/^a|area$/i.test(e.localName)&&e.hasAttribute("href")||e.visited)){' + source + '}';
                                break;
                            case 'link':
                                source = 'if((/^a|area$/i.test(e.localName)&&e.hasAttribute("href"))){' + source + '}';
                                break;
                            case 'visited':
                                source = 'if((/^a|area$/i.test(e.localName)&&e.hasAttribute("href")&&e.visited)){' + source + '}';
                                break;
                            case 'target':
                                source = 'if(((s.doc.compareDocumentPosition(e)&16)&&s.doc.location.hash&&e.id==s.doc.location.hash.slice(1))){' + source + '}';
                                break;
                            case 'defined':
                                source = 'n=s.doc.defaultView.customElements.get(e.localName);if(n&&e instanceof n){' + source + '}';
                                break;
                            default:
                                emit('\'' + expression + '\'' + qsInvalid);
                                break;
                        }
                    } else if (match = selector.match(Patterns.useraction)) {
                        match[1] = match[1].toLowerCase();
                        switch(match[1]){
                            case 'hover':
                                source = 'if(e===s.HOVER){' + source + '}';
                                break;
                            case 'active':
                                source = 'if(e===s.doc.activeElement){' + source + '}';
                                break;
                            case 'focus':
                                source = 'if(s.isFocusable(e)){' + source + '}';
                                break;
                            case 'focus-visible':
                                source = 'if(n=s.isFocusable(e)){' + 'if(e!==n){while(e){e=e.parentElement;if(e===n)break;}}}' + 'if((e===n||e.autofocus)){' + source + '}';
                                break;
                            case 'focus-within':
                                source = 'if(n=s.isFocusable(e)){' + 'if(n!==e){while(n){n=n.parentElement;if(n===e)break;}}}' + 'if((n===e||n.autofocus)){' + source + '}';
                                break;
                            default:
                                emit('\'' + expression + '\'' + qsInvalid);
                                break;
                        }
                    } else if (match = selector.match(Patterns.inputstate)) {
                        match[1] = match[1].toLowerCase();
                        switch(match[1]){
                            case 'enabled':
                                source = 'if((("form" in e||/^optgroup$/i.test(e.localName))&&"disabled" in e &&e.disabled===false' + ')){' + source + '}';
                                break;
                            case 'disabled':
                                // https://html.spec.whatwg.org/#enabling-and-disabling-form-controls:-the-disabled-attribute
                                source = 'if((("form" in e||/^optgroup$/i.test(e.localName))&&"disabled" in e)){' + // F is true if any of the fieldset elements in the ancestry chain has the disabled attribute specified
                                // L is true if the first legend element of the fieldset contains the element
                                'var x=0,N=[],F=false,L=false;' + 'if(!(/^(optgroup|option)$/i.test(e.localName))){' + 'n=e.parentElement;' + 'while(n){' + 'if(n.localName=="fieldset"){' + 'N[x++]=n;' + 'if(n.disabled===true){' + 'F=true;' + 'break;' + '}' + '}' + 'n=n.parentElement;' + '}' + 'for(var x=0;x<N.length;x++){' + 'if((n=s.first("legend",N[x]))&&n.contains(e)){' + 'L=true;' + 'break;' + '}' + '}' + '}' + 'if(e.disabled===true||(F&&!L)){' + source + '}}';
                                break;
                            case 'read-only':
                                source = 'if(' + '(/^textarea$/i.test(e.localName)&&(e.readOnly||e.disabled))||' + '(/^input$/i.test(e.localName)&&("|date|datetime-local|email|month|number|password|search|tel|text|time|url|week|".includes("|"+e.type+"|")?(e.readOnly||e.disabled):true))||' + '(!/^(?:input|textarea)$/i.test(e.localName) && !s.isContentEditable(e))' + '){' + source + '}';
                                break;
                            case 'read-write':
                                source = 'if(' + '(/^textarea$/i.test(e.localName)&&!e.readOnly&&!e.disabled)||' + '(/^input$/i.test(e.localName)&&"|date|datetime-local|email|month|number|password|search|tel|text|time|url|week|".includes("|"+e.type+"|")&&!e.readOnly&&!e.disabled)||' + '(!/^(?:input|textarea)$/i.test(e.localName) && s.isContentEditable(e))' + '){' + source + '}';
                                break;
                            case 'placeholder-shown':
                                source = 'if((' + '(/^input|textarea$/i.test(e.localName))&&e.hasAttribute("placeholder")&&' + '("|textarea|password|number|search|email|text|tel|url|".includes("|"+e.type+"|"))&&' + '(!s.match(":focus",e))' + ')){' + source + '}';
                                break;
                            case 'default':
                                source = 'if(("form" in e && e.form)){' + 'var x=0;n=[];' + 'if(e.type=="image")n=e.form.getElementsByTagName("input");' + 'if(e.type=="submit")n=e.form.elements;' + 'while(n[x]&&e!==n[x]){' + 'if(n[x].type=="image")break;' + 'if(n[x].type=="submit")break;' + 'x++;' + '}' + '}' + 'if((e.form&&(e===n[x]&&"|image|submit|".includes("|"+e.type+"|"))||' + '((/^option$/i.test(e.localName))&&e.defaultSelected)||' + '(("|radio|checkbox|".includes("|"+e.type+"|"))&&e.defaultChecked)' + ')){' + source + '}';
                                break;
                            default:
                                emit('\'' + expression + '\'' + qsInvalid);
                                break;
                        }
                    } else if (match = selector.match(Patterns.inputvalue)) {
                        match[1] = match[1].toLowerCase();
                        switch(match[1]){
                            case 'checked':
                                source = 'if((/^input$/i.test(e.localName)&&' + '("|radio|checkbox|".includes("|"+e.type+"|")&&e.checked)||' + '(/^option$/i.test(e.localName)&&(e.selected||e.checked))' + ')){' + source + '}';
                                break;
                            case 'indeterminate':
                                source = 'if((/^progress$/i.test(e.localName)&&!e.hasAttribute("value"))||' + '(/^input$/i.test(e.localName)&&("checkbox"==e.type&&e.indeterminate)||' + '("radio"==e.type&&e.name&&!s.first("input[name="+e.name+"]:checked",e.form))' + ')){' + source + '}';
                                break;
                            case 'required':
                                source = 'if((/^input|select|textarea$/i.test(e.localName)&&e.required)' + '){' + source + '}';
                                break;
                            case 'optional':
                                source = 'if((/^input|select|textarea$/i.test(e.localName)&&!e.required)' + '){' + source + '}';
                                break;
                            case 'invalid':
                                source = 'if(((' + '(/^form$/i.test(e.localName)&&!e.noValidate)||' + '(e.willValidate&&!e.formNoValidate))&&!e.checkValidity())||' + '(/^fieldset$/i.test(e.localName)&&s.first(":invalid",e))' + '){' + source + '}';
                                break;
                            case 'valid':
                                source = 'if(((' + '(/^form$/i.test(e.localName)&&!e.noValidate)||' + '(e.willValidate&&!e.formNoValidate))&&e.checkValidity())||' + '(/^fieldset$/i.test(e.localName)&&s.first(":valid",e))' + '){' + source + '}';
                                break;
                            case 'in-range':
                                source = 'if((/^input$/i.test(e.localName))&&' + '(e.willValidate&&!e.formNoValidate)&&' + '(!e.validity.rangeUnderflow&&!e.validity.rangeOverflow)&&' + '("|date|datetime-local|month|number|range|time|week|".includes("|"+e.type+"|"))&&' + '("range"==e.type||e.getAttribute("min")||e.getAttribute("max"))' + '){' + source + '}';
                                break;
                            case 'out-of-range':
                                source = 'if((/^input$/i.test(e.localName))&&' + '(e.willValidate&&!e.formNoValidate)&&' + '(e.validity.rangeUnderflow||e.validity.rangeOverflow)&&' + '("|date|datetime-local|month|number|range|time|week|".includes("|"+e.type+"|"))&&' + '("range"==e.type||e.getAttribute("min")||e.getAttribute("max"))' + '){' + source + '}';
                                break;
                            default:
                                emit('\'' + expression + '\'' + qsInvalid);
                                break;
                        }
                    } else if (match = selector.match(Patterns.rsrc_state)) {
                        match[1] = match[1].toLowerCase();
                        switch(match[1]){
                            case 'playing':
                                source = 'if(s.isPlaying(e)){' + source + '}';
                                break;
                            case 'paused':
                                source = 'if(!s.isPlaying(e)){' + source + '}';
                                break;
                            case 'seeking':
                                source = 'if(!s.isPlaying(e)){' + source + '}';
                                break;
                            case 'buffering':
                                break;
                            case 'stalled':
                                break;
                            case 'muted':
                                source = 'if(e.localName=="audio"&&e.getAttribute("muted")){' + source + '}';
                                break;
                            case 'volume-locked':
                                break;
                            default:
                                break;
                        }
                    } else if (match = selector.match(Patterns.pseudo_nop)) {
                        break;
                    } else if (match = selector.match(Patterns.pseudo_sng)) {
                        source = 'if(e.element&&e.type.toLowerCase()=="' + ':' + match[0].toLowerCase() + '"){e=e.element;' + source + '}';
                    } else if (match = selector.match(Patterns.pseudo_dbl)) {
                        source = 'if(e.element&&e.type.toLowerCase()=="' + match[0].toLowerCase() + '"){e=e.element;' + source + '}';
                    } else {
                        // reset
                        expr = false;
                        status = false;
                        // process registered selector extensions
                        for(expr in Selectors){
                            if (match = selector.match(Selectors[expr].Expression)) {
                                result = Selectors[expr].Callback(match, source, mode, callback);
                                if ('match' in result) {
                                    match = result.match;
                                }
                                vars = result.modvar;
                                if (mode) {
                                    // add extra select() vars
                                    vars && S_VARS.indexOf(vars) < 0 && (S_VARS[S_VARS.length] = vars);
                                } else {
                                    // add extra match() vars
                                    vars && M_VARS.indexOf(vars) < 0 && (M_VARS[M_VARS.length] = vars);
                                }
                                // extension source code
                                source = result.source;
                                // extension status code
                                status = result.status;
                                // break on status error
                                if (status) {
                                    break;
                                }
                            }
                        }
                        if (!status) {
                            if (Config.FORGIVING && selector.match(/(:(?:is|where)\x28)/)) {
                                return '';
                            }
                            emit('unknown pseudo-class selector \'' + selector + '\'');
                            return '';
                        }
                        if (!expr) {
                            if (Config.FORGIVING && selector.match(/(:(?:is|where)\x28)/)) {
                                return '';
                            }
                            emit('unknown token in selector \'' + selector + '\'');
                            return '';
                        }
                    }
                    break;
                default:
                    emit('\'' + expression + '\'' + qsInvalid);
                    break selector_recursion_label;
            }
            // end of switch symbol
            if (!match) {
                if (Config.FORGIVING && selector.match(/(:(?:is|where)\x28)/)) {
                    return '';
                }
                emit('\'' + expression + '\'' + qsInvalid);
                return '';
            }
            // pop last component
            selector = match.pop();
        }
        // end of while selector
        return source;
    }, // replace :scope context element as a
    // a reference in the selector string
    makeref = function(selectors, element) {
        // replace DOCUMENT with first element (root)
        if (element.nodeType === 9) {
            element = element.documentElement;
        }
        return selectors.replace(/:scope/i, element.localName + (element.id ? '#' + escape(element.id) : '') + (element.className ? '.' + escape(element.classList[0]) : ''));
    }, // equivalent of w3c 'closest' method
    ancestor = function _closest(selectors, element, callback) {
        parse(selectors, true);
        selectors = makeref(selectors, element);
        while(element){
            if (match(selectors, element, callback)) break;
            element = element.parentElement;
        }
        return element;
    }, match_assert = function(f, element, callback) {
        for(var i = 0, l = f.length, r = false; l > i; ++i)f[i](element, callback, null, false) && (r = true);
        return r;
    }, match_collect = function(selectors, callback) {
        for(var i = 0, l = selectors.length, f = []; l > i; ++i)f[i] = compile(selectors[i], false, callback);
        return {
            factory: f
        };
    }, // unique parser entry point for all
    // methods (type matching/selecting)
    parse = function(selectors, type) {
        var parsed;
        // arguments validation
        if (arguments.length === 0) {
            emit(qsNotArgs, TypeError);
            return Config.VERBOSITY ? undefined : type ? none : false;
        } else if (arguments[0] === '') {
            emit('\'\'' + qsInvalid);
            return Config.VERBOSITY ? undefined : type ? none : false;
        }
        // input NULL or UNDEFINED
        if (typeof selectors != 'string') {
            selectors = '' + selectors;
        }
        if (/:scope/i.test(selectors)) {
            selectors = makeref(selectors, Snapshot.from);
        }
        // normalize input string
        parsed = selectors.replace(/\x00|\\$/g, '\ufffd').replace(REX.CombineWSP, '\x20').replace(REX.PseudosWSP, '$1').replace(REX.TabCharWSP, '\t').replace(REX.CommaGroup, ',').replace(REX.TrimSpaces, '');
        // parse, validate and split possible compound selectors
        if ((selectors = parsed.match(reValidator)) && selectors.join('') == parsed) {
            selectors = parsed.match(REX.SplitGroup);
            if (parsed[parsed.length - 1] == ',') {
                emit(qsInvalid);
                return Config.VERBOSITY ? undefined : type ? none : false;
            }
        } else {
            if (Config.FORGIVING) {
                // forgiving pseudos allow to continue even after parse errors
                if (!(parsed.includes(':is(') || parsed.includes(':where('))) {
                    emit('\'' + selectors + '\'' + qsInvalid);
                    return Config.VERBOSITY ? undefined : type ? none : false;
                }
            }
        }
        return selectors;
    }, // equivalent of w3c 'matches' method
    match = function _matches(selectors, element, callback) {
        if (element && matchResolvers[selectors]) {
            return match_assert(matchResolvers[selectors].factory, element, callback);
        }
        matchResolvers[selectors] = match_collect(parse(selectors, false), callback);
        return match_assert(matchResolvers[selectors].factory, element, callback);
    }, // equivalent of w3c 'querySelector' method
    first = function _querySelector(selectors, context, callback) {
        return select(selectors, context, typeof callback == 'function' ? function firstMatch(element) {
            callback(element);
            return false;
        } : function firstMatch() {
            return false;
        })[0] || null;
    }, // equivalent of w3c 'querySelectorAll' method
    select = function _querySelectorAll(selectors, context, callback) {
        var nodes = [], resolver;
        arguments.length == 0 && emit(qsNotArgs, TypeError);
        context || (context = doc);
        lastContext !== context && (lastContext = switchContext(context));
        if (selectors) {
            if (resolver = selectResolvers[selectors]) {
                if (resolver.context === context && resolver.callback === callback) {
                    var i, l, list, f = resolver.factory, h = resolver.htmlset, n = resolver.nodeset;
                    if (n.length > 1) {
                        for(i = 0, l = n.length; l > i; ++i){
                            list = compat[n[i][0]](context, n[i].slice(1))();
                            if (f[i] !== null) {
                                f[i](list, callback, context, nodes);
                            } else {
                                nodes = nodes.concat(list);
                            }
                        }
                        if (l > 1 && nodes.length > 1) {
                            nodes.sort(documentOrder);
                            hasDupes && (nodes = unique(nodes));
                        }
                    } else {
                        if (f[0]) {
                            nodes = f[0](h[0](), callback, context, nodes);
                        } else {
                            nodes = h[0]();
                        }
                    }
                    if (typeof callback == 'function') {
                        nodes = concatCall(nodes, callback);
                    }
                    return !Config.NODE_LIST ? nodes : isInstanceOf(nodes) ? nodes : toNodeList(nodes);
                }
            }
        }
        // save/reuse factory and closure collection
        selectResolvers[selectors] = collect(parse(selectors, true), context, callback);
        nodes = selectResolvers[selectors].results;
        if (typeof callback == 'function') {
            nodes = concatCall(nodes, callback);
        }
        return !Config.NODE_LIST ? nodes : isInstanceOf(nodes) ? nodes : toNodeList(nodes);
    }, // optimize selectors avoiding duplicated checks
    optimize = function(selector, token) {
        var index = token.index, length = token[1].length + token[2].length;
        return selector.slice(0, index) + (' >+~'.indexOf(selector.charAt(index - 1)) > -1 ? ':['.indexOf(selector.charAt(index + length + 1)) > -1 ? '*' : '' : '') + selector.slice(index + length - (token[1] == '*' ? 1 : 0));
    }, // prepare factory resolvers and closure collections
    collect = function(selectors, context, callback) {
        var i, l, seen = {}, token = [
            '',
            '*',
            '*'
        ], optimized = selectors, factory = [], htmlset = [], nodeset = [], results = [], type;
        for(i = 0, l = selectors.length; l > i; ++i){
            if (!seen[selectors[i]] && (seen[selectors[i]] = true)) {
                type = selectors[i].match(reOptimizer);
                if (type && type[1] != ':' && (token = type)) {
                    token[1] || (token[1] = '*');
                    optimized[i] = optimize(optimized[i], token);
                } else {
                    token = [
                        '',
                        '*',
                        '*'
                    ];
                }
            }
            nodeset[i] = token[1] + token[2];
            token[2] = unescapeIdentifier(token[2]);
            htmlset[i] = compat[token[1]](context, token[2]);
            factory[i] = compile(optimized[i], true, null);
            factory[i] ? factory[i](htmlset[i](), callback, context, results) : results.concat(htmlset[i]());
        }
        if (l > 1) {
            results.sort(documentOrder);
            hasDupes && (results = unique(results));
        }
        return {
            callback: callback,
            context: context,
            factory: factory,
            htmlset: htmlset,
            nodeset: nodeset,
            results: results
        };
    }, // handlers needed for the :hover pseudo-class
    // track state change in browsers and headless
    initEnv = function() {
        doc.addEventListener('mouseover', function(e) {
            Snapshot.HOVER = e.target;
        }, true);
        doc.addEventListener('mouseout', function(e) {
            Snapshot.HOVER = null;
        }, true);
    }(), // QSA placeholders to native references
    _closest, _matches, _querySelector, _querySelectorAll, _querySelectorDoc, _querySelectorAllDoc, // overrides QSA methods (only for browsers)
    install = function(all) {
        // save references
        _closest = Element.prototype.closest;
        _matches = Element.prototype.matches;
        _querySelector = Element.prototype.querySelector;
        _querySelectorAll = Element.prototype.querySelectorAll;
        _querySelectorDoc = Document.prototype.querySelector;
        _querySelectorAllDoc = Document.prototype.querySelectorAll;
        function parseQSArgs() {
            var method = arguments[arguments.length - 1];
            return arguments.length < 2 ? method.apply(this, []) : arguments.length < 3 ? method.apply(this, [
                arguments[0],
                this
            ]) : method.apply(this, [
                arguments[0],
                this,
                typeof arguments[1] == 'function' ? arguments[1] : undefined
            ]);
        }
        Element.prototype.closest = HTMLElement.prototype.closest = function closest() {
            return parseQSArgs.apply(this, [].slice.call(arguments).concat(ancestor));
        };
        Element.prototype.matches = HTMLElement.prototype.matches = function matches() {
            return parseQSArgs.apply(this, [].slice.call(arguments).concat(match));
        };
        Element.prototype.querySelector = HTMLElement.prototype.querySelector = function querySelector() {
            return parseQSArgs.apply(this, [].slice.call(arguments).concat(first));
        };
        Element.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll = function querySelectorAll() {
            return parseQSArgs.apply(this, [].slice.call(arguments).concat(select));
        };
        Document.prototype.querySelector = DocumentFragment.prototype.querySelector = function querySelector() {
            return parseQSArgs.apply(this, [].slice.call(arguments).concat(first));
        };
        Document.prototype.querySelectorAll = DocumentFragment.prototype.querySelectorAll = function querySelectorAll() {
            return parseQSArgs.apply(this, [].slice.call(arguments).concat(select));
        };
        if (all) {
            doc.addEventListener('load', function(e) {
                var c, d, r, s, t = e.target;
                if (/iframe/i.test(t.localName)) {
                    c = '(' + Export + ')(this, ' + Factory + ');';
                    d = t.ownerDocument;
                    s = d.createElement('script');
                    s.textContent = c + 'NW.Dom.install(true)';
                    r = d.documentElement;
                    r.removeChild(r.insertBefore(s, r.firstChild));
                }
            }, true);
        }
    }, // restore QSA methods (only for browsers)
    uninstall = function() {
        // restore references
        if (_closest) {
            Element.prototype.closest = _closest;
            HTMLElement.prototype.closest = _closest;
        }
        if (_matches) {
            Element.prototype.matches = _matches;
            HTMLElement.prototype.matches = _matches;
        }
        if (_querySelector) {
            Element.prototype.querySelector = HTMLElement.prototype.querySelector = _querySelector;
            Element.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll = _querySelector;
        }
        if (_querySelectorAllDoc) {
            Document.prototype.querySelector = DocumentFragment.prototype.querySelector = _querySelectorDoc;
            Document.prototype.querySelectorAll = DocumentFragment.prototype.querySelectorAll = _querySelectorAllDoc;
        }
    }, // empty set
    none = Array(), // context
    lastContext, // cached lambdas
    matchLambdas = {}, selectLambdas = {}, // cached resolvers
    matchResolvers = {}, selectResolvers = {}, // passed to resolvers
    Snapshot = {
        doc: doc,
        from: doc,
        root: root,
        byTag: byTag,
        first: first,
        match: match,
        ancestor: ancestor,
        nthOfType: nthOfType,
        nthElement: nthElement,
        isFocusable: isFocusable,
        isContentEditable: isContentEditable,
        hasAttributeNS: hasAttributeNS
    }, // public exported methods/objects
    Dom = {
        // exported cache objects
        matchLambdas: matchLambdas,
        selectLambdas: selectLambdas,
        matchResolvers: matchResolvers,
        selectResolvers: selectResolvers,
        // exported compiler macros
        CFG: CFG,
        S_BODY: S_BODY,
        M_BODY: M_BODY,
        N_BODY: M_BODY,
        S_TEST: S_TEST,
        M_TEST: M_TEST,
        N_TEST: N_TEST,
        // exported engine methods
        byId: byId,
        byTag: byTag,
        byClass: byClass,
        match: match,
        first: first,
        select: select,
        closest: ancestor,
        compile: compile,
        configure: configure,
        emit: emit,
        Config: Config,
        Snapshot: Snapshot,
        Version: version,
        install: install,
        uninstall: uninstall,
        Operators: Operators,
        Selectors: Selectors,
        // register a new selector combinator symbol and its related function resolver
        registerCombinator: function(combinator, resolver) {
            var i = 0, l = combinator.length, symbol;
            for(; l > i; ++i){
                if (combinator[i] != '=') {
                    symbol = combinator[i];
                    break;
                }
            }
            if (CFG.combinators.indexOf(symbol) < 0) {
                CFG.combinators = CFG.combinators.replace('](', symbol + '](');
                CFG.combinators = CFG.combinators.replace('])', symbol + '])');
                Combinators[combinator] = resolver;
                setIdentifierSyntax();
            } else {
                console.warn('Warning: the \'' + combinator + '\' combinator is already registered.');
            }
        },
        // register a new attribute operator symbol and its related function resolver
        registerOperator: function(operator, resolver) {
            var i = 0, l = operator.length, symbol;
            for(; l > i; ++i){
                if (operator[i] != '=') {
                    symbol = operator[i];
                    break;
                }
            }
            if (CFG.operators.indexOf(symbol) < 0 && !Operators[operator]) {
                CFG.operators = CFG.operators.replace(']=', symbol + ']=');
                Operators[operator] = resolver;
                setIdentifierSyntax();
            } else {
                console.warn('Warning: the \'' + operator + '\' operator is already registered.');
            }
        },
        // register a new selector symbol and its related function resolver
        registerSelector: function(name, rexp, func) {
            Selectors[name] || (Selectors[name] = {
                Expression: rexp,
                Callback: func
            });
        }
    };
    initialize(doc);
    return Dom;
});
}),
"[project]/frontend/node_modules/.pnpm/xmlchars@2.2.0/node_modules/xmlchars/xml/1.0/ed5.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Character classes and associated utilities for the 5th edition of XML 1.0.
 *
 * @author Louis-Dominique Dubeau
 * @license MIT
 * @copyright Louis-Dominique Dubeau
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
//
// Fragments.
//
exports.CHAR = "\t\n\r -\uD7FF\uE000-\uFFFD\uD800\uDC00-\uDBFF\uDFFF";
exports.S = " \t\r\n";
// tslint:disable-next-line:max-line-length
exports.NAME_START_CHAR = ":A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\uD800\uDC00-\uDB7F\uDFFF";
exports.NAME_CHAR = "-" + exports.NAME_START_CHAR + ".0-9\u00B7\u0300-\u036F\u203F-\u2040";
//
// Regular expressions.
//
exports.CHAR_RE = new RegExp("^[" + exports.CHAR + "]$", "u");
exports.S_RE = new RegExp("^[" + exports.S + "]+$", "u");
exports.NAME_START_CHAR_RE = new RegExp("^[" + exports.NAME_START_CHAR + "]$", "u");
exports.NAME_CHAR_RE = new RegExp("^[" + exports.NAME_CHAR + "]$", "u");
exports.NAME_RE = new RegExp("^[" + exports.NAME_START_CHAR + "][" + exports.NAME_CHAR + "]*$", "u");
exports.NMTOKEN_RE = new RegExp("^[" + exports.NAME_CHAR + "]+$", "u");
var TAB = 9;
var NL = 0xA;
var CR = 0xD;
var SPACE = 0x20;
//
// Lists.
//
/** All characters in the ``S`` production. */ exports.S_LIST = [
    SPACE,
    NL,
    CR,
    TAB
];
/**
 * Determines whether a codepoint matches the ``CHAR`` production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``CHAR``.
 */ function isChar(c) {
    return c >= SPACE && c <= 0xD7FF || c === NL || c === CR || c === TAB || c >= 0xE000 && c <= 0xFFFD || c >= 0x10000 && c <= 0x10FFFF;
}
exports.isChar = isChar;
/**
 * Determines whether a codepoint matches the ``S`` (space) production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``S``.
 */ function isS(c) {
    return c === SPACE || c === NL || c === CR || c === TAB;
}
exports.isS = isS;
/**
 * Determines whether a codepoint matches the ``NAME_START_CHAR`` production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``NAME_START_CHAR``.
 */ function isNameStartChar(c) {
    return c >= 0x41 && c <= 0x5A || c >= 0x61 && c <= 0x7A || c === 0x3A || c === 0x5F || c === 0x200C || c === 0x200D || c >= 0xC0 && c <= 0xD6 || c >= 0xD8 && c <= 0xF6 || c >= 0x00F8 && c <= 0x02FF || c >= 0x0370 && c <= 0x037D || c >= 0x037F && c <= 0x1FFF || c >= 0x2070 && c <= 0x218F || c >= 0x2C00 && c <= 0x2FEF || c >= 0x3001 && c <= 0xD7FF || c >= 0xF900 && c <= 0xFDCF || c >= 0xFDF0 && c <= 0xFFFD || c >= 0x10000 && c <= 0xEFFFF;
}
exports.isNameStartChar = isNameStartChar;
/**
 * Determines whether a codepoint matches the ``NAME_CHAR`` production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``NAME_CHAR``.
 */ function isNameChar(c) {
    return isNameStartChar(c) || c >= 0x30 && c <= 0x39 || c === 0x2D || c === 0x2E || c === 0xB7 || c >= 0x0300 && c <= 0x036F || c >= 0x203F && c <= 0x2040;
}
exports.isNameChar = isNameChar; //# sourceMappingURL=ed5.js.map
}),
"[project]/frontend/node_modules/.pnpm/xmlchars@2.2.0/node_modules/xmlchars/xml/1.1/ed2.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Character classes and associated utilities for the 2nd edition of XML 1.1.
 *
 * @author Louis-Dominique Dubeau
 * @license MIT
 * @copyright Louis-Dominique Dubeau
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
//
// Fragments.
//
exports.CHAR = "\u0001-\uD7FF\uE000-\uFFFD\uD800\uDC00-\uDBFF\uDFFF";
exports.RESTRICTED_CHAR = "\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F-\u0084\u0086-\u009F";
exports.S = " \t\r\n";
// tslint:disable-next-line:max-line-length
exports.NAME_START_CHAR = ":A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\uD800\uDC00-\uDB7F\uDFFF";
exports.NAME_CHAR = "-" + exports.NAME_START_CHAR + ".0-9\u00B7\u0300-\u036F\u203F-\u2040";
//
// Regular expressions.
//
exports.CHAR_RE = new RegExp("^[" + exports.CHAR + "]$", "u");
exports.RESTRICTED_CHAR_RE = new RegExp("^[" + exports.RESTRICTED_CHAR + "]$", "u");
exports.S_RE = new RegExp("^[" + exports.S + "]+$", "u");
exports.NAME_START_CHAR_RE = new RegExp("^[" + exports.NAME_START_CHAR + "]$", "u");
exports.NAME_CHAR_RE = new RegExp("^[" + exports.NAME_CHAR + "]$", "u");
exports.NAME_RE = new RegExp("^[" + exports.NAME_START_CHAR + "][" + exports.NAME_CHAR + "]*$", "u");
exports.NMTOKEN_RE = new RegExp("^[" + exports.NAME_CHAR + "]+$", "u");
var TAB = 9;
var NL = 0xA;
var CR = 0xD;
var SPACE = 0x20;
//
// Lists.
//
/** All characters in the ``S`` production. */ exports.S_LIST = [
    SPACE,
    NL,
    CR,
    TAB
];
/**
 * Determines whether a codepoint matches the ``CHAR`` production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``CHAR``.
 */ function isChar(c) {
    return c >= 0x0001 && c <= 0xD7FF || c >= 0xE000 && c <= 0xFFFD || c >= 0x10000 && c <= 0x10FFFF;
}
exports.isChar = isChar;
/**
 * Determines whether a codepoint matches the ``RESTRICTED_CHAR`` production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``RESTRICTED_CHAR``.
 */ function isRestrictedChar(c) {
    return c >= 0x1 && c <= 0x8 || c === 0xB || c === 0xC || c >= 0xE && c <= 0x1F || c >= 0x7F && c <= 0x84 || c >= 0x86 && c <= 0x9F;
}
exports.isRestrictedChar = isRestrictedChar;
/**
 * Determines whether a codepoint matches the ``CHAR`` production and does not
 * match the ``RESTRICTED_CHAR`` production. ``isCharAndNotRestricted(x)`` is
 * equivalent to ``isChar(x) && !isRestrictedChar(x)``. This function is faster
 * than running the two-call equivalent.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``CHAR`` and does not match
 * ``RESTRICTED_CHAR``.
 */ function isCharAndNotRestricted(c) {
    return c === 0x9 || c === 0xA || c === 0xD || c > 0x1F && c < 0x7F || c === 0x85 || c > 0x9F && c <= 0xD7FF || c >= 0xE000 && c <= 0xFFFD || c >= 0x10000 && c <= 0x10FFFF;
}
exports.isCharAndNotRestricted = isCharAndNotRestricted;
/**
 * Determines whether a codepoint matches the ``S`` (space) production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``S``.
 */ function isS(c) {
    return c === SPACE || c === NL || c === CR || c === TAB;
}
exports.isS = isS;
/**
 * Determines whether a codepoint matches the ``NAME_START_CHAR`` production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``NAME_START_CHAR``.
 */ // tslint:disable-next-line:cyclomatic-complexity
function isNameStartChar(c) {
    return c >= 0x41 && c <= 0x5A || c >= 0x61 && c <= 0x7A || c === 0x3A || c === 0x5F || c === 0x200C || c === 0x200D || c >= 0xC0 && c <= 0xD6 || c >= 0xD8 && c <= 0xF6 || c >= 0x00F8 && c <= 0x02FF || c >= 0x0370 && c <= 0x037D || c >= 0x037F && c <= 0x1FFF || c >= 0x2070 && c <= 0x218F || c >= 0x2C00 && c <= 0x2FEF || c >= 0x3001 && c <= 0xD7FF || c >= 0xF900 && c <= 0xFDCF || c >= 0xFDF0 && c <= 0xFFFD || c >= 0x10000 && c <= 0xEFFFF;
}
exports.isNameStartChar = isNameStartChar;
/**
 * Determines whether a codepoint matches the ``NAME_CHAR`` production.
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches ``NAME_CHAR``.
 */ function isNameChar(c) {
    return isNameStartChar(c) || c >= 0x30 && c <= 0x39 || c === 0x2D || c === 0x2E || c === 0xB7 || c >= 0x0300 && c <= 0x036F || c >= 0x203F && c <= 0x2040;
}
exports.isNameChar = isNameChar; //# sourceMappingURL=ed2.js.map
}),
"[project]/frontend/node_modules/.pnpm/xmlchars@2.2.0/node_modules/xmlchars/xmlns/1.0/ed3.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Character class utilities for XML NS 1.0 edition 3.
 *
 * @author Louis-Dominique Dubeau
 * @license MIT
 * @copyright Louis-Dominique Dubeau
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
//
// Fragments.
//
// tslint:disable-next-line:max-line-length
exports.NC_NAME_START_CHAR = "A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\uD800\uDC00-\uDB7F\uDFFF";
exports.NC_NAME_CHAR = "-" + exports.NC_NAME_START_CHAR + ".0-9\u00B7\u0300-\u036F\u203F-\u2040";
//
// Regular expressions.
//
exports.NC_NAME_START_CHAR_RE = new RegExp("^[" + exports.NC_NAME_START_CHAR + "]$", "u");
exports.NC_NAME_CHAR_RE = new RegExp("^[" + exports.NC_NAME_CHAR + "]$", "u");
exports.NC_NAME_RE = new RegExp("^[" + exports.NC_NAME_START_CHAR + "][" + exports.NC_NAME_CHAR + "]*$", "u");
/**
 * Determines whether a codepoint matches [[NC_NAME_START_CHAR]].
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches.
 */ // tslint:disable-next-line:cyclomatic-complexity
function isNCNameStartChar(c) {
    return c >= 0x41 && c <= 0x5A || c === 0x5F || c >= 0x61 && c <= 0x7A || c >= 0xC0 && c <= 0xD6 || c >= 0xD8 && c <= 0xF6 || c >= 0x00F8 && c <= 0x02FF || c >= 0x0370 && c <= 0x037D || c >= 0x037F && c <= 0x1FFF || c >= 0x200C && c <= 0x200D || c >= 0x2070 && c <= 0x218F || c >= 0x2C00 && c <= 0x2FEF || c >= 0x3001 && c <= 0xD7FF || c >= 0xF900 && c <= 0xFDCF || c >= 0xFDF0 && c <= 0xFFFD || c >= 0x10000 && c <= 0xEFFFF;
}
exports.isNCNameStartChar = isNCNameStartChar;
/**
 * Determines whether a codepoint matches [[NC_NAME_CHAR]].
 *
 * @param c The code point.
 *
 * @returns ``true`` if the codepoint matches.
 */ function isNCNameChar(c) {
    return isNCNameStartChar(c) || c === 0x2D || c === 0x2E || c >= 0x30 && c <= 0x39 || c === 0x00B7 || c >= 0x0300 && c <= 0x036F || c >= 0x203F && c <= 0x2040;
}
exports.isNCNameChar = isNCNameChar; //# sourceMappingURL=ed3.js.map
}),
"[project]/frontend/node_modules/.pnpm/saxes@6.0.0/node_modules/saxes/saxes.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SaxesParser = exports.EVENTS = void 0;
const ed5 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/xmlchars@2.2.0/node_modules/xmlchars/xml/1.0/ed5.js [app-ssr] (ecmascript)");
const ed2 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/xmlchars@2.2.0/node_modules/xmlchars/xml/1.1/ed2.js [app-ssr] (ecmascript)");
const NSed3 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/xmlchars@2.2.0/node_modules/xmlchars/xmlns/1.0/ed3.js [app-ssr] (ecmascript)");
var isS = ed5.isS;
var isChar10 = ed5.isChar;
var isNameStartChar = ed5.isNameStartChar;
var isNameChar = ed5.isNameChar;
var S_LIST = ed5.S_LIST;
var NAME_RE = ed5.NAME_RE;
var isChar11 = ed2.isChar;
var isNCNameStartChar = NSed3.isNCNameStartChar;
var isNCNameChar = NSed3.isNCNameChar;
var NC_NAME_RE = NSed3.NC_NAME_RE;
const XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
const XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
const rootNS = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    __proto__: null,
    xml: XML_NAMESPACE,
    xmlns: XMLNS_NAMESPACE
};
const XML_ENTITIES = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    __proto__: null,
    amp: "&",
    gt: ">",
    lt: "<",
    quot: "\"",
    apos: "'"
};
// EOC: end-of-chunk
const EOC = -1;
const NL_LIKE = -2;
const S_BEGIN = 0; // Initial state.
const S_BEGIN_WHITESPACE = 1; // leading whitespace
const S_DOCTYPE = 2; // <!DOCTYPE
const S_DOCTYPE_QUOTE = 3; // <!DOCTYPE "//blah
const S_DTD = 4; // <!DOCTYPE "//blah" [ ...
const S_DTD_QUOTED = 5; // <!DOCTYPE "//blah" [ "foo
const S_DTD_OPEN_WAKA = 6;
const S_DTD_OPEN_WAKA_BANG = 7;
const S_DTD_COMMENT = 8; // <!--
const S_DTD_COMMENT_ENDING = 9; // <!-- blah -
const S_DTD_COMMENT_ENDED = 10; // <!-- blah --
const S_DTD_PI = 11; // <?
const S_DTD_PI_ENDING = 12; // <?hi "there" ?
const S_TEXT = 13; // general stuff
const S_ENTITY = 14; // &amp and such
const S_OPEN_WAKA = 15; // <
const S_OPEN_WAKA_BANG = 16; // <!...
const S_COMMENT = 17; // <!--
const S_COMMENT_ENDING = 18; // <!-- blah -
const S_COMMENT_ENDED = 19; // <!-- blah --
const S_CDATA = 20; // <![CDATA[ something
const S_CDATA_ENDING = 21; // ]
const S_CDATA_ENDING_2 = 22; // ]]
const S_PI_FIRST_CHAR = 23; // <?hi, first char
const S_PI_REST = 24; // <?hi, rest of the name
const S_PI_BODY = 25; // <?hi there
const S_PI_ENDING = 26; // <?hi "there" ?
const S_XML_DECL_NAME_START = 27; // <?xml
const S_XML_DECL_NAME = 28; // <?xml foo
const S_XML_DECL_EQ = 29; // <?xml foo=
const S_XML_DECL_VALUE_START = 30; // <?xml foo=
const S_XML_DECL_VALUE = 31; // <?xml foo="bar"
const S_XML_DECL_SEPARATOR = 32; // <?xml foo="bar"
const S_XML_DECL_ENDING = 33; // <?xml ... ?
const S_OPEN_TAG = 34; // <strong
const S_OPEN_TAG_SLASH = 35; // <strong /
const S_ATTRIB = 36; // <a
const S_ATTRIB_NAME = 37; // <a foo
const S_ATTRIB_NAME_SAW_WHITE = 38; // <a foo _
const S_ATTRIB_VALUE = 39; // <a foo=
const S_ATTRIB_VALUE_QUOTED = 40; // <a foo="bar
const S_ATTRIB_VALUE_CLOSED = 41; // <a foo="bar"
const S_ATTRIB_VALUE_UNQUOTED = 42; // <a foo=bar
const S_CLOSE_TAG = 43; // </a
const S_CLOSE_TAG_SAW_WHITE = 44; // </a   >
const TAB = 9;
const NL = 0xA;
const CR = 0xD;
const SPACE = 0x20;
const BANG = 0x21;
const DQUOTE = 0x22;
const AMP = 0x26;
const SQUOTE = 0x27;
const MINUS = 0x2D;
const FORWARD_SLASH = 0x2F;
const SEMICOLON = 0x3B;
const LESS = 0x3C;
const EQUAL = 0x3D;
const GREATER = 0x3E;
const QUESTION = 0x3F;
const OPEN_BRACKET = 0x5B;
const CLOSE_BRACKET = 0x5D;
const NEL = 0x85;
const LS = 0x2028; // Line Separator
const isQuote = (c)=>c === DQUOTE || c === SQUOTE;
const QUOTES = [
    DQUOTE,
    SQUOTE
];
const DOCTYPE_TERMINATOR = [
    ...QUOTES,
    OPEN_BRACKET,
    GREATER
];
const DTD_TERMINATOR = [
    ...QUOTES,
    LESS,
    CLOSE_BRACKET
];
const XML_DECL_NAME_TERMINATOR = [
    EQUAL,
    QUESTION,
    ...S_LIST
];
const ATTRIB_VALUE_UNQUOTED_TERMINATOR = [
    ...S_LIST,
    GREATER,
    AMP,
    LESS
];
function nsPairCheck(parser, prefix, uri) {
    switch(prefix){
        case "xml":
            if (uri !== XML_NAMESPACE) {
                parser.fail(`xml prefix must be bound to ${XML_NAMESPACE}.`);
            }
            break;
        case "xmlns":
            if (uri !== XMLNS_NAMESPACE) {
                parser.fail(`xmlns prefix must be bound to ${XMLNS_NAMESPACE}.`);
            }
            break;
        default:
    }
    switch(uri){
        case XMLNS_NAMESPACE:
            parser.fail(prefix === "" ? `the default namespace may not be set to ${uri}.` : `may not assign a prefix (even "xmlns") to the URI \
${XMLNS_NAMESPACE}.`);
            break;
        case XML_NAMESPACE:
            switch(prefix){
                case "xml":
                    break;
                case "":
                    parser.fail(`the default namespace may not be set to ${uri}.`);
                    break;
                default:
                    parser.fail("may not assign the xml namespace to another prefix.");
            }
            break;
        default:
    }
}
function nsMappingCheck(parser, mapping) {
    for (const local of Object.keys(mapping)){
        nsPairCheck(parser, local, mapping[local]);
    }
}
const isNCName = (name)=>NC_NAME_RE.test(name);
const isName = (name)=>NAME_RE.test(name);
const FORBIDDEN_START = 0;
const FORBIDDEN_BRACKET = 1;
const FORBIDDEN_BRACKET_BRACKET = 2;
/**
 * The list of supported events.
 */ exports.EVENTS = [
    "xmldecl",
    "text",
    "processinginstruction",
    "doctype",
    "comment",
    "opentagstart",
    "attribute",
    "opentag",
    "closetag",
    "cdata",
    "error",
    "end",
    "ready"
];
const EVENT_NAME_TO_HANDLER_NAME = {
    xmldecl: "xmldeclHandler",
    text: "textHandler",
    processinginstruction: "piHandler",
    doctype: "doctypeHandler",
    comment: "commentHandler",
    opentagstart: "openTagStartHandler",
    attribute: "attributeHandler",
    opentag: "openTagHandler",
    closetag: "closeTagHandler",
    cdata: "cdataHandler",
    error: "errorHandler",
    end: "endHandler",
    ready: "readyHandler"
};
// eslint-disable-next-line @typescript-eslint/ban-types
class SaxesParser {
    /**
     * @param opt The parser options.
     */ constructor(opt){
        this.opt = opt !== null && opt !== void 0 ? opt : {};
        this.fragmentOpt = !!this.opt.fragment;
        const xmlnsOpt = this.xmlnsOpt = !!this.opt.xmlns;
        this.trackPosition = this.opt.position !== false;
        this.fileName = this.opt.fileName;
        if (xmlnsOpt) {
            // This is the function we use to perform name checks on PIs and entities.
            // When namespaces are used, colons are not allowed in PI target names or
            // entity names. So the check depends on whether namespaces are used. See:
            //
            // https://www.w3.org/XML/xml-names-19990114-errata.html
            // NE08
            //
            this.nameStartCheck = isNCNameStartChar;
            this.nameCheck = isNCNameChar;
            this.isName = isNCName;
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.processAttribs = this.processAttribsNS;
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.pushAttrib = this.pushAttribNS;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
            this.ns = Object.assign({
                __proto__: null
            }, rootNS);
            const additional = this.opt.additionalNamespaces;
            if (additional != null) {
                nsMappingCheck(this, additional);
                Object.assign(this.ns, additional);
            }
        } else {
            this.nameStartCheck = isNameStartChar;
            this.nameCheck = isNameChar;
            this.isName = isName;
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.processAttribs = this.processAttribsPlain;
            // eslint-disable-next-line @typescript-eslint/unbound-method
            this.pushAttrib = this.pushAttribPlain;
        }
        //
        // The order of the members in this table needs to correspond to the state
        // numbers given to the states that correspond to the methods being recorded
        // here.
        //
        this.stateTable = [
            /* eslint-disable @typescript-eslint/unbound-method */ this.sBegin,
            this.sBeginWhitespace,
            this.sDoctype,
            this.sDoctypeQuote,
            this.sDTD,
            this.sDTDQuoted,
            this.sDTDOpenWaka,
            this.sDTDOpenWakaBang,
            this.sDTDComment,
            this.sDTDCommentEnding,
            this.sDTDCommentEnded,
            this.sDTDPI,
            this.sDTDPIEnding,
            this.sText,
            this.sEntity,
            this.sOpenWaka,
            this.sOpenWakaBang,
            this.sComment,
            this.sCommentEnding,
            this.sCommentEnded,
            this.sCData,
            this.sCDataEnding,
            this.sCDataEnding2,
            this.sPIFirstChar,
            this.sPIRest,
            this.sPIBody,
            this.sPIEnding,
            this.sXMLDeclNameStart,
            this.sXMLDeclName,
            this.sXMLDeclEq,
            this.sXMLDeclValueStart,
            this.sXMLDeclValue,
            this.sXMLDeclSeparator,
            this.sXMLDeclEnding,
            this.sOpenTag,
            this.sOpenTagSlash,
            this.sAttrib,
            this.sAttribName,
            this.sAttribNameSawWhite,
            this.sAttribValue,
            this.sAttribValueQuoted,
            this.sAttribValueClosed,
            this.sAttribValueUnquoted,
            this.sCloseTag,
            this.sCloseTagSawWhite
        ];
        this._init();
    }
    /**
     * Indicates whether or not the parser is closed. If ``true``, wait for
     * the ``ready`` event to write again.
     */ get closed() {
        return this._closed;
    }
    _init() {
        var _a;
        this.openWakaBang = "";
        this.text = "";
        this.name = "";
        this.piTarget = "";
        this.entity = "";
        this.q = null;
        this.tags = [];
        this.tag = null;
        this.topNS = null;
        this.chunk = "";
        this.chunkPosition = 0;
        this.i = 0;
        this.prevI = 0;
        this.carriedFromPrevious = undefined;
        this.forbiddenState = FORBIDDEN_START;
        this.attribList = [];
        // The logic is organized so as to minimize the need to check
        // this.opt.fragment while parsing.
        const { fragmentOpt } = this;
        this.state = fragmentOpt ? S_TEXT : S_BEGIN;
        // We want these to be all true if we are dealing with a fragment.
        this.reportedTextBeforeRoot = this.reportedTextAfterRoot = this.closedRoot = this.sawRoot = fragmentOpt;
        // An XML declaration is intially possible only when parsing whole
        // documents.
        this.xmlDeclPossible = !fragmentOpt;
        this.xmlDeclExpects = [
            "version"
        ];
        this.entityReturnState = undefined;
        let { defaultXMLVersion } = this.opt;
        if (defaultXMLVersion === undefined) {
            if (this.opt.forceXMLVersion === true) {
                throw new Error("forceXMLVersion set but defaultXMLVersion is not set");
            }
            defaultXMLVersion = "1.0";
        }
        this.setXMLVersion(defaultXMLVersion);
        this.positionAtNewLine = 0;
        this.doctype = false;
        this._closed = false;
        this.xmlDecl = {
            version: undefined,
            encoding: undefined,
            standalone: undefined
        };
        this.line = 1;
        this.column = 0;
        this.ENTITIES = Object.create(XML_ENTITIES);
        (_a = this.readyHandler) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    /**
     * The stream position the parser is currently looking at. This field is
     * zero-based.
     *
     * This field is not based on counting Unicode characters but is to be
     * interpreted as a plain index into a JavaScript string.
     */ get position() {
        return this.chunkPosition + this.i;
    }
    /**
     * The column number of the next character to be read by the parser.  *
     * This field is zero-based. (The first column in a line is 0.)
     *
     * This field reports the index at which the next character would be in the
     * line if the line were represented as a JavaScript string.  Note that this
     * *can* be different to a count based on the number of *Unicode characters*
     * due to how JavaScript handles astral plane characters.
     *
     * See [[column]] for a number that corresponds to a count of Unicode
     * characters.
     */ get columnIndex() {
        return this.position - this.positionAtNewLine;
    }
    /**
     * Set an event listener on an event. The parser supports one handler per
     * event type. If you try to set an event handler over an existing handler,
     * the old handler is silently overwritten.
     *
     * @param name The event to listen to.
     *
     * @param handler The handler to set.
     */ on(name, handler) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        this[EVENT_NAME_TO_HANDLER_NAME[name]] = handler;
    }
    /**
     * Unset an event handler.
     *
     * @parma name The event to stop listening to.
     */ off(name) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        this[EVENT_NAME_TO_HANDLER_NAME[name]] = undefined;
    }
    /**
     * Make an error object. The error object will have a message that contains
     * the ``fileName`` option passed at the creation of the parser. If position
     * tracking was turned on, it will also have line and column number
     * information.
     *
     * @param message The message describing the error to report.
     *
     * @returns An error object with a properly formatted message.
     */ makeError(message) {
        var _a;
        let msg = (_a = this.fileName) !== null && _a !== void 0 ? _a : "";
        if (this.trackPosition) {
            if (msg.length > 0) {
                msg += ":";
            }
            msg += `${this.line}:${this.column}`;
        }
        if (msg.length > 0) {
            msg += ": ";
        }
        return new Error(msg + message);
    }
    /**
     * Report a parsing error. This method is made public so that client code may
     * check for issues that are outside the scope of this project and can report
     * errors.
     *
     * @param message The error to report.
     *
     * @returns this
     */ fail(message) {
        const err = this.makeError(message);
        const handler = this.errorHandler;
        if (handler === undefined) {
            throw err;
        } else {
            handler(err);
        }
        return this;
    }
    /**
     * Write a XML data to the parser.
     *
     * @param chunk The XML data to write.
     *
     * @returns this
     */ // We do need object for the type here. Yes, it often causes problems
    // but not in this case.
    write(chunk) {
        if (this.closed) {
            return this.fail("cannot write after close; assign an onready handler.");
        }
        let end = false;
        if (chunk === null) {
            // We cannot return immediately because carriedFromPrevious may need
            // processing.
            end = true;
            chunk = "";
        } else if (typeof chunk === "object") {
            chunk = chunk.toString();
        }
        // We checked if performing a pre-decomposition of the string into an array
        // of single complete characters (``Array.from(chunk)``) would be faster
        // than the current repeated calls to ``charCodeAt``. As of August 2018, it
        // isn't. (There may be Node-specific code that would perform faster than
        // ``Array.from`` but don't want to be dependent on Node.)
        if (this.carriedFromPrevious !== undefined) {
            // The previous chunk had char we must carry over.
            chunk = `${this.carriedFromPrevious}${chunk}`;
            this.carriedFromPrevious = undefined;
        }
        let limit = chunk.length;
        const lastCode = chunk.charCodeAt(limit - 1);
        if (!end && // A trailing CR or surrogate must be carried over to the next
        // chunk.
        (lastCode === CR || lastCode >= 0xD800 && lastCode <= 0xDBFF)) {
            // The chunk ends with a character that must be carried over. We cannot
            // know how to handle it until we get the next chunk or the end of the
            // stream. So save it for later.
            this.carriedFromPrevious = chunk[limit - 1];
            limit--;
            chunk = chunk.slice(0, limit);
        }
        const { stateTable } = this;
        this.chunk = chunk;
        this.i = 0;
        while(this.i < limit){
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
            stateTable[this.state].call(this);
        }
        this.chunkPosition += limit;
        return end ? this.end() : this;
    }
    /**
     * Close the current stream. Perform final well-formedness checks and reset
     * the parser tstate.
     *
     * @returns this
     */ close() {
        return this.write(null);
    }
    /**
     * Get a single code point out of the current chunk. This updates the current
     * position if we do position tracking.
     *
     * This is the algorithm to use for XML 1.0.
     *
     * @returns The character read.
     */ getCode10() {
        const { chunk, i } = this;
        this.prevI = i;
        // Yes, we do this instead of doing this.i++. Doing it this way, we do not
        // read this.i again, which is a bit faster.
        this.i = i + 1;
        if (i >= chunk.length) {
            return EOC;
        }
        // Using charCodeAt and handling the surrogates ourselves is faster
        // than using codePointAt.
        const code = chunk.charCodeAt(i);
        this.column++;
        if (code < 0xD800) {
            if (code >= SPACE || code === TAB) {
                return code;
            }
            switch(code){
                case NL:
                    this.line++;
                    this.column = 0;
                    this.positionAtNewLine = this.position;
                    return NL;
                case CR:
                    // We may get NaN if we read past the end of the chunk, which is fine.
                    if (chunk.charCodeAt(i + 1) === NL) {
                        // A \r\n sequence is converted to \n so we have to skip over the
                        // next character. We already know it has a size of 1 so ++ is fine
                        // here.
                        this.i = i + 2;
                    }
                    // Otherwise, a \r is just converted to \n, so we don't have to skip
                    // ahead.
                    // In either case, \r becomes \n.
                    this.line++;
                    this.column = 0;
                    this.positionAtNewLine = this.position;
                    return NL_LIKE;
                default:
                    // If we get here, then code < SPACE and it is not NL CR or TAB.
                    this.fail("disallowed character.");
                    return code;
            }
        }
        if (code > 0xDBFF) {
            // This is a specialized version of isChar10 that takes into account
            // that in this context code > 0xDBFF and code <= 0xFFFF. So it does not
            // test cases that don't need testing.
            if (!(code >= 0xE000 && code <= 0xFFFD)) {
                this.fail("disallowed character.");
            }
            return code;
        }
        const final = 0x10000 + (code - 0xD800) * 0x400 + (chunk.charCodeAt(i + 1) - 0xDC00);
        this.i = i + 2;
        // This is a specialized version of isChar10 that takes into account that in
        // this context necessarily final >= 0x10000.
        if (final > 0x10FFFF) {
            this.fail("disallowed character.");
        }
        return final;
    }
    /**
     * Get a single code point out of the current chunk. This updates the current
     * position if we do position tracking.
     *
     * This is the algorithm to use for XML 1.1.
     *
     * @returns {number} The character read.
     */ getCode11() {
        const { chunk, i } = this;
        this.prevI = i;
        // Yes, we do this instead of doing this.i++. Doing it this way, we do not
        // read this.i again, which is a bit faster.
        this.i = i + 1;
        if (i >= chunk.length) {
            return EOC;
        }
        // Using charCodeAt and handling the surrogates ourselves is faster
        // than using codePointAt.
        const code = chunk.charCodeAt(i);
        this.column++;
        if (code < 0xD800) {
            if (code > 0x1F && code < 0x7F || code > 0x9F && code !== LS || code === TAB) {
                return code;
            }
            switch(code){
                case NL:
                    this.line++;
                    this.column = 0;
                    this.positionAtNewLine = this.position;
                    return NL;
                case CR:
                    {
                        // We may get NaN if we read past the end of the chunk, which is
                        // fine.
                        const next = chunk.charCodeAt(i + 1);
                        if (next === NL || next === NEL) {
                            // A CR NL or CR NEL sequence is converted to NL so we have to skip
                            // over the next character. We already know it has a size of 1.
                            this.i = i + 2;
                        }
                    // Otherwise, a CR is just converted to NL, no skip.
                    }
                /* yes, fall through */ case NEL:
                case LS:
                    this.line++;
                    this.column = 0;
                    this.positionAtNewLine = this.position;
                    return NL_LIKE;
                default:
                    this.fail("disallowed character.");
                    return code;
            }
        }
        if (code > 0xDBFF) {
            // This is a specialized version of isCharAndNotRestricted that takes into
            // account that in this context code > 0xDBFF and code <= 0xFFFF. So it
            // does not test cases that don't need testing.
            if (!(code >= 0xE000 && code <= 0xFFFD)) {
                this.fail("disallowed character.");
            }
            return code;
        }
        const final = 0x10000 + (code - 0xD800) * 0x400 + (chunk.charCodeAt(i + 1) - 0xDC00);
        this.i = i + 2;
        // This is a specialized version of isCharAndNotRestricted that takes into
        // account that in this context necessarily final >= 0x10000.
        if (final > 0x10FFFF) {
            this.fail("disallowed character.");
        }
        return final;
    }
    /**
     * Like ``getCode`` but with the return value normalized so that ``NL`` is
     * returned for ``NL_LIKE``.
     */ getCodeNorm() {
        const c = this.getCode();
        return c === NL_LIKE ? NL : c;
    }
    unget() {
        this.i = this.prevI;
        this.column--;
    }
    /**
     * Capture characters into a buffer until encountering one of a set of
     * characters.
     *
     * @param chars An array of codepoints. Encountering a character in the array
     * ends the capture. (``chars`` may safely contain ``NL``.)
     *
     * @return The character code that made the capture end, or ``EOC`` if we hit
     * the end of the chunk. The return value cannot be NL_LIKE: NL is returned
     * instead.
     */ captureTo(chars) {
        let { i: start } = this;
        const { chunk } = this;
        // eslint-disable-next-line no-constant-condition
        while(true){
            const c = this.getCode();
            const isNLLike = c === NL_LIKE;
            const final = isNLLike ? NL : c;
            if (final === EOC || chars.includes(final)) {
                this.text += chunk.slice(start, this.prevI);
                return final;
            }
            if (isNLLike) {
                this.text += `${chunk.slice(start, this.prevI)}\n`;
                start = this.i;
            }
        }
    }
    /**
     * Capture characters into a buffer until encountering a character.
     *
     * @param char The codepoint that ends the capture. **NOTE ``char`` MAY NOT
     * CONTAIN ``NL``.** Passing ``NL`` will result in buggy behavior.
     *
     * @return ``true`` if we ran into the character. Otherwise, we ran into the
     * end of the current chunk.
     */ captureToChar(char) {
        let { i: start } = this;
        const { chunk } = this;
        // eslint-disable-next-line no-constant-condition
        while(true){
            let c = this.getCode();
            switch(c){
                case NL_LIKE:
                    this.text += `${chunk.slice(start, this.prevI)}\n`;
                    start = this.i;
                    c = NL;
                    break;
                case EOC:
                    this.text += chunk.slice(start);
                    return false;
                default:
            }
            if (c === char) {
                this.text += chunk.slice(start, this.prevI);
                return true;
            }
        }
    }
    /**
     * Capture characters that satisfy ``isNameChar`` into the ``name`` field of
     * this parser.
     *
     * @return The character code that made the test fail, or ``EOC`` if we hit
     * the end of the chunk. The return value cannot be NL_LIKE: NL is returned
     * instead.
     */ captureNameChars() {
        const { chunk, i: start } = this;
        // eslint-disable-next-line no-constant-condition
        while(true){
            const c = this.getCode();
            if (c === EOC) {
                this.name += chunk.slice(start);
                return EOC;
            }
            // NL is not a name char so we don't have to test specifically for it.
            if (!isNameChar(c)) {
                this.name += chunk.slice(start, this.prevI);
                return c === NL_LIKE ? NL : c;
            }
        }
    }
    /**
     * Skip white spaces.
     *
     * @return The character that ended the skip, or ``EOC`` if we hit
     * the end of the chunk. The return value cannot be NL_LIKE: NL is returned
     * instead.
     */ skipSpaces() {
        // eslint-disable-next-line no-constant-condition
        while(true){
            const c = this.getCodeNorm();
            if (c === EOC || !isS(c)) {
                return c;
            }
        }
    }
    setXMLVersion(version) {
        this.currentXMLVersion = version;
        /*  eslint-disable @typescript-eslint/unbound-method */ if (version === "1.0") {
            this.isChar = isChar10;
            this.getCode = this.getCode10;
        } else {
            this.isChar = isChar11;
            this.getCode = this.getCode11;
        }
    /* eslint-enable @typescript-eslint/unbound-method */ }
    // STATE ENGINE METHODS
    // This needs to be a state separate from S_BEGIN_WHITESPACE because we want
    // to be sure never to come back to this state later.
    sBegin() {
        // We are essentially peeking at the first character of the chunk. Since
        // S_BEGIN can be in effect only when we start working on the first chunk,
        // the index at which we must look is necessarily 0. Note also that the
        // following test does not depend on decoding surrogates.
        // If the initial character is 0xFEFF, ignore it.
        if (this.chunk.charCodeAt(0) === 0xFEFF) {
            this.i++;
            this.column++;
        }
        this.state = S_BEGIN_WHITESPACE;
    }
    sBeginWhitespace() {
        // We need to know whether we've encountered spaces or not because as soon
        // as we run into a space, an XML declaration is no longer possible. Rather
        // than slow down skipSpaces even in places where we don't care whether it
        // skipped anything or not, we check whether prevI is equal to the value of
        // i from before we skip spaces.
        const iBefore = this.i;
        const c = this.skipSpaces();
        if (this.prevI !== iBefore) {
            this.xmlDeclPossible = false;
        }
        switch(c){
            case LESS:
                this.state = S_OPEN_WAKA;
                // We could naively call closeText but in this state, it is not normal
                // to have text be filled with any data.
                if (this.text.length !== 0) {
                    throw new Error("no-empty text at start");
                }
                break;
            case EOC:
                break;
            default:
                this.unget();
                this.state = S_TEXT;
                this.xmlDeclPossible = false;
        }
    }
    sDoctype() {
        var _a;
        const c = this.captureTo(DOCTYPE_TERMINATOR);
        switch(c){
            case GREATER:
                {
                    (_a = this.doctypeHandler) === null || _a === void 0 ? void 0 : _a.call(this, this.text);
                    this.text = "";
                    this.state = S_TEXT;
                    this.doctype = true; // just remember that we saw it.
                    break;
                }
            case EOC:
                break;
            default:
                this.text += String.fromCodePoint(c);
                if (c === OPEN_BRACKET) {
                    this.state = S_DTD;
                } else if (isQuote(c)) {
                    this.state = S_DOCTYPE_QUOTE;
                    this.q = c;
                }
        }
    }
    sDoctypeQuote() {
        const q = this.q;
        if (this.captureToChar(q)) {
            this.text += String.fromCodePoint(q);
            this.q = null;
            this.state = S_DOCTYPE;
        }
    }
    sDTD() {
        const c = this.captureTo(DTD_TERMINATOR);
        if (c === EOC) {
            return;
        }
        this.text += String.fromCodePoint(c);
        if (c === CLOSE_BRACKET) {
            this.state = S_DOCTYPE;
        } else if (c === LESS) {
            this.state = S_DTD_OPEN_WAKA;
        } else if (isQuote(c)) {
            this.state = S_DTD_QUOTED;
            this.q = c;
        }
    }
    sDTDQuoted() {
        const q = this.q;
        if (this.captureToChar(q)) {
            this.text += String.fromCodePoint(q);
            this.state = S_DTD;
            this.q = null;
        }
    }
    sDTDOpenWaka() {
        const c = this.getCodeNorm();
        this.text += String.fromCodePoint(c);
        switch(c){
            case BANG:
                this.state = S_DTD_OPEN_WAKA_BANG;
                this.openWakaBang = "";
                break;
            case QUESTION:
                this.state = S_DTD_PI;
                break;
            default:
                this.state = S_DTD;
        }
    }
    sDTDOpenWakaBang() {
        const char = String.fromCodePoint(this.getCodeNorm());
        const owb = this.openWakaBang += char;
        this.text += char;
        if (owb !== "-") {
            this.state = owb === "--" ? S_DTD_COMMENT : S_DTD;
            this.openWakaBang = "";
        }
    }
    sDTDComment() {
        if (this.captureToChar(MINUS)) {
            this.text += "-";
            this.state = S_DTD_COMMENT_ENDING;
        }
    }
    sDTDCommentEnding() {
        const c = this.getCodeNorm();
        this.text += String.fromCodePoint(c);
        this.state = c === MINUS ? S_DTD_COMMENT_ENDED : S_DTD_COMMENT;
    }
    sDTDCommentEnded() {
        const c = this.getCodeNorm();
        this.text += String.fromCodePoint(c);
        if (c === GREATER) {
            this.state = S_DTD;
        } else {
            this.fail("malformed comment.");
            // <!-- blah -- bloo --> will be recorded as
            // a comment of " blah -- bloo "
            this.state = S_DTD_COMMENT;
        }
    }
    sDTDPI() {
        if (this.captureToChar(QUESTION)) {
            this.text += "?";
            this.state = S_DTD_PI_ENDING;
        }
    }
    sDTDPIEnding() {
        const c = this.getCodeNorm();
        this.text += String.fromCodePoint(c);
        if (c === GREATER) {
            this.state = S_DTD;
        }
    }
    sText() {
        //
        // We did try a version of saxes where the S_TEXT state was split in two
        // states: one for text inside the root element, and one for text
        // outside. This was avoiding having to test this.tags.length to decide
        // what implementation to actually use.
        //
        // Peformance testing on gigabyte-size files did not show any advantage to
        // using the two states solution instead of the current one. Conversely, it
        // made the code a bit more complicated elsewhere. For instance, a comment
        // can appear before the root element so when a comment ended it was
        // necessary to determine whether to return to the S_TEXT state or to the
        // new text-outside-root state.
        //
        if (this.tags.length !== 0) {
            this.handleTextInRoot();
        } else {
            this.handleTextOutsideRoot();
        }
    }
    sEntity() {
        // This is essentially a specialized version of captureToChar(SEMICOLON...)
        let { i: start } = this;
        const { chunk } = this;
        // eslint-disable-next-line no-labels, no-restricted-syntax
        loop: // eslint-disable-next-line no-constant-condition
        while(true){
            switch(this.getCode()){
                case NL_LIKE:
                    this.entity += `${chunk.slice(start, this.prevI)}\n`;
                    start = this.i;
                    break;
                case SEMICOLON:
                    {
                        const { entityReturnState } = this;
                        const entity = this.entity + chunk.slice(start, this.prevI);
                        this.state = entityReturnState;
                        let parsed;
                        if (entity === "") {
                            this.fail("empty entity name.");
                            parsed = "&;";
                        } else {
                            parsed = this.parseEntity(entity);
                            this.entity = "";
                        }
                        if (entityReturnState !== S_TEXT || this.textHandler !== undefined) {
                            this.text += parsed;
                        }
                        break loop;
                    }
                case EOC:
                    this.entity += chunk.slice(start);
                    break loop;
                default:
            }
        }
    }
    sOpenWaka() {
        // Reminder: a state handler is called with at least one character
        // available in the current chunk. So the first call to get code inside of
        // a state handler cannot return ``EOC``. That's why we don't test
        // for it.
        const c = this.getCode();
        // either a /, ?, !, or text is coming next.
        if (isNameStartChar(c)) {
            this.state = S_OPEN_TAG;
            this.unget();
            this.xmlDeclPossible = false;
        } else {
            switch(c){
                case FORWARD_SLASH:
                    this.state = S_CLOSE_TAG;
                    this.xmlDeclPossible = false;
                    break;
                case BANG:
                    this.state = S_OPEN_WAKA_BANG;
                    this.openWakaBang = "";
                    this.xmlDeclPossible = false;
                    break;
                case QUESTION:
                    this.state = S_PI_FIRST_CHAR;
                    break;
                default:
                    this.fail("disallowed character in tag name");
                    this.state = S_TEXT;
                    this.xmlDeclPossible = false;
            }
        }
    }
    sOpenWakaBang() {
        this.openWakaBang += String.fromCodePoint(this.getCodeNorm());
        switch(this.openWakaBang){
            case "[CDATA[":
                if (!this.sawRoot && !this.reportedTextBeforeRoot) {
                    this.fail("text data outside of root node.");
                    this.reportedTextBeforeRoot = true;
                }
                if (this.closedRoot && !this.reportedTextAfterRoot) {
                    this.fail("text data outside of root node.");
                    this.reportedTextAfterRoot = true;
                }
                this.state = S_CDATA;
                this.openWakaBang = "";
                break;
            case "--":
                this.state = S_COMMENT;
                this.openWakaBang = "";
                break;
            case "DOCTYPE":
                this.state = S_DOCTYPE;
                if (this.doctype || this.sawRoot) {
                    this.fail("inappropriately located doctype declaration.");
                }
                this.openWakaBang = "";
                break;
            default:
                // 7 happens to be the maximum length of the string that can possibly
                // match one of the cases above.
                if (this.openWakaBang.length >= 7) {
                    this.fail("incorrect syntax.");
                }
        }
    }
    sComment() {
        if (this.captureToChar(MINUS)) {
            this.state = S_COMMENT_ENDING;
        }
    }
    sCommentEnding() {
        var _a;
        const c = this.getCodeNorm();
        if (c === MINUS) {
            this.state = S_COMMENT_ENDED;
            (_a = this.commentHandler) === null || _a === void 0 ? void 0 : _a.call(this, this.text);
            this.text = "";
        } else {
            this.text += `-${String.fromCodePoint(c)}`;
            this.state = S_COMMENT;
        }
    }
    sCommentEnded() {
        const c = this.getCodeNorm();
        if (c !== GREATER) {
            this.fail("malformed comment.");
            // <!-- blah -- bloo --> will be recorded as
            // a comment of " blah -- bloo "
            this.text += `--${String.fromCodePoint(c)}`;
            this.state = S_COMMENT;
        } else {
            this.state = S_TEXT;
        }
    }
    sCData() {
        if (this.captureToChar(CLOSE_BRACKET)) {
            this.state = S_CDATA_ENDING;
        }
    }
    sCDataEnding() {
        const c = this.getCodeNorm();
        if (c === CLOSE_BRACKET) {
            this.state = S_CDATA_ENDING_2;
        } else {
            this.text += `]${String.fromCodePoint(c)}`;
            this.state = S_CDATA;
        }
    }
    sCDataEnding2() {
        var _a;
        const c = this.getCodeNorm();
        switch(c){
            case GREATER:
                {
                    (_a = this.cdataHandler) === null || _a === void 0 ? void 0 : _a.call(this, this.text);
                    this.text = "";
                    this.state = S_TEXT;
                    break;
                }
            case CLOSE_BRACKET:
                this.text += "]";
                break;
            default:
                this.text += `]]${String.fromCodePoint(c)}`;
                this.state = S_CDATA;
        }
    }
    // We need this separate state to check the first character fo the pi target
    // with this.nameStartCheck which allows less characters than this.nameCheck.
    sPIFirstChar() {
        const c = this.getCodeNorm();
        // This is first because in the case where the file is well-formed this is
        // the branch taken. We optimize for well-formedness.
        if (this.nameStartCheck(c)) {
            this.piTarget += String.fromCodePoint(c);
            this.state = S_PI_REST;
        } else if (c === QUESTION || isS(c)) {
            this.fail("processing instruction without a target.");
            this.state = c === QUESTION ? S_PI_ENDING : S_PI_BODY;
        } else {
            this.fail("disallowed character in processing instruction name.");
            this.piTarget += String.fromCodePoint(c);
            this.state = S_PI_REST;
        }
    }
    sPIRest() {
        // Capture characters into a piTarget while ``this.nameCheck`` run on the
        // character read returns true.
        const { chunk, i: start } = this;
        // eslint-disable-next-line no-constant-condition
        while(true){
            const c = this.getCodeNorm();
            if (c === EOC) {
                this.piTarget += chunk.slice(start);
                return;
            }
            // NL cannot satisfy this.nameCheck so we don't have to test specifically
            // for it.
            if (!this.nameCheck(c)) {
                this.piTarget += chunk.slice(start, this.prevI);
                const isQuestion = c === QUESTION;
                if (isQuestion || isS(c)) {
                    if (this.piTarget === "xml") {
                        if (!this.xmlDeclPossible) {
                            this.fail("an XML declaration must be at the start of the document.");
                        }
                        this.state = isQuestion ? S_XML_DECL_ENDING : S_XML_DECL_NAME_START;
                    } else {
                        this.state = isQuestion ? S_PI_ENDING : S_PI_BODY;
                    }
                } else {
                    this.fail("disallowed character in processing instruction name.");
                    this.piTarget += String.fromCodePoint(c);
                }
                break;
            }
        }
    }
    sPIBody() {
        if (this.text.length === 0) {
            const c = this.getCodeNorm();
            if (c === QUESTION) {
                this.state = S_PI_ENDING;
            } else if (!isS(c)) {
                this.text = String.fromCodePoint(c);
            }
        } else if (this.captureToChar(QUESTION)) {
            this.state = S_PI_ENDING;
        }
    }
    sPIEnding() {
        var _a;
        const c = this.getCodeNorm();
        if (c === GREATER) {
            const { piTarget } = this;
            if (piTarget.toLowerCase() === "xml") {
                this.fail("the XML declaration must appear at the start of the document.");
            }
            (_a = this.piHandler) === null || _a === void 0 ? void 0 : _a.call(this, {
                target: piTarget,
                body: this.text
            });
            this.piTarget = this.text = "";
            this.state = S_TEXT;
        } else if (c === QUESTION) {
            // We ran into ?? as part of a processing instruction. We initially took
            // the first ? as a sign that the PI was ending, but it is not. So we have
            // to add it to the body but we take the new ? as a sign that the PI is
            // ending.
            this.text += "?";
        } else {
            this.text += `?${String.fromCodePoint(c)}`;
            this.state = S_PI_BODY;
        }
        this.xmlDeclPossible = false;
    }
    sXMLDeclNameStart() {
        const c = this.skipSpaces();
        // The question mark character is not valid inside any of the XML
        // declaration name/value pairs.
        if (c === QUESTION) {
            // It is valid to go to S_XML_DECL_ENDING from this state.
            this.state = S_XML_DECL_ENDING;
            return;
        }
        if (c !== EOC) {
            this.state = S_XML_DECL_NAME;
            this.name = String.fromCodePoint(c);
        }
    }
    sXMLDeclName() {
        const c = this.captureTo(XML_DECL_NAME_TERMINATOR);
        // The question mark character is not valid inside any of the XML
        // declaration name/value pairs.
        if (c === QUESTION) {
            this.state = S_XML_DECL_ENDING;
            this.name += this.text;
            this.text = "";
            this.fail("XML declaration is incomplete.");
            return;
        }
        if (!(isS(c) || c === EQUAL)) {
            return;
        }
        this.name += this.text;
        this.text = "";
        if (!this.xmlDeclExpects.includes(this.name)) {
            switch(this.name.length){
                case 0:
                    this.fail("did not expect any more name/value pairs.");
                    break;
                case 1:
                    this.fail(`expected the name ${this.xmlDeclExpects[0]}.`);
                    break;
                default:
                    this.fail(`expected one of ${this.xmlDeclExpects.join(", ")}`);
            }
        }
        this.state = c === EQUAL ? S_XML_DECL_VALUE_START : S_XML_DECL_EQ;
    }
    sXMLDeclEq() {
        const c = this.getCodeNorm();
        // The question mark character is not valid inside any of the XML
        // declaration name/value pairs.
        if (c === QUESTION) {
            this.state = S_XML_DECL_ENDING;
            this.fail("XML declaration is incomplete.");
            return;
        }
        if (isS(c)) {
            return;
        }
        if (c !== EQUAL) {
            this.fail("value required.");
        }
        this.state = S_XML_DECL_VALUE_START;
    }
    sXMLDeclValueStart() {
        const c = this.getCodeNorm();
        // The question mark character is not valid inside any of the XML
        // declaration name/value pairs.
        if (c === QUESTION) {
            this.state = S_XML_DECL_ENDING;
            this.fail("XML declaration is incomplete.");
            return;
        }
        if (isS(c)) {
            return;
        }
        if (!isQuote(c)) {
            this.fail("value must be quoted.");
            this.q = SPACE;
        } else {
            this.q = c;
        }
        this.state = S_XML_DECL_VALUE;
    }
    sXMLDeclValue() {
        const c = this.captureTo([
            this.q,
            QUESTION
        ]);
        // The question mark character is not valid inside any of the XML
        // declaration name/value pairs.
        if (c === QUESTION) {
            this.state = S_XML_DECL_ENDING;
            this.text = "";
            this.fail("XML declaration is incomplete.");
            return;
        }
        if (c === EOC) {
            return;
        }
        const value = this.text;
        this.text = "";
        switch(this.name){
            case "version":
                {
                    this.xmlDeclExpects = [
                        "encoding",
                        "standalone"
                    ];
                    const version = value;
                    this.xmlDecl.version = version;
                    // This is the test specified by XML 1.0 but it is fine for XML 1.1.
                    if (!/^1\.[0-9]+$/.test(version)) {
                        this.fail("version number must match /^1\\.[0-9]+$/.");
                    } else if (!this.opt.forceXMLVersion) {
                        this.setXMLVersion(version);
                    }
                    break;
                }
            case "encoding":
                if (!/^[A-Za-z][A-Za-z0-9._-]*$/.test(value)) {
                    this.fail("encoding value must match \
/^[A-Za-z0-9][A-Za-z0-9._-]*$/.");
                }
                this.xmlDeclExpects = [
                    "standalone"
                ];
                this.xmlDecl.encoding = value;
                break;
            case "standalone":
                if (value !== "yes" && value !== "no") {
                    this.fail("standalone value must match \"yes\" or \"no\".");
                }
                this.xmlDeclExpects = [];
                this.xmlDecl.standalone = value;
                break;
            default:
        }
        this.name = "";
        this.state = S_XML_DECL_SEPARATOR;
    }
    sXMLDeclSeparator() {
        const c = this.getCodeNorm();
        // The question mark character is not valid inside any of the XML
        // declaration name/value pairs.
        if (c === QUESTION) {
            // It is valid to go to S_XML_DECL_ENDING from this state.
            this.state = S_XML_DECL_ENDING;
            return;
        }
        if (!isS(c)) {
            this.fail("whitespace required.");
            this.unget();
        }
        this.state = S_XML_DECL_NAME_START;
    }
    sXMLDeclEnding() {
        var _a;
        const c = this.getCodeNorm();
        if (c === GREATER) {
            if (this.piTarget !== "xml") {
                this.fail("processing instructions are not allowed before root.");
            } else if (this.name !== "version" && this.xmlDeclExpects.includes("version")) {
                this.fail("XML declaration must contain a version.");
            }
            (_a = this.xmldeclHandler) === null || _a === void 0 ? void 0 : _a.call(this, this.xmlDecl);
            this.name = "";
            this.piTarget = this.text = "";
            this.state = S_TEXT;
        } else {
            // We got here because the previous character was a ?, but the question
            // mark character is not valid inside any of the XML declaration
            // name/value pairs.
            this.fail("The character ? is disallowed anywhere in XML declarations.");
        }
        this.xmlDeclPossible = false;
    }
    sOpenTag() {
        var _a;
        const c = this.captureNameChars();
        if (c === EOC) {
            return;
        }
        const tag = this.tag = {
            name: this.name,
            attributes: Object.create(null)
        };
        this.name = "";
        if (this.xmlnsOpt) {
            this.topNS = tag.ns = Object.create(null);
        }
        (_a = this.openTagStartHandler) === null || _a === void 0 ? void 0 : _a.call(this, tag);
        this.sawRoot = true;
        if (!this.fragmentOpt && this.closedRoot) {
            this.fail("documents may contain only one root.");
        }
        switch(c){
            case GREATER:
                this.openTag();
                break;
            case FORWARD_SLASH:
                this.state = S_OPEN_TAG_SLASH;
                break;
            default:
                if (!isS(c)) {
                    this.fail("disallowed character in tag name.");
                }
                this.state = S_ATTRIB;
        }
    }
    sOpenTagSlash() {
        if (this.getCode() === GREATER) {
            this.openSelfClosingTag();
        } else {
            this.fail("forward-slash in opening tag not followed by >.");
            this.state = S_ATTRIB;
        }
    }
    sAttrib() {
        const c = this.skipSpaces();
        if (c === EOC) {
            return;
        }
        if (isNameStartChar(c)) {
            this.unget();
            this.state = S_ATTRIB_NAME;
        } else if (c === GREATER) {
            this.openTag();
        } else if (c === FORWARD_SLASH) {
            this.state = S_OPEN_TAG_SLASH;
        } else {
            this.fail("disallowed character in attribute name.");
        }
    }
    sAttribName() {
        const c = this.captureNameChars();
        if (c === EQUAL) {
            this.state = S_ATTRIB_VALUE;
        } else if (isS(c)) {
            this.state = S_ATTRIB_NAME_SAW_WHITE;
        } else if (c === GREATER) {
            this.fail("attribute without value.");
            this.pushAttrib(this.name, this.name);
            this.name = this.text = "";
            this.openTag();
        } else if (c !== EOC) {
            this.fail("disallowed character in attribute name.");
        }
    }
    sAttribNameSawWhite() {
        const c = this.skipSpaces();
        switch(c){
            case EOC:
                return;
            case EQUAL:
                this.state = S_ATTRIB_VALUE;
                break;
            default:
                this.fail("attribute without value.");
                // Should we do this???
                // this.tag.attributes[this.name] = "";
                this.text = "";
                this.name = "";
                if (c === GREATER) {
                    this.openTag();
                } else if (isNameStartChar(c)) {
                    this.unget();
                    this.state = S_ATTRIB_NAME;
                } else {
                    this.fail("disallowed character in attribute name.");
                    this.state = S_ATTRIB;
                }
        }
    }
    sAttribValue() {
        const c = this.getCodeNorm();
        if (isQuote(c)) {
            this.q = c;
            this.state = S_ATTRIB_VALUE_QUOTED;
        } else if (!isS(c)) {
            this.fail("unquoted attribute value.");
            this.state = S_ATTRIB_VALUE_UNQUOTED;
            this.unget();
        }
    }
    sAttribValueQuoted() {
        // We deliberately do not use captureTo here. The specialized code we use
        // here is faster than using captureTo.
        const { q, chunk } = this;
        let { i: start } = this;
        // eslint-disable-next-line no-constant-condition
        while(true){
            switch(this.getCode()){
                case q:
                    this.pushAttrib(this.name, this.text + chunk.slice(start, this.prevI));
                    this.name = this.text = "";
                    this.q = null;
                    this.state = S_ATTRIB_VALUE_CLOSED;
                    return;
                case AMP:
                    this.text += chunk.slice(start, this.prevI);
                    this.state = S_ENTITY;
                    this.entityReturnState = S_ATTRIB_VALUE_QUOTED;
                    return;
                case NL:
                case NL_LIKE:
                case TAB:
                    this.text += `${chunk.slice(start, this.prevI)} `;
                    start = this.i;
                    break;
                case LESS:
                    this.text += chunk.slice(start, this.prevI);
                    this.fail("disallowed character.");
                    return;
                case EOC:
                    this.text += chunk.slice(start);
                    return;
                default:
            }
        }
    }
    sAttribValueClosed() {
        const c = this.getCodeNorm();
        if (isS(c)) {
            this.state = S_ATTRIB;
        } else if (c === GREATER) {
            this.openTag();
        } else if (c === FORWARD_SLASH) {
            this.state = S_OPEN_TAG_SLASH;
        } else if (isNameStartChar(c)) {
            this.fail("no whitespace between attributes.");
            this.unget();
            this.state = S_ATTRIB_NAME;
        } else {
            this.fail("disallowed character in attribute name.");
        }
    }
    sAttribValueUnquoted() {
        // We don't do anything regarding EOL or space handling for unquoted
        // attributes. We already have failed by the time we get here, and the
        // contract that saxes upholds states that upon failure, it is not safe to
        // rely on the data passed to event handlers (other than
        // ``onerror``). Passing "bad" data is not a problem.
        const c = this.captureTo(ATTRIB_VALUE_UNQUOTED_TERMINATOR);
        switch(c){
            case AMP:
                this.state = S_ENTITY;
                this.entityReturnState = S_ATTRIB_VALUE_UNQUOTED;
                break;
            case LESS:
                this.fail("disallowed character.");
                break;
            case EOC:
                break;
            default:
                if (this.text.includes("]]>")) {
                    this.fail("the string \"]]>\" is disallowed in char data.");
                }
                this.pushAttrib(this.name, this.text);
                this.name = this.text = "";
                if (c === GREATER) {
                    this.openTag();
                } else {
                    this.state = S_ATTRIB;
                }
        }
    }
    sCloseTag() {
        const c = this.captureNameChars();
        if (c === GREATER) {
            this.closeTag();
        } else if (isS(c)) {
            this.state = S_CLOSE_TAG_SAW_WHITE;
        } else if (c !== EOC) {
            this.fail("disallowed character in closing tag.");
        }
    }
    sCloseTagSawWhite() {
        switch(this.skipSpaces()){
            case GREATER:
                this.closeTag();
                break;
            case EOC:
                break;
            default:
                this.fail("disallowed character in closing tag.");
        }
    }
    // END OF STATE ENGINE METHODS
    handleTextInRoot() {
        // This is essentially a specialized version of captureTo which is optimized
        // for performing the ]]> check. A previous version of this code, checked
        // ``this.text`` for the presence of ]]>. It simplified the code but was
        // very costly when character data contained a lot of entities to be parsed.
        //
        // Since we are using a specialized loop, we also keep track of the presence
        // of ]]> in text data. The sequence ]]> is forbidden to appear as-is.
        //
        let { i: start, forbiddenState } = this;
        const { chunk, textHandler: handler } = this;
        // eslint-disable-next-line no-labels, no-restricted-syntax
        scanLoop: // eslint-disable-next-line no-constant-condition
        while(true){
            switch(this.getCode()){
                case LESS:
                    {
                        this.state = S_OPEN_WAKA;
                        if (handler !== undefined) {
                            const { text } = this;
                            const slice = chunk.slice(start, this.prevI);
                            if (text.length !== 0) {
                                handler(text + slice);
                                this.text = "";
                            } else if (slice.length !== 0) {
                                handler(slice);
                            }
                        }
                        forbiddenState = FORBIDDEN_START;
                        break scanLoop;
                    }
                case AMP:
                    this.state = S_ENTITY;
                    this.entityReturnState = S_TEXT;
                    if (handler !== undefined) {
                        this.text += chunk.slice(start, this.prevI);
                    }
                    forbiddenState = FORBIDDEN_START;
                    break scanLoop;
                case CLOSE_BRACKET:
                    switch(forbiddenState){
                        case FORBIDDEN_START:
                            forbiddenState = FORBIDDEN_BRACKET;
                            break;
                        case FORBIDDEN_BRACKET:
                            forbiddenState = FORBIDDEN_BRACKET_BRACKET;
                            break;
                        case FORBIDDEN_BRACKET_BRACKET:
                            break;
                        default:
                            throw new Error("impossible state");
                    }
                    break;
                case GREATER:
                    if (forbiddenState === FORBIDDEN_BRACKET_BRACKET) {
                        this.fail("the string \"]]>\" is disallowed in char data.");
                    }
                    forbiddenState = FORBIDDEN_START;
                    break;
                case NL_LIKE:
                    if (handler !== undefined) {
                        this.text += `${chunk.slice(start, this.prevI)}\n`;
                    }
                    start = this.i;
                    forbiddenState = FORBIDDEN_START;
                    break;
                case EOC:
                    if (handler !== undefined) {
                        this.text += chunk.slice(start);
                    }
                    break scanLoop;
                default:
                    forbiddenState = FORBIDDEN_START;
            }
        }
        this.forbiddenState = forbiddenState;
    }
    handleTextOutsideRoot() {
        // This is essentially a specialized version of captureTo which is optimized
        // for a specialized task. We keep track of the presence of non-space
        // characters in the text since these are errors when appearing outside the
        // document root element.
        let { i: start } = this;
        const { chunk, textHandler: handler } = this;
        let nonSpace = false;
        // eslint-disable-next-line no-labels, no-restricted-syntax
        outRootLoop: // eslint-disable-next-line no-constant-condition
        while(true){
            const code = this.getCode();
            switch(code){
                case LESS:
                    {
                        this.state = S_OPEN_WAKA;
                        if (handler !== undefined) {
                            const { text } = this;
                            const slice = chunk.slice(start, this.prevI);
                            if (text.length !== 0) {
                                handler(text + slice);
                                this.text = "";
                            } else if (slice.length !== 0) {
                                handler(slice);
                            }
                        }
                        break outRootLoop;
                    }
                case AMP:
                    this.state = S_ENTITY;
                    this.entityReturnState = S_TEXT;
                    if (handler !== undefined) {
                        this.text += chunk.slice(start, this.prevI);
                    }
                    nonSpace = true;
                    break outRootLoop;
                case NL_LIKE:
                    if (handler !== undefined) {
                        this.text += `${chunk.slice(start, this.prevI)}\n`;
                    }
                    start = this.i;
                    break;
                case EOC:
                    if (handler !== undefined) {
                        this.text += chunk.slice(start);
                    }
                    break outRootLoop;
                default:
                    if (!isS(code)) {
                        nonSpace = true;
                    }
            }
        }
        if (!nonSpace) {
            return;
        }
        // We use the reportedTextBeforeRoot and reportedTextAfterRoot flags
        // to avoid reporting errors for every single character that is out of
        // place.
        if (!this.sawRoot && !this.reportedTextBeforeRoot) {
            this.fail("text data outside of root node.");
            this.reportedTextBeforeRoot = true;
        }
        if (this.closedRoot && !this.reportedTextAfterRoot) {
            this.fail("text data outside of root node.");
            this.reportedTextAfterRoot = true;
        }
    }
    pushAttribNS(name, value) {
        var _a;
        const { prefix, local } = this.qname(name);
        const attr = {
            name,
            prefix,
            local,
            value
        };
        this.attribList.push(attr);
        (_a = this.attributeHandler) === null || _a === void 0 ? void 0 : _a.call(this, attr);
        if (prefix === "xmlns") {
            const trimmed = value.trim();
            if (this.currentXMLVersion === "1.0" && trimmed === "") {
                this.fail("invalid attempt to undefine prefix in XML 1.0");
            }
            this.topNS[local] = trimmed;
            nsPairCheck(this, local, trimmed);
        } else if (name === "xmlns") {
            const trimmed = value.trim();
            this.topNS[""] = trimmed;
            nsPairCheck(this, "", trimmed);
        }
    }
    pushAttribPlain(name, value) {
        var _a;
        const attr = {
            name,
            value
        };
        this.attribList.push(attr);
        (_a = this.attributeHandler) === null || _a === void 0 ? void 0 : _a.call(this, attr);
    }
    /**
     * End parsing. This performs final well-formedness checks and resets the
     * parser to a clean state.
     *
     * @returns this
     */ end() {
        var _a, _b;
        if (!this.sawRoot) {
            this.fail("document must contain a root element.");
        }
        const { tags } = this;
        while(tags.length > 0){
            const tag = tags.pop();
            this.fail(`unclosed tag: ${tag.name}`);
        }
        if (this.state !== S_BEGIN && this.state !== S_TEXT) {
            this.fail("unexpected end.");
        }
        const { text } = this;
        if (text.length !== 0) {
            (_a = this.textHandler) === null || _a === void 0 ? void 0 : _a.call(this, text);
            this.text = "";
        }
        this._closed = true;
        (_b = this.endHandler) === null || _b === void 0 ? void 0 : _b.call(this);
        this._init();
        return this;
    }
    /**
     * Resolve a namespace prefix.
     *
     * @param prefix The prefix to resolve.
     *
     * @returns The namespace URI or ``undefined`` if the prefix is not defined.
     */ resolve(prefix) {
        var _a, _b;
        let uri = this.topNS[prefix];
        if (uri !== undefined) {
            return uri;
        }
        const { tags } = this;
        for(let index = tags.length - 1; index >= 0; index--){
            uri = tags[index].ns[prefix];
            if (uri !== undefined) {
                return uri;
            }
        }
        uri = this.ns[prefix];
        if (uri !== undefined) {
            return uri;
        }
        return (_b = (_a = this.opt).resolvePrefix) === null || _b === void 0 ? void 0 : _b.call(_a, prefix);
    }
    /**
     * Parse a qname into its prefix and local name parts.
     *
     * @param name The name to parse
     *
     * @returns
     */ qname(name) {
        // This is faster than using name.split(":").
        const colon = name.indexOf(":");
        if (colon === -1) {
            return {
                prefix: "",
                local: name
            };
        }
        const local = name.slice(colon + 1);
        const prefix = name.slice(0, colon);
        if (prefix === "" || local === "" || local.includes(":")) {
            this.fail(`malformed name: ${name}.`);
        }
        return {
            prefix,
            local
        };
    }
    processAttribsNS() {
        var _a;
        const { attribList } = this;
        const tag = this.tag;
        {
            // add namespace info to tag
            const { prefix, local } = this.qname(tag.name);
            tag.prefix = prefix;
            tag.local = local;
            const uri = tag.uri = (_a = this.resolve(prefix)) !== null && _a !== void 0 ? _a : "";
            if (prefix !== "") {
                if (prefix === "xmlns") {
                    this.fail("tags may not have \"xmlns\" as prefix.");
                }
                if (uri === "") {
                    this.fail(`unbound namespace prefix: ${JSON.stringify(prefix)}.`);
                    tag.uri = prefix;
                }
            }
        }
        if (attribList.length === 0) {
            return;
        }
        const { attributes } = tag;
        const seen = new Set();
        // Note: do not apply default ns to attributes:
        //   http://www.w3.org/TR/REC-xml-names/#defaulting
        for (const attr of attribList){
            const { name, prefix, local } = attr;
            let uri;
            let eqname;
            if (prefix === "") {
                uri = name === "xmlns" ? XMLNS_NAMESPACE : "";
                eqname = name;
            } else {
                uri = this.resolve(prefix);
                // if there's any attributes with an undefined namespace,
                // then fail on them now.
                if (uri === undefined) {
                    this.fail(`unbound namespace prefix: ${JSON.stringify(prefix)}.`);
                    uri = prefix;
                }
                eqname = `{${uri}}${local}`;
            }
            if (seen.has(eqname)) {
                this.fail(`duplicate attribute: ${eqname}.`);
            }
            seen.add(eqname);
            attr.uri = uri;
            attributes[name] = attr;
        }
        this.attribList = [];
    }
    processAttribsPlain() {
        const { attribList } = this;
        // eslint-disable-next-line prefer-destructuring
        const attributes = this.tag.attributes;
        for (const { name, value } of attribList){
            if (attributes[name] !== undefined) {
                this.fail(`duplicate attribute: ${name}.`);
            }
            attributes[name] = value;
        }
        this.attribList = [];
    }
    /**
     * Handle a complete open tag. This parser code calls this once it has seen
     * the whole tag. This method checks for well-formeness and then emits
     * ``onopentag``.
     */ openTag() {
        var _a;
        this.processAttribs();
        const { tags } = this;
        const tag = this.tag;
        tag.isSelfClosing = false;
        // There cannot be any pending text here due to the onopentagstart that was
        // necessarily emitted before we get here. So we do not check text.
        (_a = this.openTagHandler) === null || _a === void 0 ? void 0 : _a.call(this, tag);
        tags.push(tag);
        this.state = S_TEXT;
        this.name = "";
    }
    /**
     * Handle a complete self-closing tag. This parser code calls this once it has
     * seen the whole tag. This method checks for well-formeness and then emits
     * ``onopentag`` and ``onclosetag``.
     */ openSelfClosingTag() {
        var _a, _b, _c;
        this.processAttribs();
        const { tags } = this;
        const tag = this.tag;
        tag.isSelfClosing = true;
        // There cannot be any pending text here due to the onopentagstart that was
        // necessarily emitted before we get here. So we do not check text.
        (_a = this.openTagHandler) === null || _a === void 0 ? void 0 : _a.call(this, tag);
        (_b = this.closeTagHandler) === null || _b === void 0 ? void 0 : _b.call(this, tag);
        const top = this.tag = (_c = tags[tags.length - 1]) !== null && _c !== void 0 ? _c : null;
        if (top === null) {
            this.closedRoot = true;
        }
        this.state = S_TEXT;
        this.name = "";
    }
    /**
     * Handle a complete close tag. This parser code calls this once it has seen
     * the whole tag. This method checks for well-formeness and then emits
     * ``onclosetag``.
     */ closeTag() {
        const { tags, name } = this;
        // Our state after this will be S_TEXT, no matter what, and we can clear
        // tagName now.
        this.state = S_TEXT;
        this.name = "";
        if (name === "") {
            this.fail("weird empty close tag.");
            this.text += "</>";
            return;
        }
        const handler = this.closeTagHandler;
        let l = tags.length;
        while(l-- > 0){
            const tag = this.tag = tags.pop();
            this.topNS = tag.ns;
            handler === null || handler === void 0 ? void 0 : handler(tag);
            if (tag.name === name) {
                break;
            }
            this.fail("unexpected close tag.");
        }
        if (l === 0) {
            this.closedRoot = true;
        } else if (l < 0) {
            this.fail(`unmatched closing tag: ${name}.`);
            this.text += `</${name}>`;
        }
    }
    /**
     * Resolves an entity. Makes any necessary well-formedness checks.
     *
     * @param entity The entity to resolve.
     *
     * @returns The parsed entity.
     */ parseEntity(entity) {
        // startsWith would be significantly slower for this test.
        if (entity[0] !== "#") {
            const defined = this.ENTITIES[entity];
            if (defined !== undefined) {
                return defined;
            }
            this.fail(this.isName(entity) ? "undefined entity." : "disallowed character in entity name.");
            return `&${entity};`;
        }
        let num = NaN;
        if (entity[1] === "x" && /^#x[0-9a-f]+$/i.test(entity)) {
            num = parseInt(entity.slice(2), 16);
        } else if (/^#[0-9]+$/.test(entity)) {
            num = parseInt(entity.slice(1), 10);
        }
        // The character reference is required to match the CHAR production.
        if (!this.isChar(num)) {
            this.fail("malformed character entity.");
            return `&${entity};`;
        }
        return String.fromCodePoint(num);
    }
}
exports.SaxesParser = SaxesParser; //# sourceMappingURL=saxes.js.map
}),
"[project]/frontend/node_modules/.pnpm/entities@6.0.1/node_modules/entities/dist/commonjs/generated/decode-data-html.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Generated using scripts/write-decode-map.ts
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.htmlDecodeTree = void 0;
exports.htmlDecodeTree = new Uint16Array(// prettier-ignore
/* #__PURE__ */ "\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\0\0\0\0\0\0\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\0\0\0\u0342\u0354\0\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\0\0\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\0\0\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\0\u0446\0\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\0\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\0\0\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\0\u05bf\0\0\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\0\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\0\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\0\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\0\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\0\u08c3bleBracket;\u67e6n\u01d4\u08c8\0\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b\"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\0\u1005bleBracket;\u67e7n\u01d4\u100a\0\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\0\0\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\0\u132c\u1331\0\0\0\0\0\u1338\u133d\u1377\u1385\0\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\0\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\0\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\0\u15b0\u15b6\u15bf\0\0\0\0\u15c6\u15db\u15eb\u165f\u166d\0\u1695\u169b\u16b2\u16b9\0\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\0\0\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\0\0\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\0\u1833\u01b2\u182f\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\0\u19e8\u1a11\u1a15\u1a32\0\u1a37\u1a50\0\0\u1ab4\0\0\u1ac1\0\0\u1b21\u1b2e\u1b4d\u1b52\0\u1bfd\0\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\0\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\0\0\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\0\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\0\0\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\0\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\0\0\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\0\0\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\0\0\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\0\0\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\0\0\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\0\u1f9e\0\u1fa1\u1fa7\0\0\u1fc6\u1fcc\0\u1fd3\0\u1fe6\u1fea\u2000\0\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\0\0\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\0\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\0\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\0\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\0\u2036;\u6154;\u6156\u02b4\u203e\u2041\0\0\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\0\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\0\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\0\u22aa\0\u22b8\u22c5\u22ce\0\u22d5\u22f3\0\0\u22f8\u2322\u2367\u2362\u237f\0\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\0\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\0\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\0\u24aa\0\u24b1\0\0\0\0\0\u24b5\u24ba\0\u24c6\u24c8\u24cd\0\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\0\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\0\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\0\0\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2d2d\0\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\0\0\u2d8d\u2dab\0\u2dc8\u2dce\0\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\0\0\u2d7c\0\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\0\u2e7d\0\u2e80\u2e9d\0\u2ea2\u2eb9\0\0\u2ecb\u0e9c\0\u2f13\0\0\u2f2b\u2fbc\0\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\0\0\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\0\u337a\u33a4\0\0\u33ec\u33f0\0\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\0\u3616\0\0\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\0\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\0\0\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\0\u367e\u36c2\0\0\0\0\0\u36db\u3703\0\u3709\u376c\0\0\0\u3787\u0272\u3656\0\0\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\0\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\0\0\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\0\0\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\0\u3a8b\0\u3a90\u3a9b\0\0\u3a9d\u3aa8\u3aab\u3aaf\0\0\u3ac3\u3ace\0\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c".split("").map((c)=>c.charCodeAt(0))); //# sourceMappingURL=decode-data-html.js.map
}),
"[project]/frontend/node_modules/.pnpm/entities@6.0.1/node_modules/entities/dist/commonjs/generated/decode-data-xml.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Generated using scripts/write-decode-map.ts
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.xmlDecodeTree = void 0;
exports.xmlDecodeTree = new Uint16Array(// prettier-ignore
/* #__PURE__ */ "\u0200aglq\t\x15\x18\x1b\u026d\x0f\0\0\x12p;\u4026os;\u4027t;\u403et;\u403cuot;\u4022".split("").map((c)=>c.charCodeAt(0))); //# sourceMappingURL=decode-data-xml.js.map
}),
"[project]/frontend/node_modules/.pnpm/entities@6.0.1/node_modules/entities/dist/commonjs/decode-codepoint.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
var _a;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fromCodePoint = void 0;
exports.replaceCodePoint = replaceCodePoint;
exports.decodeCodePoint = decodeCodePoint;
const decodeMap = new Map([
    [
        0,
        65533
    ],
    // C1 Unicode control character reference replacements
    [
        128,
        8364
    ],
    [
        130,
        8218
    ],
    [
        131,
        402
    ],
    [
        132,
        8222
    ],
    [
        133,
        8230
    ],
    [
        134,
        8224
    ],
    [
        135,
        8225
    ],
    [
        136,
        710
    ],
    [
        137,
        8240
    ],
    [
        138,
        352
    ],
    [
        139,
        8249
    ],
    [
        140,
        338
    ],
    [
        142,
        381
    ],
    [
        145,
        8216
    ],
    [
        146,
        8217
    ],
    [
        147,
        8220
    ],
    [
        148,
        8221
    ],
    [
        149,
        8226
    ],
    [
        150,
        8211
    ],
    [
        151,
        8212
    ],
    [
        152,
        732
    ],
    [
        153,
        8482
    ],
    [
        154,
        353
    ],
    [
        155,
        8250
    ],
    [
        156,
        339
    ],
    [
        158,
        382
    ],
    [
        159,
        376
    ]
]);
/**
 * Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
 */ exports.fromCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, n/no-unsupported-features/es-builtins
(_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
    let output = "";
    if (codePoint > 65535) {
        codePoint -= 65536;
        output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
};
/**
 * Replace the given code point with a replacement character if it is a
 * surrogate or is outside the valid range. Otherwise return the code
 * point unchanged.
 */ function replaceCodePoint(codePoint) {
    var _a;
    if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
        return 65533;
    }
    return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
}
/**
 * Replace the code point if relevant, then convert it to a string.
 *
 * @deprecated Use `fromCodePoint(replaceCodePoint(codePoint))` instead.
 * @param codePoint The code point to decode.
 * @returns The decoded code point.
 */ function decodeCodePoint(codePoint) {
    return (0, exports.fromCodePoint)(replaceCodePoint(codePoint));
} //# sourceMappingURL=decode-codepoint.js.map
}),
"[project]/frontend/node_modules/.pnpm/entities@6.0.1/node_modules/entities/dist/commonjs/decode.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fromCodePoint = exports.replaceCodePoint = exports.decodeCodePoint = exports.xmlDecodeTree = exports.htmlDecodeTree = exports.EntityDecoder = exports.DecodingMode = exports.BinTrieFlags = void 0;
exports.determineBranch = determineBranch;
exports.decodeHTML = decodeHTML;
exports.decodeHTMLAttribute = decodeHTMLAttribute;
exports.decodeHTMLStrict = decodeHTMLStrict;
exports.decodeXML = decodeXML;
const decode_data_html_js_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/entities@6.0.1/node_modules/entities/dist/commonjs/generated/decode-data-html.js [app-ssr] (ecmascript)");
const decode_data_xml_js_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/entities@6.0.1/node_modules/entities/dist/commonjs/generated/decode-data-xml.js [app-ssr] (ecmascript)");
const decode_codepoint_js_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/entities@6.0.1/node_modules/entities/dist/commonjs/decode-codepoint.js [app-ssr] (ecmascript)");
var CharCodes;
(function(CharCodes) {
    CharCodes[CharCodes["NUM"] = 35] = "NUM";
    CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
    CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
    CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
    CharCodes[CharCodes["NINE"] = 57] = "NINE";
    CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
    CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
    CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
    CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
    CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
    CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */ const TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags) {
    BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (exports.BinTrieFlags = BinTrieFlags = {}));
function isNumber(code) {
    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
    return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
}
function isAsciiAlphaNumeric(code) {
    return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
}
/**
 * Checks if the given character is a valid end character for an entity in an attribute.
 *
 * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
 * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
 */ function isEntityInAttributeInvalidEnd(code) {
    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function(EntityDecoderState) {
    EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode) {
    /** Entities in text nodes that can end with any character. */ DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
    /** Only allow entities terminated with a semicolon. */ DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
    /** Entities in attributes have limitations on ending characters. */ DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode || (exports.DecodingMode = DecodingMode = {}));
/**
 * Token decoder with support of writing partial entities.
 */ class EntityDecoder {
    constructor(/** The tree used to decode entities. */ decodeTree, /**
     * The function that is called when a codepoint is decoded.
     *
     * For multi-byte named entities, this will be called multiple times,
     * with the second codepoint, and the same `consumed` value.
     *
     * @param codepoint The decoded codepoint.
     * @param consumed The number of bytes consumed by the decoder.
     */ emitCodePoint, /** An object that is used to produce errors. */ errors){
        this.decodeTree = decodeTree;
        this.emitCodePoint = emitCodePoint;
        this.errors = errors;
        /** The current state of the decoder. */ this.state = EntityDecoderState.EntityStart;
        /** Characters that were consumed while parsing an entity. */ this.consumed = 1;
        /**
         * The result of the entity.
         *
         * Either the result index of a numeric entity, or the codepoint of a
         * numeric entity.
         */ this.result = 0;
        /** The current index in the decode tree. */ this.treeIndex = 0;
        /** The number of characters that were consumed in excess. */ this.excess = 1;
        /** The mode in which the decoder is operating. */ this.decodeMode = DecodingMode.Strict;
    }
    /** Resets the instance to make it reusable. */ startEntity(decodeMode) {
        this.decodeMode = decodeMode;
        this.state = EntityDecoderState.EntityStart;
        this.result = 0;
        this.treeIndex = 0;
        this.excess = 1;
        this.consumed = 1;
    }
    /**
     * Write an entity to the decoder. This can be called multiple times with partial entities.
     * If the entity is incomplete, the decoder will return -1.
     *
     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
     * entity is incomplete, and resume when the next string is written.
     *
     * @param input The string containing the entity (or a continuation of the entity).
     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */ write(input, offset) {
        switch(this.state){
            case EntityDecoderState.EntityStart:
                {
                    if (input.charCodeAt(offset) === CharCodes.NUM) {
                        this.state = EntityDecoderState.NumericStart;
                        this.consumed += 1;
                        return this.stateNumericStart(input, offset + 1);
                    }
                    this.state = EntityDecoderState.NamedEntity;
                    return this.stateNamedEntity(input, offset);
                }
            case EntityDecoderState.NumericStart:
                {
                    return this.stateNumericStart(input, offset);
                }
            case EntityDecoderState.NumericDecimal:
                {
                    return this.stateNumericDecimal(input, offset);
                }
            case EntityDecoderState.NumericHex:
                {
                    return this.stateNumericHex(input, offset);
                }
            case EntityDecoderState.NamedEntity:
                {
                    return this.stateNamedEntity(input, offset);
                }
        }
    }
    /**
     * Switches between the numeric decimal and hexadecimal states.
     *
     * Equivalent to the `Numeric character reference state` in the HTML spec.
     *
     * @param input The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */ stateNumericStart(input, offset) {
        if (offset >= input.length) {
            return -1;
        }
        if ((input.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
            this.state = EntityDecoderState.NumericHex;
            this.consumed += 1;
            return this.stateNumericHex(input, offset + 1);
        }
        this.state = EntityDecoderState.NumericDecimal;
        return this.stateNumericDecimal(input, offset);
    }
    addToNumericResult(input, start, end, base) {
        if (start !== end) {
            const digitCount = end - start;
            this.result = this.result * Math.pow(base, digitCount) + Number.parseInt(input.substr(start, digitCount), base);
            this.consumed += digitCount;
        }
    }
    /**
     * Parses a hexadecimal numeric entity.
     *
     * Equivalent to the `Hexademical character reference state` in the HTML spec.
     *
     * @param input The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */ stateNumericHex(input, offset) {
        const startIndex = offset;
        while(offset < input.length){
            const char = input.charCodeAt(offset);
            if (isNumber(char) || isHexadecimalCharacter(char)) {
                offset += 1;
            } else {
                this.addToNumericResult(input, startIndex, offset, 16);
                return this.emitNumericEntity(char, 3);
            }
        }
        this.addToNumericResult(input, startIndex, offset, 16);
        return -1;
    }
    /**
     * Parses a decimal numeric entity.
     *
     * Equivalent to the `Decimal character reference state` in the HTML spec.
     *
     * @param input The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */ stateNumericDecimal(input, offset) {
        const startIndex = offset;
        while(offset < input.length){
            const char = input.charCodeAt(offset);
            if (isNumber(char)) {
                offset += 1;
            } else {
                this.addToNumericResult(input, startIndex, offset, 10);
                return this.emitNumericEntity(char, 2);
            }
        }
        this.addToNumericResult(input, startIndex, offset, 10);
        return -1;
    }
    /**
     * Validate and emit a numeric entity.
     *
     * Implements the logic from the `Hexademical character reference start
     * state` and `Numeric character reference end state` in the HTML spec.
     *
     * @param lastCp The last code point of the entity. Used to see if the
     *               entity was terminated with a semicolon.
     * @param expectedLength The minimum number of characters that should be
     *                       consumed. Used to validate that at least one digit
     *                       was consumed.
     * @returns The number of characters that were consumed.
     */ emitNumericEntity(lastCp, expectedLength) {
        var _a;
        // Ensure we consumed at least one digit.
        if (this.consumed <= expectedLength) {
            (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
            return 0;
        }
        // Figure out if this is a legit end of the entity
        if (lastCp === CharCodes.SEMI) {
            this.consumed += 1;
        } else if (this.decodeMode === DecodingMode.Strict) {
            return 0;
        }
        this.emitCodePoint((0, decode_codepoint_js_1.replaceCodePoint)(this.result), this.consumed);
        if (this.errors) {
            if (lastCp !== CharCodes.SEMI) {
                this.errors.missingSemicolonAfterCharacterReference();
            }
            this.errors.validateNumericCharacterReference(this.result);
        }
        return this.consumed;
    }
    /**
     * Parses a named entity.
     *
     * Equivalent to the `Named character reference state` in the HTML spec.
     *
     * @param input The string containing the entity (or a continuation of the entity).
     * @param offset The current offset.
     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
     */ stateNamedEntity(input, offset) {
        const { decodeTree } = this;
        let current = decodeTree[this.treeIndex];
        // The mask is the number of bytes of the value, including the current byte.
        let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        for(; offset < input.length; offset++, this.excess++){
            const char = input.charCodeAt(offset);
            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
            if (this.treeIndex < 0) {
                return this.result === 0 || this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
                (valueLength === 0 || // And there should be no invalid characters.
                isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
            }
            current = decodeTree[this.treeIndex];
            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
            // If the branch is a value, store it and continue
            if (valueLength !== 0) {
                // If the entity is terminated by a semicolon, we are done.
                if (char === CharCodes.SEMI) {
                    return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
                }
                // If we encounter a non-terminated (legacy) entity while parsing strictly, then ignore it.
                if (this.decodeMode !== DecodingMode.Strict) {
                    this.result = this.treeIndex;
                    this.consumed += this.excess;
                    this.excess = 0;
                }
            }
        }
        return -1;
    }
    /**
     * Emit a named entity that was not terminated with a semicolon.
     *
     * @returns The number of characters consumed.
     */ emitNotTerminatedNamedEntity() {
        var _a;
        const { result, decodeTree } = this;
        const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
        this.emitNamedEntityData(result, valueLength, this.consumed);
        (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
        return this.consumed;
    }
    /**
     * Emit a named entity.
     *
     * @param result The index of the entity in the decode tree.
     * @param valueLength The number of bytes in the entity.
     * @param consumed The number of characters consumed.
     *
     * @returns The number of characters consumed.
     */ emitNamedEntityData(result, valueLength, consumed) {
        const { decodeTree } = this;
        this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
        if (valueLength === 3) {
            // For multi-byte values, we need to emit the second byte.
            this.emitCodePoint(decodeTree[result + 2], consumed);
        }
        return consumed;
    }
    /**
     * Signal to the parser that the end of the input was reached.
     *
     * Remaining data will be emitted and relevant errors will be produced.
     *
     * @returns The number of characters consumed.
     */ end() {
        var _a;
        switch(this.state){
            case EntityDecoderState.NamedEntity:
                {
                    // Emit a named entity if we have one.
                    return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
                }
            // Otherwise, emit a numeric entity if we have one.
            case EntityDecoderState.NumericDecimal:
                {
                    return this.emitNumericEntity(0, 2);
                }
            case EntityDecoderState.NumericHex:
                {
                    return this.emitNumericEntity(0, 3);
                }
            case EntityDecoderState.NumericStart:
                {
                    (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
                    return 0;
                }
            case EntityDecoderState.EntityStart:
                {
                    // Return 0 if we have no entity.
                    return 0;
                }
        }
    }
}
exports.EntityDecoder = EntityDecoder;
/**
 * Creates a function that decodes entities in a string.
 *
 * @param decodeTree The decode tree.
 * @returns A function that decodes entities in a string.
 */ function getDecoder(decodeTree) {
    let returnValue = "";
    const decoder = new EntityDecoder(decodeTree, (data)=>returnValue += (0, decode_codepoint_js_1.fromCodePoint)(data));
    return function decodeWithTrie(input, decodeMode) {
        let lastIndex = 0;
        let offset = 0;
        while((offset = input.indexOf("&", offset)) >= 0){
            returnValue += input.slice(lastIndex, offset);
            decoder.startEntity(decodeMode);
            const length = decoder.write(input, // Skip the "&"
            offset + 1);
            if (length < 0) {
                lastIndex = offset + decoder.end();
                break;
            }
            lastIndex = offset + length;
            // If `length` is 0, skip the current `&` and continue.
            offset = length === 0 ? lastIndex + 1 : lastIndex;
        }
        const result = returnValue + input.slice(lastIndex);
        // Make sure we don't keep a reference to the final string.
        returnValue = "";
        return result;
    };
}
/**
 * Determines the branch of the current node that is taken given the current
 * character. This function is used to traverse the trie.
 *
 * @param decodeTree The trie.
 * @param current The current node.
 * @param nodeIdx The index right after the current node and its value.
 * @param char The current character.
 * @returns The index of the next node, or -1 if no branch is taken.
 */ function determineBranch(decodeTree, current, nodeIndex, char) {
    const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    // Case 1: Single branch encoded in jump offset
    if (branchCount === 0) {
        return jumpOffset !== 0 && char === jumpOffset ? nodeIndex : -1;
    }
    // Case 2: Multiple branches encoded in jump table
    if (jumpOffset) {
        const value = char - jumpOffset;
        return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIndex + value] - 1;
    }
    // Case 3: Multiple branches encoded in dictionary
    // Binary search for the character.
    let lo = nodeIndex;
    let hi = lo + branchCount - 1;
    while(lo <= hi){
        const mid = lo + hi >>> 1;
        const midValue = decodeTree[mid];
        if (midValue < char) {
            lo = mid + 1;
        } else if (midValue > char) {
            hi = mid - 1;
        } else {
            return decodeTree[mid + branchCount];
        }
    }
    return -1;
}
const htmlDecoder = /* #__PURE__ */ getDecoder(decode_data_html_js_1.htmlDecodeTree);
const xmlDecoder = /* #__PURE__ */ getDecoder(decode_data_xml_js_1.xmlDecodeTree);
/**
 * Decodes an HTML string.
 *
 * @param htmlString The string to decode.
 * @param mode The decoding mode.
 * @returns The decoded string.
 */ function decodeHTML(htmlString, mode = DecodingMode.Legacy) {
    return htmlDecoder(htmlString, mode);
}
/**
 * Decodes an HTML string in an attribute.
 *
 * @param htmlAttribute The string to decode.
 * @returns The decoded string.
 */ function decodeHTMLAttribute(htmlAttribute) {
    return htmlDecoder(htmlAttribute, DecodingMode.Attribute);
}
/**
 * Decodes an HTML string, requiring all entities to be terminated by a semicolon.
 *
 * @param htmlString The string to decode.
 * @returns The decoded string.
 */ function decodeHTMLStrict(htmlString) {
    return htmlDecoder(htmlString, DecodingMode.Strict);
}
/**
 * Decodes an XML string, requiring all entities to be terminated by a semicolon.
 *
 * @param xmlString The string to decode.
 * @returns The decoded string.
 */ function decodeXML(xmlString) {
    return xmlDecoder(xmlString, DecodingMode.Strict);
}
// Re-export for use by eg. htmlparser2
var decode_data_html_js_2 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/entities@6.0.1/node_modules/entities/dist/commonjs/generated/decode-data-html.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "htmlDecodeTree", {
    enumerable: true,
    get: function() {
        return decode_data_html_js_2.htmlDecodeTree;
    }
});
var decode_data_xml_js_2 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/entities@6.0.1/node_modules/entities/dist/commonjs/generated/decode-data-xml.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "xmlDecodeTree", {
    enumerable: true,
    get: function() {
        return decode_data_xml_js_2.xmlDecodeTree;
    }
});
var decode_codepoint_js_2 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/entities@6.0.1/node_modules/entities/dist/commonjs/decode-codepoint.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "decodeCodePoint", {
    enumerable: true,
    get: function() {
        return decode_codepoint_js_2.decodeCodePoint;
    }
});
Object.defineProperty(exports, "replaceCodePoint", {
    enumerable: true,
    get: function() {
        return decode_codepoint_js_2.replaceCodePoint;
    }
});
Object.defineProperty(exports, "fromCodePoint", {
    enumerable: true,
    get: function() {
        return decode_codepoint_js_2.fromCodePoint;
    }
}); //# sourceMappingURL=decode.js.map
}),
"[project]/frontend/node_modules/.pnpm/entities@6.0.1/node_modules/entities/dist/commonjs/escape.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.escapeText = exports.escapeAttribute = exports.escapeUTF8 = exports.escape = exports.getCodePoint = exports.xmlReplacer = void 0;
exports.encodeXML = encodeXML;
exports.xmlReplacer = /["$&'<>\u0080-\uFFFF]/g;
const xmlCodeMap = new Map([
    [
        34,
        "&quot;"
    ],
    [
        38,
        "&amp;"
    ],
    [
        39,
        "&apos;"
    ],
    [
        60,
        "&lt;"
    ],
    [
        62,
        "&gt;"
    ]
]);
// For compatibility with node < 4, we wrap `codePointAt`
exports.getCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
String.prototype.codePointAt == null ? (c, index)=>(c.charCodeAt(index) & 64512) === 55296 ? (c.charCodeAt(index) - 55296) * 1024 + c.charCodeAt(index + 1) - 56320 + 65536 : c.charCodeAt(index) : (input, index)=>input.codePointAt(index);
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using XML entities.
 *
 * If a character has no equivalent entity, a
 * numeric hexadecimal reference (eg. `&#xfc;`) will be used.
 */ function encodeXML(input) {
    let returnValue = "";
    let lastIndex = 0;
    let match;
    while((match = exports.xmlReplacer.exec(input)) !== null){
        const { index } = match;
        const char = input.charCodeAt(index);
        const next = xmlCodeMap.get(char);
        if (next === undefined) {
            returnValue += `${input.substring(lastIndex, index)}&#x${(0, exports.getCodePoint)(input, index).toString(16)};`;
            // Increase by 1 if we have a surrogate pair
            lastIndex = exports.xmlReplacer.lastIndex += Number((char & 64512) === 55296);
        } else {
            returnValue += input.substring(lastIndex, index) + next;
            lastIndex = index + 1;
        }
    }
    return returnValue + input.substr(lastIndex);
}
/**
 * Encodes all non-ASCII characters, as well as characters not valid in XML
 * documents using numeric hexadecimal reference (eg. `&#xfc;`).
 *
 * Have a look at `escapeUTF8` if you want a more concise output at the expense
 * of reduced transportability.
 *
 * @param data String to escape.
 */ exports.escape = encodeXML;
/**
 * Creates a function that escapes all characters matched by the given regular
 * expression using the given map of characters to escape to their entities.
 *
 * @param regex Regular expression to match characters to escape.
 * @param map Map of characters to escape to their entities.
 *
 * @returns Function that escapes all characters matched by the given regular
 * expression using the given map of characters to escape to their entities.
 */ function getEscaper(regex, map) {
    return function escape(data) {
        let match;
        let lastIndex = 0;
        let result = "";
        while(match = regex.exec(data)){
            if (lastIndex !== match.index) {
                result += data.substring(lastIndex, match.index);
            }
            // We know that this character will be in the map.
            result += map.get(match[0].charCodeAt(0));
            // Every match will be of length 1
            lastIndex = match.index + 1;
        }
        return result + data.substring(lastIndex);
    };
}
/**
 * Encodes all characters not valid in XML documents using XML entities.
 *
 * Note that the output will be character-set dependent.
 *
 * @param data String to escape.
 */ exports.escapeUTF8 = getEscaper(/["&'<>]/g, xmlCodeMap);
/**
 * Encodes all characters that have to be escaped in HTML attributes,
 * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
 *
 * @param data String to escape.
 */ exports.escapeAttribute = /* #__PURE__ */ getEscaper(/["&\u00A0]/g, new Map([
    [
        34,
        "&quot;"
    ],
    [
        38,
        "&amp;"
    ],
    [
        160,
        "&nbsp;"
    ]
]));
/**
 * Encodes all characters that have to be escaped in HTML text,
 * following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
 *
 * @param data String to escape.
 */ exports.escapeText = getEscaper(/[&<>\u00A0]/g, new Map([
    [
        38,
        "&amp;"
    ],
    [
        60,
        "&lt;"
    ],
    [
        62,
        "&gt;"
    ],
    [
        160,
        "&nbsp;"
    ]
])); //# sourceMappingURL=escape.js.map
}),
"[project]/frontend/node_modules/.pnpm/w3c-xmlserializer@5.0.0/node_modules/w3c-xmlserializer/lib/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports.NAMESPACES = {
    HTML: "http://www.w3.org/1999/xhtml",
    XML: "http://www.w3.org/XML/1998/namespace",
    XMLNS: "http://www.w3.org/2000/xmlns/"
};
module.exports.NODE_TYPES = {
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
};
module.exports.VOID_ELEMENTS = new Set([
    "area",
    "base",
    "basefont",
    "bgsound",
    "br",
    "col",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "menuitem",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
]);
}),
"[project]/frontend/node_modules/.pnpm/w3c-xmlserializer@5.0.0/node_modules/w3c-xmlserializer/lib/attributes.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const xnv = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/xml-name-validator@5.0.0/node_modules/xml-name-validator/lib/xml-name-validator.js [app-ssr] (ecmascript)");
const { NAMESPACES } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/w3c-xmlserializer@5.0.0/node_modules/w3c-xmlserializer/lib/constants.js [app-ssr] (ecmascript)");
function generatePrefix(map, newNamespace, prefixIndex) {
    const generatedPrefix = `ns${prefixIndex}`;
    map[newNamespace] = [
        generatedPrefix
    ];
    return generatedPrefix;
}
function preferredPrefixString(map, ns, preferredPrefix) {
    const candidateList = map[ns];
    if (!candidateList) {
        return null;
    }
    if (candidateList.includes(preferredPrefix)) {
        return preferredPrefix;
    }
    return candidateList[candidateList.length - 1];
}
function serializeAttributeValue(value /* , requireWellFormed*/ ) {
    if (value === null) {
        return "";
    }
    // TODO: Check well-formedness
    return value.replace(/&/ug, "&amp;").replace(/"/ug, "&quot;").replace(/</ug, "&lt;").replace(/>/ug, "&gt;").replace(/\t/ug, "&#x9;").replace(/\n/ug, "&#xA;").replace(/\r/ug, "&#xD;");
}
function serializeAttributes(element, map, localPrefixes, ignoreNamespaceDefAttr, requireWellFormed, refs) {
    let result = "";
    const namespaceLocalnames = Object.create(null);
    for (const attr of element.attributes){
        if (requireWellFormed && namespaceLocalnames[attr.namespaceURI] && namespaceLocalnames[attr.namespaceURI].has(attr.localName)) {
            throw new Error("Found duplicated attribute");
        }
        if (!namespaceLocalnames[attr.namespaceURI]) {
            namespaceLocalnames[attr.namespaceURI] = new Set();
        }
        namespaceLocalnames[attr.namespaceURI].add(attr.localName);
        const attributeNamespace = attr.namespaceURI;
        let candidatePrefix = null;
        if (attributeNamespace !== null) {
            candidatePrefix = preferredPrefixString(map, attributeNamespace, attr.prefix);
            if (attributeNamespace === NAMESPACES.XMLNS) {
                if (attr.value === NAMESPACES.XML || attr.prefix === null && ignoreNamespaceDefAttr || attr.prefix !== null && localPrefixes[attr.localName] !== attr.value && map[attr.value].includes(attr.localName)) {
                    continue;
                }
                if (requireWellFormed && attr.value === NAMESPACES.XMLNS) {
                    throw new Error("The XMLNS namespace is reserved and cannot be applied as an element's namespace via XML parsing");
                }
                if (requireWellFormed && attr.value === "") {
                    throw new Error("Namespace prefix declarations cannot be used to undeclare a namespace");
                }
                if (attr.prefix === "xmlns") {
                    candidatePrefix = "xmlns";
                }
            } else if (candidatePrefix === null) {
                candidatePrefix = generatePrefix(map, attributeNamespace, refs.prefixIndex++);
                result += ` xmlns:${candidatePrefix}="${serializeAttributeValue(attributeNamespace, requireWellFormed)}"`;
            }
        }
        result += " ";
        if (candidatePrefix !== null) {
            result += `${candidatePrefix}:`;
        }
        if (requireWellFormed && (attr.localName.includes(":") || !xnv.name(attr.localName) || attr.localName === "xmlns" && attributeNamespace === null)) {
            throw new Error("Invalid attribute localName value");
        }
        result += `${attr.localName}="${serializeAttributeValue(attr.value, requireWellFormed)}"`;
    }
    return result;
}
module.exports.preferredPrefixString = preferredPrefixString;
module.exports.generatePrefix = generatePrefix;
module.exports.serializeAttributeValue = serializeAttributeValue;
module.exports.serializeAttributes = serializeAttributes;
}),
"[project]/frontend/node_modules/.pnpm/w3c-xmlserializer@5.0.0/node_modules/w3c-xmlserializer/lib/serialize.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const xnv = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/xml-name-validator@5.0.0/node_modules/xml-name-validator/lib/xml-name-validator.js [app-ssr] (ecmascript)");
const attributeUtils = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/w3c-xmlserializer@5.0.0/node_modules/w3c-xmlserializer/lib/attributes.js [app-ssr] (ecmascript)");
const { NAMESPACES, VOID_ELEMENTS, NODE_TYPES } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/w3c-xmlserializer@5.0.0/node_modules/w3c-xmlserializer/lib/constants.js [app-ssr] (ecmascript)");
const XML_CHAR = /^(\x09|\x0A|\x0D|[\x20-\uD7FF]|[\uE000-\uFFFD]|[\u{10000}-\u{10FFFF}])*$/u;
const PUBID_CHAR = /^(\x20|\x0D|\x0A|[a-zA-Z0-9]|[-'()+,./:=?;!*#@$_%])*$/u;
function asciiCaseInsensitiveMatch(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for(let i = 0; i < a.length; ++i){
        if ((a.charCodeAt(i) | 32) !== (b.charCodeAt(i) | 32)) {
            return false;
        }
    }
    return true;
}
function recordNamespaceInformation(element, map, prefixMap) {
    let defaultNamespaceAttrValue = null;
    for(let i = 0; i < element.attributes.length; ++i){
        const attr = element.attributes[i];
        if (attr.namespaceURI === NAMESPACES.XMLNS) {
            if (attr.prefix === null) {
                defaultNamespaceAttrValue = attr.value;
                continue;
            }
            let namespaceDefinition = attr.value;
            if (namespaceDefinition === NAMESPACES.XML) {
                continue;
            }
            // This is exactly the other way than the spec says, but that's intended.
            // All the maps coalesce null to the empty string (explained in the
            // spec), so instead of doing that every time, just do it once here.
            if (namespaceDefinition === null) {
                namespaceDefinition = "";
            }
            if (namespaceDefinition in map && map[namespaceDefinition].includes(attr.localName)) {
                continue;
            }
            if (!(namespaceDefinition in map)) {
                map[namespaceDefinition] = [];
            }
            map[namespaceDefinition].push(attr.localName);
            prefixMap[attr.localName] = namespaceDefinition;
        }
    }
    return defaultNamespaceAttrValue;
}
function serializeDocumentType(node, namespace, prefixMap, requireWellFormed) {
    if (requireWellFormed && !PUBID_CHAR.test(node.publicId)) {
        throw new Error("Failed to serialize XML: document type node publicId is not well-formed.");
    }
    if (requireWellFormed && (!XML_CHAR.test(node.systemId) || node.systemId.includes('"') && node.systemId.includes("'"))) {
        throw new Error("Failed to serialize XML: document type node systemId is not well-formed.");
    }
    let markup = `<!DOCTYPE ${node.name}`;
    if (node.publicId !== "") {
        markup += ` PUBLIC "${node.publicId}"`;
    } else if (node.systemId !== "") {
        markup += " SYSTEM";
    }
    if (node.systemId !== "") {
        markup += ` "${node.systemId}"`;
    }
    return `${markup}>`;
}
function serializeProcessingInstruction(node, namespace, prefixMap, requireWellFormed) {
    if (requireWellFormed && (node.target.includes(":") || asciiCaseInsensitiveMatch(node.target, "xml"))) {
        throw new Error("Failed to serialize XML: processing instruction node target is not well-formed.");
    }
    if (requireWellFormed && (!XML_CHAR.test(node.data) || node.data.includes("?>"))) {
        throw new Error("Failed to serialize XML: processing instruction node data is not well-formed.");
    }
    return `<?${node.target} ${node.data}?>`;
}
function serializeDocument(node, namespace, prefixMap, requireWellFormed, refs) {
    if (requireWellFormed && node.documentElement === null) {
        throw new Error("Failed to serialize XML: document does not have a document element.");
    }
    let serializedDocument = "";
    for (const child of node.childNodes){
        serializedDocument += xmlSerialization(child, namespace, prefixMap, requireWellFormed, refs);
    }
    return serializedDocument;
}
function serializeDocumentFragment(node, namespace, prefixMap, requireWellFormed, refs) {
    let markup = "";
    for (const child of node.childNodes){
        markup += xmlSerialization(child, namespace, prefixMap, requireWellFormed, refs);
    }
    return markup;
}
function serializeText(node, namespace, prefixMap, requireWellFormed) {
    if (requireWellFormed && !XML_CHAR.test(node.data)) {
        throw new Error("Failed to serialize XML: text node data is not well-formed.");
    }
    return node.data.replace(/&/ug, "&amp;").replace(/</ug, "&lt;").replace(/>/ug, "&gt;");
}
function serializeComment(node, namespace, prefixMap, requireWellFormed) {
    if (requireWellFormed && !XML_CHAR.test(node.data)) {
        throw new Error("Failed to serialize XML: comment node data is not well-formed.");
    }
    if (requireWellFormed && (node.data.includes("--") || node.data.endsWith("-"))) {
        throw new Error("Failed to serialize XML: found hyphens in illegal places in comment node data.");
    }
    return `<!--${node.data}-->`;
}
function serializeElement(node, namespace, prefixMap, requireWellFormed, refs) {
    if (requireWellFormed && (node.localName.includes(":") || !xnv.name(node.localName))) {
        throw new Error("Failed to serialize XML: element node localName is not a valid XML name.");
    }
    let markup = "<";
    let qualifiedName = "";
    let skipEndTag = false;
    let ignoreNamespaceDefinitionAttr = false;
    const map = {
        ...prefixMap
    };
    const localPrefixesMap = Object.create(null);
    const localDefaultNamespace = recordNamespaceInformation(node, map, localPrefixesMap);
    let inheritedNs = namespace;
    const ns = node.namespaceURI;
    if (inheritedNs === ns) {
        if (localDefaultNamespace !== null) {
            ignoreNamespaceDefinitionAttr = true;
        }
        if (ns === NAMESPACES.XML) {
            qualifiedName = `xml:${node.localName}`;
        } else {
            qualifiedName = node.localName;
        }
        markup += qualifiedName;
    } else {
        let { prefix } = node;
        let candidatePrefix = attributeUtils.preferredPrefixString(map, ns, prefix);
        if (prefix === "xmlns") {
            if (requireWellFormed) {
                throw new Error("Failed to serialize XML: element nodes can't have a prefix of \"xmlns\".");
            }
            candidatePrefix = "xmlns";
        }
        if (candidatePrefix !== null) {
            qualifiedName = `${candidatePrefix}:${node.localName}`;
            if (localDefaultNamespace !== null && localDefaultNamespace !== NAMESPACES.XML) {
                inheritedNs = localDefaultNamespace === "" ? null : localDefaultNamespace;
            }
            markup += qualifiedName;
        } else if (prefix !== null) {
            if (prefix in localPrefixesMap) {
                prefix = attributeUtils.generatePrefix(map, ns, refs.prefixIndex++);
            }
            if (map[ns]) {
                map[ns].push(prefix);
            } else {
                map[ns] = [
                    prefix
                ];
            }
            qualifiedName = `${prefix}:${node.localName}`;
            markup += `${qualifiedName} xmlns:${prefix}="${attributeUtils.serializeAttributeValue(ns, requireWellFormed)}"`;
            if (localDefaultNamespace !== null) {
                inheritedNs = localDefaultNamespace === "" ? null : localDefaultNamespace;
            }
        } else if (localDefaultNamespace === null || localDefaultNamespace !== ns) {
            ignoreNamespaceDefinitionAttr = true;
            qualifiedName = node.localName;
            inheritedNs = ns;
            markup += `${qualifiedName} xmlns="${attributeUtils.serializeAttributeValue(ns, requireWellFormed)}"`;
        } else {
            qualifiedName = node.localName;
            inheritedNs = ns;
            markup += qualifiedName;
        }
    }
    markup += attributeUtils.serializeAttributes(node, map, localPrefixesMap, ignoreNamespaceDefinitionAttr, requireWellFormed, refs);
    if (ns === NAMESPACES.HTML && node.childNodes.length === 0 && VOID_ELEMENTS.has(node.localName)) {
        markup += " /";
        skipEndTag = true;
    } else if (ns !== NAMESPACES.HTML && node.childNodes.length === 0) {
        markup += "/";
        skipEndTag = true;
    }
    markup += ">";
    if (skipEndTag) {
        return markup;
    }
    if (ns === NAMESPACES.HTML && node.localName === "template") {
        markup += xmlSerialization(node.content, inheritedNs, map, requireWellFormed, refs);
    } else {
        for (const child of node.childNodes){
            markup += xmlSerialization(child, inheritedNs, map, requireWellFormed, refs);
        }
    }
    markup += `</${qualifiedName}>`;
    return markup;
}
function serializeCDATASection(node) {
    return `<![CDATA[${node.data}]]>`;
}
/**
 * @param {{prefixIndex: number}} refs
 */ function xmlSerialization(node, namespace, prefixMap, requireWellFormed, refs) {
    switch(node.nodeType){
        case NODE_TYPES.ELEMENT_NODE:
            return serializeElement(node, namespace, prefixMap, requireWellFormed, refs);
        case NODE_TYPES.DOCUMENT_NODE:
            return serializeDocument(node, namespace, prefixMap, requireWellFormed, refs);
        case NODE_TYPES.COMMENT_NODE:
            return serializeComment(node, namespace, prefixMap, requireWellFormed);
        case NODE_TYPES.TEXT_NODE:
            return serializeText(node, namespace, prefixMap, requireWellFormed);
        case NODE_TYPES.DOCUMENT_FRAGMENT_NODE:
            return serializeDocumentFragment(node, namespace, prefixMap, requireWellFormed, refs);
        case NODE_TYPES.DOCUMENT_TYPE_NODE:
            return serializeDocumentType(node, namespace, prefixMap, requireWellFormed);
        case NODE_TYPES.PROCESSING_INSTRUCTION_NODE:
            return serializeProcessingInstruction(node, namespace, prefixMap, requireWellFormed);
        case NODE_TYPES.ATTRIBUTE_NODE:
            return "";
        case NODE_TYPES.CDATA_SECTION_NODE:
            return serializeCDATASection(node);
        default:
            throw new TypeError("Failed to serialize XML: only Nodes can be serialized.");
    }
}
module.exports = (root, { requireWellFormed = false } = {})=>{
    const namespacePrefixMap = Object.create(null);
    namespacePrefixMap["http://www.w3.org/XML/1998/namespace"] = [
        "xml"
    ];
    return xmlSerialization(root, null, namespacePrefixMap, requireWellFormed, {
        prefixIndex: 1
    });
};
}),
"[project]/frontend/node_modules/.pnpm/data-urls@5.0.0/node_modules/data-urls/lib/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.stripLeadingAndTrailingASCIIWhitespace = (string)=>{
    return string.replace(/^[ \t\n\f\r]+/u, "").replace(/[ \t\n\f\r]+$/u, "");
};
exports.isomorphicDecode = (input)=>{
    return Array.from(input, (byte)=>String.fromCodePoint(byte)).join("");
};
exports.forgivingBase64Decode = (data)=>{
    let asString;
    try {
        asString = atob(data);
    } catch  {
        return null;
    }
    return Uint8Array.from(asString, (c)=>c.codePointAt(0));
};
}),
"[project]/frontend/node_modules/.pnpm/data-urls@5.0.0/node_modules/data-urls/lib/parser.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const MIMEType = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-mimetype@4.0.0/node_modules/whatwg-mimetype/lib/mime-type.js [app-ssr] (ecmascript)");
const { parseURL, serializeURL, percentDecodeString } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/whatwg-url@14.2.0/node_modules/whatwg-url/index.js [app-ssr] (ecmascript)");
const { stripLeadingAndTrailingASCIIWhitespace, isomorphicDecode, forgivingBase64Decode } = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/data-urls@5.0.0/node_modules/data-urls/lib/utils.js [app-ssr] (ecmascript)");
module.exports = (stringInput)=>{
    const urlRecord = parseURL(stringInput);
    if (urlRecord === null) {
        return null;
    }
    return module.exports.fromURLRecord(urlRecord);
};
module.exports.fromURLRecord = (urlRecord)=>{
    if (urlRecord.scheme !== "data") {
        return null;
    }
    const input = serializeURL(urlRecord, true).substring("data:".length);
    let position = 0;
    let mimeType = "";
    while(position < input.length && input[position] !== ","){
        mimeType += input[position];
        ++position;
    }
    mimeType = stripLeadingAndTrailingASCIIWhitespace(mimeType);
    if (position === input.length) {
        return null;
    }
    ++position;
    const encodedBody = input.substring(position);
    let body = percentDecodeString(encodedBody);
    // Can't use /i regexp flag because it isn't restricted to ASCII.
    const mimeTypeBase64MatchResult = /(.*); *[Bb][Aa][Ss][Ee]64$/u.exec(mimeType);
    if (mimeTypeBase64MatchResult) {
        const stringBody = isomorphicDecode(body);
        body = forgivingBase64Decode(stringBody);
        if (body === null) {
            return null;
        }
        mimeType = mimeTypeBase64MatchResult[1];
    }
    if (mimeType.startsWith(";")) {
        mimeType = `text/plain${mimeType}`;
    }
    let mimeTypeRecord;
    try {
        mimeTypeRecord = new MIMEType(mimeType);
    } catch (e) {
        mimeTypeRecord = new MIMEType("text/plain;charset=US-ASCII");
    }
    return {
        mimeType: mimeTypeRecord,
        body
    };
};
}),
"[project]/frontend/node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Helpers.
 */ var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
        return parse(val);
    } else if (type === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function parse(str) {
    str = String(str);
    if (str.length > 100) {
        return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
        return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch(type){
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return n * y;
        case 'weeks':
        case 'week':
        case 'w':
            return n * w;
        case 'days':
        case 'day':
        case 'd':
            return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return n * m;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return n * s;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
        return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
        return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
        return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
}
/**
 * Pluralization helper.
 */ function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}
}),
"[project]/frontend/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/common.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js [app-ssr] (ecmascript)");
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key)=>{
        createDebug[key] = env[key];
    });
    /**
	* The currently active debug mode names, and names to skip.
	*/ createDebug.names = [];
    createDebug.skips = [];
    /**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/ createDebug.formatters = {};
    /**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/ function selectColor(namespace) {
        let hash = 0;
        for(let i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/ function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
            // Disabled?
            if (!debug.enabled) {
                return;
            }
            const self = debug;
            // Set `diff` timestamp
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== 'string') {
                // Anything else let's inspect with %O
                args.unshift('%O');
            }
            // Apply any `formatters` transformations
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format)=>{
                // If we encounter an escaped % then don't increase the array index
                if (match === '%%') {
                    return '%';
                }
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === 'function') {
                    const val = args[index];
                    match = formatter.call(self, val);
                    // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.
        Object.defineProperty(debug, 'enabled', {
            enumerable: true,
            configurable: false,
            get: ()=>{
                if (enableOverride !== null) {
                    return enableOverride;
                }
                if (namespacesCache !== createDebug.namespaces) {
                    namespacesCache = createDebug.namespaces;
                    enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
            },
            set: (v)=>{
                enableOverride = v;
            }
        });
        // Env-specific initialization logic for debug instances
        if (typeof createDebug.init === 'function') {
            createDebug.init(debug);
        }
        return debug;
    }
    function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
    }
    /**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === 'string' ? namespaces : '').trim().replace(/\s+/g, ',').split(',').filter(Boolean);
        for (const ns of split){
            if (ns[0] === '-') {
                createDebug.skips.push(ns.slice(1));
            } else {
                createDebug.names.push(ns);
            }
        }
    }
    /**
	 * Checks if the given string matches a namespace template, honoring
	 * asterisks as wildcards.
	 *
	 * @param {String} search
	 * @param {String} template
	 * @return {Boolean}
	 */ function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while(searchIndex < search.length){
            if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
                // Match character or proceed with wildcard
                if (template[templateIndex] === '*') {
                    starIndex = templateIndex;
                    matchIndex = searchIndex;
                    templateIndex++; // Skip the '*'
                } else {
                    searchIndex++;
                    templateIndex++;
                }
            } else if (starIndex !== -1) {
                // Backtrack to the last '*' and try to match more characters
                templateIndex = starIndex + 1;
                matchIndex++;
                searchIndex = matchIndex;
            } else {
                return false; // No match
            }
        }
        // Handle trailing '*' in template
        while(templateIndex < template.length && template[templateIndex] === '*'){
            templateIndex++;
        }
        return templateIndex === template.length;
    }
    /**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/ function disable() {
        const namespaces = [
            ...createDebug.names,
            ...createDebug.skips.map((namespace)=>'-' + namespace)
        ].join(',');
        createDebug.enable('');
        return namespaces;
    }
    /**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/ function enabled(name) {
        for (const skip of createDebug.skips){
            if (matchesTemplate(name, skip)) {
                return false;
            }
        }
        for (const ns of createDebug.names){
            if (matchesTemplate(name, ns)) {
                return true;
            }
        }
        return false;
    }
    /**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/ function coerce(val) {
        if (val instanceof Error) {
            return val.stack || val.message;
        }
        return val;
    }
    /**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/ function destroy() {
        console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = setup;
}),
"[project]/frontend/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/node.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Module dependencies.
 */ const tty = __turbopack_context__.r("[externals]/tty [external] (tty, cjs)");
const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
/**
 * This is the Node.js implementation of `debug()`.
 */ exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(()=>{}, 'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
/**
 * Colors.
 */ exports.colors = [
    6,
    2,
    3,
    4,
    5,
    1
];
try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    const supportsColor = (()=>{
        const e = new Error("Cannot find module 'supports-color'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })();
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            128,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
        ];
    }
} catch (error) {
// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */ exports.inspectOpts = Object.keys(process.env).filter((key)=>{
    return /^debug_/i.test(key);
}).reduce((obj, key)=>{
    // Camel-case
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k)=>{
        return k.toUpperCase();
    });
    // Coerce string value into JS value
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
    } else if (val === 'null') {
        val = null;
    } else {
        val = Number(val);
    }
    obj[prop] = val;
    return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */ function useColors() {
    return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    const { namespace: name, useColors } = this;
    if (useColors) {
        const c = this.color;
        const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
        const prefix = `  ${colorCode};1m${name} \u001B[0m`;
        args[0] = prefix + args[0].split('\n').join('\n' + prefix);
        args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
    } else {
        args[0] = getDate() + name + ' ' + args[0];
    }
}
function getDate() {
    if (exports.inspectOpts.hideDate) {
        return '';
    }
    return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
 */ function log(...args) {
    return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    if (namespaces) {
        process.env.DEBUG = namespaces;
    } else {
        // If you set a process.env field to null or undefined, it gets cast to the
        // string 'null' or 'undefined'. Just delete instead.
        delete process.env.DEBUG;
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for(let i = 0; i < keys.length; i++){
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
}
module.exports = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/common.js [app-ssr] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split('\n').map((str)=>str.trim()).join(' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
};
}),
"[project]/frontend/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/browser.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (()=>{
    let warned = false;
    return ()=>{
        if (!warned) {
            warned = true;
            console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
        }
    };
})();
/**
 * Colors.
 */ exports.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
    }
    let m;
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    // eslint-disable-next-line no-return-assign
    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
    if (!this.useColors) {
        return;
    }
    const c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match)=>{
        if (match === '%%') {
            return;
        }
        index++;
        if (match === '%c') {
            // We only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
        }
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */ exports.log = console.debug || console.log || (()=>{});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    try {
        if (namespaces) {
            exports.storage.setItem('debug', namespaces);
        } else {
            exports.storage.removeItem('debug');
        }
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    let r;
    try {
        r = exports.storage.getItem('debug') || exports.storage.getItem('DEBUG');
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
    }
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
module.exports = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/common.js [app-ssr] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message;
    }
};
}),
"[project]/frontend/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ if (typeof process === 'undefined' || process.type === 'renderer' || ("TURBOPACK compile-time value", false) === true || process.__nwjs) {
    module.exports = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/browser.js [app-ssr] (ecmascript)");
} else {
    module.exports = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/node.js [app-ssr] (ecmascript)");
}
}),
"[project]/frontend/node_modules/.pnpm/agent-base@7.1.4/node_modules/agent-base/dist/helpers.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.req = exports.json = exports.toBuffer = void 0;
const http = __importStar(__turbopack_context__.r("[externals]/http [external] (http, cjs)"));
const https = __importStar(__turbopack_context__.r("[externals]/https [external] (https, cjs)"));
async function toBuffer(stream) {
    let length = 0;
    const chunks = [];
    for await (const chunk of stream){
        length += chunk.length;
        chunks.push(chunk);
    }
    return Buffer.concat(chunks, length);
}
exports.toBuffer = toBuffer;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function json(stream) {
    const buf = await toBuffer(stream);
    const str = buf.toString('utf8');
    try {
        return JSON.parse(str);
    } catch (_err) {
        const err = _err;
        err.message += ` (input: ${str})`;
        throw err;
    }
}
exports.json = json;
function req(url, opts = {}) {
    const href = typeof url === 'string' ? url : url.href;
    const req1 = (href.startsWith('https:') ? https : http).request(url, opts);
    const promise = new Promise((resolve, reject)=>{
        req1.once('response', resolve).once('error', reject).end();
    });
    req1.then = promise.then.bind(promise);
    return req1;
}
exports.req = req; //# sourceMappingURL=helpers.js.map
}),
"[project]/frontend/node_modules/.pnpm/agent-base@7.1.4/node_modules/agent-base/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Agent = void 0;
const net = __importStar(__turbopack_context__.r("[externals]/net [external] (net, cjs)"));
const http = __importStar(__turbopack_context__.r("[externals]/http [external] (http, cjs)"));
const https_1 = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
__exportStar(__turbopack_context__.r("[project]/frontend/node_modules/.pnpm/agent-base@7.1.4/node_modules/agent-base/dist/helpers.js [app-ssr] (ecmascript)"), exports);
const INTERNAL = Symbol('AgentBaseInternalState');
class Agent extends http.Agent {
    constructor(opts){
        super(opts);
        this[INTERNAL] = {};
    }
    /**
     * Determine whether this is an `http` or `https` request.
     */ isSecureEndpoint(options) {
        if (options) {
            // First check the `secureEndpoint` property explicitly, since this
            // means that a parent `Agent` is "passing through" to this instance.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (typeof options.secureEndpoint === 'boolean') {
                return options.secureEndpoint;
            }
            // If no explicit `secure` endpoint, check if `protocol` property is
            // set. This will usually be the case since using a full string URL
            // or `URL` instance should be the most common usage.
            if (typeof options.protocol === 'string') {
                return options.protocol === 'https:';
            }
        }
        // Finally, if no `protocol` property was set, then fall back to
        // checking the stack trace of the current call stack, and try to
        // detect the "https" module.
        const { stack } = new Error();
        if (typeof stack !== 'string') return false;
        return stack.split('\n').some((l)=>l.indexOf('(https.js:') !== -1 || l.indexOf('node:https:') !== -1);
    }
    // In order to support async signatures in `connect()` and Node's native
    // connection pooling in `http.Agent`, the array of sockets for each origin
    // has to be updated synchronously. This is so the length of the array is
    // accurate when `addRequest()` is next called. We achieve this by creating a
    // fake socket and adding it to `sockets[origin]` and incrementing
    // `totalSocketCount`.
    incrementSockets(name) {
        // If `maxSockets` and `maxTotalSockets` are both Infinity then there is no
        // need to create a fake socket because Node.js native connection pooling
        // will never be invoked.
        if (this.maxSockets === Infinity && this.maxTotalSockets === Infinity) {
            return null;
        }
        // All instances of `sockets` are expected TypeScript errors. The
        // alternative is to add it as a private property of this class but that
        // will break TypeScript subclassing.
        if (!this.sockets[name]) {
            // @ts-expect-error `sockets` is readonly in `@types/node`
            this.sockets[name] = [];
        }
        const fakeSocket = new net.Socket({
            writable: false
        });
        this.sockets[name].push(fakeSocket);
        // @ts-expect-error `totalSocketCount` isn't defined in `@types/node`
        this.totalSocketCount++;
        return fakeSocket;
    }
    decrementSockets(name, socket) {
        if (!this.sockets[name] || socket === null) {
            return;
        }
        const sockets = this.sockets[name];
        const index = sockets.indexOf(socket);
        if (index !== -1) {
            sockets.splice(index, 1);
            // @ts-expect-error  `totalSocketCount` isn't defined in `@types/node`
            this.totalSocketCount--;
            if (sockets.length === 0) {
                // @ts-expect-error `sockets` is readonly in `@types/node`
                delete this.sockets[name];
            }
        }
    }
    // In order to properly update the socket pool, we need to call `getName()` on
    // the core `https.Agent` if it is a secureEndpoint.
    getName(options) {
        const secureEndpoint = this.isSecureEndpoint(options);
        if (secureEndpoint) {
            // @ts-expect-error `getName()` isn't defined in `@types/node`
            return https_1.Agent.prototype.getName.call(this, options);
        }
        // @ts-expect-error `getName()` isn't defined in `@types/node`
        return super.getName(options);
    }
    createSocket(req, options, cb) {
        const connectOpts = {
            ...options,
            secureEndpoint: this.isSecureEndpoint(options)
        };
        const name = this.getName(connectOpts);
        const fakeSocket = this.incrementSockets(name);
        Promise.resolve().then(()=>this.connect(req, connectOpts)).then((socket)=>{
            this.decrementSockets(name, fakeSocket);
            if (socket instanceof http.Agent) {
                try {
                    // @ts-expect-error `addRequest()` isn't defined in `@types/node`
                    return socket.addRequest(req, connectOpts);
                } catch (err) {
                    return cb(err);
                }
            }
            this[INTERNAL].currentSocket = socket;
            // @ts-expect-error `createSocket()` isn't defined in `@types/node`
            super.createSocket(req, options, cb);
        }, (err)=>{
            this.decrementSockets(name, fakeSocket);
            cb(err);
        });
    }
    createConnection() {
        const socket = this[INTERNAL].currentSocket;
        this[INTERNAL].currentSocket = undefined;
        if (!socket) {
            throw new Error('No socket was returned in the `connect()` function');
        }
        return socket;
    }
    get defaultPort() {
        return this[INTERNAL].defaultPort ?? (this.protocol === 'https:' ? 443 : 80);
    }
    set defaultPort(v) {
        if (this[INTERNAL]) {
            this[INTERNAL].defaultPort = v;
        }
    }
    get protocol() {
        return this[INTERNAL].protocol ?? (this.isSecureEndpoint() ? 'https:' : 'http:');
    }
    set protocol(v) {
        if (this[INTERNAL]) {
            this[INTERNAL].protocol = v;
        }
    }
}
exports.Agent = Agent; //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/.pnpm/http-proxy-agent@7.0.2/node_modules/http-proxy-agent/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpProxyAgent = void 0;
const net = __importStar(__turbopack_context__.r("[externals]/net [external] (net, cjs)"));
const tls = __importStar(__turbopack_context__.r("[externals]/tls [external] (tls, cjs)"));
const debug_1 = __importDefault(__turbopack_context__.r("[project]/frontend/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js [app-ssr] (ecmascript)"));
const events_1 = __turbopack_context__.r("[externals]/events [external] (events, cjs)");
const agent_base_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/agent-base@7.1.4/node_modules/agent-base/dist/index.js [app-ssr] (ecmascript)");
const url_1 = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
const debug = (0, debug_1.default)('http-proxy-agent');
/**
 * The `HttpProxyAgent` implements an HTTP Agent subclass that connects
 * to the specified "HTTP proxy server" in order to proxy HTTP requests.
 */ class HttpProxyAgent extends agent_base_1.Agent {
    constructor(proxy, opts){
        super(opts);
        this.proxy = typeof proxy === 'string' ? new url_1.URL(proxy) : proxy;
        this.proxyHeaders = opts?.headers ?? {};
        debug('Creating new HttpProxyAgent instance: %o', this.proxy.href);
        // Trim off the brackets from IPv6 addresses
        const host = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, '');
        const port = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === 'https:' ? 443 : 80;
        this.connectOpts = {
            ...opts ? omit(opts, 'headers') : null,
            host,
            port
        };
    }
    addRequest(req, opts) {
        req._header = null;
        this.setRequestProps(req, opts);
        // @ts-expect-error `addRequest()` isn't defined in `@types/node`
        super.addRequest(req, opts);
    }
    setRequestProps(req, opts) {
        const { proxy } = this;
        const protocol = opts.secureEndpoint ? 'https:' : 'http:';
        const hostname = req.getHeader('host') || 'localhost';
        const base = `${protocol}//${hostname}`;
        const url = new url_1.URL(req.path, base);
        if (opts.port !== 80) {
            url.port = String(opts.port);
        }
        // Change the `http.ClientRequest` instance's "path" field
        // to the absolute path of the URL that will be requested.
        req.path = String(url);
        // Inject the `Proxy-Authorization` header if necessary.
        const headers = typeof this.proxyHeaders === 'function' ? this.proxyHeaders() : {
            ...this.proxyHeaders
        };
        if (proxy.username || proxy.password) {
            const auth = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
            headers['Proxy-Authorization'] = `Basic ${Buffer.from(auth).toString('base64')}`;
        }
        if (!headers['Proxy-Connection']) {
            headers['Proxy-Connection'] = this.keepAlive ? 'Keep-Alive' : 'close';
        }
        for (const name of Object.keys(headers)){
            const value = headers[name];
            if (value) {
                req.setHeader(name, value);
            }
        }
    }
    async connect(req, opts) {
        req._header = null;
        if (!req.path.includes('://')) {
            this.setRequestProps(req, opts);
        }
        // At this point, the http ClientRequest's internal `_header` field
        // might have already been set. If this is the case then we'll need
        // to re-generate the string since we just changed the `req.path`.
        let first;
        let endOfHeaders;
        debug('Regenerating stored HTTP header string for request');
        req._implicitHeader();
        if (req.outputData && req.outputData.length > 0) {
            debug('Patching connection write() output buffer with updated header');
            first = req.outputData[0].data;
            endOfHeaders = first.indexOf('\r\n\r\n') + 4;
            req.outputData[0].data = req._header + first.substring(endOfHeaders);
            debug('Output buffer: %o', req.outputData[0].data);
        }
        // Create a socket connection to the proxy server.
        let socket;
        if (this.proxy.protocol === 'https:') {
            debug('Creating `tls.Socket`: %o', this.connectOpts);
            socket = tls.connect(this.connectOpts);
        } else {
            debug('Creating `net.Socket`: %o', this.connectOpts);
            socket = net.connect(this.connectOpts);
        }
        // Wait for the socket's `connect` event, so that this `callback()`
        // function throws instead of the `http` request machinery. This is
        // important for i.e. `PacProxyAgent` which determines a failed proxy
        // connection via the `callback()` function throwing.
        await (0, events_1.once)(socket, 'connect');
        return socket;
    }
}
HttpProxyAgent.protocols = [
    'http',
    'https'
];
exports.HttpProxyAgent = HttpProxyAgent;
function omit(obj, ...keys) {
    const ret = {};
    let key;
    for(key in obj){
        if (!keys.includes(key)) {
            ret[key] = obj[key];
        }
    }
    return ret;
} //# sourceMappingURL=index.js.map
}),
"[project]/frontend/node_modules/.pnpm/https-proxy-agent@7.0.6/node_modules/https-proxy-agent/dist/parse-proxy-response.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseProxyResponse = void 0;
const debug_1 = __importDefault(__turbopack_context__.r("[project]/frontend/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js [app-ssr] (ecmascript)"));
const debug = (0, debug_1.default)('https-proxy-agent:parse-proxy-response');
function parseProxyResponse(socket) {
    return new Promise((resolve, reject)=>{
        // we need to buffer any HTTP traffic that happens with the proxy before we get
        // the CONNECT response, so that if the response is anything other than an "200"
        // response code, then we can re-play the "data" events on the socket once the
        // HTTP parser is hooked up...
        let buffersLength = 0;
        const buffers = [];
        function read() {
            const b = socket.read();
            if (b) ondata(b);
            else socket.once('readable', read);
        }
        function cleanup() {
            socket.removeListener('end', onend);
            socket.removeListener('error', onerror);
            socket.removeListener('readable', read);
        }
        function onend() {
            cleanup();
            debug('onend');
            reject(new Error('Proxy connection ended before receiving CONNECT response'));
        }
        function onerror(err) {
            cleanup();
            debug('onerror %o', err);
            reject(err);
        }
        function ondata(b) {
            buffers.push(b);
            buffersLength += b.length;
            const buffered = Buffer.concat(buffers, buffersLength);
            const endOfHeaders = buffered.indexOf('\r\n\r\n');
            if (endOfHeaders === -1) {
                // keep buffering
                debug('have not received end of HTTP headers yet...');
                read();
                return;
            }
            const headerParts = buffered.slice(0, endOfHeaders).toString('ascii').split('\r\n');
            const firstLine = headerParts.shift();
            if (!firstLine) {
                socket.destroy();
                return reject(new Error('No header received from proxy CONNECT response'));
            }
            const firstLineParts = firstLine.split(' ');
            const statusCode = +firstLineParts[1];
            const statusText = firstLineParts.slice(2).join(' ');
            const headers = {};
            for (const header of headerParts){
                if (!header) continue;
                const firstColon = header.indexOf(':');
                if (firstColon === -1) {
                    socket.destroy();
                    return reject(new Error(`Invalid header from proxy CONNECT response: "${header}"`));
                }
                const key = header.slice(0, firstColon).toLowerCase();
                const value = header.slice(firstColon + 1).trimStart();
                const current = headers[key];
                if (typeof current === 'string') {
                    headers[key] = [
                        current,
                        value
                    ];
                } else if (Array.isArray(current)) {
                    current.push(value);
                } else {
                    headers[key] = value;
                }
            }
            debug('got proxy server response: %o %o', firstLine, headers);
            cleanup();
            resolve({
                connect: {
                    statusCode,
                    statusText,
                    headers
                },
                buffered
            });
        }
        socket.on('error', onerror);
        socket.on('end', onend);
        read();
    });
}
exports.parseProxyResponse = parseProxyResponse; //# sourceMappingURL=parse-proxy-response.js.map
}),
"[project]/frontend/node_modules/.pnpm/https-proxy-agent@7.0.6/node_modules/https-proxy-agent/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpsProxyAgent = void 0;
const net = __importStar(__turbopack_context__.r("[externals]/net [external] (net, cjs)"));
const tls = __importStar(__turbopack_context__.r("[externals]/tls [external] (tls, cjs)"));
const assert_1 = __importDefault(__turbopack_context__.r("[externals]/assert [external] (assert, cjs)"));
const debug_1 = __importDefault(__turbopack_context__.r("[project]/frontend/node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js [app-ssr] (ecmascript)"));
const agent_base_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/agent-base@7.1.4/node_modules/agent-base/dist/index.js [app-ssr] (ecmascript)");
const url_1 = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
const parse_proxy_response_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/https-proxy-agent@7.0.6/node_modules/https-proxy-agent/dist/parse-proxy-response.js [app-ssr] (ecmascript)");
const debug = (0, debug_1.default)('https-proxy-agent');
const setServernameFromNonIpHost = (options)=>{
    if (options.servername === undefined && options.host && !net.isIP(options.host)) {
        return {
            ...options,
            servername: options.host
        };
    }
    return options;
};
/**
 * The `HttpsProxyAgent` implements an HTTP Agent subclass that connects to
 * the specified "HTTP(s) proxy server" in order to proxy HTTPS requests.
 *
 * Outgoing HTTP requests are first tunneled through the proxy server using the
 * `CONNECT` HTTP request method to establish a connection to the proxy server,
 * and then the proxy server connects to the destination target and issues the
 * HTTP request from the proxy server.
 *
 * `https:` requests have their socket connection upgraded to TLS once
 * the connection to the proxy server has been established.
 */ class HttpsProxyAgent extends agent_base_1.Agent {
    constructor(proxy, opts){
        super(opts);
        this.options = {
            path: undefined
        };
        this.proxy = typeof proxy === 'string' ? new url_1.URL(proxy) : proxy;
        this.proxyHeaders = opts?.headers ?? {};
        debug('Creating new HttpsProxyAgent instance: %o', this.proxy.href);
        // Trim off the brackets from IPv6 addresses
        const host = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, '');
        const port = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === 'https:' ? 443 : 80;
        this.connectOpts = {
            // Attempt to negotiate http/1.1 for proxy servers that support http/2
            ALPNProtocols: [
                'http/1.1'
            ],
            ...opts ? omit(opts, 'headers') : null,
            host,
            port
        };
    }
    /**
     * Called when the node-core HTTP client library is creating a
     * new HTTP request.
     */ async connect(req, opts) {
        const { proxy } = this;
        if (!opts.host) {
            throw new TypeError('No "host" provided');
        }
        // Create a socket connection to the proxy server.
        let socket;
        if (proxy.protocol === 'https:') {
            debug('Creating `tls.Socket`: %o', this.connectOpts);
            socket = tls.connect(setServernameFromNonIpHost(this.connectOpts));
        } else {
            debug('Creating `net.Socket`: %o', this.connectOpts);
            socket = net.connect(this.connectOpts);
        }
        const headers = typeof this.proxyHeaders === 'function' ? this.proxyHeaders() : {
            ...this.proxyHeaders
        };
        const host = net.isIPv6(opts.host) ? `[${opts.host}]` : opts.host;
        let payload = `CONNECT ${host}:${opts.port} HTTP/1.1\r\n`;
        // Inject the `Proxy-Authorization` header if necessary.
        if (proxy.username || proxy.password) {
            const auth = `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`;
            headers['Proxy-Authorization'] = `Basic ${Buffer.from(auth).toString('base64')}`;
        }
        headers.Host = `${host}:${opts.port}`;
        if (!headers['Proxy-Connection']) {
            headers['Proxy-Connection'] = this.keepAlive ? 'Keep-Alive' : 'close';
        }
        for (const name of Object.keys(headers)){
            payload += `${name}: ${headers[name]}\r\n`;
        }
        const proxyResponsePromise = (0, parse_proxy_response_1.parseProxyResponse)(socket);
        socket.write(`${payload}\r\n`);
        const { connect, buffered } = await proxyResponsePromise;
        req.emit('proxyConnect', connect);
        this.emit('proxyConnect', connect, req);
        if (connect.statusCode === 200) {
            req.once('socket', resume);
            if (opts.secureEndpoint) {
                // The proxy is connecting to a TLS server, so upgrade
                // this socket connection to a TLS connection.
                debug('Upgrading socket connection to TLS');
                return tls.connect({
                    ...omit(setServernameFromNonIpHost(opts), 'host', 'path', 'port'),
                    socket
                });
            }
            return socket;
        }
        // Some other status code that's not 200... need to re-play the HTTP
        // header "data" events onto the socket once the HTTP machinery is
        // attached so that the node core `http` can parse and handle the
        // error status code.
        // Close the original socket, and a new "fake" socket is returned
        // instead, so that the proxy doesn't get the HTTP request
        // written to it (which may contain `Authorization` headers or other
        // sensitive data).
        //
        // See: https://hackerone.com/reports/541502
        socket.destroy();
        const fakeSocket = new net.Socket({
            writable: false
        });
        fakeSocket.readable = true;
        // Need to wait for the "socket" event to re-play the "data" events.
        req.once('socket', (s)=>{
            debug('Replaying proxy buffer for failed request');
            (0, assert_1.default)(s.listenerCount('data') > 0);
            // Replay the "buffered" Buffer onto the fake `socket`, since at
            // this point the HTTP module machinery has been hooked up for
            // the user.
            s.push(buffered);
            s.push(null);
        });
        return fakeSocket;
    }
}
HttpsProxyAgent.protocols = [
    'http',
    'https'
];
exports.HttpsProxyAgent = HttpsProxyAgent;
function resume(socket) {
    socket.resume();
}
function omit(obj, ...keys) {
    const ret = {};
    let key;
    for(key in obj){
        if (!keys.includes(key)) {
            ret[key] = obj[key];
        }
    }
    return ret;
} //# sourceMappingURL=index.js.map
}),
];

//# sourceMappingURL=9e883__pnpm_a7b5c9c1._.js.map