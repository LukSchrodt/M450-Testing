package com.example.demo.domain.user;

import com.example.demo.core.generic.ExtendedServiceImpl;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.InstanceAlreadyExistsException;

@Service
public class UserServiceImpl extends ExtendedServiceImpl<User> implements UserService {

  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserServiceImpl(UserRepository repository, Logger logger, PasswordEncoder passwordEncoder) {
    super(repository, logger);
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return ((UserRepository) repository).findByEmail(email)
                                        .map(UserDetailsImpl::new)
                                        .orElseThrow(() -> new UsernameNotFoundException(email));
  }

  @Override
  public User register(User user) throws InstanceAlreadyExistsException {
    try {
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      return save(user);
    }catch (Exception e){
      throw new InstanceAlreadyExistsException("This Email is already used");
    }
  }

  @Override
  public User getByEmail(String email) {
    return ((UserRepository) repository).findByEmail(email).get();
  }
}
