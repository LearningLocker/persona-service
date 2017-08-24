"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var InvalidCursor_1 = require("../../../errors/InvalidCursor");
var GetOptions_1 = require("../../../serviceFactory/utils/GetOptions");
var cursor_1 = require("../../utils/cursor");
describe('cursor', function () {
    it('Should generate a cursor from a model and sort', function () {
        var mockModel = {
            _id: 'abcdef',
            name: 'the_name',
        };
        var mockSort = {
            _id: 1,
            name: 1,
        };
        var result = cursor_1.modelToCursor({
            model: mockModel,
            sort: mockSort,
        });
        assert.equal(result, 'eyJfaWQiOiJhYmNkZWYiLCJuYW1lIjoidGhlX25hbWUifQ==');
    });
    it('Should generate a filter from a cursor', function () {
        var mockCursor = 'eyJfaWQiOiJhYmNkZWYiLCJuYW1lIjoidGhlX25hbWUifQ==';
        var mockSort = {
            _id: 1,
            name: -1,
        };
        var result = cursor_1.cursorToFilter({
            cursor: mockCursor,
            direction: GetOptions_1.CursorDirection.FORWARDS,
            sort: mockSort,
        });
        assert.deepEqual(result, {
            $or: [
                { _id: { $gt: 'abcdef' } },
                { _id: 'abcdef', name: { $lt: 'the_name' } },
            ],
        });
    });
    it('Should generate a filter from a null cursor', function () {
        var mockSort = {
            _id: 1,
            name: -1,
        };
        try {
            cursor_1.cursorToFilter({
                cursor: 'bnVsbA==',
                direction: GetOptions_1.CursorDirection.FORWARDS,
                sort: mockSort,
            });
            /* istanbul ignore next */
            assert.equal(true, false, 'Should not happen');
        }
        catch (err) {
            assert.equal(!!err, true);
        }
    });
    it('Should generate a filter from a cursor backwords', function () {
        var mockCursor = 'eyJfaWQiOiJhYmNkZWYiLCJuYW1lIjoidGhlX25hbWUifQ==';
        var mockSort = {
            _id: 1,
            name: -1,
        };
        var result = cursor_1.cursorToFilter({
            cursor: mockCursor,
            direction: GetOptions_1.CursorDirection.BACKWARDS,
            sort: mockSort,
        });
        assert.deepEqual(result, {
            $or: [
                { _id: { $lt: 'abcdef' } },
                { _id: 'abcdef', name: { $gt: 'the_name' } },
            ],
        });
    });
    it('Should handle invalid cursors as empty', function () {
        var mockCursor = 'invalideyJfaWQiOiJhYmNkZWYiLCJuYW1lIjoidGhlX25hbWUifQ==';
        try {
            cursor_1.cursorToFilter({
                cursor: mockCursor,
                direction: GetOptions_1.CursorDirection.FORWARDS,
                sort: {
                    _id: 1,
                    name: 1,
                },
            });
            /* istanbul ignore next */
            assert.equal(true, false, 'should not happen');
        }
        catch (err) {
            assert.equal(err.constructor, InvalidCursor_1.default);
        }
    });
    it('Should handle invalid cursors as false', function () {
        var mockCursor = 'ZmFsc2U==';
        try {
            cursor_1.cursorToFilter({
                cursor: mockCursor,
                direction: GetOptions_1.CursorDirection.FORWARDS,
                sort: {
                    _id: 1,
                    name: 1,
                },
            });
            /* istanbul ignore next */
            assert.equal(true, false, 'should not happen');
        }
        catch (err) {
            assert.equal(err.constructor, InvalidCursor_1.default);
        }
    });
}); // tslint:disable-line: max-file-line-count
//# sourceMappingURL=cursor.test.js.map