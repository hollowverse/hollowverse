declare module '*.svg' {
  const value: string;
  export = value;
}

declare module '*.md' {
  const value: string;
  export = value;
}

declare module '*.yml' {
  const value: { [name: string]: any };
  export = value;
}
