"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var pagination_1 = require("../utils/pagination");
describe('memory pagination', function () {
    it('should match the filter', function () {
        var theFilter = {
            $or: [
                { test1: 5 },
            ],
        };
        var theItem = {
            test1: 5,
        };
        assert.equal(pagination_1.doesMatch(theItem, theFilter), true);
    });
    it('should sort stuff', function () {
        var collection = [
            {
                test1: {
                    test2: 'zzz',
                },
            },
            {
                test1: {
                    test2: 'aaa',
                },
            },
        ];
        var result = pagination_1.doSort({
            'test1.test2': 1,
        }, collection);
        assert.equal(result[0].test1.test2, 'aaa');
        assert.equal(result[1].test1.test2, 'zzz');
    });
});
//# sourceMappingURL=pagination.test.js.map