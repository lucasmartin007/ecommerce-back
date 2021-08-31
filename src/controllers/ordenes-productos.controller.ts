// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {
  repository
} from '@loopback/repository';
import {
  get, getModelSchemaRef, param, post, requestBody, response
} from '@loopback/rest';
import axios from "axios";
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

  //
  async busc_producto(id_producto: number): Promise<any[]> {
    let arr: any[] = []
    let nom_producto = ""
    let prec_producto = 0

    let url_producto = "http://localhost:3000/productos/" + id_producto
    await axios
      .get(url_producto)
      .then(r => {
        console.log("Retornando datos")
        nom_producto = r.data.nombre;
        prec_producto = r.data.precio;
        let it_producto = [{
          "nombre": nom_producto,
          "precio": prec_producto
        }]
        arr = it_producto
      });
    return arr
  }

  async ped_productos(ords_productos: any[]): Promise<any[]> {
    let l_o_productos: any[] = [];
    await ords_productos.forEach(ordprod => {
      let prod = this.busc_producto(ordprod.productoId)
        .then((prod) => {
          console.log(prod)
          let it_producto = [{
            "nombre": prod[0].nombre,
            "precio": prod[0].precio,
            "cantidad": ordprod.cantidad
          }];
          l_o_productos.push(it_producto)
          console.log(l_o_productos)
        })
    });
    if (ords_productos.length > 0) {
      return l_o_productos
    } else {
      return [];
    }
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
  ): Promise<Promise<any[]>> {
    let l_o_productos: any[] = [];
    await this.ordenesProductosRepository.find({
      where:
        {ordenId: idOrden}
    }).then((ords_productos) => {
      console.log("Realizando este then")
      // l_o_productos = this.ped_productos(ords_productos)
      l_o_productos = []
    });
    console.log("Devolviendo resultado")
    return l_o_productos

    // console.log("Lista de productos ordenes final:" + l_o_productos.length);
    // return l_o_productos;
  }
}
