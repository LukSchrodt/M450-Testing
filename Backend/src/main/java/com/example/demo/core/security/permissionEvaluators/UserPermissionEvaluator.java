package com.example.demo.core.security.permissionEvaluators;

import com.example.demo.domain.myListEntry.MyListEntryService;
import com.example.demo.domain.myListEntry.MyListEntryServiceImpl;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UserPermissionEvaluator {

  MyListEntryService myListEntryService;
  UserService userService;

  @Autowired
  public UserPermissionEvaluator(MyListEntryService myListEntryService, UserService userService) {
    this.myListEntryService = myListEntryService;
    this.userService = userService;
  }

  public UserPermissionEvaluator() {
  }

  public boolean isUserAboveAge(User principal, int age) {
    return true;
  }

  //Checks if a user owns an EntryList or if it's an admin
  public boolean isUserOwner(UUID id){
    if(myListEntryService.getCurrentUser().getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN")) || myListEntryService.getCurrentUser().equals(myListEntryService.findById(id).getUser())) {
      return true;
    }else {
      return false;
    }
  }

  //Checks if it's the user itself or if it's an admin
  public boolean isUserItSelf(UUID id){
    if(myListEntryService.getCurrentUser().getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN")) || myListEntryService.getCurrentUser().equals(userService.findById(id))) {
      return true;
    }else {
      return false;
    }
  }
}
