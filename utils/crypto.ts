function encodeEmail(email: string): string {
    // E-postayı Base64'e çevir
    const base64 = btoa(email);
    
    // Her karakteri ASCII koduna çevir ve birleştir
    const numberString = base64.split('').map(char => {
      const code = char.charCodeAt(0);
      return code.toString().padStart(3, '0');
    }).join('');
    
    return numberString;
  }
  
  function decodeEmail(encoded: string): string {
    // Her 3 rakamı bir ASCII koduna çevir
    const base64 = encoded.match(/.{1,3}/g)?.map(num => {
      return String.fromCharCode(parseInt(num, 10));
    }).join('') || '';
    
    // Base64'ten geri çözümle
    return atob(base64);
  }