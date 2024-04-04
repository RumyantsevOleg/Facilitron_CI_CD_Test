import { fileURLToPath } from 'node:url'
import * as path from 'node:path'
import express from 'express'
import compression from 'compression'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 4000

export default class App {
   #app = express()

   getApp() {
      // Use only for testing purposes
      return this.#app
   }
   static async init() {
      const app = new App()
      // mongo connection in src/common/databases/mongoose.mjs and awaiting connection
      // redis connection in src/common/databases/redis.mjs

      app.#expressSetup()
      app.#registerRoutes()

      return app
   }

   #expressSetup() {
      this.#app.use(compression())
      this.#app.use(express.json())
   }

   #registerRoutes() {
      this.#app.get('/api/test', (req, res, next) => {
         res.send({ message: 'Test passed3' })
      })
   }

   start() {
      // Todo need to add error handling
      this.#app.listen(PORT, () => {
         console.log(`Server is listening on port ${PORT}...`)
      })
   }
}
