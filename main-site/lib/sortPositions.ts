import { orderBy, remove } from 'lodash-es';
import { Position } from '~/lib/position.projection';

export function sortPositions(positions: Position[]) {
  const orderedPositions = orderBy(positions, '_updatedAt');
  const religion = remove(orderedPositions, (p) => p.issue === 'Religion');
  const povis = remove(orderedPositions, (p) => p.issue === 'Political Views');

  if (povis[0]) {
    orderedPositions.unshift(povis[0]);
  }

  if (religion[0]) {
    orderedPositions.unshift(religion[0]);
  }

  return orderedPositions;
}
