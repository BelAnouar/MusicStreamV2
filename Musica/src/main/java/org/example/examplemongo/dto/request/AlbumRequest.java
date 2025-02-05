package org.example.examplemongo.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumRequest {
    private String title;
    private String artist;
    private Integer year;
    private String userid;
}
