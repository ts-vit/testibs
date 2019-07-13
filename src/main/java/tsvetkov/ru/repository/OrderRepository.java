package tsvetkov.ru.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tsvetkov.ru.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
