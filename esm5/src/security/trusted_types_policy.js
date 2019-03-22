/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
/// <reference types="trusted-types" />
import { Inject, Injectable, InjectionToken, SecurityContext } from '@angular/core';
/**
 * The name of the Trusted Type policy to create.
 * @publicApi
 */
export var TRUSTED_TYPE_POLICY_NAME = new InjectionToken('trusted-type-policy-name');
/**
 * This list is used to wrap values passed from DomRenderer2 in types.
 * Using SecurityContexts just for convenience, as the type contacts match.
 */
var ATTR_TYPE_MAP = {
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
 * @publicApi
 */
var TrustedTypePolicyAdapter = /** @class */ (function () {
    function TrustedTypePolicyAdapter() {
    }
    TrustedTypePolicyAdapter.prototype.supportsTrustedTypes = function () { return false; };
    return TrustedTypePolicyAdapter;
}());
export { TrustedTypePolicyAdapter };
var TrustedTypePolicyAdapterImpl = /** @class */ (function (_super) {
    tslib_1.__extends(TrustedTypePolicyAdapterImpl, _super);
    function TrustedTypePolicyAdapterImpl(_name) {
        var _this = _super.call(this) || this;
        _this._name = _name;
        if (typeof TrustedTypes !== 'undefined' && Boolean(TrustedTypes.createPolicy)) {
            _this._policy = TrustedTypes.createPolicy(_this._name, {
                createURL: function (s) { return s; },
                createScriptURL: function (s) { return s; },
                createScript: function (s) { return s; },
                createHTML: function (s) { return s; }
            }, false);
        }
        return _this;
    }
    TrustedTypePolicyAdapterImpl.prototype.supportsTrustedTypes = function () { return Boolean(this._policy); };
    TrustedTypePolicyAdapterImpl.prototype.isHTML = function (obj) {
        return this._policy ? obj instanceof TrustedHTML && TrustedTypes.isHTML(obj) : false;
    };
    TrustedTypePolicyAdapterImpl.prototype.isScript = function (obj) {
        return this._policy ? obj instanceof TrustedScript && TrustedTypes.isScript(obj) :
            false;
    };
    TrustedTypePolicyAdapterImpl.prototype.isURL = function (obj) {
        return this._policy ? obj instanceof TrustedURL && TrustedTypes.isURL(obj) : false;
    };
    TrustedTypePolicyAdapterImpl.prototype.isScriptURL = function (obj) {
        return this._policy ?
            obj instanceof TrustedScriptURL && TrustedTypes.isScriptURL(obj) :
            false;
    };
    TrustedTypePolicyAdapterImpl.prototype.maybeCreateTrustedHTML = function (s) {
        return this._policy ? this._policy.createHTML(s) : s;
    };
    TrustedTypePolicyAdapterImpl.prototype.maybeCreateTrustedURL = function (s) {
        return this._policy ? this._policy.createURL(s) : s;
    };
    TrustedTypePolicyAdapterImpl.prototype.maybeCreateTrustedScriptURL = function (s) {
        return this._policy ? this._policy.createScriptURL(s) : s;
    };
    TrustedTypePolicyAdapterImpl.prototype.maybeCreateTrustedScript = function (s) {
        return this._policy ? this._policy.createScript(s) : s;
    };
    TrustedTypePolicyAdapterImpl.prototype.maybeCreateTrustedValueForAttribute = function (el, name, value, namespace) {
        if (!this._policy || !(el instanceof Element)) {
            return value;
        }
        var context = this._getContext(el.tagName.toLowerCase(), name.toLowerCase(), namespace);
        var newValue;
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
        return newValue;
    };
    TrustedTypePolicyAdapterImpl.prototype._getContext = function (tag, attribute, namespace) {
        var e_1, _a;
        var lookupCandidates = [
            tag + ':' + attribute,
            '*:' + attribute,
        ];
        try {
            for (var lookupCandidates_1 = tslib_1.__values(lookupCandidates), lookupCandidates_1_1 = lookupCandidates_1.next(); !lookupCandidates_1_1.done; lookupCandidates_1_1 = lookupCandidates_1.next()) {
                var lookup = lookupCandidates_1_1.value;
                if (lookup in ATTR_TYPE_MAP) {
                    return ATTR_TYPE_MAP[lookup];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (lookupCandidates_1_1 && !lookupCandidates_1_1.done && (_a = lookupCandidates_1.return)) _a.call(lookupCandidates_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return SecurityContext.NONE;
    };
    TrustedTypePolicyAdapterImpl = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(TRUSTED_TYPE_POLICY_NAME)),
        tslib_1.__metadata("design:paramtypes", [String])
    ], TrustedTypePolicyAdapterImpl);
    return TrustedTypePolicyAdapterImpl;
}(TrustedTypePolicyAdapter));
export { TrustedTypePolicyAdapterImpl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RlZF90eXBlc19wb2xpY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9zZWN1cml0eS90cnVzdGVkX3R5cGVzX3BvbGljeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUNBQXVDO0FBRXZDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFbEY7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sd0JBQXdCLEdBQUcsSUFBSSxjQUFjLENBQVMsMEJBQTBCLENBQUMsQ0FBQztBQUUvRjs7O0dBR0c7QUFDSCxJQUFNLGFBQWEsR0FBcUM7SUFDdEQsZUFBZTtJQUNmLFlBQVksRUFBRSxlQUFlLENBQUMsWUFBWTtJQUMxQywrREFBK0Q7SUFDL0QsV0FBVyxFQUFFLGVBQWUsQ0FBQyxZQUFZO0lBQ3pDLGVBQWUsRUFBRSxlQUFlLENBQUMsSUFBSTtJQUNyQyxhQUFhLEVBQUUsZUFBZSxDQUFDLFlBQVk7SUFDM0MsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLFlBQVk7SUFDL0MsUUFBUSxFQUFFLGVBQWUsQ0FBQyxHQUFHO0lBQzdCLE9BQU8sRUFBRSxlQUFlLENBQUMsR0FBRztJQUM1QixjQUFjLEVBQUUsZUFBZSxDQUFDLEdBQUc7SUFDbkMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxJQUFJO0lBQ25DLGFBQWEsRUFBRSxlQUFlLENBQUMsSUFBSTtDQUNwQyxDQUFDO0FBRUY7Ozs7OztHQU1HO0FBQ0g7SUFBQTtJQVlBLENBQUM7SUFYQyx1REFBb0IsR0FBcEIsY0FBa0MsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBV25ELCtCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7O0FBR0Q7SUFBa0Qsd0RBQXdCO0lBRXhFLHNDQUFzRCxLQUFh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TUFBTSw2QkFBQTtnQkFDYixJQUFJLE1BQU0sSUFBSSxhQUFhLEVBQUU7b0JBQzNCLE9BQU8sYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM5QjthQUFBOzs7Ozs7Ozs7UUFDSCxPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQXZGVSw0QkFBNEI7UUFEeEMsVUFBVSxFQUFFO1FBR0UsbUJBQUEsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUE7O09BRmxDLDRCQUE0QixDQXdGeEM7SUFBRCxtQ0FBQztDQUFBLEFBeEZELENBQWtELHdCQUF3QixHQXdGekU7U0F4RlksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cInRydXN0ZWQtdHlwZXNcIiAvPlxuXG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIFNlY3VyaXR5Q29udGV4dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIG5hbWUgb2YgdGhlIFRydXN0ZWQgVHlwZSBwb2xpY3kgdG8gY3JlYXRlLlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgVFJVU1RFRF9UWVBFX1BPTElDWV9OQU1FID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ3RydXN0ZWQtdHlwZS1wb2xpY3ktbmFtZScpO1xuXG4vKipcbiAqIFRoaXMgbGlzdCBpcyB1c2VkIHRvIHdyYXAgdmFsdWVzIHBhc3NlZCBmcm9tIERvbVJlbmRlcmVyMiBpbiB0eXBlcy5cbiAqIFVzaW5nIFNlY3VyaXR5Q29udGV4dHMganVzdCBmb3IgY29udmVuaWVuY2UsIGFzIHRoZSB0eXBlIGNvbnRhY3RzIG1hdGNoLlxuICovXG5jb25zdCBBVFRSX1RZUEVfTUFQOiB7W2tleTogc3RyaW5nXTogU2VjdXJpdHlDb250ZXh0fSA9IHtcbiAgLy8gRG8gbm90IHNvcnQuXG4gICdzY3JpcHQ6c3JjJzogU2VjdXJpdHlDb250ZXh0LlJFU09VUkNFX1VSTCxcbiAgLy8gRmlndXJlIG91dCB3aGF0IHRvIGRvIHdpdGggc2NyaXB0LnRleHQsIHNoYWRvd3Jvb3QgaW5uZXJIVE1MXG4gICdlbWJlZDpzcmMnOiBTZWN1cml0eUNvbnRleHQuUkVTT1VSQ0VfVVJMLFxuICAnaWZyYW1lOnNyY2RvYyc6IFNlY3VyaXR5Q29udGV4dC5IVE1MLFxuICAnb2JqZWN0OmRhdGEnOiBTZWN1cml0eUNvbnRleHQuUkVTT1VSQ0VfVVJMLFxuICAnb2JqZWN0OmNvZGViYXNlJzogU2VjdXJpdHlDb250ZXh0LlJFU09VUkNFX1VSTCxcbiAgJ2E6aHJlZic6IFNlY3VyaXR5Q29udGV4dC5VUkwsXG4gICcqOnNyYyc6IFNlY3VyaXR5Q29udGV4dC5VUkwsXG4gICcqOmZvcm1hY3Rpb24nOiBTZWN1cml0eUNvbnRleHQuVVJMLFxuICAnKjppbm5lcmh0bWwnOiBTZWN1cml0eUNvbnRleHQuSFRNTCxcbiAgJyo6b3V0ZXJodG1sJzogU2VjdXJpdHlDb250ZXh0LkhUTUwsXG59O1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIHRoZSBUcnVzdGVkIFR5cGUgUG9saWN5LiBcbiAqIFVzZWQgYnkgdGhlIERvbVJlbmRlcmVyMiBhbmQgdGhlIHNhbml0aXplciBvbmx5LiBcbiAqIEBzZWUgaHR0cHM6Ly93aWNnLmdpdGh1Yi5pby90cnVzdGVkLXR5cGVzL1xuICogXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUcnVzdGVkVHlwZVBvbGljeUFkYXB0ZXIge1xuICBzdXBwb3J0c1RydXN0ZWRUeXBlcygpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGFic3RyYWN0IG1heWJlQ3JlYXRlVHJ1c3RlZFVSTCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nO1xuICBhYnN0cmFjdCBtYXliZUNyZWF0ZVRydXN0ZWRIVE1MKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmc7XG4gIGFic3RyYWN0IG1heWJlQ3JlYXRlVHJ1c3RlZFNjcmlwdCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nO1xuICBhYnN0cmFjdCBtYXliZUNyZWF0ZVRydXN0ZWRTY3JpcHRVUkwodmFsdWU6IHN0cmluZyk6IHN0cmluZztcbiAgYWJzdHJhY3QgbWF5YmVDcmVhdGVUcnVzdGVkVmFsdWVGb3JBdHRyaWJ1dGUoXG4gICAgICBlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZyk6IHN0cmluZztcbiAgYWJzdHJhY3QgaXNIVE1MKG9iajogYW55KTogYm9vbGVhbjtcbiAgYWJzdHJhY3QgaXNVUkwob2JqOiBhbnkpOiBib29sZWFuO1xuICBhYnN0cmFjdCBpc1NjcmlwdFVSTChvYmo6IGFueSk6IGJvb2xlYW47XG4gIGFic3RyYWN0IGlzU2NyaXB0KG9iajogYW55KTogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRydXN0ZWRUeXBlUG9saWN5QWRhcHRlckltcGwgZXh0ZW5kcyBUcnVzdGVkVHlwZVBvbGljeUFkYXB0ZXIge1xuICBwcml2YXRlIF9wb2xpY3k6IFRydXN0ZWRUeXBlUG9saWN5fHVuZGVmaW5lZDtcbiAgY29uc3RydWN0b3IoQEluamVjdChUUlVTVEVEX1RZUEVfUE9MSUNZX05BTUUpIHByaXZhdGUgX25hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKHR5cGVvZiBUcnVzdGVkVHlwZXMgIT09ICd1bmRlZmluZWQnICYmIEJvb2xlYW4oVHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSkpIHtcbiAgICAgIHRoaXMuX3BvbGljeSA9IFRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3koXG4gICAgICAgICAgdGhpcy5fbmFtZSwge1xuICAgICAgICAgICAgY3JlYXRlVVJMOiAoczogc3RyaW5nKSA9PiBzLFxuICAgICAgICAgICAgY3JlYXRlU2NyaXB0VVJMOiAoczogc3RyaW5nKSA9PiBzLFxuICAgICAgICAgICAgY3JlYXRlU2NyaXB0OiAoczogc3RyaW5nKSA9PiBzLFxuICAgICAgICAgICAgY3JlYXRlSFRNTDogKHM6IHN0cmluZykgPT4gc1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHN1cHBvcnRzVHJ1c3RlZFR5cGVzKCk6IGJvb2xlYW4geyByZXR1cm4gQm9vbGVhbih0aGlzLl9wb2xpY3kpOyB9XG5cbiAgaXNIVE1MKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3BvbGljeSA/IG9iaiBpbnN0YW5jZW9mIFRydXN0ZWRIVE1MICYmIChUcnVzdGVkVHlwZXMgYXMgYW55KS5pc0hUTUwob2JqKSA6IGZhbHNlO1xuICB9XG5cbiAgaXNTY3JpcHQob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcG9saWN5ID8gb2JqIGluc3RhbmNlb2YgVHJ1c3RlZFNjcmlwdCAmJiAoVHJ1c3RlZFR5cGVzIGFzIGFueSkuaXNTY3JpcHQob2JqKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlO1xuICB9XG5cbiAgaXNVUkwob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcG9saWN5ID8gb2JqIGluc3RhbmNlb2YgVHJ1c3RlZFVSTCAmJiAoVHJ1c3RlZFR5cGVzIGFzIGFueSkuaXNVUkwob2JqKSA6IGZhbHNlO1xuICB9XG5cbiAgaXNTY3JpcHRVUkwob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcG9saWN5ID9cbiAgICAgICAgb2JqIGluc3RhbmNlb2YgVHJ1c3RlZFNjcmlwdFVSTCAmJiAoVHJ1c3RlZFR5cGVzIGFzIGFueSkuaXNTY3JpcHRVUkwob2JqKSA6XG4gICAgICAgIGZhbHNlO1xuICB9XG5cbiAgbWF5YmVDcmVhdGVUcnVzdGVkSFRNTChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wb2xpY3kgPyB0aGlzLl9wb2xpY3kuY3JlYXRlSFRNTChzKSBhcyB1bmtub3duIGFzIHN0cmluZyA6IHM7XG4gIH1cbiAgbWF5YmVDcmVhdGVUcnVzdGVkVVJMKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BvbGljeSA/IHRoaXMuX3BvbGljeS5jcmVhdGVVUkwocykgYXMgdW5rbm93biBhcyBzdHJpbmcgOiBzO1xuICB9XG4gIG1heWJlQ3JlYXRlVHJ1c3RlZFNjcmlwdFVSTChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9wb2xpY3kgPyB0aGlzLl9wb2xpY3kuY3JlYXRlU2NyaXB0VVJMKHMpIGFzIHVua25vd24gYXMgc3RyaW5nIDogcztcbiAgfVxuICBtYXliZUNyZWF0ZVRydXN0ZWRTY3JpcHQoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcG9saWN5ID8gdGhpcy5fcG9saWN5LmNyZWF0ZVNjcmlwdChzKSBhcyB1bmtub3duIGFzIHN0cmluZyA6IHM7XG4gIH1cbiAgbWF5YmVDcmVhdGVUcnVzdGVkVmFsdWVGb3JBdHRyaWJ1dGUoZWw6IEVsZW1lbnQsIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTpcbiAgICAgIHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLl9wb2xpY3kgfHwgIShlbCBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9nZXRDb250ZXh0KGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSwgbmFtZS50b0xvd2VyQ2FzZSgpLCBuYW1lc3BhY2UpO1xuICAgIGxldCBuZXdWYWx1ZTtcbiAgICBzd2l0Y2ggKGNvbnRleHQpIHtcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LkhUTUw6XG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5tYXliZUNyZWF0ZVRydXN0ZWRIVE1MKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5VUkw6XG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5tYXliZUNyZWF0ZVRydXN0ZWRVUkwodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU2VjdXJpdHlDb250ZXh0LlJFU09VUkNFX1VSTDpcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLm1heWJlQ3JlYXRlVHJ1c3RlZFNjcmlwdFVSTCh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTZWN1cml0eUNvbnRleHQuU0NSSVBUOlxuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMubWF5YmVDcmVhdGVUcnVzdGVkU2NyaXB0KHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFNlY3VyaXR5Q29udGV4dC5OT05FOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBuZXdWYWx1ZSBhcyBzdHJpbmc7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDb250ZXh0KHRhZzogc3RyaW5nLCBhdHRyaWJ1dGU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nKTogU2VjdXJpdHlDb250ZXh0IHtcbiAgICBjb25zdCBsb29rdXBDYW5kaWRhdGVzID0gW1xuICAgICAgdGFnICsgJzonICsgYXR0cmlidXRlLFxuICAgICAgJyo6JyArIGF0dHJpYnV0ZSxcbiAgICBdO1xuICAgIGZvciAobGV0IGxvb2t1cCBvZiBsb29rdXBDYW5kaWRhdGVzKVxuICAgICAgaWYgKGxvb2t1cCBpbiBBVFRSX1RZUEVfTUFQKSB7XG4gICAgICAgIHJldHVybiBBVFRSX1RZUEVfTUFQW2xvb2t1cF07XG4gICAgICB9XG4gICAgcmV0dXJuIFNlY3VyaXR5Q29udGV4dC5OT05FO1xuICB9XG59XG4iXX0=