import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import crypto$1 from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getCookie, getQuery as getQuery$1, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, setCookie, deleteCookie, setHeader, getResponseStatusText } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/@vue/shared/dist/shared.cjs.js';
import jwt from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/jsonwebtoken/index.js';
import bcrypt from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/bcrypt/bcrypt.js';
import * as v from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/valibot/dist/index.js';
import { safeParse, object, number, array, optional, string, pipe, picklist, regex, union, transform, minValue, maxValue, minLength, maxLength, boolean } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/valibot/dist/index.js';
import { PrismaClient } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/@prisma/client/default.js';
import { Resend } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/resend/dist/index.mjs';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/ufo/dist/index.mjs';
import destr, { destr as destr$1 } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/destr/dist/index.mjs';
import { renderToString } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/vue/server-renderer/index.mjs';
import { klona } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/scule/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/devalue/index.js';
import { isVNode, toValue, isRef } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/vue/index.mjs';
import { createHooks } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/youch-core/build/index.js';
import { Youch } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/errx/dist/index.js';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/pathe/dist/index.mjs';
import { walkResolver } from 'file://C:/Users/Matias/Desktop/Proyecto-Web-1/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"C:/Users/Matias/Desktop/Proyecto-Web-1/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/Matias/Desktop/Proyecto-Web-1","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/Matias/Desktop/Proyecto-Web-1/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/Matias/Desktop/Proyecto-Web-1/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/Matias/Desktop/Proyecto-Web-1/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:/Users/Matias/Desktop/Proyecto-Web-1/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {}
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const iframeStorageBridge = (nonce) => (
  /* js */
  `
(function() {
  const memoryStore = {};

  const NONCE = ${JSON.stringify(nonce)}
  
  const mockStorage = {
    getItem: function(key) {
      return memoryStore[key] !== undefined ? memoryStore[key] : null;
    },
    setItem: function(key, value) {
      memoryStore[key] = String(value);
      window.parent.postMessage({
        type: 'storage-set',
        key: key,
        value: String(value),
        nonce: NONCE
      }, '*');
    },
    removeItem: function(key) {
      delete memoryStore[key];
      window.parent.postMessage({
        type: 'storage-remove',
        key: key,
        nonce: NONCE
      }, '*');
    },
    clear: function() {
      for (const key in memoryStore) {
        delete memoryStore[key];
      }
      window.parent.postMessage({
        type: 'storage-clear',
        nonce: NONCE
      }, '*');
    },
    key: function(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] !== undefined ? keys[index] : null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };
  
  try {
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: false,
      configurable: true
    });
  } catch (e) {
    window.localStorage = mockStorage;
  }
  
  window.addEventListener('message', function(event) {
    if (event.data.type === 'storage-sync-data' && event.data.nonce === NONCE) {
      const data = event.data.data;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          memoryStore[key] = data[key];
        }
      }
      if (typeof window.initTheme === 'function') {
        window.initTheme();
      }
      window.dispatchEvent(new Event('storage-ready'));
    }
  });
  
  window.parent.postMessage({ 
    type: 'storage-sync-request',
    nonce: NONCE
  }, '*');
})();
`
);
const parentStorageBridge = (nonce) => (
  /* js */
  `
(function() {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;
  
  // Wait for shadow root to be attached
  const checkShadow = setInterval(function() {
    if (host.shadowRoot) {
      clearInterval(checkShadow);
      const iframe = host.shadowRoot.getElementById('frame');
      if (!iframe) return;

      const NONCE = ${JSON.stringify(nonce)}
      
      window.addEventListener('message', function(event) {
        if (!event.data || event.data.nonce !== NONCE) return;
        
        const data = event.data;
        
        if (data.type === 'storage-set') {
          localStorage.setItem(data.key, data.value);
        } else if (data.type === 'storage-remove') {
          localStorage.removeItem(data.key);
        } else if (data.type === 'storage-clear') {
          localStorage.clear();
        } else if (data.type === 'storage-sync-request') {
          const allData = {};
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            allData[key] = localStorage.getItem(key);
          }
          iframe.contentWindow.postMessage({
            type: 'storage-sync-data',
            data: allData,
            nonce: NONCE
          }, '*');
        }
      });
    }
  }, 10);
})();
`
);
const errorCSS = (
  /* css */
  `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: var(--z-base);
}
#frame[inert] {
  right: 5px;
  bottom: 5px;
  left: auto;
  top: auto;
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: bottom right;
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  right: 5px;
  bottom: 5px;
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 8px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  right: 5px;
  bottom: 5px;
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 3px;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`
);
function webComponentScript(base64HTML) {
  return (
    /* js */
    `
  (function() {
    try {
      const host = document.querySelector('nuxt-error-overlay');
      if (!host) return;
      
      const shadow = host.attachShadow({ mode: 'open' });
      
      // Create elements
      const style = document.createElement('style');
      style.textContent = ${JSON.stringify(errorCSS)};
      
      const iframe = document.createElement('iframe');
      iframe.id = 'frame';
      iframe.src = 'data:text/html;base64,${base64HTML}';
      iframe.title = 'Detailed error stack trace';
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
      
      const preview = document.createElement('div');
      preview.id = 'preview';
      
      const button = document.createElement('button');
      button.id = 'toggle';
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('type', 'button');
      button.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';
      
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.className = 'sr-only';
      
      // Update preview snapshot
      function updatePreview() {
        try {
          let previewIframe = preview.querySelector('iframe');
          if (!previewIframe) {
            previewIframe = document.createElement('iframe');
            previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
            previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
            preview.appendChild(previewIframe);
          }
          
          const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
          const cleanedHTML = document.documentElement.outerHTML
            .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
            .replace(/<script[^>]*>.*?<\\/script>/gs, '');
          
          const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
          iframeDoc.open();
          iframeDoc.write(doctype + cleanedHTML);
          iframeDoc.close();
        } catch (error) {
          console.error('Failed to update preview:', error);
        }
      }
      
      function toggleView() {
        const isMinimized = iframe.hasAttribute('inert');
        
        if (isMinimized) {
          updatePreview();
          iframe.removeAttribute('inert');
          button.setAttribute('aria-expanded', 'true');
          liveRegion.textContent = 'Showing detailed error view';
          setTimeout(function() {
            try { iframe.contentWindow.focus(); } catch {}
          }, 100);
        } else {
          iframe.setAttribute('inert', '');
          button.setAttribute('aria-expanded', 'false');
          liveRegion.textContent = 'Showing error page';
          button.focus();
        }
      }
      
      button.onclick = toggleView;
      
      document.addEventListener('keydown', function(e) {
        if ((e.key === 'Escape' || e.key === 'Esc') && !iframe.hasAttribute('inert')) {
          toggleView();
        }
      });
      
      // Append to shadow DOM
      shadow.appendChild(style);
      shadow.appendChild(liveRegion);
      shadow.appendChild(iframe);
      shadow.appendChild(preview);
      shadow.appendChild(button);
      
      // Initialize preview
      setTimeout(updatePreview, 100);
      
    } catch (error) {
      console.error('Failed to initialize Nuxt error overlay:', error);
    }
  })();
  `
  );
}
function generateErrorOverlayHTML(html) {
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
  const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
  const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
  return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return error500; });
    {
      errorObject.description = errorObject.message;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  {
    const prettyResponse = await defaultHandler(error, event, { json: false });
    return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body)}</body>`));
  }
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _JzzWIahK2EOrAzABZ7H_7_ObBXhoi5XxVV_MaD00Qg = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "C:/Users/Matias/Desktop/Proyecto-Web-1";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"}],"link":[{"rel":"preconnect","href":"https://fonts.googleapis.com"},{"rel":"preconnect","href":"https://fonts.gstatic.com","crossorigin":""},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"}],"style":[],"script":[],"noscript":[],"title":"Sistema de Gestión de Flota"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _P3AZspaSnJlkgrKPziweNGHOWyrpTk5W71i1JIMMhzU = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const plugins = [
  _JzzWIahK2EOrAzABZ7H_7_ObBXhoi5XxVV_MaD00Qg,
_P3AZspaSnJlkgrKPziweNGHOWyrpTk5W71i1JIMMhzU
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _Wf3ubM = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const SECRET$2 = process.env.JWT_SECRET || "super-secret-key";
const _ZINli9 = defineEventHandler((event) => {
  var _a, _b;
  const token = getCookie(event, "auth_token");
  if (!token) {
    event.context.user = null;
    return;
  }
  try {
    const payload = jwt.verify(token, SECRET$2);
    event.context.user = {
      id: Number((_a = payload.userId) != null ? _a : payload.sub),
      nombre: String((_b = payload.nombre) != null ? _b : ""),
      roles: Array.isArray(payload.roles) ? payload.roles : []
    };
  } catch {
    event.context.user = null;
  }
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (false),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('file://C:/Users/Matias/Desktop/Proyecto-Web-1/.nuxt//dist/server/server.mjs').then((r) => r.default || r);
const getClientManifest = () => import('file://C:/Users/Matias/Desktop/Proyecto-Web-1/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const precomputed = void 0 ;
  const renderer = createRenderer(createSSRApp, {
    precomputed,
    manifest: await getClientManifest() ,
    renderToString: renderToString$1,
    buildAssetsURL
  });
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const precomputed = void 0 ;
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
      const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
      const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
      const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
      return appTemplate + loaderTemplate;
    }
  });
  const renderer = createRenderer(() => () => {
  }, {
    precomputed,
    manifest: await getClientManifest() ,
    renderToString: () => spaTemplate,
    buildAssetsURL
  });
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", err);
    throw err;
  });
  if (ssrContext.payload?.error) {
    throw ssrContext.payload.error;
  }
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const _lazy_OMwMf8 = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_9WjZPQ = () => Promise.resolve().then(function () { return logout_post$1; });
const _lazy_NkNM57 = () => Promise.resolve().then(function () { return me_get$1; });
const _lazy_LeJK6_ = () => Promise.resolve().then(function () { return _codigo__get$1; });
const _lazy_ASSlaG = () => Promise.resolve().then(function () { return _codigo__post$1; });
const _lazy_8ZiJ1T = () => Promise.resolve().then(function () { return reset_post$1; });
const _lazy_MDrLTC = () => Promise.resolve().then(function () { return _id__delete$d; });
const _lazy_KPNhUC = () => Promise.resolve().then(function () { return _id__put$d; });
const _lazy_7JLT9Y = () => Promise.resolve().then(function () { return estados_get$1; });
const _lazy_CvtnRS = () => Promise.resolve().then(function () { return index_get$j; });
const _lazy__Z7tNW = () => Promise.resolve().then(function () { return index_post$d; });
const _lazy_zCaJGq = () => Promise.resolve().then(function () { return index_get$h; });
const _lazy_hsSwuZ = () => Promise.resolve().then(function () { return index_get$f; });
const _lazy_PkMDzX = () => Promise.resolve().then(function () { return _id__delete$b; });
const _lazy_5QBjQL = () => Promise.resolve().then(function () { return _id__put$b; });
const _lazy_CakvwV = () => Promise.resolve().then(function () { return estado_put$1; });
const _lazy_G3_I5J = () => Promise.resolve().then(function () { return catalogos_get$7; });
const _lazy_Tvo7DU = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_cnTIcw = () => Promise.resolve().then(function () { return index_post$b; });
const _lazy_fCgdlC = () => Promise.resolve().then(function () { return _id__delete$9; });
const _lazy_fLGyX6 = () => Promise.resolve().then(function () { return _id__put$9; });
const _lazy_cyKdky = () => Promise.resolve().then(function () { return catalogos_get$5; });
const _lazy_Xi_jpp = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_UzPLWh = () => Promise.resolve().then(function () { return index_post$9; });
const _lazy_X_GB4V = () => Promise.resolve().then(function () { return _id__delete$7; });
const _lazy_f_KUmG = () => Promise.resolve().then(function () { return _id__put$7; });
const _lazy_MV1Q9U = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_A2bo87 = () => Promise.resolve().then(function () { return index_post$7; });
const _lazy_1YaJTn = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_fGYES6 = () => Promise.resolve().then(function () { return _id__delete$5; });
const _lazy_NA6zXc = () => Promise.resolve().then(function () { return _id__put$5; });
const _lazy_a0lHzw = () => Promise.resolve().then(function () { return catalogos_get$3; });
const _lazy_26RTqA = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_8WCl9J = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_pEFikf = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_caKJJc = () => Promise.resolve().then(function () { return _id__put$3; });
const _lazy_HhoxUG = () => Promise.resolve().then(function () { return catalogos_get$1; });
const _lazy_kK3_he = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_YpkHk6 = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_nyeIOK = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_IZxSSA = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_Om9x7e = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_xKlK6j = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_hG0idG = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _Wf3ubM, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _ZINli9, lazy: false, middleware: true, method: undefined },
  { route: '/api/auth/login', handler: _lazy_OMwMf8, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/logout', handler: _lazy_9WjZPQ, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/me', handler: _lazy_NkNM57, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/password-tokens/:codigo', handler: _lazy_LeJK6_, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth/password-tokens/:codigo', handler: _lazy_ASSlaG, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/reset', handler: _lazy_8ZiJ1T, lazy: true, middleware: false, method: "post" },
  { route: '/api/buses/:id', handler: _lazy_MDrLTC, lazy: true, middleware: false, method: "delete" },
  { route: '/api/buses/:id', handler: _lazy_KPNhUC, lazy: true, middleware: false, method: "put" },
  { route: '/api/buses/estados', handler: _lazy_7JLT9Y, lazy: true, middleware: false, method: "get" },
  { route: '/api/buses', handler: _lazy_CvtnRS, lazy: true, middleware: false, method: "get" },
  { route: '/api/buses', handler: _lazy__Z7tNW, lazy: true, middleware: false, method: "post" },
  { route: '/api/conductor', handler: _lazy_zCaJGq, lazy: true, middleware: false, method: "get" },
  { route: '/api/conductor/turnos', handler: _lazy_hsSwuZ, lazy: true, middleware: false, method: "get" },
  { route: '/api/incidentes/:id', handler: _lazy_PkMDzX, lazy: true, middleware: false, method: "delete" },
  { route: '/api/incidentes/:id', handler: _lazy_5QBjQL, lazy: true, middleware: false, method: "put" },
  { route: '/api/incidentes/:id/estado', handler: _lazy_CakvwV, lazy: true, middleware: false, method: "put" },
  { route: '/api/incidentes/catalogos', handler: _lazy_G3_I5J, lazy: true, middleware: false, method: "get" },
  { route: '/api/incidentes', handler: _lazy_Tvo7DU, lazy: true, middleware: false, method: "get" },
  { route: '/api/incidentes', handler: _lazy_cnTIcw, lazy: true, middleware: false, method: "post" },
  { route: '/api/mantenimientos/:id', handler: _lazy_fCgdlC, lazy: true, middleware: false, method: "delete" },
  { route: '/api/mantenimientos/:id', handler: _lazy_fLGyX6, lazy: true, middleware: false, method: "put" },
  { route: '/api/mantenimientos/catalogos', handler: _lazy_cyKdky, lazy: true, middleware: false, method: "get" },
  { route: '/api/mantenimientos', handler: _lazy_Xi_jpp, lazy: true, middleware: false, method: "get" },
  { route: '/api/mantenimientos', handler: _lazy_UzPLWh, lazy: true, middleware: false, method: "post" },
  { route: '/api/mecanicos/:id', handler: _lazy_X_GB4V, lazy: true, middleware: false, method: "delete" },
  { route: '/api/mecanicos/:id', handler: _lazy_f_KUmG, lazy: true, middleware: false, method: "put" },
  { route: '/api/mecanicos', handler: _lazy_MV1Q9U, lazy: true, middleware: false, method: "get" },
  { route: '/api/mecanicos', handler: _lazy_A2bo87, lazy: true, middleware: false, method: "post" },
  { route: '/api/roles', handler: _lazy_1YaJTn, lazy: true, middleware: false, method: "get" },
  { route: '/api/talleres/:id', handler: _lazy_fGYES6, lazy: true, middleware: false, method: "delete" },
  { route: '/api/talleres/:id', handler: _lazy_NA6zXc, lazy: true, middleware: false, method: "put" },
  { route: '/api/talleres/catalogos', handler: _lazy_a0lHzw, lazy: true, middleware: false, method: "get" },
  { route: '/api/talleres', handler: _lazy_26RTqA, lazy: true, middleware: false, method: "get" },
  { route: '/api/talleres', handler: _lazy_8WCl9J, lazy: true, middleware: false, method: "post" },
  { route: '/api/turnos/:id', handler: _lazy_pEFikf, lazy: true, middleware: false, method: "delete" },
  { route: '/api/turnos/:id', handler: _lazy_caKJJc, lazy: true, middleware: false, method: "put" },
  { route: '/api/turnos/catalogos', handler: _lazy_HhoxUG, lazy: true, middleware: false, method: "get" },
  { route: '/api/turnos', handler: _lazy_kK3_he, lazy: true, middleware: false, method: "get" },
  { route: '/api/turnos', handler: _lazy_YpkHk6, lazy: true, middleware: false, method: "post" },
  { route: '/api/usuarios/:id', handler: _lazy_nyeIOK, lazy: true, middleware: false, method: "delete" },
  { route: '/api/usuarios/:id', handler: _lazy_IZxSSA, lazy: true, middleware: false, method: "put" },
  { route: '/api/usuarios', handler: _lazy_Om9x7e, lazy: true, middleware: false, method: "get" },
  { route: '/api/usuarios', handler: _lazy_xKlK6j, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_hG0idG, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_hG0idG, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = crypto$1;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "statusCode": 500, "statusMessage": "Internal server error", "description": "This page is temporarily unavailable.", "refresh": "Refresh this page" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage) + " | " + escapeHtml(messages.appName) + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class="antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide"><div class="max-w-520px text-center"><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]">` + escapeHtml(messages.statusCode) + '</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl">' + escapeHtml(messages.statusMessage) + '</h2><p class="mb-4 px-2 text-[#64748B] text-md">' + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

