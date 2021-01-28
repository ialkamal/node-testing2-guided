it('is the correct env', () => {
  expect(process.env.DB_ENV)
    .toBe('testing')
})

const Hobbit = require('./hobbits-model')
const db = require('../../data/dbConfig')

const frodo = { name: 'frodo' }
const sam = { name: 'sam' }

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('hobbits').truncate()
})
afterAll(async () => {
  await db.destroy()
})

describe('Hobbits model', () => {
  describe('insert function', () => {
    it('adds hobbits to db', async () => {
      await Hobbit.insert(frodo)
      const all = await db('hobbits')
      expect(all).toHaveLength(1)
    })
  })
})
