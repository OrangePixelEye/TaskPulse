declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      POSTGRES_PORT: string
      POSTGRES_USER: string
      POSTGRES_PASSWORD?: string
      JWT_SECRET: string
      POSTGRES_DB: string
      POSTGRES_HOST: string
    }
  }
}

export {};
