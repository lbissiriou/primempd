package com.mpd.primempd.service.impl;

import com.mpd.primempd.service.PromotionService;
import com.mpd.primempd.domain.Promotion;
import com.mpd.primempd.repository.PromotionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Promotion.
 */
@Service
@Transactional
public class PromotionServiceImpl implements PromotionService {

    private final Logger log = LoggerFactory.getLogger(PromotionServiceImpl.class);

    private final PromotionRepository promotionRepository;

    public PromotionServiceImpl(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    /**
     * Save a promotion.
     *
     * @param promotion the entity to save
     * @return the persisted entity
     */
    @Override
    public Promotion save(Promotion promotion) {
        log.debug("Request to save Promotion : {}", promotion);        return promotionRepository.save(promotion);
    }

    /**
     * Get all the promotions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Promotion> findAll() {
        log.debug("Request to get all Promotions");
        return promotionRepository.findAll();
    }


    /**
     * Get one promotion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Promotion> findOne(Long id) {
        log.debug("Request to get Promotion : {}", id);
        return promotionRepository.findById(id);
    }

    /**
     * Delete the promotion by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Promotion : {}", id);
        promotionRepository.deleteById(id);
    }
}
