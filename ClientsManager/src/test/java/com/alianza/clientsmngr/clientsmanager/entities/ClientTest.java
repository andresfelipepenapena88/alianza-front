package com.alianza.clientsmngr.clientsmanager.entities;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class ClientTest {

    @Test
    public void testEntity() {
        Client client = new Client();
        client.setId(Long.valueOf(1));
        client.setName("Andres");
        client.setPhone("304 387 84 96");
        client.setEmail("a@g.com");
        client.setSharedKey("shared");
        client.setStartDate("start");
        client.setEndDate("end");

        assertNotNull(client.getId());
        assertNotNull(client.getName());
        assertNotNull(client.getPhone());
        assertNotNull(client.getEmail());
        assertNotNull(client.getSharedKey());
        assertNotNull(client.getStartDate());
        assertNotNull(client.getEndDate());
    }

}