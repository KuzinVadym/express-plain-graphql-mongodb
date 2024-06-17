import { randomUUID } from 'crypto';
import { Model } from 'mongoose';

import { IProductDocument, TBulkCreateProductsInput, TCreateProductsInput, TDeleteProductsResult, TProduct, TUpdateProductInput } from '../../interfaces';
import { upsertCsvProductsFromUrl } from '../../usecases';


export class ProductResolvers {
    constructor(private readonly productModel: Model<IProductDocument>){
    }

    public getProducts = async (): Promise<TProduct[]> => {
      try {
        const findProductsResult = await this.productModel.find();
    
        return findProductsResult.map(result =>({
          _id: result._id.toString(),
          name: result.name,
          vintage: result.vintage,
          producerId: result.producerId.toString()
        }))
      
      } catch (error) {
        throw new Error(error);
      }
    };
  
    public getProduct = async (args: { _id: string, producerId }): Promise<TProduct | null> => {
      try {
        if (!Object.keys(args).length) {
          return null;
        }
        
        const result = await this.productModel.findOne(args);
    
        if(!result) {
          return null;
        }
    
        return {
          _id: result._id.toString(),
          name: result.name,
          vintage: result.vintage,
          producerId: result.producerId.toString()
        };
      
      } catch (error) {
        throw new Error(error);
      }
    };
  
    public createProducts = async (input: TCreateProductsInput[]): Promise<TProduct[]> => {
      try {

        const createResults = await Promise.all(input.map(productCreateinput => this.productModel.create(productCreateinput)));
    
        return createResults.map(result =>({
          _id: result._id.toString(),
          name: result.name,
          vintage: result.vintage,
          producerId: result.producerId.toString()
        }))

      } catch (error) {
        throw new Error(error);
      }
    };

    public bulkCreateProducts = async (input: TBulkCreateProductsInput): Promise<Boolean> => {
      try {
        upsertCsvProductsFromUrl(input.link)

        return true

      } catch (error) {
        throw new Error(error);
      }
    };
  
    public updateProduct = async (input: TUpdateProductInput): Promise<TProduct> => {
      try {
        const {_id, ...rest} = input

        const result = await this.productModel.findOneAndUpdate({ _id }, rest, { new: true });
        
        if(!result) {
          throw new Error(`Product with id ${_id} not found`);
        }
        
        return {
          _id: result._id.toString(),
          name: result.name,
          vintage: result.vintage,
          producerId: result.producerId.toString()
        };
      } catch (error) {
        throw new Error(error);
      }
    };
  
    public deleteProducts = async (_ids: string[]): Promise<TDeleteProductsResult[]> => {
      try {
        let deleteProductsResult = [];
        for (const _id of _ids) {
          
          const deleteResult = await this.productModel.findByIdAndDelete(_id)

          if(!deleteResult){
            deleteProductsResult.push({_id, status: false})
          } else {
            deleteProductsResult.push({_id, status: true})
          }
        }

        return deleteProductsResult;

      } catch (error) {
        throw new Error(error);
      }
     };
}