package com.hotel.repository;

import com.hotel.entity.Article;
import com.hotel.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository extends JpaRepository <Contact, Long> {
    List<Contact> findByUserId(Long userId);
    List<Contact> findAllByNameContaining(String name);

}
