/**
 * LocalStorage Utilities for Image History
 */

import { ImageHistoryItem } from '@/types/image';

const HISTORY_KEY = 'image-generation-history';
const MAX_HISTORY_ITEMS = 10;

/**
 * Get image history from localStorage
 */
export function getImageHistory(): ImageHistoryItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Save a new image to history
 */
export function saveToHistory(item: ImageHistoryItem): void {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getImageHistory();
    
    // Add new item at the beginning
    const newHistory = [item, ...history].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Failed to save to history:', error);
  }
}

/**
 * Clear all history
 */
export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
}

/**
 * Remove a specific item from history
 */
export function removeFromHistory(id: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getImageHistory();
    const newHistory = history.filter((item) => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Failed to remove from history:', error);
  }
}
