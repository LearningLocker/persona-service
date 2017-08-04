import * as assert from 'assert';
import { Response } from 'express';
import BaseError from 'jscommons/dist/errors/BaseError';
import Conflict from '../../../errors/Conflict';
import DuplicateMergeId from '../../../errors/DuplicateMergeId';
import IfMatch from '../../../errors/IfMatch';
import IfNoneMatch from '../../../errors/IfNoneMatch';
import InvalidGetPersonaFromIdentifierOptions // tslint:disable:import-spacing
  from '../../../errors/InvalidGetPersonaFromIdentifierOptions';
import MaxEtags from '../../../errors/MaxEtags';
import UnassignedPersonaOnIdentifier from '../../../errors/UnassignedPersonaOnIdentifier';
import translator from '../../../translatorFactory';
import handleError from '../../utils/handleError';
import {
  BAD_REQUEST_400_HTTP_CODE,
  CONFLICT_409_HTTP_CODE,
  PRECONDITION_FAILED_412_HTTP_CODE,
  SERVER_ERROR_500_HTTP_CODE,
} from '../../utils/httpCodes';

interface ResponseJsonOptions {
  readonly errorId: string;
  readonly message: string;
}

const generateResponseMock = (
  assertCodeFn: (code: string) => void,
  assertJsonOptsFn: (opts: ResponseJsonOptions) => void,
) => {
  const response = {
    status: (code: string) => {
      assertCodeFn(code);

      return {
        json: (opts: ResponseJsonOptions) => {
          assertJsonOptsFn(opts);
        },
      };
    },
  } as any as Response;
  return response;
};

const assertError = (error: BaseError, expectedCode: number, expectedMessage: string) => {
  const res: Response = generateResponseMock(
    (code) => assert.equal(code, expectedCode),
    (opts) => {
      assert.equal(opts.errorId, 'test_error_id');
      assert.equal(
        opts.message,
        expectedMessage,
      );
    },
  );

  handleError({
    err: error,
    errorId: 'test_error_id',
    res,
    translator: translator(),
  });
};

describe('handleError', () => {

  it('should throw InvalidGetPersonaFromIdentifierOptions', async () => {
    assertError(
      new InvalidGetPersonaFromIdentifierOptions('invalid'),
      SERVER_ERROR_500_HTTP_CODE,
      'Persona was allready set on the identifier, this was unexpected.',
    );
  });

  it('should throw IfNoneMatch', async () => {

    assertError(
      new IfNoneMatch(),
      PRECONDITION_FAILED_412_HTTP_CODE,
      'IfNoneMatch was used to detect that the resource was already present',
    );
  });

  it('should throw IfMatch', async () => {

    assertError(
      new IfMatch(),
      PRECONDITION_FAILED_412_HTTP_CODE,
      'IfMatch does not match Etag because a modification has been made since it was retrieved',
    );
  });

  it('should throw Conflict', async () => {

    assertError(
      new Conflict(),
      CONFLICT_409_HTTP_CODE,
      'Get the profile to retrieve the Etag, then set the If-Match header to the Etag',
    );
  });

  it('should throw MaxEtags', async () => {

    assertError(
      new MaxEtags(),
      BAD_REQUEST_400_HTTP_CODE,
      'IfMatch and IfNoneMatch cannot be used at the same time',
    );
  });
  it('should throw DuplicateMergeId', async () => {

    assertError(
      new DuplicateMergeId('56'),
      BAD_REQUEST_400_HTTP_CODE,
      'Can not merge with dupliate id (56)',
    );
  });
  it('should throw UnassignedPersonaOnIdentifier', async () => {

    assertError(
      new UnassignedPersonaOnIdentifier(),
      SERVER_ERROR_500_HTTP_CODE,
      'Persona was not found on the identifier, something went wrong',
    );
  });
  it('should throw 500 if error is null', async () => {

    const res: Response = generateResponseMock(
      (code) => assert.equal(code, SERVER_ERROR_500_HTTP_CODE),
      (opts) => {
        assert.equal(opts.errorId, 'test_error_id');
        assert.equal(
          opts.message,
          'A server error occurred',
        );
      },
    );

    handleError({
      err: null,
      errorId: 'test_error_id',
      res,
      translator: translator(),
    } as any);
  });

  it('should throw 500 if error is undefined', async () => {

    const res: Response = generateResponseMock(
      (code) => assert.equal(code, SERVER_ERROR_500_HTTP_CODE),
      (opts) => {
        assert.equal(opts.errorId, 'test_error_id');
        assert.equal(
          opts.message,
          'A server error occurred',
        );
      },
    );

    handleError({
      err: undefined,
      errorId: 'test_error_id',
      res,
      translator: translator(),
    } as any);
  });
}); // tslint:disable-line:max-file-line-count
