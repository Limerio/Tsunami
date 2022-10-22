import { ConfigService } from '@nestjs/config'

type EnvKeys = 'PORT' | 'DATABASE_URL'
export type ConfigServiceWithKeys = ConfigService<Record<EnvKeys, unknown>>
