package com.hotel.controller;

import com.hotel.dto.ArticleDTO;
import com.hotel.dto.ContactDTO;
import com.hotel.services.contact.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/contact/{userId}")
    public ResponseEntity<?> postContact(@PathVariable Long userId, @ModelAttribute ContactDTO contactDTO) throws IOException {
        boolean success = contactService.postContact(userId, contactDTO);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User does not have the required Company role.");
        }
    }



    @GetMapping("/contact/{contactId}")
    public ResponseEntity<?> getContactById(@PathVariable Long contactId) {
        ContactDTO contactDTO = contactService.getContactById(contactId);
        if (contactDTO != null) {
            return ResponseEntity.ok(contactDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<?> searchContactByService(@PathVariable String name) {
        // Mencari iklan menggunakan ClientService dan mengembalikan hasil pencarian
        return ResponseEntity.ok(contactService.searchContactByName(name));
    }
}
