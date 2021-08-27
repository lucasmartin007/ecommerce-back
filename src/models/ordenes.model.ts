import {Entity, model, property} from '@loopback/repository';

@model()
export class Ordenes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true
  })
  usuarioId: string;

  @property({
    type: 'number',
    required: false
  })
  precioTotal?: number;

  @property({
    type: 'date',
    required: true
  })
  created_at: Date;


  constructor(data?: Partial<Ordenes>) {
    super(data);
  }
}

export interface OrdenesRelations {
  // describe navigational properties here
}

export type OrdenesWithRelations = Ordenes & OrdenesRelations;
