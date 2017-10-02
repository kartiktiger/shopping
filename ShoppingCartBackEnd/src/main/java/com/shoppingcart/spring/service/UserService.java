package com.shoppingcart.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shoppingcart.spring.model.User;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<User> findAllUsers() {
        List<User> users = repository.findAll();
        return users;

    }

    public User registerUser( User user ) {
        User registeredUser = repository.save( user );
        return registeredUser;
    }

    public User updateUser( User user ) {

        User userDb = repository.findByusername( user.getUsername() );

        System.out.println( "userDb - " + userDb );

        userDb.setName( user.getName() );
        userDb.setAge( user.getAge() );
        userDb.setPhone( user.getPhone() );

        return repository.save( userDb );
    }

    public long deleteUser( String username ) {

        return repository.deleteByusername( username );
    }

    public boolean isUserExist( String username ) {
        User existingUser = repository.findByusername( username );
        return existingUser != null ? true : false;
    }

    public User getUserByUsername( String username ) {
        User existingUser = repository.findByusername( username );
        return existingUser;
    }
}
