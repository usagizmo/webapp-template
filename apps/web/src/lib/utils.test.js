import { describe, it, expect, vi } from 'vitest';
import { tryErrorAlertOnNhostApi, tryErrorAlertOnHoudiniApi } from './utils';

describe('@tryErrorAlertOnNhostApi', () => {
  it('return false if it does not have `error.message`', () => {
    const mock = vi.fn();
    vi.stubGlobal('alert', mock);

    expect(tryErrorAlertOnNhostApi({})).toBe(false);
    expect(tryErrorAlertOnNhostApi({ error: null })).toBe(false);
    expect(tryErrorAlertOnNhostApi({ error: { message: '' } })).toBe(false);

    expect(mock).toBeCalledTimes(0);
  });

  it('alert message and return true if it has `error.message`', () => {
    const mock = vi.fn();
    vi.stubGlobal('alert', mock);

    expect(tryErrorAlertOnNhostApi({ error: { message: 'test' } })).toBe(true);

    expect(mock).toBeCalledTimes(1);
  });
});

describe('@tryErrorAlertOnHoudiniApi', () => {
  it('return false if it does not have `error`', () => {
    const mock = vi.fn();
    vi.stubGlobal('alert', mock);

    expect(tryErrorAlertOnHoudiniApi(null)).toBe(false);
    // @ts-ignore
    expect(tryErrorAlertOnHoudiniApi('')).toBe(false);
    // @ts-ignore
    expect(tryErrorAlertOnHoudiniApi('test')).toBe(false);
    // @ts-ignore
    expect(tryErrorAlertOnHoudiniApi(1)).toBe(false);
    // @ts-ignore
    expect(tryErrorAlertOnHoudiniApi({})).toBe(false);
    expect(tryErrorAlertOnHoudiniApi([])).toBe(false);
    // @ts-ignore
    expect(tryErrorAlertOnHoudiniApi([{}])).toBe(false);
    expect(tryErrorAlertOnHoudiniApi([{ message: '' }])).toBe(false);

    expect(mock).toBeCalledTimes(0);
  });

  it('alert message and return true if it has `[0].message`', () => {
    const mock = vi.fn();
    vi.stubGlobal('alert', mock);

    expect(tryErrorAlertOnHoudiniApi([{ message: 'test' }])).toBe(true);

    expect(mock).toBeCalledTimes(1);
  });
});
