package com.example.demo.domain.user;

import com.example.demo.core.generic.ExtendedService;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.management.InstanceAlreadyExistsException;

public interface UserService extends UserDetailsService, ExtendedService<User> {
  User register(User user) throws InstanceAlreadyExistsException;
  User getByEmail(String email);
}
