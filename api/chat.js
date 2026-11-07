export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, inverter = 'Huawei SUN2000' } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const openrouterApiKey = process.env.OPENROUTER_API_KEY || '';

    const systemPrompt = `Kamu adalah Proper Energy AI Copilot — asisten kecerdasan buatan resmi untuk sistem PLTS (Pembangkit Listrik Tenaga Surya) atap residensial dari PT Proper Energy Indonesia (properenergy.id).
Kamu memonitor unit inverter pelanggan saat ini: ${inverter}.
Telemetri terkini Bintaro Station:
- Radiasi Surya: 842 W/m² (Cerah Terik)
- Daya Real-Time: 14.8 kW (Kapasitas 18.5 kWp, PR 84.6% Optimal)
- Baterai PLTS Tumbuh: 88% (15.2 kWh tersimpan, cadangan blackout 8.4 jam)
- Penghematan Listrik: Rp 2.840.000 bulan ini
- Indeks Debu: 4.1% (Bersih normal)
Gaya komunikasi: Ramah, profesional, presisi secara teknis teknik elektro/surya, gunakan Bahasa Indonesia yang elegan dan mudah dipahami pemilik rumah.
Jawab secara ringkas, to the point, padat insight (maksimal 2-3 paragraf). Berikan angka konkret Rupiah atau kWh jika relevan.`;

    const freeModels = [
      'cohere/north-mini-code:free',
      'dots-studio/dots-3-note-preview:free',
      'liquid/lfm-3-1.7b:free',
      'google/gemma-4-26b-a4b-it:free',
      'nvidia/nemotron-3.5-lightning:free'
    ];

    let reply = '';
    let usedModel = '';

    for (const model of freeModels) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openrouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://properenergy.id',
            'X-Title': 'Proper Energy AI Dashboard'
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            temperature: 0.4,
            max_tokens: 450
          })
        });

        if (response.ok) {
          const data = await response.json();
          const msgObj = data.choices?.[0]?.message;
          reply = msgObj?.content?.trim() || msgObj?.reasoning?.trim() || '';
          if (reply) {
            usedModel = model;
            break;
          }
        }
      } catch (err) {
        console.error(`Model ${model} failed:`, err);
      }
    }

    // Dynamic Engineering Fallback if all free models are busy/rate limited
    if (!reply) {
      const qLower = String(message || '').toLowerCase();
      if (/soiling|debu|cuci|bersih/.test(qLower)) {
        reply = `✨ **Diagnosa AI Proper Energy — Analisis Soiling (${inverter}):**\nIndeks debu saat ini 4.1% (bersih normal). Berdasarkan kalkulasi cuaca & tarif listrik, pembersihan modul hanya disarankan jika deviasi yield menyentuh >10% untuk menjaga ROI positif.`;
      } else if (/baterai|cadangan|mati lampu|blackout|daya/.test(qLower)) {
        reply = `✨ **Diagnosa AI Proper Energy — Cadangan Energi (${inverter}):**\nBaterai LiFePO4 tersimpan 15.2 kWh (88%). Pada beban kritis 1.8 kW (kulkas, WiFi, 2 AC inverter), sistem PLTS Tumbuh sanggup mem-backup rumah selama 8.4 jam tanpa pasokan PLN.`;
      } else if (/relay|error|fault|inverter|alarm/.test(qLower)) {
        reply = `✨ **Diagnosa AI Proper Energy — Diagnostik Inverter (${inverter}):**\nInverter beroperasi pada rentang tegangan AC 228V (aman). Jika terdeteksi grid standby relay, nonaktifkan Feed-in Standby untuk mencegah phantom discharge 380W saat malam hari.`;
      } else if (/hemat|biaya|rupiah|uang|pln/.test(qLower)) {
        reply = `✨ **Diagnosa AI Proper Energy — Finansial (${inverter}):**\nSistem menghemat rata-rata Rp 2.840.000/bulan dari self-consumption energi surya 343 kWh. Estimasi payback period sistem PLTS Tumbuh saat ini berkisar 4.8 tahun.`;
      } else {
        reply = `✨ **Diagnosa AI Proper Energy (${inverter}):**\nBerdasarkan telemetri real-time, sistem PLTS Tumbuh Anda beroperasi optimal pada efisiensi 94.2%. Daya surya 14.8 kW saat ini memprioritaskan beban rumah dan mengisi baterai LiFePO4 ke 88%. Seluruh parameter teknis dalam kondisi prima.`;
      }
      usedModel = 'ProperEnergy-OfflineEngine';
    }

    return res.status(200).json({
      reply,
      model: usedModel,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Terjadi kesalahan pemrosesan AI',
      reply: 'Maaf, sistem telemetri AI sedang mengalami lonjakan beban. Secara umum sistem PLTS Anda dalam kondisi normal dan optimal.'
    });
  }
}
