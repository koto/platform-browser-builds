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
import { TrustedTypePolicyAdapter } from '../src/security/trusted_types_policy';
export class MockTrustedTypePolicyAdapter extends TrustedTypePolicyAdapter {
    /**
     * @param {?} value
     * @return {?}
     */
    maybeCreateTrustedURL(value) { throw new Error('Method not implemented.'); }
    /**
     * @param {?} value
     * @return {?}
     */
    maybeCreateTrustedHTML(value) { throw new Error('Method not implemented.'); }
    /**
     * @param {?} value
     * @return {?}
     */
    maybeCreateTrustedScript(value) { throw new Error('Method not implemented.'); }
    /**
     * @param {?} value
     * @return {?}
     */
    maybeCreateTrustedScriptURL(value) {
        return 'modified-by-policy-adapter:' + value;
    }
    /**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */
    maybeCreateTrustedValueForAttribute(el, name, value, namespace) {
        throw new Error('Method not implemented.');
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isHTML(obj) { throw new Error('Method not implemented.'); }
    /**
     * @param {?} obj
     * @return {?}
     */
    isURL(obj) { throw new Error('Method not implemented.'); }
    /**
     * @param {?} obj
     * @return {?}
     */
    isScriptURL(obj) { throw new Error('Method not implemented.'); }
    /**
     * @param {?} obj
     * @return {?}
     */
    isScript(obj) { throw new Error('Method not implemented.'); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja190cnVzdGVkX3R5cGVfcG9saWN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL21vY2tfdHJ1c3RlZF90eXBlX3BvbGljeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRTlFLE1BQU0sT0FBTyw0QkFBNkIsU0FBUSx3QkFBd0I7Ozs7O0lBQ3hFLHFCQUFxQixDQUFDLEtBQWEsSUFBWSxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUM1RixzQkFBc0IsQ0FBQyxLQUFhLElBQVksTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDN0Ysd0JBQXdCLENBQUMsS0FBYSxJQUFZLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQy9GLDJCQUEyQixDQUFDLEtBQWE7UUFDdkMsT0FBTyw2QkFBNkIsR0FBRyxLQUFLLENBQUM7SUFDL0MsQ0FBQzs7Ozs7Ozs7SUFDRCxtQ0FBbUMsQ0FDL0IsRUFBTyxFQUFFLElBQVksRUFBRSxLQUFhLEVBQUUsU0FBNEI7UUFDcEUsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBQ0QsTUFBTSxDQUFDLEdBQVEsSUFBYSxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUN6RSxLQUFLLENBQUMsR0FBUSxJQUFhLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3hFLFdBQVcsQ0FBQyxHQUFRLElBQWEsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDOUUsUUFBUSxDQUFDLEdBQVEsSUFBYSxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzVFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1RydXN0ZWRUeXBlUG9saWN5QWRhcHRlcn0gZnJvbSAnLi4vc3JjL3NlY3VyaXR5L3RydXN0ZWRfdHlwZXNfcG9saWN5JztcblxuZXhwb3J0IGNsYXNzIE1vY2tUcnVzdGVkVHlwZVBvbGljeUFkYXB0ZXIgZXh0ZW5kcyBUcnVzdGVkVHlwZVBvbGljeUFkYXB0ZXIge1xuICBtYXliZUNyZWF0ZVRydXN0ZWRVUkwodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7IHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTsgfVxuICBtYXliZUNyZWF0ZVRydXN0ZWRIVE1MKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7IH1cbiAgbWF5YmVDcmVhdGVUcnVzdGVkU2NyaXB0KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgeyB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7IH1cbiAgbWF5YmVDcmVhdGVUcnVzdGVkU2NyaXB0VVJMKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiAnbW9kaWZpZWQtYnktcG9saWN5LWFkYXB0ZXI6JyArIHZhbHVlO1xuICB9XG4gIG1heWJlQ3JlYXRlVHJ1c3RlZFZhbHVlRm9yQXR0cmlidXRlKFxuICAgICAgZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8dW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XG4gIH1cbiAgaXNIVE1MKG9iajogYW55KTogYm9vbGVhbiB7IHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTsgfVxuICBpc1VSTChvYmo6IGFueSk6IGJvb2xlYW4geyB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7IH1cbiAgaXNTY3JpcHRVUkwob2JqOiBhbnkpOiBib29sZWFuIHsgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpOyB9XG4gIGlzU2NyaXB0KG9iajogYW55KTogYm9vbGVhbiB7IHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTsgfVxufVxuIl19