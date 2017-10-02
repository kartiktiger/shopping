package com.shoppingcart.spring.model;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

public class User implements Serializable {

    private static final long serialVersionUID = -7337471793370360975L;

    @Id
    private String id;

    private String username;
    private String password;
    private String name;
    private int age;
    private String role;
    private long phone;

    public User() {
        super();
    }

    public User( String username, String password, String name, int age, String role, long phone ) {
        super();
        this.username = username;
        this.password = password;
        this.name = name;
        this.age = age;
        this.role = role;
        this.phone = phone;
    }

    public String getId() {
        return id;
    }

    public void setId( String id ) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername( String username ) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword( String password ) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge( int age ) {
        this.age = age;
    }

    public String getRole() {
        return role;
    }

    public void setRole( String role ) {
        this.role = role;
    }

    public long getPhone() {
        return phone;
    }

    public void setPhone( long phone ) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "User [username=" + username + ", password=" + password + ", name=" + name + ", age=" + age + ", role=" + role + ", phone=" + phone + "]";
    }

}
