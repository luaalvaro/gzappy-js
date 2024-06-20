// __tests__/sendMessage.test.ts
import gzappy from '../src/index'
import 'dotenv/config'

const USER_TOKEN_ID = process.env.GZAPPY_USER_TOKEN_ID
const INSTANCE_ID = process.env.GZAPPY_INSTANCE_ID

describe('sendMessage', () => {
  it('should send a message successfully', async () => {
    if (!USER_TOKEN_ID || !INSTANCE_ID) {
      throw new Error('USER_TOKEN_ID or INSTANCE_ID not found')
    }

    if (USER_TOKEN_ID === '' || INSTANCE_ID === '') {
      throw new Error('USER_TOKEN_ID or INSTANCE_ID is empty')
    }

    const gClient = new gzappy({
      userTokenId: USER_TOKEN_ID,
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
    if (!USER_TOKEN_ID || !INSTANCE_ID) {
      throw new Error('USER_TOKEN_ID or INSTANCE_ID not found')
    }

    if (USER_TOKEN_ID === '' || INSTANCE_ID === '') {
      throw new Error('USER_TOKEN_ID or INSTANCE_ID is empty')
    }

    const gClient = new gzappy({
      userTokenId: USER_TOKEN_ID,
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
    if (!USER_TOKEN_ID || !INSTANCE_ID) {
      throw new Error('USER_TOKEN_ID or INSTANCE_ID not found')
    }

    if (USER_TOKEN_ID === '' || INSTANCE_ID === '') {
      throw new Error('USER_TOKEN_ID or INSTANCE_ID is empty')
    }

    const gClient = new gzappy({
      userTokenId: USER_TOKEN_ID,
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
