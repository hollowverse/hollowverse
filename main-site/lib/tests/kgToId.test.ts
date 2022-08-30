import { kgToId } from '~/lib/kgToId';

test('kg:/m/1234ma_xk', () => {
  expect(kgToId('kg:/m/1234ma_xk')).toEqual('kg-m-1234ma_xk');
});
