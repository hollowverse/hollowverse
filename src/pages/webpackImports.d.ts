declare module '*.svg' {
  const value: string;
  export = value;
}

declare module '*.scss' {
  const value: { [name: string]: string };
  export = value;
}