var _a;
const globalForPrisma = globalThis;
const prisma = (_a = globalForPrisma.prisma) != null ? _a : new PrismaClient({
  log: ["error", "warn"]
  // puedes agregar 'query' para debug
});
globalForPrisma.prisma = prisma;

const SECRET$1 = process.env.JWT_SECRET || "super-secret-key";
const IDLE_SECONDS = 60 * 5;
const REMEMBER_SECONDS = 60 * 60 * 24 * 7;
const login_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const body = await readBody(event);
    const usernameOrEmail = ((body == null ? void 0 : body.username) || "").trim();
    const password = ((body == null ? void 0 : body.password) || "").trim();
    const remember = Boolean(body == null ? void 0 : body.remember);
    if (!usernameOrEmail || !password) {
      setResponseStatus(event, 400);
      return { success: false, message: "Faltan credenciales" };
    }
    const user = await prisma.usuario.findFirst({
      where: {
        OR: [
          { username: { equals: usernameOrEmail, mode: "insensitive" } },
          { email: { equals: usernameOrEmail, mode: "insensitive" } }
        ]
      },
      include: {
        estado_usuario: true,
        roles: { include: { rol: true } }
      }
    });
    const DUMMY = "$2a$10$cKqzYh8gqVbWjT3s1gkW7uqcd2o5b9bGZz8wLQp0m9pJw3y9mVJmu";
    if (!user) {
      await bcrypt.compare(password, DUMMY);
      setResponseStatus(event, 401);
      return { success: false, message: "Usuario o contrase\xF1a incorrectos" };
    }
    const estado = (((_a = user.estado_usuario) == null ? void 0 : _a.nombre_estado) || "").toLowerCase();
    if (estado !== "activo") {
      setResponseStatus(event, 403);
      return { success: false, message: "Usuario inactivo" };
    }
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      setResponseStatus(event, 401);
      return { success: false, message: "Usuario o contrase\xF1a incorrectos" };
    }
    const roles = user.roles.map((r) => (r.rol.nombre_rol || "").toUpperCase());
    const expiresIn = remember ? REMEMBER_SECONDS : IDLE_SECONDS;
    const payload = {
      sub: user.id_usuario,
      nombre: `${user.nombre} ${user.apellido}`.trim(),
      username: user.username,
      roles
    };
    const token = jwt.sign(payload, SECRET$1, { expiresIn });
    setCookie(event, "auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: expiresIn
    });
    return {
      success: true,
      user: {
        id: user.id_usuario,
        nombre: payload.nombre,
        roles,
        username: user.username
      }
    };
  } catch (e) {
    console.error(e);
    setResponseStatus(event, 500);
    return { success: false, message: "Error interno" };
  }
});

const login_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: login_post
}, Symbol.toStringTag, { value: 'Module' }));

const logout_post = defineEventHandler((event) => {
  deleteCookie(event, "auth_token", { path: "/" });
  return { success: true };
});

const logout_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: logout_post
}, Symbol.toStringTag, { value: 'Module' }));

const SECRET = process.env.JWT_SECRET || "super-secret-key";
const AuthPayloadSchema = object({
  sub: number(),
  nombre: string(),
  username: optional(string()),
  roles: array(string()),
  iat: number(),
  exp: number()
});
const me_get = defineEventHandler(async (event) => {
  var _a;
  try {
    const token = getCookie(event, "auth_token");
    if (!token) {
      setResponseStatus(event, 401);
      return { user: null };
    }
    const decoded = jwt.verify(token, SECRET);
    if (typeof decoded !== "object" || decoded === null) {
      setResponseStatus(event, 401);
      return { user: null };
    }
    const result = safeParse(AuthPayloadSchema, decoded);
    if (!result.success) {
      setResponseStatus(event, 401);
      return { user: null };
    }
    const payload = result.output;
    return {
      user: {
        id: payload.sub,
        nombre: payload.nombre,
        username: payload.username,
        roles: (_a = payload.roles) != null ? _a : []
      }
    };
  } catch {
    setResponseStatus(event, 401);
    return { user: null };
  }
});

const me_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: me_get
}, Symbol.toStringTag, { value: 'Module' }));

const _codigo__get = defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  const codigo = String(getRouterParam(event, "codigo") || "");
  if (!codigo) throw createError({ statusCode: 400, message: "Token requerido" });
  const row = await prisma.tokenRestablecimiento.findUnique({ where: { codigo_token: codigo } });
  if (!row) throw createError({ statusCode: 404, message: "Token inv\xE1lido" });
  if (row.fecha_expiracion < /* @__PURE__ */ new Date()) throw createError({ statusCode: 410, message: "Token expirado" });
  if (row.fecha_uso) throw createError({ statusCode: 409, message: "Token ya utilizado" });
  return { ok: true, id_usuario: row.id_usuario };
});

const _codigo__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _codigo__get
}, Symbol.toStringTag, { value: 'Module' }));

async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

const _codigo__post = defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  const codigo = String(getRouterParam(event, "codigo") || "");
  const body = await readBody(event);
  const pw = ((body == null ? void 0 : body.password) || "").trim();
  if (!codigo) throw createError({ statusCode: 400, message: "Token requerido" });
  if (pw.length < 8) throw createError({ statusCode: 400, message: "La contrase\xF1a debe tener al menos 8 caracteres" });
  const token = await prisma.tokenRestablecimiento.findUnique({ where: { codigo_token: codigo } });
  if (!token) throw createError({ statusCode: 404, message: "Token inv\xE1lido" });
  if (token.fecha_expiracion < /* @__PURE__ */ new Date()) throw createError({ statusCode: 410, message: "Token expirado" });
  if (token.fecha_uso) throw createError({ statusCode: 409, message: "Token ya utilizado" });
  const password_hash = await hashPassword(pw);
  await prisma.$transaction([
    prisma.usuario.update({
      where: { id_usuario: token.id_usuario },
      data: { password_hash }
    }),
    prisma.tokenRestablecimiento.update({
      where: { codigo_token: codigo },
      data: { fecha_uso: /* @__PURE__ */ new Date() }
    })
  ]);
  return { ok: true };
});

const _codigo__post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _codigo__post
}, Symbol.toStringTag, { value: 'Module' }));

const reset_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.token || !body.newPassword) {
    throw createError({ statusCode: 400, message: "Datos incompletos" });
  }
  const tokenRecord = await prisma.tokenRestablecimiento.findFirst({
    where: { codigo_token: body.token },
    include: { usuario: true }
  });
  if (!tokenRecord || tokenRecord.fecha_expiracion < /* @__PURE__ */ new Date()) {
    throw createError({ statusCode: 400, message: "Token inv\xE1lido o expirado" });
  }
  const newHash = await hashPassword(body.newPassword);
  await prisma.usuario.update({
    where: { id_usuario: tokenRecord.id_usuario },
    data: { password_hash: newHash }
  });
  await prisma.tokenRestablecimiento.delete({
    where: { codigo_token: body.token }
  });
  return { message: "Contrase\xF1a actualizada correctamente." };
});

