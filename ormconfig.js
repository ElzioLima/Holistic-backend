module.exports = [
  {
    type: 'postgres',
    url: process.env.DATABASE_URL || 'postgres://ndyzekxzfggivq:d52e05e11a6f80a3a2fff468ce10b10745e275cc756fcee2d55aacdcd8912acc@ec2-3-219-135-162.compute-1.amazonaws.com:5432/d2sgv369see265',
    logging: true,
    synchronize: true,
    /*cache: {
      type: 'redis',
      duration: 1000 * 60,
      options: {
        url: process.env.REDIS_TLS_URL,
        socket: {
          tls: true,
          rejectUnauthorized: false
        },
        legacyMode: false
      }
    },*/
    cache: {
      type: 'database',
      duration: 1000 * 60,
      options: {
        database: 'postgres',
        schema: 'public',
        table: 'cache'
      }
    },
    ssl: {
      rejectUnauthorized: false
    },
    migrations: [
      `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/repos/postgres/migrations/*.{js,ts}`
    ],
    entities: [
      `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/repos/postgres/entities/index.{js,ts}`
    ],
    cli: {
      migrationsDir: `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/repos/postgres/migrations/`
    }
  }
]