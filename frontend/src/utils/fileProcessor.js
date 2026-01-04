import JSZip from "jszip";
import { saveAs } from "file-saver";
import ImageProcessor from "./imageProcessor";

/**
 * File Processor Engine
 * Handles both Write Mode (FSA API) and Download Mode
 */

class FileProcessor {
  constructor(mode = "download") {
    this.mode = mode;
    this.folderHandle = null;
  }

  /**
   * Set folder handle for Write Mode
   */
  setFolderHandle(handle) {
    this.folderHandle = handle;
  }

  /**
   * Process files based on tool and settings
   */
  /**
   * Process files based on tool and settings
   */
  async processFiles(files, tool, settings) {
    console.log("FileProcessor.processFiles called:", {
      tool,
      settings,
      filesCount: files.length,
      mode: this.mode,
    });

    let result;
    switch (tool) {
      case "rename":
        result = await this.processRename(files, settings);
        break;
      case "manual-rename": // ADD THIS CASE
        result = await this.processManualRename(files, settings);
        break;
      case "convert":
        result = await this.processConvert(files, settings);
        break;
      case "compress":
        result = await this.processCompress(files, settings);
        break;
      case "organize":
        result = await this.processOrganize(files, settings);
        break;
      case "resize":
        result = await this.processResize(files, settings);
        break;
      default:
        throw new Error(`Unknown tool: ${tool}`);
    }

    console.log("FileProcessor.processFiles returning:", result);
    return result;
  }

  async processManualRename(files, settings) {
    const processedFiles = [];
    const summary = {
      renamed: 0,
      skipped: 0,
      total: files.length,
    };

    console.log("Processing manual renames:", settings.manualRenames);

    for (const file of files) {
      try {
        const newName = settings.manualRenames[file.id];

        if (newName && newName !== file.name) {
          console.log(`Manual rename: "${file.name}" -> "${newName}"`);

          // Create the modified file
          const modifiedFile = await this.createModifiedFile(file, newName);

          // Create updated file object with the new name
          const updatedFile = {
            ...file,
            name: newName, // Update the name property!
            originalName: file.name, // Store original name separately
            newFile: modifiedFile,
          };

          processedFiles.push(updatedFile);
          summary.renamed++;
        } else {
          // Keep original - no change needed
          processedFiles.push({
            ...file,
            originalName: file.name,
            newFile: file.file,
            action: "skipped",
          });
          summary.skipped++;
        }
      } catch (error) {
        console.error(`Error renaming ${file.name}:`, error);
        processedFiles.push({
          ...file,
          error: error.message,
          action: "failed",
        });
      }
    }

    return await this.saveFiles(processedFiles, summary);
  }

  /**
   * Rename files with various patterns
   */

  /**
   * Rename files with various patterns
   */
  async processRename(files, settings) {
    const processedFiles = [];

    // REMOVE THIS BLOCK COMPLETELY - manual rename has its own tool now
    // if (settings.manualRenames) {
    //   console.log("Processing manual renames");
    //   const processedFiles = [];
    //
    //   for (let i = 0; i < files.length; i++) {
    //     const file = files[i];
    //     const newName = settings.manualRenames[file.id];
    //
    //     if (newName && newName !== file.name) {
    //       console.log(`Manual rename: "${file.name}" -> "${newName}"`);
    //
    //       processedFiles.push({
    //         ...file,
    //         newName,
    //         originalName: file.name,
    //         newFile: await this.createModifiedFile(file, newName),
    //       });
    //     } else {
    //       // Keep original if no manual rename
    //       processedFiles.push({
    //         ...file,
    //         newName: file.name,
    //         originalName: file.name,
    //         newFile: file.file,
    //       });
    //     }
    //   }
    //
    //   return await this.saveFiles(processedFiles);
    // }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let newName = file.name;
      let fileExtension = newName.split(".").pop();
      let fileNameWithoutExt =
        newName.substring(0, newName.lastIndexOf(".")) || newName;

      console.log(`Processing file: ${file.name}`);
      console.log("Original settings:", settings);

      // Apply prefix
      if (settings.prefix) {
        console.log(`Adding prefix: "${settings.prefix}"`);
        fileNameWithoutExt = settings.prefix + fileNameWithoutExt;
      }

      // Apply suffix
      if (settings.suffix) {
        console.log(`Adding suffix: "${settings.suffix}"`);
        fileNameWithoutExt = fileNameWithoutExt + settings.suffix;
      }

      // Find and replace
      if (settings.find) {
        console.log(
          `Find & replace: "${settings.find}" -> "${settings.replace || ""}"`
        );
        fileNameWithoutExt = fileNameWithoutExt.replace(
          new RegExp(settings.find, "g"),
          settings.replace || ""
        );
      }

      // Apply case
      if (settings.case && settings.case !== "keep") {
        console.log(`Applying case: ${settings.case}`);
        console.log(`Before case: "${fileNameWithoutExt}"`);

        switch (settings.case) {
          case "lower":
            fileNameWithoutExt = fileNameWithoutExt.toLowerCase();
            break;
          case "upper":
            fileNameWithoutExt = fileNameWithoutExt.toUpperCase();
            break;
          case "title":
            // Better title case that handles various separators
            fileNameWithoutExt = fileNameWithoutExt
              .toLowerCase()
              .split(/[_\-.\s]+/)
              .map((word) => {
                if (word.length > 0) {
                  return word.charAt(0).toUpperCase() + word.slice(1);
                }
                return word;
              })
              .join("_"); // Default to underscores
            break;
          default:
            console.warn(`Unknown case type: ${settings.case}`);
        }

        console.log(`After case: "${fileNameWithoutExt}"`);
      }

      // Apply numbering
      if (settings.numbering) {
        const startNumber = settings.startNumber || 1;
        const digits = settings.digits || 1;
        const number = (startNumber + i).toString().padStart(digits, "0");
        console.log(`Adding number: ${number}`);
        fileNameWithoutExt += `_${number}`;
      }

      // Reconstruct full name
      newName = `${fileNameWithoutExt}.${fileExtension}`;

      console.log(`Final new name: "${newName}"`);

      processedFiles.push({
        ...file,
        newName,
        originalName: file.name,
        newFile: await this.createModifiedFile(file, newName),
      });
    }

