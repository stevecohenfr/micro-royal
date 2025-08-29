// Generate a simple PCM 16-bit WAV data URI for a sine beep
export function createBeepWavDataUri(durationMs = 200, freq = 880, sampleRate = 44100) {
  const samples = Math.floor((durationMs / 1000) * sampleRate);
  const amp = 0.25; // reduce volume
  const data = new Int16Array(samples);
  for (let i = 0; i < samples; i++) {
    const t = i / sampleRate;
    data[i] = Math.max(-1, Math.min(1, Math.sin(2 * Math.PI * freq * t))) * 0x7fff * amp;
  }

  // WAV header (44 bytes)
  const bytesPerSample = 2;
  const blockAlign = bytesPerSample * 1;
  const byteRate = sampleRate * blockAlign;
  const dataSize = data.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  let offset = 0;

  function writeString(s: string) { for (let i = 0; i < s.length; i++) view.setUint8(offset++, s.charCodeAt(i)); }
  function writeUint32(v: number) { view.setUint32(offset, v, true); offset += 4; }
  function writeUint16(v: number) { view.setUint16(offset, v, true); offset += 2; }

  writeString('RIFF');
  writeUint32(36 + dataSize);
  writeString('WAVE');
  writeString('fmt ');
  writeUint32(16); // PCM chunk size
  writeUint16(1);  // PCM format
  writeUint16(1);  // channels
  writeUint32(sampleRate);
  writeUint32(byteRate);
  writeUint16(blockAlign);
  writeUint16(16); // bits per sample
  writeString('data');
  writeUint32(dataSize);
  for (let i = 0; i < data.length; i++) view.setInt16(offset + i * 2, data[i], true);

  const blob = new Blob([buffer], { type: 'audio/wav' });
  const reader = new FileReader();
  return new Promise<string>((resolve) => {
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

