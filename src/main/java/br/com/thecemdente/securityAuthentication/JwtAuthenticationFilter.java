package br.com.thecemdente.securityAuthentication;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import br.com.thecemdente.model.Usuario;

public class JwtAuthenticationFilter extends GenericFilterBean{
	
	private String tokenHeader = "Authorization";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        try {
            HttpServletRequest servletRequest = (HttpServletRequest) request;
            String authorization = servletRequest.getHeader(tokenHeader);
            if (authorization != null) {
                Usuario usuario = JwtUtils.parseToken(authorization.replaceAll("Bearer ", ""));
                Authentication credentials = new UsernamePasswordAuthenticationToken(usuario.getUsername(), usuario.getPassword(), usuario.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(credentials);
            }
            chain.doFilter(request, response);
        }
        catch(Throwable t) {
            HttpServletResponse servletResponse = (HttpServletResponse) response;
            servletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, t.getMessage());
        }
    }
}
