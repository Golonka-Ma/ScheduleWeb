package com.example.schedulebackend;

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

	// FAIL #1
	@Test
	public void testAddScheduleItem() {
		// Given
		ScheduleItem item = new ScheduleItem();
		item.setTitle(null);
		item.setType("Work");
		item.setLocation("Office");
		item.setDescription("Team meeting");
		item.setStartTime(LocalDateTime.of(2024, 1, 1, 10, 0));
		item.setEndTime(LocalDateTime.of(2024, 1, 1, 12, 0));
		item.setPriority("High");

		when(scheduleService.addScheduleItem(item)).thenReturn(item);

		// When
		ScheduleItem savedItem = scheduleService.addScheduleItem(item);

		// Then
		assertNotNull(savedItem);
		assertEquals("Incorrect Meeting", savedItem.getTitle()); // Will fail because title is null
		verify(scheduleService, times(1)).addScheduleItem(item);
	}

	// FAIL #2
	@Test
	public void testFindScheduleItemById() {
		// Given
		ScheduleItem item = new ScheduleItem();
		item.setId(1L);
		item.setTitle("Test Item");
		item.setType("Personal");
		item.setLocation("Home");
		item.setDescription("A personal task");
		item.setStartTime(LocalDateTime.now());
		item.setEndTime(LocalDateTime.now().plusHours(1));
		item.setPriority("Low");

		when(scheduleService.findById(1L)).thenReturn(Optional.of(item));

		// When
		Optional<ScheduleItem> foundItem = scheduleService.findById(1L);

		// Then
		assertFalse(foundItem.isPresent()); // Will fail because foundItem is actually present
		assertEquals("Wrong Title", foundItem.get().getTitle()); // Would fail anyway
		verify(scheduleService, times(1)).findById(1L);
	}

	// FAIL #3
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
		assertEquals("incorrect@example.com", registeredUser.getEmail()); // Will fail, email is null
		verify(userService, times(1)).registerUser(user);
	}

	// FAIL #4
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
		assertEquals("wrong@example.com", foundUser.get().getEmail()); // Will fail, actual is email
		verify(userService, times(1)).findByEmail(email);
	}

	// FAIL #5
	@Test
	public void testDeleteScheduleItem() {
		// Given
		Long itemId = 1L;
		doNothing().when(scheduleService).deleteScheduleItem(itemId);

		// When
		scheduleService.deleteScheduleItem(itemId);

		// Then
		verify(scheduleService, times(1)).deleteScheduleItem(itemId);
		// Introduce failing condition
		assertEquals(999, itemId); // Will fail because itemId is 1
	}

	// PASS #6
	@Test
	public void testUniqueUserEmails() {
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

		userService.registerUser(user1);
		Exception exception = assertThrows(RuntimeException.class, () -> userService.registerUser(user2));

		assertNotNull(exception);
		assertEquals("Email already exists", exception.getMessage());
		verify(userService, times(1)).registerUser(user1);
		verify(userService, times(1)).registerUser(user2);
	}

	// PASS #7
	@Test
	public void testUpdateScheduleItem() {
		ScheduleItem item = new ScheduleItem();
		item.setId(1L);
		item.setTitle("Initial Title");
		item.setDescription("Initial Description");

		when(scheduleService.findById(1L)).thenReturn(Optional.of(item));
		item.setTitle("Updated Title");
		item.setDescription("Updated Description");
		when(scheduleService.addScheduleItem(item)).thenReturn(item);

		ScheduleItem updatedItem = scheduleService.addScheduleItem(item);

		assertNotNull(updatedItem);
		assertEquals("Updated Title", updatedItem.getTitle());
		assertEquals("Updated Description", updatedItem.getDescription());
	}

	// PASS #8
	@Test
	public void testHandleEmptyTitle() {
		ScheduleItem item = new ScheduleItem();
		item.setTitle("");
		item.setDescription("This is a test for an empty title");

		doThrow(new RuntimeException("Title cannot be empty"))
				.when(scheduleService).addScheduleItem(item);

		Exception exception = assertThrows(RuntimeException.class,
				() -> scheduleService.addScheduleItem(item));

		assertNotNull(exception);
		assertEquals("Title cannot be empty", exception.getMessage());
		verify(scheduleService, times(1)).addScheduleItem(item);
	}

	// PASS #9
	@Test
	public void testRetrieveAllItemsForUser() {
		Long userId = 1L;
		when(scheduleService.getScheduleForUser(userId)).thenReturn(Collections.emptyList());

		var items = scheduleService.getScheduleForUser(userId);

		assertNotNull(items);
		assertEquals(0, items.size());
		verify(scheduleService, times(1)).getScheduleForUser(userId);
	}

	// PASS #10
	@Test
	public void testFindScheduleItemByTitle() {
		String title = "Meeting";
		ScheduleItem item = new ScheduleItem();
		item.setTitle(title);
		item.setDescription("Team meeting");
		item.setStartTime(LocalDateTime.of(2024, 1, 1, 10, 0));
		item.setEndTime(LocalDateTime.of(2024, 1, 1, 12, 0));

		when(scheduleService.findById(anyLong())).thenReturn(Optional.of(item));

		Optional<ScheduleItem> foundItem = scheduleService.findById(1L);

		assertTrue(foundItem.isPresent());
		assertEquals(title, foundItem.get().getTitle());
		verify(scheduleService, times(1)).findById(1L);
	}

	// FAIL #11
	@Test
	public void testUserServiceFindByEmailNotFound() {
		String nonExistentEmail = "nonexistent@example.com";
		when(userService.findByEmail(nonExistentEmail)).thenReturn(Optional.empty());

		Optional<User> foundUser = userService.findByEmail(nonExistentEmail);
		// Originally correct: assertTrue(foundUser.isEmpty())
		// Make it fail:
		assertTrue(foundUser.isPresent()); // Will fail since it's empty
		verify(userService, times(1)).findByEmail(nonExistentEmail);
	}

	// FAIL #12
	@Test
	public void testScheduleServiceFindByIdNotFound() {
		Long nonExistentId = 999L;
		when(scheduleService.findById(nonExistentId)).thenReturn(Optional.empty());

		Optional<ScheduleItem> foundItem = scheduleService.findById(nonExistentId);
		// Originally correct: assertTrue(foundItem.isEmpty())
		// Make it fail:
		assertFalse(foundItem.isEmpty()); // Will fail since it's actually empty
		verify(scheduleService, times(1)).findById(nonExistentId);
	}

	// FAIL #13
	@Test
	public void testRegisterUserCalledOnce() {
		User user = new User();
		user.setEmail("singlecall@example.com");
		user.setPassword("password123");

		when(userService.registerUser(user)).thenReturn(user);
		userService.registerUser(user);

		// Originally correct: verify(userService, times(1)).registerUser(user);
		// Make it fail:
		verify(userService, times(2)).registerUser(user); // Will fail since it was called only once
	}

	// FAIL #14
	@Test
	public void testGetScheduleForUserNonEmpty() {
		Long userId = 2L;
		ScheduleItem item = new ScheduleItem();
		item.setTitle("NonEmptyTask");
		when(scheduleService.getScheduleForUser(userId)).thenReturn(Collections.singletonList(item));

		var items = scheduleService.getScheduleForUser(userId);
		assertEquals(1, items.size());
		// Originally correct: assertEquals("NonEmptyTask", items.get(0).getTitle());
		// Make it fail:
		assertEquals("WrongTask", items.get(0).getTitle()); // Will fail
		verify(scheduleService, times(1)).getScheduleForUser(userId);
	}

	// FAIL #15
	@Test
	public void testRegisterUserNullPassword() {
		User user = new User();
		user.setEmail("nullpass@example.com");
		user.setPassword(null);

		doThrow(new RuntimeException("Password cannot be null")).when(userService).registerUser(user);

		Exception exception = assertThrows(RuntimeException.class, () -> userService.registerUser(user));
		// Originally correct: assertEquals("Password cannot be null", exception.getMessage());
		// Make it fail:
		assertEquals("This message is wrong", exception.getMessage()); // Will fail
		verify(userService, times(1)).registerUser(user);
	}

	// PASS #16
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

	// PASS #17
	@Test
	public void testScheduleServiceAddNullItem() {
		doThrow(new RuntimeException("Item cannot be null")).when(scheduleService).addScheduleItem(null);

		Exception exception = assertThrows(RuntimeException.class, () -> scheduleService.addScheduleItem(null));
		assertEquals("Item cannot be null", exception.getMessage());
		verify(scheduleService, times(1)).addScheduleItem(null);
	}

	// PASS #18
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

	// PASS #19
	@Test
	public void testGetScheduleForNonExistentUserId() {
		Long nonExistentUserId = 999L;
		when(scheduleService.getScheduleForUser(nonExistentUserId)).thenReturn(Collections.emptyList());

		var items = scheduleService.getScheduleForUser(nonExistentUserId);
		assertTrue(items.isEmpty(), "Should return empty list for non-existent user ID");
		verify(scheduleService, times(1)).getScheduleForUser(nonExistentUserId);
	}

	// PASS #20
	@Test
	public void testFindUserByInvalidEmail() {
		String invalidEmail = "notanemail";
		when(userService.findByEmail(invalidEmail)).thenReturn(Optional.empty());

		Optional<User> foundUser = userService.findByEmail(invalidEmail);
		assertTrue(foundUser.isEmpty(), "Should return empty Optional for invalid email");
		verify(userService, times(1)).findByEmail(invalidEmail);
	}
}
