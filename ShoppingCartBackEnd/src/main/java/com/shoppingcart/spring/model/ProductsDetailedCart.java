package com.shoppingcart.spring.model;

import java.io.Serializable;
import java.util.List;

public class ProductsDetailedCart implements Serializable {

    private static final long serialVersionUID = 4998710404087740045L;

    private Cart cart;

    private List<Product> products;

    public ProductsDetailedCart() {
        super();
    }

    public ProductsDetailedCart( Cart cart, List<Product> products ) {
        super();
        this.cart = cart;
        this.products = products;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart( Cart cart ) {
        this.cart = cart;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts( List<Product> products ) {
        this.products = products;
    }

    @Override
    public String toString() {
        return "ProductsDetailedCart [cart=" + cart + ", products=" + products + "]";
    }

}
