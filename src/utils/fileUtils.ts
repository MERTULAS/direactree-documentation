export async function getFileContent(fileName: string): Promise<string> {
  try {
    const response = await fetch(`/mock-data/${fileName}`);
    
    if (!response.ok) {
      throw new Error(`Dosya bulunamadı: ${fileName}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error('Dosya okuma hatası:', error);
    throw error;
  }
} 