const reset_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: reset_post
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$c = defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
  }
  try {
    await prisma.bus.delete({ where: { id_bus: id } });
    return { ok: true, message: "Bus eliminado correctamente" };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2025") {
      throw createError({ statusCode: 404, message: "Bus no encontrado" });
    }
    console.error("Error en DELETE /api/buses:", err);
    throw createError({ statusCode: 500, message: "Error al eliminar el bus" });
  }
});

const _id__delete$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$c
}, Symbol.toStringTag, { value: 'Module' }));

const EstadoBusEnum = picklist(["OPERATIVO", "MANTENIMIENTO", "FUERA DE SERVICIO"]);
const CombustibleEnum = picklist(["DIESEL", "GASOLINA", "GAS", "ELECTRICO"]);
const EnteroFromString = pipe(
  string(),
  regex(/^\d+$/, "Debe ser un n\xFAmero entero"),
  transform((v) => parseInt(v, 10))
);
const YYYYMMDD$1 = pipe(
  string(),
  regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener formato YYYY-MM-DD")
);
const BusCreateSchema = object({
  patente: pipe(
    string("La patente es obligatoria"),
    regex(/^[A-Z0-9-]+$/i, "La patente solo puede contener letras, n\xFAmeros y guiones")
  ),
  modelo: pipe(
    string("El modelo es obligatorio"),
    minLength(2, "El modelo debe tener al menos 2 caracteres")
  ),
  // FE envía "annio"; lo convertiremos a number
  annio: union([
    pipe(string(), regex(/^\d{4}$/, "El a\xF1o debe tener 4 d\xEDgitos"), transform((v) => parseInt(v, 10))),
    pipe(number("El a\xF1o debe ser un n\xFAmero"), minValue(1900, "El a\xF1o no puede ser menor que 1900"), maxValue((/* @__PURE__ */ new Date()).getFullYear() + 1, "El a\xF1o no puede ser mayor que el actual+1"))
  ]),
  km: optional(union([EnteroFromString, number("El kilometraje debe ser num\xE9rico")]), 0),
  estado: EstadoBusEnum,
  // ⬇️ nuevos campos (opcionales, cambia a requeridos si lo necesitas)
  marca: optional(string()),
  combustible: optional(CombustibleEnum),
  capacidad: optional(union([EnteroFromString, number()])),
  fecha_revision_tecnica: optional(YYYYMMDD$1),
  fecha_extintor: optional(YYYYMMDD$1)
});
const BusUpdateSchema = object({
  patente: optional(pipe(string(), regex(/^[A-Z0-9-]+$/i, "Formato de patente inv\xE1lido"))),
  modelo: optional(string("El modelo debe ser texto")),
  annio: optional(number("El a\xF1o debe ser num\xE9rico")),
  km: optional(number("El kilometraje debe ser num\xE9rico")),
  estado: optional(EstadoBusEnum),
  marca: optional(string()),
  combustible: optional(CombustibleEnum),
  capacidad: optional(number()),
  fecha_revision_tecnica: optional(YYYYMMDD$1),
  fecha_extintor: optional(YYYYMMDD$1)
});

function toDateOrNull(ymd) {
  if (!ymd) return null;
  const [y, m, d] = ymd.split("-").map((n) => parseInt(n, 10));
  if (!y || !m || !d) return null;
  return new Date(Date.UTC(y, m - 1, d));
}

const _id__put$c = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  try {
    const id = Number(getRouterParam(event, "id"));
    if (!id || Number.isNaN(id)) {
      throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
    }
    const body = await readBody(event);
    const result = safeParse(BusUpdateSchema, body);
    if (!result.success) {
      const mensajes = result.issues.map((i) => i.message).join(", ");
      throw createError({ statusCode: 400, message: mensajes });
    }
    const data = result.output;
    const bus = await prisma.bus.findUnique({ where: { id_bus: id } });
    if (!bus) throw createError({ statusCode: 404, message: "Bus no encontrado" });
    const datos = {};
    if (data.patente) datos.patente = data.patente.toUpperCase();
    if (data.modelo !== void 0) datos.modelo = data.modelo;
    if (data.annio !== void 0) datos.anio = data.annio;
    if (data.km !== void 0) datos.kilometraje = data.km;
    if (data.marca !== void 0) datos.marca = data.marca;
    if (data.combustible !== void 0) datos.combustible = data.combustible;
    if (data.capacidad !== void 0) datos.capacidad = data.capacidad;
    if (data.fecha_revision_tecnica !== void 0) datos.fecha_revision_tecnica = toDateOrNull(data.fecha_revision_tecnica);
    if (data.fecha_extintor !== void 0) datos.fecha_extintor = toDateOrNull(data.fecha_extintor);
    if (data.estado) {
      const est = await prisma.estadoBus.findFirst({ where: { nombre_estado: data.estado } });
      if (!est) throw createError({ statusCode: 400, message: "Estado inv\xE1lido" });
      datos.id_estado_bus = est.id_estado_bus;
    }
    const actualizado = await prisma.bus.update({
      where: { id_bus: id },
      data: datos,
      include: { estado_bus: true }
    });
    return {
      item: {
        id: actualizado.id_bus,
        plate: actualizado.patente,
        model: actualizado.modelo,
        brand: actualizado.marca,
        fuel: actualizado.combustible,
        year: actualizado.anio,
        km: (_a = actualizado.kilometraje) != null ? _a : 0,
        capacidad: (_b = actualizado.capacidad) != null ? _b : 0,
        fechaRevisionTecnica: (_d = (_c = actualizado.fecha_revision_tecnica) == null ? void 0 : _c.toISOString().slice(0, 10)) != null ? _d : null,
        fechaExtintor: (_f = (_e = actualizado.fecha_extintor) == null ? void 0 : _e.toISOString().slice(0, 10)) != null ? _f : null,
        estado: actualizado.estado_bus.nombre_estado
      }
    };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2025") {
      throw createError({ statusCode: 404, message: "Bus no encontrado" });
    }
    if (err == null ? void 0 : err.statusCode) throw err;
    console.error("Error en PUT /api/buses:", err);
    throw createError({ statusCode: 500, message: "Error al actualizar el bus" });
  }
});

const _id__put$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$c
}, Symbol.toStringTag, { value: 'Module' }));

const estados_get = defineEventHandler(async () => {
  const rows = await prisma.estadoBus.findMany({
    orderBy: { nombre_estado: "asc" }
  });
  return { items: rows.map((r) => r.nombre_estado) };
});

const estados_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: estados_get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$i = defineEventHandler(async (event) => {
  const { q = "", estado = "" } = getQuery$1(event);
  const where = {};
  if (q) {
    where.OR = [
      { patente: { contains: q, mode: "insensitive" } },
      { modelo: { contains: q, mode: "insensitive" } },
      { marca: { contains: q, mode: "insensitive" } }
    ];
  }
  if (estado) {
    where.estado_bus = { nombre_estado: String(estado) };
  }
  const rows = await prisma.bus.findMany({
    where,
    include: { estado_bus: true },
    orderBy: { id_bus: "asc" }
  });
  const todayYMD = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const items = rows.map((r) => {
    var _a, _b;
    const fechaExt = r.fecha_revision_tecnica ? r.fecha_revision_tecnica.toISOString().slice(0, 10) : null;
    const fechaExtintor = r.fecha_extintor ? r.fecha_extintor.toISOString().slice(0, 10) : null;
    return {
      id: r.id_bus,
      plate: r.patente,
      model: r.modelo,
      brand: r.marca,
      fuel: r.combustible,
      year: r.anio,
      km: (_a = r.kilometraje) != null ? _a : 0,
      capacidad: (_b = r.capacidad) != null ? _b : 0,
      fechaRevisionTecnica: fechaExt,
      fechaExtintor,
      // Derivado útil (opcional): ¿extintor vigente? (fecha futura o hoy)
      extintorVigente: !!fechaExtintor && fechaExtintor >= todayYMD,
      estado: r.estado_bus.nombre_estado
    };
  });
  return { items };
});

const index_get$j = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$i
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$c = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  try {
    const body = await readBody(event);
    const result = safeParse(BusCreateSchema, body);
    if (!result.success) {
      const mensajes = result.issues.map((i) => i.message).join(", ");
      throw createError({ statusCode: 400, message: mensajes });
    }
    const data = result.output;
    let estado = await prisma.estadoBus.findFirst({ where: { nombre_estado: data.estado } });
    if (!estado) estado = await prisma.estadoBus.create({ data: { nombre_estado: data.estado } });
    const creado = await prisma.bus.create({
      data: {
        patente: data.patente.toUpperCase(),
        modelo: data.modelo,
        anio: data.annio,
        // annio (req) → anio (DB)
        kilometraje: (_a = data.km) != null ? _a : 0,
        // ⬇️ nuevos campos
        marca: (_b = data.marca) != null ? _b : null,
        combustible: (_c = data.combustible) != null ? _c : null,
        capacidad: (_d = data.capacidad) != null ? _d : null,
        fecha_revision_tecnica: toDateOrNull(data.fecha_revision_tecnica),
        fecha_extintor: toDateOrNull(data.fecha_extintor),
        id_estado_bus: estado.id_estado_bus
      },
      include: { estado_bus: true }
    });
    return {
      item: {
        id: creado.id_bus,
        plate: creado.patente,
        model: creado.modelo,
        brand: creado.marca,
        fuel: creado.combustible,
        year: creado.anio,
        km: creado.kilometraje,
        capacidad: creado.capacidad,
        fechaRevisionTecnica: (_f = (_e = creado.fecha_revision_tecnica) == null ? void 0 : _e.toISOString().slice(0, 10)) != null ? _f : null,
        fechaExtintor: (_h = (_g = creado.fecha_extintor) == null ? void 0 : _g.toISOString().slice(0, 10)) != null ? _h : null,
        estado: creado.estado_bus.nombre_estado
      }
    };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2002") {
      throw createError({ statusCode: 409, message: "La patente ya existe" });
    }
    if (err == null ? void 0 : err.statusCode) throw err;
    console.error("Error en POST /api/buses:", err);
    throw createError({ statusCode: 500, message: "Error al crear el bus" });
  }
});

