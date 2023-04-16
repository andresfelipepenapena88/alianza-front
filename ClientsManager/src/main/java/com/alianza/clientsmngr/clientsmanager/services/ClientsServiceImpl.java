package com.alianza.clientsmngr.clientsmanager.services;

import com.alianza.clientsmngr.clientsmanager.entities.Client;
import com.alianza.clientsmngr.clientsmanager.repositories.ClientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClientsServiceImpl implements ClientsService {

    @Autowired
    private ClientsRepository clientsRepository;
    @Override
    public List<Client> getAllClients() {
        return this.clientsRepository.findAll();
    }

    @Override
    public List<Client> getClientBySharedKey(String sharedKey) {
        return this.clientsRepository.getClientsBySharedKey(sharedKey);
    }

    @Override
    public Long addClient(Client client) {
        client.setSharedKey(generateSharedKey(client.getName()));
        return this.clientsRepository.save(client).getId();
    }

    @Override
    public List<Client> advancedSearch(Client client) {
        return this.clientsRepository.advancedSearch(client);
    }

    /*
        Algoritmo para generar elcampo sharedkey
     */
    private String generateSharedKey(String name) {
        String[] nameParts = name.split(" ");
        String sharedKey = "";
        for (int i = 0; i < nameParts.length-1; i++) {
            sharedKey += nameParts[i].substring(0, 1);
        }
        sharedKey += nameParts[nameParts.length-1];
        return sharedKey.toLowerCase();
    }

}
