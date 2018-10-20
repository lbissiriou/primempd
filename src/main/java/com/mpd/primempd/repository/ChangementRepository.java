package com.mpd.primempd.repository;

import com.mpd.primempd.domain.Changement;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Changement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChangementRepository extends JpaRepository<Changement, Long> {

}
