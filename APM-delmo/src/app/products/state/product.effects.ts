import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { ProductApiActions, ProductPageActions } from './actions';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
                private productService: ProductService){}

    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductApiActions.loadProductsSuccess({ products })),
                catchError(error => of(ProductApiActions.loadProductsFailure({ error })))
            ))
        );
    });

    updateProduct$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(ProductPageActions.updateProduct),
            concatMap(action =>
              this.productService.updateProduct(action.product)
                .pipe(
                    map(product => ProductApiActions.updateProductSuccess({ product })),
                    catchError(error => of(ProductApiActions.updateProductFailure({ error })))
                )
            )
        );
    });

    // HW4: build the effect to process that action and dispatch the success and fail actions
    addProduct$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(ProductPageActions.addProduct),
            concatMap(action =>
              this.productService.createProduct(action.product)
                .pipe(
                    map(product => ProductApiActions.addProductSuccess({ product })),
                    catchError(error => of(ProductApiActions.addProductFailure({ error })))
                )
            )
        );
    });

    deleteProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
            ofType(ProductPageActions.deleteProduct),
            mergeMap(action =>
                this.productService.deleteProduct(action.productId).pipe(
                    map(() => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
                    catchError(error => of(ProductApiActions.deleteProductFailure({ error })))
                )
            )
        );
    });
}
