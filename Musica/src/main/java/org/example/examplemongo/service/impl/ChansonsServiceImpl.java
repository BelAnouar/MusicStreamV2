package org.example.examplemongo.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.examplemongo.domain.entity.Chanson;
import org.example.examplemongo.dto.request.ChansonsRequest;
import org.example.examplemongo.dto.response.ChansonsResponse;
import org.example.examplemongo.exception.EntityNotFoundException;
import org.example.examplemongo.mapper.ChansonsMapper;
import org.example.examplemongo.repository.ChansonsRepository;
import org.example.examplemongo.service.ChansonsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ChansonsServiceImpl implements ChansonsService {

    private final ChansonsRepository chansonsRepository;
    private final ChansonsMapper chansonsMapper;

    @Override
    public ChansonsResponse createChansons(ChansonsRequest chansonsRequest) {
        Chanson chanson =chansonsMapper.toEntity(chansonsRequest);
        Chanson chansonSaved = chansonsRepository.save(chanson);
        return chansonsMapper.toResponse(chansonSaved);
    }

    @Override
    public Page<ChansonsResponse> getChansons(Pageable pageable) {

        return chansonsRepository.findAll(pageable).map(chansonsMapper::toResponse);
    }

    @Override
    public ChansonsResponse getChansonsByTitle(String chansonsTitle) {
        log.info("Fetching chanson with title: {}", chansonsTitle);
        Chanson chanson = chansonsRepository.findByTitle(chansonsTitle)
                .orElseThrow(() -> {
                    log.warn("Chanson not found with title: {}", chansonsTitle);
                    return new EntityNotFoundException("Chanson not found with title: " + chansonsTitle);
                });
        return chansonsMapper.toResponse(chanson);
    }
    @Override
    public ChansonsResponse updateChansons(ChansonsRequest chansonsRequest, String chansonsId) {
       Chanson chanson = chansonsRepository.findChansonById(chansonsId).orElseThrow(() -> new EntityNotFoundException("Chanson not found with id: " + chansonsId));
       chansonsMapper.updateEntity(chanson, chansonsRequest);
       chansonsRepository.save(chanson);
        return chansonsMapper.toResponse(chanson);
    }

    @Override
    public void deleteChansons(String chansonsId) {
     chansonsRepository.deleteById(chansonsId);
    }
}
