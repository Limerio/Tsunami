import type { Config } from '../utils/types'

export class Scanner {
  constructor(public readonly config: Config) {}

  scanPort(port: number) {}
}
