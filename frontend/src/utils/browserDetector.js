/**
 * Detect browser capabilities for file system access
 */
export const detectBrowserCapabilities = () => {
  const isChromium = /Chrome|Chromium|Edg/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  const isSafari =
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

  // Check for File System Access API support
  const supportsFileSystemAccess = "showDirectoryPicker" in window;
  const supportsFileSystemWritable = "showOpenFilePicker" in window;

  return {
    isChromium,
    isFirefox,
    isSafari,
    supportsFileSystemAccess,
    supportsFileSystemWritable,
    canUseWriteMode: isChromium && supportsFileSystemAccess,
    browserName: isChromium
      ? "Chrome/Chromium/Edge"
      : isFirefox
      ? "Firefox"
      : isSafari
      ? "Safari"
      : "Unknown",
  };
};

/**
 * Get recommended mode based on browser capabilities
 */
export const getRecommendedMode = () => {
  const capabilities = detectBrowserCapabilities();

  if (capabilities.canUseWriteMode) {
    return "write"; // Direct file system access
  } else {
    return "download"; // Traditional download mode
  }
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};