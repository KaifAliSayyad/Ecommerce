package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Products;
import com.example.demo.models.User;
import com.example.demo.repos.UserRepo;

@Service
public class UserService {
	
	@Autowired
	UserRepo repo;
	
	public List<User> getAllUsers(){
		return repo.findAll();
	}
	
	
	public Optional<User> getUserWithId(Integer id){
		return repo.findById(id);
	}
	
	public User createUser(User user) {
		return repo.save(user);
	}
	
	
	public String addProductsToCart(Integer id, Set<Products> products) {
		Optional<User> user = repo.findById(id);
		User currentUser = user.get();
		if(currentUser != null) {
			Set<Products> userCart = currentUser.getCart();
			userCart.addAll(products);
			currentUser.setCart(userCart);
			repo.save(currentUser);
			return "User cart updated successfully";
		}else return "No user found with given ID";
	}
	
	public String addVendorProducts(Integer id, Set<Products> products) {
		Optional<User> user = repo.findById(id);
		User currentUser = user.get();
		if(currentUser != null) {
			Set<Products> userProducts = currentUser.getProducts();
			userProducts.addAll(products);
			currentUser.setProducts(userProducts);
			return "Vendor products updated successfully";
		}else return "No user found with given ID";
	}
	
	public String removeProductFromCart(Integer id, Products product) {
		User user = repo.findById(id).get();
		if(user != null) {
			Set<Products> userCart = user.getCart();
			if(userCart.contains(product)) {				
				userCart.remove(product);
				user.setCart(userCart);
				return "Product removed successfully";
			}else return "User Cart is Empty";
		}else return "No user found with given ID";
	}
	
	
	public String removeProductFromVendorProducts(Integer id, Products product) {
		User user = repo.findById(id).get();
		if(user != null) {
			Set<Products> userProducts = user.getProducts();
			if(userProducts.contains(product)) {				
				userProducts.remove(product);
				user.setProducts(userProducts);
				return "Product removed successfully";
			}else return "Vendor products is Empty";
		}else return "No user found with given ID";
	}
}
