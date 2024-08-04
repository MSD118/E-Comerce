import { Controller, ErrorCode } from '../common'
import { prismaClient } from '..'
import { NotFoundException } from '../exceptions/not-found'

// ['tea', 'india'] => 'tea,india'

// Create a validator for this request

export const createProduct: Controller = async (request, response) => {
  const product = await prismaClient.product.create({
    data: {
      ...request.body,
      tags: request.body.tags.join(','),
    },
  })

  response.status(200).json(product)
}

export const createProducts: Controller = async (request, response) => {
  const products = request.body.map((product: product) => {
    return {
      ...product,
      tags: product.tags.join(','),
    }
  })
  try {
    await prismaClient.product.createMany({ data: products })

    response.status(200).json({ message: 'Products created' })
  } catch (error) {
    console.log(error)
  }
}

export const updateProduct: Controller = async (request, response) => {
  try {
    const product = request.body
    if (product.tags) {
      product.tags = product.tags.join(',')
    }
    const updateProduct = await prismaClient.product.update({
      where: {
        id: Number(request.params.id),
      },
      data: product,
    })
    response.status(200).json(updateProduct)
  } catch (error) {
    throw new NotFoundException('Product not found', ErrorCode.NOT_FOUND)
  }
}

export const deleteProduct: Controller = async (request, response) => {
  const deleteProduct = await prismaClient.product.delete({
    where: {
      id: Number(request.params.id),
    },
  })

  response.status(200).json({ message: 'Product Deleted', deleteProduct })
}

// export const listProducts: Controller = async (request, response) => {}

// export const getProductByID: Controller = async (request, response) => {}
