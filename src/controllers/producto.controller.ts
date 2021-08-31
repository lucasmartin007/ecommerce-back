import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Producto} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @post('/productos')
  @response(200, {
    description: 'Producto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Producto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProducto',
            exclude: ['id'],
          }),
        },
      },
    })
    producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.productoRepository.create(producto);
  }

  @get('/productos/count')
  @response(200, {
    description: 'Producto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Producto) where?: Where<Producto>,
  ): Promise<Count> {
    return this.productoRepository.count(where);
  }

  @get('/productos')
  @response(200, {
    description: 'Array of Producto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Producto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Producto) filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.productoRepository.find(filter);
  }

  @patch('/productos')
  @response(200, {
    description: 'Producto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Producto,
    @param.where(Producto) where?: Where<Producto>,
  ): Promise<Count> {
    return this.productoRepository.updateAll(producto, where);
  }

  @get('/productos/{id}')
  @response(200, {
    description: 'Producto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Producto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Producto, {exclude: 'where'}) filter?: FilterExcludingWhere<Producto>
  ): Promise<Producto> {
    return this.productoRepository.findById(id, filter);
  }

  @patch('/productos/{id}')
  @response(204, {
    description: 'Producto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Producto,
  ): Promise<void> {
    await this.productoRepository.updateById(id, producto);
  }

  @put('/productos/{id}')
  @response(204, {
    description: 'Producto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() producto: Producto,
  ): Promise<void> {
    await this.productoRepository.replaceById(id, producto);
  }

  @del('/productos/{id}')
  @response(204, {
    description: 'Producto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productoRepository.deleteById(id);
  }

  //
  dev_base64(nom_imagen: string): string {
    let ruta_imagen = "./uploads/productos/" + nom_imagen
    const fs = require('fs');
    fs.readFile(ruta_imagen, 'base64', (err: any, data: string) => {
      if (err) {
        console.error(err)
        // return
      }
      try {
        console.log(data)
        return data
      } catch (error) {
        console.log(error)
        return "Error: " + error
      }
    })
    return ""
  }

  // @get('/producto-imagen/{id_producto}')
  // @response(200, {
  //   description: 'Producto image',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'array',
  //         items: getModelSchemaRef(Producto, {includeRelations: true}),
  //       },
  //     },
  //   },
  // })
  // async getProductImage(
  //   // @param.filter(Producto) filter?: Filter<Producto>,
  //   @param.path.number('id_producto') id_producto: number,
  // ): Promise<string> {
  //   return this.productoRepository.findById(id_producto)
  //     .then((prod) => {
  //       if (prod.nombre_imagen) {
  //         return this.dev_base64(prod.nombre_imagen);
  //       } else {
  //         return "";
  //       }
  //     })
  // }

  //
  @get('/productos-paginacion/{cant_total}/{cant_por_pagina}/{multiplicador}')
  @response(200, {
    description: 'Producto image',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Producto, {includeRelations: true}),
        },
      },
    },
  })
  async getProductPagination(
    // @param.filter(Producto) filter?: Filter<Producto>,
    @param.path.number('cant_total') cant_total: number,
    @param.path.number('cant_por_pagina') cant_por_pagina: number,
    @param.path.number('multiplicador') multiplicador: number
  ): Promise<any[]> {
    return await this.productoRepository.find({
      limit: (multiplicador - 1) * cant_por_pagina + cant_por_pagina
    }).then((prods) => {
      let n_productos = [];
      for (let i = (multiplicador - 1) * cant_por_pagina; i < (multiplicador - 1) * cant_por_pagina + cant_por_pagina; i++) {
        n_productos.push(prods[i])
        if (i == cant_total - 1) {
          break
        }
      }
      return n_productos
    }).catch((error) => {
      return [{"Error": error}]
    })

  }
}