const index_post$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$c
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$g = defineEventHandler(async (event) => {
  var _a, _b;
  setHeader(event, "Cache-Control", "no-store");
  const query = getQuery$1(event);
  const q = ((_a = query.q) == null ? void 0 : _a.toString().trim()) || "";
  const estado = ((_b = query.estado) == null ? void 0 : _b.toString().trim().toUpperCase()) || "";
  const incluirPropietario = query.incluirPropietario === true || query.incluirPropietario === "true" || query.incluirPropietario === "1";
  const rolesDeseados = incluirPropietario ? ["CONDUCTOR", "PROPIETARIO"] : ["CONDUCTOR"];
  const where = {
    roles: {
      some: {
        estado: "ACTIVO",
        rol: {
          OR: rolesDeseados.map((nombre) => ({
            nombre_rol: { equals: nombre, mode: "insensitive" }
          }))
        }
      }
    }
  };
  if (q) {
    where.OR = [
      { nombre: { contains: q, mode: "insensitive" } },
      { apellido: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { username: { contains: q, mode: "insensitive" } },
      { telefono: { contains: q, mode: "insensitive" } },
      { licencia_con: { contains: q, mode: "insensitive" } }
    ];
  }
  if (estado === "ACTIVO" || estado === "INACTIVO") {
    where.estado_usuario = { is: { nombre_estado: estado } };
  }
  const rows = await prisma.usuario.findMany({
    where,
    include: { estado_usuario: true, roles: { include: { rol: true } } },
    orderBy: { id_usuario: "asc" }
  });
  return {
    items: rows.map((u) => {
      var _a2, _b2, _c, _d, _e, _f;
      return {
        id: u.id_usuario,
        rut: (_a2 = u.username) != null ? _a2 : "",
        nombre: [u.nombre, u.apellido].filter(Boolean).join(" "),
        email: (_b2 = u.email) != null ? _b2 : "",
        telefono: (_c = u.telefono) != null ? _c : "",
        licencia: (_d = u.licencia_con) != null ? _d : "",
        estado: (_f = (_e = u.estado_usuario) == null ? void 0 : _e.nombre_estado) != null ? _f : "",
        roles: (u.roles || []).filter((r) => r.estado === "ACTIVO").map((r) => {
          var _a3;
          return (_a3 = r.rol) == null ? void 0 : _a3.nombre_rol;
        }).filter(Boolean)
      };
    })
  };
});

const index_get$h = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$g
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$e = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  setHeader(event, "Cache-Control", "no-store");
  const q = getQuery$1(event);
  let idUsuario = Number((_c = (_b = (_a = event.context) == null ? void 0 : _a.auth) == null ? void 0 : _b.user) == null ? void 0 : _c.id_usuario) || Number((_f = (_e = (_d = event.context) == null ? void 0 : _d.auth) == null ? void 0 : _e.user) == null ? void 0 : _f.id) || 0;
  if (!idUsuario && q.id_usuario) idUsuario = Number(q.id_usuario);
  if (!idUsuario) {
    throw createError({ statusCode: 400, message: "Falta id_usuario del conductor" });
  }
  const whereAny = { id_usuario: idUsuario };
  if (q.from) whereAny.hora_inicio = { gte: new Date(String(q.from)) };
  if (q.to) {
    whereAny.hora_fin = {
      ...whereAny.hora_fin || {},
      lte: new Date(String(q.to))
    };
  }
  const rows = await prisma.turnoConductor.findMany({
    where: whereAny,
    include: { bus: true, estado: true },
    orderBy: { hora_inicio: "desc" }
  });
  return {
    items: rows.map((t) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g;
      return {
        id: t.id_turno,
        id_usuario: t.id_usuario,
        fecha: (_a2 = t.fecha) != null ? _a2 : null,
        hora_inicio: t.hora_inicio,
        hora_fin: t.hora_fin,
        // SOLO patente (como pediste)
        bus: (_c2 = (_b2 = t.bus) == null ? void 0 : _b2.patente) != null ? _c2 : "\u2014",
        estado: (_e2 = (_d2 = t.estado) == null ? void 0 : _d2.nombre_estado) != null ? _e2 : null,
        titulo: (_f2 = t.titulo) != null ? _f2 : null,
        descripcion: (_g = t.descripcion) != null ? _g : null
      };
    })
  };
});

const index_get$f = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$e
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$a = defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
  await prisma.incidente.delete({ where: { id_incidente: id } });
  return { ok: true };
});

const _id__delete$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$a
}, Symbol.toStringTag, { value: 'Module' }));

const CrearIncidenteDto = v.object({
  id_bus: v.number("id_bus es requerido"),
  id_usuario: v.number("id_usuario es requerido"),
  descripcion: v.optional(
    v.pipe(
      v.string("descripcion debe ser texto"),
      v.maxLength(5e3, "M\xE1ximo 5000 caracteres")
    )
  ),
  // string | Date  ->  Date  ->  chequeo Date válida
  fecha: v.pipe(
    v.union([v.string(), v.date()]),
    v.transform((x) => x instanceof Date ? x : new Date(x)),
    v.check((d) => d instanceof Date && !isNaN(d.getTime()), "Fecha inv\xE1lida")
  ),
  urgencia: v.optional(
    v.pipe(
      v.string("urgencia debe ser texto"),
      v.maxLength(20, "M\xE1ximo 20 caracteres")
    )
  ),
  ubicacion: v.optional(
    v.pipe(
      v.string("ubicacion debe ser texto"),
      v.maxLength(200, "M\xE1ximo 200 caracteres")
    )
  ),
  id_estado_incidente: v.optional(v.number()),
  id_tipo_incidente: v.number("id_tipo_incidente es requerido")
});
const ActualizarIncidenteDto = v.partial(CrearIncidenteDto);
const CambiarEstadoDto = v.object({
  id_estado_incidente: v.number("id_estado_incidente es requerido")
});
const ListaQueryDto = v.object({
  // string -> number -> min
  page: v.optional(
    v.pipe(
      v.string(),
      v.transform((x) => Number(x)),
      v.check((n) => Number.isFinite(n), "page debe ser n\xFAmero"),
      v.minValue(1, "page >= 1")
    )
  ),
  pageSize: v.optional(
    v.pipe(
      v.string(),
      v.transform((x) => Number(x)),
      v.check((n) => Number.isFinite(n), "pageSize debe ser n\xFAmero"),
      v.minValue(1, "pageSize >= 1"),
      v.maxValue(100, "pageSize <= 100")
    )
  ),
  sortBy: v.optional(v.picklist(["fecha", "id_incidente"])),
  sortOrder: v.optional(v.picklist(["asc", "desc"])),
  // enteros desde querystring
  id_bus: v.optional(
    v.pipe(
      v.string(),
      v.transform((x) => Number(x)),
      v.check((n) => Number.isFinite(n), "id_bus debe ser n\xFAmero")
    )
  ),
  id_usuario: v.optional(
    v.pipe(
      v.string(),
      v.transform((x) => Number(x)),
      v.check((n) => Number.isFinite(n), "id_usuario debe ser n\xFAmero")
    )
  ),
  id_estado_incidente: v.optional(
    v.pipe(
      v.string(),
      v.transform((x) => Number(x)),
      v.check((n) => Number.isFinite(n), "id_estado_incidente debe ser n\xFAmero")
    )
  ),
  id_tipo_incidente: v.optional(
    v.pipe(
      v.string(),
      v.transform((x) => Number(x)),
      v.check((n) => Number.isFinite(n), "id_tipo_incidente debe ser n\xFAmero")
    )
  ),
  urgencia: v.optional(v.string()),
  // string -> Date -> chequeo
  desde: v.optional(
    v.pipe(
      v.string(),
      v.transform((x) => new Date(x)),
      v.check((d) => !isNaN(d.getTime()), "Fecha inv\xE1lida")
    )
  ),
  hasta: v.optional(
    v.pipe(
      v.string(),
      v.transform((x) => new Date(x)),
      v.check((d) => !isNaN(d.getTime()), "Fecha inv\xE1lida")
    )
  ),
  q: v.optional(
    v.pipe(
      v.string("q debe ser texto"),
      v.maxLength(200, "M\xE1ximo 200 caracteres")
    )
  )
});

const _id__put$a = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
  const bodyRaw = await readBody(event);
  const parsed = safeParse(ActualizarIncidenteDto, bodyRaw);
  if (!parsed.success) {
    const msg = ((_b = (_a = parsed.issues) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) || "Datos inv\xE1lidos";
    throw createError({ statusCode: 400, message: msg });
  }
  const b = parsed.output;
  const data = {};
  if (typeof b.id_bus === "number") data.id_bus = b.id_bus;
  if (typeof b.id_usuario === "number") data.id_usuario = b.id_usuario;
  if (b.descripcion !== void 0) data.descripcion = (_c = b.descripcion) != null ? _c : null;
  if (b.fecha !== void 0) data.fecha = b.fecha;
  if (b.urgencia !== void 0) data.urgencia = (_d = b.urgencia) != null ? _d : null;
  if (b.ubicacion !== void 0) data.ubicacion = (_e = b.ubicacion) != null ? _e : null;
  if (typeof b.id_estado_incidente === "number") data.id_estado_incidente = b.id_estado_incidente;
  if (typeof b.id_tipo_incidente === "number") data.id_tipo_incidente = b.id_tipo_incidente;
  const updated = await prisma.incidente.update({
    where: { id_incidente: id },
    data,
    include: { bus: true, usuario: true, estado: true, tipo: true }
  });
  return {
    item: {
      id: updated.id_incidente,
      id_bus: updated.id_bus,
      id_usuario: updated.id_usuario,
      fecha: updated.fecha,
      descripcion: (_f = updated.descripcion) != null ? _f : "",
      urgencia: (_g = updated.urgencia) != null ? _g : "",
      ubicacion: (_h = updated.ubicacion) != null ? _h : "",
      id_estado_incidente: updated.id_estado_incidente,
      estado: (_j = (_i = updated.estado) == null ? void 0 : _i.nombre_estado) != null ? _j : "",
      id_tipo_incidente: updated.id_tipo_incidente,
      tipo: (_l = (_k = updated.tipo) == null ? void 0 : _k.nombre_tipo) != null ? _l : "",
      bus: updated.bus ? `${(_m = updated.bus.patente) != null ? _m : ""} - ${(_n = updated.bus.modelo) != null ? _n : ""}` : "",
      usuario: updated.usuario ? `${(_o = updated.usuario.nombre) != null ? _o : ""} ${(_p = updated.usuario.apellido) != null ? _p : ""}`.trim() : ""
    }
  };
});

const _id__put$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$a
}, Symbol.toStringTag, { value: 'Module' }));

const estado_put = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
  const bodyRaw = await readBody(event);
  const parsed = safeParse(CambiarEstadoDto, bodyRaw);
  if (!parsed.success) {
    const msg = ((_b = (_a = parsed.issues) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) || "Datos inv\xE1lidos";
    throw createError({ statusCode: 400, message: msg });
  }
  const updated = await prisma.incidente.update({
    where: { id_incidente: id },
    data: { id_estado_incidente: parsed.output.id_estado_incidente },
    include: { estado: true }
  });
  return { ok: true, id: updated.id_incidente, estado: (_d = (_c = updated.estado) == null ? void 0 : _c.nombre_estado) != null ? _d : "" };
});

const estado_put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: estado_put
}, Symbol.toStringTag, { value: 'Module' }));

const catalogos_get$6 = defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  const [buses, estados, tipos] = await Promise.all([
    prisma.bus.findMany({
      select: { id_bus: true, patente: true, modelo: true },
      orderBy: { id_bus: "asc" }
    }),
    prisma.estadoIncidente.findMany({
      select: { id_estado_incidente: true, nombre_estado: true },
      orderBy: { id_estado_incidente: "asc" }
      // o por nombre si prefieres
    }),
    prisma.tipoIncidente.findMany({
      select: { id_tipo_incidente: true, nombre_tipo: true },
      orderBy: { id_tipo_incidente: "asc" }
    })
  ]);
  return {
    buses: buses.map((b) => ({
      id: Number(b.id_bus),
      label: b.patente ? b.modelo ? `${b.patente} - ${b.modelo}` : b.patente : `BUS #${b.id_bus}`
    })),
    // 👇 Enviar { id, nombre } (no solo el string)
    estados: estados.map((e) => ({
      id: Number(e.id_estado_incidente),
      nombre: String(e.nombre_estado)
    })),
    tipos: tipos.map((t) => ({
      id: Number(t.id_tipo_incidente),
      nombre: String(t.nombre_tipo)
    }))
  };
});

const catalogos_get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: catalogos_get$6
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$c = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  setHeader(event, "Cache-Control", "no-store");
  const parsed = safeParse(ListaQueryDto, getQuery$1(event));
  if (!parsed.success) {
    const msg = ((_b = (_a = parsed.issues) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) || "Par\xE1metros inv\xE1lidos";
    throw createError({ statusCode: 400, message: msg });
  }
  const q = parsed.output;
  const page = (_c = q.page) != null ? _c : 1;
  const pageSize = (_d = q.pageSize) != null ? _d : 20;
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const where = {};
  if (q.id_bus) where.id_bus = q.id_bus;
  if (q.id_usuario) where.id_usuario = q.id_usuario;
  if (q.id_estado_incidente) where.id_estado_incidente = q.id_estado_incidente;
  if (q.id_tipo_incidente) where.id_tipo_incidente = q.id_tipo_incidente;
  if (q.urgencia) where.urgencia = { contains: q.urgencia, mode: "insensitive" };
  if (q.desde || q.hasta) {
    where.fecha = {};
    if (q.desde) where.fecha.gte = q.desde;
    if (q.hasta) where.fecha.lte = q.hasta;
  }
  if (q.q) {
    where.OR = [
      { descripcion: { contains: q.q, mode: "insensitive" } },
      { ubicacion: { contains: q.q, mode: "insensitive" } },
      { bus: { patente: { contains: q.q, mode: "insensitive" } } },
      { usuario: { nombre: { contains: q.q, mode: "insensitive" } } },
      { usuario: { apellido: { contains: q.q, mode: "insensitive" } } }
    ];
  }
  const sortBy = (_e = q.sortBy) != null ? _e : "fecha";
  const sortOrder = (_f = q.sortOrder) != null ? _f : "desc";
  const [total, rows] = await Promise.all([
    prisma.incidente.count({ where }),
    prisma.incidente.findMany({
      where,
      include: { bus: true, usuario: true, estado: true, tipo: true },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take
    })
  ]);
  const items = rows.map((x) => {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h, _i, _j, _k;
    return {
      id: x.id_incidente,
      id_bus: x.id_bus,
      id_usuario: x.id_usuario,
      fecha: x.fecha,
      descripcion: (_a2 = x.descripcion) != null ? _a2 : "",
      urgencia: (_b2 = x.urgencia) != null ? _b2 : "",
      ubicacion: (_c2 = x.ubicacion) != null ? _c2 : "",
      id_estado_incidente: x.id_estado_incidente,
      estado: (_e2 = (_d2 = x.estado) == null ? void 0 : _d2.nombre_estado) != null ? _e2 : "",
      id_tipo_incidente: x.id_tipo_incidente,
      tipo: (_g = (_f2 = x.tipo) == null ? void 0 : _f2.nombre_tipo) != null ? _g : "",
      bus: x.bus ? `${(_h = x.bus.patente) != null ? _h : ""} - ${(_i = x.bus.modelo) != null ? _i : ""}` : "",
      usuario: x.usuario ? `${(_j = x.usuario.nombre) != null ? _j : ""} ${(_k = x.usuario.apellido) != null ? _k : ""}`.trim() : ""
    };
  });
  return {
    meta: { page, pageSize, total, pages: Math.ceil(total / pageSize) },
    items
  };
});

