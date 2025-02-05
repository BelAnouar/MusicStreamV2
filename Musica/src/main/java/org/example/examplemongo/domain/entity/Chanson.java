package org.example.examplemongo.domain.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Chanson {

    @Id
    private String id;
    private String title;
    private String description;
    private Integer duration;
    private Integer trackNumber;
    @DBRef
    private Album album;
    private String category;
    private String audioFileId;
}
