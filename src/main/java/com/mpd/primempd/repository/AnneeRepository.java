package com.mpd.primempd.repository;

import com.mpd.primempd.domain.Annee;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Annee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnneeRepository extends JpaRepository<Annee, Long> {

}
