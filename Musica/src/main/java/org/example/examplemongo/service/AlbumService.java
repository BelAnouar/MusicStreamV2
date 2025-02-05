package org.example.examplemongo.service;

import org.example.examplemongo.dto.request.AlbumRequest;
import org.example.examplemongo.dto.response.AlbumResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AlbumService {


    AlbumResponse createAlbum(AlbumRequest albumRequest);
    AlbumResponse updateAlbum(AlbumRequest albumRequest,String id);
    Page<AlbumResponse> getAlbums(Pageable pageable);
    void deleteAlbum(String id);
    Page<AlbumResponse> getAlbumsByTitle(String title, Pageable pageable);
}
