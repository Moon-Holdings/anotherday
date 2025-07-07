
import { useEffect } from 'react';

interface UseAccessibilityOptions {
  announceChanges?: boolean;
  focusManagement?: boolean;
}

export const useAccessibility = (options: UseAccessibilityOptions = {}) => {
  const { announceChanges = true, focusManagement = true } = options;

  // Announce changes to screen readers
  const announceToScreenReader = (message: string) => {
    if (!announceChanges) return;

    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  // Focus management helper
  const focusElement = (selector: string) => {
    if (!focusManagement) return;

    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      element.focus();
    }
  };

  // Keyboard navigation helper
  const handleKeyboardNavigation = (
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    onSelect: (index: number) => void
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex]?.focus();
        onSelect(nextIndex);
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex]?.focus();
        onSelect(prevIndex);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        items[currentIndex]?.click();
        break;
      case 'Escape':
        event.preventDefault();
        (document.activeElement as HTMLElement)?.blur();
        break;
    }
  };

  return {
    announceToScreenReader,
    focusElement,
    handleKeyboardNavigation
  };
};

// Screen reader only styles
export const srOnlyStyles = "absolute left-[-10000px] top-auto width-[1px] height-[1px] overflow-hidden";
