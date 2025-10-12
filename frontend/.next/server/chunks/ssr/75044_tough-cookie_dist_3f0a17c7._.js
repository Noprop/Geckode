module.exports = [
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/pathMatch.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pathMatch = pathMatch;
/**
 * Answers "does the request-path path-match a given cookie-path?" as per {@link https://www.rfc-editor.org/rfc/rfc6265.html#section-5.1.4 | RFC6265 Section 5.1.4}.
 * This is essentially a prefix-match where cookiePath is a prefix of reqPath.
 *
 * @remarks
 * A request-path path-matches a given cookie-path if at least one of
 * the following conditions holds:
 *
 * - The cookie-path and the request-path are identical.
 * - The cookie-path is a prefix of the request-path, and the last character of the cookie-path is %x2F ("/").
 * - The cookie-path is a prefix of the request-path, and the first character of the request-path that is not included in the cookie-path is a %x2F ("/") character.
 *
 * @param reqPath - the path of the request
 * @param cookiePath - the path of the cookie
 * @public
 */ function pathMatch(reqPath, cookiePath) {
    // "o  The cookie-path and the request-path are identical."
    if (cookiePath === reqPath) {
        return true;
    }
    const idx = reqPath.indexOf(cookiePath);
    if (idx === 0) {
        // "o  The cookie-path is a prefix of the request-path, and the last
        // character of the cookie-path is %x2F ("/")."
        if (cookiePath[cookiePath.length - 1] === '/') {
            return true;
        }
        // " o  The cookie-path is a prefix of the request-path, and the first
        // character of the request-path that is not included in the cookie- path
        // is a %x2F ("/") character."
        if (reqPath.startsWith(cookiePath) && reqPath[cookiePath.length] === '/') {
            return true;
        }
    }
    return false;
}
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/getPublicSuffix.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPublicSuffix = getPublicSuffix;
const tldts_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tldts@6.1.86/node_modules/tldts/dist/es6/index.js [app-ssr] (ecmascript)");
// RFC 6761
const SPECIAL_USE_DOMAINS = [
    'local',
    'example',
    'invalid',
    'localhost',
    'test'
];
const SPECIAL_TREATMENT_DOMAINS = [
    'localhost',
    'invalid'
];
const defaultGetPublicSuffixOptions = {
    allowSpecialUseDomain: false,
    ignoreError: false
};
/**
 * Returns the public suffix of this hostname. The public suffix is the shortest domain
 * name upon which a cookie can be set.
 *
 * @remarks
 * A "public suffix" is a domain that is controlled by a
 * public registry, such as "com", "co.uk", and "pvt.k12.wy.us".
 * This step is essential for preventing attacker.com from
 * disrupting the integrity of example.com by setting a cookie
 * with a Domain attribute of "com".  Unfortunately, the set of
 * public suffixes (also known as "registry controlled domains")
 * changes over time.  If feasible, user agents SHOULD use an
 * up-to-date public suffix list, such as the one maintained by
 * the Mozilla project at http://publicsuffix.org/.
 * (See {@link https://www.rfc-editor.org/rfc/rfc6265.html#section-5.3 | RFC6265 - Section 5.3})
 *
 * @example
 * ```
 * getPublicSuffix('www.example.com') === 'example.com'
 * getPublicSuffix('www.subdomain.example.com') === 'example.com'
 * ```
 *
 * @param domain - the domain attribute of a cookie
 * @param options - optional configuration for controlling how the public suffix is determined
 * @public
 */ function getPublicSuffix(domain, options = {}) {
    options = {
        ...defaultGetPublicSuffixOptions,
        ...options
    };
    const domainParts = domain.split('.');
    const topLevelDomain = domainParts[domainParts.length - 1];
    const allowSpecialUseDomain = !!options.allowSpecialUseDomain;
    const ignoreError = !!options.ignoreError;
    if (allowSpecialUseDomain && topLevelDomain !== undefined && SPECIAL_USE_DOMAINS.includes(topLevelDomain)) {
        if (domainParts.length > 1) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const secondLevelDomain = domainParts[domainParts.length - 2];
            // In aforementioned example, the eTLD/pubSuf will be apple.localhost
            return `${secondLevelDomain}.${topLevelDomain}`;
        } else if (SPECIAL_TREATMENT_DOMAINS.includes(topLevelDomain)) {
            // For a single word special use domain, e.g. 'localhost' or 'invalid', per RFC 6761,
            // "Application software MAY recognize {localhost/invalid} names as special, or
            // MAY pass them to name resolution APIs as they would for other domain names."
            return topLevelDomain;
        }
    }
    if (!ignoreError && topLevelDomain !== undefined && SPECIAL_USE_DOMAINS.includes(topLevelDomain)) {
        throw new Error(`Cookie has domain set to the public suffix "${topLevelDomain}" which is a special use domain. To allow this, configure your CookieJar with {allowSpecialUseDomain: true, rejectPublicSuffixes: false}.`);
    }
    const publicSuffix = (0, tldts_1.getDomain)(domain, {
        allowIcannDomains: true,
        allowPrivateDomains: true
    });
    if (publicSuffix) return publicSuffix;
}
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/permuteDomain.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.permuteDomain = permuteDomain;
const getPublicSuffix_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/getPublicSuffix.js [app-ssr] (ecmascript)");
/**
 * Generates the permutation of all possible values that {@link domainMatch} the given `domain` parameter. The
 * array is in shortest-to-longest order. Useful when building custom {@link Store} implementations.
 *
 * @example
 * ```
 * permuteDomain('foo.bar.example.com')
 * // ['example.com', 'bar.example.com', 'foo.bar.example.com']
 * ```
 *
 * @public
 * @param domain - the domain to generate permutations for
 * @param allowSpecialUseDomain - flag to control if {@link https://www.rfc-editor.org/rfc/rfc6761.html | Special Use Domains} such as `localhost` should be allowed
 */ function permuteDomain(domain, allowSpecialUseDomain) {
    const pubSuf = (0, getPublicSuffix_1.getPublicSuffix)(domain, {
        allowSpecialUseDomain: allowSpecialUseDomain
    });
    if (!pubSuf) {
        return undefined;
    }
    if (pubSuf == domain) {
        return [
            domain
        ];
    }
    // Nuke trailing dot
    if (domain.slice(-1) == '.') {
        domain = domain.slice(0, -1);
    }
    const prefix = domain.slice(0, -(pubSuf.length + 1)); // ".example.com"
    const parts = prefix.split('.').reverse();
    let cur = pubSuf;
    const permutations = [
        cur
    ];
    while(parts.length){
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const part = parts.shift();
        cur = `${part}.${cur}`;
        permutations.push(cur);
    }
    return permutations;
}
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/store.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// disabling this lint on this whole file because Store should be abstract
// but we have implementations in the wild that may not implement all features
/* eslint-disable @typescript-eslint/no-unused-vars */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Store = void 0;
/**
 * Base class for {@link CookieJar} stores.
 *
 * The storage model for each {@link CookieJar} instance can be replaced with a custom implementation. The default is
 * {@link MemoryCookieStore}.
 *
 * @remarks
 * - Stores should inherit from the base Store class, which is available as a top-level export.
 *
 * - Stores are asynchronous by default, but if {@link Store.synchronous} is set to true, then the `*Sync` methods
 *     of the containing {@link CookieJar} can be used.
 *
 * @public
 */ class Store {
    constructor(){
        this.synchronous = false;
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ findCookie(_domain, _path, _key, _callback) {
        throw new Error('findCookie is not implemented');
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ findCookies(_domain, _path, _allowSpecialUseDomain = false, _callback) {
        throw new Error('findCookies is not implemented');
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ putCookie(_cookie, _callback) {
        throw new Error('putCookie is not implemented');
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ updateCookie(_oldCookie, _newCookie, _callback) {
        // recommended default implementation:
        // return this.putCookie(newCookie, cb);
        throw new Error('updateCookie is not implemented');
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ removeCookie(_domain, _path, _key, _callback) {
        throw new Error('removeCookie is not implemented');
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ removeCookies(_domain, _path, _callback) {
        throw new Error('removeCookies is not implemented');
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ removeAllCookies(_callback) {
        throw new Error('removeAllCookies is not implemented');
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ getAllCookies(_callback) {
        throw new Error('getAllCookies is not implemented (therefore jar cannot be serialized)');
    }
}
exports.Store = Store;
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.safeToString = exports.objectToString = void 0;
exports.createPromiseCallback = createPromiseCallback;
exports.inOperator = inOperator;
/** Wrapped `Object.prototype.toString`, so that you don't need to remember to use `.call()`. */ const objectToString = (obj)=>Object.prototype.toString.call(obj);
exports.objectToString = objectToString;
/**
 * Converts an array to string, safely handling symbols, null prototype objects, and recursive arrays.
 */ const safeArrayToString = (arr, seenArrays)=>{
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString#description
    if (typeof arr.join !== 'function') return (0, exports.objectToString)(arr);
    seenArrays.add(arr);
    const mapped = arr.map((val)=>val === null || val === undefined || seenArrays.has(val) ? '' : safeToStringImpl(val, seenArrays));
    return mapped.join();
};
const safeToStringImpl = (val, seenArrays = new WeakSet())=>{
    // Using .toString() fails for null/undefined and implicit conversion (val + "") fails for symbols
    // and objects with null prototype
    if (typeof val !== 'object' || val === null) {
        return String(val);
    } else if (typeof val.toString === 'function') {
        return Array.isArray(val) ? safeArrayToString(val, seenArrays) : String(val);
    } else {
        // This case should just be objects with null prototype, so we can just use Object#toString
        return (0, exports.objectToString)(val);
    }
};
/** Safely converts any value to string, using the value's own `toString` when available. */ const safeToString = (val)=>safeToStringImpl(val);
exports.safeToString = safeToString;
/** Converts a callback into a utility object where either a callback or a promise can be used. */ function createPromiseCallback(cb) {
    let callback;
    let resolve;
    let reject;
    const promise = new Promise((_resolve, _reject)=>{
        resolve = _resolve;
        reject = _reject;
    });
    if (typeof cb === 'function') {
        callback = (err, result)=>{
            try {
                if (err) cb(err);
                else cb(null, result);
            } catch (e) {
                reject(e instanceof Error ? e : new Error());
            }
        };
    } else {
        callback = (err, result)=>{
            try {
                // If `err` is null, we know `result` must be `T`
                // The assertion isn't *strictly* correct, as `T` could be nullish, but, ehh, good enough...
                if (err) reject(err);
                else resolve(result);
            } catch (e) {
                reject(e instanceof Error ? e : new Error());
            }
        };
    }
    return {
        promise,
        callback,
        resolve: (value)=>{
            callback(null, value);
            return promise;
        },
        reject: (error)=>{
            callback(error);
            return promise;
        }
    };
}
function inOperator(k, o) {
    return k in o;
}
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/memstore.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MemoryCookieStore = void 0;
const pathMatch_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/pathMatch.js [app-ssr] (ecmascript)");
const permuteDomain_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/permuteDomain.js [app-ssr] (ecmascript)");
const store_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/store.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/utils.js [app-ssr] (ecmascript)");
/**
 * An in-memory {@link Store} implementation for {@link CookieJar}. This is the default implementation used by
 * {@link CookieJar} and supports both async and sync operations. Also supports serialization, getAllCookies, and removeAllCookies.
 * @public
 */ class MemoryCookieStore extends store_1.Store {
    /**
     * Create a new {@link MemoryCookieStore}.
     */ constructor(){
        super();
        this.synchronous = true;
        this.idx = Object.create(null);
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ findCookie(domain, path, key, callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        if (domain == null || path == null || key == null) {
            return promiseCallback.resolve(undefined);
        }
        const result = this.idx[domain]?.[path]?.[key];
        return promiseCallback.resolve(result);
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ findCookies(domain, path, allowSpecialUseDomain = false, callback) {
        if (typeof allowSpecialUseDomain === 'function') {
            callback = allowSpecialUseDomain;
            // TODO: It's weird that `allowSpecialUseDomain` defaults to false with no callback,
            // but true with a callback. This is legacy behavior from v4.
            allowSpecialUseDomain = true;
        }
        const results = [];
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        if (!domain) {
            return promiseCallback.resolve([]);
        }
        let pathMatcher;
        if (!path) {
            // null means "all paths"
            pathMatcher = function matchAll(domainIndex) {
                for(const curPath in domainIndex){
                    const pathIndex = domainIndex[curPath];
                    for(const key in pathIndex){
                        const value = pathIndex[key];
                        if (value) {
                            results.push(value);
                        }
                    }
                }
            };
        } else {
            pathMatcher = function matchRFC(domainIndex) {
                //NOTE: we should use path-match algorithm from S5.1.4 here
                //(see : https://github.com/ChromiumWebApps/chromium/blob/b3d3b4da8bb94c1b2e061600df106d590fda3620/net/cookies/canonical_cookie.cc#L299)
                for(const cookiePath in domainIndex){
                    if ((0, pathMatch_1.pathMatch)(path, cookiePath)) {
                        const pathIndex = domainIndex[cookiePath];
                        for(const key in pathIndex){
                            const value = pathIndex[key];
                            if (value) {
                                results.push(value);
                            }
                        }
                    }
                }
            };
        }
        const domains = (0, permuteDomain_1.permuteDomain)(domain, allowSpecialUseDomain) || [
            domain
        ];
        const idx = this.idx;
        domains.forEach((curDomain)=>{
            const domainIndex = idx[curDomain];
            if (!domainIndex) {
                return;
            }
            pathMatcher(domainIndex);
        });
        return promiseCallback.resolve(results);
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ putCookie(cookie, callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const { domain, path, key } = cookie;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (domain == null || path == null || key == null) {
            return promiseCallback.resolve(undefined);
        }
        const domainEntry = this.idx[domain] ?? Object.create(null);
        this.idx[domain] = domainEntry;
        const pathEntry = domainEntry[path] ?? Object.create(null);
        domainEntry[path] = pathEntry;
        pathEntry[key] = cookie;
        return promiseCallback.resolve(undefined);
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ updateCookie(_oldCookie, newCookie, callback) {
        // updateCookie() may avoid updating cookies that are identical.  For example,
        // lastAccessed may not be important to some stores and an equality
        // comparison could exclude that field.
        // Don't return a value when using a callback, so that the return type is truly "void"
        if (callback) this.putCookie(newCookie, callback);
        else return this.putCookie(newCookie);
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ removeCookie(domain, path, key, callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        delete this.idx[domain]?.[path]?.[key];
        return promiseCallback.resolve(undefined);
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ removeCookies(domain, path, callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const domainEntry = this.idx[domain];
        if (domainEntry) {
            if (path) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete domainEntry[path];
            } else {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete this.idx[domain];
            }
        }
        return promiseCallback.resolve(undefined);
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ removeAllCookies(callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        this.idx = Object.create(null);
        return promiseCallback.resolve(undefined);
    }
    /**
     * @internal No doc because this is an overload that supports the implementation
     */ getAllCookies(callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cookies = [];
        const idx = this.idx;
        const domains = Object.keys(idx);
        domains.forEach((domain)=>{
            const domainEntry = idx[domain] ?? {};
            const paths = Object.keys(domainEntry);
            paths.forEach((path)=>{
                const pathEntry = domainEntry[path] ?? {};
                const keys = Object.keys(pathEntry);
                keys.forEach((key)=>{
                    const keyEntry = pathEntry[key];
                    if (keyEntry != null) {
                        cookies.push(keyEntry);
                    }
                });
            });
        });
        // Sort by creationIndex so deserializing retains the creation order.
        // When implementing your own store, this SHOULD retain the order too
        cookies.sort((a, b)=>{
            return (a.creationIndex || 0) - (b.creationIndex || 0);
        });
        return promiseCallback.resolve(cookies);
    }
}
exports.MemoryCookieStore = MemoryCookieStore;
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/validators.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* ************************************************************************************
Extracted from check-types.js
https://gitlab.com/philbooth/check-types.js

MIT License

Copyright (c) 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019 Phil Booth

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

************************************************************************************ */ Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ParameterError = void 0;
exports.isNonEmptyString = isNonEmptyString;
exports.isDate = isDate;
exports.isEmptyString = isEmptyString;
exports.isString = isString;
exports.isObject = isObject;
exports.isInteger = isInteger;
exports.validate = validate;
const utils_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/utils.js [app-ssr] (ecmascript)");
/* Validation functions copied from check-types package - https://www.npmjs.com/package/check-types */ /** Determines whether the argument is a non-empty string. */ function isNonEmptyString(data) {
    return isString(data) && data !== '';
}
/** Determines whether the argument is a *valid* Date. */ function isDate(data) {
    return data instanceof Date && isInteger(data.getTime());
}
/** Determines whether the argument is the empty string. */ function isEmptyString(data) {
    return data === '' || data instanceof String && data.toString() === '';
}
/** Determines whether the argument is a string. */ function isString(data) {
    return typeof data === 'string' || data instanceof String;
}
/** Determines whether the string representation of the argument is "[object Object]". */ function isObject(data) {
    return (0, utils_1.objectToString)(data) === '[object Object]';
}
/** Determines whether the argument is an integer. */ function isInteger(data) {
    return typeof data === 'number' && data % 1 === 0;
}
/* -- End validation functions -- */ /**
 * When the first argument is false, an error is created with the given message. If a callback is
 * provided, the error is passed to the callback, otherwise the error is thrown.
 */ function validate(bool, cbOrMessage, message) {
    if (bool) return; // Validation passes
    const cb = typeof cbOrMessage === 'function' ? cbOrMessage : undefined;
    let options = typeof cbOrMessage === 'function' ? message : cbOrMessage;
    // The default message prior to v5 was '[object Object]' due to a bug, and the message is kept
    // for backwards compatibility.
    if (!isObject(options)) options = '[object Object]';
    const err = new ParameterError((0, utils_1.safeToString)(options));
    if (cb) cb(err);
    else throw err;
}
/**
 * Represents a validation error.
 * @public
 */ class ParameterError extends Error {
}
exports.ParameterError = ParameterError;
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/version.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.version = void 0;
/**
 * The version of `tough-cookie`
 * @public
 */ exports.version = '5.1.2';
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IP_V6_REGEX_OBJECT = exports.PrefixSecurityEnum = void 0;
/**
 * Cookie prefixes are a way to indicate that a given cookie was set with a set of attributes simply by inspecting the
 * first few characters of the cookie's name. These are defined in {@link https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-13#section-4.1.3 | RFC6265bis - Section 4.1.3}.
 *
 * The following values can be used to configure how a {@link CookieJar} enforces attribute restrictions for Cookie prefixes:
 *
 * - `silent` - Enable cookie prefix checking but silently ignores the cookie if conditions are not met. This is the default configuration for a {@link CookieJar}.
 *
 * - `strict` - Enables cookie prefix checking and will raise an error if conditions are not met.
 *
 * - `unsafe-disabled` - Disables cookie prefix checking.
 * @public
 */ exports.PrefixSecurityEnum = {
    SILENT: 'silent',
    STRICT: 'strict',
    DISABLED: 'unsafe-disabled'
};
Object.freeze(exports.PrefixSecurityEnum);
const IP_V6_REGEX = `
\\[?(?:
(?:[a-fA-F\\d]{1,4}:){7}(?:[a-fA-F\\d]{1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|:[a-fA-F\\d]{1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,2}|:)|
(?:[a-fA-F\\d]{1,4}:){4}(?:(?::[a-fA-F\\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,3}|:)|
(?:[a-fA-F\\d]{1,4}:){3}(?:(?::[a-fA-F\\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,4}|:)|
(?:[a-fA-F\\d]{1,4}:){2}(?:(?::[a-fA-F\\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,5}|:)|
(?:[a-fA-F\\d]{1,4}:){1}(?:(?::[a-fA-F\\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,6}|:)|
(?::(?:(?::[a-fA-F\\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,7}|:))
)(?:%[0-9a-zA-Z]{1,})?\\]?
`.replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim();
exports.IP_V6_REGEX_OBJECT = new RegExp(`^${IP_V6_REGEX}$`);
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/canonicalDomain.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.canonicalDomain = canonicalDomain;
const constants_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/constants.js [app-ssr] (ecmascript)");
/**
 * Normalizes a domain to lowercase and punycode-encoded.
 * Runtime-agnostic equivalent to node's `domainToASCII`.
 * @see https://nodejs.org/docs/latest-v22.x/api/url.html#urldomaintoasciidomain
 */ function domainToASCII(domain) {
    return new URL(`http://${domain}`).hostname;
}
/**
 * Transforms a domain name into a canonical domain name. The canonical domain name is a domain name
 * that has been trimmed, lowercased, stripped of leading dot, and optionally punycode-encoded
 * ({@link https://www.rfc-editor.org/rfc/rfc6265.html#section-5.1.2 | Section 5.1.2 of RFC 6265}). For
 * the most part, this function is idempotent (calling the function with the output from a previous call
 * returns the same output).
 *
 * @remarks
 * A canonicalized host name is the string generated by the following
 * algorithm:
 *
 * 1.  Convert the host name to a sequence of individual domain name
 *     labels.
 *
 * 2.  Convert each label that is not a Non-Reserved LDH (NR-LDH) label,
 *     to an A-label (see Section 2.3.2.1 of [RFC5890] for the former
 *     and latter), or to a "punycode label" (a label resulting from the
 *     "ToASCII" conversion in Section 4 of [RFC3490]), as appropriate
 *     (see Section 6.3 of this specification).
 *
 * 3.  Concatenate the resulting labels, separated by a %x2E (".")
 *     character.
 *
 * @example
 * ```
 * canonicalDomain('.EXAMPLE.com') === 'example.com'
 * ```
 *
 * @param domainName - the domain name to generate the canonical domain from
 * @public
 */ function canonicalDomain(domainName) {
    if (domainName == null) {
        return undefined;
    }
    let str = domainName.trim().replace(/^\./, ''); // S4.1.2.3 & S5.2.3: ignore leading .
    if (constants_1.IP_V6_REGEX_OBJECT.test(str)) {
        if (!str.startsWith('[')) {
            str = '[' + str;
        }
        if (!str.endsWith(']')) {
            str = str + ']';
        }
        return domainToASCII(str).slice(1, -1); // remove [ and ]
    }
    // convert to IDN if any non-ASCII characters
    // eslint-disable-next-line no-control-regex
    if (/[^\u0001-\u007f]/.test(str)) {
        return domainToASCII(str);
    }
    // ASCII-only domain - not canonicalized with new URL() because it may be a malformed URL
    return str.toLowerCase();
}
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/formatDate.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatDate = formatDate;
/**
 * Format a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date | Date} into
 * the {@link https://www.rfc-editor.org/rfc/rfc2616#section-3.3.1 | preferred Internet standard format}
 * defined in {@link https://www.rfc-editor.org/rfc/rfc822#section-5 | RFC822} and
 * updated in {@link https://www.rfc-editor.org/rfc/rfc1123#page-55 | RFC1123}.
 *
 * @example
 * ```
 * formatDate(new Date(0)) === 'Thu, 01 Jan 1970 00:00:00 GMT`
 * ```
 *
 * @param date - the date value to format
 * @public
 */ function formatDate(date) {
    return date.toUTCString();
}
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/parseDate.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// date-time parsing constants (RFC6265 S5.1.1)
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseDate = parseDate;
// eslint-disable-next-line no-control-regex
const DATE_DELIM = /[\x09\x20-\x2F\x3B-\x40\x5B-\x60\x7B-\x7E]/;
const MONTH_TO_NUM = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11
};
/*
 * Parses a Natural number (i.e., non-negative integer) with either the
 *    <min>*<max>DIGIT ( non-digit *OCTET )
 * or
 *    <min>*<max>DIGIT
 * grammar (RFC6265 S5.1.1).
 *
 * The "trailingOK" boolean controls if the grammar accepts a
 * "( non-digit *OCTET )" trailer.
 */ function parseDigits(token, minDigits, maxDigits, trailingOK) {
    let count = 0;
    while(count < token.length){
        const c = token.charCodeAt(count);
        // "non-digit = %x00-2F / %x3A-FF"
        if (c <= 0x2f || c >= 0x3a) {
            break;
        }
        count++;
    }
    // constrain to a minimum and maximum number of digits.
    if (count < minDigits || count > maxDigits) {
        return;
    }
    if (!trailingOK && count != token.length) {
        return;
    }
    return parseInt(token.slice(0, count), 10);
}
function parseTime(token) {
    const parts = token.split(':');
    const result = [
        0,
        0,
        0
    ];
    /* RF6256 S5.1.1:
     *      time            = hms-time ( non-digit *OCTET )
     *      hms-time        = time-field ":" time-field ":" time-field
     *      time-field      = 1*2DIGIT
     */ if (parts.length !== 3) {
        return;
    }
    for(let i = 0; i < 3; i++){
        // "time-field" must be strictly "1*2DIGIT", HOWEVER, "hms-time" can be
        // followed by "( non-digit *OCTET )" therefore the last time-field can
        // have a trailer
        const trailingOK = i == 2;
        const numPart = parts[i];
        if (numPart === undefined) {
            return;
        }
        const num = parseDigits(numPart, 1, 2, trailingOK);
        if (num === undefined) {
            return;
        }
        result[i] = num;
    }
    return result;
}
function parseMonth(token) {
    token = String(token).slice(0, 3).toLowerCase();
    switch(token){
        case 'jan':
            return MONTH_TO_NUM.jan;
        case 'feb':
            return MONTH_TO_NUM.feb;
        case 'mar':
            return MONTH_TO_NUM.mar;
        case 'apr':
            return MONTH_TO_NUM.apr;
        case 'may':
            return MONTH_TO_NUM.may;
        case 'jun':
            return MONTH_TO_NUM.jun;
        case 'jul':
            return MONTH_TO_NUM.jul;
        case 'aug':
            return MONTH_TO_NUM.aug;
        case 'sep':
            return MONTH_TO_NUM.sep;
        case 'oct':
            return MONTH_TO_NUM.oct;
        case 'nov':
            return MONTH_TO_NUM.nov;
        case 'dec':
            return MONTH_TO_NUM.dec;
        default:
            return;
    }
}
/**
 * Parse a cookie date string into a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date | Date}. Parses according to
 * {@link https://www.rfc-editor.org/rfc/rfc6265.html#section-5.1.1 | RFC6265 - Section 5.1.1}, not
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse | Date.parse()}.
 *
 * @remarks
 *
 * ### RFC6265 - 5.1.1. Dates
 *
 * The user agent MUST use an algorithm equivalent to the following
 * algorithm to parse a cookie-date.  Note that the various boolean
 * flags defined as a part of the algorithm (i.e., found-time, found-
 * day-of-month, found-month, found-year) are initially "not set".
 *
 * 1.  Using the grammar below, divide the cookie-date into date-tokens.
 *
 * ```
 *     cookie-date     = *delimiter date-token-list *delimiter
 *     date-token-list = date-token *( 1*delimiter date-token )
 *     date-token      = 1*non-delimiter
 *
 *     delimiter       = %x09 / %x20-2F / %x3B-40 / %x5B-60 / %x7B-7E
 *     non-delimiter   = %x00-08 / %x0A-1F / DIGIT / ":" / ALPHA / %x7F-FF
 *     non-digit       = %x00-2F / %x3A-FF
 *
 *     day-of-month    = 1*2DIGIT ( non-digit *OCTET )
 *     month           = ( "jan" / "feb" / "mar" / "apr" /
 *                        "may" / "jun" / "jul" / "aug" /
 *                        "sep" / "oct" / "nov" / "dec" ) *OCTET
 *     year            = 2*4DIGIT ( non-digit *OCTET )
 *     time            = hms-time ( non-digit *OCTET )
 *     hms-time        = time-field ":" time-field ":" time-field
 *     time-field      = 1*2DIGIT
 * ```
 *
 * 2. Process each date-token sequentially in the order the date-tokens
 *     appear in the cookie-date:
 *
 *     1. If the found-time flag is not set and the token matches the
 *         time production, set the found-time flag and set the hour-
 *         value, minute-value, and second-value to the numbers denoted
 *         by the digits in the date-token, respectively.  Skip the
 *         remaining sub-steps and continue to the next date-token.
 *
 *     2. If the found-day-of-month flag is not set and the date-token
 *         matches the day-of-month production, set the found-day-of-
 *         month flag and set the day-of-month-value to the number
 *         denoted by the date-token.  Skip the remaining sub-steps and
 *         continue to the next date-token.
 *
 *     3. If the found-month flag is not set and the date-token matches
 *         the month production, set the found-month flag and set the
 *         month-value to the month denoted by the date-token.  Skip the
 *         remaining sub-steps and continue to the next date-token.
 *
 *     4. If the found-year flag is not set and the date-token matches
 *         the year production, set the found-year flag and set the
 *         year-value to the number denoted by the date-token.  Skip the
 *         remaining sub-steps and continue to the next date-token.
 *
 *  3. If the year-value is greater than or equal to 70 and less than or
 *      equal to 99, increment the year-value by 1900.
 *
 *  4. If the year-value is greater than or equal to 0 and less than or
 *      equal to 69, increment the year-value by 2000.
 *
 *      1. NOTE: Some existing user agents interpret two-digit years differently.
 *
 *  5. Abort these steps and fail to parse the cookie-date if:
 *
 *      - at least one of the found-day-of-month, found-month, found-
 *          year, or found-time flags is not set,
 *
 *      - the day-of-month-value is less than 1 or greater than 31,
 *
 *      - the year-value is less than 1601,
 *
 *      - the hour-value is greater than 23,
 *
 *      - the minute-value is greater than 59, or
 *
 *      - the second-value is greater than 59.
 *
 *      (Note that leap seconds cannot be represented in this syntax.)
 *
 *  6. Let the parsed-cookie-date be the date whose day-of-month, month,
 *      year, hour, minute, and second (in UTC) are the day-of-month-
 *      value, the month-value, the year-value, the hour-value, the
 *      minute-value, and the second-value, respectively.  If no such
 *      date exists, abort these steps and fail to parse the cookie-date.
 *
 *  7. Return the parsed-cookie-date as the result of this algorithm.
 *
 * @example
 * ```
 * parseDate('Wed, 09 Jun 2021 10:18:14 GMT')
 * ```
 *
 * @param cookieDate - the cookie date string
 * @public
 */ function parseDate(cookieDate) {
    if (!cookieDate) {
        return;
    }
    /* RFC6265 S5.1.1:
     * 2. Process each date-token sequentially in the order the date-tokens
     * appear in the cookie-date
     */ const tokens = cookieDate.split(DATE_DELIM);
    let hour;
    let minute;
    let second;
    let dayOfMonth;
    let month;
    let year;
    for(let i = 0; i < tokens.length; i++){
        const token = (tokens[i] ?? '').trim();
        if (!token.length) {
            continue;
        }
        /* 2.1. If the found-time flag is not set and the token matches the time
         * production, set the found-time flag and set the hour- value,
         * minute-value, and second-value to the numbers denoted by the digits in
         * the date-token, respectively.  Skip the remaining sub-steps and continue
         * to the next date-token.
         */ if (second === undefined) {
            const result = parseTime(token);
            if (result) {
                hour = result[0];
                minute = result[1];
                second = result[2];
                continue;
            }
        }
        /* 2.2. If the found-day-of-month flag is not set and the date-token matches
         * the day-of-month production, set the found-day-of- month flag and set
         * the day-of-month-value to the number denoted by the date-token.  Skip
         * the remaining sub-steps and continue to the next date-token.
         */ if (dayOfMonth === undefined) {
            // "day-of-month = 1*2DIGIT ( non-digit *OCTET )"
            const result = parseDigits(token, 1, 2, true);
            if (result !== undefined) {
                dayOfMonth = result;
                continue;
            }
        }
        /* 2.3. If the found-month flag is not set and the date-token matches the
         * month production, set the found-month flag and set the month-value to
         * the month denoted by the date-token.  Skip the remaining sub-steps and
         * continue to the next date-token.
         */ if (month === undefined) {
            const result = parseMonth(token);
            if (result !== undefined) {
                month = result;
                continue;
            }
        }
        /* 2.4. If the found-year flag is not set and the date-token matches the
         * year production, set the found-year flag and set the year-value to the
         * number denoted by the date-token.  Skip the remaining sub-steps and
         * continue to the next date-token.
         */ if (year === undefined) {
            // "year = 2*4DIGIT ( non-digit *OCTET )"
            const result = parseDigits(token, 2, 4, true);
            if (result !== undefined) {
                year = result;
                /* From S5.1.1:
                 * 3.  If the year-value is greater than or equal to 70 and less
                 * than or equal to 99, increment the year-value by 1900.
                 * 4.  If the year-value is greater than or equal to 0 and less
                 * than or equal to 69, increment the year-value by 2000.
                 */ if (year >= 70 && year <= 99) {
                    year += 1900;
                } else if (year >= 0 && year <= 69) {
                    year += 2000;
                }
            }
        }
    }
    /* RFC 6265 S5.1.1
     * "5. Abort these steps and fail to parse the cookie-date if:
     *     *  at least one of the found-day-of-month, found-month, found-
     *        year, or found-time flags is not set,
     *     *  the day-of-month-value is less than 1 or greater than 31,
     *     *  the year-value is less than 1601,
     *     *  the hour-value is greater than 23,
     *     *  the minute-value is greater than 59, or
     *     *  the second-value is greater than 59.
     *     (Note that leap seconds cannot be represented in this syntax.)"
     *
     * So, in order as above:
     */ if (dayOfMonth === undefined || month === undefined || year === undefined || hour === undefined || minute === undefined || second === undefined || dayOfMonth < 1 || dayOfMonth > 31 || year < 1601 || hour > 23 || minute > 59 || second > 59) {
        return;
    }
    return new Date(Date.UTC(year, month, dayOfMonth, hour, minute, second));
}
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookie.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
exports.Cookie = void 0;
/*!
 * Copyright (c) 2015-2020, Salesforce.com, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Salesforce.com nor the names of its contributors may
 * be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */ const getPublicSuffix_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/getPublicSuffix.js [app-ssr] (ecmascript)");
const validators = __importStar(__turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/validators.js [app-ssr] (ecmascript)"));
const utils_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/utils.js [app-ssr] (ecmascript)");
const formatDate_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/formatDate.js [app-ssr] (ecmascript)");
const parseDate_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/parseDate.js [app-ssr] (ecmascript)");
const canonicalDomain_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/canonicalDomain.js [app-ssr] (ecmascript)");
// From RFC6265 S4.1.1
// note that it excludes \x3B ";"
const COOKIE_OCTETS = /^[\x21\x23-\x2B\x2D-\x3A\x3C-\x5B\x5D-\x7E]+$/;
// RFC6265 S4.1.1 defines path value as 'any CHAR except CTLs or ";"'
// Note ';' is \x3B
const PATH_VALUE = /[\x20-\x3A\x3C-\x7E]+/;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\x00-\x1F]/;
// From Chromium // '\r', '\n' and '\0' should be treated as a terminator in
// the "relaxed" mode, see:
// https://github.com/ChromiumWebApps/chromium/blob/b3d3b4da8bb94c1b2e061600df106d590fda3620/net/cookies/parsed_cookie.cc#L60
const TERMINATORS = [
    '\n',
    '\r',
    '\0'
];
function trimTerminator(str) {
    if (validators.isEmptyString(str)) return str;
    for(let t = 0; t < TERMINATORS.length; t++){
        const terminator = TERMINATORS[t];
        const terminatorIdx = terminator ? str.indexOf(terminator) : -1;
        if (terminatorIdx !== -1) {
            str = str.slice(0, terminatorIdx);
        }
    }
    return str;
}
function parseCookiePair(cookiePair, looseMode) {
    cookiePair = trimTerminator(cookiePair);
    let firstEq = cookiePair.indexOf('=');
    if (looseMode) {
        if (firstEq === 0) {
            // '=' is immediately at start
            cookiePair = cookiePair.substring(1);
            firstEq = cookiePair.indexOf('='); // might still need to split on '='
        }
    } else {
        // non-loose mode
        if (firstEq <= 0) {
            // no '=' or is at start
            return undefined; // needs to have non-empty "cookie-name"
        }
    }
    let cookieName, cookieValue;
    if (firstEq <= 0) {
        cookieName = '';
        cookieValue = cookiePair.trim();
    } else {
        cookieName = cookiePair.slice(0, firstEq).trim();
        cookieValue = cookiePair.slice(firstEq + 1).trim();
    }
    if (CONTROL_CHARS.test(cookieName) || CONTROL_CHARS.test(cookieValue)) {
        return undefined;
    }
    const c = new Cookie();
    c.key = cookieName;
    c.value = cookieValue;
    return c;
}
function parse(str, options) {
    if (validators.isEmptyString(str) || !validators.isString(str)) {
        return undefined;
    }
    str = str.trim();
    // We use a regex to parse the "name-value-pair" part of S5.2
    const firstSemi = str.indexOf(';'); // S5.2 step 1
    const cookiePair = firstSemi === -1 ? str : str.slice(0, firstSemi);
    const c = parseCookiePair(cookiePair, options?.loose ?? false);
    if (!c) {
        return undefined;
    }
    if (firstSemi === -1) {
        return c;
    }
    // S5.2.3 "unparsed-attributes consist of the remainder of the set-cookie-string
    // (including the %x3B (";") in question)." plus later on in the same section
    // "discard the first ";" and trim".
    const unparsed = str.slice(firstSemi + 1).trim();
    // "If the unparsed-attributes string is empty, skip the rest of these
    // steps."
    if (unparsed.length === 0) {
        return c;
    }
    /*
     * S5.2 says that when looping over the items "[p]rocess the attribute-name
     * and attribute-value according to the requirements in the following
     * subsections" for every item.  Plus, for many of the individual attributes
     * in S5.3 it says to use the "attribute-value of the last attribute in the
     * cookie-attribute-list".  Therefore, in this implementation, we overwrite
     * the previous value.
     */ const cookie_avs = unparsed.split(';');
    while(cookie_avs.length){
        const av = (cookie_avs.shift() ?? '').trim();
        if (av.length === 0) {
            continue;
        }
        const av_sep = av.indexOf('=');
        let av_key, av_value;
        if (av_sep === -1) {
            av_key = av;
            av_value = null;
        } else {
            av_key = av.slice(0, av_sep);
            av_value = av.slice(av_sep + 1);
        }
        av_key = av_key.trim().toLowerCase();
        if (av_value) {
            av_value = av_value.trim();
        }
        switch(av_key){
            case 'expires':
                if (av_value) {
                    const exp = (0, parseDate_1.parseDate)(av_value);
                    // "If the attribute-value failed to parse as a cookie date, ignore the
                    // cookie-av."
                    if (exp) {
                        // over and underflow not realistically a concern: V8's getTime() seems to
                        // store something larger than a 32-bit time_t (even with 32-bit node)
                        c.expires = exp;
                    }
                }
                break;
            case 'max-age':
                if (av_value) {
                    // "If the first character of the attribute-value is not a DIGIT or a "-"
                    // character ...[or]... If the remainder of attribute-value contains a
                    // non-DIGIT character, ignore the cookie-av."
                    if (/^-?[0-9]+$/.test(av_value)) {
                        const delta = parseInt(av_value, 10);
                        // "If delta-seconds is less than or equal to zero (0), let expiry-time
                        // be the earliest representable date and time."
                        c.setMaxAge(delta);
                    }
                }
                break;
            case 'domain':
                // "If the attribute-value is empty, the behavior is undefined.  However,
                // the user agent SHOULD ignore the cookie-av entirely."
                if (av_value) {
                    // S5.2.3 "Let cookie-domain be the attribute-value without the leading %x2E
                    // (".") character."
                    const domain = av_value.trim().replace(/^\./, '');
                    if (domain) {
                        // "Convert the cookie-domain to lower case."
                        c.domain = domain.toLowerCase();
                    }
                }
                break;
            case 'path':
                /*
                 * "If the attribute-value is empty or if the first character of the
                 * attribute-value is not %x2F ("/"):
                 *   Let cookie-path be the default-path.
                 * Otherwise:
                 *   Let cookie-path be the attribute-value."
                 *
                 * We'll represent the default-path as null since it depends on the
                 * context of the parsing.
                 */ c.path = av_value && av_value[0] === '/' ? av_value : null;
                break;
            case 'secure':
                /*
                 * "If the attribute-name case-insensitively matches the string "Secure",
                 * the user agent MUST append an attribute to the cookie-attribute-list
                 * with an attribute-name of Secure and an empty attribute-value."
                 */ c.secure = true;
                break;
            case 'httponly':
                c.httpOnly = true;
                break;
            case 'samesite':
                switch(av_value ? av_value.toLowerCase() : ''){
                    case 'strict':
                        c.sameSite = 'strict';
                        break;
                    case 'lax':
                        c.sameSite = 'lax';
                        break;
                    case 'none':
                        c.sameSite = 'none';
                        break;
                    default:
                        c.sameSite = undefined;
                        break;
                }
                break;
            default:
                c.extensions = c.extensions || [];
                c.extensions.push(av);
                break;
        }
    }
    return c;
}
function fromJSON(str) {
    if (!str || validators.isEmptyString(str)) {
        return undefined;
    }
    let obj;
    if (typeof str === 'string') {
        try {
            obj = JSON.parse(str);
        } catch  {
            return undefined;
        }
    } else {
        // assume it's an Object
        obj = str;
    }
    const c = new Cookie();
    Cookie.serializableProperties.forEach((prop)=>{
        if (obj && typeof obj === 'object' && (0, utils_1.inOperator)(prop, obj)) {
            const val = obj[prop];
            if (val === undefined) {
                return;
            }
            if ((0, utils_1.inOperator)(prop, cookieDefaults) && val === cookieDefaults[prop]) {
                return;
            }
            switch(prop){
                case 'key':
                case 'value':
                case 'sameSite':
                    if (typeof val === 'string') {
                        c[prop] = val;
                    }
                    break;
                case 'expires':
                case 'creation':
                case 'lastAccessed':
                    if (typeof val === 'number' || typeof val === 'string' || val instanceof Date) {
                        c[prop] = obj[prop] == 'Infinity' ? 'Infinity' : new Date(val);
                    } else if (val === null) {
                        c[prop] = null;
                    }
                    break;
                case 'maxAge':
                    if (typeof val === 'number' || val === 'Infinity' || val === '-Infinity') {
                        c[prop] = val;
                    }
                    break;
                case 'domain':
                case 'path':
                    if (typeof val === 'string' || val === null) {
                        c[prop] = val;
                    }
                    break;
                case 'secure':
                case 'httpOnly':
                    if (typeof val === 'boolean') {
                        c[prop] = val;
                    }
                    break;
                case 'extensions':
                    if (Array.isArray(val) && val.every((item)=>typeof item === 'string')) {
                        c[prop] = val;
                    }
                    break;
                case 'hostOnly':
                case 'pathIsDefault':
                    if (typeof val === 'boolean' || val === null) {
                        c[prop] = val;
                    }
                    break;
            }
        }
    });
    return c;
}
const cookieDefaults = {
    // the order in which the RFC has them:
    key: '',
    value: '',
    expires: 'Infinity',
    maxAge: null,
    domain: null,
    path: null,
    secure: false,
    httpOnly: false,
    extensions: null,
    // set by the CookieJar:
    hostOnly: null,
    pathIsDefault: null,
    creation: null,
    lastAccessed: null,
    sameSite: undefined
};
/**
 * An HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to a user's web browser.
 * It is defined in {@link https://www.rfc-editor.org/rfc/rfc6265.html | RFC6265}.
 * @public
 */ class Cookie {
    /**
     * Create a new Cookie instance.
     * @public
     * @param options - The attributes to set on the cookie
     */ constructor(options = {}){
        this.key = options.key ?? cookieDefaults.key;
        this.value = options.value ?? cookieDefaults.value;
        this.expires = options.expires ?? cookieDefaults.expires;
        this.maxAge = options.maxAge ?? cookieDefaults.maxAge;
        this.domain = options.domain ?? cookieDefaults.domain;
        this.path = options.path ?? cookieDefaults.path;
        this.secure = options.secure ?? cookieDefaults.secure;
        this.httpOnly = options.httpOnly ?? cookieDefaults.httpOnly;
        this.extensions = options.extensions ?? cookieDefaults.extensions;
        this.creation = options.creation ?? cookieDefaults.creation;
        this.hostOnly = options.hostOnly ?? cookieDefaults.hostOnly;
        this.pathIsDefault = options.pathIsDefault ?? cookieDefaults.pathIsDefault;
        this.lastAccessed = options.lastAccessed ?? cookieDefaults.lastAccessed;
        this.sameSite = options.sameSite ?? cookieDefaults.sameSite;
        this.creation = options.creation ?? new Date();
        // used to break creation ties in cookieCompare():
        Object.defineProperty(this, 'creationIndex', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: ++Cookie.cookiesCreated
        });
        // Duplicate operation, but it makes TypeScript happy...
        this.creationIndex = Cookie.cookiesCreated;
    }
    [Symbol.for('nodejs.util.inspect.custom')]() {
        const now = Date.now();
        const hostOnly = this.hostOnly != null ? this.hostOnly.toString() : '?';
        const createAge = this.creation && this.creation !== 'Infinity' ? `${String(now - this.creation.getTime())}ms` : '?';
        const accessAge = this.lastAccessed && this.lastAccessed !== 'Infinity' ? `${String(now - this.lastAccessed.getTime())}ms` : '?';
        return `Cookie="${this.toString()}; hostOnly=${hostOnly}; aAge=${accessAge}; cAge=${createAge}"`;
    }
    /**
     * For convenience in using `JSON.stringify(cookie)`. Returns a plain-old Object that can be JSON-serialized.
     *
     * @remarks
     * - Any `Date` properties (such as {@link Cookie.expires}, {@link Cookie.creation}, and {@link Cookie.lastAccessed}) are exported in ISO format (`Date.toISOString()`).
     *
     *  - Custom Cookie properties are discarded. In tough-cookie 1.x, since there was no {@link Cookie.toJSON} method explicitly defined, all enumerable properties were captured.
     *      If you want a property to be serialized, add the property name to {@link Cookie.serializableProperties}.
     */ toJSON() {
        const obj = {};
        for (const prop of Cookie.serializableProperties){
            const val = this[prop];
            if (val === cookieDefaults[prop]) {
                continue; // leave as prototype default
            }
            switch(prop){
                case 'key':
                case 'value':
                case 'sameSite':
                    if (typeof val === 'string') {
                        obj[prop] = val;
                    }
                    break;
                case 'expires':
                case 'creation':
                case 'lastAccessed':
                    if (typeof val === 'number' || typeof val === 'string' || val instanceof Date) {
                        obj[prop] = val == 'Infinity' ? 'Infinity' : new Date(val).toISOString();
                    } else if (val === null) {
                        obj[prop] = null;
                    }
                    break;
                case 'maxAge':
                    if (typeof val === 'number' || val === 'Infinity' || val === '-Infinity') {
                        obj[prop] = val;
                    }
                    break;
                case 'domain':
                case 'path':
                    if (typeof val === 'string' || val === null) {
                        obj[prop] = val;
                    }
                    break;
                case 'secure':
                case 'httpOnly':
                    if (typeof val === 'boolean') {
                        obj[prop] = val;
                    }
                    break;
                case 'extensions':
                    if (Array.isArray(val)) {
                        obj[prop] = val;
                    }
                    break;
                case 'hostOnly':
                case 'pathIsDefault':
                    if (typeof val === 'boolean' || val === null) {
                        obj[prop] = val;
                    }
                    break;
            }
        }
        return obj;
    }
    /**
     * Does a deep clone of this cookie, implemented exactly as `Cookie.fromJSON(cookie.toJSON())`.
     * @public
     */ clone() {
        return fromJSON(this.toJSON());
    }
    /**
     * Validates cookie attributes for semantic correctness. Useful for "lint" checking any `Set-Cookie` headers you generate.
     * For now, it returns a boolean, but eventually could return a reason string.
     *
     * @remarks
     * Works for a few things, but is by no means comprehensive.
     *
     * @beta
     */ validate() {
        if (!this.value || !COOKIE_OCTETS.test(this.value)) {
            return false;
        }
        if (this.expires != 'Infinity' && !(this.expires instanceof Date) && !(0, parseDate_1.parseDate)(this.expires)) {
            return false;
        }
        if (this.maxAge != null && this.maxAge !== 'Infinity' && (this.maxAge === '-Infinity' || this.maxAge <= 0)) {
            return false; // "Max-Age=" non-zero-digit *DIGIT
        }
        if (this.path != null && !PATH_VALUE.test(this.path)) {
            return false;
        }
        const cdomain = this.cdomain();
        if (cdomain) {
            if (cdomain.match(/\.$/)) {
                return false; // S4.1.2.3 suggests that this is bad. domainMatch() tests confirm this
            }
            const suffix = (0, getPublicSuffix_1.getPublicSuffix)(cdomain);
            if (suffix == null) {
                // it's a public suffix
                return false;
            }
        }
        return true;
    }
    /**
     * Sets the 'Expires' attribute on a cookie.
     *
     * @remarks
     * When given a `string` value it will be parsed with {@link parseDate}. If the value can't be parsed as a cookie date
     * then the 'Expires' attribute will be set to `"Infinity"`.
     *
     * @param exp - the new value for the 'Expires' attribute of the cookie.
     */ setExpires(exp) {
        if (exp instanceof Date) {
            this.expires = exp;
        } else {
            this.expires = (0, parseDate_1.parseDate)(exp) || 'Infinity';
        }
    }
    /**
     * Sets the 'Max-Age' attribute (in seconds) on a cookie.
     *
     * @remarks
     * Coerces `-Infinity` to `"-Infinity"` and `Infinity` to `"Infinity"` so it can be serialized to JSON.
     *
     * @param age - the new value for the 'Max-Age' attribute (in seconds).
     */ setMaxAge(age) {
        if (age === Infinity) {
            this.maxAge = 'Infinity';
        } else if (age === -Infinity) {
            this.maxAge = '-Infinity';
        } else {
            this.maxAge = age;
        }
    }
    /**
     * Encodes to a `Cookie` header value (specifically, the {@link Cookie.key} and {@link Cookie.value} properties joined with "=").
     * @public
     */ cookieString() {
        const val = this.value || '';
        if (this.key) {
            return `${this.key}=${val}`;
        }
        return val;
    }
    /**
     * Encodes to a `Set-Cookie header` value.
     * @public
     */ toString() {
        let str = this.cookieString();
        if (this.expires != 'Infinity') {
            if (this.expires instanceof Date) {
                str += `; Expires=${(0, formatDate_1.formatDate)(this.expires)}`;
            }
        }
        if (this.maxAge != null && this.maxAge != Infinity) {
            str += `; Max-Age=${String(this.maxAge)}`;
        }
        if (this.domain && !this.hostOnly) {
            str += `; Domain=${this.domain}`;
        }
        if (this.path) {
            str += `; Path=${this.path}`;
        }
        if (this.secure) {
            str += '; Secure';
        }
        if (this.httpOnly) {
            str += '; HttpOnly';
        }
        if (this.sameSite && this.sameSite !== 'none') {
            if (this.sameSite.toLowerCase() === Cookie.sameSiteCanonical.lax.toLowerCase()) {
                str += `; SameSite=${Cookie.sameSiteCanonical.lax}`;
            } else if (this.sameSite.toLowerCase() === Cookie.sameSiteCanonical.strict.toLowerCase()) {
                str += `; SameSite=${Cookie.sameSiteCanonical.strict}`;
            } else {
                str += `; SameSite=${this.sameSite}`;
            }
        }
        if (this.extensions) {
            this.extensions.forEach((ext)=>{
                str += `; ${ext}`;
            });
        }
        return str;
    }
    /**
     * Computes the TTL relative to now (milliseconds).
     *
     * @remarks
     * - `Infinity` is returned for cookies without an explicit expiry
     *
     * - `0` is returned if the cookie is expired.
     *
     * - Otherwise a time-to-live in milliseconds is returned.
     *
     * @param now - passing an explicit value is mostly used for testing purposes since this defaults to the `Date.now()`
     * @public
     */ TTL(now = Date.now()) {
        // TTL() partially replaces the "expiry-time" parts of S5.3 step 3 (setCookie()
        // elsewhere)
        // S5.3 says to give the "latest representable date" for which we use Infinity
        // For "expired" we use 0
        // -----
        // RFC6265 S4.1.2.2 If a cookie has both the Max-Age and the Expires
        // attribute, the Max-Age attribute has precedence and controls the
        // expiration date of the cookie.
        // (Concurs with S5.3 step 3)
        if (this.maxAge != null && typeof this.maxAge === 'number') {
            return this.maxAge <= 0 ? 0 : this.maxAge * 1000;
        }
        const expires = this.expires;
        if (expires === 'Infinity') {
            return Infinity;
        }
        return (expires?.getTime() ?? now) - (now || Date.now());
    }
    /**
     * Computes the absolute unix-epoch milliseconds that this cookie expires.
     *
     * The "Max-Age" attribute takes precedence over "Expires" (as per the RFC). The {@link Cookie.lastAccessed} attribute
     * (or the `now` parameter if given) is used to offset the {@link Cookie.maxAge} attribute.
     *
     * If Expires ({@link Cookie.expires}) is set, that's returned.
     *
     * @param now - can be used to provide a time offset (instead of {@link Cookie.lastAccessed}) to use when calculating the "Max-Age" value
     */ expiryTime(now) {
        // expiryTime() replaces the "expiry-time" parts of S5.3 step 3 (setCookie() elsewhere)
        if (this.maxAge != null) {
            const relativeTo = now || this.lastAccessed || new Date();
            const maxAge = typeof this.maxAge === 'number' ? this.maxAge : -Infinity;
            const age = maxAge <= 0 ? -Infinity : maxAge * 1000;
            if (relativeTo === 'Infinity') {
                return Infinity;
            }
            return relativeTo.getTime() + age;
        }
        if (this.expires == 'Infinity') {
            return Infinity;
        }
        return this.expires ? this.expires.getTime() : undefined;
    }
    /**
     * Similar to {@link Cookie.expiryTime}, computes the absolute unix-epoch milliseconds that this cookie expires and returns it as a Date.
     *
     * The "Max-Age" attribute takes precedence over "Expires" (as per the RFC). The {@link Cookie.lastAccessed} attribute
     * (or the `now` parameter if given) is used to offset the {@link Cookie.maxAge} attribute.
     *
     * If Expires ({@link Cookie.expires}) is set, that's returned.
     *
     * @param now - can be used to provide a time offset (instead of {@link Cookie.lastAccessed}) to use when calculating the "Max-Age" value
     */ expiryDate(now) {
        const millisec = this.expiryTime(now);
        if (millisec == Infinity) {
            // The 31-bit value of 2147483647000 was chosen to be the MAX_TIME representable
            // in tough-cookie though MDN states that the actual maximum value for a Date is 8.64e15.
            // I'm guessing this is due to the Y2038 problem that would affect systems that store
            // unix time as 32-bit integers.
            // See:
            // - https://github.com/salesforce/tough-cookie/commit/0616f70bf725e00c63d442544ad230c4f8b23357
            // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date
            // - https://en.wikipedia.org/wiki/Year_2038_problem
            return new Date(2147483647000);
        } else if (millisec == -Infinity) {
            return new Date(0);
        } else {
            return millisec == undefined ? undefined : new Date(millisec);
        }
    }
    /**
     * Indicates if the cookie has been persisted to a store or not.
     * @public
     */ isPersistent() {
        // This replaces the "persistent-flag" parts of S5.3 step 3
        return this.maxAge != null || this.expires != 'Infinity';
    }
    /**
     * Calls {@link canonicalDomain} with the {@link Cookie.domain} property.
     * @public
     */ canonicalizedDomain() {
        // Mostly S5.1.2 and S5.2.3:
        return (0, canonicalDomain_1.canonicalDomain)(this.domain);
    }
    /**
     * Alias for {@link Cookie.canonicalizedDomain}
     * @public
     */ cdomain() {
        return (0, canonicalDomain_1.canonicalDomain)(this.domain);
    }
    /**
     * Parses a string into a Cookie object.
     *
     * @remarks
     * Note: when parsing a `Cookie` header it must be split by ';' before each Cookie string can be parsed.
     *
     * @example
     * ```
     * // parse a `Set-Cookie` header
     * const setCookieHeader = 'a=bcd; Expires=Tue, 18 Oct 2011 07:05:03 GMT'
     * const cookie = Cookie.parse(setCookieHeader)
     * cookie.key === 'a'
     * cookie.value === 'bcd'
     * cookie.expires === new Date(Date.parse('Tue, 18 Oct 2011 07:05:03 GMT'))
     * ```
     *
     * @example
     * ```
     * // parse a `Cookie` header
     * const cookieHeader = 'name=value; name2=value2; name3=value3'
     * const cookies = cookieHeader.split(';').map(Cookie.parse)
     * cookies[0].name === 'name'
     * cookies[0].value === 'value'
     * cookies[1].name === 'name2'
     * cookies[1].value === 'value2'
     * cookies[2].name === 'name3'
     * cookies[2].value === 'value3'
     * ```
     *
     * @param str - The `Set-Cookie` header or a Cookie string to parse.
     * @param options - Configures `strict` or `loose` mode for cookie parsing
     */ static parse(str, options) {
        return parse(str, options);
    }
    /**
     * Does the reverse of {@link Cookie.toJSON}.
     *
     * @remarks
     * Any Date properties (such as .expires, .creation, and .lastAccessed) are parsed via Date.parse, not tough-cookie's parseDate, since ISO timestamps are being handled at this layer.
     *
     * @example
     * ```
     * const json = JSON.stringify({
     *   key: 'alpha',
     *   value: 'beta',
     *   domain: 'example.com',
     *   path: '/foo',
     *   expires: '2038-01-19T03:14:07.000Z',
     * })
     * const cookie = Cookie.fromJSON(json)
     * cookie.key === 'alpha'
     * cookie.value === 'beta'
     * cookie.domain === 'example.com'
     * cookie.path === '/foo'
     * cookie.expires === new Date(Date.parse('2038-01-19T03:14:07.000Z'))
     * ```
     *
     * @param str - An unparsed JSON string or a value that has already been parsed as JSON
     */ static fromJSON(str) {
        return fromJSON(str);
    }
}
exports.Cookie = Cookie;
Cookie.cookiesCreated = 0;
/**
 * @internal
 */ Cookie.sameSiteLevel = {
    strict: 3,
    lax: 2,
    none: 1
};
/**
 * @internal
 */ Cookie.sameSiteCanonical = {
    strict: 'Strict',
    lax: 'Lax'
};
/**
 * Cookie properties that will be serialized when using {@link Cookie.fromJSON} and {@link Cookie.toJSON}.
 * @public
 */ Cookie.serializableProperties = [
    'key',
    'value',
    'expires',
    'maxAge',
    'domain',
    'path',
    'secure',
    'httpOnly',
    'extensions',
    'hostOnly',
    'pathIsDefault',
    'creation',
    'lastAccessed',
    'sameSite'
];
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookieCompare.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cookieCompare = cookieCompare;
/**
 * The maximum timestamp a cookie, in milliseconds. The value is (2^31 - 1) seconds since the Unix
 * epoch, corresponding to 2038-01-19.
 */ const MAX_TIME = 2147483647000;
/**
 * A comparison function that can be used with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort | Array.sort()},
 * which orders a list of cookies into the recommended order given in Step 2 of {@link https://www.rfc-editor.org/rfc/rfc6265.html#section-5.4 | RFC6265 - Section 5.4}.
 *
 * The sort algorithm is, in order of precedence:
 *
 * - Longest {@link Cookie.path}
 *
 * - Oldest {@link Cookie.creation} (which has a 1-ms precision, same as Date)
 *
 * - Lowest {@link Cookie.creationIndex} (to get beyond the 1-ms precision)
 *
 * @remarks
 * ### RFC6265 - Section 5.4 - Step 2
 *
 * The user agent SHOULD sort the cookie-list in the following order:
 *
 * - Cookies with longer paths are listed before cookies with shorter paths.
 *
 * - Among cookies that have equal-length path fields, cookies with
 *    earlier creation-times are listed before cookies with later
 *    creation-times.
 *
 * NOTE: Not all user agents sort the cookie-list in this order, but
 * this order reflects common practice when this document was
 * written, and, historically, there have been servers that
 * (erroneously) depended on this order.
 *
 * ### Custom Store Implementors
 *
 * Since the JavaScript Date is limited to a 1-ms precision, cookies within the same millisecond are entirely possible.
 * This is especially true when using the `now` option to `CookieJar.setCookie(...)`. The {@link Cookie.creationIndex}
 * property is a per-process global counter, assigned during construction with `new Cookie()`, which preserves the spirit
 * of the RFC sorting: older cookies go first. This works great for {@link MemoryCookieStore} since `Set-Cookie` headers
 * are parsed in order, but is not so great for distributed systems.
 *
 * Sophisticated Stores may wish to set this to some other
 * logical clock so that if cookies `A` and `B` are created in the same millisecond, but cookie `A` is created before
 * cookie `B`, then `A.creationIndex < B.creationIndex`.
 *
 * @example
 * ```
 * const cookies = [
 *   new Cookie({ key: 'a', value: '' }),
 *   new Cookie({ key: 'b', value: '' }),
 *   new Cookie({ key: 'c', value: '', path: '/path' }),
 *   new Cookie({ key: 'd', value: '', path: '/path' }),
 * ]
 * cookies.sort(cookieCompare)
 * // cookie sort order would be ['c', 'd', 'a', 'b']
 * ```
 *
 * @param a - the first Cookie for comparison
 * @param b - the second Cookie for comparison
 * @public
 */ function cookieCompare(a, b) {
    let cmp;
    // descending for length: b CMP a
    const aPathLen = a.path ? a.path.length : 0;
    const bPathLen = b.path ? b.path.length : 0;
    cmp = bPathLen - aPathLen;
    if (cmp !== 0) {
        return cmp;
    }
    // ascending for time: a CMP b
    const aTime = a.creation && a.creation instanceof Date ? a.creation.getTime() : MAX_TIME;
    const bTime = b.creation && b.creation instanceof Date ? b.creation.getTime() : MAX_TIME;
    cmp = aTime - bTime;
    if (cmp !== 0) {
        return cmp;
    }
    // break ties for the same millisecond (precision of JavaScript's clock)
    cmp = (a.creationIndex || 0) - (b.creationIndex || 0);
    return cmp;
}
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/defaultPath.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultPath = defaultPath;
/**
 * Given a current request/response path, gives the path appropriate for storing
 * in a cookie. This is basically the "directory" of a "file" in the path, but
 * is specified by {@link https://www.rfc-editor.org/rfc/rfc6265.html#section-5.1.4 | RFC6265 - Section 5.1.4}.
 *
 * @remarks
 * ### RFC6265 - Section 5.1.4
 *
 * The user agent MUST use an algorithm equivalent to the following algorithm to compute the default-path of a cookie:
 *
 * 1. Let uri-path be the path portion of the request-uri if such a
 *     portion exists (and empty otherwise).  For example, if the
 *     request-uri contains just a path (and optional query string),
 *     then the uri-path is that path (without the %x3F ("?") character
 *     or query string), and if the request-uri contains a full
 *     absoluteURI, the uri-path is the path component of that URI.
 *
 * 2. If the uri-path is empty or if the first character of the uri-
 *     path is not a %x2F ("/") character, output %x2F ("/") and skip
 *     the remaining steps.
 *
 * 3. If the uri-path contains no more than one %x2F ("/") character,
 *     output %x2F ("/") and skip the remaining step.
 *
 * 4. Output the characters of the uri-path from the first character up
 *     to, but not including, the right-most %x2F ("/").
 *
 * @example
 * ```
 * defaultPath('') === '/'
 * defaultPath('/some-path') === '/'
 * defaultPath('/some-parent-path/some-path') === '/some-parent-path'
 * defaultPath('relative-path') === '/'
 * ```
 *
 * @param path - the path portion of the request-uri (excluding the hostname, query, fragment, and so on)
 * @public
 */ function defaultPath(path) {
    // "2. If the uri-path is empty or if the first character of the uri-path is not
    // a %x2F ("/") character, output %x2F ("/") and skip the remaining steps.
    if (!path || path.slice(0, 1) !== '/') {
        return '/';
    }
    // "3. If the uri-path contains no more than one %x2F ("/") character, output
    // %x2F ("/") and skip the remaining step."
    if (path === '/') {
        return path;
    }
    const rightSlash = path.lastIndexOf('/');
    if (rightSlash === 0) {
        return '/';
    }
    // "4. Output the characters of the uri-path from the first character up to,
    // but not including, the right-most %x2F ("/")."
    return path.slice(0, rightSlash);
}
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/domainMatch.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.domainMatch = domainMatch;
const canonicalDomain_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/canonicalDomain.js [app-ssr] (ecmascript)");
// Dumped from ip-regex@4.0.0, with the following changes:
// * all capturing groups converted to non-capturing -- "(?:)"
// * support for IPv6 Scoped Literal ("%eth1") removed
// * lowercase hexadecimal only
const IP_REGEX_LOWERCASE = /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-f\d]{1,4}:){7}(?:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-f\d]{1,4}|:)|(?:[a-f\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,2}|:)|(?:[a-f\d]{1,4}:){4}(?:(?::[a-f\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,3}|:)|(?:[a-f\d]{1,4}:){3}(?:(?::[a-f\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,4}|:)|(?:[a-f\d]{1,4}:){2}(?:(?::[a-f\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,5}|:)|(?:[a-f\d]{1,4}:){1}(?:(?::[a-f\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,6}|:)|(?::(?:(?::[a-f\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-f\d]{1,4}){1,7}|:)))$)/;
/**
 * Answers "does this real domain match the domain in a cookie?". The `domain` is the "current" domain name and the
 * `cookieDomain` is the "cookie" domain name. Matches according to {@link https://www.rfc-editor.org/rfc/rfc6265.html#section-5.1.3 | RFC6265 - Section 5.1.3},
 * but it helps to think of it as a "suffix match".
 *
 * @remarks
 * ### 5.1.3.  Domain Matching
 *
 * A string domain-matches a given domain string if at least one of the
 * following conditions hold:
 *
 * - The domain string and the string are identical.  (Note that both
 *     the domain string and the string will have been canonicalized to
 *     lower case at this point.)
 *
 * - All of the following conditions hold:
 *
 *     - The domain string is a suffix of the string.
 *
 *     - The last character of the string that is not included in the
 *         domain string is a %x2E (".") character.
 *
 *     - The string is a host name (i.e., not an IP address).
 *
 * @example
 * ```
 * domainMatch('example.com', 'example.com') === true
 * domainMatch('eXaMpLe.cOm', 'ExAmPlE.CoM') === true
 * domainMatch('no.ca', 'yes.ca') === false
 * ```
 *
 * @param domain - The domain string to test
 * @param cookieDomain - The cookie domain string to match against
 * @param canonicalize - The canonicalize parameter toggles whether the domain parameters get normalized with canonicalDomain or not
 * @public
 */ function domainMatch(domain, cookieDomain, canonicalize) {
    if (domain == null || cookieDomain == null) {
        return undefined;
    }
    let _str;
    let _domStr;
    if (canonicalize !== false) {
        _str = (0, canonicalDomain_1.canonicalDomain)(domain);
        _domStr = (0, canonicalDomain_1.canonicalDomain)(cookieDomain);
    } else {
        _str = domain;
        _domStr = cookieDomain;
    }
    if (_str == null || _domStr == null) {
        return undefined;
    }
    /*
     * S5.1.3:
     * "A string domain-matches a given domain string if at least one of the
     * following conditions hold:"
     *
     * " o The domain string and the string are identical. (Note that both the
     * domain string and the string will have been canonicalized to lower case at
     * this point)"
     */ if (_str == _domStr) {
        return true;
    }
    /* " o All of the following [three] conditions hold:" */ /* "* The domain string is a suffix of the string" */ const idx = _str.lastIndexOf(_domStr);
    if (idx <= 0) {
        return false; // it's a non-match (-1) or prefix (0)
    }
    // next, check it's a proper suffix
    // e.g., "a.b.c".indexOf("b.c") === 2
    // 5 === 3+2
    if (_str.length !== _domStr.length + idx) {
        return false; // it's not a suffix
    }
    /* "  * The last character of the string that is not included in the
     * domain string is a %x2E (".") character." */ if (_str.substring(idx - 1, idx) !== '.') {
        return false; // doesn't align on "."
    }
    /* "  * The string is a host name (i.e., not an IP address)." */ return !IP_REGEX_LOWERCASE.test(_str);
}
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookieJar.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
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
exports.CookieJar = void 0;
const getPublicSuffix_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/getPublicSuffix.js [app-ssr] (ecmascript)");
const validators = __importStar(__turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/validators.js [app-ssr] (ecmascript)"));
const validators_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/validators.js [app-ssr] (ecmascript)");
const store_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/store.js [app-ssr] (ecmascript)");
const memstore_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/memstore.js [app-ssr] (ecmascript)");
const pathMatch_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/pathMatch.js [app-ssr] (ecmascript)");
const cookie_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookie.js [app-ssr] (ecmascript)");
const utils_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/utils.js [app-ssr] (ecmascript)");
const canonicalDomain_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/canonicalDomain.js [app-ssr] (ecmascript)");
const constants_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/constants.js [app-ssr] (ecmascript)");
const defaultPath_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/defaultPath.js [app-ssr] (ecmascript)");
const domainMatch_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/domainMatch.js [app-ssr] (ecmascript)");
const cookieCompare_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookieCompare.js [app-ssr] (ecmascript)");
const version_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/version.js [app-ssr] (ecmascript)");
const defaultSetCookieOptions = {
    loose: false,
    sameSiteContext: undefined,
    ignoreError: false,
    http: true
};
const defaultGetCookieOptions = {
    http: true,
    expire: true,
    allPaths: false,
    sameSiteContext: undefined,
    sort: undefined
};
const SAME_SITE_CONTEXT_VAL_ERR = 'Invalid sameSiteContext option for getCookies(); expected one of "strict", "lax", or "none"';
function getCookieContext(url) {
    if (url && typeof url === 'object' && 'hostname' in url && typeof url.hostname === 'string' && 'pathname' in url && typeof url.pathname === 'string' && 'protocol' in url && typeof url.protocol === 'string') {
        return {
            hostname: url.hostname,
            pathname: url.pathname,
            protocol: url.protocol
        };
    } else if (typeof url === 'string') {
        try {
            return new URL(decodeURI(url));
        } catch  {
            return new URL(url);
        }
    } else {
        throw new validators_1.ParameterError('`url` argument is not a string or URL.');
    }
}
function checkSameSiteContext(value) {
    const context = String(value).toLowerCase();
    if (context === 'none' || context === 'lax' || context === 'strict') {
        return context;
    } else {
        return undefined;
    }
}
/**
 *  If the cookie-name begins with a case-sensitive match for the
 *  string "__Secure-", abort these steps and ignore the cookie
 *  entirely unless the cookie's secure-only-flag is true.
 * @param cookie
 * @returns boolean
 */ function isSecurePrefixConditionMet(cookie) {
    const startsWithSecurePrefix = typeof cookie.key === 'string' && cookie.key.startsWith('__Secure-');
    return !startsWithSecurePrefix || cookie.secure;
}
/**
 *  If the cookie-name begins with a case-sensitive match for the
 *  string "__Host-", abort these steps and ignore the cookie
 *  entirely unless the cookie meets all the following criteria:
 *    1.  The cookie's secure-only-flag is true.
 *    2.  The cookie's host-only-flag is true.
 *    3.  The cookie-attribute-list contains an attribute with an
 *        attribute-name of "Path", and the cookie's path is "/".
 * @param cookie
 * @returns boolean
 */ function isHostPrefixConditionMet(cookie) {
    const startsWithHostPrefix = typeof cookie.key === 'string' && cookie.key.startsWith('__Host-');
    return !startsWithHostPrefix || Boolean(cookie.secure && cookie.hostOnly && cookie.path != null && cookie.path === '/');
}
function getNormalizedPrefixSecurity(prefixSecurity) {
    const normalizedPrefixSecurity = prefixSecurity.toLowerCase();
    /* The three supported options */ switch(normalizedPrefixSecurity){
        case constants_1.PrefixSecurityEnum.STRICT:
        case constants_1.PrefixSecurityEnum.SILENT:
        case constants_1.PrefixSecurityEnum.DISABLED:
            return normalizedPrefixSecurity;
        default:
            return constants_1.PrefixSecurityEnum.SILENT;
    }
}
/**
 * A CookieJar is for storage and retrieval of {@link Cookie} objects as defined in
 * {@link https://www.rfc-editor.org/rfc/rfc6265.html#section-5.3 | RFC6265 - Section 5.3}.
 *
 * It also supports a pluggable persistence layer via {@link Store}.
 * @public
 */ class CookieJar {
    /**
     * Creates a new `CookieJar` instance.
     *
     * @remarks
     * - If a custom store is not passed to the constructor, an in-memory store ({@link MemoryCookieStore} will be created and used.
     * - If a boolean value is passed as the `options` parameter, this is equivalent to passing `{ rejectPublicSuffixes: <value> }`
     *
     * @param store - a custom {@link Store} implementation (defaults to {@link MemoryCookieStore})
     * @param options - configures how cookies are processed by the cookie jar
     */ constructor(store, options){
        if (typeof options === 'boolean') {
            options = {
                rejectPublicSuffixes: options
            };
        }
        this.rejectPublicSuffixes = options?.rejectPublicSuffixes ?? true;
        this.enableLooseMode = options?.looseMode ?? false;
        this.allowSpecialUseDomain = options?.allowSpecialUseDomain ?? true;
        this.prefixSecurity = getNormalizedPrefixSecurity(options?.prefixSecurity ?? 'silent');
        this.store = store ?? new memstore_1.MemoryCookieStore();
    }
    callSync(fn) {
        if (!this.store.synchronous) {
            throw new Error('CookieJar store is not synchronous; use async API instead.');
        }
        let syncErr = null;
        let syncResult = undefined;
        try {
            fn.call(this, (error, result)=>{
                syncErr = error;
                syncResult = result;
            });
        } catch (err) {
            syncErr = err;
        }
        if (syncErr) throw syncErr;
        return syncResult;
    }
    /**
     * @internal No doc because this is the overload implementation
     */ setCookie(cookie, url, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cb = promiseCallback.callback;
        let context;
        try {
            if (typeof url === 'string') {
                validators.validate(validators.isNonEmptyString(url), callback, (0, utils_1.safeToString)(options));
            }
            context = getCookieContext(url);
            if (typeof url === 'function') {
                return promiseCallback.reject(new Error('No URL was specified'));
            }
            if (typeof options === 'function') {
                options = defaultSetCookieOptions;
            }
            validators.validate(typeof cb === 'function', cb);
            if (!validators.isNonEmptyString(cookie) && !validators.isObject(cookie) && cookie instanceof String && cookie.length == 0) {
                return promiseCallback.resolve(undefined);
            }
        } catch (err) {
            return promiseCallback.reject(err);
        }
        const host = (0, canonicalDomain_1.canonicalDomain)(context.hostname) ?? null;
        const loose = options?.loose || this.enableLooseMode;
        let sameSiteContext = null;
        if (options?.sameSiteContext) {
            sameSiteContext = checkSameSiteContext(options.sameSiteContext);
            if (!sameSiteContext) {
                return promiseCallback.reject(new Error(SAME_SITE_CONTEXT_VAL_ERR));
            }
        }
        // S5.3 step 1
        if (typeof cookie === 'string' || cookie instanceof String) {
            const parsedCookie = cookie_1.Cookie.parse(cookie.toString(), {
                loose: loose
            });
            if (!parsedCookie) {
                const err = new Error('Cookie failed to parse');
                return options?.ignoreError ? promiseCallback.resolve(undefined) : promiseCallback.reject(err);
            }
            cookie = parsedCookie;
        } else if (!(cookie instanceof cookie_1.Cookie)) {
            // If you're seeing this error, and are passing in a Cookie object,
            // it *might* be a Cookie object from another loaded version of tough-cookie.
            const err = new Error('First argument to setCookie must be a Cookie object or string');
            return options?.ignoreError ? promiseCallback.resolve(undefined) : promiseCallback.reject(err);
        }
        // S5.3 step 2
        const now = options?.now || new Date(); // will assign later to save effort in the face of errors
        // S5.3 step 3: NOOP; persistent-flag and expiry-time is handled by getCookie()
        // S5.3 step 4: NOOP; domain is null by default
        // S5.3 step 5: public suffixes
        if (this.rejectPublicSuffixes && cookie.domain) {
            try {
                const cdomain = cookie.cdomain();
                const suffix = typeof cdomain === 'string' ? (0, getPublicSuffix_1.getPublicSuffix)(cdomain, {
                    allowSpecialUseDomain: this.allowSpecialUseDomain,
                    ignoreError: options?.ignoreError
                }) : null;
                if (suffix == null && !constants_1.IP_V6_REGEX_OBJECT.test(cookie.domain)) {
                    // e.g. "com"
                    const err = new Error('Cookie has domain set to a public suffix');
                    return options?.ignoreError ? promiseCallback.resolve(undefined) : promiseCallback.reject(err);
                }
            // Using `any` here rather than `unknown` to avoid a type assertion, at the cost of needing
            // to disable eslint directives. It's easier to have this one spot of technically incorrect
            // types, rather than having to deal with _all_ callback errors being `unknown`.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err) {
                return options?.ignoreError ? promiseCallback.resolve(undefined) : promiseCallback.reject(err);
            }
        }
        // S5.3 step 6:
        if (cookie.domain) {
            if (!(0, domainMatch_1.domainMatch)(host ?? undefined, cookie.cdomain() ?? undefined, false)) {
                const err = new Error(`Cookie not in this host's domain. Cookie:${cookie.cdomain() ?? 'null'} Request:${host ?? 'null'}`);
                return options?.ignoreError ? promiseCallback.resolve(undefined) : promiseCallback.reject(err);
            }
            if (cookie.hostOnly == null) {
                // don't reset if already set
                cookie.hostOnly = false;
            }
        } else {
            cookie.hostOnly = true;
            cookie.domain = host;
        }
        //S5.2.4 If the attribute-value is empty or if the first character of the
        //attribute-value is not %x2F ("/"):
        //Let cookie-path be the default-path.
        if (!cookie.path || cookie.path[0] !== '/') {
            cookie.path = (0, defaultPath_1.defaultPath)(context.pathname);
            cookie.pathIsDefault = true;
        }
        // S5.3 step 8: NOOP; secure attribute
        // S5.3 step 9: NOOP; httpOnly attribute
        // S5.3 step 10
        if (options?.http === false && cookie.httpOnly) {
            const err = new Error("Cookie is HttpOnly and this isn't an HTTP API");
            return options.ignoreError ? promiseCallback.resolve(undefined) : promiseCallback.reject(err);
        }
        // 6252bis-02 S5.4 Step 13 & 14:
        if (cookie.sameSite !== 'none' && cookie.sameSite !== undefined && sameSiteContext) {
            // "If the cookie's "same-site-flag" is not "None", and the cookie
            //  is being set from a context whose "site for cookies" is not an
            //  exact match for request-uri's host's registered domain, then
            //  abort these steps and ignore the newly created cookie entirely."
            if (sameSiteContext === 'none') {
                const err = new Error('Cookie is SameSite but this is a cross-origin request');
                return options?.ignoreError ? promiseCallback.resolve(undefined) : promiseCallback.reject(err);
            }
        }
        /* 6265bis-02 S5.4 Steps 15 & 16 */ const ignoreErrorForPrefixSecurity = this.prefixSecurity === constants_1.PrefixSecurityEnum.SILENT;
        const prefixSecurityDisabled = this.prefixSecurity === constants_1.PrefixSecurityEnum.DISABLED;
        /* If prefix checking is not disabled ...*/ if (!prefixSecurityDisabled) {
            let errorFound = false;
            let errorMsg;
            /* Check secure prefix condition */ if (!isSecurePrefixConditionMet(cookie)) {
                errorFound = true;
                errorMsg = 'Cookie has __Secure prefix but Secure attribute is not set';
            } else if (!isHostPrefixConditionMet(cookie)) {
                /* Check host prefix condition */ errorFound = true;
                errorMsg = "Cookie has __Host prefix but either Secure or HostOnly attribute is not set or Path is not '/'";
            }
            if (errorFound) {
                return options?.ignoreError || ignoreErrorForPrefixSecurity ? promiseCallback.resolve(undefined) : promiseCallback.reject(new Error(errorMsg));
            }
        }
        const store = this.store;
        // TODO: It feels weird to be manipulating the store as a side effect of a method.
        // We should either do it in the constructor or not at all.
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!store.updateCookie) {
            store.updateCookie = async function(_oldCookie, newCookie, cb) {
                return this.putCookie(newCookie).then(()=>cb?.(null), (error)=>cb?.(error));
            };
        }
        const withCookie = function withCookie(err, oldCookie) {
            if (err) {
                cb(err);
                return;
            }
            const next = function(err) {
                if (err) {
                    cb(err);
                } else if (typeof cookie === 'string') {
                    cb(null, undefined);
                } else {
                    cb(null, cookie);
                }
            };
            if (oldCookie) {
                // S5.3 step 11 - "If the cookie store contains a cookie with the same name,
                // domain, and path as the newly created cookie:"
                if (options && 'http' in options && options.http === false && oldCookie.httpOnly) {
                    // step 11.2
                    err = new Error("old Cookie is HttpOnly and this isn't an HTTP API");
                    if (options.ignoreError) cb(null, undefined);
                    else cb(err);
                    return;
                }
                if (cookie instanceof cookie_1.Cookie) {
                    cookie.creation = oldCookie.creation;
                    // step 11.3
                    cookie.creationIndex = oldCookie.creationIndex;
                    // preserve tie-breaker
                    cookie.lastAccessed = now;
                    // Step 11.4 (delete cookie) is implied by just setting the new one:
                    store.updateCookie(oldCookie, cookie, next); // step 12
                }
            } else {
                if (cookie instanceof cookie_1.Cookie) {
                    cookie.creation = cookie.lastAccessed = now;
                    store.putCookie(cookie, next); // step 12
                }
            }
        };
        // TODO: Refactor to avoid using a callback
        store.findCookie(cookie.domain, cookie.path, cookie.key, withCookie);
        return promiseCallback.promise;
    }
    /**
     * Synchronously attempt to set the {@link Cookie} in the {@link CookieJar}.
     *
     * <strong>Note:</strong> Only works if the configured {@link Store} is also synchronous.
     *
     * @remarks
     * - If successfully persisted, the {@link Cookie} will have updated
     *     {@link Cookie.creation}, {@link Cookie.lastAccessed} and {@link Cookie.hostOnly}
     *     properties.
     *
     * - As per the RFC, the {@link Cookie.hostOnly} flag is set if there was no `Domain={value}`
     *     atttribute on the cookie string. The {@link Cookie.domain} property is set to the
     *     fully-qualified hostname of `currentUrl` in this case. Matching this cookie requires an
     *     exact hostname match (not a {@link domainMatch} as per usual)
     *
     * @param cookie - The cookie object or cookie string to store. A string value will be parsed into a cookie using {@link Cookie.parse}.
     * @param url - The domain to store the cookie with.
     * @param options - Configuration settings to use when storing the cookie.
     * @public
     */ setCookieSync(cookie, url, options) {
        const setCookieFn = options ? this.setCookie.bind(this, cookie, url, options) : this.setCookie.bind(this, cookie, url);
        return this.callSync(setCookieFn);
    }
    /**
     * @internal No doc because this is the overload implementation
     */ getCookies(url, options, callback) {
        // RFC6365 S5.4
        if (typeof options === 'function') {
            callback = options;
            options = defaultGetCookieOptions;
        } else if (options === undefined) {
            options = defaultGetCookieOptions;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cb = promiseCallback.callback;
        let context;
        try {
            if (typeof url === 'string') {
                validators.validate(validators.isNonEmptyString(url), cb, url);
            }
            context = getCookieContext(url);
            validators.validate(validators.isObject(options), cb, (0, utils_1.safeToString)(options));
            validators.validate(typeof cb === 'function', cb);
        } catch (parameterError) {
            return promiseCallback.reject(parameterError);
        }
        const host = (0, canonicalDomain_1.canonicalDomain)(context.hostname);
        const path = context.pathname || '/';
        const secure = context.protocol && (context.protocol == 'https:' || context.protocol == 'wss:');
        let sameSiteLevel = 0;
        if (options.sameSiteContext) {
            const sameSiteContext = checkSameSiteContext(options.sameSiteContext);
            if (sameSiteContext == null) {
                return promiseCallback.reject(new Error(SAME_SITE_CONTEXT_VAL_ERR));
            }
            sameSiteLevel = cookie_1.Cookie.sameSiteLevel[sameSiteContext];
            if (!sameSiteLevel) {
                return promiseCallback.reject(new Error(SAME_SITE_CONTEXT_VAL_ERR));
            }
        }
        const http = options.http ?? true;
        const now = Date.now();
        const expireCheck = options.expire ?? true;
        const allPaths = options.allPaths ?? false;
        const store = this.store;
        function matchingCookie(c) {
            // "Either:
            //   The cookie's host-only-flag is true and the canonicalized
            //   request-host is identical to the cookie's domain.
            // Or:
            //   The cookie's host-only-flag is false and the canonicalized
            //   request-host domain-matches the cookie's domain."
            if (c.hostOnly) {
                if (c.domain != host) {
                    return false;
                }
            } else {
                if (!(0, domainMatch_1.domainMatch)(host ?? undefined, c.domain ?? undefined, false)) {
                    return false;
                }
            }
            // "The request-uri's path path-matches the cookie's path."
            if (!allPaths && typeof c.path === 'string' && !(0, pathMatch_1.pathMatch)(path, c.path)) {
                return false;
            }
            // "If the cookie's secure-only-flag is true, then the request-uri's
            // scheme must denote a "secure" protocol"
            if (c.secure && !secure) {
                return false;
            }
            // "If the cookie's http-only-flag is true, then exclude the cookie if the
            // cookie-string is being generated for a "non-HTTP" API"
            if (c.httpOnly && !http) {
                return false;
            }
            // RFC6265bis-02 S5.3.7
            if (sameSiteLevel) {
                let cookieLevel;
                if (c.sameSite === 'lax') {
                    cookieLevel = cookie_1.Cookie.sameSiteLevel.lax;
                } else if (c.sameSite === 'strict') {
                    cookieLevel = cookie_1.Cookie.sameSiteLevel.strict;
                } else {
                    cookieLevel = cookie_1.Cookie.sameSiteLevel.none;
                }
                if (cookieLevel > sameSiteLevel) {
                    // only allow cookies at or below the request level
                    return false;
                }
            }
            // deferred from S5.3
            // non-RFC: allow retention of expired cookies by choice
            const expiryTime = c.expiryTime();
            if (expireCheck && expiryTime != undefined && expiryTime <= now) {
                store.removeCookie(c.domain, c.path, c.key, ()=>{}); // result ignored
                return false;
            }
            return true;
        }
        store.findCookies(host, allPaths ? null : path, this.allowSpecialUseDomain, (err, cookies)=>{
            if (err) {
                cb(err);
                return;
            }
            if (cookies == null) {
                cb(null, []);
                return;
            }
            cookies = cookies.filter(matchingCookie);
            // sorting of S5.4 part 2
            if ('sort' in options && options.sort !== false) {
                cookies = cookies.sort(cookieCompare_1.cookieCompare);
            }
            // S5.4 part 3
            const now = new Date();
            for (const cookie of cookies){
                cookie.lastAccessed = now;
            }
            // TODO persist lastAccessed
            cb(null, cookies);
        });
        return promiseCallback.promise;
    }
    /**
     * Synchronously retrieve the list of cookies that can be sent in a Cookie header for the
     * current URL.
     *
     * <strong>Note</strong>: Only works if the configured Store is also synchronous.
     *
     * @remarks
     * - The array of cookies returned will be sorted according to {@link cookieCompare}.
     *
     * - The {@link Cookie.lastAccessed} property will be updated on all returned cookies.
     *
     * @param url - The domain to store the cookie with.
     * @param options - Configuration settings to use when retrieving the cookies.
     */ getCookiesSync(url, options) {
        return this.callSync(this.getCookies.bind(this, url, options)) ?? [];
    }
    /**
     * @internal No doc because this is the overload implementation
     */ getCookieString(url, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const next = function(err, cookies) {
            if (err) {
                promiseCallback.callback(err);
            } else {
                promiseCallback.callback(null, cookies?.sort(cookieCompare_1.cookieCompare).map((c)=>c.cookieString()).join('; '));
            }
        };
        this.getCookies(url, options, next);
        return promiseCallback.promise;
    }
    /**
     * Synchronous version of `.getCookieString()`. Accepts the same options as `.getCookies()` but returns a string suitable for a
     * `Cookie` header rather than an Array.
     *
     * <strong>Note</strong>: Only works if the configured Store is also synchronous.
     *
     * @param url - The domain to store the cookie with.
     * @param options - Configuration settings to use when retrieving the cookies.
     */ getCookieStringSync(url, options) {
        return this.callSync(options ? this.getCookieString.bind(this, url, options) : this.getCookieString.bind(this, url)) ?? '';
    }
    /**
     * @internal No doc because this is the overload implementation
     */ getSetCookieStrings(url, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const next = function(err, cookies) {
            if (err) {
                promiseCallback.callback(err);
            } else {
                promiseCallback.callback(null, cookies?.map((c)=>{
                    return c.toString();
                }));
            }
        };
        this.getCookies(url, options, next);
        return promiseCallback.promise;
    }
    /**
     * Synchronous version of `.getSetCookieStrings()`. Returns an array of strings suitable for `Set-Cookie` headers.
     * Accepts the same options as `.getCookies()`.
     *
     * <strong>Note</strong>: Only works if the configured Store is also synchronous.
     *
     * @param url - The domain to store the cookie with.
     * @param options - Configuration settings to use when retrieving the cookies.
     */ getSetCookieStringsSync(url, options = {}) {
        return this.callSync(this.getSetCookieStrings.bind(this, url, options)) ?? [];
    }
    /**
     * @internal No doc because this is the overload implementation
     */ serialize(callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        let type = this.store.constructor.name;
        if (validators.isObject(type)) {
            type = null;
        }
        // update README.md "Serialization Format" if you change this, please!
        const serialized = {
            // The version of tough-cookie that serialized this jar. Generally a good
            // practice since future versions can make data import decisions based on
            // known past behavior. When/if this matters, use `semver`.
            version: `tough-cookie@${version_1.version}`,
            // add the store type, to make humans happy:
            storeType: type,
            // CookieJar configuration:
            rejectPublicSuffixes: this.rejectPublicSuffixes,
            enableLooseMode: this.enableLooseMode,
            allowSpecialUseDomain: this.allowSpecialUseDomain,
            prefixSecurity: getNormalizedPrefixSecurity(this.prefixSecurity),
            // this gets filled from getAllCookies:
            cookies: []
        };
        if (typeof this.store.getAllCookies !== 'function') {
            return promiseCallback.reject(new Error('store does not support getAllCookies and cannot be serialized'));
        }
        this.store.getAllCookies((err, cookies)=>{
            if (err) {
                promiseCallback.callback(err);
                return;
            }
            if (cookies == null) {
                promiseCallback.callback(null, serialized);
                return;
            }
            serialized.cookies = cookies.map((cookie)=>{
                // convert to serialized 'raw' cookies
                const serializedCookie = cookie.toJSON();
                // Remove the index so new ones get assigned during deserialization
                delete serializedCookie.creationIndex;
                return serializedCookie;
            });
            promiseCallback.callback(null, serialized);
        });
        return promiseCallback.promise;
    }
    /**
     * Serialize the CookieJar if the underlying store supports `.getAllCookies`.
     *
     * <strong>Note</strong>: Only works if the configured Store is also synchronous.
     */ serializeSync() {
        return this.callSync((callback)=>{
            this.serialize(callback);
        });
    }
    /**
     * Alias of {@link CookieJar.serializeSync}. Allows the cookie to be serialized
     * with `JSON.stringify(cookieJar)`.
     */ toJSON() {
        return this.serializeSync();
    }
    /**
     * Use the class method CookieJar.deserialize instead of calling this directly
     * @internal
     */ _importCookies(serialized, callback) {
        let cookies = undefined;
        if (serialized && typeof serialized === 'object' && (0, utils_1.inOperator)('cookies', serialized) && Array.isArray(serialized.cookies)) {
            cookies = serialized.cookies;
        }
        if (!cookies) {
            callback(new Error('serialized jar has no cookies array'), undefined);
            return;
        }
        cookies = cookies.slice(); // do not modify the original
        const putNext = (err)=>{
            if (err) {
                callback(err, undefined);
                return;
            }
            if (Array.isArray(cookies)) {
                if (!cookies.length) {
                    callback(err, this);
                    return;
                }
                let cookie;
                try {
                    cookie = cookie_1.Cookie.fromJSON(cookies.shift());
                } catch (e) {
                    callback(e instanceof Error ? e : new Error(), undefined);
                    return;
                }
                if (cookie === undefined) {
                    putNext(null); // skip this cookie
                    return;
                }
                this.store.putCookie(cookie, putNext);
            }
        };
        putNext(null);
    }
    /**
     * @internal
     */ _importCookiesSync(serialized) {
        this.callSync(this._importCookies.bind(this, serialized));
    }
    /**
     * @internal No doc because this is the overload implementation
     */ clone(newStore, callback) {
        if (typeof newStore === 'function') {
            callback = newStore;
            newStore = undefined;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cb = promiseCallback.callback;
        this.serialize((err, serialized)=>{
            if (err) {
                return promiseCallback.reject(err);
            }
            return CookieJar.deserialize(serialized ?? '', newStore, cb);
        });
        return promiseCallback.promise;
    }
    /**
     * @internal
     */ _cloneSync(newStore) {
        const cloneFn = newStore && typeof newStore !== 'function' ? this.clone.bind(this, newStore) : this.clone.bind(this);
        return this.callSync((callback)=>{
            cloneFn(callback);
        });
    }
    /**
     * Produces a deep clone of this CookieJar. Modifications to the original do
     * not affect the clone, and vice versa.
     *
     * <strong>Note</strong>: Only works if both the configured Store and destination
     * Store are synchronous.
     *
     * @remarks
     * - When no {@link Store} is provided, a new {@link MemoryCookieStore} will be used.
     *
     * - Transferring between store types is supported so long as the source
     *     implements `.getAllCookies()` and the destination implements `.putCookie()`.
     *
     * @param newStore - The target {@link Store} to clone cookies into.
     */ cloneSync(newStore) {
        if (!newStore) {
            return this._cloneSync();
        }
        if (!newStore.synchronous) {
            throw new Error('CookieJar clone destination store is not synchronous; use async API instead.');
        }
        return this._cloneSync(newStore);
    }
    /**
     * @internal No doc because this is the overload implementation
     */ removeAllCookies(callback) {
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        const cb = promiseCallback.callback;
        const store = this.store;
        // Check that the store implements its own removeAllCookies(). The default
        // implementation in Store will immediately call the callback with a "not
        // implemented" Error.
        if (typeof store.removeAllCookies === 'function' && store.removeAllCookies !== store_1.Store.prototype.removeAllCookies) {
            // `Callback<undefined>` and `ErrorCallback` are *technically* incompatible, but for the
            // standard implementation `cb = (err, result) => {}`, they're essentially the same.
            store.removeAllCookies(cb);
            return promiseCallback.promise;
        }
        store.getAllCookies((err, cookies)=>{
            if (err) {
                cb(err);
                return;
            }
            if (!cookies) {
                cookies = [];
            }
            if (cookies.length === 0) {
                cb(null, undefined);
                return;
            }
            let completedCount = 0;
            const removeErrors = [];
            // TODO: Refactor to avoid using callback
            const removeCookieCb = function removeCookieCb(removeErr) {
                if (removeErr) {
                    removeErrors.push(removeErr);
                }
                completedCount++;
                if (completedCount === cookies.length) {
                    if (removeErrors[0]) cb(removeErrors[0]);
                    else cb(null, undefined);
                    return;
                }
            };
            cookies.forEach((cookie)=>{
                store.removeCookie(cookie.domain, cookie.path, cookie.key, removeCookieCb);
            });
        });
        return promiseCallback.promise;
    }
    /**
     * Removes all cookies from the CookieJar.
     *
     * <strong>Note</strong>: Only works if the configured Store is also synchronous.
     *
     * @remarks
     * - This is a new backwards-compatible feature of tough-cookie version 2.5,
     *     so not all Stores will implement it efficiently. For Stores that do not
     *     implement `removeAllCookies`, the fallback is to call `removeCookie` after
     *     `getAllCookies`.
     *
     * - If `getAllCookies` fails or isn't implemented in the Store, an error is returned.
     *
     * - If one or more of the `removeCookie` calls fail, only the first error is returned.
     */ removeAllCookiesSync() {
        this.callSync((callback)=>{
            // `Callback<undefined>` and `ErrorCallback` are *technically* incompatible, but for the
            // standard implementation `cb = (err, result) => {}`, they're essentially the same.
            this.removeAllCookies(callback);
        });
    }
    /**
     * @internal No doc because this is the overload implementation
     */ static deserialize(strOrObj, store, callback) {
        if (typeof store === 'function') {
            callback = store;
            store = undefined;
        }
        const promiseCallback = (0, utils_1.createPromiseCallback)(callback);
        let serialized;
        if (typeof strOrObj === 'string') {
            try {
                serialized = JSON.parse(strOrObj);
            } catch (e) {
                return promiseCallback.reject(e instanceof Error ? e : new Error());
            }
        } else {
            serialized = strOrObj;
        }
        const readSerializedProperty = (property)=>{
            return serialized && typeof serialized === 'object' && (0, utils_1.inOperator)(property, serialized) ? serialized[property] : undefined;
        };
        const readSerializedBoolean = (property)=>{
            const value = readSerializedProperty(property);
            return typeof value === 'boolean' ? value : undefined;
        };
        const readSerializedString = (property)=>{
            const value = readSerializedProperty(property);
            return typeof value === 'string' ? value : undefined;
        };
        const jar = new CookieJar(store, {
            rejectPublicSuffixes: readSerializedBoolean('rejectPublicSuffixes'),
            looseMode: readSerializedBoolean('enableLooseMode'),
            allowSpecialUseDomain: readSerializedBoolean('allowSpecialUseDomain'),
            prefixSecurity: getNormalizedPrefixSecurity(readSerializedString('prefixSecurity') ?? 'silent')
        });
        jar._importCookies(serialized, (err)=>{
            if (err) {
                promiseCallback.callback(err);
                return;
            }
            promiseCallback.callback(null, jar);
        });
        return promiseCallback.promise;
    }
    /**
     * A new CookieJar is created and the serialized {@link Cookie} values are added to
     * the underlying store. Each {@link Cookie} is added via `store.putCookie(...)` in
     * the order in which they appear in the serialization.
     *
     * <strong>Note</strong>: Only works if the configured Store is also synchronous.
     *
     * @remarks
     * - When no {@link Store} is provided, a new {@link MemoryCookieStore} will be used.
     *
     * - As a convenience, if `strOrObj` is a string, it is passed through `JSON.parse` first.
     *
     * @param strOrObj - A JSON string or object representing the deserialized cookies.
     * @param store - The underlying store to persist the deserialized cookies into.
     */ static deserializeSync(strOrObj, store) {
        const serialized = typeof strOrObj === 'string' ? JSON.parse(strOrObj) : strOrObj;
        const readSerializedProperty = (property)=>{
            return serialized && typeof serialized === 'object' && (0, utils_1.inOperator)(property, serialized) ? serialized[property] : undefined;
        };
        const readSerializedBoolean = (property)=>{
            const value = readSerializedProperty(property);
            return typeof value === 'boolean' ? value : undefined;
        };
        const readSerializedString = (property)=>{
            const value = readSerializedProperty(property);
            return typeof value === 'string' ? value : undefined;
        };
        const jar = new CookieJar(store, {
            rejectPublicSuffixes: readSerializedBoolean('rejectPublicSuffixes'),
            looseMode: readSerializedBoolean('enableLooseMode'),
            allowSpecialUseDomain: readSerializedBoolean('allowSpecialUseDomain'),
            prefixSecurity: getNormalizedPrefixSecurity(readSerializedString('prefixSecurity') ?? 'silent')
        });
        // catch this mistake early:
        if (!jar.store.synchronous) {
            throw new Error('CookieJar store is not synchronous; use async API instead.');
        }
        jar._importCookiesSync(serialized);
        return jar;
    }
    /**
     * Alias of {@link CookieJar.deserializeSync}.
     *
     * @remarks
     * - When no {@link Store} is provided, a new {@link MemoryCookieStore} will be used.
     *
     * - As a convenience, if `strOrObj` is a string, it is passed through `JSON.parse` first.
     *
     * @param jsonString - A JSON string or object representing the deserialized cookies.
     * @param store - The underlying store to persist the deserialized cookies into.
     */ static fromJSON(jsonString, store) {
        return CookieJar.deserializeSync(jsonString, store);
    }
}
exports.CookieJar = CookieJar;
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/permutePath.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.permutePath = permutePath;
/**
 * Generates the permutation of all possible values that {@link pathMatch} the `path` parameter.
 * The array is in longest-to-shortest order.  Useful when building custom {@link Store} implementations.
 *
 * @example
 * ```
 * permutePath('/foo/bar/')
 * // ['/foo/bar/', '/foo/bar', '/foo', '/']
 * ```
 *
 * @param path - the path to generate permutations for
 * @public
 */ function permutePath(path) {
    if (path === '/') {
        return [
            '/'
        ];
    }
    const permutations = [
        path
    ];
    while(path.length > 1){
        const lindex = path.lastIndexOf('/');
        if (lindex === 0) {
            break;
        }
        path = path.slice(0, lindex);
        permutations.push(path);
    }
    permutations.push('/');
    return permutations;
}
}),
"[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.permutePath = exports.parseDate = exports.formatDate = exports.domainMatch = exports.defaultPath = exports.CookieJar = exports.cookieCompare = exports.Cookie = exports.PrefixSecurityEnum = exports.canonicalDomain = exports.version = exports.ParameterError = exports.Store = exports.getPublicSuffix = exports.permuteDomain = exports.pathMatch = exports.MemoryCookieStore = void 0;
exports.parse = parse;
exports.fromJSON = fromJSON;
var memstore_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/memstore.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "MemoryCookieStore", {
    enumerable: true,
    get: function() {
        return memstore_1.MemoryCookieStore;
    }
});
var pathMatch_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/pathMatch.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "pathMatch", {
    enumerable: true,
    get: function() {
        return pathMatch_1.pathMatch;
    }
});
var permuteDomain_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/permuteDomain.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "permuteDomain", {
    enumerable: true,
    get: function() {
        return permuteDomain_1.permuteDomain;
    }
});
var getPublicSuffix_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/getPublicSuffix.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "getPublicSuffix", {
    enumerable: true,
    get: function() {
        return getPublicSuffix_1.getPublicSuffix;
    }
});
var store_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/store.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "Store", {
    enumerable: true,
    get: function() {
        return store_1.Store;
    }
});
var validators_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/validators.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "ParameterError", {
    enumerable: true,
    get: function() {
        return validators_1.ParameterError;
    }
});
var version_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/version.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "version", {
    enumerable: true,
    get: function() {
        return version_1.version;
    }
});
var canonicalDomain_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/canonicalDomain.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "canonicalDomain", {
    enumerable: true,
    get: function() {
        return canonicalDomain_1.canonicalDomain;
    }
});
var constants_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/constants.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "PrefixSecurityEnum", {
    enumerable: true,
    get: function() {
        return constants_1.PrefixSecurityEnum;
    }
});
var cookie_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookie.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "Cookie", {
    enumerable: true,
    get: function() {
        return cookie_1.Cookie;
    }
});
var cookieCompare_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookieCompare.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "cookieCompare", {
    enumerable: true,
    get: function() {
        return cookieCompare_1.cookieCompare;
    }
});
var cookieJar_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookieJar.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "CookieJar", {
    enumerable: true,
    get: function() {
        return cookieJar_1.CookieJar;
    }
});
var defaultPath_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/defaultPath.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "defaultPath", {
    enumerable: true,
    get: function() {
        return defaultPath_1.defaultPath;
    }
});
var domainMatch_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/domainMatch.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "domainMatch", {
    enumerable: true,
    get: function() {
        return domainMatch_1.domainMatch;
    }
});
var formatDate_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/formatDate.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "formatDate", {
    enumerable: true,
    get: function() {
        return formatDate_1.formatDate;
    }
});
var parseDate_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/parseDate.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "parseDate", {
    enumerable: true,
    get: function() {
        return parseDate_1.parseDate;
    }
});
var permutePath_1 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/permutePath.js [app-ssr] (ecmascript)");
Object.defineProperty(exports, "permutePath", {
    enumerable: true,
    get: function() {
        return permutePath_1.permutePath;
    }
});
const cookie_2 = __turbopack_context__.r("[project]/frontend/node_modules/.pnpm/tough-cookie@5.1.2/node_modules/tough-cookie/dist/cookie/cookie.js [app-ssr] (ecmascript)");
/**
 * {@inheritDoc Cookie.parse}
 * @public
 */ function parse(str, options) {
    return cookie_2.Cookie.parse(str, options);
}
/**
 * {@inheritDoc Cookie.fromJSON}
 * @public
 */ function fromJSON(str) {
    return cookie_2.Cookie.fromJSON(str);
}
}),
];

//# sourceMappingURL=75044_tough-cookie_dist_3f0a17c7._.js.map