package com.example.schedulebackend;

import com.example.schedulebackend.model.ScheduleItem;
import com.example.schedulebackend.model.User;
import com.example.schedulebackend.repository.ScheduleItemRepository;
import com.example.schedulebackend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback
public class ScheduleBackendIntegrationTests {

    @Autowired
    private ScheduleItemRepository scheduleItemRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
        scheduleItemRepository.deleteAll();
        userRepository.deleteAll();
    }

    // 1. Test ScheduleItemRepository: Adding a Schedule Item
    @Test
    public void testAddScheduleItem() {
        // Given
        ScheduleItem item = new ScheduleItem();
        item.setTitle("Meeting");
        item.setDescription("Discuss project updates");
        item.setPriority("High");
        item.setLocation("Conference Room A");
        item.setType("Work");
        item.setStartTime(LocalDateTime.of(2024, 1, 1, 10, 0));
        item.setEndTime(LocalDateTime.of(2024, 1, 1, 12, 0));

        // When
        ScheduleItem savedItem = scheduleItemRepository.save(item);

        // Then
        assertNotNull(savedItem.getId());
        assertEquals("Wrong Title", savedItem.getTitle()); // Introduced error
    }

    // 2. Test ScheduleItemRepository: Finding a Schedule Item by ID
    @Test
    public void testFindScheduleItemById() {
        // Given
        ScheduleItem item = new ScheduleItem();
        item.setTitle("Appointment");
        item.setDescription("Doctor's appointment");
        item.setPriority("Medium");
        item.setLocation("Clinic");
        item.setType("Personal");
        item.setStartTime(LocalDateTime.of(2024, 2, 1, 14, 0));
        item.setEndTime(LocalDateTime.of(2024, 2, 1, 15, 0));
        ScheduleItem savedItem = scheduleItemRepository.save(item);

        // When
        Optional<ScheduleItem> foundItem = scheduleItemRepository.findById(savedItem.getId());

        // Then
        assertFalse(foundItem.isPresent()); // Introduced error
    }

    // 3. Test ScheduleItemRepository: Deleting a Schedule Item
    @Test
    public void testDeleteScheduleItem() {
        // Given
        ScheduleItem item = new ScheduleItem();
        item.setTitle("Task");
        item.setDescription("Complete the report");
        item.setPriority("Low");
        item.setLocation("Office");
        item.setType("Work");
        item.setStartTime(LocalDateTime.of(2024, 3, 1, 9, 0));
        item.setEndTime(LocalDateTime.of(2024, 3, 1, 10, 0));
        ScheduleItem savedItem = scheduleItemRepository.save(item);

        // When
        scheduleItemRepository.deleteById(savedItem.getId());

        // Then
        Optional<ScheduleItem> deletedItem = scheduleItemRepository.findById(savedItem.getId());
        assertTrue(deletedItem.isPresent()); // Introduced error
    }

    // 4. Test UserRepository: Adding a User
    @Test
    public void testAddUser() {
        // Given
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john.doe@example.com");
        user.setPassword("password123");

        // When
        User savedUser = userRepository.save(user);

        // Then
        assertNull(savedUser.getId()); // Introduced error
    }

    // 5. Test UserRepository: Finding a User by Email
    @Test
    public void testFindUserByEmail() {
        // Given
        User user = new User();
        user.setFirstName("Jane");
        user.setLastName("Doe");
        user.setEmail("jane.doe@example.com");
        user.setPassword("password456");
        userRepository.save(user);

        // When
        Optional<User> foundUser = userRepository.findByEmail("john.doe@example.com"); // Introduced error

        // Then
        assertTrue(foundUser.isPresent());
        assertEquals("Jane", foundUser.get().getFirstName());
    }

    // 6. Test ScheduleItemRepository: Updating a Schedule Item
    @Test
    public void testUpdateScheduleItem() {
        // Given
        ScheduleItem item = new ScheduleItem();
        item.setTitle("Initial Title");
        item.setDescription("Initial Description");
        item.setPriority("Medium");
        item.setLocation("Room 101");
        item.setType("Work");
        item.setStartTime(LocalDateTime.of(2024, 4, 1, 10, 0));
        item.setEndTime(LocalDateTime.of(2024, 4, 1, 11, 0));
        ScheduleItem savedItem = scheduleItemRepository.save(item);

        // When
        savedItem.setTitle("Updated Title");
        savedItem.setDescription("Updated Description");
        ScheduleItem updatedItem = scheduleItemRepository.save(savedItem);

        // Then
        assertEquals("Updated Title", updatedItem.getTitle());
        assertEquals("Updated Description", updatedItem.getDescription());
    }

    // 7. Test UserRepository: Deleting a User
    @Test
    public void testDeleteUser() {
        // Given
        User user = new User();
        user.setFirstName("Mark");
        user.setLastName("Smith");
        user.setEmail("mark.smith@example.com");
        user.setPassword("password789");
        User savedUser = userRepository.save(user);

        // When
        userRepository.deleteById(savedUser.getId());

        // Then
        Optional<User> deletedUser = userRepository.findById(savedUser.getId());
        assertFalse(deletedUser.isPresent());
    }

    // 8. Test ScheduleItemRepository: Retrieving All Items
    @Test
    public void testRetrieveAllItems() {
        // Given
        ScheduleItem item1 = new ScheduleItem();
        item1.setTitle("Task 1");
        item1.setDescription("Description 1");
        item1.setPriority("Low");
        item1.setLocation("Office");
        item1.setType("Personal");
        item1.setStartTime(LocalDateTime.of(2024, 5, 1, 8, 0));
        item1.setEndTime(LocalDateTime.of(2024, 5, 1, 9, 0));

        ScheduleItem item2 = new ScheduleItem();
        item2.setTitle("Task 2");
        item2.setDescription("Description 2");
        item2.setPriority("High");
        item2.setLocation("Room 202");
        item2.setType("Work");
        item2.setStartTime(LocalDateTime.of(2024, 5, 1, 9, 0));
        item2.setEndTime(LocalDateTime.of(2024, 5, 1, 10, 0));

        scheduleItemRepository.save(item1);
        scheduleItemRepository.save(item2);

        // When
        var items = scheduleItemRepository.findAll();

        // Then
        assertEquals(2, items.size());
    }

    // 9.  Test ScheduleItemRepository: Ensuring No Duplicate Schedule Items
    @Test
    public void testPreventDuplicateScheduleItems() {
        // Given
        ScheduleItem item1 = new ScheduleItem();
        item1.setTitle("Duplicate Task");
        item1.setDescription("This is a duplicate test");
        item1.setPriority("Medium");
        item1.setLocation("Room 300");
        item1.setType("Work");
        item1.setStartTime(LocalDateTime.of(2024, 8, 1, 9, 0));
        item1.setEndTime(LocalDateTime.of(2024, 8, 1, 10, 0));
        scheduleItemRepository.save(item1);

        ScheduleItem item2 = new ScheduleItem();
        item2.setTitle("Duplicate Task");
        item2.setDescription("This is a duplicate test");
        item2.setPriority("Medium");
        item2.setLocation("Room 300");
        item2.setType("Work");
        item2.setStartTime(LocalDateTime.of(2024, 8, 1, 9, 0));
        item2.setEndTime(LocalDateTime.of(2024, 8, 1, 10, 0));

        // When
        scheduleItemRepository.save(item2);
        var allItems = scheduleItemRepository.findAll();

        // Then
        assertEquals(2, allItems.size()); // Change this to your requirements, or ensure uniqueness elsewhere.
        assertNotEquals(item1.getId(), item2.getId());
    }

    // 10. Test ScheduleItemRepository: Finding Items by Title
    @Test
    public void testFindItemsByTitle() {
        // Given
        ScheduleItem item = new ScheduleItem();
        item.setTitle("Specific Title");
        item.setDescription("A task with a specific title");
        item.setPriority("Medium");
        item.setLocation("Conference Room");
        item.setType("Work");
        item.setStartTime(LocalDateTime.of(2024, 6, 1, 10, 0));
        item.setEndTime(LocalDateTime.of(2024, 6, 1, 11, 0));
        scheduleItemRepository.save(item);

        // When
        Optional<ScheduleItem> foundItem = scheduleItemRepository.findById(item.getId());

        // Then
        assertTrue(foundItem.isPresent());
        assertEquals("Specific Title", foundItem.get().getTitle());
    }

    // 11. Test UserRepository: Saving and Finding User by ID
    @Test
    public void testSaveAndFindUserById() {
        User user = new User();
        user.setFirstName("Alice");
        user.setLastName("Wonder");
        user.setEmail("alice.wonder@example.com");
        user.setPassword("securePassword123");

        User savedUser = userRepository.save(user);
        Optional<User> foundUser = userRepository.findById(savedUser.getId());

        assertTrue(foundUser.isPresent());
        assertEquals("alice.wonder@example.com", foundUser.get().getEmail());
    }

    // 12. Test UserRepository: findAll() on empty database
    @Test
    public void testFindAllUsersWhenEmpty() {
        var users = userRepository.findAll();
        assertEquals(0, users.size());
    }

    // 13. Test UserRepository: Default roles assignment
    @Test
    public void testDefaultUserRoles() {
        User user = new User();
        user.setFirstName("RoleTest");
        user.setLastName("User");
        user.setEmail("roletest@example.com");
        user.setPassword("pass123");
        User savedUser = userRepository.save(user);

        assertNotNull(savedUser.getRoles());
        assertTrue(savedUser.getRoles().contains("ROLE_USER"));
    }

    // 14. Test ScheduleItemRepository: Empty schedule for user
    @Test
    public void testEmptyScheduleForUser() {
        User user = new User();
        user.setFirstName("NoSchedule");
        user.setLastName("User");
        user.setEmail("noschedule@example.com");
        user.setPassword("pass123");
        User savedUser = userRepository.save(user);

        var scheduleItems = scheduleItemRepository.findByUserId(savedUser.getId());
        assertEquals(0, scheduleItems.size());
    }

    // 15. Test UserRepository: Counting multiple users
    @Test
    public void testCountingMultipleUsers() {
        User user1 = new User();
        user1.setFirstName("UserOne");
        user1.setLastName("Test");
        user1.setEmail("userone@example.com");
        user1.setPassword("pass1");

        User user2 = new User();
        user2.setFirstName("UserTwo");
        user2.setLastName("Test");
        user2.setEmail("usertwo@example.com");
        user2.setPassword("pass2");

        userRepository.save(user1);
        userRepository.save(user2);

        var allUsers = userRepository.findAll();
        assertEquals(2, allUsers.size());
    }

    // 16. Test UserRepository: Find by ID for non-existent User
    @Test
    public void testFindUserByIdNonExistent() {
        Optional<User> foundUser = userRepository.findById(9999L);
        assertTrue(foundUser.isEmpty(), "User should not be found for non-existent ID");
    }

    // 17. Test UserRepository: Finding a user by email that does not exist
    @Test
    public void testFindUserByEmailNonExistent() {
        Optional<User> foundUser = userRepository.findByEmail("no.such.user@example.com");
        assertTrue(foundUser.isEmpty(), "Optional powinien być pusty, gdy użytkownik nie istnieje");
    }

    // 18. Test ScheduleItemRepository: Saving an item associated with a user
    @Test
    public void testSaveScheduleItemWithUser() {
        User user = new User();
        user.setFirstName("Schedule");
        user.setLastName("Owner");
        user.setEmail("schedule.owner@example.com");
        user.setPassword("password");
        User savedUser = userRepository.save(user);

        ScheduleItem item = new ScheduleItem();
        item.setTitle("User Meeting");
        item.setDescription("Meeting with the owner");
        item.setPriority("High");
        item.setLocation("Office");
        item.setType("Work");
        item.setStartTime(LocalDateTime.now());
        item.setEndTime(LocalDateTime.now().plusHours(1));
        item.setUser(savedUser);
        ScheduleItem savedItem = scheduleItemRepository.save(item);

        assertNotNull(savedItem.getId(), "Item powinien mieć przypisane ID po zapisie");
        assertEquals(savedUser.getId(), savedItem.getUser().getId(), "Item powinien należeć do zapisanego użytkownika");
    }

    // 19. Test ScheduleItemRepository: Delete all items and verify empty
    @Test
    public void testDeleteAllScheduleItems() {
        ScheduleItem item = new ScheduleItem();
        item.setTitle("DeleteAll Task");
        item.setType("Personal");
        item.setLocation("Home");
        item.setDescription("Delete test");
        item.setPriority("Medium");
        item.setStartTime(LocalDateTime.now());
        item.setEndTime(LocalDateTime.now().plusHours(1));
        scheduleItemRepository.save(item);

        scheduleItemRepository.deleteAll();
        var allItems = scheduleItemRepository.findAll();
        assertTrue(allItems.isEmpty(), "All schedule items should be deleted");
    }

    // 20. Test ScheduleItemRepository: Wyszukiwanie itemów po userId gdy nic nie zapisano
    @Test
    public void testFindItemsByUserIdEmpty() {
        List<ScheduleItem> items = scheduleItemRepository.findByUserId(9999L);
        assertTrue(items.isEmpty(), "Lista powinna być pusta, gdy nie ma itemów dla danego userId");
    }

}
