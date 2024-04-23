declare global {
    namespace NodeJS {
      interface ProcessEnv {
        Token: string,
      }
    }
  }
  
  export {}