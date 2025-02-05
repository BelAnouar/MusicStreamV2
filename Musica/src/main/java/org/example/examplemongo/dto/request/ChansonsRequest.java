package org.example.examplemongo.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChansonsRequest {

    private String title;
    private Integer duration;
    private Integer trackNumber;
}
