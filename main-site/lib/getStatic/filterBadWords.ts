import Filter from 'bad-words';

const badWords = [
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

const replaceRegex = /(?<=.).+(?=.)/;
const placeHolder = ((str: string) => '*'.repeat(str.length)) as any;

const filter = new Filter({ replaceRegex, placeHolder, emptyList: true });

filter.addWords(...badWords);

export function filterBadWords(text: string) {
  return filter.clean(text);
}
