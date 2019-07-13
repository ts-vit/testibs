package tsvetkov.ru.service;

import tsvetkov.ru.model.Order;

import java.util.List;

public interface OrderService {
    Order getById(Long id);
    void save(Order order);

    void delete(Long id);

    List<Order> getAll();
}
