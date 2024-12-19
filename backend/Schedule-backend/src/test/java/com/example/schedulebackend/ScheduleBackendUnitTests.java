package com.example.schedulebackend;

import com.example.schedulebackend.dto.RegisterRequest;
import com.example.schedulebackend.model.ScheduleItem;
import com.example.schedulebackend.model.User;
import com.example.schedulebackend.service.ScheduleService;
import com.example.schedulebackend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ScheduleBackendUnitTests {

	@Mock
	private ScheduleService scheduleService;

	@Mock
	private UserService userService;

	@InjectMocks
	private ScheduleBackendUnitTests scheduleBackendUnitTests;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.openMocks(this);
	}

	// 1. Test ScheduleService: Adding a Schedule Item
	@Test
	public void testAddScheduleItem() {
		// Given
		ScheduleItem item = new ScheduleItem();
		item.setTitle(null);
		item.setType("Work");
		item.setLocation("Office");
		item.setDescription("Team meeting to discuss project updates");
		item.setStartTime(LocalDateTime.of(2024, 1, 1, 10, 0));
		item.setEndTime(LocalDateTime.of(2024, 1, 1, 12, 0));
		item.setPriority("High");

		when(scheduleService.addScheduleItem(item)).thenReturn(item);

		// When
		ScheduleItem savedItem = scheduleService.addScheduleItem(item);

		// Then
		assertNotNull(savedItem);
		assertEquals("Incorrect Meeting", savedItem.getTitle());
		verify(scheduleService, times(1)).addScheduleItem(item);
	}

	// 2. Test ScheduleService: Finding a Schedule Item by ID
	@Test
	public void testFindScheduleItemById() {
		// Given
		ScheduleItem item = new ScheduleItem();
		item.setId(1L);
		item.setTitle("Test Item");
		item.setType("Personal");
		item.setLocation("Home");
		item.setDescription("A personal task to complete");
		item.setStartTime(LocalDateTime.now());
		item.setEndTime(LocalDateTime.now().plusHours(1));
		item.setPriority("Low");

		when(scheduleService.findById(1L)).thenReturn(Optional.of(item));

		// When
		Optional<ScheduleItem> foundItem = scheduleService.findById(1L);

		// Then
		assertFalse(foundItem.isPresent());
		assertEquals("Wrong Title", foundItem.get().getTitle());
		verify(scheduleService, times(1)).findById(1L);
	}

	// 3. Test UserService: Registering a User
	@Test
	public void testRegisterUser() {
		// Given
		User user = new User();
		user.setFirstName("Test");
		user.setLastName("User");
		user.setEmail(null);
		user.setPassword("password123");

		when(userService.registerUser(user)).thenReturn(user);

		// When
		User registeredUser = userService.registerUser(user);

		// Then
		assertNotNull(registeredUser);
		assertEquals("incorrect@example.com", registeredUser.getEmail());
		verify(userService, times(1)).registerUser(user);
	}

	// 4. Test UserService: Finding a User by Email
	@Test
	public void testFindUserByEmail() {
		// Given
		String email = "finduser@example.com";
		User user = new User();
		user.setFirstName("Find");
		user.setLastName("User");
		user.setEmail(email);
		user.setPassword("password123");

		when(userService.findByEmail(email)).thenReturn(Optional.of(user));

		// When
		Optional<User> foundUser = userService.findByEmail(email);

		// Then
		assertTrue(foundUser.isPresent());
		assertEquals(email, foundUser.get().getEmail());
		verify(userService, times(1)).findByEmail(email);
	}

	// 5. Test ScheduleService: Deleting a Schedule Item
	@Test
	public void testDeleteScheduleItem() {
		// Given
		Long itemId = 1L;
		doNothing().when(scheduleService).deleteScheduleItem(itemId);

		// When
		scheduleService.deleteScheduleItem(itemId);

		// Then
		verify(scheduleService, times(1)).deleteScheduleItem(itemId);
	}

	// 6. Test UserService: Ensuring Unique User Emails
	@Test
	public void testUniqueUserEmails() {
		// Given
		User user1 = new User();
		user1.setFirstName("User1");
		user1.setLastName("Test");
		user1.setEmail("uniqueemail@example.com");
		user1.setPassword("password123");

		User user2 = new User();
		user2.setFirstName("User2");
		user2.setLastName("Test");
		user2.setEmail("uniqueemail@example.com");
		user2.setPassword("password123");

		when(userService.registerUser(user1)).thenReturn(user1);
		doThrow(new RuntimeException("Email already exists")).when(userService).registerUser(user2);

		// When
		userService.registerUser(user1);
		Exception exception = assertThrows(RuntimeException.class, () -> userService.registerUser(user2));

		// Then
		assertNotNull(exception);
		assertEquals("Email already exists", exception.getMessage());
		verify(userService, times(1)).registerUser(user1);
		verify(userService, times(1)).registerUser(user2);
	}

	// 7. Test ScheduleService: Updating a Schedule Item
	@Test
	public void testUpdateScheduleItem() {
		// Given
		ScheduleItem item = new ScheduleItem();
		item.setId(1L);
		item.setTitle("Initial Title");
		item.setDescription("Initial Description");

		when(scheduleService.findById(1L)).thenReturn(Optional.of(item));
		item.setTitle("Updated Title");
		item.setDescription("Updated Description");
		when(scheduleService.addScheduleItem(item)).thenReturn(item);

		// When
		ScheduleItem updatedItem = scheduleService.addScheduleItem(item);

		// Then
		assertNotNull(updatedItem);
		assertEquals("Updated Title", updatedItem.getTitle());
		assertEquals("Updated Description", updatedItem.getDescription());
	}

	// 8. Test ScheduleService: Handling Empty Title
	@Test
	public void testHandleEmptyTitle() {
		// Given
		ScheduleItem item = new ScheduleItem();
		item.setTitle(""); // Intentionally empty title
		item.setDescription("This is a test for an empty title");

		doThrow(new RuntimeException("Title cannot be empty"))
				.when(scheduleService).addScheduleItem(item);

		// When
		Exception exception = assertThrows(RuntimeException.class,
				() -> scheduleService.addScheduleItem(item));

		// Then
		assertNotNull(exception);
		assertEquals("Title cannot be empty", exception.getMessage());
		verify(scheduleService, times(1)).addScheduleItem(item);
	}


	// 9. Test ScheduleService: Retrieving All Items for User
	@Test
	public void testRetrieveAllItemsForUser() {
		// Given
		Long userId = 1L;
		when(scheduleService.getScheduleForUser(userId)).thenReturn(Collections.emptyList());

		// When
		var items = scheduleService.getScheduleForUser(userId);

		// Then
		assertNotNull(items);
		assertEquals(0, items.size());
		verify(scheduleService, times(1)).getScheduleForUser(userId);
	}

	// 10. Test ScheduleService: Retrieving Schedule Item by Title
	@Test
	public void testFindScheduleItemByTitle() {
		// Given
		String title = "Meeting";
		ScheduleItem item = new ScheduleItem();
		item.setTitle(title);
		item.setDescription("Team meeting");
		item.setStartTime(LocalDateTime.of(2024, 1, 1, 10, 0));
		item.setEndTime(LocalDateTime.of(2024, 1, 1, 12, 0));

		when(scheduleService.findById(anyLong())).thenReturn(Optional.of(item));

		// When
		Optional<ScheduleItem> foundItem = scheduleService.findById(1L);

		// Then
		assertTrue(foundItem.isPresent());
		assertEquals(title, foundItem.get().getTitle());
		verify(scheduleService, times(1)).findById(1L);
	}

	// 11. Test UserService: Empty optional if user not found by email
	@Test
	public void testUserServiceFindByEmailNotFound() {
		String nonExistentEmail = "nonexistent@example.com";
		when(userService.findByEmail(nonExistentEmail)).thenReturn(Optional.empty());

		Optional<User> foundUser = userService.findByEmail(nonExistentEmail);
		assertTrue(foundUser.isEmpty());
		verify(userService, times(1)).findByEmail(nonExistentEmail);
	}

	// 12. Test ScheduleService: Empty optional if schedule item not found
	@Test
	public void testScheduleServiceFindByIdNotFound() {
		Long nonExistentId = 999L;
		when(scheduleService.findById(nonExistentId)).thenReturn(Optional.empty());

		Optional<ScheduleItem> foundItem = scheduleService.findById(nonExistentId);
		assertTrue(foundItem.isEmpty());
		verify(scheduleService, times(1)).findById(nonExistentId);
	}

	// 13. Test UserService: registerUser called exactly once
	@Test
	public void testRegisterUserCalledOnce() {
		User user = new User();
		user.setEmail("singlecall@example.com");
		user.setPassword("password123");

		when(userService.registerUser(user)).thenReturn(user);
		userService.registerUser(user);

		verify(userService, times(1)).registerUser(user);
	}

	// 14. Test ScheduleService: Returning non-empty list of items for user
	@Test
	public void testGetScheduleForUserNonEmpty() {
		Long userId = 2L;
		ScheduleItem item = new ScheduleItem();
		item.setTitle("NonEmptyTask");
		when(scheduleService.getScheduleForUser(userId)).thenReturn(Collections.singletonList(item));

		var items = scheduleService.getScheduleForUser(userId);
		assertEquals(1, items.size());
		assertEquals("NonEmptyTask", items.get(0).getTitle());
		verify(scheduleService, times(1)).getScheduleForUser(userId);
	}

	// 15. Test UserService: Exception if registering user with null password
	@Test
	public void testRegisterUserNullPassword() {
		User user = new User();
		user.setEmail("nullpass@example.com");
		user.setPassword(null);

		doThrow(new RuntimeException("Password cannot be null")).when(userService).registerUser(user);

		Exception exception = assertThrows(RuntimeException.class, () -> userService.registerUser(user));
		assertEquals("Password cannot be null", exception.getMessage());
		verify(userService, times(1)).registerUser(user);
	}

	// 16. Test UserService: Exception if registering user with null email
	@Test
	public void testRegisterUserNullEmail() {
		User user = new User();
		user.setEmail(null);
		user.setPassword("password123");

		doThrow(new RuntimeException("Email cannot be null")).when(userService).registerUser(user);

		Exception exception = assertThrows(RuntimeException.class, () -> userService.registerUser(user));
		assertEquals("Email cannot be null", exception.getMessage());
		verify(userService, times(1)).registerUser(user);
	}

	// 17. Test ScheduleService: Adding null item throws exception
	@Test
	public void testScheduleServiceAddNullItem() {
		doThrow(new RuntimeException("Item cannot be null")).when(scheduleService).addScheduleItem(null);

		Exception exception = assertThrows(RuntimeException.class, () -> scheduleService.addScheduleItem(null));
		assertEquals("Item cannot be null", exception.getMessage());
		verify(scheduleService, times(1)).addScheduleItem(null);
	}

	// 18. Test UserService: Register duplicate email throws exception
	@Test
	public void testRegisterDuplicateEmail() {
		User user = new User();
		user.setEmail("dup@example.com");
		user.setPassword("pass123");

		when(userService.registerUser(user)).thenReturn(user);
		userService.registerUser(user);

		doThrow(new RuntimeException("Email already exists")).when(userService).registerUser(user);

		Exception exception = assertThrows(RuntimeException.class, () -> userService.registerUser(user));
		assertEquals("Email already exists", exception.getMessage());
		verify(userService, times(2)).registerUser(user);
	}

	// 19. Test ScheduleService: getScheduleForUser returns empty for non-existent user ID
	@Test
	public void testGetScheduleForNonExistentUserId() {
		Long nonExistentUserId = 999L;
		when(scheduleService.getScheduleForUser(nonExistentUserId)).thenReturn(Collections.emptyList());

		var items = scheduleService.getScheduleForUser(nonExistentUserId);
		assertTrue(items.isEmpty(), "Should return empty list for non-existent user ID");
		verify(scheduleService, times(1)).getScheduleForUser(nonExistentUserId);
	}

	// 20. Test UserService: Invalid email returns empty Optional
	@Test
	public void testFindUserByInvalidEmail() {
		String invalidEmail = "notanemail";
		when(userService.findByEmail(invalidEmail)).thenReturn(Optional.empty());

		Optional<User> foundUser = userService.findByEmail(invalidEmail);
		assertTrue(foundUser.isEmpty(), "Should return empty Optional for invalid email");
		verify(userService, times(1)).findByEmail(invalidEmail);
	}


}
