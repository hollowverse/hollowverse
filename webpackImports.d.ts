declare module '*.svg' {
  const value: React.ElementType<any>;
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
