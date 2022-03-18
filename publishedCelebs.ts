import { celebsPath } from './pages/[celeb]/paths';
import fs from 'fs-extra';

const celebs = fs.readdirSync(celebsPath);

export const publishedCelebs = celebs;

// export const publishedCelebs = [
//   'alyson-hannigan',
//   'rachel-bilson',
//   'jamie-lee-curtis',
//   'marilyn-manson',
//   'alex-pettyfer',
//   'theodore-roosevelt',
//   'rob-kardashian',
// ];
