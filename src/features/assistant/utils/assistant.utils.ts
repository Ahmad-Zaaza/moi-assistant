export function downloadAudioFile(blob: Blob, filename: string) {
  const audioURL = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = audioURL;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(audioURL);
}