const index_get$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$c
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$a = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  const bodyRaw = await readBody(event);
  const parsed = safeParse(CrearIncidenteDto, bodyRaw);
  if (!parsed.success) {
    const msg = ((_b = (_a = parsed.issues) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) || "Datos inv\xE1lidos";
    throw createError({ statusCode: 400, message: msg });
  }
  const body = parsed.output;
  let estadoId = body.id_estado_incidente;
  if (!estadoId) {
    const estado = await prisma.estadoIncidente.findFirst({
      where: { nombre_estado: "REPORTADO" }
    });
    estadoId = estado ? estado.id_estado_incidente : (await prisma.estadoIncidente.create({
      data: {
        nombre_estado: "REPORTADO",
        descripcion: "Levantado por usuario"
      }
    })).id_estado_incidente;
  }
  const created = await prisma.incidente.create({
    data: {
      id_bus: body.id_bus,
      id_usuario: body.id_usuario,
      descripcion: (_c = body.descripcion) != null ? _c : null,
      fecha: body.fecha,
      // ya viene Date por el DTO
      urgencia: (_d = body.urgencia) != null ? _d : null,
      ubicacion: (_e = body.ubicacion) != null ? _e : null,
      id_estado_incidente: estadoId,
      id_tipo_incidente: body.id_tipo_incidente
    },
    include: { bus: true, usuario: true, estado: true, tipo: true }
  });
  return {
    item: {
      id: created.id_incidente,
      id_bus: created.id_bus,
      id_usuario: created.id_usuario,
      fecha: created.fecha,
      descripcion: (_f = created.descripcion) != null ? _f : "",
      urgencia: (_g = created.urgencia) != null ? _g : "",
      ubicacion: (_h = created.ubicacion) != null ? _h : "",
      id_estado_incidente: created.id_estado_incidente,
      estado: (_j = (_i = created.estado) == null ? void 0 : _i.nombre_estado) != null ? _j : "",
      id_tipo_incidente: created.id_tipo_incidente,
      tipo: (_l = (_k = created.tipo) == null ? void 0 : _k.nombre_tipo) != null ? _l : "",
      bus: created.bus ? `${(_m = created.bus.patente) != null ? _m : ""} - ${(_n = created.bus.modelo) != null ? _n : ""}` : "",
      usuario: created.usuario ? `${(_o = created.usuario.nombre) != null ? _o : ""} ${(_p = created.usuario.apellido) != null ? _p : ""}`.trim() : ""
    }
  };
});

const index_post$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$a
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$8 = defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
  try {
    await prisma.mantenimiento.delete({ where: { id_mantenimiento: id } });
    return { ok: true, message: "Mantenimiento eliminado correctamente" };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2025")
      throw createError({ statusCode: 404, message: "Mantenimiento no encontrado" });
    throw createError({ statusCode: 500, message: "Error al eliminar mantenimiento" });
  }
});

const _id__delete$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$8
}, Symbol.toStringTag, { value: 'Module' }));

const YYYYMMDD = pipe(
  string("La fecha es obligatoria"),
  regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener formato YYYY-MM-DD")
);
const IntFromString = pipe(
  string(),
  regex(/^\d+$/, "Debe ser un entero"),
  transform((v) => parseInt(v, 10))
);
const NumFromString = pipe(
  string(),
  regex(/^\d+(\.\d+)?$/, "Debe ser num\xE9rico"),
  transform((v) => parseFloat(v))
);
const MantenimientoCreateSchema = object({
  id_bus: union([number(), IntFromString]),
  id_taller: union([number(), IntFromString]),
  id_tipo_mantenimiento: union([number(), IntFromString]),
  id_estado_mantenimiento: union([number(), IntFromString]),
  fecha: YYYYMMDD,
  costo: optional(union([number(), NumFromString])),
  observaciones: optional(pipe(string(), minLength(0)))
});
const MantenimientoUpdateSchema = object({
  id_bus: optional(union([number(), IntFromString])),
  id_taller: optional(union([number(), IntFromString])),
  id_tipo_mantenimiento: optional(union([number(), IntFromString])),
  id_estado_mantenimiento: optional(union([number(), IntFromString])),
  fecha: optional(YYYYMMDD),
  costo: optional(union([number(), NumFromString])),
  observaciones: optional(pipe(string(), minLength(0)))
});
object({
  q: optional(string()),
  id_bus: optional(union([number(), IntFromString])),
  id_taller: optional(union([number(), IntFromString])),
  id_tipo_mantenimiento: optional(union([number(), IntFromString])),
  id_estado_mantenimiento: optional(union([number(), IntFromString])),
  from: optional(YYYYMMDD),
  to: optional(YYYYMMDD),
  page: optional(union([number(), IntFromString])),
  pageSize: optional(union([number(), IntFromString]))
});

const _id__put$8 = defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
  const body = await readBody(event);
  const parsed = safeParse(MantenimientoUpdateSchema, body);
  if (!parsed.success) {
    const msg = parsed.issues.map((i) => i.message).join(", ");
    throw createError({ statusCode: 400, message: msg });
  }
  const data = parsed.output;
  const updateData = {};
  if (data.id_bus) updateData.id_bus = data.id_bus;
  if (data.id_taller) updateData.id_taller = data.id_taller;
  if (data.id_tipo_mantenimiento) updateData.id_tipo_mantenimiento = data.id_tipo_mantenimiento;
  if (data.id_estado_mantenimiento) updateData.id_estado_mantenimiento = data.id_estado_mantenimiento;
  if (data.fecha) updateData.fecha = toDateOrNull(data.fecha);
  if (data.costo !== void 0) updateData.costo = data.costo;
  if (data.observaciones !== void 0) updateData.observaciones = data.observaciones;
  const actualizado = await prisma.mantenimiento.update({
    where: { id_mantenimiento: id },
    data: updateData,
    include: {
      bus: { select: { id_bus: true, patente: true } },
      taller: { select: { id_taller: true, nombre: true } },
      tipo: { select: { id_tipo_mantenimiento: true, nombre_tipo: true } },
      estado: { select: { id_estado_mantenimiento: true, nombre_estado: true } }
    }
  });
  return { item: actualizado };
});

const _id__put$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$8
}, Symbol.toStringTag, { value: 'Module' }));

const catalogos_get$4 = defineEventHandler(async () => {
  const [buses, talleres, tipos, estados] = await Promise.all([
    prisma.bus.findMany({ select: { id_bus: true, patente: true }, orderBy: { id_bus: "asc" } }),
    prisma.taller.findMany({ select: { id_taller: true, nombre: true }, orderBy: { nombre: "asc" } }),
    prisma.tipoMantenimiento.findMany({ select: { id_tipo_mantenimiento: true, nombre_tipo: true }, orderBy: { nombre_tipo: "asc" } }),
    prisma.estadoMantenimiento.findMany({ select: { id_estado_mantenimiento: true, nombre_estado: true }, orderBy: { nombre_estado: "asc" } })
  ]);
  return { buses, talleres, tipos, estados };
});

const catalogos_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: catalogos_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$a = defineEventHandler(async (event) => {
  const q = getQuery$1(event);
  const where = {};
  if (q.q) {
    where.OR = [
      { observaciones: { contains: q.q, mode: "insensitive" } },
      { tipo: { nombre_tipo: { contains: q.q, mode: "insensitive" } } },
      { estado: { nombre_estado: { contains: q.q, mode: "insensitive" } } },
      { taller: { nombre: { contains: q.q, mode: "insensitive" } } }
    ];
  }
  if (q.id_bus) where.id_bus = Number(q.id_bus);
  if (q.id_taller) where.id_taller = Number(q.id_taller);
  if (q.id_tipo_mantenimiento) where.id_tipo_mantenimiento = Number(q.id_tipo_mantenimiento);
  if (q.id_estado_mantenimiento) where.id_estado_mantenimiento = Number(q.id_estado_mantenimiento);
  if (q.from || q.to) {
    where.fecha = {};
    if (q.from) where.fecha.gte = toDateOrNull(q.from);
    if (q.to) where.fecha.lte = toDateOrNull(q.to);
  }
  const rows = await prisma.mantenimiento.findMany({
    where,
    include: {
      bus: { select: { id_bus: true, patente: true } },
      taller: { select: { id_taller: true, nombre: true } },
      tipo: { select: { id_tipo_mantenimiento: true, nombre_tipo: true } },
      estado: { select: { id_estado_mantenimiento: true, nombre_estado: true } }
    },
    orderBy: { id_mantenimiento: "desc" }
  });
  const items = rows.map((r) => ({
    ...r,
    costo: r.costo ? Number(r.costo) : null
  }));
  return { items };
});

const index_get$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$a
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$8 = defineEventHandler(async (event) => {
  var _a;
  try {
    const body = await readBody(event);
    const parsed = safeParse(MantenimientoCreateSchema, body);
    if (!parsed.success) {
      const msg = parsed.issues.map((i) => i.message).join(", ");
      throw createError({ statusCode: 400, message: msg });
    }
    const data = parsed.output;
    const [bus, taller, tipo, estado] = await Promise.all([
      prisma.bus.findUnique({ where: { id_bus: data.id_bus } }),
      prisma.taller.findUnique({ where: { id_taller: data.id_taller } }),
      prisma.tipoMantenimiento.findUnique({ where: { id_tipo_mantenimiento: data.id_tipo_mantenimiento } }),
      prisma.estadoMantenimiento.findUnique({ where: { id_estado_mantenimiento: data.id_estado_mantenimiento } })
    ]);
    if (!bus) throw createError({ statusCode: 400, message: "Bus no encontrado" });
    if (!taller) throw createError({ statusCode: 400, message: "Taller no encontrado" });
    if (!tipo) throw createError({ statusCode: 400, message: "Tipo de mantenimiento inv\xE1lido" });
    if (!estado) throw createError({ statusCode: 400, message: "Estado de mantenimiento inv\xE1lido" });
    const createData = {
      id_bus: data.id_bus,
      id_taller: data.id_taller,
      id_tipo_mantenimiento: data.id_tipo_mantenimiento,
      id_estado_mantenimiento: data.id_estado_mantenimiento,
      fecha: toDateOrNull(data.fecha),
      // 'YYYY-MM-DD' -> Date (UTC)
      observaciones: (_a = data.observaciones) != null ? _a : null
    };
    if (data.costo !== void 0 && data.costo !== null) {
      createData.costo = data.costo;
    }
    const creado = await prisma.mantenimiento.create({
      data: createData,
      include: {
        bus: { select: { id_bus: true, patente: true } },
        taller: { select: { id_taller: true, nombre: true } },
        tipo: { select: { id_tipo_mantenimiento: true, nombre_tipo: true } },
        estado: { select: { id_estado_mantenimiento: true, nombre_estado: true } }
      }
    });
    return {
      item: {
        id_mantenimiento: creado.id_mantenimiento,
        id_bus: creado.id_bus,
        id_taller: creado.id_taller,
        id_tipo_mantenimiento: creado.id_tipo_mantenimiento,
        id_estado_mantenimiento: creado.id_estado_mantenimiento,
        fecha: creado.fecha,
        costo: creado.costo != null ? Number(creado.costo) : null,
        observaciones: creado.observaciones,
        // Devolver los objetos incluidos (como espera tu front)
        bus: creado.bus,
        taller: creado.taller,
        tipo: creado.tipo,
        estado: creado.estado
      }
    };
  } catch (err) {
    console.error("\u274C Error en POST /api/mantenimientos:", err);
    if (err == null ? void 0 : err.statusCode) throw err;
    throw createError({ statusCode: 500, message: "Error al crear mantenimiento" });
  }
});

