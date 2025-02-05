package org.example.examplemongo.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.examplemongo.dto.request.ChansonsRequest;
import org.example.examplemongo.dto.response.ChansonsResponse;
import org.example.examplemongo.service.ChansonsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chanson")
@Slf4j
@RequiredArgsConstructor
@Validated
public class ChansonsController {

    private final ChansonsService chansonsService;


    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Page<ChansonsResponse>> getAllChansons(@RequestParam(defaultValue = "0") int pageNo,@RequestParam(defaultValue = "10") int pageSize){
        Pageable pageable= PageRequest.of(pageNo,pageSize);
        return ResponseEntity.ok(chansonsService.getChansons(pageable));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public  ResponseEntity<ChansonsResponse> createChansons(@RequestBody @Valid ChansonsRequest chansonsRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(chansonsService.createChansons(chansonsRequest));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ChansonsResponse> updateChansons(@PathVariable String id,@RequestBody @Valid ChansonsRequest chansonsRequest){
        return ResponseEntity.ok(chansonsService.updateChansons(chansonsRequest,id));
    }

    @GetMapping("/title")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<ChansonsResponse> getChansonByTitle(
            @RequestParam String title) {
        return ResponseEntity.ok(chansonsService.getChansonsByTitle(title));
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ChansonsResponse> deleteChansons(@PathVariable String id){
        chansonsService.deleteChansons(id);
        return ResponseEntity.noContent().build();
    }
}
