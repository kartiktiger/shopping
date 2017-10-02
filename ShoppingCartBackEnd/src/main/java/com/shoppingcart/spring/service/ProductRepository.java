package com.shoppingcart.spring.service;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.shoppingcart.spring.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

    public Product findByName( String name );

    public Product findById( String id );

}
