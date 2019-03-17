package pl.wroclaw.asi.labdaybackendspring.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.wroclaw.asi.labdaybackendspring.model.*;
import pl.wroclaw.asi.labdaybackendspring.repositories.*;
import pl.wroclaw.asi.labdaybackendspring.services.UserService;

import java.util.*;

@Component
public class InitialDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    private boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SpeakerRepository speakerRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Value("${jwt.adminPassword}")
    private String adminPassword;

    @Autowired
    private PublicAccessActiveRepository publicAccessActiveRepository;


    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if(alreadySetup)
	        return;
	
	    if(publicAccessActiveRepository.findById(0).isEmpty())
            publicAccessActiveRepository.save(new PublicAccessActive(0,false));

        if (speakerRepository.findByName("NaS").isEmpty()){
            Speaker speaker = new Speaker("NaS", "Not a Speaker - for registry and opening", "");
            speakerRepository.save(speaker);
        }

        Privilege readPrivilege = createPrivilegeIfNotFound("READ_PRIVILEGE");
        Privilege writePrivilege = createPrivilegeIfNotFound("WRITE_PRIVILEGE");

        List<Privilege> adminPrivileges = Arrays.asList(readPrivilege,writePrivilege);

        createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
        createRoleIfNotFound("ROLE_USER", Arrays.asList(readPrivilege));
        createRoleIfNotFound("ROLE_GUEST", Arrays.asList(readPrivilege));

        Role adminRole = roleRepository.findByName("ROLE_ADMIN");
        Optional<User> admin = userRepository.findByUsername("admin");
        createAccountIfNotFound(admin.orElse(null),"admin", adminPassword, Arrays.asList(adminRole));

        Role guestRole = roleRepository.findByName("ROLE_GUEST");
        Optional<User> guest = userRepository.findByUsername("guest");
        createAccountIfNotFound(guest.orElse(null),"guest","guest",Arrays.asList(guestRole));

        alreadySetup = true;
    }

    @Transactional
    void createAccountIfNotFound(User user, String username, String password, Collection<Role> roles) {
        if(user == null){
            user = new User();
            user.setUsername(username);
	}
        user.setPassword(bCryptPasswordEncoder.encode(password));
        if (user.getRoles() == null || user.getRoles().isEmpty())
            user.setRoles(roles);
        userRepository.save(user);
    }

    @Transactional
    Role createRoleIfNotFound(String name, Collection<Privilege> privileges) {
        Role role = roleRepository.findByName(name);
        if (role == null){
            role = new Role();
            role.setName(name);
            role.setPrivileges(privileges);
            role = roleRepository.save(role);
        }
        return role;
    }

    @Transactional
    Privilege createPrivilegeIfNotFound(String name) {
        Privilege privilege = privilegeRepository.findByName(name);
        if (privilege == null) {
            privilege = new Privilege();
            privilege.setName(name);
            privilege = privilegeRepository.save(privilege);
        }
        return privilege;
    }

}
