package com.alianza.clientsmngr.clientsmanager.repositories;

import com.alianza.clientsmngr.clientsmanager.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientsRepository extends JpaRepository<Client, Long> {
    @Query("SELECT c FROM Client c WHERE c.sharedKey LIKE %:sharedKey%")
    List<Client> getClientsBySharedKey(@Param("sharedKey") String sharedKey);

    @Query(
        "SELECT c FROM Client c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :#{#client.name}, '%'))"+
            " AND LOWER(c.phone) LIKE LOWER(CONCAT('%', :#{#client.phone}, '%'))"+
            " AND LOWER(c.email) LIKE LOWER(CONCAT('%', :#{#client.email}, '%'))"+
            " AND c.startDate LIKE %:#{#client.startDate}%"+
            " AND c.endDate LIKE %:#{#client.endDate}%"
    )
    List<Client> advancedSearch(@Param("client") Client client);
}
