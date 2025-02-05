package org.example.examplemongo.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.examplemongo.config.JwtTokenUtil;
import org.example.examplemongo.domain.entity.User;
import org.example.examplemongo.dto.request.LoginRequest;
import org.example.examplemongo.dto.request.UserResquest;
import org.example.examplemongo.dto.response.UserResponse;
import org.example.examplemongo.exception.EntityNotFoundException;
import org.example.examplemongo.exception.InvalidRoleException;
import org.example.examplemongo.mapper.UserMapper;
import org.example.examplemongo.repository.UserRepository;
import org.example.examplemongo.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;


@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    @Override
    public UserResponse register(UserResquest userResquest) {

        User user=userMapper.toEntity(userResquest);

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);


        User savedUser = userRepository.save(user);



        return userMapper.toResponse(savedUser);
    }


    @Override
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(userMapper::toResponse);
    }

    @Override
    public UserResponse getUserById(String id) {
        User user = userRepository.findUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toResponse(user);
    }

    @Override
    public UserResponse updateUserRoles(String id, List<String> roleNames) {

        User user = userRepository.findUserById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));


        Set<String> validRoleNames = roleNames.stream()
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        Set<String> allowedRoles = getAllowedRoles();
        if (!allowedRoles.containsAll(validRoleNames)) {
            throw new InvalidRoleException("One or more roles are invalid: " + roleNames);
        }


        user.setRoles(new ArrayList<>(validRoleNames));

        User updatedUser = userRepository.save(user);
        return userMapper.toResponse(updatedUser);
    }


    @Override
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    private Set<String> getAllowedRoles() {
        return Set.of("ADMIN", "USER");
    }


}
