package com.shoppingcart.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoppingcart.spring.model.Cart;
import com.shoppingcart.spring.model.Product;
import com.shoppingcart.spring.model.ProductsDetailedCart;
import com.shoppingcart.spring.model.Cart.Products;

@Service
public class CartService {

    @Autowired
    private CartRepository repository;

    @Autowired
    private ProductRepository productRepository;

    public String addProductToCart( String userId, String productId ) {
        System.out.println( "---------addProductToCart----------------------" + userId + ", " + productId );
        if ( userId.equalsIgnoreCase( "null" ) || userId.equalsIgnoreCase( "undefined" ) ) {
            return "failure";
        }

        Cart.Products products = new Cart.Products( productId, 1 );
        List<Cart.Products> productsList = new ArrayList<Cart.Products>();
        productsList.add( products );

        Cart cart = new Cart( userId, productsList );

        Cart existingCart = repository.findByUserId( userId );
        Cart cartSaved = null;
        if ( existingCart == null ) {
            cartSaved = repository.save( cart );
            System.out.println( "-------------cartSaved-----------------" + cartSaved );
        } else {
            repository.addProductToExistingCart( existingCart.getId(), products );
        }

        return "success";
    }

    public ProductsDetailedCart getUsersCart( String userId ) {
        System.out.println( "---------getUsersCart----------------------" );

        Cart cart = repository.findByUserId( userId );
        if ( cart == null || cart.getProducts() == null || cart.getProducts().size() == 0 ) {
            return null;
        }
        Product productDetail;
        List<Product> productsDetails = new ArrayList<>();
        for ( Products product : cart.getProducts() ) {
            productDetail = productRepository.findById( product.getProductId() );
            productDetail.setQuantity( product.getQuantity() );
            productsDetails.add( productDetail );
        }

        ProductsDetailedCart productsDetailedCart = new ProductsDetailedCart( cart, productsDetails );
        System.out.println( "-------------productsDetailedCart-----------------" + productsDetailedCart );
        return productsDetailedCart;
    }

}
