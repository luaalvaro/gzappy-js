import axios from "axios";

class GzappyClient {
  private userTokenId: string;
  private instanceId: string;
  private instanceToken: string;
  private baseURL: string;
  private api: any;

  constructor({ userTokenId, instanceId, instanceToken }: GzappyClientOptions) {
    this.userTokenId = userTokenId;
    this.instanceId = instanceId;
    this.instanceToken = instanceToken;
    this.baseURL = "https://api.gzappy.com/v1";

    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        user_token_id: this.userTokenId,
        "Content-Type": "application/json",
      },
    });
  }

  async sendMessage(messages: string[], phones: string[]) {
    try {
      const response = await this.api.post("/message/send-message", {
        instance_id: this.instanceId,
        instance_token: this.instanceToken,
        message: messages,
        phone: phones,
      });
      return { data: response.data };
    } catch (error) {
      console.error(error);
      return { error: "Error sending message" };
    }
  }

  async sendMedia(message: string, mediaUrl: string, phones: string[]) {
    try {
      const response = await this.api.post("/message/send-media", {
        instance_id: this.instanceId,
        instance_token: this.instanceToken,
        message: message,
        mediaUrl: mediaUrl,
        phone: phones,
      });
      return { data: response.data };
    } catch (error) {
      console.error(error);
      return { error: "Error sending message" };
    }
  }

  async sendGroupMessage(messages: string[], groups: string[]) {
    try {
      const response = await this.api.post("/message/send-group-message", {
        instance_id: this.instanceId,
        instance_token: this.instanceToken,
        message: messages,
        group: groups,
      });
      return { data: response.data };
    } catch (error) {
      console.error(error);
      return { error: "Error sending message" };
    }
  }

  async scheduleMessage(
    messages: string[],
    phones: string[],
    scheduleUtcDate?: string
  ) {
    try {
      const response = await this.api.post("/message/schedule-message", {
        instance_id: this.instanceId,
        instance_token: this.instanceToken,
        message: messages,
        phone: phones,
        send_at: scheduleUtcDate,
      });
      return { data: response.data };
    } catch (error) {
      console.error(error);
      return { error: "Error sending message" };
    }
  }
}

export default GzappyClient;
