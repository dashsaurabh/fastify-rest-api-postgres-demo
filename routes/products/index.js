const productsDAOPlugin = require('../../services/productsDAO');

module.exports = async function (fastify, opts) {

    fastify.register(productsDAOPlugin);

    fastify.get('/', {
        schema: {
            description: 'This is an endpoint for fetching all products',
            tags: ['products'],
            response: {
                200: {
                    description: 'Success Response',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            category: { type: 'string' },
                            title: { type: 'string' },
                            price: { type: 'number' }
                        }
                    }
                }
            }
        }
    }, async (request, reply) => {
        const products = await fastify.productsDAO.getAllProducts();
        console.log(products)
        return products;
    })

    fastify.get('/:id', {
        schema: {
            description: 'This is an endpoint for fetching a product by id',
            tags: ['products'],
            params: {
                description: 'Product Id',
                type: 'object',
                properties: {
                    id: { type: 'number' } 
                }
            },
            response: {
                200: {
                    description: 'Success Response',
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        category: { type: 'string' },
                        title: { type: 'string' },
                        price: { type: 'number' }
                    }                  
                }
            }
        }
    }, async (request, reply) => {
        const { id } = request.params;
        const product = await fastify.productsDAO.getProductById(id);
        return product;
    })

    fastify.post('/', {
        schema: {
            description: 'This is an endpoint for creating a new product',
            tags: ['products'],
            body: {
                description: 'Payload for creating a new Product',
                type: 'object',
                properties: {
                    category: { type: 'string' },
                    title: { type: 'string' },
                    price: { type: 'number' }
                }
            },
            response: {
                201: {
                    description: 'Success Response',
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        category: { type: 'string' },
                        title: { type: 'string' },
                        price: { type: 'number' }
                    }                  
                }
            }
        }
    }, async (request, reply) => {
        const { category, title, price } = request.body;
        const newProduct = await fastify.productsDAO.createProduct(category, title, price)
        reply.code(201).send(newProduct)
    })

    fastify.put('/:id', {
        schema: {
            description: 'This is an endpoint for updating an existing product',
            tags: ['products'],
            params: {
                description: 'Product Id',
                type: 'object',
                properties: {
                    id: { type: 'number' } 
                }
            },
            body: {
                description: 'Payload for creating a new Product',
                type: 'object',
                properties: {
                    category: { type: 'string' },
                    title: { type: 'string' },
                    price: { type: 'number' }
                }
            },
            response: {
                200: {
                    description: 'Success Response',
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        category: { type: 'string' },
                        title: { type: 'string' },
                        price: { type: 'number' }
                    }                  
                }
            }
        }
    }, async (request, reply) => {
        const { id } = request.params
        const { category, title, price } = request.body;

        const updatedProduct = await fastify.productsDAO.updateProduct(id, category, title, price)

        return updatedProduct
    })

    fastify.delete('/:id', {
        schema: {
            description: 'This is an endpoint for PERMANENTLY DELETING an existing product.',
            tags: ['products'],
            params: {
                description: 'Product Id',
                type: 'object',
                properties: {
                    id: { type: 'number' } 
                }
            },
            response: {
                204: {
                    type: 'string',
                    default: 'No Content'    
                }
            }
        }
    }, async (request, reply) => {
        const { id } = request.params;
        await fastify.productsDAO.deleteProduct(id)

        reply.status(204)
    })
}