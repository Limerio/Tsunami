import * as amqlib from 'amqplib'

import { EventsPattern, portsQueue } from '@tsunami-clone/constants'

async function bootstrap() {
  try {
    const connection = await amqlib.connect('amqp://localhost')

    try {
      const channel = await connection.createChannel()

      channel.assertQueue(portsQueue, { durable: false })
      channel.consume(portsQueue, msg => {
        const { pattern, data } = JSON.parse(msg.content.toString())
        if (pattern === EventsPattern.ScanCreated) {
          console.log(data)
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  } catch (err) {
    throw new Error(err)
  }
}

bootstrap()
