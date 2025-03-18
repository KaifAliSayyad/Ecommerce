package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Products;
import com.example.demo.models.User;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to get all users
    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Endpoint to get a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        Optional<User> user = userService.getUserWithId(id);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint to create a new user
    @PostMapping("/")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    // Endpoint to add products to a user's cart
    @PostMapping("/{id}/cart")
    public ResponseEntity<String> addProductsToCart(@PathVariable Integer id, @RequestBody Set<Products> products) {
        String response = userService.addProductsToCart(id, products);
        return ResponseEntity.ok(response);
    }


    // Endpoint to add products to a user's vendor products
    @PostMapping("/{id}/vendor-products")
    public ResponseEntity<String> addVendorProducts(@PathVariable Integer id, @RequestBody Set<Products> products) {
        String response = userService.addVendorProducts(id, products);
        return ResponseEntity.ok(response);
    }

    // Endpoint to remove a product from the user's cart
    @DeleteMapping("/{id}/cart")
    public ResponseEntity<String> removeProductFromCart(@PathVariable Integer id, @RequestBody Products product) {
        String response = userService.removeProductFromCart(id, product);
        return ResponseEntity.ok(response);
    }

    // Endpoint to remove a product from the user's vendor products
    @DeleteMapping("/{id}/vendor-products")
    public ResponseEntity<String> removeProductFromVendorProducts(@PathVariable Integer id, @RequestBody Products product) {
        String response = userService.removeProductFromVendorProducts(id, product);
        return ResponseEntity.ok(response);
    }
}
