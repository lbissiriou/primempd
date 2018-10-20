package com.mpd.primempd.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Compte.
 */
@Entity
@Table(name = "compte")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Compte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_compte")
    private String numeroCompte;

    @OneToOne
    @JoinColumn(unique = true)
    private Banque banque;

    @ManyToOne
    @JsonIgnoreProperties("comptes")
    private Agent agent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroCompte() {
        return numeroCompte;
    }

    public Compte numeroCompte(String numeroCompte) {
        this.numeroCompte = numeroCompte;
        return this;
    }

    public void setNumeroCompte(String numeroCompte) {
        this.numeroCompte = numeroCompte;
    }

    public Banque getBanque() {
        return banque;
    }

    public Compte banque(Banque banque) {
        this.banque = banque;
        return this;
    }

    public void setBanque(Banque banque) {
        this.banque = banque;
    }

    public Agent getAgent() {
        return agent;
    }

    public Compte agent(Agent agent) {
        this.agent = agent;
        return this;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
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
        Compte compte = (Compte) o;
        if (compte.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), compte.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Compte{" +
            "id=" + getId() +
            ", numeroCompte='" + getNumeroCompte() + "'" +
            "}";
    }
}
