import { renderHook, act } from '@testing-library/react-hooks';
import useFetchUsers from './useFetchUsers';

global.fetch = jest.fn();

describe('useFetchUsers', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it('fetches and sets users', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: 'John Doe' }],
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());

    await waitForNextUpdate();

    expect(result.current.users).toEqual([{ id: 1, name: 'John Doe' }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('sets error on fetch failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Fetch failed'));

    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());

    await waitForNextUpdate();

    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(new Error('Fetch failed'));
  });
});