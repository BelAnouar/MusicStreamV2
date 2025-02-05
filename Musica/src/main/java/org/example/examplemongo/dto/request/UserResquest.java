package org.example.examplemongo.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResquest {
    private String login;
    private String password;
    private Boolean active;
    private List<String> roles;
}
