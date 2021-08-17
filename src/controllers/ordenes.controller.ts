// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {
  repository
} from '@loopback/repository';
import {
  getModelSchemaRef, post, requestBody,
  response
} from '@loopback/rest';
import {Ordenes} from '../models';
import {OrdenesRepository} from '../repositories';



export class OrdenesController {
  constructor(
    @repository(OrdenesRepository)
    public ordenesRepository: OrdenesRepository,
  ) { }

  @post('/ordenes')
  @response(200, {
    description: 'Ordenes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ordenes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenes, {
            title: 'NewOrdenes',
            exclude: ['id', 'precioTotal'],
          }),
        },
      },
    })
    ordenes: Omit<Ordenes, 'id'>,
  ): Promise<Ordenes> {
    return this.ordenesRepository.create(ordenes);
  }
}
