export function sortByArray<T>(
  arr: T[],
  sortArr: any[],
  accessor: (val: T) => any,
) {
  arr.sort((a, b) => {
    const index1 = sortArr.indexOf(accessor(a));
    const index2 = sortArr.indexOf(accessor(b));

    return (
      (index1 > -1 ? index1 : Infinity) - (index2 > -1 ? index2 : Infinity)
    );
  });
}
