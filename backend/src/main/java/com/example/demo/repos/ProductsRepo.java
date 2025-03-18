package com.example.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Products;

public interface ProductsRepo extends JpaRepository<Products, Integer>{

}
