package com.alianza.clientsmngr.clientsmanager.entities;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@Entity
@Table(name = "clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private String sharedKey;
    private String name;
    private String email;
    private String phone;
    private String startDate;
    private String endDate;
}
