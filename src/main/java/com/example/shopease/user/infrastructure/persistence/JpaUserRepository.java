package com.example.shopease.user.infrastructure.persistence;

import com.example.shopease.user.domain.entities.User;
import com.example.shopease.user.domain.repositories.UserRepository;
import com.example.shopease.user.domain.valueobjects.Email;
import com.example.shopease.user.domain.valueobjects.Role;
import com.example.shopease.user.domain.valueobjects.UserId;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Override
    public List<User> findAll() {
        return springDataUserRepository.findAll()
                .stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<User> findByRole(Role role) {
        return springDataUserRepository.findByRole(role.getValue())
                .stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<User> findByIsActive(Boolean isActive) {
        return springDataUserRepository.findByIsActive(isActive)
                .stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    private UserEntity toEntity(User user) {
        UserEntity entity = new UserEntity(
                user.getId().getValue(),
                user.getName(),
                user.getEmail().getValue(),
                user.getPhone(),
                user.getPasswordHash(),
                user.getCreatedAt(),
                user.getUpdatedAt());
        entity.setRole(user.getRole() != null ? user.getRole().getValue() : Role.CUSTOMER);
        entity.setActive(user.getIsActive());
        return entity;
    }

    private User toDomain(UserEntity entity) {
        return new User(
                new UserId(entity.getId()),
                entity.getName(),
                new Email(entity.getEmail()),
                entity.getPhone(),
                entity.getPasswordHash(),
                new Role(entity.getRole() != null ? entity.getRole() : Role.CUSTOMER),
                entity.isActive());
    }
}
