import { MongoMemoryServer } from 'mongodb-memory-server'
import RedisServer from 'redis-server'

// Todo needs to add a real testing database in the future (2 modes, one with virtual, another one with test mongo atlas)

if (process.env.DEVELOPER_FEES_DB_MONGO_URL_E2E_TESTING_MODE && process.env.FACILITRON_CLUSTER_MONGO_URL_E2E_TESTING_MODE) {
   console.warn('Mongo connections working in e2e testing mode')
} else {
   const developerFeesTestUrl = await MongoMemoryServer.create().then((result) => result.getUri().slice(0, -1))
   const facilitronCommonUrl = await MongoMemoryServer.create().then((result) => result.getUri().slice(0, -1))
   console.warn('Mongo connections working in virtual mode')

   process.env.DEVELOPER_FEES_DB_MONGO_URL = `${developerFeesTestUrl}/E2E_Test_developerFees`
   process.env.DEVELOPER_FEES_DB_MONGO_PASSWORD = ''
   process.env.DEVELOPER_FEES_DB_MONGO_USERNAME = ''

   process.env.FACILITRON_CLUSTER_MONGO_URL = `${facilitronCommonUrl}`
   process.env.FACILITRON_COMMON_DB_NAME = 'E2E_Test_facilitronCommon'
}

// Todo maybe we needs to add test redis remote db (if it is necessary)
const connectRedisForTesting = async (port = 37121) => {
   // Todo it is creating dump.rdb maybe we should remove it?
   // Todo And it should have redis bin to run server
   const server = new RedisServer({
      port,
   })

   await server.open()

   return server
}

if (!process.env.NOT_CREATE_REDIS_STUB_FOR_E2E_TESTING) {
   await connectRedisForTesting(37121)
   console.warn('Redis connection in testing mode')

   process.env.REDIS_HOST = 'localhost'
   process.env.REDIS_PORT = 37121
   process.env.NODE_ENV = 'local'
   process.env.REDIS_PASSWORD = ''
}

// This marks that the preparation before running the e2e tests has been completed
process.env.E2E_PRE_CONDITION_SET = 'yes'
