import type { Config } from '../utils/types'
import { Scanner } from '../app'

export function defineConfig(config: Config) {
  return new Scanner(config)
}
