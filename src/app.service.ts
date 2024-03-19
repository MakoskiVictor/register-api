import { Injectable } from '@nestjs/common';
type Hello = {
  Description: string
  Method: string
  Url: string
  Body: BodiContent
}
type BodiContent = {
  firstname?: string
  lastname?: string
  email: string
  password: string
}

@Injectable()
export class AppService {
  getHello(): Hello[] {
    return [
      {
        Description: "To make a register",
        Method: "POST",
        Url: "/auth/register",
        Body: {
          firstname: "string",
          lastname: "string",
          email: "string",
          password: "string"
        }
      },
      {
        Description: "To make a login",
        Method: "POST",
        Url: "/auth/login",
        Body: {
          email: "string",
          password: "string"
        }
      }
  ]
  }
}
