/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, SecurityContext, ɵ_sanitizeHtml as _sanitizeHtml, ɵ_sanitizeStyle as _sanitizeStyle, ɵ_sanitizeUrl as _sanitizeUrl } from '@angular/core';
import { TrustedTypePolicyAdapter } from './trusted_types_policy';
export { SecurityContext };
/**
 * Marker interface for a value that's safe to use in a particular context.
 *
 * \@publicApi
 * @record
 */
export function SafeValue() { }
/**
 * Marker interface for a value that's safe to use as HTML.
 *
 * \@publicApi
 * @record
 */
export function SafeHtml() { }
/**
 * Marker interface for a value that's safe to use as style (CSS).
 *
 * \@publicApi
 * @record
 */
export function SafeStyle() { }
/**
 * Marker interface for a value that's safe to use as JavaScript.
 *
 * \@publicApi
 * @record
 */
export function SafeScript() { }
/**
 * Marker interface for a value that's safe to use as a URL linking to a document.
 *
 * \@publicApi
 * @record
 */
export function SafeUrl() { }
/**
 * Marker interface for a value that's safe to use as a URL to load executable code from.
 *
 * \@publicApi
 * @record
 */
export function SafeResourceUrl() { }
/**
 * DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * \@security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](http://g.co/ng/security).
 *
 * \@publicApi
 * @abstract
 */
