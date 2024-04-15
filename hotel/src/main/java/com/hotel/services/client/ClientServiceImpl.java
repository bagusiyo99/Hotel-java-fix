// Paket dan impor
package com.hotel.services.client;

import com.hotel.dto.AdDTO;
import com.hotel.dto.AdDetailsForClientDto;
import com.hotel.dto.ArticleDTO;
import com.hotel.dto.ReservationDTO;
import com.hotel.entity.Ad;
import com.hotel.entity.Article;
import com.hotel.entity.Reservation;
import com.hotel.entity.User;
import com.hotel.enums.ReservationStatus;
import com.hotel.enums.ReviewStatus;
import com.hotel.repository.AdRepository;
import com.hotel.repository.ArticleRepository;
import com.hotel.repository.ReservationRepository;
import com.hotel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService {
    // Dependency injection untuk AdRepository
    @Autowired
    private AdRepository adRepository;

    // Dependency injection untuk UserRepository
    @Autowired
    private UserRepository userRepository;

    // Dependency injection untuk ReservationRepository
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ArticleRepository articleRepository;

    // Metode untuk mendapatkan semua iklan
    public List<AdDTO> getAllAds() {
        // Menggunakan stream untuk memetakan setiap Ad menjadi AdDTO
        return adRepository.findAll().stream().map(Ad::getAdDto).collect(Collectors.toList());
    }

    public List<ArticleDTO> getAllArticles () {
        // Menggunakan stream untuk memetakan setiap Ad menjadi AdDTO
        return articleRepository.findAll().stream().map(Article::getArticleDto).collect(Collectors.toList());
    }


    // Metode untuk mencari iklan berdasarkan nama
    public List<AdDTO> searchAdByName(String name) {
        // Menggunakan stream untuk memetakan setiap Ad menjadi AdDTO berdasarkan nama yang diberikan
        return adRepository.findAllByServiceNameContaining(name).stream().map(Ad::getAdDto).collect(Collectors.toList());
    }

    // Metode untuk memesan layanan
    public boolean bookService(ReservationDTO reservationDTO) {
        // Mengambil Ad dan User berdasarkan ID yang diberikan
        Optional<Ad> optionalAd = adRepository.findById(reservationDTO.getAdId());
        Optional<User> optionalUser = userRepository.findById(reservationDTO.getUserId());

        // Memeriksa apakah Ad dan User ada
        if (optionalAd.isPresent() && optionalUser.isPresent()) {
            // Membuat reservasi baru
            Reservation reservation = new Reservation();
            reservation.setBookDate(reservationDTO.getBookDate());
            reservation.setReservationStatus(ReservationStatus.PENDING);
            reservation.setUser(optionalUser.get());

            // Menetapkan Ad dan perusahaan (company) ke reservasi
            reservation.setAd(optionalAd.get());
            reservation.setCompany(optionalAd.get().getUser());
            reservation.setReviewStatus(ReviewStatus.FALSE);

            // Menyimpan reservasi dan mengembalikan true
            reservationRepository.save(reservation);
            return true;
        }
        // Mengembalikan false jika reservasi gagal
        return false;
    }

    // Metode untuk mendapatkan detail iklan berdasarkan ID iklan
    public AdDetailsForClientDto getAdDetailsByAdId(Long adId) {
        Optional<Ad> optionalAd = adRepository.findById(adId);
        AdDetailsForClientDto adDetailsForClientDto = new AdDetailsForClientDto();

        // Memeriksa apakah iklan ada
        if (optionalAd.isPresent()) {
            // Menetapkan detail AdDTO ke objek AdDetailsForClientDto
            adDetailsForClientDto.setAdDTO(optionalAd.get().getAdDto());
        }
        return adDetailsForClientDto;
    }

    // Metode untuk mendapatkan semua pemesanan berdasarkan ID pengguna
    public List<ReservationDTO> getAllBookingsByUserId(Long userId) {
        // Menggunakan stream untuk memetakan setiap Reservation menjadi ReservationDTO
        return reservationRepository.findAllByUserId(userId)
                .stream().map(Reservation::getReservationDTO).collect(Collectors.toList());
    }
}
