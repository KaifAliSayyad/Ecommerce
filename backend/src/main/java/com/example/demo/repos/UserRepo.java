package com.example.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.User;

public interface UserRepo extends JpaRepository<User, Integer>{

}
