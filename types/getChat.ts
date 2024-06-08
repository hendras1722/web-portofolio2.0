interface Welcome {
  id: string
  chat: string
  created_at: Date
  info: Info
}

interface Info {
  email: string
  full_name: string
  picture: string
}

class Chat {
  response: any = null
  constructor() {}
  async getChat() {
    try {
      const response = await $fetch('/api/getChat') // Gantilah '/api/chat' dengan endpoint API yang sesuai
      console.log(response)
      this.response = response
      return response
    } catch (error) {
      console.error('Error fetching chat:', error)
    }
  }
  async getResponseChat() {
    const result = await this.getChat()
    return result
  }
}

export default Chat
