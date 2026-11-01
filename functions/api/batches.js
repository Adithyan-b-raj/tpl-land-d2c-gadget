// Cloudflare Pages Functions - Batches API
export async function onRequestGet({ env }) {
  try {
    if (env && env.DB) {
      const res = await env.DB.prepare("SELECT * FROM batches ORDER BY is_active DESC").all();
      return new Response(JSON.stringify({ ok: true, data: res.results || [] }), {
        headers: { "Content-Type": "application/json", "Cache-Control": "public, s-maxage=60" }
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      data: [
        { id: 'batch_01', batch_name: 'Founders Batch 01 (Machined Titanium)', total_units: 500, reserved_units: 472, production_stage: 'qa_chamber', shipping_target: 'Nov 15, 2026', unit_price_inr: 24999, is_active: 1 },
        { id: 'batch_02', batch_name: 'Commercial Batch 02 (Anodized Aluminum)', total_units: 2000, reserved_units: 310, production_stage: 'sourcing', shipping_target: 'Jan 10, 2027', unit_price_inr: 22999, is_active: 0 }
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
