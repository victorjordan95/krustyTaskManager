package br.com.thecemdente.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.thecemdente.model.Usuario;
import br.com.thecemdente.repository.UsuarioRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


@Service("segurancaService")
public class SegurancaServiceImpl implements UserDetailsService {
	
	@Autowired
	private UsuarioRepository usuarioRepo;

	/**
	 * @param usuarioRepo the usuarioRepo to set
	 */
	public void setUsuarioRepo(UsuarioRepository usuarioRepo) {
		this.usuarioRepo = usuarioRepo;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = usuarioRepo.findByNome(username);
		if(usuario == null) {
			throw new UsernameNotFoundException(username);
		}
		return usuario;
	}

}
