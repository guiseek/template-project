import * as requestContext from 'request-context';

export class ContextService {
  private static readonly _nameSpace = 'request';

  static get<T>(key: string): T {
    console.log('get key: ', key);
    return requestContext.get(ContextService._getKeyWithNamespace(key));
  }

  static set(key: string, value: any): void {
    console.log('set key: ', key);
    requestContext.set(ContextService._getKeyWithNamespace(key), value);
  }

  private static _getKeyWithNamespace(key: string): string {
    console.log('get with key: ', key);
    return `${ContextService._nameSpace}.${key}`;
  }
}
