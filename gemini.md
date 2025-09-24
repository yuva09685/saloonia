# Backend Setup Plan

1.  Create a `backend` directory for the new service.
2.  Initialize a `package.json` within the `backend` directory.
3.  Install `express`, `cors`, and `dotenv` as dependencies, and `typescript`, `ts-node`, `nodemon`, `@types/express`, `@types/cors` and `@types/node` as development dependencies.
4.  Configure a `tsconfig.json` for the backend.
5.  Create a basic Express server in `backend/src/index.ts` that listens on a port (e.g., 3001) and has a simple test route.
6.  Add a `dev` script to the new `package.json` to run the server.
