/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/// <reference types="trusted-types" />
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <reference types="trusted-types" />
import { Inject, Injectable, InjectionToken, SecurityContext } from '@angular/core';
/**
 * The name of the Trusted Type policy to create.
 * \@publicApi
 * @type {?}
 */
export const TRUSTED_TYPE_POLICY_NAME = new InjectionToken('trusted-type-policy-name');
/**
 * This list is used to wrap values passed from DomRenderer2 in types.
 * Using SecurityContexts just for convenience, as the type contacts match.
 * @type {?}
 */
const ATTR_TYPE_MAP = {
    // Do not sort.
    'script:src': SecurityContext.RESOURCE_URL,
    // Figure out what to do with script.text, shadowroot innerHTML
    'embed:src': SecurityContext.RESOURCE_URL,
    'iframe:srcdoc': SecurityContext.HTML,
    'object:data': SecurityContext.RESOURCE_URL,
    'object:codebase': SecurityContext.RESOURCE_URL,
    'a:href': SecurityContext.URL,
    '*:src': SecurityContext.URL,
    '*:formaction': SecurityContext.URL,
    '*:innerhtml': SecurityContext.HTML,
    '*:outerhtml': SecurityContext.HTML,
};
/**
 * Adapter for the Trusted Type Policy.
 * Used by the DomRenderer2 and the sanitizer only.
 * @see https://wicg.github.io/trusted-types/
 *
 * \@publicApi
 * @abstract
 */
