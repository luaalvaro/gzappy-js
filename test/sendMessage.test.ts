// __tests__/sendMessage.test.ts
import gzappy from '../src/index'
import 'dotenv/config'

const GZAPPY_API_TOKEN = process.env.GZAPPY_API_TOKEN
const INSTANCE_ID = process.env.GZAPPY_INSTANCE_ID

describe('sendMessage', () => {
  it('should send a message successfully', async () => {
    if (!GZAPPY_API_TOKEN || !INSTANCE_ID) {
      throw new Error('GZAPPY_API_TOKEN or INSTANCE_ID not found')
    }

    if (GZAPPY_API_TOKEN === '' || INSTANCE_ID === '') {
      throw new Error('GZAPPY_API_TOKEN or INSTANCE_ID is empty')
    }

    const gClient = new gzappy({
      token: GZAPPY_API_TOKEN,
      instanceId: INSTANCE_ID,
    })

    const sentMessage = await gClient.sendMessage(
      ['Teste automatizado'],
      ['558498386755']
    )

    const { msg, error } = sentMessage

    if (error) {
      console.error(error)
      throw new Error('Error sending message')
    }

    if (!msg) {
      console.log(sentMessage)
      throw new Error('Message not sent')
    }

    if (msg !== 'Messages sent') {
      console.log(sentMessage)
      throw new Error('Message not sent')
    }

    expect(msg).toBe('Messages sent')
  })

  it('should get error number is invalid', async () => {
    if (!GZAPPY_API_TOKEN || !INSTANCE_ID) {
      throw new Error('GZAPPY_API_TOKEN or INSTANCE_ID not found')
    }

    if (GZAPPY_API_TOKEN === '' || INSTANCE_ID === '') {
      throw new Error('GZAPPY_API_TOKEN or INSTANCE_ID is empty')
    }

    const gClient = new gzappy({
      token: GZAPPY_API_TOKEN,
      instanceId: INSTANCE_ID,
    })

    const sentMessage = await gClient.sendMessage(
      ['Teste automatizado'],
      ['55118726']
    )

    const { error } = sentMessage

    expect(error).toBe('Phone number is invalid')
  })

  it('should get error 3 messages at a time', async () => {
    if (!GZAPPY_API_TOKEN || !INSTANCE_ID) {
      throw new Error('GZAPPY_API_TOKEN or INSTANCE_ID not found')
    }

    if (GZAPPY_API_TOKEN === '' || INSTANCE_ID === '') {
      throw new Error('GZAPPY_API_TOKEN or INSTANCE_ID is empty')
    }

    const gClient = new gzappy({
      token: GZAPPY_API_TOKEN,
      instanceId: INSTANCE_ID,
    })

    const sentMessage = await gClient.sendMessage(
      [
        'Teste automatizado',
        'Teste automatizado',
        'Teste automatizado',
        'Teste automatizado',
      ],
      ['5511222222222']
    )

    const { error } = sentMessage

    expect(error).toBe('You can only send 3 messages at a time')
  })
})