const index_post$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$8
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$6 = defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
  }
  try {
    await prisma.mecanico.delete({ where: { id_mecanico: id } });
    return { ok: true };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2025") {
      throw createError({ statusCode: 404, message: "Mec\xE1nico no encontrado" });
    }
    if ((err == null ? void 0 : err.code) === "P2003") {
      throw createError({ statusCode: 409, message: "No se puede eliminar: est\xE1 referenciado por otros registros" });
    }
    console.error("DELETE /api/mecanicos/[id] error:", err);
    throw createError({ statusCode: 500, message: "Error eliminando mec\xE1nico" });
  }
});

const _id__delete$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$6
}, Symbol.toStringTag, { value: 'Module' }));

const NonEmptyTrimmed$1 = pipe(
  string("Campo requerido"),
  minLength(1, "No puede estar vac\xEDo")
);
const OnlyLetters = regex(
  /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/u,
  "S\xF3lo se permiten letras y espacios"
);
const MecanicoCreateSchema = object({
  id_taller: pipe(
    union([
      pipe(string(), regex(/^\d+$/, "id_taller inv\xE1lido"), transform((v) => parseInt(v, 10))),
      number("id_taller debe ser num\xE9rico")
    ]),
    minValue(1, "id_taller debe ser mayor a 0")
  ),
  nombre: pipe(NonEmptyTrimmed$1, minLength(2, "El nombre es demasiado corto"), OnlyLetters),
  apellido: pipe(NonEmptyTrimmed$1, minLength(2, "El apellido es demasiado corto"), OnlyLetters)
});
const MecanicoUpdateSchema = object({
  id_taller: optional(
    pipe(
      union([
        pipe(string(), regex(/^\d+$/, "id_taller inv\xE1lido"), transform((v) => parseInt(v, 10))),
        number("id_taller debe ser num\xE9rico")
      ]),
      minValue(1, "id_taller debe ser mayor a 0")
    )
  ),
  nombre: optional(pipe(NonEmptyTrimmed$1, minLength(2, "El nombre es demasiado corto"), OnlyLetters)),
  apellido: optional(pipe(NonEmptyTrimmed$1, minLength(2, "El apellido es demasiado corto"), OnlyLetters))
});
const MecanicoQuerySchema = object({
  id_taller: optional(
    pipe(
      union([
        pipe(string(), regex(/^\d+$/, "id_taller inv\xE1lido"), transform((v) => parseInt(v, 10))),
        number("id_taller debe ser num\xE9rico")
      ]),
      minValue(1, "id_taller debe ser mayor a 0")
    )
  ),
  q: optional(string())
});

const _id__put$6 = defineEventHandler(async (event) => {
  try {
    const id = Number(getRouterParam(event, "id"));
    if (!id || Number.isNaN(id)) {
      throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
    }
    const parsed = safeParse(MecanicoUpdateSchema, await readBody(event));
    if (!parsed.success) {
      const msg = parsed.issues.map((i) => i.message).join(", ");
      throw createError({ statusCode: 400, message: msg });
    }
    const data = parsed.output;
    const exists = await prisma.mecanico.findUnique({ where: { id_mecanico: id } });
    if (!exists) throw createError({ statusCode: 404, message: "Mec\xE1nico no encontrado" });
    if (data.id_taller) {
      const taller = await prisma.taller.findUnique({ where: { id_taller: data.id_taller } });
      if (!taller) throw createError({ statusCode: 400, message: "Taller no existe" });
    }
    const updated = await prisma.mecanico.update({
      where: { id_mecanico: id },
      data: {
        ...data.id_taller ? { id_taller: data.id_taller } : {},
        ...data.nombre ? { nombre: data.nombre.trim() } : {},
        ...data.apellido ? { apellido: data.apellido.trim() } : {}
      }
    });
    return { ok: true, id_mecanico: updated.id_mecanico };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2003") {
      throw createError({ statusCode: 400, message: "Taller inv\xE1lido" });
    }
    if ((err == null ? void 0 : err.code) === "P2025") {
      throw createError({ statusCode: 404, message: "Mec\xE1nico no encontrado" });
    }
    if (err == null ? void 0 : err.statusCode) throw err;
    console.error("PUT /api/mecanicos/[id] error:", err);
    throw createError({ statusCode: 500, message: "Error actualizando mec\xE1nico" });
  }
});

const _id__put$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$6
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$8 = defineEventHandler(async (event) => {
  const qRaw = getQuery$1(event);
  const parsed = safeParse(MecanicoQuerySchema, qRaw);
  if (!parsed.success) {
    const msg = parsed.issues.map((i) => i.message).join(", ");
    throw createError({ statusCode: 400, message: msg });
  }
  const { id_taller, q } = parsed.output;
  const where = {};
  if (id_taller) where.id_taller = id_taller;
  if (q) {
    const term = String(q).trim();
    if (term) {
      where.OR = [
        { nombre: { contains: term, mode: "insensitive" } },
        { apellido: { contains: term, mode: "insensitive" } },
        { taller: { nombre: { contains: term, mode: "insensitive" } } }
      ];
    }
  }
  const rows = await prisma.mecanico.findMany({
    where,
    orderBy: [{ apellido: "asc" }, { nombre: "asc" }],
    include: { taller: { select: { id_taller: true, nombre: true } } }
  });
  return { items: rows };
});

const index_get$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$8
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$6 = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const parsed = safeParse(MecanicoCreateSchema, body);
    if (!parsed.success) {
      const msg = parsed.issues.map((i) => i.message).join(", ");
      throw createError({ statusCode: 400, message: msg });
    }
    const data = parsed.output;
    const taller = await prisma.taller.findUnique({ where: { id_taller: data.id_taller } });
    if (!taller) throw createError({ statusCode: 400, message: "Taller no existe" });
    const m = await prisma.mecanico.create({
      data: {
        id_taller: data.id_taller,
        nombre: data.nombre.trim(),
        apellido: data.apellido.trim()
      }
    });
    return { id_mecanico: m.id_mecanico };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2003") {
      throw createError({ statusCode: 400, message: "Taller inv\xE1lido" });
    }
    if (err == null ? void 0 : err.statusCode) throw err;
    console.error("POST /api/mecanicos error:", err);
    throw createError({ statusCode: 500, message: "Error creando mec\xE1nico" });
  }
});

const index_post$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$6
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$6 = defineEventHandler(async () => {
  const roles = await prisma.rol.findMany({ orderBy: { id_rol: "asc" } });
  return { items: roles.map((r) => ({ id: r.id_rol, nombre: r.nombre_rol })) };
});

const index_get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$6
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$4 = defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!id || Number.isNaN(id)) {
    throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
  }
  try {
    await prisma.taller.delete({ where: { id_taller: id } });
    return { ok: true };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2025") {
      throw createError({ statusCode: 404, message: "Taller no encontrado" });
    }
    if ((err == null ? void 0 : err.code) === "P2003") {
      throw createError({ statusCode: 409, message: "No se puede eliminar: est\xE1 referenciado por otros registros" });
    }
    console.error("DELETE /api/talleres/[id] error:", err);
    throw createError({ statusCode: 500, message: "Error eliminando taller" });
  }
});

const _id__delete$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$4
}, Symbol.toStringTag, { value: 'Module' }));

const NonEmptyTrimmed = pipe(
  string("Campo requerido"),
  minLength(1, "No puede estar vac\xEDo")
);
const EmailRegex = regex(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  "Formato de email inv\xE1lido"
);
const TallerCreateSchema = object({
  nombre: pipe(NonEmptyTrimmed, minLength(2, "El nombre es muy corto")),
  id_tipo_taller: pipe(
    union([
      pipe(string(), regex(/^\d+$/, "id_tipo_taller inv\xE1lido"), transform((v) => parseInt(v, 10))),
      number("id_tipo_taller debe ser num\xE9rico")
    ]),
    minValue(1, "id_tipo_taller debe ser mayor a 0")
  ),
  contacto: optional(string()),
  direccion: optional(string()),
  email: optional(pipe(string(), EmailRegex))
});
const TallerUpdateSchema = object({
  nombre: optional(pipe(NonEmptyTrimmed, minLength(2, "El nombre es muy corto"))),
  id_tipo_taller: optional(
    pipe(
      union([
        pipe(string(), regex(/^\d+$/, "id_tipo_taller inv\xE1lido"), transform((v) => parseInt(v, 10))),
        number("id_tipo_taller debe ser num\xE9rico")
      ]),
      minValue(1, "id_tipo_taller debe ser mayor a 0")
    )
  ),
  contacto: optional(string()),
  direccion: optional(string()),
  email: optional(pipe(string(), EmailRegex))
});
const TallerQuerySchema = object({
  id_tipo_taller: optional(
    pipe(
      union([
        pipe(string(), regex(/^\d+$/, "id_tipo_taller inv\xE1lido"), transform((v) => parseInt(v, 10))),
        number("id_tipo_taller debe ser num\xE9rico")
      ]),
      minValue(1, "id_tipo_taller debe ser mayor a 0")
    )
  ),
  q: optional(string())
});

const _id__put$4 = defineEventHandler(async (event) => {
  try {
    const id = Number(getRouterParam(event, "id"));
    if (!id || Number.isNaN(id)) {
      throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
    }
    const parsed = safeParse(TallerUpdateSchema, await readBody(event));
    if (!parsed.success) {
      const msg = parsed.issues.map((i) => i.message).join(", ");
      throw createError({ statusCode: 400, message: msg });
    }
    const data = parsed.output;
    const exists = await prisma.taller.findUnique({ where: { id_taller: id } });
    if (!exists) throw createError({ statusCode: 404, message: "Taller no encontrado" });
    if (data.id_tipo_taller) {
      const tipo = await prisma.tipoTaller.findUnique({ where: { id_tipo_taller: data.id_tipo_taller } });
      if (!tipo) throw createError({ statusCode: 400, message: "Tipo de taller no existe" });
    }
    const t = await prisma.taller.update({
      where: { id_taller: id },
      data
    });
    return { ok: true, id_taller: t.id_taller };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2025") {
      throw createError({ statusCode: 404, message: "Taller no encontrado" });
    }
    if ((err == null ? void 0 : err.code) === "P2003") {
      throw createError({ statusCode: 400, message: "Tipo de taller inv\xE1lido" });
    }
    if (err == null ? void 0 : err.statusCode) throw err;
    console.error("PUT /api/talleres/[id] error:", err);
    throw createError({ statusCode: 500, message: "Error actualizando taller" });
  }
});

const _id__put$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$4
}, Symbol.toStringTag, { value: 'Module' }));

const catalogos_get$2 = defineEventHandler(async () => {
  const tipos = await prisma.tipoTaller.findMany({
    select: { id_tipo_taller: true, nombre_tipo: true },
    orderBy: { nombre_tipo: "asc" }
  });
  return { tipos };
});

const catalogos_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: catalogos_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$4 = defineEventHandler(async (event) => {
  const parsed = safeParse(TallerQuerySchema, getQuery$1(event));
  if (!parsed.success) {
    const msg = parsed.issues.map((i) => i.message).join(", ");
    throw createError({ statusCode: 400, message: msg });
  }
  const { id_tipo_taller, q } = parsed.output;
  const where = {};
  if (id_tipo_taller) where.id_tipo_taller = id_tipo_taller;
  if (q) {
    const term = String(q).trim();
    if (term) {
      where.OR = [
        { nombre: { contains: term, mode: "insensitive" } },
        { contacto: { contains: term, mode: "insensitive" } },
        { email: { contains: term, mode: "insensitive" } },
        { tipo_taller: { nombre_tipo: { contains: term, mode: "insensitive" } } }
      ];
    }
  }
  const rows = await prisma.taller.findMany({
    where,
    orderBy: { nombre: "asc" },
    include: {
      tipo_taller: { select: { id_tipo_taller: true, nombre_tipo: true } },
      _count: { select: { mecanicos: true, mantenimientos: true } }
    }
  });
  return { items: rows };
});

