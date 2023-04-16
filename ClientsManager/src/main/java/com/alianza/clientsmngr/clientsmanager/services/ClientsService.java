package com.alianza.clientsmngr.clientsmanager.services;

import com.alianza.clientsmngr.clientsmanager.entities.Client;

import java.util.List;
public interface ClientsService {
    List<Client> getAllClients();
    List<Client> getClientBySharedKey(String sharedKey);
    Long addClient(Client client);
    List<Client> advancedSearch(Client client);
}
