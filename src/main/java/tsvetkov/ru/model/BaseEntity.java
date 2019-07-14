package tsvetkov.ru.model;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;



@MappedSuperclass
@Getter
@Setter
@ToString
public class BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;

}
