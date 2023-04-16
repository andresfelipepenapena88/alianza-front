package com.alianza.clientsmngr.clientsmanager.controllers;

import com.alianza.clientsmngr.clientsmanager.entities.Client;
import com.alianza.clientsmngr.clientsmanager.services.ClientsService;
import com.alianza.clientsmngr.clientsmanager.services.ClientsServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest()
class ClientsControllerTest {
    @Mock
    private ClientsServiceImpl clientsService;
    @InjectMocks
    private ClientsController clientsController;

    @Test
    void getAllClients() {
        // Given
        List<Client> mockResponse = new ArrayList<>();

        // When
        Mockito.when(clientsService.getAllClients()).thenReturn(new ArrayList<>());
        ResponseEntity<List<Client>> response = clientsController.getAllClients();

        // Then
        assertEquals(response.getBody(), mockResponse);

    }

    @Test
    void getClientBySharedKey() {
        // Given
        List<Client> mockResponse = new ArrayList<>();
        String sharedKey = "";
        // When
        Mockito.when(clientsService.getClientBySharedKey(ArgumentMatchers.anyString())).thenReturn(new ArrayList<>());
        ResponseEntity<List<Client>> response = clientsController.getClientBySharedKey(sharedKey);

        // Then
        assertEquals(response.getBody(), mockResponse);
    }

    @Test
    void addClient() {
        // Given
        Long mockResponse = Long.valueOf(1);
        Client mock = new Client().builder().name("andres").build();
        // When
        Mockito.when(clientsService.addClient(mock)).thenReturn(Long.valueOf(1));
        ResponseEntity<Long> response = clientsController.addClient(mock);

        // Then
        assertEquals(response.getBody(), mockResponse);
    }

    @Test
    void getClientAdvancedSearch() {
        // Given
        List<Client> mockResponse = new ArrayList<>();
        Client client = new Client().builder().build();
        // When
        Mockito.when(clientsService.advancedSearch(ArgumentMatchers.any(Client.class))).thenReturn(new ArrayList<>());
        ResponseEntity<List<Client>> response = clientsController.getClientAdvancedSearch(client);

        // Then
        assertEquals(response.getBody(), mockResponse);
    }
}