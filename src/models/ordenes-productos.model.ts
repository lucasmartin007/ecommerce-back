import {Entity, model, property} from '@loopback/repository';

@model()
export class OrdenesProductos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true
  })
  id?: number;

  @property({
    type: 'number',
    required: true
  })
  ordenId: number;

  @property({
    type: 'number',
    required: true
  })
  productoId: number;

  @property({
    type: 'number',
    required: true
  })
  cantidad: number;


  constructor(data?: Partial<OrdenesProductos>) {
    super(data);
  }
}

export interface OrdenesProductosRelations {
  // describe navigational properties here
}

export type OrdenesProductosWithRelations = OrdenesProductos & OrdenesProductosRelations;