export class DomSanitizer {
}
if (false) {
    /**
     * Sanitizes a value for use in the given SecurityContext.
     *
     * If value is trusted for the context, this method will unwrap the contained safe value and use
     * it directly. Otherwise, value will be sanitized to be safe in the given context, for example
     * by replacing URLs that have an unsafe protocol part (such as `javascript:`). The implementation
     * is responsible to make sure that the value can definitely be safely used in the given context.
     * @abstract
     * @param {?} context
     * @param {?} value
     * @return {?}
     */
    DomSanitizer.prototype.sanitize = function (context, value) { };
    /**
     * Bypass security and trust the given value to be safe HTML. Only use this when the bound HTML
     * is unsafe (e.g. contains `<script>` tags) and the code should be executed. The sanitizer will
     * leave safe HTML intact, so in most situations this method should not be used.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    DomSanitizer.prototype.bypassSecurityTrustHtml = function (value) { };
    /**
     * Bypass security and trust the given value to be safe style value (CSS).
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    DomSanitizer.prototype.bypassSecurityTrustStyle = function (value) { };
    /**
     * Bypass security and trust the given value to be safe JavaScript.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    DomSanitizer.prototype.bypassSecurityTrustScript = function (value) { };
    /**
     * Bypass security and trust the given value to be a safe style URL, i.e. a value that can be used
     * in hyperlinks or `<img src>`.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    DomSanitizer.prototype.bypassSecurityTrustUrl = function (value) { };
    /**
     * Bypass security and trust the given value to be a safe resource URL, i.e. a location that may
     * be used to load executable code from, like `<script src>`, or `<iframe src>`.
     *
     * **WARNING:** calling this method with untrusted user data exposes your application to XSS
     * security risks!
     * @abstract
     * @param {?} value
     * @return {?}
     */
    DomSanitizer.prototype.bypassSecurityTrustResourceUrl = function (value) { };
}
export class DomSanitizerImpl extends DomSanitizer {
    /**
     * @param {?} _doc
     * @param {?} _policyAdapter
     */
    constructor(_doc, _policyAdapter) {
        super();
        this._doc = _doc;
        this._policyAdapter = _policyAdapter;
    }
    /**
     * @param {?} ctx
     * @param {?} value
     * @return {?}
     */
    sanitize(ctx, value) {
        if (value == null)
            return null;
        switch (ctx) {
            case SecurityContext.NONE:
                return (/** @type {?} */ (value));
            case SecurityContext.HTML:
                if (value instanceof SafeHtmlImpl)
                    return (/** @type {?} */ (value.changingThisBreaksApplicationSecurity));
                if (this._policyAdapter.isHTML(value)) {
                    return (/** @type {?} */ ((/** @type {?} */ (value))));
                }
                this.checkNotSafeValue(value, 'HTML');
                return this.sanitizeHTML(String(value));
            case SecurityContext.STYLE:
                if (value instanceof SafeStyleImpl)
                    return (/** @type {?} */ (value.changingThisBreaksApplicationSecurity));
                this.checkNotSafeValue(value, 'Style');
                return _sanitizeStyle((/** @type {?} */ (value)));
            case SecurityContext.SCRIPT:
                if (value instanceof SafeScriptImpl)
                    return (/** @type {?} */ (value.changingThisBreaksApplicationSecurity));
                if (this._policyAdapter.isScript(value)) {
                    return (/** @type {?} */ ((/** @type {?} */ (value))));
                }
                this.checkNotSafeValue(value, 'Script');
                throw new Error('unsafe value used in a script context');
            case SecurityContext.URL:
                if (value instanceof SafeResourceUrlImpl || value instanceof SafeUrlImpl) {
                    // Allow resource URLs in URL contexts, they are strictly more trusted.
                    return (/** @type {?} */ (value.changingThisBreaksApplicationSecurity));
                }
                if (this._policyAdapter.isURL(value)) {
                    return (/** @type {?} */ ((/** @type {?} */ (value))));
                }
                this.checkNotSafeValue(value, 'URL');
                return this.sanitizeURL(String(value));
            case SecurityContext.RESOURCE_URL:
                if (value instanceof SafeResourceUrlImpl) {
                    return (/** @type {?} */ (value.changingThisBreaksApplicationSecurity));
                }
                if (this._policyAdapter.isScriptURL(value)) {
                    return (/** @type {?} */ ((/** @type {?} */ (value))));
                }
                this.checkNotSafeValue(value, 'ResourceURL');
                throw new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)');
            default:
                throw new Error(`Unexpected SecurityContext ${ctx} (see http://g.co/ng/security#xss)`);
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    sanitizeURL(value) {
        /** @type {?} */
        const sanitized = _sanitizeUrl(value);
        return this._policyAdapter.maybeCreateTrustedURL(sanitized);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    sanitizeHTML(value) {
        /** @type {?} */
        const sanitized = _sanitizeHtml(this._doc, value);
        return this._policyAdapter.maybeCreateTrustedHTML(sanitized);
    }
    /**
     * @private
     * @param {?} value
     * @param {?} expectedType
     * @return {?}
     */
    checkNotSafeValue(value, expectedType) {
        if (value instanceof SafeValueImpl) {
            throw new Error(`Required a safe ${expectedType}, got a ${value.getTypeName()} ` +
                `(see http://g.co/ng/security#xss)`);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustHtml(value) {
        return new SafeHtmlImpl(this._policyAdapter.maybeCreateTrustedHTML(value));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustStyle(value) { return new SafeStyleImpl(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustScript(value) {
        return new SafeScriptImpl(this._policyAdapter.maybeCreateTrustedScript(value));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustUrl(value) {
        return new SafeUrlImpl(this._policyAdapter.maybeCreateTrustedURL(value));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    bypassSecurityTrustResourceUrl(value) {
        return new SafeResourceUrlImpl(this._policyAdapter.maybeCreateTrustedScriptURL(value));
    }
}
DomSanitizerImpl.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DomSanitizerImpl.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: TrustedTypePolicyAdapter }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DomSanitizerImpl.prototype._doc;
    /**
     * @type {?}
     * @private
     */
    DomSanitizerImpl.prototype._policyAdapter;
}
/**
 * @abstract
 * @template T
 */
class SafeValueImpl {
    /**
     * @param {?} changingThisBreaksApplicationSecurity
     */
    constructor(changingThisBreaksApplicationSecurity) {
        this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
        // empty
    }
    /**
     * @return {?}
     */
    toString() {
        return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}` +
            ` (see http://g.co/ng/security#xss)`;
    }
}
if (false) {
    /** @type {?} */
    SafeValueImpl.prototype.changingThisBreaksApplicationSecurity;
    /**
     * @abstract
     * @return {?}
     */
    SafeValueImpl.prototype.getTypeName = function () { };
}
class SafeHtmlImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'HTML'; }
}
class SafeStyleImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'Style'; }
}
class SafeScriptImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'Script'; }
}
class SafeUrlImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'URL'; }
}
class SafeResourceUrlImpl extends SafeValueImpl {
    /**
     * @return {?}
     */
    getTypeName() { return 'ResourceURL'; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvc2VjdXJpdHkvZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFhLGVBQWUsRUFBRSxjQUFjLElBQUksYUFBYSxFQUFFLGVBQWUsSUFBSSxjQUFjLEVBQUUsYUFBYSxJQUFJLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoTCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUdoRSxPQUFPLEVBQUMsZUFBZSxFQUFDLENBQUM7Ozs7Ozs7QUFTekIsK0JBQTZCOzs7Ozs7O0FBTzdCLDhCQUE4Qzs7Ozs7OztBQU85QywrQkFBK0M7Ozs7Ozs7QUFPL0MsZ0NBQWdEOzs7Ozs7O0FBT2hELDZCQUE2Qzs7Ozs7OztBQU83QyxxQ0FBcUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlDckQsTUFBTSxPQUFnQixZQUFZO0NBc0RqQzs7Ozs7Ozs7Ozs7Ozs7SUE3Q0MsZ0VBQXVGOzs7Ozs7Ozs7Ozs7SUFVdkYsc0VBQTBEOzs7Ozs7Ozs7O0lBUTFELHVFQUE0RDs7Ozs7Ozs7OztJQVE1RCx3RUFBOEQ7Ozs7Ozs7Ozs7O0lBUzlELHFFQUF3RDs7Ozs7Ozs7Ozs7SUFTeEQsNkVBQXdFOztBQUsxRSxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsWUFBWTs7Ozs7SUFDaEQsWUFDOEIsSUFBUyxFQUFVLGNBQXdDO1FBQ3ZGLEtBQUssRUFBRSxDQUFDO1FBRG9CLFNBQUksR0FBSixJQUFJLENBQUs7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBMEI7SUFF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LGNBQWMsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7OztZQXhGRixVQUFVOzs7OzRDQUdKLE1BQU0sU0FBQyxRQUFRO1lBNUlkLHdCQUF3Qjs7Ozs7OztJQTRJMUIsZ0NBQW1DOzs7OztJQUFFLDBDQUFnRDs7Ozs7O0FBd0YzRixNQUFlLGFBQWE7Ozs7SUFDMUIsWUFBbUIscUNBQStDO1FBQS9DLDBDQUFxQyxHQUFyQyxxQ0FBcUMsQ0FBVTtRQUNoRSxRQUFRO0lBQ1YsQ0FBQzs7OztJQUlELFFBQVE7UUFDTixPQUFPLDBDQUEwQyxJQUFJLENBQUMscUNBQXFDLEVBQUU7WUFDekYsb0NBQW9DLENBQUM7SUFDM0MsQ0FBQztDQUNGOzs7SUFWYSw4REFBc0Q7Ozs7O0lBSWxFLHNEQUErQjs7QUFRakMsTUFBTSxZQUFhLFNBQVEsYUFBMEI7Ozs7SUFDbkQsV0FBVyxLQUFLLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQztDQUNqQztBQUNELE1BQU0sYUFBYyxTQUFRLGFBQXFCOzs7O0lBQy9DLFdBQVcsS0FBSyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUM7Q0FDbEM7QUFDRCxNQUFNLGNBQWUsU0FBUSxhQUE0Qjs7OztJQUN2RCxXQUFXLEtBQUssT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDO0NBQ25DO0FBQ0QsTUFBTSxXQUFZLFNBQVEsYUFBeUI7Ozs7SUFDakQsV0FBVyxLQUFLLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQztDQUNoQztBQUNELE1BQU0sbUJBQW9CLFNBQVEsYUFBK0I7Ozs7SUFDL0QsV0FBVyxLQUFLLE9BQU8sYUFBYSxDQUFDLENBQUMsQ0FBQztDQUN4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBTYW5pdGl6ZXIsIFNlY3VyaXR5Q29udGV4dCwgybVfc2FuaXRpemVIdG1sIGFzIF9zYW5pdGl6ZUh0bWwsIMm1X3Nhbml0aXplU3R5bGUgYXMgX3Nhbml0aXplU3R5bGUsIMm1X3Nhbml0aXplVXJsIGFzIF9zYW5pdGl6ZVVybH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RydXN0ZWRUeXBlUG9saWN5QWRhcHRlcn0gZnJvbSAnLi90cnVzdGVkX3R5cGVzX3BvbGljeSc7XG5cblxuZXhwb3J0IHtTZWN1cml0eUNvbnRleHR9O1xuXG5cblxuLyoqXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBpbiBhIHBhcnRpY3VsYXIgY29udGV4dC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVZhbHVlIHt9XG5cbi8qKlxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgSFRNTC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZUh0bWwgZXh0ZW5kcyBTYWZlVmFsdWUge31cblxuLyoqXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBhcyBzdHlsZSAoQ1NTKS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVN0eWxlIGV4dGVuZHMgU2FmZVZhbHVlIHt9XG5cbi8qKlxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgSmF2YVNjcmlwdC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVNjcmlwdCBleHRlbmRzIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGFzIGEgVVJMIGxpbmtpbmcgdG8gYSBkb2N1bWVudC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVVybCBleHRlbmRzIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGFzIGEgVVJMIHRvIGxvYWQgZXhlY3V0YWJsZSBjb2RlIGZyb20uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNhZmVSZXNvdXJjZVVybCBleHRlbmRzIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIERvbVNhbml0aXplciBoZWxwcyBwcmV2ZW50aW5nIENyb3NzIFNpdGUgU2NyaXB0aW5nIFNlY3VyaXR5IGJ1Z3MgKFhTUykgYnkgc2FuaXRpemluZ1xuICogdmFsdWVzIHRvIGJlIHNhZmUgdG8gdXNlIGluIHRoZSBkaWZmZXJlbnQgRE9NIGNvbnRleHRzLlxuICpcbiAqIEZvciBleGFtcGxlLCB3aGVuIGJpbmRpbmcgYSBVUkwgaW4gYW4gYDxhIFtocmVmXT1cInNvbWVWYWx1ZVwiPmAgaHlwZXJsaW5rLCBgc29tZVZhbHVlYCB3aWxsIGJlXG4gKiBzYW5pdGl6ZWQgc28gdGhhdCBhbiBhdHRhY2tlciBjYW5ub3QgaW5qZWN0IGUuZy4gYSBgamF2YXNjcmlwdDpgIFVSTCB0aGF0IHdvdWxkIGV4ZWN1dGUgY29kZSBvblxuICogdGhlIHdlYnNpdGUuXG4gKlxuICogSW4gc3BlY2lmaWMgc2l0dWF0aW9ucywgaXQgbWlnaHQgYmUgbmVjZXNzYXJ5IHRvIGRpc2FibGUgc2FuaXRpemF0aW9uLCBmb3IgZXhhbXBsZSBpZiB0aGVcbiAqIGFwcGxpY2F0aW9uIGdlbnVpbmVseSBuZWVkcyB0byBwcm9kdWNlIGEgYGphdmFzY3JpcHQ6YCBzdHlsZSBsaW5rIHdpdGggYSBkeW5hbWljIHZhbHVlIGluIGl0LlxuICogVXNlcnMgY2FuIGJ5cGFzcyBzZWN1cml0eSBieSBjb25zdHJ1Y3RpbmcgYSB2YWx1ZSB3aXRoIG9uZSBvZiB0aGUgYGJ5cGFzc1NlY3VyaXR5VHJ1c3QuLi5gXG4gKiBtZXRob2RzLCBhbmQgdGhlbiBiaW5kaW5nIHRvIHRoYXQgdmFsdWUgZnJvbSB0aGUgdGVtcGxhdGUuXG4gKlxuICogVGhlc2Ugc2l0dWF0aW9ucyBzaG91bGQgYmUgdmVyeSByYXJlLCBhbmQgZXh0cmFvcmRpbmFyeSBjYXJlIG11c3QgYmUgdGFrZW4gdG8gYXZvaWQgY3JlYXRpbmcgYVxuICogQ3Jvc3MgU2l0ZSBTY3JpcHRpbmcgKFhTUykgc2VjdXJpdHkgYnVnIVxuICpcbiAqIFdoZW4gdXNpbmcgYGJ5cGFzc1NlY3VyaXR5VHJ1c3QuLi5gLCBtYWtlIHN1cmUgdG8gY2FsbCB0aGUgbWV0aG9kIGFzIGVhcmx5IGFzIHBvc3NpYmxlIGFuZCBhc1xuICogY2xvc2UgYXMgcG9zc2libGUgdG8gdGhlIHNvdXJjZSBvZiB0aGUgdmFsdWUsIHRvIG1ha2UgaXQgZWFzeSB0byB2ZXJpZnkgbm8gc2VjdXJpdHkgYnVnIGlzXG4gKiBjcmVhdGVkIGJ5IGl0cyB1c2UuXG4gKlxuICogSXQgaXMgbm90IHJlcXVpcmVkIChhbmQgbm90IHJlY29tbWVuZGVkKSB0byBieXBhc3Mgc2VjdXJpdHkgaWYgdGhlIHZhbHVlIGlzIHNhZmUsIGUuZy4gYSBVUkwgdGhhdFxuICogZG9lcyBub3Qgc3RhcnQgd2l0aCBhIHN1c3BpY2lvdXMgcHJvdG9jb2wsIG9yIGFuIEhUTUwgc25pcHBldCB0aGF0IGRvZXMgbm90IGNvbnRhaW4gZGFuZ2Vyb3VzXG4gKiBjb2RlLiBUaGUgc2FuaXRpemVyIGxlYXZlcyBzYWZlIHZhbHVlcyBpbnRhY3QuXG4gKlxuICogQHNlY3VyaXR5IENhbGxpbmcgYW55IG9mIHRoZSBgYnlwYXNzU2VjdXJpdHlUcnVzdC4uLmAgQVBJcyBkaXNhYmxlcyBBbmd1bGFyJ3MgYnVpbHQtaW5cbiAqIHNhbml0aXphdGlvbiBmb3IgdGhlIHZhbHVlIHBhc3NlZCBpbi4gQ2FyZWZ1bGx5IGNoZWNrIGFuZCBhdWRpdCBhbGwgdmFsdWVzIGFuZCBjb2RlIHBhdGhzIGdvaW5nXG4gKiBpbnRvIHRoaXMgY2FsbC4gTWFrZSBzdXJlIGFueSB1c2VyIGRhdGEgaXMgYXBwcm9wcmlhdGVseSBlc2NhcGVkIGZvciB0aGlzIHNlY3VyaXR5IGNvbnRleHQuXG4gKiBGb3IgbW9yZSBkZXRhaWwsIHNlZSB0aGUgW1NlY3VyaXR5IEd1aWRlXShodHRwOi8vZy5jby9uZy9zZWN1cml0eSkuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRG9tU2FuaXRpemVyIGltcGxlbWVudHMgU2FuaXRpemVyIHtcbiAgLyoqXG4gICAqIFNhbml0aXplcyBhIHZhbHVlIGZvciB1c2UgaW4gdGhlIGdpdmVuIFNlY3VyaXR5Q29udGV4dC5cbiAgICpcbiAgICogSWYgdmFsdWUgaXMgdHJ1c3RlZCBmb3IgdGhlIGNvbnRleHQsIHRoaXMgbWV0aG9kIHdpbGwgdW53cmFwIHRoZSBjb250YWluZWQgc2FmZSB2YWx1ZSBhbmQgdXNlXG4gICAqIGl0IGRpcmVjdGx5LiBPdGhlcndpc2UsIHZhbHVlIHdpbGwgYmUgc2FuaXRpemVkIHRvIGJlIHNhZmUgaW4gdGhlIGdpdmVuIGNvbnRleHQsIGZvciBleGFtcGxlXG4gICAqIGJ5IHJlcGxhY2luZyBVUkxzIHRoYXQgaGF2ZSBhbiB1bnNhZmUgcHJvdG9jb2wgcGFydCAoc3VjaCBhcyBgamF2YXNjcmlwdDpgKS4gVGhlIGltcGxlbWVudGF0aW9uXG4gICAqIGlzIHJlc3BvbnNpYmxlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB2YWx1ZSBjYW4gZGVmaW5pdGVseSBiZSBzYWZlbHkgdXNlZCBpbiB0aGUgZ2l2ZW4gY29udGV4dC5cbiAgICovXG4gIGFic3RyYWN0IHNhbml0aXplKGNvbnRleHQ6IFNlY3VyaXR5Q29udGV4dCwgdmFsdWU6IFNhZmVWYWx1ZXxzdHJpbmd8bnVsbCk6IHN0cmluZ3xudWxsO1xuXG4gIC8qKlxuICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBzYWZlIEhUTUwuIE9ubHkgdXNlIHRoaXMgd2hlbiB0aGUgYm91bmQgSFRNTFxuICAgKiBpcyB1bnNhZmUgKGUuZy4gY29udGFpbnMgYDxzY3JpcHQ+YCB0YWdzKSBhbmQgdGhlIGNvZGUgc2hvdWxkIGJlIGV4ZWN1dGVkLiBUaGUgc2FuaXRpemVyIHdpbGxcbiAgICogbGVhdmUgc2FmZSBIVE1MIGludGFjdCwgc28gaW4gbW9zdCBzaXR1YXRpb25zIHRoaXMgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbiAgICpcbiAgICogKipXQVJOSU5HOioqIGNhbGxpbmcgdGhpcyBtZXRob2Qgd2l0aCB1bnRydXN0ZWQgdXNlciBkYXRhIGV4cG9zZXMgeW91ciBhcHBsaWNhdGlvbiB0byBYU1NcbiAgICogc2VjdXJpdHkgcmlza3MhXG4gICAqL1xuICBhYnN0cmFjdCBieXBhc3NTZWN1cml0eVRydXN0SHRtbCh2YWx1ZTogc3RyaW5nKTogU2FmZUh0bWw7XG5cbiAgLyoqXG4gICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIHNhZmUgc3R5bGUgdmFsdWUgKENTUykuXG4gICAqXG4gICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXG4gICAqIHNlY3VyaXR5IHJpc2tzIVxuICAgKi9cbiAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHZhbHVlOiBzdHJpbmcpOiBTYWZlU3R5bGU7XG5cbiAgLyoqXG4gICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIHNhZmUgSmF2YVNjcmlwdC5cbiAgICpcbiAgICogKipXQVJOSU5HOioqIGNhbGxpbmcgdGhpcyBtZXRob2Qgd2l0aCB1bnRydXN0ZWQgdXNlciBkYXRhIGV4cG9zZXMgeW91ciBhcHBsaWNhdGlvbiB0byBYU1NcbiAgICogc2VjdXJpdHkgcmlza3MhXG4gICAqL1xuICBhYnN0cmFjdCBieXBhc3NTZWN1cml0eVRydXN0U2NyaXB0KHZhbHVlOiBzdHJpbmcpOiBTYWZlU2NyaXB0O1xuXG4gIC8qKlxuICAgKiBCeXBhc3Mgc2VjdXJpdHkgYW5kIHRydXN0IHRoZSBnaXZlbiB2YWx1ZSB0byBiZSBhIHNhZmUgc3R5bGUgVVJMLCBpLmUuIGEgdmFsdWUgdGhhdCBjYW4gYmUgdXNlZFxuICAgKiBpbiBoeXBlcmxpbmtzIG9yIGA8aW1nIHNyYz5gLlxuICAgKlxuICAgKiAqKldBUk5JTkc6KiogY2FsbGluZyB0aGlzIG1ldGhvZCB3aXRoIHVudHJ1c3RlZCB1c2VyIGRhdGEgZXhwb3NlcyB5b3VyIGFwcGxpY2F0aW9uIHRvIFhTU1xuICAgKiBzZWN1cml0eSByaXNrcyFcbiAgICovXG4gIGFic3RyYWN0IGJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwodmFsdWU6IHN0cmluZyk6IFNhZmVVcmw7XG5cbiAgLyoqXG4gICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIGEgc2FmZSByZXNvdXJjZSBVUkwsIGkuZS4gYSBsb2NhdGlvbiB0aGF0IG1heVxuICAgKiBiZSB1c2VkIHRvIGxvYWQgZXhlY3V0YWJsZSBjb2RlIGZyb20sIGxpa2UgYDxzY3JpcHQgc3JjPmAsIG9yIGA8aWZyYW1lIHNyYz5gLlxuICAgKlxuICAgKiAqKldBUk5JTkc6KiogY2FsbGluZyB0aGlzIG1ldGhvZCB3aXRoIHVudHJ1c3RlZCB1c2VyIGRhdGEgZXhwb3NlcyB5b3VyIGFwcGxpY2F0aW9uIHRvIFhTU1xuICAgKiBzZWN1cml0eSByaXNrcyFcbiAgICovXG4gIGFic3RyYWN0IGJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh2YWx1ZTogc3RyaW5nKTogU2FmZVJlc291cmNlVXJsO1xufVxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEb21TYW5pdGl6ZXJJbXBsIGV4dGVuZHMgRG9tU2FuaXRpemVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2M6IGFueSwgcHJpdmF0ZSBfcG9saWN5QWRhcHRlcjogVHJ1c3RlZFR5cGVQb2xpY3lBZGFwdGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHNhbml0aXplKGN0eDogU2VjdXJpdHlDb250ZXh0LCB2YWx1ZTogU2FmZVZhbHVlfHN0cmluZ3xudWxsKTogc3RyaW5nfG51bGwge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgICBzd2l0Y2ggKGN0eCkge1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuTk9ORTpcbiAgICAgICAgcmV0dXJuIHZhbHVlIGFzIHN0cmluZztcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LkhUTUw6XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNhZmVIdG1sSW1wbClcbiAgICAgICAgICByZXR1cm4gdmFsdWUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eSBhcyBzdHJpbmc7XG4gICAgICAgIGlmICh0aGlzLl9wb2xpY3lBZGFwdGVyLmlzSFRNTCh2YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUgYXMgdW5rbm93biBhcyBzdHJpbmc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja05vdFNhZmVWYWx1ZSh2YWx1ZSwgJ0hUTUwnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemVIVE1MKFN0cmluZyh2YWx1ZSkpO1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuU1RZTEU6XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNhZmVTdHlsZUltcGwpXG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHkgYXMgc3RyaW5nO1xuICAgICAgICB0aGlzLmNoZWNrTm90U2FmZVZhbHVlKHZhbHVlLCAnU3R5bGUnKTtcbiAgICAgICAgcmV0dXJuIF9zYW5pdGl6ZVN0eWxlKHZhbHVlIGFzIHN0cmluZyk7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5TQ1JJUFQ6XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNhZmVTY3JpcHRJbXBsKVxuICAgICAgICAgIHJldHVybiB2YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5IGFzIHN0cmluZztcbiAgICAgICAgaWYgKHRoaXMuX3BvbGljeUFkYXB0ZXIuaXNTY3JpcHQodmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlIGFzIHVua25vd24gYXMgc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tOb3RTYWZlVmFsdWUodmFsdWUsICdTY3JpcHQnKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnNhZmUgdmFsdWUgdXNlZCBpbiBhIHNjcmlwdCBjb250ZXh0Jyk7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5VUkw6XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNhZmVSZXNvdXJjZVVybEltcGwgfHwgdmFsdWUgaW5zdGFuY2VvZiBTYWZlVXJsSW1wbCkge1xuICAgICAgICAgIC8vIEFsbG93IHJlc291cmNlIFVSTHMgaW4gVVJMIGNvbnRleHRzLCB0aGV5IGFyZSBzdHJpY3RseSBtb3JlIHRydXN0ZWQuXG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHkgYXMgc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wb2xpY3lBZGFwdGVyLmlzVVJMKHZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZSBhcyB1bmtub3duIGFzIHN0cmluZztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrTm90U2FmZVZhbHVlKHZhbHVlLCAnVVJMJyk7XG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXplVVJMKFN0cmluZyh2YWx1ZSkpO1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuUkVTT1VSQ0VfVVJMOlxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBTYWZlUmVzb3VyY2VVcmxJbXBsKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHkgYXMgc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9wb2xpY3lBZGFwdGVyLmlzU2NyaXB0VVJMKHZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZSBhcyB1bmtub3duIGFzIHN0cmluZztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrTm90U2FmZVZhbHVlKHZhbHVlLCAnUmVzb3VyY2VVUkwnKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ3Vuc2FmZSB2YWx1ZSB1c2VkIGluIGEgcmVzb3VyY2UgVVJMIGNvbnRleHQgKHNlZSBodHRwOi8vZy5jby9uZy9zZWN1cml0eSN4c3MpJyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgU2VjdXJpdHlDb250ZXh0ICR7Y3R4fSAoc2VlIGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5I3hzcylgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNhbml0aXplVVJMKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNhbml0aXplZCA9IF9zYW5pdGl6ZVVybCh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuX3BvbGljeUFkYXB0ZXIubWF5YmVDcmVhdGVUcnVzdGVkVVJMKHNhbml0aXplZCk7XG4gIH1cblxuICBwcml2YXRlIHNhbml0aXplSFRNTCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBzYW5pdGl6ZWQgPSBfc2FuaXRpemVIdG1sKHRoaXMuX2RvYywgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzLl9wb2xpY3lBZGFwdGVyLm1heWJlQ3JlYXRlVHJ1c3RlZEhUTUwoc2FuaXRpemVkKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tOb3RTYWZlVmFsdWUodmFsdWU6IGFueSwgZXhwZWN0ZWRUeXBlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBTYWZlVmFsdWVJbXBsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYFJlcXVpcmVkIGEgc2FmZSAke2V4cGVjdGVkVHlwZX0sIGdvdCBhICR7dmFsdWUuZ2V0VHlwZU5hbWUoKX0gYCArXG4gICAgICAgICAgYChzZWUgaHR0cDovL2cuY28vbmcvc2VjdXJpdHkjeHNzKWApO1xuICAgIH1cbiAgfVxuXG4gIGJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlOiBzdHJpbmcpOiBTYWZlSHRtbCB7XG4gICAgcmV0dXJuIG5ldyBTYWZlSHRtbEltcGwodGhpcy5fcG9saWN5QWRhcHRlci5tYXliZUNyZWF0ZVRydXN0ZWRIVE1MKHZhbHVlKSk7XG4gIH1cbiAgYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHZhbHVlOiBzdHJpbmcpOiBTYWZlU3R5bGUgeyByZXR1cm4gbmV3IFNhZmVTdHlsZUltcGwodmFsdWUpOyB9XG4gIGJ5cGFzc1NlY3VyaXR5VHJ1c3RTY3JpcHQodmFsdWU6IHN0cmluZyk6IFNhZmVTY3JpcHQge1xuICAgIHJldHVybiBuZXcgU2FmZVNjcmlwdEltcGwodGhpcy5fcG9saWN5QWRhcHRlci5tYXliZUNyZWF0ZVRydXN0ZWRTY3JpcHQodmFsdWUpKTtcbiAgfVxuICBieXBhc3NTZWN1cml0eVRydXN0VXJsKHZhbHVlOiBzdHJpbmcpOiBTYWZlVXJsIHtcbiAgICByZXR1cm4gbmV3IFNhZmVVcmxJbXBsKHRoaXMuX3BvbGljeUFkYXB0ZXIubWF5YmVDcmVhdGVUcnVzdGVkVVJMKHZhbHVlKSk7XG4gIH1cbiAgYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHZhbHVlOiBzdHJpbmcpOiBTYWZlUmVzb3VyY2VVcmwge1xuICAgIHJldHVybiBuZXcgU2FmZVJlc291cmNlVXJsSW1wbCh0aGlzLl9wb2xpY3lBZGFwdGVyLm1heWJlQ3JlYXRlVHJ1c3RlZFNjcmlwdFVSTCh2YWx1ZSkpO1xuICB9XG59XG5cbmFic3RyYWN0IGNsYXNzIFNhZmVWYWx1ZUltcGw8VD4gaW1wbGVtZW50cyBTYWZlVmFsdWUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eTogc3RyaW5nfFQpIHtcbiAgICAvLyBlbXB0eVxuICB9XG5cbiAgYWJzdHJhY3QgZ2V0VHlwZU5hbWUoKTogc3RyaW5nO1xuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBgU2FmZVZhbHVlIG11c3QgdXNlIFtwcm9wZXJ0eV09YmluZGluZzogJHt0aGlzLmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHl9YCArXG4gICAgICAgIGAgKHNlZSBodHRwOi8vZy5jby9uZy9zZWN1cml0eSN4c3MpYDtcbiAgfVxufVxuXG5jbGFzcyBTYWZlSHRtbEltcGwgZXh0ZW5kcyBTYWZlVmFsdWVJbXBsPFRydXN0ZWRIVE1MPiBpbXBsZW1lbnRzIFNhZmVIdG1sIHtcbiAgZ2V0VHlwZU5hbWUoKSB7IHJldHVybiAnSFRNTCc7IH1cbn1cbmNsYXNzIFNhZmVTdHlsZUltcGwgZXh0ZW5kcyBTYWZlVmFsdWVJbXBsPHN0cmluZz4gaW1wbGVtZW50cyBTYWZlU3R5bGUge1xuICBnZXRUeXBlTmFtZSgpIHsgcmV0dXJuICdTdHlsZSc7IH1cbn1cbmNsYXNzIFNhZmVTY3JpcHRJbXBsIGV4dGVuZHMgU2FmZVZhbHVlSW1wbDxUcnVzdGVkU2NyaXB0PiBpbXBsZW1lbnRzIFNhZmVTY3JpcHQge1xuICBnZXRUeXBlTmFtZSgpIHsgcmV0dXJuICdTY3JpcHQnOyB9XG59XG5jbGFzcyBTYWZlVXJsSW1wbCBleHRlbmRzIFNhZmVWYWx1ZUltcGw8VHJ1c3RlZFVSTD4gaW1wbGVtZW50cyBTYWZlVXJsIHtcbiAgZ2V0VHlwZU5hbWUoKSB7IHJldHVybiAnVVJMJzsgfVxufVxuY2xhc3MgU2FmZVJlc291cmNlVXJsSW1wbCBleHRlbmRzIFNhZmVWYWx1ZUltcGw8VHJ1c3RlZFNjcmlwdFVSTD4gaW1wbGVtZW50cyBTYWZlUmVzb3VyY2VVcmwge1xuICBnZXRUeXBlTmFtZSgpIHsgcmV0dXJuICdSZXNvdXJjZVVSTCc7IH1cbn1cbiJdfQ==