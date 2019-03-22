/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, SecurityContext, ɵ_sanitizeHtml as _sanitizeHtml, ɵ_sanitizeStyle as _sanitizeStyle, ɵ_sanitizeUrl as _sanitizeUrl } from '@angular/core';
import { TrustedTypePolicyAdapter } from './trusted_types_policy';
export { SecurityContext };
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
 * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](http://g.co/ng/security).
 *
 * @publicApi
 */
var DomSanitizer = /** @class */ (function () {
    function DomSanitizer() {
    }
    return DomSanitizer;
}());
export { DomSanitizer };
var DomSanitizerImpl = /** @class */ (function (_super) {
    tslib_1.__extends(DomSanitizerImpl, _super);
    function DomSanitizerImpl(_doc, _policyAdapter) {
        var _this = _super.call(this) || this;
        _this._doc = _doc;
        _this._policyAdapter = _policyAdapter;
        return _this;
    }
    DomSanitizerImpl.prototype.sanitize = function (ctx, value) {
        if (value == null)
            return null;
        switch (ctx) {
            case SecurityContext.NONE:
                return value;
            case SecurityContext.HTML:
                if (value instanceof SafeHtmlImpl)
                    return value.changingThisBreaksApplicationSecurity;
                if (this._policyAdapter.isHTML(value)) {
                    return value;
                }
                this.checkNotSafeValue(value, 'HTML');
                return this.sanitizeHTML(String(value));
            case SecurityContext.STYLE:
                if (value instanceof SafeStyleImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'Style');
                return _sanitizeStyle(value);
            case SecurityContext.SCRIPT:
                if (value instanceof SafeScriptImpl)
                    return value.changingThisBreaksApplicationSecurity;
                if (this._policyAdapter.isScript(value)) {
                    return value;
                }
                this.checkNotSafeValue(value, 'Script');
                throw new Error('unsafe value used in a script context');
            case SecurityContext.URL:
                if (value instanceof SafeResourceUrlImpl || value instanceof SafeUrlImpl) {
                    // Allow resource URLs in URL contexts, they are strictly more trusted.
                    return value.changingThisBreaksApplicationSecurity;
                }
                if (this._policyAdapter.isURL(value)) {
                    return value;
                }
                this.checkNotSafeValue(value, 'URL');
                return this.sanitizeURL(String(value));
            case SecurityContext.RESOURCE_URL:
                if (value instanceof SafeResourceUrlImpl) {
                    return value.changingThisBreaksApplicationSecurity;
                }
                if (this._policyAdapter.isScriptURL(value)) {
                    return value;
                }
                this.checkNotSafeValue(value, 'ResourceURL');
                throw new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)');
            default:
                throw new Error("Unexpected SecurityContext " + ctx + " (see http://g.co/ng/security#xss)");
        }
    };
    DomSanitizerImpl.prototype.sanitizeURL = function (value) {
        var sanitized = _sanitizeUrl(value);
        return this._policyAdapter.maybeCreateTrustedURL(sanitized);
    };
    DomSanitizerImpl.prototype.sanitizeHTML = function (value) {
        var sanitized = _sanitizeHtml(this._doc, value);
        return this._policyAdapter.maybeCreateTrustedHTML(sanitized);
    };
    DomSanitizerImpl.prototype.checkNotSafeValue = function (value, expectedType) {
        if (value instanceof SafeValueImpl) {
            throw new Error("Required a safe " + expectedType + ", got a " + value.getTypeName() + " " +
                "(see http://g.co/ng/security#xss)");
        }
    };
    DomSanitizerImpl.prototype.bypassSecurityTrustHtml = function (value) {
        return new SafeHtmlImpl(this._policyAdapter.maybeCreateTrustedHTML(value));
    };
    DomSanitizerImpl.prototype.bypassSecurityTrustStyle = function (value) { return new SafeStyleImpl(value); };
    DomSanitizerImpl.prototype.bypassSecurityTrustScript = function (value) {
        return new SafeScriptImpl(this._policyAdapter.maybeCreateTrustedScript(value));
    };
    DomSanitizerImpl.prototype.bypassSecurityTrustUrl = function (value) {
        return new SafeUrlImpl(this._policyAdapter.maybeCreateTrustedURL(value));
    };
    DomSanitizerImpl.prototype.bypassSecurityTrustResourceUrl = function (value) {
        return new SafeResourceUrlImpl(this._policyAdapter.maybeCreateTrustedScriptURL(value));
    };
    DomSanitizerImpl = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [Object, TrustedTypePolicyAdapter])
    ], DomSanitizerImpl);
    return DomSanitizerImpl;
}(DomSanitizer));
export { DomSanitizerImpl };
var SafeValueImpl = /** @class */ (function () {
    function SafeValueImpl(changingThisBreaksApplicationSecurity) {
        this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
        // empty
    }
    SafeValueImpl.prototype.toString = function () {
        return "SafeValue must use [property]=binding: " + this.changingThisBreaksApplicationSecurity +
            " (see http://g.co/ng/security#xss)";
    };
    return SafeValueImpl;
}());
var SafeHtmlImpl = /** @class */ (function (_super) {
    tslib_1.__extends(SafeHtmlImpl, _super);
    function SafeHtmlImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SafeHtmlImpl.prototype.getTypeName = function () { return 'HTML'; };
    return SafeHtmlImpl;
}(SafeValueImpl));
var SafeStyleImpl = /** @class */ (function (_super) {
    tslib_1.__extends(SafeStyleImpl, _super);
    function SafeStyleImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SafeStyleImpl.prototype.getTypeName = function () { return 'Style'; };
    return SafeStyleImpl;
}(SafeValueImpl));
var SafeScriptImpl = /** @class */ (function (_super) {
    tslib_1.__extends(SafeScriptImpl, _super);
    function SafeScriptImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SafeScriptImpl.prototype.getTypeName = function () { return 'Script'; };
    return SafeScriptImpl;
}(SafeValueImpl));
var SafeUrlImpl = /** @class */ (function (_super) {
    tslib_1.__extends(SafeUrlImpl, _super);
    function SafeUrlImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SafeUrlImpl.prototype.getTypeName = function () { return 'URL'; };
    return SafeUrlImpl;
}(SafeValueImpl));
var SafeResourceUrlImpl = /** @class */ (function (_super) {
    tslib_1.__extends(SafeResourceUrlImpl, _super);
    function SafeResourceUrlImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SafeResourceUrlImpl.prototype.getTypeName = function () { return 'ResourceURL'; };
    return SafeResourceUrlImpl;
}(SafeValueImpl));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvc2VjdXJpdHkvZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQWEsZUFBZSxFQUFFLGNBQWMsSUFBSSxhQUFhLEVBQUUsZUFBZSxJQUFJLGNBQWMsRUFBRSxhQUFhLElBQUksWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hMLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBR2hFLE9BQU8sRUFBQyxlQUFlLEVBQUMsQ0FBQztBQThDekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNIO0lBQUE7SUFzREEsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQXRERCxJQXNEQzs7QUFJRDtJQUFzQyw0Q0FBWTtJQUNoRCwwQkFDOEIsSUFBUyxFQUFVLGNBQXdDO1FBRHpGLFlBRUUsaUJBQU8sU0FDUjtRQUY2QixVQUFJLEdBQUosSUFBSSxDQUFLO1FBQVUsb0JBQWMsR0FBZCxjQUFjLENBQTBCOztJQUV6RixDQUFDO0lBRUQsbUNBQVEsR0FBUixVQUFTLEdBQW9CLEVBQUUsS0FBNEI7UUFDekQsSUFBSSxLQUFLLElBQUksSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQy9CLFFBQVEsR0FBRyxFQUFFO1lBQ1gsS0FBSyxlQUFlLENBQUMsSUFBSTtnQkFDdkIsT0FBTyxLQUFlLENBQUM7WUFDekIsS0FBSyxlQUFlLENBQUMsSUFBSTtnQkFDdkIsSUFBSSxLQUFLLFlBQVksWUFBWTtvQkFDL0IsT0FB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QUFvQyxDQUFDO0lBQzNDLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBRUQ7SUFBMkIsd0NBQTBCO0lBQXJEOztJQUVBLENBQUM7SUFEQyxrQ0FBVyxHQUFYLGNBQWdCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNsQyxtQkFBQztBQUFELENBQUMsQUFGRCxDQUEyQixhQUFhLEdBRXZDO0FBQ0Q7SUFBNEIseUNBQXFCO0lBQWpEOztJQUVBLENBQUM7SUFEQyxtQ0FBVyxHQUFYLGNBQWdCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNuQyxvQkFBQztBQUFELENBQUMsQUFGRCxDQUE0QixhQUFhLEdBRXhDO0FBQ0Q7SUFBNkIsMENBQTRCO0lBQXpEOztJQUVBLENBQUM7SUFEQyxvQ0FBVyxHQUFYLGNBQWdCLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNwQyxxQkFBQztBQUFELENBQUMsQUFGRCxDQUE2QixhQUFhLEdBRXpDO0FBQ0Q7SUFBMEIsdUNBQXlCO0lBQW5EOztJQUVBLENBQUM7SUFEQyxpQ0FBVyxHQUFYLGNBQWdCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqQyxrQkFBQztBQUFELENBQUMsQUFGRCxDQUEwQixhQUFhLEdBRXRDO0FBQ0Q7SUFBa0MsK0NBQStCO0lBQWpFOztJQUVBLENBQUM7SUFEQyx5Q0FBVyxHQUFYLGNBQWdCLE9BQU8sYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN6QywwQkFBQztBQUFELENBQUMsQUFGRCxDQUFrQyxhQUFhLEdBRTlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIFNhbml0aXplciwgU2VjdXJpdHlDb250ZXh0LCDJtV9zYW5pdGl6ZUh0bWwgYXMgX3Nhbml0aXplSHRtbCwgybVfc2FuaXRpemVTdHlsZSBhcyBfc2FuaXRpemVTdHlsZSwgybVfc2FuaXRpemVVcmwgYXMgX3Nhbml0aXplVXJsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VHJ1c3RlZFR5cGVQb2xpY3lBZGFwdGVyfSBmcm9tICcuL3RydXN0ZWRfdHlwZXNfcG9saWN5JztcblxuXG5leHBvcnQge1NlY3VyaXR5Q29udGV4dH07XG5cblxuXG4vKipcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGluIGEgcGFydGljdWxhciBjb250ZXh0LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTYWZlVmFsdWUge31cblxuLyoqXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBhcyBIVE1MLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTYWZlSHRtbCBleHRlbmRzIFNhZmVWYWx1ZSB7fVxuXG4vKipcbiAqIE1hcmtlciBpbnRlcmZhY2UgZm9yIGEgdmFsdWUgdGhhdCdzIHNhZmUgdG8gdXNlIGFzIHN0eWxlIChDU1MpLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTYWZlU3R5bGUgZXh0ZW5kcyBTYWZlVmFsdWUge31cblxuLyoqXG4gKiBNYXJrZXIgaW50ZXJmYWNlIGZvciBhIHZhbHVlIHRoYXQncyBzYWZlIHRvIHVzZSBhcyBKYXZhU2NyaXB0LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTYWZlU2NyaXB0IGV4dGVuZHMgU2FmZVZhbHVlIHt9XG5cbi8qKlxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgYSBVUkwgbGlua2luZyB0byBhIGRvY3VtZW50LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTYWZlVXJsIGV4dGVuZHMgU2FmZVZhbHVlIHt9XG5cbi8qKlxuICogTWFya2VyIGludGVyZmFjZSBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2FmZSB0byB1c2UgYXMgYSBVUkwgdG8gbG9hZCBleGVjdXRhYmxlIGNvZGUgZnJvbS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2FmZVJlc291cmNlVXJsIGV4dGVuZHMgU2FmZVZhbHVlIHt9XG5cbi8qKlxuICogRG9tU2FuaXRpemVyIGhlbHBzIHByZXZlbnRpbmcgQ3Jvc3MgU2l0ZSBTY3JpcHRpbmcgU2VjdXJpdHkgYnVncyAoWFNTKSBieSBzYW5pdGl6aW5nXG4gKiB2YWx1ZXMgdG8gYmUgc2FmZSB0byB1c2UgaW4gdGhlIGRpZmZlcmVudCBET00gY29udGV4dHMuXG4gKlxuICogRm9yIGV4YW1wbGUsIHdoZW4gYmluZGluZyBhIFVSTCBpbiBhbiBgPGEgW2hyZWZdPVwic29tZVZhbHVlXCI+YCBoeXBlcmxpbmssIGBzb21lVmFsdWVgIHdpbGwgYmVcbiAqIHNhbml0aXplZCBzbyB0aGF0IGFuIGF0dGFja2VyIGNhbm5vdCBpbmplY3QgZS5nLiBhIGBqYXZhc2NyaXB0OmAgVVJMIHRoYXQgd291bGQgZXhlY3V0ZSBjb2RlIG9uXG4gKiB0aGUgd2Vic2l0ZS5cbiAqXG4gKiBJbiBzcGVjaWZpYyBzaXR1YXRpb25zLCBpdCBtaWdodCBiZSBuZWNlc3NhcnkgdG8gZGlzYWJsZSBzYW5pdGl6YXRpb24sIGZvciBleGFtcGxlIGlmIHRoZVxuICogYXBwbGljYXRpb24gZ2VudWluZWx5IG5lZWRzIHRvIHByb2R1Y2UgYSBgamF2YXNjcmlwdDpgIHN0eWxlIGxpbmsgd2l0aCBhIGR5bmFtaWMgdmFsdWUgaW4gaXQuXG4gKiBVc2VycyBjYW4gYnlwYXNzIHNlY3VyaXR5IGJ5IGNvbnN0cnVjdGluZyBhIHZhbHVlIHdpdGggb25lIG9mIHRoZSBgYnlwYXNzU2VjdXJpdHlUcnVzdC4uLmBcbiAqIG1ldGhvZHMsIGFuZCB0aGVuIGJpbmRpbmcgdG8gdGhhdCB2YWx1ZSBmcm9tIHRoZSB0ZW1wbGF0ZS5cbiAqXG4gKiBUaGVzZSBzaXR1YXRpb25zIHNob3VsZCBiZSB2ZXJ5IHJhcmUsIGFuZCBleHRyYW9yZGluYXJ5IGNhcmUgbXVzdCBiZSB0YWtlbiB0byBhdm9pZCBjcmVhdGluZyBhXG4gKiBDcm9zcyBTaXRlIFNjcmlwdGluZyAoWFNTKSBzZWN1cml0eSBidWchXG4gKlxuICogV2hlbiB1c2luZyBgYnlwYXNzU2VjdXJpdHlUcnVzdC4uLmAsIG1ha2Ugc3VyZSB0byBjYWxsIHRoZSBtZXRob2QgYXMgZWFybHkgYXMgcG9zc2libGUgYW5kIGFzXG4gKiBjbG9zZSBhcyBwb3NzaWJsZSB0byB0aGUgc291cmNlIG9mIHRoZSB2YWx1ZSwgdG8gbWFrZSBpdCBlYXN5IHRvIHZlcmlmeSBubyBzZWN1cml0eSBidWcgaXNcbiAqIGNyZWF0ZWQgYnkgaXRzIHVzZS5cbiAqXG4gKiBJdCBpcyBub3QgcmVxdWlyZWQgKGFuZCBub3QgcmVjb21tZW5kZWQpIHRvIGJ5cGFzcyBzZWN1cml0eSBpZiB0aGUgdmFsdWUgaXMgc2FmZSwgZS5nLiBhIFVSTCB0aGF0XG4gKiBkb2VzIG5vdCBzdGFydCB3aXRoIGEgc3VzcGljaW91cyBwcm90b2NvbCwgb3IgYW4gSFRNTCBzbmlwcGV0IHRoYXQgZG9lcyBub3QgY29udGFpbiBkYW5nZXJvdXNcbiAqIGNvZGUuIFRoZSBzYW5pdGl6ZXIgbGVhdmVzIHNhZmUgdmFsdWVzIGludGFjdC5cbiAqXG4gKiBAc2VjdXJpdHkgQ2FsbGluZyBhbnkgb2YgdGhlIGBieXBhc3NTZWN1cml0eVRydXN0Li4uYCBBUElzIGRpc2FibGVzIEFuZ3VsYXIncyBidWlsdC1pblxuICogc2FuaXRpemF0aW9uIGZvciB0aGUgdmFsdWUgcGFzc2VkIGluLiBDYXJlZnVsbHkgY2hlY2sgYW5kIGF1ZGl0IGFsbCB2YWx1ZXMgYW5kIGNvZGUgcGF0aHMgZ29pbmdcbiAqIGludG8gdGhpcyBjYWxsLiBNYWtlIHN1cmUgYW55IHVzZXIgZGF0YSBpcyBhcHByb3ByaWF0ZWx5IGVzY2FwZWQgZm9yIHRoaXMgc2VjdXJpdHkgY29udGV4dC5cbiAqIEZvciBtb3JlIGRldGFpbCwgc2VlIHRoZSBbU2VjdXJpdHkgR3VpZGVdKGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5KS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEb21TYW5pdGl6ZXIgaW1wbGVtZW50cyBTYW5pdGl6ZXIge1xuICAvKipcbiAgICogU2FuaXRpemVzIGEgdmFsdWUgZm9yIHVzZSBpbiB0aGUgZ2l2ZW4gU2VjdXJpdHlDb250ZXh0LlxuICAgKlxuICAgKiBJZiB2YWx1ZSBpcyB0cnVzdGVkIGZvciB0aGUgY29udGV4dCwgdGhpcyBtZXRob2Qgd2lsbCB1bndyYXAgdGhlIGNvbnRhaW5lZCBzYWZlIHZhbHVlIGFuZCB1c2VcbiAgICogaXQgZGlyZWN0bHkuIE90aGVyd2lzZSwgdmFsdWUgd2lsbCBiZSBzYW5pdGl6ZWQgdG8gYmUgc2FmZSBpbiB0aGUgZ2l2ZW4gY29udGV4dCwgZm9yIGV4YW1wbGVcbiAgICogYnkgcmVwbGFjaW5nIFVSTHMgdGhhdCBoYXZlIGFuIHVuc2FmZSBwcm90b2NvbCBwYXJ0IChzdWNoIGFzIGBqYXZhc2NyaXB0OmApLiBUaGUgaW1wbGVtZW50YXRpb25cbiAgICogaXMgcmVzcG9uc2libGUgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHZhbHVlIGNhbiBkZWZpbml0ZWx5IGJlIHNhZmVseSB1c2VkIGluIHRoZSBnaXZlbiBjb250ZXh0LlxuICAgKi9cbiAgYWJzdHJhY3Qgc2FuaXRpemUoY29udGV4dDogU2VjdXJpdHlDb250ZXh0LCB2YWx1ZTogU2FmZVZhbHVlfHN0cmluZ3xudWxsKTogc3RyaW5nfG51bGw7XG5cbiAgLyoqXG4gICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIHNhZmUgSFRNTC4gT25seSB1c2UgdGhpcyB3aGVuIHRoZSBib3VuZCBIVE1MXG4gICAqIGlzIHVuc2FmZSAoZS5nLiBjb250YWlucyBgPHNjcmlwdD5gIHRhZ3MpIGFuZCB0aGUgY29kZSBzaG91bGQgYmUgZXhlY3V0ZWQuIFRoZSBzYW5pdGl6ZXIgd2lsbFxuICAgKiBsZWF2ZSBzYWZlIEhUTUwgaW50YWN0LCBzbyBpbiBtb3N0IHNpdHVhdGlvbnMgdGhpcyBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgKlxuICAgKiAqKldBUk5JTkc6KiogY2FsbGluZyB0aGlzIG1ldGhvZCB3aXRoIHVudHJ1c3RlZCB1c2VyIGRhdGEgZXhwb3NlcyB5b3VyIGFwcGxpY2F0aW9uIHRvIFhTU1xuICAgKiBzZWN1cml0eSByaXNrcyFcbiAgICovXG4gIGFic3RyYWN0IGJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHZhbHVlOiBzdHJpbmcpOiBTYWZlSHRtbDtcblxuICAvKipcbiAgICogQnlwYXNzIHNlY3VyaXR5IGFuZCB0cnVzdCB0aGUgZ2l2ZW4gdmFsdWUgdG8gYmUgc2FmZSBzdHlsZSB2YWx1ZSAoQ1NTKS5cbiAgICpcbiAgICogKipXQVJOSU5HOioqIGNhbGxpbmcgdGhpcyBtZXRob2Qgd2l0aCB1bnRydXN0ZWQgdXNlciBkYXRhIGV4cG9zZXMgeW91ciBhcHBsaWNhdGlvbiB0byBYU1NcbiAgICogc2VjdXJpdHkgcmlza3MhXG4gICAqL1xuICBhYnN0cmFjdCBieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodmFsdWU6IHN0cmluZyk6IFNhZmVTdHlsZTtcblxuICAvKipcbiAgICogQnlwYXNzIHNlY3VyaXR5IGFuZCB0cnVzdCB0aGUgZ2l2ZW4gdmFsdWUgdG8gYmUgc2FmZSBKYXZhU2NyaXB0LlxuICAgKlxuICAgKiAqKldBUk5JTkc6KiogY2FsbGluZyB0aGlzIG1ldGhvZCB3aXRoIHVudHJ1c3RlZCB1c2VyIGRhdGEgZXhwb3NlcyB5b3VyIGFwcGxpY2F0aW9uIHRvIFhTU1xuICAgKiBzZWN1cml0eSByaXNrcyFcbiAgICovXG4gIGFic3RyYWN0IGJ5cGFzc1NlY3VyaXR5VHJ1c3RTY3JpcHQodmFsdWU6IHN0cmluZyk6IFNhZmVTY3JpcHQ7XG5cbiAgLyoqXG4gICAqIEJ5cGFzcyBzZWN1cml0eSBhbmQgdHJ1c3QgdGhlIGdpdmVuIHZhbHVlIHRvIGJlIGEgc2FmZSBzdHlsZSBVUkwsIGkuZS4gYSB2YWx1ZSB0aGF0IGNhbiBiZSB1c2VkXG4gICAqIGluIGh5cGVybGlua3Mgb3IgYDxpbWcgc3JjPmAuXG4gICAqXG4gICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXG4gICAqIHNlY3VyaXR5IHJpc2tzIVxuICAgKi9cbiAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdFVybCh2YWx1ZTogc3RyaW5nKTogU2FmZVVybDtcblxuICAvKipcbiAgICogQnlwYXNzIHNlY3VyaXR5IGFuZCB0cnVzdCB0aGUgZ2l2ZW4gdmFsdWUgdG8gYmUgYSBzYWZlIHJlc291cmNlIFVSTCwgaS5lLiBhIGxvY2F0aW9uIHRoYXQgbWF5XG4gICAqIGJlIHVzZWQgdG8gbG9hZCBleGVjdXRhYmxlIGNvZGUgZnJvbSwgbGlrZSBgPHNjcmlwdCBzcmM+YCwgb3IgYDxpZnJhbWUgc3JjPmAuXG4gICAqXG4gICAqICoqV0FSTklORzoqKiBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpdGggdW50cnVzdGVkIHVzZXIgZGF0YSBleHBvc2VzIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTXG4gICAqIHNlY3VyaXR5IHJpc2tzIVxuICAgKi9cbiAgYWJzdHJhY3QgYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHZhbHVlOiBzdHJpbmcpOiBTYWZlUmVzb3VyY2VVcmw7XG59XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERvbVNhbml0aXplckltcGwgZXh0ZW5kcyBEb21TYW5pdGl6ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvYzogYW55LCBwcml2YXRlIF9wb2xpY3lBZGFwdGVyOiBUcnVzdGVkVHlwZVBvbGljeUFkYXB0ZXIpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgc2FuaXRpemUoY3R4OiBTZWN1cml0eUNvbnRleHQsIHZhbHVlOiBTYWZlVmFsdWV8c3RyaW5nfG51bGwpOiBzdHJpbmd8bnVsbCB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBudWxsO1xuICAgIHN3aXRjaCAoY3R4KSB7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5OT05FOlxuICAgICAgICByZXR1cm4gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuSFRNTDpcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU2FmZUh0bWxJbXBsKVxuICAgICAgICAgIHJldHVybiB2YWx1ZS5jaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5IGFzIHN0cmluZztcbiAgICAgICAgaWYgKHRoaXMuX3BvbGljeUFkYXB0ZXIuaXNIVE1MKHZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZSBhcyB1bmtub3duIGFzIHN0cmluZztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrTm90U2FmZVZhbHVlKHZhbHVlLCAnSFRNTCcpO1xuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZUhUTUwoU3RyaW5nKHZhbHVlKSk7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5TVFlMRTpcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU2FmZVN0eWxlSW1wbClcbiAgICAgICAgICByZXR1cm4gdmFsdWUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eSBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuY2hlY2tOb3RTYWZlVmFsdWUodmFsdWUsICdTdHlsZScpO1xuICAgICAgICByZXR1cm4gX3Nhbml0aXplU3R5bGUodmFsdWUgYXMgc3RyaW5nKTtcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LlNDUklQVDpcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU2FmZVNjcmlwdEltcGwpXG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHkgYXMgc3RyaW5nO1xuICAgICAgICBpZiAodGhpcy5fcG9saWN5QWRhcHRlci5pc1NjcmlwdCh2YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUgYXMgdW5rbm93biBhcyBzdHJpbmc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja05vdFNhZmVWYWx1ZSh2YWx1ZSwgJ1NjcmlwdCcpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc2FmZSB2YWx1ZSB1c2VkIGluIGEgc2NyaXB0IGNvbnRleHQnKTtcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LlVSTDpcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU2FmZVJlc291cmNlVXJsSW1wbCB8fCB2YWx1ZSBpbnN0YW5jZW9mIFNhZmVVcmxJbXBsKSB7XG4gICAgICAgICAgLy8gQWxsb3cgcmVzb3VyY2UgVVJMcyBpbiBVUkwgY29udGV4dHMsIHRoZXkgYXJlIHN0cmljdGx5IG1vcmUgdHJ1c3RlZC5cbiAgICAgICAgICByZXR1cm4gdmFsdWUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eSBhcyBzdHJpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3BvbGljeUFkYXB0ZXIuaXNVUkwodmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlIGFzIHVua25vd24gYXMgc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tOb3RTYWZlVmFsdWUodmFsdWUsICdVUkwnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemVVUkwoU3RyaW5nKHZhbHVlKSk7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5SRVNPVVJDRV9VUkw6XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNhZmVSZXNvdXJjZVVybEltcGwpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eSBhcyBzdHJpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3BvbGljeUFkYXB0ZXIuaXNTY3JpcHRVUkwodmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlIGFzIHVua25vd24gYXMgc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tOb3RTYWZlVmFsdWUodmFsdWUsICdSZXNvdXJjZVVSTCcpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAndW5zYWZlIHZhbHVlIHVzZWQgaW4gYSByZXNvdXJjZSBVUkwgY29udGV4dCAoc2VlIGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5I3hzcyknKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBTZWN1cml0eUNvbnRleHQgJHtjdHh9IChzZWUgaHR0cDovL2cuY28vbmcvc2VjdXJpdHkjeHNzKWApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2FuaXRpemVVUkwodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2FuaXRpemVkID0gX3Nhbml0aXplVXJsKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5fcG9saWN5QWRhcHRlci5tYXliZUNyZWF0ZVRydXN0ZWRVUkwoc2FuaXRpemVkKTtcbiAgfVxuXG4gIHByaXZhdGUgc2FuaXRpemVIVE1MKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNhbml0aXplZCA9IF9zYW5pdGl6ZUh0bWwodGhpcy5fZG9jLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMuX3BvbGljeUFkYXB0ZXIubWF5YmVDcmVhdGVUcnVzdGVkSFRNTChzYW5pdGl6ZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja05vdFNhZmVWYWx1ZSh2YWx1ZTogYW55LCBleHBlY3RlZFR5cGU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNhZmVWYWx1ZUltcGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgUmVxdWlyZWQgYSBzYWZlICR7ZXhwZWN0ZWRUeXBlfSwgZ290IGEgJHt2YWx1ZS5nZXRUeXBlTmFtZSgpfSBgICtcbiAgICAgICAgICBgKHNlZSBodHRwOi8vZy5jby9uZy9zZWN1cml0eSN4c3MpYCk7XG4gICAgfVxuICB9XG5cbiAgYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodmFsdWU6IHN0cmluZyk6IFNhZmVIdG1sIHtcbiAgICByZXR1cm4gbmV3IFNhZmVIdG1sSW1wbCh0aGlzLl9wb2xpY3lBZGFwdGVyLm1heWJlQ3JlYXRlVHJ1c3RlZEhUTUwodmFsdWUpKTtcbiAgfVxuICBieXBhc3NTZWN1cml0eVRydXN0U3R5bGUodmFsdWU6IHN0cmluZyk6IFNhZmVTdHlsZSB7IHJldHVybiBuZXcgU2FmZVN0eWxlSW1wbCh2YWx1ZSk7IH1cbiAgYnlwYXNzU2VjdXJpdHlUcnVzdFNjcmlwdCh2YWx1ZTogc3RyaW5nKTogU2FmZVNjcmlwdCB7XG4gICAgcmV0dXJuIG5ldyBTYWZlU2NyaXB0SW1wbCh0aGlzLl9wb2xpY3lBZGFwdGVyLm1heWJlQ3JlYXRlVHJ1c3RlZFNjcmlwdCh2YWx1ZSkpO1xuICB9XG4gIGJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwodmFsdWU6IHN0cmluZyk6IFNhZmVVcmwge1xuICAgIHJldHVybiBuZXcgU2FmZVVybEltcGwodGhpcy5fcG9saWN5QWRhcHRlci5tYXliZUNyZWF0ZVRydXN0ZWRVUkwodmFsdWUpKTtcbiAgfVxuICBieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodmFsdWU6IHN0cmluZyk6IFNhZmVSZXNvdXJjZVVybCB7XG4gICAgcmV0dXJuIG5ldyBTYWZlUmVzb3VyY2VVcmxJbXBsKHRoaXMuX3BvbGljeUFkYXB0ZXIubWF5YmVDcmVhdGVUcnVzdGVkU2NyaXB0VVJMKHZhbHVlKSk7XG4gIH1cbn1cblxuYWJzdHJhY3QgY2xhc3MgU2FmZVZhbHVlSW1wbDxUPiBpbXBsZW1lbnRzIFNhZmVWYWx1ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjaGFuZ2luZ1RoaXNCcmVha3NBcHBsaWNhdGlvblNlY3VyaXR5OiBzdHJpbmd8VCkge1xuICAgIC8vIGVtcHR5XG4gIH1cblxuICBhYnN0cmFjdCBnZXRUeXBlTmFtZSgpOiBzdHJpbmc7XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGBTYWZlVmFsdWUgbXVzdCB1c2UgW3Byb3BlcnR5XT1iaW5kaW5nOiAke3RoaXMuY2hhbmdpbmdUaGlzQnJlYWtzQXBwbGljYXRpb25TZWN1cml0eX1gICtcbiAgICAgICAgYCAoc2VlIGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5I3hzcylgO1xuICB9XG59XG5cbmNsYXNzIFNhZmVIdG1sSW1wbCBleHRlbmRzIFNhZmVWYWx1ZUltcGw8VHJ1c3RlZEhUTUw+IGltcGxlbWVudHMgU2FmZUh0bWwge1xuICBnZXRUeXBlTmFtZSgpIHsgcmV0dXJuICdIVE1MJzsgfVxufVxuY2xhc3MgU2FmZVN0eWxlSW1wbCBleHRlbmRzIFNhZmVWYWx1ZUltcGw8c3RyaW5nPiBpbXBsZW1lbnRzIFNhZmVTdHlsZSB7XG4gIGdldFR5cGVOYW1lKCkgeyByZXR1cm4gJ1N0eWxlJzsgfVxufVxuY2xhc3MgU2FmZVNjcmlwdEltcGwgZXh0ZW5kcyBTYWZlVmFsdWVJbXBsPFRydXN0ZWRTY3JpcHQ+IGltcGxlbWVudHMgU2FmZVNjcmlwdCB7XG4gIGdldFR5cGVOYW1lKCkgeyByZXR1cm4gJ1NjcmlwdCc7IH1cbn1cbmNsYXNzIFNhZmVVcmxJbXBsIGV4dGVuZHMgU2FmZVZhbHVlSW1wbDxUcnVzdGVkVVJMPiBpbXBsZW1lbnRzIFNhZmVVcmwge1xuICBnZXRUeXBlTmFtZSgpIHsgcmV0dXJuICdVUkwnOyB9XG59XG5jbGFzcyBTYWZlUmVzb3VyY2VVcmxJbXBsIGV4dGVuZHMgU2FmZVZhbHVlSW1wbDxUcnVzdGVkU2NyaXB0VVJMPiBpbXBsZW1lbnRzIFNhZmVSZXNvdXJjZVVybCB7XG4gIGdldFR5cGVOYW1lKCkgeyByZXR1cm4gJ1Jlc291cmNlVVJMJzsgfVxufVxuIl19