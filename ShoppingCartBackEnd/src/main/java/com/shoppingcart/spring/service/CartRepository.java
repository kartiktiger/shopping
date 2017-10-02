package com.shoppingcart.spring.service;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.shoppingcart.spring.model.Cart;

public interface CartRepository extends MongoRepository<Cart, String>, CartRepositoryCustom {

    public Cart findByUserId( String userId );

}
