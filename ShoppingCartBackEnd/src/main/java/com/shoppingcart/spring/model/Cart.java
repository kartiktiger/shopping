package com.shoppingcart.spring.model;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.annotation.Id;

public class Cart implements Serializable {
    private static final long serialVersionUID = -2107862776559861069L;

    @Id
    private String id;

    private String userId;

    private List<Products> products;

    public Cart( String userId, List<Products> products ) {
        super();
        this.userId = userId;
        this.products = products;
    }

    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId( String userId ) {
        this.userId = userId;
    }

    public List<Products> getProducts() {
        return products;
    }

    public void setProducts( List<Products> products ) {
        this.products = products;
    }

    public static class Products implements Serializable {
        private static final long serialVersionUID = 6946203355702286497L;
        private String productId;
        private Integer quantity;

        public Products( String productId, Integer quantity ) {
            super();
            this.productId = productId;
            this.quantity = quantity;
        }

        public String getProductId() {
            return productId;
        }

        public void setProductId( String productId ) {
            this.productId = productId;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity( Integer quantity ) {
            this.quantity = quantity;
        }

        @Override
        public String toString() {
            return "ProductsInCart [productId=" + productId + ", quantity=" + quantity + "]";
        }
    }

}
