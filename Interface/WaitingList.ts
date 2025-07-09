/**
 * Waiting List Types
 * TypeScript type definitions for waiting list functionality
 */

/** Database table structure for waiting_list */
export interface WaitingListEntry {
    id?: string;
    email: string;
    name?: string;
    interest?: string;
    location?: string;
    newsletter: boolean;
    created_at?: string;
    updated_at?: string;
  }
  
  /** Form data from the frontend */
  export interface WaitingListFormData {
    email: string;
    name: string;
    interest: string;
    location: string;
    newsletter: boolean;
  }
  
  /** API response structure */
  export interface WaitingListResponse {
    success: boolean;
    message: string;
    data?: WaitingListEntry;
    error?: string;
  }
  
  /** Service layer response */
  export interface ServiceResponse<T> {
    data?: T;
    error?: string;
    success: boolean;
  }