package com.tuievolution.model;

import jakarta.persistence.*;
import lombok.Data;

@Data // Lombok: Getter, Setter, ToString hepsini otomatik ekler.
@Entity // Bu sınıfın bir Veritabanı Tablosu olduğunu söyler.
@Table(name = "projects") // Tablo adı "projects" olsun.
public class Project {

    @Id // Bu alan tablonun Anahtarıdır (Primary Key).
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID'yi 1, 2, 3 diye otomatik artır.
    private Long id;

    private String title;       // Proje Başlığı
    
    @Column(length = 1000)      // Açıklama uzun olabilir (1000 karakter).
    private String description;
    
    private String stack;       // Kullanılan teknolojiler (React, Java vs.)
    private String imageUrl;    // Resim linki
    private String githubLink;  // GitHub linki
}