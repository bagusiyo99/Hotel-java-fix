package com.hotel.repository;

import com.hotel.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository <Reservation, Long> {
    List<Reservation> findAllByCompanyId(Long companyId);
    List<Reservation> findAllByUserId(Long userId);


}
