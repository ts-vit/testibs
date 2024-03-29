package tsvetkov.ru.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import tsvetkov.ru.model.Order;
import tsvetkov.ru.service.OrderService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/v1/orders/")
@CrossOrigin(origins = "http://localhost:9966", maxAge = 3600)
public class OrderRestController {

    @Autowired
    OrderService orderService;

    @CrossOrigin
    @RequestMapping(value = "/get/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Order> getOrder(@PathVariable("id") Long orderId) {
        if (orderId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Order order = this.orderService.getById(orderId);

        if (order == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
    @CrossOrigin
    @RequestMapping(value = "/save",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Order> saveOrder(@RequestBody @Valid Order order) {
        HttpHeaders headers = new HttpHeaders();

        if (order == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        this.orderService.save(order);

        return new ResponseEntity<>(order, headers, HttpStatus.CREATED);
    }
    @CrossOrigin
    @RequestMapping(value = "/update",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Order> updateOrder(@RequestBody @Valid Order order, UriComponentsBuilder builder) {
        HttpHeaders headers = new HttpHeaders();

        if (order == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        this.orderService.save(order);

        return new ResponseEntity<>(order, headers, HttpStatus.CREATED);
    }
    @CrossOrigin
    @RequestMapping(value = "/delete/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<Order> deleteOrder(@PathVariable("id") Long id) {
        Order order = this.orderService.getById(id);
        if (order == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        this.orderService.delete(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @CrossOrigin
    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = this.orderService.getAll();

        if (orders.isEmpty()) {
            List<Order> ordersEmpty = new ArrayList<>();
            return new ResponseEntity<>(ordersEmpty, HttpStatus.OK);
        }

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }


}
