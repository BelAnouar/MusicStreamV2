package org.example.examplemongo.service;

import org.example.examplemongo.dto.request.LoginRequest;
import org.example.examplemongo.dto.request.UserResquest;
import org.example.examplemongo.dto.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    UserResponse register(UserResquest userResquest);
    void deleteUser(String id);
    Page<UserResponse> getAllUsers(Pageable pageable);
    UserResponse getUserById(String id);
    UserResponse updateUserRoles(String id, List<String> roleNames);
}
