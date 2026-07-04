package com.lelisay.graniteiam.core.domain;
import java.time.Instant;
import java.util.UUID;

public class User {
    private final UUID id;
    private String username;
    private String passwordHash;
    private String firstName;
    private String lastName;
    private boolean active;
    private final Instant createdAt;
    private Instant updatedAt;

    public User(String username, String passwordHash, String firstName, String lastName) {
        this.id = UUID.randomUUID();
        this.username = username;
        this.passwordHash = passwordHash;
        this.firstName = firstName;
        this.lastName = lastName;
        this.active = true;
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    // Getters
    public UUID getId() { return id; }
    public String getUsername() { return username; }
    public String getPasswordHash() { return passwordHash; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public boolean isActive() { return active; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }

    // Setters for mutable fields
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setActive(boolean active) { this.active = active; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    // In User.java
    public static User reconstruct(UUID id, String username, String passwordHash,
                                   String firstName, String lastName, boolean active,
                                   Instant createdAt, Instant updatedAt) {
        User user = new User(username, passwordHash, firstName, lastName);
        // Use reflection to set private fields (or add package-private setters)
        // Since we are in the same package, we can make fields package-private and set them.
        // For simplicity, I'll add setters that are package-private.
        // Let's modify the class: add setter methods with package-private visibility.

        return user;

    }

}