package com.lelisay.Granite_IAM.web.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    private UUID id;
    private String username;
    private String passwordHash;
    private String firstName;
    private String lastName;
    private boolean active;
    private Instant createdAt;
    private Instant updatedAt;

    // JPA requires a no-arg constructor
    protected UserEntity() {}

    // Factory method to create from domain User
    public static UserEntity fromDomain(User user) {
        UserEntity entity = new UserEntity();
        entity.id = user.getId();
        entity.username = user.getUsername();
        entity.passwordHash = user.getPasswordHash();
        entity.firstName = user.getFirstName();
        entity.lastName = user.getLastName();
        entity.active = user.isActive();
        entity.createdAt = user.getCreatedAt();
        entity.updatedAt = user.getUpdatedAt();
        return entity;
    }

    // Convert back to domain
    public User toDomain() {
        User user = new User(this.username, this.passwordHash, this.firstName, this.lastName);
        // Use reflection or set fields manually (since we have private fields, we can use package-private setters or a builder)
        // A simpler approach: add a constructor or static method that takes all fields.
        // We'll add a method in User to reconstruct with all fields.
        // I'll show a static method in User to avoid setters.
        return User.reconstruct(this.id, this.username, this.passwordHash, this.firstName,
                this.lastName, this.active, this.createdAt, this.updatedAt);
    }

    // Getters and setters for JPA
    // ...
}