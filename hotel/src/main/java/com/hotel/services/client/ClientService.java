// com.hotel.services.client.ClientService

package com.hotel.services.client;

import com.hotel.dto.AdDTO;
import com.hotel.dto.AdDetailsForClientDto;
import com.hotel.dto.ArticleDTO;
import com.hotel.dto.ReservationDTO;

import java.util.List;

public interface ClientService {
    List<AdDTO> getAllAds();
    List<AdDTO> searchAdByName (String name);

    List<ArticleDTO> getAllArticles ();
    boolean bookService (ReservationDTO reservationDTO);
    AdDetailsForClientDto getAdDetailsByAdId (Long adId);

    List<ReservationDTO> getAllBookingsByUserId (Long userId);
}
