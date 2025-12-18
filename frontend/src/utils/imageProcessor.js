/**
 * Image Processing Utilities
 * For actual image compression, conversion, and resizing
 */

class ImageProcessor {
  /**
   * Compress image with quality settings
   */
  // static async compressImage(file, options = {}) {
  //     const { quality = 0.8, maxWidth, maxHeight } = options;

  //     return new Promise((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.onload = (e) => {
  //             const img = new Image();
  //             img.onload = () => {
  //                 const canvas = document.createElement('canvas');
  //                 let width = img.width;
  //                 let height = img.height;

  //                 // Calculate new dimensions if max dimensions specified
  //                 if (maxWidth && width > maxWidth) {
  //                     height = (height * maxWidth) / width;
  //                     width = maxWidth;
  //                 }
  //                 if (maxHeight && height > maxHeight) {
  //                     width = (width * maxHeight) / height;
  //                     height = maxHeight;
  //                 }

  //                 canvas.width = width;
  //                 canvas.height = height;

  //                 const ctx = canvas.getContext('2d');
  //                 ctx.drawImage(img, 0, 0, width, height);

  //                 canvas.toBlob(
  //                     (blob) => {
  //                         if (blob) {
  //                             resolve(new File([blob], file.name, {
  //                                 type: file.type,
  //                                 lastModified: Date.now()
  //                             }));
  //                         } else {
  //                             reject(new Error('Canvas toBlob failed'));
  //                         }
  //                     },
  //                     file.type,
  //                     quality
  //                 );
  //             };
  //             img.onerror = reject;
  //             img.src = e.target.result;
  //         };
  //         reader.onerror = reject;
  //         reader.readAsDataURL(file);
  //     });
  // }

  // In ImageProcessor.js
  static async compressImage(file, options = {}) {
    const {
      quality = 0.8,
      maxWidth,
      maxHeight,
      preserveAspectRatio = true,
      maintainQuality = false,
      keepOriginalFormat = false,
    } = options;

    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Apply max dimensions if specified
          if (maxWidth && width > maxWidth) {
            height = preserveAspectRatio
              ? Math.round(height * (maxWidth / width))
              : height;
            width = maxWidth;
          }

          if (maxHeight && height > maxHeight) {
            width = preserveAspectRatio
              ? Math.round(width * (maxHeight / height))
              : width;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");

          // For better quality, use these settings
          if (maintainQuality) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Determine output format
          const outputFormat = keepOriginalFormat
            ? file.type.split("/")[1] || "jpeg"
            : "jpeg";

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: `image/${outputFormat}`,
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                reject(new Error("Canvas to Blob conversion failed"));
              }
            },
            `image/${outputFormat}`,
            quality
          );
        };

        img.onerror = () => reject(new Error("Image loading failed"));
      };

      reader.onerror = () => reject(new Error("File reading failed"));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Convert image format
   */
  static async convertImage(file, targetFormat, quality = 0.9) {
    const formatMap = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
      bmp: "image/bmp",
    };

    const mimeType = formatMap[targetFormat.toLowerCase()];
    if (!mimeType) {
      throw new Error(`Unsupported format: ${targetFormat}`);
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const newName =
                  file.name.replace(/\.[^/.]+$/, "") + "." + targetFormat;
                resolve(
                  new File([blob], newName, {
                    type: mimeType,
                    lastModified: Date.now(),
                  })
                );
              } else {
                reject(new Error("Conversion failed"));
              }
            },
            mimeType,
            quality
          );
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Resize image to specific dimensions
   */
  static async resizeImage(file, options = {}) {
    const { width, height, preserveAspectRatio = true } = options;

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");

          let newWidth = width || img.width;
          let newHeight = height || img.height;

          // Preserve aspect ratio if only one dimension is specified
          if (preserveAspectRatio) {
            if (width && !height) {
              newHeight = (img.height * width) / img.width;
            } else if (height && !width) {
              newWidth = (img.width * height) / img.height;
            }
          }

          canvas.width = newWidth;
          canvas.height = newHeight;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const newName = `resized_${file.name}`;
                resolve(
                  new File([blob], newName, {
                    type: file.type,
                    lastModified: Date.now(),
                  })
                );
              } else {
                reject(new Error("Resize failed"));
              }
            },
            file.type,
            0.9
          );
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Get image dimensions
   */
  static async getImageDimensions(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Batch process images
   */
  static async batchProcessImages(files, operation, options) {
    const results = [];

    for (const file of files) {
      try {
        let processedFile;

        switch (operation) {
          case "compress":
            processedFile = await this.compressImage(file.file, options);
            break;
          case "convert":
            processedFile = await this.convertImage(
              file.file,
              options.format,
              options.quality
            );
            break;
          case "resize":
            processedFile = await this.resizeImage(file.file, options);
            break;
          default:
            processedFile = file.file;
        }

        results.push({
          success: true,
          original: file,
          processed: processedFile,
        });
      } catch (error) {
        results.push({
          success: false,
          original: file,
          error: error.message,
        });
      }
    }

    return results;
  }
}

export default ImageProcessor;
