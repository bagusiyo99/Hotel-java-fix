package com.hotel.services.contact;

import com.hotel.dto.ArticleDTO;
import com.hotel.dto.ContactDTO;
import com.hotel.entity.Article;
import com.hotel.entity.Contact;
import com.hotel.entity.User;
import com.hotel.enums.UserRole;
import com.hotel.repository.ContactRepository;
import com.hotel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Service
public class ContactServicempl {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    public boolean postArticle(Long userId, ContactDTO contactDTO) throws IOException {
        // Validasi peran pengguna
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getRole() == UserRole.CLIENT) { // Pastikan pengguna memiliki peran COMPANY
                Contact contact = new Contact();
                contact.setName(contactDTO.getName());
                contact.setAddress(contactDTO.getAddress());
                contact.setDescription(contactDTO.getDescription());

                contact.setUser(user);
                contact.setCreatedAt(new Date());
                contactRepository.save(contact);
                return true;

            }
        }
        return false; // Mengembalikan false jika pengguna tidak memiliki peran COMPANY
    }
}
