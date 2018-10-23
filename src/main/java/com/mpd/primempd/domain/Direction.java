package com.mpd.primempd.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Direction.
 */
@Entity
@Table(name = "direction")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Direction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sigle")
    private String sigle;

    @Column(name = "libelle_direction")
    private String libelleDirection;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSigle() {
        return sigle;
    }

    public Direction sigle(String sigle) {
        this.sigle = sigle;
        return this;
    }

    public void setSigle(String sigle) {
        this.sigle = sigle;
    }

    public String getLibelleDirection() {
        return libelleDirection;
    }

    public Direction libelleDirection(String libelleDirection) {
        this.libelleDirection = libelleDirection;
        return this;
    }

    public void setLibelleDirection(String libelleDirection) {
        this.libelleDirection = libelleDirection;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Direction direction = (Direction) o;
        if (direction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), direction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Direction{" +
            "id=" + getId() +
            ", sigle='" + getSigle() + "'" +
            ", libelleDirection='" + getLibelleDirection() + "'" +
            "}";
    }
}
