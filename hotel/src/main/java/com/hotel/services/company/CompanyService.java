package com.hotel.services.company;

import com.hotel.dto.AdDTO;
import com.hotel.dto.ReservationDTO;

import java.io.IOException;
import java.util.List;

public interface CompanyService {
    boolean postAd (Long userId, AdDTO adDTO) throws IOException;

    List<AdDTO> getAllAds(Long userid);

    AdDTO getAdById(Long adId);

     boolean updateAd(Long adId, AdDTO adDTO) throws IOException;

    boolean deleteAd(Long adId);

    List<ReservationDTO> getAllAdBookings(Long companyId);

    boolean changeBookingStatus (Long bookingId, String status);
}
