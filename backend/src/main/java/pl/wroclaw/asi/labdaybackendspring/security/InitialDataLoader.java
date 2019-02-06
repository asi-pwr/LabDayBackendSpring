package pl.wroclaw.asi.labdaybackendspring.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.wroclaw.asi.labdaybackendspring.model.Privilege;
import pl.wroclaw.asi.labdaybackendspring.model.Role;
import pl.wroclaw.asi.labdaybackendspring.model.User;
import pl.wroclaw.asi.labdaybackendspring.repositories.PrivilegeRepository;
import pl.wroclaw.asi.labdaybackendspring.repositories.RoleRepository;
import pl.wroclaw.asi.labdaybackendspring.services.UserService;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Component
public class InitialDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    private boolean alreadySetup = false;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (alreadySetup)
            return;

        Privilege readPrivilege = createPrivilegeIfNotFound("READ_PRIVILEGE");
        Privilege writePrivilege = createPrivilegeIfNotFound("WRITE_PRIVILEGE");

        List<Privilege> userPrivileges = Arrays.asList(readPrivilege,writePrivilege);

        createRoleIfNotFound("ROLE_USER", userPrivileges);
        createRoleIfNotFound("ROLE_GUEST", Arrays.asList(readPrivilege));

        Role guestRole = roleRepository.findByName("ROLE_GUEST");
        Optional<User> guest = userService.findUserByUsername("guest");
        if (guest.isEmpty() || guest.get().getRoles().isEmpty()){
            User user = new User();
            user.setUsername("guest");
            user.setPassword("guest");
            user.setRoles(Arrays.asList(guestRole));
            userService.saveUser(user);
        }
        alreadySetup = true;
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