const index_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$4 = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const parsed = safeParse(TallerCreateSchema, body);
    if (!parsed.success) {
      const msg = parsed.issues.map((i) => i.message).join(", ");
      throw createError({ statusCode: 400, message: msg });
    }
    const data = parsed.output;
    const tipo = await prisma.tipoTaller.findUnique({ where: { id_tipo_taller: data.id_tipo_taller } });
    if (!tipo) throw createError({ statusCode: 400, message: "Tipo de taller no existe" });
    const t = await prisma.taller.create({ data });
    return { id_taller: t.id_taller };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2003") {
      throw createError({ statusCode: 400, message: "Tipo de taller inv\xE1lido" });
    }
    if (err == null ? void 0 : err.statusCode) throw err;
    console.error("POST /api/talleres error:", err);
    throw createError({ statusCode: 500, message: "Error creando taller" });
  }
});

const index_post$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$4
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$2 = defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
  await prisma.turnoConductor.delete({ where: { id_turno: id } });
  return { ok: true };
});

const _id__delete$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$2 = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
  const body = await readBody(event);
  const current = await prisma.turnoConductor.findUnique({ where: { id_turno: id } });
  if (!current) throw createError({ statusCode: 404, message: "Turno no encontrado" });
  const id_bus = typeof body.id_bus === "number" ? body.id_bus : current.id_bus;
  const inicio = body.inicio ? new Date(body.inicio) : new Date(current.hora_inicio);
  const fin = body.fin ? new Date(body.fin) : new Date(current.hora_fin);
  const titulo = body.titulo !== void 0 ? body.titulo || null : current.titulo;
  const descripcion = body.descripcion !== void 0 ? body.descripcion || null : current.descripcion;
  const id_estado_turno = typeof body.id_estado_turno === "number" ? body.id_estado_turno : current.id_estado_turno;
  if (!(inicio < fin)) {
    throw createError({ statusCode: 400, message: "Inicio debe ser menor que fin" });
  }
  const ESTADOS_OCUPA = ["ASIGNADO", "EN_CURSO", "ACTIVO", "PENDIENTE"];
  const busConflict = await prisma.turnoConductor.findFirst({
    where: {
      id_turno: { not: id },
      id_bus,
      hora_inicio: { lt: fin },
      hora_fin: { gt: inicio },
      estado: { nombre_estado: { in: ESTADOS_OCUPA } }
    },
    select: { id_turno: true, hora_inicio: true, hora_fin: true }
  });
  if (busConflict) {
    throw createError({
      statusCode: 409,
      message: "El bus ya est\xE1 asignado en ese horario.",
      data: { conflicto: busConflict }
    });
  }
  const driverConflict = await prisma.turnoConductor.findFirst({
    where: {
      id_turno: { not: id },
      id_usuario: current.id_usuario,
      hora_inicio: { lt: fin },
      hora_fin: { gt: inicio },
      estado: { nombre_estado: { in: ESTADOS_OCUPA } }
    },
    select: { id_turno: true, hora_inicio: true, hora_fin: true }
  });
  if (driverConflict) {
    throw createError({
      statusCode: 409,
      message: "El conductor ya tiene un turno en ese horario.",
      data: { conflicto: driverConflict }
    });
  }
  const updated = await prisma.turnoConductor.update({
    where: { id_turno: id },
    data: {
      id_bus,
      hora_inicio: inicio,
      hora_fin: fin,
      titulo,
      descripcion,
      id_estado_turno
    },
    include: { usuario: true, bus: true, estado: true }
  });
  return {
    item: {
      id: updated.id_turno,
      usuarioId: updated.id_usuario,
      usuarioNombre: [(_a = updated.usuario) == null ? void 0 : _a.nombre, (_b = updated.usuario) == null ? void 0 : _b.apellido].filter(Boolean).join(" ") || "",
      busId: updated.id_bus,
      busLabel: `${(_d = (_c = updated.bus) == null ? void 0 : _c.patente) != null ? _d : ""} - ${(_f = (_e = updated.bus) == null ? void 0 : _e.modelo) != null ? _f : ""}`,
      inicio: updated.hora_inicio,
      fin: updated.hora_fin,
      estado: (_h = (_g = updated.estado) == null ? void 0 : _g.nombre_estado) != null ? _h : "",
      titulo: (_i = updated.titulo) != null ? _i : "",
      descripcion: (_j = updated.descripcion) != null ? _j : ""
    }
  };
});

const _id__put$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$2
}, Symbol.toStringTag, { value: 'Module' }));

const catalogos_get = defineEventHandler(async (event) => {
  setHeader(event, "Cache-Control", "no-store");
  const [usuarios, buses, estados] = await Promise.all([
    prisma.usuario.findMany({
      select: { id_usuario: true, nombre: true, apellido: true },
      orderBy: { nombre: "asc" }
    }),
    prisma.bus.findMany({
      select: { id_bus: true, patente: true, modelo: true },
      orderBy: { id_bus: "asc" }
    }),
    prisma.estadoTurno.findMany({
      select: { id_estado_turno: true, nombre_estado: true },
      orderBy: { nombre_estado: "asc" }
    })
  ]);
  return {
    usuarios: usuarios.map((u) => ({
      id: u.id_usuario,
      nombre: [u.nombre, u.apellido].filter(Boolean).join(" ")
    })),
    buses: buses.map((b) => {
      var _a, _b;
      return {
        id: b.id_bus,
        label: `${(_a = b.patente) != null ? _a : "SIN PATENTE"} - ${(_b = b.modelo) != null ? _b : "SIN MODELO"}`
      };
    }),
    estados: estados.map((e) => ({
      id: e.id_estado_turno,
      nombre: e.nombre_estado
    }))
  };
});

const catalogos_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: catalogos_get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$2 = defineEventHandler(async (event) => {
  const q = getQuery$1(event);
  const usuarioId = q.usuarioId ? Number(q.usuarioId) : void 0;
  const where = {};
  if (usuarioId) where.id_usuario = usuarioId;
  const rows = await prisma.turnoConductor.findMany({
    where,
    include: { usuario: true, bus: true, estado: true },
    orderBy: { hora_inicio: "desc" }
  });
  const items = rows.map((t) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    return {
      id: t.id_turno,
      usuarioId: t.id_usuario,
      usuarioNombre: [(_a = t.usuario) == null ? void 0 : _a.nombre, (_b = t.usuario) == null ? void 0 : _b.apellido].filter(Boolean).join(" ") || "",
      busId: t.id_bus,
      busLabel: `${(_d = (_c = t.bus) == null ? void 0 : _c.patente) != null ? _d : ""} - ${(_f = (_e = t.bus) == null ? void 0 : _e.modelo) != null ? _f : ""}`,
      inicio: t.hora_inicio,
      fin: t.hora_fin,
      estado: (_h = (_g = t.estado) == null ? void 0 : _g.nombre_estado) != null ? _h : "",
      titulo: (_i = t.titulo) != null ? _i : "",
      descripcion: (_j = t.descripcion) != null ? _j : ""
    };
  });
  return { items };
});

const index_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$2 = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.id_usuario) || !(body == null ? void 0 : body.id_bus) || !(body == null ? void 0 : body.inicio) || !(body == null ? void 0 : body.fin)) {
    throw createError({ statusCode: 400, message: "Faltan datos obligatorios" });
  }
  const inicio = new Date(body.inicio);
  const fin = new Date(body.fin);
  if (!(inicio < fin)) {
    throw createError({ statusCode: 400, message: "Inicio debe ser menor que fin" });
  }
  const ESTADOS_OCUPA = ["ASIGNADO", "EN_CURSO", "ACTIVO", "PENDIENTE"];
  const busConflict = await prisma.turnoConductor.findFirst({
    where: {
      id_bus: body.id_bus,
      hora_inicio: { lt: fin },
      hora_fin: { gt: inicio },
      estado: { nombre_estado: { in: ESTADOS_OCUPA } }
    },
    select: { id_turno: true, hora_inicio: true, hora_fin: true }
  });
  if (busConflict) {
    throw createError({
      statusCode: 409,
      message: "El bus ya est\xE1 asignado en ese horario.",
      data: { conflicto: busConflict }
    });
  }
  const driverConflict = await prisma.turnoConductor.findFirst({
    where: {
      id_usuario: body.id_usuario,
      hora_inicio: { lt: fin },
      hora_fin: { gt: inicio },
      estado: { nombre_estado: { in: ESTADOS_OCUPA } }
    },
    select: { id_turno: true, hora_inicio: true, hora_fin: true }
  });
  if (driverConflict) {
    throw createError({
      statusCode: 409,
      message: "El conductor ya tiene un turno en ese horario.",
      data: { conflicto: driverConflict }
    });
  }
  let estado = await prisma.estadoTurno.findFirst({ where: { nombre_estado: "ASIGNADO" } });
  if (!estado) estado = await prisma.estadoTurno.create({ data: { nombre_estado: "ASIGNADO" } });
  const created = await prisma.turnoConductor.create({
    data: {
      id_usuario: body.id_usuario,
      id_bus: body.id_bus,
      hora_inicio: inicio,
      hora_fin: fin,
      fecha: inicio,
      id_estado_turno: estado.id_estado_turno,
      titulo: body.titulo || null,
      descripcion: body.descripcion || null
    },
    include: { usuario: true, bus: true, estado: true }
  });
  return {
    item: {
      id: created.id_turno,
      usuarioId: created.id_usuario,
      usuarioNombre: [(_a = created.usuario) == null ? void 0 : _a.nombre, (_b = created.usuario) == null ? void 0 : _b.apellido].filter(Boolean).join(" ") || "",
      busId: created.id_bus,
      busLabel: `${(_d = (_c = created.bus) == null ? void 0 : _c.patente) != null ? _d : ""} - ${(_f = (_e = created.bus) == null ? void 0 : _e.modelo) != null ? _f : ""}`,
      inicio: created.hora_inicio,
      fin: created.hora_fin,
      estado: (_h = (_g = created.estado) == null ? void 0 : _g.nombre_estado) != null ? _h : "",
      titulo: (_i = created.titulo) != null ? _i : "",
      descripcion: (_j = created.descripcion) != null ? _j : ""
    }
  };
});

const index_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete = defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  if (!id) throw createError({ statusCode: 400, message: "ID inv\xE1lido" });
  try {
    await prisma.usuarioRol.deleteMany({ where: { id_usuario: id } });
    await prisma.usuario.delete({ where: { id_usuario: id } });
    return { ok: true };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2003") {
      throw createError({ statusCode: 409, message: "No se puede eliminar: el usuario tiene registros relacionados (turnos, incidentes, etc.)" });
    }
    if (err == null ? void 0 : err.statusCode) throw err;
    console.error("Error eliminando usuario:", err);
    throw createError({ statusCode: 500, message: "Error eliminando usuario" });
  }
});

const _id__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete
}, Symbol.toStringTag, { value: 'Module' }));

const RUT_REGEX = /^[0-9]{7,8}-[0-9kK]$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,30}$/;
const PHONE_REGEX = /^[0-9()+\-\s]*$/;
const trim = () => transform((v) => (v != null ? v : "").trim());
const toUpper = () => transform((v) => (v != null ? v : "").toUpperCase());
const toLower = () => transform((v) => (v != null ? v : "").toLowerCase());
object({
  rut: pipe(string("Rut es obligatorio"), trim(), regex(RUT_REGEX, "Rut inv\xE1lido. Formato 12345678-9")),
  nombre: pipe(string("Nombre es obligatorio"), trim(), minLength(2), maxLength(100)),
  apellido: pipe(string("Apellido es obligatorio"), trim(), minLength(2), maxLength(100)),
  email: pipe(string("Email es obligatorio"), trim(), toLower(), regex(EMAIL_REGEX, "Email inv\xE1lido")),
  username: pipe(string("Usuario es obligatorio"), trim(), regex(USERNAME_REGEX, "Usuario inv\xE1lido"), maxLength(100)),
  telefono: optional(pipe(string(), trim(), regex(PHONE_REGEX, "Tel\xE9fono inv\xE1lido"), maxLength(50))),
  licencia: optional(pipe(string(), trim(), maxLength(100))),
  activo: optional(boolean()),
  roles: optional(array(pipe(string("Rol inv\xE1lido"), trim(), toUpper(), minLength(2), maxLength(100))))
});
const UsuarioUpdateSchema = object({
  rut: optional(pipe(string(), trim(), regex(RUT_REGEX, "Rut inv\xE1lido. Formato 12345678-9"))),
  nombre: optional(pipe(string(), trim(), minLength(2), maxLength(100))),
  apellido: optional(pipe(string(), trim(), minLength(2), maxLength(100))),
  email: optional(pipe(string(), trim(), toLower(), regex(EMAIL_REGEX, "Email inv\xE1lido"))),
  username: optional(pipe(string(), trim(), regex(USERNAME_REGEX, "Usuario inv\xE1lido"), maxLength(100))),
  telefono: optional(pipe(string(), trim(), regex(PHONE_REGEX, "Tel\xE9fono inv\xE1lido"), maxLength(50))),
  licencia: optional(pipe(string(), trim(), maxLength(100))),
  activo: optional(boolean()),
  roles: optional(array(pipe(string("Rol inv\xE1lido"), trim(), toUpper(), minLength(2), maxLength(100)))),
  password: optional(pipe(string(), trim(), minLength(8, "La contrase\xF1a debe tener al menos 8 caracteres")))
});

