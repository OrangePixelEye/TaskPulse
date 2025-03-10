declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
    }
  }
}

// If this file has no import/export statements (i.e. it's a script rather than a module)
// convert it into a module by adding an empty export statement.
export {};
