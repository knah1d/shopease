package com.example.shopease.user.infrastructure.persistence;

import com.example.shopease.user.domain.entities.User;
import com.example.shopease.user.domain.repositories.UserRepository;
import com.example.shopease.user.domain.valueobjects.Email;
import com.example.shopease.user.domain.valueobjects.Role;
import com.example.shopease.user.domain.valueobjects.UserId;
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
        return new UserEntity(
            user.getId().getValue(),
            user.getName(),
            user.getEmail().getValue(),
            user.getPhone(),
            user.getPasswordHash(),
            user.getCreatedAt(),
            user.getUpdatedAt()
        );
    }

    private User toDomain(UserEntity entity) {
        return new User(
            new UserId(entity.getId()),
            entity.getName(),
            new Email(entity.getEmail()),
            entity.getPhone(),
            entity.getPasswordHash()
        );
    }
}
