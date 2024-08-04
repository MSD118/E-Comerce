import { Controller } from '../common';
import { prismaClient } from '..';

// ['tea', 'india'] => 'tea,india'

// Create a validator for this request

export const createProduct: Controller = async (request, response) => {
  const product = await prismaClient.product.create({
    data: {
      ...request.body,
      tags: request.body.tags.join(','),
    },
  });

  response.status(200).json(product);
};


export const updateProduct: Controller = async (request, response) => {

}

export const deleteProduct: Controller = async (request, response) => {

}

export const listProducts: Controller = async (request, response) => {

}

export const getProductByID: Controller = async (request, response) => {

}
