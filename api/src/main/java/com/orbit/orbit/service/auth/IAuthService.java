package com.orbit.orbit.service.auth;

import com.orbit.orbit.dtos.auth.AuthDTO;

public interface IAuthService {

    String login(AuthDTO authDto);

}
