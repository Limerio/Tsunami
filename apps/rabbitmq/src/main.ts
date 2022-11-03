import * as amqlib from 'amqplib'

import { EventsPattern, portsQueue } from '@tsunami-clone/constants'
import scanner from '@tsunami-clone/scanner'
import { TScan } from '@tsunami-clone/types'

async function bootstrap() {
  try {
    const connection = await amqlib.connect('amqp://localhost')

    try {
      const channel = await connection.createChannel()

      channel.assertQueue(portsQueue, { durable: true, autoDelete: true })
      channel.consume(portsQueue, async msg => {
        const { pattern, data }: { pattern: string; data: TScan } = JSON.parse(
          msg.content.toString()
        )
        if (pattern === EventsPattern.ScanCreated) {
          await scanner(data.ip, data.user.username)
        }
        channel.ack(msg)
      })
    } catch (err) {
      throw new Error(err)
    }
  } catch (err) {
    console.error(err)
    process.exit(0)
  }
}

bootstrap()
