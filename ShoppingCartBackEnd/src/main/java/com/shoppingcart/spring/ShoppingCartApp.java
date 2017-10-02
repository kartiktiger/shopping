package com.shoppingcart.spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.shoppingcart.spring.service.ProductRepository;

@SpringBootApplication
public class ShoppingCartApp implements CommandLineRunner {
    @Autowired
    private ProductRepository repository;

    public static void main( String[] args ) {
        SpringApplication.run( ShoppingCartApp.class, args );
    }

    @Override
    public void run( String... args ) throws Exception {

    }
}
