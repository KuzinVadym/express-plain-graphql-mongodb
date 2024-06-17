import { randomUUID } from 'crypto';
import { Model } from 'mongoose';

import { IProductDocument, TCreateProductsInput, TProduct, TUpdateProductInput } from '../../interfaces';


export class ProductResolvers {
    constructor(private readonly productModel: Model<IProductDocument>){
    }

    public getProducts = async (): Promise<TProduct[]> => {

        return [
          {
            _id: randomUUID().toString(),
            vintage: 'vintage',
            name: 'name',
            producerId: randomUUID().toString() ,
          },
          {
            _id: randomUUID().toString(),
            vintage: 'vintage',
            name: 'name',
            producerId: randomUUID().toString() ,
          }
        ];
      };
  
    public getProduct = async (args: { _id: string }): Promise<TProduct | null> => {

        return {
            _id: randomUUID().toString(),
            vintage: 'vintage',
            name: 'name',
            producerId: randomUUID().toString() ,
        };
      };
  
    public createProducts = async ({ input }: { input: TCreateProductsInput }): Promise<TProduct[]> => {
        return [{
            _id: randomUUID().toString(),
            vintage: 'vintage',
            name: 'name',
            producerId: randomUUID().toString() ,
        }];
      };
  
    public updateProduct = async (args: { input: TUpdateProductInput }): Promise<TProduct> => {
        return {
            _id: randomUUID().toString(),
            vintage: 'vintage',
            name: 'name',
            producerId: randomUUID().toString() ,
        };
      };
  
    public deleteProducts = async (args: [input: string[]]): Promise<Boolean> => {
        return true;
      };
  }