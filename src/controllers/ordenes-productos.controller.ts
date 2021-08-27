// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {
  repository
} from '@loopback/repository';
import {
  get, getModelSchemaRef, param, post, requestBody, response
} from '@loopback/rest';
import {OrdenesProductos} from '../models';
import {OrdenesProductosRepository} from '../repositories';


export class OrdenesProductosController {
  constructor(
    @repository(OrdenesProductosRepository)
    public ordenesProductosRepository: OrdenesProductosRepository,
  ) { }

  @post('/ordenes-productos')
  @response(200, {
    description: 'OrdenesProducto model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrdenesProductos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdenesProductos, {
            title: 'NewOrdenesProducto',
            exclude: ['id'],
          }),
        },
      },
    })
    ordenesProductos: Omit<OrdenesProductos, 'id'>,
  ): Promise<OrdenesProductos> {
    return this.ordenesProductosRepository.create(ordenesProductos);
  }

  @get('/idproductos-ordenesproductos/{idOrden}')
  @response(200, {
    description: 'Productos of OrdenesProductos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrdenesProductos, {includeRelations: true}),
      },
    },
  })
  async findProductsFromOrderId(
    @param.path.number('idOrden') idOrden: number,
    // @param.filter(OrdenesProductos, {exclude: 'where'}) filter?: FilterExcludingWhere<Producto>
  ): Promise<any[]> {
    return await this.ordenesProductosRepository.find({
      where:
        {ordenId: idOrden}
    })
  }
}
