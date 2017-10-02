package com.shoppingcart.spring.service;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.shoppingcart.spring.model.User;

public interface UserRepository extends MongoRepository<User, String> {

    public User findByusername( String username );

    public User findById( String id );

    public long deleteByusername( String username );

}
