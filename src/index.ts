import axios, { AxiosInstance } from 'axios'

class GzappyClient {
  private token: string
  private instanceId: string
  private baseURL: string
  private api: AxiosInstance

  constructor({ token, instanceId }: GzappyClientOptions) {
    if (!token) {
      throw new Error('Auth token for gzappy-js is required')
    }

    if (!instanceId) {
      throw new Error('instanceId for gzappy-js is required')
    }

    this.token = token
    this.instanceId = instanceId
    this.baseURL = 'https://api.gzappy.com/v1'

    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    })
  }

  // Instances
  async createInstance(instance_name: string) {
    try {
      const response = await this.api.post('/instances/add', {
        instance_name: instance_name,
      })
      return response.data as { qr: string }
    } catch (error: any) {
      return {
        error: error.response.data.msg as string,
      }
    }
  }

  async listInstances() {
    try {
      const response = await this.api.get('/instances/list')
      return response.data as {
        data: {
          instance_name: string
          instance_status: string
          instance_id: string
        }[]
      }
    } catch (error: any) {
      return {
        error: error.response.data.msg as string,
      }
    }
  }

  async restoreInstance(instance_id: string) {
    try {
      const response = await this.api.patch('/instances/restore', {
        instance_id: instance_id,
      })
      return response.data as {
        qr: string
      }
    } catch (error: any) {
      return {
        error: error.response.data.msg as string,
      }
    }
  }

  async deleteInstance(instance_id: string) {
    try {
      const response = await this.api.delete('/instances/delete', {
        data: {
          instance_id: instance_id,
        },
      })
      return response.data as {
        msg: string
      }
    } catch (error: any) {
      return {
        error: error.response.data.msg as string,
      }
    }
  }

  async disconnectInstance(instance_id: string) {
    try {
      const response = await this.api.patch('/instances/disconnect', {
        instance_id: instance_id,
      })
      return response.data as {
        msg: string
      }
    } catch (error: any) {
      return {
        error: error.response.data.msg as string,
      }
    }
  }

  async editInstance(
    instance_id: string,
    instance_name: string,
    webhook_receivement_message_url?: string
  ) {
    try {
      const response = await this.api.patch('/instances/update', {
        instance_name,
        instance_id,
        webhook_receivement_message_url,
      })
      return response.data as {
        msg: string
      }
    } catch (error: any) {
      return {
        error: error.response.data.msg as string,
      }
    }
  }

  // Messages
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
