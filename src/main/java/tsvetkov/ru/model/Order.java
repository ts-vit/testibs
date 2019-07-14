package tsvetkov.ru.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;


@Entity
@Table(name = "ORDERS")
@Getter
@Setter
@ToString
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Order extends BaseEntity{


    @Column(name = "LAST_NAME", length = 64, nullable = false)
    private String lastName;

    @Column(name = "FIRST_NAME", length = 64, nullable = false)
    private String firstName;

    @Column(name = "PRODUCT", length = 64, nullable = false)
    private String product;

    @Column(name = "QUANTITY", nullable = false)
    private int quantity;
}