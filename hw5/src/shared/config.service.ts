import * as path from 'path'
import { join } from 'path'
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions'

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

class ConfigService {
    // eslint-disable-next-line no-useless-constructor
    constructor(private env: { [k: string]: string | undefined }) { }

    private getValue(key: string, throwOnMissing = false): string {
        const value = this.env[key]
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`)
        }

        return value
    }

    public ensureValues(keys: string[]) {
        keys.forEach((k) => this.getValue(k, true))
        return this
    }

    public getPort() {
        return this.getValue('PORT', true)
    }

    public isProduction() {
        const mode = this.getValue('NODE_ENV', false)
        return mode !== 'DEV'
    }

    public getTypeOrmConfig(): ConnectionOptions {
        return {
            type: 'postgres',
            host: this.getValue('PG_HOST'),
            port: parseInt(this.getValue('PG_PORT')),
            username: this.getValue('PG_USER'),
            password: this.getValue('PG_PASSWORD'),
            database: this.getValue('PG_DATABASE'),
            entities: [join(__dirname, '/../**/**Entity{.ts,.js}')],
            migrationsTableName: 'migration',
            migrations: ['src/migration/*.ts'],
            cli: {
                migrationsDir: 'src/migration'
            },
            synchronize: false,
            migrationsRun: false,
            ssl: this.isProduction()
        }
    }
}

const configService = new ConfigService(process.env).ensureValues([
    'PG_HOST',
    'PG_PORT',
    'PG_USER',
    'PG_PASSWORD',
    'PG_DATABASE'
])

export { configService }
