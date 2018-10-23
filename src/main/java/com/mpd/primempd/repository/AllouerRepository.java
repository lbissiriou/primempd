package com.mpd.primempd.repository;

import com.mpd.primempd.domain.Allouer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Allouer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AllouerRepository extends JpaRepository<Allouer, Long> {

}
