package com.shoppingcart.spring.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.shoppingcart.spring.model.Cart;

//Impl postfix of the name on it compared to the core repository interface
public class CartRepositoryImpl implements CartRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    public void addProductToExistingCart( String cartId, Cart.Products products ) {
        mongoTemplate.updateFirst( Query.query( Criteria.where( "id" ).is( cartId ) ), new Update().push( "products", products ), Cart.class );
    }

}
