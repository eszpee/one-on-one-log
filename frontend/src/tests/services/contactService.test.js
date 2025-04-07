import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import contactService from '../../services/contactService';

// Mock axios
vi.mock('axios');

describe('Contact Service', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('getAllContacts', () => {
    it('should return contacts when API call is successful', async () => {
      // Arrange
      const mockContacts = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' }
      ];
      axios.get.mockResolvedValue({ 
        data: { 
          status: 'success', 
          data: mockContacts 
        } 
      });

      // Act
      const result = await contactService.getAllContacts();

      // Assert
      expect(axios.get).toHaveBeenCalledWith('/api/contacts');
      expect(result).toEqual(mockContacts);
    });

    it('should handle errors when API call fails', async () => {
      // Arrange
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(contactService.getAllContacts()).rejects.toThrow(errorMessage);
      expect(axios.get).toHaveBeenCalledWith('/api/contacts');
    });
  });

  describe('getContactById', () => {
    it('should return a contact when API call is successful', async () => {
      // Arrange
      const mockContact = { id: 1, firstName: 'John', lastName: 'Doe' };
      axios.get.mockResolvedValue({ 
        data: { 
          status: 'success', 
          data: mockContact 
        } 
      });

      // Act
      const result = await contactService.getContactById(1);

      // Assert
      expect(axios.get).toHaveBeenCalledWith('/api/contacts/1');
      expect(result).toEqual(mockContact);
    });

    it('should handle errors when API call fails', async () => {
      // Arrange
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(contactService.getContactById(1)).rejects.toThrow(errorMessage);
      expect(axios.get).toHaveBeenCalledWith('/api/contacts/1');
    });
  });

  describe('createContact', () => {
    it('should return the created contact when API call is successful', async () => {
      // Arrange
      const newContact = { firstName: 'John', lastName: 'Doe' };
      const createdContact = { id: 1, ...newContact };
      axios.post.mockResolvedValue({ 
        data: { 
          status: 'success', 
          data: createdContact 
        } 
      });

      // Act
      const result = await contactService.createContact(newContact);

      // Assert
      expect(axios.post).toHaveBeenCalledWith('/api/contacts', newContact);
      expect(result).toEqual(createdContact);
    });

    it('should handle errors when API call fails', async () => {
      // Arrange
      const newContact = { firstName: 'John', lastName: 'Doe' };
      const errorMessage = 'Network Error';
      axios.post.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(contactService.createContact(newContact)).rejects.toThrow(errorMessage);
      expect(axios.post).toHaveBeenCalledWith('/api/contacts', newContact);
    });
  });

  describe('updateContact', () => {
    it('should return the updated contact when API call is successful', async () => {
      // Arrange
      const updatedContact = { id: 1, firstName: 'John', lastName: 'Updated' };
      axios.put.mockResolvedValue({ 
        data: { 
          status: 'success', 
          data: updatedContact 
        } 
      });

      // Act
      const result = await contactService.updateContact(1, updatedContact);

      // Assert
      expect(axios.put).toHaveBeenCalledWith('/api/contacts/1', updatedContact);
      expect(result).toEqual(updatedContact);
    });

    it('should handle errors when API call fails', async () => {
      // Arrange
      const updatedContact = { id: 1, firstName: 'John', lastName: 'Updated' };
      const errorMessage = 'Network Error';
      axios.put.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(contactService.updateContact(1, updatedContact)).rejects.toThrow(errorMessage);
      expect(axios.put).toHaveBeenCalledWith('/api/contacts/1', updatedContact);
    });
  });

  describe('deleteContact', () => {
    it('should return success message when API call is successful', async () => {
      // Arrange
      const successResponse = { message: 'Contact deleted successfully' };
      axios.delete.mockResolvedValue({ 
        data: { 
          status: 'success', 
          message: successResponse.message 
        } 
      });

      // Act
      const result = await contactService.deleteContact(1);

      // Assert
      expect(axios.delete).toHaveBeenCalledWith('/api/contacts/1');
      expect(result).toEqual(successResponse.message);
    });

    it('should handle errors when API call fails', async () => {
      // Arrange
      const errorMessage = 'Network Error';
      axios.delete.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(contactService.deleteContact(1)).rejects.toThrow(errorMessage);
      expect(axios.delete).toHaveBeenCalledWith('/api/contacts/1');
    });
  });
});
