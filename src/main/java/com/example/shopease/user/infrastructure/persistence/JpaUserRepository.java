package com.example.shopease.user.infrastructure.persistence;

import com.example.shopease.user.domain.entities.User;
import com.example.shopease.user.domain.repositories.UserRepository;
import com.example.shopease.user.domain.valueobjects.Email;
import com.example.shopease.user.domain.valueobjects.Role;
import com.example.shopease.user.domain.valueobjects.UserId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class JpaUserRepository implements UserRepository {
    private final SpringDataUserRepository springDataUserRepository;

    public JpaUserRepository(SpringDataUserRepository springDataUserRepository) {
        this.springDataUserRepository = springDataUserRepository;
    }

    @Override
    public User save(User user) {
        UserEntity entity = toEntity(user);
        UserEntity savedEntity = springDataUserRepository.save(entity);
        return toDomain(savedEntity);
    }

    @Override
    public Optional<User> findById(UserId id) {
        return springDataUserRepository.findById(id.getValue())
            .map(this::toDomain);
    }

    @Override
    public Optional<User> findByEmail(Email email) {
        return springDataUserRepository.findByEmail(email.getValue())
            .map(this::toDomain);
    }

    @Override
    public boolean existsByEmail(Email email) {
        return springDataUserRepository.existsByEmail(email.getValue());
    }

    @Override
    public void delete(User user) {
        springDataUserRepository.deleteById(user.getId().getValue());
    }

    private UserEntity toEntity(User user) {
        UserEntity.RoleEnum roleEnum = user.getRole() == Role.CUSTOMER 
            ? UserEntity.RoleEnum.CUSTOMER 
            : UserEntity.RoleEnum.SELLER;
            
        return new UserEntity(
            user.getId().getValue(),
            user.getName(),
            user.getEmail().getValue(),
            user.getPasswordHash(),
            roleEnum,
            user.getCreatedAt(),
            user.getUpdatedAt()
        );
    }

    private User toDomain(UserEntity entity) {
        Role role = entity.getRole() == UserEntity.RoleEnum.CUSTOMER 
            ? Role.CUSTOMER 
            : Role.SELLER;
            
        return new User(
            new UserId(entity.getId()),
            entity.getName(),
            new Email(entity.getEmail()),
            entity.getPasswordHash(),
            role
        );
    }

    interface SpringDataUserRepository extends JpaRepository<UserEntity, String> {
        Optional<UserEntity> findByEmail(String email);
        boolean existsByEmail(String email);
    }
}
