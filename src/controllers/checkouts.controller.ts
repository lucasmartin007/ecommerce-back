// Uncomment these imports to begin using these cool features!

import {repository} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {Checkouts} from '../models';
import {CheckoutsRepository} from '../repositories';

// import {inject} from '@loopback/core';


export class CheckoutsController {
  constructor(
    @repository(CheckoutsRepository)
    public checkoutsRepository: CheckoutsRepository,
  ) { }

  @post('/checkouts')
  @response(200, {
    description: 'Checkouts model instance',
    content: {'application/json': {schema: getModelSchemaRef(Checkouts)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Checkouts, {
            title: 'NewCheckouts',
            exclude: ['id'],
          }),
        },
      },
    })
    checkouts: Omit<Checkouts, 'id'>,
  ): Promise<Checkouts> {
    return this.checkoutsRepository.create(checkouts);
  }
}
