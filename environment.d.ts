declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SANITY_DATASET: "development" | "production";
      NEXT_PUBLIC_SANITY_PROJECT_ID: string;
      NODE_ENV: "development" | "production";
      SANITY_API_TOKEN: string;
    }
  }
}

export {};
