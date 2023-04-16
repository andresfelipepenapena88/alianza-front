package com.alianza.clientsmngr.clientsmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.web.bind.annotation.CrossOrigin;

@EntityScan("com.alianza.clientsmngr.clientsmanager.entities")
@SpringBootApplication
public class ClientsManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClientsManagerApplication.class, args);
	}

}
