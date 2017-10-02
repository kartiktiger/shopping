package com.shoppingcart.spring.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.shoppingcart.spring.model.Product;
import com.shoppingcart.spring.model.ProductsDetailedCart;
import com.shoppingcart.spring.model.User;
import com.shoppingcart.spring.service.CartService;
import com.shoppingcart.spring.service.ProductService;
import com.shoppingcart.spring.service.UserService;

@CrossOrigin
@RestController
@RequestMapping ( "/api" )
public class RestApiController {
    public static final Logger logger = LoggerFactory.getLogger( RestApiController.class );

    @Autowired
    private ProductService productService;

    @Autowired
    private CartService cartService;

    @Autowired
    UserService userService;

    @RequestMapping ( value = "/products", method = RequestMethod.GET )
    public @ResponseBody ResponseEntity<List<Product>> listAllCustomers() {
        System.out.println( " listAlCustomers " );
        List<Product> products = productService.getAllProducts();
        if ( products == null ) {
            return new ResponseEntity( HttpStatus.NO_CONTENT );
        }
        return new ResponseEntity<List<Product>>( products, HttpStatus.OK );
    }

    @RequestMapping ( value = "/product/{productId}/detail", method = RequestMethod.GET )
    public @ResponseBody ResponseEntity<Product> getProductDetail( @PathVariable ( "productId" ) String productId ) {
        System.out.println( " getProductDetail " );
        Product product = productService.getProductDetailById( productId );
        if ( product == null ) {
            return new ResponseEntity( HttpStatus.NO_CONTENT );
        }
        return new ResponseEntity<Product>( product, HttpStatus.OK );
    }

    @RequestMapping ( value = "user/{userId}/product/{productId}", method = RequestMethod.POST )
    public @ResponseBody ResponseEntity<String> addProductToCart( @PathVariable ( "userId" ) String userId, @PathVariable ( "productId" ) String productId ) {
        System.out.println( " addProductToCart " );

        String status = cartService.addProductToCart( userId, productId );
        String httpMessage = null;

        if ( status != null && status.equalsIgnoreCase( "success" ) ) {
            httpMessage = "{\"message\":" + "\"" + "product added successfully" + "\"}";
            return new ResponseEntity<String>( httpMessage, HttpStatus.OK );
        }
        httpMessage = "{\"message\":" + "\"" + "Please login to add product to cart...." + "\"}";
        return new ResponseEntity( httpMessage, HttpStatus.NOT_FOUND );

    }

    @RequestMapping ( value = "user/{userId}/cart", method = RequestMethod.GET )
    public @ResponseBody ResponseEntity<ProductsDetailedCart> getUsersCart( @PathVariable ( "userId" ) String userId ) {
        System.out.println( " getUsersCart " );
        ProductsDetailedCart productsDetailedCart = cartService.getUsersCart( userId );
        if ( productsDetailedCart == null ) {
            return new ResponseEntity( "{\"message\":" + "\"" + "You have no items in Cart" + "\"}", HttpStatus.NOT_FOUND );
        }
        return new ResponseEntity<ProductsDetailedCart>( productsDetailedCart, HttpStatus.OK );
    }

    // -------------------Retrieve All Users---------------------------------------------

    @RequestMapping ( value = "/user/registration", method = RequestMethod.POST )
    public ResponseEntity<User> registerUser( @RequestBody User user ) {
        logger.info( "Creating User : {}", user );

        if ( userService.isUserExist( user.getUsername() ) ) {
            logger.error( "Unable to create. A User with username " + user.getUsername() + " already exist." );
            user.setUsername( null );
            user.setRole( null );
            return new ResponseEntity( user, HttpStatus.CONFLICT );
        }
        User registeredUser = userService.registerUser( user );

        return new ResponseEntity<User>( registeredUser, HttpStatus.CREATED );
    }

    @RequestMapping ( value = "/user/update", method = RequestMethod.POST )
    public ResponseEntity<User> updateUser( @RequestBody User user ) {
        logger.info( "Updating User : {}", user );

        User updatedUser = userService.updateUser( user );
        if ( updatedUser == null ) {
            logger.error( "Unable to update user..." );
            return new ResponseEntity( "Unable to update user...", HttpStatus.CONFLICT );
        }

        return new ResponseEntity<User>( updatedUser, HttpStatus.CREATED );
    }

    @RequestMapping ( value = "user/{username}", method = RequestMethod.GET )
    public @ResponseBody ResponseEntity<User> getUser( @PathVariable ( "username" ) String username ) {
        System.out.println( " getUser " );
        User user = userService.getUserByUsername( username );
        if ( user == null ) {
            return new ResponseEntity( "{\"message\":" + "\"" + "User not found" + "\"}", HttpStatus.NOT_FOUND );
        }
        return new ResponseEntity<User>( user, HttpStatus.OK );
    }

    @RequestMapping ( value = "/user/{username}/delete", method = RequestMethod.DELETE )
    public ResponseEntity<String> deleteUser( @PathVariable ( "username" ) String username ) {
        logger.info( "Deleting User : {}", username );

        String httpMessage;
        long deletedUserId = userService.deleteUser( username );
        System.out.println( "deletedUserId : " + deletedUserId );

        if ( deletedUserId == 0 ) {
            logger.error( "Unable to delete user" );
            httpMessage = "{\"message\":" + "\"" + "unable to delete user" + "\"}";
            return new ResponseEntity( httpMessage, HttpStatus.CONFLICT );
        }
        httpMessage = "{\"message\":" + "\"" + "user deleted successfully" + "\"}";
        return new ResponseEntity<String>( httpMessage, HttpStatus.CREATED );
    }

    @RequestMapping ( value = "user/login", method = RequestMethod.POST )
    public ResponseEntity<User> loginUser( @RequestBody User user ) {
        logger.info( "logging in User : {}", user );

        User loggedInUser = userService.getUserByUsername( user.getUsername() );

        if ( loggedInUser == null ) {
            logger.error( "Unable to login. A User with username " + user.getUsername() + " does not exist." );
            user.setUsername( null );
            user.setRole( null );
            return new ResponseEntity( user, HttpStatus.CONFLICT );
        }

        return new ResponseEntity<User>( loggedInUser, HttpStatus.CREATED );
    }

    @RequestMapping ( value = "all/users", method = RequestMethod.GET )
    public ResponseEntity<List<User>> getAllUsers() {
        logger.info( "getAllUsers : {}" );

        List<User> users = userService.findAllUsers();

        return new ResponseEntity<List<User>>( users, HttpStatus.CREATED );
    }
}
