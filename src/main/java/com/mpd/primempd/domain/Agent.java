package com.mpd.primempd.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.mpd.primempd.domain.enumeration.Situationmatrimoniale;

import com.mpd.primempd.domain.enumeration.Statut;

/**
 * A Agent.
 */
@Entity
@Table(name = "agent")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Agent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "matricule", nullable = false)
    private Long matricule;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenoms")
    private String prenoms;

    @Column(name = "date_naiss")
    private Instant dateNaiss;

    @Column(name = "lieu_naiss")
    private String lieuNaiss;

    @Column(name = "contact")
    private String contact;

    @Column(name = "email")
    private String email;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "date_prise_serv")
    private Instant datePriseServ;

    @Enumerated(EnumType.STRING)
    @Column(name = "situation_matrim")
    private Situationmatrimoniale situationMatrim;

    @Column(name = "nombre_enfts")
    private Integer nombreEnfts;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private Statut statut;

    @OneToOne
    @JoinColumn(unique = true)
    private Fonction fonctionActuelle;

    @OneToOne
    @JoinColumn(unique = true)
    private Compte compteactuel;

    @OneToOne
    @JoinColumn(unique = true)
    private Direction directionactuelle;

    @OneToOne
    @JoinColumn(unique = true)
    private Grade gradeactuel;

    @OneToOne
    @JoinColumn(unique = true)
    private Corps corpsactuel;

    @OneToMany(mappedBy = "agent")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Compte> comptes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMatricule() {
        return matricule;
    }

    public Agent matricule(Long matricule) {
        this.matricule = matricule;
        return this;
    }

    public void setMatricule(Long matricule) {
        this.matricule = matricule;
    }

    public String getNom() {
        return nom;
    }

    public Agent nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenoms() {
        return prenoms;
    }

    public Agent prenoms(String prenoms) {
        this.prenoms = prenoms;
        return this;
    }

    public void setPrenoms(String prenoms) {
        this.prenoms = prenoms;
    }

    public Instant getDateNaiss() {
        return dateNaiss;
    }

    public Agent dateNaiss(Instant dateNaiss) {
        this.dateNaiss = dateNaiss;
        return this;
    }

    public void setDateNaiss(Instant dateNaiss) {
        this.dateNaiss = dateNaiss;
    }

    public String getLieuNaiss() {
        return lieuNaiss;
    }

    public Agent lieuNaiss(String lieuNaiss) {
        this.lieuNaiss = lieuNaiss;
        return this;
    }

    public void setLieuNaiss(String lieuNaiss) {
        this.lieuNaiss = lieuNaiss;
    }

    public String getContact() {
        return contact;
    }

    public Agent contact(String contact) {
        this.contact = contact;
        return this;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getEmail() {
        return email;
    }

    public Agent email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdresse() {
        return adresse;
    }

    public Agent adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Instant getDatePriseServ() {
        return datePriseServ;
    }

    public Agent datePriseServ(Instant datePriseServ) {
        this.datePriseServ = datePriseServ;
        return this;
    }

    public void setDatePriseServ(Instant datePriseServ) {
        this.datePriseServ = datePriseServ;
    }

    public Situationmatrimoniale getSituationMatrim() {
        return situationMatrim;
    }

    public Agent situationMatrim(Situationmatrimoniale situationMatrim) {
        this.situationMatrim = situationMatrim;
        return this;
    }

    public void setSituationMatrim(Situationmatrimoniale situationMatrim) {
        this.situationMatrim = situationMatrim;
    }

    public Integer getNombreEnfts() {
        return nombreEnfts;
    }

    public Agent nombreEnfts(Integer nombreEnfts) {
        this.nombreEnfts = nombreEnfts;
        return this;
    }

    public void setNombreEnfts(Integer nombreEnfts) {
        this.nombreEnfts = nombreEnfts;
    }

    public Statut getStatut() {
        return statut;
    }

    public Agent statut(Statut statut) {
        this.statut = statut;
        return this;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }

    public Fonction getFonctionActuelle() {
        return fonctionActuelle;
    }

    public Agent fonctionActuelle(Fonction fonction) {
        this.fonctionActuelle = fonction;
        return this;
    }

    public void setFonctionActuelle(Fonction fonction) {
        this.fonctionActuelle = fonction;
    }

    public Compte getCompteactuel() {
        return compteactuel;
    }

    public Agent compteactuel(Compte compte) {
        this.compteactuel = compte;
        return this;
    }

    public void setCompteactuel(Compte compte) {
        this.compteactuel = compte;
    }

    public Direction getDirectionactuelle() {
        return directionactuelle;
    }

    public Agent directionactuelle(Direction direction) {
        this.directionactuelle = direction;
        return this;
    }

    public void setDirectionactuelle(Direction direction) {
        this.directionactuelle = direction;
    }

    public Grade getGradeactuel() {
        return gradeactuel;
    }

    public Agent gradeactuel(Grade grade) {
        this.gradeactuel = grade;
        return this;
    }

    public void setGradeactuel(Grade grade) {
        this.gradeactuel = grade;
    }

    public Corps getCorpsactuel() {
        return corpsactuel;
    }

    public Agent corpsactuel(Corps corps) {
        this.corpsactuel = corps;
        return this;
    }

    public void setCorpsactuel(Corps corps) {
        this.corpsactuel = corps;
    }

    public Set<Compte> getComptes() {
        return comptes;
    }

    public Agent comptes(Set<Compte> comptes) {
        this.comptes = comptes;
        return this;
    }

    public Agent addComptes(Compte compte) {
        this.comptes.add(compte);
        compte.setAgent(this);
        return this;
    }

    public Agent removeComptes(Compte compte) {
        this.comptes.remove(compte);
        compte.setAgent(null);
        return this;
    }

    public void setComptes(Set<Compte> comptes) {
        this.comptes = comptes;
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
        Agent agent = (Agent) o;
        if (agent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Agent{" +
            "id=" + getId() +
            ", matricule=" + getMatricule() +
            ", nom='" + getNom() + "'" +
            ", prenoms='" + getPrenoms() + "'" +
            ", dateNaiss='" + getDateNaiss() + "'" +
            ", lieuNaiss='" + getLieuNaiss() + "'" +
            ", contact='" + getContact() + "'" +
            ", email='" + getEmail() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", datePriseServ='" + getDatePriseServ() + "'" +
            ", situationMatrim='" + getSituationMatrim() + "'" +
            ", nombreEnfts=" + getNombreEnfts() +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
