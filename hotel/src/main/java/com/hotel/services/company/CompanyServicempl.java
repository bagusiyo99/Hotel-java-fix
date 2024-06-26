package com.hotel.services.company;

import com.hotel.dto.AdDTO;
import com.hotel.dto.ArticleDTO;
import com.hotel.dto.ContactDTO;
import com.hotel.dto.ReservationDTO;
import com.hotel.entity.*;
import com.hotel.enums.ReservationStatus;
import com.hotel.repository.AdRepository;
import com.hotel.repository.ContactRepository;
import com.hotel.repository.ReservationRepository;
import com.hotel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompanyServicempl implements CompanyService {

    // Dependency injection untuk UserRepository
    @Autowired
    private UserRepository userRepository;

    // Dependency injection untuk AdRepository
    @Autowired
    private AdRepository adRepository;

    // Dependency injection untuk ReservationRepository
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ContactRepository contactRepository;

    // Metode untuk memposting iklan baru
    public boolean postAd(Long userId, AdDTO adDTO) throws IOException {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            Ad ad = new Ad();
            ad.setServiceName(adDTO.getServiceName());
            ad.setDescription(adDTO.getDescription());
            ad.setBed(adDTO.getBed());
            ad.setBath(adDTO.getBath());
            ad.setCreatedAt(new Date());
            ad.setImg(adDTO.getImg().getBytes());
            ad.setPrice(adDTO.getPrice());
            ad.setUser(optionalUser.get());
            adRepository.save(ad);
            return true;
        }
        return false;
    }



    // Metode untuk mencari iklan berdasarkan nama
    public List<AdDTO> searchAdByName(String name) {
        // Menggunakan stream untuk memetakan setiap Ad menjadi AdDTO berdasarkan nama yang diberikan
        return adRepository.findAllByServiceNameContaining(name).stream().map(Ad::getAdDto).collect(Collectors.toList());
    }


    // Metode untuk mendapatkan semua iklan berdasarkan ID pengguna (perusahaan)
    public List<AdDTO> getAllAds(Long userId) {
        return adRepository.findAllByUserId(userId).stream().map(Ad::getAdDto).collect(Collectors.toList());
    }

    // Metode untuk mendapatkan iklan berdasarkan ID iklan
    public AdDTO getAdById(Long adId) {
        Optional<Ad> optionalAd = adRepository.findById(adId);
        if (optionalAd.isPresent()) {
            return optionalAd.get().getAdDto();
        }
        return null;
    }

    // Metode untuk memperbarui iklan berdasarkan ID iklan
    public boolean updateAd(Long adId, AdDTO adDTO) throws IOException {
        Optional<Ad> optionalAd = adRepository.findById(adId);
        if (optionalAd.isPresent()) {
            Ad ad = optionalAd.get();

            ad.setServiceName(adDTO.getServiceName());
            ad.setDescription(adDTO.getDescription());
            ad.setBath(adDTO.getBath());
            ad.setBed(adDTO.getBed());
            ad.setPrice(adDTO.getPrice());
            ad.setCreatedAt(new Date());
            // Mengatur gambar jika ada
            if (adDTO.getImg() != null) {
                ad.setImg(adDTO.getImg().getBytes());
            }
            adRepository.save(ad);
            return true;
        }
        return false;
    }

    // Metode untuk menghapus iklan berdasarkan ID iklan
    public boolean deleteAd(Long adId) {
        Optional<Ad> optionalAd = adRepository.findById(adId);
        if (optionalAd.isPresent()) {
            adRepository.delete(optionalAd.get());
            return true;
        }
        return false;
    }

    public boolean deleteBooking(Long bookingId) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(bookingId);
        if (optionalReservation.isPresent()) {
            reservationRepository.delete(optionalReservation.get());
            return true;
        }
        return false;
    }

    // Metode untuk mendapatkan semua pemesanan berdasarkan ID perusahaan
    public List<ReservationDTO> getAllAdBookings(Long companyId) {
        return reservationRepository.findAllByCompanyId(companyId)
                .stream().map(Reservation::getReservationDTO).collect(Collectors.toList());
    }

    // Metode untuk mengubah status pemesanan
    public boolean changeBookingStatus(Long bookingId, String status) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(bookingId);
        if (optionalReservation.isPresent()) {
            Reservation existingReservation = optionalReservation.get();
            if (Objects.equals(status, "APPROVE")) {
                existingReservation.setReservationStatus(ReservationStatus.APPROVED);
            } else {
                existingReservation.setReservationStatus(ReservationStatus.REJECTED);
            }
            reservationRepository.save(existingReservation);
            return true;
        }
        return false;
    }



    public List<ContactDTO> getAllContact () {
        // Menggunakan stream untuk memetakan setiap Ad menjadi AdDTO
        return contactRepository.findAll().stream().map(Contact::getContactDto).collect(Collectors.toList());
    }
}
