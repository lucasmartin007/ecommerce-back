import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProyEcommerceDataSource} from '../datasources';
import {OrdenesProductos, OrdenesProductosRelations} from '../models';

export class OrdenesProductosRepository extends DefaultCrudRepository<
  OrdenesProductos,
  typeof OrdenesProductos.prototype.id,
  OrdenesProductosRelations
> {
  constructor(
    @inject('datasources.proy-ecommerce') dataSource: ProyEcommerceDataSource,
  ) {
    super(OrdenesProductos, dataSource);
  }
}
