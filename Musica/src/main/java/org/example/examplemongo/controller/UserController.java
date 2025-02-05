package org.example.examplemongo.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.examplemongo.config.JwtTokenUtil;
import org.example.examplemongo.dto.request.LoginRequest;
import org.example.examplemongo.dto.request.UserResquest;
import org.example.examplemongo.dto.response.UserResponse;
import org.example.examplemongo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@CrossOrigin("http://localhost:4200/*")
@Validated
public class UserController {

    private final UserService userService;



    private final   AuthenticationManager authenticationManager;


    private  final   JwtTokenUtil jwtTokenUtil;



    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginDTO) {

        log.info("Login request: {}", loginDTO);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getLogin(), loginDTO.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }

    @PostMapping("/register")

    public ResponseEntity<?> register(@Valid @RequestBody UserResquest registerDTO) {
        userService.register(registerDTO);
        return ResponseEntity.ok(Collections.singletonMap("message", "User registered successfully"));
    }




}
