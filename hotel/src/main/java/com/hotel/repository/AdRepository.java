package com.hotel.repository;

import com.hotel.entity.Ad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdRepository extends JpaRepository<Ad, Long> {
    List<Ad> findAllByUserId(Long userId);
    List<Ad> findAllByServiceNameContaining(String name);
}
