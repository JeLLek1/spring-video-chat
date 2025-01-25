package pl.bronikowski.springchat.backendmain.websocket.api;

import org.springframework.http.HttpStatus;
import pl.bronikowski.springchat.backendmain.exception.AppApplicationException;
import pl.bronikowski.springchat.backendmain.exception.ErrorResponseType;

import java.util.List;

public class StompAccessException extends AppApplicationException {
    public StompAccessException(String destination) {
        super("User has no access to this destination", HttpStatus.FORBIDDEN,
                ErrorResponseType.STOMP_DESTINATION_FORBIDDEN, List.of(destination));
    }
}
