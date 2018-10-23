package com.mpd.primempd.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.mpd.primempd.domain.enumeration.Typeprime;

/**
 * A Prime.
 */
@Entity
@Table(name = "prime")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Prime implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle_prime")
    private String libellePrime;

    @Column(name = "taux_mensuel")
    private Double tauxMensuel;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_prime")
    private Typeprime typePrime;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibellePrime() {
        return libellePrime;
    }

    public Prime libellePrime(String libellePrime) {
        this.libellePrime = libellePrime;
        return this;
    }

    public void setLibellePrime(String libellePrime) {
        this.libellePrime = libellePrime;
    }

    public Double getTauxMensuel() {
        return tauxMensuel;
    }

    public Prime tauxMensuel(Double tauxMensuel) {
        this.tauxMensuel = tauxMensuel;
        return this;
    }

    public void setTauxMensuel(Double tauxMensuel) {
        this.tauxMensuel = tauxMensuel;
    }

    public Typeprime getTypePrime() {
        return typePrime;
    }

    public Prime typePrime(Typeprime typePrime) {
        this.typePrime = typePrime;
        return this;
    }

    public void setTypePrime(Typeprime typePrime) {
        this.typePrime = typePrime;
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
        Prime prime = (Prime) o;
        if (prime.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), prime.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Prime{" +
            "id=" + getId() +
            ", libellePrime='" + getLibellePrime() + "'" +
            ", tauxMensuel=" + getTauxMensuel() +
            ", typePrime='" + getTypePrime() + "'" +
            "}";
    }
}
