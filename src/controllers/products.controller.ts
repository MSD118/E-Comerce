import {
  Controller,
  ErrorCode,
  getFilters,
  getPaginationData,
  product,
} from '../common'
import { prismaClient } from '..'
import { NotFoundException } from '../exceptions/not-found'

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
  try {
    const deleteProduct = await prismaClient.product.delete({
      where: {
        id: Number(request.params.id),
      },
    })

    response.status(200).json({
      message: 'Product Deleted',
      product: {
        id: deleteProduct.id,
      },
    })
  } catch (error) {
    throw new NotFoundException('Product not found', ErrorCode.NOT_FOUND)
  }
}

export const listProducts: Controller = async (request, response) => {
  const per_page = request.query.per_page ? Number(request.query.per_page) : 0
  const current_page = request.query.page ? Number(request.query.page) : 1

  const sort = request.query.sort ? String(request.query.sort) : 'id:asc'
  const [column, direction] = sort.split(':')

  const filters = request.query.filter ? String(request.query.filter) : ''

  const count = await prismaClient.product.count()
  const products = await prismaClient.product.findMany({
    orderBy: {
      [column]: direction,
    },
    skip: (current_page - 1) * per_page,
    ...(per_page ? { take: per_page } : {}),
    where: { ...getFilters(filters) },
  })

  response.status(200).json({
    pagination: getPaginationData(count, per_page, current_page),
    products,
  })
}

// export const getProductByID: Controller = async (request, response) => {}
