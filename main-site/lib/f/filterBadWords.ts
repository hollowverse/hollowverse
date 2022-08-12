import Filter from 'bad-words';

const badWords1 = [
  'asshole',
  'cock',
  'cockhead',
  'cock-head',
  'cocks',
  'CockSucker',
  'cock-sucker',
  'dick',
  'dildo',
  'dildos',
  'f u c k',
  'f u c k e r',
  'fag',
  'faggit',
  'faggot',
  'fagit',
  'fags',
  'fagz',
  'fuck',
  'fucker',
  'fuckin',
  'fucking',
  'fucks',
  'fuk',
  'kunt',
  'kunts',
  'shit',
  'cunt',
  'fatass',
  'motherfucker',
  'nigger',
];

const badWords = badWords1.concat(badWords1.map((w) => `${w}s`));

const replaceRegex = /(?<=.).+(?=.)/;
const placeHolder = ((str: string) => '*'.repeat(str.length)) as any;

const filter = new Filter({ replaceRegex, placeHolder, emptyList: true });

filter.addWords(...badWords);

export function filterBadWords(text: string) {
  return filter.clean(text);
}
