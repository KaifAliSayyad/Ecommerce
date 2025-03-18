package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.models.Products;
import com.example.demo.repos.ProductsRepo;

public class ProductService {

	
	@Autowired
	ProductsRepo repo;
	
	public List<Products> getAllProducts(){
		return repo.findAll();
	}
	
	public Optional<Products> getProductById(Integer id){
		return repo.findById(id);
	}
	
	public Products addProduct(Products product) {
		return repo.save(product);
	}
	
	public void deleteProduct(Products product) {
		repo.delete(product);
	}
}
