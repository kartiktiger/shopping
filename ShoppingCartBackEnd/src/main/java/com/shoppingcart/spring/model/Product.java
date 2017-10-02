package com.shoppingcart.spring.model;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

public class Product implements Serializable {

    private static final long serialVersionUID = -4131104677872814164L;

    @Id
    private String id;

    private String name;
    private String descriptions;
    private int quantity;
    private int price;

    /**
     * @param name
     * @param descriptions
     * @param equantity
     * @param price
     */
    public Product( String name, String descriptions, int quantity, int price ) {
        super();
        this.name = name;
        this.descriptions = descriptions;
        this.quantity = quantity;
        this.price = price;
    }

    /**
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId( String id ) {
        this.id = id;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName( String name ) {
        this.name = name;
    }

    /**
     * @return the descriptions
     */
    public String getDescriptions() {
        return descriptions;
    }

    /**
     * @param descriptions the descriptions to set
     */
    public void setDescriptions( String descriptions ) {
        this.descriptions = descriptions;
    }

    /**
     * @return the quantity
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * @param quantity the quantity to set
     */
    public void setQuantity( int quantity ) {
        this.quantity = quantity;
    }

    /**
     * @return the price
     */
    public int getPrice() {
        return price;
    }

    /**
     * @param price the price to set
     */
    public void setPrice( int price ) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product [id=" + id + ", name=" + name + ", descriptions=" + descriptions + ", quantity=" + quantity + ", price=" + price + "]";
    }

}
