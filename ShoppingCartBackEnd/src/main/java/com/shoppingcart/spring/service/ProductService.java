package com.shoppingcart.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoppingcart.spring.model.Product;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public List<Product> getAllProducts() {
        System.out.println( "-------------------------------" );
        List<Product> products = repository.findAll();
        for ( Product product : products ) {
            System.out.println( product );
        }
        return products;
    }

    public Product getProductDetailById( String productId ) {
        System.out.println( "-------------------------------" );
        Product product = repository.findById( productId );
        System.out.println( "-------------product-----------------" + product );
        return product;
    }

}