export class TrustedTypePolicyAdapter {
    /**
     * @return {?}
     */
    supportsTrustedTypes() { return false; }
}
if (false) {
    /**
     * @abstract
     * @param {?} value
     * @return {?}
     */
    TrustedTypePolicyAdapter.prototype.maybeCreateTrustedURL = function (value) { };
    /**
     * @abstract
     * @param {?} value
     * @return {?}
     */
    TrustedTypePolicyAdapter.prototype.maybeCreateTrustedHTML = function (value) { };
    /**
     * @abstract
     * @param {?} value
     * @return {?}
     */
    TrustedTypePolicyAdapter.prototype.maybeCreateTrustedScript = function (value) { };
    /**
     * @abstract
     * @param {?} value
     * @return {?}
     */
    TrustedTypePolicyAdapter.prototype.maybeCreateTrustedScriptURL = function (value) { };
    /**
     * @abstract
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    TrustedTypePolicyAdapter.prototype.maybeCreateTrustedValueForAttribute = function (el, name, value, namespace) { };
    /**
     * @abstract
     * @param {?} obj
     * @return {?}
     */
    TrustedTypePolicyAdapter.prototype.isHTML = function (obj) { };
    /**
     * @abstract
     * @param {?} obj
     * @return {?}
     */
    TrustedTypePolicyAdapter.prototype.isURL = function (obj) { };
    /**
     * @abstract
     * @param {?} obj
     * @return {?}
     */
    TrustedTypePolicyAdapter.prototype.isScriptURL = function (obj) { };
    /**
     * @abstract
     * @param {?} obj
     * @return {?}
     */
    TrustedTypePolicyAdapter.prototype.isScript = function (obj) { };
}
export class TrustedTypePolicyAdapterImpl extends TrustedTypePolicyAdapter {
    /**
     * @param {?} _name
     */
    constructor(_name) {
        super();
        this._name = _name;
        if (typeof TrustedTypes !== 'undefined' && Boolean(TrustedTypes.createPolicy)) {
            this._policy = TrustedTypes.createPolicy(this._name, {
                createURL: (/**
                 * @param {?} s
                 * @return {?}
                 */
                (s) => s),
                createScriptURL: (/**
                 * @param {?} s
                 * @return {?}
                 */
                (s) => s),
                createScript: (/**
                 * @param {?} s
                 * @return {?}
                 */
                (s) => s),
                createHTML: (/**
                 * @param {?} s
                 * @return {?}
                 */
                (s) => s)
            }, false);
        }
    }
    /**
     * @return {?}
     */
    supportsTrustedTypes() { return Boolean(this._policy); }
    /**
     * @param {?} obj
     * @return {?}
     */
    isHTML(obj) {
        return this._policy ? obj instanceof TrustedHTML && ((/** @type {?} */ (TrustedTypes))).isHTML(obj) : false;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isScript(obj) {
        return this._policy ? obj instanceof TrustedScript && ((/** @type {?} */ (TrustedTypes))).isScript(obj) :
            false;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isURL(obj) {
        return this._policy ? obj instanceof TrustedURL && ((/** @type {?} */ (TrustedTypes))).isURL(obj) : false;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isScriptURL(obj) {
        return this._policy ?
            obj instanceof TrustedScriptURL && ((/** @type {?} */ (TrustedTypes))).isScriptURL(obj) :
            false;
    }
    /**
     * @param {?} s
     * @return {?}
     */
    maybeCreateTrustedHTML(s) {
        return this._policy ? (/** @type {?} */ ((/** @type {?} */ (this._policy.createHTML(s))))) : s;
    }
    /**
     * @param {?} s
     * @return {?}
     */
    maybeCreateTrustedURL(s) {
        return this._policy ? (/** @type {?} */ ((/** @type {?} */ (this._policy.createURL(s))))) : s;
    }
    /**
     * @param {?} s
     * @return {?}
     */
    maybeCreateTrustedScriptURL(s) {
        return this._policy ? (/** @type {?} */ ((/** @type {?} */ (this._policy.createScriptURL(s))))) : s;
    }
    /**
     * @param {?} s
     * @return {?}
     */
    maybeCreateTrustedScript(s) {
        return this._policy ? (/** @type {?} */ ((/** @type {?} */ (this._policy.createScript(s))))) : s;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    maybeCreateTrustedValueForAttribute(el, name, value, namespace) {
        if (!this._policy || !(el instanceof Element)) {
            return value;
        }
        /** @type {?} */
        const context = this._getContext(el.tagName.toLowerCase(), name.toLowerCase(), namespace);
        /** @type {?} */
        let newValue;
        switch (context) {
            case SecurityContext.HTML:
                newValue = this.maybeCreateTrustedHTML(value);
                break;
            case SecurityContext.URL:
                newValue = this.maybeCreateTrustedURL(value);
                break;
            case SecurityContext.RESOURCE_URL:
                newValue = this.maybeCreateTrustedScriptURL(value);
                break;
            case SecurityContext.SCRIPT:
                newValue = this.maybeCreateTrustedScript(value);
                break;
            case SecurityContext.NONE:
            default:
                newValue = value;
                break;
        }
        return (/** @type {?} */ (newValue));
    }
    /**
     * @private
     * @param {?} tag
     * @param {?} attribute
     * @param {?=} namespace
     * @return {?}
     */
    _getContext(tag, attribute, namespace) {
        /** @type {?} */
        const lookupCandidates = [
            tag + ':' + attribute,
            '*:' + attribute,
        ];
        for (let lookup of lookupCandidates)
            if (lookup in ATTR_TYPE_MAP) {
                return ATTR_TYPE_MAP[lookup];
            }
        return SecurityContext.NONE;
    }
}
TrustedTypePolicyAdapterImpl.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TrustedTypePolicyAdapterImpl.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [TRUSTED_TYPE_POLICY_NAME,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TrustedTypePolicyAdapterImpl.prototype._policy;
    /**
     * @type {?}
     * @private
     */
    TrustedTypePolicyAdapterImpl.prototype._name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RlZF90eXBlc19wb2xpY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9zZWN1cml0eS90cnVzdGVkX3R5cGVzX3BvbGljeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBUUEsdUNBQXVDOzs7Ozs7Ozs7QUFFdkMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBTWxGLE1BQU0sT0FBTyx3QkFBd0IsR0FBRyxJQUFJLGNBQWMsQ0FBUywwQkFBMEIsQ0FBQzs7Ozs7O01BTXhGLGFBQWEsR0FBcUM7O0lBRXRELFlBQVksRUFBRSxlQUFlLENBQUMsWUFBWTs7SUFFMUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxZQUFZO0lBQ3pDLGVBQWUsRUFBRSxlQUFlLENBQUMsSUFBSTtJQUNyQyxhQUFhLEVBQUUsZUFBZSxDQUFDLFlBQVk7SUFDM0MsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLFlBQVk7SUFDL0MsUUFBUSxFQUFFLGVBQWUsQ0FBQyxHQUFHO0lBQzdCLE9BQU8sRUFBRSxlQUFlLENBQUMsR0FBRztJQUM1QixjQUFjLEVBQUUsZUFBZSxDQUFDLEdBQUc7SUFDbkMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxJQUFJO0lBQ25DLGFBQWEsRUFBRSxlQUFlLENBQUMsSUFBSTtDQUNwQzs7Ozs7Ozs7O0FBU0QsTUFBTSxPQUFnQix3QkFBd0I7Ozs7SUFDNUMsb0JBQW9CLEtBQWMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDO0NBV2xEOzs7Ozs7O0lBVkMsZ0ZBQXNEOzs7Ozs7SUFDdEQsaUZBQXVEOzs7Ozs7SUFDdkQsbUZBQXlEOzs7Ozs7SUFDekQsc0ZBQTREOzs7Ozs7Ozs7SUFDNUQsbUhBQ3NFOzs7Ozs7SUFDdEUsK0RBQW1DOzs7Ozs7SUFDbkMsOERBQWtDOzs7Ozs7SUFD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LG1CQUFBLFFBQVEsRUFBVSxDQUFDO0lBQzVCLENBQUM7Ozs7Ozs7O0lBRU8sV0FBVyxDQUFDLEdBQVcsRUFBRSxTQUFpQixFQUFFLFNBQWtCOztjQUM5RCxnQkFBZ0IsR0FBRztZQUN2QixHQUFHLEdBQUcsR0FBRyxHQUFHLFNBQVM7WUFDckIsSUFBSSxHQUFHLFNBQVM7U0FDakI7UUFDRCxLQUFLLElBQUksTUFBTSxJQUFJLGdCQUFnQjtZQUNqQyxJQUFJLE1BQU0sSUFBSSxhQUFhLEVBQUU7Z0JBQzNCLE9BQU8sYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzlCO1FBQ0gsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDO0lBQzlCLENBQUM7OztZQXhGRixVQUFVOzs7O3lDQUdJLE1BQU0sU0FBQyx3QkFBd0I7Ozs7Ozs7SUFENUMsK0NBQTZDOzs7OztJQUNqQyw2Q0FBdUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidHJ1c3RlZC10eXBlc1wiIC8+XG5cbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgU2VjdXJpdHlDb250ZXh0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGUgbmFtZSBvZiB0aGUgVHJ1c3RlZCBUeXBlIHBvbGljeSB0byBjcmVhdGUuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBUUlVTVEVEX1RZUEVfUE9MSUNZX05BTUUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPigndHJ1c3RlZC10eXBlLXBvbGljeS1uYW1lJyk7XG5cbi8qKlxuICogVGhpcyBsaXN0IGlzIHVzZWQgdG8gd3JhcCB2YWx1ZXMgcGFzc2VkIGZyb20gRG9tUmVuZGVyZXIyIGluIHR5cGVzLlxuICogVXNpbmcgU2VjdXJpdHlDb250ZXh0cyBqdXN0IGZvciBjb252ZW5pZW5jZSwgYXMgdGhlIHR5cGUgY29udGFjdHMgbWF0Y2guXG4gKi9cbmNvbnN0IEFUVFJfVFlQRV9NQVA6IHtba2V5OiBzdHJpbmddOiBTZWN1cml0eUNvbnRleHR9ID0ge1xuICAvLyBEbyBub3Qgc29ydC5cbiAgJ3NjcmlwdDpzcmMnOiBTZWN1cml0eUNvbnRleHQuUkVTT1VSQ0VfVVJMLFxuICAvLyBGaWd1cmUgb3V0IHdoYXQgdG8gZG8gd2l0aCBzY3JpcHQudGV4dCwgc2hhZG93cm9vdCBpbm5lckhUTUxcbiAgJ2VtYmVkOnNyYyc6IFNlY3VyaXR5Q29udGV4dC5SRVNPVVJDRV9VUkwsXG4gICdpZnJhbWU6c3JjZG9jJzogU2VjdXJpdHlDb250ZXh0LkhUTUwsXG4gICdvYmplY3Q6ZGF0YSc6IFNlY3VyaXR5Q29udGV4dC5SRVNPVVJDRV9VUkwsXG4gICdvYmplY3Q6Y29kZWJhc2UnOiBTZWN1cml0eUNvbnRleHQuUkVTT1VSQ0VfVVJMLFxuICAnYTpocmVmJzogU2VjdXJpdHlDb250ZXh0LlVSTCxcbiAgJyo6c3JjJzogU2VjdXJpdHlDb250ZXh0LlVSTCxcbiAgJyo6Zm9ybWFjdGlvbic6IFNlY3VyaXR5Q29udGV4dC5VUkwsXG4gICcqOmlubmVyaHRtbCc6IFNlY3VyaXR5Q29udGV4dC5IVE1MLFxuICAnKjpvdXRlcmh0bWwnOiBTZWN1cml0eUNvbnRleHQuSFRNTCxcbn07XG5cbi8qKlxuICogQWRhcHRlciBmb3IgdGhlIFRydXN0ZWQgVHlwZSBQb2xpY3kuIFxuICogVXNlZCBieSB0aGUgRG9tUmVuZGVyZXIyIGFuZCB0aGUgc2FuaXRpemVyIG9ubHkuIFxuICogQHNlZSBodHRwczovL3dpY2cuZ2l0aHViLmlvL3RydXN0ZWQtdHlwZXMvXG4gKiBcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRydXN0ZWRUeXBlUG9saWN5QWRhcHRlciB7XG4gIHN1cHBvcnRzVHJ1c3RlZFR5cGVzKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cbiAgYWJzdHJhY3QgbWF5YmVDcmVhdGVUcnVzdGVkVVJMKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmc7XG4gIGFic3RyYWN0IG1heWJlQ3JlYXRlVHJ1c3RlZEhUTUwodmFsdWU6IHN0cmluZyk6IHN0cmluZztcbiAgYWJzdHJhY3QgbWF5YmVDcmVhdGVUcnVzdGVkU2NyaXB0KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmc7XG4gIGFic3RyYWN0IG1heWJlQ3JlYXRlVHJ1c3RlZFNjcmlwdFVSTCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nO1xuICBhYnN0cmFjdCBtYXliZUNyZWF0ZVRydXN0ZWRWYWx1ZUZvckF0dHJpYnV0ZShcbiAgICAgIGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogc3RyaW5nO1xuICBhYnN0cmFjdCBpc0hUTUwob2JqOiBhbnkpOiBib29sZWFuO1xuICBhYnN0cmFjdCBpc1VSTChvYmo6IGFueSk6IGJvb2xlYW47XG4gIGFic3RyYWN0IGlzU2NyaXB0VVJMKG9iajogYW55KTogYm9vbGVhbjtcbiAgYWJzdHJhY3QgaXNTY3JpcHQob2JqOiBhbnkpOiBib29sZWFuO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJ1c3RlZFR5cGVQb2xpY3lBZGFwdGVySW1wbCBleHRlbmRzIFRydXN0ZWRUeXBlUG9saWN5QWRhcHRlciB7XG4gIHByaXZhdGUgX3BvbGljeTogVHJ1c3RlZFR5cGVQb2xpY3l8dW5kZWZpbmVkO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KFRSVVNURURfVFlQRV9QT0xJQ1lfTkFNRSkgcHJpdmF0ZSBfbmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAodHlwZW9mIFRydXN0ZWRUeXBlcyAhPT0gJ3VuZGVmaW5lZCcgJiYgQm9vbGVhbihUcnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5KSkge1xuICAgICAgdGhpcy5fcG9saWN5ID0gVHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeShcbiAgICAgICAgICB0aGlzLl9uYW1lLCB7XG4gICAgICAgICAgICBjcmVhdGVVUkw6IChzOiBzdHJpbmcpID0+IHMsXG4gICAgICAgICAgICBjcmVhdGVTY3JpcHRVUkw6IChzOiBzdHJpbmcpID0+IHMsXG4gICAgICAgICAgICBjcmVhdGVTY3JpcHQ6IChzOiBzdHJpbmcpID0+IHMsXG4gICAgICAgICAgICBjcmVhdGVIVE1MOiAoczogc3RyaW5nKSA9PiBzXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgc3VwcG9ydHNUcnVzdGVkVHlwZXMoKTogYm9vbGVhbiB7IHJldHVybiBCb29sZWFuKHRoaXMuX3BvbGljeSk7IH1cblxuICBpc0hUTUwob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcG9saWN5ID8gb2JqIGluc3RhbmNlb2YgVHJ1c3RlZEhUTUwgJiYgKFRydXN0ZWRUeXBlcyBhcyBhbnkpLmlzSFRNTChvYmopIDogZmFsc2U7XG4gIH1cblxuICBpc1NjcmlwdChvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9wb2xpY3kgPyBvYmogaW5zdGFuY2VvZiBUcnVzdGVkU2NyaXB0ICYmIChUcnVzdGVkVHlwZXMgYXMgYW55KS5pc1NjcmlwdChvYmopIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2U7XG4gIH1cblxuICBpc1VSTChvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9wb2xpY3kgPyBvYmogaW5zdGFuY2VvZiBUcnVzdGVkVVJMICYmIChUcnVzdGVkVHlwZXMgYXMgYW55KS5pc1VSTChvYmopIDogZmFsc2U7XG4gIH1cblxuICBpc1NjcmlwdFVSTChvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9wb2xpY3kgP1xuICAgICAgICBvYmogaW5zdGFuY2VvZiBUcnVzdGVkU2NyaXB0VVJMICYmIChUcnVzdGVkVHlwZXMgYXMgYW55KS5pc1NjcmlwdFVSTChvYmopIDpcbiAgICAgICAgZmFsc2U7XG4gIH1cblxuICBtYXliZUNyZWF0ZVRydXN0ZWRIVE1MKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BvbGljeSA/IHRoaXMuX3BvbGljeS5jcmVhdGVIVE1MKHMpIGFzIHVua25vd24gYXMgc3RyaW5nIDogcztcbiAgfVxuICBtYXliZUNyZWF0ZVRydXN0ZWRVUkwoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcG9saWN5ID8gdGhpcy5fcG9saWN5LmNyZWF0ZVVSTChzKSBhcyB1bmtub3duIGFzIHN0cmluZyA6IHM7XG4gIH1cbiAgbWF5YmVDcmVhdGVUcnVzdGVkU2NyaXB0VVJMKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BvbGljeSA/IHRoaXMuX3BvbGljeS5jcmVhdGVTY3JpcHRVUkwocykgYXMgdW5rbm93biBhcyBzdHJpbmcgOiBzO1xuICB9XG4gIG1heWJlQ3JlYXRlVHJ1c3RlZFNjcmlwdChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wb2xpY3kgPyB0aGlzLl9wb2xpY3kuY3JlYXRlU2NyaXB0KHMpIGFzIHVua25vd24gYXMgc3RyaW5nIDogcztcbiAgfVxuICBtYXliZUNyZWF0ZVRydXN0ZWRWYWx1ZUZvckF0dHJpYnV0ZShlbDogRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOlxuICAgICAgc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuX3BvbGljeSB8fCAhKGVsIGluc3RhbmNlb2YgRWxlbWVudCkpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2dldENvbnRleHQoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpLCBuYW1lLnRvTG93ZXJDYXNlKCksIG5hbWVzcGFjZSk7XG4gICAgbGV0IG5ld1ZhbHVlO1xuICAgIHN3aXRjaCAoY29udGV4dCkge1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuSFRNTDpcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLm1heWJlQ3JlYXRlVHJ1c3RlZEhUTUwodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LlVSTDpcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLm1heWJlQ3JlYXRlVHJ1c3RlZFVSTCh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuUkVTT1VSQ0VfVVJMOlxuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMubWF5YmVDcmVhdGVUcnVzdGVkU2NyaXB0VVJMKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5TQ1JJUFQ6XG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5tYXliZUNyZWF0ZVRydXN0ZWRTY3JpcHQodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0Lk5PTkU6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIG5ld1ZhbHVlIGFzIHN0cmluZztcbiAgfVxuXG4gIHByaXZhdGUgX2dldENvbnRleHQodGFnOiBzdHJpbmcsIGF0dHJpYnV0ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmcpOiBTZWN1cml0eUNvbnRleHQge1xuICAgIGNvbnN0IGxvb2t1cENhbmRpZGF0ZXMgPSBbXG4gICAgICB0YWcgKyAnOicgKyBhdHRyaWJ1dGUsXG4gICAgICAnKjonICsgYXR0cmlidXRlLFxuICAgIF07XG4gICAgZm9yIChsZXQgbG9va3VwIG9mIGxvb2t1cENhbmRpZGF0ZXMpXG4gICAgICBpZiAobG9va3VwIGluIEFUVFJfVFlQRV9NQVApIHtcbiAgICAgICAgcmV0dXJuIEFUVFJfVFlQRV9NQVBbbG9va3VwXTtcbiAgICAgIH1cbiAgICByZXR1cm4gU2VjdXJpdHlDb250ZXh0Lk5PTkU7XG4gIH1cbn1cbiJdfQ==