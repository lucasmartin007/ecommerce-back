import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'proy-ecommerce',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'proy-ecommerce'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ProyEcommerceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'proy-ecommerce';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.proy-ecommerce', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
