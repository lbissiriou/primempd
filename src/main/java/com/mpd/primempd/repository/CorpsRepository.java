package com.mpd.primempd.repository;

import com.mpd.primempd.domain.Corps;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Corps entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CorpsRepository extends JpaRepository<Corps, Long> {

}