const _id__put = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  try {
    const id = Number(getRouterParam(event, "id"));
    if (!id) throw createError({ statusCode: 400, message: "Id inv\xE1lido" });
    const body = await readBody(event);
    const parsed = safeParse(UsuarioUpdateSchema, body);
    if (!parsed.success) {
      const msg = parsed.issues.map((i) => i.message).join(", ");
      throw createError({ statusCode: 400, message: msg });
    }
    const data = parsed.output;
    let estadoConnect = void 0;
    if (typeof data.activo === "boolean") {
      const estadoStr = data.activo ? "ACTIVO" : "INACTIVO";
      const estado = await prisma.estadoUsuario.findFirst({ where: { nombre_estado: estadoStr } });
      if (!estado) throw createError({ statusCode: 400, message: "Estado inv\xE1lido" });
      estadoConnect = { connect: { id_estado_usuario: estado.id_estado_usuario } };
    }
    const updateData = {
      rut: data.rut,
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      username: data.username,
      telefono: data.telefono,
      licencia_con: data.licencia,
      ...estadoConnect ? { estado_usuario: estadoConnect } : {}
    };
    if (data.password) {
      updateData.password_hash = await hashPassword(data.password);
    }
    await prisma.usuario.update({
      where: { id_usuario: id },
      data: updateData
    });
    if (Array.isArray(data.roles)) {
      const roles = await prisma.rol.findMany({ where: { nombre_rol: { in: data.roles } } });
      const now = /* @__PURE__ */ new Date();
      await prisma.usuarioRol.updateMany({
        where: { id_usuario: id, NOT: { rol: { nombre_rol: { in: data.roles } } } },
        data: { estado: "INACTIVO", fecha_fin: now }
      });
      for (const r of roles) {
        await prisma.usuarioRol.upsert({
          where: { id_usuario_id_rol: { id_usuario: id, id_rol: r.id_rol } },
          update: { estado: "ACTIVO", fecha_inicio: now, fecha_fin: null },
          create: { id_usuario: id, id_rol: r.id_rol, estado: "ACTIVO", fecha_inicio: now }
        });
      }
    }
    const u = await prisma.usuario.findUnique({
      where: { id_usuario: id },
      include: { estado_usuario: true, roles: { include: { rol: true } } }
    });
    return {
      item: {
        id: u.id_usuario,
        rut: u.rut,
        nombre: u.nombre,
        apellido: u.apellido,
        email: u.email,
        username: u.username,
        telefono: (_a = u.telefono) != null ? _a : "",
        licencia: (_b = u.licencia_con) != null ? _b : "",
        estado: (_d = (_c = u.estado_usuario) == null ? void 0 : _c.nombre_estado) != null ? _d : "",
        roles: u.roles.filter((x) => x.estado === "ACTIVO").map((x) => x.rol.nombre_rol)
      }
    };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2002") {
      throw createError({ statusCode: 409, message: "Username o email ya existe" });
    }
    if (err == null ? void 0 : err.statusCode) throw err;
    console.error("Error editando usuario:", err);
    throw createError({ statusCode: 500, message: "Error editando usuario" });
  }
});

const _id__put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put
}, Symbol.toStringTag, { value: 'Module' }));

const index_get = defineEventHandler(async (event) => {
  const q = getQuery$1(event);
  const where = {};
  if (q.q) {
    const text = String(q.q).trim();
    where.OR = [
      { nombre: { contains: text, mode: "insensitive" } },
      { apellido: { contains: text, mode: "insensitive" } },
      { email: { contains: text, mode: "insensitive" } },
      { username: { contains: text, mode: "insensitive" } }
    ];
  }
  if (q.estado === "ACTIVO" || q.estado === "INACTIVO") {
    where.estado_usuario = { nombre_estado: q.estado };
  }
  if (q.rol) {
    where.roles = { some: { estado: "ACTIVO", rol: { nombre_rol: q.rol } } };
  }
  const usuarios = await prisma.usuario.findMany({
    where,
    include: {
      estado_usuario: true,
      roles: { include: { rol: true } },
      turnos: true,
      documentos: true,
      alertas: true,
      incidentes: true
    },
    orderBy: { id_usuario: "asc" }
  });
  return {
    items: usuarios.map((u) => {
      var _a, _b, _c, _d;
      return {
        id: u.id_usuario,
        rut: u.rut,
        // 👈 Se mantiene el campo RUT
        nombre: u.nombre,
        apellido: u.apellido,
        email: u.email,
        username: u.username,
        telefono: (_a = u.telefono) != null ? _a : "",
        licencia: (_b = u.licencia_con) != null ? _b : "",
        estado: (_d = (_c = u.estado_usuario) == null ? void 0 : _c.nombre_estado) != null ? _d : "",
        roles: u.roles.filter((x) => x.estado === "ACTIVO").map((x) => x.rol.nombre_rol),
        turnosCount: u.turnos.length,
        documentosCount: u.documentos.length,
        alertasCount: u.alertas.length,
        incidentesCount: u.incidentes.length
      };
    })
  };
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

const index_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  try {
    const body = await readBody(event);
    const estadoStr = body.activo ? "ACTIVO" : "INACTIVO";
    const estado = await prisma.estadoUsuario.findFirst({
      where: { nombre_estado: estadoStr }
    });
    if (!estado) throw createError({ statusCode: 400, message: "Estado inv\xE1lido" });
    const tempPlain = crypto$1.randomBytes(16).toString("hex");
    const tempHash = await hashPassword(tempPlain);
    const { created, codigo_token } = await prisma.$transaction(async (tx) => {
      var _a2, _b2;
      const createdUser = await tx.usuario.create({
        data: {
          rut: body.rut.trim(),
          nombre: body.nombre.trim(),
          apellido: body.apellido.trim(),
          email: body.email.trim().toLowerCase(),
          username: body.username.trim(),
          telefono: ((_a2 = body.telefono) == null ? void 0 : _a2.trim()) || void 0,
          licencia_con: ((_b2 = body.licencia) == null ? void 0 : _b2.trim()) || void 0,
          password_hash: tempHash,
          estado_usuario: { connect: { id_estado_usuario: estado.id_estado_usuario } }
        }
      });
      if (Array.isArray(body.roles) && body.roles.length > 0) {
        const roles = await tx.rol.findMany({
          where: { nombre_rol: { in: body.roles.map((r) => r.trim()).filter(Boolean) } }
        });
        if (roles.length !== body.roles.length) {
          const found = new Set(roles.map((r) => r.nombre_rol));
          const missing = body.roles.filter((r) => !found.has(r));
          throw createError({ statusCode: 400, message: `Roles inv\xE1lidos: ${missing.join(", ")}` });
        }
        const now = /* @__PURE__ */ new Date();
        for (const r of roles) {
          await tx.usuarioRol.upsert({
            where: { id_usuario_id_rol: { id_usuario: createdUser.id_usuario, id_rol: r.id_rol } },
            update: { estado: "ACTIVO", fecha_inicio: now, fecha_fin: null },
            create: { id_usuario: createdUser.id_usuario, id_rol: r.id_rol, estado: "ACTIVO", fecha_inicio: now }
          });
        }
      }
      const token = crypto$1.randomBytes(32).toString("hex");
      const expira = new Date(Date.now() + 1e3 * 60 * 60 * 24);
      await tx.tokenRestablecimiento.create({
        data: {
          codigo_token: token,
          id_usuario: createdUser.id_usuario,
          fecha_expiracion: expira
        }
      });
      return { created: createdUser, codigo_token: token };
    });
    let emailError = null;
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const appUrl = process.env.PUBLIC_APP_URL || "https://checkbus.cl";
      const fromAddr = (process.env.MAIL_FROM || "").trim();
      const fromName = (process.env.MAIL_NAME || "CheckBus").trim();
      const link = `${appUrl}/set-password?token=${codigo_token}`;
      const { error } = await resend.emails.send({
        from: `${fromName} <${fromAddr}>`,
        to: created.email,
        subject: "Bienvenido a CheckBus \u{1F68D}",
        html: `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;line-height:1.5">
      <h2>\xA1Hola ${created.nombre}!</h2>
      <p>Tu cuenta ha sido creada correctamente en <strong>CheckBus</strong>.</p>
      <p>Para establecer tu contrase\xF1a, haz clic en el siguiente enlace:</p>
      <p>
        <a href="${link}" target="_blank"
          style="display:inline-block;background:#2563eb;color:#fff;padding:10px 16px;
                 border-radius:8px;text-decoration:none;">
          Definir contrase\xF1a
        </a>
      </p>
      <p>Si no solicitaste esta cuenta, ignora este mensaje.</p>
      <hr/>
      <small>Este enlace expirar\xE1 en 24 horas.</small>
    </div>
  `,
        headers: {
          "List-Unsubscribe": "<mailto:soporte@checkbus.cl>"
          // 👈 añadido aquí
        }
      });
      if (error) {
        throw new Error(error.message);
      }
      console.log(`\u{1F4EC} Correo enviado a ${created.email}`);
    } catch (e) {
      console.error("\u26A0\uFE0F Error enviando correo de bienvenida:", (e == null ? void 0 : e.message) || e);
      emailError = "Usuario creado, pero no se pudo enviar el correo de activaci\xF3n.";
    }
    setResponseStatus(event, 201);
    const u = await prisma.usuario.findUnique({
      where: { id_usuario: created.id_usuario },
      include: { estado_usuario: true, roles: { include: { rol: true } } }
    });
    return {
      item: {
        id: u.id_usuario,
        rut: u.rut,
        nombre: u.nombre,
        apellido: u.apellido,
        email: u.email,
        username: u.username,
        telefono: (_a = u.telefono) != null ? _a : "",
        licencia: (_b = u.licencia_con) != null ? _b : "",
        estado: (_d = (_c = u.estado_usuario) == null ? void 0 : _c.nombre_estado) != null ? _d : "",
        roles: u.roles.filter((x) => x.estado === "ACTIVO").map((x) => x.rol.nombre_rol)
      },
      message: emailError ? "Usuario creado. Hubo un problema enviando el correo." : "Usuario creado y correo de activaci\xF3n enviado.",
      ...emailError ? { emailError } : {}
    };
  } catch (err) {
    if ((err == null ? void 0 : err.code) === "P2002") {
      throw createError({ statusCode: 409, message: "El correo o usuario ya existe" });
    }
    if (err == null ? void 0 : err.statusCode) throw err;
    console.error("\u274C Error creando usuario:", err);
    throw createError({ statusCode: 500, message: "Error al crear usuario" });
  }
});

const index_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    if (typeof ssrError.data === "string") {
      try {
        ssrError.data = destr(ssrError.data);
      } catch {
      }
    }
    setSSRError(ssrContext, ssrError);
  }
  const isRenderingPayload = PAYLOAD_URL_RE.test(ssrContext.url);
  if (isRenderingPayload) {
    const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
    ssrContext.url = url;
    event._path = event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer(ssrContext);
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response = renderPayloadResponse(ssrContext);
    return response;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    const tagPosition = "head";
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  const result = [];
  for (const _chunk of chunks) {
    const chunk = _chunk?.trim();
    if (chunk) {
      result.push(chunk);
    }
  }
  return result;
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
