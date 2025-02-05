package org.example.examplemongo.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumResponse {
    private String id;
    private String title;
    private String artist;
    private Integer year;
}
