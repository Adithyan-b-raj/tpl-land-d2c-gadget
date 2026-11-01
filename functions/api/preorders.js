// Cloudflare Pages Functions - Preorders API
export async function onRequestGet({ env }) {
  try {
    if (env && env.DB) {
      const res = await env.DB.prepare("SELECT * FROM preorders ORDER BY created_at DESC").all();
      return new Response(JSON.stringify({ ok: true, data: res.results || [] }), {
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      data: [
        { id: 'pre_001', serial_number: 'KNTC-001', batch_id: 'batch_01', customer_name: 'Arjun Vasudevan', email: 'arjun@kntc.audio', phone: '+91 98401 22990', colorway: 'Matte Obsidian', custom_engraving: 'STUDIO-01', total_amount: 24999, payment_status: 'paid' },
        { id: 'pre_002', serial_number: 'KNTC-002', batch_id: 'batch_01', customer_name: 'Lukas Lindqvist', email: 'lukas@nordicdsp.se', phone: '+46 70 123 4567', colorway: 'Cyber Safety Orange', custom_engraving: 'LINDQVIST', total_amount: 24999, payment_status: 'paid' },
        { id: 'pre_003', serial_number: 'KNTC-003', batch_id: 'batch_01', customer_name: 'Nadia Chen', email: 'nadia@syncretic.design', phone: '+1 415 889 0122', colorway: 'Industrial Bone', custom_engraving: 'POLYPHONIC', total_amount: 24999, payment_status: 'paid' }
      ]
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const { customer_name, email, phone, colorway, custom_engraving } = body;

    if (!customer_name || !phone) {
      return new Response(JSON.stringify({ ok: false, error: "Name and phone required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const id = "pre_" + Date.now().toString(36);
    const serial = "KNTC-" + Math.floor(Math.random() * 899 + 100);

    if (env && env.DB) {
      await env.DB.prepare(
        "INSERT INTO preorders (id, serial_number, batch_id, customer_name, email, phone, colorway, custom_engraving, total_amount, payment_status) VALUES (?, ?, 'batch_01', ?, ?, ?, ?, ?, 24999, 'paid')"
      ).bind(id, serial, customer_name, email || '', phone, colorway || 'Matte Obsidian', custom_engraving || null).run();
    }

    return new Response(JSON.stringify({
      ok: true,
      message: "Pre-order reserved! Your dedicated serial allocation is " + serial,
      serial_number: serial
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
