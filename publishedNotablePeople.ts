import { notablePeoplePath } from './pages/[notablePerson]/paths';
import fs from 'fs-extra';

const notablePeople = fs.readdirSync(notablePeoplePath);

export const publishedNotablePeople = notablePeople;

// export const publishedNotablePeople = [
//   'alyson-hannigan',
//   'rachel-bilson',
//   'jamie-lee-curtis',
//   'marilyn-manson',
//   'alex-pettyfer',
//   'theodore-roosevelt',
//   'rob-kardashian',
// ];
