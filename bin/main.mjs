#!/usr/bin/env node
import cluster from 'cluster'

// const maxThreads = process.env.WEB_CONCURRENCY ? Number(process.env.WEB_CONCURRENCY) : 4
const maxThreads = 4

if (cluster.isPrimary) {
   for (let i = 0; i < maxThreads; i++) {
      cluster.fork()
   }

   cluster.on('exit', (worker, code, signal) => {
      cluster.fork()
   })
} else {
   const { default: App } = await import('../src/app.mjs')

   const app = await App.init()
   app.start()
}
