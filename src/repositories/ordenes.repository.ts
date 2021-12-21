import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyEcommerceDataSource} from '../datasources';
import {Ordenes, OrdenesRelations} from '../models';

export class OrdenesRepository extends DefaultCrudRepository<
  Ordenes,
  typeof Ordenes.prototype.id,
  OrdenesRelations
> {
  constructor(
    @inject('datasources.proy-ecommerce') dataSource: ProyEcommerceDataSource,
  ) {
    super(Ordenes, dataSource);
  }
}
