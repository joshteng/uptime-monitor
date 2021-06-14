import { AxiosRequestConfig } from "axios"
import axios from "axios"
import { Injectable } from "@nestjs/common"

@Injectable()
export class PushoverService {
  private readonly token = process.env.PUSHOVER_TOKEN
  private readonly userGroup = process.env.PUSHOVER_GROUP

  async notify(message: string, priority: number = 0) {
    const endpoint = "https://api.pushover.net/1/messages.json"

    const body = {
      token: this.token,
      user: this.userGroup,
      message: message
    }

    if (priority != 0) {
      body['priority'] = priority
    }

    const headers = {
      "Content-type": "application/json"
    }

    const requestOptions: AxiosRequestConfig = {
      method: "POST",
      url: endpoint,
      headers: headers,
      data: body
    }

    try {
      return await axios(requestOptions)
    } catch (error) {
      debugger
      throw error
    }
  }
}
