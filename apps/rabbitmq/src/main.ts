import { portsQueue } from '@tsunami-clone/constants'
import * as amqlib from 'amqplib'
import scanner from '@tsunami-clone/scanner'

async function bootstrap() {
  try {
    const connection = await amqlib.connect('amqp://localhost')

    try {
      const channel = await connection.createChannel()

      channel.assertQueue(portsQueue, { durable: false })
      channel.consume(portsQueue, msg => {
        const data = JSON.parse(msg.content.toString())
        scanner(data.ip)
      })
    } catch (err) {
      throw new Error(err)
    }
  } catch (err) {
    throw new Error(err)
  }
}

bootstrap()
