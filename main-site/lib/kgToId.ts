/**
 * 'kg:/m/1234ma_xk' => 'kg-m-1234ma_xk'
 */
export function kgToId(kg: string) {
  return `kg${kg.split(':')[1]}`.replaceAll('/', '-');
}
