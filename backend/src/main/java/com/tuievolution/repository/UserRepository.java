package com.tuievolution.repository;

import com.tuievolution.model.User; // User modelini import etmelisin
import org.springframework.data.jpa.repository.JpaRepository; // JpaRepository için şart
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}