    return await this.saveFiles(processedFiles);
  }

  async renameFileWithHandle(file, newName) {
    if (!file.handle || !file.handle.move) {
      throw new Error("File handle not available for renaming");
    }

    try {
      // Rename using File System Access API
      await file.handle.move(newName);

      // Update file metadata
      file.name = newName;
      file.handle = await file.handle.getFile();

      return true;
    } catch (error) {
      console.error(`Failed to rename ${file.name}:`, error);

      // Fallback: create new file and mark old for deletion
      const modifiedFile = await this.createModifiedFile(file, newName);
      return {
        renamed: true,
        newFile: modifiedFile,
        originalDeleted: false,
        note: "Original file could not be deleted",
      };
    }
  }

  /**
   * Convert files between formats
   */
  async processConvert(files, settings) {
    if (!settings.format) {
      throw new Error("No format selected for conversion");
    }

    const processedFiles = [];
    const targetFormat = settings.format.toLowerCase();

    for (const file of files) {
      // For now, simulate conversion - in real implementation,
      // you'd use libraries like canvas for image conversion
      const fileNameWithoutExt = file.name.substring(
        0,
        file.name.lastIndexOf(".")
      );
      const newName = `${fileNameWithoutExt}.${targetFormat}`;

      processedFiles.push({
        ...file,
        newName,
        originalName: file.name,
        newFile: await this.createModifiedFile(file, newName),
      });
    }

    return await this.saveFiles(processedFiles);
  }

  /**
   * Compress files (images)
   */
  // async processCompress(files, settings) {
  //   const processedFiles = [];

  //   for (const file of files) {
  //     if (file.type.startsWith("image/")) {
  //       // Simulate compression - in real implementation,
  //       // use browser-image-compression library
  //       const newName = `compressed_${file.name}`;

  //       processedFiles.push({
  //         ...file,
  //         newName,
  //         originalName: file.name,
  //         newFile: await this.createModifiedFile(file, newName, settings),
  //       });
  //     } else {
  //       // For non-image files, just copy
  //       processedFiles.push({
  //         ...file,
  //         newName: file.name,
  //         originalName: file.name,
  //         newFile: file.file,
  //       });
  //     }
  //   }

  //   return await this.saveFiles(processedFiles);
  // }

  async processCompress(files, settings) {
    const processedFiles = [];

    for (const file of files) {
      if (file.type.startsWith("image/")) {
        // Generate appropriate new name
        const quality = settings.compressionLevel
          ? `q${settings.compressionLevel}`
          : "compressed";
        const newName = `${quality}_${file.name}`;

        // Prepare compression settings
        const compressionSettings = {
          quality: settings.compressionLevel
            ? settings.compressionLevel / 100
            : 0.8, // Default to 80%
          maxWidth: settings.maxWidth,
          maxHeight: settings.maxHeight,
          preserveAspectRatio: settings.preserveAspectRatio !== false, // Default true
          maintainQuality: settings.maintainQuality || false,
          keepOriginalFormat: settings.keepOriginalFormat || false,
        };

        console.log("Compression settings:", compressionSettings);

        processedFiles.push({
          ...file,
          newName,
          originalName: file.name,
          newFile: await this.createModifiedFile(
            file,
            newName,
            compressionSettings
          ),
        });
      } else {
        // For non-image files, just copy
        processedFiles.push({
          ...file,
          newName: file.name,
          originalName: file.name,
          newFile: file.file,
        });
      }
    }

    return await this.saveFiles(processedFiles);
  }

  /**
   * Organize files into folder structure
   */
  async processOrganize(files, settings) {
    const organizedFiles = [];
    const folders = {};

    // Group files based on organization mode
    files.forEach((file) => {
      let folderName = "";

      switch (settings.mode) {
        case "type":
          folderName = this.getFileTypeFolder(file, settings);
          break;
        case "date":
          folderName = this.getDateFolder(file, settings);
          break;
        case "size":
          folderName = this.getSizeFolder(file, settings);
          break;
        case "name":
          folderName = this.getNameFolder(file, settings);
          break;
        default:
          folderName = "Other";
      }

      // Clean folder name to avoid invalid characters
      folderName = this.sanitizeFolderName(folderName);

      if (!folders[folderName]) {
        folders[folderName] = [];
      }
      folders[folderName].push(file);
    });

    console.log("Organizing into folders:", folders);

    // Process each folder
    for (const [folderName, folderFiles] of Object.entries(folders)) {
      for (let i = 0; i < folderFiles.length; i++) {
        const file = folderFiles[i];
        // Create path with folder name
        const newName = folderName ? `${folderName}/${file.name}` : file.name;

        organizedFiles.push({
          ...file,
          newName,
          originalName: file.name,
          folder: folderName,
          newFile: await this.createModifiedFile(file, newName),
        });
      }
    }

    return await this.saveFiles(organizedFiles);
  }

  /**
   * Sanitize folder name for file system
   */
  sanitizeFolderName(name) {
    // Remove or replace invalid characters
    return name
      .replace(/[<>:"/\\|?*]/g, "_") // Replace Windows invalid chars
      .replace(/\.$/g, "_") // Don't end with dot
      .replace(/\s+/g, " ") // Collapse multiple spaces
      .trim(); // Remove leading/trailing spaces
  }

  /**
   * Helper methods for file organization - update to use sanitized names
   */
  getFileTypeFolder(file) {
    const type = file.type.split("/")[0];
    const extension = file.name.split(".").pop().toLowerCase();

    const typeMap = {
      image: "Images",
      video: "Videos",
      audio: "Audio",
      text: "Documents",
      application: "Applications",
    };

    // Check for specific extensions
    const docExtensions = ["pdf", "doc", "docx", "txt", "rtf"];
    const codeExtensions = [
      "js",
      "jsx",
      "ts",
      "tsx",
      "html",
      "css",
      "py",
      "java",
    ];
    const archiveExtensions = ["zip", "rar", "7z", "tar", "gz"];

    if (docExtensions.includes(extension)) return "Documents";
    if (codeExtensions.includes(extension)) return "Code";
    if (archiveExtensions.includes(extension)) return "Archives";

    return typeMap[type] || "Other";
  }

  getDateFolder(file, settings) {
    const date = new Date(file.lastModified);
    const dateType = settings.dateType || "modified";
    const groupBy = settings.dateGroup || "month";

    if (groupBy === "year") {
      return `Year_${date.getFullYear()}`;
    } else if (groupBy === "month") {
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      return `${date.getFullYear()}-${month}`;
    } else {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      return `${date.getFullYear()}-${month}-${day}`;
    }
  }

  getSizeFolder(file, settings) {
    const sizeKB = Math.round(file.size / 1024);
    const ranges = (
      settings.sizeRanges || "0-100,101-1000,1001-5000,5001+"
    ).split(",");

    for (const range of ranges) {
      if (range.includes("+")) {
        const min = parseInt(range.replace("+", ""));
        if (sizeKB >= min) return `Size_${this.sanitizeFolderName(range)}`;
      } else {
        const [min, max] = range.split("-").map(Number);
        if (sizeKB >= min && sizeKB <= max)
          return `Size_${this.sanitizeFolderName(range)}`;
      }
    }

    return "Size_Other";
  }

  getNameFolder(file) {
    const firstChar = file.name.charAt(0).toUpperCase();
    if (/[A-Z]/.test(firstChar)) {
      return `Letters/${firstChar}`;
    } else if (/[0-9]/.test(firstChar)) {
      return "Numbers";
    } else {
      return "Symbols";
    }
  }

  /**
   * Resize images
   */
  async processResize(files, settings) {
    const processedFiles = [];

    for (const file of files) {
      if (file.type.startsWith("image/")) {
        // Simulate resize - in real implementation,
        // use canvas to resize images
        const newName = `resized_${file.name}`;

        processedFiles.push({
          ...file,
          newName,
          originalName: file.name,
          newFile: await this.createModifiedFile(file, newName, settings),
        });
      } else {
        // Non-image files remain unchanged
        processedFiles.push({
          ...file,
          newName: file.name,
          originalName: file.name,
          newFile: file.file,
        });
      }
    }

    return await this.saveFiles(processedFiles);
  }

  /**
   * Save files based on mode
   */
  async saveFiles(processedFiles, summary = {}) {
    // Add summary parameter with default
    if (this.mode === "write" && this.folderHandle) {
      return await this.saveFilesWriteMode(processedFiles, summary); // Pass summary
    } else {
      return await this.saveFilesDownloadMode(processedFiles, summary); // Pass summary
    }
  }

  /**
   * Save files directly using File System Access API
   */
  // async saveFilesWriteMode(processedFiles) {
  //   const results = [];

  //   for (const file of processedFiles) {
  //     try {
  //       console.log(`Processing file: ${file.name} -> ${file.newName}`);

  //       // Skip if name hasn't changed (for organize tool, etc.)
  //       if (file.name === file.newName) {
  //         console.log(`Skipping ${file.name} - name unchanged`);
  //         results.push({
  //           success: true,
  //           file: file,
  //           path: file.newName,
  //           action: "skipped",
  //         });
  //         continue;
  //       }

  //       // Step 1: Create new file with new name
  //       let newFileHandle;
  //       try {
  //         newFileHandle = await this.folderHandle.getFileHandle(file.newName, {
  //           create: true,
  //         });
  //         console.log(`Created new file handle for: ${file.newName}`);
  //       } catch (error) {
  //         console.error(`Error creating file ${file.newName}:`, error);
  //         throw new Error(
  //           `Cannot create file "${file.newName}": ${error.message}`
  //         );
  //       }

  //       // Step 2: Write content to new file
  //       const writable = await newFileHandle.createWritable();

  //       try {
  //         // Use the available file content
  //         if (file.newFile) {
  //           // We have a processed file blob
  //           await writable.write(file.newFile);
  //           console.log(`Wrote processed content to ${file.newName}`);
  //         } else if (file.file) {
  //           // Use the original file
  //           await writable.write(file.file);
  //           console.log(`Wrote original content to ${file.newName}`);
  //         } else if (file.content) {
  //           // Fallback to any content
  //           await writable.write(file.content);
  //         } else {
  //           throw new Error(`No file content available for ${file.name}`);
  //         }

  //         await writable.close();
  //         console.log(`Successfully created ${file.newName}`);
  //       } catch (writeError) {
  //         await writable.close().catch(() => {});
  //         throw writeError;
  //       }

  //       // Step 3: Try to delete the original file
  //       let originalDeleted = false;
  //       if (
  //         file.name !== file.newName &&
  //         file.name.toLowerCase() !== file.newName.toLowerCase()
  //       ) {
  //         const deletionResult = await this.attemptFileDeletion(
  //           file.name,
  //           this.folderHandle
  //         );
  //         originalDeleted = deletionResult.success;

  //         if (!deletionResult.success) {
  //           console.warn(
  //             `Deletion failed for ${file.name}: ${deletionResult.message}`
  //           );
  //           // You could collect these warnings to show to the user
  //         }
  //       }

  //       results.push({
  //         success: true,
  //         file: file,
  //         path: file.newName,
  //         originalDeleted: originalDeleted,
  //         action: file.name === file.newName ? "copied" : "renamed",
  //       });
  //     } catch (error) {
  //       console.error(`Error processing file ${file.name}:`, error);
  //       results.push({
  //         success: false,
  //         file: file,
  //         error: error.message,
  //       });
  //     }
  //   }

  //   // Return consistent object structure
  //   const successfulResults = results.filter((r) => r.success);
  //   return {
  //     success: results.every((r) => r.success),
  //     results: results,
  //     totalFiles: processedFiles.length,
  //     successfulFiles: successfulResults.length,
  //     mode: "write",
  //     summary: {
  //       renamed: successfulResults.filter((r) => r.action === "renamed").length,
  //       copied: successfulResults.filter((r) => r.action === "copied").length,
  //       skipped: successfulResults.filter((r) => r.action === "skipped").length,
  //       failed: results.filter((r) => !r.success).length,
  //     },
  //   };
  // }

  async saveFilesWriteMode(processedFiles) {
    const results = [];

    for (const file of processedFiles) {
      try {
        const newName = file.newName || file.name;
        const originalName = file.originalName || file.name;

        console.log(`Processing file: ${originalName} -> ${newName}`);

        // Check if this is an organize operation (has folder path)
        const hasFolderPath = newName.includes("/");
        let folderHandle = this.folderHandle;
        let fileName = newName;

        if (hasFolderPath) {
          // Extract folder and file name
          const pathParts = newName.split("/");
          fileName = pathParts.pop(); // Last part is the file name
          const folderPath = pathParts.join("/"); // Rest is the folder path

          if (folderPath) {
            try {
              // Create folder structure recursively
              folderHandle = await this.createFolderRecursive(
                this.folderHandle,
                folderPath
              );
              console.log(`Created/accessed folder: ${folderPath}`);
            } catch (folderError) {
              console.error(
                `Error creating folder ${folderPath}:`,
                folderError
              );
              throw new Error(
                `Cannot create folder "${folderPath}": ${folderError.message}`
              );
            }
          }
        }

        // Skip if name hasn't changed AND no folder path
        if (originalName === fileName && !hasFolderPath) {
          console.log(`Skipping ${originalName} - name unchanged`);
          results.push({
            success: true,
            file: file,
            path: newName,
            action: "skipped",
          });
          continue;
        }

        // Step 1: Create new file with new name
        let newFileHandle;
        try {
          newFileHandle = await folderHandle.getFileHandle(fileName, {
            create: true,
          });
          console.log(`Created new file handle for: ${fileName} in folder`);
        } catch (error) {
          console.error(`Error creating file ${fileName}:`, error);
          throw new Error(`Cannot create file "${fileName}": ${error.message}`);
        }

        // Step 2: Write content to new file
        const writable = await newFileHandle.createWritable();

        try {
          // Use the available file content
          const fileContent = file.newFile || file.file;

          if (fileContent) {
            await writable.write(fileContent);
            console.log(`Wrote content to ${fileName}`);
          } else {
            throw new Error(`No file content available for ${originalName}`);
          }

          await writable.close();
          console.log(`Successfully created ${fileName}`);
        } catch (writeError) {
          await writable.close().catch(() => {});
          throw writeError;
        }

        // Step 3: Try to delete the original file (only if not moving to subfolder AND not same name)
        let originalDeleted = false;
        if (originalName !== fileName && !hasFolderPath) {
          try {
            if (this.folderHandle.removeEntry) {
              await this.folderHandle.removeEntry(originalName);
              originalDeleted = true;
              console.log(
                `Successfully deleted original file: ${originalName}`
              );
            }
          } catch (deleteError) {
            console.warn(`Could not delete ${originalName}:`, deleteError);
          }
        }

        results.push({
          success: true,
          file: file,
          path: newName,
          originalDeleted: originalDeleted,
          action: hasFolderPath
            ? "organized"
            : originalName === fileName
            ? "copied"
            : "renamed",
        });
      } catch (error) {
        console.error(`Error processing file:`, error);
        results.push({
          success: false,
          file: file,
          error: error.message,
        });
      }
    }

    // Return consistent object structure
    const successfulResults = results.filter((r) => r.success);
    return {
      success: results.every((r) => r.success),
      results: results,
      totalFiles: processedFiles.length,
      successfulFiles: successfulResults.length,
      mode: "write",
      summary: {
        organized: successfulResults.filter((r) => r.action === "organized")
          .length,
        renamed: successfulResults.filter((r) => r.action === "renamed").length,
        copied: successfulResults.filter((r) => r.action === "copied").length,
        skipped: successfulResults.filter((r) => r.action === "skipped").length,
        failed: results.filter((r) => !r.success).length,
      },
    };
  }

  /**
   * Helper method to create folder structure recursively
   */
  async createFolderRecursive(rootHandle, folderPath) {
    const parts = folderPath.split("/");
    let currentHandle = rootHandle;

    for (const folderName of parts) {
      if (folderName.trim() === "") continue;

      try {
        currentHandle = await currentHandle.getDirectoryHandle(folderName, {
          create: true,
        });
      } catch (error) {
        console.error(`Error creating folder ${folderName}:`, error);
        throw new Error(
          `Cannot create folder "${folderName}": ${error.message}`
        );
      }
    }

    return currentHandle;
  }

  /**
   * Helper method to move file to trash folder if possible
   */
  async moveToTrashIfPossible(file) {
    try {
      // Try to create a "trash" or "old" folder
      const trashHandle = await this.folderHandle.getDirectoryHandle(
        "old_files",
        {
          create: true,
        }
      );

      // Try to move the file to trash
      // Note: This is more complex and might not work in all browsers
      console.log(`Attempting to move ${file.name} to trash folder`);

      // For now, just log that we can't delete
      // In a real implementation, you might want to show a message to the user
    } catch (error) {
      console.warn(`Could not move ${file.name} to trash:`, error);
    }
  }

  async attemptFileDeletion(fileName, folderHandle) {
    try {
      // Method 1: Try removeEntry if available
      if (folderHandle.removeEntry) {
        await folderHandle.removeEntry(fileName);
        return { success: true, method: "removeEntry" };
      }

      // Method 2: Try to overwrite with empty file (workaround)
      try {
        const emptyHandle = await folderHandle.getFileHandle(fileName, {
          create: true,
        });
        const writable = await emptyHandle.createWritable();
        await writable.write(new Blob([]));
        await writable.close();
        return { success: true, method: "overwritten" };
      } catch (overwriteError) {
        console.warn(`Could not overwrite ${fileName}:`, overwriteError);
      }

      // Method 3: Create a ".trash" or ".old" file marker
      const markerName = `${fileName}.old`;
      try {
        const markerHandle = await folderHandle.getFileHandle(markerName, {
          create: true,
        });
        const writable = await markerHandle.createWritable();
        await writable.write(
          new Blob([`Original file: ${fileName}\nTo be deleted manually.`])
        );
        await writable.close();
        return {
          success: false,
          method: "marked",
          message: `Created marker file ${markerName}. Please delete ${fileName} manually.`,
        };
      } catch (markerError) {
        console.warn(`Could not create marker for ${fileName}:`, markerError);
      }

      return {
        success: false,
        method: "none",
        message: `Could not delete ${fileName}. Please delete manually.`,
      };
    } catch (error) {
      return {
        success: false,
        method: "error",
        message: `Error: ${error.message}`,
      };
    }
  }

  /**
   * Create ZIP file for download mode
   */
  async saveFilesDownloadMode(processedFiles) {
    const zip = new JSZip();
    const results = [];

    // Create folder structure in ZIP
    for (const item of processedFiles) {
      try {
        // Handle both structures
        const file = item.file || item;
        const newName = file.newName || file.name;
        const fileContent = item.newFile || file.newFile || file.file;

        if (!file || !file.name) {
          throw new Error("Invalid file object");
        }

        if (!fileContent) {
          throw new Error(`No file content available for ${file.name}`);
        }

        // Check if this is an organize operation
        if (newName.includes("/")) {
          // Create folder structure in ZIP
          const folder = zip.folder(
            newName.substring(0, newName.lastIndexOf("/"))
          );
          folder.file(newName.split("/").pop(), fileContent);
        } else {
          // Add file directly to ZIP root
          zip.file(newName, fileContent);
        }

        results.push({
          success: true,
          file: file,
          path: newName,
        });
      } catch (error) {
        console.error(`Error adding file to ZIP:`, error);
        results.push({
          success: false,
          file: item,
          error: error.message,
        });
      }
    }

    // Generate and download ZIP
    try {
      const content = await zip.generateAsync({ type: "blob" });
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const zipName = `organized_files_${timestamp}.zip`;

      saveAs(content, zipName);

      return {
        success: true,
        results: results,
        zipName: zipName,
        totalFiles: processedFiles.length,
        successfulFiles: results.filter((r) => r.success).length,
        mode: "download",
      };
    } catch (error) {
      console.error("Error generating ZIP:", error);
      return {
        success: false,
        error: error.message,
        results: results,
      };
    }
  }

  /**
   * Helper methods for file organization
   */
  getFileTypeFolder(file, settings = {}) {
    const extension = file.name.split(".").pop().toLowerCase();

    // If detailed categorization is enabled
    if (settings.typeStructure === "detailed") {
      // Map extensions to specific categories
      const extensionMap = {
        // Images
        jpg: "Images/JPEG",
        jpeg: "Images/JPEG",
        png: "Images/PNG",
        gif: "Images/GIF",
        bmp: "Images/BMP",
        webp: "Images/WebP",
        svg: "Images/SVG",
        ico: "Images/ICO",
        tiff: "Images/TIFF",

        // Videos
        mp4: "Videos/MP4",
        avi: "Videos/AVI",
        mov: "Videos/MOV",
        wmv: "Videos/WMV",
        flv: "Videos/FLV",
        mkv: "Videos/MKV",
        webm: "Videos/WebM",

        // Audio
        mp3: "Audio/MP3",
        wav: "Audio/WAV",
        aac: "Audio/AAC",
        flac: "Audio/FLAC",
        ogg: "Audio/OGG",
        m4a: "Audio/M4A",

        // Documents
        pdf: "Documents/PDF",
        doc: "Documents/Word",
        docx: "Documents/Word",
        txt: "Documents/Text",
        rtf: "Documents/Text",
        odt: "Documents/Text",
        xls: "Documents/Excel",
        xlsx: "Documents/Excel",
        csv: "Documents/CSV",
        ppt: "Documents/PowerPoint",
        pptx: "Documents/PowerPoint",

        // Code
        js: "Code/JavaScript",
        jsx: "Code/JavaScript",
        ts: "Code/TypeScript",
        tsx: "Code/TypeScript",
        html: "Code/HTML",
        htm: "Code/HTML",
        css: "Code/CSS",
        scss: "Code/CSS",
        sass: "Code/CSS",
        py: "Code/Python",
        java: "Code/Java",
        cpp: "Code/C++",
        c: "Code/C",
        cs: "Code/C#",
        php: "Code/PHP",
        rb: "Code/Ruby",
        go: "Code/Go",
        rs: "Code/Rust",
        json: "Code/JSON",
        xml: "Code/XML",
        yml: "Code/YAML",
        yaml: "Code/YAML",

        // Archives
        zip: "Archives/ZIP",
        rar: "Archives/RAR",
        "7z": "Archives/7Z",
        tar: "Archives/TAR",
        gz: "Archives/GZ",

        // Executables
        exe: "Executables",
        msi: "Executables",
        dmg: "Executables",
        apk: "Executables",
        app: "Executables",
      };

      if (extensionMap[extension]) {
        // Check if subfolders should be created
        if (
          settings.createSubfolders !== false &&
          extensionMap[extension].includes("/")
        ) {
          return extensionMap[extension];
        } else {
          // Return just the main category
          return extensionMap[extension].split("/")[0];
        }
      }
    }

    // Default simple categorization
    const type = file.type.split("/")[0];

    const typeMap = {
      image: "Images",
      video: "Videos",
      audio: "Audio",
      text: "Documents",
      application: "Applications",
    };

    // Check for specific extensions
    const docExtensions = ["pdf", "doc", "docx", "txt", "rtf"];
    const codeExtensions = [
      "js",
      "jsx",
      "ts",
      "tsx",
      "html",
      "css",
      "py",
      "java",
    ];
    const archiveExtensions = ["zip", "rar", "7z", "tar", "gz"];

    if (docExtensions.includes(extension)) return "Documents";
    if (codeExtensions.includes(extension)) return "Code";
    if (archiveExtensions.includes(extension)) return "Archives";

    return typeMap[type] || "Other";
  }

  getDateFolder(file, settings) {
    const date = new Date(file.lastModified);
    const dateType = settings.dateType || "modified";
    const groupBy = settings.dateGroup || "month";

    if (groupBy === "year") {
      return `Year_${date.getFullYear()}`;
    } else if (groupBy === "month") {
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      return `${date.getFullYear()}-${month}`;
    } else {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      return `${date.getFullYear()}-${month}-${day}`;
    }
  }

  getSizeFolder(file, settings = {}) {
    let size = file.size;
    const unit = settings.sizeUnit || "kb";

    // Convert to appropriate unit
    switch (unit) {
      case "mb":
        size = size / (1024 * 1024);
        break;
      case "kb":
        size = size / 1024;
        break;
      // bytes remains as is
    }

    const sizeValue = Math.round(size);
    const ranges = (
      settings.sizeRanges || "0-100,101-1000,1001-5000,5001+"
    ).split(",");

    for (const range of ranges) {
      if (range.includes("+")) {
        const min = parseInt(range.replace("+", ""));
        if (sizeValue >= min) {
          return settings.useHumanReadable
            ? `Small (${range}${unit.toUpperCase()})`
            : `Size_${this.sanitizeFolderName(range)}`;
        }
      } else {
        const [min, max] = range.split("-").map(Number);
        if (sizeValue >= min && sizeValue <= max) {
          return settings.useHumanReadable
            ? `${this.getSizeCategory(
                min,
                max,
                unit
              )} (${range}${unit.toUpperCase()})`
            : `Size_${this.sanitizeFolderName(range)}`;
        }
      }
    }

    return settings.useHumanReadable ? "Other" : "Size_Other";
  }

  getSizeCategory(min, max, unit) {
    const avg = (min + max) / 2;
    if (avg < 100) return "Tiny";
    if (avg < 500) return "Small";
    if (avg < 2000) return "Medium";
    if (avg < 10000) return "Large";
    return "Huge";
  }

  // Update the getNameFolder method:
  getNameFolder(file, settings = {}) {
    const fileName = file.name;
    const firstChar = fileName.charAt(0);

    if (settings.nameMethod === "category") {
      if (/[A-Z]/.test(firstChar)) {
        return `Letters/${firstChar.toUpperCase()}`;
      } else if (/[a-z]/.test(firstChar)) {
        return settings.caseSensitive
          ? `letters/${firstChar}`
          : `Letters/${firstChar.toUpperCase()}`;
      } else if (/[0-9]/.test(firstChar)) {
        return settings.includeNumbers !== false ? "Numbers" : "Other";
      } else {
        return "Symbols";
      }
    } else if (settings.nameMethod === "custom" && settings.nameRanges) {
      const upperChar = firstChar.toUpperCase();
      const ranges = settings.nameRanges.split(",");

      for (const range of ranges) {
        if (range.includes("-")) {
          const [start, end] = range.split("-");
          if (upperChar >= start && upperChar <= end) {
            return `Letters/${range}`;
          }
        } else if (upperChar === range) {
          return `Letters/${range}`;
        }
      }

      if (/[0-9]/.test(firstChar)) {
        return settings.includeNumbers !== false ? "Numbers" : "Letters/Other";
      }

      return "Letters/Other";
    } else {
      // Default alphabet method
      if (/[A-Za-z]/.test(firstChar)) {
        const folderChar = firstChar.toUpperCase();
        return `Letters/${folderChar}`;
      } else if (/[0-9]/.test(firstChar)) {
        return settings.includeNumbers !== false ? "Numbers" : "Other";
      } else {
        return "Symbols";
      }
    }
  }

  /**
   * Create modified file blob
   */
  // async createModifiedFile(originalFile, newName, settings = {}) {
  //   const file = originalFile.file || originalFile;

  //   // Check if it's an image
  //   if (file.type.startsWith("image/")) {
  //     try {
  //       let processedFile;

  //       if (settings.compressionLevel) {
  //         // Compress image
  //         processedFile = await ImageProcessor.compressImage(file, {
  //           quality: settings.compressionLevel / 100,
  //           maxWidth: settings.maxWidth,
  //           maxHeight: settings.maxHeight,
  //         });
  //       } else if (settings.format) {
  //         // Convert image
  //         processedFile = await ImageProcessor.convertImage(
  //           file,
  //           settings.format,
  //           settings.quality
  //         );
  //       } else if (
  //         settings.width ||
  //         settings.height ||
  //         settings.percentage ||
  //         settings.maxDimension
  //       ) {
  //         // Resize image
  //         let resizeOptions = {};

  //         if (settings.method === "percentage") {
  //           const dimensions = await ImageProcessor.getImageDimensions(file);
  //           resizeOptions.width = Math.round(
  //             dimensions.width * (settings.percentage / 100)
  //           );
  //           resizeOptions.height = Math.round(
  //             dimensions.height * (settings.percentage / 100)
  //           );
  //         } else if (settings.method === "max") {
  //           const dimensions = await ImageProcessor.getImageDimensions(file);
  //           const maxDim = settings.maxDimension;

  //           if (dimensions.width > dimensions.height) {
  //             resizeOptions.width = maxDim;
  //           } else {
  //             resizeOptions.height = maxDim;
  //           }
  //         } else {
  //           resizeOptions.width = settings.width;
  //           resizeOptions.height = settings.height;
  //         }

  //         resizeOptions.preserveAspectRatio =
  //           settings.preserveAspectRatio !== false;
  //         processedFile = await ImageProcessor.resizeImage(file, resizeOptions);
  //       } else {
  //         // No image processing needed, just rename
  //         return new File([file], newName, {
  //           type: file.type,
  //           lastModified: file.lastModified,
  //         });
  //       }

  //       // Ensure correct filename
  //       if (processedFile.name !== newName) {
  //         return new File([processedFile], newName, {
  //           type: processedFile.type,
  //           lastModified: processedFile.lastModified,
  //         });
  //       }

  //       return processedFile;
  //     } catch (error) {
  //       console.error("Image processing failed:", error);
  //       // Fallback to original file
  //       return new File([file], newName, {
  //         type: file.type,
  //         lastModified: file.lastModified,
  //       });
  //     }
  //   }

  //   // For non-image files, just rename
  //   return new File([file], newName, {
  //     type: file.type,
  //     lastModified: file.lastModified,
  //   });
  // }

  async createModifiedFile(originalFile, newName, settings = {}) {
    const file = originalFile.file || originalFile;

    // Check if it's an image
    if (file.type.startsWith("image/")) {
      try {
        let processedFile;

        // Check if this is a compression operation
        if (settings.quality !== undefined) {
          console.log("Compressing image with quality:", settings.quality);

          // Compression with quality settings
          processedFile = await ImageProcessor.compressImage(file, {
            quality: settings.quality,
            maxWidth: settings.maxWidth,
            maxHeight: settings.maxHeight,
            preserveAspectRatio: settings.preserveAspectRatio !== false,
            maintainQuality: settings.maintainQuality || false,
            keepOriginalFormat: settings.keepOriginalFormat || false,
          });

          // Log the size difference for debugging
          if (processedFile) {
            console.log(`Size: ${file.size} -> ${processedFile.size} bytes`);
            console.log(
              `Reduction: ${(
                (1 - processedFile.size / file.size) *
                100
              ).toFixed(1)}%`
            );
          }
        } else if (settings.format) {
          // Convert image
          processedFile = await ImageProcessor.convertImage(
            file,
            settings.format,
            settings.quality
          );
        } else if (
          settings.width ||
          settings.height ||
          settings.percentage ||
          settings.maxDimension
        ) {
          // Resize image
          let resizeOptions = {};

          if (settings.method === "percentage") {
            const dimensions = await ImageProcessor.getImageDimensions(file);
            resizeOptions.width = Math.round(
              dimensions.width * (settings.percentage / 100)
            );
            resizeOptions.height = Math.round(
              dimensions.height * (settings.percentage / 100)
            );
          } else if (settings.method === "max") {
            const dimensions = await ImageProcessor.getImageDimensions(file);
            const maxDim = settings.maxDimension;

            if (dimensions.width > dimensions.height) {
              resizeOptions.width = maxDim;
            } else {
              resizeOptions.height = maxDim;
            }
          } else {
            resizeOptions.width = settings.width;
            resizeOptions.height = settings.height;
          }

          resizeOptions.preserveAspectRatio =
            settings.preserveAspectRatio !== false;
          processedFile = await ImageProcessor.resizeImage(file, resizeOptions);
        } else {
          // No image processing needed, just rename
          return new File([file], newName, {
            type: file.type,
            lastModified: file.lastModified,
          });
        }

        // Ensure correct filename
        if (processedFile && processedFile.name !== newName) {
          return new File([processedFile], newName, {
            type: processedFile.type,
            lastModified: processedFile.lastModified,
          });
        }

        return processedFile;
      } catch (error) {
        console.error("Image processing failed:", error);
        // Fallback to original file
        return new File([file], newName, {
          type: file.type,
          lastModified: file.lastModified,
        });
      }
    }

    // For non-image files, just rename
    return new File([file], newName, {
      type: file.type,
      lastModified: file.lastModified,
    });
  }
}

export default FileProcessor;
