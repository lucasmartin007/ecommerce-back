import {Entity, model, property} from '@loopback/repository';

@model()
export class Checkouts extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  ordenId: number;

  @property({
    type: 'string',
    required: true,
  })
  metodoPago: string;

  @property({
    type: 'number',
  })
  numeroTarjeta?: number;

  @property({
    type: 'number',
  })
  codigoTarjeta?: number;

  @property({
    type: 'number',
    required: true,
  })
  precioTotal: number;

  constructor(data?: Partial<Checkouts>) {
    super(data);
  }
}

export interface CheckoutsRelations {
  // describe navigational properties here
}

export type CheckoutsWithRelations = Checkouts & CheckoutsRelations;
