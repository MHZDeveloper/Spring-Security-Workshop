package com.secdevops.security.rest;


import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    // Resource for all non authenticated users
    @RequestMapping(
            path = "/api/security/home")
    public String hello() {
        return "{\"data\" : \"Hello world for all non authenticated users\"}";
    }

    // Resource for all authenticated users
    @PreAuthorize("hasRole('USER')")
    @RequestMapping(
            path = "/api/security/user",
            method = RequestMethod.GET)
    public String helloUser() {
        return "{\"data\" : \"Hello world for all authenticated users\"}";
    }

    // Resource for Admin
    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(
            path = "/api/security/admin",
            method = RequestMethod.GET)
    public String helloAdmin() {
        return "{\"data\" : \"Hello world for admin\"}";
    }

    // Resource that returns the actual user's role
    @RequestMapping(
            path = "/api/security/role",
            method = RequestMethod.GET,
            produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String login() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().iterator().next().getAuthority();
    }

}
