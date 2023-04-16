package com.alianza.clientsmngr.clientsmanager.services;

import com.alianza.clientsmngr.clientsmanager.entities.Client;
import com.alianza.clientsmngr.clientsmanager.repositories.ClientsRepository;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ClientsServiceImplTest {

    @Mock
    public ClientsRepository clientsRepository;

    @InjectMocks
    public ClientsServiceImpl clientsService;

    @Test
    void getAllClients() {
        // Given
        List<Client> mockResponse = new ArrayList<>();

        // When
        Mockito.when(clientsRepository.findAll()).thenReturn(mockResponse);
        List<Client> response = clientsService.getAllClients();

        // Then
        assertEquals(response, mockResponse);
    }

    @Test
    void getClientBySharedKey() {
        // Given
        List<Client> mockResponse = new ArrayList<>();
        String sharedKey = "";
        // When
        Mockito.when(clientsRepository.getClientsBySharedKey(ArgumentMatchers.anyString())).thenReturn(mockResponse);
        List<Client> response = clientsService.getClientBySharedKey(sharedKey);

        // Then
        assertEquals(response, mockResponse);
    }

    @Test
    void addClient() {
        // Given
        Client mock = new Client().builder().id(Long.valueOf(1)).build();
        Client client = new Client().builder().name("Andres Pena").build();
        // When
        Mockito.when(clientsRepository.save(ArgumentMatchers.any(Client.class))).thenReturn(mock);
        Long response = clientsService.addClient(client);

        // Then
        assertEquals(response, Long.valueOf(1));
    }

    @Test
    void advancedSearch() {
        // Given
        List<Client> mockResponse = new ArrayList<>();
        Client client = new Client().builder().id(Long.valueOf(1)).build();
        // When
        Mockito.when(clientsRepository.advancedSearch(ArgumentMatchers.any(Client.class))).thenReturn(mockResponse);
        List<Client> response = clientsService.advancedSearch(client);

        // Then
        assertEquals(response, mockResponse);
    }
}