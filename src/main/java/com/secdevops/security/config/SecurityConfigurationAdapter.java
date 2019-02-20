package com.secdevops.security.config;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import java.util.Base64;

@EnableWebSecurity
public class SecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/api/security/user", "/views/user.html").hasRole("USER") // specify USER's authorization
                .antMatchers("/api/security/admin", "/views/admin.html").hasRole("ADMIN") // specify ADMIN's authorization
                .antMatchers("/api/security/home", "/views/home.html").permitAll()
                .and()
                .formLogin().loginPage("/views/login.html").permitAll() // select default login page
                .and()
                .logout().permitAll()
                .and()
                .httpBasic() // enable Authentication with REST
                .and()
                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()); // read from the header "X-XSRF-TOKEN" following the conventions of AngularJS
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("user").password("{noop}" + Base64.getEncoder().encodeToString("123".getBytes())).roles("USER");//create default user
        auth.inMemoryAuthentication()
                .withUser("admin").password("{noop}" + Base64.getEncoder().encodeToString("123".getBytes())).roles("USER", "ADMIN");//create default admin
    }
}
