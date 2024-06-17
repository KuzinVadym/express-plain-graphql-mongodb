import { upsertCsvProductsFromUrlUseCase } from './upsertCsvProductsFromUrl';

export function initUseCases(entities) {
    const upsertCsvProductsFromUrl = upsertCsvProductsFromUrlUseCase(entities);
  
    return {
        upsertCsvProductsFromUrl,
    }
  }  