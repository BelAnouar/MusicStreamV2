package org.example.examplemongo.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.examplemongo.dto.request.AlbumRequest;
import org.example.examplemongo.dto.response.AlbumResponse;
import org.example.examplemongo.service.AlbumService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/album")
@Slf4j
@RequiredArgsConstructor
@Validated
public class AlbumConteroller {

 private final AlbumService albumService;

    @GetMapping
    public ResponseEntity<Page<AlbumResponse>> getAllAlbum(@RequestParam(defaultValue = "0") int pageNo,@RequestParam(defaultValue ="10" ) int pageSize){
        Pageable pageable= PageRequest.of(pageNo,pageSize);
        return ResponseEntity.ok(albumService.getAlbums(pageable));
    }

    @PostMapping
    public ResponseEntity<AlbumResponse> createAlbum(@Validated @RequestBody AlbumRequest albumRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(albumService.createAlbum(albumRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlbumResponse> updateAlbum(@Validated @RequestBody AlbumRequest albumRequest, @PathVariable String id){
        return ResponseEntity.status(HttpStatus.OK).body(albumService.updateAlbum(albumRequest, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlbum(@PathVariable String id){
        albumService.deleteAlbum(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Page<AlbumResponse>> getAlbumsByTitle(
            @RequestParam String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("Received request to search albums with title containing: {}", title);
        Pageable pageable = PageRequest.of(page, size);
        Page<AlbumResponse> albums = albumService.getAlbumsByTitle(title, pageable);
        return ResponseEntity.ok(albums);
    }


}
