package com.shoppingcart.spring.service;

import com.shoppingcart.spring.model.Cart;

public interface CartRepositoryCustom {

    public void addProductToExistingCart( String cartId, Cart.Products products );

}
