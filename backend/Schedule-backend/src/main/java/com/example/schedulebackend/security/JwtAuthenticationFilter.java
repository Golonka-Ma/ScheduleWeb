package com.example.schedulebackend.security;

import com.example.schedulebackend.service.UserDetailsServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;

    @Autowired
    public JwtAuthenticationFilter(UserDetailsServiceImpl userDetailsService, JwtUtil jwtUtil) {
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String requestTokenHeader = request.getHeader(AUTHORIZATION);

        String email = null;
        String jwtToken = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                email = jwtUtil.extractEmail(jwtToken);
            } catch (ExpiredJwtException e) {
                System.out.println("Token expired");
            } catch (Exception e) {
                System.out.println("Unable to extract JWT token");
            }
        } else {
            System.out.println("JWT Token does not begin with Bearer String");
        }

        if (Objects.nonNull(email) && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            if (jwtUtil.validateToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);

                request.setAttribute("userEmail", email);
            }
        }

        chain.doFilter(request, response);
    }
}