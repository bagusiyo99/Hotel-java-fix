package com.hotel.dto;

import com.hotel.enums.UserRole;
import lombok.Data;


@Data
public class SignupRequestDTO {

    private Long id;

    private String name;

    private String email;

    private String password;

    private String lastname;

    private String phone ;

    private UserRole role;
}
