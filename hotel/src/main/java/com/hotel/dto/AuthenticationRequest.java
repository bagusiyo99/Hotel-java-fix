package com.hotel.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {

    //59.08
    private String username;
    private String password;
}
