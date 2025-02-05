package org.example.examplemongo.service;

import org.example.examplemongo.dto.request.ChansonsRequest;
import org.example.examplemongo.dto.response.ChansonsResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChansonsService {

    ChansonsResponse createChansons(ChansonsRequest chansonsRequest);
    Page<ChansonsResponse> getChansons(Pageable pageable);
    ChansonsResponse getChansonsByTitle(String chansonsTitle);
    ChansonsResponse updateChansons(ChansonsRequest chansonsRequest, String chansonsId);
    void deleteChansons(String chansonsId);
}
