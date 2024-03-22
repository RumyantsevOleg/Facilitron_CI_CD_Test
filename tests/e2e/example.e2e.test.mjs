import { expect } from 'chai'
import sinon from 'sinon'
import request from 'supertest'

import App from '../../src/app.mjs'
describe('Test Example', async () => {
   let app

   function generateRequests(requestsData, count = 1) {
      if (!requestsData.length) {
         throw new Error('requestsData length is empty')
      }

      const promisesList = []

      for (let i = 0; i < count; i++) {
         const { endpointBasicPath, cocRequestId, secureLinkId } = requestsData[i % requestsData.length]
         promisesList.push(request(app).get(`${endpointBasicPath}/${cocRequestId}`).query({ secureLinkId }).expect(200))
      }

      return promisesList
   }

   // Add test data to database
   before(async () => {
      if (process.env.E2E_PRE_CONDITION_SET !== 'yes') {
         throw new Error('E2E_PRE_CONDITION_SET not set')
      }

      const application = await App.init()
      app = application.getApp()
   })

   // E2E API Test for findOne cocRequest

   it('should return test', async () => {
      const response = await request(app).get('/api/test').expect(200)
      const { body } = response
      console.log('body', body)
      expect(body).to.be.deep.equal({ message: 'Test passed' })
   })

   // Clear test  in the database
   after(async () => {
      if (process.env.E2E_PRE_CONDITION_SET !== 'yes') {
         throw new Error('E2E_PRE_CONDITION_SET not set')
      }
   })
})
