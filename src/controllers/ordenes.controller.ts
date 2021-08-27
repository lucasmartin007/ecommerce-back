// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {AnyObject, Filter, repository} from '@loopback/repository';
import {
  get, getModelSchemaRef, param, patch, post, requestBody, response
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

  @get('/ordenes/ultima-orden')
  @response(200, {
    description: 'Devuelve el id de la ultima orden',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ordenes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ordenes) filter?: Filter<Ordenes>,
  ): Promise<Ordenes[]> {
    let id_orden = 0
    return await this.ordenesRepository.find(
      {
        fields: ["id"],
        order: ["id DESC"],
        limit: 1,
      }
    );
  }

  @patch('/ordenes/{id}')
  @response(204, {
    description: 'Ordenes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenes, {partial: true}),
        },
      },
    })
    ordenes: Ordenes,
  ): Promise<void> {
    await this.ordenesRepository.updateById(id, ordenes);
  }

  @post('/ordenes-usuario')
  @response(200, {
    description: 'Array of Ordenes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ordenes, {includeRelations: true}),
        },
      },
    },
  })
  async findUserOrders(
    @requestBody({
      content: {
        'application/json': {
          idUsuario: "",
        },
      },
    })
    arreglo: AnyObject,
  ): Promise<Ordenes[]> {
    return this.ordenesRepository.find({
      where:
        {usuarioId: arreglo.idUsuario}
    });
  }
}
