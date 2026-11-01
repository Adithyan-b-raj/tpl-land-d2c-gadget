export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname === '/api/leads' && context.request.method === 'GET') {
    return new Response(JSON.stringify([{"id":"PO-0186","name":"Nikhil Mathews (Mastering Engineer, Mumbai)","phone":"919820112233","detail":"OB01-RAW Titanium • Serial #0186 • Engraving: \"STUDIO KINETIC\"","status":"PAID // CNC QUEUE","amount":"₹28,990"},{"id":"PO-0185","name":"Rohan Desai (Product Designer, Bangalore)","phone":"919845099887","detail":"OB01-ORANGE Signal • Serial #0185 + Balanced DAC","status":"PAID // PACKED","amount":"₹27,490"},{"id":"PO-0184","name":"Siddharth Menon (Kochi)","phone":"919847055443","detail":"OB01-STEALTH Obsidian • 2 Units Studio Bundle (12% Off)","status":"DISPATCHED","amount":"₹48,382"}]), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=120'
      }
    });
  }
  if (url.pathname === '/api/leads' && context.request.method === 'POST') {
    const body = await context.request.json().catch(() => ({}));
    return new Response(JSON.stringify({ ok: true, id: body.id || 'REQ-LIVE' }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  }
  return new Response(JSON.stringify({ service: 'tpl-land-d2c-gadget', status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
