import axios, { AxiosInstance } from 'axios'

class GzappyClient {
  private userTokenId: string
  private instanceId: string
  private baseURL: string
  private api: AxiosInstance

  constructor({ userTokenId, instanceId }: GzappyClientOptions) {
    if (!userTokenId) {
      throw new Error('userTokenId for gzappy-js is required')
    }

    if (!instanceId) {
      throw new Error('instanceId for gzappy-js is required')
    }

    this.userTokenId = userTokenId
    this.instanceId = instanceId
    this.baseURL = 'https://api.gzappy.com/v1'

    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        user_token_id: this.userTokenId,
        'Content-Type': 'application/json',
      },
    })
  }

  async sendMessage(messages: string[], phones: string[]) {
    if (messages.some((message) => message === '')) {
      return { error: 'Message cannot be empty' }
    }

    if (phones.some((phone) => phone === '')) {
      return { error: 'Phone number cannot be empty' }
    }

    if (messages.some((message) => message.length > 5000)) {
      return { error: 'Message cannot be more than 5000 characters' }
    }

    if (messages.length > 3) {
      return { error: 'You can only send 3 messages at a time' }
    }

    if (phones.length > 5) {
      return { error: 'You can only send to 5 numbers at a time' }
    }

    if (
      phones.some(
        (phone) =>
          phone.replace(/\D/g, '').length < 12 ||
          phone.replace(/\D/g, '').length > 15
      )
    ) {
      return { error: 'Phone number is invalid' }
    }

    try {
      const response = await this.api.post('/message/send-message', {
        instance_id: this.instanceId,
        message: messages,
        phone: phones,
      })
      return response.data as { msg: string }
    } catch (error: any) {
      return error.data
    }
  }

  async sendMedia(message: string, mediaUrl: string, phones: string[]) {
    if (message === '') {
      return { error: 'Message cannot be empty' }
    }

    if (phones.some((phone) => phone === '')) {
      return { error: 'Phone number cannot be empty' }
    }

    try {
      const response = await this.api.post('/message/send-media', {
        instance_id: this.instanceId,
        message: message,
        mediaUrl: mediaUrl,
        phone: phones,
      })
      return response.data as { msg: string }
    } catch (error: any) {
      return error.data
    }
  }

  async sendGroupMessage(messages: string[], groups: string[]) {
    if (messages.some((message) => message === '')) {
      return { error: 'Message cannot be empty' }
    }

    if (groups.some((group) => group === '')) {
      return { error: 'Group number cannot be empty' }
    }

    try {
      const response = await this.api.post('/message/send-group-message', {
        instance_id: this.instanceId,
        message: messages,
        group: groups,
      })
      return response.data as { msg: string }
    } catch (error: any) {
      return error.data
    }
  }

  async scheduleMessage(
    messages: string[],
    phones: string[],
    scheduleUtcDate?: string
  ) {
    if (messages.some((message) => message === '')) {
      return { error: 'Message cannot be empty' }
    }

    if (phones.some((phone) => phone === '')) {
      return { error: 'Phone number cannot be empty' }
    }

    try {
      const response = await this.api.post('/message/schedule-message', {
        instance_id: this.instanceId,
        message: messages,
        phone: phones,
        send_at: scheduleUtcDate,
      })
      return response.data as {
        status: string
        message: string
      }
    } catch (error: any) {
      return error.data
    }
  }
}

export default GzappyClient
