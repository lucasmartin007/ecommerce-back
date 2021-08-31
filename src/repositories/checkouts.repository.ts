import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyEcommerceDataSource} from '../datasources';
import {Checkouts, CheckoutsRelations} from '../models';

export class CheckoutsRepository extends DefaultCrudRepository<
  Checkouts,
  typeof Checkouts.prototype.id,
  CheckoutsRelations
> {
  constructor(
    @inject('datasources.proy_ecommerce') dataSource: ProyEcommerceDataSource,
  ) {
    super(Checkouts, dataSource);
  }
}
