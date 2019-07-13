package tsvetkov.ru.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tsvetkov.ru.model.Order;
import tsvetkov.ru.repository.OrderRepository;

import java.util.List;

@Slf4j
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Override
    public Order getById(Long id) {
        log.info("Get order by Id", id);
        return orderRepository.getOne(id);
    }

    @Override
    public void save(Order order) {
        log.info("Save order", order);
        orderRepository.save(order);
    }

    @Override
    public void delete(Long id) {
        log.info("Delete order ", id);
        orderRepository.deleteById(id);
    }

    @Override
    public List<Order> getAll() {
        return orderRepository.findAll();
    }
}
